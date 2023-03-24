<template>
  <view class="group">
    <view
      :style="{ background: background, borderColor: borderColor }"
      class="group-box flex flex-vertical-c flex1"
      @click="leftBtnFn"
    >
      <slot name="leftVoIcon">
        <image :src="leftSrc" class="group-box__icon"></image>
      </slot>
      <view
        :style="{
          color: leftColor,
          fontSize: leftFontSize + 'rpx',
        }"
        class="fz-b"
      >
        <slot name="leftName">
          {{ leftName }}
        </slot>
      </view>
    </view>
    <view
      :style="{ background: background, borderColor: borderColor }"
      class="group-box flex flex-vertical-c flex1 m-l-22"
      @click="rightBtnFn"
    >
      <slot name="rightVoIcon">
        <image :src="rightSrc" class="group-box__icon"></image>
      </slot>
      <view
        :style="{
          color: rightColor,
          fontSize: rightFontSize + 'rpx',
        }"
        class="fz-b"
      >
        <slot name="rightName">
          {{ rightName }}
        </slot>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'VoGroupVinBtn',
    props: {
      /**
       * 背景颜色
       */
      background: {
        type: String,
        default: '#FFF',
      },
      /**
       * 边框颜色
       */
      borderColor: {
        type: String,
        default: 'rgba(0, 0, 0, 0.08)',
      },
      /**
       * 右侧按钮跳转路径
       */
      rightToUrl: {
        type: String,
        default: '',
      },
      /**
       * 左侧图片路径
       */
      leftSrc: {
        type: String,
        default: '/static/common/group_vin.png',
      },
      /**
       * 右侧图片路径
       */
      rightSrc: {
        type: String,
        default: '/static/common/group_carType.png',
      },
      /**
       * 左侧文字内容
       */
      leftName: {
        type: String,
        default: 'VIN找货',
      },
      /**
       * 右侧文字内容
       */
      rightName: {
        type: String,
        default: '车型查询',
      },
      /**
       * 左侧文字颜色
       */
      leftColor: {
        type: String,
        default: 'rgba(0, 0, 0, 0.85)',
      },
      /**
       * 右侧文字颜色
       */
      rightColor: {
        type: String,
        default: 'rgba(0, 0, 0, 0.85)',
      },
      /**
       * 左侧文字大小
       */
      leftFontSize: {
        type: Number,
        default: 32,
      },
      /**
       * 右侧文字大小
       */
      rightFontSize: {
        type: Number,
        default: 32,
      },
    },
    data() {
      return {}
    },
    methods: {
      /**
       * 左侧扫码点击事件
       * @returns {Promise<void>}
       */
      async leftBtnFn() {
        this.$emit('leftBtnFn')
      },
      /**
       * 右侧按钮点击事件
       */
      rightBtnFn() {
        if (this.rightToUrl) {
          this.$linkToEasy(this.rightToUrl)
          return
        }
        this.$emit('rightBtnFn')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .group {
    padding: 0 32rpx;
    display: flex;
    &-box {
      background: #fff;
      border-width: 2rpx;
      border-style: solid;
      box-sizing: border-box;
      border-radius: 16rpx;
      padding: 4rpx 0;
      justify-content: center;
      &__icon {
        width: 80rpx;
        height: 80rpx;
        margin-right: 12rpx;
        display: block;
      }
    }
  }
</style>
