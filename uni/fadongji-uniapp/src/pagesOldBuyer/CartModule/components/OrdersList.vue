<template>
  <view class="order">
    <block v-if="!disabled">
      <view class="order-list">
        <view class="order-list__border">
          <view class="fz-b fz-28 m-r-16 color-block">{{ info.warehouseName }}</view>
          <view class="fz-24 color-block-45 m-t-8">
            <block v-if="info.deliveryAreaName">{{ info.deliveryAreaName }}发货</block>
            <text v-if="info.arrivalTime" class="color-orange m-l-12">
              （预计{{
                info.arrivalTime || $vocenApi.dayjs(info.deliveryTime).format('YYYY年MM月DD日')
              }}小时内发货）
            </text>
            <text v-else class="color-orange m-l-12">
              （预计{{ $vocenApi.dayjs(info.deliveryTime).format('YYYY年MM月DD日') }}发货）
            </text>
          </view>
        </view>
        <view
          v-for="(good, goodIndex) of info.cartDetailstList"
          :key="goodIndex"
          class="flex m-t-16"
        >
          <view class="order-imgBox">
            <block v-if="Object.prototype.toString.call(good.picture) === '[object Array]'">
              <image
                v-if="good.picture[0].split('.').pop() === 'mp4'"
                :src="good.picture[0] + '&type=3'"
                class="order-img"
              />
              <image v-else :src="good.picture[0] + '&type=1'" class="order-img" />
            </block>
            <block v-else>
              <image
                v-if="good.picture.split('.').pop() === 'mp4'"
                :src="good.picture + '&type=3'"
                class="order-img"
              />
              <image v-else :src="good.picture + '&type=1'" class="order-img" />
            </block>
            <text v-show="good.isPress" class="goods-sign">预售</text>
          </view>

          <view class="flex1">
            <view class="fz-b fz-32 lh48 color-block">
              <text class="type-sign">{{ good.level }}类</text>
              <text>{{ good.name }}</text>
            </view>
            <view class="order-free order-stock m-t-8">
              {{ Number(good.shippingType) === 1 ? '包邮' : '到付' }}
            </view>
            <view class="flex flex-justify-between flex-vertical-c m-t-16">
              <!--   金额   -->
              <view class="flex flex-vertical-c">
                <view class="order-cash m-r-8">{{
                  Number(good.isCash) === 1 ? '现金' : '账期'
                }}</view>
                <view class="color-red lh42">
                  <VoPointPrice
                    :price="Number(good.isCash) === 1 ? good.price : good.accountPrice"
                    :show-unit="true"
                  />
                </view>
              </view>
              <!--     商品在该地区暂不支持购买     -->
              <!--     <view class="color-red fz-28 lh42">商品在该地区暂不支持购买</view>     -->
              <view class="lh40 color-block-45 fz-26">X{{ good.goodsCount }}</view>
            </view>
            <!-- <view class="order-inventory">库存紧张</view> -->
          </view>
        </view>
        <!--        <view class="flex flex-justify-between fz-28 lh150 m-t-24" @click="toRemark">-->
        <view class="flex flex-justify-between flex-vertical-c fz-28 lh150 m-t-24">
          <view class="color-block">备注：</view>
          <u-input
            v-model.trim="content"
            border="none"
            clearable
            color="rgba(0, 0, 0, 0.65)"
            fontSize="14px"
            inputAlign="right"
            placeholder="请先和厂家协商一致"
            placeholderStyle="color:rgba(0, 0, 0, 0.25);font-size: 14px;"
            @input="changeRemark"
          />
          <!--          <view class="color-block-65 m-l-8">{{ remark || '请先和厂家协商一致' }}</view>-->
        </view>
      </view>
    </block>
    <view v-if="disabled" class="order-list">
      <view class="flex">
        <image class="order-img" src="/static/demo/rectangle.png" />
        <view class="flex1">
          <view class="fz-b fz-32 lh48 color-block-45">
            {{ info.goodsName }}
          </view>
          <view class="flex">
            <view class="order-free order-noStock m-t-8">{{
              Number(info.shippingType) === 1 ? '包邮' : '到付'
            }}</view>
          </view>
          <view class="flex flex-justify-between flex-vertical-c m-t-16">
            <view class="color-red fz-28 lh42">商品在该地区暂不支持购买</view>
            <view class="lh40 color-block-45 fz-26">X{{ info.goodsNum }}</view>
          </view>
          <!-- <view class="order-inventory">库存紧张</view> -->
        </view>
      </view>
      <!--      <view class="flex flex-justify-between fz-28 lh150 m-t-24" @click="toRemark">-->
      <view class="flex flex-justify-between flex-vertical-c fz-28 lh150 m-t-24">
        <view class="color-block">备注：</view>
        <u-input
          v-model.trim="content"
          border="none"
          clearable
          color="rgba(0, 0, 0, 0.65)"
          fontSize="14px"
          inputAlign="right"
          placeholder="请先和厂家协商一致"
          placeholderStyle="font-size: 14px;"
        />
        <!--        <view class="color-block-65 m-l-8">{{ remark || '请先和厂家协商一致' }}</view>-->
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'OrdersList',
    props: {
      remark: {
        type: String,
        require: '',
      },
      info: {
        type: Object,
        require: true,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        content: '',
      }
    },
    mounted() {
      console.log(this.info)
    },
    methods: {
      changeRemark(e) {
        console.log(e)
        console.log(this.info)
        this.$emit('update:remark', e)
      },
      toInvest() {
        this.$emit('toInvest')
      },
      toRemark() {
        if (this.disabled) return
        console.log(this.info)
        this.$linkToEasy('./OrderRemark?data=' + JSON.stringify(this.info))
      },
    },
  }
</script>

<style lang="scss" scoped>
  .order {
    //border-bottom: 2rpx solid $v-bg-light;
    &-list {
      padding: 24rpx 32rpx 24rpx 0;
      box-sizing: border-box;
      border-bottom: 2rpx solid $v-bg-light;
      &__border {
        padding-bottom: 16rpx;
        border-bottom: 2rpx solid $v-bg-light;
      }
    }

    &-imgBox {
      position: relative;
      background: transparent;
      border-radius: 8rpx;
      width: 128rpx;
      height: 128rpx;
      flex-shrink: 0;
      overflow: hidden;
      margin-right: 12rpx;
    }
    &-img {
      position: absolute;
      left: 0;
      top: 0;
      width: 128rpx;
      height: 128rpx;
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
    .type-sign {
      font-size: 24rpx;
      font-weight: 400;
      color: #ff5319;
      background: #ffece5;
      border-radius: 8rpx;
      padding: 4rpx 16rpx;
      margin-right: 8rpx;
    }
    &-free {
      height: 36rpx;
      line-height: 36rpx;
      padding: 0 16rpx;
      box-sizing: border-box;
      font-size: 24rpx;
      border-radius: 8rpx;
      display: inline-block;
    }
    &-stock {
      color: $v-c0-85;
      background: #f7f7f8;
    }
    &-noStock {
      border: 2rpx solid rgba(0, 0, 0, 0.45);
      color: $v-c0-45;
    }
    &-cash {
      font-size: 24rpx;
      color: #ec404d;
      line-height: 28rpx;
      padding: 2rpx 4rpx;
      box-sizing: border-box;
      background: #fdf2f3;
      border: 2rpx solid #ec404d;
      border-radius: 4rpx;
    }
    &-inventory {
      line-height: 36rpx;
      margin-top: 4rpx;
      font-size: 24rpx;
      color: #e50012;
      text-align: right;
    }
  }
  .color-orange {
    color: #ff5319;
  }
</style>
