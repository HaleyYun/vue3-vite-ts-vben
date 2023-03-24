<template>
  <view class="orderItem" @click="orderDetail(orderData)">
    <view class="orderItem-info">
      <view class="flex1 flex flex-justify-between flex-vertical-c">
        <view class="flex">
          <view class="orderItem-info__title fz-28">订单号</view>
          <view class="orderItem-info__number fz-28"> {{ orderData.id }} </view>
          <view class="orderItem-info__copy fz-28" @click.stop="copyClick(orderData.id)">复制</view>
        </view>
        <view class="flex">
          <view class="fz-28 lh150 color-block-yellow"> {{ orderData.orderStatusName }} </view>
        </view>
      </view>
      <view class="flex flex-vertical-c flex-justify-between m-t-8">
        <view class="p-t-8 color-block-45 fz-28"> 下单时间 {{ orderData.createTime }} </view>
      </view>
    </view>
    <view class="orderItem-line" />
    <view class="orderItem-good">
      <view class="flex orderItem-good__store flex-vertical-c">
        <VoIcon :size="24" name="smile-m" />
        <view class="flex1 fz-b m-l-8"> {{ orderData.shopName }}</view>
      </view>
      <GoodItem
        v-for="(item, index) in orderData.goodsDetail"
        v-show="index < 3"
        :key="index"
        :good-data="item"
        :is-show-deliver="true"
        :is-show-invest="orderData.status === 1120 ? true : false"
      />
      <view
        v-if="orderData.goodsDetail && orderData.goodsDetail.length > 3"
        class="lookMore flex flex-vertical-c flex-justify-c"
      >
        <view>查看更多</view>
        <VoIcon :size="16" name="open" />
      </view>
    </view>
    <view class="flex orderItem-service">
      <view class="flex1">共{{ orderData.goodsDetail.length }}种 {{ goodNumber }}件商品</view>
      <view class="flex flex-vertical-c">
        <view class="color-block-45 m-r-8">应付款</view>
        <VoPointPrice
          :price="orderData.orderTotalAmount ? orderData.orderTotalAmount.toString() : '0'"
          :show-unit="true"
        />
      </view>
    </view>
    <!--待发货-->
    <view v-if="orderData.status === 1120" class="orderItem-tool flex flex-justify-r">
      <view
        class="orderItem-tool__btn orderItem-tool__p"
        @click.stop="bottomBtnClick('1', orderData)"
        >修改地址</view
      >
    </view>
    <view v-else class="p-b-32" />
  </view>
</template>

<script>
  import GoodItem from './DistributionGoodItem'

  export default {
    name: 'DistributionItem',
    components: {
      GoodItem,
    },

    props: {
      /*
        orderNum    订单编号
        time        剩余时间
        status      订单状态 0.全部 1.待付款 2.待发货 3.已发货 4.已完成 5.已取消
        statusDes   订单状态描述
        storeName   门店名称
        goodUrl     商品url
        goodName    商品名称
        goodPrice   商品价格
        orderType   商品数量
        paymentTime 账期时间
        orderType   订单账期状态 1.非账期 2.账期
        servicePrice商品服务费
        remake      备注
         */
      orderData: {
        type: Object,
        orderData: {},
      },
    },
    data() {
      return {
        goodList: [],
        goodNumber: 0,
      }
    },
    computed: {
      remark() {
        if (this.orderData.remarkList.length) {
          const remarkObj = this.orderData.remarkList.find((item) => item.type === 2)
          return remarkObj ? remarkObj.remark : ''
        } else {
          return ''
        }
      },
    },
    created() {
      this.orderData.goodsDetail.forEach((item) => {
        if(item.goodsCount) {
          this.goodNumber = this.decimalAddFn(this.goodNumber, item.goodsCount)
        }
        if(item.deliveryCount) {
         this.deliveryCount = this.deliveryCount + item.deliveryCount
        }
      })
    },
    methods: {
      copyClick(orderNumber) {
        let that=this
         uni.setClipboardData({
          data: orderNumber,
          showToast:false,
          success: function () {
            that.$u.toast('复制成功')
          },
        })
      },
      /**
       *
       * @param index 0.备注 1.修改地址 2.取消订单 3.联系仓库 4.提醒发货 5.查看发货信息 6.去支付 7.申请退款 8.确认收货 9.再来一单 10.发货 11.投诉
       * @param data
       */
      bottomBtnClick(index, data) {
        let param = { index: index, data: data }
        this.$emit('bottomClick', param)
      },
      orderDetail(data) {
        this.$emit('orderDetail', { data: data })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .orderItem {
    margin-top: 16rpx;
    padding: 0 32rpx;
    background-color: #ffffff;

    &-info {
      padding-top: 24rpx;
      padding-bottom: 16rpx;
      font-size: 26rpx;

      &__title {
        color: $v-c0-85;
        font-weight: bold;
      }
      &__number {
        color: $v-c0-85;
        padding-left: 16rpx;
        font-weight: bold;
      }
      &__copy {
        color: $v-tip;
        padding-left: 16rpx;
      }
      &__time {
        color: $v-c0-85;
        padding-top: 8rpx;
      }
      &__status {
        width: 80rpx;
        color: $v-red-tag;
      }
    }
    &-line {
      background-color: #f8f8f8;
      height: 1px;
      width: 100%;
    }
    &-good {
      padding-top: 22rpx;

      .lookMore {
        color: $v-c0-45;
        font-size: 24rpx;
      }
      &__store {
        font-size: 28rpx;
        color: #000000;
        padding-left: 8rpx;
        padding-bottom: 18rpx;
      }
    }
    &-number {
      font-size: 26rpx;
      color: $v-c0-45;
      &__price {
        padding-left: 4rpx;
        color: $v-c0-85;
      }
      &__point {
        font-size: 24rpx;
        color: $v-c0-85;
      }
      &__unit {
        color: $v-c0-85;
        font-size: 24rpx;
      }
    }
    &-service {
      margin-top: 4rpx;
      font-size: 26rpx;
      color: $v-c0-45;
      &__price {
        padding-left: 4rpx;
        color: $color-primary-red;
      }
      &__point {
        font-size: 24rpx;
        color: $color-primary-red;
      }
      &__unit {
        color: $color-primary-red;
        font-size: 24rpx;
      }
    }
    &-remark {
      margin-top: 16rpx;
      font-size: 26rpx;
      color: $v-c0-45;
      &__content {
        padding-left: 8rpx;
        color: $v-c0-85;
      }
    }
    &-tool {
      padding-top: 40rpx;
      padding-bottom: 32rpx;
      height: 48rpx;
      width: 100%;
      &__btn {
        padding-left: 32rpx;
        padding-right: 32rpx;
        height: 48rpx;
        line-height: 48rpx;
        border: 1px solid $v-c0-25;
        border-radius: 30rpx;
        background-color: #ffffff;
        color: $v-c0-85;
        font-size: 24rpx;
        text-align: center;
      }
      &__btnSelect {
        border: 1px solid $color-primary-yellow;
        color: $color-primary-yellow;
        background-color: #ffffff;
      }

      &__p {
        margin-left: 32rpx;
      }
    }
  }
</style>
