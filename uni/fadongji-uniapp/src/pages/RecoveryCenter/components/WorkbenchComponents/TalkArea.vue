<template>
  <view class="area">
    <view class="area-title">拓客区</view>
    <view class="area-bottom flex">
      <view @click="goTalkFn" class="area-bottom__block flex flex-column flex-vertical-c flex-justify-c m-r-18">
        <view class="lh36 fz-b fz-40 color-block">800</view>
        <view class="m-t-16 lh36 fz-24 color-block-45">修理厂总数量</view>
      </view>
      <view class="area-bottom__block flex flex-column flex-vertical-c flex-justify-c">
        <view class="lh36 fz-b fz-40 color-block">8866</view>
        <view class="m-t-16 lh36 fz-24 color-block-45">拓客收益</view>
      </view>
    </view>
    <view class="area-bottom flex">
      <view class="area-bottom__left m-r-18">
        <view class="left-factory">邀请修理厂</view>
        <image class="left-icon m-l-24" src="/static/supplier/home/group_right.png" />
        <image class="left-img" src="/static/supplier/home/invitation.png" />
      </view>
      <view class="area-bottom__right">
        <view
          class="right-box blue flex flex-vertical-c flex-justify-between"
          @click="$linkToEasy('/pagesAgent/Order/PromoteOrder/PromoteOrderList')"
        >
          <view class="right-box__name blue">推广订单</view>
          <image class="right-box__icon" src="/static/supplier/home/group_right.png" />
        </view>
        <view class="right-box red m-t-18 flex flex-vertical-c flex-justify-between">
          <view class="right-box__name red">修理厂管理</view>
          <image class="right-box__icon" src="/static/supplier/home/group_right.png" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import { checkIsApproveFn,linkToEasy } from "@/common/helper";

  export default {
    name: 'TalkArea',
    methods: {
      goTalkFn(){
        if(!checkIsApproveFn()){
          this.$emit('updateApprove',true)
          return
        }
        linkToEasy('/pagesAgent/TokerDistrict/MyGarage')
      }
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
        height: 180rpx;
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
          top: 0;
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
          &__name {
            font-weight: bold;
            font-size: 28rpx;
            color: #ffffff;
            &.blue {
              text-shadow: 0rpx 2rpx 2rpx rgba(50, 82, 112, 0.45);
            }
            &.red {
              text-shadow: 0rpx 2rpx 2rpx rgba(201, 77, 74, 0.65);
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
