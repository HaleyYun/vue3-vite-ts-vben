<template>
  <u-popup v-if="visible" :overlay="false" :show="visible" mode="bottom" @close="close">
    <view class="btm-popup">
      <view class="left">
        <VoIcon
          v-if="!isSelect"
          :opacity="0.45"
          :size="28"
          class="radio"
          color="#000000"
          name="circle"
          @click="select()"
        />
        <VoIcon
          v-if="isSelect"
          :size="28"
          class="radio"
          color="#FF5319"
          name="select-right"
          @click="selectCancel()"
        />
        <view class="left-text">全选</view>
      </view>
      <view class="right">
        <view class="right-btn" @click="deleteFn">删除</view>
      </view>
    </view>
  </u-popup>
</template>
<script>
  export default {
    name: 'CenterPopup',
    data() {
      return {
        visible: false,
        isSelect: false,
      }
    },
    methods: {
      show() {
        this.isSelect = false
        this.visible = true
      },
      close() {
        this.visible = false
        this.isSelect = false
      },
      //选择事件
      select() {
        this.$emit('select')
        this.isSelect = true
      },
      //选择取消
      selectCancel() {
        this.$emit('selectAllCancel')
        this.isSelect = false
      },
      deleteFn() {
        this.$emit('deleteFn')
      },
    },
  }
</script>
<style lang="scss" scoped>
  .btm-popup {
    background: #ffffff;
    display: flex;
    padding: 18rpx 32rpx;
    box-sizing: border-box;
    height: 116rpx;
    .left {
      display: flex;
      align-items: center;
      &-text {
        font-size: 32rpx;
        line-height: 1.5;
        color: rgba(0, 0, 0, 0.85);
        padding-left: 8rpx;
      }
    }
    .right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      &-btn {
        width: 240rpx;
        background: $color-primary-yellow;
        border-radius: 48rpx;
        font-size: 32rpx;
        line-height: 80rpx;
        text-align: center;
        color: #ffffff;
      }
    }
  }
</style>
