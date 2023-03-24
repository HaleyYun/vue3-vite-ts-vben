<template>
  <view class="user">
    <view class="page-bg" />
    <VoBatteryBar bg-color="transparent" />
    <view class="page-container">
      <view class="user-nav" @click.stop="userCentre">
        <!--<view class="user-nav__operate" />-->
        <view class="flex">
          <div class="user-nav_phooto_box">
            <image
              :src="currentUserFullInfo.storeUrl || '/static/default_avatar.png'"
              class="user-nav__photo"
            />
            <view v-if="currentUserFullInfo.checkStatus !== 3" class="user-nav__status">{{
              currentUserFullInfo.checkStatusStr
            }}</view>
          </div>
          <div class="base-info">
            <view v-if="currentUserFullInfo.realName" class="base-info__nickname">
              {{ currentUserFullInfo.realName.substr(0, 1) + '师傅' }}
            </view>
            <view v-else class="base-info__nickname">集师傅</view>

            <view v-if="currentUserFullInfo.level" class="flex flex-vertical-c">
              <view class="base-info__sub" @click.stop="toMyLv"
                >等级：{{ currentUserFullInfo.level || 'LV 0' }}</view
              >
            </view>
          </div>
        </view>

        <view class="user-nav__operate flex flex-vertical-c">
          <view
            v-if="currentUserFullInfo.checkStatus === 3 && currentUserFullInfo.showStatus"
            class="base-info__identity m-r-24"
            @click.stop="toSpreadHome"
          >
            推广</view
          >
          <VoIcon :opacity="0.45" color="#000" name="arrow-right" size="20" />
          <!--<view class="user-nav__operate-main" @click="userCentre">个人主页</view>-->
        </view>
      </view>
      <view class="user-bubble">
        工作{{ infoSkill.workDay || '0' }}天，完成{{ infoSkill.count || '0' }}单，收益{{
          infoSkill.amount || '0'
        }}元
      </view>
      <VoCellGroup :border="false" class="m-t-40">
        <VoCell
          v-for="(item, index) of identityList"
          :key="index + 'bor'"
          :title="item.name"
          right-icon="right-arrow"
          @click="nextPage(item)"
        >
          <VoIcon slot="icon" :name="item.iconName" size="20" />
          <VoIcon slot="right-icon" :opacity="0.25" name="right-arrow" />
        </VoCell>
      </VoCellGroup>
      <VoCellGroup :border="false" class="m-t-8">
        <VoCell
          v-for="(item, index) of settingList"
          :key="index + 'bor'"
          :title="item.name"
          :value="item.value"
          right-icon="right-arrow"
          @click="nextPage(item)"
        >
          <VoIcon slot="icon" :name="item.iconName" size="20" />
          <VoIcon slot="right-icon" :opacity="0.25" name="right-arrow" />
        </VoCell>
      </VoCellGroup>
      <view class="user-space h8" />
    </view>
    <VoComplaintAction ref="complaintRef" />
    <EraApproveModal :show.sync="showApprove" />
    <VoHelpAction ref="helpRef" />
    <view class="placeholder-line" />
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
    <vo-safety-area />
  </view>
</template>
<script>
  import store from '@/store'

  export default {
    name: 'EngineerUser',
    components: {},
    props: {},
    data() {
      return {
        infoSkill: {},
        showApprove: false, // 认证模态框
        currentUserFullInfo: {},
        identityList: [
          {
            name: '我的账户',
            path: '/pagesEngineer/MyAccount/MyAccount',
            iconName: 'my-account',
            approve: true,
          },
          // 现阶段联系客服认证
          // {
          //   name: '资格认证',
          //   path: '/pagesEngineer/pagesQualification/QualificationHome/QualificationList',
          //   iconName: 'qualification',
          //   approve: true,
          // },
          {
            name: '接单设置',
            path: '/pagesEngineer/Spread/SpreadSetting',
            iconName: 'order-set',
            approve: true,
          },
        ],
        settingList: [
          {
            name: '个人主页',
            path: '/pagesAgent/PersonalHomepage/PersonalHomepage',
            iconName: 'personal-page',
            approve: true,
          },
          {
            name: '帮助中心',
            path: '/pagesCommon/HelperContent/HelperContentList',
            iconName: 'help-user',
            approve: true,
          },
          {
            name: '我要投诉',
            path: '',
            iconName: 'complaint-user',
            approve: true,
          },
          {
            name: '平台客服',
            path: '',
            iconName: 'customer-service-new',
            approve: false,
          },
          {
            name: '设置',
            path: '/pagesEngineer/Setting/Setting',
            iconName: 'setting-user',
            approve: false,
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
        if (this.currentUserFullInfo.checkStatus == 0) {
          this.$linkToEasy('/pagesEngineer/AuthenticationInformation/EngineerAccounts')
          return
        } else if (this.currentUserFullInfo.checkStatus == 4) {
          this.$linkToEasy('/pagesCommon/AuthorityManagement/BindTonlyPhone')
          return
        }
        this.$linkToEasy('/pagesGarage/StoreInfo/ApproveInfo')
      },
      /**
       * 去用户等级
       */
      toMyLv() {
        // if (this.currentUserFullInfo.checkStatus !== 3) {
        //   this.showApprove = true
        //   return
        // }
        let href = '/pagesGarage/UserCenter/MyIntegral?operationType=2'
        if (this.currentUserFullInfo.level) {
          href = href + `&level=${this.currentUserFullInfo.level}`
        }
        this.$linkToEasy(href)
      },
      toSpreadHome() {
        if (this.currentUserFullInfo.checkStatus !== 3) {
          this.showApprove = true
          return
        }
        this.$linkToEasy('/pagesEngineer/Spread/SpreadHome')
      },
      getSkillInfo() {
        this.$VoHttp
          .apiCompanyInfoSkillInfo()
          .then((res) => {
            if (res.data) {
              console.log(res.data)
              this.infoSkill = res.data
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '请检查网络')
          })
      },
      async initInfo() {
        await store.dispatch('user/getFullUserInfo').then((res) => {
          this.currentUserFullInfo = res
          // if (Number(this.currentUserFullInfo.checkStatus) === 0) {
          //   this.showApprove = true
          // }
          if (+this.currentUserFullInfo.checkStatus !== 3) {
            // this.showApprove = true
            return
          }
          this.getSkillInfo()
        })
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
      nextPage(item) {
        if (item.approve && this.currentUserFullInfo.checkStatus !== 3) {
          if (this.currentUserFullInfo.checkStatus == 1) {
            this.$u.toast('账号正在认证中，审核通过后才可以访问该页面。')
            return
          }
          this.showApprove = true
          return
        }
        if (item.name === '我要投诉') {
          this.$refs.complaintRef.open()
        } else if (item.name === '平台客服') {
          this.$refs.helpRef.open()
        } else if (item.name === '我的账户') {
          this.$linkToEasy(`${item.path}?amount=${this.infoSkill.amount}`)
        } else {
          // if (!this.$checkIsApproveFn() && !item.noApprove) {
          //   this.showApprove = true
          //   return
          // }
          this.$linkToEasy(item.path)
        }
      },
      userCentre() {
        this.$linkToEasy('/pagesEngineer/UserCenter/UserCenter')
      },
      reachBottom() {
        console.log('触底')
      },
    },
  }
</script>
<style lang="scss" scoped>
  .placeholder {
    height: 130rpx;
  }
  //page{
  //  background: #F6F7F8;
  //}
  .user-space {
    //background-color: #f6f7f8;
  }
  .user {
    width: 750rpx;
    background-color: #f6f7f8;
    overflow-x: hidden;
    padding-top: 20rpx;
    box-sizing: border-box;
    position: relative;
    &-placeholder {
      width: 750rpx;
      height: 20rpx;
      margin-top: 44rpx;
      border-top-right-radius: 200rpx;
      border-top-left-radius: 200rpx;
      background-color: white;
    }
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
      background-image: url('/static/oldbuyer/oldbuyer-bj.png');
      background-repeat: no-repeat;
      background-size: 100% 600rpx;
    }
    &-triangle {
      border-top: 16rpx solid $v-bg-white;
      border-left: 6rpx solid transparentize;
      border-right: 6rpx solid transparentize;
      position: absolute;
      content: '';
      left: 24rpx;
    }
    &-bubble {
      font-size: 28rpx;
      line-height: 21rpx;
      color: $v-c0-85;
      background-color: white;
      border-radius: 20rpx;
      margin-left: 32rpx;
      margin-right: 32rpx;
      margin-top: 40rpx;
      padding: 24rpx;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        top: -8px;
        left: 28px;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-bottom: 8px solid #fff;
      }
    }
    &-nav {
      //width: 750rpx;
      padding: 0 32rpx;
      margin-right: 8rpx;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      .base-info {
        padding-left: 16rpx;
        padding-top: 20rpx;
        &__nickname {
          font-size: 32rpx;
          color: rgba(0, 0, 0, 0.85);
          line-height: 48rpx;
          font-weight: bold;
        }
        &__identity {
          border: 2rpx solid rgba(0, 0, 0, 0.25);
          border-radius: 200rpx;
          color: $v-c0-65;
          font-size: 28rpx;
          line-height: 42rpx;
          padding: 4rpx 24rpx;
          width: fit-content;
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
          margin-top: 16rpx;
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
  .user-nav__status {
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
