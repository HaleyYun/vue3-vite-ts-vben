<template>
  <view
    class="remark flex flex-column"
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
  >
    <VoNav isHaveMore title="订单备注" />
    <view class="remark-line" />
    <view class="remark-content">
      <!--   文本域-->
      <EraTextarea
        class="remark-content__area"
        placeholder="请输入备注信息"
        maxlength="450"
        v-model.trim="textModel"
        count
        border="none"
        height="498rpx"
        placeholderStyle="color:$v-c0-25;font-size:28rpx"
      />
    </view>
    <view class="remark-bottom" :class="textModel.length > 0 ? 'remark-select' : ''" @click="confirmClick">提交</view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        textModel: '',
        orderNumber: 0,
        type: '',
      }
    },
    onLoad(option) {
      let data = JSON.parse(option.data)
      this.orderNumber = data.id
      this.type = option.type
    },
    methods: {
      confirmClick() {
        if (this.textModel.length > 0) {
          if (this.type === '1') {
            this.investOrderRemarkRequest()
            return
          }
          this.marketOrderRemarkRequest()
          return
        }
      },
      //添加销售订单备注请求
      //type 1.买家备注,2.卖家备注
      marketOrderRemarkRequest() {
        let param = {
          orderId: this.orderNumber,
          remark: this.textModel,
          type: 1,
        }
        console.log(param)
        this.$VoHttp
          .apiOrderSellRemarkAdd(param)
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('订单备注添加成功')
            } else {
              uni.$u.toast(res.message || '订单备注添加失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('订单备注添加失败')
          })
      },
      //添加投资订单备注请求
      //type 1.买家备注,2.卖家备注
      investOrderRemarkRequest() {
        let param = {
          orderId: this.orderNumber,
          remark: this.textModel,
          type: 1,
        }
        console.log(param)
        this.$VoHttp
          .apiOrderInvestRemarkAdd(param)
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('订单备注添加成功')
            } else {
              uni.$u.toast(res.message || '订单备注添加失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('订单备注添加失败')
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .remark {
    background-color: #ffffff;
    width: 750rpx;
    height: 100vh;

    &-line {
      background-color: #f8f8f8;
      height: 2rpx;
      width: 750rpx;
    }

    &-content {
      margin-top: 40rpx;
      margin-left: 32rpx;
      margin-right: 32rpx;
      background-color: $v-bg-light;

      &__area {
        background-color: $v-bg-light;
        padding: 20rpx 32rpx;
      }
    }
    &-bottom {
      margin-left: 32rpx;
      margin-right: 32rpx;
      margin-top: 74rpx;
      height: 92rpx;
      line-height: 92rpx;
      color: $v-c0-25;
      background-color: $v-btn-disabled;
      border-radius: 48rpx;
      text-align: center;
    }
    &-select {
      background-color: $color-primary-yellow;
      color: #ffffff;
    }
  }
</style>
