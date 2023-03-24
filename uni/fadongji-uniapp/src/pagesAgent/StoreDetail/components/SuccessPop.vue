<template>
  <u-popup v-if="visible" mode="center" :overlay="false" :show="visible" @close="close">
    <view class="center-popup">
      <!-- <VoIcon name="right" color="#ffffff" :size="56" /> -->
      <image class="center-popup__img" src="/static/icons/success_icon.png" />
      <view class="center-popup__text">操作成功</view>
    </view>
  </u-popup>
</template>
<script>
  export default {
    name: 'SuccessPop',
    data() {
      return {
        visible: false,
      }
    },
    methods: {
      show() {
        this.visible = true
      },
      close() {
        this.visible = false
      },
    },
  }
</script>
<style lang="scss" scoped>
  .center-popup {
    background: rgba(17, 17, 17, 0.7);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 34rpx 70rpx 40rpx 70rpx;
    &__text {
      font-size: 28rpx;
      line-height: 1.5;
      text-align: center;
      color: #ffffff;
      padding-top: 24rpx;
    }
    &__img {
      width: 112rpx;
      height: 112rpx;
    }
  }
</style>
