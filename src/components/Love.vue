<template>
    <div class="flex-container">
        <slot name="logo"></slot>
        <slot name="scramble"></slot>
        <transition name="fade">
            <div v-if="cashbackVisible" class="cashback-text">{{ cashback }}&nbsp;Р<span class="rouble-sign">₽</span></div>
        </transition>
        <canvas id="loveCanvas" />
    </div>
</template>

<script>

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
var RATIO

if (WIDTH > 880) {
    RATIO = 1
} else if (WIDTH < 880 && WIDTH > 600) {
    RATIO = .7
} else if (WIDTH < 600) {
    RATIO = .4
}

const HEART = require('../assets/heart.png')
const HEART_SMALL = require('../assets/heart-small.png')

import { Engine, Render, World, Bodies, Body, Composite, Events } from "matter-js"

export default {
    props: {
        isMobile: {
            type: Boolean
        },
    },
    data () {
        return {
            cashbackVisible: false,
        }
    },
    computed: {
        cashback() {
            return this.formatNumber(window.RESULTS.favorite_places_cashback)
        },
    },
    methods: {
        formatNumber(number) {
            return new Intl.NumberFormat('ru-RU').format(Math.round(number))
        },
        dropHeart(canvas) {
            var engine = Engine.create()

            var render = Render.create({
                canvas: document.body.querySelector(canvas),
                engine: engine,
                options: {
                    height: HEIGHT,
                    width: WIDTH,
                    background: 'transparent',
                    wireframes: false
                }
            });

            let heart = Bodies.rectangle(WIDTH / 2, -108, 127, 108, {
                id: 'heart',
                collisionFilter: {
                    category: 0x0001
                },
                render: {
                    sprite: {
                        texture: HEART,
                        xScale: RATIO,
                        yScale: RATIO,
                    }
                }
            })

            let smallHearts = []
            
            for (let i = 0; i < 11; i++) {
                smallHearts.push(
                    Bodies.rectangle(WIDTH / 2, HEIGHT, 94, 80, {
                        collisionFilter: {
                            category: 0x0002,
                            mask: 0x0001
                        },
                        angle: Math.PI * this.randomInteger(-15, 50) / 100,
                        render: {
                            sprite: {
                                texture: HEART_SMALL,
                                xScale: RATIO,
                                yScale: RATIO,
                            }
                        }
                    })
                )
            }

            let ground = Bodies.rectangle(WIDTH / 2, HEIGHT - 25, WIDTH, 50, { 
                id: 'ground',
                collisionFilter: {
                    mask: 0x0001
                },
                isStatic: true, 
                render: { opacity: 0 } 
            })

            let ceiling = Bodies.rectangle(WIDTH / 2, 25, WIDTH, 50, { 
                collisionFilter: {
                    mask: 0x0002
                },
                isStatic: true, 
                render: { opacity: 0 } 
            })

            World.add(engine.world, [heart, ceiling,

                // left wall
                Bodies.rectangle(0, HEIGHT / 2, 50, HEIGHT, { 
                    isStatic: true, 
                    render: { opacity: 0 } 
                }),

                //right wall
                Bodies.rectangle((WIDTH), HEIGHT / 2, 50, HEIGHT, { 
                    isStatic: true, 
                    render: { opacity: 0 } 
                }),

                //ground
                ground
            ]);

            let self = this

            Events.on(engine, "collisionStart", function(event) {
                let id = event.pairs.slice()[0].id

                if (id === 'AgroundBheart') {
                    Composite.remove(engine.world, heart)
                    World.add(engine.world, smallHearts)

                    smallHearts.forEach(function(heart, i) {
                        Body.setAngularVelocity(heart, Math.PI / self.randomInteger(12, 17))
                        Body.applyForce(heart, heart.position, { x: self.randomInteger(-9, 9) / 10, y: self.randomInteger(-9, -1) / 10 })
                    })

                    self.cashbackVisible = true
                }
            })

            Engine.run(engine);
            Render.run(render);
        },

        randomInteger(min, max) {
            let rand = min - 0.5 + Math.random() * (max - min + 1)
            return Math.round(rand)
        }
    },
}
</script>

<style lang="scss">
    #loveCanvas {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        margin: 0 auto;
        pointer-events: none;
    }
    .cashback-text {
        color: #FFFFFF;
        line-height: 1;

        @media (min-width: 1000px) {
            font-size: 145px;
        }

        @media (min-width: 880px) and (max-width: 999px) {
            font-size: 150px;
        }

        @media (min-width: 525px) and (max-width: 879px) {
            font-size: 100px;
        }

        @media (max-width: 524px) {
            font-size: 39px;
            text-align: center;
        }
    }
</style>