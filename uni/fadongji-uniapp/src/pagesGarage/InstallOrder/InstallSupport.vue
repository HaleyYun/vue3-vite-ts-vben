<template>
  <view>
    <view class="install fz-28 color-block">
      <VoNav :rightWidth="200" is-fixed is-have-more title="安装支持">

      </VoNav>
      <view class="flex1 flex flex-column border-bottom">
        <view class="padding-box color-block-65">
          请先阅读以下安装需要具备的条件，在保证满足以下条件时再进行安装支持申请
        </view>
        <view class="content bg-white flex1">
          <view class="font-weight-500 fz-32 m-b-32">安装需要具备的条件：</view>
          <view>1、上门时需要更换发动机的车辆到厂，全新发动机已到厂。 </view>
          <view>2、安装工位举升机待使用状态。</view>
          <view
            >3、所需安装工具（套筒套装；扭力扳手；风动扳手；动力总成移动小车等）、辅助材料（机油、防冻液；管箍；密封胶等）已准备就绪。</view
          >
          <view class="flex m-t-30">
            <EraCheckboxGroup v-model="selectCheck" placement="column">
              <EraCheckbox :name="1" activeColor="#FF5319" iconSize="14" shape="circle" />
            </EraCheckboxGroup>

            <view class="color-block-45 fz-24"
              >我已阅读并同意
              <span class="color-block-main" @click="goWebView">《安装服务协议》</span></view
            >
          </view>
        </view>
      </view>
      <view class="btm bg-white">
        <view class="flex m-t-30 flex-justify-c">
          <EraCheckboxGroup v-model="selectNoticeCheck" placement="column" @change="noticeChange">
            <EraCheckbox :name="1" activeColor="#FF5319" iconSize="14" />
          </EraCheckboxGroup>

          <view class="color-block-45 fz-24">以后不再提醒</view>
        </view>
        <view class="m-t-20 m-b-20 p-b-safe-area">
          <EraButton
            v-if="selectCheck.length"
            circle
            text="我知道了，开始申请安装指导"
            @click="toApply"
          />
          <EraButton v-else circle disabled text="我知道了，开始申请安装指导" />
          <view class="p-b-safe-area" />
        </view>
      </view>
    </view>
  </view>
</template>
<script>
  import devConf from '@/common/env'

  export default {
    name: 'InstallSupport',
    components: {},
    data() {
      return {
        // isSelect: false,
        selectCheck: [],
        selectNoticeCheck: [],
      }
    },
    onShow() {},
    methods: {
      goWebView() {
        // #ifdef H5
        this.$linkToEasy('/pages/CommonWeb/InstallPolicy?show=1')
        // #endif
        // #ifndef H5
        this.$linkToWebView(devConf.shareBaseUrl + '/pages/CommonWeb/InstallPolicy')
        // #endif
      },
      toApply() {
        console.log(this.selectCheck, this.selectNoticeCheck)
        this.$linkToEasy(`/pagesGarage/InstallOrder/InstallOrderList?origin=home`)
      },
      noticeChange(val) {
        this.selectNoticeCheck = val
        console.log(val)
        if (val.length) {
          this.$storage.set('noInstallNotice', {
            userId: this.userInfo.id,
            noInstallNotice: true,
          })
        } else {
          this.$storage.set('noInstallNotice', {
            userId: this.userInfo.id,
            noInstallNotice: false,
          })
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  .install {
    height: 100vh;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    background: #f7f7f8;
    .padding-box {
      padding: 24rpx 32rpx;
      box-sizing: border-box;
    }
    .content {
      padding: 32rpx;
      box-sizing: border-box;
    }
  }
</style>
