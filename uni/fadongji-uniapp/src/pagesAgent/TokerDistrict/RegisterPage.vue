<template>
  <view class="register">
    <VoNav is-fixed  title="发动集" :is-back="false" no-left>
    </VoNav>
    <view class="register-logo flex flex-justify-c">
      <image :src="logoImg" class="register-logo__img" />
    </view>
    <view class="fz-32 lh150 color-block text-center m-l-52 m-r-52">
      您的好友“用户{{ encryptPhone(options.userName) }}”邀请您成为服务于千万用户的汽修商，共同发展！
    </view>

    <!--  手机号验证码模块：start  -->
    <EraForm
      ref="form"
      :model="formData"
      :rules="rules"
      class="register-form flex1 m-l-32 m-r-32 m-t-72"
      labelPosition="left"
      labelWidth="60"
    >
      <EraFormItem
        class="register-form__item m-t-44"
        color="rgba(0, 0, 0, 0.85)"
        label="手机号"
        prop="phone"
      >
        <u-input
          v-model="options.phone"
          :disabled="true"
          border="none"
          color="rgba(0, 0, 0, 0.85)"
          disabledColor="#fff"
          fontSize="32rpx"
          inputAlign="right"
          maxlength="11"
          :placeholder="`${encryptPhone(options.phone)} 将收到验证码`"
          placeholderClass="register-form__placeholder"
          readonly
        />
      </EraFormItem>
      <EraFormItem
        class="register-form__item m-t-44"
        color="rgba(0, 0, 0, 0.85)"
        label="验证码"
        prop="code"
      >
        <u-input
          v-model="formData.code"
          :maxlength="+options.type === 1 ? 6 : 4"
          border="none"
          class="item-input"
          color="rgba(0, 0, 0, 0.85)"
          fontSize="32rpx"
          inputAlign="right"
          placeholder="请输入验证码"
          placeholderClass="register-form__placeholder"
          type="number"
        />
        <u-code
          ref="uCode"
          change-text="xS"
          class="item-code"
          seconds="60"
          @change="codeChange"
          @end="codeBtnDisabled = false"
          @start="codeBtnDisabled = true"
        />
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
        <span class="text-a" @click="goWebView('/pages/CommonWeb/PrivacyPolicy')">《隐私政策》</span>
        <!--            <span class="text-a">《联通统一认证服务条款》</span>-->
        ；未注册的手机号将自动注册
      </view>
    </view>
    <view class="register-button" @click="submitData">提交并注册</view>
    <!--  底部固定模块：start  -->
<!--    <view class="register-footer">-->
<!--      <text class="register-footer__word">拨打电话：</text>-->
<!--      <text class="register-footer__num">400-893-5518</text>-->
<!--    </view>-->
    <!--  底部固定模块：end  -->
  </view>
</template>

<script>
  import devConf from "@/common/env";

  export default {
    name: 'RegisterPage',
    data() {
      return {
        codeBtnDisabled: false,
        selectImg: '/static/common/select_false.png',
        tips: '获取验证码',
        logoImg: '/static/logo-3.png',
        formData: {
          code: '',
          uuid: '',
        },
        rules: {
          code: {
            type: 'string',
            required: true,
            message: '请输入验证码',
            trigger: ['blur'],
          },
        },
        options: {},
      }
    },
    onLoad(options) {
      this.options = JSON.parse(options.data)
      this.options.phone = +this.options.phone
      console.log(this.options)
    },
    methods: {
      // 加密电话
      encryptPhone(phone) {
        if (isNaN(+phone)) {
          return phone
        } else {
          return phone ? this.$vocenApi.VoUtils.encryptPhone(phone) : ''
        }
      },
      // 提交并注册
      async submitData() {
        if (!this.formData.code) {
          uni.$u.toast('请输入验证码')
          return
        }
        if (!this.isAccept) {
          uni.$u.toast('请勾选协议')
          return false
        }
        uni.showLoading({
          title: '绑定中...',
          mask: true,
        })
        let param = {
          mobile: this.options.phone,
          inviteeId: this.options.inviteeId,
          inviterId: this.options.inviterId,
          inviteUserId: this.options.inviteUserId,
          code: this.formData.code,
          uuid: this.formData.uuid,
        }
        let data
        try {
          if (+this.options.type === 1) {
            data = await this.$VoHttp.apiCompanyInvitationH5BindMobile(param)
          } else {
            data = await this.$VoHttp.apiCompanyInvitationH5BindInvitation(param)
          }
          if (+data.code === 20001) {
            this.$toast('绑定成功', 'success', '/static/icons/success_icon.png')
            this.$linkToEasy(`/pagesAgent/TokerDistrict/GoLoginDownload?data=${JSON.stringify(this.options)}&app=1`)
          }
        } catch (e) {
          this.$u.toast(e.message || '请求失败')
        }
        uni.hideLoading()
      },
      //获取验证码
      getCode() {
        let param = {
          companyId: this.options.inviteeId,
          mobile: this.options.phone,
          userId: this.options.inviteUserId,
          uuid: this.formData.uuid ? this.formData.uuid : null,
        }
        if (this.$refs.uCode.canGetCode) {
          // 模拟向后端请求验证码
          uni.showLoading({
            title: '正在获取验证码',
            mask: true,
          })
          // 通联绑定验证码
          if (+this.options.type === 1) {
            this.$VoHttp
              .apiCompanyInvitationSms(param)
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
            // 关系绑定验证码
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
          }
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
    &-button {
      position: fixed;
      bottom: 180rpx;
      width: 646rpx;
      height: 92rpx;
      line-height: 92rpx;
      text-align: center;
      border-radius: 48rpx;
      font-size: 32rpx;
      color: $v-bg-white;
      background: #ff5319;
      margin: 0 52rpx;
    }
    &-form {
      //height: 100%;
      padding: 0 32rpx;

      &__item {
        //height: 96rpx;
        //line-height: 56rpx;
        text-align: right;
        border-bottom: 2rpx solid $v-bg-light;
        ::v-deep .u-form-item__body__left__content__label{
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
</style>
