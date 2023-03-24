<template>
  <view class="area">
    <view class="area-title">拓客区</view>
    <view class="area-bottom flex">
      <view
        class="area-bottom__block flex flex-column flex-vertical-c flex-justify-c m-r-18"
        @click="$linkToEasy('/pagesAgent/TokerDistrict/MyGarage')"
      >
        <view class="lh36 fz-b fz-40 color-block">{{ info.repairFactoryNum || '0' }}</view>
        <view class="m-t-16 lh36 fz-24 color-block-45">修理厂总数量</view>
      </view>
      <view
        class="area-bottom__block flex flex-column flex-vertical-c flex-justify-c"
        @click="goAccountBillFn"
      >
        <view class="lh36 fz-b fz-40 color-block">{{ info.invitationRevenue || '0' }}</view>
        <view class="m-t-16 lh36 fz-24 color-block-45">拓客收益</view>
      </view>
    </view>
    <view class="area-bottom flex">
      <view class="area-bottom__left m-r-18" @click="promoteCodeClick">
        <view class="left-factory">邀请修理厂</view>
        <image class="left-icon m-l-24" src="/static/supplier/home/group_right.png" />
        <image class="left-img" src="/static/supplier/home/invitation.png" />
      </view>
      <view class="area-bottom__right">
        <view
          class="right-box blue flex flex-vertical-c flex-justify-between light-up"
          @click="goMapFn"
        >
          <view class="right-box__name shadow-lightUp">点亮修理厂</view>
          <image class="right-box__icon" src="/static/supplier/home/group_right.png" />
        </view>
        <view
          class="right-box m-t-18 blue flex flex-vertical-c flex-justify-between"
          @click="toOrder"
        >
          <view class="right-box__name shadow-promotion">推广订单</view>
          <image class="right-box__icon" src="/static/supplier/home/group_right.png" />
        </view>
        <view
          class="right-box red m-t-18 flex flex-vertical-c flex-justify-between"
          @click="$linkToEasy('/pagesAgent/TokerDistrict/MyGarage')"
        >
          <view class="right-box__name shadow-management">修理厂管理</view>
          <image class="right-box__icon" src="/static/supplier/home/group_right.png" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import { checkIsApproveFn, linkToEasy } from '@/common/helper'

  export default {
    name: 'TalkArea',
    props: {
      info: {
        type: Object,
        default: () => {
          return {
            invitationRevenue: 0,
            repairFactoryNum: 0,
          }
        },
      },
    },
    methods: {
      /**
       * 去地图页
       */
      goMapFn() {
        console.log(5555555555555555)
        // #ifdef H5
        this.$linkToEasy(
          `/pagesCommon/LightUp/MapMarkers?licenseId=${this.userInfo.licenseId}&inviterId=${this.userInfo.companyId}`,
        )
        // #endif
        // #ifdef APP-PLUS
        this.$linkToEasy(
          `/pagesCommon/LightUp/MapMarkersApp?licenseId=${this.userInfo.licenseId}&inviterId=${this.userInfo.companyId}`,
        )
        // #endif
      },
      goAccountBillFn() {
        let ids = JSON.stringify([4])
        this.$linkToEasy(`/pagesSupplier/UserCenter/Invoice/AccountBill?ids=${ids}`)
      },
      goTalkFn() {
        if (!checkIsApproveFn()) {
          this.$emit('updateApprove', true)
          return
        }
        // linkToEasy('/pagesAgent/TokerDistrict/MyGarage')
        uni.reLaunch({
          url: '/pages/AgentCenter/AgentTabbar?tabbarVal=1',
        })
      },
      toOrder() {
        if (!checkIsApproveFn()) {
          this.$emit('updateApprove', true)
          return
        }
        linkToEasy('/pagesAgent/Order/PromoteOrder/PromoteOrderList')
      },
      // 分享二维码
      promoteCodeClick() {
        if (!checkIsApproveFn()) {
          this.$emit('updateApprove', true)
          return
        }
        this.$emit('showShare')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .area {
    background: #fff;
    border-radius: 16rpx;
    overflow: hidden;
    margin-top: 32rpx;

    &-title {
      padding: 32rpx;
      box-sizing: border-box;
      line-height: 48rpx;
      font-weight: bold;
      font-size: 32rpx;
      color: $v-c0-85;
    }

    &-bottom {
      padding: 0 24rpx 32rpx;
      box-sizing: border-box;

      &__block {
        width: 310rpx;
        height: 140rpx;
        background: #f9f9f9;
        border-radius: 16rpx;
      }

      &__left {
        position: relative;
        width: 308rpx;
        //height: 180rpx;
        background: linear-gradient(116.1deg, #ff7929 0%, #feffd3 100%);
        border-radius: 16rpx;

        .left-factory {
          margin: 30rpx 0 20rpx 24rpx;
          line-height: 42rpx;
          font-weight: bold;
          font-size: 28rpx;
          color: #ffffff;
          text-shadow: 0rpx 2rpx 2rpx #ff7d30;
        }

        .left-icon {
          width: 40rpx;
          height: 40rpx;
        }

        .left-img {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 136rpx;
          height: 180rpx;
        }
      }

      &__right {
        .right-box {
          width: 310rpx;
          height: 80rpx;
          border-radius: 16rpx;
          overflow: hidden;
          padding: 0 24rpx;
          box-sizing: border-box;

          &.blue {
            background: linear-gradient(105.86deg, #2d9aff 11.06%, #a0d2ff 88.94%);
          }

          &.red {
            background: linear-gradient(106.43deg, #ff504b 11.67%, #ffb2a8 90.83%);
          }
          &.light-up {
            background: linear-gradient(105.86deg, #ff7246 11.06%, #fbd18c 88.94%);
          }

          &__name {
            font-weight: bold;
            font-size: 28rpx;
            color: #ffffff;
            &.shadow-lightUp {
              text-shadow: 0 2rpx 2rpx rgba(181, 77, 33, 0.45);
            }
            &.shadow-promotion {
              text-shadow: 0 2rpx 2rpx rgba(181, 77, 33, 0.45);
            }
            &.shadow-management {
              text-shadow: 0 2rpx 2rpx rgba(181, 77, 33, 0.45);
            }
          }

          &__icon {
            width: 40rpx;
            height: 40rpx;
          }
        }
      }
    }
  }
</style>
