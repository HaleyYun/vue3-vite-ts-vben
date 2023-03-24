<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="aboutus p-b-safe-area fz-30"
  >
    <VoNav is-fixed is-have-more title="关于我们" />
    <view class="aboutus-info flex flex-justify-c">
      <image class="aboutus-info__logo" src="/static/created/Setting/setting_logo.png" />
    </view>
    <view class="mx-72 fz-b color-block flex1" style="line-height: 210%">
      <view>
        发动集是涵盖发动机交易、共创、发动机旧机回收、发动机上门安装、技术指导
        等多项业务在内的一站式发动机生态平台。
      </view>
      <view class="m-t-60">
        拥有80多个合作发动机厂家，涵盖52个车系600多个发动机型号（包含原厂机、全新机、再制造、试验机、拆车机），提供2小时上门安装服务、旧机回收服务、旧机置换，专业在线技术指导服务等。服务能力覆盖31个省直辖市、405个城市。
      </view>
      <view class="m-t-60">
        平台联结中国汽配行业上游优质供应商与下游专业维修厂商，用科技手段搭建汽车后市场基础设施，为汽车汽配行业人士提供即时供求商机，降低汽配交易门槛，用“一站式”快捷服务助力行业健康、有序的发展。
      </view>
      <view class="m-t-60">
        率先在行业内提出支持极速售后、上门安装、旧机置换、旧机回收、技术问诊等多项增值服务，以解决维修厂换发动机后顾之忧。
      </view>
    </view>
    <view class="m-t-88">
      <view class="aboutus-info__version">Version {{ versionFn() }} </view>
      <view class="aboutus-info__link" @click="goWebView('/pages/CommonWeb/UserPolicy')"
        >《服务协议》</view
      >
    </view>
  </view>
</template>

<script>
  import devConf from '@/common/env'
  import { androidEnvVersion, iosEnvVersion } from '@/common/envVersion'

  export default {
    data() {
      return {
        version: '1.01',
      }
    },
    methods: {
      versionFn() {
        let platform = uni.getSystemInfoSync().platform
        if (platform == 'android') {
          return 'V' + androidEnvVersion
        } else if (platform == 'ios') {
          return 'V' + iosEnvVersion
        }
      },
      goWebView(url) {
        // #ifdef H5
        this.$linkToEasy(url + '?show=1')
        // #endif
        // #ifndef H5
        this.$linkToWebView(devConf.shareBaseUrl + url)
        // #endif
      },
    },
  }
</script>

<style lang="scss" scoped>
  .aboutus {
    width: 750rpx;
    height: 100vh;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    overflow: auto;
    &-info {
      margin-top: 60rpx;
      margin-bottom: 68rpx;
      width: 100%;
      &__logo {
        width: 252rpx;
        height: 300rpx;
      }
      &__version {
        font-weight: bold;
        font-size: 30rpx;
        line-height: 150%;
        color: rgba(0, 0, 0, 0.45);
        margin-bottom: 24rpx;
        text-align: center;
      }
      &__link {
        font-weight: bold;
        color: #2676ff;
        text-align: center;
        margin-bottom: 30rpx;
      }
    }
  }
</style>
