<template>
  <view class="code">
    <view class="code-title flex flex-justify-between flex-vertical-c">
      <view class="code-title__left">定制服务</view>
      <view class="code-title__right">服务费：{{ addedServices.price }}/台</view>
    </view>
    <view class="code-con">
      <view class="fz-26 color-block flex flex-vertical-c flex-justify-between">
        <view>购买服务数量：</view>
        <view class="color-gray m-l-8">{{ addedServices.goodsCount }}</view>
      </view>
      <view class="fz-26 color-block m-t-24">发动机铭牌/行驶证照片：</view>
      <view v-if="addedServices.picList" class="flex flex-vertical-c m-t-16">
        <image
          v-for="(item, index) in addedServices.picList"
          :key="index"
          :src="item"
          class="code-con__img m-r-24"
          @click="lookPreviewImage(index)"
        />
      </view>
    </view>
    <view class="code-bottom p-b-safe-area">
      <EraButton circle @click="close" />
    </view>
  </view>
</template>

<script>
  export default {
    name: 'CodeService',
    props: {
      addedServices: {
        type: Object,
        default: {},
      },
    },
    methods: {
      close() {
        this.$emit('close')
      },
      lookPreviewImage(index) {
        // 预览图片
        uni.previewImage({
          urls: this.addedServices.picList,
          current: index,
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .code {
    width: 750rpx;
    &-title {
      height: 88rpx;
      padding: 0 32rpx;
      &__left {
        font-size: 32rpx;
        color: $v-c0-85;
        font-weight: bold;
      }
      &__right {
        font-size: 28rpx;
        color: $v-c0-45;
      }
    }
    &-con {
      padding: 48rpx 32rpx;
      line-height: 40rpx;
      &__img {
        width: 218rpx;
        height: 218rpx;
        border-radius: 8rpx;
      }
    }
    &-bottom {
      width: 100%;
      background: #ffffff;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      border-top: 2rpx solid $v-bg-light;
    }
  }
</style>
