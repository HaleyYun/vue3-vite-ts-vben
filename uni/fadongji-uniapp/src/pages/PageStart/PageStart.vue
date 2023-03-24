<template>
  <view class="ad">

    <view class="ad-text">买</view>
    <view class="ad-text">发</view>
    <view class="ad-text">动</view>
    <view class="ad-text">机</view>
    <view class="ad-text">上</view>
    <view class="ad-text">发</view>
    <view class="ad-text">动</view>
    <view class="ad-text">集</view>

    <image src="/static/start/logo.png" class="ad-logo m-b-24"></image>
    <image src="/static/start/title.png" class="ad-title m-b-24"></image>
    <view class="fz-24 lh150 color-white">共享 · 共创 · 共赢</view>
  </view>
</template>

<script>
import { toRoleHome } from "@/common/helper";

export default {
    name: 'adPage',
    data() {
      return {}
    },
    onShow(){
      if (this.userInfo && this.userInfo.access_token) {
        toRoleHome()

      }else{
        uni.reLaunch({
          url:'/pages/CommonLogin/UserLogin'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .ad {
    width: 750rpx;
    height: 100vh;
    overflow: hidden;
    box-sizing: border-box;
    background: #fd2615;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5% 0rpx;
    &-text{
      font-size: 64rpx;
      line-height: 160%;
      color: #FFFFFF;
      font-weight: bold;
      text-align: center;
    }
    &-title{
      height: 36rpx;
      width: 114rpx;
      display: block;
    }
    &-logo{
      width: 100rpx;
      height: 100rpx;
      display: block;
      margin-top: 15%;
    }
  }
</style>
