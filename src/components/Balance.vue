<template>
    <div class="flex-container">
        <slot name="logo"></slot>
        <slot name="scramble"></slot>
        <div class="count" v-html="text"></div>
        <div class="wave" id="wave" :class="animated ? 'animated' : ''">
            <div class="white-bg"></div>
        </div>
    </div>
</template>

<script>
import decl from '@/utils/decl'
export default {
    data () {
        return {
            price: 50,
            animated: false
        }
    },
    computed: {
        text() {
            return this.formatNumber(this.$root.results.balance_percents_in_rub) + '&nbsp;<span class="rouble-sign">₽</span>'
        },
    },
    methods: {
        formatNumber(number) {
            return new Intl.NumberFormat('ru-RU').format(Math.round(number))
        },
        animate() {
            this.animated = true
        }, 
        reset() {
            this.animated = false
        }
    }
}
</script>

<style lang="scss">
    .balance-section {
        .count {
            color: #000000;
            line-height: 1.2;

            @media (min-width: 1820px) {
                font-size: 200px;
            }
            @media (min-width: 1200px) and (max-width: 1820px) {
                font-size: 130px;
            }
            @media (min-width: 768px) and (max-width: 1199px) {
                font-size: 87px;
            }
            @media (min-width: 400px) and (max-width: 767px) {
                font-size: 41px;
                text-align: center;
            }
            @media (max-width: 400px) {
                font-size: 30px;
                text-align: center;
            }
        }
        .wave {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 50%;
            margin-left: -25px;
            margin-right: -25px;
            background-image: url('~@/assets/wave.png');
            background-size: auto;
            background-repeat: repeat-x;
            .white-bg {
                height: 100%;
                margin-top: 50px;
                background-color: #fff;
            }
            
            &.animated {
                height: 0;
                transition: height 1s .4s linear, background-position-x 2s .4s linear;

                @media (min-width: 415px) {
                    background-position-x: 1500px;
                }
                @media (max-width: 414px) {
                    background-position-x: 300px;
                }
            }
        }
    }
</style>