import CountUp from 'vue-countup-v2'
export default {
    components: {
        CountUp
    },
	data () {
        return {
            counterInstances: [],
        }
    },
    watch: {
        isCurrent: function (newVal) {
            if (newVal) {
                this.counterInstances.forEach(instance => {
                    instance.reset()
                    instance.start()
                })
            } else {
                this.counterInstances.forEach(instance => {
                    instance.pauseResume()
                })
            }
        },
    },
	methods: {
		saveCounterInstance(instance) {
            this.counterInstances.push(instance)
        },
	},
}
