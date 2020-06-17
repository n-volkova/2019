<template>
    <div class="section notClient-section">
        <div class="logo">Рокетбанк</div>
        <div class="flex-container">
            <div class="scramble-text text">У-упс! Кажется, вы ещё не клиент Рокета</div>
            <div class="small-text">Тоже хотите статистику? Закажите карту с бесплатным выпуском, доставкой и обслуживанием по кнопке ниже, и ровно через год мы порадуем вас увлекательными итогами
                <br>
                <br>
                А если ждать не хочется, в нашем мобильном приложении есть раздел «Аналитика», где статистику можно посмотреть в любой момент
            </div>
            <a class="big-button" :href="signupUrl" target="_blank">Заказать карту</a>
            <div class="small-text">Пока вы ждёте свою карту, предлагаем посмотреть, как провели этот год клиенты Рокетбанка</div>
            <div class="start-btn" @click="$emit('showCommonStats')">Посмотреть</div>
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
    computed: {
        signupUrl() {
            return window.SIGNUP_URL
        },
    }
}
</script>

<style lang="scss">
    .notClient-section {
        height: 100%;
        .text, 
        .logo {
            color: #fff;
        }
        .small-text {
            color: #fff;
            font-size: 50px;
            line-height: 60px;
            @media (max-width: 767px) {
                font-size: 21px;
                line-height: 1.2;
            }
        }
        .scramble-text {
            @media (min-width: 768px) {
                font-size: 65px;
                margin-bottom: 40px;
                line-height: 1.15;
            }

            @media (max-width: 767px) {
                font-size: 35px;
                line-height: 1;
                margin-bottom: 35px;
            }
        }
        .big-button {
            margin-left: 0;
            margin-right: 0;
            @media (min-width: 768px) {
                height: 150px;
                font-size: 75px;
                line-height: 150px;
            }
        }
        .start-btn {
            margin-top: 30px;
            margin-bottom: 30px;
            @media (min-width: 401px) and (max-width: 767px) {
            
            }

            @media (max-width: 400px) {
                height: 50px;
                font-size: 25px;
                line-height: 50px;
            }
        }
    }
</style>