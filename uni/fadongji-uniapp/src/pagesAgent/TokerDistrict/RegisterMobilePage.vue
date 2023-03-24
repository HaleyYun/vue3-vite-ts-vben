<template>
  <view class="register">
    <VoNav is-fixed  title="发动集" no-left>
    </VoNav>
    <view class="register-logo flex flex-justify-c">
      <image :src="logoImg" class="register-logo__img" />
    </view>
    <view class="fz-32 lh150 color-block text-center m-l-52 m-r-52">
      您的好友“{{ encryptPhone(options.userName) }}”
      <block v-if="options.roleCode === 'supplier'">邀请您成为服务于千万用户的供应商</block>
      <block v-else-if="options.roleCode === 'agent'">邀请您成为服务于千万用户的服务商</block>
      <block v-else-if="options.roleCode === 'skilledWorker'">邀请您成为服务于全国30万家修理厂的集师傅</block>
      <!--      <template v-else-if="options.roleCode === 'recycling'">回收公司</template>-->
      <!--      <template v-else-if="options.roleCode === 'oldMachine'">旧机买家</template>-->
      <block v-else>邀请您加入全国30万家修理厂都在用的发动机大全--发动集</block>
      ，共同发展！
    </view>
    <!--  手机号验证码模块：start  -->
    <EraForm
      ref="form"
      :model="formData"
      :rules="rules"
      class="register-form flex1 m-l-32 m-r-32 m-t-72"
      labelPosition="left"
      labelWidth="120"
    >
      <view
        class="register-form__item m-t-44 flex flex-row flex-justify-between fz-32"
        @click="chooseIdentityClick"
      >
        <view class="left">身份选择</view>
        <view class="flex flex-row">
          <view class="right m-r-8">
            {{ getRoleName(options.roleCode, roleArr) || '请选择角色' }}
          </view>
          <VoIcon v-if="options.canChoose" :size="24" color="#BFBFBF" name="right-arrow" />
        </view>
      </view>
      <EraFormItem
        class="register-form__item m-t-44 fz-32"
        color="rgba(0, 0, 0, 0.85)"
        label="手机号"
        prop="mobile"
      >
        <u-input
          v-model.number="formData.mobile"
          border="none"
          color="rgba(0, 0, 0, 0.85)"
          disabledColor="#fff"
          fontSize="32rpx"
          inputAlign="right"
          maxlength="11"
          placeholder="请输入手机号"
          placeholderClass="register-form__placeholder"
          type="number"
        />
      </EraFormItem>
      <EraFormItem
        class="register-form__item m-t-44 fz-32"
        color="rgba(0, 0, 0, 0.85)"
        label="验证码"
        prop="code"
      >
        <u-input
          v-model.trim="formData.code"
          :maxlength="4"
          border="none"
          class="item-input"
          color="rgba(0, 0, 0, 0.85)"
          fontSize="32rpx"
          inputAlign="right"
          placeholder="请输入验证码"
          placeholderClass="register-form__placeholder"
          type="number"
        />
        <u-code ref="uCode" change-text="xS" class="item-code" seconds="60" @change="codeChange" />
        <view slot="right" class="register-form__code" @click="getCode">
          {{ tips }}
        </view>
      </EraFormItem>
    </EraForm>
    <view class="main-checkbox">
      <view class="main-checkbox__input" @click="selectChange">
        <image :src="selectImg" class="input-img" />
      </view>
      <view class="main-checkbox__text">
        我已阅读并同意
        <span class="text-a" @click="goWebView('/pages/CommonWeb/UserPolicy')">《用户协议》</span>
        <span class="text-a" @click="goWebView('/pages/CommonWeb/PrivacyPolicy')"
          >《隐私政策》</span
        >
        <!--            <span class="text-a">《联通统一认证服务条款》</span>-->
        ；未注册的手机号将自动注册
      </view>
    </view>
    <view class="main-btn">
      <u-button
        v-if="formData.mobile && formData.code"
        class="main-btn__btn"
        size="large"
        text="确定"
        @click="login"
      />
      <u-button v-else class="main-btn__btn disabled" disabled size="large" text="确定" />
    </view>
    <!--  底部固定模块：start  -->
    <!--    <view class="register-footer">-->
    <!--      <text class="register-footer__word">拨打电话：</text>-->
    <!--      <text class="register-footer__num">400-893-5518</text>-->
    <!--    </view>-->
    <!--  底部固定模块：end  -->
    <VoSelectRolePopup
      ref="roleRef"
      :not-arr="notArr"
      :roleCode="options.roleCode"
      :show.sync="showSelectBoo"
      @confirmFn="confirmRoleFn"
    />
  </view>
</template>

<script>
  import devConf from '@/common/env'
  import { isWeiXin, shareWeixin } from "@/common/helper";

  export default {
    name: 'RegisterMobilePage',
    data() {
      return {
        showSelectBoo: false,
        codeBtnDisabled: false,
        selectImg: '/static/common/select_false.png',
        tips: '获取验证码',
        logoImg: '/static/logo-3.png',
        formData: {
          mobile: '',
          code: '',
          uuid: '',
        },
        rules: {
          mobile: [
            {
              type: 'number',
              required: true,
              message: '请输入手机号',
              trigger: ['blur'],
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
            trigger: ['blur'],
          },
        },
        options: {},
        roleArr: [],
        notArr: [
          'investmentManager',
          'channelManager',
          'recycling',
          'oldMachine',
          'supplier',
          'agent',
        ],
      }
    },
    onLoad(options) {
      this.options = JSON.parse(options.data)
      console.log(this.options)
      this.options.roleCode = this.options.roleCode || 'garage'
      this.options.canChoose = !!this.options.canChoose
      this.initRoleFn()
    },
    methods: {
      // 设置分享样式(卡片)
      initShare() {
        // #ifdef H5
        if (!isWeiXin()) {
          this.$u.toast('请在微信中打开！')
          return
        }
        if (item.type !== 'savePoster') {
          shareWeixin({
            scene: item.type,
            path: window.location.href,
            imageUrl: this.shareImg,
          })
            .then((res) => {
              console.log('res分享', res)
              // #ifdef H5
              this.showMask = true
              // #endif
            })
            .catch((err) => {
              console.log('shareWeixinErr', err)
            })
        }
        // #endif
      },
      // 加密电话
      encryptPhone(phone) {
        if (isNaN(+phone)) {
          return phone
        } else {
          return phone ? this.$vocenApi.VoUtils.encryptPhone(phone) : ''
        }
      },
      /**
       * @description 选择角色
       */
      confirmRoleFn(e) {
        this.options.roleCode = e
        this.showSelectBoo = false
      },
      async initRoleFn() {
        this.roleArr = await this.$store.dispatch('role/getRoleArr')
      },
      async login() {
        if (!this.isAccept) {
          uni.$u.toast('请勾选协议')
          return false
        }
        if (!this.formData.mobile) {
          uni.$u.toast('请输入手机号')
          return false
        }
        if (!this.$vocenApi.Pattern.isPhone(this.formData.mobile)) {
          uni.$u.toast('请输入正确的手机号')
          return false
        }
        if (!this.formData.code) {
          uni.$u.toast('请输入验证码')
          return
        }
        uni.showLoading({
          title: '注册中...',
          mask: true,
        })
        let param = Object.assign({}, this.formData)
        param.inviteUserId = this.options.inviteUserId
        param.platformCode = this.options.roleCode
        param.inviterId = this.options.companyId
        try {
          let data = await this.$VoHttp.apiCompanyInvitationH5Common(param)
          uni.$u.toast('注册成功')
          setTimeout(() => {
            this.$linkToEasy(`/pagesAgent/TokerDistrict/GoLoginDownload?data=${JSON.stringify(this.options)}`)
          }, 1500)
        } catch (e) {
          uni.$u.toast(e.message || '请求失败')
          setTimeout(() => {
            this.$linkToEasy(`/pagesAgent/TokerDistrict/GoLoginDownload?data=${JSON.stringify(this.options)}`)
          }, 1500)
        }
        uni.hideLoading()
      },
      //获取验证码
      getCode() {
        if (!this.$vocenApi.Pattern.isPhone(this.formData.mobile)) {
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
            companyId: this.formData.inviteeId,
            mobile: this.formData.mobile,
            userId: this.formData.inviteUserId,
            uuid: this.formData.uuid ? this.formData.uuid : null,
          }
          this.$VoHttp
            .smsSend(param)
            .then((res) => {
              this.formData.uuid = res.data
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
      /**
       * 验证码Change
       * @param String text
       */
      codeChange(text) {
        this.tips = text
      },
      selectChange() {
        console.log(123)
        if (this.selectImg === '/static/common/select_false.png') {
          this.selectImg = '/static/common/select_true.png'
          this.isAccept = true
        } else {
          this.selectImg = '/static/common/select_false.png'
          this.isAccept = false
        }
      },
      goWebView(url) {
        // #ifdef H5
        this.$linkToEasy(url + '?show=1')
        // #endif
        // #ifndef H5
        this.$linkToWebView(devConf.shareBaseUrl + url)
        // #endif
      },
      chooseIdentityClick() {
        if (this.options.canChoose) {
          this.showSelectBoo = true
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .register {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    background-color: $v-bg-white;
    &-logo {
      &__img {
        width: 240rpx;
        height: 240rpx;
        margin: 48rpx auto;
      }
    }
    .main-btn {
      padding: 50rpx 50rpx 60rpx 50rpx;
      &__btn {
        background-color: #ff5319;
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
        font-size: 28rpx;
        line-height: 1.5;
        color: $v-c0-45;
        text-align: center;
        padding-top: 24rpx;
      }
    }
    &-form {
      //height: 100%;
      padding: 0 32rpx;

      &__item {
        //height: 96rpx;
        //line-height: 56rpx;
        text-align: right;
        border-bottom: 2rpx solid $v-bg-light;
        ::v-deep .u-form-item__body__left__content__label {
          font-size: 32rpx;
        }
        .item-code {
          margin-left: 44rpx;
          color: #22284b;
        }
      }

      &__code {
        font-size: 32rpx;
        line-height: 1.5;
        color: var(--color-primary);
      }

      &__placeholder {
        text-align: right;
        color: $v-c0-65 !important;
      }
    }
    &-footer {
      position: fixed;
      left: calc(50% - 298rpx / 2);
      bottom: 112rpx;
      font-size: 24rpx;
      &__word {
        color: $v-c0-65;
      }
      &__num {
        color: $v-tip;
      }
    }
  }
  .main-checkbox {
    padding-left: 44rpx;
    padding-right: 50rpx;
    display: flex;
    margin-top: 48rpx;
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
        color: #ff5319;
      }
    }
  }
  .left {
    color: $v-c0-85;
  }
  .right {
    color: $v-c0-65;
    padding-right: 8rpx;
    line-height: 48rpx;
  }
</style>
