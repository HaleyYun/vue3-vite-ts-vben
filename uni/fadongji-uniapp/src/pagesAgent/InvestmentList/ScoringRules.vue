<template>
  <view class="rules">
    <VoNav :is-fixed="false" isHaveMore title="评分规则" />
    <view class="m-t-14 bg-white p-t-24 p-l-32 p-r-32 m-b-safe-area h-full border-box">
      <view class="fz-28 fz-b lh150 color-block">货品评分</view>
      <view class="fz-28 lh150 color-block m-t-8"
        >指客户对您店铺所售卖商品的评分平均值。计算公式=「(商品1的货品评分1+商品1的货品评分2+…+商品1的货品评分n)/n+商品2的平均分+…+商品n的平均分」/n</view
      >
      <view class="fz-28 fz-b lh150 color-block m-t-40"> 店家服务 </view>
      <view class="fz-28 lh150 color-block m-t-8">
        指客户对您店铺每次所售卖商品时给店铺服务所评分的平均值。计算公式=「(商品1的服务评分1+商品1的服务评分2+…+商品1的评分n)/n+商品2的服务平均分+…+商品n的服务平均分」/n
      </view>
      <view class="fz-28 fz-b lh150 color-block m-t-48"> 物流履约 </view>
      <view class="fz-28 lh150 color-block m-t-8">
        指客户对您店铺每次所售卖商品时给店铺服务所评分的平均值。计算公式=「(商品1的物流评分1+商品1的物流评分2+…+商品1的评分n)/n+商品2的物流平均分+…+商品n的物流平均分」/n
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'ScoringRules',
  }
</script>

<style lang="scss" scoped>
  .rules {
    width: 750rpx;
    height: 100vh;
    overflow: hidden;
    background-color: #f6f7f8;
  }
</style>
