<template>
  <view class="pay">
    <u-popup :round="10" :show="show" closeable mode="bottom" @close="closePay" @open="open">
      <view class="pay-title">账期支付验证</view>
      <EraForm
        ref="form"
        :model="formData"
        :rules="rules"
        class="pay-form"
        labelPosition="left"
        labelWidth="128"
      >
        <EraFormItem class="pay-form__item" color="rgba(0, 0, 0, 0.85)" label="手机号" prop="phone">
          <u--input
            v-model="formData.phone"
            :maxlength="11"
            border="none"
            disabledColor="#ffffff"
            fontSize="16px"
            inputAlign="right"
            placeholder="请输入手机号"
            placeholderClass="pay-form__placeholder"
            readonly
          />
        </EraFormItem>
        <EraFormItem
          class="pay-form__item"
          color="rgba(0, 0, 0, 0.85)"
          label="验证码"
          prop="verificationCode"
        >
          <u--input
            v-model="formData.verificationCode"
            :maxlength="4"
            border="none"
            class="item-input m-r-6"
            color="rgba(0, 0, 0, 0.85)"
            inputAlign="right"
            placeholder="请输入验证码"
            placeholderClass="placeholder"
            type="number"
          />
          <u-code ref="uCode" change-text="xS" seconds="60" @change="codeChange" />
          <view slot="right" class="pay-form__code color-block-yellow" @click="getCode">
            {{ tips }}
          </view>
        </EraFormItem>
      </EraForm>
      <view class="pay-bottom p-b-safe-area">
        <EraButton v-if="formData.phone && formData.verificationCode" circle @click="confirm" />
        <EraButton v-else circle disabled />
      </view>
      <VoModal
          :closeOnClickOverlay="true"
          :content="content"
          :show="showModalCancel"
          :showCancelButton="true"
          @cancel="cancel"
          @confirm="giveUp"
      />
    </u-popup>
  </view>
</template>

<script>
  export default {
    name: 'VoPayValidation',
    props: {
      show: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        tips: '获取验证码',
        showModalCancel: false, // 删除模态框
        content: '是否放弃本次付款',
        formData: {
          phone: '', // 手机号
          verificationCode: '', // 验证码
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
          verificationCode: {
            required: true,
            message: '请输入验证码',
            trigger: ['blur', 'change'],
          },
        },
        //验证码uuid
        uuid: '',
      }
    },
    created() {
      this.formData.phone = this.userInfo.userName
    },
    methods: {
      closePay() {
        this.showModalCancel = true
      },
      open() {
        // console.log('open');
      },
      /**
       * 关闭模态框
       */
      close() {
        this.uuid = '' // 为了重置获取验证码
        this.showModalCancel = false
        this.formData.verificationCode = ''
      },
      confirm() {
        if (!this.uuid) {
          uni.$u.toast('请先获取验证码')
          return
        }
        this.$emit('confirm', this.formData.verificationCode)
      },
      /**
       * 模态框点击确认按钮时触发
       */
      giveUp() {
        this.close()
        this.$emit('close')
        this.$emit('update:show', false)
      },
      /**
       * 模态框点击取消按钮时触发
       */
      cancel() {
        this.close()
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
    },
  }
</script>

<style lang="scss" scoped>
  .pay {
    width: 750rpx;
    &-title {
      text-align: center;
      line-height: 42rpx;
      font-weight: bold;
      font-size: 28rpx;
      margin-top: 40rpx;
      margin-bottom: 36rpx;
    }
    &-form {
      padding: 0 32rpx;
      margin-bottom: 8rpx;
      &__item {
        //padding: 0rpx 32rpx;
        box-sizing: border-box;
        text-align: right;
        border-bottom: 2rpx solid $v-bg-light;
      }
      &__code {
        font-size: 32rpx;
        line-height: 1.5;
        margin-left: 44rpx;
      }
      &__placeholder {
        text-align: right;
        color: $v-c0-25 !important;
      }
    }
    &-bottom {
      width: 100%;
      background: #ffffff;
      padding: 160rpx 32rpx 20rpx 32rpx;
      box-sizing: border-box;
    }
  }
</style>
