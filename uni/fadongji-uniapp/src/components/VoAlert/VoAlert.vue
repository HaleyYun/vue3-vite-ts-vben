<template>
  <view v-if="visible" class="alert" :class="themeClass">
    <view class="alert-icon" v-if="showIcon">
      <VoIcon name="notice" :size="18" color="#ffffff" />
    </view>
    <view class="alert-content" :class="contentClass">
      <view class="alert-title" v-if="showTitle">{{ title }}</view>
      <view class="alert-description">{{ description }}</view>
    </view>
    <view class="alert-close" :class="closePositionClass" v-if="isClose">
      <VoIcon name="close" :size="20" color="#8B8D95" @click="closeHandler" />
    </view>
  </view>
</template>

<script>
  const iconPosition = {
    top: 'top',
    right: 'right',
  }
  const typeTheme = {
    default: 'default',
    primary: 'primary',
  }
  export default {
    name: 'VoAlert',
    props: {
      allowClose: {
        type: Boolean,
        default: true,
      },
      iconPosition: {
        type: String,
        default: 'right',
      },
      title: {
        type: String,
        default: '温馨提示',
      },
      description: {
        type: String,
        default: '投资项目正在审核中、请耐心等待',
      },
      type: {
        type: String,
        default: 'default',
      },
      showIcon: {
        type: Boolean,
        default: true,
      },
      showTitle: {
        type: Boolean,
        default: true,
      },
      // 是否可关闭
      isClose: {
        type: Boolean,
        default: true,
      },
      //内容类名
      contentClass: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        visible: true,
      }
    },
    computed: {
      // 清楚alert 数据

      closePositionClass() {
        return {
          [`alert-close--${this.iconPosition}`]: iconPosition[this.iconPosition],
        }
      },
      themeClass() {
        return {
          [`alert--${this.type}`]: typeTheme[this.type],
        }
      },
    },
    methods: {
      closeHandler() {
        this.visible = false
      },
    },
  }
</script>

<style scoped lang="scss">
  .alert {
    display: flex;
    align-items: center;
    position: relative;
    background-color: #feecee;
    padding: 20rpx 40rpx;

    &.alert--primary {
      background-color: #edf2fc;

      .alert-icon {
        background-color: #155bd4;
      }

      .alert-content {
        .alert-title {
          color: #155bd4;
        }

        .alert-description {
          color: #155bd4;
        }
      }
    }

    .alert-content {
      flex: 1;
      padding-right: 40rpx;
    }

    .alert-icon {
      width: 40rpx;
      height: 40rpx;
      background-color: #ee0a24;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 16rpx;
    }

    .alert-content {
      flex: 1;

      .alert-title {
        color: #ee0a24;
        font-weight: bold;
        font-size: 24rpx;
        margin-bottom: 8rpx;
      }

      .alert-description {
        color: #ee0a24;
        font-size: 24rpx;
      }
    }

    .alert-close {
      position: absolute;
      right: 20rpx;
      top: 50%;
      transform: translateY(-50%);
      width: 40rpx;
      height: 40rpx;

      &--top {
        top: 20rpx;
        right: 20rpx;
        transform: translateY(0);
      }
    }
  }
</style>
