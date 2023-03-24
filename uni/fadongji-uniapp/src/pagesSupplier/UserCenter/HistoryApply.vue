<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="apply flex flex-column"
  >
    <VoNav is-fixed is-have-more title="历史申请" />
    <view
      v-for="info of historyApplyList"
      :key="info.id"
      class="apply-info"
      @click="CancelSupplierDetails"
    >
      <view class="apply-info__top flex flex-vertical-c flex-justify-between">
        <view class="color-block-65">{{ info.time }}</view>
        <view class="fz-28 color-block-45 lh150">{{ info.type }}</view>
      </view>
      <view class="apply-info__con">
        <view class="p-t-32">注销理由：{{ info.reason }}</view>
        <view class="p-t-24">详情描述：{{ info.describe }}</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'HistoryApply',
    data() {
      return {
        historyApplyList: [
          {
            id: 1,
            time: '2020-06-18 15:32:56',
            type: '待处理', // '待处理' '已拒绝'
            reason: '不做供应商了',
            describe: '不做供应商了不做供应商了不做供应商了不做供应商了不做供应商了',
          },
          {
            id: 2,
            time: '2020-06-18 15:32:56',
            type: '已拒绝', // '待处理' '已拒绝'
            reason: '不做供应商了',
            describe: '不做供应商了不做供应商了不做供应商了不做供应商了不做供应商了',
          },
        ],
      }
    },
    methods: {
      CancelSupplierDetails() {
        this.$linkToEasy('/pagesSupplier/UserCenter/CancelSupplierDetails')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .apply {
    width: 750rpx;
    min-height: 100vh;
    &-info {
      background: #fff;
      margin-top: 24rpx;
      padding: 0 32rpx 32rpx;
      box-sizing: border-box;
      &__top {
        padding: 32rpx 0;
        border-bottom: 2rpx solid $v-bg-light;
        height: 42rpx;
        line-height: 42rpx;
        font-size: 28rpx;
        .top-yellow {
          color: #fda202;
        }
        .top-red {
          color: #ee0a24;
        }
      }
      &__con {
        font-size: 28rpx;
        line-height: 42rpx;
      }
    }
  }
</style>
