<template>
  <view class="info">
    <view class="fz-32 p-b-24 fz-b">回收商品</view>
    <view class="lh48 fz-32 fz-b m-t-24">{{ info.supportName }}</view>
    <view class="flex flex-justify-between flex-vertical-c m-t-22">
      <view class="fz-28 color-block-45">回收价格</view>
      <VoPointPrice
        :leftSize="16"
        :price="info.supportAmount"
        :showUnit="true"
        class="lh48"
        color="#E50012"
      />
    </view>
    <view class="flex flex-justify-between flex-vertical-c m-t-24 lh42">
      <view class="fz-28 color-block-45">上门时间：</view>
      <view class="fz-28 color-block-45">{{
        $vocenApi.dayjs(info.homeStartTime).format('YYYY-MM-DD') +
        ' ' +
        $vocenApi.dayjs(info.homeStartTime).format('HH:mm') +
        '-' +
        $vocenApi.dayjs(info.homeEndTime).format('HH:mm')
      }}</view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'ServiceProject',
    props: {
      info: {
        type: Object,
        default: () => {},
      },
    },
  }
</script>

<style lang="scss" scoped>
  .info {
    padding: 24rpx 32rpx;
  }
</style>
