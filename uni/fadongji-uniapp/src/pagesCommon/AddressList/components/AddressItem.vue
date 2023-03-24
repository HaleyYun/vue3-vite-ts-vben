<template>
  <view class="addressItem">
    <view class="addressItem-info flex flex-vertical-c">
      <VoIcon :size="24" color="#22284B" name="address" />
      <view class="addressItem-info__name"> {{ addressItem.name }} </view>
      <view class="addressItem-info__name"> {{ addressItem.mobile }} </view>
    </view>
    <view class="addressItem-address">
      {{ addressItem.provinceName }}{{ addressItem.cityName }}{{ addressItem.areaName
      }}{{ addressItem.address }}
    </view>
    <view class="addressItem-line" />
  </view>
</template>

<script>
  export default {
    name: 'AddressItem',
    props: {
      addressItem: {
        type: Object,
        default() {
          return {}
        },
      },
    },
    data() {
      return {
        selected: false,
      }
    },
  }
</script>

<style lang="scss" scoped>
  .addressItem {
    background-color: #ffffff;
    padding: 0rpx 32rpx;

    &-info {
      padding-top: 32rpx;

      &__name {
        margin-left: 16rpx;
        color: $v-c0-85;
        font-weight: bold;
        font-size: 32rpx;
      }

      &__default {
        margin-left: 16rpx;
        background-color: $v-error-btn-disabled;
        border-radius: 24rpx;
        .text {
          padding: 4rpx 16rpx;
          color: $color-clicked-red;
          font-size: 24rpx;
        }
      }
    }
    &-address {
      padding: 32rpx 0rpx;
      color: $v-c0-85;
      font-size: 28rpx;
    }
    &-line {
      width: 100%;
      background-color: $v-bg-light;
      height: 2rpx;
    }
    &-bottom {
      width: 100%;
      height: 112rpx;

      &__default {
        margin-left: 8rpx;
        color: $v-c0-65;
        font-size: 28rpx;
      }
    }
  }
  .edit-padding {
    padding-right: 40rpx;
  }
</style>
