<template>
  <view class="integral">
    <VoNav is-fixed is-have-more isShadow title="规则说明" />
    <view class="integral-con flex1">
      <!-- 服务商 -->
      <block v-if="userInfo.roleCode === 'agent'">
        <image class="integral-con__agent" src="/static/common/rule/agent_content.png" />
      </block>
      <!-- 供应商 -->
      <block v-else-if="userInfo.roleCode === 'supplier'">
        <image class="integral-con__agent height1" src="/static/common/rule/supplier_content.png" />
      </block>
      <!-- 汽修厂 -->
      <block v-else-if="userInfo.roleCode === 'garage'">
        <image class="integral-con__skilled height1" src="/static/common/rule/garage_content.png" />
      </block>
      <!-- 集师傅 -->
      <block v-else-if="userInfo.roleCode === 'skilledWorker'">
        <image class="integral-con__skilled" src="/static/common/rule/skilled_content.png" />
      </block>
      <view v-else class="flex1 bg-white m-t-16 p-t-24 p-b-24 p-l-32 p-r-32">
        <view class="fz-b fz-28 lh150 color-block">7*24h人工技术支持</view>
        <view class="fz-28 lh150 color-block m-t-8"
          >人工技术顾问7*24小时在线，随时可对客户进行安装指导、故障解析等各类问题，确保售后无忧。</view
        >
        <view class="fz-b fz-28 lh150 color-block m-t-48">赠送售卖支持物料：</view>
        <view class="fz-28 lh150 color-block m-t-8"
          >平台提供商品的宣传物料，突出产品亮点与优势，让售卖过程更简单。</view
        >
        <view class="fz-b fz-28 lh150 color-block m-t-48">发票服务</view>
        <view class="fz-28 lh150 color-block m-t-8"
          >下单后，平台可根据需求，开具普票、专票等各类发票。</view
        >
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'MyIntegral',
    data() {
      return {
        myIntegralList: [
          {
            date: '2022年3月',
            isOpen: false,
            incomeNum: 800,
            expenditureNum: 200,
            detail: [
              {
                head: '/static/garage/user/head1.png',
                orderNum: '订单-2021091299009000',
                orderTime: '2021-09-12 12:00:00',
                integralNum: 20,
              },
              {
                head: '/static/garage/user/head1.png',
                orderNum: '订单-2021091299009000',
                orderTime: '2021-09-12 12:00:00',
                integralNum: 20,
              },
              {
                head: '/static/garage/user/head1.png',
                orderNum: '订单-2021091299009000',
                orderTime: '2021-09-12 12:00:00',
                integralNum: -20,
              },
            ],
          },
          {
            date: '2022年3月',
            isOpen: false,
            incomeNum: 800,
            expenditureNum: 200,
            detail: [
              {
                head: '/static/garage/user/head1.png',
                orderNum: '订单-2021091299009000',
                orderTime: '2021-09-12 12:00:00',
                integralNum: 20,
              },
              {
                head: '/static/garage/user/head1.png',
                orderNum: '订单-2021091299009000',
                orderTime: '2021-09-12 12:00:00',
                integralNum: 20,
              },
              {
                head: '/static/garage/user/head1.png',
                orderNum: '订单-2021091299009000',
                orderTime: '2021-09-12 12:00:00',
                integralNum: -20,
              },
            ],
          },
          {
            date: '2022年3月',
            isOpen: false,
            incomeNum: 800,
            expenditureNum: 200,
            detail: [
              {
                head: '/static/garage/user/head1.png',
                orderNum: '订单-2021091299009000',
                orderTime: '2021-09-12 12:00:00',
                integralNum: 20,
              },
              {
                head: '/static/garage/user/head1.png',
                orderNum: '订单-2021091299009000',
                orderTime: '2021-09-12 12:00:00',
                integralNum: 20,
              },
              {
                head: '/static/garage/user/head1.png',
                orderNum: '订单-2021091299009000',
                orderTime: '2021-09-12 12:00:00',
                integralNum: -20,
              },
            ],
          },
        ],
      }
    },
    methods: {
      customerService() {},
    },
  }
</script>

<style lang="scss" scoped>
  .integral {
    height: 100vh;
    width: 750rpx;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    &-con {
      overflow-y: scroll;
      &__agent {
        margin-top: 16rpx;
        padding: 0 24rpx;
        box-sizing: border-box;
        width: 100%;
        height: 1368rpx;
        &.height1 {
          height: 1576rpx;
        }
      }
      &__skilled {
        margin-top: 16rpx;
        padding: 0 10rpx 0 24rpx;
        box-sizing: border-box;
        width: 100%;
        height: 2816rpx;
        &.height1 {
          height: 2870rpx;
        }
      }
    }
    &-red {
      font-size: 40rpx;
      font-weight: bold;
      line-height: 60rpx;
      color: #f20014;
    }
    &-holder {
      background: #f6f7f8;
      height: 16rpx;
    }
    &-line {
      border-bottom: 2rpx solid #f7f7f8;
    }
    &-head {
      height: 96rpx;
      width: 96rpx;
      border-radius: 8rpx;
    }
    &-text {
      font-weight: bold;
      line-height: 48rpx;
      &__red {
        color: #f20014;
        font-size: 32rpx;
        .t {
          font-size: 24rpx;
        }
      }
      &__green {
        color: #00b259;
        font-size: 32rpx;
        .t {
          font-size: 24rpx;
        }
      }
    }
    &-place {
      background: #f7f7f8;
      height: 2rpx;
      margin-left: 32rpx;
    }
  }
</style>
