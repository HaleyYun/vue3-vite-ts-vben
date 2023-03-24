<template>
  <view class="noStock">
    <view class="noStock-title">抱歉，您本单购买的以下商品已过期</view>
    <view class="noStock-list" v-for="(info, index) in outData" :key="index">
      <view class="noStock-list__line flex">
        <view class="imgBox">
          <image class="noStock-img" :src="info.goodsPic" />
        </view>
        <view class="flex1">
          <view class="fz-b fz-32 lh48 color-block-45">
            <text class="type-sign">B类</text>
            <text>{{ info.goodsName }}</text>
          </view>
          <view class="flex">
            <view class="noStock-free noStock-noStock m-t-8">{{ Number(info.shippingType)===1?'包邮':'到付' }}</view>
          </view>
          <view class="flex flex-justify-between flex-vertical-c m-t-16">
            <view class="color-red lh42">
              <text class="type-sign red-type">{{ info.isCash === 1 ? '现金' : '账期' }}</text>
              <VoPointPrice
                :price="info.isCash === 1
                ? info.cashPrice : info.accountPrice"
                :show-unit="true"
                display="inline-block"
              />
            </view>
            <view class="lh40 color-block-45 fz-26">X{{ info.goodsNum }}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="noStock-bottom flex">
      <view class="noStock-bottom__button flex1 color-block-65" @click="close">再想想</view>
      <view class="noStock-bottom__button flex1 color-block-main fz-b" @click="deleteGoods">移除该商品</view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'OutOfStockPopup',
    props: {
      outData: {
        type: Array,
        default: () => {
          return [
            {
              goodsName: '过期商品名字',
              goodsPic: '/static/demo/rectangle.png', // 过期商品图片
              shippingType: 1, // 快递方式
              isCash: 1, // 现金/账期
              cashPrice: '10.00',
              accountPrice: '12.00',
              goodsNum: 200
            }
          ]
        }
      }
    },
    data() {
      return {

      }
    },
    methods: {
      // 删除商品
      deleteGoods() {

      },
      close() {
        this.$emit('close')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .noStock {
    width: 638rpx;
    &-title {
      text-align: center;
      margin: 48rpx 0;
      height: 48rpx;
      line-height: 48rpx;
      font-size: 32rpx;
      color: $v-c0-85;
    }
    &-list {
      padding: 0 24rpx;
      box-sizing: border-box;
      &__line {
        padding: 16rpx 0;
        border-bottom: 2rpx solid $v-bg-light;
      }
    }
    .type-sign{
      font-size: 24rpx;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.85);
      background: #F6F7F8 ;
      border-radius: 8rpx;
      padding: 4rpx 16rpx;
      margin-right: 8rpx;
    }
    .red-type {
      color: #EC404D;
      background: #FDF2F3;
      padding: 4rpx 8rpx;
      border: 1px solid #EC404D;
    }
    .imgBox {
      position: relative;
      width: 128rpx;
      height: 128rpx;
      border-radius: 8rpx;
      margin-right: 16rpx;
      overflow: hidden;
      .noStock-img {
        width: 128rpx;
        height: 128rpx;
      }
    }
    &-free {
      //height: 36rpx;
      line-height: 36rpx;
      padding: 0 16rpx;
      box-sizing: border-box;
      font-size: 24rpx;
      border-radius: 8rpx;
    }
    &-noStock {
      border: 2rpx solid rgba(0, 0, 0, 0.45);
      color: $v-c0-45;
    }
    &-bottom {
      width: 100%;
      background: #ffffff;
      &__button {
        text-align: center;
        padding: 20rpx 0;
        box-sizing: border-box;
        font-size: 32rpx;
        &:first-child {
          border-right: 2rpx solid $v-bg-light;
        }
      }
    }
    &-button {
      text-align: center;
      padding: 20rpx 0;
      font-size: 32rpx;
      color: #22284b;
      font-weight: bold;
      border-top: 2rpx solid $v-bg-light;
    }
  }
</style>
