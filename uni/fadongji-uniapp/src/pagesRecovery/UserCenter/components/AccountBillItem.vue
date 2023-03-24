<template>
  <view>
    <view class="bill flex flex-vertical-c flex-justify-between" @click="openClick(billData)">
      <view class="bill-time flex flex-vertical-c">
        <view> {{ billData.date }} </view>
        <VoIcon v-if="billData.isOpen" :size="12" name="close-arrow-t" />
        <VoIcon v-else :size="12" name="open-arrow-b" />
      </view>
      <view class="bill-right flex flex-vertical-c">
        <view v-if="billData.isOpen">展开</view>
        <view v-else>收起</view>
        <VoIcon v-if="billData.isOpen" :size="16" name="arrow-bottom-line" />
        <VoIcon v-else :size="16" name="arrow-bottom-line" />
      </view>
    </view>
    <view v-if="billData.isOpen">
      <view v-for="(item, index) in billData.list" :key="index" class="bill-detail">
        <view class="bill-detail__line" />
        <view class="bill-detail__detail">
          <view class="flex flex-justify-between">
            <view class="fz-28 fz-b black">订单{{ item.id }}</view>
            <view v-if="item.detailType === 2" class="red flex flex-vertical-c fz-24">
              <view>+</view>
              <VoPointPrice :price="item.amount" />
              <view>元</view>
            </view>
            <view v-else class="green flex flex-vertical-c fz-24">
              <view>-</view>
              <VoPointPrice :price="item.amount" color="#07C160" />
              <view>元</view>
            </view>
          </view>
          <view class="fz-28 gay m-t-18">变动时间：{{ item.createTime }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'AccountBillItem',
    props: {
      billData: {
        type: Object,
        billData: {},
      },
    },
    methods: {
      openClick(data) {
        data.isOpen = !data.isOpen
      },
    },
  }
</script>

<style lang="scss" scoped>
  .bill {
    background-color: #ffffff;
    height: 96rpx;
    line-height: 96rpx;
    &-time {
      color: $v-c0-85;
      font-size: 32rpx;
      margin-left: 32rpx;
    }
    &-right {
      color: $v-c0-45;
      font-size: 24rpx;
      margin-right: 32rpx;
    }
    &-detail {
      background-color: #ffffff;
      &__line {
        height: 2rpx;
        width: 100%;
        background-color: $v-bg-light;
      }
      &__detail {
        padding: 32rpx;
        .black {
          color: $v-c0-85;
        }
        .red {
          color: $color-primary-red;
        }
        .green {
          color: $v-success;
        }
        .gay {
          color: $v-c0-65;
        }
      }
    }
  }
</style>
