import Vue from 'vue';
import App from './App.vue';

import 'fullpage.js/vendors/scrolloverflow.js';
import 'fullpage.js/dist/fullpage.css';
import VueFullPage from 'vue-fullpage.js';
import axios from 'axios';

Vue.use(VueFullPage);

Vue.config.productionTip = false;

Vue.prototype.$http = axios;

new Vue({
  data: function() {
    return { 
      results: {
        days_transactions: { 
          '1.0': '',
          '2.0': '',
          '3.0': '',
          '4.0': '',
          '5.0': '',
          '6.0': '',
          '7.0': ''
        },
        time_transactions: {
          '18:00 - 05:59': '',
          '6:00 - 17:59': ''
        },
        favorite_places_cashback: null,
        cashback_sum: null,
        balance_percents_in_rub: null,
        popular_category: { 
          'Рестораны и кафе': ''
        },
        invited_friends: null
      }
    };
  },
  render: h => h(App)
}).$mount('#app');
