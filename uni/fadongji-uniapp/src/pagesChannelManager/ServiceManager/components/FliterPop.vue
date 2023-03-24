<template>
  <u-overlay
    :show="visible"
    class="pop"
    opacity="0.45"
    style="position: absolute; top: 96rpx; left: 0; z-index: 99; width: 750rpx; height: 100vh"
    @click="clickOver"
  >
    <view class="pop-box flex flex-vertical-c">
      <view
        v-for="info of labelInfo"
        :key="info.id"
        :class="{ selected: info.selected === true, 'un-selected': info.selected === false }"
        class="pop-box__label"
        @click.stop="chooseFn(index)"
        >{{ info.name }}</view
      >
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
      return {
        labelInfo: [
          {
            id: 1,
            name: '待整改',
            selected: false,
          },
          {
            id: 2,
            name: '审核中',
            selected: false,
          },
          {
            id: 3,
            name: '审核未通过',
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
