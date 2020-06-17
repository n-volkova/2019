<template>
    <div class="flex-container">
        <slot name="logo"></slot>
        <slot name="scramble"></slot>

        <div class="spacer"></div>
        <div class="cashback-sum">
            <vue-odometer 
                class="cashback-digit odometer" 
                v-for="(digit, index) in cashback" 
                :key="index" 
                :duration="600" 
                animation="smooth" 
                :value="+digit"
            />
        </div>

        <div class="spacer"></div>

        <div v-if="isClient" class="text bottom-text">В следующем году может быть больше, если пользоваться нашим новым разделом <a href="https://cashback.rocketbank.ru" target="_blank">«Больше кешбэка»</a>. О том, как тратить рокетрубли, можно прочитать <a href="https://rocketbank.ru/rocketrubles" target="_blank">тут</a></div>
    </div>
</template>

<script>

import VueOdometer from 'v-odometer/src'
import { setTimeout } from 'timers';

export default {
    components: {
        VueOdometer
    },
    props: {
        isMobile: {
            type: Boolean
        },
    },
    data () {
        return {
            cashback: '',
            digitElements: null,
        }
    },
    computed: {

        isClient() {
            return window.IS_CLIENT
        },
    },
    methods: {
        animate() {
            this.reset()
            setTimeout(() => {
                this.cashback = window.RESULTS.cashback_sum + ''
            }, 0)
        },
        reset() {
            this.cashback = (window.RESULTS.cashback_sum + '').replace(/\d/g, '0')
        }
    }
}
</script>

<style lang="scss">
    .cashback-sum {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .cashback-section {
        a {
            color: #000;
            text-decoration: underline;
        }
        .bottom-text {
            margin-bottom: 20px;
        }
    }
    .cashback-digit {
        padding: 0px 10px;
        margin-right: 15px;
        color: #000000;
        text-align: center;
        background: #FFFFFF;
        border: 5px solid #000000;
        border-radius: 30px;
        overflow: hidden;
        &:last-of-type {
            margin-right: 0;
        }

        @media (min-width: 1750px) {
            font-size: 240px;
        }

        @media (min-width: 1220px) and (max-width: 1749px) {
            font-size: 150px;
        }

        @media (min-width: 1061px) and (max-width: 1219px) {
            font-size: 130px;
        }

        @media (min-width: 768px) and (max-width: 1060px) {
            font-size: 90px;
            padding: 0px 5px;
            border-radius: 7px;
            margin-right: 2px;
            border: 2px solid #000000;
        }

        @media (min-width: 400px) and (max-width: 767px) {
            font-size: 42px;
            padding: 0px 5px;
            border-radius: 7px;
            margin-right: 2px;
            border: 2px solid #000000;
        }
        @media (max-width: 400px) {
            font-size: 38px;
            padding: 0px 2px;
            border-radius: 7px;
            margin-right: 2px;
            border: 2px solid #000000;
        }
    }
</style>