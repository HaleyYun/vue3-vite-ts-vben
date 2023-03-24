<template>
  <view class="user">
    <VoBatteryBar bg-color="transparent" />
    <view class="page-container">
      <view class="user-nav flex-vertical-c" @click.stop="userCentre">
        <!--<view class="user-nav__operate" />-->
        <view class="flex">
          <view class="user-nav_phooto_box">
            <image
              :src="currentUserFullInfo.storeUrl || '/static/default_avatar.png'"
              class="user-nav__photo"
            />
            <!--            <view-->
            <!--              v-if="Number(currentUserFullInfo.checkStatus) !== 3"-->
            <!--              class="user-nav__status"-->
            <!--              @click.stop="goApproveStatusFn"-->
            <!--              >{{ getcApproveStatusFn() }}</view-->
            <!--            >-->
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
            </view>
          </div>
        </view>
        <view class="user-nav__operate">
          <VoIcon :opacity="0.65" color="#000" name="arrow-right" size="20" />
          <!--<view class="user-nav__operate-main" @click="userCentre">个人主页</view>-->
        </view>
      </view>

      <!--<div class="user-property">-->
      <!--  <div class="user-property-header">-->
      <!--    <div>-->
      <!--      <span>我的账户</span>-->
      <!--      <VoIcon class="eyes-open"></VoIcon>-->
      <!--        <VoIcon class="eyes-down"></VoIcon>-->
      <!--    </div>-->
      <!--    <div>-->
      <!--      <span>更多</span>-->
      <!--      <VoIcon name="right-arrow" color="#000" :opacity="0.25"></VoIcon>-->
      <!--    </div>-->
      <!--  </div>-->
      <!--  <div class="user-property-container">-->

      <!--  </div>-->
      <!--</div>-->
      <block v-if="isLoadRole">
      <view v-if="getUserRoleFn('我的账户')" class="user-info" @click="goMyAccount">
        <view class="user-info__account flex flex-vertical-c flex-justify-between">
          <view class="flex flex-vertical-c" @click.stop="setEye">
            <view class="fz-b fz-32 lh150 color-block m-r-8">我的账户</view>
            <VoIcon v-if="showEye" :opacity="0.65" :size="20" color="#000" name="eyes-open" />
            <VoIcon v-else :opacity="0.65" :size="20" color="#000" name="eyes-down" />
          </view>
          <view class="flex flex-vertical-c">
            <view class="fz-28 color-block-65 lh150 m-r-4">更多</view>
            <VoIcon :opacity="0.45" :size="16" color="#000" name="arrow-right" />
          </view>
        </view>
        <view class="flex flex-vertical-c">
          <view class="flex1 user-info__item">
            <view
              v-if="+currentUserFullInfo.checkStatus === 3"
              class="fz-b fz-32 lh150 color-block"
            >
              {{ showEye ? main.canWithdrawAmount : '***' }}
            </view>
            <view v-else class="fz-b fz-32 lh150 color-block">--</view>
            <view class="fz-26 lh150 m-t-8 color-block-65">可提现金额</view>
          </view>
          <view class="flex1 user-info__item">
            <view
              v-if="+currentUserFullInfo.checkStatus === 3"
              class="fz-b fz-32 lh150 color-block"
            >
              {{ showEye ? account.receivableAmount : '***' }}
            </view>
            <view v-else class="fz-b fz-32 lh150 color-block">--</view>
            <view class="fz-26 lh150 m-t-8 color-block-65">应收账款</view>
          </view>
          <!--          <view class="flex1 user-info__item">-->
          <!--            <view v-if="+currentUserFullInfo.checkStatus === 3" class="fz-b fz-32 lh150 color-block">-->
          <!--              {{ showEye ? account.repayAmount : '***' }}-->
          <!--            </view>-->
          <!--            <view v-else class="fz-b fz-32 lh150 color-block">&#45;&#45;</view>-->
          <!--            <view class="fz-26 lh150 m-t-8 color-block-65">应付账款</view>-->
          <!--          </view>-->
          <view class="flex1 user-info__item">
            <view
              v-if="+currentUserFullInfo.checkStatus === 3"
              class="fz-b fz-32 lh150 color-block"
            >
              {{ showEye ? main.awaitSettlementAmount : '***' }}
            </view>
            <view v-else class="fz-b fz-32 lh150 color-block">--</view>
            <view class="fz-26 lh150 m-t-8 color-block-65">待结算金额</view>
          </view>
        </view>
      </view>
      <view class="bg-F7F7F8 h16" />
      <VoCellGroup :border="false">
        <block>
          <VoCell
            v-if="getUserRoleFn('权限管理')"
            :border="false"
            title="权限管理"
            @click="nextPage({ path: '/pagesCommon/AuthorityManagement/AuthorityManagement' })"
          >
            <VoIcon slot="icon" :size="20" name="permission-user" />
            <VoIcon slot="right-icon" :opacity="0.45" :size="20" color="#000" name="arrow-right" />
          </VoCell>
          <view class="bg-white w750">
            <EraLine color="#f6f7f8" length="718rpx" marginLeft="32rpx" />
          </view>
        </block>
        <VoCell
          :border="false"
          title="个人主页"
          @click="nextPage({ path: '/pagesAgent/PersonalHomepage/PersonalHomepage' })"
        >
          <VoIcon slot="icon" :size="20" name="person-user" />
          <VoIcon slot="right-icon" :opacity="0.45" :size="20" color="#000" name="arrow-right" />
        </VoCell>
      </VoCellGroup>
      <!--<view-->
      <!--  class="user-item"-->
      <!--  :class="{ 'border-bottom': index === menuList.length - 1 }"-->
      <!--  v-for="(item, index) of menuList"-->
      <!--  @click="nextPage(item.path)"-->
      <!--  :key="index + 'bor'"-->
      <!--&gt;-->
      <!--  <div class="user-item__icon">-->
      <!--    <VoIcon :name="item.iconName"></VoIcon>-->
      <!--  </div>-->
      <!--  &lt;!&ndash;<image class="user-item__icon" src="/static/headPhoto/photo1.png" />&ndash;&gt;-->
      <!--  <view>{{ item.name }}</view>-->
      <!--  <image class="user-item__right" src="/static/icons/right-arrow.png" />-->
      <!--</view>-->

      <view class="bg-F7F7F8 h8" />
      <VoCellGroup :border="false">
        <block v-for="(item, index) of settingList" :key="index + 'bor'">
          <VoCell
            v-if="item.name != '店铺信息'"
            :border="false"
            :title="item.name"
            right-icon="arrow-right"
            @click="nextPage(item, item.noApprove || false)"
          >
            <VoIcon slot="icon" :name="item.iconName" :size="20" />
            <VoIcon slot="right-icon" :opacity="0.45" :size="20" color="#000" name="arrow-right" />
          </VoCell>
          <VoCell
            v-else-if="getUserRoleFn('店铺信息')"
            :border="false"
            :title="item.name"
            right-icon="arrow-right"
            @click="nextPage(item, item.noApprove || false)"
          >
            <VoIcon slot="icon" :name="item.iconName" :size="20" />
            <VoIcon slot="right-icon" :opacity="0.45" :size="20" color="#000" name="arrow-right" />
          </VoCell>
          <VoCell
            v-else-if="item.iconName == 'mobile-new' && channelInfo && channelInfo.companyId"
            :border="false"
            :title="item.name"
            right-icon="arrow-right"
            @click="nextPage(item, item.approve)"
          >
            <VoIcon slot="icon" :name="item.iconName" :size="20" />
            <VoIcon slot="right-icon" :opacity="0.45" :size="20" color="#000" name="arrow-right" />
          </VoCell>
          <view class="bg-white w750">
            <EraLine color="#f6f7f8" length="718rpx" marginLeft="32rpx" />
          </view>
        </block>
      </VoCellGroup>

       <view class="user-space h8" />
       <view v-if="Number(currentUserFullInfo.checkStatus) !== 3" class="user-occupy"></view>
     </block>
    </view>

    <VoComplaintAction ref="complaintRef" />
    <VoActionSheet
      v-show="showChanel"
      :actions="actions"
      :show="showChanel"
      cancelText="取消"
      class="action-sheet"
      @close="showChanel = false"
      @select="actionSelect"
    />
    <EraApproveModal :content="content" :show.sync="showApprove" />

    <VoHelpAction ref="helpRef" />
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
  </view>
</template>

<script>
  import { goOnlineCustomerFn, linkToEasy } from '@/common/helper'
  import store from '@/store'

  export default {
    components: {},
    props: {},
    data() {
      return {
        isLoadRole:false,
        actions: [
          {
            type: 'im',
            name: '在线联系招商经理',
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: '14',
          },
        ],
        channelInfo: {},
        showChanel: false, // 联系招商经理
        menuList: [],
        showEye: false,
        content: '您的账号未认证通过，请先完成认证',
        showApprove: false, // 认证模态框
        currentUserFullInfo: {},
        settingList: [
          {
            name: '店铺信息',
            path: '/pagesCommon/StoreInfo/StoreInfo',
            iconName: 'store-user',
          },
          {
            name: '帮助中心',
            path: '/pagesCommon/HelperContent/HelperContentList',
            iconName: 'help-user',
          },
          {
            name: '联系招商经理',
            path: '',
            iconName: 'mobile-new',
            approve: true,
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
            path: '/pagesSupplier/Setting/Setting',
            iconName: 'setting-user',
            noApprove: true,
          },
        ],
        main: {},
        account: {},
        managerInfo: '', //招商经理信息
      }
    },
    async created() {
      this.getMyAttentionCount()
      await this.initInfo()
      await this.initRoleFn()
    },
    methods: {
      //获取招商经理信息
      async getMyAttentionCount() {
        try {
          const { code, data } = await this.$VoHttp.IM.apiImMyAttentionCount()
          if (code == '20001') {
            this.managerInfo = {
              userId: data.userId,
              platformCode: data.platformCode,
            }
          }
        } catch (e) {
          console.log(e)
        }
      },
      encryptFn() {
        return this.userInfo.userName.slice(0, 3) + '****' + this.userInfo.userName.slice(7, 11)
      },
      /**
       * @description 我的用户相关
       */
      getUserRoleFn(name) {
        let boo = false
        this.menuList.map((item) => {
          if (item == name) {
            boo = true
          }
        })
        return boo
      },
      async initRoleFn() {
        await this.$VoHttp
          .apiMenuTree({
            orgCode: this.userInfo.roleCode,
          })
          .then((res) => {
            let result = []
            res.data.map((item) => {
              if (item.name === '我的') {
                result = item.children
              }
            })

            this.menuList = result.map((item) => item.name)
          })
        this.isLoadRole=true
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
       * 设置是否可见
       */
      setEye() {
        this.showEye = !this.showEye
        console.log('showEye = ', this.showEye)
      },
      /**
       * 去我的积分
       */
      toMyIntegral() {
        this.$linkToEasy('/pagesGarage/UserCenter/MyIntegral')
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
      async getAccount() {
        try {
          const account = await this.$VoHttp.apiOrderAccountPeriodGetByCurrentUser()
          console.log(account)
          this.account = account.data
        } catch (e) {
          console.error(e)
          this.$u.toast(e.message || '网络错误')
        }
      },
      initInfo() {
        store.dispatch('user/getFullUserInfo').then(async (res) => {
          this.currentUserFullInfo = res
          this.$store.dispatch('user/setUseInfoItem', res)
          if (Number(this.currentUserFullInfo.checkStatus) === 1) {
            this.$u.toast('账号正在认证中，认证通过后才可以访问该页面')
            return
          }
          this.$VoHttp.apiCompanyInfoInviterInfo().then((res) => {
            this.channelInfo = res.data
            if (this.channelInfo && this.channelInfo.userName) {
              this.actions[1]={
                type: 'phone',
                name: this.channelInfo.userName,
                color: 'rgba(0, 0, 0, 0.85)',
                fontSize: '14',
              }
            }
          })
          if (+this.currentUserFullInfo.checkStatus === 3) {
            await this.getAccountInfo()
            await this.getAccount()
          }
          // if (Number(this.currentUserFullInfo.checkStatus) !== 3) {
          //   if (
          //     Number(this.currentUserFullInfo.checkStatus) == -1 ||
          //     Number(this.currentUserFullInfo.checkStatus) == 0
          //   ) {
          //     this.content = '您的账号未认证，请先完成认证'
          //   } else if (Number(this.currentUserFullInfo.checkStatus) == 2) {
          //     this.content = '您的账号未认证通过，请先完成认证'
          //   }
          //   this.showApprove = true
          // } else {
          //   await this.getAccountInfo()
          //   await this.getAccount()
          // }
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
        this.$linkToEasy('/pagesSupplier/UserCenter/MyAccount/MyAccount')
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
       * @description 联系渠道经理
       */
      actionSelect(e) {
        if (e.type === 'phone') {
          this.$cellPhone(this.channelInfo.userName)
        } else if (e.type === 'im') {
          if (this.managerInfo.userId) {
            this.goChatPage({
              targetId: this.managerInfo.userId,
              platformCode: this.managerInfo.platformCode,
            })
          } else {
            //进入平台客服聊天页面
            goOnlineCustomerFn()
          }
        }
        this.showChanel = false
      },
      /**
       * 去聊天详情页
       */
      goChatPage(data) {
        const info = {
          targetId: data.targetId,
          type: 0,
          note: data.targetName || '',
          platformCode: data.platformCode,
        }
        this.$storage.set('temp_im_room_info', info)
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
      },
      nextPage(item, noApprove) {
        if (item.name === '平台客服') {
          this.$refs.helpRef.open()
          return
        }
        if (item.name === '设置') {
          this.$linkToEasy(item.path)
          return
        }
        if (this.currentUserFullInfo.checkStatus == 1) {
          this.$u.toast('账号正在认证中，审核通过后才可以访问该页面。')
          return
        }
        if (item.name === '联系招商经理') {
          this.showChanel = true
          return
        }
        if (!noApprove) {
          if (!this.$checkIsApproveFn()) {
            this.showApprove = true
            return
          }
        }

        if (item.name === '我要投诉') {
          this.$refs.complaintRef.open()
          return
        }
        this.$linkToEasy(item.path)
      },
      userCentre() {
        this.$linkToEasy('/pagesSupplier/UserCenter/UserCenter')
      },
      goReturnExchange() {
        this.$linkToEasy('/pagesSupplier/Order/ReturnExchange/ReturnExchange')
      },
      reachBottom() {
        console.log('触底')
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
  .user-occupy {
    height: 130rpx;
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
      margin-top: 38rpx;
      width: 750rpx;
      padding: 24rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
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
