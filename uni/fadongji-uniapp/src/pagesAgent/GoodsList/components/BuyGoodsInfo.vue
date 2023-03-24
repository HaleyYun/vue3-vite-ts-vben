<template>
  <view v-if="goodInfo" class="buy">
    <view class="flex relative">
      <view
        v-if="goodInfo.warnLabel && goodInfo.warnLabel === '无货' && +goodInfo.inventory < 1"
        class="mian-tag"
      >
        无货
      </view>
      <view v-else-if="goodInfo.warnLabel && goodInfo.warnLabel !== '无货'" class="mian-tag">
        {{ goodInfo.warnLabel }}
      </view>
      <view class="buy-img">
        <image
          v-if="goodInfo.labelList && goodInfo.labelList.indexOf('爆款') !== -1"
          class="hotBorder"
          src="/static/garage/pro/hotBorder.png"
        />
        <block v-if="goodInfo && goodInfo.pic">
          <image
            v-if="
              goodInfo.pic.split('.').pop() === 'mp4' || goodInfo.pic.split('.').pop() === 'MP4'
            "
            :src="`${goodInfo.pic}&type=3`"
            class="img"
          />
          <image v-else :src="goodInfo.pic + '&type=1'" class="img" />
        </block>
      </view>
      <view class="flex1 overflow-hidden">
        <view class="buy-name overTwoEllipsis">
          <text v-show="goodInfo.categoryType" class="buy-name__tips font-shu-hei-ti m-r-8">
            {{ goodInfo.categoryType }}
          </text>
          <text class="buy-name__word">{{ goodInfo.name }}</text>
        </view>
        <view class="fz-24 color-block-45 m-t-8 m-b-10 flex flex-vertical-c">
          <view class="flex1 overEllipsis">{{ goodInfo.shopName }}</view>
        </view>
        <view class="fz-24 color-block-45 lh150 m-t-8 flex flex-vertical-c flex-justify-between">
          <text v-if="goodInfo.deliveryAreaName" class="m-r-16">
            {{ goodInfo.deliveryAreaName }}发货
          </text>
          <view class="saleCount">
            <text class="m-r-16">月销量</text>
            <block v-if="goodInfo.monthlySalesVolume">
              <block v-if="+goodInfo.monthlySalesVolume > 10000">
                {{ Math.ceil(+goodInfo.monthlySalesVolume / 1000) / 10 }}万台
              </block>
              <block v-else>{{ goodInfo.monthlySalesVolume }}台</block>
            </block>
            <block v-else>0台</block>
          </view>
          <!--          <text>-->
          <!--            <block v-if="goodInfo.platformCode === 'agent'">-->
          <!--              <block v-if="goodInfo.ownWarehouseNum && goodInfo.ownWarehouseNum > 0">-->
          <!--                预计12小时内送达-->
          <!--              </block>-->
          <!--              <block v-else>次日达</block>-->
          <!--            </block>-->
          <!--            <block v-else-if="goodInfo.platformCode === 'supplier'">-->
          <!--              <block v-if="arrivalTime">预计{{ arrivalTime }}送达</block>-->
          <!--            </block>-->
          <!--          </text>-->
        </view>

        <view
          v-if="(!goodInfo.accountPrice && !goodInfo.accountPeriodDays) || queryType === 'A'"
          class="m-t-14"
        >
          <text class="fz-24 m-r-4 c-ff5319">¥</text>
          <VoPointPrice
            :leftSize="20"
            :price="goodInfo.cashPrice"
            color="#ff5319"
            class="font-din-bold"
            display="inline-block"
          />
          <image
            v-if="goodInfo.labelList && goodInfo.labelList.indexOf('秒杀') !== -1"
            class="cash-price m-l-8"
            src="/static/garage/pro/pricePerSecond.png"
          />
        </view>
        <view v-else class="m-t-14 flex flex-justify-around m-b-8">
          <view class="text-center">
            <view class="color-block fz-24 m-b-6">现金价</view>
            <text class="fz-24 m-r-4 c-ff5319">¥</text>
            <VoPointPrice
              :price="goodInfo.cashPrice"
              display="inline-block"
              class="font-din-bold"
              color="#ff5319"
              :leftSize="20"
            />
          </view>
          <view class="text-center">
            <view class="color-block fz-24 m-b-6">{{ goodInfo.accountPeriodDays }}天账期</view>
            <text class="fz-24 m-r-4 c-ff5319">¥</text>
            <VoPointPrice
              :price="goodInfo.accountPrice"
              display="inline-block"
              class="font-din-bold"
              color="#ff5319"
              :leftSize="20"
            />
          </view>
        </view>
        <view class="flex flex-wrap flex-vertical-c">
          <view v-if="goodInfo.isInstallation" class="flex m-r-16">
            <view
              class="buy-code color"
              :class="systemInfo.platform === 'android' ? 'b-radius-8' : ''"
              >安装 +{{ goodInfo.installationFee }}</view
            >
          </view>
          <view v-if="goodInfo.isCoding" class="flex m-r-16">
            <view
              class="buy-code color"
              :class="systemInfo.platform === 'android' ? 'b-radius-8' : ''"
              >定制 +{{ goodInfo.codingPrice }}</view
            >
          </view>
          <view
            v-if="
              goodInfo.labelList &&
              goodInfo.labelList.indexOf('秒杀') !== -1 &&
              queryType === 'L' &&
              goodInfo.accountPrice &&
              goodInfo.accountPeriodDays
            "
            class="flex m-r-16"
          >
            <view
              class="buy-code color"
              :class="systemInfo.platform === 'android' ? 'b-radius-8' : ''"
              >秒杀</view
            >
          </view>
          <view
            v-if="goodInfo.labelList && goodInfo.labelList.indexOf('质保时长') !== -1"
            class="flex"
          >
            <view
              class="buy-code no-order-orange"
              :class="systemInfo.platform === 'android' ? 'b-radius-8' : ''"
            >
              {{ goodInfo.warrantyDays ? `${goodInfo.warrantyDays}个月质保` : '' }}
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="flex flex-justify-between flex-vertical-c m-t-32 fz-24">
      <!--  跳转新页面-只做静态页面		-->
      <view
        class="fz-28 color-block-45 flex flex-vertical-c"
        @click.stop="goSupportClick(goodInfo)"
      >
        技术支持
        <VoIcon :opacity="0.45" class="m-l-12" color="#000" name="arrow-right" size="16" />
      </view>
      <view
        v-if="goodInfo.warnLabel && goodInfo.warnLabel === '无货' && +goodInfo.inventory < 1"
        class="buy-button buy-button1"
        >推送商品</view
      >
      <view v-else class="buy-button" @click.stop="BuyNow">推送商品</view>
    </view>
  </view>
</template>

<script>
  import { goOnlineCustomerFn } from '@/common/helper'

  export default {
    name: 'BuyGoodsInfo',
    props: {
      goodInfo: {
        type: Object,
        default() {
          return {
            arrivalTime: '',
          }
        },
      },
      queryType: {
        type: String,
        default: '',
      },
      companyId: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        systemInfo: {},
      }
    },
    created() {
      // console.log(this.$systemInfo)
      this.systemInfo = this.$systemInfo
      if (this.goodInfo.arrivalTime) {
        this.arrivalTime = this.formateTime(this.goodInfo.arrivalTime)
      }
    },

    methods: {
      goDetailClick(data) {
        console.log(data, 'xx')
        this.$linkToEasy(
          `/pagesAgent/GoodsList/GoodsDetail?id=${data.goodId}&wid=${data.warehouseId}&companyId=${this.companyId}&current=1&target=install`,
        )

        // return
        // this.$linkToEasy(
        //   `/pagesAgent/ShopList/GoodsDetail?id=${data.goodId}&wid=${data.warehouseId}&current=${1}`,
        // )
      },
      goSupportClick() {
        goOnlineCustomerFn(2)
      },
      getPic(url) {
        if (this.$vocenApi.Pattern.isVideoUrl(url.toLocaleLowerCase())) {
          return url + '&type=3'
        } else {
          return url
        }
      },
      formateTime(day) {
        let val = day * 24
        if (val <= 12) {
          return '12小时内'
        } else if (val <= 24) {
          return '24小时内'
        } else if (val <= 36) {
          return '36小时内'
        } else if (val <= 48) {
          return '48小时内'
        } else {
          return this.$vocenApi.dayjs().add(parseInt(day), 'day').format('MM月DD日')
        }
      },
      BuyNow() {
        this.$emit('BuyNow')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .buy {
    width: 750rpx;
    margin-top: 16rpx;
    background: #fff;
    padding: 24rpx 32rpx 32rpx;
    box-sizing: border-box;
    .mian-tag {
      position: absolute;
      z-index: 9;
      top: 86rpx;
      left: 86rpx;
      color: #fff;
      font-size: 28rpx;
      width: 96rpx;
      height: 96rpx;
      text-align: center;
      line-height: 96rpx;
      background: rgba(0, 0, 0, 0.65);
      border-radius: 50%;
      font-weight: 400;
    }

    &-img {
      width: 268rpx;
      height: 268rpx;
      margin-right: 16rpx;
      border-radius: 24rpx;
      overflow: hidden;
      flex-shrink: 0;
      position: relative;
      .hotBorder {
        position: absolute;
        left: 0;
        top: 0;
        width: 268rpx;
        height: 268rpx;
        z-index: 1;
      }
      .img {
        width: 268rpx;
        height: 268rpx;
      }
    }

    &-name {
      line-height: 48rpx;
      font-size: 32rpx;

      &__tips {
        //height: 36rpx;
        //line-height: 36rpx;
        //font-size: 32rpx;
        //color: $color-primary-yellow;
        color: #f20014;
        font-weight: 700;
        font-size: 36rpx;
        //padding: 0 12rpx;
        //background: $v-tags-btn-disabled;
        //border-radius: 24rpx;
      }

      &__word {
        font-weight: bold;
        //font-size: 28rpx;
        color: $v-c0-85;
      }
    }

    &-cash {
      height: 28rpx;
      line-height: 28rpx;
      font-size: 24rpx;
      color: #ec404d;
      padding: 2rpx 4rpx;
      background: #fdf2f3;
      border: 2rpx solid #ec404d;
      border-radius: 4rpx;
      margin-right: 8rpx;
    }

    &-money {
      height: 42rpx;
      line-height: 42rpx;
      font-size: 28rpx;
      color: #e50012;
    }

    &-code {
      height: 24rpx;
      line-height: 24rpx;
      font-size: 20rpx;
      color: $v-c0-85;
      margin-bottom: 16rpx;
      margin-top: 6rpx;
      padding: 0 4rpx;
      background: #fff;
      border: 2rpx solid #d3d4db;
      border-radius: 4rpx;
      &.color {
        color: #ff5319;
        border: 2rpx solid #ff5319;
      }
      &.blue {
        color: #2676ff;
        border: 2rpx solid #2676ff;
      }
      &.no-order-orange {
        color: #262626;
        border: 2rpx solid transparent;
        background-color: #ffe2b8;
      }
    }

    &-sign {
      background: #f7f7f8;
      border-radius: 40rpx;
      color: rgba(0, 0, 0, 0.65);
      font-size: 24rpx;
      padding: 2rpx 16rpx;
      width: fit-content;
    }

    &-time {
      line-height: 36rpx;
      margin-top: 24rpx;
      font-size: 24rpx;
      color: $v-c0-45;
    }

    &-guidance {
      line-height: 36rpx;
      padding: 10rpx 32rpx;
      border: 2rpx solid $v-c0-25;
      border-radius: 48rpx;
      color: $v-c0-85;
    }

    &-button {
      line-height: 36rpx;
      padding: 10rpx 32rpx;
      color: #fff;
      background: linear-gradient(270.27deg, #ff5622 8.32%, #ff8640 93.91%);
      border-radius: 30rpx;
      //border: 2rpx solid $color-primary-yellow;
    }
    &-button1 {
      background: #f6f7f8;
      color: $v-c0-25;
    }
  }
  .c-ff5319 {
    color: #ff5319;
  }
  .trade-price {
    width: 112rpx;
    height: 28rpx;
    display: inline-block;
  }
  .cash-price {
    width: 72rpx;
    height: 28rpx;
    display: inline-block;
  }
  .saleCount {
    width: 162rpx;
    flex-shrink: 0;
    //margin-left: 16rpx;
  }
</style>
