<template>
  <u-popup :round="5" :safeAreaInsetBottom="false" :show="show" mode="center" @close="closeRule">
    <view class="rule">
      <view class="rule-title">评分规则</view>
      <view class="rule-content">
        <view class="rule-content__text">
          <text class="fz-b color-block">商品评分：</text>
          <text class="color-block-65">
            根据客户购买该店铺商品时，给店铺货品的评分，计算得出的店铺货品评分平均值。
          </text>
        </view>
        <view class="rule-content__text">
          <text class="fz-b color-block">店家服务：</text>
          <text class="color-block-65">
            根据客户购买该店铺商品时，给店铺服务的评分，计算得出的店铺服务评分平均值。
          </text>
        </view>
        <view class="rule-content__text">
          <text class="fz-b color-block">物流履约：</text>
          <text class="color-block-65">
            根据客户购买该店铺商品时，给店铺物流服务的评分，计算得出的物流服务评分平均值。
          </text>
        </view>
      </view>
      <view class="rule-bottom" @click="closeRule">确定</view>
    </view>
  </u-popup>
</template>

<script>
  export default {
    name: 'GradingRule',
    props: {
      show: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      closeRule() {
        this.$emit('update:show', false)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .rule {
    width: 640rpx;
    &-title {
      padding-top: 80rpx;
      text-align: center;
      font-size: 32rpx;
      font-weight: bold;
      color: $v-c0-85;
    }
    &-content {
      padding: 0rpx 56rpx 80rpx 56rpx;
      &__text {
        margin-top: 40rpx;
        font-size: 32rpx;
        line-height: 48rpx;
      }
    }
    &-bottom {
      padding: 20rpx 0;
      text-align: center;
      font-weight: bold;
      font-size: 32rpx;
      color: $v-c0-85;
      border-top: 2rpx solid rgba(0, 0, 0, 0.08);
    }
  }
</style>
