<template>
  <view class="process color-block fz-28">
    <VoNav is-fixed is-have-more title="取消/退款进度" />
    <view class="step-wrap bg-white m-t-16">
      <EraSteps :current="currentStep" activeColor="#F7F7F8">
        <EraStepsItem :desc="item.desc" v-for="(item, index) in stepList" :key="index">
          <text
            class="color-block fz-28"
            slot="title"
            :class="{
              'color-block-yellow': currentStep === index && currentStep <= 2,
              'color-block': index < currentStep,
            }"
            >{{ item.name }}</text
          >
          <text class="slot-icon" slot="icon" v-if="currentStep === index && currentStep <= 2">
            <VoIcon name="success-fill" :size="20" color="#FF5319" />
          </text>
          <text class="slot-icon" slot="icon" v-if="index < currentStep">
            <VoIcon name="success-fill" :size="16" color="#07C160" />
          </text>
        </EraStepsItem>
      </EraSteps>
      <view v-if="currentStep === 2" class="c0 fz-32 p-t-24 p-b-24 text-center font-weight-500">
        您的退货退款申请已审核通过，费用会按原支付账户退回
      </view>
    </view>
    <view class="info bg-white m-t-16" v-if="info.status == 1360">
      <view class="title fz-32 p-b-24">退款明细</view>
      <view
        >{{ info.payType }}¥
        <VoPointPrice
          :show-unit="false"
          :price="info.goodsAmount"
          color="rgba(0, 0, 0, 0.85)"
          display="inline-block"
        />
        （1-3个工作日到账）</view
      >
      <view class="flex m-t-8">
        <VoIcon class="m-t-4" name="warning" :size="16" color="#000000" :opacity="0.45" />
        <view class="flex1 m-l-8 fz-24 color-block-45"
          >退款将退还您实际支付的金额，若原返失败，请前往我的账户中查看退款。</view
        >
      </view>
    </view>
    <view v-show="false" class="info bg-white m-t-16">
      <EraSteps :current="currentProcess" direction="column" activeColor="#FF5319">
        <EraStepsItem
          v-for="(item, index) in processList"
          :key="index"
          v-show="isExpand ? index < processList.length : index < 1"
        >
          <text class="color-block fz-32 p-l-12" slot="title">{{ item.name }}</text>
          <text class="desc color-block-45 fz-28 p-l-12" slot="desc">{{ item.desc }}</text>
          <text class="slot-icon" slot="icon" v-if="index === 0">
            <VoIcon name="success-fill" :size="24" color="#FF5319" />
          </text>
          <text class="slot-icon" slot="icon" v-else>
            <VoIcon name="address_select" :size="20" color="#000000" :opacity="0.45" />
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
          :size="12"
          color="#000000"
          :opacity="0.45"
        />
      </view>
    </view>
    <view class="info bg-white m-t-16">
      <view class="title fz-32 border-bottom p-b-24">订单信息</view>
      <view class="info-row flex flex-justify-between">
        <view>订单编号：</view>
        <view class="color-block-45" @click.stop="copyHandler(info.id)"
          >{{ info.id }}<text class="link fz-24 m-l-8">复制</text></view
        >
      </view>
      <view class="info-row flex flex-justify-between">
        <view>下单时间：</view>
        <view class="color-block-45">{{ info.createTime }}</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'CancelProgress',
    data() {
      return {
        id: '',
        currentStep: 2,
        info: {},
        currentProcess: 1,
        isExpand: false,
      }
    },
    onLoad(option) {
      this.id = option.id
    },
    computed: {
      stepList() {
        if (this.info.status == 1350) {
          return [
            {
              name: '申请取消',
              value: 0,
              desc: this.info.nextStageTime,
            },
            {
              name: '审核通过',
              value: 1,
              desc: this.info.nextStageTime,
            },
            {
              name: '取消成功',
              value: 2,
              desc: this.info.nextStageTime,
            },
          ]
        }
        if (this.info.status == 1360) {
          return [
            {
              name: '申请退货退款',
              value: 0,
              desc: this.info.nextStageTime,
            },
            {
              name: '审核通过',
              value: 1,
              desc: this.info.nextStageTime,
            },
            {
              name: '退款成功',
              value: 2,
              desc: this.info.nextStageTime,
            },
          ]
        }
        return []
      },
      processList() {
        return [
          {
            name: '申请退货退款。',
            value: 0,
            desc: this.info.nextStageTime,
          },
          {
            name: '审核通过。',
            value: 1,
            desc: this.info.nextStageTime,
          },
          {
            name: '退款成功。',
            value: 2,
            desc: this.info.nextStageTime,
          },
        ]
      },
    },
    mounted() {
      this.reqDetail()
    },
    methods: {
      async reqDetail() {
        const res = await this.$VoHttp.apiOrderOld$Id({ id: this.id })
        this.info = res.data
      },
      toExpand() {
        this.isExpand = !this.isExpand
      },
      // 复制
      copyHandler(code) {
        // 复制操作
        uni.setClipboardData({
          data: code,
          success: () => {
            this.$u.toast('复制成功')
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
