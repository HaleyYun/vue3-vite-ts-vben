<template>
  <u-overlay :show="show" class="overlay-wrap" @click="show = false">
    <view class="scree" @tap.stop>
      <OrderScreenItem
        ref="orderRef"
        :type-list="orderTimeList"
        title="下单时间"
        type="orderTime"
        @OrderScreen="orderScree"
      />
      <view class="scree-line" />
      <view class="flex">
        <view class="scree-reset" @click="resetClick">重置</view>
        <view class="scree-right" @click="screenClick">筛选</view>
      </view>
    </view>
  </u-overlay>
</template>
<script>
  import OrderScreenItem from './OrderScreenItem'

  export default {
    name: 'OrderScreenAlert',
    components: {
      OrderScreenItem,
    },
    props: {
      /*
       * src 分享图片
       * name 标题
       * */
      // shareList: {
      //   type: Array,
      //   defaults: [],
      // },
      // show: Boolean,
    },
    data() {
      return {
        show: false,
        orderNumber: 0,
        timeData: [],
        orderTimeList: [
          { name: '1个月内', selected: false, id: '1', time: '1', type: 'month' },
          { name: '3个月内', selected: false, id: '2', time: '3', type: 'month' },
          { name: '6个月内', selected: false, id: '3', time: '6', type: 'month' },
          { name: '2022年', selected: false, id: '4', time: '2022', type: 'year' },
          { name: '2021年', selected: false, id: '5', time: '2021', type: 'year' },
          { name: '2020年', selected: false, id: '6', time: '2020', type: 'year' },
        ],
      }
    },
    methods: {
      orderScree(data) {
        if (!data.data) {
          this.orderNumber = 0
          return
        }
        if (data.type === 'orderTime') {
          this.orderNumber = 1
          this.timeData = data.data
          let dict = data.data[0]
          this.timeData = this.$vocenApi.VoUtils.transformDateByType(+dict.time, dict.type)
        }
        console.log(this.timeData)
        this.screenNum = String(this.orderNumber)
      },
      resetClick() {
        this.timeData = {}
        let param = {
          time: [],
          num: '',
        }
        this.$emit('screen', param)
        this.orderNumber = 0
        this.$refs.orderRef?.reset()
      },
      screenClick() {
        if (this.orderNumber === 0) {
          this.$u.toast('请选择筛选条件')
          return
        }

        let param = {
          time: this.timeData,
          num: String(this.screenNum),
        }
        this.$emit('screen', param)
        this.showShare(false)
      },
      showShare(e) {
        this.show = e
      },
      cancle() {
        this.show = false
      },
    },
  }
</script>

<style lang="scss" scoped>
  .overlay-wrap {
    height: 100vh;
    width: 750rpx;
  }

  .scree {
    background-color: #ffffff;
    width: 750rpx;
    z-index: 10071;

    &-line {
      background-color: $v-bg-light;
      margin-top: 88rpx;
      margin-left: 32rpx;
      margin-right: 32rpx;
      height: 2rpx;
    }

    &-reset {
      margin-top: 20rpx;
      margin-bottom: 20rpx;
      margin-left: 32rpx;
      width: 325rpx;
      height: 92rpx;
      line-height: 92rpx;
      text-align: center;
      border-radius: 50rpx;
      border: 2rpx solid $v-c0-25;
      background-color: #ffffff;
      color: $v-c0-85;
    }

    &-right {
      margin-top: 20rpx;
      margin-bottom: 20rpx;
      margin-right: 32rpx;
      margin-left: 36rpx;
      width: 325rpx;
      height: 92rpx;
      line-height: 92rpx;
      text-align: center;
      border-radius: 50rpx;
      color: #ffffff;
      background-color: $color-primary-yellow;
    }
  }
</style>
