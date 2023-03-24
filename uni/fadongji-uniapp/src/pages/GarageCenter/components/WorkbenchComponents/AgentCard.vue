<template>
  <view v-if="dockingPeopleData && dockingPeopleData.id" class="workbench-info">
    <!--    <block v-if="dockingPeopleData && dockingPeopleData.id">-->
    <view class="fz-32 fz-b flex flex-vertical-c m-b-8 lh48">
      <view>{{ dockingPeopleData.storeName }}</view>
      <view class="fz-32 fz-b m-l-24">{{ dockingPeopleData.userName }}</view>
    </view>
    <view class="fz-28 flex workbench-info__navigation">
      <view class="flex1 overTwoEllipsis">
        {{
          dockingPeopleData.province +
          dockingPeopleData.city +
          dockingPeopleData.area +
          dockingPeopleData.address
        }}
      </view>
      <view
        v-if="dockingPeopleData.latitude"
        class="icon-map flex flex-vertical-c m-l-16"
        @click="openGPSApp"
      >
        <image class="icon-map__icon" src="/static/icons/plane_shadow.png"></image>
        <!--        <VoIcon :size="14" color="#ffffff" name="plane-shadow" />-->
        <text class="icon-map__name">导航</text>
      </view>
    </view>
    <view class="workbench-info__telephone flex flex-vertical-c">
      <view class="telephone-left flex flex-vertical-c flex1">
        <view
          class="flex flex-vertical-c flex-justify-c"
          @click="$cellPhone(dockingPeopleData.userName)"
        >
          <VoIcon :size="20" color="#ffffff" name="mobile-new" />
          <view class="fz-28 m-l-12 m-r-36">打电话</view>
        </view>
        <view class="telephone-left__line m-r-36"></view>
        <view class="flex flex-vertical-c flex-justify-c flex1" @click="goImUrl">
          <VoIcon :size="20" color="#ffffff" name="smile-m" />
          <view class="fz-28 m-l-12 flex1">聊天</view>
        </view>
        <!--        <view class="fz-32 fz-b m-r-28">{{ dockingPeopleData.userName }}</view>-->
        <!--        <VoIcon-->
        <!--          :size="20"-->
        <!--          class="m-r-20"-->
        <!--          color="#ffffff"-->
        <!--          name="mobile-new"-->
        <!--          @click="$cellPhone(dockingPeopleData.userName)"-->
        <!--        />-->
        <!--        <VoIcon :size="20" color="#ffffff" name="smile-m" @click="goImUrl" />-->
      </view>
      <view class="goShopDetails" @click="goShopDetails">进店</view>
    </view>
    <!--    </block>-->
    <!--    <block v-else>-->
    <!--      <view class="flex flex-vertical-c">-->
    <!--        <view class="flex flex-vertical-c flex1">-->
    <!--          <view class="fz-28 fz-b m-r-28">您的修理厂未绑定本地服务商，可联系平台客服处理</view>-->
    <!--        </view>-->
    <!--        <view class="goShopDetails" @click="goOnline">联系客服</view>-->
    <!--      </view>-->
    <!--    </block>-->
  </view>
</template>
<script>
  import { goOnlineCustomerFn, openGpsAppFn } from '@/common/helper'

  export default {
    name: 'AgentCard',
    props: {
      dockingPeopleData: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {}
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    methods: {
      goOnline() {
        goOnlineCustomerFn()
      },
      /**
       * 到聊天界面
       */
      goImUrl() {
        if (!this.$checkIsApproveFn()) {
          this.$emit('updateApprove', true)
          return
        }
        const data = {
          targetId: this.dockingPeopleData.userId,
          type: 0,
          note: this.dockingPeopleData.storeName,
          platformCode: this.dockingPeopleData.platformCode,
        }
        this.$storage.set('temp_im_room_info', data)
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
      },
      /**
       * 去店铺详情
       */
      goShopDetails() {
        if (!this.$checkIsApproveFn()) {
          this.$emit('updateApprove', true)
          return
        }
        this.$linkToEasy('/pagesGarage/ShopList/ShopGoodsList?shopId=' + this.dockingPeopleData.id)
      },
      // 打开第三方导航
      openGPSApp() {
        if (!this.$checkIsApproveFn()) {
          this.$emit('updateApprove', true)
          return
        }
        openGpsAppFn(
          this.dockingPeopleData.latitude,
          this.dockingPeopleData.longitude,
          this.dockingPeopleData.storeName,
        )
      },
    },
  }
</script>
<style lang="scss" scoped>
  .workbench-info {
    background: #fff;
    width: 686rpx;
    //height: 342rpx;
    margin: 0 32rpx;
    padding: 24rpx;
    //padding-bottom: 100rpx;
    border-radius: 16rpx;
    box-sizing: border-box;
    background-image: url('/static/garage/home/AgentCard.png');
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
    color: #fff;
    //margin-bottom: -60rpx;
    margin-bottom: 32rpx;
    &__line {
      width: 2rpx;
      height: 24rpx;
      background: rgba(0, 0, 0, 0.08);
      margin: 0 16rpx;
    }
    &__telephone {
      margin-top: 24rpx;
      .telephone-left {
        width: 382rpx;
        height: 64rpx;
        background: rgba(255, 255, 255, 0.25);
        border-radius: 8rpx;
        padding-left: 24rpx;
        &__line {
          width: 2rpx;
          height: 20rpx;
          background: rgba(255, 255, 255, 0.65);
        }
      }
    }
    &__navigation {
      padding-bottom: 24rpx;
      border-bottom: 2rpx dashed rgba(255, 255, 255, 0.15);
    }
  }
  .goShopDetails {
    width: 232rpx;
    height: 64rpx;
    line-height: 64rpx;
    font-size: 28rpx;
    font-weight: bold;
    text-align: center;
    background: #fff;
    color: #ff5319;
    border-radius: 64rpx;
    margin-left: 27rpx;
  }
  .icon-map {
    //width: 108rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36rpx;
    padding: 0 16rpx 0 12rpx;
    color: #ffffff;
    background: rgba(255, 255, 255, 0.25);
    border-radius: 20rpx;
    &__icon {
      width: 28rpx;
      height: 28rpx;
    }
    &__name {
      font-size: 24rpx;
      margin-left: 4rpx;
      text-shadow: 0 2rpx 2rpx rgba(215, 129, 28, 0.65);
    }
  }
</style>
