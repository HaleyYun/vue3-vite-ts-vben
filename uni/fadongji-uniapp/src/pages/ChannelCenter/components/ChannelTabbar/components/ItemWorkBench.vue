<template>
  <view class="workbenchlist m-t-16 flex flex-row">
    <view class="flex1 flex flex-column">
      <view class="workbenchlist-suppliernum">102</view>
      <view class="workbenchlist-suppliername">总供应商数</view>
      <view class="workbenchlist-yesterday flex flex-row m-t-14">
        <view class="workbenchlist-yesterday__text">昨日</view>
        <view class="workbenchlist-yesterday__add" >+2</view>
      </view>
    </view>
    <view class="flex1 flex flex-column">
      <view class="workbenchlist-suppliernum">998</view>
      <view class="workbenchlist-suppliername">已认证数</view>
      <view class="workbenchlist-yesterday flex flex-row m-t-14">
        <view class="workbenchlist-yesterday__text">昨日</view>
        <view class="workbenchlist-yesterday__add" >+2</view>
      </view>
    </view>
    <view class="flex1 flex flex-column">
      <view class="workbenchlist-suppliernum">858</view>
      <view class="workbenchlist-suppliername">未认证数</view>
      <view class="workbenchlist-yesterday flex flex-row m-t-14">
        <view class="workbenchlist-yesterday__text">昨日</view>
        <view class="workbenchlist-yesterday__add" >+2</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "WorkBenchList",
  props: {
    dataObj: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {}
  },
  methods: {},

}
</script>

<style lang="scss" scoped>
.workbenchlist {
  box-sizing: border-box;
  padding: 24rpx;
  border-radius: 8rpx;
  background-color: #F6F7F8;
  &-suppliernum{
    font-size: 40rpx;
    line-height: 60rpx;
    color: $v-c0-85;
    align-items: center;
  }
  &-suppliername{
    font-size: 28rpx;
    line-height: 42rpx;
    color: $v-c0-85;
    align-items: center;
  }
  &-yesterday{
    font-size: 28rpx;
    line-height: 42rpx;
    color: $v-c0-85;
    &__text{
      color: $v-c0-45;
      text-align: center;
      line-height: 28rpx;
      font-size: 28rpx;
    }
    &__add{
      color: #EE0A24;
      text-align: center;
      line-height: 28rpx;
      font-size: 28rpx;
    }
  }
}
</style>
