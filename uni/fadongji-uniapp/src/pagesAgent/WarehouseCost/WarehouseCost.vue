<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="center"
  >
    <VoNav :left-width="240" :right-width="240" is-fixed is-have-more title="费用明细">
      <view slot="operation" class="m-r-10">
        <view class="put-operate p-r-10 relative">
          <view class="price-guide" @click="goWarehouseInfo">仓库信息</view>
          <block v-if="isFirstEnter">
            <VoIcon
              :opacity="0.7"
              :size="24"
              class="tooltip-box__arrow"
              color="#111111"
              name="arrow-top-fill"
            />
            <view class="tooltip-box color-white fz-24">
              提前设置仓库发货时效、定制服务等，更容易收到买家订单哦～
              <view class="flex flex-justify-c">
                <view class="white-btn m-t-24" @click="toKnow">我知道了</view>
              </view>
            </view>
          </block>
        </view>
      </view>
    </VoNav>

    <view v-for="(item, index) of listData" :key="index">
      <view class="h16 w-full line-bg" />
      <view class="pro">
        <view class="fz-28 lh150 color-block-45 m-b-20">商品编号：{{ item.code }}</view>
        <view class="flex">
          <image :src="$transferCosUrl(item.pic)" class="pro-img" />
          <view class="flex1 overflow-x-hidden">
            <view class="fz-32 lh150 fz-b overTwoEllipsis">
              <text v-show="item.categoryType" class="good-tips m-r-8">{{item.categoryType}}</text>
              {{ item.name }}
            </view>
            <view class="fz-24 lh150 color-block-65 m-t-8"> 仓库费用：{{ item.price }}元 </view>
          </view>
        </view>
      </view>
    </view>

    <VoNoData v-if="listData.length === 0" no-data-tips="您还没有相关订单" />

    <view class="p-b-safe-area" />
  </view>
</template>

<script>
  export default {
    name: 'WarehouseCost',
    components: {},

    data() {
      return {
        info: {},
        listData: [],
        pageNo: 1,
        pageSize: 10,
        total: 0,
        isFirstEnter: true,
      }
    },
    methods: {
      initList(init) {
        if (init) {
          this.listData = []
          this.pageNo = 1
        }
        let param = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        }
        this.$VoHttp.GOODS.apiGoodsQueryWarehousesGoodsList$Post(param).then((res) => {
          res.data.records.map((item) => {
            this.listData.push(item)
          })
          this.total = res.data.total
        })
      },
      goWarehouseInfo() {
        this.$linkToEasy(
          '/pagesSupplier/Warehouse/WarehouseList/AddWarehouse?isEdit=1&warehouseId=' +
            this.info.warehouseId,
        )
      },
      initFn() {
        this.$VoHttp.WAREHOUSE.apiWarehouseMyWarehouses().then((res) => {
          this.info = res.data.ownWareHouse[0]
        })
      },
      //我知道了事件
      toKnow() {
        //不再是第一次进入该页面
        this.isFirstEnter = false
        let firstInWareCostData = {
          isFirst: 0,
        }
        this.$storage.set('firstInWareCost', firstInWareCostData)
      },
    },
    onShow() {
      let data = this.$storage.get('firstInWareCost')
      this.isFirstEnter = data && !data.isFirst ? false : true
    },
    onLoad(options) {
      this.initFn()
      this.initList('init')
    },
    onReachBottom() {
      if (this.total > this.listData.length) {
        this.pageNo++
        this.initList()
      }
    },
  }
</script>

<style lang="scss" scoped>
  .center {
    width: 750rpx;
    min-height: 100vh;
    background: #ffffff;
    .pro {
      width: 750rpx;
      padding: 24rpx 32rpx;
      box-sizing: border-box;
      &-img {
        width: 128rpx;
        height: 128rpx;
        border-radius: 8rpx;
        overflow: hidden;
        margin-right: 16rpx;
      }
    }

    .put-operate {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .more-icon {
        margin-left: 28rpx;
      }
    }

    .price-guide {
      padding: 14rpx 22rpx;
      box-sizing: border-box;
      background-color: #ffffff;
      border-radius: 200rpx;
      border: 2rpx solid $color-primary-yellow;
      font-size: 24rpx;
      color: $color-primary-yellow;
      line-height: 1;
    }
    .tooltip-box {
      padding: 24rpx;
      box-sizing: border-box;
      background: rgba(17, 17, 17, 0.7);
      position: absolute;
      top: 70rpx;
      right: -60rpx;
      z-index: 99;
      text-align: justify;
      border-radius: 8rpx;
      &__arrow {
        // width: 12rpx;
        // height: 12rpx;
        // transform: rotate(45deg);
        position: absolute;
        top: 50rpx;
        right: 60rpx;
        // background: rgba(17, 17, 17, 0.7);
      }
    }
    .white-btn {
      width: 200rpx;
      height: 48rpx;
      line-height: 48rpx;
      text-align: center;
      border: 1px solid #ffffff;
      border-radius: 100px;
    }
  }
  .good-tips {
    height: 36rpx;
    line-height: 36rpx;
    font-size: 24rpx;
    color: $color-primary-yellow;
    padding: 0 12rpx;
    background: $v-tags-btn-disabled;
    border-radius: 24rpx;
  }
</style>
