<template>
  <view class="block">
    <view class="block-title">描述及凭证</view>
    <view class="block-info color-block-65">{{ describeProofList.info }}</view>
    <view
      v-if="describeProofList.imageList && describeProofList.imageList.length > 0"
      class="block-proof"
    >
      <image
        v-for="(info, index) of describeProofList.imageList"
        :key="index"
        :src="info"
        class="block-proof__img"
        @click="previewFn(describeProofList.imageList, index)"
      />
    </view>
  </view>
</template>

<script>
  export default {
    name: 'DescribeProof',
    props: {
      /**
       * info 描述
       * imageList 凭证列表
       * imageList.proofImg 凭证列表的图片
       */
      describeProofList: {
        type: Object,
        default: {},
      },
    },
    methods: {
      previewFn(urls, current) {
        uni.previewImage({
          urls,
          current,
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
  }
</style>
