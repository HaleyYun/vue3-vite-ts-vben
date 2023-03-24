<template>
  <view class="item">
    <view class="item-top">
      <view class="item-top__left">
        {{ item.warehouseName || '' }}
      </view>
      <view v-if="!isPlat" class="item-top__right" @click.stop="goEditFn(item.warehouseId)">
        <view class="line" />
        <VoIcon :opacity="0.65" :size="20" color="#000" name="edit" />
        <view class="edit">编辑</view>
      </view>
    </view>

    <view class="item-content">
      共有<span class="color-red">{{ item.goodsCategoryNum || 0 }}</span
      >个品类，<span class="color-red">{{ item.goodsNum || 0 }}</span
      >件货品
    </view>
    <view class="line-holder m-b-32"></view>
    <view v-if="isPlat" class="item-group">
      <view class="item-text__btn" @click.stop="goRecord">出入库记录</view>
      <view class="item-text__btn" @click.stop="goWarehouseDetail">库存</view>
      <view class="item-text__btn" @click.stop="goRepair">补货</view>
      <view class="item-text__btn" @click.stop="goAllot">调拨</view>
    </view>
    <view v-else class="item-group">
      <view class="item-text__btn" @click.stop="goRecord">出入库记录</view>
      <view class="item-text__btn" @click.stop="goWarehouseDetail">库存</view>
      <view v-if="item.useWms" class="item-text__btn" @click.stop="goRepair">补货</view>
      <view v-if="item.useWms" class="item-text__btn" @click.stop="goAllot">调拨</view>
      <view v-if="!item.useWms" class="item-text__btn" @click.stop="delWarehouseFn">删除</view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'WarehouseItem',
    props: {
      isPlat: {
        type: Boolean,
        default: false,
      },
      item: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        isLoading: false,
      }
    },
    methods: {
      /**
       * 删除仓库
       */
      delWarehouseFn() {
        let that = this
        uni.showModal({
          title: '提示',
          content: '确定要删除该仓库吗？',
          confirmColor: '#22284B',
          success: function (res) {
            if (res.confirm) {
              if (that.isLoading) return
              that.isLoading = true
              that.$VoHttp
                .apiWarehouse$Delete({ id: that.item.warehouseId })
                .then((res) => {
                  uni.$u.toast('删除成功')
                  setTimeout(() => {
                    that.$emit('initData')
                  }, 1500)
                })
                .catch((e) => {
                  uni.$u.toast(e.message || '删除失败')
                })
                .finally(() => {
                  that.isLoading = false
                })
            }
          },
        })
      },
      /**
       * 跳转去编辑
       */
      goEditFn(warehouseId) {
        this.$linkToEasy(
          '/pagesSupplier/Warehouse/WarehouseList/AddWarehouse?isEdit=1&warehouseId=' +
            this.item.warehouseId,
        )
      },
      /**
       * @description 调拨
       */
      goAllot() {
        this.$linkToEasy(
          '/pagesSupplier/Warehouse/WarehouseList/WarehouseAllotPro?warehouseId=' +
            this.item.warehouseId +
            '&warehouseName=' +
            this.item.warehouseName,
        )
      },
      /**
       * @description 补货
       */
      goRepair() {
        this.$linkToEasy(
          '/pagesSupplier/Warehouse/WarehouseList/WarehouseRepairPro?warehouseId=' +
            this.item.warehouseId +
            '&warehouseName=' +
            this.item.warehouseName +
            '&type=1' +
            '&isSelf=' +
            this.item.type,
        )
      },
      /**
       * @description 出入库记录
       */
      goRecord() {
        console.log('11111111')
        this.$linkToEasy(
          '/pagesSupplier/Warehouse/WarehouseList/WarehouseRecordList?warehouseId=' +
            this.item.warehouseId +
            '&warehouseName=' +
            this.item.warehouseName,
        )
      },
      /**
       * @description 去库存详情
       */
      goWarehouseDetail() {
        this.$linkToEasy(
          '/pagesSupplier/Warehouse/WarehouseList/WarehouseDetail?warehouseId=' +
            this.item.warehouseId +
            '&warehouseName=' +
            this.item.warehouseName +
            '&isSelf=' +
            this.item.type,
        )
      },
    },
  }
</script>

<style lang="scss" scoped>
  .item {
    margin-top: 16rpx;
    width: 750rpx;
    background-color: #ffffff;
    padding: 32rpx;
    box-sizing: border-box;
    &-top {
      display: flex;
      align-items: flex-start;
      margin-bottom: 32rpx;
      &__left {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        color: rgba(0, 0, 0, 0.85);
        font-size: 32rpx;
        line-height: 48rpx;
        font-weight: bold;
      }
      &__right {
        height: 48rpx;
        display: flex;
        align-items: center;
        .line {
          width: 2rpx;
          height: 24rpx;
          background-color: #d3d4db;
          margin-left: 16rpx;
          margin-right: 16rpx;
        }
        .edit {
          font-size: 28rpx;
          color: rgba(0, 0, 0, 0.65);
          margin-left: 8rpx;
        }
      }
    }
    &-content {
      color: rgba(0, 0, 0, 0.85);
      font-size: 28rpx;
      line-height: 150%;
      margin-bottom: 32rpx;
      .color-red {
        color: #e50012;
      }
    }
    &-group {
      display: flex;
      justify-content: flex-end;
      &__btn {
        margin-left: 18rpx;
      }
    }
  }
  .item-text__btn {
    font-size: 24rpx;
    color: $v-c0-85;
    line-height: 64rpx;
    width: 152rpx;
    height: 64rpx;
    border: 2rpx solid #d3d4db;
    border-radius: 32rpx;
    text-align: center;
    justify-content: center;
    margin-left: 16rpx;
    box-sizing: border-box;
  }
  .line-holder {
    background-color: #f7f7f8;
    height: 2rpx;
  }
</style>
