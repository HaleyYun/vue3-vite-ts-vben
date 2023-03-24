<template>
  <view class="invest">
    <view class="flex flex-vertical-c fz-b fz-32 lh48">
      <text class="flex1">{{ info.goodsName }} </text>
      <text class="m-l-24 m-r-24">|</text>
      <text class="color-block-yellow">{{ info.remainingAvailable }}台</text>
    </view>
    <view class="flex m-t-16">
      <view v-if="info.label && info.label.length" class="invest-label">{{ info.label[0] }}</view>
      <view v-if="info.label && info.label.length > 1" class="invest-label m-l-36">{{
        info.label[1]
      }}</view>
      <view v-if="info.label && info.label.length > 2" class="invest-label">{{
        info.label[2]
      }}</view>
    </view>
    <view v-if="info.rol != null && info.rol != undefined" class="invest-proportion">
      <text class="fz-24 color-block">约</text>
      <text class="fz-b fz-60 color-block-yellow">{{ info.rol || 0 }}%</text>
    </view>
    <view class="flex flex-vertical-c">
      <view class="m-r-16 fz-24 lh36 color-block-65">回报率</view>
      <!-- 图标暂时不加 -->
      <!-- <VoIcon name="question-line" :size="16" color="#000000" :opacity="0.45" /> -->
    </view>
    <view v-if="!isDisabled" class="invest-button" @click="toInvest">订购</view>
    <view v-if="isDisabled" class="invest-button disabled">订购</view>
  </view>
</template>

<script>
  export default {
    name: 'InvestInvestment',
    props: {
      info: {
        type: Object,
        require: true,
      },
      labelList: {
        type: Array,
        default: () => {
          return []
        },
      },
      isDisabled: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {}
    },
    methods: {
      toInvest() {
        if (this.info.remainingAvailable < this.info.startNumber) {
          uni.$u.toast('库存不足')
          return
        }
        if (this.info.totalInvestment <= this.info.alreadyInvestedNum) {
          uni.$u.toast('购买数量已经达到上限')
          return
        }

        if (this.info.queryType === 'A') {
          this.$storage.set('projectData', this.info)
          this.$linkToEasy('/pagesAgent/InvestmentList/SubmitOrdersCountry')
        } else {
          this.$emit('toInvest')
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .invest {
    margin-top: 16rpx;
    width: 750rpx;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32rpx;
    box-sizing: border-box;
    &-label {
      text-align: center;
      line-height: 48rpx;
      background: #f7f7f8;
      border-radius: 8rpx;
      font-size: 24rpx;
      color: $v-c0-85;
      padding: 0 10rpx;
    }
    &-proportion {
      line-height: 84rpx;
      margin-top: 26rpx;
    }
    &-button {
      width: 544rpx;
      height: 88rpx;
      line-height: 88rpx;
      text-align: center;
      background: $color-primary-yellow;
      border-radius: 48rpx;
      color: #fff;
      font-size: 32rpx;
      margin-top: 32rpx;
      margin-bottom: 8rpx;
      &.disabled {
        background: #f6f7f8;
        color: rgba(0, 0, 0, 0.25);
      }
    }
  }
</style>
