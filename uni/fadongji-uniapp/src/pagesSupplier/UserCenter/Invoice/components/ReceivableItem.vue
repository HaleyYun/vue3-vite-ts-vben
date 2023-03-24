<template>
  <view class="receivableItem">
    <view class="receivableItem-content">
      <view class="flex flex-justify-between">
        <view class="fz-b fz-28">订单编号：{{ dataObj.id }}</view>
        <view v-if="dataObj.repayStatus === 2" class="fz-14 color-block-45">逾期</view>
      </view>
      <view class="fz-28 receivableItem-content__gay m-t-18 flex flex-justify-between">
        <!-- {{ repayStatus[dataObj.repayStatus] }} -->
        <view>已收：{{ dataObj.actualAmount }}元</view>
        <VoPointPrice :price="+dataObj.receivableAmount" showUnit />
      </view>
      <view class="fz-28 receivableItem-content__gay m-t-8">
        还款日：{{ dataObj.expireTime }}
      </view>
    </view>
    <view class="receivableItem-line" />
  </view>
</template>

<script>
  export default {
    name: 'ReceivableItem',
    props: {
      dataObj: {
        type: Object,
        default() {
          return {
            // id: 1,
            // actualAmount: 12,
            // orderAmount: 13,
            // expireTime: 14,
          }
        },
      },
    },
    data() {
      return {
        ReceivableItem: [],
        repayStatus: { 0: '未还款', 1: '已还款', 2: '已逾期' },
      }
    },
    created() {
      // this.initFn()
    },
    methods: {
      initFn() {
        let param = {
          // endTime: this.endTime,
          // startTime: this.startTime,
        }
        this.$VoHttp
          .apiOrderAccountPeriodReceivableList(param)
          .then((res) => {
            console.log(res.data)
            this.ReceivableItem = res.data.records
          })
          .catch((e) => {
            uni.$u.toast(e.message || '请求失败')
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .receivableItem {
    background-color: #ffffff;
    width: 750rpx;

    &-line {
      height: 2rpx;
      margin-left: 32rpx;
      background-color: $v-bg-light;
    }
    &-content {
      padding: 32rpx;
      &__red {
        color: $color-primary-red;
      }
      &__gay {
        color: $v-c0-65;
      }
    }
  }
</style>
