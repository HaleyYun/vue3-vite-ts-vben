<template>
  <view class="user">
    <view class="page-bg" />
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
            <!--              v-if="-->
            <!--                currentUserFullInfo.checkStatus !== null &&-->
            <!--                Number(currentUserFullInfo.checkStatus) !== 3-->
            <!--              "-->
            <!--              class="user-nav__status"-->
            <!--              @click.stop="goApproveStatusFn"-->
            <!--              >{{ getcApproveStatusFn() }}-->
            <!--            </view>-->
            <!--            <view v-else>-->
            <!--              <VoIcon :size="16" class="user-nav__icon" name="v-icon" />-->
            <!--            </view>-->
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
            <view class="base-info__nickname overflow-ellipsis w500">
              {{ currentUserFullInfo.storeName || '游客' }}
            </view>

            <view class="flex flex-vertical-c">
              <view class="base-info__sub" @click.stop="toMyLv"
                >等级：{{ currentUserFullInfo.level || 'LV 0' }}</view
              >
            </view>
            <!--            <view class="base-info__acounttype m-t-6">-->
            <!--              <template v-if="currentUserFullInfo.isAdmin">主账户</template>-->
            <!--              <template v-else-if="currentUserFullInfo.checkStatus === -1">游客模式</template>-->
            <!--              <template v-else>子账户</template>-->
            <!--            </view>-->
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

      <view v-if="getUserRoleFn('我的账户')" class="user-info" @click="goMyAccount">
        <view class="user-info__account flex flex-vertical-c flex-justify-between">
          <view class="flex flex-vertical-c" @click.stop="setEye">
            <view class="fz-b fz-32 lh150 color-block m-r-8">我的账户</view>
            <block v-if="showEye">
              <VoIcon :opacity="0.65" :size="20" color="#000" name="eyes-open" />
            </block>
            <block v-else>
              <VoIcon :opacity="0.65" :size="20" color="#000" name="eyes-down" />
            </block>
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
          <view class="flex1 user-info__item">
            <view
              v-if="+currentUserFullInfo.checkStatus === 3"
              class="fz-b fz-32 lh150 color-block"
            >
              {{ showEye ? account.repayAmount : '***' }}
            </view>
            <view v-else class="fz-b fz-32 lh150 color-block">--</view>
            <view class="fz-26 lh150 m-t-8 color-block-65">应付账款</view>
          </view>
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
      <view class="user-space h24" />
      <VoCellGroup :border="false">
        <block v-if="getUserRoleFn('店铺信息')">
          <VoCell
            :border="false"
            title="店铺信息"
            @click="nextPage({ path: '/pagesCommon/StoreInfo/StoreInfo' }, true)"
          >
            <VoIcon slot="icon" :size="20" name="sell-goods" />
            <VoIcon slot="right-icon" :opacity="0.45" :size="20" color="#000" name="arrow-right" />
          </VoCell>
          <view class="bg-white w750">
            <EraLine color="#f6f7f8" length="718rpx" marginLeft="32rpx" />
          </view>
        </block>

        <VoCell
          v-if="getUserRoleFn('权限管理')"
          :border="false"
          title="员工管理"
          @click="nextPage({ path: '/pagesCommon/AuthorityManagement/AuthorityManagement' }, true)"
        >
          <VoIcon slot="icon" :size="20" name="permission-user" />
          <VoIcon slot="right-icon" :opacity="0.45" :size="20" color="#000" name="arrow-right" />
        </VoCell>
      </VoCellGroup>

      <view class="user-space h16" />
      <VoCellGroup :border="false">
        <block v-for="(item, index) of collectList" :key="index + 'bor'">
          <VoCell :border="false" :title="item.name" @click="nextPage(item, item.approve)">
            <VoIcon slot="icon" :name="item.iconName" :size="20" />
            <VoIcon slot="right-icon" :opacity="0.45" :size="20" color="#000" name="arrow-right" />
          </VoCell>
          <view class="bg-white w750">
            <EraLine color="#f6f7f8" length="718rpx" marginLeft="32rpx" />
          </view>
        </block>
      </VoCellGroup>
      <view class="user-space h16" />
      <VoCellGroup :border="false" class="m-b-16">
        <block v-for="(item, index) of settingList" :key="index + 'bor'">
          <block v-if="item.iconName !== 'mobile-new'">
            <VoCell :border="false" :title="item.name" @click="nextPage(item, item.approve)">
              <VoIcon slot="icon" :name="item.iconName" :size="20" />
              <VoIcon
                slot="right-icon"
                :opacity="0.45"
                :size="20"
                color="#000"
                name="arrow-right"
              />
            </VoCell>
            <view class="bg-white w750">
              <EraLine color="#f6f7f8" length="718rpx" marginLeft="32rpx" />
            </view>
          </block>
          <block v-else-if="item.iconName == 'mobile-new' && channelInfo && channelInfo.companyId">
            <VoCell :border="false" :title="item.name" @click="nextPage(item, item.approve)">
              <VoIcon slot="icon" :name="item.iconName" :size="20" />
              <VoIcon
                slot="right-icon"
                :opacity="0.45"
                :size="20"
                color="#000"
                name="arrow-right"
              />
            </VoCell>
            <view class="bg-white w750">
              <EraLine color="#f6f7f8" length="718rpx" marginLeft="32rpx" />
            </view>
          </block>
        </block>
      </VoCellGroup>
      <view v-if="Number(currentUserFullInfo.checkStatus) !== 3" class="user-occupy"></view>
    </view>
    <!--    <view class="flex flex-vertical-c flex-justify-c m-b-16">-->
    <!--      <image class="bottomLogo" src="/static/logo-bottom.png" />-->
    <!--    </view>-->
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

    <EraApproveModal :show.sync="showApprove" />
    <VoHelpAction ref="helpRef" />

    <VoActionSheet
      v-show="showChanel"
      :actions="actions"
      :show="showChanel"
      cancelText="取消"
      class="action-sheet"
      @close="showChanel = false"
      @select="actionSelect"
    />
  </view>
</template>

<script>
  import store from '@/store'
  import { hideLoading, showLoading } from '@/common/helper'

  export default {
    name: 'AgentTabbarUser',
    components: {},
    props: {},
    data() {
      return {
        listData: [],
        actions: [
          {
            type: 'im',
            name: '在线联系渠道经理',
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: '14',
          },
          {
            type: 'phone',
            name: '',
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: '14',
          },
        ],
        showChanel: false, // 联系渠道经理
        showApprove: false, // 认证模态框
        showEye: false,
        currentUserFullInfo: {},
        channelInfo: {},
        menuList: [
          {
            name: '店铺信息',
            path: '/pagesCommon/StoreInfo/StoreInfo',
            iconName: 'store-user',
            approve: true,
          },
          {
            name: '权限管理',
            path: '/pagesCommon/AuthorityManagement/AuthorityManagement',
            iconName: 'permission-user',
            approve: true,
          },
        ],
        collectList: [
          {
            name: '我的收藏',
            path: '/pagesAgent/UserCenter/GoodsCollection/GoodsCollection',
            iconName: 'collect-icon',
            approve: true,
          },
          {
            name: '商家大学',
            path: '/pagesSupplier/BusinessUniversity/BusinessUniversity',
            iconName: 'biz-college',
            approve: true,
          },
        ],
        settingList: [
          {
            name: '个人主页',
            path: '/pagesAgent/PersonalHomepage/PersonalHomepage',
            iconName: 'person-user',
            approve: true,
          },
          {
            name: '帮助中心',
            path: '/pagesCommon/HelperContent/HelperContentList',
            iconName: 'help-user',
            approve: true,
          },
          {
            name: '联系渠道经理',
            path: '',
            iconName: 'mobile-new',
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
            path: '/pagesSupplier/Setting/Setting',
            iconName: 'setting-user',
            approve: false,
          },
        ],
        main: {},
        account: {},
      }
    },
    async created() {
      showLoading()
      await this.initInfo()
      hideLoading()
    },
    methods: {
      /**
       * @description 我的用户相关
       */
      getUserRoleFn(name) {
        let boo = false
        this.listData.map((item) => {
          if (item == name) {
            boo = true
          }
        })
        return boo
      },
      /**
       * @description 联系渠道经理
       */
      actionSelect(e) {
        if (e.type === 'phone') {
          this.$cellPhone(this.channelInfo.userName)
        } else if (e.type === 'im') {
          const info = {
            targetId: this.channelInfo.userId,
            type: 0,
            note: this.channelInfo.userName,
            platformCode: this.channelInfo.platformCode,
          }
          this.$storage.set('temp_im_room_info', info)
          this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
        }
        this.showChanel = false
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
      // 获取账户可提现与待结算金额
      async getAccountInfo() {
        try {
          const main = await this.$VoHttp.USER.apiAccountDetailsMain({}, { noLoading: true })
          if (main && main.data) {
            this.main = main.data
          }
        } catch (e) {
          this.$u.toast(e && e.message ? e.message : '网络错误')
        }
      },
      async getAccount() {
        const account = await this.$VoHttp.apiOrderAccountPeriodGetByCurrentUser(
          {},
          { noLoading: true },
        )
        if (account && account.data) {
          this.account = account.data
        }
      },
      async initInfo() {
        await store.dispatch('user/getFullUserInfo').then(async (res) => {
          if (res) {
            this.currentUserFullInfo = res
            this.$store.dispatch('user/setUseInfoItem', res)
            if (Number(this.currentUserFullInfo.checkStatus) === 0) {
              // this.showApprove = true
            } else if (+this.currentUserFullInfo.checkStatus === 3) {
              await this.getAccountInfo()
              await this.getAccount()
            }
          }
        })

        await this.$VoHttp.apiCompanyInfoInviterInfo({}, { noLoading: true }).then((res) => {
          if (res && res.data) {
            this.channelInfo = res.data
            if (this.channelInfo && this.channelInfo.userName) {
              this.actions[1].name = this.channelInfo.userName
            }
          }
        })

        await this.$VoHttp
          .apiMenuTree(
            {
              orgCode: this.userInfo.roleCode,
            },
            { noLoading: true },
          )
          .then((res) => {
            if (res && res.data) {
              let result = []
              res.data.map((item) => {
                if (item.name === '我的') {
                  result = item.children
                }
              })

              this.listData = result.map((item) => item.name)
            }
          })
          .catch((e) => {
            uni.$u.toast(e.message || '请检查网络')
          })
      },
      /**
       * 设置是否可见
       */
      setEye() {
        this.showEye = !this.showEye
        console.log('showEye = ', this.showEye)
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
      nextPage(item, approve) {
        if (this.currentUserFullInfo.checkStatus == 1) {
          this.$u.toast('账号正在认证中，审核通过后才可以访问该页面。')
          return
        }
        if (approve) {
          if (!this.$checkIsApproveFn()) {
            this.showApprove = true
            return
          }
        }
        if (item.name === '我要投诉') {
          this.$refs.complaintRef.open()
          return
        } else if (item.name === '平台客服') {
          this.$refs.helpRef.open()
          return
        } else if (item.name === '联系渠道经理') {
          this.showChanel = true
          return
        }
        this.$linkToEasy(item.path)
      },
      userCentre() {
        this.$linkToEasy('/pagesSupplier/UserCenter/UserCenter')
      },
      reachBottom() {
        console.log('触底')
      },
    },
  }
</script>

<style lang="scss" scoped>
  //page {
  //  background: #f7f7f8;
  //}
  .user-space {
    background-color: #f7f7f8;
  }
  .user-occupy {
    height: 130rpx;
  }
  .user {
    width: 750rpx;
    flex: 1;
    background-color: #f7f7f8;
    overflow-x: hidden;
    padding-top: 20rpx;
    box-sizing: border-box;
    position: relative;
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
      background-image: url('/static/agent/agent_bg.png');
      background-repeat: no-repeat;
      background-size: 100% 868rpx;
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
          margin-bottom: 16rpx;
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
      margin-top: 48rpx;
      width: 750rpx;
      padding: 28rpx;
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
        font-size: 32rpx;
        font-weight: bold;
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
  .bottomLogo {
    width: 48rpx;
    height: 48rpx;
  }
  .border-bottom {
    border-bottom: 2rpx solid #eee;
  }
  .more {
    :nth-child(2) {
      vertical-align: middle;
    }
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
  .w500 {
    width: 480rpx;
  }
</style>
