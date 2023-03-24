<template>
  <view class="shopinfo w-full m-b-safe-area">
    <view v-for="item in shopInfoList" :key="item.id" class="bg-white" @click="toGoodsDetail(item)">
      <view class="shopinfo-item shopinfo-line w-full bg-white">
        <view class="flex flex-row flex-justify-between">
          <view class="shopinfo-number">商品编号：{{ item.code || item.id }}</view>
<!--          <view v-if="item.breakRule === 0" v-show="item.status === 2" class="shopinfo-text3"-->
<!--            >待整改</view-->
<!--          >-->
<!--          <view v-if="item.breakRule === 1" v-show="item.status === 2" class="shopinfo-text3"-->
<!--            >审核中</view-->
<!--          >-->
<!--          <view v-if="item.breakRule === 2" v-show="item.status === 2" class="shopinfo-text3"-->
<!--            >审核未通过</view-->
<!--          >-->
        </view>
        <view class="flex flex-row w-full m-t-24">
          <view class="shopinfo-img">
            <image
              v-if="item.pic.split('.').pop() === 'mp4'"
              :src="`${item.pic}&type=3`"
              class="shopinfo-img"
            />
            <image v-else :src="item.pic" class="shopinfo-img" />
<!--            <view v-if="item.warning === 0" class="shopinfo-sale">在售</view>-->
<!--            <view v-if="item.warning === 1" class="shopinfo-sale">缺货</view>-->
<!--            <view v-if="item.warning === 2" class="shopinfo-sale">无货</view>-->
          </view>

          <view class="flex1 flex flex-column m-l-16">
            <view class="shopinfo-title">{{ item.name }}</view>
            <view class="flex m-t-16 flex-vertical-c">
              <template v-if="item.cashPrice">
                <view class="shopinfo-text1">现金</view>
                <VoPointPrice
                  :left-size="14"
                  :price="item.cashPrice"
                  :right-size="12"
                  :show-unit="true"
                  class="m-l-8 lh42 m-r-24"
                  color="#E50012"
                  display="inline-block"
                />
              </template>
              <template v-if="item.accountPrice">
                <view class="shopinfo-text1">{{ item.accountPeriodDays }}天帐期</view>
                <VoPointPrice
                  :left-size="14"
                  :price="item.accountPrice"
                  :right-size="12"
                  :show-unit="true"
                  class="m-l-8 lh42"
                  color="#E50012"
                  display="inline-block"
                />
              </template>
            </view>
            <view
              v-if="item.maxPredictProfit && item.minPredictProfit"
              class="flex flex-row m-t-8 flex-vertical-c text-center"
            >
              <view class="shopinfo-grey">预计收益</view>
              <VoPointPrice
                :left-size="14"
                :price="item.minPredictProfit"
                :right-size="12"
                :show-unit="true"
                class="m-l-8 lh42"
                color="rgba(0, 0, 0, 0.65)"
              />
              <view class="shopinfo-text2">-</view>
              <VoPointPrice
                :left-size="14"
                :price="item.maxPredictProfit"
                :right-size="12"
                :show-unit="true"
                class="lh42"
                color="rgba(0, 0, 0, 0.65)"
              />
<!--              <VoIcon :opacity="0.45" class="m-l-8" name="account-question" size="16" />-->
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'ServiceShopInfo',
    props: {
      // 商品列表
      shopInfoList: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {}
    },
    methods: {
      toGoodsDetail(item) {
        this.$linkToEasy('./GoodsDetail?id=' + item.id)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .shopinfo {
    background-color: #f7f7f8;
    box-sizing: border-box;
    padding-top: 16rpx;
    &-view1 {
      height: 96rpx;
      justify-content: space-around;
      padding: 18rpx 46rpx 14rpx;
      box-sizing: border-box;
    }
    &-screen {
      padding: 14rpx 48rpx;
      font-size: 24rpx;
      line-height: 36rpx;
      color: #ff5319;
      background-color: #ffece5;
      border: 2rpx solid #ff6633;
      border-radius: 200rpx;
    }
    &-screen1 {
      padding: 14rpx 48rpx;
      font-size: 24rpx;
      line-height: 36rpx;
      color: $v-c0-85;
      background-color: #f7f7f8;
      border-radius: 200rpx;
    }
    &-screen2 {
      padding: 14rpx 48rpx;
      font-size: 24rpx;
      line-height: 36rpx;
      color: #e50012;
      background-color: #feecee;
      border-radius: 200rpx;
      border: 2rpx solid;
    }
    &-item {
      padding: 24rpx 32rpx;
      box-sizing: border-box;
    }
    &-number {
      font-size: 28rpx;
      line-height: 42rpx;
      color: $v-c0-45;
    }
    &-img {
      position: relative;
      width: 128rpx;
      height: 128rpx;
      border-radius: 8rpx;
    }
    &-sale {
      position: absolute;
      color: #fff;
      background: #26bf26;
      border-radius: 8rpx 0 16rpx;
      box-sizing: border-box;
      padding: 0 16rpx;
      left: 0;
      top: 0;
      font-size: 24rpx;
      line-height: 36rpx;
    }
    &-title {
      font-size: 32rpx;
      font-weight: bold;
      line-height: 48rpx;
      color: $v-c0-85;
    }
    &-text1 {
      box-sizing: border-box;
      padding: 2rpx 4rpx;
      font-size: 24rpx;
      line-height: 28rpx;
      background: #fdf2f3;
      color: #ec404d;
      border: 2rpx solid #ec404d;
      border-radius: 4rpx;
      align-self: center;
    }
    &-text2 {
      font-size: 28rpx;
      font-weight: bold;
      line-height: 36rpx;
      color: $v-c0-65;
    }
    &-text3 {
      font-size: 28rpx;
      line-height: 42rpx;
      color: #ff5319;
      text-align: right;
    }
    &-grey {
      box-sizing: border-box;
      padding: 2rpx 4rpx;
      font-size: 24rpx;
      line-height: 28rpx;
      background: #f6f7f8;
      color: $v-c0-65;
      border: 2rpx solid #d3d4db;
      border-radius: 4rpx;
      align-self: center;
    }
  }
</style>
