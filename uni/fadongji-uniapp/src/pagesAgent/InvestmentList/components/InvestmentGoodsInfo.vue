<template>
  <view class="info" @click="goProjectDetails">
    <view class="info-top">
      <view class="flex flex-vertical-c fz-b fz-32 lh48 color-block overTwoEllipsis m-r-24">
        <text v-show="dataObj.categoryType" class="good-tips m-r-8">{{
          dataObj.categoryType
        }}</text>
        {{ dataObj.name }}
        <text class="color-block-yellow m-l-32">{{ dataObj.avaInvestment || 0 }}台</text>
      </view>
      <view v-if="dataObj.label && dataObj.label.length" class="flex flex-vertical-c m-t-8">
        <view v-for="item in dataObj.label" :key="item" class="info-top__box">{{ item }}</view>
        <!-- <view class="info-top__box" v-if="dataObj.isHighBenefit">高收益</view>
        <view class="info-top__box" v-if="dataObj.isHighBenefit">持有人数多</view> -->
      </view>
      <view class="flex flex-vertical-c m-t-32">
        <view class="info-top__block flex flex-column flex-vertical-c">
          <view class="block-money">
            <VoPointPrice :price="dataObj.cashPrice" color="#FF5319" display="inline-block" />
          </view>
          <view class="block-tips m-t-4">现金价</view>
        </view>
        <view
          v-if="dataObj && dataObj.accountPeriodDays > 0 && dataObj.accountPrice > 0"
          class="info-top__block flex flex-column flex-vertical-c"
        >
          <view class="block-money">
            <VoPointPrice
              v-if="dataObj.accountPrice"
              :price="dataObj.accountPrice"
              :show-unit="true"
              color="#FF5319"
              display="inline-block"
            />
            <text v-else class="color-block-yellow">--</text>
          </view>
          <view class="block-tips m-t-4">{{ dataObj.accountPeriodDays }}天账期</view>
        </view>
        <view class="info-top__block flex flex-column flex-vertical-c">
          <view class="block-money color-block-yellow"> {{ dataObj.startNumber || '--' }}台 </view>
          <view class="block-tips m-t-4">起批量</view>
        </view>
        <view class="info-top__block flex flex-column flex-vertical-c">
          <view class="block-money text-nowrap">
            <text class="fz-24 color-block-yellow">约</text>
            <text class="fz-b color-block-yellow">{{ dataObj.rol }}%</text>
          </view>
          <view class="flex flex-vertical-c m-t-4">
            <view class="block-tips m-r-4">回报率</view>
            <VoTooltip
              :arrowStyleSelf="{ left: '115px' }"
              :padding="8"
              class="fz-0 tips"
              placement="bottom"
            >
              <view slot="content">
                <view>具体回报率以实际收益</view>
                <view>为准</view>
              </view>
              <VoIcon :opacity="0.45" :size="16" color="#000000" name="account-question" />
            </VoTooltip>
          </view>
        </view>
      </view>
    </view>
    <view v-if="dataObj.shopName" class="info-bottom flex">
      <image :src="dataObj.storeUrl + '&type=1'" class="info-bottom__img" />
      <view class="flex1">
        <view class="flex flex-vertical-c">
          <view @click.stop="toIm" >
            <VoIcon :size="20" name="smile-m" />
          </view>
          <view class="info-bottom__text" @click.stop="toStoreHomePage">{{
            dataObj.shopName
          }}</view>
        </view>
        <view class="fz-24 m-t-8 color-block-45"
          >{{ dataObj.platformName }}{{ dataObj.isOpinionLeader ? ' | 意见领袖' : '' }}
        </view>
      </view>
      <view class="info-bottom__right flex flex-vertical-c">
        <view v-if="dataObj.queryType === 'L'" class="right-button left" @click.stop="addShop">
          加入备货车
        </view>
        <view class="right-button right m-l-24" @click.stop="buyShop">订购</view>
      </view>
    </view>
  </view>
</template>

<script>
import {error, getStoreImUserIdFn} from "@/common/helper";

export default {
    name: 'InvestmentGoodsInfo',
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
      // 跳转到客服聊天界面
      toIm() {

        getStoreImUserIdFn({
          companyId:this.dataObj.shopId
        }).then(res=>{
          const info = {
            targetId: res,
            type: 0,
            note: this.dataObj.shopName,
            platformCode: this.dataObj.platformCode,
            isProject: true,
            isShop: true, //是否是店铺聊天
            investType: this.dataObj.queryType,
            projectId: this.dataObj.id,
          }
          this.$storage.set('temp_im_room_info', info)
          this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
        }).catch(e=>{

          error(e.message||"未找到店铺客服")
        })


      },
      /**
       * 跳转店铺主页
       */
      toStoreHomePage() {
        this.$emit('updateFn')
        this.$linkToEasy('/pagesAgent/InvestmentList/InvestmentShop?shopId=' + this.dataObj.shopId)
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
        width: 160rpx;
        padding: 8rpx 0;
        background: #f7f7f8;
        border-radius: 8rpx;
        margin-right: 16rpx;
        .block-money {
          height: 42rpx;
          line-height: 42rpx;
          font-size: 28rpx;
        }
        .block-tips {
          line-height: 36rpx;
          font-size: 24rpx;
          color: $v-c0-65;
        }
        ::v-deep .zb_tooltip__popper {
          left: -240rpx !important;
        }
      }
    }
    &-bottom {
      padding: 24rpx 32rpx;
      box-sizing: border-box;
      &__img {
        width: 80rpx;
        height: 80rpx;
        margin-right: 16rpx;
        border-radius: 8rpx;
        overflow: hidden;
      }
      &__text {
        width: 170rpx;
        font-weight: bold;
        font-size: 24rpx;
        line-height: 42rpx;
        margin-left: 8rpx;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      &__right {
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
  }
  .good-tips {
    font-weight: 400;
    height: 36rpx;
    line-height: 36rpx;
    font-size: 24rpx;
    color: #fff;
    padding: 0 12rpx;
    background: $color-primary-yellow;
    border-radius: 24rpx;
  }
</style>
