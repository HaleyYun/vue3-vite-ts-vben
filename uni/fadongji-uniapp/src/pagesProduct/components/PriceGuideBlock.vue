<template>
  <view class="block">
    <PriceGuideBlockList :guide-list="priceGuideBlock" :guideType="guideType" />
    <PriceGuideBlockList
      v-for="(item, index) of priceGuideBlock.goodsOrderSellVOS"
      v-show="isShowAll ? index < priceGuideBlock.goodsOrderSellVOS.length : index < 2"
      :key="index"
      :guide-list="item"
    />
    <view v-if="priceGuideBlock.goodsOrderSellVOS.length > 2" @click="salesVolume">
      <view v-if="!isShowAll" class="block-open flex flex-justify-c">
        <view class="block-open__tips m-r-8">展开其他仓</view>
        <VoIcon :size="16" class="m-t-14" color="#155BD4" name="open" />
      </view>
      <view v-else class="block-open flex flex-justify-c">
        <view class="block-open__tips m-r-8">收起</view>
        <VoIcon :size="16" class="m-t-14" color="#155BD4" name="open-close" />
      </view>
    </view>
  </view>
</template>

<script>
  import PriceGuideBlockList from '../components/PriceGuideBlockList'

  export default {
    name: 'PriceGuideBlock',
    components: { PriceGuideBlockList },
    props: {
      priceGuideBlock: {
        type: Object,
        default: {},
      },
    },
    data() {
      return {
        guideType: 'goods',
        isShowAll: false, // 超过2条数据收起
      }
    },
    methods: {
      /**
       * 展开、收起仓库销量信息
       */
      salesVolume() {
        this.isShowAll = !this.isShowAll
      },
    },
  }
</script>

<style lang="scss" scoped>
  .block {
    width: 750rpx;
    background: #ffffff;
    margin-top: 24rpx;
    &-open {
      height: 66rpx;
      font-size: 28rpx;
      color: $v-tip;
      &__tips {
        height: 42rpx;
        line-height: 42rpx;
        margin-top: 8rpx;
      }
    }
  }
</style>
