<template>
  <view>
    <VoTabbarIm ref="imRef" :tabbarVal="tabbarVal === 1 ? 3 : 1"></VoTabbarIm>
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
    <EraApproveModal :show.sync="showApprove" />
  </view>
</template>

<script>
  import VoTabbarIm from '@/components/VoTabbarIm/VoTabbarIm'
  import { linkToEasy } from '@/common/helper'
  import store from '@/store'

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
        currentUserFullInfo: {},
        showApprove: false, // 认证弹窗
      }
    },
    methods: {
      refreshData(){
        console.log("refreshDatarefreshDatarefreshData");
        this.$refs.imRef.refreshData()
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
    },
    onLoad(options) {
      this.$refs.imRef.initList()
    },
    created() {
      store.dispatch('user/getFullUserInfo').then((res) => {
        this.$store.dispatch('user/setUseInfoItem', res)

        this.currentUserFullInfo = res
      })
    },
  }
</script>

<style lang="scss" scoped>
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
</style>
