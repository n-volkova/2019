<template>
    <transition name="fade" mode="out-in">
        <component 
            :is="current"
            @loginSuccess="changeScreen('total')"
            @notClient="changeScreen('notClient')"
            @noData="changeScreen('noData')"
            @showCommonStats="changeScreen('total')"
        />
        <!-- <no-data /> -->
        <!-- <total /> -->
    </transition>
</template>

<script>
const COMMON_RESULTS = require('../assets/commonResults.json')

import Intro from '../components/Intro.vue'
import Total from '../components/Total.vue'
import NotClient from '../components/NotClient.vue'
import NoData from '../components/NoData.vue'
 
export default {
    name: 'Client',
    components: {
       Intro, Total, NotClient, NoData
    },
    head: {
        meta: function () {
            return [
                { rel: 'canonical', href: `https://2019.rocketbank.ru/${this.shareId}/`, id: 'canonical' },
                { property: 'og:url', content: `https://2019.rocketbank.ru/${this.shareId}/`, id: 'url' },
                { property: 'og:image', content: `https://2019.rocketbank.ru/shares/${this.shareId}/share.jpg`, id: 'image' },
            ]
        }
    },
    data () {
        return {
            current: 'intro',
            redirected: false
        }
    },
    computed: {
        shareId() {
            // let path = this.$route.path.match(/\/[1-7]/g)           
            // let shareId = path[0].replace(/\//g, '')
            // return shareId
            return 3
        },
    },
    beforeMount() {
        window.RESULTS = COMMON_RESULTS
    },
    created() {
        // let shareId = window.SHARE_ID

        // if (window.innerWidth > 1 && window.innerHeight > 1) {
        //     if (!this.redirected) {
        //         this.redirected = true
        //         this.$router.replace(`/${shareId}`)
        //     }
        // }
    },
    methods: {
        changeScreen(screen) {
            this.current = screen
        },
    }
}
</script>
