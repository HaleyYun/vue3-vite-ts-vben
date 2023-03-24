<template>
  <scroll-view class="channel" scroll-top="0" scroll-y="true">
    <view @click="scrollViewFn">
      <VoBatteryBar bg-color="transparent" />
      <vo-qi-mo-customer ref="qiMoRef"></vo-qi-mo-customer>
      <view
        class="channel-title flex flex-vertical-c flex-justify-between"
        @click="goTo('/pagesCommon/serviceMessagePage/MessageNotification')"
      >
        <image class="channel-title__img" src="/static/supplier/home/slogan_agent.png" />
        <view class="channel-title__news m-r-10">
          <VoIcon :size="24" name="message-bell" />
          <VoBadge
            v-if="getMissMessageCount"
            :value="getMissMessageCount"
            class="news-badge"
            max="99"
          />
        </view>
      </view>
      <view class="channel-padding">
        <!-- 轮播图 -->
        <SwiperFigure />
        <view class="channel-content">
          <!-- 服务商 -->
          <view class="channel-content__item">
            <view class="lh54 fz-b fz-36">服务商</view>
            <image
              class="item-img"
              src="/static/channel/home/create_service.png"
              @click="goTo('/pagesChannelManager/HomePage/CreateChooseType')"
            />
            <view class="flex flex-vertical-c">
              <view
                class="item-box green-bg m-r-18"
                @click="goTo('/pagesChannelManager/InvestmentManual/InvestmentManual')"
              >
                <view class="item-box__identity">服务商</view>
                <view class="flex flex-vertical-c">
                  <view class="item-box__word">招商手册</view>
                  <image class="item-box__icon" src="/static/lease/home/jump.png" />
                </view>
              </view>
              <view class="item-box yellow-bg m-r-18" @click="openShare(1)">
                <view class="item-box__identity">邀请</view>
                <view class="flex flex-vertical-c">
                  <view class="item-box__word">服务商</view>
                  <image class="item-box__icon" src="/static/lease/home/jump.png" />
                </view>
              </view>
              <view class="item-box orange-bg" @click="goToShow('/pages/AgentCenter/AgentTabbar')">
                <view class="item-box__identity">服务商</view>
                <view class="flex flex-vertical-c">
                  <view class="item-box__word">演示</view>
                  <image class="item-box__icon" src="/static/lease/home/jump.png" />
                </view>
              </view>
            </view>
          </view>
          <!-- 修理厂 -->
          <view class="channel-content__item">
            <view class="lh54 fz-b fz-36">修理厂</view>
            <image
              class="item-img"
              src="/static/channel/home/create_repair.png"
              @click="goTo('/pagesChannelManager/GarageModule/CreateGarage')"
            />
            <view class="flex flex-vertical-c">
              <view
                class="item-box blue-bg m-r-18"
                @click="goTo('/pagesChannelManager/InvestmentManual/InvestmentManual')"
              >
                <view class="item-box__identity">修理厂</view>
                <view class="flex flex-vertical-c">
                  <view class="item-box__word">招商手册</view>
                  <image class="item-box__icon" src="/static/lease/home/jump.png" />
                </view>
              </view>
              <view class="item-box green-bg m-r-18" @click="openShare(2)">
                <view class="item-box__identity">邀请</view>
                <view class="flex flex-vertical-c">
                  <view class="item-box__word">修理厂</view>
                  <image class="item-box__icon" src="/static/lease/home/jump.png" />
                </view>
              </view>
              <view
                class="item-box yellow-bg"
                @click="goToShow('/pages/GarageCenter/GarageCenter')"
              >
                <view class="item-box__identity">修理厂</view>
                <view class="flex flex-vertical-c">
                  <view class="item-box__word">演示</view>
                  <image class="item-box__icon" src="/static/lease/home/jump.png" />
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <VoShareQrCodeView ref="sharePop" :params="params">
        <EraButton
          v-if="openShareType === 1"
          circle
          text="手动创建"
          @click="goTo('/pagesChannelManager/HomePage/CreateChooseType')"
        />
        <EraButton
          v-else
          circle
          text="手动创建"
          @click="goTo('/pagesChannelManager/GarageModule/CreateGarage')"
        />
      </VoShareQrCodeView>
    </view>
    <VoComplaintAction ref="complaintRef" />
  </scroll-view>
</template>
<script>
  import SwiperFigure from './components/SwiperFigure'
  import VoDragButton from '@/components/VoDragButton/VoDragButton'
  import VoShareQrCodeView from '@/components/VoShareView/VoShareQrCodeView'
  import { mapActions, mapGetters } from 'vuex'
  import { goOnlineCustomerFn } from "@/common/helper";

  export default {
    name: 'ChannelTabbarHome',
    components: {
      SwiperFigure,
      VoDragButton,
      VoShareQrCodeView,
    },
    data() {
      return {
        value: 8,
        params: {},
        openShareType: 1,
      }
    },
    computed: {
      ...mapGetters('serviceNotification', ['getMissMessageCount']),
    },
    created() {
      this.params = {
        inviteUserId: this.userInfo.id,
        companyId: this.userInfo.companyId,
        roleCode: 'agent',
        userName: this.userInfo.userName,
      }
      this.reqMissMessageCount()
    },
    methods: {
      ...mapActions('serviceNotification', ['reqMissMessageCount']),
      scrollViewFn() {
        this.$refs.qiMoRef?.close()
      },

      // 页面跳转方法
      goTo(url) {
        this.$linkToEasy(url)
      },
      // 演示页面跳转
      goToShow(url) {
        console.log(url)
        uni.$u.route({
          url: url,
          params: {
            tabbarVal: 0,
            other: 1,
          },
        })
      },
      /**
       * 邀请注册
       * 0：无；1、服务商；2、修理厂
       */
      openShare(type) {
        if (!this.userInfo || !this.userInfo.id) {
          this.$u.toast('分享数据加载中，请稍后再试')
          return
        }
        this.params = {
          inviteUserId: this.userInfo.id,
          companyId: this.userInfo.companyId,
          userName: this.userInfo.storeName,
        }
        this.openShareType = type
        if (type === 1) {
          this.params.roleCode = 'agent'
          // this.$refs.sharePop.showShare(`/pagesChannelManager/HomePage/CreateService`)
        } else if (type === 2) {
          this.params.roleCode = 'garage'
          // this.$refs.sharePop.showShare('/pagesChannelManager/GarageModule/CreateGarage')
        }
        this.$refs.sharePop.showShare('/pages/ShareRegister', this.params)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .channel {
    // #ifdef H5
    //padding-top: 20rpx;
    // #endif
    width: 750rpx;
    flex: 1;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    overflow-x: hidden;
    background: #fff;
    background-image: url('/static/supplier/home/home_bg.png');
    background-repeat: no-repeat;
    background-size: 100% 930rpx;
    &-fixbg {
      position: fixed;
      height: 100vh;
      width: 750rpx;
      z-index: 90;
      opacity: 0;
      background-color: black;
    }

    &-fixbtns {
      position: fixed;
      right: 0;
      bottom: 0;
      z-index: 99;
      height: 264rpx;
      width: 190rpx;

      &__item {
        color: #ffffff;
        font-size: 26rpx;
        height: 64rpx;
        line-height: 64rpx;
        background: linear-gradient(90.22deg, #ff7321 2.68%, #ff5622 99.81%);
        mix-blend-mode: normal;
        display: flex;
        align-items: center;
        padding-left: 12rpx;
        padding-right: 16rpx;
        border-radius: 100rpx;
        margin-bottom: 24rpx;
      }
    }

    &-title {
      padding: 34rpx 32rpx;
      box-sizing: border-box;

      &__img {
        width: 404rpx;
        height: 84rpx;
        display: block;
      }

      &__news {
        position: relative;
        width: 48rpx;
        height: 48rpx;
        padding-left: 24rpx !important;
        margin-left: 24rpx !important;

        .news-badge {
          position: absolute;
          top: -14rpx;
          right: -10rpx;
          display: inline-block;
        }
      }
    }

    .animation-class {
      height: 0rpx;
      overflow: hidden;
    }

    &-state {
      box-sizing: border-box;
      margin-top: 40rpx;

      &__center {
        text-align: center;
      }

      &.more {
        height: 0;
        overflow: hidden;
        margin-top: 0;
      }
    }

    &-open {
      width: 750rpx;
      //margin-top: 40rpx;
    }

    &-padding {
      padding: 32rpx;
      border-top-left-radius: 20rpx;
      border-top-right-radius: 20rpx;
      background: #fff;
      margin-bottom: 48rpx;
    }

    &-content {
      box-sizing: border-box;

      &__item {
        margin-top: 48rpx;

        .item-img {
          width: 686rpx;
          height: 336rpx;
          display: block;
          margin-top: 24rpx;
          margin-bottom: 16rpx;
        }

        .item-box {
          box-sizing: border-box;
          width: 216rpx;
          height: 156rpx;
          border-radius: 24rpx;
          background-repeat: no-repeat;
          background-size: 216rpx 156rpx;
          padding: 32rpx 0 0 20rpx;

          &.green-bg {
            background-image: url('/static/lease/home/green_bg.png');
          }

          &.yellow-bg {
            background-image: url('/static/lease/home/yellow_bg.png');
          }

          &.orange-bg {
            background-image: url('/static/lease/home/orange_bg.png');
          }

          &.blue-bg {
            background-image: url('/static/channel/home/blue_bg.png');
          }

          &__word {
            line-height: 54rpx;
            font-size: 36rpx;
            font-weight: bold;
            color: #ffffff;
          }
          &__identity {
            color: #fff;
            font-weight: bold;
            font-size: 32rpx;
            line-height: 48rpx;
          }
          &__icon {
            width: 32rpx;
            height: 32rpx;
            display: block;
            margin-left: 12rpx;
          }
        }
      }
    }
  }

  .tooltip-box {
    width: 208rpx;
    font-size: 28rpx;
    color: #ffffff;

    &__item {
      height: 98rpx;
      line-height: 98rpx;
      text-align: center;
      border-bottom: 2rpx solid #bfbfbf;

      &:last-child {
        border-bottom: 0rpx;
      }
    }
  }

  .background-transparent {
    background: rgba(255, 255, 255, 0.45) !important;
    border: 2rpx solid #ffffff !important;
  }

  .background-gray {
    background: #f7f7f8 !important;
    border: 2rpx solid #f7f7f8 !important;
  }
</style>
