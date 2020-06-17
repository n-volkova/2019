<template>
    <div v-if="!codeSent" class="intro">
        <full-page v-show="loaded" ref="fullpageIntro" id="fullpageIntro" :skip-init="true" :options="options">
            <div class="section">
                <svg width="100%" height="100%" viewBox="0 0 1200 720" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square" stroke-linejoin="bevel">
                        <g transform="translate(-20.000000, -20.000000)" stroke="#FFFFFF" stroke-width="15">
                            <polyline id="Path-3" points="30 30 1217 380 30 730"></polyline>
                        </g>
                    </g>
                </svg>
                <canvas v-if="!droppedCompletely" id="introCanvas" />

                <div class="chevron-down" @click="scrollDown" ></div>
            </div>
            <div class="section drop-further-section" id="dropFurther">
                <div class="logo white">Рокетбанк</div>
                <canvas v-if="!stampedeVisible" id="dropFurtherCanvas" />
                <div class="text" v-html="introText"></div>
                <div class="spacer"></div>

                <transition name="fade" mode="out-in">
                    <div v-if="!stampedeVisible && !codeSent" class="start-btn" @click="onCodeSent">Узнать</div>
                    <!-- <stampede v-else @codeSent="onCodeSent($event)" /> -->
                </transition>

                <footer>
                    <p>КИВИ Банк (АО), <a href="https://qiwi.com/" target="_blank">qiwi.com</a>, лицензия Банка России № 2241 от 22.01.2015 филиал Рокетбанк.</p>
                </footer>
            </div>
        </full-page>
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

const STAR = require('../assets/star.png')
const CIRCLE = require('../assets/circle.png')
const RECT = require('../assets/rect.png')
const COMMON_RESULTS = require('../assets/commonResults.json')

import { Engine, Render, World, Bodies } from "matter-js"

export default {
    name: 'Intro',
    components: {
    },
    data () {
        return {
            popupVisible: false,
            current: 'intro',
            droppedCompletely: false,
            stampedeVisible: false,
            codeSent: false,
            loaded: false,
            introText: 'Грядёт конец 2019 года, самое время узнать, как он прошёл у вас',
            stampedeText: 'Введите номер своего мобильного в форму ниже, и мы расскажем про этот год в цифрах и картинках',
            options: {
                licenseKey: '6E8F5101-0A6A4218-AEC61F0C-EF812275',
                css3: true,
                afterLoad: this.afterLoad,
                onLeave: this.onLeave,
                lazyLoading: false,
                scrollingSpeed: 1000,
                sectionsColor: ['#E6343A', '#E6343A']
            },
        }
    },
    computed: {
        isMobile() {
            return WIDTH < 880
        },
    },  
    mounted() {
        let refs = this.$refs
        let self = this
        window.onload = function() {

            let fullpageEnabled = document.documentElement.classList.contains('fp-enabled')

            if (!fullpageEnabled) {
                refs.fullpageIntro.init()
            } else {
                document.documentElement.classList.remove('fp-enabled')
                refs.fullpageIntro.destroy('all')
                refs.fullpageIntro.init()
            }
            self.loaded = true

            self.dropIntroTitle('#introCanvas')
        }
    },
    methods: {
        dropIntroTitle(canvas) {
            var engine = Engine.create();
            let startBtn = document.querySelector('.start-btn')

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

            this.star = Bodies.circle(266 * RATIO, -266 * RATIO, 266 * RATIO, {
                render: {
                    sprite: {
                        texture: STAR,
                        xScale: RATIO,
                        yScale: RATIO,
                    }
                }
            })

            this.circle = Bodies.circle(WIDTH / 2, -150 * RATIO, 150 * RATIO, {
                render: {
                    sprite: {
                        texture: CIRCLE,
                        xScale: RATIO,
                        yScale: RATIO,
                    }
                }
            })

            this.rect = Bodies.rectangle(WIDTH - 311 * RATIO, -181 * RATIO, 622 * RATIO, 181 * RATIO, {
                angle: .78,
                render: {
                    sprite: {
                        texture: RECT,
                        xScale: RATIO,
                        yScale: RATIO,
                    }
                }
            })

            var ground

            if (canvas === '#introCanvas') {
                ground = Bodies.rectangle(WIDTH / 2, HEIGHT + 25, WIDTH, 50, { 
                    isStatic: true, 
                    render: { opacity: 0 } 
                })
            } else {
                ground = Bodies.rectangle(WIDTH / 2, startBtn.offsetTop + 25, WIDTH, 50, { 
                    isStatic: true, 
                    render: { opacity: 0 } 
                })
            }

            World.add(engine.world, [this.star, this.circle, this.rect,

                // left wall
                Bodies.rectangle(-30, HEIGHT / 2, 50, HEIGHT, { 
                    isStatic: true, 
                    render: { opacity: 0 } 
                }),

                //right wall
                Bodies.rectangle((WIDTH + 30), HEIGHT / 2, 50, HEIGHT, { 
                    isStatic: true, 
                    render: { opacity: 0 } 
                }),

                //ground
                ground
            ]);
            Engine.run(engine);
            Render.run(render);
        },

        showPopup() {
            this.popupVisible = true
            this.disableScrolling()
        },

        hidePopup() {
            this.popupVisible = false
            this.enableScrolling()
        },

        afterLoad(section, origin, destination) {
            this.current = origin.item.getAttribute('id')

            if (this.current === 'dropFurther' && !this.droppedCompletely) {
                setTimeout(() => {
                    this.dropIntroTitle('#dropFurtherCanvas')
                    this.droppedCompletely = true
                }, 700)
            }
        },

        onLeave(section, origin, destination) {
            let current = origin.item.getAttribute('id')

            if (current === 'dropFurther') {
                this.disableScrolling()
            }
        },

        scrollDown() {
            this.$refs.fullpageIntro.api.moveSectionDown() 
        },

        disableScrolling() {
            this.$refs.fullpageIntro.api.setAllowScrolling(false)
        },

        showStampede() {
            this.stampedeVisible = true
            this.introText = this.stampedeText


            // setTimeout(() => {
                // this.codeSent = true

            //     setTimeout(() => {
            //         window.RESULTS = { 
            //             "days_transactions":{ 
            //                 "1.0":"13.58",
            //                 "2.0":"12.08",
            //                 "3.0":"13.51",
            //                 "4.0":"14.65",
            //                 "5.0":"10.29",
            //                 "6.0":"12.98",
            //                 "7.0":"22.91"
            //             },
            //             "time_transactions":{ 
            //                 "18:00 - 05:59":"42.91",
            //                 "6:00 - 17:59":"57.09"
            //             },
            //             "favorite_places_cashback":911,
            //             "cashback_sum":5008,
            //             "balance_percents_in_rub":685,
            //             "popular_category":{ 
            //                 "Рестораны и кафе":"12.0%"
            //             },
            //             "invited_friends":0
            //         }
            //         window.IS_CLIENT = true
            //         this.$emit('loginSuccess')
            //     }, 0)
            // }, 2000)



            // this.codeSent = true

            // setTimeout(() => {
            //     window.IS_CLIENT = false
            //     this.$emit('notClient')
            // }, 2000)

        },

        onCodeSent(res) {
            this.stampedeVisible = false
            if (!res.client) {
                window.SIGNUP_URL = res.signupUrl
                window.IS_CLIENT = false

                this.$emit('notClient')
            } else {
                window.IS_CLIENT = true
                this.codeSent = true
                this.getData(res.token)
            }
        },

        async getData(token) {
            const url = `https://mw.rocketbank.ru/api/v1/ny_stats/${token}`

            await this.$http({
                url: url,
                method: 'GET'
            }).then(res => {
                setTimeout(() => {
                    window.RESULTS = res.data
                    this.$emit('loginSuccess')
                }, 0)
            })
            .catch(error => {
                window.NO_DATA = true
                window.IS_CLIENT = false
                this.$emit('noData')
            })
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .intro {
        .chevron-down {
            position: absolute;
            width: 44px;
            height: 24px;
            bottom: 40px;
            left: 0;
            right: 0;
            margin-left: auto;
            margin-right: auto;
            background-image: url('~@/assets/down.svg');
            background-size: contain;
            background-repeat: no-repeat;
            cursor: pointer;
        }
    }
    #introCanvas, #dropFurtherCanvas {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        margin: 0 auto;
        pointer-events: none;
    }
    .drop-further-section {
        .fp-tableCell {
            display: flex;
            flex-direction: column;
            padding-bottom: 20px;
        }
        .text {
            color: #fff;

            @media (min-width: 768px) {
                margin-top: 90px;
                font-size: 90px;
                line-height: 1;
            }

            @media (min-width: 401px) and (max-width: 767px) {
                margin-top: 80px;
                font-size: 36px;
                line-height: 1.15;
            }
            @media (max-width: 400px) {
                margin-top: 80px;
                font-size: 28px;
                line-height: 1.15;
            }
        }

        .stampede-wrapper {
            width: unset;
            padding-top: 0;
            padding-bottom: 0;
            margin-left: -20px;
            margin-right: -20px;
            .input-container input {
                // -webkit-box-align: center;
                // -webkit-align-items: center;
            }
            .input-container, 
            .code {
                // -webkit-align-items: center;
                // -webkit-box-align: center;
                width: 100%;
                border-radius: 90.5px;
                font-weight: 400;
                overflow: hidden;
                box-shadow: none;

                @media (min-width: 1200px) {
                    height: 150px;
                    padding-left: 50px;
                    font-size: 75px;
                    line-height: 150px;
                    border: 5px solid #000000;
                    margin-bottom: 0;
                }
                @media (min-width: 768px) and (max-width: 1199px) {
                    height: 150px;
                    padding-left: 30px;
                    font-size: 47px;
                    line-height: 150px;
                    border: 5px solid #000000;
                    margin-bottom: 0;
                }
                @media (min-width: 401px) and (max-width: 767px) {
                    height: 80px;
                    padding-left: 7px;
                    font-size: 25px;
                    line-height: 80px;
                    border: 2px solid #000000;
                }
                @media (max-width: 400px) {
                    height: 50px;
                    font-size: 20px;
                    line-height: 50px;
                    padding-left: 7px;
                    border: 2px solid #000000;
                }
            }
            .code {
                padding-left: 20px;
            }
            .spring-spinner {
                margin: 0 auto;
                @media (max-width: 400px) {
                    display: none;
                }
            }
            button {
                border-radius: 90.5px;
                font-weight: 400;
                z-index: 1;
                box-shadow: none;
                // -webkit-justify-content: center;
                // -webkit-box-pack: center;

                @media (min-width: 1200px) {
                    position: absolute;
                    right: 0;
                    width: auto;
                    min-width: unset;
                    display: inline-block;
                    width: 300px;
                    height: 150px;
                    font-size: 75px;
                    line-height: 150px;
                    border: 5px solid #000000;
                }
                @media (min-width: 768px) and (max-width: 1199px) {
                    position: absolute;
                    right: 0;
                    width: auto;
                    min-width: unset;
                    display: inline-block;
                    width: 200px;
                    height: 150px;
                    font-size: 47px;
                    line-height: 150px;
                    border: 5px solid #000000;
                }
                @media (min-width: 401px) and (max-width: 767px) {
                    height: 80px;
                    font-size: 36px;
                    line-height: 80px;
                    border: 2px solid #000000;
                }
                @media (max-width: 400px) {
                    height: 50px;
                    font-size: 20px;
                    line-height: 50px;
                    border: 2px solid #000000;
                }
            }
        }
    }
    .start-btn {
        color: #000;
        background-color: #fff;
        border-radius: 90px;
        text-align: center;
        cursor: pointer;
        @media (min-width: 768px) {
            height: 150px;
            font-size: 75px;
            line-height: 150px;
            border: 5px solid #000000;
        }
        @media (max-width: 767px) {
            height: 80px;
            font-size: 36px;
            line-height: 80px;
            border: 2px solid #000000;
        }
    }
    footer {
        user-select: none;
        text-align: center;
        color: #fff;
        font-weight: 400;

        @media (min-width: 768px) {
            margin: 20px 0 0;
            font-size: 11px;
        }
        @media (max-width: 767px) {
            margin: 10px 0 0px;
            font-size: 9px;
        }
        a {
            color: inherit;
            text-decoration: underline;
        }
    }
</style>

