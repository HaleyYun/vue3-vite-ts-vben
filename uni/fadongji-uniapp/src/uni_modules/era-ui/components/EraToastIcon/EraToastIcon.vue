<template>
  <u-popup mode="center" :overlay="false" :show="visible">
    <view class="center-popup">
      <!-- <VoIcon name="right" color="#ffffff" :size="56" /> -->
      <image class="center-popup__img" src="/static/icons/success_icon.png" />
      <view class="center-popup__text">{{ desc }}</view>
    </view>
  </u-popup>
</template>
<script>
  export default {
    name: 'SuccessPop',
    props: {
      // 是否可见
      visible: {
        type: Boolean,
        default: false,
      },
      // 延迟关闭
      time: {
        type: [String, Number],
        default: 2000,
      },
      // 描述文案
      desc: {
        type: String,
        default: '操作成功',
      },
    },
    data() {
      return {}
    },
    watch: {
      visible() {
        setTimeout(() => {
          this.$emit('update:visible', false)
        }, this.time)
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
