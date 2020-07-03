<template>
    <div class="day-night-bg flex-container">

        <slot name="logo"></slot>
        <slot name="scramble"></slot>

        <div id="nightBg">
            <div v-if="!isMobile" class="score" :class="nightPercentage > dayPercentage ? 'biggest-score' : ''">
                <div class="score-title">Ночью:</div>
                <div class="score-digits">{{ nightPercentage }}%</div>
            </div>
        </div>
        <div id="dayBg">
            <div v-if="!isMobile" class="score" :class="nightPercentage < dayPercentage ? 'biggest-score' : ''">
                <div class="score-title">Днём:</div>
                <div class="score-digits">{{ dayPercentage }}%</div>
            </div>
        </div>

        <div v-if="isMobile" class="score">
            <div class="mobile-score">
                <div class="score-title">Ночью:</div>
                <div class="score-digits">{{ nightPercentage }}%</div>
            </div>

            <div class="mobile-score">
                <div class="score-title">Днём:</div>
                <div class="score-digits">{{ dayPercentage }}%</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isMobile: {
            type: Boolean
        },
    },
    data () {
        return {
            DAY: null,
            NIGHT: null,
            showScores: false
        }
    },
    computed: {
        nightPercentage() {
            return Math.round(this.$root.results.time_transactions['18:00 - 05:59'])
        },
        dayPercentage() {
            return Math.round(100 - this.nightPercentage)
        },
    },
    mounted() {
        this.DAY = document.querySelector('#dayBg')
        this.NIGHT = document.querySelector('#nightBg')
    },
    methods: {
        animate() {
            this.DAY.style.width = this.dayPercentage + '%'
            this.DAY.style.left = this.nightPercentage + '%'
            this.NIGHT.style.width = this.nightPercentage + '%'

            this.showScores = true
        }
    }
}
</script>

<style lang="scss">
    .dayNight-section {
        .fp-tableCell {
            @media (min-width: 800px) {
                justify-content: flex-start;
            }
        }
        .text,
        .logo {
            color: #fff;
        }
        .day-night-bg {
            @media (max-width: 799px) {
                order: 1;
                color: #fff;
            }
        }
        #dayBg, 
        #nightBg {
            position: absolute;
            top: 0;
            display: flex;
            align-items: flex-end;
            width: 50%;
            height: 100%;
            padding-left: 20px;
            mix-blend-mode: difference;
            transition: all .3s linear;
            overflow: hidden;
            pointer-events: none;
        }
        #nightBg {
            left: 0;
            background-color: #151515;
            color: #fff;
        }
        #dayBg {
            left: 50%;
            background-color: #d8d8d8;
            color: #000;
        }
        .score-title {
            @media (min-width: 768px) {
                font-size: 30px;
                line-height: 1;
            }
            @media (max-width: 767px) {
                font-size: 20px;
            }
        }
        .score-digits {
            text-align: left;
            line-height: 1; 
            @media (min-width: 1570px) {
                font-size: 70px;
            }
            @media (min-width: 1200px) and (max-width: 1569px) {
                font-size: 50px;
            }
            @media (min-width: 768px) and (max-width: 1199px) {
                font-size: 55px;
            }
            @media (max-width: 767px) {
                font-size: 35px;
            }
        }
        .mobile-score {
            margin-bottom: 20px;
            color: #fff;
        }
        
        .biggest-score {
            .score-title {
                @media (min-width: 800px) {
                    font-size: 50px;
                    line-height: 1;
                }
            }
            .score-digits {
                @media (min-width: 1570px) {
                    font-size: 120px;
                    line-height: 1; 
                }
                @media (min-width: 1200px) and (max-width: 1569px) {
                    font-size: 70px;
                    line-height: 1; 
                }
                @media (min-width: 880px) and (max-width: 1199px) {
                    font-size: 67px;
                    line-height: 1; 
                }
                @media (max-width: 879px) {
                    font-size: 46px;
                    line-height: 1.4;
                }
            }
        }
    }
</style>