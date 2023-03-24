<template>
  <u-overlay
    :show="visible"
    class="pop"
    opacity="0.45"
    style="position: absolute; top: 72rpx; left: -10rpx; z-index: 99; width: 750rpx; height: 100vh"
    @click="clickOver"
  >
    <view class="pop-box flex flex-vertical-c" @click.stop>
      <view
        v-for="info of labelInfo"
        :key="info.id"
        :class="{ selected: info.selected === true, 'un-selected': info.selected === false }"
        class="pop-box__label"
        @click.stop="chooseFn(info)"
        >{{ info.name }}</view
      >
    </view>
    <view class="pop-bottom flex" @click.stop>
      <view class="pop-bottom__button left" @click="resetFn">重置</view>
      <view class="pop-bottom__button right m-l-36" @click="screening">筛选</view>
    </view>
  </u-overlay>
</template>

<script>
  export default {
    name: 'ActiveStatusPop',
    props: {
      list: {
        type: Array,
      },
      visible: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        labelInfo: [
          {
            id: 1,
            name: '未开始',
            status: '2',
            selected: false,
          },
          {
            id: 2,
            name: '进行中',
            status: '3',
            selected: false,
          },
        ],
      }
    },
    methods: {
      clickOver() {
        this.$emit('close')
      },
      chooseFn(e) {
        this.labelInfo.forEach((info) => {
          if (e.id === info.id) {
            info.selected = true
          } else {
            info.selected = false
          }
        })
      },
      /**
       * 重置
       */
      resetFn() {
        this.labelInfo.forEach((info) => {
          info.selected = false
        })
      },
      /**
       * 筛选
       */
      screening() {
        let status = ''
        this.labelInfo.forEach((info) => {
          if (info.selected) {
            status = info.status
          }
        })
        this.$emit('activeType', status)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .pop {
    width: 750rpx;
    height: 100vh;
    &-box {
      background: #fff;
      padding: 40rpx 0 40rpx 114rpx;
      border-top: 2rpx solid $v-bg-light;
      &__label {
        width: 240rpx;
        text-align: center;
        height: 64rpx;
        line-height: 64rpx;
        font-size: 24rpx;
        //padding: 0 46rpx;
        border-radius: 8rpx;
        box-sizing: border-box;
        margin-right: 56rpx;
        margin-bottom: 40rpx;
        &:last-child {
          margin-right: 0rpx;
        }
      }
    }
    &-bottom {
      background: #fff;
      padding: 24rpx 32rpx 28rpx;
      border-top: 2rpx solid $v-bg-light;
      &__button {
        font-size: 32rpx;
        height: 80rpx;
        line-height: 80rpx;
        padding: 0 128rpx;
        box-sizing: border-box;
        border-radius: 90rpx;
        &.left {
          color: #ff5319;
          border: 2rpx solid #ff5319;
        }
        &.right {
          background: #ff5319;
          color: #ffffff;
        }
      }
    }
  }
  .selected {
    background: #ffece5;
    border: 2rpx solid #ffb299;
    color: #ff5319;
  }
  .un-selected {
    color: $v-c0-85;
    background: #f7f7f8;
    border: 2rpx solid #f7f7f8;
  }
</style>
