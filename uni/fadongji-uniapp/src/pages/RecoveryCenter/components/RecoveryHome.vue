<template>
  <scroll-view class="workbench" :class="{'bg-f5f9ff':showActionNav}" scroll-top="0" scroll-y="true" @scroll="onScroll">
    <view @click="scrollViewFn" :class="{'bg-f5f9ff':showActionNav}">

      <vo-qi-mo-customer ref="qiMoRef"></vo-qi-mo-customer>
      <view class="workbench-bg">
        <VoBatteryBar bg-color="transparent" />

        <SupplierTitle :count="getMissMessageCount" />
        <!-- 滑动显示nav -->
        <view
          v-if="showActionNav"
          :style="{ paddingTop: $systemInfo.statusBarHeight + 'px', opacity: opacity }"
          class="workbench-action flex flex-vertical-c flex-justify-between"
        >
          <SupplierTitle :count="getMissMessageCount" :sliding="true" />
        </view>
        <view id="navTop" />
        <!--  待发货、超时发货、安全预警、总收益  -->
        <view class="workbench-bg__state flex flex-vertical-c">
          <view
            class="state-center flex1"
            @click="$linkToEasy('/pagesRecovery/RecycleOrders/RecycleOrders?index=1')"
          >
            <view class="lh60 fz-b fz-40 color-block font-din-bold">{{
              countInfo.waitingQa || 0
            }}</view>
            <view class="m-t-8 lh36 fz-24 color-block-65">待查验</view>
          </view>
          <view
            class="state-center flex1"
            @click="$linkToEasy('/pagesRecovery/RecycleOrders/RecycleOrders?index=3')"
          >
            <view class="lh60 fz-b fz-40 color-block font-din-bold">{{
              countInfo.delivered || 0
            }}</view>
            <view class="m-t-8 lh36 fz-24 color-block-65">待收货</view>
          </view>
          <view
            class="state-center flex1"
            @click="$linkToEasy('/pagesRecovery/RecycleOrders/RecycleOrders?index=4')"
          >
            <view class="lh60 fz-b fz-40 color-block font-din-bold">{{
              countInfo.finished || 0
            }}</view>
            <view class="m-t-8 lh36 fz-24 color-block-65">累计回收</view>
          </view>
        </view>
        <!--  总销售额、销售待发货、客户待付款、完成订单  -->
        <view class="workbench-bg__state flex flex-vertical-c m-b-40">
          <view
            class="state-center flex1"
            @click="$linkToEasy('/pagesRecovery/SellOrder/MarketOrder/MarketOrderList?index=2')"
          >
            <view class="lh60 fz-b fz-40 color-block font-din-bold">{{
              countInfo.salesWaitingDelivery || 0
            }}</view>
            <view class="m-t-8 lh36 fz-24 color-block-65">销售待发货</view>
          </view>
          <view
            class="state-center flex1"
            @click="
              $linkToEasy('/pagesRecovery/SellOrder/MarketOrder/MarketOrderList?index=2&isPreSale=1')
            "
          >
            <view class="lh60 fz-b fz-40 color-block font-din-bold">{{
              countInfo.presellWaitingDelivery || 0
            }}</view>
            <view class="m-t-8 lh36 fz-24 color-block-65">预售待发货</view>
          </view>
          <view
            class="state-center flex1"
            @click="$linkToEasy('/pagesRecovery/SellOrder/MarketOrder/MarketOrderList?index=4')"
          >
            <view class="lh60 fz-b fz-40 color-block font-din-bold">{{
              countInfo.sellTotal || 0
            }}</view>
            <view class="m-t-8 lh36 fz-24 color-block-65">累计销量</view>
          </view>
        </view>
      </view>
      <view class="workbench-padding">
        <!-- 运营支持 -->
        <OperationBox />

        <!-- 数据看板 -->
        <view class="p-b-32">
          <DataBoard :boardInfo="boardInfo" @refreshFn="refreshFn" />
        </view>
      </view>
    </view>
    <!--    <EraApproveModal :show.sync="showApprove" />-->
  </scroll-view>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import SupplierTitle from './WorkbenchComponents/SupplierTitle'
  import OperationBox from './WorkbenchComponents/OperationBox'
  import DataBoard from './WorkbenchComponents/DataBoard'
  import VoDragButton from '@/components/VoDragButton/VoDragButton'
  import helpUtil, { goOnlineCustomerFn, showLoading, toRoleHome } from "@/common/helper";
  import devConf from '@/common/env'
  import store from '@/store'
  import EraApproveModal from '@/uni_modules/era-ui/components/EraApproveModal/EraApproveModal'

  export default {
    name: 'RecoveryHome',
    components: {
      EraApproveModal,
      SupplierTitle,
      OperationBox,
      DataBoard,
      VoDragButton,
    },
    data() {
      return {
        countInfo: {}, // 统计-回收公司首页页签数量
        boardInfo: {}, // 数据看板
        showApprove: false, // 认证弹窗
        hidden: true,
        showActionNav: false, //滑动显示nav
        opacity: 0, // 滑动显示导航的透明度
      }
    },
    computed: {
      // 辅助函数
      ...mapGetters({
        roleArrGet: 'role/roleArrGetter',
        getMissMessageCount: 'serviceNotification/getMissMessageCount',
      }),
      myRoleArr: function () {
        if (this.userInfo && this.userInfo.roleCodeList) {
          return this.userInfo.roleCodeList.filter((item) => {
            return String(item.roleCode) !== String(this.userInfo.roleCode)
          })
        }
        return []
      },
    },
    created() {
      this.reqMissMessageCount()
      this.initFn()
    },
    onShow() {
      this.initCount()
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
        this.$emit('toComplaint')
        // this.$refs.complaintRef.open()
      },
      refreshFn() {
        this.$VoHttp.apiOrderStatisticsStatisticBoard().then((res) => {
          this.boardInfo = res.data
        })
      },
      initFn() {
        this.refreshFn()
      },
      initCount() {
        this.$VoHttp.apiOrderStatisticsStatisticCount().then((res) => {
          this.countInfo = res.data
        })
      },
      goto() {
        console.log('123', 123)
      },

      switchRoleFn(role) {
        const refreshToken = this.$storage.get('refresh_token')
        let param = {
          terminalSource: helpUtil.appSource(),
          refreshToken,
          roleCode: role.roleCode,
          clientId: devConf.clientId,
          clientSecret: this.$encrypt.encrypt(devConf.clientSecret),
        }
        showLoading('切换中')
        this.$VoHttp
          .switchRole(param, { noPrefix: true })
          .then((res) => {
            uni.$u.toast('切换成功')
            store.dispatch('user/setUseInfo', res.data)
            setTimeout(() => {
              toRoleHome()
            }, 1000)
          })
          .catch((e) => {
            uni.$u.toast(e.message || '请求失败')
          })
      },
      scrollViewFn() {
        this.$refs.qiMoRef?.close()
      },
      onScroll(e) {
        this.$refs.qiMoRef?.close()
        if (e.detail.scrollTop > 0) {
          this.showActionNav = true
          this.gapBgColor = '#fff'
        } else {
          this.showActionNav = false
          this.gapBgColor = 'transparent'
        }
        let query = uni.createSelectorQuery().in(this)
        query
          .select('#navTop')
          .boundingClientRect((data) => {
            this.handleScroll(data.top)
          })
          .exec()
      },
      // 监听页面滚动
      handleScroll(scrollTop) {
        // 获取当前的滚动距离
        // if (scrollTop < 0) {
        //   // 当滚动距离小于150时，计算导航透明度，可以考虑修改为每20增加0.1
        //   this.opacity = -scrollTop / 150
        // } else {
        //   this.opacity = 0
        // }
      }
    },
  }
</script>
<style lang="scss" scoped>
  .workbench {
    width: 750rpx;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    overflow-x: hidden;
    background: #f5f9ff;
    background-image: url('/static/supplier/home/home_bg.png');
    background-repeat: no-repeat;
    background-size: 100% 930rpx;
    padding-top: 20rpx;
    box-sizing: border-box;
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
    &-action {
      position: fixed;
      top: 0;
      width: 750rpx;
      z-index: 99;
      background: #fff;
    }
    &-bg {
      width: 750rpx;
      &__state {
        box-sizing: border-box;
        margin-top: 40rpx;
        padding: 0rpx 40rpx;
        .state-center {
          text-align: center;
        }
        &.more {
          height: 0;
          overflow: hidden;
          margin-top: 0;
        }
      }
      &__open {
        width: 750rpx;
      }

      &__block {
        display: grid;
        grid-template-columns: 214rpx 214rpx 214rpx;
        grid-column-gap: 22rpx;
        margin-top: 24rpx;
        padding: 0 32rpx;
        box-sizing: border-box;
        .block-box {
          width: 100%;
          height: 228rpx;
          border-radius: 16rpx;
          text-align: center;
          &.bg-orange {
            background: linear-gradient(180deg, #fce5c6 0%, #ffffff 100%);
          }
          &.bg-red {
            background: linear-gradient(180deg, #fedbd7 0%, #ffffff 100%);
          }
          &.bg-blue {
            background: linear-gradient(180deg, #b3daff 0%, #ffffff 100%);
          }
          &__name {
            line-height: 36rpx;
            font-size: 24rpx;
            color: $v-c0-65;
            margin-top: 20rpx;
          }
          &__num {
            line-height: 48rpx;
            font-weight: bold;
            font-size: 32rpx;
            color: $v-c0-85;
          }
          &__button {
            width: 160rpx;
            height: 60rpx;
            line-height: 60rpx;
            font-weight: bold;
            font-size: 28rpx;
            color: #ffffff;
            border-radius: 200rpx;
            margin: 24rpx auto 0;
            &.bg-orange {
              text-shadow: 0rpx 2rpx 2rpx rgba(255, 106, 49, 0.25);
              background: linear-gradient(180deg, #ff7246 0%, #fbd18c 186.67%);
            }
            &.bg-red {
              text-shadow: 0rpx 2rpx 2rpx rgba(230, 46, 37, 0.25);
              background: linear-gradient(180deg, #ff5252 -15%, #ffd8c1 175.17%);
            }
            &.bg-blue {
              text-shadow: 0rpx 2rpx 2rpx rgba(0, 104, 192, 0.25);
              background: linear-gradient(180deg, #1c84fe -36.67%, #8bdbfd 151.67%);
            }
          }
        }
      }
    }
    &-padding {
      padding: 0 32rpx 0rpx;
    }
  }
  .bg-f5f9ff{
    background-color: #f5f9ff !important;
  }
</style>
