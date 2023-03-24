<template>
  <view class="orderItem" @click="orderDetail(orderData)">
    <view class="orderItem-info">
      <view class="flex1 flex flex-justify-between flex-vertical-c">
        <view class="flex">
          <view class="orderItem-info__title">订单号:</view>
          <view class="orderItem-info__number"> {{ orderData.id }} </view>
          <view class="orderItem-info__copy" @click.stop="copyClick(orderData.id)">复制</view>
        </view>
        <view class="orderItem-info__status"> {{ orderData.statusName }} </view>
      </view>
      <view class="flex flex-justify-between">
        <view class="orderItem-info__time color-block-45">
          下单时间 {{ orderData.createTime }}
        </view>
        <!--只有待发货才显示-->
        <VoIcon
          v-if="orderData.isWarn === true && orderData.status === 1220"
          :size="20"
          name="urge"
        />
      </view>
    </view>
    <view class="orderItem-line" />
    <view class="orderItem-good">
      <view class="flex orderItem-good__store flex-vertical-c">
        <view @click.stop="toIm(orderData)">
          <VoIcon :size="24" name="smile-m" />
        </view>
        <view class="m-l-8 fz-b"> {{ orderData.buyerName }}</view>
      </view>
      <GoodItem
        v-for="(item, index) in orderData.goodsDetail"
        v-if="index < 3"
        :key="index"
        :good-data="item"
        :is-show-deliver="orderData.status === 1220 ? true : false"
      />
      <view
        v-if="orderData.goodsDetail && orderData.goodsDetail.length > 3"
        class="lookMore flex flex-vertical-c flex-justify-c"
      >
        <view>查看更多</view>
        <VoIcon :size="16" name="open" />
      </view>
    </view>
    <!--数量-->
    <view class="flex orderItem-number">
      <view class="flex1 color-block"
        >共{{ orderData.goodsDetail.length }}种 {{ goodNumber }}件商品</view
      >
      <view class="price flex flex-vertical-c">
        <view v-if="orderData.status === 1210" class="p-r-8">应收款</view>
        <view v-else class="p-r-8">实收款</view>
        <VoPointPrice
          :price="orderData.canObtainAmount ? orderData.canObtainAmount.toString() : '0'"
          :showUnit="true"
          color="#F20014"
        />
        <!--        <VoPointPrice :price="orderData.payAmount ? orderData.payAmount.toString() : '0'" />-->
      </view>
    </view>
    <!--    <view class="flex orderItem-service">-->
    <!--      <view class="flex1 color-block">扣除服务费 {{ orderData.serviceAmount || 0 }} 元</view>-->
    <!--      <view class="price flex flex-vertical-c">-->
    <!--        <view class="m-r-8">可入账</view>-->
    <!--        <VoPointPrice :price="orderData.accountAmount ? orderData.accountAmount.toString() : '0'" />-->
    <!--        <view>元</view>-->
    <!--      </view>-->
    <!--    </view>-->
    <!--商家备注-->
    <view v-if="remark" class="flex orderItem-remark">
      <view>商家备注:</view>
      <view class="orderItem-remark__content flex1 overTwoEllipsis">{{ remark }}</view>
    </view>
    <!--底部按钮工具-->
    <!--待付款 & 非账期-->
    <view
      v-if="orderData.status === 1210 && orderData.isCash === false"
      class="orderItem-tool flex flex-justify-r"
    >
      <view class="orderItem-tool__btn" @click.stop="bottomBtnClick('0', orderData)">备注</view>
      <view
        class="orderItem-tool__btn orderItem-tool__p orderItem-tool__btnSelect"
        @click.stop="bottomBtnClick('1', orderData)"
        >修改地址</view
      >
    </view>

    <!--待付款 & 账期-->
    <view
      v-if="orderData.status === 1210 && orderData.isCash === true"
      class="orderItem-tool flex flex-justify-r"
    >
      <view class="orderItem-tool__btn" @click.stop="bottomBtnClick('0', orderData)">备注</view>
      <view
        class="orderItem-tool__btn orderItem-tool__p orderItem-tool__btnSelect"
        @click.stop="bottomBtnClick('1', orderData)"
        >修改地址</view
      >
    </view>

    <!--待发货-->
    <view
      v-if="orderData.status === 1220"
      class="orderItem-tool flex flex-justify-r flex-vertical-c"
    >
      <view class="flex1 fz-28 orderItem-tool__color"> {{ orderData.nextStageTime }}前发货 </view>
      <view class="flex">
        <view
          class="orderItem-tool__btn orderItem-tool__p"
          @click.stop="bottomBtnClick('3', orderData)"
          >联系仓库</view
        >
        <view
          v-if="orderData.isOwnerHouse"
          class="orderItem-tool__btn orderItem-tool__p orderItem-tool__btnSelect"
          @click.stop="bottomBtnClick('10', orderData)"
          >发货</view
        >
        <view
          v-else
          class="orderItem-tool__btn orderItem-tool__p orderItem-tool__btnSelect"
          @click.stop="bottomBtnClick('4', orderData)"
          >提醒发货</view
        >
      </view>
    </view>
    <!--已发货-->
    <view
      v-if="orderData.status === 1230 || orderData.status === 1240"
      class="orderItem-tool flex flex-justify-r flex-vertical-c"
    >
      <view
        class="orderItem-tool__btn orderItem-tool__p orderItem-tool__btnSelect"
        @click.stop="bottomBtnClick('5', orderData)"
        >查看发货信息</view
      >
    </view>
    <!--已取消 & 已关闭-->
    <view v-else class="p-b-32" />
  </view>
</template>

<script>
  import GoodItem from './GoodItem'

  export default {
    name: 'InvestGoodInfoItem',
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
      //商家备注
      remark() {
        if (this.orderData.remarkList.length) {
          const remarkObj = this.orderData.remarkList.find((item) => item.type === 2)
          return remarkObj ? remarkObj.remark : ''
        } else {
          return ''
        }
        // return ''
      },
    },
    created() {
      this.orderData.goodsDetail.forEach((item) => {
        this.goodNumber = this.decimalAddFn(this.goodNumber, item.goodsCount)
      })
      this.orderData.remarkList.forEach((item) => {
        //1买家备注,2卖家备注
        if (item.type === 2) {
          // this.remark = item.remark
        }
      })
    },
    methods: {
      copyClick(orderNumber) {
        uni.setClipboardData({
          data: orderNumber,
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
      toIm(data) {
        let param = { data: data }
        this.$emit('toIm', param)
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
        color: $color-primary-yellow;
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
        color: $v-c0-85;
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
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    &-tool {
      padding-top: 20rpx;
      padding-bottom: 32rpx;
      height: 48rpx;
      width: 100%;
      &__color {
        color: #f20014;
      }
      &__btn {
        padding: 0 32rpx;
        box-sizing: border-box;
        height: 56rpx;
        line-height: 56rpx;
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
