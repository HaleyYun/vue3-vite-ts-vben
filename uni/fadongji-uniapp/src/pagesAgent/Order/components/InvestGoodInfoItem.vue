<template>
  <view class="orderItem" @click="orderDetail(orderData)">
    <!--投资订单-->
    <view v-if="isInvestOrder">
      <!--待付款-->
      <view v-if="orderData.status === 1210" class="orderItem-info">
        <view class="flex1">
          <view class="flex flex-justify-between flex-vertical-c">
            <view class="flex flex1 fz-b">
              <view class="color-red">剩余时间:</view>
              <view class="p-l-12">
                <u-count-down :time="downData" @change="onChange" @end="onFinish">
                  <view class="time color-red">
                    <text v-if="timeData.hours && timeData.hours > 0" class="time__item">
                      <text>{{ timeData.hours > 10 ? timeData.hours : '0' + timeData.hours }}</text>
                      小时</text
                    >
                    <text v-if="timeData.minutes && timeData.minutes > 0" class="time__item">
                      <text class="time__item">{{ timeData.minutes || '00' }}分钟</text>
                    </text>
                    <text v-else-if="timeData.seconds && timeData.seconds > 0" class="time__item"
                      >{{ timeData.seconds }}秒</text
                    >
                  </view>
                </u-count-down>
              </view>
            </view>
            <view class="orderItem-info__status"> {{ orderData.statusName }} </view>
          </view>
          <view class="flex flex-justify-between flex-vertical-c">
            <view class="p-t-8 color-block-45"> 下单时间 {{ orderData.createTime }} </view>
            <view class="orderItem-info__time">
              {{ orderData.isCash ? '在线支付' : '账期支付' }}
            </view>
          </view>
        </view>
      </view>
      <!--待发货-->
      <view v-else-if="orderData.status === 1220" class="orderItem-info">
        <view class="flex1">
          <view class="flex flex-justify-between flex-vertical-c">
            <view class="flex flex1 fz-b">
              <view v-if="orderData.predictDeliveryTime" class="color-red"
                >预计{{ orderData.predictDeliveryTime }}发货</view
              >
              <view v-if="orderData.predictReceiptTime" class="color-red m-l-8"
                >预计{{ orderData.predictReceiptTime }}送达</view
              >
            </view>
            <view class="flex">
              <view class="orderItem-info__status"> {{ orderData.statusName }} </view>
              <!--<VoIcon v-if="orderData.isWarn" :size="20" name="urge" />-->
            </view>
          </view>
          <view class="flex flex-justify-between flex-vertical-c">
            <view class="p-t-8 color-block-45"> 下单时间 {{ orderData.createTime }} </view>
            <view class="orderItem-info__time">
              {{ orderData.isCash ? '在线支付' : '账期支付' }}
            </view>
          </view>
        </view>
      </view>
      <!--其他状态-->
      <view v-else class="orderItem-info">
        <view class="flex1">
          <view class="flex flex-justify-between flex-vertical-c">
            <view class="flex flex1" />
            <view class="orderItem-info__status"> {{ orderData.statusName }} </view>
          </view>
          <view class="flex flex-justify-between flex-vertical-c">
            <view class="p-t-8 color-block-45"> 下单时间 {{ orderData.createTime }} </view>
            <view class="orderItem-info__time">
              {{ orderData.isCash ? '在线支付' : '账期支付' }}
            </view>
          </view>
        </view>
      </view>
    </view>

    <!--转投资订单-->
    <view v-else>
      <view class="orderItem-info">
        <view class="flex flex-justify-between flex-vertical-c">
          <view class="flex flex1">
            <view class="orderItem-info__title">订单号</view>
            <view class="orderItem-info__number"> {{ orderData.id }} </view>
            <view class="orderItem-info__copy" @click.stop="copyClick(orderData.id)">复制</view>
          </view>
          <view class="orderItem-info__status"> {{ orderData.statusName }} </view>
        </view>
        <view class="flex flex-justify-between">
          <view class="orderItem-info__time color-block-45">
            下单时间 {{ orderData.createTime }}
          </view>
          <block v-if="orderData.status === 1220">
            <VoIcon v-if="orderData.isWarn === true" :size="20" name="urge" />
          </block>
        </view>
      </view>
    </view>

    <view class="orderItem-line" />
    <view class="orderItem-good">
      <view class="flex orderItem-good__store flex-vertical-c">
        <view @click.stop="goIm(orderData)">
          <VoIcon :size="24" name="smile-m"  />
        </view>
        <!-- 采购订单显示店铺名称，转投订单展示买家名称 -->
        <view class="flex1 text-nowrap m-l-8 fz-b">
          <text @click.stop="goIm(orderData)">{{
            isInvestOrder ? orderData.shopName : orderData.buyerName
          }}</text>
        </view>
        <!--        <VoIcon :size="16" name="right-arrow" />-->
      </view>
      <GoodItem
        v-for="(item, index) in orderData.goodsDetail"
        v-show="index < 3"
        :key="index"
        :good-data="item"
        :is-show-deliver="true"
        :is-show-invest="orderData.status === 1220 ? true : false"
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
    <view class="flex orderItem-number flex-justify-between flex-vertical-c">
      <view class="flex1 color-block-85"
        >共{{ orderData.goodsDetail.length }}种 {{ goodNumber }}件商品</view
      >
      <view class="price flex flex-vertical-c">
        <view v-if="isInvestOrder" class="m-r-16">
          {{ orderData.status === 1210 ? '应付款' : '实付款' }}
        </view>
        <view v-else class="m-r-16">实收款</view>
        <VoPointPrice
          :price="
            isInvestOrder
              ? orderData.payAmount
                ? orderData.payAmount.toString()
                : '0'
              : orderData.canObtainAmount
              ? orderData.canObtainAmount.toString()
              : '0'
          "
          :showUnit="true"
          color="#F20014"
        />
      </view>
    </view>
    <!--    <view class="flex orderItem-service">-->
    <!--      <view v-if="!isInvestOrder" class="flex1 color-block"-->
    <!--        >扣除服务费 {{ orderData.serviceAmount || 0 }} 元</view-->
    <!--      >-->
    <!--      <view v-else class="flex1" />-->
    <!--      <view class="price flex flex-vertical-c">-->
    <!--        <view>可入账</view>-->
    <!--        <VoPointPrice :price="orderData.accountAmount ? orderData.accountAmount.toString() : '0'" />-->
    <!--        <view>元</view>-->
    <!--      </view>-->
    <!--    </view>-->
    <!--商家备注-->
    <view v-if="orderData.remark" class="flex orderItem-remark">
      <view>商家备注:</view>
      <view class="orderItem-remark__content flex1">{{ orderData.remark }}</view>
    </view>
    <!--底部按钮工具-->
    <!--投资订单-->
    <view v-if="isInvestOrder">
      <!--待付款 & 非账期-->
      <view
        v-if="orderData.status === 1210 && orderData.isCash === false"
        class="orderItem-tool flex flex-justify-r"
      >
        <view
          class="orderItem-tool__btn orderItem-tool__p"
          @click.stop="bottomBtnClick('2', orderData)"
          >取消订单</view
        >
        <view
          class="orderItem-tool__btn orderItem-tool__btnSelect orderItem-tool__p"
          @click.stop="bottomBtnClick('6', orderData)"
          >去支付</view
        >
      </view>

      <!--待付款 & 账期-->
      <view
        v-else-if="orderData.status === 1210 && orderData.isCash === true"
        class="orderItem-tool flex flex-justify-r"
      >
        <view
          class="orderItem-tool__btn orderItem-tool__p"
          @click.stop="bottomBtnClick('2', orderData)"
          >取消订单</view
        >
        <view
          class="orderItem-tool__btn orderItem-tool__btnSelect orderItem-tool__p"
          @click.stop="bottomBtnClick('6', orderData)"
          >去支付</view
        >
      </view>
      <!--待发货-->
      <view v-else-if="orderData.status === 1220" class="flex flex-justify-r">
        <view v-if="deliveryCount > 0 && !complaint" class="orderItem-toolLine" />
        <view v-else class="orderItem-tool flex flex-justify-r">
          <view
            v-if="deliveryCount === 0"
            class="orderItem-tool__btn orderItem-tool__p"
            @click.stop="bottomBtnClick('7', orderData)"
            >申请退款</view
          >
          <view
            v-if="complaint"
            class="orderItem-tool__btn orderItem-tool__p"
            @click.stop="bottomBtnClick('11', orderData)"
            >我要投诉</view
          >
          <view
            v-if="complaint"
            class="orderItem-tool__btn orderItem-tool__p orderItem-tool__btnSelect"
            @click.stop="bottomBtnClick('4', orderData)"
            >提醒发货</view
          >
        </view>
      </view>

      <!--待收货-->
      <view v-else-if="orderData.status === 1230" class="orderItem-tool flex flex-justify-r">
        <view class="flex">
          <view
            class="orderItem-tool__btn orderItem-tool__p"
            @click.stop="bottomBtnClick('5', orderData)"
            >查看物流</view
          >
          <view
            class="orderItem-tool__btn orderItem-tool__p"
            @click.stop="bottomBtnClick('8', orderData)"
            >确认收货</view
          >
        </view>
      </view>
      <!--已完成-->
      <view
        v-else-if="orderData.status === 1240 && orderData.investType === 2"
        class="orderItem-tool flex flex-justify-r"
      >
        <view
          class="orderItem-tool__btn orderItem-tool__p orderItem-tool__btnSelect"
          @click.stop="bottomBtnClick('12', orderData)"
          >商品转让</view
        >
      </view>
      <!--      &lt;!&ndash;已完成&ndash;&gt;-->
      <!--      <view v-else-if="orderData.status === 1240" class="orderItem-tool flex flex-justify-r">-->
      <!--        <view-->
      <!--          class="orderItem-tool__btn orderItem-tool__p orderItem-tool__btnSelect"-->
      <!--          @click.stop="bottomBtnClick('9', orderData)"-->
      <!--        >再来一单</view-->
      <!--        >-->
      <!--      </view>-->

      <!--      &lt;!&ndash;已取消&ndash;&gt;-->
      <!--      <view v-else-if="orderData.status === 1250" class="orderItem-tool flex flex-justify-r">-->
      <!--        <view-->
      <!--          class="orderItem-tool__btn orderItem-tool__p orderItem-tool__btnSelect"-->
      <!--          @click.stop="bottomBtnClick('9', orderData)"-->
      <!--          >再来一单</view-->
      <!--        >-->
      <!--      </view>-->
      <view v-else class="orderItem-toolLine" />
    </view>
    <!--转投资订单-->
    <view v-else>
      <!--待付款 & 非账期-->
      <view
        v-if="orderData.status === 1210 && orderData.isCash === false"
        class="orderItem-tool flex flex-justify-r"
      >
        <view
          class="orderItem-tool__btn orderItem-tool__p"
          @click.stop="bottomBtnClick('0', orderData)"
          >备注</view
        >
        <view
          class="orderItem-tool__btn orderItem-tool__p"
          @click.stop="bottomBtnClick('1', orderData)"
          >修改地址</view
        >
      </view>

      <!--待付款 & 账期-->
      <view
        v-else-if="orderData.status === 1210 && orderData.isCash === true"
        class="orderItem-tool flex flex-justify-r"
      >
        <view
          class="orderItem-tool__btn orderItem-tool__p"
          @click.stop="bottomBtnClick('0', orderData)"
          >备注</view
        >
        <view
          class="orderItem-tool__btn orderItem-tool__p"
          @click.stop="bottomBtnClick('1', orderData)"
          >修改地址</view
        >
      </view>

      <!--待发货-->
      <view v-else-if="orderData.status === 1220" class="orderItem-tool flex flex-justify-r">
        <view
          class="orderItem-tool__btn orderItem-tool__p"
          @click.stop="bottomBtnClick('3', orderData)"
          >联系仓库</view
        >
        <view
          v-if="!orderData.isWarn || orderData.warehouseType == 0"
          class="orderItem-tool__btn orderItem-tool__p orderItem-tool__btnSelect"
          @click.stop="bottomBtnClick('4', orderData)"
          >提醒发货</view
        >
        <view
          v-else
          class="orderItem-tool__btn orderItem-tool__p orderItem-tool__btnSelect"
          @click.stop="bottomBtnClick('10', orderData)"
          >发货</view
        >
      </view>

      <!--待收货-->
      <view v-else-if="orderData.status === 1230" class="orderItem-tool flex flex-justify-r">
        <view class="flex">
          <view
            class="orderItem-tool__btn orderItem-tool__p"
            @click.stop="bottomBtnClick('5', orderData)"
            >查看发货信息</view
          >
        </view>
      </view>

      <!--已完成-->
      <view v-else-if="orderData.status === 1240" class="orderItem-tool flex flex-justify-r">
        <view
          class="orderItem-tool__btn orderItem-tool__p orderItem-tool__btnSelect"
          @click.stop="bottomBtnClick('5', orderData)"
          >查看发货信息</view
        >
      </view>
      <view v-else class="p-b-24" />
    </view>
  </view>
</template>

<script>
  import GoodItem from './GoodItem'
  import { compareTime } from '@/common/helper'

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
      //投资订单类型,(true投资订单)(false转投资订单)
      isInvestOrder: {
        type: Boolean,
        orderData: false,
      },
    },
    data() {
      return {
        goodList: [],
        goodNumber: 0,
        //倒计时
        timeData: {},
        downData: 0,
        newData: new Date().getTime(),
        nowDate: this.$vocenApi.VoUtils.timeFormat(new Date(), 'yyyy-mm-dd hh:MM:ss'),
        complaint: false,
        //发货数量
        deliveryCount: 0,
      }
    },
    created() {
      if (this.orderData.nextStageTime) {
        let Time = new Date(this.orderData.nextStageTime.replace(/-/g, '/'))
        let timestemp = Time.getTime()
        this.downData = timestemp - this.newData
      }

      this.orderData.goodsDetail.forEach((item) => {
        this.goodNumber = this.decimalAddFn(this.goodNumber, item.goodsCount)
        this.deliveryCount = this.deliveryCount + item.deliveryCount
      })
      //判断我要投诉按钮显示与否
      this.complaint = compareTime(this.orderData.nextStageTime)
    },
    methods: {
      onChange(e) {
        this.timeData = e
      },
      onFinish() {
        this.$emit('countDownFinish')
      },
      copyClick(orderNumber) {
        uni.setClipboardData({
          data: orderNumber,
        })
      },
      /**
       *
       * @param index 0.备注 1.修改地址 2.取消订单 3.联系仓库 4.提醒发货 5.查看发货信息 6.去支付 7.申请退款 8.确认收货 9.再来一单 10.发货 11.投诉 12.商品转让
       * @param data
       */
      bottomBtnClick(index, data) {
        let param = { index: index, data: data }
        this.$emit('bottomClick', param)
      },
      orderDetail(data) {
        this.$emit('orderDetail', { data: data })
      },
      goIm(data) {
        this.$emit('goIm', data)
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
      font-size: 28rpx;

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
        color: $v-c0-45;
        padding-top: 8rpx;
      }
      &__status {
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
        color: #000000;
        padding-left: 8rpx;
        margin-bottom: 18rpx;
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
        background-color: #ffffff;
        color: $color-primary-yellow;
      }

      &__p {
        margin-left: 32rpx;
      }
    }
    &-toolLine {
      padding-top: 20rpx;
      width: 100%;
    }
  }
</style>
