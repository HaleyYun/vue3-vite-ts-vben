<template>
  <view class="pay">
    <u-popup :round="10" :show="show" closeable mode="bottom" @close="closePay">
      <view class="pay-title"> 请选择支付方式 </view>
      <view class="pay-money">
        <VoPointPrice :leftSize="20" :price="totalPrice" :rightSize="14" :show-unit="true" />
      </view>
      <view class="pay-tips">
        <block v-if="cashPrice > 0">现金金额{{ cashPrice }}元</block>
        <block v-if="paymentPrice > 0">，账期金额{{ paymentPrice }}元</block>
      </view>
      <view class="pay-group">
        <view
          v-for="(info, infoIndex) of payTypeList"
          :key="infoIndex"
          class="pay-group__cell"
          @click="chooseFn(infoIndex)"
        >
          <view class="flex flex-vertical-c">
            <image v-if="info.payTypeCode == 1" class="pay-image" src="/static/common/WeChat.png" />
            <image
              v-else-if="info.payTypeCode == 11"
              class="pay-image"
              src="/static/common/alipay.png"
            />
            <view class="fz-32 color-block m-l-24">{{ info.payTypeName }}</view>
          </view>
          <VoIcon v-if="selectIndex == infoIndex" :size="20" color="#FF5319" name="select-right" />
          <VoIcon v-else :size="20" name="address_select" />
        </view>
      </view>
      <view class="pay-bottom p-b-safe-area">
        <EraButton circle @click="confirm" />
      </view>
      <VoModal
        :closeOnClickOverlay="true"
        :content="content"
        :show="showModalCancel"
        confirmText="继续付款"
        cancelText="放弃"
        :showCancelButton="true"
        @cancel="giveUp"
        @confirm="confirm"
      />
    </u-popup>
  </view>
</template>

<script>
  export default {
    name: 'PayPop',
    props: {
      totalPrice: {
        type: [String, Number],
        default: 0,
      },
      cashPrice: {
        type: [String, Number],
        default: 0,
      },
      paymentPrice: {
        type: [String, Number],
        default: 0,
      },
      show: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        selectIndex: 1,
        showModalCancel: false, // 删除模态框
        content: '是否放弃本次付款',
        payTypeList: [],
      }
    },
    created() {
      this.initFn()
    },
    methods: {
      closePay() {
        this.showModalCancel = true
      },
      showFn() {
        this.$emit('update:show', true)
      },
      /**
       * 单选
       * @param e
       */
      chooseFn(info) {
        this.selectIndex = info
      },
      /**
       * 点击确认按钮
       */
      confirm() {
        if (this.selectIndex < 0) {
          this.$u.toast('请选择支付方式')
          return
        }
        let param = this.payTypeList[this.selectIndex]
        if (param.payTypeCode === 1) {
          if (param.payKey) {
            this.$emit('confirm', param)
            return
          }
          this.wechatAuth(param)
          return
        }
        this.$emit('confirm', this.payTypeList[this.selectIndex])
      },
      /**
       *  @description 微信授权
       */
      wechatAuth(param) {
        let that = this
        that.$emit('confirm', param)

        // uni.login({
        //   provider: 'weixin',
        //   success: function (loginRes) {
        //     param.payKey = loginRes.authResult.openid
        //     that.$emit('confirm', param)
        //   },
        //   fail: function (e) {
        //     // 登录授权失败
        //     console.log(e, 'eee')
        //     if (e.code == '-8') {
        //       uni.$u.toast('未安装微信客户端')
        //     } else if (e.code == '-6') {
        //       uni.$u.toast('无法连接到网络')
        //     } else if (e.code == '-2') {
        //       uni.$u.toast('用户取消当前的操作')
        //     } else {
        //       uni.$u.toast('微信拒绝授权')
        //     }
        //   },
        // })
      },
      /**
       *  打开模态框
       */
      open() {
        this.showModalPay = true
      },
      /**
       * 关闭模态框
       */
      close() {
        this.showModalCancel = false
      },
      /**
       * 模态框点击确认按钮时触发
       */
      giveUp() {
        this.showModalCancel = false
        this.$emit('cancel')
        this.$emit('update:show', false)
      },
      initFn() {
        this.$VoHttp.payType().then((res) => {
          this.payTypeList = res.data
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .pay {
    width: 750rpx;
    &-title {
      text-align: center;
      line-height: 48rpx;
      font-weight: bold;
      font-size: 32rpx;
      margin-top: 32rpx;
    }
    &-money {
      margin-top: 70rpx;
      line-height: 60rpx;
      text-align: center;
    }
    &-tips {
      margin-top: 8rpx;
      line-height: 42rpx;
      font-size: 28rpx;
      color: $v-c0-45;
      text-align: center;
      padding-bottom: 24rpx;
      box-sizing: border-box;
    }
    &-group {
      margin-top: 24rpx;
      padding-bottom: 48rpx;
      box-sizing: border-box;
      &__cell {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 2rpx solid $v-bg-light;
        margin-left: 32rpx;
        padding: 16rpx 32rpx 16rpx 0;
        &:last-child {
          border-bottom: none;
        }
      }
    }
    &-image {
      width: 64rpx;
      height: 64rpx;
    }
    &-bottom {
      width: 100%;
      background: #ffffff;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
    }
  }
</style>
