<template>
  <view>
    <block v-for="(info, index) of goodsList">
      <view v-if="index < 3" :key="info.id" class="goods" @click="goDetailFn(info)">
        <view class="goods-line" />
        <view class="goods-list">
          <view class="flex">
            <view class="image_con">
              <view v-if="isPreSale" class="tag">预售</view>
              <block v-if="info.pic && info.pic.length">
                <image
                  v-if="info.pic[0].split('.').pop() === 'mp4'"
                  :src="info.pic[0]+'&type=3'"
                  class="goods-list__img"
                />
                <image
                  v-else
                  :src="info.pic[0]+'&type=1'"
                  class="goods-list__img"
                />
              </block>
            </view>
            <view class="flex1 m-l-16">
              <view>
                <text class="goods-list__type">{{ info.level }}类</text>
                <text class="m-t-8 lh48 h56 fz-b fz-32">{{ info.goodsName }}</text>
              </view>
              <view class="flex goods-list__tips">
                <view class="m-r-20">{{ info.deliveryAreaName }}</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view class="flex flex-vertical-c">
                  <view class="goods-list__cash">现金</view>
                  <VoPointPrice
                    :leftSize="14"
                    :price="info.payPrice"
                    :showUnit="true"
                    class="lh42"
                    color="#E50012"
                  />
                </view>
                <view class="number m-r-32">x{{ info.goodsCount }}</view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <block v-else>
        <view v-show="show" :key="info.id" class="goods" @click="goDetailFn(info)">
          <view class="goods-line" />
          <view class="goods-list">
            <view class="flex">
              <view class="image_con">
                <view v-if="isPreSale" class="tag">预售</view>
                <block v-if="info.pic && info.pic.length">
                  <image
                    v-if="info.pic[0].split('.').pop() === 'mp4'"
                    :src="info.pic[0]+'&type=3'"
                    class="goods-list__img"
                  />
                  <image
                    v-else
                    :src="info.pic[0]+'&type=1'"
                    class="goods-list__img"
                  />
                </block>
              </view>
              <view class="flex1 m-l-16">
                <view>
                  <text class="goods-list__type">{{ info.level }}类</text>
                  <text class="m-t-8 lh48 h56 fz-b fz-32">{{ info.goodsName }}</text>
                </view>
                <view class="flex goods-list__tips">
                  <view class="m-r-20">{{ info.deliveryAreaName }}</view>
                </view>
                <view class="flex flex-vertical-c flex-justify-between m-t-16">
                  <view class="flex flex-vertical-c">
                    <view class="goods-list__cash">现金</view>
                    <VoPointPrice
                      :leftSize="14"
                      :price="info.payPrice"
                      :showUnit="true"
                      class="lh42"
                      color="#E50012"
                    />
                  </view>
                  <view class="number m-r-32">x{{ info.goodsCount }}</view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </block>
    </block>
    <view
      v-if="goodsList.length > 3"
      class="lookMore flex flex-vertical-c flex-justify-c"
      @click.stop="show = !show"
    >
      <view v-if="show">收起</view>
      <view v-else>查看更多</view>
      <VoIcon :class="{ show: show }" :size="16" name="open" />
    </view>
  </view>
</template>

<script>
  export default {
    name: 'GoodsList',
    props: {
      isPreSale: {
        type: Boolean,
        default: true, // 0:商品 1：预售
      },
      goodsList: {
        type: Array,
        default() {
          return []
        },
      },
    },
    data() {
      return {
        timeData: {},
        show: false, // 查看更多
      }
    },
    mounted() {
      console.log(this.isPreSale)
    },
    methods: {
      goDetailFn(item) {
        this.$emit('clickGood', item)
      },
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
    },
  }
</script>

<style lang="scss" scoped>
  .goods {
    &-list {
      padding: 24rpx 32rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
      &__img {
        width: 128rpx;
        height: 128rpx;
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
        border-radius: 4rpx;
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
      &__time {
        line-height: 36rpx;
        color: $v-c0-65;
        font-size: 24rpx;
        margin-top: 8rpx;
      }
    }
  }
  .lookMore {
    color: $v-c0-45;
    font-size: 24rpx;
    .show {
      transition: all 0.5s;
      transform: rotate(180deg);
    }
  }
  .number {
    font-size: 24rpx;
    font-weight: bold;
    color: $v-c0-45;
    text-align: right;
  }
  .image_con {
    position: relative;
    border-radius: 8rpx;
    overflow: hidden;
    .tag {
      position: absolute;
      top: 0;
      left: 0;
      background-color: #f20014;
      border-radius: 8rpx 0 8rpx 0;
      z-index: 2;
      width: 80rpx;
      height: 32rpx;
      font-size: 24rpx;
      color: #fff;
      text-align: center;
      line-height: 32rpx;
      box-sizing: border-box;
    }
  }
</style>
