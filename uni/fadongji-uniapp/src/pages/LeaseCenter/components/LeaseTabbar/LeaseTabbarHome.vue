<template>
  <scroll-view class="home" scroll-top="0" scroll-y="true" @click="scrollViewFn">
    <view>
      <VoBatteryBar bg-color="transparent" />
      <vo-qi-mo-customer ref="qiMoRef"></vo-qi-mo-customer>

      <view class="home-title flex flex-vertical-c flex-justify-between">
        <image class="home-title__img" src="/static/lease/home/slogan.png" />
        <view
          class="home-title__news m-r-10"
          @click="goTo('/pagesCommon/serviceMessagePage/MessageNotification')"
        >
          <VoIcon name="smile-m" />
          <VoBadge
            v-if="getMissMessageCount"
            :value="getMissMessageCount"
            class="news-badge"
            max="99"
          />
        </view>
      </view>
      <view class="home-content">
        <!-- 轮播图 -->
        <SwiperFigure />
        <!-- 供应商 -->
        <view class="home-content__supplier">
          <view class="lh54 fz-b fz-36">供应商</view>
          <image
            class="supplier-img"
            src="/static/lease/home/create.png"
            @click="goTo('/pagesLeaseManager/HomePage/CreateSupplier')"
          />
          <view class="flex flex-vertical-c">
            <view class="supplier-box green-bg m-r-18">
              <view
                class="supplier-box__word"
                @click="goTo('/pagesChannelManager/InvestmentManual/InvestmentManual')"
                >供应商</view
              >
              <view class="flex flex-vertical-c">
                <view class="supplier-box__word">招商手册</view>
                <image class="supplier-box__icon" src="/static/lease/home/jump.png" />
              </view>
            </view>
            <view class="supplier-box yellow-bg m-r-18" @click="openShare">
              <view class="supplier-box__word">邀请</view>
              <view class="flex flex-vertical-c">
                <view class="supplier-box__word">供应商</view>
                <image class="supplier-box__icon" src="/static/lease/home/jump.png" />
              </view>
            </view>
            <view
              class="supplier-box orange-bg"
              @click="goToShow('/pages/SupplierCenter/SupplierTabbar')"
            >
              <view class="supplier-box__word">供应商</view>
              <view class="flex flex-vertical-c">
                <view class="supplier-box__word">演示</view>
                <image class="supplier-box__icon" src="/static/lease/home/jump.png" />
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <VoShareQrCodeView ref="sharePop" :params="params">
      <EraButton
        circle
        text="手动创建"
        @click="goTo('/pagesLeaseManager/HomePage/CreateSupplier')"
      />
    </VoShareQrCodeView>
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
    name: 'LeaseTabbarHome',
    components: { SwiperFigure, VoShareQrCodeView, VoDragButton },
    data() {
      return {
        value: 8,
        params: {},
      }
    },
    computed: {
      ...mapGetters('serviceNotification', ['getMissMessageCount']),
    },
    created() {
      this.params = {
        inviteUserId: this.userInfo.id,
        companyId: this.userInfo.companyId,
        userName: this.userInfo.userName,
        roleCode: 'supplier',
      }
      this.reqMissMessageCount()
    },
    methods: {
      ...mapActions('serviceNotification', ['reqMissMessageCount']),
      /**
       * 在线客服
       */
      toOnlineService() {
        goOnlineCustomerFn()
      },
      /**
       * 致电客服
       */
      toCall() {
        this.$VoHttp.apiExtraCustomerMoor().then((res) => {
          this.$cellPhone('400-893-5518')
        })
      },
      /**
       * 投诉建议
       */
      toComplaint() {
        this.$refs.complaintRef.open()
      },
      // 页面跳转方法
      goTo(url) {
        this.$linkToEasy(url)
      },
      // 演示页面跳转
      goToShow(url) {
        console.log(url)
        this.$storage.set('other', 1)
        uni.$u.route({
          url: url,
          params: {
            tabbarVal: 0,
            other: 1,
          },
        })
      },

      scrollViewFn() {
        this.$refs.qiMoRef?.close()
      },
      /**
       * 邀请弹窗
       */
      openShare() {
        // this.$refs.sharePop.showShare(`/pagesLeaseManager/HomePage/CreateSupplier`,)
        if (!this.userInfo || !this.userInfo.id) {
          this.$u.toast('分享数据加载中，请稍后再试')
          return
        }
        console.log(this.userInfo)
        this.params = {
          inviteUserId: this.userInfo.id,
          companyId: this.userInfo.companyId,
          userName: this.userInfo.storeName,
          roleCode: 'supplier',
        }
        this.$refs.sharePop.showShare('/pages/ShareRegister', this.params)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .home {
    width: 750rpx;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    overflow-x: hidden;
    background: #ffffff;
    background-image: url('/static/lease/home/home_bg.png');
    background-repeat: no-repeat;
    background-size: 100% 930rpx;


    &-title {
      padding: 20rpx 32rpx;
      &__img {
        width: 348rpx;
        height: 86rpx;
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
    &-content {
      width: 750rpx;
      border-top-left-radius: 20rpx;
      border-top-right-radius: 20rpx;
      background: #fff;
      padding: 32rpx;
      box-sizing: border-box;
      &__supplier {
        margin-top: 48rpx;
        .supplier-img {
          width: 686rpx;
          height: 336rpx;
          display: block;
          margin-top: 24rpx;
          margin-bottom: 16rpx;
        }
        .supplier-box {
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
          &__word {
            line-height: 48rpx;
            font-size: 36rpx;
            font-weight: bold;
            color: #ffffff;
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
</style>
