

<template>
  <view >
    <u-modal
      :show="showBoo"
      :confirm-text="getSureFn()"
      :cancel-text="getCancelFn()"
      show-cancel-button
      confirmColor="#22284B"
      @cancel="cancelFn"
      @confirm="confirmHandler"
    >
      <view class="info-content" v-if="+this.userInfo.checkStatus === 0">您的账号未认证，请先完成认证</view>
      <view class="info-content" v-else-if="+this.userInfo.checkStatus === 2">您的账号未认证通过，请先完成认证</view>
      <view class="info-content" v-else-if="+this.userInfo.checkStatus === 4">您的账号需要绑定手机号，请先绑定手机</view>
      <view class="info-content" v-else-if="+this.userInfo.checkStatus === -1">您的账号需要注册角色，请先注册角色</view>
    </u-modal>
  </view>
</template>
<script>
  import { mapGetters } from "vuex";
  import { linkToEasy } from "@/common/helper";

  export  default {
    name:'EraApproveModal',
    props:{
      show:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return {
        showBoo:false
      }
    },
    watch:{
      show:{
        handler(val){
          console.log('111111',val);
            if (val&&+this.userInfo.checkStatus === 1) {
              this.$u.toast('账号正在认证中，审核通过后才可以访问该页面。')
              return
            }else{
              this.showBoo=val
            }
        },
        deep:true,
        immediate:true
      }
    },
    computed: {
      // 辅助函数
      ...mapGetters({
        userInfo: 'user/userInfoGetter',
      }),
    },
    methods:{

      getCancelFn(){
        if(+this.userInfo.checkStatus === 4){

          return '暂不绑定'
        }else if(+this.userInfo.checkStatus === -1){
          return '暂不注册'
        }

        return '暂不认证'
      },
      getSureFn(){
        if(+this.userInfo.checkStatus === 4){

          return '立即绑定'
        }else if(+this.userInfo.checkStatus === -1){
          return '立即注册'
        }

        return '立即认证'
      },
      /**
       * @description 技术工认证跳转
       */
      skillApproveFn(){
        this.cancelFn()
        if (this.userInfo.checkStatus == 0) {
          this.$linkToEasy('/pagesEngineer/AuthenticationInformation/EngineerAccounts')
          return
        } else if (this.userInfo.checkStatus == 4) {
          this.$linkToEasy('/pagesCommon/AuthorityManagement/BindTonlyPhone')
          return
        }else if (this.userInfo.checkStatus == -1) {
          this.$linkToEasy('/pages/CommonLogin/CompleteInfo?roleCode='+this.userInfo.roleCode)
          return
        }
        this.$linkToEasy('/pagesGarage/StoreInfo/ApproveInfo')
      },
      /**
       * @description 汽修厂认证跳转
       */
      garageApproveFn(){
        this.cancelFn()

        if (+this.userInfo.checkStatus === 0) {

          this.$linkToEasy('/pages/AuthenticationInformation/GarageAccounts')
          return
        }else if (+this.userInfo.checkStatus === 4) {
          this.$linkToEasy('/pagesCommon/AuthorityManagement/BindTonlyPhone')
          return
        }else if (this.userInfo.checkStatus == -1) {
          this.$linkToEasy('/pages/CommonLogin/CompleteInfo?roleCode='+this.userInfo.roleCode)
          return
        }

        this.$linkToEasy('/pagesGarage/StoreInfo/ApproveInfo')
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
        if(this.userInfo.roleCode=='garage'){
          linkToEasy('/pagesGarage/StoreInfo/ApproveInfo')
          return;
        }

        linkToEasy('/pagesCommon/StoreInfo/ApproveInfo')
      },
      /**
       * @description 供应商认证跳转
       */
      supplierApproveFn(){
        this.cancelFn()
        console.log(this.userInfo.checkStatus)
        if(+this.userInfo.checkStatus===0||this.userInfo.checkStatus==-1){
          linkToEasy('/pages/AuthenticationInformation/FirstStepDefault')
          return
        }else if(+this.userInfo.checkStatus===4){

          linkToEasy('/pagesCommon/AuthorityManagement/BindTonlyPhone')
          return;
        }else if (this.userInfo.checkStatus == -1) {
          this.$linkToEasy('/pages/CommonLogin/CompleteInfo?roleCode=supplier')
          return
        }


        linkToEasy('/pagesCommon/StoreInfo/ApproveInfo')
      },

      /**
       * @description 旧机买家认证跳转
       **/
      oldMachineFn(){
        // 0：资料未提交，1:审核中 ，2：审核拒绝 ，3：认证成功，4：绑定手机号
        if (+this.userInfo.checkStatus === 0) {

          linkToEasy('/pagesOldBuyer/HomeJumpPage/GarageAccounts')
          return
        } else if (+this.userInfo.checkStatus === 4) {
          linkToEasy('/pagesCommon/AuthorityManagement/BindTonlyPhone')
          return
        } else if (this.userInfo.checkStatus === -1) {
          this.showApprove = true
          return
        }

        linkToEasy('/pagesCommon/StoreInfo/ApproveInfo')

      },

      /**
       * 取消认证弹窗
       */
      cancelFn(){
        this.$emit('update:show',false)
      },
      /**
       * @description 去认证  不同角色跳转不一样
       *
       */
      confirmHandler(){
        if(this.userInfo.platformCode==="supplier"){
          // 供应商
          this.supplierApproveFn()
        }else if(this.userInfo.platformCode==="agent"){
          // 服务商
          this.agentApproveFn()
        }else if(this.userInfo.platformCode==="garage"){
          // 汽修厂
          this.garageApproveFn()
        }else if(this.userInfo.platformCode==="skilledWorker"){
          // 技术工
          this.skillApproveFn()
        }else if(this.userInfo.platformCode==="oldMachine"){
          // 旧机买家
          this.oldMachineFn()
        }

      }
    }
  }
</script>
<style lang="scss" scoped>
.info-content{
  padding: 15px 3px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 30rpx;
  line-height: 150%;
}
</style>
