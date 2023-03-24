<template>
  <u-popup
    :customStyle="{ overflow: 'hidden' }"
    :round="4"
    :safeAreaInsetBottom="false"
    :show="show"
    mode="center"
    @close="close"
  >
    <view class="popup">
      <view class="popup-title">审核不通过原因</view>
      <textarea
        v-model="textareaText"
        auto-height
        class="popup-textarea"
        placeholder="简明扼要的提示内容"
        placeholder-style="color: rgba(24, 34, 65, 0.25);font-size: 28rpx"
      />
      <view class="popup-bottom">
        <view class="popup-bottom__button cancel" @click="closeCancel">取消</view>
        <view class="popup-bottom__button sure" @click="closeSure">确定</view>
      </view>
    </view>
  </u-popup>
</template>

<script>
  export default {
    name: 'NotApprovedPopup',
    props: {
      show: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        textareaText: '',
      }
    },
    methods: {
      /**
       * 关闭弹窗
       */
      close() {
        this.$emit('update:show', false)
      },
      /**
       * 取消
       */
      closeCancel() {
        this.close()
      },
      /**
       * 确定
       */
      closeSure() {
        if (this.textareaText) {
          this.close()
        } else {
          this.$u.toast('简明扼要的提示内容')
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .popup {
    width: 640rpx;
    //height: 362rpx;
    background: #fff;
    &-title {
      margin-top: 64rpx;
      text-align: center;
      font-weight: bold;
      font-size: 32rpx;
    }
    &-textarea {
      width: 544rpx;
      margin: 32rpx 48rpx 60rpx;
      padding: 26rpx 24rpx;
      box-sizing: border-box;
      background: #f7f7f8;
      border-radius: 8rpx;
      line-height: 42rpx;
    }
    &-bottom {
      display: flex;
      align-items: center;
      border-top: 2rpx solid rgba(0, 0, 0, 0.08);
      &__button {
        flex: 1;
        text-align: center;
        padding: 20rpx 0;
        font-size: 32rpx;
        &.cancel {
          color: $v-c0-65;
        }
        &.sure {
          font-weight: bold;
          color: #22284b;
        }
        &:first-child {
          border-right: 2rpx solid rgba(0, 0, 0, 0.08);
        }
      }
    }
  }
</style>
