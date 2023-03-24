<template>
  <view class="vh-full bg-white">
    <VoNav :left-width="240" :right-width="240" is-fixed is-have-more>
      <template #title>订单推送成功</template>
    </VoNav>
    <view class="success-img fz-0">
      <image class="img" mode="aspectFit" src="/static/created/certify/success_tips.png" />
    </view>
    <view class="success-text">订单推送成功</view>
    <view class="success-desc">请联系修理厂完成订单支付</view>
    <view class="put-operate-save border-box bg-white px-32">
      <view class="py-12 flex">
        <view class="p-r-15 flex1">
          <u-button
            :plain="true"
            color="#FF5319"
            shape="circle"
            size="large"
            text="返回首页"
            type="primary"
            @click.native="goToPutProduct"
          />
        </view>
        <view class="p-l-15 flex1">
          <u-button
            :plain="true"
            color="#FF5319"
            shape="circle"
            size="large"
            text="查看订单"
            type="primary"
            @click.native="checkHandler"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import { toRoleHome } from '@/common/helper'

  export default {
    name: 'PutSuccess',
    data() {
      return {
        queryType: '',
      }
    },
    onLoad(option) {
      this.queryType = option.queryType
    },
    methods: {
      goToPutProduct() {
        // uni.$u.route('/pagesProduct/PutProduct/PutProduct')
        toRoleHome()
      },
      checkHandler() {
        if (this.queryType === 'A') {
          this.$linkToEasy('/pagesAgent/Order/PromoteOrder/PromoteOrderList')
          return
        }
        this.$linkToEasy('/pagesAgent/Order/MarketOrder/MarkerOrderList')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .success-text {
    @include black-size-color(30, 0.85);
    font-weight: bold;
    text-align: center;
    margin-top: 46rpx;
  }

  .success-desc {
    @include black-size-color(24, 0.45);
    text-align: center;
    margin-top: 24rpx;
    margin-bottom: 160rpx;
  }

  .success-img {
    text-align: center;
    padding-top: 200rpx;

    .img {
      width: 148rpx;
      height: 148rpx;
    }
  }
</style>
