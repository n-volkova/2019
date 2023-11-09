<template>
  <div class="flex-container">
    <slot name="logo" />

    <div class="links-container">
      <div class="feature-link checkpoint">
        Чекпоинт —<br />наш первый<br />кредитный<br />продукт
      </div>
      <div class="feature-link smart">
        Запустили<br />Умный счёт
      </div>
      <div class="feature-link refill">
        Пополнение карты<br />в салонах Связного,<br />Евросети и Мегафона
      </div>
      <div class="feature-link vtb">
        Точки<br />пополнения<br />ВТБ
      </div>
      <div class="feature-link design">
        Дизайн карт <br />в Apple/<br />Google/<br />Samsung Pay
      </div>
      <div class="feature-link quick">
        Подключились<br />к Системе быстрых<br />платежей
      </div>
      <div class="feature-link deaf">
        Рокетбанк без границ — адаптировали<br />сервисы для слабослышащих клиентов
      </div>
      <div class="feature-link virtual">
        Виртуальные<br />карты
      </div>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss">
    .newFeatures-section {
        padding-left: 0;
        padding-right: 0;
        .flex-container {
          padding-top: 0;
          flex-direction: column;
          justify-content: center;
          align-items: center;

            @media (min-width: 767px) {
                overflow: auto;
            }
        }
        footer {
            color: #000;
            padding-bottom: 10px;
        }
    }
    .links-container {
        position: relative;
        width: 1140px;
        height: 725px;
        margin-left: 25px;
        margin-right: 25px;
        @media (min-width: 768px) and (max-width: 1140px) {
            width: 768px;
            height: 497px;
            margin-top: 10px;
            margin-left: 5px;
            margin-right: 5px;
        }
        @media (max-width: 767px) {
            width: 320px;
            height: 695px;
            margin: -30px auto 0;
        }
    }
    .feature-link {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        font-size: 38px;
        line-height: 47px;
        color: #000000;
        text-align: center;
        text-decoration: none;
        transition: all .1s linear;

        @media (min-width: 768px) and (max-width: 1140px) {
            font-size: 27px;
            line-height: 35px;
        }
        @media (max-width: 767px) {
            font-size: 19px;
            line-height: 23px;
        }
        &:hover {
            z-index: 3;
            transform: translate3d(-10px, -10px, 0);
            filter: drop-shadow(10px 10px #000);
        }
    }
    .smart {
        top: 33px;
        right: 0;
        width: 386px;
        height: 374px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image: url('~@/assets/smart.svg');
        @media (min-width: 768px) and (max-width: 1140px) {
            width: 248px;
            height: 249px;
            right: 0;
            top: 0;
        }
        @media (max-width: 767px) {
            width: 191px;
            height: 177px;
            right: 0;
        }
    }
    .checkpoint {
        top: 70px;
        left: 0;
        width: 356px;
        height: 286px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image: url('~@/assets/checkpoint.svg');
        @media (min-width: 768px) and (max-width: 1140px) {
            width: 253px;
            height: 189px;
            top: 20px;
            left: 0;
            z-index: 1;
        }
        @media (max-width: 767px) {
            top: 111px;
            left: 0;
            width: 175px;
            height: 137px;
        }
    }
    .quick {
        top: 276px;
        right: -3px;
        width: 479px;
        height: 315px;
        justify-content: flex-start;
        padding-left: 16px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image: url('~@/assets/quick.svg');
        @media (min-width: 768px) and (max-width: 1140px) {
            right: 0;
            top: 121px;
            bottom: unset;
            width: 302px;
            height: 273px;
        }
        @media (max-width: 767px) {
            top: 189px;
            right: 0;
            bottom: unset;
            width: 218px;
            height: 157px;
            padding-left: 10px;
        }
    }
    .refill {
        top: 25px;
        left: 299px;
        width: 535px;
        background: #FFB0C8;
        border: 5px solid #000000;

        @media (min-width: 768px) and (max-width: 1140px) {
            width: auto;
            top: 0;
            left: 222px;
            z-index: 0;
            border: 3px solid #000000;
        }
        @media (max-width: 767px) {
            width: 153px;
            height: 175px;
            top: 400px;
            left: unset;
            right: 14px;
            border: 2px solid #000000;
            z-index: 1;
        }
    }
    .design {
        top: 213px;
        left: 330px;
        width: 374px;
        height: 374px;
        background: #FF9738;
        border: 5px solid #000000;
        border-radius: 50%;
        
        @media (min-width: 768px) and (max-width: 1140px) {
            width: 263px;
            height: 253px;
            top: 128px;
            left: 228px;
            border: 3px solid #000000;
        }
        @media (max-width: 767px) {
            width: 164px;
            height: 164px;
            z-index: 1;
            left: 0;
            top: 368px;
            border: 2px solid #000000;
        }
    }
    .deaf {
        top: 552px;
        width: 830px;
        padding: 20px 5px;
        background: #95D7CB;
        border: 5px solid #000000;
        @media (min-width: 768px) and (max-width: 1140px) {
            top: 379px;
            width: 549px;
            border: 3px solid #000000;
        }
        @media (max-width: 767px) {
            top: 553px;
            width: 100%;
            padding: 20px 5px;
            border: 2px solid #000000;
            z-index: 0;
        }
    }
    .virtual {
        top: 552px;
        right: -3px;
        width: 339px;
        background: #7B70E9;
        border: 5px solid #000000;
        border-radius: 50px;
        z-index: 1;
        @media (min-width: 768px) and (max-width: 1140px) {
            width: 224px;
            border-radius: 34px;
            top: 341px;
            right: 0;
            border: 3px solid #000000;
        }
        @media (max-width: 767px) {
            top: 287px;
            left: 9px;
            width: 146px;
            z-index: 4;
            border-radius: 33px;

            border: 2px solid #000000;
        }
    }
    .vtb {
        top: 361px;
        z-index: 1;
        width: 373px;
        background: #E6343A;
        border: 5px solid #000000;
        border-radius: 50%;
        @media (min-width: 768px) and (max-width: 1140px) {
            width: 260px;
            top: 216px; 
            left: 0;
            border: 3px solid #000000;
        }
        @media (max-width: 767px) {
            right: 4px;
            width: 157px;
            height: 96px;
            z-index: 2;
            top: 322px;
            border: 2px solid #000000;
        }
    }
</style>