<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="other flex flex-column"
  >
    <!--  顶部导航栏模块：start  -->
    <VoNav :is-fixed="false" :isHaveMore="true" :title="navTitle" />
    <!--  顶部导航栏模块：end  -->
    <u--form
      ref="form"
      :model="formData"
      :rules="pageKey === '0' ? rules1 : rules2"
      class="other-form flex1"
      labelPosition="left"
      labelWidth="128"
    >
      <view v-show="pageKey === '0'">
        <u-form-item ref="item1" class="other-form__item" label="手机号" prop="phone">
          <u--input
            v-model="formData.phone"
            border="none"
            class="item-input"
            inputAlign="right"
            maxlength="11"
            placeholder="请输入手机号"
            placeholderStyle="color: rgba(0, 0, 0, 0.15);"
            type="number"
            clearable
          />
        </u-form-item>
        <u-form-item class="other-form__item" label="验证码" prop="code">
          <u--input
            v-model="formData.code"
            border="none"
            inputAlign="right"
            maxlength="4"
            placeholder="请输入验证码"
            placeholderStyle="color: rgba(0, 0, 0, 0.15);"
            type="number"
            clearable
            autocomplete="off"
          />
          <u-code
            ref="uCode"
            changeText="xS"
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
      </view>
      <view v-show="pageKey === '1'">
        <u-form-item class="other-form__item" label="新密码" prop="pwd1">
          <!-- <u-input
            v-model="formData.pwd1"
            border="none"
            inputAlign="right"
            placeholder="请输入新密码"
            placeholderStyle="color: rgba(0, 0, 0, 0.15);"
            :type="firstInputType"
            clearable
            autocomplete="off"
          >
            <view slot="suffix">
              <VoIcon
                v-if="firstInputType == 'password'"
                name="hide-eye"
                @click="firstInputType = 'text'"
                size="20"
              />
              <VoIcon name="eye" @click="firstInputType = 'password'" size="20" v-else />
            </view>
          </u-input> -->
          <!-- u-input真机切换type有bug改为input -->
          <input
            class="flex1"
            type="text"
            :password="firstInputType === 'password'"
            placeholder="请输入密码"
            placeholder-style="color: rgba(0, 0, 0, 0.15)"
            v-model="formData.pwd1"
          />
          <view class="suffix">
            <VoIcon
              v-if="firstInputType == 'password'"
              name="hide-eye"
              @click="firstInputType = 'text'"
              size="20"
            />
            <VoIcon name="eye" @click="firstInputType = 'password'" size="20" v-else />
          </view>
        </u-form-item>
        <u-form-item class="other-form__item" label="确认新密码" prop="pwd2">
          <!-- <u-input
            v-model="formData.pwd2"
            border="none"
            inputAlign="right"
            placeholder="请再次输入新密码"
            placeholderStyle="color: rgba(0, 0, 0, 0.15);"
            :type="secInputType"
            clearable
            autocomplete="off"
          >
            <view slot="suffix">
              <VoIcon
                name="hide-eye"
                @click="secInputType = 'text'"
                size="20"
                v-if="secInputType == 'password'"
              />

              <VoIcon name="eye" @click="secInputType = 'password'" size="20" v-else />
            </view>
          </u-input> -->
          <input
            class="flex1"
            type="text"
            :password="secInputType === 'password'"
            placeholder="请再次输入新密码"
            placeholder-style="color: rgba(0, 0, 0, 0.15)"
            v-model="formData.pwd2"
          />
          <view class="suffix">
            <VoIcon
              v-if="secInputType == 'password'"
              name="hide-eye"
              @click="secInputType = 'text'"
              size="20"
            />
            <VoIcon name="eye" @click="secInputType = 'password'" size="20" v-else />
          </view>
        </u-form-item>
      </view>
      <view v-show="pageKey === '1'" class="desc">
        <view class="desc-title">温馨提示</view>
        <view class="desc-row">1.密码长度需在6-16位。 </view>
        <view class="desc-row">2.密码可以用字母、数字进行设置。</view>
      </view>
    </u--form>

    <view v-if="pageKey === '0'">
      <EraButton
        v-if="formData.phone && formData.code"
        class="other-button"
        shape="circle"
        size="large"
        text="下一步"
        @click="next"
      />
      <EraButton v-else class="other-button" disabled shape="circle" size="large" text="下一步" />
    </view>
    <view v-else>
      <EraButton
        v-if="formData.pwd1 && formData.pwd2"
        class="other-button"
        shape="circle"
        size="large"
        text="确定"
        @click="submit"
      />
      <EraButton v-else class="other-button" disabled shape="circle" size="large" text="确定" />
    </view>
  </view>
</template>

<script>
  export default {
    name: 'Password',
    components: {},
    data() {
      return {
        navTitle: '设置密码',
        isLoad: false,
        firstInputType: 'password',
        secInputType: 'password',
        isForget: 0,
        uuid: '',
        formData: {
          phone: '',
          code: '',
          pwd1: '',
          pwd2: '',
        },
        codeBtnDisabled: false,
        tips: '获取验证码',
        rules1: {
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
          code: {
            type: 'string',
            required: true,
            message: '请输入验证码',
            trigger: ['blur', 'change'],
          },
        },
        rules2: {
          pwd1: [
            {
              type: 'string',
              required: true,
              message: '请输入新密码',
              trigger: ['blur', 'change'],
            },
            {
              min: 6,
              max: 16,
              message: '长度在6-16位',
              trigger: ['change', 'blur'],
            },
          ],
          pwd2: [
            {
              type: 'string',
              required: true,
              message: '请再次输入新密码',
              trigger: ['blur', 'change'],
            },
            {
              validator: (rule, value, callback) => {
                return value === this.formData.pwd1
              },
              message: '两次输入密码不一致',
              trigger: ['change', 'blur'],
            },
          ],
        },
        pageKey: '0',
      }
    },
    onLoad(options) {
      console.log(options)
      this.formData = {
        code: '',
        phone: '',
        pwd1: '',
        pwd2: '',
      }
      if (options.mobile) {
        this.formData.phone = options.mobile
      } else {
        this.formData.phone = this.userInfo.userName
      }
      if (options.isForget) {
        this.isForget = Number(options.isForget)
        this.navTitle = '忘记密码'
      }
      if (options.isChange) {
        this.navTitle = '修改密码'
      }
      console.log(this.formData)
    },
    methods: {
      submit() {
        if (this.formData.pwd1 != this.formData.pwd2) {
          this.$u.toast('两次输入密码不一致')
          return
        }
        this.$refs.form
          .validate()
          .then((res) => {
            let param = {
              uuid: this.uuid,
              mobile: this.formData.phone,
              code: this.formData.code,
              password: this.formData.pwd1,
              againPassword: this.formData.pwd2,
            }
            this.$VoHttp
              .password(param)
              .then((res) => {
                uni.$u.toast('设置成功')
                setTimeout(() => {
                  uni.reLaunch({
                    url: '/pages/CommonLogin/UserLogin',
                  })
                }, 1500)
              })
              .catch((e) => {
                uni.$u.toast(e.message || '请求失败')
                if (e.code === 'U0243') {
                  setTimeout(() => {
                    this.pageKey = '0'
                    this.formData.code = ''
                    this.formData.pwd1 = ''
                    this.formData.pwd2 = ''
                    this.$refs.form.clearValidate()
                  }, 1500)
                }
              })
          })
          .catch((errors) => {})
      },
      codeChange(text) {
        this.tips = text
      },
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
      next() {
        this.$refs.form
          .validate()
          .then((res) => {
            if (!this.uuid) {
              uni.$u.toast('请获取验证码')
              return
            }
            let param = {
              uuid: this.uuid,
              mobile: this.formData.phone,
              code: this.formData.code,
            }
            uni.showLoading({
              title: '加载中',
              mask: true,
            })
            this.isLoad = true
            this.$VoHttp
              .smsVerify(param)
              .then((res) => {
                this.pageKey = '1'
                this.$forceUpdate()
              })
              .catch((e) => {
                uni.$u.toast(e.message || '请求失败')
              })
              .finally(() => {
                this.isLoad = false
                uni.hideLoading()
              })
          })
          .catch((errors) => {})
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
    &-form {
      //height: 100%;
      padding: 0 32rpx;
      margin-top: 24rpx;
      &__item {
        //height: 96rpx;
        //line-height: 56rpx;
        text-align: right;
        border-bottom: 2rpx solid $v-bg-light;
        .item-input {
          background: #fff;
        }
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
      margin-left: 52rpx;
      margin-right: 32rpx;
      margin-bottom: 180rpx;
    }
    .desc {
      margin-top: 80rpx;
      &-title {
        color: rgba(0, 0, 0, 0.85);
        font-weight: bold;
        font-size: 28rpx;
        line-height: 1.5;
        margin-bottom: 8rpx;
      }
      &-row {
        color: rgba(0, 0, 0, 0.65);
        font-size: 24rpx;
        line-height: 1.5;
      }
    }
  }
</style>
