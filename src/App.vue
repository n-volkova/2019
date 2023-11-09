<template>
  <div id="app">
    <transition
      name="fade"
      mode="out-in"
    >
      <component 
        :is="current"
        @loginSuccess="onLoginSuccess"
      />
    </transition>
  </div>
</template>

<script>

import Intro from './components/Intro.vue';
import Total from './components/Total.vue';

export default {
  name: 'App',
  components: {
    Intro, Total
  },
  data () {
    return {
      current: 'intro'
    };
  },
  methods: {
    onLoginSuccess() {
      this.current = 'total';
    },
  }
};

</script>

<style lang="scss">

@import './styles/fonts.scss';
@import './styles/main.scss';
@import './styles/animations.scss';
@import './styles/odometer.scss';

#app {
	position: relative;
	background-color: #E6343A;
}
.section {
	padding: 0 25px;
}
.spacer {
	flex-grow: 1;
}
.logo {
	position: absolute;
	top: 18px;
	left: 25px;
	font-size: 26px;
	color: #fff;
	font-weight: 600;
	@media (max-width: 879px) {
		font-size: 22px;
	}
}
.rouble-sign {
	font-family: pragmatica-extended;
	font-weight: 300;
}
</style>