import Vue from 'vue'
import Router from 'vue-router'

import Client from './views/Client.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Client,
        },
        {
            path: '/1',
            component: Client,
        },
        {
            path: '/2',
            component: Client,
        },
        {
            path: '/3',
            component: Client,
        },
        {
            path: '/4',
            component: Client,
        },
        {
            path: '/5',
            component: Client,
        },
        {
            path: '/6',
            component: Client,
        },
        {
            path: '/7',
            component: Client,
        },
    ]
})
