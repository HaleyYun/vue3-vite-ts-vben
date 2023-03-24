<template>
  <view class="code">
    <view class="code-title flex flex-justify-c flex-vertical-c">
      <view class="code-title__left">增值服务</view>
    </view>
    <view class="code-line" />
    <view class="code-con">
      <view
        v-for="(item, key) in addServices"
        :key="key"
        class="fz-28 color-block flex flex-vertical-c flex-justify-between m-t-24"
      >
        <view>{{ item.name }}：</view>
        <view class="m-l-8">{{ item.price }} 元</view>
      </view>
    </view>
    <view class="p-b-40 m-r-32 flex flex-justify-r">
      <text class="p-r-10">合计:</text>
      <VoPointPrice :price="addServieAmount" :show-unit="true" />
    </view>
    <view class="code-bottom p-b-safe-area">
      <EraButton circle @click="close" />
    </view>
  </view>
</template>

<script>
  export default {
    name: 'AddServicePrice',
    props: {
      addServices: {
        type: Array,
        default: [],
      },
      addServieAmount: {
        type: String,
        default: '',
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
    &-line {
      background-color: $v-bg-light;
      height: 2rpx;
      width: 100%;
      margin-top: 24rpx;
    }
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
      padding: 16rpx 32rpx 48rpx 32rpx;
      line-height: 40rpx;
      &__img {
        width: 218rpx;
        height: 218rpx;
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
