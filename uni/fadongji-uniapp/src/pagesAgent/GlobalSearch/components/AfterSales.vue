<template>
  <view class="after">
    <view class="lh42 fz-28 color-block-65">下单时间：{{ itemData.createTime }}</view>
    <view class="flex flex-vertical-c m-t-32">
      <VoIcon name="smile-m" @click.stop="goImUrl" />
      <view class="fz-28 color-block-main m-l-8" @click.stop="toShopPage">
        {{ itemData.shopName }}
      </view>
      <VoIcon :size="16" name="right-arrow" />
    </view>
    <view v-if="itemData.goodsDetail[0].goodsName" class="m-t-16 flex">
      <block v-if="itemData.goodsDetail[0].pic.length">
        <block v-if="itemData.goodsDetail[0].pic[0].split('.').pop() === 'mp4'">
          <image :src="`${itemData.goodsDetail[0].pic[0]}&type=3`" class="after-photo" />
        </block>
        <image v-else :src="itemData.goodsDetail[0].pic[0] + '&type=1'" class="after-photo" />
      </block>
<!--      <image class="after-photo" :src="itemData.goodsDetail[0].pic[0] + '&type=1'" />-->
      <view class="flex1 m-l-16">
        <view class="after-name">
          <text v-show="itemData.goodsDetail[0].categoryType" class="good-tips m-r-8">
            {{ itemData.goodsDetail[0].categoryType }}
          </text>
          {{ itemData.goodsDetail[0].goodsName }}
        </view>
        <view class="flex flex-vertical-c flex-justify-between m-t-16">
          <view class="flex flex-vertical-c">
            <view class="tips">
              {{ itemData.goodsDetail[0].periodDays > 0 ? `${itemData.goodsDetail[0].periodDays}天账期` : '现金价' }}
            </view>
            <VoPointPrice
              :leftSize="14"
              :showUnit="true"
              class="lh42"
              color="#F20014"
              :price="itemData.goodsDetail[0].payPrice || 0"
            />
          </view>
          <view class="fz-24 color-block-45">x{{ itemData.goodsDetail[0].goodsCount }}</view>
        </view>
      </view>
    </view>
    <view class="m-t-32 flex flex-justify-r">
      <view class="after-sales flex flex-vertical-c flex-justify-c" @click="goOnline">
        <VoIcon :size="20" name="smile-m" />
        <view>售后服务</view>
      </view>
      <view class="after-rapid" @click="toApply">极速售后</view>
    </view>
  </view>
</template>

<script>
  import { goOnlineCustomerFn } from '@/common/helper'
  export default {
    name: 'AfterSales',
    props: {
      itemData: {
        type: Object,
        default: () => {},
      },
      code: {
        type: String,
        default: '',
      },
    },
    methods: {
      goImUrl() {
        const data = {
          targetId: this.itemData.shopUserId,
          type: 0,
          note: this.itemData.goodsDetail[0].shopName,
          platformCode: this.itemData.shopPlatformCode,
        }
        this.$storage.set('temp_im_room_info', data)
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
      },
      toApply() {
        this.$linkToEasy(`/pagesGarage/PostSaleService/ApplyPostSaleService?id=${this.itemData.id}&engineNo=${this.code}`)
      },
      goOnline() {
        goOnlineCustomerFn(2)
      },
      toShopPage() {
        this.$linkToEasy(
          '/pagesAgent/InvestmentList/ShopDetails?companyId=' + this.itemData.goodsDetail[0].shopId,
        )
      },
    },
  }
</script>

<style lang="scss" scoped>
  .after {
    padding: 24rpx 32rpx 32rpx;
    &-photo {
      width: 160rpx;
      height: 160rpx;
      border-radius: 8rpx;
      overflow: hidden;
      display: block;
    }
    &-name {
      line-height: 48rpx;
      font-weight: bold;
      font-size: 32rpx;
      color: #22284b;
    }
    &-sales {
      width: 184rpx;
      height: 56rpx;
      box-sizing: border-box;
      border: 2rpx solid #22284b;
      border-radius: 100rpx;
      font-size: 24rpx;
      margin-right: 32rpx;
    }
    &-rapid {
      width: 160rpx;
      height: 56rpx;
      line-height: 56rpx;
      text-align: center;
      box-sizing: border-box;
      border: 2rpx solid #ff5319;
      border-radius: 56rpx;
      color: #ff5319;
      font-size: 24rpx;
    }
    .tips {
      padding: 0 4rpx;
      height: 28rpx;
      line-height: 28rpx;
      text-align: center;
      background: #ffe5e8;
      border: 2rpx solid #fa3243;
      border-radius: 4rpx;
      font-size: 24rpx;
      color: #fa3243;
      margin-right: 8rpx;
    }
    .good-tips {
      height: 36rpx;
      line-height: 36rpx;
      font-size: 24rpx;
      color: $color-primary-yellow;
      padding: 0 12rpx;
      background: $v-tags-btn-disabled;
      border-radius: 24rpx;
    }
  }
</style>
