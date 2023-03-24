<template>
  <u-popup v-if="visible" :round="8" :show="visible" class="popup" mode="bottom" @close="close">
    <view class="popup-title">
      <view class="popup-title__text">{{ record.name }}</view>
      <view class="popup-title__right">
        <VoIcon :opacity="0.85" :size="20" color="#000000" name="close" @click="close" />
      </view>
    </view>
    <view class="popup-row">
      <view class="popup-row__title"> 工厂仓库库存 </view>
      <view v-for="(item, index) in ownWareHouse" :key="item.id" class="popup-row__item">
        <view class="left">
          {{ item.warehouseName }}：
          <text :class="item.warnLabel ? 'red' : ''">{{ item.availableNumber }}</text>
          <view v-if="item.warnLabel" class="left-tag">{{ item.warnLabel }}</view>
        </view>
        <view v-if="!item.edit" class="right-btn" @click="showNumBox(item, index)">{{
          item.availableNumber
        }}</view>
        <view v-else class="right">
          <u-number-box v-model="item.newAvailableNumber" :min="0" integer />
        </view>
      </view>
      <!-- <view class="popup-row__item border">
        <view class="left">郑州仓：<text>5</text></view>
        <view class="right">
          <u-number-box :min="1" :max="100" />
        </view>
      </view> -->
    </view>
    <view class="popup-row">
      <view class="popup-row__title"> 平台仓库库存 </view>
      <view v-for="item in platWareHouse" :key="item.id" class="popup-row__item">
        <view class="left">
          {{ item.warehouseName }}：
          <text :class="item.warnLabel ? 'red' : ''">{{ item.availableNumber }}</text>
          <view v-if="item.warnLabel" class="left-tag">{{ item.warnLabel }}</view>
        </view>
        <view class="right-btn round" @click="addGoods(item)">申请补货</view>
      </view>
    </view>
    <view class="popup-btn">
      <view class="popup-btn__item left" @click="close"> 取消 </view>
      <view class="popup-btn__item" @click="confirm()"> 确定 </view>
    </view>
  </u-popup>
</template>
<script>
  import helper from '@/common/helper'

  export default {
    name: 'GoodsPop',
    data() {
      return {
        visible: false,
        record: '',
        ownWareHouse: [],
        platWareHouse: [],
        formData: [],
      }
    },
    methods: {
      show(data) {
        console.log(data);

        data.levelVOS.forEach((item) => {

        })
      },
      close() {
        this.visible = false
      },
      confirm() {
        console.log('this.ownWareHouse', this.ownWareHouse)
        let arr = this.ownWareHouse.map((item) => {
          return {
            goodsId: this.record.id,
            warehouseId: item.warehouseId,
            changeNumber: item.newAvailableNumber,
          }
        })
        console.log('arr22', arr)
        this.$VoHttp
          .apiWarehouseOperRecyclingSelfRefillBatch({
            boList: arr,
          })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('操作成功')
            }
            this.$emit('confirm')
          })
      },
      //显示步进器
      showNumBox(item, index) {
        this.ownWareHouse[index].edit = true
        this.$forceUpdate()
      },
      //跳转平台仓补货
      addGoods(item) {
        this.$linkToEasy(
          `/pagesSupplier/Warehouse/WarehouseList/WarehouseRepairPro?warehouseId=${item.warehouseId}&warehouseName=${item.warehouseName}&type=1&isSelf=0&goodsName=${this.record.name}&goodsId=${this.record.id}`,
        )
      },
    },
  }
</script>
<style lang="scss" scoped>
  .popup {
    &-title {
      padding: 24rpx 0;
      display: flex;
      border-bottom: 1px solid #f7f7f8;
      &__text {
        flex: 1;
        font-weight: 500;
        color: $v-c0-85;
        font-size: 32rpx;
        line-height: 1.5;
        padding-left: 32rpx;
        padding-right: 38rpx;
      }
      &__right {
        width: 40rpx;
        padding-right: 24rpx;
      }
    }
    &-row {
      &__title {
        padding: 24rpx 32rpx 0 32rpx;
        font-weight: 500;
        color: $v-c0-85;
        font-size: 32rpx;
        line-height: 1.5;
      }
      &__item {
        padding: 24rpx 32rpx 24rpx 32rpx;
        box-sizing: border-box;
        border-bottom: 1px solid #f7f7f8;
        display: flex;
        &.border {
          border-bottom: 8rpx solid #f7f7f8;
        }
        .left {
          flex: 1;
          display: flex;
          align-items: center;
          color: $v-c0-85;
          font-size: 28rpx;
          line-height: 1.5;
          .red {
            color: #e50012;
          }
          &-tag {
            height: 36rpx;
            border: 1px solid #e50012;
            border-radius: 11px;
            padding: 0 16rpx;
            color: #e50012;
            font-size: 24rpx;
            line-height: 36rpx;
            margin-left: 16rpx;
          }
        }
        .right {
          padding-right: 16rpx;
          &-btn {
            border: 1px solid rgba(0, 0, 0, 0.65);
            border-radius: 4px;
            text-align: center;
            height: 48rpx;
            width: 96rpx;
            font-size: 24rpx;
            color: $v-c0-85;
            line-height: 48rpx;
            &.round {
              border: 1px solid #22284b;
              border-radius: 15px;
              color: #22284b;
              padding: 0 26rpx;
            }
          }
        }
      }
    }
    &-btn {
      display: flex;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      &__item {
        flex: 1;
        background: #22284b;
        border-radius: 32px;
        text-align: center;
        color: #ffffff;
        font-size: 32rpx;
        line-height: 92rpx;
        &.left {
          margin-right: 40rpx;
          background: #fff;
          border: 1px solid #22284b;
          color: #22284b;
        }
      }
    }
  }
</style>
