<template>
  <view class="notice" v-show="visible">
    <!-- <VoIcon name="notice" color="#ffffff" :size="" /> -->
    <image class="notice-icon" src="/static/icons/notice.png" />
    <view class="notice-text">
      {{ text }}
    </view>
    <VoIcon name="close" color="#8B8D95" :size="20" @click="close" />
  </view>
</template>
<script>
  export default {
    name: 'ApplySale',
    props: {
      text: {
        type: String,
        require: true,
      },
    },
    data() {
      return {
        visible: true,
      }
    },
    methods: {
      show() {
        this.visible = true
      },
      close() {
        this.visible = false
      },
      confirm() {
        this.visible = false
      },
    },
  }
</script>
<style lang="scss" scoped>
  .notice {
    background: #feecee;
    padding: 20rpx 20rpx 20rpx 24rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    &-icon {
      width: 40rpx;
      height: 40rpx;
    }
    &-text {
      flex: 1;
      color: #ee0a24;
      font-size: 12px;
      line-height: 1.5;
      padding-left: 16rpx;
    }
  }
</style>
