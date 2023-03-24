<template>
  <view
    class="register"
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
  >
    <!--  logo模块：start  -->
    <image class="register-logo" src="/static/common/logo.png" />
    <!--  logo模块：end  -->
    <!--  中间说明模块：start  -->
    <view class="register-explain">
      <view class="register-explain__one">某某某邀请您加入发动集共创平台</view>
      <view class="register-explain__two"
        >为后续更方便为您服务，请提交以下信息，开启您的赚钱之旅</view
      >
    </view>
    <!--  中间说明模块：end  -->
    <!--  身份选择模块：start  -->
    <u-action-sheet
      :show="showIdentity"
      :actions="identityList"
      @close="showIdentity = false"
      @select="selectClick"
      cancelText="取消"
    />
    <!--  身份选择模块：end  -->
    <!--  手机号验证码登录模块：start  -->
    <u--form
      class="register-form"
      labelWidth="70"
      labelPosition="left"
      :model="formData"
      :rules="rules"
      ref="form"
    >
      <u-form-item
        class="register-form__item"
        label="身份选择"
        prop="identity"
        color="rgba(0, 0, 0, 0.85)"
        @click="showIdentity = true"
      >
        <u--input
          v-model="formData.identity"
          disabled
          disabledColor="#ffffff"
          placeholder="请选择您的身份"
          border="none"
          fontSize="16px"
          placeholderClass="register-form__placeholder"
          inputAlign="right"
        />
        <VoIcon class="register-form__icon" name="right-arrow" :size="24" />
      </u-form-item>
      <u-form-item
        class="register-form__item"
        label="手机号"
        prop="phone"
        color="rgba(0, 0, 0, 0.85)"
      >
        <u--input
          type="number"
          maxlength="11"
          placeholder="请输入手机号"
          border="none"
          color="rgba(0, 0, 0, 0.85)"
          fontSize="16px"
          placeholderClass="register-form__placeholder"
          inputAlign="right"
          v-model="formData.phone"
        />
      </u-form-item>
      <u-form-item
        class="register-form__item"
        label="验证码"
        prop="code"
        color="rgba(0, 0, 0, 0.85)"
      >
        <u-input
          class="item-input"
          type="number"
          placeholder="请输入验证码"
          placeholderClass="register-form__placeholder"
          v-model="formData.code"
          border="none"
          inputAlign="right"
          fontSize="16px"
          color="rgba(0, 0, 0, 0.85)"
        />
        <u-code
          class="item-code"
          ref="uCode"
          @change="codeChange"
          seconds="60"
          change-text="xS"
          @start="codeBtnDisabled = true"
          @end="codeBtnDisabled = false"
        />
        <view slot="right" class="register-form__code" @click="getCode">
          {{ tips }}
        </view>
      </u-form-item>
    </u--form>
    <!--  手机号验证码登录模块：end  -->
    <!--  底部固定模块：start  -->
    <view class="register-footer">
      <view v-if="formData.phone && formData.code && formData.identity" class="register-footer__button button-after" @click="start">
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
    name: 'UserFission',
    data() {
      return {
        showIdentity: false,
        identityList: [
          {
            name: '供应商',
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: '14',
          },
          {
            name: '修理厂',
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: '14',
          },
          {
            name: '代理商',
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: '14',
          },
          {
            name: '技术支持',
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: '14',
          },
          {
            name: '传播推广',
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: '14',
          },
        ],
        formData: {
          phone: '',
          code: '',
          identity: '',
        },
        rules: {
          identity: {
            type: 'string',
            required: true,
            message: '请选择身份',
          },
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
       * 身份选择
       * @param Array e
       */
      selectClick(e) {
        this.identity = e.name
        console.log(e.name)
        this.formData.identity = e.name
      },
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
       * 去下载App页
       */
      start() {
        console.log(this.formData)
        this.$refs.form
          .validate()
          .then((res) => {
            uni.$u.toast('校验通过')
            this.$linkToEasy('/pages/RegistrationPages/DownloadApp?pages=app')
          })
          .catch((errors) => {
            console.log(errors);
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
      &__icon {
        margin-left: 8rpx;
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
          background: var(--color-primary);
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
