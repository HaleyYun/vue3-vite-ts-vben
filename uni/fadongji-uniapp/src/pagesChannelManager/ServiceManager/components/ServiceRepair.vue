<template>
  <view class="repair m-b-safe-area">
    <view
      v-for="(repair, index) in repairList"
      :key="index"
      class="flex flex-row bg-white repair-item m-t-16 m-b-safe-area"
    >
      <image :src="repair.storeUrl || '/static/logo.jpg'" class="repair-img" />
      <view class="flex1">
        <view class="flex flex-row m-l-16">
          <view class="fz-32 fz-b lh150 color-block">
            {{ repair.storeName || repair.fullName || repair.userName }}
          </view>
          <view v-if="repair.checkStatus === 0" class="status flex flex-vertical-c grey">
            <VoIcon :opacity="0.25" color="#000000" name="success-fill" size="12" />
            <view class="m-l-4">未认证</view>
          </view>
          <view v-else-if="repair.checkStatus === 4" class="status flex flex-vertical-c green">
            <VoIcon color="#26BF26" name="success-fill" size="12" />
            <view class="m-l-4">已认证</view>
          </view>
          <view
            v-else-if="repair.checkStatus === 1 && !repair.isBindMobile"
            class="status flex flex-vertical-c orange"
          >
            <VoIcon color="#FF9B05" name="success-fill" size="12" />
            <view class="m-l-4">待审核</view>
          </view>
          <view v-else-if="repair.checkStatus === 5" class="status flex flex-vertical-c red">
            <VoIcon color="#EE0A24" name="success-fill" size="12" />
            <view class="m-l-4">审核拒绝</view>
          </view>
        </view>
        <view class="fz-28 lh150 color-block-45 m-l-16">{{ encryptPhone(repair.userName) }}</view>
        <view class="fz-28 lh150 color-block-45 m-l-16 m-t-8">
          {{ repair.areaCodeStr + repair.address }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'ServiceRepair',
    props: {
      repairList: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {}
    },
    methods: {
      // 电话加密
      encryptPhone(phone) {
        return phone ? this.$vocenApi.VoUtils.encryptPhone(phone) : ''
      },
    },
  }
</script>

<style lang="scss" scoped>
  .repair {
    width: 750rpx;
    background-color: #f7f7f8;
    &-item {
      box-sizing: border-box;
      padding: 24rpx 32rpx;
      &:last-child {
        margin-bottom: 16rpx;
      }
    }
    &-view1 {
      overflow-x: scroll;
      width: 750rpx;
      height: 96rpx;
      padding: 18rpx 32rpx 14rpx;
      box-sizing: border-box;
    }
    &-tips {
      position: absolute;
      border-radius: 16rpx;
      right: 0rpx;
      top: -8rpx;
    }
    &-screen {
      position: relative;
      padding: 14rpx 40rpx;
      font-size: 24rpx;
      line-height: 36rpx;
      color: #ff5319;
      background-color: #ffece5;
      border: 2rpx solid #ff6633;
      border-radius: 200rpx;
    }
    &-screen1 {
      position: relative;
      padding: 14rpx 40rpx;
      font-size: 24rpx;
      line-height: 36rpx;
      color: $v-c0-85;
      background-color: #f7f7f8;
      border: 2rpx solid #f7f7f8;
      border-radius: 200rpx;
    }
    &-img {
      width: 94rpx;
      height: 94rpx;
    }
  }
  .status {
    margin-left: 8rpx;
    border-radius: 200rpx;
    box-sizing: border-box;
    padding: 0 10rpx 0 6rpx;
    height: 36rpx;
    font-size: 20rpx;
    line-height: 36rpx;
    &.grey {
      color: $v-c0-25;
      background: #f7f7f8;
    }
    &.green {
      color: $v-success;
      background: #ecfaf3;
    }
    &.orange {
      color: #ff9b05;
      background: #fff5e5;
    }
    &.red {
      color: #f45f70;
      background: #feecee;
    }
  }
</style>
