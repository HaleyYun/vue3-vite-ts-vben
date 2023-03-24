<template>
  <view class="ship">
    <VoNav :z-index="10" is-fixed is-have-more title="选择仓库" />
    <view v-if="ownWareHouse.length > 0" class="ship-list">
      <view class="ship-list__title">商家仓</view>
      <shipList
        v-for="item of ownWareHouse"
        :key="item.id"
        :ship-cell="item"
        :source-type="type"
        @selectFn="selectFn(item, 1)"
      />
    </view>
    <view v-if="platWareHouse.length > 0" class="ship-list">
      <view class="ship-list__title">平台仓</view>
      <shipList
        v-for="item of platWareHouse"
        :key="item.id"
        :ship-cell="item"
        :source-type="type"
        @selectFn="selectFn(item, 2)"
      />
    </view>
    <view v-if="factoryWareHouse.length > 0" class="ship-list">
      <view class="ship-list__title">工厂仓</view>
      <shipList
        v-for="item of factoryWareHouse"
        :key="item.id"
        :ship-cell="item"
        :source-type="type"
        @selectFn="selectFn(item, 2)"
      />
    </view>
    <VoNoData
      class="noData"
      v-if="ownWareHouse.length === 0 && platWareHouse.length === 0 && factoryWareHouse.length === 0"
      :no-data-tips="type === '1' ? '暂无补货仓库' : '暂无出货仓库'"
    />
    
  </view>
</template>

<script>
  import shipList from './components/shipList'

  export default {
    name: 'SelectWarehouse',
    components: { shipList },
    data() {
      return {
        type: '', // 1  是补货仓库   2是出货仓库
        goodId: '',
        showDirect: false,
        warehouseId: '',
        ownWareHouse: [],
        platWareHouse: [],
        factoryWareHouse: [],
      }
    },
    // eslint-disable-next-line vue/no-deprecated-destroyed-lifecycle
    beforeDestroy() {
      this.$storage.remove('InvestmentWarehouseId')
      this.$storage.remove('InvestmentWarehouse')
    },
    created() {},
    methods: {
      async initData() {
        try {
          const defaultHouse = this.$storage.get('InvestmentWarehouse')
          this.warehouseId = this.$storage.get('InvestmentWarehouseId')
          let param = {
            goodId: this.goodId,
          }
          let ret = ''
          // if (this.type === '1') {
            ret = await this.$VoHttp.apiWarehouseStockCompanyGoodsWarehouse(param)
          // } else  {
          //   ret = await this.$VoHttp.apiWarehouseStockGoodsWarehouse(param)
          // }
          if (+ret.code === 20001) {
            this.ownWareHouse = ret.data.ownWareHouse
              .filter((item) => {
                return item.warehouseId != this.warehouseId
              })
              .map((item) => {
                item.wareHouseType = '1'
                return {
                  ...item,
                  // select: defaultHouse == item.warehouseId,
                  select: false,
                }
              })
            this.platWareHouse = ret.data.platWareHouse
              .filter((item) => {
                return item.warehouseId != this.warehouseId
              })
              .map((item) => {
                return {
                  ...item,
                  select: defaultHouse == item.warehouseId,
                }
              })
            this.factoryWareHouse = ret.data.factoryWareHouse
              .filter((item) => {
                return item.warehouseId != this.warehouseId
              })
              .map((item) => {
                return {
                  ...item,
                  select: defaultHouse == item.warehouseId,
                }
              })
          }
        } catch (e) {
          console.warn(e, 'SelectWarehouse')
          this.$u.toast(e.message || '服务端错误')
        }
      },
      selectFn(item) {
        if (this.type === '2') {
          if (item.wareHouseType && this.userInfo.roleCode === 'agent') {
            this.$u.toast('不可将商家仓货物调出。')
            return;
          }
          if (item.availableNumber === 0) {
            this.$u.toast('库存不足，不可选中。')
            return
          }
        }
        uni.$emit('chooseWarehouse', {
          warehouseName: item.warehouseName,
          warehouseId: item.warehouseId,
          type: this.type,
          availableNumber: item.availableNumber,
          wareHouseType: item.wareHouseType,
        })
        uni.navigateBack()
      },
    },
    onLoad(options) {
      this.goodId = options.goodsId
      this.type = options.type
      this.initData()
    },
  }
</script>

<style lang="scss" scoped>
  .ship {
    width: 750rpx;
    min-height: 100vh;
    box-sizing: border-box;

    &-list {
      background: #ffffff;
      margin-top: 24rpx;

      &__title {
        margin: 0 32rpx;
        width: 375px;
        height: 88rpx;
        font-weight: bold;
        font-size: 32rpx;
        line-height: 88rpx;
        color: $v-c0-85;
        background: #ffffff;
      }
    }
    .noData {
      width: 750rpx;
      height: 100vh;
    }
  }
</style>
