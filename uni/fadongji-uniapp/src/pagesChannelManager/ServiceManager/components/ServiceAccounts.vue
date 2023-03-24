<template>
  <view class="accounts flex1 flex flex-column m-b-safe-area">
    <!--    <template v-if="type === 0">-->
    <view v-for="item in accountsList" :key="item.id" class="bg-white w-full m-t-16">
      <view class="accounts-view1">
        <view class="flex flex-row flex-justify-between">
          <view class="accounts-order">订单号-{{ item.id }}</view>
          <view class="accounts-label" v-if="item.repayment === 1">未还款</view>
          <view class="accounts-label" v-else-if="item.repayment === 3">部分还款</view>
          <view class="accounts-label" v-else-if="item.repayment === 4">部分逾期</view>
          <view class="accounts-label" v-else-if="item.repayment === 5">已逾期</view>
        </view>
        <!-- 作为卖家 -->
        <template v-if="type === 1">
          <view class="flex flex-row u-flex-end m-t-16">
            <view class="fz-24">订单金额:</view>
            <VoPointPrice
              :left-size="16"
              :price="item.orderAmount"
              :right-size="12"
              :show-unit="true"
              class="m-l-8"
              color="#FF5319"
              display="inline-block"
            />
            <view class="fz-24 m-l-20">已收</view>
            <VoPointPrice
              :left-size="16"
              :price="item.receivedAmount"
              :right-size="12"
              :show-unit="true"
              class="m-l-8"
              color="#FF5319"
              display="inline-block"
            />
          </view>
          <view class="accounts-text4 m-t-16">还款日：{{ item.expireTime }}</view>
        </template>
        <!-- 作为买家 -->
        <template v-else-if="type === 2">
          <view class="flex flex-vertical-c m-t-16">
            <view class="fz-24">订单金额：</view>
            <VoPointPrice
              :leftSize="16"
              :showUnit="true"
              class="pay-size"
              color="#FF5319"
              :price="item.orderAmount"
            />
          </view>
          <view class="accounts-grey"
            >含{{ item.goodsTypeCount }}个商品，共{{ item.goodsCount }}件</view
          >
          <view class="accounts-grey">还款日：{{ item.expireTime }}</view>
        </template>
      </view>
    </view>
    <!--    </template>-->
    <!--
    <template v-if="type === 1">
      <template v-for="item in accountsList">
        <view v-if="item.type === 1" :key="item.id" class="bg-white w-full m-t-16">
          <view class="accounts-view1">
            <view class="flex flex-row flex-justify-between">
              <view class="accounts-order">订单号-{{ item.orderNum }}</view>
              <view v-if="item.state === 0" class="accounts-status" />
              <view v-else-if="item.state === 1" class="accounts-status">已逾期</view>
              <view v-else-if="item.state === 2" class="accounts-status">部分还款</view>
            </view>
            <view class="flex flex-row u-flex-end m-t-16">
              <view class="accounts-text3">订单金额:</view>
              <VoPointPrice
                :left-size="16"
                :price="item.orderMoney"
                :right-size="12"
                :show-unit="true"
                class="m-l-8"
                color="#FF5319"
                display="inline-block"
              />
              <view class="accounts-text3 flex flex-row m-l-16">
                {{ item.type === 1 ? '已收:' : '已付:' }}
              </view>
              <VoPointPrice
                :left-size="16"
                :price="item.received"
                :right-size="12"
                :show-unit="true"
                class="m-l-8"
                color="#FF5319"
                display="inline-block"
              />
            </view>
            <view class="accounts-text4 m-t-16">还款日：{{ item.time }}</view>
          </view>
        </view>
      </template>
    </template>
    <template v-if="type === 2">
      <template v-for="item in accountsList">
        <view v-if="item.type === 2" :key="item.id" class="bg-white w-full m-t-16">
          <view class="accounts-view1">
            <view class="flex flex-row flex-justify-between">
              <view class="accounts-order">订单号-{{ item.orderNum }}</view>
              <view v-if="item.state === 0" class="accounts-status" />
              <view v-else-if="item.state === 1" class="accounts-status">已逾期</view>
              <view v-else-if="item.state === 2" class="accounts-status">部分还款</view>
            </view>
            <view class="flex flex-row u-flex-end m-t-16">
              <view class="accounts-text3">订单金额:</view>
              <VoPointPrice
                :left-size="16"
                :price="item.orderMoney"
                :right-size="12"
                :show-unit="true"
                class="m-l-8"
                color="#FF5319"
                display="inline-block"
              />
              <view class="accounts-text3 flex flex-row m-l-16">
                {{ item.type === 1 ? '已收:' : '已付:' }}
              </view>
              <VoPointPrice
                :left-size="16"
                :price="item.received"
                :right-size="12"
                :show-unit="true"
                class="m-l-8"
                color="#FF5319"
                display="inline-block"
              />
            </view>
            <view class="accounts-text4 m-t-16">还款日：{{ item.time }}</view>
          </view>
        </view>
      </template>
    </template>
    -->
  </view>
</template>

<script>
  export default {
    name: 'ServiceAccounts',
    props: {
      accountsList: {
        type: Array,
        default: () => [],
      },
      type: {
        type: [String, Number],
        default: 1,
      },
    },
    data() {
      return {}
    },
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .accounts {
    width: 750rpx;
    background-color: #f7f7f8;
    &-view1 {
      padding: 16rpx 32rpx;
    }
    &-order {
      font-size: 28rpx;
      font-weight: bold;
      line-height: 42rpx;
      color: $v-c0-85;
    }
    &-status {
      font-size: 24rpx;
      line-height: 36rpx;
      color: #ec404d;
      background-color: #feecee;
      border-radius: 24rpx;
      padding: 0 16rpx;
      align-self: center;
    }
    &-text1 {
      font-size: 28rpx;
      line-height: 42rpx;
      color: $v-c0-45;
    }
    &-text2 {
      font-size: 26rpx;
      line-height: 39rpx;
      color: $v-c0-45;
    }
    &-text3 {
      font-size: 24rpx;
      line-height: 36rpx;
      color: $v-c0-85;
      align-self: flex-end;
    }
    &-text4 {
      font-size: 24rpx;
      line-height: 36rpx;
      color: $v-c0-45;
    }
    &-money {
      line-height: 48rpx;
      font-size: 24rpx;
    }
    &-grey {
      font-size: 24rpx;
      color: $v-c0-65;
      margin-top: 16rpx;
    }
    &-label {
      height: 36rpx;
      line-height: 36rpx;
      font-size: 24rpx;
      color: #ec404d;
      padding: 0 16rpx;
      background: #feecee;
      border-radius: 24rpx;
      margin-left: 8rpx;
    }
  }
</style>
