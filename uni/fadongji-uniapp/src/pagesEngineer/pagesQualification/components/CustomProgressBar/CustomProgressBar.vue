<template>
  <view class="flex flex-vertical-c flex-justify-between">
    <view :style="style" class="custom_progress">
      <view v-if="data.finishCount > 0" :style="barStyle" />
      <text v-if="barStyle.width === '100%'" class="custom_progress-text font_white">100%</text>
      <text
        v-else
        :class="barStyle.width === '100%' ? 'font_white' : ''"
        class="custom_progress-text"
      >
        {{ data.sum ? ((data.finishCount / data.sum) * 100).toFixed(2) : 0 }}%
      </text>
    </view>
    <view class="custom_num">{{ data.finishCount || 0 }}/{{ data.sum || 0 }}</view>
  </view>
</template>

<script>
  export default {
    name: 'CustomProgressBar',
    props: {
      data: {
        type: Object,
        default() {
          return {
            finishCount: 20,
            sum: 100,
          }
        },
      },
      width: {
        type: Number,
        default: 594,
      },
      height: {
        type: Number,
        default: 24,
      },
      backgroundColor: {
        type: String,
        default: '#f6f7f8',
      },
    },
    data() {
      return {}
    },
    computed: {
      style() {
        return {
          width: this.width + 'rpx',
          height: this.height + 'rpx',
          backgroundColor: this.backgroundColor,
          borderRadius: this.height + 'rpx',
        }
      },
      barStyle() {
        return {
          height: '100%',
          width:
            (this.data.sum
              ? (100 / this.data.sum) *
                (this.data.finishCount >= this.data.sum ? this.data.sum : this.data.finishCount)
              : 0) + '%',
          // background: 'linear-gradient(270deg, #FF833B -8.54%, #FFDDA6 100%)',
          background: '#ff5319',
          borderRadius: this.height + 'rpx',
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .custom_progress {
    position: relative;
    flex-grow: 1;
    &-text {
      position: absolute;
      top: 46%;
      right: 16rpx;
      transform: translate(-20%, -50%);
      color: $v-c0-85;
      font-size: 24rpx;
    }
  }
  .custom_num {
    font-size: 24rpx;
    margin-left: 20rpx;
    color: $v-c0-85;
  }

  .font_white {
    color: #fff;
  }
</style>
