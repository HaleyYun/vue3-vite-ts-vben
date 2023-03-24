<template>
  <view
    v-if="isShowPush"
    :class="type == 'goods' ? 'prompt' : 'valet'"
    :style="{ top: type == 'goods' ? ' -196rpx' : '-90rpx' }"
  >
    <view v-if="type == 'goods'" class="goods">
      <VoIcon :size="20" class="close" name="close" @click="close" />
      <view class="flex flex-vertical-c">
        <u--image :src="roomInfo.goods.pic" class="cover" height="48px" width="48px"></u--image>
        <view class="info">
          <view class="name overEllipsis">
            <text v-show="roomInfo.goods.categoryType" class="good-tips m-r-8">{{roomInfo.goods.categoryType}}</text>
            <text> {{ roomInfo.goods.name }}</text>
          </view>
          <view class="price flex flex-vertical-c">
            <block v-if="userInfo.platformCode === 'garage'">
              <view class="money-tips">现金价</view>
              <view class="money-price">
                <VoPointPrice
                  :price="roomInfo.goods.cashPrice"
                  :show-unit="true"
                  class="tag-text first"
                  display="inline-block"
                />
              </view>
            </block>
            <block v-else>
              <view v-if="roomInfo.goods.accountPeriodDays">{{roomInfo.goods.accountPeriodDays}}天账期</view>
              <view v-else class="money-tips">现金价</view>
              <view class="money-price">
                <VoPointPrice
                  :price="roomInfo.goods.accountPrice||roomInfo.goods.cashPrice"
                  :show-unit="true"
                  class="tag-text first"
                  display="inline-block"
                />
              </view>
            </block>
          </view>
        </view>
      </view>
      <view class="buttons">
        <view @click.stop="sendService(roomInfo.goods)">发送客服</view>
        <view @click.stop="goGoodsDetail">立即购买</view>
      </view>
    </view>
    <view v-else class="ValetOrder">
      <span>好货不能错过，快去代客下单吧！</span>
      <view class="ValetOrder-btn">
        <view @click="goValetOrder">代客下单</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'pushGoods',
    props: {
      isShowPush: {
        type: Boolean,
        default: false,
      },
      roomInfo: {
        type: Object,
        default: {},
      },
      type: {
        type: String,
        default: 'goods', // 推送的类型 goods order代课下单
      },
      //修理厂信息
      garageInfo: {
        type: Object,
        default() {
          return {}
        },
      },
    },
    methods: {
      sendService(goods) {
        this.$emit('sendService', goods)
      },
      goGoodsDetail() {
        this.$emit('goGoodsDetail')
      },
      close() {
        this.$emit('close')
      },
      // 代课下单
      goValetOrder() {
        this.$storage.set('garageArea', this.garageInfo.areaCode)
        this.$linkToEasy(
          '/pagesAgent/GoodsList/GoodsList?companyId=' +
            this.garageInfo.targetCompanyId +
            '&salesArea=' +
            this.garageInfo.areaCode+'&imType=1',
        )
      },
    },
  }
</script>

<style lang="scss" scoped>
  .prompt {
    width: 100%;
    background: #feecee;
    position: absolute;
    left: 0;
    top: -196rpx;
    padding: 24rpx 0;
    z-index: 9999;

    .goods {
      position: relative;
      padding: 0 32rpx;
      .close {
        position: absolute;
        right: 20rpx;
      }
      .cover {
        border-radius: 8rpx;
      }
      .info {
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;
        font-size: 28rpx;
        margin-left: 20rpx;
        width: calc(100% - 120rpx);
        .name {
          margin-bottom: 10rpx;
          width: 100%;
        }
        .money-tips {
          height: 28rpx;
          line-height: 28rpx;
          font-size: 24rpx;
          color: $color-clicked-red;
          padding: 2rpx 4rpx;
          border: 2rpx solid $color-clicked-red;
          background: $color-disabled-red;
          border-radius: 4rpx;
          margin-right: 8rpx;
        }
        .money-price {
          font-size: 28rpx;
          color: $color-primary-red;
        }
      }
    }
    .buttons {
      text-align: right;
      view {
        color: #ff5319;
        font-weight: 400;
        font-size: 24rpx;
        border: 2rpx solid #ff5319;
        border-radius: 200rpx;
        padding: 6rpx 24rpx;
        margin-right: 12rpx;
        display: inline-block;
      }
    }
  }

  .valet {
    width: 100%;
    background: #ffe6e8;
    padding: 24rpx 0;
    z-index: 9999;
    .buttons {
      text-align: right;
      view {
        color: #22284b;
        font-weight: 400;
        font-size: 24rpx;
        border: 2rpx solid #22284b;
        border-radius: 200rpx;
        padding: 2rpx 0;
        margin-right: 12rpx;
        width: 144rpx;
        text-align: center;
        display: inline-block;
      }
    }
    .ValetOrder {
      font-weight: 400;
      font-size: 24rpx;
      padding: 0 20rpx;
      color: #f20014;
      position: relative;
      display: flex;
      justify-content: space-between;
      &-btn {
        color: #ff5319;
        font-size: 24rpx;
        padding: 6rpx 24rpx;
        border-radius: 200rpx;
        border: 2rpx solid #ff5319;
        text-align: center;
      }
    }
  }
  .good-tips {
    height: 36rpx;
    line-height: 36rpx;
    font-size: 24rpx;
    color: #fff;
    padding: 0 12rpx;
    background: $color-primary-yellow;
    border-radius: 24rpx;
  }
</style>
