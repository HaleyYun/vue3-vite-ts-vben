export default {
    methods: {
        formateTime(val) {
            if (!val) return
            this.$vocenApi.dayjs.extend(this.$vocenApi.restObj.isBetween)
            let weeks = '日一二三四五六'
            let valYearDay = this.$vocenApi.dayjs(val).format('YYYY年MM月DD日')
            let valDay = this.$vocenApi.dayjs(val).format('MM月DD日')
            let weekStart = this.$vocenApi.dayjs().startOf('week')
            let weekEnd = this.$vocenApi.dayjs().endOf('week')

            let valMin = this.$vocenApi.dayjs(val).format('HH:mm')
            let valUnix = this.$vocenApi.dayjs(val).unix()
            let currentUnix = this.$vocenApi.dayjs().unix()

            if (currentUnix - valUnix <= 60) {
                console.log(val)
                console.log(currentUnix, valUnix, currentUnix - valUnix)
                return '刚刚'
            } else if (this.$vocenApi.dayjs().isSame(val, 'day')) {
                return valMin
            } else if (this.$vocenApi.dayjs().isSame(this.$vocenApi.dayjs(val).add(1, 'day'), 'day')) {
                return '昨天'
            } else if (this.$vocenApi.dayjs(val).isBetween(weekStart, weekEnd)) {
                return `周${weeks[this.$vocenApi.dayjs(val).format('d')]}`
            } else if (this.$vocenApi.dayjs().isSame(val, 'year')) {
                return valDay
            } else {
                return valYearDay
            }
        },
    },
}
