<template>
  <view>
    <VoTabbarIm ref="imRef" :tabbarVal="tabbarVal"></VoTabbarIm>
    <view
      v-if="
        Number(currentUserFullInfo.checkStatus) === -1 ||
        Number(currentUserFullInfo.checkStatus) === 0
      "
      class="home-fixed flex flex-vertical-c flex-justify-between m-b-safe-area"
    >
      <view class="home-fixed__tips">当前为游客模式，体验更多功能，请先进行认证</view>
      <view class="home-fixed__button" @click="agentApproveFn">立即认证</view>
    </view>

    <view
      v-else-if="Number(currentUserFullInfo.checkStatus) === 4"
      class="home-fixed flex flex-vertical-c flex-justify-between m-b-safe-area"
    >
      <view class="home-fixed__tips">为保障认证信息是本人真实操作，请验证手机号</view>
      <view class="home-fixed__button" @click="agentApproveFn">去验证</view>
    </view>
    <view
      v-else-if="Number(currentUserFullInfo.checkStatus) === 2"
      class="home-fixed flex flex-vertical-c flex-justify-between m-b-safe-area"
    >
      <view class="home-fixed__tips m-l-16">认证未通过，请重新进行认证。</view>
      <view class="home-fixed__button" @click="agentApproveFn">立即认证</view>
    </view>
    <view
      v-else-if="Number(currentUserFullInfo.checkStatus) === 1"
      class="home-fixed flex flex-vertical-c flex-justify-between m-b-safe-area"
    >
      <view class="home-fixed__tips m-l-16">信息正在认证审核中，请耐心等待...</view>
      <view class="home-fixed__button bg" @click="agentApproveFn">审核中</view>
    </view>
    <view class="placeholder" />
    <EraApproveModal :show.sync="showApprove" />
  </view>
</template>

<script>
  import VoTabbarIm from '@/components/VoTabbarIm/VoTabbarIm'
  import store from '@/store'
  import helpUtil, { linkToEasy } from '@/common/helper'
  import { mapGetters } from 'vuex'

  export default {
    name: 'AgentTabbarIm',
    components: { VoTabbarIm },
    props: {
      tabbarVal: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        showApprove: false, // 认证弹窗
        currentUserFullInfo: {},
      }
    },
    computed: {
      // 辅助函数
      ...mapGetters({
        userInfo: 'user/userInfoGetter',
      }),
    },
    methods: {
      /**
       * @description 服务商认证跳转
       */

      /**
       * @description 服务商认证跳转
       */
      agentApproveFn() {
        // 0：资料未提交，1:审核中 ，2：审核拒绝 ，3：认证成功，4：绑定手机号
        if (+this.userInfo.checkStatus === 0) {
          //companyType   企业类型（2：企业会员, 3：个人会员）
          if (Number(this.userInfo.companyType) === 2) {
            linkToEasy('/pages/AuthenticationInformation/FirstStepDefault')
            return
          } else if (Number(this.userInfo.companyType) === 3) {
            linkToEasy('/pages/AuthenticationInformation/AgentAccount')
            return
          }
          // 如果是服务商
          linkToEasy('/pages/AuthenticationInformation/PublicAccounts')
          return
        } else if (+this.userInfo.checkStatus === 4) {
          linkToEasy('/pagesCommon/AuthorityManagement/BindTonlyPhone')
          return
        } else if (this.userInfo.checkStatus === -1) {
          this.showApprove = true
          return
        }
        if(this.userInfo.roleCode=='garage'){
          linkToEasy('/pagesGarage/StoreInfo/ApproveInfo')
          return;
        }

        linkToEasy('/pagesCommon/StoreInfo/ApproveInfo')
      },
      refreshData() {
        this.$refs.imRef.refreshData()
      },
      /**
       * @description 去认证
       */
      confirmHandler() {
        this.agentApproveFn()
      },
      /**
       * @description 去认证
       */
      goApproveFn() {
        if (this.currentUserFullInfo.checkStatus == 0) {
          this.$linkToEasy('/pagesEngineer/AuthenticationInformation/EngineerAccounts')
          return
        } else if (this.currentUserFullInfo.checkStatus == 4) {
          this.$linkToEasy('/pagesCommon/AuthorityManagement/BindTonlyPhone')
          return
        }
        this.$linkToEasy('/pagesGarage/StoreInfo/ApproveInfo')
      },
      initInfo() {
        store.dispatch('user/getFullUserInfo').then((res) => {
          this.$store.dispatch('user/setUseInfoItem', res)

          this.currentUserFullInfo = res
        })
      },
    },
    onLoad(options) {
      this.$refs.imRef.initList()
    },
    created() {
      this.initInfo()
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
    background-repeat: no-repeat;
    background-color: #f5f5f5;
    &-fixed {
      position: fixed;
      bottom: 172rpx;
      left: 32rpx;
      width: 686rpx;
      height: 88rpx;
      background: rgba(0, 0, 0, 0.65);
      border-radius: 62rpx;
      padding: 0 16rpx;
      box-sizing: border-box;
      z-index: 999;
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
  }
</style>
