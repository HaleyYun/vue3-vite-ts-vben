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
          <view class="fz-28 lh150 color-block-yellow"> {{ orderData.statusName }} </view>
        </view>
      </view>
      <view class="flex flex-vertical-c flex-justify-between m-t-8">
        <view class="p-t-8 color-block-45 fz-28"> 下单时间 {{ orderData.createTime }} </view>
        <VoIcon v-if="orderData.isWarn && +orderData.status === 1120" :size="20" name="urge" />
      </view>
    </view>
    <view class="orderItem-line" />
    <view class="orderItem-good">
      <view class="flex orderItem-good__store flex-vertical-c">
        <VoIcon :size="24" name="smile-m" />
        <view class="flex1 fz-b m-l-8"> {{ orderData.buyerName }}</view>
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
    <!--应收款-->
    <!--    <view class="flex orderItem-number">-->
    <!--      <view class="flex1" />-->
    <!--      <view class="flex flex-vertical-c">-->
    <!--        <view class="color-block-45 m-r-8">应收款</view>-->
    <!--        <VoPointPrice-->
    <!--          :price="orderData.payAmount ? orderData.payAmount.toString() : '0'"-->
    <!--          :show-unit="true"-->
    <!--          color="rgba(0, 0, 0, 0.85)"-->
    <!--        />-->
    <!--      </view>-->
    <!--    </view>-->
    <!--服务费/可入账-->
    <view class="flex orderItem-service">
      <!--      <view v-if="orderData.serviceAmount" class="flex1"-->
      <!--        >扣除服务费 {{ orderData.serviceAmount }} 元</view-->
      <!--      >-->
      <view class="flex1" />
      <view class="flex flex-vertical-c">
        <block v-if="+orderData.status === 1110 || +orderData.status === 1150">
          <view class="color-block-45 m-r-8">应收款</view>
        </block>
        <block v-else>
          <view class="color-block-45 m-r-8">实收款</view>
        </block>
        <VoPointPrice
          :price="orderData.canObtainAmount ? orderData.canObtainAmount.toString() : '0'"
          :show-unit="true"
        />
      </view>
    </view>
    <!--商家备注-->
    <view v-if="remark" class="flex orderItem-remark">
      <view>商家备注:</view>
      <view class="orderItem-remark__content flex1">{{ remark }}</view>
    </view>
    <!--底部按钮工具-->
    <!--待付款 & 非账期-->
    <!-- <view
      v-if="orderData.status === 1110 && orderData.isCash"
      class="orderItem-tool flex flex-justify-r"
    >
      <view class="orderItem-tool__btn" @click.stop="bottomBtnClick('0', orderData)">备注</view>
      <view
        class="orderItem-tool__btn orderItem-tool__p orderItem-tool__btnSelect"
        @click.stop="bottomBtnClick('1', orderData)"
        >修改地址</view
      >
    </view> -->

    <!--待付款-->
    <view v-if="orderData.status === 1110" class="orderItem-tool flex flex-justify-r">
      <view class="orderItem-tool__btn" @click.stop="bottomBtnClick('0', orderData)">备注</view>
      <view
        class="orderItem-tool__btn orderItem-tool__p"
        @click.stop="bottomBtnClick('1', orderData)"
        >修改地址</view
      >
      <!--isValet 是否是代客下单 非代客下单，列表和详情页中不用展示【取消订单】按钮 -->
      <view
        v-if="orderData.isValet"
        class="orderItem-tool__btn orderItem-tool__p orderItem-tool__btnSelect"
        @click.stop="bottomBtnClick('2', orderData)"
        >取消订单</view
      >
    </view>

    <!--待发货-->
    <view v-else-if="orderData.status === 1120" class="orderItem-tool flex flex-justify-r">
      <view class="flex1 fz-24 color-block-65"> {{ orderData.nextStageTime }}前发货 </view>
      <view class="flex">
        <view
          class="orderItem-tool__btn orderItem-tool__p"
          @click.stop="bottomBtnClick('3', orderData)"
          >联系仓库</view
        >
        <view
          v-if="Number(orderData.warehouseType) === 0"
          class="orderItem-tool__btn orderItem-tool__p orderItem-tool__btnSelect"
          @click.stop="bottomBtnClick('4', orderData)"
          >提醒发货</view
        >
        <block v-else>
          <view
            v-if="orderData.isConsignmentSale && !orderData.isConsignmentShipment"
            class="orderItem-tool__btn orderItem-tool__p orderItem-tool__grey"
            @click.stop="bottomBtnGrey"
          >
            发货
          </view>
          <view
            v-else
            class="orderItem-tool__btn orderItem-tool__p orderItem-tool__btnSelect"
            @click.stop="bottomBtnClick('10', orderData)"
          >
            发货
          </view>
        </block>
      </view>
    </view>

    <!--已发货-->
    <view
      v-else-if="orderData.status === 1130 || orderData.status === 1140"
      class="orderItem-tool flex flex-justify-r"
    >
      <!--      <view-->
      <!--        class="orderItem-tool__btn orderItem-tool__p"-->
      <!--        @click.stop="bottomBtnClick('9', orderData)"-->
      <!--        >再来一单</view-->
      <!--      >-->
      <view
        class="orderItem-tool__btn orderItem-tool__p orderItem-tool__btnSelect"
        @click.stop="bottomBtnClick('5', orderData)"
        >查看发货信息</view
      >
    </view>

    <!--已取消-->
    <!--    <view v-if="orderData.status === 1150" class="orderItem-tool p-b-32 flex flex-justify-r">-->
    <!--      <view-->
    <!--        class="orderItem-tool__btn orderItem-tool__p orderItem-tool__btnSelect"-->
    <!--        @click.stop="bottomBtnClick('9', orderData)"-->
    <!--        >再来一单</view-->
    <!--      >-->
    <!--    </view>-->
    <!--已关闭 && 已取消-->
    <view v-else class="p-b-32" />
  </view>
</template>

<script>
  import GoodItem from './GoodItem'

  export default {
    name: 'GoodInfoItem',
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
    methods: {
      copyClick(orderNumber) {
        uni.setClipboardData({
          data: orderNumber,
        })
      },
      // 寄售订单未发货：【发货】按钮置灰，服务商点击时显示toast提示：由于该订单关联的寄售订单尚未发货，本订单也无法发货
      bottomBtnGrey() {
        this.$u.toast('由于该订单关联的寄售订单尚未发货，本订单也无法发货')
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
        border: 2rpx solid $v-c0-25;
        border-radius: 30rpx;
        background-color: #ffffff;
        color: $v-c0-85;
        font-size: 24rpx;
        text-align: center;
      }
      &__btnSelect {
        border: 2rpx solid $color-primary-yellow;
        color: $color-primary-yellow;
        background-color: #ffffff;
      }
      &__grey {
        background: #ffffff;
        border: 2rpx solid #f6f7f8;
        color: rgba(0, 0, 0, 0.25);
      }

      &__p {
        margin-left: 32rpx;
      }
    }
  }
</style>
