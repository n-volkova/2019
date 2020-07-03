<template>
    <div class="flex-container">
        <slot name="logo"></slot>
        <slot name="scramble"></slot>
        <div id="daysWrapper">
            <div class="weekday" id="mon">
                <div>Пн</div>
            </div>
            <div class="weekday" id="tue">
                <div>Вт</div>
            </div>
            <div class="weekday" id="wed">
                <div>Ср</div>
            </div>
            <div class="weekday" id="thu">
                <div>Чт</div>
            </div>
            <div class="weekday" id="fri">
                <div>Пт</div>
            </div>
            <div class="weekday" id="sat">
                <div>Сб</div>
            </div>
            <div class="weekday" id="sun">
                <div>Вс</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            weekdays: []
        }
    },
    computed: {
        chartPercents() {
            let percents = []

            for (let weekday in this.$root.results.days_transactions) {
                percents.push(Math.round(+this.$root.results.days_transactions[weekday]))
            }

            let biggest = Math.max(...percents)
            let chartPercents = percents.map(function(value) {
                return Math.round(value / biggest * 100)
            })
            return chartPercents
        }
    },
    mounted() {
        this.weekdays = Array.prototype.slice.call(document.querySelectorAll('.weekday'))
    },
    methods: {
        animate() {
            this.weekdays.forEach((weekday, index) => {
                weekday.style.height = this.chartPercents[index] + '%'
            })
        }
    }
}
</script>

<style lang="scss">
    #days {
        padding-left: 0;
        padding-right: 0;
        .text {
            margin: 0 25px;
        }
    }
    #daysWrapper {
        display: flex;
        flex-direction: row;
        flex-shrink: 0;
        align-items: flex-end;
        padding-top: 20px;
        @media (min-width: 800px) {
            height: 60%;
        }
        @media (max-width: 879px) {
            height: 50%;
        }
    }

    .weekday {
        position: relative;
        flex-grow: 1;
        height: 0;
        background: #E6343A;
        transition: height .3s linear;
        border: 1px solid rgba(0, 0, 0, .2);
        color: #000;
        
        @media (min-width: 768px) {
            padding-left: 20px;
            font-size: 50px;
            line-height: 2;
            div {
                margin-top: -80px;
            }
        }

        @media (max-width: 767px) {
            text-align: center;
            font-size: 22px;
            line-height: 2;
            div {
                margin-top: -40px;
            }
        }
    }
</style>