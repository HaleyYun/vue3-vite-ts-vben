<template>
  <scroll-view class="workbench" scroll-top="0" scroll-y="true" @scroll="onScroll">
    <view @click="scrollViewFn">
      <view :class="{ 'bg-f5f9ff': showActionNav }" class="workbench-bg">
        <VoBatteryBar bg-color="transparent" />

        <vo-qi-mo-customer ref="qiMoRef"></vo-qi-mo-customer>
      </view>
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
      <!--  待发货、超时发货、安全预警、总收益  -->
      <view class="workbench-bg__state flex flex-vertical-c">
        <view class="state-center flex1" @click="goPage('0')">
          <view class="lh60 fz-b fz-40 color-block font-din-bold">
            {{
              orderNumberData.waitDeliveryCount === 0 || orderNumberData.waitDeliveryCount
                ? orderNumberData.waitDeliveryCount
                : '--'
            }}
          </view>
          <view class="m-t-8 lh36 fz-24 color-block-65">待发货</view>
        </view>
        <view class="state-center flex1" @click="goPage('1')">
          <view class="lh60 fz-b fz-40 color-block font-din-bold">
            {{
              orderNumberData.timeOutDeliveryCount === 0 || orderNumberData.timeOutDeliveryCount
                ? orderNumberData.timeOutDeliveryCount
                : '--'
            }}
          </view>
          <view class="m-t-8 lh36 fz-24 color-block-65">超时未发货</view>
        </view>
        <view class="state-center flex1" @click="goPage('2')">
          <view class="lh60 fz-b fz-40 color-block font-din-bold">
            {{
              orderNumberData.warnStockCount === 0 || orderNumberData.warnStockCount
                ? orderNumberData.warnStockCount
                : '--'
            }}
          </view>
          <view class="m-t-8 lh36 fz-24 color-block-65">库存预警</view>
        </view>
        <view
          class="state-center flex1"
          @click="$linkToEasy('/pagesSupplier/Order/OrderList/OrderList')"
        >
          <view class="lh60 fz-b fz-40 color-block">
            <text v-if="orderNumberData.saleAmount > 10000" class="font-din-bold">
              {{ (orderNumberData.saleAmount / 10000).toFixed(2) }}
            </text>
            <text v-else class="font-din-bold">
              {{
                orderNumberData.saleAmount === 0 || orderNumberData.saleAmount
                  ? orderNumberData.saleAmount
                  : '--'
              }}
            </text>
            <text class="fz-24 m-l-2">{{ orderNumberData.saleAmount > 10000 ? '万' : '元' }}</text>
          </view>
          <view class="m-t-8 lh36 fz-24 color-block-65">总销售额</view>
        </view>
      </view>
      <!--  总销售额、销售待发货、客户待付款、完成订单  -->
      <!--        <view-->
      <!--          :animation="animationData"-->
      <!--          class="workbench-bg__state animation-class flex flex-vertical-c"-->
      <!--        >-->
      <!--          <view class="state-center flex1">-->
      <!--            <view class="lh60 fz-b fz-40 color-block">-->
      <!--              <text class="font-din-bold">28.8</text>-->
      <!--              <text class="fz-24 m-l-2">万</text>-->
      <!--            </view>-->
      <!--            <view class="m-t-8 lh36 fz-24 color-block-65">总销售额</view>-->
      <!--          </view>-->
      <!--          <view class="state-center flex1">-->
      <!--            <view class="lh60 fz-b fz-40 color-block font-din-bold">658</view>-->
      <!--            <view class="m-t-8 lh36 fz-24 color-block-65">销售待发货</view>-->
      <!--          </view>-->
      <!--          <view class="state-center flex1">-->
      <!--            <view class="lh60 fz-b fz-40 color-block font-din-bold">86</view>-->
      <!--            <view class="m-t-8 lh36 fz-24 color-block-65">客户待付款</view>-->
      <!--          </view>-->
      <!--          <view class="state-center flex1">-->
      <!--            <view class="lh60 fz-b fz-40 color-block font-din-bold">1286</view>-->
      <!--            <view class="m-t-8 lh36 fz-24 color-block-65">完成订单</view>-->
      <!--          </view>-->
      <!--        </view>-->
      <!--        <view :animation="animationSpaceData" class="w-full"></view>-->
      <!--        &lt;!&ndash;  展开/收起  &ndash;&gt;-->
      <!--        <view @click="openHidden">-->
      <!--          <view v-if="hidden" class="workbench-bg__open flex flex-vertical-c flex-justify-c">-->
      <!--            <view class="lh36 fz-24 color-block-45">展开</view>-->
      <!--            <VoIcon :size="12" name="arrow-bottom-line" />-->
      <!--          </view>-->
      <!--          <view v-else class="workbench-bg__open flex flex-vertical-c flex-justify-c">-->
      <!--            <view class="lh36 fz-24 color-block-45">收起</view>-->
      <!--            <VoIcon :size="12" name="arrow-top-line" />-->
      <!--          </view>-->
      <!--        </view>-->
      <!--  渠道分布  -->
      <view class="workbench-bg__channel flex flex-vertical-b">
        <image class="channel-img" src="/static/supplier/home/channel.png" />
        <view class="channel-explain flex1">渠道多，回款快，售后无忧</view>
      </view>
      <view class="workbench-bg__block">
        <!-- #ifdef APP-PLUS -->
        <view
          class="block-box bg-orange m-r-22"
          @click="goUrl('/pagesSupplier/MapList/ChinaGarageApp')"
        >
          <view class="block-box__name">全国修理厂</view>
          <view class="block-box__num">{{ staticData.garageNum || '--' }}</view>
          <view class="block-box__button bg-orange">查看详情</view>
        </view>
        <!-- #endif -->
        <!-- #ifdef H5 -->
        <view
          class="block-box bg-orange m-r-22"
          @click="goUrl('/pagesSupplier/MapList/ChinaGarage?type=1')"
        >
          <view class="block-box__name">全国修理厂</view>
          <view class="block-box__num">{{ staticData.garageNum || '--' }}</view>
          <view class="block-box__button bg-orange">查看详情</view>
        </view>
        <!-- #endif -->
        <!-- #ifdef APP-PLUS -->
        <view class="block-box bg-red m-r-22" @click="goUrl('/pagesSupplier/MapList/ChinaAgent')">
          <view class="block-box__name">全国服务商</view>
          <view class="block-box__num">{{ staticData.agentNum || '--' }}</view>
          <view class="block-box__button bg-red">查看详情</view>
        </view>
        <!-- #endif -->
        <!-- #ifdef H5 -->
        <view
          class="block-box bg-red m-r-22"
          @click="goUrl('/pagesSupplier/MapList/ChinaGarage?type=2')"
        >
          <view class="block-box__name">全国服务商</view>
          <view class="block-box__num">{{ staticData.agentNum || '--' }}</view>
          <view class="block-box__button bg-red">查看详情</view>
        </view>
        <!-- #endif -->
        <!-- #ifdef APP-PLUS -->
        <view class="block-box bg-blue" @click="goUrl('/pagesSupplier/MapList/ChinaWarehouse')">
          <view class="block-box__name">全国仓库</view>
          <view class="block-box__num">{{ staticData.warehouseNum || '--' }}</view>
          <view class="block-box__button bg-blue">查看详情</view>
        </view>
        <!-- #endif -->
        <!-- #ifdef H5 -->
        <view class="block-box bg-blue" @click="goUrl('/pagesSupplier/MapList/ChinaGarage?type=3')">
          <view class="block-box__name">全国仓库</view>
          <view class="block-box__num">{{ staticData.warehouseNum || '--' }}</view>
          <view class="block-box__button bg-blue">查看详情</view>
        </view>
        <!-- #endif -->
      </view>
      <!-- 公告 -->
      <view class="m-l-32 m-r-32">
        <NoticeItem
          v-if="isLoadingMenu && currentUserFullInfo && currentUserFullInfo.id"
          :isSelf="isSelf"
          :menu-list="menuList"
          class="m-t-32"
          @updateApprove="updateFn"
        />
      </view>
    </view>
    <view :class="{ 'bg-f5f9ff': showActionNav }" class="workbench-padding">
      <!-- 运营支持 -->
      <OperationBox v-if="getMenuBooFn('功能区-找运营')" />
      <!-- 新手任务 -->
      <!-- <NewTask />-->
      <!-- 数据看板 -->
      <DataBoard />
      <!-- 轮播图 -->
      <SwiperFigure :list="swiperList" />
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
    <VoComplaintAction ref="complaintRef" />
    <!--  底部悬浮end  -->
  </scroll-view>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import SupplierTitle from '@/pages/SupplierCenter/components/WorkbenchComponents/SupplierTitle'
  import NoticeItem from '@/pages/SupplierCenter/components/WorkbenchComponents/NoticeItem'
  import OperationBox from '@/pages/SupplierCenter/components/WorkbenchComponents/OperationBox'
  import NewTask from '@/pages/SupplierCenter/components/WorkbenchComponents/NewTask'
  import DataBoard from '@/pages/SupplierCenter/components/WorkbenchComponents/DataBoard'
  import SwiperFigure from '@/pages/SupplierCenter/components/WorkbenchComponents/SwiperFigure'
  import VoDragButton from '@/components/VoDragButton/VoDragButton'
  import helpUtil, { checkIsApproveFn, linkToEasy, showLoading, toRoleHome } from '@/common/helper'
  import devConf from '@/common/env'
  import store from '@/store'
  import EraApproveModal from '@/uni_modules/era-ui/components/EraApproveModal/EraApproveModal'

  export default {
    name: 'TabbarWorkbench',
    components: {
      EraApproveModal,
      SupplierTitle,
      NoticeItem,
      OperationBox,
      NewTask,
      DataBoard,
      SwiperFigure,
      VoDragButton,
    },
    data() {
      return {
        isLoadingMenu: false,
        menuList: [], // 菜单权限列表
        showApprove: false, // 认证弹窗
        hidden: true,
        showActionNav: false, //滑动显示nav
        opacity: 0, // 滑动显示导航的透明度
        animate: false,
        animationData: {},
        animationSpaceData: {},
        currentUserFullInfo: {},
        swiperList: [],
        orderNumberData: {},
        staticData: '',
        isSelf: false,
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
      // 初始化工作台排序
      this.initRoleFn()

      store.dispatch('user/getFullUserInfo').then((res) => {
        this.currentUserFullInfo = res
        this.$store.dispatch('user/setUseInfoItem', res)
        this.isSelf = this.currentUserFullInfo.isSelf
        // if (Number(this.currentUserFullInfo.checkStatus) === 0) {
        // this.showApprove = true
        // }
      })

      this.getBannerList()
      this.reqMissMessageCount()
      this.getOrderDataRequest()
    },
    methods: {
      //供应商平台客户数据统计
      getStaticData() {
        this.$VoHttp.apiCompanyInfoSupplierStatistical().then((res) => {
          this.staticData = res.data
        })
      },
      ...mapActions('serviceNotification', ['reqMissMessageCount']),
      updateFn() {
        if (this.currentUserFullInfo.checkStatus == 1) {
          this.$u.toast('账号正在认证中，审核通过后才可以访问该页面。')
          return
        }
        this.showApprove = true
      },
      /**
       * @description 我的用户相关
       */
      getMenuBooFn(name) {
        let boo = false
        this.menuList.map((item) => {
          if (item == name) {
            boo = true
          }
        })
        return boo
      },
      async initRoleFn() {
        this.isLoadingMenu = false
        await this.$VoHttp
          .apiMenuTree({
            orgCode: this.userInfo.roleCode,
          })
          .then((res) => {
            let result = []
            res.data.map((item) => {
              if (item.name === '工作台') {
                result = item.children || []
              }
            })
            if (result && result.length) {
              this.menuList = result.map((item) => item.name)
            }
            this.isLoadingMenu = true
          })
      },
      /**
       * @description 服务商认证跳转
       */

      /**
       * @description 服务商认证跳转
       */
      agentApproveFn() {
        console.log(this.userInfo.checkStatus === -1, 'this.userInfo.checkStatus === -1')
        // 0：资料未提交，1:审核中 ，2：审核拒绝 ，3：认证成功，4：绑定手机号
        if (+this.userInfo.checkStatus === 0) {
          //companyType   企业类型（2：企业会员, 3：个人会员）
          linkToEasy('/pages/AuthenticationInformation/FirstStepDefault')
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

        linkToEasy('/pagesCommon/StoreInfo/ApproveInfo')
      },
      getBannerList() {
        // ("agent", "服务商"),
        // SUPPLIER("supplier", "供应商"),
        // GARAGE("garage", "汽修厂"),
        // CHANNEL_MANAGER("channelManager", "渠道经理"),
        // OP("op", "运营平台"),
        // INVESTMENT_MANAGER("investmentManager", "招商经理"),
        // SKILLED_WORKER("skilledWorker", "集师傅"),
        // RECYCLING("recycling", "回收公司"),
        // OLD_MACHINE("oldMachine", "旧机买家"),
        // PLAT_WAREHOUSE("platWarehouse", "平台仓库");
        this.$VoHttp
          .apiContentSwiperList({ location: 'homeBanner', platformCode: 'supplier' })
          .then((res) => {
            this.swiperList = res.data
          })
          .catch((e) => {
            uni.$u.toast(e.message || '请检查网络')
          })
      },
      //头部菜单页面跳转 0待发货1超时未发货2库存预警3总收益
      goPage(key) {
        if (key === '0') {
          this.$linkToEasy('/pagesSupplier/Order/OrderList/OrderList?orderStatusMarket=1120&type=1')
        } else if (key === '1') {
          this.$linkToEasy(
            '/pagesSupplier/Order/OrderList/OrderList?orderStatusMarket=1120&isTimeout=1&type=1',
          )
        } else if (key === '2') {
          this.$linkToEasy(
            '/pagesSupplier/Warehouse/RepairProduct/ReplenishGoodsList?queryStatus=2',
          )
        }
      },
      goUrl(url) {
        if (this.currentUserFullInfo.checkStatus == 1) {
          this.$u.toast('账号正在认证中，审核通过后才可以访问该页面。')
          return
        }
        if (!checkIsApproveFn()) {
          this.showApprove = true
          return
        }
        this.$linkToEasy(url)
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
      openHidden() {
        this.animate = true
        this.hidden = !this.hidden
        let height = 0
        let heightSpace = 0
        if (!this.hidden) {
          height = 73
          heightSpace = 20
        }
        let animation = uni.createAnimation({
          // 必须设置为true，否则会到面板收起或展开时，页面其他元素不会随之调整它们的布局
          needLayout: true,
          timingFunction: 'ease-in-out',
        })
        let animationSpace = uni.createAnimation({
          // 必须设置为true，否则会到面板收起或展开时，页面其他元素不会随之调整它们的布局
          needLayout: true,
          timingFunction: 'ease-in-out',
        })
        animation
          .height(height)
          .step({
            duration: 400,
          })
          .step()
        animationSpace
          .height(heightSpace)
          .step({
            duration: 400,
          })
          .step()
        this.animationData = animation.export()
        this.animationSpaceData = animationSpace.export()
      },
      //获取订单统计
      getOrderDataRequest() {
        this.getStaticData()
        this.$VoHttp
          .apiHomeSupplier({}, { noLoading: true })
          .then((res) => {
            if (res.data) {
              this.orderNumberData = res.data
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

    &-action {
      position: fixed;
      top: 0;
      width: 750rpx;
      z-index: 99;
      background: #fff;
    }
    &-bg {
      width: 750rpx;
      .animation-class {
        height: 0px;
        overflow: hidden;
      }
      &__state {
        box-sizing: border-box;
        margin-top: 40rpx;
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
      &__channel {
        margin-top: 56rpx;
        padding: 0 32rpx;
        box-sizing: border-box;
        .channel-img {
          width: 256rpx;
          height: 104rpx;
        }
        .channel-explain {
          height: 80rpx;
          line-height: 80rpx;
          text-align: center;
          background: rgba(254, 243, 239, 0.7);
          backdrop-filter: blur(8rpx);
          border-top-right-radius: 200rpx;
          border-bottom-right-radius: 200rpx;
          font-weight: bold;
          font-size: 28rpx;
          color: #f87020;
        }
      }
      &__block {
        //display: grid;
        //grid-template-columns: 214rpx 214rpx 214rpx;
        //grid-column-gap: 22rpx;
        display: flex;
        align-items: center;
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
      padding: 0 32rpx;
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
