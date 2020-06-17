<template>
    <div>
        <full-page ref="fullpageMain" id="fullpageMain" class="fullpage-main" :skip-init="true" :options="options">
            <div 
                v-for="section in sections" 
                class="section" 
                :class="[`${section}-section`, section !== 'newFeatures' ? 'fp-noscroll' : '']"
                :id="section" 
                :key="section">
                
                <component 
                    :is="section"
                    :ref="section"
                    :isMobile="isMobile"
                    :results="results"
                    @scrollDown="scrollDown"
                >
                    <template v-slot:logo>
                        <div class="logo">Рокетбанк</div>
                    </template>
                    <template v-slot:scramble>
                        <div class="text scramble-text" v-html="texts[section]"></div>
                    </template>
                </component>
            </div>
        </full-page>
    </div>
</template>

<script>

import Ready from '../components/Ready.vue'
import Days from '../components/Days.vue'
import DayNight from '../components/DayNight.vue'
import Love from '../components/Love.vue'
import Cashback from '../components/Cashback.vue'
import Balance from '../components/Balance.vue'
import TopCategory from '../components/TopCategory.vue'
import Friends from '../components/Friends.vue'
import Share from '../components/Share.vue'
import NewFeatures from '../components/NewFeatures.vue'
import { setTimeout } from 'timers'

export default {
    name: 'Total',
    components: {
        Ready, Days, DayNight, Love, Cashback, Balance, TopCategory, Friends, Share, NewFeatures
    },
    props: {
        results: {
            type: Object
        }
    },
    data () {
        return {
            dayNightCounted: false,
            daysCounted: false,
            current: '',
            prev: ''
        }
    },

    computed: {
        isMobile() {
            return window.innerWidth < 880
        },

        options() {
            if (window.IS_CLIENT) {
                return {
                    licenseKey: '6E8F5101-0A6A4218-AEC61F0C-EF812275',
                    css3: true,
                    afterLoad: this.afterLoad,
                    onLeave: this.onLeave,
                    lazyLoading: false, 
                    scrollingSpeed: 1000,
                    scrollOverflow: true,
                    sectionsColor: ['#E6343A', '#39B3A6', 'transparent', '#06381E', '#FFB0C8', '#DFE948', '#DFD5CB', '#2BA375', '#E6343A', '#FFFFFF']
                }
            } else if (!window.IS_CLIENT) {
                return {
                    licenseKey: '6E8F5101-0A6A4218-AEC61F0C-EF812275',
                    css3: true,
                    afterLoad: this.afterLoad,
                    onLeave: this.onLeave,
                    lazyLoading: false, 
                    scrollingSpeed: 1000,
                    scrollOverflow: true,
                    sectionsColor: ['#39B3A6', 'transparent', '#06381E', '#FFB0C8', '#DFE948', '#DFD5CB', '#2BA375', '#FFFFFF']
                }
            }
        },

        sections() {
            if (window.IS_CLIENT) {
                return ['ready', 'days', 'dayNight', 'love', 'cashback', 'balance', 'topCategory', 'friends', 'share', 'newFeatures']

            } else if (!window.IS_CLIENT || window.NO_DATA) {
                return ['days', 'dayNight', 'love', 'cashback', 'balance', 'topCategory', 'friends', 'newFeatures']
            }
        },

        texts() {
            if (window.IS_CLIENT) {
                return {
                    ready: 'Мы всё посчитали! Приготовьтесь, сейчас вас ждёт увлекательное путешествие в прошлое вашей карты',
                    days: 'В какие дни недели вы позволяли себе немножко больше обычного',
                    dayNight: 'Сова или жаворонок? Вечный вопрос… Чтобы узнать ответ, не обязательно проходить тест на определение хронотипа, достаточно взглянуть на нашу статистику трат по времени суток',
                    love: 'Как часто и как сильно вы любили наши Любимые места и сколько рокетрублей накопили за этот год благодаря программе лояльности',
                    cashback: 'Сколько всего рокетрублей вы заработали, пока тратили с Рокетбанком',
                    balance: 'Остатки сладки, не так ли? Вот и проверим, сколько сладких процентов на остаток вам накапало за этот год',
                    topCategory: 'На вкус и цвет все фломастеры разные: кто-то любит ездить на такси, кто-то пить кофе, а вот вашей любимой категорией в этом году была',
                    friends: 'Друзей много не бывает, особенно друзей в Рокетбанке. Посмотрите, сколько друзей вы пригласили в этом году',
                    share: `В этом году вы<br>${this.shareText}`
                }
            } else {
                return {
                    ready: 'У-упс! Кажется вы ещё не клиент Рокета.',
                    days: 'Рассказываем, в какие дни недели наши клиенты позволяли себе больше обычного',
                    dayNight: 'Сова или жаворонок? Вечный вопрос… Чтобы узнать ответ, нашим клиентам не обязательно проходить тест на определение хронотипа, достаточно взглянуть на статистику трат по времени суток',
                    love: 'Как часто и как сильно клиенты любили наши Любимые места и сколько рокетрублей накопили за этот год благодаря программе лояльности',
                    cashback: 'Сколько всего рокетрублей заработали наши клиенты, пока тратили с Рокетбанком',
                    balance: 'Остатки сладки, не так ли? Всем нашим клиентам падает 4,5% на остаток каждый месяц. Вот сколько сырков В.Я. Алексеев можно было бы купить на кругленькую сумму, скопившуюся за год',
                    topCategory: 'На вкус и цвет все фломастеры разные: кто-то любит ездить на такси, кто-то пить кофе, а среди всех клиентов любимой категорией в этом году была',
                    friends: 'Друзей много не бывает, особенно друзей в Рокетбанке. Посмотрите, сколько друзей наши клиенты пригласили в этом году',
                    share: `В этом году вы<br>${this.shareText}`
                }
            }
        },

        shareId() {
            // let path = this.$route.path.match(/\/[1-7]/g)           
            // let shareId = path[0].replace(/\//g, '')
            // return shareId
            return 3
        },

        shareText() {
            let texts = ['много волновались', 'были в поиске ответов', 'не научились меньше тратить', 'ЪУЪ', 'были просто крэйзи', 'были недовольным котиком', 'захватывали дух',]
            return texts[this.shareId - 1]
        },
    },

    mounted() {
        this.current = this.sections[0]
        this.$refs.fullpageMain.init()
    },

    methods: {
        afterLoad(section, origin, destination) {
            this.prev = section.item.getAttribute('id')

            if (this.current === 'dayNight' && !this.dayNightCounted) {
                this.$refs.dayNight[0].animate()
                this.dayNightCounted = true

            } else if (this.current === 'days' && !this.daysCounted) {
                this.$refs.days[0].animate()
                this.daysCounted = true

            } else if (this.current === 'balance') {
                this.$refs.balance[0].animate()

            } else if (this.current === 'topCategory') {
                this.$refs.topCategory[0].animate()

            } else if (this.current === 'friends') {
                this.$refs.friends[0].animate()
            }

            if (this.prev === 'topCategory') {
                this.$refs.topCategory[0].reset()

            } else if (this.prev === 'balance') {
                this.$refs.balance[0].reset()

            } else if (this.prev === 'friends') {
                this.$refs.friends[0].reset()
            }
        },

        onLeave(section, origin, destination) {
            this.current = origin.item.getAttribute('id')

            if (this.current === 'love') {
                this.$refs.love[0].dropHeart('#loveCanvas')

            } else if (this.current === 'cashback') {
                this.$refs.cashback[0].animate()

            }
        },

        scrollDown() {
            this.$refs.fullpageMain.api.moveSectionDown() 
        }
    }
}
</script>

<style lang="scss">

.logo {
    color: #000;
    &.white {
        color: #fff;
    }
}

.text {
    color: #000;
    @media (min-width: 1200px) {
        font-size: 42px;
        line-height: 1.2;
    }
    @media (min-width: 768px) and (max-width: 1199px) {
        font-size: 42px;
        line-height: 1.2;
    }

    @media (min-width: 500px) and (max-width: 767px) {
        font-size: 30px;
        line-height: 1.36;
    }

    @media (min-width: 400px) and (max-width: 767px) {
        font-size: 20px;
        line-height: 1.2;
    }

    @media (max-width: 400px) {
        font-size: 18px;
        line-height: 1.2;
    }
}

.flex-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding-top: 80px;
    overflow: hidden;
}

.love-section {
    .text,
    .logo {
        color: #fff;
    }
}

.days-section, 
.dayNight-section {
    .fp-tableCell {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-top: 0;
        vertical-align: top;
    }
}

</style>
