<template>
  <view class="h-full">
    <VoTabbarCreate
      ref="createdRef"
      :tabbarVal="tabbarVal"
      @showReport="showReport"
      @updatepops="showPops"
    />
  </view>
</template>

<script>
  import VoTabbarCreate from '@/components/VoTabbarCreate/VoTabbarCreate'
  import { linkToEasy } from '@/common/helper'

  export default {
    name: 'AgentTabbarCreate',
    components: { VoTabbarCreate },
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
      /**
       * 刷新问答
       * @param obj
       */
      answerRefresh() {
        this.$refs.createdRef.answerRefresh()
      },
      //举报
      showReport(obj) {
        console.log('举报22')
        this.$emit('showReport', obj)
      },
      /**
       * 打开筛选弹窗
       * @param bool
       */
      showPops(bool) {
        console.log(bool)
        this.$emit('updatepops', bool)
      },
      //刷新数据
      refreshData() {
        this.$refs.createdRef.refreshData()
      },

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
        if (this.userInfo.roleCode == 'garage') {
          linkToEasy('/pagesGarage/StoreInfo/ApproveInfo')
          return
        }

        linkToEasy('/pagesCommon/StoreInfo/ApproveInfo')
      },
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
