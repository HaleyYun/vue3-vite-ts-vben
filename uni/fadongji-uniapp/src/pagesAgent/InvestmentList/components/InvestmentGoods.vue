<template>
  <view class="info" @click="goProjectDetails">
    <view class="info-top">
      <view class="flex fz-b fz-32 lh48 color-block overTwoEllipsis m-r-24"
        >
        <text v-show="dataObj.categoryType" class="good-tips m-r-8">{{dataObj.categoryType}}</text>
        <text>{{ dataObj.name }}</text>
        <text class="color-block-yellow m-l-32">{{ dataObj.avaInvestment || 0 }}台</text>
      </view
      >
      <view v-if="dataObj.label && dataObj.label.length" class="flex flex-vertical-c m-t-8">
        <view v-for="(item, index) of dataObj.label" :key="index" class="info-top__box">{{
          item
        }}</view>
        <!-- <view class="info-top__box" v-if="dataObj.isHighBenefit">高收益</view>
        <view class="info-top__box" v-if="dataObj.isHighBenefit">持有人数多</view> -->
      </view>
      <view class="flex flex-vertical-c m-t-32">
        <view class="info-top__block flex flex-column flex-vertical-c">
          <view class="block-money">
            <VoPointPrice :price="dataObj.cashPrice" color="#FF5319" display="inline-block" />
          </view>
          <view class="block-tips">现金价</view>
        </view>
        <view
          class="info-top__block flex flex-column flex-vertical-c"
          v-if="dataObj.accountPeriodDays && dataObj.accountPrice"
        >
          <view class="block-money">
            <VoPointPrice
              :price="dataObj.accountPrice"
              :show-unit="true"
              color="#FF5319"
              display="inline-block"
            />
          </view>
          <view class="block-tips">{{ dataObj.accountPeriodDays }}天账期</view>
        </view>
        <view class="info-top__block flex flex-column flex-vertical-c">
          <view class="block-money"> {{ dataObj.startNumber }}台 </view>
          <view class="block-tips">起批量</view>
        </view>
        <view class="info-top__block flex flex-column flex-vertical-c">
          <view class="block-money text-nowrap">
            <text class="fz-24 color-block-yellow">约</text>
            <text class="fz-b color-block-yellow">{{ dataObj.rol }}%</text>
          </view>
          <view class="block-tips flex flex-vertical-c"
            >回报率
            <VoTooltip :conLeft="15" :padding="8" placement="bottom">
              <view slot="content">
                <view>具体回报率以实际收益</view>
                <view>为准</view>
              </view>
              <VoIcon
                :opacity="0.45"
                :size="16"
                color="#000000"
                name="account-question"
              /> </VoTooltip
          ></view>
        </view>
      </view>
      <view class="info-bottom__right flex flex-justify-r">
        <view v-if="dataObj.queryType === 'L'" class="right-button left" @click.stop="addShop">
          加入备货车
        </view>
        <view class="right-button right m-l-24" @click.stop="buyShop">订购</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'InvestmentGoods',
    props: {
      dataObj: {
        type: Object,
        require: true,
      },
    },
    methods: {
      goProjectDetails() {
        this.$linkToEasy(
          '/pagesAgent/InvestmentList/ProjectDetails?id=' +
            this.dataObj.id +
            '&queryType=' +
            this.dataObj.queryType,
        )
        this.$emit('goProjectDetails')
      },
      addShop() {
        this.$emit('addShop')
      },
      buyShop() {
        this.$emit('buyShop')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .info {
    width: 750rpx;
    background: #fff;
    margin-top: 16rpx;
    &-top {
      padding: 24rpx 0 24rpx 32rpx;
      border-bottom: 2rpx solid $v-bg-light;
      box-sizing: border-box;
      &__box {
        height: 36rpx;
        line-height: 36rpx;
        padding: 0 24rpx;
        background: #f7f7f8;
        border-radius: 8rpx;
        font-size: 24rpx;
        margin-right: 16rpx;
      }
      &__block {
        padding: 8rpx 0rpx;
        width: 160rpx;
        justify-content: center;
        background: #f7f7f8;
        border-radius: 8rpx;
        margin-right: 16rpx;
        .block-money {
          height: 42rpx;
          line-height: 42rpx;
          font-size: 28rpx;
          color: $color-primary-yellow;
        }
        .block-tips {
          line-height: 36rpx;
          font-size: 24rpx;
          color: $v-c0-65;
          margin-top: 4rpx;
        }
        .tips-img {
          width: 24rpx;
          height: 24rpx;
        }
      }
    }
    .info-bottom__right {
      padding-top: 24rpx;
      padding-right: 32rpx;
      .right-button {
        width: 144rpx;
        height: 56rpx;
        line-height: 56rpx;
        font-size: 24rpx;
        text-align: center;
        border-radius: 36rpx;
        box-sizing: border-box;
        &.left {
          border: 2rpx solid #d3d4db;
          color: $v-c0-85;
        }
        &.right {
          border: 2rpx solid #ff5319;
          color: #ff5319;
        }
      }
    }
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
</style>
