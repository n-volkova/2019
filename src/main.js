import Vue from 'vue'
import App from './App.vue'
// import Stampede from 'stampede2/src/stampede2'
// import VueHead from 'vue-head'

import 'fullpage.js/vendors/scrolloverflow'
import 'fullpage.js/dist/fullpage.css'
import VueFullPage from 'vue-fullpage.js'

// import router from './router'

// Vue.use(VueHead)
Vue.use(VueFullPage)
// Vue.use(Stampede, {
//     view: 'with-button',

//     bg_color: 'transparent',
//     btn_text: 'Ок',
//     btn_text_color: '#000',
//     accent_color: '#FFF',
//     text_color: '#000',
//     spinner_size: 60,

//     api_url: 'https://rocketbank.ru/api/marketing/orders/2019', // test

//     phone_step: {
//         title: 'Телефон',
//         text: 'Введите номер телефона',
//         gtag: 'send phone'
//     }
// })

Vue.config.productionTip = false

new Vue({
    // router,
    render: h => h(App),
  mounted: () => document.dispatchEvent(new Event("x-app-rendered")),
}).$mount('#app')
