<template>
  <view>
    <view class="details">
      <VoNav is-fixed title="商品库存详情" is-have-more>

      </VoNav>
      <view class="details-info">
        <view class="flex flex-vertical-c">
          <view class="details-info__num fz-26">商品编号：{{ goodsData.code }}</view>
          <view class="fz-24 color-155bd4 m-l-12" @click.stop="copyHandler(goodsData.code)"
            >复制</view
          >
        </view>
        <view class="details-info__con flex m-t-24">
          <view class="con-img">
            <image :src="JSON.parse(goodsData.pic)[0] + '&type=1'" class="con-img__img" />
            <view
              :class="`tag-${goodsData.queryStatus}`"
              class="con-img__sale replenishList-details__wait"
            >
              {{
                goodsData.queryStatus === 1
                  ? '在售'
                  : goodsData.queryStatus === 3
                  ? '待售'
                  : goodsData.queryStatus === 4
                  ? '库存预警'
                  : goodsData.queryStatus === 5
                  ? '无货'
                  : ''
              }}
            </view>
          </view>
          <view class="flex1 flex flex-column flex-justify-between">
            <view class="con-word overTwoEllipsis">
              <text v-show="goodsData.categoryType" class="good-tips m-r-8">{{
                goodsData.categoryType
              }}</text>
              <text> {{ goodsData.name }}</text>
            </view>
            <view class="flex">
              <view class="con-color fz-24 lh150 m-t-24 m-b-8 flex flex-vertical-c"
                >可用库存：<text class="con-red m-l-8">{{
                  goodsData.availableNumber || 0
                }}</text></view
              >
              <view class="con-color fz-24 lh150 m-t-24 m-b-8 flex flex-vertical-c m-l-32"
                >总库存：<text class="con-red m-l-8">{{ goodsData.sum || 0 }}</text></view
              >
            </view>
          </view>
        </view>
      </view>
      <view v-if="isShowCreate" class="details-noDetails">
        <view class="details-noDetails__line">
          <view class="flex flex-justify-r">
            <view class="line-create" @click="addWarehouseFn">创建仓库</view>
          </view>
          <view class="line-tips">尚未设置仓库和库存，客户无法下单，尽快去设置哦～</view>
        </view>
      </view>
      <DetailsList
        v-for="(item, index) of inventoryDetails"
        v-show="item.deListList.length"
        :key="index"
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
  import DetailsList from './components/DetailsList'

  export default {
    name: 'InventoryDetails',
    components: { DetailsList },
    data() {
      return {
        optionsId: '',
        showDirect: false,
        goodsData: {},
        inventoryDetails: [
          {
            title: '商家仓',
            deListList: [
              // {
              //   warehouse: '禹州仓',
              //   inventory: 5,
              // },
              // {
              //   warehouse: '郑州时风仓',
              //   inventory: 3,
              // },
            ],
          },
          {
            title: '平台仓',
            deListList: [
              // {
              //   warehouse: '禹州仓',
              //   inventory: 5,
              // },
              // {
              //   warehouse: '郑州时风仓',
              //   inventory: 3,
              // },
            ],
          },
        ],
        isShowCreate: false,
      }
    },
    onShow() {
      if (this.optionsId) {
        this.getWareInfo()
      }
    },
    onLoad(options) {
      this.optionsId = options.id
      this.goodsData = JSON.parse(options.goodsData)
      // this.getWareInfo()
    },
    methods: {
      //获取仓库信息
      getWareInfo() {
        this.$VoHttp
          .apiWarehouseStockCompanyGoodsWarehouse({
            goodId: this.optionsId,
          })
          .then((res) => {
            let ownWareHouse = res.data.ownWareHouse
            let platWareHouse = res.data.platWareHouse
            if (!ownWareHouse.length && !platWareHouse.length) {
              this.isShowCreate = true
              console.log(this.isShowCreate)
            }
            ownWareHouse.forEach((item) => {
              item.type = 'own'
            })
            platWareHouse.forEach((item) => {
              item.type = 'plat'
            })
            this.inventoryDetails[0].deListList = ownWareHouse
            this.inventoryDetails[1].deListList = platWareHouse
            this.inventoryTotal()
          })
          .catch((err) => {
            console.log(err)
          })
      },
      //计算可用库存总数
      inventoryTotal() {
        console.log(this.inventoryDetails)
        this.goodsData.availableNumber = 0
        this.goodsData.sum = 0
        this.inventoryDetails.forEach((item) => {
          item.deListList.forEach((good) => {
            this.goodsData.availableNumber = this.decimalAddFn(
              this.goodsData.availableNumber,
              good.availableNumber,
            )
            this.goodsData.sum = this.decimalAddFn(this.goodsData.sum, good.number)
          })
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
       * 去申请补货页面
       */
      goApplyReplenishment(item) {
        console.log(this.goodsData)
        this.$linkToEasy(
          `/pagesSupplier/Warehouse/WarehouseList/WarehouseRepairPro?warehouseId=${item.warehouseId}&warehouseName=${item.warehouseName}&type=1&isSelf=0&goodsName=${this.goodsData.name}&goodsId=${this.goodsData.id}`,
        )
      },
      // 复制
      copyHandler(code) {
        // 复制操作
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const _this = this
        uni.setClipboardData({
          data: code,
          success: function () {
            _this.$u.toast('复制成功')
          },
        })
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
          width: 128rpx;
          height: 128rpx;
          border-radius: 8rpx;
          margin-right: 16rpx;
          position: relative;
          &__img {
            width: 128rpx;
            height: 128rpx;
            border-radius: 8rpx;
          }
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
          font-size: 32rpx;
          line-height: 150%;
        }
        .con-color {
          color: $v-c0-65;
        }
        .con-red {
          color: #f20014;
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
          border: 2rpx solid $color-primary-yellow;
          border-radius: 30rpx;
          font-weight: bold;
          font-size: 24rpx;
          color: $color-primary-yellow;
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
  .good-tips {
    height: 36rpx;
    line-height: 36rpx;
    font-size: 24rpx;
    color: $color-primary-yellow;
    padding: 0 12rpx;
    background: $v-tags-btn-disabled;
    border-radius: 24rpx;
  }
  .color-155bd4 {
    color: #155bd4;
  }
</style>
