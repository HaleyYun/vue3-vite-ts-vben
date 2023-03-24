<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="order flex flex-column"
    @click="scrollViewFn"
  >

    <vo-qi-mo-customer ref="qiMoRef"></vo-qi-mo-customer>


    <VoNav isHaveMore title="我的订单" />
    <!--    <MarketOrder ref="marketRef" :search="searchModel" class="flex1" />-->
    <MarketOrder ref="marketRef" class="flex1" />
    <VoComplaintAction ref="complaintRef" />
  </view>
</template>

<script>
  import MarketOrder from './components/MarketOrder'

  export default {
    components: {
      MarketOrder,
    },
    data() {
      return {
        current: 0,
        searchModel: '',
      }
    },
    onLoad(option) {
      // if (option) {
      //   console.log(option)
      //   this.searchModel = option.search
      // }
      // this.getOrderStatusListRequest()
    },
    onShow() {
      this.$refs?.marketRef?.refreshList()
    },
    methods: {
      back() {
        this.$backFn()
      },
      scrollViewFn() {
        this.$refs.qiMoRef?.close()
      },
      /**
       * 在线客服
       */
      toOnlineService() {
        // todo 在线客服
      },
      /**
       * 致电客服
       */
      toCall() {
        this.$VoHttp.apiExtraCustomerMoor().then((res) => {
          this.$cellPhone('400-893-5518')
        })
      },
      /**
       * 投诉建议
       */
      toComplaint() {
        this.$refs.complaintRef.open()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .order {
    width: 750rpx;
    height: 100vh;
    box-sizing: border-box;
    &-fixbtns {
      position: fixed;
      right: 0;
      bottom: 0;
      z-index: 99;
      height: 264rpx;
      width: 190rpx;
      &__item {
        color: #ffffff;
        font-size: 26rpx;
        height: 64rpx;
        line-height: 64rpx;
        background: linear-gradient(90.22deg, #ff7321 2.68%, #ff5622 99.81%);
        mix-blend-mode: normal;
        display: flex;
        align-items: center;
        padding-left: 12rpx;
        padding-right: 16rpx;
        border-radius: 100rpx;
        margin-bottom: 24rpx;
      }
    }
  }
</style>
