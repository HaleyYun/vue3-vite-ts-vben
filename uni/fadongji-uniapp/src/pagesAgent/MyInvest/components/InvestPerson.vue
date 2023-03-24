<template>
  <view>
    <view
      v-if="info.orderList && info.orderList.length"
      class="fz-32 cell-list-title flex flex-justify-between"
    >
      <text>进货人</text>
      <view class="fz-26 color-block-65 flex" @click="toDetail">
        查看更多
        <VoIcon :opacity="0.65" :size="16" color="#000000" name="right-arrow" />
      </view>
    </view>
    <view
      v-for="(item, index) in info.orderList"
      v-show="index < 2"
      :key="index"
      class="investing-list"
    >
      <image
        :src="item.headImg || '/static/default_avatar.png'"
        class="m-t-24 m-l-32 investing-list__img"
      />
      <view class="m-l-16 flex1">
        <view class="investing-list__text1">{{ item.buyerName }}</view>
        <view
          v-for="(good, pos) in item.goodsList"
          :key="pos"
          class="flex flex1 flex-row flex-vertical-c"
        >
          <view class="flex1 investing-list__text2">
            <text class="p-r-20">{{ good.warehouseName }}</text>
            <text>{{ good.goodsCount }}台共{{ good.payAmountTotal }}元</text>
          </view>
          <view
            v-if="item.orderStatusName"
            :class="+item.orderStatus === 1230 || +item.orderStatus === 1240 ? 'investing-list__button1' : 'investing-list__button2'"
            class="investing-list__button1"
            @click="toSend(item)"
          >
            {{ item.orderStatusName }}
          </view>
        </view>
        <view class="investing-list__text3">{{ item.createTime }}</view>
      </view>
    </view>
  </view>
</template>
<script>
  export default {
    name: 'InvestPerson',
    props: {
      info: {
        type: Object,
      },
    },
    data() {
      return {
        serviceProvider: [],
      }
    },
    methods: {
      // 跳转订单详情
      toSend(good) {
        // this.$linkToEasy('/pagesAgent/Order/OrderDetail/InvestDetail?data=' + good.orderId)
        if (this.userInfo.platformCode === 'supplier') {
          this.$linkToEasy(`/pagesSupplier/Order/OrderDetail/InvestDetail?id=${good.orderId}`)
        } else {
          this.$linkToEasy('/pagesAgent/Order/OrderDetail/TurnInvestDetail?data=' + good.orderId)
        }
      },
      toDetail() {
        this.$storage.set('investorList', this.info.orderList)
        this.$linkToEasy('/pagesAgent/MyInvest/Investment/Investing')
      },
    },
  }
</script>
<style lang="scss" scoped>
  .cell-list-title {
    @include black-size-color(32, 0.85);
    font-weight: bold;
  }

  .investing-list {
    margin: 8rpx 0;
    box-sizing: border-box;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &__img {
      width: 72rpx;
      height: 72rpx;
      border-radius: 100rpx;
    }

    &__text1 {
      font-size: 28rpx;
      line-height: 42rpx;
      height: 42rpx;
      color: $v-c0-85;
      padding: 40rpx 16rpx 16rpx 4rpx;
    }

    &__text2 {
      font-size: 28rpx;
      line-height: 42rpx;
      height: 42rpx;
      color: $v-c0-85;
      padding: 16rpx 16rpx 16rpx 4rpx;
    }

    &__text3 {
      font-size: 24rpx;
      line-height: 36rpx;
      height: 36rpx;
      color: $v-c0-45;
      padding: 0 16rpx 24rpx 0;
    }

    &__button1 {
      margin-right: 46rpx;
      width: 120rpx;
      height: 48rpx;
      line-height: 48rpx;
      font-size: 24rpx;
      color: $v-c0-25;
      border-radius: 30rpx;
      background-color: #f6f7f8;
      align-items: center;
      box-sizing: border-box;
      text-align: center;
    }

    &__button2 {
      margin-right: 46rpx;
      width: 120rpx;
      height: 48rpx;
      font-size: 24rpx;
      line-height: 48rpx;
      color: #22284b;
      border-radius: 30rpx;
      border-color: #22284b;
      border-width: 2rpx;
      align-items: center;
      box-sizing: border-box;
      text-align: center;
    }
  }
</style>
