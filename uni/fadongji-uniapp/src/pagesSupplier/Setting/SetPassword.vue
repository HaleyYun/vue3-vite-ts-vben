<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="password"
  >
    <VoNav is-fixed is-have-more title="修改密码" />
    <view class="password-content">
      <EraForm labelPosition="left">
        <view>
          <EraFormItem label="手机号" labelWidth="100">
            <input
              v-model="mobileModel"
              border="none"
              class="password-content__input"
              placeholder="请输入手机号"
              placeholderClass="password-content__placeholder"
              @input="changeText"
              readonly
            />
          </EraFormItem>
          <EraLine />
        </view>

        <view>
          <EraFormItem label="验证码" labelWidth="70">
            <input
              v-model="codeModel"
              :maxlength="4"
              class="flex1 codeInput text-right"
              placeholder="请输入验证码"
              type="number"
            />
            <u-code ref="uCode" change-text="xS" seconds="60" @change="codeChange" />
            <view slot="right" class="main-form__code" @click="getCode">
              {{ tips }}
            </view>
          </EraFormItem>
          <EraLine />
        </view>

        <view>
          <EraFormItem label="新密码" labelWidth="100">
            <input
              v-model="passwordModel"
              border="none"
              type="password"
              class="password-content__input"
              placeholder="请输入新密码"
              placeholderClass="password-content__placeholder"
              @input="changeText"
            />
          </EraFormItem>
          <EraLine />
        </view>

        <view>
          <EraFormItem label="新密码" labelWidth="100">
            <input
              v-model="confirmPasswordModel"
              border="none"
              type="password"
              class="password-content__input"
              placeholder="请输入新密码"
              placeholderClass="password-content__placeholder"
              @input="changeText"
            />
          </EraFormItem>
          <EraLine />
        </view>
      </EraForm>

      <view class="password-tipTitle">温馨提示</view>
      <view class="password-tip">1.密码长度需在6-16位。 </view>
      <view class="password-tip"> 2.密码可以用字母、数字进行设置。 </view>
    </view>
    <view
      :class="confirmSelect ? 'password-bottomSelect' : ''"
      class="password-bottom"
      @click="confirmClick"
      >确定</view
    >
  </view>
</template>

<script>
  export default {
    data() {
      return {
        mobileModel: '',
        codeModel: '',
        passwordModel: '',
        confirmPasswordModel: '',
        confirmSelect: false,
        uuid: '',
        tips: '获取验证码',
      }
    },
    onLoad() {
      this.mobileModel = this.encryptPhone(this.userInfo.userName)
    },
    methods: {
      // 加密电话
      encryptPhone(phone) {
        return phone ? this.$vocenApi.VoUtils.encryptPhone(phone) : ''
      },
      changeText() {
        this.confirmSelect =
          this.mobileModel.length > 0 &&
          this.codeModel.length > 0 &&
          this.passwordModel.length > 0 &&
          this.confirmPasswordModel.length > 0
      },
      confirmClick() {
        if (!this.confirmSelect) {
          return
        }
        let param = {
          uuid: this.uuid,
          mobile: this.userInfo.userName,
          code: this.codeModel,
          password: this.passwordModel,
          againPassword: this.confirmPasswordModel,
        }
        this.$VoHttp
          .password(param)
          .then((res) => {
            this.$u.toast('设置密码成功')
            setTimeout(() => {
              uni.navigateBack()
            }, 1500)
          })
          .catch((e) => {
            uni.$u.toast(e.message || '请求失败')
            if (e.code === 'U0243') {
              setTimeout(() => {
                this.codeModel = ''
                this.passwordModel = ''
                this.confirmPasswordModel = ''
              }, 1500)
            }
          })
        // this.$backFn()
      },
      //验证码Change
      codeChange(text) {
        this.tips = text
      },
      //获取验证码
      getCode() {
        if (this.$refs.uCode.canGetCode) {
          // 模拟向后端请求验证码
          uni.showLoading({
            title: '正在获取验证码',
            mask: true,
          })
          let param = {
            mobile: this.userInfo.userName,
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
    },
  }
</script>

<style lang="scss" scoped>
  .password {
    width: 750rpx;
    height: 100vh;
    background-color: #ffffff;
    .main-form__code {
      font-size: 32rpx;
      color: var(--color-primary);
      margin-left: 16rpx;
    }
    &-content {
      margin: 0rpx 32rpx;
      margin-top: 24rpx;

      &__input {
        text-align: right;
        width: 100%;
        height: 48rpx;
        color: $v-c0-65;
      }
      &__placeholder {
        color: $v-c0-25;
      }
      &__code {
        width: 100%;
        .codeInput {
          text-align: right;
          height: 48rpx;
          padding-right: 20rpx;
        }
        .getCode {
          color: $v-c0-85;
          font-size: 32rpx;
        }
      }
    }

    &-bottom {
      position: fixed;
      left: 32rpx;
      bottom: 140rpx;
      height: 92rpx;
      line-height: 92rpx;
      width: 686rpx;
      text-align: center;
      background-color: $color-disabled-yellow;
      color: $v-c0-25;
      font-size: 32rpx;
      border-radius: 48rpx;
    }
    &-bottomSelect {
      background-color: $color-primary-yellow;
      color: #ffffff;
    }

    &-tipTitle {
      margin-top: 80rpx;
      color: $v-c0-85;
      font-size: 28rpx;
    }
    &-tip {
      margin-top: 8rpx;
      color: $v-c0-65;
      font-size: 24rpx;
    }
  }
</style>
