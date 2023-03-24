<template>
  <view>
    <view class="bill">
      <view class="bill-top flex flex-justify-between" @click="openClick(billData)">
        <view class="bill-time flex flex-vertical-c">
          <view> {{  billData.date.split('--')[0] }} </view>
          <!-- <VoIcon v-if="billData.isOpen" :size="12" name="close-arrow-t" />
          <VoIcon v-else :size="12" name="open-arrow-b" /> -->
        </view>
        <view class="bill-right flex flex-vertical-c">
          <view v-if="billData.isOpen">展开</view>
          <view v-else>收起</view>
          <VoIcon v-if="billData.isOpen" :size="16" name="arrow-bottom-line" />
          <VoIcon v-else :size="16" name="arrow-top-line" />
        </view>
      </view>
      <view class="flex bill-bottom flex-vertical-c">
          <!-- <text>收入￥{{billData.date.split('--')[1]}}</text>
          <text class="bill-bottom-expend">支出￥{{billData.date.split('--')[2]}}</text> -->
          <view>收入￥</view>
          <VoPointPrice :price="billData.date.split('--')[1]" color="$v-c0-85" :leftSize="16" :rightSize="16"/>
          <view class="bill-bottom-expend">支出￥</view>
          <VoPointPrice :price="billData.date.split('--')[2]" color="$v-c0-85" :leftSize="16" :rightSize="16"/>
      </view>
    </view>
    <view v-show="billData.isOpen">
      <view v-for="(item, index) in billData.list" :key="index" class="bill-detail">
        <view class="bill-detail__line" />
        <view class="bill-detail__detail">
          <view class="flex flex-justify-between">
            <view v-if="+item.amountType === 2 || +item.amountType === 4" class="fz-28 fz-b black">{{ detailType[+item.detailType] }}{{item.buyerName?"-"+item.buyerName:''}}</view>
            <view v-else-if="+item.amountType === 1" class="fz-28 fz-b black">{{ detailType[+item.detailType] }}{{item.bankCard?"-银行卡"+item.bankCard.substr(-4):''}}</view>
            <view v-else class="fz-28 fz-b black">{{ detailType[+item.detailType] }}</view>
            <view v-if="+item.amountType === 2" class="red flex flex-vertical-c fz-28">
              <view>+</view>
              <VoPointPrice :price="item.amount" :leftSize="20" :rightSize="14"/>
              <view class="detail-unit">元</view>
            </view>
            <view v-else class="green flex flex-vertical-c fz-28">
              <view>-</view>
              <VoPointPrice :price="item.amount" :leftSize="20" :rightSize="14" color="#07C160" />
              <view class="detail-unit">元</view>
            </view>
          </view>
          <view v-if="+item.detailType === 2"  class="fz-28 blue m-t-16" @click="openOrder(item.orderId,item.orderType)">订单号：{{ item.orderId }}</view>
          <view class="fz-28 gay m-t-18">变动时间：{{ item.createTime }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  // import InvoiceItem from './InvoiceItem'
  export default {
    name: 'AccountBillItem',
    // components: { InvoiceItem, },
    props: {
      billData: {
        type: Object,
        default: () => {},
      },
      detailType: {
        type: Array,
        default: () => [
          '未知',
          '提现',
          '货款',
          '批发收益',
          '拓客收益',
          '仓储费用',
          '提现失败退回',
          '',
          '违约金',
          '退款',
        ],
      },
    },
    data() {
      return {
      }
    },
    methods: {
      openClick(data) {
        data.isOpen = !data.isOpen
      },
      openOrder(data,orderType) {
        console.log('userInfo -------->',this.userInfo)
        if (this.userInfo.platformCode === 'supplier') {
          if(orderType == 11){
              this.$linkToEasy(`/pagesSupplier/Order/OrderDetail/OrderDetail?id=${data}`)    
          }else{
              this.$linkToEasy(`/pagesSupplier/Order/OrderDetail/InvestDetail?id=${data}`)
          }
        }else if(this.userInfo.platformCode === 'garage'){
            this.$linkToEasy(`/pagesGarage/RecoveryOrder/RecoveryOrderDetails?id=${data}`)
        } else {
          if(orderType == 11){
              this.$linkToEasy('/pagesAgent/Order/OrderDetail/OrderDetail?id=' +data)
          }else{
               this.$linkToEasy('/pagesAgent/Order/OrderDetail/TurnInvestDetail?data=' +data)
          }
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  .bill {
    background-color: #ffffff;
    height: 160rpx;
    line-height: 160rpx;
    &-top{
      height: 80rpx;
      line-height: 80rpx;
      .bill-time {
      color: $v-c0-85;
      font-size: 32rpx;
      font-weight: 500;
      margin-left: 32rpx;
      }
      .bill-right {
        color: $v-c0-45;
        font-size: 24rpx;
        margin-right: 32rpx;
      }
    }
    &-bottom {
       height: 64rpx;
      line-height: 64rpx;
      margin-left: 32rpx;
      color: $v-c0-85;
      font-size: 32rpx;
      &-expend{
        margin-left: 32rpx;
      }
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
          line-height: 56rpx;
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
        .blue {
          color: #0D66FF;
        }
        .detail-unit{
          margin-top: 4rpx;
        }
      }
    }
  }
</style>
