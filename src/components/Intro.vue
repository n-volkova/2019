<template>
  <div class="intro">
    <full-page
      ref="fullpageIntro"
      id="fullpageIntro"
      :options="options"
      :class="faded && 'faded'"
    >
      <div class="section">
        <svg
          class="rocket-arrow"
          width="100%"
          height="100%"
          viewBox="0 0 1200 720"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
            stroke-linecap="square"
            stroke-linejoin="bevel"
          >
            <g
              transform="translate(-20.000000, -20.000000)"
              stroke="#FFFFFF"
              stroke-width="15"
            >
              <polyline
                id="Path-3"
                points="30 30 1217 380 30 730"
              />
            </g>
          </g>
        </svg>

        <canvas
          v-if="!droppedCompletely"
          id="introCanvas"
        />

        <div
          class="chevron-down"
          @click="scrollDown"
        />
      </div>
      <div
        class="section drop-further-section"
        id="dropFurther"
      >
        <div class="logo white">
          Рокетбанк
        </div>
        <canvas
          v-show="droppedCompletely"
          id="dropFurtherCanvas"
        />
        <div
          class="text"
          v-html="introText"
        />
        <div class="spacer" />

        <div
          class="start-btn"
          @click="getData"
        >
          Узнать
        </div>

        <footer>
          <p>
            КИВИ Банк (АО), <a
              href="https://qiwi.com/"
              target="_blank"
            >qiwi.com</a>, лицензия Банка России № 2241 от 22.01.2015 филиал Рокетбанк.
          </p>
        </footer>
      </div>
    </full-page>
  </div>
</template>

<script>

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
let RATIO;

if (WIDTH > 880) {
  RATIO = 1;
} else if (WIDTH < 880 && WIDTH > 600) {
  RATIO = .7;  
} else if (WIDTH < 600) {
  RATIO = .4;
}

const STAR = require('../assets/star.png');
const CIRCLE = require('../assets/circle.png');
const RECT = require('../assets/rect.png');

import { Engine, Render, World, Bodies } from 'matter-js';

export default {
  name: 'Intro',
  data () {
    return {
      current: 'intro',
      droppedCompletely: false,
      introText: 'Грядёт конец 2019 года, самое время узнать, как он прошёл у вас',
      options: {
        afterLoad: this.afterLoad,
        onLeave: this.onLeave,
        sectionsColor: ['#E6343A', '#E6343A'],
        licenseKey: process.env.VUE_APP_FULLPAGE_KEY
      },
      faded: false
    };
  },
  computed: {
    isMobile() {
      return WIDTH < 880;
    },
  },  
  mounted() {
    this.dropIntroTitle('#introCanvas');
  },
  methods: {
    dropIntroTitle(canvas) {
      const engine = Engine.create();

      const startBtn = document.querySelector('.start-btn');

      const render = Render.create({
        canvas: document.body.querySelector(canvas),
        engine: engine,
        options: {
          height: HEIGHT,
          width: WIDTH,
          background: 'transparent',
          wireframes: false
        }
      });

      const star = Bodies.circle(266 * RATIO, -266 * RATIO, 266 * RATIO, {
        render: {
          sprite: {
            texture: STAR,
            xScale: RATIO,
            yScale: RATIO,
          }
        }
      });

      const circle = Bodies.circle(WIDTH / 2, -150 * RATIO, 150 * RATIO, {
        render: {
          sprite: {
            texture: CIRCLE,
            xScale: RATIO,
            yScale: RATIO,
          }
        }
      });

      const rect = Bodies.rectangle(WIDTH - 311 * RATIO, -181 * RATIO, 622 * RATIO, 181 * RATIO, {
        angle: .78,
        render: {
          sprite: {
            texture: RECT,
            xScale: RATIO,
            yScale: RATIO,
          }
        }
      });

      let ground;

      if (canvas === '#introCanvas') {
        ground = Bodies.rectangle(WIDTH / 2, HEIGHT + 25, WIDTH, 50, { 
          isStatic: true, 
          render: { opacity: 0 } 
        });
      } else {
        ground = Bodies.rectangle(WIDTH / 2, startBtn.offsetTop + 25, WIDTH, 50, { 
          isStatic: true, 
          render: { opacity: 0 } 
        });
      }

      World.add(engine.world, [star, circle, rect,

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

    afterLoad(section, origin, destination) {
      this.current = origin.item.getAttribute('id');

      if (this.current === 'dropFurther' && !this.droppedCompletely) {
        this.dropIntroTitle('#dropFurtherCanvas');
        this.droppedCompletely = true;
      }
    },

    onLeave(section, origin, destination) {
      let current = origin.item.getAttribute('id');

      if (current === 'dropFurther') {
        this.disableScrolling();
      }
    },

    scrollDown() {
      this.$refs.fullpageIntro.api.moveSectionDown(); 
    },

    disableScrolling() {
      this.$refs.fullpageIntro.api.setAllowScrolling(false);
    },

    async getData() {
      await this.$http({
        url: './json/results.json',
        method: 'GET'

      }).then(res => {
        this.$root.results = Object.assign({}, this.$root.results, res.data);
        this.faded = true;
        setTimeout(() => {
          this.$emit('loginSuccess');
        }, 200);
      })
        .catch(error => {
          this.$emit('noData');
        });
    },
  }
};
</script>

<style lang="scss">
    .intro {
        min-height: 100vh;
        position: relative;
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
    #fullpageIntro {
        transition: opacity .2s ease;
        &.faded {
            opacity: 0;
        }
    }
    #introCanvas, 
    #dropFurtherCanvas {
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

