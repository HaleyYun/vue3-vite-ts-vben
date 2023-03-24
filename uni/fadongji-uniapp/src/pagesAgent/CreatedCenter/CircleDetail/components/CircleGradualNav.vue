<template>
  <!--   渐变导航-->
  <!-- :style="{ opacity: opacity }" -->
  <view v-show="navShow" class="nav" @click="navClick">
    <view :style="statusBarStyle" class="nav-block" />
    <view class="flex nav-view">
      <view class="nav-view__back flex flex-vertical-c" @click.stop="backFn">
        <VoIcon :opacity="0.45" color="#000000" name="nav-back" />
      </view>
      <view class="flex1 nav-view__title">{{ title }}</view>
      <view class="flex flex-vertical-c flex-justify-c">
        <!-- <view
          v-show="!isAttentionHidden"
          @click.stop="attentionClicl"
          class="nav-view__attention nav-view__selected flex flex-justify-c"
          >关注</view
        > -->
        <view class="nav-view__photo">
          <image :src="icon" class="icon" />
          <!--          <VoIcon v-show="!isBigVHidden" :size="12" class="bigV" name="v-icon" />-->
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'CircleGradualNav',
    props: {
      /**
       * 是否隐藏
       */
      navShow: {
        type: Boolean,
        default: false,
      },
      /**
       * 是否隐藏关注按钮 默认true 隐藏
       */
      isAttentionHidden: {
        type: Boolean,
        default: true,
      },
      /**
       * 标题
       */
      title: {
        type: String,
        default: '/static/default_avatar.png',
      },
      /**
       * 用户头像
       */
      icon: {
        type: String,
        default: '',
      },
      /**
       * 大V标识
       */
      isBigVHidden: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        statusBarStyle: {
          height: this.$systemInfo.statusBarHeight + 'px',
          backgroundColor: '#ffffff',
        },
      }
    },
    methods: {
      attentionClicl() {
        this.$emit('attentionFn')
      },
      backFn() {
        this.$backFn()
      },
      navClick() {
        this.$emit('click')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .nav {
    position: fixed;
    top: 0;
    left: 32rpx;
    background-color: #ffffff;
    width: 696rpx;
    box-sizing: border-box;
    z-index: 99;

    &-view {
      width: 100%;

      &__title {
        height: 88rpx;
        line-height: 88rpx;
        flex: 1;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-size: 36rpx;
        color: #000000;
        padding-right: 40rpx;
        margin-left: 14rpx;
      }
      &__photo {
        position: relative;
        padding-right: 16rpx;
        width: 48rpx;
        height: 48rpx;

        .icon {
          width: 48rpx;
          height: 48rpx;
          border-radius: 50%;
        }

        .bigV {
          position: absolute;
          right: 6rpx;
          top: -10rpx;
        }
      }
      &__attention {
        border-radius: 60rpx;
        height: 56rpx;
        line-height: 56rpx;
        width: 160rpx;
        font-size: 24rpx;
        margin-right: 20rpx;
      }
      &__normal {
        color: rgba(0, 0, 0, 0.15);
        background-color: #f6f7f8;
      }

      &__selected {
        color: #ffffff;
        background-color: #22284b;
      }
    }
  }
</style>
