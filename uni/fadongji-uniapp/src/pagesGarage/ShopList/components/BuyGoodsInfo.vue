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
        <view v-if="showArrive" class="fz-24 color-block-45 m-b-10 lh36">
          <view class="flex1 overEllipsis">
            {{ goodInfo.shopName }}
          </view>
        </view>
        <view class="fz-24 color-block-45 lh150 m-t-8 flex flex-vertical-c flex-wrap">
          <text v-if="goodInfo.deliveryAreaName" class="address m-r-16">
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
          <!--          <text v-if="showArrive">-->
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
          v-if="
            goodInfo.accountPrice &&
            goodInfo.accountPeriodDays &&
            userInfo.companyId === goodInfo.shopId
          "
          class="m-t-14 flex flex-justify-around m-b-8"
        >
          <view class="text-center">
            <view class="color-block fz-24 m-b-6">现金价</view>
            <text class="fz-24 m-r-4 c-ff5319">¥</text>
            <VoPointPrice
              :leftSize="20"
              :price="goodInfo.cashPrice"
              class="font-din-bold"
              color="#ff5319"
              display="inline-block"
            />
          </view>
          <view class="text-center">
            <view class="color-block fz-24 m-b-6">{{ goodInfo.accountPeriodDays }}天账期</view>
            <text class="fz-24 m-r-4 c-ff5319">¥</text>
            <VoPointPrice
              :leftSize="20"
              :price="goodInfo.accountPrice"
              class="font-din-bold"
              color="#ff5319"
              display="inline-block"
            />
          </view>
        </view>
        <view v-else class="m-t-14 flex flex-wrap flex-vertical-base">
          <text class="fz-24 m-r-4 c-ff5319">¥</text>
          <VoPointPrice
            v-if="goodInfo.isTradeIn && goodInfo.tradeInFee > 0 && showNew"
            :leftSize="20"
            :price="decimalSubFn(goodInfo.cashPrice, goodInfo.tradeInFee)"
            class="font-din-bold"
            color="#ff5319"
            display="inline-block"
          />
          <VoPointPrice
            v-else
            :leftSize="20"
            :price="goodInfo.cashPrice"
            class="font-din-bold"
            color="#ff5319"
            display="inline-block"
          />
          <block v-if="goodInfo.isTradeIn && goodInfo.tradeInFee > 0 && showNew">
            <image class="trade-price m-l-8 m-r-8" src="/static/garage/pro/tradeInOldForNew.png" />
            <text class="fz-24 color-block-45 text-through">¥{{ goodInfo.cashPrice }}</text>
          </block>
          <image
            v-else-if="goodInfo.labelList && goodInfo.labelList.indexOf('秒杀') !== -1"
            class="cash-price m-l-8"
            src="/static/garage/pro/pricePerSecond.png"
          />
        </view>
        <!--        <view class="flex flex-vertical-b">-->
        <!-- <view class="buy-cash">
            {{ goodInfo.isTradeIn && goodInfo.tradeInFee > 0 ? '到手价' : '现金价' }}
          </view>
          <view class="buy-money">
            <VoPointPrice
              v-if="goodInfo.isTradeIn && goodInfo.tradeInFee > 0"
              :price="decimalSubFn(goodInfo.cashPrice, goodInfo.tradeInFee)"
              :show-unit="true"
              display="inline-block"
            />

            <VoPointPrice
              v-else
              :price="goodInfo.cashPrice"
              :show-unit="true"
              display="inline-block"
            />
          </view> -->
        <!--          <view class="price-btn text-center p-t-8 border-box">-->
        <!--            <view class="fz-24">-->
        <!--              {{ goodInfo.isTradeIn && goodInfo.tradeInFee > 0 ? '以旧换新价' : '现金价' }}-->
        <!--            </view>-->
        <!--            <VoPointPrice-->
        <!--              v-if="goodInfo.isTradeIn && goodInfo.tradeInFee > 0"-->
        <!--              :price="decimalSubFn(goodInfo.cashPrice, goodInfo.tradeInFee)"-->
        <!--              :show-unit="true"-->
        <!--              display="inline-block"-->
        <!--              color="#fff"-->
        <!--              :leftSize="16"-->
        <!--            />-->

        <!--            <VoPointPrice-->
        <!--              v-else-->
        <!--              :price="goodInfo.cashPrice"-->
        <!--              :show-unit="true"-->
        <!--              display="inline-block"-->
        <!--              color="#fff"-->
        <!--              :leftSize="16"-->
        <!--            />-->
        <!--          </view>-->
        <!--          <view-->
        <!--            class="flex flex-vertical-c fz-24 p-l-24"-->
        <!--            v-if="goodInfo.isTradeIn && goodInfo.tradeInFee > 0"-->
        <!--          >-->
        <!--            <view class="color-block-65 p-r-8">原价</view>-->
        <!--            <VoPointPrice-->
        <!--              :price="goodInfo.cashPrice"-->
        <!--              :show-unit="true"-->
        <!--              display="inline-block"-->
        <!--              color="rgba(0, 0, 0, 0.65)"-->
        <!--              :rightSize="14"-->
        <!--              :leftFontStyle="{ fontWeight: 'normal' }"-->
        <!--            />-->
        <!--          </view>-->
        <!--        </view>-->
        <view class="flex flex-wrap flex-vertical-c">
          <view v-if="goodInfo.isInstallation && goodInfo.installationFee > 0" class="flex m-r-16">
            <view
              class="buy-code color"
              :class="systemInfo.platform === 'android' ? 'b-radius-8' : ''"
              >安装 +¥{{ goodInfo.installationFee }}</view
            >
          </view>
          <view
            v-if="goodInfo.isTradeIn && goodInfo.tradeInFee > 0 && showNew"
            class="flex m-r-16"
            :class="systemInfo.platform === 'android' ? 'b-radius-8' : ''"
          >
            <view class="buy-code blue">以旧换新 -¥{{ goodInfo.tradeInFee }}</view>
          </view>
          <view
            v-if="goodInfo.isCoding && goodInfo.codingPrice > 0"
            class="flex m-r-16"
            :class="systemInfo.platform === 'android' ? 'b-radius-8' : ''"
          >
            <view class="buy-code color">定制 +¥{{ goodInfo.codingPrice }}</view>
          </view>
          <view
            v-if="
              goodInfo.isTradeIn &&
              goodInfo.tradeInFee > 0 &&
              goodInfo.labelList &&
              goodInfo.labelList.indexOf('秒杀') !== -1 &&
              showNew
            "
            :class="systemInfo.platform === 'android' ? 'b-radius-8' : ''"
            class="flex m-r-16"
          >
            <view class="buy-code color">秒杀</view>
          </view>
          <view
            v-if="goodInfo.labelList && goodInfo.labelList.indexOf('质保时长') !== -1"
            class="flex"
          >
            <view
              class="buy-code no-order-orange"
              :class="systemInfo.platform === 'android' ? 'b-radius--8' : ''"
            >
              {{ goodInfo.warrantyDays ? `${goodInfo.warrantyDays}个月质保` : '' }}
            </view>
          </view>
          <!--          <VoTooltip-->
          <!--            v-if="goodInfo.isTradeIn && goodInfo.tradeInFee > 0"-->
          <!--            :arrowStyleSelf="{ left: '110rpx' }"-->
          <!--            :padding="8"-->
          <!--            class="fz-0 tips m-t-16"-->
          <!--            placement="bottom"-->
          <!--          >-->
          <!--            <view slot="content">-->
          <!--              <view>用于重生之翼再制造</view>-->
          <!--            </view>-->
          <!--            <VoIcon :opacity="0.45" :size="16" color="#000000" name="account-question" />-->
          <!--          </VoTooltip>-->
        </view>
        <view
          v-if="goodInfo.isTradeIn && goodInfo.tradeInFee > 0 && showNew"
          class="buy-sign flex flex-vertical-c"
        >
          用于重生之翼再制造
        </view>

        <!--        <view class="buy-time flex flex-vertical-c flex-justify-between">-->
        <!--          <view>-->
        <!--            <text class="m-r-16" v-if="goodInfo.deliveryAreaName">-->
        <!--              {{ goodInfo.deliveryAreaName }}发货-->
        <!--            </text>-->
        <!--           注释到货时效 -->
        <!--            <text v-if="goodInfo.arrivalTime">预计{{ formateTime(goodInfo.arrivalTime) }}送达</text>-->
        <!--          </view>-->
        <!--          <view>-->
        <!--            月销量：-->
        <!--            <block v-if="goodInfo.monthlySalesVolume">-->
        <!--              <block v-if="+goodInfo.monthlySalesVolume > 10000">-->
        <!--                {{ Math.ceil(+goodInfo.monthlySalesVolume / 1000) / 10 }}万台-->
        <!--              </block>-->
        <!--              <block v-else>{{ goodInfo.monthlySalesVolume }}台</block>-->
        <!--            </block>-->
        <!--            <block v-else>0台</block>-->
        <!--          </view>-->
        <!--        </view>-->
      </view>
    </view>
    <view class="flex flex-justify-between flex-vertical-c m-t-32 fz-24">
      <!--  跳转新页面-只做静态页面		-->
      <!--      <view class="buy-guidance m-r-16" @click.stop="goDetailClick(goodInfo)">安装指导</view>-->
      <!--      <view class="buy-guidance m-r-16" @click.stop="goSupportClick(goodInfo)">技术支持</view>-->
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
      >
        <block v-if="!showNew">推送商品</block>
        <block v-else>立即购买</block>
      </view>
      <view v-else class="buy-button" @click.stop="BuyNow">
        <block v-if="!showNew">推送商品</block>
        <block v-else>立即购买</block>
      </view>
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
      showArrive: {
        type: Boolean,
        default: true,
      },
      showNew: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        systemInfo: {},
      }
    },
    created() {
      console.log(this.$systemInfo)
      this.systemInfo = this.$systemInfo
      if (this.goodInfo.arrivalTime) {
        this.arrivalTime = this.formateTime(this.goodInfo.arrivalTime)
      }
    },
    methods: {
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
      goDetailClick(data) {
        this.$linkToEasy(
          `/pagesGarage/ShopList/GoodsDetail?id=${data.goodId}&wid=${
            data.warehouseId
          }&current=${1}`,
        )
      },
      goSupportClick() {
        goOnlineCustomerFn(2)
        // console.log(data)
        // const info = {
        //   targetId: data.shopUserId,
        //   type: 0,
        //   note: data.shopName,
        //   platformCode: data.platformCode,
        // }
        // this.$storage.set('temp_im_room_info', info)
        // this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
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
      z-index: 99;
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
        font-size: 36rpx;
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
    .price-btn {
      background-image: url('/static/common/price_button.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      min-width: 220rpx;
      height: 88rpx;
      color: #fff;
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
      line-height: 28rpx;
      font-size: 20rpx;
      color: $v-c0-85;
      margin-top: 8rpx;
      padding: 0 4rpx;
      box-sizing: border-box;
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
      margin-top: 16rpx;
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
      background: #F6F7F8;
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
  .address {
    max-width: 250rpx;
  }
</style>
