<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="other flex flex-column p-b-safe-area"
  >
    <!--  顶部导航栏模块：start  -->
    <VoNav
      :is-fixed="false"
      :is-help="true"
      right-title="帮助中心"
      rightTitleColor="rgba(0, 0, 0, 0.45)"
      title="绑定手机号"
    />
    <!--  顶部导航栏模块：end  -->
    <!--  手机号验证码模块：start  -->
    <u--form
      ref="form"
      :model="formData"
      :rules="rules"
      class="other-form flex1"
      labelPosition="left"
      labelWidth="60"
    >
      <u-form-item class="other-form__item" color="rgba(0, 0, 0, 0.85)" label="手机号" prop="phone">
        <u--input
          v-model="formData.phone"
          border="none"
          color="rgba(0, 0, 0, 0.85)"
          fontSize="16px"
          inputAlign="right"
          maxlength="11"
          placeholder="请输入手机号"
          placeholderClass="other-form__placeholder"
          type="number"
        />
      </u-form-item>
      <u-form-item class="other-form__item" color="rgba(0, 0, 0, 0.85)" label="验证码" prop="code">
        <u-input
          v-model="formData.code"
          :maxlength="4"
          border="none"
          class="item-input"
          color="rgba(0, 0, 0, 0.85)"
          fontSize="16px"
          inputAlign="right"
          placeholder="请输入验证码"
          placeholderClass="other-form__placeholder"
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
        <view slot="right" class="other-form__code" @click="getCode">
          {{ tips }}
        </view>
      </u-form-item>
    </u--form>
    <!--  手机号验证码模块：end  -->
    <!--  底部绑定按钮模块：start  -->
    <u-button
      class="other-button"
      color="#FF5319"
      shape="circle"
      size="large"
      text="绑定手机号"
      @click="start"
    />
    <!--  底部绑定按钮模块：end  -->

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
  </view>
</template>
<script>
  import devConf from '@/common/env'
  import helperUtil, { toRoleHome } from "@/common/helper";

  export default {
    name: 'BindOtherNumber',
    data() {
      return {
        roleCode: '',
        //手机号重复弹窗
        showBindPhoneErr: false,
        //openId
        openId: '',
        //来源
        source: '',
        //三方名称
        threeName: '',
        uuid: '',
        formData: {
          phone: '', // 手机号
          code: '', // 密码
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
        tips: '获取验证码',
        codeBtnDisabled: false,
      }
    },
    methods: {
      /**
       * 验证码Change
       * @param String text
       */
      codeChange(text) {
        this.tips = text
      },
      /**
       * 获取验证码
       */
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
      /**
       * 表单校验
       * 去下载App页面
       */
      start() {
        this.$refs.form
          .validate()
          .then(() => {
            if (!this.uuid) {
              uni.$u.toast('请先获取验证码')
              return
            }
            uni.showLoading({
              title: '加载中',
              mask: true,
            })

            let param = {
              clientId: devConf.clientId,
              clientSecret: this.$encrypt.encrypt(devConf.clientSecret),
              grantType: 'bind_phone',
              source: this.source,
              openId: this.openId,
              threeName: this.threeName,
              mobile: this.formData.phone,
              code: this.formData.code,
              uuid: this.uuid,
              terminalSource: helperUtil.appSource(),
            }

            this.$VoHttp
              .login(param, { noPrefix: true })
              .then((res) => {
                uni.hideLoading()
                uni.$u.toast('绑定成功')
                this.$store.dispatch('user/setUseInfo', res.data)
                setTimeout(() => {
                  if(res.data.isRegister){
                    this.$linkToEasy('/pages/CommonLogin/CompleteInfo?roleCode=' + this.roleCode)

                  }else{
                    toRoleHome()

                  }
                }, 1500)
              })
              .catch((e) => {
                console.warn(e, 'eeeee')
                uni.hideLoading()
                if (String(e.code) === 'U0205') {
                  //绑定手机号错误
                  this.showBindPhoneErr = true
                } else {
                  uni.$u.toast(e.message || '请求失败')
                }
              })
          })
          .catch(() => {})
      },
    },
    onLoad(options) {
      this.source = options.source
      this.openId = options.openId
      this.threeName = options.threeName
      this.roleCode = options.roleCode
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

    &-form {
      //height: 100%;
      padding: 0 32rpx;
      margin-top: 24rpx;

      &__item {
        //height: 96rpx;
        //line-height: 56rpx;
        text-align: right;
        border-bottom: 2rpx solid $v-bg-light;

        .item-code {
          margin-left: 24rpx;
        }
      }

      &__code {
        font-size: 32rpx;
        line-height: 1.5;
        color: var(--color-primary);
      }

      &__placeholder {
        text-align: right;
        color: $v-c0-25 !important;
      }
    }

    &-button {
      width: 646rpx;
      height: 92rpx;
      margin-bottom: 112rpx;
    }
  }

  .phone-modal {
    padding: 15px 7px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 32rpx;
    line-height: 150%;
  }
</style>
