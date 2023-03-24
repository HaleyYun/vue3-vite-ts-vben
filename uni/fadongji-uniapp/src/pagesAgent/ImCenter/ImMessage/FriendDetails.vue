<template>
  <div class="wrap">
    <VoNav title="" :isFixed="false">
      <view slot="back"> </view>
      <view slot="operation"> </view>
    </VoNav>
    <view class="wrap-title flex flex-justify-between">
      <view class="wrap-title__info flex flex-vertical-c">
        <u-avatar :src="src" />
        <view class="info-brief">
          <view class="info-brief__name">张老板</view>
          <view class="info-brief__nickname">昵称：乐天</view>
        </view>
      </view>
      <image class="wrap-title__edit" src="/static/icons/editor.png"></image>
    </view>
    <view class="wrap-list flex flex-justify-between flex-vertical-c" @click="goSetPermissions">
      <view class="wrap-list__name">设置权限</view>
      <image class="wrap-list__arrow" src="/static/icons/right-arrow.png"></image>
    </view>
    <view class="wrap-list flex flex-justify-between flex-vertical-c">
      <view class="wrap-list__name">逛逛主页</view>
      <image class="wrap-list__arrow" src="/static/icons/right-arrow.png"></image>
    </view>
    <view class="wrap-button flex flex-vertical-c flex-justify-c" @click="goChat">
      <image class="wrap-button__icon" src="/static/icons/comment.png"></image>
      <view class="wrap-button__msg">发消息</view>
    </view>
  </div>
</template>

<script>
  export default {
    name: 'FriendDetails',
    data() {
      return {}
    },
    methods: {
      // 去设置权限页
      goSetPermissions() {
        this.$linkToEasy('/pagesAgent/ImCenter/ImMessage/SetPermissions')
      },
      // 去聊天页面
      goChat() {
        this.$linkToEasy('/pagesAgent/ImCenter/ImMessage/ChatPage')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .wrap {
    width: 750rpx;
    min-height: 100vh;
    &-title {
      padding: 50rpx 40rpx 40rpx;
      &__edit {
        width: 40rpx;
        height: 40rpx;
      }
      &__info {
        .info-brief {
          margin-left: 30rpx;
          &__name {
            font-size: 34rpx;
            margin-bottom: 20rpx;
          }
          &__nickname {
            font-size: 28rpx;
            color: #999;
          }
        }
      }
    }
    &-list {
      padding: 30rpx;
      background: #fff;
      border-bottom: 2rpx solid rgb(214, 215, 217);
      &__name {
        font-size: 30rpx;
      }
      &__arrow {
        width: 50rpx;
        height: 50rpx;
      }
    }
    &-button {
      margin-top: 20rpx;
      height: 100rpx;
      background: #fff;
      &__icon {
        width: 40rpx;
        height: 40rpx;
      }
      &__msg {
        font-size: 32rpx;
        margin-left: 20rpx;
        font-weight: bold;
      }
    }
  }
</style>
