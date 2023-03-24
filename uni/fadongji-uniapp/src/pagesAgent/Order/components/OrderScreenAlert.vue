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
        v-if="mySelfWarehouseList.length > 1"
        ref="mySelfRef"
        :radio="false"
        :type-list="mySelfWarehouseList"
        title="商家仓发货"
        type="mySelf"
        @OrderScreen="orderScree"
      />
      <OrderScreenItem
        v-if="platformWarehouseList.length > 1"
        ref="platformRef"
        :radio="false"
        :type-list="platformWarehouseList"
        title="平台仓发货"
        type="platform"
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
        mySelfNumber: 0,
        screenNum: 0,
        paltformNumber: 0,
        timeData: [],
        mySelfData: [],
        paltformData: [],
        orderTimeList: [
          { name: '1个月内', selected: false, id: '1', time: '1', type: 'month' },
          { name: '3个月内', selected: false, id: '2', time: '3', type: 'month' },
          { name: '6个月内', selected: false, id: '3', time: '6', type: 'month' },
          { name: '2022年', selected: false, id: '4', time: '2022', type: 'year' },
          { name: '2021年', selected: false, id: '5', time: '2021', type: 'year' },
          { name: '2020年', selected: false, id: '6', time: '2020', type: 'year' },
        ],
        mySelfWarehouseList: [{ name: '全部', selected: false, id: '' }],
        platformWarehouseList: [{ name: '全部', selected: false, id: '' }],
      }
    },
    mounted() {
      this.initFn()
    },
    methods: {
      orderScree(data) {
        if (data.type === 'orderTime') {
          console.log(data)
          if (data.data && data.data.length > 0) {
            this.orderNumber = 1
            let dict = data.data[0]
            this.timeData = this.$vocenApi.VoUtils.transformDateByType(+dict.time, dict.type)
          } else {
            this.orderNumber = 0
          }
        }

        if (data.type === 'mySelf') {
          this.mySelfNumber = data.data.length
          this.mySelfData = data.data
          this.mySelfWarehouseList[0].selected = data.data.length + 1 >= this.mySelfWarehouseList.length;
          console.log('22222', data)
        }

        if (data.type === 'platform') {
          this.paltformNumber = data.data.length
          this.paltformData = data.data
          this.platformWarehouseList[0].selected = data.data.length + 1 >= this.platformWarehouseList.length;
          console.log('11111', data)
        }
        this.screenNum = String(this.orderNumber + this.mySelfNumber + this.paltformNumber)
      },
      resetClick() {
        this.timeData = []
        this.mySelfData = []
        this.paltformData = []
        let param = {
          time: this.timeData,
          mySelf: this.mySelfData,
          paltform: this.paltformData,
          num: '',
        }
        this.$emit('screen', param)
        this.orderNumber = 0
        this.mySelfNumber = 0
        this.paltformNumber = 0
        this.$refs.orderRef?.reset()
        this.$refs.mySelfRef?.reset()
        this.$refs.platformRef?.reset()
      },
      screenClick() {
        if (this.orderNumber === 0 && this.mySelfNumber === 0 && this.paltformNumber === 0) {
          this.resetClick()
          this.showShare(false)
          return
        }

        let param = {
          time: this.timeData,
          mySelf: this.mySelfData,
          paltform: this.paltformData,
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
      initFn() {
        this.mySelfWarehouseList = []
        this.mySelfWarehouseList.push({ name: '全部', selected: false, id: '' })
        this.platformWarehouseList = []
        this.platformWarehouseList.push({ name: '全部', selected: false, id: '' })
        this.$VoHttp.WAREHOUSE.apiWarehouseMyWarehouses().then((res) => {
          console.log(res)
          let ownWareHouse = res.data.ownWareHouse
          let platWareHouse = res.data.platWareHouse
          ownWareHouse.forEach((item) => {
            let param = {
              name: item.warehouseName,
              id: item.warehouseId,
              selected: false,
            }
            this.mySelfWarehouseList.push(param)
          })
          platWareHouse.forEach((item) => {
            let param = {
              name: item.warehouseName,
              id: item.warehouseId,
              selected: false,
            }
            this.platformWarehouseList.push(param)
          })
        })
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
