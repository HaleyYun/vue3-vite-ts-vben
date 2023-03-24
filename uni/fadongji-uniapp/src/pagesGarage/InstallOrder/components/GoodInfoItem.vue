<template>
  <view class="orderItem" @click="orderDetail(orderData)">
    <view class="orderItem-info flex flex-vertical-c">
      <view class="flex1">
        <view class="flex-vertical-c flex flex-justify-between">
          <view v-if="orderData.status === 1110" class="orderItem-info__time flex flex-vertical-c">
            <view class="color-red fz-b">剩余时间: </view>
            <view class="p-l-12 fz-b">
              <u-count-down :time="downData" @change="onChange">
                <view class="time color-red fz-b">
                  <text v-if="timeData.hours && timeData.hours > 0" class="time__item fz-b">
                    <text>{{ timeData.hours > 10 ? timeData.hours : '0' + timeData.hours }}</text>
                    小时</text
                  >
                  <text class="time__item fz-b">{{ timeData.minutes || '00' }}分钟</text>
                </view>
              </u-count-down>
            </view>
          </view>
          <view
            v-else-if="orderData.status === 1120"
            class="orderItem-info__time flex flex-vertical-c flex-justify-between fz-b"
          >
            <view class="color-red flex">
              <view v-if="orderData.predictDeliveryTime"
                >预计{{ orderData.predictDeliveryTime }}发货</view
              >
              <view v-if="orderData.predictReceiptTime" class="m-l-10">
                预计{{ orderData.predictReceiptTime }}送达</view
              >
            </view>
          </view>
          <view v-else class="flex1" />
          <view class="orderItem-info__status"> {{ orderData.statusName }} </view>
        </view>
        <view class="flex flex-vertical-c flex-justify-between">
          <view class="flex">
            <VoIcon v-if="orderData.isValet" name="generation" />
            <view class="p-t-8 color-block-45"> 下单时间 {{ orderData.createTime }} </view>
          </view>
          <view class="orderItem-info__time fz-28 color-block text-right">{{
            orderData.isCash ? '在线支付' : '账期支付'
          }}</view>
        </view>
      </view>
    </view>
    <view class="orderItem-line" />

    <view class="orderItem-good">
      <view class="flex orderItem-good__store flex-vertical-c">
        <view @click.stop="toShopPage">
          <VoIcon :size="24" name="smile-m"  />
        </view>
        <view class="m-l-8" @click.stop="toStoreHomePage"> {{ orderData.shopName }}</view>
      </view>
      <GoodItem
        v-for="(item, index) in orderData.goodsDetail"
        v-show="index < 3"
        :key="index"
        :good-data="item"
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
      <view class="flex1" />
      <view class="price flex flex-vertical-c">
        <view class="p-r-8">{{ orderData.status === 1110 ? '应付款' : '实付款' }}</view>
        <VoPointPrice
          :price="orderData.payAmount ? orderData.payAmount.toString() : '0'"
          color="#F20014"
        />
        <view class="good-red">元</view>
      </view>
    </view>
    <view
      v-if="
        orderData.status === 1110 ||
        orderData.status === 1120 ||
        orderData.status === 1130 ||
        orderData.status === 1140 ||
        orderData.status === 1150
      "
      class="orderItem-tool flex flex-vertical-c"
    >
      <block v-if="orderData.status < 1150">
        <VoMoreTooltip
          :arrowStyleSelf="{
            left: '10px',
          }"
          :padding="8"
          color="#ffffff"
          placement="bottom"
        >
          <view slot="content">
            <view
              v-for="(role, roleIndex) of moreArr"
              :key="roleIndex"
              class="tooltip-box__item"
              @click="switchRoleFn(orderData, role)"
              >{{ role.name }}
            </view>
          </view>
          <view class="tooltip-box__moreItem">更多</view>
        </VoMoreTooltip>
      </block>
      <view class="flex1">
        <!--待付款 & 非账期-->
        <view
          v-if="orderData.status === 1110 && orderData.isCash === false"
          class="orderItem-tool flex flex-justify-r"
        >
          <view
            class="orderItem-tool__btn default orderItem-tool__p"
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
        <view
          v-if="orderData.status === 1110 && orderData.isCash === true"
          class="orderItem-tool flex flex-justify-r"
        >
          <view
            class="orderItem-tool__btn default orderItem-tool__p"
            @click.stop="bottomBtnClick('2', orderData)"
            >取消订单</view
          >
          <view
            class="orderItem-tool__btn orderItem-tool__p orderItem-tool__btnSelect"
            @click.stop="bottomBtnClick('6', orderData)"
            >去支付</view
          >
        </view>
        <!--待发货-->
        <view v-if="orderData.status === 1120" class="flex flex-justify-r flex-nowrap">
          <view
            v-if="!orderData.isHasInstall && !orderData.isRefunded"
            class="orderItem-tool__btn default orderItem-tool__p"
            @click.stop="bottomBtnClick('install', orderData)"
            >申请安装</view
          >
          <block v-if="orderData.isWarn">
            <view
              v-if="complaint"
              class="orderItem-tool__btn orderItem-tool__p"
              @click.stop="bottomBtnClick('4', orderData)"
              >提醒发货</view
            >
          </block>

          <view v-if="!orderData.goodsDetail[0].refundStatusName">
            <view
              v-show="orderData.payAmount > 0"
              class="orderItem-tool__btn orderItem-tool__p orderItem-tool__btnSelect"
              @click.stop="bottomBtnClick('7', orderData)"
            >申请退款</view
            >
          </view>
          <view
            v-else
            class="orderItem-tool__btn orderItem-tool__p orderItem-tool__btnSelect"
            @click="refundClick(orderData.goodsDetail[0], orderData.goodsDetail[0].refundStatusName)"
          >{{ orderData.goodsDetail[0].refundStatusName }}</view
          >
        </view>
        <!--待收货-->
        <view v-if="orderData.status === 1130" class="flex flex-justify-r">
          <view class="flex">
            <view
              v-if="!orderData.isHasInstall && !orderData.isRefunded"
              class="orderItem-tool__btn default orderItem-tool__p"
              @click.stop="bottomBtnClick('install', orderData)"
              >申请安装</view
            >
            <view
              class="orderItem-tool__btn default orderItem-tool__p"
              @click.stop="bottomBtnClick('5', orderData)"
              >查看物流</view
            >
            <view
              class="orderItem-tool__btn orderItem-tool__btnSelect orderItem-tool__p"
              @click.stop="bottomBtnClick('8', orderData)"
              >确认收货</view
            >
          </view>
        </view>
        <!--已完成-->
        <view v-if="orderData.status === 1140" class="flex flex-justify-r">
          <view
            v-if="!orderData.isHasInstall && !orderData.isRefunded"
            class="orderItem-tool__btn default orderItem-tool__p"
            @click.stop="bottomBtnClick('install', orderData)"
            >申请安装</view
          >
          <view
            v-if="!orderData.isEvaluate"
            class="orderItem-tool__btn default orderItem-tool__p"
            @click.stop="bottomBtnClick('10', orderData)"
            >评价</view
          >
          <!--          <view-->
          <!--            class="orderItem-tool__btn orderItem-tool__p orderItem-tool__btnSelect"-->
          <!--            @click.stop="bottomBtnClick('9', orderData)"-->
          <!--            >再来一单</view-->
          <!--          >-->
        </view>
        <!--已取消-->
        <view v-if="orderData.status === 1150" class="flex flex-justify-r">
          <view
            class="orderItem-tool__btn orderItem-tool__btnSelect orderItem-tool__p"
            @click.stop="$cellPhone('400-893-5518')"
            >联系客服</view
          >
          <!--          <view-->
          <!--            class="orderItem-tool__btn orderItem-tool__p orderItem-tool__btnSelect"-->
          <!--            @click.stop="bottomBtnClick('9', orderData)"-->
          <!--            >再来一单</view-->
          <!--          >-->
        </view>
      </view>
    </view>
    <view v-else class="p-t-32" />
  </view>
</template>

<script>
  import GoodItem from './GoodItem'
  import {compareTime, error, getStoreImUserIdFn} from '../../../common/helper'

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
        timeData: {},
        downData: 0,
        newData: new Date().getTime(),
        complaint: false,
        moreArr: [],
      }
    },
    created() {
      let Time = new Date(this.orderData.nextStageTime.replace(/-/g, '/'))
      let timestemp = Time.getTime()
      this.downData = timestemp - this.newData
      //判断我要投诉按钮显示与否
      this.complaint = compareTime(this.orderData.nextStageTime)
      if (this.complaint) {
        this.moreArr.push({ name: '我要投诉', id: '11' })
      }
      this.moreArr.push({ name: '联系客服', id: '-1' })
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
      switchRoleFn(data, role) {
        if (role.id === '-1') {
          this.$VoHttp.apiExtraCustomerMoor().then((res) => {
            this.$cellPhone('400-893-5518')
          })
          return
        }
        let param = { index: role.id, data: data }
        this.$emit('bottomClick', param)
      },
      toShopPage() {
        getStoreImUserIdFn({
          companyId:this.orderData.shopId
        }).then(res=>{
          const info = {
            targetId: res,
            type: 0,
            note: this.orderData.shopName,
            platformCode: this.orderData.shopPlatformCode, // 1供应商  2服务商
            isProject: true,
            goods: {
              name: this.orderData.goodsDetail[0].goodsName,
              pic: this.orderData.goodsDetail[0].pic[0],
              id: this.orderData.goodsDetail[0].goodsId,
              cashPrice: this.orderData.cashAmount,
              accountPrice: this.orderData.accountAmount,
              accountPeriodDays: this.orderData.periodDays,
            },
          }
          this.$storage.set('temp_im_room_info', info)
          this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
        }).catch(e=>{

          error(e.message||"未找到店铺客服")
        })
        //createTime	string 非必须 创建时间 format: date-time
        //disturb	integer 非必须 是否开启消息免打扰 0：关闭   1：开启 format: int32
        //id	integer 非必须 对话框id format: int64
        //targetId	integer 非必须 目标人id或者群id format: int64
        //userId	integer 非必须 用户id
        //version	integer 非必须 数据版本

      },
      /**
       * 跳转店铺主页
       */
      toStoreHomePage() {
        this.$linkToEasy('/pagesGarage/ShopList/ShopGoodsList?shopId=' + this.orderData.shopId)
      },
      /**
       *
       * @param index 0.备注 1.修改地址 2.取消订单 3.联系仓库 4.提醒发货 5.查看发货信息 6.去支付 7.申请退款 8.确认收货 9.再来一单 10.评价 11.我要投诉
       * @param data
       */
      bottomBtnClick(index, data) {
        let param = { index: index, data: data }
        this.$emit('bottomClick', param)
      },
      orderDetail(data) {
        this.$emit('orderDetail', { data: data })
      },
      /**
       * 申请退款
       */
      async refundClick(data, name) {
        let refundData = {}
        let refundId = ''
        if (data.refundIdList && data.refundIdList.length > 0) {
          refundData = data.refundIdList[0]
        }
        refundId = refundData.id
        if (!refundId) {
          this.$linkToEasy('/pagesGarage/Order/ReturnExchange/ReturnExchange')
          return
        }

        if (refundData.isRefundOnly) {
          // 仅退款详情页面
          this.$linkToEasy('/pagesGarage/Order/ReturnExchange/RefundDetails?id=' + refundId)
          return
        }
        // 退货/退款详情页面
        this.$linkToEasy('/pagesGarage/Order/ReturnExchange/ReturnRefundDetails?id=' + refundId)
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
        font-weight: bold;
        color: #000000;
        padding-bottom: 16rpx;
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
        padding-left: 24rpx;
        padding-right: 24rpx;
        height: 56rpx;
        line-height: 56rpx;
        border: 1px solid $color-primary-yellow;
        border-radius: 30rpx;
        background-color: #ffffff;
        color: $color-primary-yellow;
        font-size: 24rpx;
        text-align: center;
        &.default {
          border: 1px solid rgba(0, 0, 0, 0.25);
          background: #ffffff;
          color: rgba(0, 0, 0, 0.85);
        }
      }
      &__btnSelect {
        border: 1px solid $color-primary-yellow;
        background-color: $v-bg-white;
        color: $color-primary-yellow;
      }
      &__p {
        margin-left: 24rpx;
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
  .good-red {
    color: #f20014;
  }
  .tooltip-box {
    width: 240rpx;
    font-size: 28rpx;
    color: #ffffff;
    &__item {
      height: 87rpx;
      line-height: 87rpx;
      width: 240rpx;
      text-align: center;
      font-size: 28rpx;
      border-bottom: 2rpx solid rgba(0, 0, 0, 0.08);
      color: $v-c0-65;
      &:last-child {
        border-bottom: 0rpx;
      }
    }
    &__moreItem {
      height: 40rpx;
      line-height: 40rpx;
      text-align: center;
      color: $v-c0-45;
    }
  }
</style>
