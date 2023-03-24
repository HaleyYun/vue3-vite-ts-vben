<template>
  <u-popup
    :customStyle="{ overflow: 'hidden' }"
    :round="4"
    :safeAreaInsetBottom="false"
    :show="show"
    mode="center"
    @close="close"
    @open="open"
  >
    <view class="popup-popup">
      <view class="popup-popup__title m-t-64">审核不通过原因</view>
      <u-input
        v-model.trim="popupInput"
        border="none"
        class="popup-popup__input"
        color="rgba(0, 0, 0, 0.85)"
        customStyle="padding-left: 24rpx;"
        fontSize="28rpx"
        max-length="450"
        placeholder="请输入"
        placeholderClass="popup-popup__holder"
      />
      <view class="popup-popup__bottom flex flex-column w-full">
        <view class="popup-popup__line" />
        <view class="flex flex-row flex-vertical-c fz-32">
          <view class="button_cancel flex1 text-center color-block-65" @click="cancel">取消</view>
          <view class="popup-popup__line1" />
          <view class="button_sure flex1 text-center font-weight-500" @click="sure">确认</view>
        </view>
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
        popupInput: '',
      }
    },
    methods: {
      cancel() {
        this.popupInput = ''
        this.$emit('cancel')
      },
      sure() {
        this.$emit('sure', this.popupInput)
      },
      open() {},
      close() {},
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
    &-popup {
      width: 640rpx;
      height: 392rpx;
      background-color: #fff;
      border-radius: 8rpx;
      &__title {
        font-size: 32rpx;
        font-weight: bold;
        color: $v-c0-85;
        line-height: 48rpx;
        text-align: center;
      }
      &__input {
        padding: 0rpx 24rpx;
        margin: 32rpx 48rpx 0rpx;
        height: 96rpx;
        font-size: 28rpx;
        line-height: 42rpx;
        border-radius: 8rpx;
        background-color: #f7f7f8;
      }
      &__bottom {
        position: absolute;
        display: flex;
        bottom: 0;
      }
      &__line {
        background-color: $v-c0-8;
        width: 100%;
        height: 1rpx;
      }
      &__line1 {
        background-color: $v-c0-8;
        width: 1rpx;
        height: 89rpx;
      }
      &__holder {
        color: $v-c0-25;
        margin-right: 48rpx;
      }
    }
  }
</style>
