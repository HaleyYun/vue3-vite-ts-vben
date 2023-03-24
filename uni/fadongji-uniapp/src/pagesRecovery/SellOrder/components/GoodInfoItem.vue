<template>
  <view class="orderItem">
    <view class="orderItem-info flex flex-vertical-c">
      <view class="flex1">
        <view class="flex flex-vertical-c flex-justify-between">
          <view class="flex flex-vertical-c">
            <view class="m-l-4 orderItem-info__time fz-28 color-block fz-b">
              订单号 {{ orderData.id }}
            </view>
            <view class="m-l-8 orderItem-info__copy fz-28" @click.stop="copyClick(orderData.id)"
              >复制</view
            >
          </view>
          <view v-if="+orderData.status === 1330" class="fz-28 color-block-yellow"> 已发货 </view>
          <view v-else class="fz-28 color-block-yellow"> {{ orderData.statusName }} </view>
        </view>
        <view class="m-t-8 fz-28 color-block-45">下单时间 {{ orderData.createTime }}</view>
      </view>
    </view>
    <view class="orderItem-line" />

    <view class="orderItem-good">
      <view class="flex orderItem-good__store flex-vertical-c" @click="goImUrl(orderData)">
        <VoIcon :size="24" name="smile-m" />
        <view class="m-l-8 fz-b"> {{ orderData.buyerName }}</view>
      </view>
      <block v-for="(item, index) in orderData.goodsDetail">
        <GoodItem
          v-if="index < 3"
          :key="index"
          :good-data="item"
          :is-pre-sale="orderData.isPreSale"
          :isPro="isPro"
        />
        <GoodItem
          v-else
          v-show="showMore"
          :key="index"
          :good-data="item"
          :is-pre-sale="orderData.isPreSale"
          :isPro="isPro"
        />
      </block>
      <view
        v-if="orderData.goodsDetail && orderData.goodsDetail.length > 3"
        class="lookMore flex flex-vertical-c flex-justify-c"
        @click.stop="showMore = !showMore"
      >
        <view v-if="showMore">收起</view>
        <view v-else>查看更多</view>
        <VoIcon :class="{ showMore: showMore }" :size="16" name="open" />
      </view>
    </view>
    <!--数量-->
    <view class="flex flex-vertical-c orderItem-number">
      <view class="flex1 color-block">
        共{{ orderData.goodsDetail.length }}种{{ orderData.totalCount }}件商品
      </view>
      <view class="price flex flex-vertical-c">
        <view class="p-r-8">
          {{ orderData.status === 1310 || orderData.status === 1350 ? '应收款' : '实收款' }}</view
        >
        <VoPointPrice
          :leftSize="16"
          :price="orderData.payAmount ? orderData.payAmount.toString() : '0'"
          :show-unit="true"
          color="#F20014"
        />
      </view>
    </view>
    <!--服务费-->
    <view class="flex orderItem-number m-t-12">
      <!--      <view v-if="orderData.serviceAmount" class="flex1">扣除服务费{{ orderData.serviceAmount }}元</view>-->
      <view v-if="orderData.serviceAmount" class="flex1"
        >扣除服务费{{ orderData.amount ? orderData.amount.toString() : '0' }}元</view
      >
      <!--      <view class="price flex flex-vertical-c">-->
      <!--        <view class="p-r-6"> 可入账</view>-->
      <!--        <VoPointPrice :price="orderData.amount ? orderData.amount.toString() : '0'" />-->
      <!--        <view>元</view>-->
      <!--      </view>-->
    </view>
    <!--卖家留言-->
    <block v-if="orderData.remarkList && orderData.remarkList.length">
      <block v-for="(item, index) in orderData.remarkList">
        <view
          v-if="+item.type === 2 && item.remark"
          :key="index"
          class="flex flex-justify-between flex-vertical-c orderItem-remark"
          @click.stop="bottomBtnClick('12', item)"
        >
          <view class="flex1 flex flex-vertical-c overflow-hidden">
            <text>卖家留言:</text>
            <text class="m-l-26 flex1 overEllipsis color-block-65">
              {{ item.remark }}
            </text>
          </view>
          <VoIcon :opacity="0.45" :size="20" color="#000" name="right-arrow" />
        </view>
      </block>
    </block>

    <!--底部按钮工具-->
    <!--待付款-->
    <view v-if="orderData.status === 1310" class="orderItem-tool flex flex-justify-r">
      <view
        class="orderItem-tool__btn orderItem-tool__p"
        @click.stop="bottomBtnClick('0', orderData)"
        >备注</view
      >
      <view
        class="orderItem-tool__btn orderItem-tool__p orderItem-tool__btnSelect"
        @click.stop="bottomBtnClick('1', orderData)"
        >修改地址</view
      >
    </view>

    <!--待发货-->
    <view
      v-if="orderData.status === 1320"
      class="orderItem-tool flex flex-justify-r flex-justify-between flex-vertical-c"
    >
      <view class="flex1 fz-24 color-block-45"> {{ orderData.nextStageTime }}之前应发货 </view>
      <view class="flex">
        <view
          class="orderItem-tool__btn orderItem-tool__p"
          @click.stop="bottomBtnClick('1', orderData)"
          >修改地址</view
        >
        <view
          class="orderItem-tool__btn orderItem-tool__p orderItem-tool__btnSelect"
          @click.stop="bottomBtnClick('11', orderData)"
          >发货</view
        >
      </view>
    </view>

    <!--待收货-->
    <view v-if="orderData.status === 1330" class="orderItem-tool flex flex-justify-r">
      <view class="flex">
        <view
          class="orderItem-tool__btn orderItem-tool__p orderItem-tool__btnSelect"
          @click.stop="bottomBtnClick('5', orderData)"
          >查看发货信息</view
        >
      </view>
    </view>

    <!--已完成-->
    <view v-if="orderData.status === 1340" class="orderItem-tool flex flex-justify-r">
      <view
        class="orderItem-tool__btn orderItem-tool__p orderItem-tool__btnSelect"
        @click.stop="bottomBtnClick('5', orderData)"
        >查看发货信息</view
      >
    </view>

    <view v-if="orderData.status > 1340" class="p-t-32" />
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
      /**
       * orderNum    订单编号
       * time        剩余时间
       * status      订单状态 0.全部 1.待付款 2.待发货 3.已发货 4.已完成 5.已取消
       * statusDes   订单状态描述
       * storeName   门店名称
       * goodUrl     商品url
       * goodName    商品名称
       * goodPrice   商品价格
       * orderType   商品数量
       * paymentTime 账期时间
       * orderType   订单账期状态 1.非账期 2.账期
       * servicePrice商品服务费
       * remake      备注
       */
      isPro: {
        type: Boolean,
        goodData: true,
      },
      orderData: {
        type: Object,
        orderData: {},
      },
    },
    data() {
      return {
        goodList: [],
        timeData: {},
        downData: 0,
        newData: new Date().getTime(),
        showMore: false,
      }
    },
    created() {
      let Time = new Date(this.orderData.nextStageTime)
      let timestemp = Time.getTime()
      this.downData = timestemp - this.newData
    },
    methods: {
      copyClick(orderNumber) {
        uni.setClipboardData({
          data: orderNumber,
        })
      },
      onChange(e) {
        this.timeData = e
      },
      /**
       *
       * @param index 0.备注 1.修改地址 2.取消订单 3.联系仓库 4.提醒发货 5.查看发货信息 6.去支付 7.申请退款 8.确认收货 9.再来一单 10.评价 11.发货 12.留言弹窗
       * @param data
       */
      bottomBtnClick(index, data) {
        console.log(data)
        let param = { index: index, data: data }
        this.$emit('bottomClick', param)
      },
      /**
       * 到聊天界面
       * @param info
       */
      goImUrl(info) {
        const data = {
          targetId: info.shopId,
          type: 0,
          note: info.shopName,
          platformCode: info.shopPlatformCode,
        }
        this.$storage.set('temp_im_room_info', data)
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
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
      }
      &__number {
        color: $v-c0-85;
        padding-left: 16rpx;
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
        font-size: 26rpx;
        color: #000000;
        padding-left: 8rpx;
        padding-bottom: 18rpx;
      }
    }
    &-number {
      font-size: 28rpx;
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
      margin-top: 32rpx;
      font-size: 32rpx;
      color: $v-c0-85;
      height: 96rpx;
    }
    &-tool {
      padding-top: 40rpx;
      padding-bottom: 32rpx;
      height: 56rpx;
      width: 100%;
      &__btn {
        padding-left: 32rpx;
        padding-right: 32rpx;
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
        background-color: #ffffff;
        color: $color-primary-yellow;
      }

      &__p {
        margin-left: 32rpx;
      }
    }
  }
  .time {
    @include flex;
    align-items: center;

    &__item {
      color: $color-primary-red;
      font-size: 24rpx;
      text-align: center;
    }
  }
  .showMore {
    transition: all 0.5s;
    transform: rotate(180deg);
  }
</style>
