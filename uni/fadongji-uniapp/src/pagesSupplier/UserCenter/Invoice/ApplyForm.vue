<template>
  <view>
    <view
      :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
      class="invoiceList flex flex-column"
    >
      <VoNav isHaveMore title="填写发票信息" />
      <view class="flex1 overflow-y">
        <view class="notice flex flex-vertical-c flex-justify-r" @click="goWebView('/pages/CommonWeb/InvoicingNotice')">
          <text class="fz-24 color-block-45 m-r-8">开票须知</text>
          <VoIcon :opacity="0.45" :size="16" color="#000000" name="account-question" />
        </view>

        <view class="invoiceList-item">
          <view class="invoiceList-item__item flex flex-justify-between flex-vertical-c fz-32">
            <view class="left">共{{ orderList.length }}个订单</view>
            <view class="right">由{{ filterArr.length }}家供应商为您开具发票</view>
          </view>
          <view class="font-box">
            <view class="color-block-45 fz-28">发票总金额</view>
            <VoPointPrice :price="formData.amount" :show-unit="true" />
          </view>
        </view>
        <view class="h16" />
        <view class="invoiceList-item">
          <view class="item-title">发票类型</view>
          <view class="form-label fz-32 m-b-16 m-t-6"><text class="star">*</text>发票类型</view>
          <EraRadioGroup v-model="formData.invoiceKindCode" placement="row" @change="changeTypeFn">
            <EraRadio
              v-for="(item, index) in radiolist"
              :key="index"
              :customStyle="{ marginBottom: '8px', width: '343rpx' }"
              :disabled="item.disabled"
              :iconSize="24"
              :label="item.name"
              :name="item.value"
            />
          </EraRadioGroup>
          <view class="invoiceList-item__line" />
          <view class="form-label fz-32 m-b-16 m-t-24"><text class="star">*</text>抬头类型</view>
          <EraRadioGroup v-model="formData.ownerType" placement="row">
            <EraRadio
              v-for="(item, index) in radiolistHead"
              :key="index"
              :customStyle="{ marginBottom: '8px', width: '343rpx' }"
              :disabled="item.disabled"
              :iconSize="24"
              :label="item.name"
              :name="item.value"
            >
            </EraRadio>
          </EraRadioGroup>
        </view>
        <view class="h16" />
        <view class="invoiceList-item">
          <view class="item-title">开票信息</view>
          <view
            v-show="formData.ownerType === 1"
            class="invoiceList-item__item flex flex-justify-between flex-vertical-c fz-32"
          >
            <view class="left">发票抬头</view>
            <view class="right">
              <input v-model="formData.buyerName" class="self-input" placeholder="请输入" />
            </view>
          </view>
          <view
            v-show="formData.ownerType === 1"
            class="invoiceList-item__item flex flex-justify-between flex-vertical-c fz-32"
          >
            <view class="left">纳税人识别号</view>
            <view class="right">
              <input v-model="formData.buyerTaxpayerNum" class="self-input" placeholder="请输入" />
            </view>
          </view>
          <view
            v-show="formData.ownerType === 2"
            class="invoiceList-item__item flex flex-justify-between flex-vertical-c fz-32"
          >
            <view class="left"><text class="star">*</text>开票人</view>
            <view class="right">
              <input v-model="formData.buyerName" class="self-input" placeholder="请输入" />
            </view>
          </view>
          <view class="invoiceList-item__item flex flex-justify-between flex-vertical-c fz-32">
            <view class="left"><text class="star">*</text>接收电子发票手机号</view>
            <view class="right">
              <input
                v-model="formData.buyerPhone"
                class="self-input"
                maxlength="11"
                placeholder="请输入"
              />
            </view>
          </view>
        </view>
        <view class="tip-box bg-white">
          <view class="item-title">说明</view>
          <view class="color-block-65 fz-24">1.若需要开具增值税专用发票，请联系客服处理。 </view>
          <view class="color-block-65 fz-24"
            >2.发票抬头和认证的营业执照保持一致，若更换营业执照请联系你的渠道经理或者客服
          </view>
          <view class="color-block-65 fz-24"> 3.请将接收电子发票的手机号填写正确</view>
        </view>
      </view>

      <view class="invoiceList-bottom p-b-safe-area">
        <view class="invoiceList-bottom__confirm" @click="confirmClick">确定</view>
      </view>
    </view>
    <u-modal
      :show="showTost"
      cancelText="我知道了"
      confirmColor="#22284b"
      confirmText="联系客服"
      showCancelButton
      @cancel="cancelFn"
      @confirm="confirmFn"
    >
      <view class="modal-content">增值税专用发票请联系客服申请</view>
    </u-modal>
  </view>
</template>

<script>
  import { goOnlineCustomerFn } from '@/common/helper'
  import devConf from "@/common/env";

  export default {
    data() {
      return {
        showTost: false,
        orderList: [],
        amountTotal: '',
        formData: {
          invoiceKindCode: 1,
          ownerType: 1,
          amount: '',
          buyerName: '',
          buyerTaxpayerNum: '',
          buyerPhone: '',
        },
        radiolist: [
          {
            name: '增值税普通发票(电子票)',
            value: 1,
            disabled: false,
          },
          {
            name: '增值税专用发票',
            value: 2,
            disabled: false,
          },
        ],
        radiolistHead: [
          {
            name: '企业',
            value: 1,
            disabled: false,
          },
          {
            name: '个人',
            value: 2,
            disabled: false,
          },
        ],
        filterArr: [], // 根据shopId去重后的列表
      }
    },
    onLoad(option) {
      this.orderList = JSON.parse(option.data)
      // 顺序不同，覆盖结果不同
      let newArr = JSON.parse(option.data)
      let obj = {}
      let result = newArr.reduce((item, next) => {
        obj[next.shopId] ? '' : (obj[next.shopId] = true && item.push(next))
        return item
      }, [])
      console.log(result)
      this.filterArr = result
      this.formData.amount = option.amount
      this.initInfo()
    },
    methods: {

      initInfo() {
        this.$VoHttp.apiCompanyInfoInvoiceTitle().then((res) => {
          this.formData.buyerPhone = res.data.mobile
          this.formData.buyerName = res.data.realName
          this.formData.buyerTaxpayerNum = res.data.businessLicense
        })
      },
      confirmFn() {
        this.showTost = false
        this.formData.invoiceKindCode = 1
        goOnlineCustomerFn()
      },
      cancelFn() {
        this.formData.invoiceKindCode = 1
        this.showTost = false
      },
      /**
       * 专用发票
       */
      changeTypeFn(e) {
        if (Number(e) === 2) {
          this.showTost = true
        }
        this.formData.invoiceKindCode = e
      },
      toDetail() {
        this.$linkToEasy('/pagesSupplier/UserCenter/Invoice/ApplyNotice')
      },
      goWebView(url) {
        // #ifdef H5
        this.$linkToEasy(url + '?show=1')
        // #endif
        // #ifndef H5
        this.$linkToWebView(devConf.shareBaseUrl + url)
        // #endif
      },
      confirmClick() {
        this.invoiceRecordDetailRequest()
      },
      /**
       * 申请发票
       */
      invoiceRecordDetailRequest() {
        console.log(this.formData)
        if (this.formData.buyerName === '' && this.formData.ownerType == 2) {
          uni.$u.toast('请输入开票人')
          return
        }

        if (this.formData.buyerPhone === '') {
          uni.$u.toast('请输入手机号')
          return
        }
        const result = this.$vocenApi.Pattern.isPhone(this.formData.buyerPhone)
        if (!result) {
          uni.$u.toast('手机号格式不正确')
          return
        }

        let orderInfoList = []
        this.orderList.forEach((item) => {
          let params = {
            orderId: item.id,
            orderType: item.orderType,
            shopId: item.shopId,
            payAmount: item.payAmount,
          }
          orderInfoList.push(params)
        })
        this.formData.orderInfoList = orderInfoList
        uni.showLoading({
          title: '正在申请',
          mask: true,
        })
        this.$VoHttp
          .apiInvoiceSave(this.formData)
          .then((res) => {
            uni.hideLoading()
            if (res.code === '20001') {
              uni.$u.toast('申请成功')
              setTimeout(() => {
                this.$backFn()
              }, 1500)
            } else {
              uni.$u.toast(res.message || '申请失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '申请失败')
          })
          .finally(() => {
            uni.hideLoading()
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .invoiceList {
    width: 750rpx;
    height: 100vh;
    color: $v-c0-85;
    .notice {
      height: 84rpx;
      padding: 24rpx 32rpx;
      box-sizing: border-box;
    }
    .font-box {
      padding: 24rpx 0 32rpx 0;
    }
    .item-title {
      padding-top: 22rpx;
      padding-bottom: 18rpx;
      font-size: 28rpx;
      font-weight: 500;
    }
    .star {
      color: #e50012;
    }
    .self-input {
      text-align: right;
    }
    .tip-box {
      padding: 32rpx;
      .item-title {
        padding-top: 0;
      }
    }
    &-item {
      background-color: #ffffff;
      padding: 0rpx 32rpx;
      box-sizing: border-box;
      &__item {
        white-space: nowrap;
        background-color: #ffffff;
        height: 96rpx;
        line-height: 96rpx;
        border-bottom: 2rpx solid $v-bg-light;
        .left {
          color: $v-c0-85;
        }
        .right {
          color: $v-c0-65;
        }
        .content {
          color: $v-c0-25;
          padding-right: 8rpx;
        }
      }
      &__line {
        height: 2rpx;
        background-color: $v-bg-light;
      }
    }
    &-photo {
      padding: 40rpx 32rpx;
      background-color: #ffffff;
      &__black {
        color: $v-c0-85;
      }
      &__gay {
        color: $v-c0-25;
      }
      &__pictures {
        margin: 32rpx 0rpx 0rpx;
        .pictures-img {
          border-radius: 8rpx;
          width: 214rpx;
          height: 214rpx;
        }
      }
    }
    &-bottom {
      background-color: #ffffff;

      &__confirm {
        margin: 20rpx 47rpx;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        background-color: $color-primary-yellow;
        color: #ffffff;
        font-size: 32rpx;
        border-radius: 48rpx;
      }
    }
  }
  .modal-content {
    font-size: 32rpx;
    color: rgba(0, 0, 0, 0.85);
    line-height: 150%;
    padding: 15px 0px;
    text-align: center;
  }
</style>
