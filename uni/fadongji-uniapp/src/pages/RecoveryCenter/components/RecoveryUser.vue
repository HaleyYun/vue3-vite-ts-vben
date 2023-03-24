<template>
  <view class="user">
    <VoBatteryBar bg-color="transparent" />
    <view class="page-container">
      <view class="user-nav flex-vertical-c" @click.stop="userCentre">
        <!--<view class="user-nav__operate" />-->
        <view class="flex">
          <div class="user-nav_phooto_box">
            <image
              :src="currentUserFullInfo.storeUrl || '/static/default_avatar.png'"
              class="user-nav__photo"
            />
            <view class="user-nav__status" @click.stop="goApproveStatusFn">{{
              getcApproveStatusFn()
            }}</view>
          </div>
          <div class="base-info">
            <view class="base-info__nickname">
              {{ currentUserFullInfo.storeName || '游客' }}
            </view>
            <view class="base-info__acounttype">
              <block v-if="currentUserFullInfo.isAdmin">主账户</block>
              <block v-else-if="currentUserFullInfo.checkStatus === -1">游客模式</block>
              <block v-else>子账户</block>
            </view>

            <!--            <view class="flex flex-vertical-c">-->
            <!--              <view class="base-info__sub" @click.stop="toMyLv"-->
            <!--                >等级：{{ currentUserFullInfo.level }}</view-->
            <!--              >-->
            <!--            </view>-->
          </div>
        </view>
        <view class="user-nav__operate">
          <VoIcon :opacity="0.45" :size="20" color="#000" name="right-arrow" />
          <!--<view class="user-nav__operate-main" @click="userCentre">个人主页</view>-->
        </view>
      </view>

      <view class="user-info" @click="goMyAccount">
        <view class="user-info__account flex flex-vertical-c flex-justify-between lh150">
          <view class="flex flex-vertical-c">
            <view>我的账户</view>
            <view class="flex flex-vertical-c" @click.stop="eyesOpen = !eyesOpen">
              <VoIcon v-if="eyesOpen" class="m-l-4" name="eyes-open" size="20"></VoIcon>
              <VoIcon
                v-else
                :size="20"
                class="m-l-4"
                name="eyes-down"
                @click.stop="eyesOpen = true"
              ></VoIcon>
            </view>
          </view>
          <view class="flex flex-vertical-c">
            <VoIcon :opacity="0.45" :size="20" color="#000" name="right-arrow" />
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
          <view class="user-info__line" />

          <view class="user-info__line" />
          <view
            class="flex1 user-info__item"
            @click.stop="$linkToEasy('/pagesSupplier/UserCenter/MyAccount/AmountSettled')"
          >
            <view v-if="+currentUserFullInfo.checkStatus === 3" class="fz-b m-b-10">
              {{ eyesOpen ? main.awaitSettlementAmount : '***' }}
            </view>
            <view v-else class="fz-b m-b-10">--</view>
            <view class="fz-26 m-t-8">待结算金额</view>
          </view>
        </view>
      </view>

      <!--      <VoCellGroup>-->
      <EraCell
        v-for="(item, index) of settingList"
        :key="index + 'bor'"
        :title="item.name"
        isLink
        @click="nextPage(item)"
      >
        <image
          v-if="item.name === '帮助中心'"
          slot="icon"
          class="user-img"
          src="/static/icons/user_help.png"
        ></image>
        <VoIcon v-else slot="icon" :name="item.iconName" color="#373A4E" size="20" />
      </EraCell>
      <!--      </VoCellGroup>-->

      <view class="user-space h8" />
    </view>
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

    <VoComplaintAction ref="complaintRef" />

    <!--    <EraApproveModal :show.sync="showApprove"></EraApproveModal>-->
    <VoHelpAction ref="helpRef" />
  </view>
</template>

<script>
  import helper from '@/common/helper'
  import store from '@/store'

  export default {
    name: 'RecoveryUser',
    components: {},
    props: {},
    data() {
      return {
        main: {},
        eyesOpen: true,
        content: '您的账号未认证通过，请先完成认证',
        showApprove: false, // 认证模态框
        currentUserFullInfo: {},
        settingList: [
          {
            name: '个人主页',
            path: '/pagesAgent/PersonalHomepage/PersonalHomepage',
            iconName: 'person-user',
          },
          {
            name: '帮助中心',
            path: '/pagesCommon/HelperContent/HelperContentList',
            iconName: 'help-user',
            noApprove: true,
          },
          {
            name: '我要投诉',
            path: '',
            iconName: 'complaint-user',
          },
          {
            name: '平台客服',
            path: '',
            iconName: 'customer-service-new',
            noApprove: true,
          },
          {
            name: '设置',
            path: '/pagesRecovery/UserCenter/SettingUp/SettingUp',
            iconName: 'setting-user',
            noApprove: true,
          },
        ],
      }
    },
    created() {
      this.initInfo()
    },
    methods: {
      /**
       * @description 服务商认证跳转
       */
      agentApproveFn() {
        // 0：资料未提交，1:审核中 ，2：审核拒绝 ，3：认证成功，4：绑定手机号
        if (+this.userInfo.checkStatus === 0) {
          //companyType   企业类型（2：企业会员, 3：个人会员）
          if (Number(this.userInfo.companyType) === 2) {
            this.$linkToEasy('/pages/AuthenticationInformation/FirstStepDefault')
            return
          } else if (Number(this.userInfo.companyType) === 3) {
            this.$linkToEasy('/pages/AuthenticationInformation/AgentAccount')
            return
          }
          // 如果是服务商
          this.$linkToEasy('/pages/AuthenticationInformation/PublicAccounts')
          return
        } else if (+this.userInfo.checkStatus === 4) {
          this.$linkToEasy('/pagesCommon/AuthorityManagement/BindTonlyPhone')
          return
        } else if (this.userInfo.checkStatus === -1) {
          // 游客模式单独处理
          this.showApprove = true
          return
        }
        if (this.userInfo.roleCode == 'garage') {
          this.$linkToEasy('/pagesGarage/StoreInfo/ApproveInfo')
          return
        }

        this.$linkToEasy('/pagesCommon/StoreInfo/ApproveInfo')
      },
      /**
       * 去用户等级
       */
      toMyLv() {
        if (this.currentUserFullInfo.level) {
          this.$linkToEasy(
            '/pagesGarage/UserCenter/MyIntegral?operationType=2&level=' +
              this.currentUserFullInfo.level,
          )
        }
      },
      /**
       * 去认证详情
       */
      goApproveStatusFn() {
        if (this.currentUserFullInfo.checkStatus == 0) {
          this.$linkToEasy('/pages/AuthenticationInformation/FirstStepDefault')
          return
        } else if (this.currentUserFullInfo.checkStatus == 4) {
          this.$linkToEasy('/pagesCommon/AuthorityManagement/BindTonlyPhone')
          return
        }
        this.$linkToEasy('/pagesCommon/StoreInfo/ApproveInfo')
      },
      // 获取账户可提现与待结算金额
      async getAccountInfo() {
        try {
          const main = await this.$VoHttp.USER.apiAccountDetailsMain()
          this.main = main.data
        } catch (e) {
          console.error(e)
          this.$u.toast(e.message || '网络错误')
        }
      },
      initInfo() {
        store.dispatch('user/getFullUserInfo').then(async (res) => {
          this.currentUserFullInfo = res
          this.$store.dispatch('user/setUseInfoItem', res)
          if (Number(this.currentUserFullInfo.checkStatus) === 0) {
            this.showApprove = true
          } else if (+this.currentUserFullInfo.checkStatus === 3) {
            await this.getAccountInfo()
          }
        })
      },
      /**
       * 去我的账户
       */
      goMyAccount() {
        if (!this.$checkIsApproveFn()) {
          this.showApprove = true
          return
        }
        this.$linkToEasy('/pagesRecovery/UserCenter/MyAccount/MyAccount')
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
       * @description 退出登录
       */
      loginOut() {
        helper.showLoading()
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
          .finally(() => {
            helper.hideLoading()
          })
      },
      nextPage(item) {
        if (item.name === '我要投诉') {
          this.$refs.complaintRef.open()
        } else if (item.name === '平台客服') {
          this.$refs.helpRef.open()
        } else {
          // if(!this.$checkIsApproveFn()&&!item.noApprove){
          //   this.showApprove=true
          //   return
          // }
          this.$linkToEasy(item.path)
        }
      },
      userCentre() {
        this.$linkToEasy('/pagesRecovery/UserCenter/UserCenter')
      },
      reachBottom() {
        console.log('触底')
      },
    },
  }
</script>

<style lang="scss" scoped>
  //page{
  //  background: #F6F7F8;
  //}
  .user-space {
    //background-color: #f6f7f8;
  }
  .user {
    width: 750rpx;
    flex: 1;
    background-color: #f7f7f8;
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
      padding: 0 28rpx;
      display: flex;
      justify-content: space-between;

      .base-info {
        padding-left: 14rpx;
        padding-top: 20rpx;
        &__nickname {
          font-size: 32rpx;
          font-weight: bold;
          color: rgba(0, 0, 0, 0.85);
          margin-bottom: 8rpx;
        }
        &__acounttype {
          font-size: 28rpx;
          color: rgba(0, 0, 0, 0.65);
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
      }

      &__operate {
        //width: 200rpx;
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
        padding: 0 20rpx;
        height: 36rpx;
        border-radius: 20rpx;
        background: linear-gradient(270.27deg, #ff5622 8.32%, #ff8640 93.91%);
        color: #ffffff;
        font-size: 24rpx;
        text-align: center;
        line-height: 36rpx;
        margin: 0rpx auto 0rpx;
        z-index: 2;
        position: relative;
        top: -32rpx;
      }
    }

    &-info {
      margin-top: 50rpx;
      width: 750rpx;
      padding: 24rpx 32rpx 40rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
      border-top-left-radius: 20rpx;
      border-top-right-radius: 20rpx;
      &__account {
        padding: 0 0 20rpx;
        box-sizing: border-box;
        font-size: 32rpx;
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
  .user-img {
    width: 40rpx;
    height: 40rpx;
  }
  .suspension {
    //ENG-5623
    position: fixed;
    bottom: 172rpx;
    left: 32rpx;
    width: 686rpx;
    height: 88rpx;
    //ENG-5623
    margin: auto;
    margin-bottom: 16rpx;
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
</style>
