<template>
  <u-overlay
    :show="visible"
    class="pop"
    opacity="0.45"
    style="position: absolute; top: 96rpx; left: 0; z-index: 99; width: 750rpx; height: 100vh"
    @click.native="clickOver"
  >
    <view class="pop-box flex flex-vertical-c">
      <template v-if="list">
        <view
          v-for="(info, index) of list"
          :key="info.id"
          :class="info.selected ? 'selected' : 'un-selected'"
          class="pop-box__label"
          @click.stop="chooseFn(index)"
          >{{ info.name }}</view
        >
      </template>
    </view>
  </u-overlay>
</template>

<script>
  export default {
    name: 'FliterPop',
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
      return {}
    },
    methods: {
      clickOver() {
        this.$emit('close')
      },
      chooseFn(index) {
        this.$emit('filterConfirm', index)
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
      padding: 48rpx 0 48rpx 32rpx;
      border-top: 2rpx solid $v-bg-light;
      &__label {
        height: 64rpx;
        line-height: 64rpx;
        font-size: 24rpx;
        padding: 0 46rpx;
        border-radius: 32rpx;
        box-sizing: border-box;
        margin-right: 28rpx;
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
