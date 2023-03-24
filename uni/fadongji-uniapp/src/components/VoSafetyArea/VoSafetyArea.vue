<template>
  <view
    :class="{ 'safety-fixed': isFixed }"
    :style="{ zIndex: zIndex, backgroundColor: bgColor, opacity: opacity }"
    class="safety"
  >
    <view class="safety-group">
      <slot name="group"></slot>
    </view>
    <view class="safety-area"></view>
  </view>
</template>

<script>
  export default {
    name: 'VoSafetyArea',
    props: {
      /**
       * 透明度
       */
      opacity: {
        type: Number,
        default: 1,
      },
      /**
       * 优先级
       */
      zIndex: {
        type: Number,
        default: 10,
      },
      /**
       * 背景色
       */
      bgColor: {
        type: String,
        default: '#ffffff',
      },
      /**
       *  是否固定底部
       */
      isFixed: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {}
    },
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .safety {
    width: 750rpx;
    overflow-x: hidden;
    &-group {
      width: 750rpx;
    }
    &-area {
      height: constant(safe-area-inset-bottom);
      height: env(safe-area-inset-bottom);
      width: 100%;
    }
    &-fixed {
      position: fixed;
      left: 0rpx;
      bottom: 0rpx;
      z-index: 10;
    }
  }
</style>
