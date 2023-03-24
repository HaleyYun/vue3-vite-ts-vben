<template>
  <view class="info bg-white m-t-16 m-b-50">
    <!-- 3210待付款,3230待接单,3231待指派 3240待安装,3250安装中,3260已完成 3270取消 3280关闭-->
    <view class="title fz-32 border-bottom p-b-24">订单信息</view>
    <view class="info-row flex flex-justify-between m-t-24">
      <view class="info-row__left">订单编号：</view>
      <view class="flex1 text-right color-block-65" @click.stop="copyHandler(info.id)"
        >{{ info.id }}<text class="link fz-24 m-l-8">复制</text></view
      >
    </view>
    <view class="info-row flex flex-justify-between">
      <view class="info-row__left">下单时间：</view>
      <view class="color-block-65 flex1 text-right">{{ info.createOrderTime }}</view>
    </view>
    <view v-if="info.payMethod" class="info-row flex flex-justify-between">
      <view class="info-row__left">支付方式：</view>
      <view class="color-block-65 flex1 text-right">{{ payMethod[info.payMethod] }}</view>
    </view>
    <view v-if="info.orderStatus === 3210" class="info-row flex flex-justify-between">
      <view class="info-row__left">支付方式：</view>
      <view class="color-block-65 flex1 text-right">在线支付</view>
    </view>
    <view
      v-show="info.orderStatus != 3210 && info.payTime"
      class="info-row flex flex-justify-between"
    >
      <view class="info-row__left">支付时间：</view>
      <view class="color-block-65 flex1 text-right">{{ info.payTime }}</view>
    </view>
    <!--安装中 -->
    <view
      v-for="item in labelInstall"
      v-show="info.orderStatus === 3250"
      :key="item.value"
      class="info-row flex flex-justify-between"
    >
      <view>{{ item.name }}</view>
      <view class="color-block-65 flex1 text-right">{{ info[item.value] }}</view>
    </view>
    <!--已完成 -->
    <view
      v-for="(item, index) in labelFinsh"
      v-show="info.orderStatus === 3260"
      :key="index + item.name"
      class="info-row flex flex-justify-between"
    >
      <view class="info-row__left">{{ item.name }}</view>
      <view class="color-block-65 flex1 text-right">{{ info[item.value] }}</view>
    </view>
    <!-- 已取消 -->
    <view
      v-for="(item, index) in labelCancel"
      v-show="info.orderStatus === 3270"
      :key="index"
      class="info-row flex flex-justify-between"
    >
      <view class="info-row__left">{{ item.name }}</view>
      <view class="color-block-65 flex1 text-right">{{ info[item.value] }}</view>
    </view>

    <!-- 待付款 -->
    <view v-if="info.orderStatus === 3210" class="info-row flex flex-justify-between">
      <view class="info-row__left">应付款：</view>
      <view class="flex1 text-right">
        <VoPointPrice :price="info.supportAmount" color="#E50012" show-unit />
      </view>
    </view>
    <!--其他 -->
    <view v-else class="info-row flex flex-justify-between">
      <view class="info-row__left">实付款：</view>
      <view class="flex1 text-right red fz-b">
        {{ info.supportAmount }}元
        <!--        <VoPointPrice :price="info.supportAmount" color="#E50012" show-unit />-->
      </view>
    </view>
  </view>
</template>
<script>
  export default {
    props: {
      info: {
        type: Object,
        default() {
          return {}
        },
      },
    },
    data() {
      return {
        payMethod: { 1: '微信', 11: '支付宝', 51: '银联' },
        //订单信息已完成
        labelFinsh: [
          {
            name: '接单时间：',
            value: 'acceptTime',
          },
          {
            name: '到店时间：',
            value: 'doorTime',
          },
          {
            name: '确认完成时间：',
            value: 'finishTime',
          },
        ],
        //订单信息已取消
        labelCancel: [
          {
            name: '取消时间：',
            value: 'orderCancelTime',
          },
        ],
        labelInstall: [
          {
            name: '接单时间：',
            value: 'acceptTime',
          },
          // {
          //   name: '安装完成时间：',
          //   value: 'finishTime',
          // },
        ],
      }
    },
    methods: {
      //复制订单
      copyHandler(code) {
        // 复制操作
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const _this = this
        uni.setClipboardData({
          data: code,
          success: function () {
            _this.$u.toast('复制成功')
          },
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .info {
    padding: 24rpx 32rpx;
    box-sizing: border-box;
    .title {
      color: $v-c0-85;
      font-weight: bold;
    }
    .link {
      color: #0d66ff;
    }
    &-row {
      padding-bottom: 16rpx;
      box-sizing: border-box;
      &__left {
        width: 200rpx;
      }
    }
    .desc {
      padding-top: 16rpx;
      padding-bottom: 16rpx;
    }
  }
  .red {
    color: #f20014;
  }
</style>
