<template>
  <view
    class="bg-color flex flex-column page"
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
  >
    <VoNav :is-fixed="false" isHaveMore title="销售统计" />
    <vo-statistical-time :top="82" :statustiCalDate="statustiCalDate" @timeConfirm="timeConfirm" />
    <!--订单支付明细-->
    <view class="background">
      <sales-statistics-list
        :timeParams="timeParams"
        :selectOptions="selectCurrent"
        :isMore="false"
      />
    </view>
  </view>
</template>

<script>
  import VoStatisticalTime from '@/components/VoStatisticalTime/VoStatisticalTime'
  import SalesStatisticsList from '../../components/VoStatistical/component/SalesStatistics'
  export default {
    name: 'AgentCommodityPopularityList',
    components: { SalesStatisticsList, VoStatisticalTime },
    data() {
      return {
        statustiCalDate: [new Date().getTime()],
        selectTime: [],
        timeParams: {},
        selectCurrent: '',
      }
    },
    onLoad(options) {
      this.selectCurrent = options.selectCurrent
      console.log(this.selectCurrent)
    },
    created() {
      let time = this.$vocenApi.VoUtils.timeFormat(new Date().getTime(), 'yyyy-mm-dd')
      this.selectTime = [time + ' 00:00:00', time + ' 23:59:59']
      this.timeParams = { selectTime: this.selectTime, timeType: 1 }
    },
    methods: {
      // 选择时间
      timeConfirm(data) {
        if (data.timeType == 2 || data.timeType == 3) {
          this.statustiCalDate = [
            new Date(data.selectTime[0]).getTime(),
            new Date(data.selectTime[1]).getTime(),
          ]
        } else {
          this.statustiCalDate = [new Date(data.selectTime[0]).getTime()]
        }
        this.selectTime = [data.selectTime[0] + ' 00:00:00', data.selectTime[1] + ' 23:59:59']
        this.timeParams = { selectTime: this.selectTime, timeType: data.timeType }
        console.log(data.selectTime)
      },
    },
  }
</script>

<style scoped>
  .page {
    height: 100vh;
  }
  .background {
    flex-grow: 1;
    background: #fff;
    overflow: auto;
  }
</style>
