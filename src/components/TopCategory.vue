<template>
    <div class="flex-container">
        <slot name="logo"></slot>
        <slot name="scramble"></slot>
        <div v-if="isMobile" class="spacer"></div>
        <div class="categories-container" :class="[animated ? 'animated' : '', categories[topCat]]"></div>
        <div v-if="isMobile" class="spacer"></div>
        <div class="bottom-text" :class="animated ? 'animated' : ''" v-html="topCat"></div>
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
            categories: {
                'Автосервис': 'key',
                'Аксессуары и сумки': 'clothes',
                'Активный отдых': 'ball',
                'Аптека': 'pill',
                'Аренда авто': 'key',
                'Бары, клубы, дискотеки': 'martini',
                'Бизнес-услуги': 'tie',
                'Билеты': 'passport',
                'Бытовые услуги': 'key',
                'Госуслуги': 'gosuslugi',
                'Детская': 'baloon',
                'Дом': 'key',
                'Домашние животные': 'pet',
                'Доход': 'cash',
                'Заправка': 'car',
                'Интернет и связь': 'web',
                'Кино, театр, концерты': 'music',
                'Комиссия': 'cash',
                'Коммунальные услуги': 'gosuslugi',
                'Косметика': 'beauty',
                'Красота и здоровье': 'beauty',
                'Магазин у дома': 'banana',
                'Медицина': 'pill',
                'Мужская': 'tie',
                'Образование': 'education',
                'Одежда': 'clothes',
                'Оплата': 'cash',
                'Отель': 'key',
                'Перевод денег': 'cash',
                'Подарки': 'baloon',
                'Продукты': 'banana',
                'Проезд': 'car',
                'Путешествия': 'passport',
                'Развлечения': 'baloon',
                'Ремонт': 'key',
                'Рестораны и кафе': 'pizza',
                'Сад': 'beauty',
                'Салон красоты': 'beauty',
                'Сигареты и алкоголь': 'martini',
                'Смена ПИНа': 'key',
                'Снятие наличных': 'cash',
                'Софт, музыка, видео': 'music',
                'Спорт': 'ball',
                'Страхование': 'passport',
                'Супермаркеты': 'banana',
                'Техника': 'tv',
                'Товары для дома': 'key',
                'Транспорт': 'car',
                'Услуги': 'gosuslugi'
            },
            animated: false
        }
    },
    computed: {
        topCat() {
            return Object.keys(window.RESULTS.popular_category)[0]
        },
    },
    methods: {
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
    .topCategory-section {
        padding-left: 0;
        padding-right: 0;
        .scramble-text {
            margin-left: 25px;
            margin-right: 25px;
        }
        .bottom-text {
            margin-left: 25px;
            margin-right: 25px;
            color: #000000;
            line-height: 1.2;
            transform: translateY(100%);

            &.animated {
                animation: fadeInUp .2s linear both;
            }
            @keyframes fadeInUp {
                to {
                    transform: translate3d(0, 0%, 0);
                }
            }

            @media (min-width: 1820px) {
                font-size: 105px;
            }
            @media (min-width: 1200px) and (max-width: 1820px) {
                font-size: 105px;
            }
            @media (min-width: 768px) and (max-width: 1199px) {
                font-size: 90px;
                text-align: center;
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
        .categories-container {
            width: 100%;
            background-repeat: round;
            background-position-y: bottom;
            background-size: contain;
            &.animated {
                animation: slide 5s linear infinite;
            }

            @media (min-width: 880px) {
                height: 300px;
            }
            @media (min-width: 400px) and (max-width: 879px) {
                height: 200px;
            }
            @media (max-width: 400px) {
                flex-grow: 1;
            }
        }
        @keyframes slide {
            from { background-position: 0 bottom; }
            to { background-position: 100% bottom; }
        }
        .banana {
            background-image: url('~@/assets/banana.png');
        }
        .tie {
            background-image: url('~@/assets/tie.png');
        }
        .beauty {
            background-image: url('~@/assets/beauty.png');
        }
        .key {
            background-image: url('~@/assets/key.png');
        }
        .passport {
            background-image: url('~@/assets/passport.png');
        }
        .pizza {
            background-image: url('~@/assets/pizza.png');
        }
        .gosuslugi {
            background-image: url('~@/assets/gosuslugi.png');
        }
        .education {
            background-image: url('~@/assets/education.png');
        }
        .clothes {
            background-image: url('~@/assets/clothes.png');
        }
        .baloon {
            background-image: url('~@/assets/baloon.png');
        }
        .tv {
            background-image: url('~@/assets/tv.png');
        }
        .pill {
            background-image: url('~@/assets/pill.png');
        }
        .cash {
            background-image: url('~@/assets/cash.png');
        }
        .martini {
            background-image: url('~@/assets/martini.png');
        }
        .car {
            background-image: url('~@/assets/car.png');
        }
        .pet {
            background-image: url('~@/assets/pet.png');
        }
        .ball {
            background-image: url('~@/assets/ball.png');
        }
        .music {
            background-image: url('~@/assets/music.png');
        }
        .web {
            background-image: url('~@/assets/web.png');
        }
    }
</style>