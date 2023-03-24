<template>
  <view class="carInfo">
    <!--  剩余投资量-暂时没有	-->
    <view class="carInfo-title flex flex-vertical-c flex-justify-c"
      >{{ info.name }}
      <text class="p-l-10">| {{ info.totalInvestment - info.alreadyInvestedNum }}台</text>
    </view>
    <view class="carInfo-tags flex flex-justify-c">
      <view v-for="(label, index) in info.label" :key="index" class="carInfo-tags__btn">
        <view class="title">{{ label }}</view>
      </view>
    </view>

    <view class="carInfo-ratio flex flex-justify-c flex-vertical-c">
      <view class="carInfo-ratio__left">约</view>
      <view class="carInfo-ratio__right">{{ info.rol }}%</view>
    </view>

    <view class="carInfo-info flex flex-justify-c flex-vertical-c">
      <view class="carInfo-info__title">回报率</view>
      <VoIcon :size="16" name="question-line" />
    </view>

    <view class="carInfo-btn">订购</view>
    <image class="carInfo-image" src="/static/created/invest/invest_detail_top.png" />
  </view>
</template>

<script>
  export default {
    name: 'CarInfo',
    props: {
      info: {
        type: Object,
        default() {
          return {}
        },
      },
    },
  }
</script>

<style lang="scss" scoped>
  .carInfo {
    position: relative;
    width: 750rpx;
    background-color: #ffffff;
    box-sizing: border-box;

    &-title {
      margin-top: 32rpx;
      color: $v-c0-85;
      font-size: 32rpx;
      font-weight: bold;
      text-align: center;
    }

    &-tags {
      margin: 16rpx 32rpx 32rpx;

      &__btn {
        background-color: $v-bg-light;
        border-radius: 8rpx;

        .title {
          margin: 6rpx 18rpx;
          font-size: 24rpx;
          color: $v-c0-85;
        }
      }

      &__paddingLeft {
        margin-left: 36rpx;
      }
    }

    &-ratio {
      margin-top: 26rpx;

      &__left {
        color: $v-c0-85;
        font-size: 24rpx;
      }

      &__right {
        color: $v-tags;
        font-size: 56rpx;
        font-weight: bold;
      }
    }

    &-info {
      &__title {
        color: $v-c0-65;
        font-size: 24rpx;
        padding-right: 16rpx;
      }
    }

    &-btn {
      margin: 32rpx 102rpx 40rpx;
      height: 88rpx;
      line-height: 88rpx;
      background-color: $color-disabled-yellow;
      text-align: center;
      font-size: 32rpx;
      font-size: 32rpx;
      color: $v-c0-25;
      border-radius: 48rpx;
    }

    &-image {
      position: absolute;
      top: 24rpx;
      right: 24rpx;
      width: 160rpx;
      height: 134rpx;
    }
  }
</style>
