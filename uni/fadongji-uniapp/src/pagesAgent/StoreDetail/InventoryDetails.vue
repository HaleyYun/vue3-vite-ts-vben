<template>
  <view>
    <view class="details">
      <VoNav is-fixed title="商品库存详情">

        <block slot="operation">
          <view class="replenish-operate">
            <VoIcon
              :opacity="0.45"
              class="replenish-operate__icon"
              color="#000"
              name="more"
              @click="showDirect = true"
            />
          </view>
        </block>
      </VoNav>
      <GoodsItem ref="goodsItem" :dataObj="goodsData" :showExpand="false" />
      <!-- <view v-if="isShowCreate" class="details-noDetails">
        <view class="details-noDetails__line">
          <view class="flex flex-justify-r">
            <view class="line-create" @click="addWarehouseFn">创建仓库</view>
          </view>
          <view class="line-tips">尚未设置仓库和库存，客户无法下单，尽快去设置哦～</view>
        </view>
      </view> -->
      <DetailsList
        v-for="(item, index) of inventoryDetails"
        v-show="item.deListList.length"
        :key="index"
        :dataObj="goodsData"
        :details-list="item.deListList"
        :title="item.title"
        @editNumberSucess="getWareInfo"
        @goApplyReplenishment="goApplyReplenishment"
      />
    </view>
    <VoQuick :show.sync="showDirect" />
  </view>
</template>

<script>
  import GoodsItem from './components/GoodsItem.vue'
  import DetailsList from './components/DetailsList'

  export default {
    name: 'InventoryDetails',
    components: { DetailsList, GoodsItem },
    data() {
      return {
        optionsId: '',
        showDirect: false,
        goodsData: {},
        inventoryDetails: [
          {
            title: '自有仓',
            deListList: [],
          },
          {
            title: '平台仓',
            deListList: [],
          },
          {
            title: '工厂仓',
            deListList: [],
          },
        ],
        isShowCreate: false,
      }
    },
    onLoad(options) {
      this.optionsId = options.id
      console.log(this.goodsData)
    },
    onShow() {
      this.goodsData = this.$storage.get('storeGoodsData')
      this.getGoodsInfo()
      this.getWareInfo()
    },
    methods: {
      //获取商品信息
      getGoodsInfo() {
        this.$VoHttp
          .apiWarehouseStockGoods({
            goodIds: this.goodsData.id,
          })
          .then((res) => {
            if (res.data && res.data.length) {
              this.goodsData.inventory = res.data[0].availableNumber
              this.goodsData.localNumber = res.data[0].localNumber
            }
          })
      },
      //获取仓库信息
      getWareInfo() {
        this.$VoHttp
          .apiWarehouseStockGoodsWarehouse({
            goodId: this.goodsData.id,
          })
          .then((res) => {
            let ownWareHouse = res.data.ownWareHouse || []
            let platWareHouse = res.data.platWareHouse || []
            let factoryWareHouse = res.data.factoryWareHouse || []
            if (!ownWareHouse.length && !platWareHouse.length && !factoryWareHouse.length) {
              this.isShowCreate = true
              console.log(this.isShowCreate)
            }
            ownWareHouse.forEach((item) => {
              item.type = 'own'
            })
            platWareHouse.forEach((item) => {
              item.type = 'plat'
            })
            factoryWareHouse.forEach((item) => {
              item.type = 'factory'
            })
            this.inventoryDetails[0].deListList = ownWareHouse
            this.inventoryDetails[1].deListList = platWareHouse
            this.inventoryDetails[2].deListList = factoryWareHouse
          })
          .catch((err) => {
            console.log(err)
          })
      },
      /**
       *  新建仓库
       */
      addWarehouseFn() {
        //暂存当前页面信息，方便跳转
        this.$storage.set('AddWarehouseOriginPath', this.getCurrentPageRoute())
        this.$linkToEasy('/pagesSupplier/Warehouse/WarehouseList/AddWarehouse')
      },
      /**
       * 去申请调拨页面
       */
      goApplyReplenishment(item) {
        console.log(item)
        console.log(this.goodsData)
        this.$linkToEasy(
          '/pagesSupplier/Warehouse/WarehouseList/WarehouseAllotPro?warehouseId=' +
            item.warehouseId +
            '&warehouseName=' +
            item.warehouseName +
            '&goodsName=' +
            this.goodsData.name +
            '&goodsId=' +
            this.goodsData.id,
        )
      },
    },
  }
</script>

<style lang="scss" scoped>
  .details {
    width: 750rpx;
    min-height: 100vh;
    box-sizing: border-box;
    &-info {
      background: #ffffff;
      padding: 32rpx;
      margin-top: 24rpx;
      &__num {
        color: $v-c0-45;
      }
      &__con {
        .con-img {
          width: 160rpx;
          height: 160rpx;
          border-radius: 8rpx;
          margin-right: 16rpx;
          position: relative;
          &__sale {
            width: 80rpx;
            height: 36rpx;
            line-height: 36rpx;
            text-align: center;
            border-radius: 8rpx 0px 16rpx;
            font-size: 24rpx;
            color: #ffffff;
            position: absolute;
            top: 0rpx;
            left: 0rpx;
            &.tag-1 {
              background: #26bf26;
            }
            &.tag-3 {
              background: #d3d4db;
            }
            &.tag-4 {
              background: #ff9e0d;
            }
            &.tag-5 {
              background: #fa2c19;
            }
          }
        }
        .con-word {
          font-weight: bold;
          font-size: 28rpx;
          line-height: 150%;
        }
        .con-color {
          color: $v-c0-65;
        }
      }
    }
    &-noDetails {
      background: #ffffff;
      width: 750rpx;
      padding: 0 32rpx 32rpx;
      box-sizing: border-box;
      &__line {
        padding-top: 40rpx;
        border-top: 2rpx solid $v-bg-light;
        .line-create {
          width: 148rpx;
          height: 48rpx;
          line-height: 48rpx;
          text-align: center;
          border: 2rpx solid $v-btn-weight;
          border-radius: 30rpx;
          font-weight: bold;
          font-size: 24rpx;
          color: $v-btn-weight;
        }
        .line-tips {
          margin-top: 24rpx;
          background: $v-bg-light;
          border-radius: 16rpx;
          padding: 18rpx;
          font-size: 24rpx;
          line-height: 150%;
          color: $v-c0-45;
        }
      }
    }
  }
</style>
