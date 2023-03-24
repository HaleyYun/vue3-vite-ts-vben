<template>
  <view class="upload">
    <view class="upload-name flex flex-justify-between flex-vertical-c">
      <view class="upload-name__left">图片上传</view>
      <view class="upload-name__right">0/9</view>
    </view>
    <view class="upload-tips">图片上传提示</view>
    <view class="upload-pictures flex">
      <view class="upload-pictures__father">
        <image class="upload-pictures__img" src="/static/headPhoto/photo3.png" />
        <svg
          class="father-child"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="8" cy="8" r="7.5" fill="black" fill-opacity="0.3" stroke="white" />
          <path
            d="M5.87891 6.12109L10.1215 10.3637"
            stroke="white"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.1211 6.12109L5.87845 10.3637"
            stroke="white"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </view>
      <image class="upload-pictures__img margin-bottom" src="/static/circle/upload_pictures.png" />
    </view>
  </view>
</template>

<script>
  export default {
    name: 'ImageUpload',
    data() {
      return {}
    },
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .upload {
    width: 100%;
    padding: 0 32rpx;
    box-sizing: border-box;
    &-name {
      width: 686rpx;
      height: 48rpx;
      line-height: 48rpx;
      margin-bottom: 12rpx;
      &__left {
        font-weight: bold;
        font-size: 32rpx;
        color: $v-c0-85;
      }
      &__right {
        font-size: 28rpx;
        color: $v-c0-85;
      }
    }
    &-tips {
      font-size: 28rpx;
      color: $v-c0-25;
      height: 42rpx;
      line-height: 42rpx;
      margin-bottom: 32rpx;
    }
    &-pictures {
      flex-wrap: wrap;
      &__father {
        position: relative;
        margin-right: 16rpx;
        margin-bottom: 16rpx;
        &:nth-child(3n + 3) {
          margin-right: 0;
        }
        .father-child {
          position: absolute;
          top: 4rpx;
          right: 4rpx;
        }
      }
      &__img {
        width: 218rpx;
        height: 218rpx;
        display: block;
      }
    }
  }
  .margin-bottom {
    margin-bottom: 16rpx;
  }
</style>
