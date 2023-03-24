<template>
  <view class="uploaded-photo">
    <image
      class="uploaded-photo__img"
      v-if="!upPhoto.firstSrc"
      :src="upPhoto.defaultFirstSrc"
      @click="upload"
    />
    <image @click="upload" class="uploaded-photo__img" v-else :src="$serveDomainFn(upPhoto.firstSrc)" />
    <view class="uploaded-photo__tips">{{ upPhoto.firstContent }}</view>
    <view v-if="twoPhotos">
      <image
        class="uploaded-photo__img margin-top"
        v-if="!upPhoto.secondSrc"
        :src="upPhoto.defaultSecondSrc"
        @click="uploadSecond"
      />
      <image @click="uploadSecond" class="uploaded-photo__img margin-top" v-else :src="$serveDomainFn(upPhoto.secondSrc)" />
      <view class="uploaded-photo__tips">{{ upPhoto.secondContent }}</view>
    </view>
  </view>
</template>

<script>
  import  {serveDomainFn} from  '@/common/helper'
  export default {
    name: 'UploadPhotos',
    props: {
      upPhoto: {
        type: Object,
        default: {
          defaultFirstSrc: '/static/created/certify/not_uploaded.png',
          firstSrc: '',
          firstContent: '拍照上传您的营业执照',
          defaultSecondSrc: '/static/created/certify/back.png',
          secondSrc: '',
          secondContent: '',
        },
      },
      twoPhotos: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      $serveDomainFn:serveDomainFn,
      upload() {
        this.$emit('upload')
      },
      uploadSecond(){
        this.$emit('uploadSecond')
      }
    },
  }
</script>

<style lang="scss" scoped>
  .uploaded-photo {
    background: #fff;
    width: 100%;
    text-align: center;
    padding: 16rpx 0;
    &__img {
      width: 686rpx;
      height: 468rpx;
      margin: 0 auto 8rpx;
      display: block;
    }
    &__tips {
      font-size: 32rpx;
      height: 48rpx;
      line-height: 48rpx;
      margin: 4rpx auto 0;
      color: $v-c0-65;
    }
  }
  .margin-top {
    margin-top: 28rpx;
  }
</style>
