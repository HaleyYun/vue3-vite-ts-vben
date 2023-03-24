<template>
  <view class="cct">
    <VoNav :is-transparent="true" />
    <view class="flex flex-row w-full flex-justify-between">
      <view class="cct-title fz-48 lh150 m-t-32 m-l-48">请选择<br />您的主体类型</view>
      <image :src="img" class="cct-img m-t-16"></image>
    </view>
    <view class="cct-view bg-white" @click="choose(1)">
      <view class="fz-b fz-36 color-block lh150">个人类型</view>
      <view class="fz-24 color-block-45 lh150 m-t-24 m-b-42"
        >不需要营业执照、对公账户等资料，认证更快捷。</view
      >
    </view>
    <view class="cct-view bg-white m-t-64" @click="choose(2)">
      <view class="fz-b fz-36 color-block lh150">企业类型</view>
      <view class="fz-24 color-block-45 lh150 m-t-24 m-b-42"
        >提交企业完整法体信息，认证后可使用更全面的功能。</view
      >
    </view>
  </view>
</template>

<script>
  export default {
    name: 'CreateChooseType',
    data() {
      return {
        img: '/static/common/authentication_img.png',
      }
    },
    methods: {
      choose(i) {
        this.$linkToEasy('/pagesChannelManager/HomePage/CreateService?type=' + i)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .cct {
    width: 750rpx;
    height: 100vh;
    background: #ffffff;
    background-image: url('/static/garage/user/user_bg.png');
    background-repeat: no-repeat;
    background-size: 100% 868rpx;
    &-title {
      font-weight: bold;
      color: black;
    }
    &-img {
      width: 332rpx;
      height: 248rpx;
    }
    &-view {
      box-sizing: border-box;
      padding: 32rpx;
      margin-left: 32rpx;
      margin-right: 32rpx;
      border-radius: 8rpx;
      box-shadow: 0rpx 4rpx 16rpx rgba(34, 40, 75, 0.1);
    }
  }
</style>
