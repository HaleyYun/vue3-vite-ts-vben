<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="other"
  >
    <!--  顶部导航栏模块：start  -->

    <VoNav
      :is-fixed="false"
      :is-help="true"
      right-title="帮助中心"
      rightTitleColor="rgba(0, 0, 0, 0.45)"
      title="完善信息"
    />
    <!--  顶部导航栏模块：end  -->
    <view class="logo">
      <!-- <voIcon name="right-fill" size="88" color="#ECFAF3" /> -->
      <image class="logo-icon" src="/static/icons/success.png" />
      <view class="logo-title">恭喜您注册成功</view>
      <view class="logo-text">为后续更方便为您服务，</view>
      <view class="logo-text">请提交以下信息，开启您的赚钱之旅</view>
    </view>
    <u--form
      ref="form"
      :labelStyle="labelStyle"
      :model="formData"
      :rules="rules"
      class="other-form flex1"
      labelPosition="left"
      labelWidth="125"
    >
      <u-form-item
        class="other-form__item"
        color="rgba(0, 0, 0, 0.85)"
        label="角色选择"
        prop="role"
      >
        <u-input
          v-show="false"
          v-model="formData.role"
          border="none"
          class="item-input"
          color="rgba(0, 0, 0, 0.85)"
          fontSize="16px"
          inputAlign="right"
          placeholder="请输入您的店铺名称"
          placeholderClass="other-form__placeholder"
          type="number"
        />
        <view v-if="formData.role === ''" class="other-form__placeholder">角色选择</view>
        <!--        @click="roleShow = true"-->
        <view v-else class="other-form__text">{{ getRoleName(formData.role, roleArrGet) }}</view>
<!--        <VoIcon :size="24" name="right-arrow" />-->
      </u-form-item>
      <u-form-item
        v-if="formData.role !== 'skilledWorker'&&formData.role !== 'garage'"
        class="other-form__item"
        color="rgba(0, 0, 0, 0.85)"
        label="店铺名称"
        prop="shopName"
      >
        <u-input
          v-model="formData.shopName"
          border="none"
          class="item-input"
          color="rgba(0, 0, 0, 0.85)"
          fontSize="16px"
          inputAlign="right"
          placeholder="请输入您的店铺名称"
          placeholderClass="other-form__placeholder"
          type="text"
        />
      </u-form-item>
    </u--form>

    <EraButton
      class="other-button"
      shape="circle"
      size="large"
      text="填写认证信息"
      @click="goReg"
    />
    <EraButton
      class="other-button last"
      plain
      shape="circle"
      size="large"
      text="暂不完善，直接进入"
      @click="goHome"
    />

    <u-picker-era
      :columns="roleArr"
      :show="roleShow"
      keyName="roleName"
      @cancel="roleShow = false"
      @confirm="confirmRole"
    />
  </view>
</template>
<script>
  // #ifdef APP-PLUS
  const vocenJpush = uni.requireNativePlugin('vocen-jpush')
  // #endif
  import helperUtil, { toRoleHome } from '@/common/helper'
  import devConf from '@/common/env'
  import { storage } from '@/common/unifyGlobalReg'
  import { mapGetters } from 'vuex'
  import EraButton from '../../uni_modules/era-ui/components/EraButton/EraButton'
  import IM from '@/common/Im/Im'

  export default {
    name: 'BindOtherNumber',
    components: { EraButton },
    data() {
      return {
        roleArr: [[]],
        roleShow: false,
        formData: {
          role: '', // 手机号
          shopName: '', // 密码
        },
        rules: {
          role: [
            {
              required: true,
              message: '请选择角色',
              trigger: ['blur', 'change'],
            },
          ],
          // shopName: {
          //   type: 'string',
          //   required: true,
          //   message: '请输入您的店铺名称',
          //   trigger: ['blur', 'change'],
          // },
        },
        tips: '获取验证码',
        codeBtnDisabled: false,
        labelStyle: {
          color: 'rgba(0, 0, 0, 0.85)',
        },
      }
    },
    computed: {
      // 辅助函数
      ...mapGetters({
        roleArrGet: 'role/roleArrGetter',
      }),
    },
    onLoad(options) {
      if (options.roleCode) {
        this.formData.role = options.roleCode
      }
      this.initFn()
    },
    methods: {
      async initFn() {
        //拿vuex里面的角色列表
        const roleArr = await this.$store.dispatch('role/getRoleArr')

        roleArr.map((item) => {
          this.roleArr[0].push(item)
        })
      },
      goHome() {
        toRoleHome()
        // if (this.formData.role === 'supplier') {
        //   // 供应商
        //   uni.reLaunch({
        //     url: '/pages/SupplierCenter/SupplierTabbar',
        //   })
        // } else if (this.formData.role === 'agent') {
        //   // 服务商
        //   uni.reLaunch({
        //     url: '/pages/AgentCenter/AgentTabbar',
        //   })
        // } else if (this.formData.role === 'garage') {
        //   //汽修厂
        //   uni.reLaunch({
        //     url: '/pages/GarageCenter/GarageCenter',
        //   })
        // } else if (this.formData.role === 'lease') {
        //   //招商经理
        //   uni.reLaunch({
        //     url: '/pages/LeaseCenter/LeaseCenter',
        //   })
        // }
      },
      /**
       *  @description 确定选择角色
       *  @param 返回的值
       */
      confirmRole(e) {
        this.roleShow = false
        this.formData.role = this.roleArr[0][e.indexs[0]].roleCode
        console.warn(e, 'sss', this.formData.role, this.roleArr, '666')
      },
      //设置极光推送
      vocenPluginJPushModule() {
        // im连接
        let imCtx = new IM()
        this.$store.commit('im/SET_IMCTX', imCtx)
        imCtx.start()
        imCtx.openListen()
        const alias = this.userInfo.accountId
        // #ifdef APP-PLUS
        let userId = 'user_' + alias
        console.log('推送别名', userId)
        vocenJpush.voJPushSetAlias(
          {
            alias: userId,
          },
          (res) => {
            console.log(res)
          },
        )
        // #endif
      },
      /**
       * 表单校验
       * 去下载App页面
       */
      goReg() {
        this.$refs.form
          .validate()
          .then(() => {
            const refreshToken = storage.get('refresh_token')
            let param = {
              clientId: devConf.clientId,
              clientSecret: this.$encrypt.encrypt(devConf.clientSecret),
              roleCode: this.formData.role,
              storeName: this.formData.shopName,
              refreshToken,
              terminalSource: helperUtil.appSource(),
            }
            helperUtil.showLoading()
            this.$VoHttp
              .register(param, { noPrefix: true })
              .then((res) => {
                this.$store.dispatch('user/setUseInfo', res.data)
                this.vocenPluginJPushModule()

                helperUtil.hideLoading()
                uni.$u.toast('注册成功')
                setTimeout(() => {
                  if (res.data.roleCode === 'supplier') {
                    // 如果是供应商
                    uni.redirectTo({
                      url: '/pages/AuthenticationInformation/FirstStepDefault',
                    })
                  } else if (res.data.roleCode === 'agent') {
                    // 服务商
                    uni.redirectTo({
                      url: '/pages/AuthenticationInformation/PublicAccounts',
                    })
                  } else if (res.data.roleCode === 'garage') {
                    // 汽修厂
                    uni.redirectTo({
                      url: '/pages/AuthenticationInformation/GarageAccounts',
                    })
                  } else if (res.data.roleCode === 'skilledWorker') {
                    // 技术工
                    uni.redirectTo({
                      url: '/pagesEngineer/AuthenticationInformation/EngineerAccounts',
                    })
                  } else {
                    toRoleHome()
                  }
                }, 1500)
              })
              .catch((e) => {
                helperUtil.hideLoading()
                uni.$u.toast(e.message || '注册失败')
              })
          })
          .catch(() => {})
      },
    },
  }
</script>
<style lang="scss" scoped>
  .other {
    width: 750rpx;
    height: 100vh;
    overflow: hidden;
    box-sizing: border-box;
    background: $v-bg-white;

    .logo {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-bottom: 40rpx;
      padding-top: 138rpx;

      &-title {
        font-weight: bold;
        font-size: 30rpx;
        line-height: 36rpx;
        color: $v-c0-85;
        margin: 24rpx 0;
      }

      &-text {
        font-size: 24rpx;
        line-height: 1.5;
        color: $v-c0-45;
      }

      &-icon {
        width: 196rpx;
        height: 196rpx;
      }
    }

    &-form {
      //height: 100%;
      padding: 0 32rpx;
      margin-top: 24rpx;

      &__item {
        margin-top: 52rpx;
        text-align: right;
        border-bottom: 2rpx solid $v-bg-light;
      }

      &__placeholder {
        width: 100%;
        text-align: right;
        color: $v-c0-25 !important;
        font-size: 16px;
      }

      &__text {
        width: 100%;
        text-align: right;
        color: rgba(0, 0, 0, 0.85);
        font-size: 16px;
      }
    }

    &-button {
      width: 646rpx;
      height: 92rpx;
      margin-bottom: 40rpx;
      margin-top: 100rpx;
      margin-left: 52rpx;
      &.last {
        margin-top: 0rpx;
        margin-bottom: 40rpx;
      }
    }
  }
</style>
