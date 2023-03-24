<template>
  <view class="notcertified bg-white flex flex-row">
    <view class="notcertified-info flex1 flex flex-row">
      <image
        v-if="info.storeUrl"
        :src="info.storeUrl + '&type=1'"
        class="notcertified-info__head"
      />
      <image v-else src="/static/logo.jpg" class="notcertified-info__head" />
      <view class="flex1 sflex flex-column">
        <view
          class="notcertified-info__titile flex1 flex flex-row flex-vertical-c text-nowrap m-l-16"
        >
          <view class="notcertified-info__titile-content overEllipsis">
            {{ info.storeName || info.fullName || info.userName }}
          </view>
          <view
            v-if="info.checkStatus === 0 || (info.checkStatus == 1 && info.isBindMobile == false)"
            class="status flex flex-row flex-vertical-c grey"
          >
            <VoIcon :opacity="0.25" color="#000000" name="success-fill" size="12" />
            <view class="status-text1">未认证</view>
          </view>
          <view
            v-else-if="info.checkStatus === 1 && info.isBindMobile == true"
            class="status flex flex-row flex-vertical-c orange"
          >
            <VoIcon :size="12" color="#FF9B05" name="success-fill" />
            <view class="status-text2">待审核</view>
          </view>
          <view
            v-else-if="info.checkStatus === 4"
            class="status flex flex-row flex-vertical-c green"
          >
            <VoIcon :size="12" color="#26BF26" name="success-fill" />
            <view class="status-text3">已认证</view>
          </view>
          <view v-else-if="info.bindStatus === 3" class="status flex flex-row flex-vertical-c red">
            <VoIcon :size="12" color="#EE0A24" name="success-fill" />
            <view class="status-text4">审核拒绝</view>
          </view>
          <view v-if="!info.downloadStatus" class="status flex flex-row flex-vertical-c red2">
            <view class="status-text4">未下载APP</view>
          </view>
        </view>

        <view class="flex flex-vertical-c flex-row m-l-16 m-t-8 lh42">
          <view class="mobile">{{ info.userName }}</view>
        </view>
        <view class="notcertified-address m-l-16 m-t-8 overTwoEllipsis lh42">
          {{ info.areaCodeStr }} {{ info.address }}
        </view>
        <view class="flex flex-justify-r">
          <slot></slot>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'NotCertified',
    props: {
      // 调用来源 0、渠道经理；1、招商经理
      origin: {
        type: Number,
        default: 0,
      },
      // 卡片展示信息
      infos: {
        type: Object,
        default: function () {
          return {}
        },
      },
    },
    data() {
      return {
        defaultData: {},
        info: {},
      }
    },
    created() {
      this.info = Object.assign(this.defaultData, this.infos)
    },
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .notcertified {
    width: 750rpx;
    box-sizing: border-box;
    padding: 24rpx 32rpx;
    margin-bottom: 16rpx;
    &:first-child {
      margin-top: 16rpx;
    }
    &-info {
      &__head {
        width: 94rpx;
        height: 94rpx;
        border-radius: 8rpx;
        overflow: hidden;
      }
      &__titile {
        font-size: 32rpx;
        line-height: 48rpx;
        color: $v-c0-85;
        &-content {
          font-weight: bold;
          max-width: 300rpx;
        }
      }
      &__chat {
        width: 32rpx;
        height: 32rpx;
      }
    }
    &-address {
      font-size: 28rpx;
      color: $v-c0-45;
      line-height: 42rpx;
      width: 574rpx;
    }
    &-bt {
      padding: 0 24rpx;
      height: 52rpx;
      line-height: 52rpx;
      border: 2rpx solid #ff5319;
      border-radius: 30rpx;
      color: #ff5319;
      font-size: 24rpx;
    }
    &-lr {
      width: 140rpx;
      height: 52rpx;
      line-height: 52rpx;
      text-align: center;
      border: 2rpx solid #ff5319;
      border-radius: 30rpx;
      color: #ff5319;
      font-size: 24rpx;
    }
  }
  .status {
    border-radius: 200rpx;
    box-sizing: border-box;
    padding: 0 6rpx;
    height: 36rpx;
    margin-left: 8rpx;
    &.grey {
      color: $v-c0-25;
      background: #f7f7f8;
    }
    &.orange {
      color: #ff9b05;
      background-color: #fff5e6;
    }
    &.green {
      color: $v-success;
      background-color: #d9faea;
    }
    &.red {
      color: #f20014;
      background: #ffe6e8;
    }
    &.red2 {
      color: #FF5319;
      background: #FFECE5;
    }
    &-text1,
    &-text2,
    &-text3,
    &-text4 {
      font-size: 20rpx;
      line-height: 30rpx;
      height: 30rpx;
      padding: 0 4rpx;
    }
  }
  .mobile {
    &-status1 {
      height: 36rpx;
      color: #ff9b05;
      font-size: 24rpx;
      line-height: 36rpx;
      box-sizing: border-box;
      padding: 0 16rpx;
      background: #fff5e5;
      border-radius: 22rpx;
    }
    &-status2 {
      height: 36rpx;
      color: #ff5319;
      font-size: 24rpx;
      line-height: 36rpx;
      box-sizing: border-box;
      padding: 0 16rpx;
      background: #feecee;
      border-radius: 22rpx;
    }
    &-status3 {
      color: #ff9b05;
      font-size: 24rpx;
      line-height: 36rpx;
      box-sizing: border-box;
      padding: 0 16rpx;
      background: #fff5e5;
      border-radius: 22rpx;
    }
  }
  .mobile {
    font-size: 28rpx;
    line-height: 42rpx;
    color: $v-c0-85;
    box-sizing: border-box;
    align-items: center;
  }
</style>
