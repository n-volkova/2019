import Vue from 'vue'
import App from './App.vue'

import 'fullpage.js/vendors/scrolloverflow'
import 'fullpage.js/dist/fullpage.css'
import VueFullPage from 'vue-fullpage.js'

Vue.use(VueFullPage)

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    mounted: () => document.dispatchEvent(new Event("x-app-rendered")),
}).$mount('#app')
