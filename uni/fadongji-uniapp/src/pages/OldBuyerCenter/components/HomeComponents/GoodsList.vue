<template>
  <view>
    <view class="goods">
      <view class="goods-line" />
      <view class="goods-list">
        <view class="flex" @click="goGoodsDetails(goodsInfo)">
          <view class="relative">
            <block v-if="goodsInfo.picture.split('.').pop() === 'mp4'">
              <image :src="`${goodsInfo.picture}&type=3`" class="goods-list__img" />
            </block>
            <image v-else :src="goodsInfo.picture + '&type=1'" class="goods-list__img" />
            <text v-if="+current === 1" class="goods-sign">预售</text>
          </view>
          <view class="flex1 m-l-16">

            <view>
              <text class="goods-list__type">{{ goodsInfo.level }}类</text>
              <text class="m-t-8 lh48 h56 fz-b fz-32">{{ goodsInfo.name }}</text>
            </view>
            <view class="flex m-t-10 text-24 color-block-85 flex-vertical-c">
               {{ goodsInfo.model }}
            </view>
            <view class="flex goods-list__tips">
              <view class="m-r-20">{{ goodsInfo.deliveryAreaName }}发货</view>
              <view>库存 {{ current === 0 ? goodsInfo.inventory : goodsInfo.margin }}</view>
            </view>

            <view class="flex flex-vertical-c m-t-16">
              <view class="goods-list__cash">现金</view>
              <VoPointPrice
                :leftSize="14"
                :price="goodsInfo.price"
                :showUnit="true"
                class="lh42"
                color="#E50012"
              />
            </view>
            <view v-if="+current === 1" class="goods-list__time">
              <view v-if="goodsInfo.downData > 0" class="flex flex-vertical-c">
                <view class="fz-24">{{ goodsInfo.timeDownText }}</view>
                <u-count-down :time="goodsInfo.downData" @change="onChange">
                  <view class="fz-28">
                    <!--时-->
                    <text class="time__item">{{ timeData.days }}&nbsp;天</text>
                    <text v-if="timeData.hours" class="m-l-12">
                      {{ timeData.hours > 9 ? timeData.hours : '0' + timeData.hours }}:</text
                    >
                    <text v-else class="time__item m-l-12">00:</text>
                    <!--分-->
                    <text v-if="timeData.minutes">
                      {{ timeData.minutes > 9 ? timeData.minutes : '0' + timeData.minutes }}:
                    </text>
                    <text v-else class="m-l-12">00:</text>
                    <!--秒-->
                    <text class="time__item">
                      {{ timeData.seconds > 9 ? timeData.seconds : '0' + timeData.seconds }}
                    </text>
                  </view>
                </u-count-down>
              </view>
              <view v-else class="fz-24"> 已结束 </view>
            </view>
          </view>
        </view>
        <view
          v-if="
            goodsInfo.inventory ||
            ($vocenApi.dayjs().isBefore(goodsInfo.endTime) &&
              $vocenApi.dayjs(goodsInfo.startTime).isBefore(new Date()) &&
              goodsInfo.margin)
          "
          class="flex flex-justify-r m-t-24"
        >
          <view class="goods-list__join" @click.stop="addGoodCar(goodsInfo)">加入购物车</view>
          <view class="goods-list__buy" @click.stop="buyNow(goodsInfo)">立即购买</view>
        </view>
        <view v-else class="flex flex-justify-r m-t-24">
          <view class="goods-bottom__disable m-r-24">加入购物车</view>
          <view class="goods-bottom__disable">立即购买</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'GoodsList',
    props: {
      current: {
        type: Number,
        default: 0, // 0:商品 1：预售
      },
      goodsInfo: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        timeData: {},
      }
    },
    // mounted() {
    //   console.log(
    //     this.$vocenApi.dayjs().isBefore(this.goodsInfo.endTime),
    //     this.$vocenApi.dayjs(this.goodsInfo.startTime).isBefore(new Date()),
    //     this.goodsInfo.margin,
    //   )
    // },
    methods: {
      onChange(e) {
        this.timeData = e
      },
      /**
       * 立即购买
       */
      buyNow(good) {
        this.$emit('buyNow', good)
      },
      //加入购物车
      addGoodCar(good) {
        this.$emit('addGoodCar', good)
      },
      /**
       * 去商品详情页
       */
      goGoodsDetails(good) {
        if (this.current === 0) {
          this.$linkToEasy(
            '/pagesOldBuyer/HomeJumpPage/GoodsDetails?id=' + good.id + '&source=false',
          )
          return
        }
        this.$linkToEasy('/pagesOldBuyer/HomeJumpPage/GoodsDetails?id=' + good.id + '&source=true')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .goods {
    width: 750rpx;
    &-line {
      width: 750rpx;
      height: 16rpx;
      background: #f6f7f8;
    }
    &-list {
      padding: 24rpx 32rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
      .relative {
        z-index: 0;
      }
      &__img {
        width: 128rpx;
        height: 128rpx;
        border-radius: 8rpx;
      }
      &__type {
        height: 36rpx;
        line-height: 36rpx;
        font-size: 24rpx;
        color: #ff5319;
        padding: 0 12rpx;
        background: #ffece5;
        border-radius: 8rpx;
        margin-bottom: 6rpx;
        margin-right: 8rpx;
      }
      &__tips {
        line-height: 36rpx;
        font-size: 24rpx;
        color: $v-c0-45;
        margin-top: 8rpx;
      }
      &__cash {
        height: 28rpx;
        line-height: 28rpx;
        padding: 2rpx 4rpx;
        border: 2rpx solid #ec404d;
        border-radius: 8rpx;
        background: #fdf2f3;
        font-size: 24rpx;
        color: #ec404d;
        margin-right: 8rpx;
      }
      &__join {
        width: 180rpx;
        height: 52rpx;
        line-height: 56rpx;
        text-align: center;
        color: $v-c0-85;
        border: 2rpx solid #d3d4db;
        border-radius: 48rpx;
        font-size: 24rpx;
        margin-right: 24rpx;
      }
      &__buy {
        width: 160rpx;
        height: 56rpx;
        line-height: 56rpx;
        text-align: center;
        background: #ff5319;
        border-radius: 64rpx;
        color: #ffffff;
        font-size: 24rpx;
      }
      .goods-bottom__disable {
        width: 160rpx;
        height: 56rpx;
        line-height: 56rpx;
        text-align: center;
        background: #f6f7f8;
        border: 2rpx solid #f6f7f8;
        border-radius: 64rpx;
        font-size: 24rpx;
        color: $v-c0-25;
      }
      &__time {
        line-height: 36rpx;
        color: $v-c0-65;
        font-size: 24rpx;
        margin-top: 8rpx;
      }
    }
  }
  .goods-sign {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    background: #e50012;
    font-size: 24rpx;
    color: #fff;
    width: 80rpx;
    height: 36rpx;
    line-height: 36rpx;
    border-radius: 8rpx 0 16rpx;
    text-align: center;
  }
</style>
