<template>
  <view class="ship">
    <view>
      <VoNav :z-index="10" is-fixed is-have-more title="选择仓库" />
      <view v-if="ownWareHouse.length > 0" class="ship-list">
        <view class="ship-list__title">商家仓</view>
        <shipList
          v-for="item of ownWareHouse"
          :key="item.id"
          :ship-cell="item"
          :source-type="2"
          @selectFn="selectFn(item, 1)"
        />
      </view>
      <view v-if="factoryWareHouse.length > 0" class="ship-list">
        <view class="ship-list__title">工厂仓</view>
        <shipList
          v-for="item of factoryWareHouse"
          :key="item.id"
          :ship-cell="item"
          :source-type="2"
          @selectFn="selectFn(item, 2)"
        />
      </view>
      <view v-if="platWareHouse.length > 0" class="ship-list">
        <view class="ship-list__title">平台仓</view>
        <shipList
          v-for="item of platWareHouse"
          :key="item.id"
          :ship-cell="item"
          :source-type="2"
          @selectFn="selectFn(item, 2)"
        />
      </view>
      <VoNoData
        class="noData"
        v-if="
          ownWareHouse.length === 0 && platWareHouse.length === 0 && factoryWareHouse.length === 0
        "
        no-data-tips="暂无出货仓库"
      />
    </view>
    <u-modal
      :show="show"
      close-on-click-overlay
      confirm-text="去创建"
      content="尚未创建仓库信息，创建完才能配置投资项目"
      show-cancel-button
      @cancel="show = false"
      @confirm="confirmHandler"
    />
    <u-modal
      :show="showNew"
      close-on-click-overlay
      confirm-text="继续创建仓库"
      cancel-text="返回配置批发-服务商"
      content="仓库创建成功"
      show-cancel-button
      @cancel="backHandler"
      @confirm="confirmHandler"
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
        showNew: false,
        goodsId: '',
        show: false,
        showDirect: false,
        ownWareHouse: [],
        platWareHouse: [],
        factoryWareHouse: [],
        showNum: false,
      }
    },
    onHide() {
      this.$storage.remove('InvestmentWarehouse')
    },
    methods: {
      backHandler() {
        this.$backFn()
      },
      confirmHandler() {
        this.show = false
        this.showNew = false
        this.$linkToEasy('/pagesSupplier/Warehouse/WarehouseList/AddWarehouse')
      },
      async initData() {
        try {
          // 供应商调用
          const defaultHouse = this.$storage.get('InvestmentWarehouse')
          let param = {
            goodId: this.goodsId,
          }

          const ret = this.showNum
            ? await this.$VoHttp.apiWarehouseStockGoodsWarehouse(param) // 服务商
            : await this.$VoHttp.WAREHOUSE.apiWarehouseSupplierMy()
          if (+ret.code === 20001) {
            if (ret.data.ownWareHouse) {
              //服务商
              if (this.showNum) {
                this.ownWareHouse = ret.data.ownWareHouse.map((item) => {
                  item.wareHouseType = '1'
                  return {
                    ...item,
                    select: defaultHouse ? defaultHouse.warehouseId === item.warehouseId : false,
                  }
                })
              } else {
                this.factoryWareHouse = ret.data.ownWareHouse
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
            }
            if (ret.data.platWareHouse) {
              this.platWareHouse = ret.data.platWareHouse.map((item) => {
                return {
                  ...item,
                  select: defaultHouse ? defaultHouse.warehouseId === item.warehouseId : false,
                }
              })
            }
            if (ret.data.factoryWareHouse) {
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
            if (
              !(
                this.ownWareHouse.length ||
                this.platWareHouse.length ||
                this.factoryWareHouse.length
              ) &&
              !this.showNum
            ) {
              this.show = true
            }
          }
        } catch (e) {
          this.$u.toast(e.message || '服务端错误')
        }
      },
      selectFn(item, type) {
        if (type === 1) {
          // 我的仓库
        } else {
          // 平台仓
        }
        console.log(item)

        //服务商
        if (this.userInfo.roleCode === 'agent') {
          if (item.wareHouseType) {
            this.$u.toast('商家仓不支持批量供货。')
            return
          }

          if (item.availableNumber === 0 || item.availableNumber === null) {
            this.$u.toast('库存不足，不可选中。')
            return
          }
        }

        uni.$emit('chooseWarehouse', {
          type,
          warehouseName: item.warehouseName,
          warehouseId: item.warehouseId,
        })
        uni.navigateBack()
      },
    },
    onLoad(options) {
      this.goodsId = options.goodsId
      this.showNum = this.userInfo.roleCode === 'agent'
    },
    onShow() {
      // ENG-7297不需要该弹窗
      // const addNewWarehouse = this.$storage.get('warehouse-add')
      // if (addNewWarehouse) {
      //   this.showNew = true
      //   this.$storage.remove('warehouse-add')
      // }
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
