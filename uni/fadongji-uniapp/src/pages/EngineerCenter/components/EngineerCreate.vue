<template>
  <view class="h-full">
    <VoTabbarCreate
      ref="createdRef"
      :tabbarVal="tabbarVal"
      @showReport="showReport"
      @updateApprove="showApprove = true"
      @updatepops="showPops"
    />
    <view class="placeholder"></view>
    <vo-safety-area />
  </view>
</template>
<script>
  import VoTabbarCreate from '@/components/VoTabbarCreate/VoTabbarCreate'

  export default {
    name: 'EngineerCreate',
    components: { VoTabbarCreate },
    props: {
      tabbarVal: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {}
    },
    methods: {
      /**
       * 刷新问答
       * @param obj
       */
      answerRefresh() {
        this.$refs.createdRef.answerRefresh()
      },
      //举报
      showReport(obj) {
        console.log('举报22')
        this.$emit('showReport', obj)
      },
      /**
       * 打开筛选弹窗
       * @param bool
       */
      showPops(bool) {
        console.log(bool)
        this.$emit('updatepops', bool)
      },
      //刷新数据
      refreshData() {
        console.log('更新社群数据')
        this.$refs.createdRef.refreshData()
      },
    },
  }
</script>
<style scoped>
  .placeholder {
    height: 130rpx;
  }
</style>
