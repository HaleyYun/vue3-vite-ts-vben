<template>
  <view
    class="order"
    :class="{
      'wrap-bubble': orderInfoList.direction === 'from',
      'wrap-bubble__main': orderInfoList.direction === 'to',
    }"
    @click="toDetail(orderInfoList.content.type)"
  >
    <view class="order-title">请您核对订单信息</view>
    <view class="order-con flex">
      <image class="order-con__img" v-if="getPic" :src="getPic" />
      <view class="order-con__msg flex1">
        <view class="ms-name overEllipsis">
          <text
            v-show="orderInfoList.content.goodsDetail[0].categoryType"
            class="good-tips m-r-8"
            >{{ orderInfoList.content.goodsDetail[0].categoryType }}</text
          >
          <text> {{ orderInfoList.content.goodsDetail[0].goodsName }}</text>
        </view>
        <view class="ms-num">
          共{{ orderInfoList.content.goodsDetail[0].goodsCount }}件商品，合计{{
            orderInfoList.content.goodsDetail[0].payPrice
          }}元
        </view>
      </view>
    </view>
    <view class="order-info" v-if="addressDetail">
      <view>姓名：{{ addressDetail.name ? addressDetail.name : '--' }}</view>
      <view>电话：{{ addressDetail.phone ? addressDetail.phone : '--' }}</view>
      <view class="flex">
        <view>地址：</view>
        <view class="flex1">{{ addressDetail.address }}{{ addressDetail.addressDetail }}</view>
      </view>
    </view>
    <!-- 0未支付   1已支付  2已取消 -->
    <view
      class="order-button confirm"
      @click.stop="remindPayment"
      v-if="orderInfoList.direction === 'to' && orderInfoList.content.orderStatus == 0"
      >提醒付款</view
    >
    <view class="order-button already" v-if="orderInfoList.content.orderStatus == 1">已确认</view>
    <view
      class="order-button already"
      v-if="orderInfoList.direction === 'to' &&orderInfoList.content.orderStatus == 2"
      @click.stop="toToast()"
      >提醒付款</view
    >
  </view>
</template>
<script>
  export default {
    name: 'CheckOrderInfo',
    props: {
      /**
       * orderTitle 标题
       * bubbleType 等于left时是左边气泡样式 等于right时是右边气泡样式
       * orderImage 商品图片
       * orderName 商品名称
       * orderNum 商品数量
       * price 总价
       * name 姓名
       * phone 电话
       * address 地址
       * type 1确认订单 2已确认
       */
      orderInfoList: {
        type: Object,
        default() {
          return { content: {} }
        },
      },
    },
    data() {
      return {
        addressDetail: '',
      }
    },
    computed: {
      getPic() {
        let url
        if (this.orderInfoList.content.goodsDetail[0].pic) {
          url = this.orderInfoList.content.goodsDetail[0].pic[0]
        } else if (this.orderInfoList.content.goodsDetail[0].goodsPic) {
          url = this.orderInfoList.content.goodsDetail[0].goodsPic
        }
        if (this.$vocenApi.Pattern.isVideoUrl(url.toLocaleLowerCase())) {
          return url + '&type=3'
        } else {
          return url + '&type=1'
        }
      },
    },

    created() {
      console.log(this.orderInfoList.content)
      if (this.orderInfoList.content && this.orderInfoList.content.addressDetail) {
        this.getAddress('addressDetail')
      } else if (this.orderInfoList.content && this.orderInfoList.content.address) {
        this.getAddress('address')
      }
    },
    methods: {
      toToast() {
        this.$u.toast('买家已取消订单')
      },
      toDetail(type) {
        // type 订单类型 11销售订单 12投资订单  13旧机订单    发货的只有这三种发送订单
        //订单跳转到订单详情
        console.log('userInfo', this.userInfo.platformCode, type)
        console.log(this.orderInfoList.content)
        if (this.userInfo.platformCode === 'supplier') {
          if (type == 11) {
            this.$linkToEasy(
              `/pagesSupplier/Order/OrderDetail/OrderDetail?id=${this.orderInfoList.content.id}`,
            )
          } else if (type == 12) {
            this.$linkToEasy(
              `/pagesSupplier/Order/OrderDetail/InvestDetail?id=${this.orderInfoList.content.id}`,
            )
          }
          return
        }
        if (this.userInfo.platformCode === 'agent') {
          if (type == 11) {
            // `/pagesAgent/Order/OrderDetail/OrderDetail?id=${content.id}`
            this.$linkToEasy(
              `/pagesAgent/Order/OrderDetail/OrderDetail?id=${this.orderInfoList.content.id}`,
            )
          } else if (type == 12) {
            this.$linkToEasy(
              `/pagesAgent/Order/OrderDetail/InvestDetail?data=${this.orderInfoList.content.id}`,
            )
          }
          return
        }
        if (this.userInfo.platformCode === 'garage') {
          this.$linkToEasy(
            `/pagesGarage/InstallOrder/OrderDetail/OrderDetail?id=${this.orderInfoList.content.id}`,
          )
          return
        }
        // 旧机订单
        if (this.userInfo.platformCode == 'oldMachine') {
          this.$linkToEasy(
            `/pagesOldBuyer/MyOrder/MarkerOrderDetail?id=${this.orderInfoList.content.id}`,
          )
        }
        // 回收在销售订单
        if (this.userInfo.platformCode == 'recycling') {
          this.$linkToEasy(
            `/pagesRecovery/SellOrder/OrderDetail/OrderDetail?data=${this.orderInfoList.content.id}`,
          )
        }
      },
      getAddress(key) {
        try {
          if (typeof this.orderInfoList.content[key] == 'string') {
            this.addressDetail = JSON.parse(this.orderInfoList.content[key])
          } else {
            this.addressDetail = this.orderInfoList.content[key]
          }
        } catch (e) {
          this.addressDetail = this.orderInfoList.content[key]
        }
      },
      remindPayment() {
        this.$emit('remindPayment')
      },
    },
  }
</script>
<style lang="scss" scoped>
  .wrap-bubble {
    background: #fff;
    font-size: 28rpx;
    padding: 24rpx;
    border-radius: 10rpx;
    position: relative;
    max-width: 472rpx;
    width: 472rpx;

    &::before {
      content: '';
      position: absolute;
      left: -16rpx;
      top: 22rpx;
      border-top: 14rpx solid transparent;
      border-bottom: 14rpx solid transparent;
      border-right: 16rpx solid #fff;
      border-radius: 8rpx;
    }
  }
  .wrap-bubble__main {
    background: #fff;
    font-size: 28rpx;
    padding: 24rpx;
    max-width: 472rpx;
    width: 472rpx;
    border-radius: 10rpx;
    text-align: left;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      right: -16rpx;
      top: 22rpx;
      border-top: 14rpx solid transparent;
      border-bottom: 14rpx solid transparent;
      border-left: 16rpx solid #fff;
      border-radius: 8rpx;
    }
  }

  .order {
    display: inline-block;
    background: #fff;
    &-title {
      margin: 0 24rpx;
      font-weight: bold;
      font-size: 28rpx;
    }
    &-con {
      max-width: 100%;
      padding: 18rpx 20rpx 18rpx 24rpx;
      &__img {
        width: 100rpx;
        min-width: 100rpx;
        height: 100rpx;
      }
      &__msg {
        width: calc(100% - 100rpx);
        padding: 8rpx 12rpx 6rpx 16rpx;
        background: $v-bg-light;
        .ms-name {
          font-size: 28rpx;
          line-height: 42rpx;
          word-break: break-all;
        }
        .ms-num {
          line-height: 40rpx;
          font-size: 26rpx;
          color: $v-c0-45;
          margin-top: 4rpx;
        }
      }
    }
    &-info {
      max-width: 100%;
      margin-left: 24rpx;
      color: $v-c0-45;
    }
    &-button {
      width: 144rpx;
      height: 48rpx;
      line-height: 48rpx;
      border-radius: 30rpx;
      text-align: center;
      font-size: 26rpx;
      margin-top: 20rpx;
      margin-left: auto;
      margin-right: 24rpx;
      &.confirm {
        background: $color-primary-yellow;
        color: #ffffff;
      }
      &.already {
        background: $v-btn-disabled;
        color: $v-c0-25;
      }
    }
  }
  .good-tips {
    height: 36rpx;
    line-height: 36rpx;
    font-size: 24rpx;
    color: $color-primary-yellow;
    padding: 0 12rpx;
    background: $v-tags-btn-disabled;
    border-radius: 24rpx;
  }
</style>
