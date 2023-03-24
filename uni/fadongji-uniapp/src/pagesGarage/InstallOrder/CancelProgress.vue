<template>
  <view class="process color-block fz-28">
    <VoNav is-fixed is-have-more title="退货/退款进度" />
    <view class="step-wrap bg-white m-t-16">
      <EraSteps :current="currentStep" activeColor="#FFECE5">
        <EraStepsItem v-for="(item, index) in stepList" :key="index" :desc="item.desc">
          <text
            slot="title"
            :class="{
              'color-block-yellow': currentStep === index && currentStep <= 2,
              'color-block': index < currentStep,
            }"
            class="color-block fz-28"
            >{{ item.name }}</text
          >
          <text v-if="currentStep === index && currentStep <= 2" slot="icon" class="slot-icon">
            <VoIcon :size="20" color="#FF5319" name="success-fill" />
          </text>
          <text v-if="index < currentStep" slot="icon" class="slot-icon">
            <VoIcon :size="16" color="#07C160" name="success-fill" />
          </text>
        </EraStepsItem>
      </EraSteps>
      <view v-if="currentStep === 2" class="c0 fz-32 p-t-24 p-b-24 text-center font-weight-500">
        您的退货退款申请已审核通过，费用会按原支付账户退回
      </view>
    </view>
    <view class="info bg-white m-t-16">
      <view class="title fz-32 p-b-24">退款明细</view>
      <view
        >{{ data.payType }}¥
        <VoPointPrice
          :price="data.payAmount"
          :show-unit="false"
          color="rgba(0, 0, 0, 0.85)"
          display="inline-block"
        />
        （1-3个工作日到账）</view
      >
      <view class="flex m-t-8">
        <VoIcon :opacity="0.45" :size="16" class="m-t-4" color="#000000" name="warning" />
        <view class="flex1 m-l-8 fz-24 color-block-45"
          >退款将退还您实际支付的金额，若原返失败，请前往我的账户中查看退款。</view
        >
      </view>
    </view>
    <view v-show="false" class="info bg-white m-t-16">
      <EraSteps :current="currentProcess" activeColor="#FFECE5" direction="column">
        <EraStepsItem
          v-for="(item, index) in processList"
          v-show="isExpand ? index < processList.length : index < 1"
          :key="index"
        >
          <text slot="title" class="color-block fz-32 p-l-12">{{ item.name }}</text>
          <text slot="desc" class="desc color-block-45 fz-28 p-l-12">{{ item.desc }}</text>
          <text v-if="index === 0" slot="icon" class="slot-icon">
            <VoIcon :size="24" color="#FF5319" name="success-fill" />
          </text>
          <text v-else slot="icon" class="slot-icon">
            <VoIcon :opacity="0.45" :size="20" color="#000000" name="address_select" />
          </text>
        </EraStepsItem>
      </EraSteps>
      <view
        class="fz-24 color-block-45 m-t-16 flex flex-justify-c flex-vertical-c"
        @click="toExpand()"
      >
        查看完整进度
        <VoIcon
          :name="isExpand ? 'open-close' : 'open'"
          :opacity="0.45"
          :size="12"
          color="#000000"
        />
      </view>
    </view>
    <view class="info bg-white m-t-16">
      <view class="title fz-32 border-bottom p-b-24">订单信息</view>
      <view class="info-row flex flex-justify-between">
        <view>订单编号：</view>
        <view class="color-block-45" @click.stop="copyHandler(data.id)"
          >{{ data.id }}<text class="link fz-24 m-l-8">复制</text></view
        >
      </view>
      <view class="info-row flex flex-justify-between">
        <view>下单时间：</view>
        <view class="color-block-45">{{ data.createTime }}</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'CancelProgress',
    data() {
      return {
        currentStep: 2,
        stepList: [
          {
            name: '申请退货退款',
            value: 0,
            desc: '',
          },
          {
            name: '审核通过',
            value: 1,
            desc: '',
          },
          {
            name: '退款成功',
            value: 2,
            desc: '',
          },
        ],
        data: {},
        processList: [
          {
            name: '您的订单已取消。如您使用了优惠券，请查看取消进度详情。',
            value: 0,
            desc: '2022-04-26 11:24:34',
          },
          {
            name: '您的订单已取消。如您使用了优惠券，请查看取消进度详情。',
            value: 1,
            desc: '2022-04-26 11:24:34',
          },
          {
            name: '您的订单已取消。如您使用了优惠券，请查看取消进度详情。',
            value: 2,
            desc: '2022-04-26 11:24:34',
          },
        ],
        currentProcess: 1,
        isExpand: false,
      }
    },
    onLoad(option) {
      this.data = JSON.parse(option.orderData)
      let cosleTime = ''
      this.data.timeList.forEach((item) => {
        //关闭时间
        if (item.timeName === '关闭时间') {
          cosleTime = item.createTime
        }
      })
      this.stepList.forEach((item) => {
        item.desc = cosleTime
      })
    },
    methods: {
      toExpand() {
        this.isExpand = !this.isExpand
      },
      // 复制
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
  .process {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    .step-wrap {
      padding: 28rpx 32rpx;
      box-sizing: border-box;
    }
    .info {
      padding: 24rpx 32rpx;
      box-sizing: border-box;
      .title {
        color: #000000;
      }
      .link {
        color: #0d66ff;
      }
      &-row {
        padding-top: 16rpx;
        padding-bottom: 16rpx;
      }
      .desc {
        padding-top: 16rpx;
        padding-bottom: 16rpx;
      }
    }
  }
</style>
