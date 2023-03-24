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
      <OrderScreenItem
        ref="mySelfRef"
        :type-list="mySelfWarehouseList"
        title="自有发货仓库"
        type="mySelf"
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
    props: {},
    data() {
      return {
        show: false,
        orderNumber: 0,
        mySelfNumber: 0,
        timeData: {},
        mySelfData: {},
        orderTimeList: [
          {
            name: '1个月内',
            selected: false,
            id: '1',
            orderStartTime: this.$vocenApi
              .dayjs()
              .subtract(1, 'month')
              .format('YYYY-MM-DD HH:mm:ss'),
            orderEndTime: this.$vocenApi.dayjs().format('YYYY-MM-DD HH:mm:ss'),
          },
          {
            name: '3个月内',
            selected: false,
            id: '2',
            orderStartTime: this.$vocenApi
              .dayjs()
              .subtract(3, 'month')
              .format('YYYY-MM-DD HH:mm:ss'),
            orderEndTime: this.$vocenApi.dayjs().format('YYYY-MM-DD HH:mm:ss'),
          },
          {
            name: '6个月内',
            selected: false,
            id: '3',
            orderStartTime: this.$vocenApi
              .dayjs()
              .subtract(6, 'month')
              .format('YYYY-MM-DD HH:mm:ss'),
            orderEndTime: this.$vocenApi.dayjs().format('YYYY-MM-DD HH:mm:ss'),
          },
          {
            name: '今年',
            selected: false,
            id: '4',
            orderStartTime: this.$vocenApi
              .dayjs(this.$vocenApi.dayjs().year() + '-1-1')
              .format('YYYY-MM-DD HH:mm:ss'),
            orderEndTime: this.$vocenApi.dayjs().format('YYYY-MM-DD HH:mm:ss'),
          },
          {
            name: this.$vocenApi.dayjs().subtract(1, 'year').year() + '年',
            selected: false,
            id: '5',
            orderStartTime: this.$vocenApi
              .dayjs(
                this.$vocenApi.dayjs(this.$vocenApi.dayjs().subtract(1, 'year')).year() + '-1-1',
              )
              .format('YYYY-MM-DD HH:mm:ss'),
            orderEndTime: this.$vocenApi
              .dayjs(this.$vocenApi.dayjs().year() + '-1-1')
              .format('YYYY-MM-DD HH:mm:ss'),
          },
          {
            name: this.$vocenApi.dayjs().subtract(2, 'year').year() + '年',
            selected: false,
            id: '6',
            orderStartTime: this.$vocenApi
              .dayjs(
                this.$vocenApi.dayjs(this.$vocenApi.dayjs().subtract(2, 'year')).year() + '-1-1',
              )
              .format('YYYY-MM-DD HH:mm:ss'),
            orderEndTime: this.$vocenApi
              .dayjs(
                this.$vocenApi.dayjs(this.$vocenApi.dayjs().subtract(1, 'year')).year() + '-1-1',
              )
              .format('YYYY-MM-DD HH:mm:ss'),
          },
        ],
        mySelfWarehouseList: [
          { name: '普通订单', selected: false, id: '7', isPreSale: false },
          { name: '预售订单', selected: false, id: '8', isPreSale: true },
        ],
      }
    },
    methods: {
      orderScree(data) {
        console.log(data, '========')
        if (data.type === 'orderTime') {
          this.orderNumber = 1
          this.timeData = data.data
        }

        if (data.type === 'mySelf') {
          this.mySelfNumber = data.data.length
          this.mySelfData = data.data
        }
        this.screenNum = String(this.orderNumber + this.mySelfNumber)
      },
      resetClick() {
        this.timeData = {}
        this.mySelfData = {}
        let param = {
          orderStartTime: this.timeData.orderStartTime,
          orderEndTime: this.timeData.orderEndTime,
          isPreSale: this.mySelfData.isPreSale,
        }
        this.$emit('screen', param)
        this.orderNumber = 0
        this.mySelfNumber = 0
        this.$refs.orderRef?.reset()
        this.$refs.mySelfRef?.reset()
      },
      screenClick() {
        if (this.orderNumber === 0 && this.mySelfNumber === 0) {
          this.$u.toast('请选择筛选条件')
          return
        }

        let param = {
          time: this.timeData,
          mySelf: this.mySelfData,
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
      border: 2rpx solid $color-primary-yellow;
      background-color: #ffffff;
      color: $color-primary-yellow;
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
