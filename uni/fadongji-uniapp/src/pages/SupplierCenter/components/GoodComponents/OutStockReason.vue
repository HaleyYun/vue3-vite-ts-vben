<template>
  <u-popup :show="reasonShow" mode="bottom" @close="close">
    <view class="pop">
      <view class="flex flex-justify-between m-t-26 m-l-32 m-r-32">
        <view class="color-block fz-28 fz-b"><text class="color-red">*</text>请输入下架原因</view>
        <VoIcon :size="20" name="close" @click="close" />
      </view>
      <EraTextarea
        v-model.trim="content"
        border="none"
        class="pop-area"
        confirmType="done"
        count
        countStyle="background: inherit;right: 28rpx;bottom: 16rpx;color: rgba(0, 0, 0, 0.25);font-size:28rpx"
        height="134"
        maxlength="450"
        placeholder="请输入下架原因"
        placeholderStyle="font-size: 28rpx;color: rgba(0, 0, 0, 0.25);"
      />
      <view class="pop-button flex flex-justify-between">
        <EraButton size="small" text="取消" theme-type="Default" @click="close" />
        <EraButton size="small" text="确定" @click="confirm" />
      </view>
    </view>
  </u-popup>
</template>
<script>
  export default {
    name: 'OutStockReason',
    components: {},

    props: {},
    data() {
      return {
        reasonShow: false,
        content: '',
      }
    },
    methods: {
      show() {
        this.reasonShow = true
      },
      confirm() {
        this.close()
        this.$emit('confirm')
      },
      close() {
        this.reasonShow = false
        this.$emit('close')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .pop {
    border-radius: 12rpx;
    &-area {
      margin: 24rpx 32rpx 32rpx 32rpx;
      font-size: 28rpx;
      color: rgba(0, 0, 0, 0.85);
      background-color: $v-bg-light;
    }
    &-button {
      padding: 20rpx 32rpx;
      border-top: 2rpx solid $v-bg-light;
    }
    &-content {
      display: flex;
      padding: 48rpx 40rpx 80rpx 40rpx;
      &__btn {
        margin-right: 40rpx;
        .btn-img {
          width: 120rpx;
          height: 120rpx;
        }
        .btn-name {
          font-size: 24rpx;
          line-height: 34rpx;
          text-align: center;
          color: rgba(0, 0, 0, 0.85);
        }
      }
    }
    &-btm {
      font-size: 32rpx;
      line-height: 1.5;
      text-align: center;
      color: rgba(0, 0, 0, 0.85);
      padding: 24rpx;
      border-top: 1px solid #f7f7f8;
    }
  }
</style>
