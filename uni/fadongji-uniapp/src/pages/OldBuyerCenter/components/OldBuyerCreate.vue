<template>
  <view class="h-full">
    <VoTabbarCreate
      ref="createdRef"
      :tabbarVal="tabbarVal"
      @showReport="showReport"
      @updatepops="showPops"
    />
  </view>
</template>
<script>
  import VoTabbarCreate from '@/components/VoTabbarCreate/VoTabbarCreate'

  export default {
    name: 'OldBuyerCreate',
    components: { VoTabbarCreate },
    props: {
      tabbarVal: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        showApprove: false,
      }
    },
    mounted() {
      // #ifdef APP-PLUS
      this.refreshData()
      // #endif
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
        this.$refs.createdRef.refreshData()
      },
    },
  }
</script>
<style scoped></style>
