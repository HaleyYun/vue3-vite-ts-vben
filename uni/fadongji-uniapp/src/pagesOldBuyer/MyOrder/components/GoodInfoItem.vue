<template>
  <view class="orderItem">
    <view class="orderItem-info flex">
      <view class="flex1">
        <view class="flex">
          <view class="flex orderItem-good__store flex-vertical-c">
            <VoIcon :size="20" name="smile-m" @click="toChat" />
            <view class="m-l-8 fz-b">{{ orderData.shopName }}</view>
          </view>
          <!--          <view class="orderItem-info__title">订单号:</view>-->
          <!--          <view class="orderItem-info__number"> {{ orderData.id }} </view>-->
          <!--          <view class="orderItem-info__copy" @click.stop="copyClick(orderData.id)">复制</view>-->
        </view>
        <view
          v-if="orderData.status === 1310 && downData > 0"
          class="orderItem-info__time flex flex-vertical-c"
        >
          <block
            v-if="
              timeData.days != 0 || timeData.hours != 0 || timeData.minutes != 0 || timeData.seconds
            "
          >
            <view class="color-red fz-b">剩余时间: </view>
            <view class="p-l-12 fz-b">
              <u-count-down :time="downData" autoStart format="DD:HH:mm" @change="onChange">
                <view
                  v-if="timeData.days != 0 || timeData.hours != 0 || timeData.minutes != 0"
                  class="time"
                >
                  <text class="time__item"
                    >{{ timeData.hours > 10 ? timeData.hours : '0' + timeData.hours }}小时</text
                  >
                  <text class="time__item">{{ timeData.minutes }}分钟</text>
                </view>
                <view v-else class="time">
                  <text class="time__item">{{ timeData.seconds }}秒</text>
                </view>
              </u-count-down>
            </view>
          </block>
        </view>
        <block v-if="isShow">
          <view class="orderItem-info__time color-block-45">
            下单时间 {{ orderData.createTime }}
          </view>
        </block>
        <!--        <view-->
        <!--          v-if="(orderData.status === 1310 || orderData.status === 1320) && downData > 0"-->
        <!--          class="orderItem-info__time flex flex-vertical-c"-->
        <!--        >-->
      </view>
      <block v-if="isShow">
        <view style="text-align: right">
          <view class="fz-28 lh150 color-block-yellow"> {{ orderData.statusName }} </view>
          <!-- <VoIcon v-if="orderData.isWarn === true" :size="20" name="urge" /> -->
          <view class="fz-28 lh150 color-block">{{ orderData.payType }}</view>
        </view>
      </block>
    </view>
    <view class="orderItem-line" />

    <view class="orderItem-good">
      <view v-if="!isShow" class="orderItem-border flex">
        <view class="fz-b fz-28 m-r-16 color-block">{{ orderData.warehouseName }}</view>
        <view class="fz-24 color-block-45 m-t-8">
          <!--仓库发货时间-->
          <text class="color-orange m-l-12"> （预计{{ orderData.predictDeliveryTime }}发货） </text>
        </view>
      </view>
      <!-- <GoodItem v-for="(item, index) in orderData.goodsDetail" :key="index" :good-data="item" /> -->
      <GoodsList
        :goodsList="orderData.goodsDetail"
        :isPreSale="orderData.isPreSale"
        @clickGood="orderDetail"
      />
    </view>
    <!--数量-->
    <view class="flex orderItem-number">
      <view v-if="orderData.goodsDetail && orderData.goodsDetail.length"
        >共{{ orderData.goodsDetail.length }}种 {{ sumGoodsCount(orderData.goodsDetail) }}件商品
      </view>
      <view class="flex1" />
      <view class="fz-28 lh150 color-block-45 flex flex-row flex-vertical-c">
        <view v-if="orderData.status === 1310 || orderData.status === 1350">应付款</view>
        <view v-else>实付款</view>
        <VoPointPrice
          :price="orderData.payAmount ? orderData.payAmount.toString() : '0'"
          :show-unit="true"
          class="m-l-8"
        />
      </view>
    </view>
    <!--    &lt;!&ndash;服务费&ndash;&gt;-->
    <!--    <view class="flex orderItem-service">-->
    <!--      <view v-if="orderData.serviceAmount" class="flex1"-->
    <!--        >扣除服务费 {{ orderData.serviceAmount }} 元</view-->
    <!--      >-->
    <!--      <view v-else class="flex1" />-->
    <!--      <view class="price flex flex-vertical-c">-->
    <!--        <view>可入账</view>-->
    <!--        <VoPointPrice :price="orderData.accountAmount ? orderData.accountAmount.toString() : '0'" />-->
    <!--        <view>元</view>-->
    <!--      </view>-->
    <!--    </view>-->
    <!--商家备注-->
    <view v-if="orderData.remarkList && orderData.remarkList.length" class="flex orderItem-remark">
      <view class="flex-shrink">备注:</view>
      <view class="fz-28 lh150 color-block overEllipsis">{{ orderData.remarkList[0].remark }}</view>
    </view>
    <!--底部按钮工具-->
    <!--待付款-->
    <block v-if="isShow">
      <view v-if="orderData.status === 1310" class="orderItem-tool flex flex-justify-r">
        <view
          class="orderItem-tool__btn orderItem-tool__p"
          @click.stop="bottomBtnClick('2', orderData)"
          >取消订单</view
        >
        <view
          class="orderItem-tool__btn orderItem-tool__p orderItem-tool__btnSelect"
          @click.stop="bottomBtnClick('6', orderData)"
          >去支付</view
        >
      </view>

      <!--待付款 & 账期-->
      <!-- <view
      v-if="orderData.status === 1110 && orderData.isCash === true"
      class="orderItem-tool flex flex-justify-r"
    >
      <view
        class="orderItem-tool__btn orderItem-tool__p"
        @click.stop="bottomBtnClick('2', orderData)"
        >取消订单</view
      >
      <view
        class="orderItem-tool__btn orderItem-tool__p orderItem-tool__btnSelect"
        @click.stop="bottomBtnClick('6', orderData)"
        >去支付</view
      >
    </view> -->

      <!--待发货-->

      <view v-if="+orderData.status === 1320" class="m-t-24">
        <view v-if="downData > 0" class="orderItem-tips p-t-24"
          >预计{{ orderData.nextStageTime }}发货</view
        >
        <view v-if="downData < 0" class="orderItem-tips p-t-24">
          平台已提醒商家尽快发货，并对商家超时未发货做出处罚。您可以选择申请退款，或者继续等待商家发货。
        </view>
        <view class="orderItem-tool flex flex-justify-r">
          <view
            class="orderItem-tool__btn orderItem-tool__p"
            @click.stop="bottomBtnClick('7', orderData)"
          >
            申请退款
          </view>
          <view
            v-if="downData < 0"
            class="orderItem-tool__btn orderItem-tool__p"
            @click.stop="bottomBtnClick('10', orderData)"
          >
            投诉
          </view>
          <view
            v-if="downData < 0"
            class="orderItem-tool__btn orderItem-tool__btnSelect orderItem-tool__p"
            @click.stop="bottomBtnClick('4', orderData)"
            >提醒发货</view
          >
        </view>
      </view>

      <!--待收货-->
      <view v-if="orderData.status === 1330" class="orderItem-tool flex flex-justify-r">
        <view class="flex">
          <view
            class="orderItem-tool__btn orderItem-tool__p"
            @click.stop="bottomBtnClick('5', orderData)"
            >查看发货信息</view
          >
          <view
            class="orderItem-tool__btn orderItem-tool__btnSelect orderItem-tool__p"
            @click.stop="bottomBtnClick('8', orderData)"
            >确认收货</view
          >
          <!--          <view-->
          <!--            class="orderItem-tool__btn orderItem-tool__p orderItem-tool__btnSelect"-->
          <!--            @click.stop="bottomBtnClick('9', orderData)"-->
          <!--            >再来一单</view-->
          <!--          >-->
        </view>
      </view>

      <!--已完成 已取消 已关闭-->
      <!--      <view v-if="orderData.status >= 1340" class="orderItem-tool flex flex-justify-r">-->
      <!--        <view-->
      <!--          class="orderItem-tool__btn orderItem-tool__p orderItem-tool__btnSelect"-->
      <!--          @click.stop="bottomBtnClick('9', orderData)"-->
      <!--          >再来一单</view-->
      <!--        >-->
      <!--      </view>-->
    </block>
  </view>
</template>

<script>
  import GoodsList from './GoodsList'

  export default {
    name: 'InvestGoodInfoItem',
    components: {
      GoodsList,
    },

    props: {
      /*
  orderNum    订单编号
  time        剩余时间
  status      订单状态 0.全部 （1310-待付款；1320-待发货；1330-待收货；1340-已完成；1350-已取消；1360-已关闭）
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
        default() {
          return {}
        },
      },
      isShow: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        goodList: [],
        timeData: {},
        downData: 0,
        newData: new Date().getTime(),
      }
    },
    created() {
      if (+this.orderData.status === 1310 || +this.orderData.status === 1320) {
        let Time
        if (uni.$u.os() === 'ios') {
          Time = new Date(this.orderData.nextStageTime.replace(/-/g, '/'))
        } else {
          Time = new Date(this.orderData.nextStageTime)
        }
        let timestemp = Time.getTime()
        this.downData = timestemp - this.newData
      }
      console.log(this.downData)
    },
    methods: {
      toChat() {
        const info = {
          targetId: this.orderData.goodsDetail[0].shopUserId,
          type: 0,
          note: this.orderData.goodsDetail[0].shopName,
          platformCode: 'recycling',
        }
        this.$storage.set('temp_im_room_info', info)
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
      },
      sumGoodsCount(val) {
        let count = 0
        val.forEach((item) => {
          count += item.goodsCount
        })
        return count
      },
      copyClick(orderNumber) {
        uni.setClipboardData({
          data: orderNumber,
        })
      },
      onChange(e) {
        this.timeData = e
      },
      timer(val) {
        this.$vocenApi.dayjs()
      },
      //   toShopPage() {
      //     this.$linkToEasy(
      //       '/pagesAgent/InvestmentList/ShopDetails?companyId=' + this.orderData.orderCompanyId,
      //     )
      //   },
      /**
       *
       * @param index 0.备注 1.修改地址 2.取消订单 3.联系仓储 4.提醒发货 5.查看发货信息 6.去支付 7.申请退款 8.确认收货 9.再来一单 10.评价
       * @param data
       */
      bottomBtnClick(index, data) {
        let param = { index: index, data: data }
        this.$emit('bottomClick', param)
      },
      orderDetail(info) {
        console.log(info)
        console.log(this.isShow)
        if (this.isShow) {
          this.$linkToEasy('/pagesOldBuyer/MyOrder/MarkerOrderDetail?id=' + this.orderData.id)
        } else {
          this.$linkToEasy(
            '/pagesOldBuyer/HomeJumpPage/GoodsDetails?source=false&noBuy=1&id=' + info.goodsId,
          )
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .orderItem {
    margin-top: 16rpx;
    padding: 0 32rpx 32rpx 32rpx;
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
      &__store {
        font-size: 28rpx;
        color: $v-c0-85;
      }
    }
    &-border {
      padding-bottom: 16rpx;
      border-bottom: 2rpx solid $v-bg-light;
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
    &-tips {
      color: #f20014;
      font-size: 24rpx;
      line-height: 150%;
      background-color: #f6f7f8;
      border-radius: 8rpx;
      box-sizing: border-box;
      padding: 16rpx 20rpx;
    }
    &-tool {
      padding-top: 24rpx;
      padding-bottom: 32rpx;
      height: 48rpx;
      width: 100%;
      &__btn {
        padding-left: 32rpx;
        padding-right: 32rpx;
        height: 48rpx;
        line-height: 48rpx;
        border: 2rpx solid #d3d4db;
        border-radius: 48rpx;
        color: $v-c0-85;
        font-size: 24rpx;
        text-align: center;
      }
      &__btnSelect {
        border: 2rpx solid #ff5319;
        color: #ff5319;
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
  .flex-shrink {
    flex-shrink: 0;
  }
</style>
