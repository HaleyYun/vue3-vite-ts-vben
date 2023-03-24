<template>
  <view class="investing">
    <VoNav is-fixed is-have-more title="进行中" />
    <view class="m-t-8 m-b-8 flex1">
      <view v-for="(item, index) in serviceProvider" :key="index" class="investing-list">
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
              >{{ item.orderStatusName }}</view
            >
          </view>
          <view class="investing-list__text3">{{ item.createTime }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'Investing',
    data() {
      return {
        header: '/static/demo/rectangle.png',
        isSend: false,
        serviceProvider: [],
      }
    },
    onLoad() {
      this.serviceProvider = this.$storage.get('investorList')
      console.log(this.serviceProvider);
    },
    methods: {
      toSend(res) {
        // console.log(res);
        // res.isSendGoods = !res.isSendGoods
        if (this.userInfo.platformCode === 'supplier') {
          this.$linkToEasy(`/pagesSupplier/Order/OrderDetail/InvestDetail?id=${res.orderId}`)
        } else {
          this.$linkToEasy('/pagesAgent/Order/OrderDetail/TurnInvestDetail?data=' + res.orderId)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .investing {
    width: 750rpx;
    height: 100vh;
    background-color: $v-bg-light;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    &-list {
      width: 100%;
      margin: 8rpx 0;
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
        font-weight: bold;
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
        border: 2rpx solid transparent;
      }

      &__button2 {
        margin-right: 46rpx;
        width: 120rpx;
        height: 48rpx;
        font-size: 24rpx;
        line-height: 48rpx;
        color: #FF5319;
        border-radius: 30rpx;
        border-color: #FF5319;
        align-items: center;
        background-color: #ffffff;
        box-sizing: border-box;
        text-align: center;
      }
    }
  }
</style>
