<template>
  <u-overlay
    :show="visible"
    class="pop"
    opacity="0.45"
    style="position: absolute; top: 72rpx; left: -10rpx; z-index: 99; width: 750rpx; height: 100vh"
    @click="clickOver"
  >
    <view class="pop-max flex flex-column" @click.stop>
      <view class="pop-box flex flex-vertical-c flex-wrap">
        <view
          v-for="info of modelList"
          :key="info.id"
          :class="{ selected: info.selected === true, 'un-selected': info.selected === false }"
          class="pop-box__label"
          @click="chooseFn(info)"
          >{{ info.model }}</view
        >
      </view>
      <view class="pop-bottom flex">
        <view class="pop-bottom__button left" @click="resetFn">重置</view>
        <view class="pop-bottom__button right m-l-36" @click="screening">筛选</view>
      </view>
    </view>
  </u-overlay>
</template>

<script>
  export default {
    name: 'ModelPop',
    props: {
      list: {
        type: Array,
      },
      visible: {
        type: Boolean,
        default: false,
      },
      modelList: {
        type: Array,
        default() {
          return []
        },
      },
    },
    data() {
      return {
        // modelList: [],
      }
    },
    created() {},
    methods: {
      clickOver() {
        this.$emit('close')
      },
      chooseFn(e) {
        this.modelList.forEach((info) => {
          if (e.id === info.id) {
            info.selected = !info.selected
          }
        })
      },
      /**
       * 重置
       */
      resetFn() {
        this.modelList.forEach((info) => {
          info.selected = false
        })
      },
      /**
       * 筛选
       */
      screening() {
        let modelId = []
        this.modelList.forEach((info) => {
          if (info.selected) {
            modelId.push(info.id)
          }
        })
        this.$emit('modelScreen', modelId)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .pop {
    width: 750rpx;
    height: 100vh;
    background-color: #ffffff;
    &-max {
      max-height: 40vh;
    }
    &-box {
      flex: 1;
      background: #fff;
      padding: 40rpx 0 0 32rpx;
      border-top: 2rpx solid $v-bg-light;
      overflow-y: scroll;
      &__label {
        //width: 192rpx;
        text-align: center;
        height: 64rpx;
        line-height: 64rpx;
        font-size: 24rpx;
        padding: 0 40rpx;
        border-radius: 32rpx;
        box-sizing: border-box;
        margin-right: 36rpx;
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
