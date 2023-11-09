<template>
  <div>
    <full-page
      ref="fullpageMain"
      id="fullpageMain"
      class="fullpage-main"
      :skip-init="true"
      :options="options"
    >
      <div 
        v-for="section in sections" 
        class="section" 
        :class="[`${section}-section`, section !== 'newFeatures' ? 'fp-noscroll' : '']"
        :id="section" 
        :key="section"
      >
        <component 
          :is="section"
          :ref="section"
          :is-mobile="isMobile"
          @scrollDown="scrollDown"
        >
          <template #logo>
            <div class="logo">
              Рокетбанк
            </div>
          </template>
          <template #scramble>
            <scramble-text
              class="text scramble-text"
              :ref="`${section}Text`"
              :text="texts[section]"
            />
          </template>
        </component>
      </div>
    </full-page>
  </div>
</template>

<script>
import ScrambleText from './VueScrambleText.vue';
import Ready from './Ready.vue';
import Days from './Days.vue';
import DayNight from './DayNight.vue';
import Love from './Love.vue';
import Cashback from './Cashback.vue';
import Balance from './Balance.vue';
import TopCategory from './TopCategory.vue';
import Friends from './Friends.vue';
import Share from './Share.vue';
import NewFeatures from './NewFeatures.vue';

export default {
  name: 'Total',
  components: {
    ScrambleText, Ready, Days, DayNight, Love, Cashback, Balance, TopCategory, Friends, Share, NewFeatures
  },
  data () {
    return {
      dayNightCounted: false,
      daysCounted: false,
      current: '',
      prev: '',
      options: {
        css3: true,
        afterLoad: this.afterLoad,
        onLeave: this.onLeave,
        scrollOverflow: true,
        licenseKey: process.env.VUE_APP_FULLPAGE_KEY,
        sectionsColor: ['#E6343A', '#39B3A6', 'transparent', '#06381E', '#FFB0C8', '#DFE948', '#DFD5CB', '#2BA375', '#E6343A', '#FFFFFF']
      },
      sections: ['ready', 'days', 'dayNight', 'love', 'cashback', 'balance', 'topCategory', 'friends', 'share', 'newFeatures'],
      texts: {
        ready: 'Мы всё посчитали! Приготовьтесь, сейчас вас ждёт увлекательное путешествие в прошлое вашей карты',
        days: 'В какие дни недели вы позволяли себе немножко больше обычного',
        dayNight: 'Сова или жаворонок? Вечный вопрос… Чтобы узнать ответ, не обязательно проходить тест на определение хронотипа, достаточно взглянуть на нашу статистику трат по времени суток',
        love: 'Как часто и как сильно вы любили наши Любимые места и сколько рокетрублей накопили за этот год благодаря программе лояльности',
        cashback: 'Сколько всего рокетрублей вы заработали, пока тратили с Рокетбанком',
        balance: 'Остатки сладки, не так ли? Вот и проверим, сколько сладких процентов на остаток вам накапало за этот год',
        topCategory: 'На вкус и цвет все фломастеры разные: кто-то любит ездить на такси, кто-то пить кофе, а вот вашей любимой категорией в этом году была',
        friends: 'Друзей много не бывает, особенно друзей в Рокетбанке. Посмотрите, сколько друзей вы пригласили в этом году',
        share: 'В этом году вы не научились меньше тратить'
      }
    };
  },

  computed: {
    isMobile() {
      return window.innerWidth < 880;
    }
  },

  mounted() {
    this.current = this.sections[0];
    this.$refs.fullpageMain.init();
  },

  methods: {
    afterLoad(section, origin, destination) {
      this.prev = section.item.getAttribute('id');

      if (this.current === 'dayNight' && !this.dayNightCounted) {
        this.$refs.dayNight[0].animate();
        this.dayNightCounted = true;

      } else if (this.current === 'days' && !this.daysCounted) {
        this.$refs.days[0].animate();
        this.daysCounted = true;

      } else if (this.current === 'balance') {
        this.$refs.balance[0].animate();

      } else if (this.current === 'topCategory') {
        this.$refs.topCategory[0].animate();

      } else if (this.current === 'friends') {
        this.$refs.friends[0].animate();
      }

      if (this.prev === 'topCategory') {
        this.$refs.topCategory[0].reset();

      } else if (this.prev === 'balance') {
        this.$refs.balance[0].reset();

      } else if (this.prev === 'friends') {
        this.$refs.friends[0].reset();
      }
    },

    onLeave(section, origin) {
      this.current = origin.item.getAttribute('id');
      if (this.$refs[`${this.current}Text`]) {
        if (this.isMobile) {
          this.$refs[`${this.current}Text`][0].text = this.texts[this.current];
        } else {
          setTimeout(() => {
            this.$refs[`${this.current}Text`][0].setText('', this.texts[this.current]);
          }, 200);
        }
      }

      if (this.current === 'love') {
        this.$refs.love[0].dropHeart('#loveCanvas');

      } else if (this.current === 'cashback') {
        this.$refs.cashback[0].animate();
      }
    },

    scrollDown() {
      this.$refs.fullpageMain.api.moveSectionDown(); 
    }
  }
};
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
