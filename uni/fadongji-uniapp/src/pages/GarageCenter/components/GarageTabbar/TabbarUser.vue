<template>
  <view class="user">
    <!--  头部  -->
    <VoBatteryBar bg-color="transparent" />
    <view class="user-nav flex-vertical-c" @click.stop="userCentre">
      <!--<view class="user-nav__operate" />-->
      <view class="flex">
        <view class="user-nav_phooto_box">
          <image
            :src="currentUserFullInfo.storeUrl || '/static/default_avatar.png'"
            class="user-nav__photo"
          />
          <!--          <view-->
          <!--            v-if="Number(currentUserFullInfo.checkStatus) !== 3"-->
          <!--            class="user-nav__status"-->
          <!--            @click.stop="goApproveStatusFn"-->
          <!--            >{{ getcApproveStatusFn() }}</view-->
          <!--          >-->
          <view class="user-nav__status">
            <block v-if="currentUserFullInfo.isAdmin">主账户</block>
            <block v-else-if="currentUserFullInfo.checkStatus === -1">游客模式</block>
            <block v-else>子账户</block>
          </view>
          <view v-if="Number(currentUserFullInfo.checkStatus) === 3">
            <VoIcon :size="16" class="user-nav__icon" name="v-icon" />
          </view>
        </view>
        <div class="base-info">
          <view v-if="currentUserFullInfo.checkStatus === -1" class="base-info__nickname">
            用户{{ encryptFn(userInfo.userName) }}
          </view>
          <view v-else class="base-info__nickname">
            {{ currentUserFullInfo.storeName || userInfo.userName }}
          </view>
          <view class="flex flex-vertical-c">
            <view class="base-info__sub" @click.stop="toMyLv"
              >等级：{{ currentUserFullInfo.level || 'LV 0' }}</view
            >
            <view
              v-if="currentUserFullInfo.integral"
              class="base-info__sub m-l-16 flex flex-vertical-c"
              @click.stop="toMyIntegral"
            >
              <image class="my-integer m-l-8" src="/static/icons/my_integer.png" />
              <view class="m-l-8">积分:{{ currentUserFullInfo.integral }}</view>
              <VoIcon :size="12" class="m-l-8" color="#FF5319" name="right-arrow" />
            </view>
          </view>
        </div>
      </view>

      <view class="user-nav__operate">
        <VoIcon :opacity="0.65" color="#000" name="right-arrow" />
        <!--<view class="user-nav__operate-main" @click="userCentre">个人主页</view>-->
      </view>
    </view>
    <view class="h48 w-full"></view>
    <!--  我的账户  -->
    <view v-if="getMenuBooFn('我的账户')" class="user-info" @click="goMyAccount">
      <view class="user-info__account flex flex-vertical-c flex-justify-between lh150">
        <view class="flex flex-vertical-c">
          <view class="fz-b fz-32">我的账户</view>
          <view class="flex flex-vertical-c" @click.stop="eyesOpen = !eyesOpen">
            <VoIcon v-if="eyesOpen" class="m-l-4" name="eyes-open" size="20" />
            <VoIcon v-else class="m-l-4" name="eyes-down" size="20" />
          </view>
        </view>
        <view class="flex flex-vertical-c">
          <view class="color-block-65 fz-28">更多</view>
          <VoIcon :opacity="0.45" color="#000000" name="right-arrow" size="20" />
        </view>
      </view>
      <view class="flex flex-vertical-c">
        <view class="flex1 user-info__item">
          <view v-if="+currentUserFullInfo.checkStatus === 3" class="fz-b m-b-10">
            {{ eyesOpen ? main.canWithdrawAmount : '***' }}
          </view>
          <view v-else class="fz-b m-b-10">--</view>
          <view class="fz-26 m-t-8">可提现金额</view>
        </view>
        <view class="flex1 user-info__item">
          <view v-if="+currentUserFullInfo.checkStatus === 3" class="fz-b m-b-10">
            {{ eyesOpen ? main.awaitSettlementAmount : '***' }}
          </view>
          <view v-else class="fz-b m-b-10">--</view>
          <view class="fz-26 m-t-8">待结算金额</view>
        </view>
      </view>
    </view>
    <!--  我的订单  -->
    <view class="user-space h16" />
    <view v-if="getMenuBooFn('我的订单')" class="user-order">
      <view class="flex flex-vertical-c flex-justify-between m-b-24">
        <view class="fz-b fz-32">我的订单</view>
        <view
          class="flex flex-vertical-c"
          @click="goTo('/pagesGarage/InstallOrder/InstallOrderList')"
        >
          <view class="fz-28 color-block-65 m-r-8">查看全部</view>
          <VoIcon color="#373A4E" name="right-arrow" size="16" />
        </view>
      </view>
      <view class="user-order__list flex flex-vertical-c">
        <view
          v-for="(info, index) of orderList"
          :key="index"
          class="flex flex-column flex-vertical-c list-item relative"
          @click="nextPage(info)"
        >
          <u-badge
            :absolute="true"
            :offset="[-7, 3]"
            :value="info.num || 0"
            bgColor="#F20014"
            max="99"
            numberType="ellipsis"
          />
          <VoIcon :name="info.iconName" size="20" />
          <view class="fz-28 m-t-8 color-block">{{ info.name }}</view>
        </view>
      </view>
    </view>
    <!--  我的服务  -->
    <view class="user-space h16" />
    <view class="user-service">
      <view class="user-service__title fz-b fz-32">我的服务</view>
      <view class="user-service__list">
        <!--        <u-grid :border="false" col="4">-->
        <!--          <block v-for="(item, index) of serviceList">-->
        <!--            <u-grid-item-->
        <!--              v-if="getMenuBooFn(item.name)"-->
        <!--              :key="index"-->
        <!--              :class="'m-b-40'"-->
        <!--              @click="servicePage(item, index)"-->
        <!--            >-->
        <!--              <VoIcon :name="item.iconName" size="20" />-->
        <!--              <text class="fz-28 m-t-8 color-block">{{ item.name }}</text>-->
        <!--            </u-grid-item>-->
        <!--          </block>-->
        <!--        </u-grid>-->
        <block v-for="(item, index) of serviceList" :key="index">
          <view v-if="getMenuBooFn(item.name)" class="list-grid">
            <view
              :class="'m-b-40'"
              class="flex flex-column flex-vertical-c"
              @click="servicePage(item, index)"
            >
              <VoIcon :name="item.iconName" size="20" />
              <text class="fz-28 m-t-8 color-block">{{ item.name }}</text>
            </view>
          </view>
        </block>
      </view>
    </view>

    <VoComplaintAction ref="complaintRef" />
    <EraApproveModal ref="approveRef" :show.sync="showApprove" />

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
    <VoHelpAction ref="helpRef" />
    <VoContactChannel v-if="channelInfo" ref="channelRef" :channel-info="channelInfo" />
  </view>
</template>

<script>
  import { hideLoading, linkToEasy, showLoading } from '@/common/helper'
  import store from '@/store'
  import VoContactChannel from '@/pages/GarageCenter/components/GarageTabbar/VoContactChannel'

  // #ifdef APP-PLUS
  const vocenLogin = uni.requireNativePlugin('vocen-login')
  const vocenDyLogin = uni.requireNativePlugin('vocen-dyLogin')
  // #endif

  export default {
    name: 'AgentTabbarUser',
    components: { VoContactChannel },
    props: {},
    data() {
      return {
        main: {},
        eyesOpen: false,
        showApprove: false, // 认证模态框
        currentUserFullInfo: {},
        // 我的订单
        orderList: [
          {
            iconName: 'pending-payment',
            name: '待付款',
            path: '/pagesGarage/InstallOrder/InstallOrderList?tabIndex=1',
            num: 0,
          },
          {
            iconName: 'send-goods',
            name: '待发货',
            path: '/pagesGarage/InstallOrder/InstallOrderList?tabIndex=2',
            num: 0,
          },
          {
            iconName: 'pending-receipt',
            name: '待收货',
            path: '/pagesGarage/InstallOrder/InstallOrderList?tabIndex=3',
            num: 0,
          },
          {
            iconName: 'completed',
            name: '已完成',
            path: '/pagesGarage/InstallOrder/InstallOrderList?tabIndex=4',
            num: 0,
          },
          {
            iconName: 'return-exchange',
            name: '退货/退款',
            path: '/pagesGarage/Order/ReturnExchange/RefundAfterSales',
          },
        ],
        serviceList: [
          {
            iconName: 'apply-invoice',
            name: '我的发票',
            path: '/pagesSupplier/UserCenter/Invoice/InvoiceHistory',
            show: true,
          },
          {
            iconName: 'staff-management',
            name: '员工管理',
            path: '/pagesCommon/AuthorityManagement/AuthorityManagement',
            show: true,
          },
          {
            iconName: 'collect-icon',
            name: '我的收藏',
            show: true,
            path: '/pagesGarage/UserCenter/GoodsCollection',
          },
          // {
          //   iconName: 'money',
          //   name: '我的积分',
          //   show: true,
          //   path: '/pagesGarage/UserCenter/MyIntegral?operationType=1',
          // },
          {
            iconName: 'appraise',
            name: '我的评价',
            show: true,
            path: '/pagesGarage/MyEvaluation/MyEvaluation',
          },
          {
            iconName: 'person-user',
            name: '个人主页',
            show: true,
            path: '/pagesAgent/PersonalHomepage/PersonalHomepage',
            noApprove: true,
          },
          {
            iconName: 'help-user',
            name: '帮助中心',
            show: true,
            path: '/pagesCommon/HelperContent/HelperContentList',
            noApprove: true,
          },
          {
            iconName: 'complaint-user',
            name: '我要投诉',
            show: true,
            path: '',
          },
          {
            iconName: 'customer-service-new',
            name: '平台客服',
            show: true,
            path: '',
            noApprove: true,
          },
          {
            iconName: 'setting-user',
            name: '设置',
            show: true,
            path: '/pagesGarage/SettingCenter/Setting',
            noApprove: true,
          },
        ],
        // 渠道经理信息
        channelInfo: null,
        roleMenuList: [],
      }
    },
    created() {
      this.initFn()
      this.initRoleFn()
    },
    methods: {
      encryptFn() {
        return this.userInfo.userName.slice(0, 3) + '****' + this.userInfo.userName.slice(7, 11)
      },
      /**
       * @description 我的用户相关
       */
      getMenuBooFn(name) {
        let boo = false
        this.roleMenuList.map((item) => {
          if (item == name) {
            boo = true
          }
        })
        return boo
      },
      async initRoleFn() {
        await this.$VoHttp
          .apiMenuTree(
            {
              orgCode: this.userInfo.roleCode,
            },
            { noLoading: true },
          )
          .then((res) => {
            let result = []
            res.data.map((item) => {
              if (item.name === '我的') {
                result = item.children
              }
            })

            this.roleMenuList = result.map((item) => item.name)
          })
      },
      /**
       * 去我的积分
       */
      toMyIntegral() {
        this.$linkToEasy('/pagesGarage/UserCenter/MyIntegral?operationType=1')
      },
      /**
       * 去用户等级
       */
      toMyLv() {
        let href = '/pagesGarage/UserCenter/MyIntegral?operationType=2'
        if (this.currentUserFullInfo.level) {
          href = href + `&level=${this.currentUserFullInfo.level}`
        }
        this.$linkToEasy(href)
      },
      /**
       * @description 服务商认证跳转
       */

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
      // 页面跳转方法
      goTo(url) {
        this.$linkToEasy(url)
      },
      // nextPage(info) {
      //   if (info.name === '我要投诉') {
      //     this.$refs.complaintRef.open()
      //   } else {
      //     // if(!this.$checkIsApproveFn()&&!item.noApprove){
      //     //   this.showApprove=true
      //     //   return
      //     // }
      //     this.$linkToEasy(info.path)
      //   }
      // },
      /**
       * 我的订单跳转
       * @param item
       */
      nextPage(item) {
        if (this.currentUserFullInfo.checkStatus == 1) {
          this.$u.toast('账号正在认证中，审核通过后才可以访问该页面。')
          return
        }
        if (!item.noApprove) {
          if (!this.$checkIsApproveFn()) {
            this.showApprove = true
            return
          }
        }
        this.$linkToEasy(item.path)
      },
      /**
       * 我的服务
       * @param e
       */
      servicePage(item) {
        // todo 部分路由需要补充
        if (item.name === '设置' || item.name === '帮助中心') {
          this.$linkToEasy(item.path)
        } else if (item.name === '我要投诉') {
          if (!this.$checkIsApproveFn()) {
            this.showApprove = true
            return
          }
          this.$refs.complaintRef.open()
        } else if (item.name === '平台客服') {
          this.$refs.helpRef.open()
        } else if (item.name === '联系渠道经理') {
          if (!this.$checkIsApproveFn()) {
            this.showApprove = true
            return
          }
          this.$refs.channelRef.open()
        } else {
          this.$linkToEasy(item.path)
        }
      },
      // 获取渠道经理信息
      async getChannelInfo() {
        try {
          const { data } = await this.$VoHttp.apiCompanyInfoInviterInfo({}, { noLoading: true })
          console.log(data, 'a===================')
          this.channelInfo = data
          if (data) {
            this.serviceList.splice(7, 0, {
              iconName: 'mobile-new',
              name: '联系渠道经理',
              path: '',
            })
          }
        } catch (e) {
          console.log(e)
          this.$u.toast(e.message || '网络错误')
        }
      },
      /**
       * 去认证详情
       */
      goApproveStatusFn() {
        this.$refs.approveRef.garageApproveFn()
      },
      async initFn(boo) {
        if (!boo) {
          showLoading()
        }
        await this.initInfo()
        // if (!this.$checkIsApproveFn()) {
        //   this.showApprove = true
        //   return
        // }
        await this.mainInfo()
        await this.getOrderDataRequest()
        await this.getChannelInfo()
        hideLoading()
      },
      // 获取我的账户信息
      mainInfo() {
        this.$VoHttp.USER.apiAccountDetailsMain({}, { noLoading: true })
          .then((res) => {
            this.main = res.data || {}
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '请检查网络')
          })
      },
      initInfo() {
        store.dispatch('user/getFullUserInfo').then((res) => {
          this.currentUserFullInfo = res
          this.$store.dispatch('user/setUseInfoItem', res)
          // if (Number(this.currentUserFullInfo.checkStatus) === 0) {
          //   this.showApprove = true
          // }
        })
      },
      /**
       * 获取验证状态
       */
      getcApproveStatusFn() {
        switch (Number(this.currentUserFullInfo.checkStatus)) {
          case 0:
            return '资料未提交'
          case 1:
            return '审核中'
          case 2:
            return '审核拒绝'
          case 3:
            return '认证成功'
          case 4:
            return '需绑定手机号'
          default:
            return '游客模式'
        }
      },
      /**
       * 去我的账户
       */
      goMyAccount() {
        if (!this.$checkIsApproveFn()) {
          this.showApprove = true
          return
        }
        this.$linkToEasy('/pagesAgent/UserCenter/MyAccount/MyAccount')
      },
      /**
       * @description 退出登录
       */
      loginOut() {
        const roleCode = this.userInfo.platformCode
        this.$VoHttp
          .logoff({}, { noPrefix: true })
          .then((res) => {
            this.vocenPluginJPushModule()
            this.$store.dispatch('user/setUseInfo', {})
            setTimeout(() => {
              uni.reLaunch({
                url: '/pages/CommonLogin/UserLogin?roleCode=' + roleCode,
              })
            }, 1500)
            uni.$u.toast('退出成功')
          })
          .catch((e) => {
            this.$store.dispatch('user/setUseInfo', {})
            setTimeout(() => {
              uni.reLaunch({
                url: '/pages/CommonLogin/UserLogin?roleCode=' + roleCode,
              })
            }, 1500)
            uni.$u.toast('退出成功')
          })
      },
      /**
       * @description 跳转登录
       */
      goLoginFn(roleCode) {
        this.$linkToEasy('/pages/CommonLogin/UserLogin?roleCode=' + roleCode)
      },
      userCentre() {
        if (this.userInfo.checkStatus == -1) {
          this.showApprove = true
          return
        }

        this.$linkToEasy('/pagesGarage/UserCenter/UserCenter')
      },
      reachBottom() {
        console.log('触底')
      },
      //获取订单统计
      getOrderDataRequest() {
        this.$VoHttp
          .apiOrderSellStatus({}, { noLoading: true })
          .then((res) => {
            if (res.code === '20001') {
              let orderList = res.data
              orderList.forEach((item) => {
                if (+item.statusCode === 1110) {
                  this.orderList[0].num = item.statusCount
                }
                if (+item.statusCode === 1120) {
                  this.orderList[1].num = item.statusCount
                }
                if (+item.statusCode === 1130) {
                  this.orderList[2].num = item.statusCount
                }
                if (+item.statusCode === 1140) {
                  this.orderList[3].num = item.statusCount
                }
              })
            } else {
              console.log('获取订单统计失败', res.message)
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
  //page{
  //  background: #F6F7F8;
  //}
  .user-space {
    background-color: #f7f7f8;
  }
  .user {
    width: 750rpx;
    flex: 1;
    background-color: #f6f7f8;
    overflow-x: hidden;
    padding-top: 20rpx;
    box-sizing: border-box;
    //position: relative;
    background-image: url('/static/garage/user/user_bg.png');
    background-repeat: no-repeat;
    background-size: 100% 868rpx;
    .page-container {
      position: relative;
      z-index: 2;
    }
    .page-bg {
      position: absolute;
      width: 750rpx;
      height: 1066rpx;
      left: 0rpx;
      top: 0rpx;
      background: linear-gradient(
        180deg,
        rgba(46, 64, 186, 0.204) -40.14%,
        rgba(151, 161, 220, 0) 69.39%
      );
    }

    &-nav {
      //width: 750rpx;
      padding: 0 32rpx;
      display: flex;
      justify-content: space-between;

      .base-info {
        padding-left: 16rpx;
        padding-top: 20rpx;
        &__nickname {
          font-size: 32rpx;
          font-weight: bold;
          color: rgba(0, 0, 0, 0.85);
          margin-bottom: 8rpx;
        }
        &__sub {
          background: #ffece5;
          border-radius: 24rpx;
          padding: 2rpx 16rpx;
          font-weight: bold;
          font-size: 24rpx;
          line-height: 36rpx;
          color: #ff5319;
        }
        &__acounttype {
          font-size: 28rpx;
          color: rgba(0, 0, 0, 0.65);
        }
      }

      &__operate {
        //width: 200rpx;
        padding-right: 8rpx;
        &-main {
          margin-left: auto;
          margin-right: 20rpx;
          width: 120rpx;
          height: 46rpx;
          line-height: 46rpx;
          font-size: 24rpx;
          text-align: center;
          border: 2rpx solid #999999;
        }
      }

      &_phooto_box {
        position: relative;
        width: 136rpx;
        height: 136rpx;
      }
      &__photo {
        width: 136rpx;
        height: 136rpx;
        border: 4rpx solid #fff;
        display: block;
        border-radius: 50%;
        overflow: hidden;
        margin: 0rpx auto 0rpx;
      }

      &__status {
        width: 120rpx;
        //padding: 0 20rpx;
        height: 36rpx;
        border-radius: 20rpx;
        //background: linear-gradient(270.27deg, #ff5622 8.32%, #ff8640 93.91%);
        background: #ff5319;
        color: #ffffff;
        font-size: 24rpx;
        text-align: center;
        line-height: 36rpx;
        margin: 0rpx auto 0rpx;
        z-index: 2;
        position: relative;
        top: -32rpx;
      }
      &__icon {
        position: absolute;
        top: 0;
        right: 0;
      }
    }

    &-info {
      width: 750rpx;
      padding: 24rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
      border-top-left-radius: 20rpx;
      border-top-right-radius: 20rpx;
      &__account {
        padding: 0 0 20rpx;
        box-sizing: border-box;
      }

      &__line {
        width: 2rpx;
        height: 50rpx;
        background-color: #eee;
      }

      &__item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 34rpx;
        color: #333333;
      }
    }
    &-order {
      padding: 24rpx 32rpx;
      background: #fff;
      &__list {
        justify-content: space-around;
        .list-item {
          margin-right: 48rpx;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
    &-swiper {
      margin: 24rpx 32rpx;
      box-sizing: border-box;
    }
    &-service {
      background: #fff;
      width: 750rpx;
      box-sizing: border-box;
      &__title {
        padding: 24rpx 32rpx;
      }
      &__list {
        width: 100%;
        padding: 0rpx 24rpx 0rpx 24rpx;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        .list-grid {
          width: 25%;
        }
        .list-item {
          margin: 40rpx 62rpx 0 0;
        }
        .list-item:nth-of-type(-n + 4) {
          margin-top: 0;
        }
      }
    }

    &-item {
      width: 750rpx;
      height: 120rpx;
      display: flex;
      align-items: center;
      padding: 0rpx 30rpx;
      box-sizing: border-box;
      border-top: 2rpx solid #eee;
      font-size: 32rpx;
      color: #333333;

      &__icon {
        width: 70rpx;
        height: 70rpx;
        margin-right: 20rpx;
      }

      &__right {
        width: 40rpx;
        height: 40rpx;
        margin-left: auto;
      }
    }
  }

  .border-bottom {
    border-bottom: 2rpx solid #eee;
  }
  .suspension {
    position: fixed;
    bottom: 172rpx;
    left: 32rpx;
    width: 686rpx;
    height: 88rpx;
    background: rgba(0, 0, 0, 0.65);
    border-radius: 62rpx;
    padding: 0 16rpx;
    box-sizing: border-box;
    z-index: 99;
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
  .my-integer {
    width: 24rpx;
    height: 24rpx;
  }
</style>
