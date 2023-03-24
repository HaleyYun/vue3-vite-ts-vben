<template>
  <view class="cancel">
    <VoIcon :size="16" class="cancel-close" name="close" @click="closePop" />
    <view class="fz-b fz-32 lh150 color-block text-center m-t-8">取消订单</view>
    <view class="flex flex-row flex-vertical-c m-t-40">
      <view class="cancel-red">*</view>
      <view class="fz-32 lh150 color-block">请选择取消订单原因（必须）：</view>
    </view>
    <view class="m-t-32 flex flex-row flex-vertical-c" @click="select(1)">
      <VoIcon v-if="select1" :size="24" color="#FF5319" name="select-right" />
      <VoIcon v-else :size="24" name="address_select" />
      <view class="fz-b fz-28 lh150 color-block">不想回收了</view>
    </view>
    <view class="m-t-32 flex flex-row flex-vertical-c" @click="select(2)">
      <VoIcon v-if="select1" :size="24" color="#FF5319" name="select-right" />
      <VoIcon v-else :size="24" name="address_select" />
      <view class="fz-b fz-28 lh150 color-block">计划有变，重新预约时间</view>
    </view>
    <view class="m-t-32 flex flex-row flex-vertical-c" @click="select(3)">
      <VoIcon v-if="select1" :size="24" color="#FF5319" name="select-right" />
      <VoIcon v-else :size="24" name="address_select" />
      <view class="fz-b fz-28 lh150 color-block">已经与集师傅协商一致，重新约定的安装时间</view>
    </view>
    <view class="m-t-32 flex flex-row flex-vertical-c" @click="select(4)">
      <VoIcon v-if="select1" :size="24" color="#FF5319" name="select-right" />
      <VoIcon v-else :size="24" name="address_select" />
      <view class="fz-b fz-28 lh150 color-block">其他</view>
    </view>
    <view class="flex flex-row flex-vertical-c m-t-40">
      <view class="cancel-red">*</view>
      <view class="fz-32 lh150 color-block">取消原因：</view>
    </view>
    <EraTextarea
      v-model.trim="remark"
      border="none"
      class="reason-textarea m-t-32 m-b-40"
      count
      height="130"
      maxlength="200"
      placeholder="请输入取消原因"
      placeholderStyle="font-size: 28rpx;color: rgba(0, 0, 0, 0.25);"
    />
    <view class="cancel-button" @click="onSure"> 确定 </view>
    <VoSafetyArea></VoSafetyArea>
  </view>
</template>

<script>
  export default {
    name: 'cancelOrder',
    data() {
      return {
        select1: false,
        select2: false,
        select3: false,
        select4: false,
        remark: '',
      }
    },
    methods: {
      select(res) {
        this.select1 = false
        this.select2 = false
        this.select3 = false
        this.select4 = false
        if (res === 1) {
          this.select1 = true
        } else if (res === 2) {
          this.select2 = true
        } else if (res === 3) {
          this.select3 = true
        } else if (res === 4) {
          this.select4 = true
        }
      },
      closePop() {
        this.$emit('cancelorder', {})
      },
      onSure() {
        this.$emit('cancelorder', {})
      },
    },
  }
</script>

<style lang="scss" scoped>
  .cancel {
    padding: 24rpx 32rpx;
    background-color: #fff;
    position: relative;
    border-radius: 96rpx;
    &-close {
      position: absolute;
      top: 24rpx;
      right: 32rpx;
    }
    &-red {
      color: #ee0a24;
      font-size: 32rpx;
      line-height: 150%;
    }
    &-button {
      margin: 20rpx 32rpx;
      padding: 22rpx 0;
      box-sizing: border-box;
      background-color: #ff5319;
      color: white;
      font-size: 32rpx;
      line-height: 150%;
      text-align: center;
      border-radius: 48rpx;
    }
  }
  .reason-textarea {
    background-color: #f7f7f8;
  }
</style>
