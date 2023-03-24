<template>
  <view class="wrap">
    <!--  头部  -->
    <view class="wrap-navigation flex flex-justify-between">
      <view class="wrap-navigation__left flex flex-vertical-c">
        <image class="left-return" src="/static/icons/left.png" @click="returnFn" />
        <view class="left-msg flex">消息设置</view>
      </view>
    </view>
    <!--  消息设置  -->
    <view class="wrap-List">
      <view class="wrap-list flex flex-justify-between">
        <view class="wrap-list__word">置顶聊天</view>
        <u-switch v-model="top" @change="change" />
      </view>
      <view class="wrap-list flex flex-justify-between">
        <view class="wrap-list__word">消息免打扰</view>
        <u-switch v-model="value" @change="change" />
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'SetUp',
    data() {
      return {
        top: true,
        value: true,
      }
    },
    methods: {
      change(e) {
        console.log('change', e)
      },
      // 返回上一页
      returnFn() {
        this.$backFn()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .wrap {
    width: 750rpx;
    min-height: 100vh;
    &-navigation {
      height: 100rpx;
      background-color: #fff;
      &__left {
        .left-return {
          width: 50rpx;
          height: 50rpx;
          margin: 0 20rpx;
        }
        .left-msg {
          font-size: 34rpx;
          margin: 0 16rpx;
        }
      }
    }
    &-list {
      padding: 30rpx;
      border-bottom: 2rpx solid rgb(214, 215, 217);
      background: #fff;
      &:first-child {
        border-top: 2rpx solid rgb(214, 215, 217);
      }
    }
  }
</style>
