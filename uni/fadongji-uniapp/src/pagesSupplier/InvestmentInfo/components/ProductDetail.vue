<template>
  <view class="productDetail">
    <view class="productDetail-title">商品详情</view>
    <view class="productDetail-line" />
    <view class="productDetail-subTitle">图文介绍</view>
    <view class="productDetail-content">
      <image
        v-for="(src, index) in info.detailPic"
        :key="index"
        :src="isVideo(src)"
        class="productDetail-content__image"
        mode="widthFix"
      />
    </view>
  </view>
</template>

<script>
  export default {
    name: 'ProductDetail',
    props: {
      storeData: {
        type: Object,
        storeData: {},
      },
      info: {
        type: Object,
        default() {
          return {}
        },
      },
    },
    methods:{
      isVideo(url){
        if(this.$vocenApi.Pattern.isVideoUrl(url.toLocaleLowerCase())){
          return url+'&type=3'
        }else {
          return url
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .productDetail {
    padding: 24rpx 0rpx 0rpx;
    background-color: #ffffff;
    box-sizing: border-box;
    margin-top: 16rpx;
    &-title {
      padding: 0rpx 32rpx;
      color: $v-c0-85;
      font-size: 32rpx;
      font-weight: bold;
    }

    &-line {
      width: 100%;
      height: 2rpx;
      background-color: $v-bg-light;
      margin-top: 16rpx;
    }

    &-subTitle {
      padding: 24rpx 32rpx 16rpx;
      color: $v-c0-85;
      font-size: 28rpx;
      font-weight: bold;
    }

    &-info {
      margin-top: 16rpx;
      color: $v-c0-85;
      font-size: 26rpx;
    }

    &-content {
      padding: 0rpx 32rpx;

      &__image {
        width: 100%;
        height: 940rpx;
      }
    }
  }
</style>
