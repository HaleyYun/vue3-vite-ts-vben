<template>
  <view>
    <u-popup :overlay="isShowOverlay" :show="show" mode="top" @close="closeHandler">
      <view>
        <VoBatteryBar />
        <view class="direct-title fz-0 px-40 flex-vertical-c flex flex-justify-between">
          <view class="fz-28 title-text">快捷入口</view>
          <view @click="closeHandler">
            <VoIcon
              :opacity="0.85"
              :size="15"
              color="#000000"
              name="close-x"
            />
          </view>
        </view>
        <view class="direct-list">
          <view class="direct-item" @click="goHome">
            <view class="direct-inner">
              <VoIcon :size="60" name="home-mul" />
              <view class="direct-text">首页</view>
            </view>
          </view>
          <view class="direct-item" @click="goImList">
            <view class="direct-inner">
              <VoIcon :size="60" name="message-mul" />
              <view class="direct-text">消息</view>
            </view>
          </view>
          <view class="direct-item" @click="imFn">
            <view class="direct-inner">
              <VoIcon :size="60" name="service-client" />
              <view class="direct-text">平台客服</view>
            </view>
          </view>
          <view class="direct-item" @click="complainFn">
            <view class="direct-inner">
              <VoIcon :size="60" name="complaint" />
              <view class="direct-text">投诉</view>
            </view>
          </view>
        </view>
      </view>
    </u-popup>

    <VoHelpAction ref="helpRef"></VoHelpAction>
    <VoComplaintAction ref="complaintRef" :is-hack="isHack"></VoComplaintAction>
  </view>
</template>

<script>
  import { toRoleHome } from '@/common/helper'

  export default {
    name: 'VoQuick',
    props: {
      show: {
        type: Boolean,
        default: false,
      },
      isHack: {
        type: Boolean,
        default: false,
      },
      isShowOverlay: {
        type: Boolean,
        default: true,
      },
    },
    methods: {
      goImList() {
        this.$storage.set('toIm', 1)
        toRoleHome()
      },
      /**
       * 去首页
       */
      goHome() {
        toRoleHome()
      },
      /**
       * 客服列表
       */
      imFn() {
        this.closeHandler()
        this.$refs.helpRef.open()
      },
      /**
       * 投诉列表
       */
      complainFn() {
        this.closeHandler()
        console.log(this.isHack)
        this.$refs.complaintRef.open()
      },
      closeHandler() {
        this.$emit('update:show', false)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .direct-list {
    display: flex;
    padding: 10rpx 48rpx 24rpx;
    .direct-item {
      flex: 1;
      text-align: center;
      .direct-inner {
        display: flex;
        flex-direction: column;
        align-items: center;
        .direct-text {
          margin-top: 16rpx;
          color: rgba(0, 0, 0, 0.85);
          font-size: 24rpx;
          line-height: 1.5;
        }
      }
    }
  }

  .direct-title {
    padding-top: 20rpx;
    background-color: #fff;
    .title-text {
      color: rgba(0, 0, 0, 0.65);
      line-height: 1.5;
    }
  }
</style>
