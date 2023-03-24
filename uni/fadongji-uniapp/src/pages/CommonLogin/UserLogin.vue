<template>
  <view>
    <view
      :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
      class="user-login"
    >
      <!-- #ifdef H5 -->
      <view class="user-login__fix" @click="showHelpFn">帮助中心</view>
      <!-- #endif -->
      <view class="user-login__topbg">
        <image class="top-bg" mode="widthFix" src="/static/common/login_bj.png" />
        <view class="user-login__top">
          <!-- #ifdef APP-PLUS -->
          <VoNav
            :is-fixed="false"
            :is-transparent="true"
            right-title="帮助中心"
            right-title-color="rgba(0, 0, 0, 0.65)"
            @operationFn="showHelpFn"
          >
            <view slot="back"><view /></view>
          </VoNav>
          <view class="user-login__top-block" />
          <!-- #endif -->
          <view class="top-row">
            <view class="top-row__left" >
              <image class="left-img" src="/static/common/login_logo.png" />
            </view>
            <view class="top-row__right">
              <view class="right-btn" @click="selectRolePage()">
                <text>{{ getRoleName(roleCode, roleArrGet) }}</text>
                <VoIcon :size="20" name="switch" />
              </view>
            </view>
          </view>
          <view class="top-text">欢迎进入发动集产业链共创平台</view>
        </view>
      </view>

      <view class="user-login__main">
        <view class="main-top">
          <view class="main-tabs">
            <view
              v-for="item in tabs"
              :key="item.value"
              :class="item.choosed ? 'choosed' : ''"
              class="main-tabs__item"
              @click="tabChange(item)"
            >
              {{ item.name }}
              <view v-show="item.choosed" class="item-line">
                <view class="item-line__color" />
              </view>
            </view>
          </view>
          <u--form
            ref="form"
            :model="formData"
            class="main-form"
            labelPosition="left"
            labelWidth="0"
          >
            <u-form-item class="main-form__item" label="">
              <view v-if="formData.phone" class="item-label">手机号</view>
              <!--      ENG-6338   :adjustPosition="true"      -->
              <u-input
                v-model="formData.phone"
                :adjustPosition="true"
                border="none"
                class="item-input"
                color="rgba(0, 0, 0, 0.85)"
                maxlength="11"
                placeholder="请输入手机号"
                placeholderClass="placeholder"
                type="number"
              />
            </u-form-item>
            <u-form-item
              v-show="tabsValue === 'pwd'"
              ref="item2"
              class="main-form__item last"
              label=""
            >
              <view v-if="formData.pwd" class="item-label">密码</view>
              <u-input
                v-show="showPwd"
                v-model="formData.pwd"
                :adjustPosition="true"
                border="none"
                class="item-input"
                color="rgba(0, 0, 0, 0.85)"
                placeholder="请输入密码"
                placeholderClass="placeholder"
              />
              <u-input
                v-show="!showPwd"
                v-model="formData.pwd"
                :adjustPosition="true"
                border="none"
                class="item-input"
                color="rgba(0, 0, 0, 0.85)"
                placeholder="请输入密码"
                placeholderClass="placeholder"
                type="password"
              />

              <view class="item-icon" @click="pwdClick">
                <VoIcon
                  :name="showPwd ? 'eye' : 'hide-eye'"
                  :opacity="0.65"
                  :size="24"
                  color="#000000"
                />
              </view>
            </u-form-item>
            <u-form-item v-show="tabsValue === 'code'" class="main-form__item last" label="">
              <view v-if="formData.code" class="item-label">验证码</view>
              <u-input
                v-model="formData.code"
                :adjustPosition="true"
                :maxlength="4"
                border="none"
                class="item-input"
                color="rgba(0, 0, 0, 0.85)"
                placeholder="请输入验证码"
                placeholderClass="placeholder"
                type="number"
              />
              <u-code ref="uCode" change-text="xS" seconds="60" @change="codeChange" />
              <view slot="right" class="main-form__code" @click="getCode">
                {{ tips }}
              </view>
            </u-form-item>
          </u--form>
          <view class="main-btn">
            <EraButton
              v-if="formData.phone && (tabsValue === 'pwd' ? formData.pwd : formData.code)"
              size="large"
              text="登录"
              @click="login"
            />
            <EraButton v-else class="main-btn__btn disabled" disabled size="large" text="登录" />
            <view v-if="tabsValue === 'pwd'" class="main-btn__text" @click="backPwdFn"
              >忘记密码</view
            >
          </view>
          <view class="main-checkbox">
            <view class="main-checkbox__input" @click="selectChange">
              <VoIcon v-if="isAccept" :size="24" color="#FF5319" name="select-right" />
              <VoIcon v-else :name="selectImg" :size="24" />
            </view>
            <view class="main-checkbox__text">
              我已阅读并同意
              <!--              <span-->
              <!--                class="text-a"-->
              <!--                @click="goWebView('http://testm.fdjcyl.com')"-->
              <!--                >《用户协议》</span-->
              <!--              >-->
              <span class="text-a" @click="goWebView('/pages/CommonWeb/UserPolicy')"
                >《用户协议》</span
              >
              <span class="text-a" @click="goWebView('/pages/CommonWeb/PrivacyPolicy')"
                >《隐私政策》</span
              >
              <!--            <span class="text-a">《联通统一认证服务条款》</span>-->
              ；未注册的手机号将自动注册
            </view>
          </view>
        </view>

        <view v-show="showLogin" class="main-btm">
          <u-divider text="其他登录方式" text-color="rgba(0, 0, 0, 0.25)" textSize="13" />
          <view class="main-btm__btn">
            <!-- #ifdef APP-PLUS -->
            <view class="btn-first" @click="oauthLogin">
              <VoIcon :size="24" name="phone" />
              <view class="btn-first__text"> 一键登录 </view>
            </view>
            <!-- #endif -->

            <!-- #ifdef H5 -->
            <view v-if="isShowWeiXin" class="btn-item mid" @click="threeLogin('wechat_tencent')">
              <image class="btn-item__icon" src="/static/common/weixin.png" />
            </view>
            <!-- #endif -->

            <!-- #ifdef APP-PLUS -->
            <view class="btn-item mid" @click="threeLogin('wechat')">
              <image class="btn-item__icon" src="/static/common/weixin.png" />
            </view>
            <view class="btn-item" @click="threeLogin('douyin')">
              <image class="btn-item__icon" src="/static/common/douyin.png" />
            </view>
            <!-- #endif -->
          </view>
        </view>
        <VoSafetyArea :is-fixed="false" />
      </view>

      <VoHelpAction :actions="[{
            type: 'phone',
            name: '客服热线 400-893-5518',
            phone: '400-893-5518',
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: '14',
          }
        ]"  no-moor ref="helpRef" />
    </view>
    <u-modal
      :closeOnClickOverlay="true"
      :show="showBindPhoneErr"
      confirmColor="#22284B"
      confirmText="关闭"
      width="640rpx"
      @close="showBindPhoneErr = false"
      @confirm="showBindPhoneErr = false"
    >
      <view class="phone-modal">
        该手机号已绑定其他微信号/抖音号，请更换手机号重试，或直接使用手机号登陆。
      </view>
    </u-modal>

    <u-modal
      :closeOnClickOverlay="true"
      :show="isMoreIdentity"
      :showCancelButton="true"
      cancelText="返回"
      confirmColor="#22284B"
      confirmText="注册新身份"
      width="640rpx"
      @cancel="isMoreIdentity = false"
      @close="isMoreIdentity = false"
      @confirm="helpRegFn"
    >
      <view class="identity-toast">
        <view class="fz-b text-center identity-toast__title"> 身份提示 </view>
        <view>
          当前已存在其他身份，是否注册新身份？正在注册的身份“{{
            roleCode ? getRoleName(roleCode, roleArrGet) : ''
          }}”
        </view>
      </view>
    </u-modal>

    <VoSelectRolePopup
        v-if="showSelectBoo"
      ref="roleRef"
      :roleCode="roleCode"
      :show="true"
      @confirmFn="confirmRoleFn"
        @cancelFn="showSelectBoo=false"
    />
  </view>
</template>

<script>
  // #ifdef APP-PLUS

  import { androidEnvVersion, iosEnvVersion } from '@/common/envVersion'

  const vocenLogin = uni.requireNativePlugin('vocen-login')
  const vocenDyLogin = uni.requireNativePlugin('vocen-dyLogin')
  const vocenJpush = uni.requireNativePlugin('vocen-jpush')
  // #endif
  import devConf from '@/common/env'
  import helpUtil, { toRoleHome } from '@/common/helper'
  import IM from '@/common/Im/Im'

  export default {
    name: 'Login',
    data() {
      return {
        showSelectBoo: false, // 选择角色弹窗显示
        isShowWeiXin: false,
        //是否多个身份弹窗
        isMoreIdentity: false,
        //绑定手机号错误
        showBindPhoneErr: false,
        isLoad: false,
        //数据来源（wechat：微信，tik_tok：抖音，wechat_applet：微信小程序，wechat_tencent：微信公众号）（三方登录绑定手机时必填）
        source: '',
        //验证码uuid
        uuid: '',
        //角色
        roleCode: 'garage',
        tabsValue: 'code',
        tabs: [
          {
            name: '验证码登录',
            value: 'code',
            choosed: true,
            index: 0,
          },
          {
            name: '手机号密码登录',
            value: 'pwd',
            choosed: false,
            index: 1,
          },
        ],
        tips: '获取验证码',
        isAccept: false,
        formData: {
          phone: '',
          pwd: '',
          code: '',
        },
        rules2: {
          phone: [
            {
              type: 'number',
              required: true,
              message: '请输入手机号',
              trigger: ['blur', 'change'],
            },
            {
              pattern: /^1[3456789][0-9]{9}$/g, //this.$vocenApi.Pattern.phone
              // 正则检验前先将值转为字符串
              transform(value) {
                return String(value)
              },
              message: '手机号格式不正确',
            },
          ],
          pwd: {
            type: 'string',
            required: true,
            message: '请输入密码',
            trigger: ['blur', 'change'],
          },
        },
        rules: {
          phone: [
            {
              type: 'number',
              required: true,
              message: '请输入手机号',
              trigger: ['blur', 'change'],
            },
            {
              pattern: this.$vocenApi.Pattern.phone, // /^1[3456789][0-9]{9}$/g
              // 正则检验前先将值转为字符串
              transform(value) {
                return String(value)
              },
              message: '手机号格式不正确',
            },
          ],
          code: {
            type: 'string',
            required: true,
            message: '请输入验证码',
            trigger: ['blur', 'change'],
          },
        },
        actions: [
          {
            name: '忘记密码',
          },
          {
            name: '立即注册',
          },
        ],
        selectImg: 'address_select',
        showPwd: false,
        pwdFocus: false,
        roleArrGet: [],
        showLogin: false,
      }
    },
    async onShow() {
      if (this.userInfo && this.userInfo.access_token) {
        toRoleHome()
        return
      }
      await this.getShowLogin()
    },
    onLoad(options) {
      this.$storage.remove('other')
      //清除搜索记录
      this.$storage.remove('create_history')

      this.loginType = options.type
      if (options.roleCode) {
        this.roleCode = options.roleCode
      }
      if (options.userName) {
        this.formData.phone = options.userName
      }
      // 防止ios问题初始化
      this.roleArrGet = [
        { roleCode: 'supplier', roleName: '供应商', url: null, licenseId: '133960256299597825' },
        { roleCode: 'agent', roleName: '服务商', url: null, licenseId: '133960256299597825' },
        { roleCode: 'garage', roleName: '修理厂', url: null, licenseId: '133960256299597825' },
        {
          roleCode: 'investmentManager',
          roleName: '招商经理',
          url: null,
          licenseId: '133960256299597825',
        },
        {
          roleCode: 'channelManager',
          roleName: '渠道经理',
          url: null,
          licenseId: '133960256299597825',
        },
        {
          roleCode: 'skilledWorker',
          roleName: '集师傅',
          url: null,
          licenseId: '133960256299597825',
        },
        { roleCode: 'recycling', roleName: '回收公司', url: null, licenseId: '133960256299597825' },
        {
          roleCode: 'oldMachine',
          roleName: '旧机买家',
          url: null,
          licenseId: '133960256299597825',
        },
      ]
      let platform = uni.getSystemInfoSync().platform

      if (this.userInfo && this.userInfo.access_token) {
      } else if (platform == 'android') {
        if (!this.formData.phone) {
          this.oauthLogin('noError')
        }
      }



      // #ifdef H5
      this.isShowWeiXin = helpUtil.isWeiXin()
      // #endif
      uni.$off('scanReasult')
      uni.$on('scanReasult', (data) => {
        console.log('扫描结果', data)
      })
    },
    created() {
      // #ifdef H5
      if (helpUtil.isWeiXin()) {
        const code = helpUtil.GetQueryByString(location.href, 'code')
        if (code) {
          this.source = 'wx_official'
          let param = {
            source: 'wx_official',
            grantType: 'wx_official',
            code: code,
          }
          this.loginCommonFn(param)
          return
        }
      }
      // #endif
      const last_role = this.$storage.get('last_role')
      if (last_role) {
        this.roleCode = last_role
      }
    },
    methods: {
      async initRoleFn() {
        this.roleArrGet = await this.$store.dispatch('role/getRoleArr', { isOnLine: 1 })
      },
      /**
       * @description 选择角色
       */
      confirmRoleFn(e) {
        this.roleCode = e
        this.showSelectBoo = false
      },
      /**
       * @description 已有角色需要帮忙注册逻辑
       */
      helpRegFn() {
        const refreshToken = this.$storage.get('refresh_token')
        let param = {
          clientId: devConf.clientId,
          clientSecret: this.$encrypt.encrypt(devConf.clientSecret),
          roleCode: this.roleCode,
          refreshToken,
          terminalSource: helpUtil.appSource(),
        }
        helpUtil.showLoading()
        this.$VoHttp
          .register(param, { noPrefix: true })
          .then((res) => {
            this.$store.dispatch('user/setUseInfo', res.data)
            helpUtil.hideLoading()
            uni.$u.toast('注册成功')
            setTimeout(() => {
              this.isMoreIdentity = false
              if (res.data.roleCode == 'supplier') {
                // 如果是供应商
                uni.redirectTo({
                  url: '/pages/AuthenticationInformation/FirstStepDefault',
                })
              } else if (res.data.roleCode == 'agent') {
                // 服务商
                uni.redirectTo({
                  url: '/pages/AuthenticationInformation/PublicAccounts',
                })
              } else if (res.data.roleCode == 'garage') {
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
            helpUtil.hideLoading()
            uni.$u.toast(e.message || '注册失败')
          })
      },
      goWebView(url) {
        // #ifdef H5
        this.$linkToEasy(url + '?show=1')
        // #endif
        // #ifndef H5
        this.$linkToWebView(devConf.shareBaseUrl + url)
        // #endif
      },
      selectRolePage() {
        this.initRoleFn()
        this.showSelectBoo = true
        this.$refs.roleRef?.initFn()
      },
      /**
       * @description 找回密码
       */
      backPwdFn() {
        this.$linkToEasy('/pages/CommonLogin/PwdChange?isForget=1&mobile=' + this.formData.phone)
      },
      //页面跳转
      goPage(url) {
        this.$linkToEasy(url)
      },
      //tabs切换
      tabChange(tab) {
        this.tabsValue = tab.value
        console.log(this.tabsValue)
        this.tabs.forEach((item) => {
          if (item.value === tab.value) {
            item.choosed = true
          } else {
            item.choosed = false
          }
        })
        //重置表单
        this.$refs.form.resetFields()
        // this.$refs.form.clearValidate()
      },
      checkChange(e) {
        let value = e.detail.value
        if (value[0] === '1') {
          this.isAccept = true
        } else {
          this.isAccept = false
        }
      },
      //验证码Change
      codeChange(text) {
        this.tips = text
      },
      //获取验证码
      getCode() {
        if (!this.$vocenApi.Pattern.isPhone(this.formData.phone)) {
          uni.$u.toast('请输入正确的手机号')
          return
        }
        if (this.$refs.uCode.canGetCode) {
          // 模拟向后端请求验证码
          uni.showLoading({
            title: '正在获取验证码',
            mask: true,
          })
          let param = {
            mobile: this.formData.phone,
          }
          if (this.uuid) {
            param.uuid = this.uuid
          }
          this.$VoHttp
            .smsSend(param)
            .then((res) => {
              this.uuid = res.data
              uni.$u.toast('发送成功')
              this.$refs.uCode.start()
            })
            .catch((e) => {
              uni.$u.toast(e.message || '请求失败')
            })
            .finally(() => {
              uni.hideLoading()
            })
        } else {
          uni.$u.toast('倒计时结束后再发送')
        }
      },
      login() {
        if (!this.isAccept) {
          uni.$u.toast('请勾选协议')
          return false
        }
        if (!this.formData.phone) {
          uni.$u.toast('请输入手机号')
          return false
        }
        if (!this.$vocenApi.Pattern.isPhone(this.formData.phone)) {
          uni.$u.toast('请输入正确的手机号')
          return false
        }
        let param = {}

        if (this.tabsValue === 'pwd') {
          param.grantType = 'password'
          param.password = this.$encrypt.encrypt(this.formData.pwd)
          param.userName = this.formData.phone
        } else if (this.tabsValue === 'code') {
          if (!this.uuid) {
            uni.$u.toast('请先获取验证码')
            return
          }
          param.grantType = 'sms_code'
          param.code = this.formData.code
          param.uuid = this.uuid
          param.mobile = this.formData.phone
        }

        this.loginCommonFn(param)
      },
      /**
       *  @description 统一登录
       *  @param 登录的参数
       */
      loginCommonFn(param) {
        console.log(this.roleCode)
        if (this.isLoad) return
        this.isLoad = true
        uni.showLoading({
          title: '加载中',
        })
        console.log('登录啊')
        //登录的来源
        param.terminalSource = helpUtil.appSource()
        param.roleCode = this.roleCode
        param.clientId = devConf.clientId
        param.clientSecret = this.$encrypt.encrypt(devConf.clientSecret)
        this.$VoHttp
          .login(param, { noPrefix: true, noLoading: true })
          .then((res) => {
            this.loginSuccessFn(res)
          })
          .catch((e) => {
            uni.hideLoading()
            this.loginFailFn(e)
          })
          .finally(() => {
            this.isLoad = false
          })
      },
      getShowLogin() {
        // 安卓不请求接口  IOS请求接口
        let platform = uni.getSystemInfoSync().platform
        if (platform == 'android') {
          this.showLogin = true
        } else if (platform == 'ios') {
          this.$VoHttp.apiExtraCustomerShow({}, { noLoading: true, noError: true  }).then((res) => {
            this.showLogin = res.data
          })
        }
      },
      // 登录失败
      loginFailFn(e) {
        if (String(e.code) === 'U0123') {
          //设置密码
          uni.$u.toast(e.message)
          setTimeout(() => {
            this.isLoad = false
            this.$linkToEasy('/pages/CommonLogin/PwdChange?mobile=' + this.formData.phone)
          }, 1500)
        } else if (String(e.code) === 'U0204') {
          this.bindPhoneFn(e)
        } else if (String(e.code) === 'U0205') {
          //绑定手机号错误
          this.showBindPhoneErr = true
        } else {
          uni.$u.toast(e.message || '登陆失败')
        }
        this.isLoad = false
      },
      async loginSuccessFn(res) {
        console.log(res, '登录成功')

        this.$storage.set('refresh_token', res.data.refresh_token)
        this.$storage.set('access_token', res.data.access_token)

        if (res.data.isRegister && res.data.isRest) {
          uni.hideLoading()
          // 已有角色  选择其他角色需要帮忙注册
          this.isMoreIdentity = true
          this.isLoad = false
          return
        } else if (res.data.isRegister) {
          this.$store.dispatch('user/setUseInfo', res.data)
          uni.hideLoading()
          //需要认证
          this.$linkToEasy('/pages/CommonLogin/CompleteInfo?roleCode=' + this.roleCode)
          this.isLoad = false
          return
        }
        this.$store.dispatch('user/setUseInfo', res.data)

        this.vocenPluginJPushModule()

        await this.companyInfoFn(res.data)
      },
      async companyInfoFn(userInfo) {
        console.log(userInfo, 'userInfouserInfouserInfouserInfo')
        this.isLoad = false
        await this.$VoHttp
          .apiCompanyLegalInfo({}, { noLoading: true })
          .then((res) => {
            uni.hideLoading()
            uni.$u.toast('登录成功')

            // 临时调试修理厂所做的跳转代码
            // uni.reLaunch({
            //   url: '/pages/CommonLogin/ReplenishInfo?phone=' + res.data.userName,
            // })
            // return
            // 判断是修理厂的情况下，并且缺少资料信息的，需要进行补充信息-跳转进行补充
            if (res.data.checkStatus === 6 && res.data.platformCode === 'garage') {
              // 执行跳转-进行补充信息
              uni.reLaunch({
                url: '/pages/CommonLogin/ReplenishInfo?phone=' + res.data.userName,
              })
              return
            }
            if (res.data.checkStatus === 0 && res.data.roleCode === 'agent') {
              // 资料未提交
              uni.redirectTo({
                url: '/pages/AuthenticationInformation/FirstStepDefault',
              })
            } else {
              setTimeout(() => {
                toRoleHome()
              }, 1500)
            }
          })
          .catch(() => {
            uni.hideLoading()
          })
      },
      imConnectFn() {
        // im连接

        const userInfo = uni.getStorageSync('userInfo')
        if (userInfo && userInfo.access_token) {
          let imCtx = null
          imCtx = new IM()
          this.$store.commit('im/SET_IMCTX', imCtx)
          imCtx.start()
          imCtx.openListen()
        }
      },
      //设置极光推送
      vocenPluginJPushModule() {
        this.imConnectFn()
        const alias = this.userInfo.accountId
        // #ifdef APP-PLUS
        try {
          let userId = 'user_' + alias
          console.log('推送别名', userId)
          vocenJpush.voJPushSetAlias(
            {
              alias: userId,
            },
            (res) => {
              console.log(res)
              // uni.showToast({
              //   title: JSON.stringify(res),
              //   icon: "none"
              // })
            },
          )
        } catch (e) {
          console.log(e, 'eeeeeeeee')
        }
        // #endif
      },
      //第三方登录
      threeLogin(type) {
        if (this.isAccept) {
          if (type === 'wechat') {
            //app微信登陆
            this.wechatLogin()
          } else if (type === 'wechat_tencent') {
            //公众号微信登录
            this.wechatTencentLogin()
          } else if (type === 'douyin') {
            this.douYinLogin()
          }
        } else {
          uni.showToast({
            title: '请勾选协议',
            icon: 'none',
          })
        }
      },
      /**
       * @description 一键绑定手机号
       */
      bindCommonFn(param) {
        if (this.isLoad) return
        this.isLoad = true
        uni.showLoading({
          title: '加载中',
        })
        this.$VoHttp
          .login(param, { noPrefix: true })
          .then((res) => {
            this.loginSuccessFn(res)
          })
          .catch((e) => {
            this.loginFailFn(e)
          })
          .finally(() => {
            this.isLoad = false
            uni.hideLoading()
          })
      },
      /**
       * @description app绑定第三方手机号
       */
      bindPhoneChoose(result) {
        // #ifdef APP-PLUS
        let that = this
        const resultData = JSON.parse(result.message)

        //跳转其他手机绑定
        that.$linkToEasy(
          '/pages/CommonLogin/BindOtherNumber?source=' +
            that.source +
            '&openId=' +
            resultData.openId +
            '&threeName=' +
            resultData.threeName +
            '&roleCode=' +
            this.roleCode,
        )

        // vocenLogin.voShowShanYanBindMobileView(
        //   {
        //     role: this.getRoleName(this.roleCode, this.roleArrGet),
        //     agreementTextFirst: '我已阅读并同意',
        //     agreementTextLast: ';未注册的手机号将自动注册',
        //     userAgreementTitle: '《用户协议》',
        //     privacyTitle: '《隐私政策》',
        //     userAgreementUrl: `${devConf.shareBaseUrl}/pages/CommonWeb/PrivacyPolicy`,
        //     privacyUrl: `${devConf.shareBaseUrl}/pages/CommonWeb/PrivacyPolicy`,
        //     onlineTitle: '在线客服',
        //     mobile: '411-000-000',
        //   },
        //   (res) => {
        //     let dict = res
        //     console.log(dict, 'dictdictdictdictdict')
        //     this.bindPhoneMonitorFn(result)
        //     if (dict.code === 200) {
        //       let data = dict.data
        //       if (data.businessCode === 'F10000') {
        //         vocenLogin.voHiddenLoading()
        //         vocenLogin.voCloseView()
        //         console.log(data.token)
        //         let param = {
        //           clientId: devConf.clientId,
        //           clientSecret: that.$encrypt.encrypt(devConf.clientSecret),
        //           grantType: 'phone',
        //           source: that.source,
        //           token: data.token,
        //           openId: resultData.openId,
        //           threeName: resultData.threeName,
        //           terminalSource: helpUtil.appSource(),
        //         }
        //         this.bindCommonFn(param)
        //       }
        //     } else {
        //       console.log('唤起失败6666')
        //       //跳转其他手机绑定
        //       that.$linkToEasy(
        //         '/pages/CommonLogin/BindOtherNumber?source=' +
        //           that.source +
        //           '&openId=' +
        //           resultData.openId +
        //           '&threeName=' +
        //           resultData.threeName +
        //           '&roleCode=' +
        //           this.roleCode,
        //       )
        //     }
        //   },
        // )
        // #endif
      },
      /**
       * 绑定手机号监听
       */
      bindPhoneMonitorFn(result) {
        // #ifdef APP-PLUS
        let that = this
        //一键登录 监听
        /*
                  C00001:切换角色按钮
                  C00002:其他登录方式按钮
                  C00003:帮助中心 - 在线客服
                  C00004:帮助中心 - 手机号
                  */
        vocenLogin.voSetActionListener(function (res) {
          let dict = res
          console.log(dict)
          if (dict.code === 200) {
            //关闭一键登录授权框
            vocenLogin.voCloseView()

            let data = dict.data
            if (data.businessCode === 'C00001') {
              //切换角色按钮  绑定手机号 页面为切换其他手机号
              that.roleCode = data.roleCode
            } else if (data.businessCode === 'C00002') {
              //C00002:其他登录方式按钮
              const resultData = JSON.parse(result.message)
              //需要绑定手机号
              that.$linkToEasy(
                '/pages/CommonLogin/BindOtherNumber?source=' +
                  that.source +
                  '&openId=' +
                  resultData.openId +
                  '&threeName=' +
                  resultData.threeName,
              )
            }
          } else {
            console.log(dict.info)
          }
        })
        // #endif
      },
      /**
       * @description 三方登录绑定手机号
       */
      bindPhoneFn(res) {
        // #ifdef APP-PLUS
        this.bindPhoneChoose(res)
        // #endif

        // #ifndef APP-PLUS
        const resultData = JSON.parse(res.message)
        //需要绑定手机号
        this.$linkToEasy(
          '/pages/CommonLogin/BindOtherNumber?source=' +
            this.source +
            '&openId=' +
            resultData.openId +
            '&threeName=' +
            resultData.threeName,
        )
        // #endif
      },
      /**
       *  @description 公众号h5登录
       */
      wechatTencentLogin() {
        const _self = this
        this.source = 'wx_official'
        // #ifdef H5
        const channel = {
          appid: devConf.appid,
        }
        const REDIRECT_URI = helpUtil.urlencode(location.href)
        // const REDIRECT_URI = helpUtil.urlencode(
        //   'http://fdjwap.front.vocen.com.cn/#/pages/CommonLogin/UserLogin',
        // )

        console.log(REDIRECT_URI, 'REDIRECT_URIREDIRECT_URIREDIRECT_URI')
        let wxAuthUrl = null
        const scope = 'snsapi_userinfo' // snsapi_userinfo //snsapi_base
        // 公众号自己的appid用于登录
        wxAuthUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${channel.appid}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${scope}&connect_redirect=1&state=STATE#wechat_redirect`

        location.replace(wxAuthUrl)
        // #endif
      },
      /**
       * @description 抖音登录 app
       */
      douYinLogin() {
        this.source = 'tik_tok'
        let that = this
        // #ifdef APP-PLUS
        vocenDyLogin.vocenAuthDouYinLoginCallback(function (res) {
          let dict = res
          if (dict.code === 200) {
            let param = {
              grantType: 'tik_tok',
              code: dict.data.code,
            }
            that.loginCommonFn(param)
          } else {
            uni.$u.toast('取消抖音授权')
          }
        })
        // #endif
      },
      /**
       * @description 微信登录
       */
      wechatLogin() {
        //微信app登录
        this.source = 'wechat'
        let that = this
        uni.login({
          provider: 'weixin',
          onlyAuthorize: true,
          success: function (loginRes) {
            let param = {
              grantType: 'wechat',
              code: loginRes.code,
            }
            that.loginCommonFn(param)
          },
          fail: function (e) {
            console.log(e, 'eee')
            if (e.code == '-8') {
              uni.$u.toast('未安装微信客户端')
            } else if (e.code == '-6') {
              uni.$u.toast('无法连接到网络')
            } else if (e.code == '-2') {
              uni.$u.toast('用户取消当前的操作')
            } else {
              uni.$u.toast('微信拒绝授权')
            }
          },
        })
      },
      oauthLogin(noError) {
        console.log(this.getRoleName(this.roleCode, this.roleArrGet), '6666', this.roleCode)
        // #ifdef APP-PLUS
        vocenLogin.voShowShanYanView(
          {
            role: this.getRoleName(this.roleCode, this.roleArrGet),
            roleArray: this.roleArrGet,
            agreementTextFirst: '我已阅读并同意',
            agreementTextLast: ';未注册的手机号将自动注册',
            userAgreementTitle: '《用户协议》',
            privacyTitle: '《隐私政策》',
            userAgreementUrl: `${devConf.shareBaseUrl}/pages/CommonWeb/PrivacyPolicy`,
            privacyUrl: `${devConf.shareBaseUrl}/pages/CommonWeb/PrivacyPolicy`,
            onlineTitle: '在线客服',
            mobile: '411-000-000',
          },
          (res) => {
            let dict = res
            this.monitorFn()
            if (dict.code === 200) {
              let data = dict.data
              if (data.businessCode === 'F10000') {
                vocenLogin.voHiddenLoading()
                vocenLogin.voCloseView()
                console.log(data.token)
                let param = {
                  grantType: 'phone',
                  token: data.token,
                }
                this.loginCommonFn(param)
              }
            } else if (noError != 'noError' && dict.data && dict.data.businessCode == 'F00001') {
              uni.$u.toast('网络请求失败，请检查您的网络设置')
            }
          },
        )
        // #endif
      },
      selectChange() {
        if (this.selectImg === 'address_select') {
          this.selectImg = 'success-fill'
          this.isAccept = true
        } else {
          this.selectImg = 'address_select'
          this.isAccept = false
        }
      },
      pwdClick() {
        this.showPwd = !this.showPwd
        console.log(this.showPwd)
        this.pwdFocus = true
      },
      /**
       * @description 打开帮助中心
       */
      showHelpFn() {
        this.$refs.helpRef.open()
      },
      monitorFn() {
        // #ifdef APP-PLUS
        //一键登录 监听
        /*
              C00001:切换角色按钮
              C00002:其他登录方式按钮
              C00003:帮助中心 - 在线客服
              C00004:帮助中心 - 手机号
              */
        let that = this
        vocenLogin.voSetActionListener(function (res) {
          let dict = res
          console.log(dict)
          if (dict.code === 200) {

            let data = dict.data
            if (data.businessCode === 'C00001') {
              //切换角色按钮  绑定手机号 页面为切换其他手机号
              that.roleCode = data.roleCode
              that.$refs.roleRef?.initFn(that.roleCode)
            } else if (data.businessCode === 'C00002') {
              //C00002:其他登录方式按钮
              //关闭一键登录授权框
              vocenLogin.voCloseView()
            } else if (data.businessCode === 'C00003') {
              //C00003:帮助中心 - 在线客服
              uni.showToast({
                title: data.des,
                icon: 'none',
              })
            } else if (data.businessCode === 'C00004') {
              //C00004:帮助中心 - 手机号
              uni.showToast({
                title: data.des,
                icon: 'none',
              })
            }
          } else {
            console.log(dict.info)
          }
        })
        // #endif
      }
    },
  }
</script>

<style lang="scss" scoped>
  .user-login {
    height: 100vh;
    width: 750rpx;
    position: relative;
    display: flex;
    flex-direction: column;
    &__fix {
      position: fixed;
      right: 0;
      bottom: 230rpx;
      background: linear-gradient(270.27deg, #ff5622 8.32%, #ff8640 93.91%);
      border-top-left-radius: 32rpx;
      border-bottom-left-radius: 32rpx;
      font-size: 26rpx;
      line-height: 1.5;
      color: $v-bg-white;
      padding: 12rpx 16rpx;
    }
    &__topbg {
      position: relative;
      overflow: hidden;
      .top-bg {
        width: 750rpx;
        position: absolute;
        top: 0;
        z-index: 1;
      }
    }

    &__top {
      position: relative;
      z-index: 2;
      /* #ifdef H5 */
      padding-top: 48rpx;
      /* #endif */
      /* #ifndef H5 */
      padding-top: 0rpx;
      /* #endif */
      padding-bottom: 108rpx;
      z-index: 99;
      &-block {
        height: 48rpx;
      }
      .top-row {
        display: flex;
        align-items: center;
        padding-left: 36rpx;
        padding-right: 52rpx;
        &__left {
          .left-img {
            width: 320rpx;
            height: 108rpx;
          }
        }
        &__right {
          flex: 1;
          .right-btn {
            background: #ffffff;
            border-radius: 38rpx;
            line-height: 56rpx;
            padding-left: 22rpx;
            padding-right: 4rpx;
            float: right;
            font-size: 24rpx;
            font-weight: bold;
            color: $v-c0-85;
            .vo-icon {
              vertical-align: middle;
            }
          }
        }
      }
      .top-text {
        font-weight: 400;
        font-size: 30rpx;
        line-height: 1.5;
        color: $v-c0-65;
        padding-left: 52rpx;
      }
    }
    &__main {
      flex: 1;
      background: #ffffff;
      border-top-left-radius: 30rpx;
      border-top-right-radius: 30rpx;
      display: flex;
      flex-direction: column;
      .main-top {
        flex: 1;
      }
      .main-tabs {
        width: 100%;
        display: flex;
        padding-top: 56rpx;
        padding-bottom: 56rpx;

        &__item {
          text-align: center;
          line-height: 1.5;
          width: 50%;
          font-weight: 400;
          font-size: 32rpx;
          color: $v-c0-45;
          position: relative;
          &.choosed {
            color: $color-primary-yellow;
            font-weight: bold;
          }
          .item-line {
            display: flex;
            justify-content: center;
            line-height: 1;
            &__color {
              width: 40rpx;
              height: 6rpx;
              border-radius: 4rpx;
              background-color: $color-primary-yellow;
              margin-top: 20rpx;
            }
          }
        }
      }
      .main-form {
        padding: 0 52rpx;
        &__code {
          font-weight: 400;
          font-size: 32rpx;
          line-height: 1.5;
          color: var(--color-primary);
        }
        &__item {
          margin-bottom: 46rpx;
          color: $v-c0-85;
          font-weight: bold;
          position: relative;
          border-bottom: 2rpx solid #f7f7f8;
          .placeholder {
            color: $v-c0-25 !important;
          }
          .item-label {
            font-weight: 400;
            font-size: 24rpx;
            line-height: 1.5;
            color: $v-c0-25;
            position: absolute;
            top: -20rpx;
          }
          .item-input {
            flex: 1;
          }
          .item-icon {
            height: 24px;
          }
          &.last {
            margin-bottom: 0;
          }
        }
      }
      .main-btn {
        padding: 50rpx 50rpx 60rpx 50rpx;
        &__btn {
          background-color: var(--color-primary);
          border-radius: 24px;
          color: #fff;
          border: 0;
          height: 92rpx;
          &.disabled {
            background: $v-btn-disabled;
            color: $v-c0-45;
            opacity: 1;
          }
        }
        &__text {
          font-size: 14px;
          line-height: 1.5;
          color: $v-c0-45;
          text-align: center;
          padding-top: 24rpx;
        }
      }
      .main-checkbox {
        display: flex;
        padding: 0 50rpx;
        &__input {
          .input-img {
            width: 48rpx;
            height: 48rpx;
            border-radius: 50%;
          }
        }
        &__text {
          font-weight: 400;
          font-size: 24rpx;
          line-height: 1.5;
          color: $v-c0-45;
          .text-a {
            color: $v-btn-weight;
          }
        }
      }
      .main-btm {
        // position: absolute;
        // bottom: 0;
        width: 750rpx;
        padding: 0 140rpx 22rpx 140rpx;
        box-sizing: border-box;
        &__btn {
          display: flex;
          justify-content: center;
          .btn-first {
            display: flex;
            padding: 0 20rpx;
            justify-content: center;
            align-items: center;
            background: $v-c0-8;
            border-radius: 80rpx;
            height: 72rpx;
            &__icon {
              width: 20rpx;
              height: 32rpx;
            }
            &__text {
              font-weight: 400;
              font-size: 24rpx;
              line-height: 1.5;
              color: $v-btn-deep;
            }
          }

          .btn-item {
            &__icon {
              width: 72rpx;
              height: 72rpx;
            }
            &.mid {
              margin: 0 60rpx;
            }
          }
        }
      }
    }
  }
  .phone-modal {
    padding: 15px 7px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 32rpx;
    line-height: 150%;
  }
  .identity-toast {
    padding: 14rpx;
    font-size: 32rpx;
    line-height: 150%;
    &__title {
      margin-bottom: 32rpx;
    }
  }
</style>
