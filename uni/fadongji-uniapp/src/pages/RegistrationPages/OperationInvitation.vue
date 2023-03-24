<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="register"
  >
    <!--  logo模块：start  -->
    <image class="register-logo" src="/static/common/logo.png" />
    <!--  logo模块：end  -->
    <!--  中间说明模块：start  -->
    <view class="register-explain">
      <view class="register-explain__one">欢迎您注册成为发动集共创平台代理商</view>
      <view class="register-explain__two"
        >为后续更方便为您服务，请提交以下信息，开启您的赚钱之旅</view
      >
    </view>
    <!--  中间说明模块：end  -->
    <!--  手机号验证码登录模块：start  -->
    <u--form
      ref="form"
      :model="formData"
      :rules="rules"
      class="register-form"
      labelPosition="left"
      labelWidth="150"
    >
      <u-form-item
        class="register-form__item"
        color="rgba(0, 0, 0, 0.85)"
        label="手机号"
        prop="phone"
      >
        <u-input
          v-model="formData.phone"
          border="none"
          color="rgba(0, 0, 0, 0.85)"
          fontSize="16px"
          inputAlign="right"
          maxlength="11"
          placeholder="请输入手机号"
          placeholderClass="register-form__placeholder"
          type="number"
        />
      </u-form-item>
      <u-form-item
        class="register-form__item"
        color="rgba(0, 0, 0, 0.85)"
        label="验证码"
        prop="code"
      >
        <u-input
          v-model="formData.code"
          border="none"
          class="item-input"
          color="rgba(0, 0, 0, 0.85)"
          fontSize="16px"
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
      </u-form-item>
    </u--form>
    <!--  手机号验证码登录模块：end  -->
    <!--  底部固定模块：start  -->
    <view class="register-footer">
      <view
        v-if="formData.phone && formData.code"
        class="register-footer__button button-after"
        @click="start"
      >
        开启赚钱之旅</view
      >
      <view v-else class="register-footer__button button-before">开启赚钱之旅</view>
      <view class="register-footer__hotline">
        <text class="hotline-word">拨打电话：</text>
        <text class="hotline-num">400-893-5518</text>
      </view>
    </view>
    <!--  底部固定模块：end  -->
  </view>
</template>
<script>
  export default {
    name: 'OperationInvitation',
    data() {
      return {
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
        if (!this.codeBtnDisabled) {
          if (this.$refs.uCode.canGetCode) {
            // 模拟向后端请求验证码
            uni.showLoading({
              title: '正在获取验证码',
            })
            setTimeout(() => {
              uni.hideLoading()
              // 这里此提示会被this.start()方法中的提示覆盖
              uni.$u.toast('验证码已发送')
              // 通知验证码组件内部开始倒计时
              this.$refs.uCode.start()
            }, 2000)
          } else {
            uni.$u.toast('倒计时结束后再发送')
          }
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
            uni.$u.toast('校验通过')
            this.$linkToEasy('/pages/RegistrationPages/DownloadApp')
          })
          .catch(() => {
            uni.$u.toast('校验失败')
          })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .register {
    width: 750rpx;
    min-height: 100vh;
    overflow-x: hidden;
    box-sizing: border-box;
    background: $v-bg-white;
    text-align: center;
    &-logo {
      width: 240rpx;
      height: 240rpx;
      margin: 48rpx 0;
    }
    &-explain {
      width: 100%;
      &__one {
        width: 544rpx;
        height: 48rpx;
        line-height: 48rpx;
        color: $v-c0-85;
        font-size: 32rpx;
        text-align: center;
        margin: 0 auto 16rpx;
      }
      &__two {
        width: 544rpx;
        height: 72rpx;
        line-height: 150%;
        font-size: 24rpx;
        text-align: center;
        color: $v-c0-45;
        margin: 0 auto 116rpx;
      }
    }
    &-form {
      padding: 0 32rpx;
      font-size: 32rpx;
      &__item {
        text-align: right;
        margin-bottom: 52rpx;
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
    &-footer {
      position: fixed;
      left: calc(50% - 646rpx / 2);
      bottom: 112rpx;
      &__button {
        width: 646rpx;
        height: 92rpx;
        line-height: 92rpx;
        text-align: center;
        border-radius: 48rpx;
        font-size: 32rpx;
        margin-bottom: 32rpx;
        &.button-after {
          color: $v-bg-white;
          background: $color-primary-yellow;
        }
        &.button-before {
          color: $v-c0-45;
          background: $v-btn-disabled;
        }
      }
      &__hotline {
        font-size: 24rpx;
        .hotline-word {
          color: $v-c0-65;
        }
        .hotline-num {
          color: $v-tip;
        }
      }
    }
  }
</style>
