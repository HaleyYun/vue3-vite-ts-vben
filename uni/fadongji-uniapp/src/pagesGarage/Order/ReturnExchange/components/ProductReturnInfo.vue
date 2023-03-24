<template>
  <view class="block">
    <view class="block-title">商品寄回信息</view>
    <view class="block-info">{{ returnInfoList.info }}</view>
    <view class="block-proof">
      <image
        v-for="(info, index) of returnInfoList.imageList"
        :key="index"
        :src="info.proofImg"
        class="block-proof__img"
        @click="lookPreviewImage(returnInfoList.imageList, index)"
      />
    </view>
    <view class="block-list">
      <view v-if="returnInfoList.waybillNum" class="flex flex-justify-between">
        <view>运单号：</view>
        <view class="block-list__right">{{ returnInfoList.waybillNum }}</view>
      </view>
      <view v-if="returnInfoList.logistics" class="flex flex-justify-between m-t-16">
        <view>物流公司：</view>
        <view class="block-list__right">{{ returnInfoList.logistics }}</view>
      </view>
      <view v-if="returnInfoList.phone" class="flex flex-justify-between m-t-16">
        <view>物流公司查询电话：</view>
        <view class="block-list__right">{{ returnInfoList.phone }}</view>
      </view>
    </view>
    <view v-if="returnInfoList.receivingTime" class="block-receive flex flex-justify-between">
      <view>收货时间：</view>
      <view class="block-receive__right">{{ returnInfoList.receivingTime }}</view>
    </view>
    <view v-if="returnInfoList.confirm === true" class="block-confirm">
      <view class="block-confirm__button" @click="confirmReceipt">确认收货</view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'ProductReturnInfo',
    props: {
      /**
       * info 发货凭证
       * imageList 凭证列表
       * imageList.proofImg 凭证列表的图片
       * waybillNum 运单号
       * logistics 物流公司
       * phone 物流公司查询电话
       * confirm 是否存在确认收货按钮
       */
      returnInfoList: {
        type: Object,
        default: {},
      },
    },
    methods: {
      confirmReceipt() {
        this.$emit('confirmReceipt')
      },
      lookPreviewImage(list, index) {
        let data = []
        list.forEach((item) => {
          data.push(item.proofImg)
        })
        // 预览图片
        uni.previewImage({
          urls: data,
          current: index,
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .block {
    width: 750rpx;
    background: #ffffff;
    margin-top: 16rpx;
    &-title {
      padding: 24rpx 0;
      margin: 0 32rpx;
      height: 48rpx;
      line-height: 48rpx;
      font-weight: bold;
      font-size: 32rpx;
      border-bottom: 2rpx solid $v-bg-light;
    }
    &-info {
      padding: 16rpx 32rpx 24rpx;
      font-size: 28rpx;
    }
    &-proof {
      display: grid;
      padding: 0 32rpx 24rpx;
      grid-template-columns: 218rpx 218rpx 218rpx;
      grid-column-gap: 16rpx;
      grid-row-gap: 40rpx;
      &__img {
        width: 218rpx;
        height: 218rpx;
      }
    }
    &-list {
      padding: 0 32rpx 12rpx;
      font-size: 28rpx;
      line-height: 42rpx;
      color: $v-c0-85;
      &__right {
        color: $v-c0-45;
        flex: 1;
        text-align: right;
      }
    }
    &-receive {
      padding: 0rpx 32rpx 20rpx 32rpx;
      font-size: 28rpx;
      line-height: 42rpx;
      color: $v-c0-85;
      &__right {
        color: $v-c0-45;
        flex: 1;
        text-align: right;
      }
    }
    &-confirm {
      padding: 0 32rpx 32rpx;
      &__button {
        width: 686rpx;
        height: 92rpx;
        line-height: 92rpx;
        background: $color-primary-yellow;
        border-radius: 48rpx;
        text-align: center;
        color: #ffffff;
        font-size: 32rpx;
      }
    }
  }
</style>
