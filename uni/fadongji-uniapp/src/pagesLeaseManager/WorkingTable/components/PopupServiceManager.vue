<template>
  <view>
    <u-popup
      closeOnClickOverlay
      :round="20"
      :show="isShowPopup"
      class="popup"
      mode="bottom"
      @close="close"
    >
      <view class="bottom flex flex-column">
        <view class="flex flex-row flex-vertical-c flex-justify-between p-t-24">
          <view class="bottom-title">供应商审核</view>
          <VoIcon :opacity="0.65" color="#000" name="close-x" size="11.2" @click="close" />
        </view>
        <view class="bottom-line m-t-24"></view>
        <view class="flex flex-row flex-vertical-c m-t-24">
          <view class="bottom-text1">供应商名称：</view>
          <view class="bottom-text1 m-l-8">{{ cur.storeName ? cur.storeName : '' }}</view>
        </view>
        <view class="flex flex-row flex-vertical-c m-t-16">
          <view class="bottom-text1">审核：</view>
          <view class="bottom-text3" @click="pass">审核通过</view>
<!--          <view :class="isPass ? 'bottom-text3' : 'bottom-text2'" class="m-l-8" @click="pass"-->
<!--            >审核通过</view-->
<!--          >-->
<!--          <view :class="isNoPass ? 'bottom-text3' : 'bottom-text2'" class="m-l-48" @click="noPass"-->
<!--            >审核不通过</view-->
<!--          >-->
        </view>
<!--        <view class="bottom-text1 m-t-16">拒绝原因:</view>-->
<!--        <view class="bottom-textarea flex flex-column flex-justify-between">-->
<!--          <textarea-->
<!--            v-model.trim="remarks"-->
<!--            auto-height-->
<!--            maxlength="450"-->
<!--            placeholder="请输入备注信息"-->
<!--            placeholder-style="font-size: 28rpx;color: rgba(0, 0, 0, 0.25);"-->
<!--          ></textarea>-->
<!--          <view class="bottom-textarea__num">{{ remarks.length }}/450</view>-->
<!--        </view>-->
        <view class="p-t-20 p-b-20">
          <view class="bottom-text flex1" @click="sure">确定</view>
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
        remarks: '',
        isShowPopup: false,
        isPass: true,
        isNoPass: false,
      }
    },
    methods: {
      // 打开审核弹窗
      showPop() {
        this.isShowPopup = true
      },
      /**
       * 提交审核结果
       * @returns {Promise<void>}
       */
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
      // 关闭弹窗
      close() {
        this.isShowPopup = false
      },
      pass() {
        this.isPass = true
        this.isNoPass = false
      },
      noPass() {
        this.isPass = false
        this.isNoPass = true
      },
    },
  }
</script>

<style lang="scss" scoped>
  .bottom {
    background-color: #fff;
    font-size: 32rpx;
    width: 750rpx;
    padding: 0 32rpx;
    box-sizing: border-box;
    &-line {
      width: 100%;
      height: 2rpx;
      background-color: #f7f7f8;
    }
    &-textarea {
      width: 100%;
      //height: 168rpx;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      background-color: #f7f7f8;
      font-size: 28rpx;
      line-height: 42rpx;
      color: $v-c0-85;
      margin-top: 16rpx;
      margin-bottom: 24rpx;
      &__num {
        margin-top: 8rpx;
        text-align: right;
        color: $v-c0-25;
      }
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
      width: 168rpx;
      height: 64rpx;
      line-height: 64rpx;
      text-align: center;
      font-size: 24rpx;
      color: $v-c0-85;
      box-sizing: border-box;
      border-radius: 40rpx;
      border: 2rpx solid #f7f7f8;
      background-color: #f7f7f8;
    }
    &-text3 {
      width: 168rpx;
      height: 64rpx;
      line-height: 64rpx;
      text-align: center;
      font-size: 24rpx;
      color: #ff5319;
      box-sizing: border-box;
      border-radius: 40rpx;
      border: 2rpx solid #ff5319;
      background-color: #ffece5;
    }
    &-textarea {
      //background: #f7f7f8;
      //padding: 20rpx 32rpx;
      //box-sizing: border-box;
    }
  }
</style>
