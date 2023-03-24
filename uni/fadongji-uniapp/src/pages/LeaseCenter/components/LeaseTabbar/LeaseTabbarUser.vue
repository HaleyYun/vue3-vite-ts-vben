<template>
  <view class="user">
    <VoBatteryBar bg-color="transparent" />
    <view class="page-container">
      <view class="user-nav" @click.stop="userCentre">
        <!--<view class="user-nav__operate" />-->
        <view class="flex">
          <div class="user-nav_phooto_box">
            <image
              :src="currentUserFullInfo.storeUrl + '&type=2' || '/static/default_avatar.png'"
              class="user-nav__photo"
            />
            <view
              v-if="Number(this.currentUserFullInfo.checkStatus) !== 3"
              class="user-nav__status"
              @click.stop="goApproveStatusFn"
              >{{ getcApproveStatusFn() }}</view
            >
          </div>
          <div class="base-info">
            <view class="base-info__nickname">{{ currentUserFullInfo.storeName }}</view>
            <view class="base-info__acounttype">{{ currentUserFullInfo.userName }}</view>
          </div>
        </view>
        <view class="user-nav__operate">
          <VoIcon :opacity="0.65" color="#000" name="right-arrow" />
          <!--<view class="user-nav__operate-main" @click="userCentre">个人主页</view>-->
        </view>
      </view>
      <view class="m-t-64">
        <EraCell
          v-for="(item, index) of settingList"
          :key="index + 'bor'"
          :title="item.name"
          isLink
          @click="nextPage(item)"
        >
          <VoIcon slot="icon" :name="item.iconName" size="20" />
        </EraCell>
      </view>
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
    <VoModal
      :closeOnClickOverlay="true"
      :content="content"
      :show="showModalCancel"
      :showCancelButton="true"
      cancelText="暂不认证"
      confirmText="立即认证"
      @cancel="cancel"
      @confirm="giveUp"
    />
  </view>
</template>

<script>
  import store from '@/store'

  // #ifdef APP-PLUS
  const vocenLogin = uni.requireNativePlugin('vocen-login')
  const vocenDyLogin = uni.requireNativePlugin('vocen-dyLogin')
  // #endif

  export default {
    name: 'LeaseTabbarUser',
    components: {},
    props: {},
    data() {
      return {
        content: '您的账号未认证通过，请先完成认证',
        showModalCancel: false, // 认证模态框
        currentUserFullInfo: {
          userFace: '/static/default_avatar.png',
          userName: '用户名',
          userPhone: '手机号',
        },
        settingList: [
          {
            name: '帮助中心',
            path: '/pagesCommon/HelperContent/HelperContentList',
            iconName: 'help-user',
          },
          {
            name: '设置',
            path: '/pagesChannelManager/Setting/Setting',
            iconName: 'setting-user',
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
      goApproveStatusFn() {
        // 0：资料未提交，1:审核中 ，2：审核拒绝 ，3：认证成功，4：绑定手机号
        if (this.currentUserFullInfo.checkStatus == 0) {
          this.giveUp()
          return
        } else if (this.currentUserFullInfo.checkStatus == 4) {
          this.$linkToEasy('/pagesCommon/AuthorityManagement/BindTonlyPhone')
          return
        }
        this.$linkToEasy('/pagesCommon/StoreInfo/ApproveInfo')
      },
      initInfo() {
        console.log("调用了么");
        store.dispatch('user/getFullUserInfo').then((res) => {
          this.currentUserFullInfo = res
          if (Number(this.currentUserFullInfo.checkStatus) === 0) {
            this.showModalCancel = true
          }
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
        }
      },
      //loadCurrentUserInfo() {
      //  const userInfo = store.getters['user/getUserInfo']()
      //  console.log({
      //    userInfo,
      //  })
      //  this.$VoHttp.USER.getUserProfileInfo()
      //    .then((res) => {
      //      console.log(res)
      //    })
      //    .catch((err) => {})
      //},
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
      nextPage(item) {
        if (item.name === '我要投诉') {
          this.$refs.complaintRef.open()
        } else {
          this.$linkToEasy(item.path)
        }
      },
      userCentre() {
        this.$linkToEasy('/pagesChannelManager/UserCenter/UserCenter')
      },
      /**
       *  打开模态框
       */
      open() {
        this.showModalCancel = true
      },
      /**
       * 关闭模态框
       */
      close() {
        this.showModalCancel = false
      },
      /**
       * 模态框点击确认按钮时触发
       */
      giveUp() {
        this.close()
        //companyType   企业类型（2：企业会员, 3：个人会员）
        if (Number(this.currentUserFullInfo.companyType) === 2) {
          this.$linkToEasy('/pages/AuthenticationInformation/FirstStepDefault')
        } else if (Number(this.currentUserFullInfo.companyType) === 3) {
          this.$linkToEasy('/pages/AuthenticationInformation/AgentAccount')
        }
        // 如果是服务商
        this.$linkToEasy('/pages/AuthenticationInformation/PublicAccounts')
      },
      /**
       * 模态框点击取消按钮时触发
       */
      cancel() {
        this.close()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .user {
    width: 750rpx;
    flex: 1;
    background-color: #fff;
    overflow-x: hidden;
    padding-top: 48rpx;
    box-sizing: border-box;
    //position: relative;
    background-image: url('/static/garage/user/user_bg.png');
    background-repeat: no-repeat;
    background-size: 100% 346rpx;
    .page-container {
      position: relative;
      z-index: 2;
    }

    &-nav {
      padding: 0 28rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .base-info {
        padding-left: 16rpx;
        &__nickname {
          font-weight: bold;
          font-size: 32rpx;
          color: rgba(0, 0, 0, 0.85);
          margin-top: 44rpx;
        }
        &__acounttype {
          font-size: 28rpx;
          color: rgba(0, 0, 0, 0.65);
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
      padding: 24rpx 32rpx;
      box-sizing: border-box;
      border-top: 2rpx solid #eee;
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
