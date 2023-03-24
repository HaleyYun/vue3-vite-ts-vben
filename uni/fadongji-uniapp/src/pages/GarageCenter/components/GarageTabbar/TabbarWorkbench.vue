<template>
  <scroll-view
    :class="{ 'bg-f5f9ff': showActionNav }"
    class="workbench"
    scroll-top="0"
    scroll-y="true"
    @scroll="onScroll"
  >
    <!--    <u-gap :height="$systemInfo.statusBarHeight" />-->
    <view :class="{ 'bg-f5f9ff': showActionNav }" @click="scrollViewFn">
      <VoBatteryBar bg-color="transparent" />
      <vo-qi-mo-customer ref="qiMoRef"></vo-qi-mo-customer>

      <SupplierTitle :count="getMissMessageCount" class="m-t-20" />
      <!-- 滑动显示nav -->
      <view
        v-if="showActionNav"
        :style="{ paddingTop: $systemInfo.statusBarHeight + 'px', opacity: opacity }"
        class="workbench-action flex flex-vertical-c flex-justify-between"
      >
        <SupplierTitle :count="getMissMessageCount" :sliding="true" />
      </view>
      <view id="navTop" />

      <!--      <view class="workbench-search flex flex-vertical-c">-->
      <!--        <VoIcon :size="24" class="m-l-16 m-r-14" name="search" />-->
      <!--        <view class="fz-24 color-block-25 flex1" @click="tapToShopList">商品名称/品牌/车型</view>-->
      <!--        <VoIcon :size="24" class="m-r-20" name="scan-not-vin" @click="scanImage" />-->
      <!--      </view>-->
      <view class="workbench-search">
        <VoSearch
          :showInsideAction="true"
          bgColor="#fff"
          borderColor="#FF5319"
          height="34"
          placeholder="商品名称/品牌/车型"
          @custom="tapToShopList"
          @click.native="tapToShopList"
        >
          <view slot="suffix" class="flex flex-vertical-c">
            <VoIcon :opacity="0.45" class="m-r-14" color="#000" name="voice-icon" />
          </view>
        </VoSearch>
      </view>
      <!--  3= 服务商首页、服务商进货列表/全国投放、服务商进货/全国店铺项目列表 结果页-/pagesAgent/VinTell/VinTell
            4= 服务商代客下单列表、服务商代客下单店铺主页 结果页-/pagesAgent/GlobalSearch/QueryResult
            5= 修理厂首页、买货列表、买货店铺主页  结果页-/pagesGarage/GlobalSearch/QueryResult -->
      <!--  当前为修理厂首页origin=5  结果页 /pagesGarage/GlobalSearch/QueryResult -->
      <VoGroupVinBtn
        class="m-t-24"
        rightToUrl="/pagesProduct/ApplicationCar/ApplicationCarNew?origin=5"
        @leftBtnFn="scanImage"
      ></VoGroupVinBtn>
      <!--  待付款、待发货、待接单、待服务  -->
      <view class="workbench-bg__state animation-class flex flex-vertical-c">
        <view
          class="state-center flex1"
          @click="goUrl('/pagesGarage/InstallOrder/InstallOrderList?tabIndex=1')"
        >
          <view class="lh60 fz-b fz-40 color-block font-din-bold">{{
            +currentUserFullInfo.checkStatus === 3 ? orderNumberData.sellWaiting : '--'
          }}</view>
          <view class="m-t-8 lh36 fz-24 color-block-65">待付款</view>
        </view>
        <view
          class="state-center flex1"
          @click="goUrl('/pagesGarage/InstallOrder/InstallOrderList?tabIndex=2')"
        >
          <view class="lh60 fz-b fz-40 color-block font-din-bold">{{
            +currentUserFullInfo.checkStatus === 3 ? orderNumberData.sellDelivery : '--'
          }}</view>
          <view class="m-t-8 lh36 fz-24 color-block-65">待发货</view>
        </view>
        <view
          class="state-center flex1"
          @click="goUrl('/pagesGarage/InstallOrderUser/OrderList?tabIndex=3')"
        >
          <view class="lh60 fz-b fz-40 color-block font-din-bold">{{
            +currentUserFullInfo.checkStatus === 3 ? orderNumberData.supportWaiting : '--'
          }}</view>
          <view class="m-t-8 lh36 fz-24 color-block-65">待接单</view>
        </view>
        <view
          class="state-center flex1"
          @click="goUrl('/pagesGarage/InstallOrderUser/OrderList?tabIndex=4')"
        >
          <view class="lh60 fz-b fz-40 color-block font-din-bold">{{
            +currentUserFullInfo.checkStatus === 3 ? orderNumberData.supportService : '--'
          }}</view>
          <view class="m-t-8 lh36 fz-24 color-block-65">待安装</view>
        </view>
      </view>
      <!-- 信息 -->
      <AgentCard :dockingPeopleData="dockingPeopleData" @updateApprove="showApprove = true" />
      <!-- 公告 -->
      <NoticeBar />
      <!-- 按钮集合 -->
      <NoticeItem v-if="isLoadingMenu" :menuList="menuList" @updateApprove="showApprove = true" />
      <!-- 轮播图 -->
      <view class="m-l-32 m-r-32">
        <SwiperFigure />
      </view>
    </view>
    <EraApproveModal :show.sync="showApprove" />
    <!--  底部悬浮start  -->
    <view
      v-if="
        Number(currentUserFullInfo.checkStatus) === -1 ||
        Number(currentUserFullInfo.checkStatus) === 0
      "
      class="suspension flex flex-vertical-c flex-justify-between m-b-safe-area"
    >
      <view class="suspension__tips">当前为游客模式，体验更多功能，请先进行认证</view>
      <view class="suspension__button" @click="agentApproveFn">立即认证</view>
    </view>
    <view
      v-else-if="Number(currentUserFullInfo.checkStatus) === 4"
      class="suspension flex flex-vertical-c flex-justify-between m-b-safe-area"
    >
      <view class="suspension__tips">为保障认证信息是本人真实操作，请验证手机号</view>
      <view class="suspension__button" @click="agentApproveFn">去验证</view>
    </view>
    <view
      v-else-if="Number(currentUserFullInfo.checkStatus) === 2"
      class="suspension flex flex-vertical-c flex-justify-between m-b-safe-area"
    >
      <view class="suspension__tips m-l-16">认证未通过，请重新进行认证。</view>
      <view class="suspension__button" @click="agentApproveFn">立即认证</view>
    </view>
    <view
      v-else-if="Number(currentUserFullInfo.checkStatus) === 1"
      class="suspension flex flex-vertical-c flex-justify-between m-b-safe-area"
    >
      <view class="suspension__tips m-l-16">信息正在认证审核中，请耐心等待...</view>
      <view class="suspension__button bg" @click="agentApproveFn">审核中</view>
    </view>
    <!--  底部悬浮end  -->
  </scroll-view>
</template>
<script>
  import helpUtil, {
    chooseImageOcrByPromise,
    hideLoading,
    linkToEasy,
    showLoading,
    toRoleHome,
    vocenCameraFn,
  } from '@/common/helper'
  import devConf from '@/common/env'
  import store from '@/store'
  import EraButton from '@/uni_modules/era-ui/components/EraButton/EraButton'
  import {
    mapActions,
    mapGetters,
    mapMutations,
  } from '@dcloudio/vue-cli-plugin-uni/packages/vuex3/dist/vuex.common'
  import VoDragButton from '@/components/VoDragButton/VoDragButton'
  import SupplierTitle from '@/pages/GarageCenter/components/WorkbenchComponents/SupplierTitle'
  import NoticeItem from '@/pages/GarageCenter/components/WorkbenchComponents/NoticeItem'
  import NoticeBar from '@/pages/GarageCenter/components/WorkbenchComponents/NoticeBar'
  import AgentCard from '@/pages/GarageCenter/components/WorkbenchComponents/AgentCard'
  import SwiperFigure from '@/pages/GarageCenter/components/WorkbenchComponents/SwiperFigure'
  // #ifdef APP-PLUS
  const vocenScan = uni.requireNativePlugin('vocen-scanCode')
  // #endif
  export default {
    name: 'TabbarWorkbench',
    components: {
      EraButton,
      VoDragButton,
      SupplierTitle,
      NoticeItem,
      SwiperFigure,
      NoticeBar,
      AgentCard,
    },
    data() {
      return {
        isLoadingMenu: false,
        menuList: [],
        showApprove: false, // 是否认证
        imgList: ['/static/demo/swiper.png', '/static/demo/swiper.png', '/static/demo/swiper.png'],
        showActionNav: false, //滑动显示nav
        opacity: 0, // 滑动显示导航的透明度
        //订单数量
        orderNumberData: {},
        //对接人信息
        dockingPeopleData: {},
        currentUserFullInfo: {},
        scanCount: 0,
        scanData: null,
      }
    },
    created() {
      this.scanCount = 0
      this.initRoleFn()
      this.getOrderDataRequest()
      this.getDockingPeopleRequest()
      store.dispatch('user/getFullUserInfo').then((res) => {
        this.currentUserFullInfo = res
        this.$store.dispatch('user/setUseInfoItem', res)

        // if (Number(this.currentUserFullInfo.checkStatus) === 0) {
        //   this.showApprove = true
        // }
      })
      this.reqMissMessageCount()
    },
    computed: {
      // 辅助函数
      ...mapGetters({
        userInfo: 'user/userInfoGetter',
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
    methods: {
      /**
       * 刷新数据
       */
      refreshData() {
        this.getOrderDataRequest()
      },
      ...mapActions('serviceNotification', ['reqMissMessageCount']),

      async initRoleFn() {
        await this.$VoHttp
          .apiMenuTree({
            orgCode: this.userInfo.roleCode,
          })
          .then((res) => {
            let result = []
            res.data.map((item) => {
              if (item.name === '工作台') {
                result = item.children
              }
            })

            this.menuList = result.map((item) => item.name)
            this.isLoadingMenu = true
          })
      },

      /**
       * @description 服务商认证跳转
       */
      agentApproveFn() {
        // 0：资料未提交，1:审核中 ，2：审核拒绝 ，3：认证成功，4：绑定手机号
        if (+this.userInfo.checkStatus === 0) {
          //修理厂只有个人类型
          linkToEasy('/pages/AuthenticationInformation/GarageAccounts')
          return
        } else if (+this.userInfo.checkStatus === 4) {
          linkToEasy('/pagesCommon/AuthorityManagement/BindTonlyPhone')
          return
        } else if (this.userInfo.checkStatus === -1) {
          this.showApprove = true
          return
        }
        if (this.userInfo.roleCode == 'garage') {
          linkToEasy('/pagesGarage/StoreInfo/ApproveInfo')
          return
        }
      },
      ...mapMutations('search', ['SET_SEARCH_GOODS_RESULT', 'SET_MODEL_INFORMATION']),
      tapToShopList() {
        this.$linkToEasy('/pagesGarage/ShopList/ShopList?state=1')
      },

      async scanImage() {
        if (!this.$checkIsApproveFn()) {
          this.showApprove = true
          return
        }
        let res = null

        // #ifdef APP-PLUS
        res = await vocenCameraFn('/v1/api/business/vehicle/scan/vinoreno')
        // #endif
        // #ifndef APP-PLUS
        res = await chooseImageOcrByPromise({
          count: 1,
          sizeType: ['compressed'],
          tip: '正在识别',
          apiUrl: '/v1/api/business/vehicle/scan/vinoreno',
        })
        res.type = 'scan'
        // #endif

        if (res && res.data) {
          let data = JSON.parse(res.data)
          this.scanData = data
          this.voiceTurnText = data.data.code
          // this.getLink(this.voiceTurnText)
          // 走另一个接口，判断是否有订单
          // let rec = await this.$VoHttp.apiBusinessVehicleBrandOcrGoods({
          //   code: data.data.code,
          // })
          if (+data.data.scanResultType === 1) {
            // 商品
            if (data.data && data.data.imageInfoVO && data.data.imageInfoVO.filePath) {
              this.$storage.set('imageInfoVO', data.data.imageInfoVO)
            }
            this.$linkToEasy(
              `/pagesGarage/GlobalSearch/QueryResult?code=${data.data.code}&type=${
                res.type
              }&imageInfoVO=${
                data.data && data.data.imageInfoVO && data.data.imageInfoVO.filePath
                  ? data.data.imageInfoVO.filePath
                  : ''
              }`,
            )
          } else if (+data.data.scanResultType === 2) {
            // 售后
            this.$linkToEasy(`/pagesGarage/GlobalSearch/AfterSalesService?code=${data.data.code}`)
          } else {
            this.$linkToEasy(
              '/pagesGarage/GlobalSearch/UpdateVin?imageInfoVO=' +
                (data.data && data.data.imageInfoVO && data.data.imageInfoVO.filePath
                  ? data.data.imageInfoVO.filePath
                  : '') +
                '&type=2',
            )
          }
        }
      },
      goUrl(url) {
        if (!this.$checkIsApproveFn()) {
          this.showApprove = true
          return
        }
        this.$linkToEasy(url)
      },
      addRoleFn() {
        const userName = this.userInfo.userName
        this.$store.dispatch('user/setUseInfo', {})
        uni.reLaunch({
          url: '/pages/CommonLogin/UserLogin?userName=' + userName,
        })
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
            hideLoading()
            uni.$u.toast(e.message || '身份切换失败')
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
        if (scrollTop < 0) {
          // 当滚动距离小于150时，计算导航透明度，可以考虑修改为每20增加0.1
          this.opacity = -scrollTop / 150
        } else {
          this.opacity = 0
        }
      },
      //去投资页搜索
      toSearchPage() {
        this.$linkToEasy('/pagesGarage/ShopList/ShopList')
      },
      // 去招商经理
      goLeaseCenter() {
        this.$linkToEasy('/pages/LeaseCenter/LeaseTabbar')
      },
      // 去渠道经理
      goChannelCenter() {
        this.$linkToEasy('/pages/ChannelCenter/ChannelTabbar')
      },
      //获取订单统计
      getOrderDataRequest() {
        this.$VoHttp
          .apiOrderInstallCount({}, { noLoading: true })
          .then((res) => {
            if (res.code === '20001') {
              this.orderNumberData = res.data
            } else {
              console.log('获取订单统计失败', res.message)
            }
          })
          .catch((e) => {
            uni.$u.toast(e.message || '请检查网络')
          })
      },
      //获取对接人信息
      getDockingPeopleRequest() {
        this.$VoHttp
          .apiCompanyInvitationAgentByGarage()
          .then((res) => {
            if (res.code === '20001') {
              this.dockingPeopleData = res.data
            } else {
              console.log('获取对接人信息失败', res.message)
            }
          })
          .catch((e) => {
            uni.$u.toast(e.message || '请检查网络')
          })
      },
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
    &-fixbtn {
      background: linear-gradient(270deg, #161825 -8.54%, #404773 100%);
      mix-blend-mode: normal;
      position: fixed;
      right: 0;
      bottom: 330rpx;
      z-index: 99;
      padding: 8rpx 12rpx 8rpx 14rpx;
      border-top-left-radius: 100rpx;
      border-bottom-left-radius: 100rpx;
      display: flex;
      align-items: center;
    }
    &-action {
      position: fixed;
      top: 0;
      width: 750rpx;
      z-index: 99;
      background: #fff;
    }
    &-nav {
      width: 686rpx;
      box-sizing: border-box;
      position: relative;
      background-image: url('/static/supplier/home/bg_man.png');
      background-size: 100% auto;
      background-repeat: no-repeat;
      margin: 32rpx auto 0rpx;
      &__tag {
        width: 30rpx;
        height: 30rpx;
        border-radius: 50%;
        overflow: hidden;
        background: #e50012;
        font-size: 10px;
        color: #ffffff;
        text-align: center;
        line-height: 30rpx;
        position: absolute;
        top: -4rpx;
        right: -4rpx;
      }
      &__btn {
        width: 144rpx;
        height: 56rpx;
        margin-top: 110rpx;
        border-radius: 38rpx;
        background: rgba(255, 255, 255, 0.45);
        border: 2rpx solid #ffffff;
        display: flex;
        align-items: center;
        color: #22284b;
        justify-content: center;
        font-size: 24rpx;
      }
      .w144 {
        width: 144rpx;
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
      &__search {
        width: 100%;
        height: 124rpx;
        background: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        /* Shadows阴影 */
        box-shadow: 0px 4rpx 16rpx rgba(34, 40, 75, 0.15);
        border-radius: 8rpx;
        .search {
          width: 638rpx;
          height: 68rpx;
          border-radius: 8rpx;
          border: 2rpx solid #22284b;
          padding: 0rpx 16rpx;
          display: flex;
          align-items: center;
          box-sizing: border-box;
        }
        .search-line {
          width: 2rpx;
          height: 40rpx;
          background: #000000;
        }
      }
      &__people {
        width: 100%;
        height: 124rpx;
        margin-top: 32rpx;
        background: #edf2fc;
        display: flex;
        align-items: center;
        padding: 0rpx 24rpx;
        box-sizing: border-box;
      }
    }
    &-search {
      //width: 686rpx;
      //height: 68rpx;
      //background: #fff;
      //border-radius: 8rpx;
      padding: 32rpx 32rpx 0;
    }
    &-bg {
      &__state {
        box-sizing: border-box;
        margin: 40rpx 0;
        .state-center {
          text-align: center;
        }
        &.more {
          height: 0;
          overflow: hidden;
          margin-top: 0;
        }
      }
    }
    &-control {
      width: 750rpx;
      height: 220rpx;
      display: flex;
      &__item {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 48rpx 0rpx;
      }
    }
    &-content {
      width: 750rpx;
      height: 332rpx;
      padding: 0rpx 32rpx;
      box-sizing: border-box;
      margin-bottom: 16rpx;
      display: flex;
      &__left {
        width: 332rpx;
        height: 332rpx;
        margin-right: 12rpx;
      }
      &__right {
        width: 340rpx;
        height: 332rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .right-install {
          width: 100%;
          height: 160rpx;
          background: #f7f7f8;
          border-radius: 8rpx;
          padding: 24rpx;
          box-sizing: border-box;
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
  .suspension {
    z-index: 99;
    position: fixed;
    bottom: 172rpx;
    left: 32rpx;
    width: 686rpx;
    height: 88rpx;
    background: rgba(0, 0, 0, 0.65);
    border-radius: 62rpx;
    padding: 0 16rpx;
    box-sizing: border-box;
    &__tips {
      font-size: 24rpx;
      color: #ffffff;
    }
    &__button {
      color: #fff;
      background: #ff5319;
      border-radius: 30rpx;
      font-size: 24rpx;
      width: 130rpx;
      height: 56rpx;
      line-height: 56rpx;
      text-align: center;
      &.bg {
        background: #ff9b05;
      }
    }
  }
  .bg-f5f9ff {
    background-color: #f5f9ff !important;
  }
</style>
