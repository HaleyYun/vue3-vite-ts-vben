<template>
  <u-popup :show="show" mode="bottom" @close="closeHandler">
    <view class="setting">
      <view class="setting-nav flex">
        <view class="setting-nav__left"></view>
        <view class="flex1 text-center fz-b">修改商品数量</view>
        <VoIcon :size="24" name="close" @click="closeHandler"></VoIcon>
      </view>

      <view class="setting-content flex1">
        <view class="fz-28 color-block-65">商品</view>
        <input
          class="setting-content__input text-center flex1"
          placeholder="请输入商品数量"
          placeholder-class="fz-28"
          type="number"
        />
        <VoIcon :size="16" color="#ADADAE" name="close-c"></VoIcon>
      </view>
      <view class="flex flex-justify-between p-l-32 p-r-32">
        <!--        <EraButton size="small" theme-type="default" @click="closeHandler">取消</EraButton>-->
        <view class="setting-button">取消</view>
        <EraButton size="small" text="确定"></EraButton>
      </view>

      <view class="h24"></view>

      <VoSafetyArea></VoSafetyArea>
    </view>
  </u-popup>
</template>

<script>
  export default {
    name: 'WarnSetting',
    props: {
      show: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      closeHandler() {
        this.$emit('update:show', false)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .setting {
    &-nav {
      width: 750rpx;
      display: flex;
      align-items: center;
      border-bottom: 2rpx solid #f7f7f8;
      padding: 0rpx 32rpx;
      box-sizing: border-box;
      height: 94rpx;
      font-size: 28rpx;
      color: rgba(0, 0, 0, 0.85);
      margin-bottom: 40rpx;
      &__left {
        width: 24px;
        height: 24px;
      }
    }
    &-content {
      width: 686rpx;
      height: 76rpx;
      background-color: #f7f7f8;
      border-radius: 16rpx;
      margin: 0rpx auto 80rpx;
      padding: 0rpx 24rpx;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      margin-bottom: 80rpx;
      &__input {
        padding: 0rpx 10rpx;
      }
    }
    &-button {
      width: 322rpx;
      height: 80rpx;
      border: 2rpx solid #d3d4db;
      border-radius: 100rpx;
      box-sizing: border-box;
      line-height: 80rpx;
      text-align: center;
      font-size: 32rpx;
      color: $v-c0-85;
    }
  }
</style>
