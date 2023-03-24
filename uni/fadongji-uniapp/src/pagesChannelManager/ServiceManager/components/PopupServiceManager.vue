<template>
  <view>
    <u-popup
      :closeOnClickOverlay="true"
      :closeable="false"
      :round="20"
      :show="isShowPopup"
      class="popup"
      mode="bottom"
      @close="close"
    >
      <view class="p-b-safe-area">
        <view class="bottom">
          <view class="flex flex-row flex-vertical-c flex-justify-between">
            <view class="bottom-title">服务商审核</view>
            <VoIcon :opacity="0.65" color="#000" name="close-x" size="11.2" @click="close" />
          </view>
          <view class="bottom-line m-t-24"></view>
          <view class="flex flex-row flex-vertical-c m-t-24">
            <view class="bottom-text1">服务商名称:</view>
            <view class="bottom-text1 m-l-8">{{ cur.storeName ? cur.storeName : '' }}</view>
          </view>
          <view class="flex flex-row flex-vertical-c m-t-16">
            <view class="bottom-text1">审核：</view>
            <view class="bottom-text3" @click="pass">审核通过</view>
<!--            <view :class="isPass ? 'bottom-text3' : 'bottom-text2'" class="m-l-8" @click="pass"-->
<!--              >审核通过</view-->
<!--            >-->
<!--            <view :class="isNoPass ? 'bottom-text3' : 'bottom-text2'" class="m-l-48" @click="noPass"-->
<!--              >审核不通过</view-->
<!--            >-->
          </view>
<!--          <view class="bottom-text1 m-t-16">拒绝原因:</view>-->
<!--          <EraTextarea-->
<!--            v-model.trim="remarks"-->
<!--            border="none"-->
<!--            class="bottom-textarea m-t-16"-->
<!--            count-->
<!--            height="268rpx"-->
<!--            maxlength="450"-->
<!--            placeholder="请输入拒绝原因"-->
<!--            placeholderStyle="color:$v-c0-25;font-size:28rpx"-->
<!--          />-->
          <view class="bottom-text flex1 m-l-14 m-r-14 m-t-44" @click="sure">确定</view>
          <VoSafetyArea />
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
  import { showLoading, hideLoading } from "@/common/helper"
  export default {
    name: 'PopupServiceManager',
    props: {
      cur: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        isShowPopup: false,
        isPass: true,
        isNoPass: false,
        remarks: '',
      }
    },
    methods: {
      showPop() {
        this.isShowPopup = true
      },
      close() {
        this.isShowPopup = false
        // console.log('close');
      },
      pass() {
        this.isPass = true
        this.isNoPass = false
      },
      noPass() {
        this.isNoPass = true
        this.isPass = false
      },
      async sure() {
        showLoading()
        let params = {}
        params.id = this.cur.companyId
        if (this.isPass) {
          params.status = 4
        } else {
          return
          params.status = 5
          params.result = this.remarks
        }
        const data = await this.$VoHttp.apiCompanyInfoAudit(params)
        hideLoading()
        if (data.code === 20001) {
          this.$u.toast('success')
          this.isShowPopup = false
          this.$emit('success')
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .bottom {
    background-color: #fff;
    font-size: 32rpx;
    width: 750rpx;
    padding: 20rpx 32rpx;
    box-sizing: border-box;
    &-line {
      width: 100%;
      height: 2rpx;
      background-color: #f7f7f8;
    }
    &-textarea {
      background-color: $v-bg-light;
      padding: 20rpx 32rpx;
    }
    &-text {
      width: 100%;
      padding: 22rpx 0;
      box-sizing: border-box;
      border-radius: 48rpx;
      color: #fff;
      background-color: #ff5319;
      text-align: center;
    }
    &-title {
      font-size: 32rpx;
      font-weight: bold;
      color: $v-c0-85;
      line-height: 48rpx;
    }
    &-text1 {
      font-size: 28rpx;
      line-height: 42rpx;
      color: $v-c0-85;
    }
    &-text2 {
      font-size: 24rpx;
      color: $v-c0-85;
      padding: 14rpx 24rpx;
      box-sizing: border-box;
      border-radius: 40rpx;
      background-color: #f7f7f8;
    }
    &-text3 {
      font-size: 24rpx;
      color: #ff5319;
      padding: 14rpx 24rpx;
      box-sizing: border-box;
      border-radius: 40rpx;
      border: 2rpx solid #ff5319;
      background-color: #ffece5;
    }
  }
</style>
