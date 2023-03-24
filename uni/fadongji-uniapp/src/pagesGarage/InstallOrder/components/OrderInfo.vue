<template>
  <view class="detail-address m-t-16 m-b-16">
    <!--待付款-->
    <view v-if="orderData.status === 1110">
      <view class="detail-address__user fz-32 fz-b">订单信息</view>
      <view class="detail-address__order fz-26">
        <view class="flex flex-vertical-c flex-justify-between m-t-16">
          <view>订单编号：</view>
          <view class="flex flex-vertical-c">
            <view class="color-gray"> {{ orderData.id }}</view>
            <view class="fz-20 m-l-16 color-blue" @click="copyClick">复制</view>
          </view>
        </view>
        <view class="flex flex-vertical-c flex-justify-between m-t-16">
          <view>下单时间：</view>
          <view class="flex flex-vertical-c color-gray">{{ createOrderTime }}</view>
        </view>
        <view v-if="orderData.isCash" class="flex flex-vertical-c flex-justify-between m-t-16">
          <view>支付方式：</view>
          <!--isCash 1在线支付 2账期支付-->
          <view v-if="orderData.isCash === true" class="flex flex-vertical-c color-gray"
            >在线支付
          </view>
          <view v-else class="flex flex-vertical-c color-gray">账期支付</view>
        </view>
        <view class="flex flex-vertical-c flex-justify-between m-t-16">
          <view>商品总额：</view>
          <view class="flex flex-vertical-c color-gray">{{ orderData.goodsAmount }}元</view>
        </view>
        <view
          v-show="+addServieAmount > 0"
          class="flex flex-vertical-c flex-justify-between m-t-16"
          @click="showAddService = true"
        >
          <view>增值服务费：</view>
          <view class="flex flex-vertical-c color-gray">{{ addServieAmount || '0' }}元</view>
        </view>
        <view class="flex flex-vertical-c flex-justify-between m-t-16">
          <view> {{ orderData.isCash ? '应付款：' : '账期应付款：' }} </view>
          <view class="flex flex-vertical-c color-red">{{ orderData.payAmount }}元</view>
        </view>
        <view
          v-show="!orderData.isCash && !orderData.isValet"
          class="flex flex-vertical-c flex-justify-between m-t-16"
        >
          <view>预计到期时间：</view>
          <view class="flex flex-vertical-c color-gray">{{ expireTime }}</view>
        </view>
      </view>
    </view>
    <!--待发货-->
    <view v-if="orderData.status === 1120">
      <view class="detail-address__user fz-32 fz-b">订单信息</view>
      <view class="detail-address__order fz-26">
        <view class="flex flex-vertical-c flex-justify-between m-t-16">
          <view>订单编号：</view>
          <view class="flex flex-vertical-c">
            <view class="color-gray"> {{ orderData.id }}</view>
            <view class="fz-20 m-l-16 color-blue" @click="copyClick">复制</view>
          </view>
        </view>
        <view class="flex flex-vertical-c flex-justify-between m-t-16">
          <view>下单时间：</view>
          <view class="flex flex-vertical-c color-gray">{{ createOrderTime }}</view>
        </view>
        <view v-if="payTime" class="flex flex-vertical-c flex-justify-between m-t-16">
          <view>支付时间：</view>
          <view class="flex flex-vertical-c color-gray">{{ payTime }}</view>
        </view>
        <view v-if="orderData.isCash" class="flex flex-vertical-c flex-justify-between m-t-16">
          <view>支付方式：</view>
          <!--isCash 1在线支付 2账期支付-->
          <view v-if="orderData.isCash === true" class="flex flex-vertical-c color-gray"
            >在线支付
          </view>
          <view v-else class="flex flex-vertical-c color-gray">账期支付</view>
        </view>
        <view class="flex flex-vertical-c flex-justify-between m-t-16">
          <view>商品总额：</view>
          <view class="flex flex-vertical-c color-gray">{{ orderData.goodsAmount }}元</view>
        </view>
        <view
          v-show="+addServieAmount > 0"
          class="flex flex-vertical-c flex-justify-between m-t-16"
          @click="showAddService = true"
        >
          <view>增值服务费：</view>
          <view class="flex flex-vertical-c color-gray">{{ addServieAmount || '0' }}元</view>
        </view>
        <view class="flex flex-vertical-c flex-justify-between m-t-16">
          <view> {{ orderData.isCash ? '实付款：' : '账期金额：' }} </view>
          <view class="flex flex-vertical-c color-red">{{ orderData.payAmount }}元</view>
        </view>
        <view
          v-show="!orderData.isCash && !orderData.isValet"
          class="flex flex-vertical-c flex-justify-between m-t-16"
        >
          <view>预计到期时间：</view>
          <view class="flex flex-vertical-c color-gray">{{ expireTime }}</view>
        </view>
      </view>
    </view>
    <!--已发货-->
    <view v-if="orderData.status === 1130">
      <view class="detail-address__user fz-32 fz-b">订单信息</view>
      <view class="detail-address__order fz-26">
        <view class="flex flex-vertical-c flex-justify-between m-t-16">
          <view>订单编号：</view>
          <view class="flex flex-vertical-c">
            <view class="color-gray"> {{ orderData.id }}</view>
            <view class="fz-20 m-l-16 color-blue" @click="copyClick">复制</view>
          </view>
        </view>
        <view class="flex flex-vertical-c flex-justify-between m-t-16">
          <view>下单时间：</view>
          <view class="flex flex-vertical-c color-gray">{{ createOrderTime }}</view>
        </view>
        <view v-if="orderData.isCash" class="flex flex-vertical-c flex-justify-between m-t-16">
          <view>支付方式：</view>
          <!--isCash 1在线支付 2账期支付-->
          <view v-if="orderData.isCash === true" class="flex flex-vertical-c color-gray"
            >在线支付
          </view>
          <view v-else class="flex flex-vertical-c color-gray">账期支付</view>
        </view>
        <view v-if="payTime" class="flex flex-vertical-c flex-justify-between m-t-16">
          <view>支付时间：</view>
          <view class="flex flex-vertical-c color-gray">{{ payTime }}</view>
        </view>
        <view v-if="deliverGoodTime" class="flex flex-vertical-c flex-justify-between m-t-16">
          <view>发货时间：</view>
          <view class="flex flex-vertical-c color-gray">{{ deliverGoodTime }}</view>
        </view>
        <view class="flex flex-vertical-c flex-justify-between m-t-16">
          <view>商品总额：</view>
          <view class="flex flex-vertical-c color-gray">{{ orderData.goodsAmount }}元</view>
        </view>
        <view
          v-show="+addServieAmount > 0"
          class="flex flex-vertical-c flex-justify-between m-t-16"
          @click="showAddService = true"
        >
          <view>增值服务费：</view>
          <view class="flex flex-vertical-c color-gray">{{ addServieAmount || '0' }}元</view>
        </view>
        <view class="flex flex-vertical-c flex-justify-between m-t-16">
          <view> {{ orderData.isCash ? '实付款：' : '账期金额：' }} </view>
          <view class="flex flex-vertical-c color-red">{{ orderData.payAmount }}元</view>
        </view>
        <view
          v-show="!orderData.isCash && !orderData.isValet"
          class="flex flex-vertical-c flex-justify-between m-t-16"
        >
          <view>预计到期时间：</view>
          <view class="flex flex-vertical-c color-gray">{{ expireTime }}</view>
        </view>
      </view>
    </view>
    <!--已完成-->
    <view v-if="orderData.status === 1140">
      <view class="detail-address__user fz-32 fz-b">订单信息</view>
      <view class="detail-address__order fz-26">
        <view class="flex flex-vertical-c flex-justify-between m-t-16">
          <view>订单编号：</view>
          <view class="flex flex-vertical-c">
            <view class="color-gray"> {{ orderData.id }}</view>
            <view class="fz-20 m-l-16 color-blue" @click="copyClick">复制</view>
          </view>
        </view>
        <view class="flex flex-vertical-c flex-justify-between m-t-16">
          <view>下单时间：</view>
          <view class="flex flex-vertical-c color-gray">{{ createOrderTime }}</view>
        </view>
        <view v-if="payTime" class="flex flex-vertical-c flex-justify-between m-t-16">
          <view>支付时间：</view>
          <view class="flex flex-vertical-c color-gray">{{ payTime }}</view>
        </view>
        <view v-if="deliverGoodTime" class="flex flex-vertical-c flex-justify-between m-t-16">
          <view>发货时间：</view>
          <view class="flex flex-vertical-c color-gray">{{ deliverGoodTime }}</view>
        </view>
        <view v-if="finishTime" class="flex flex-vertical-c flex-justify-between m-t-16">
          <view>完成时间：</view>
          <view class="flex flex-vertical-c color-gray">{{ finishTime }}</view>
        </view>
        <view v-if="orderData.isCash" class="flex flex-vertical-c flex-justify-between m-t-16">
          <view>支付方式：</view>
          <!--isCash 1在线支付 2账期支付-->
          <view v-if="orderData.isCash === true" class="flex flex-vertical-c color-gray"
            >在线支付
          </view>
          <view v-else class="flex flex-vertical-c color-gray">账期支付</view>
        </view>
        <view class="flex flex-vertical-c flex-justify-between m-t-16">
          <view>商品总额：</view>
          <view class="flex flex-vertical-c color-gray">{{ orderData.goodsAmount }}元</view>
        </view>
        <view
          v-show="+addServieAmount > 0"
          class="flex flex-vertical-c flex-justify-between m-t-16"
          @click="showAddService = true"
        >
          <view>增值服务费：</view>
          <view class="flex flex-vertical-c color-gray">{{ addServieAmount || '0' }}元</view>
        </view>
        <view class="flex flex-vertical-c flex-justify-between m-t-16">
          <view> {{ orderData.isCash ? '实付款：' : '账期金额：' }} </view>
          <view class="flex flex-vertical-c color-red">{{ orderData.payAmount }}元</view>
        </view>
        <view
          v-show="!orderData.isCash && !orderData.isValet"
          class="flex flex-vertical-c flex-justify-between m-t-16"
        >
          <view>预计到期时间：</view>
          <view class="flex flex-vertical-c color-gray">{{ expireTime }}</view>
        </view>
      </view>
    </view>
    <!--已取消 -->
    <view v-if="orderData.status === 1150">
      <view class="detail-address__user fz-32 fz-b">订单信息</view>
      <view class="detail-address__order fz-26">
        <view class="flex flex-vertical-c flex-justify-between m-t-16">
          <view>订单编号：</view>
          <view class="flex flex-vertical-c">
            <view class="color-gray"> {{ orderData.id }}</view>
            <view class="fz-20 m-l-16 color-blue" @click="copyClick">复制</view>
          </view>
        </view>
        <view class="flex flex-vertical-c flex-justify-between m-t-16">
          <view>下单时间：</view>
          <view class="flex flex-vertical-c color-gray">{{ createOrderTime }}</view>
        </view>
        <view v-if="orderCancelTime" class="flex flex-vertical-c flex-justify-between m-t-16">
          <view>取消时间：</view>
          <view class="flex flex-vertical-c color-gray">{{ orderCancelTime }}</view>
        </view>
        <view v-if="orderData.isCash" class="flex flex-vertical-c flex-justify-between m-t-16">
          <view>支付方式：</view>
          <!--isCash 1在线支付 2账期支付-->
          <view v-if="orderData.isCash === true" class="flex flex-vertical-c color-gray"
            >在线支付
          </view>
          <view v-else class="flex flex-vertical-c color-gray">账期支付</view>
        </view>
        <view class="flex flex-vertical-c flex-justify-between m-t-16">
          <view>商品总额：</view>
          <view class="flex flex-vertical-c color-gray">{{ orderData.goodsAmount }}元</view>
        </view>
        <view
          v-show="+addServieAmount > 0"
          class="flex flex-vertical-c flex-justify-between m-t-16"
          @click="showAddService = true"
        >
          <view>增值服务费：</view>
          <view class="flex flex-vertical-c color-gray">{{ addServieAmount || '0' }}元</view>
        </view>
        <view class="flex flex-vertical-c flex-justify-between m-t-16">
          <view> {{ orderData.isCash ? '实付款：' : '账期金额：' }} </view>
          <view class="flex flex-vertical-c color-red">{{ orderData.payAmount }}元</view>
        </view>
        <view
          v-show="!orderData.isCash && !orderData.isValet"
          class="flex flex-vertical-c flex-justify-between m-t-16"
        >
          <view>预计到期时间：</view>
          <view class="flex flex-vertical-c color-gray">{{ expireTime }}</view>
        </view>
      </view>
    </view>
    <!--已关闭 -->
    <view v-if="orderData.status === 1160">
      <view class="detail-address__user fz-32 fz-b">订单信息</view>
      <view class="detail-address__order fz-26">
        <view class="flex flex-vertical-c flex-justify-between m-t-16">
          <view>订单编号：</view>
          <view class="flex flex-vertical-c">
            <view class="color-gray"> {{ orderData.id }}</view>
            <view class="fz-20 m-l-16 color-blue" @click="copyClick">复制</view>
          </view>
        </view>
        <view class="flex flex-vertical-c flex-justify-between m-t-16">
          <view>下单时间：</view>
          <view class="flex flex-vertical-c color-gray">{{ createOrderTime }}</view>
        </view>
        <view v-if="colseTime" class="flex flex-vertical-c flex-justify-between m-t-16">
          <view>关闭时间：</view>
          <view class="flex flex-vertical-c color-gray">{{ colseTime }}</view>
        </view>
        <view v-if="orderData.isCash" class="flex flex-vertical-c flex-justify-between m-t-16">
          <view>支付方式：</view>
          <!--isCash 1在线支付 2账期支付-->
          <view v-if="orderData.isCash === true" class="flex flex-vertical-c color-gray"
            >在线支付
          </view>
          <view v-else class="flex flex-vertical-c color-gray">账期支付</view>
        </view>
        <view class="flex flex-vertical-c flex-justify-between m-t-16">
          <view>商品总额：</view>
          <view class="flex flex-vertical-c color-gray">{{ orderData.goodsAmount }}元</view>
        </view>
        <view
          v-show="+addServieAmount > 0"
          class="flex flex-vertical-c flex-justify-between m-t-16"
          @click="showAddService = true"
        >
          <view>增值服务费：</view>
          <view class="flex flex-vertical-c color-gray">{{ addServieAmount || '0' }}元</view>
        </view>
        <view class="flex flex-vertical-c flex-justify-between m-t-16">
          <view> {{ orderData.isCash ? '实付款：' : '账期金额：' }} </view>
          <view class="flex flex-vertical-c color-red">{{ orderData.payAmount }}元</view>
        </view>
        <view
          v-show="!orderData.isCash && !orderData.isValet"
          class="flex flex-vertical-c flex-justify-between m-t-16"
        >
          <view>预计到期时间：</view>
          <view class="flex flex-vertical-c color-gray">{{ expireTime }}</view>
        </view>
      </view>
    </view>
    <!--   增值服务弹出层   -->
    <u-popup :show="showAddService" mode="bottom" @close="showAddService = false">
      <AddServicePrice
        :add-services="addServiceData"
        :add-servie-amount="addServieAmount.toString()"
        @close="showAddService = false"
      />
    </u-popup>
  </view>
</template>
<script>
  import AddServicePrice from '../../../pagesGarage/Order/components/AddServicePrice'

  export default {
    components: {
      AddServicePrice,
    },
    props: {
      orderData: {
        type: Object,
        default() {
          return {}
        },
      },
    },
    data() {
      return {
        //下单时间
        createOrderTime: '',
        //取消时间
        orderCancelTime: '',
        //支付时间
        payTime: '',
        //发货时间
        deliverGoodTime: '',
        //完成时间
        finishTime: '',
        //关闭时间
        colseTime: '',
        showAddService: false, // 增值服务弹出层
        addServiceData: [], //增值服务信息
        addServieAmount: '',
        //预计到期时间
        expireTime: '',
      }
    },
    created() {
      this.orderData.timeList.forEach((item) => {
        //下单时间
        if (item.timeName === '下单时间') {
          this.createOrderTime = item.createTime
        }
        if (item.timeName === '取消时间') {
          this.orderCancelTime = item.createTime
        }
        if (item.timeName === '支付时间') {
          this.payTime = item.createTime
        }
        if (item.timeName === '发货时间') {
          this.deliverGoodTime = item.createTime
        }
        if (item.timeName === '完成时间') {
          this.finishTime = item.createTime
        }
        if (item.timeName === '关闭时间') {
          this.colseTime = item.createTime
        }
      })
      //处理增值服务
      this.addServiceData = this.orderData.goodsDetail[0].addedServices
      this.addServieAmount = 0
      this.addServiceData.forEach((item) => {
        this.addServieAmount = this.decimalAddFn(Number(this.addServieAmount), Number(item.price))
      })
      //预计到期时间
      let createTime =
        new Date(this.orderData.createTime).getTime() +
        this.orderData.goodsDetail[0].periodDays * 24 * 60 * 60 * 1000
      this.expireTime = this.$vocenApi.VoUtils.timeFormat(createTime, 'yyyy-mm-dd hh:MM:ss')
    },
    methods: {
      copyClick() {
        uni.setClipboardData({
          data: this.orderData.id,
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .detail-address {
    &__user {
      padding: 24rpx 0;
      margin: 0 32rpx;
      color: #000;
    }
    &__order {
      padding: 0 32rpx 24rpx;
    }
  }
</style>
