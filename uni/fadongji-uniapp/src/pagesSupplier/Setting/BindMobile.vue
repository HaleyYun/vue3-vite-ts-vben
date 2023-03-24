<template>
  <view
    class="changeMobile flex flex-column"
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
  >
    <VoNav is-fixed is-have-more title="绑定新手机号" />
    <view class="changeMobile-title">绑定新手机号</view>
    <EraForm
      ref="form"
      :model="formData"
      :rules="rules"
      class="changeMobile-form"
      labelPosition="left"
      labelWidth="100"
    >
      <EraFormItem
        class="changeMobile-form__item"
        color="rgba(0, 0, 0, 0.85)"
        label="手机号  "
        prop="mobileModel"
      >
        <u--input
          v-model="formData.mobileModel"
          border="none"
          disabledColor="#ffffff"
          fontSize="16px"
          inputAlign="right"
          placeholder="请输入新手机号"
          :maxlength="11"
          placeholderClass="changeMobile-form__placeholder"
          @input="changeText"
        />
      </EraFormItem>
      <EraFormItem
        class="changeMobile-form__item"
        color="rgba(0, 0, 0, 0.85)"
        label="验证码"
        prop="codeModel"
      >
        <u--input
          inputAlign="right"
          class="item-input m-r-6"
          type="number"
          placeholder="请输入验证码"
          :maxlength="4"
          placeholderClass="changeMobile-form__placeholder"
          v-model="formData.codeModel"
          border="none"
          color="rgba(0, 0, 0, 0.85)"
          @input="changeText"
        />
        <u-code ref="uCode" @change="codeChange" seconds="60" change-text="xS" />
        <view slot="right" class="changeMobile-form__code" @click="getCodeClick">
          {{ tips }}
        </view>
      </EraFormItem>
    </EraForm>
    <view
      class="changeMobile-bottom"
      :class="confirmSelect ? 'changeMobile-bottomSelect' : ''"
      @click="confirmClick"
      >确认绑定</view
    >
  </view>
</template>

<script>
  export default {
    data() {
      return {
        tips: '获取验证码',
        confirmSelect: false,
        formData: {
          mobileModel: '', // 手机号
          codeModel: '', // 验证码
        },
        rules: {
          mobileModel: [
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
          codeModel: {
            type: 'string',
            required: true,
            message: '请输入验证码',
            trigger: ['blur', 'change'],
          },
        },
      }
    },
    methods: {
      codeChange(text) {
        this.tips = text
      },
      /**
       * 获取验证码
       */
      getCodeClick() {
        if (!this.$vocenApi.Pattern.isPhone(this.formData.mobileModel)) {
          uni.$u.toast('请输入正确的手机号')
          return
        }
        // this.$u.toast('获取验证码')
        if (this.$refs.uCode.canGetCode) {
          // 模拟向后端请求验证码
          uni.showLoading({
            title: '正在获取验证码',
          })
          let param = {
            mobile: this.formData.mobileModel,
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
      changeText() {
        if (this.formData.mobileModel.length > 0 && this.formData.codeModel.length > 0) {
          this.confirmSelect = true
        } else {
          this.confirmSelect = false
        }
      },
      /**
       * 修改手机号
       */
      confirmClick() {
        if (!this.confirmSelect) {
          return
        }
        this.$refs.form
          .validate()
          .then((res) => {
            if (!this.uuid) {
              uni.$u.toast('请获取验证码')
              return
            }
            let param = {
              uuid: this.uuid,
              mobile: this.formData.mobileModel,
              code: this.formData.codeModel,
            }
            uni.showLoading({
              title: '加载中',
            })
            this.isLoad = true
            this.$VoHttp.USER.apiUserInfoMobile(param)
              .then((res) => {
                // this.$forceUpdate()
                this.$u.toast('修改手机号成功')
                setTimeout(() => {
                  this.$store.dispatch('user/setUseInfo', {})
                  // uni.reLaunch({
                  //   url: '/pages/SelectRole/SelectRole',
                  // })
                  uni.reLaunch({
                    url: '/pages/CommonLogin/UserLogin',
                  })
                }, 1500)
              })
              .catch((e) => {
                console.log('err', e)
                uni.$u.toast(e.message || '请求失败')
                uni.hideLoading()
              })
              .finally(() => {
                this.isLoad = false
                uni.hideLoading()
              })
          })
          .catch((errors) => {})
      },
    },
    onLoad() {},
  }
</script>

<style lang="scss" scoped>
  .changeMobile {
    width: 750rpx;
    height: 100vh;
    background-color: #ffffff;

    &-title {
      margin-left: 32rpx;
      margin-top: 24rpx;
      color: $v-c0-45;
      font-size: 24rpx;
    }
    &-form {
      padding: 0 0rpx;
      margin-bottom: 8rpx;

      &__item {
        margin: 0rpx 32rpx;
        text-align: right;
        border-bottom: 2rpx solid $v-bg-light;
        .item-code {
          margin-left: 24rpx;
        }
      }
      &__word {
        font-size: 32rpx;
        color: $v-c0-85;
      }
      &__code {
        margin-left: 16rpx;
        font-size: 32rpx;
        line-height: 1.5;
        color: var(--color-primary);
      }
      &__placeholder {
        text-align: left;
        color: $v-c0-25 !important;
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
  }
</style>
