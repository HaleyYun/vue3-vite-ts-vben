<template>
  <view
    class="changeMobile flex flex-column"
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
  >
    <VoNav is-fixed is-have-more title="绑定手机号" />
    <view class="changeMobile-content changeMobile-form">
      <EraForm labelPosition="left" :model="formData" :rules="rules" ref="form" labelWidth="90">
        <view>
          <EraFormItem labelWidth="100" label="手机号">
            <input
              class="changeMobile-content__input"
              placeholderClass="changeMobile-content__placeholder"
              placeholder="请输入手机号"
              border="none"
              :disabled="true"
              v-model="formData.mobileModel"
              @input="changeText"
            />
          </EraFormItem>
          <EraLine />
        </view>

        <view>
          <EraFormItem
            class="changeMobile-content__item"
            color="rgba(0, 0, 0, 0.85)"
            label="验证码"
            prop="codeModel"
          >
            <u--input
              inputAlign="right"
              class="item-input m-r-6"
              type="number"
              placeholder="请输入验证码"
              :maxlength="6"
              placeholderClass="changeMobile-content__placeholder"
              v-model="formData.codeModel"
              border="none"
              color="rgba(0, 0, 0, 0.85)"
              @input="changeText"
            />
            <u-code
              class="item-code"
              ref="uCode"
              @change="codeChange"
              changeText="xS"
              seconds="60"
              @start="codeBtnDisabled = true"
              @end="codeBtnDisabled = false"
            />
            <view slot="right" class="changeMobile-content__code" @click="getCodeClick">
              {{ tips }}
            </view>
          </EraFormItem>
          <EraLine />
        </view>
      </EraForm>
    </view>
    <view
      class="changeMobile-bottom"
      :class="confirmSelect ? 'changeMobile-bottomSelect' : ''"
      @click="confirmClick"
      >绑定手机号</view
    >
  </view>
</template>

<script>
  import { toRoleHome } from "@/common/helper";

  export default {
    data() {
      return {
        tips: '获取验证码',
        // mobileModel: '',
        // codeModel: '',
        confirmSelect: false,
        isLoad: false,
        formData: {
          mobileModel: '',
          codeModel: '',
        },
        rules: {
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
        // this.$u.toast('获取验证码')
        if (this.$refs.uCode.canGetCode) {
          // 模拟向后端请求验证码
          uni.showLoading({
            title: '正在获取验证码',
            mask: true,
          })
          let param = {
            mobile: this.formData.mobileModel,
          }
          if (this.uuid) {
            param.uuid = this.uuid
          }
          this.$VoHttp
            .apiCompanyInfoSms(param)
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
       * 下一步
       */
      confirmClick() {
        if (!this.confirmSelect) {
          return
        }
        this.$refs.form
          .validate()
          .then((res) => {
            if (!this.formData.codeModel) {
              uni.$u.toast('请输入验证码')
              return
            }
            let param = {
              mobile: this.formData.mobileModel,
              code: this.formData.codeModel,
            }
            uni.showLoading({
              title: '加载中',
              mask: true,
            })
            this.isLoad = true
            this.$VoHttp
              .apiCompanyInfoBindMobile(param)
              .then((res) => {
                uni.$u.toast('绑定成功')
                this.$store.dispatch('user/getFullUserInfo')
                // this.$backFn()
                toRoleHome()
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
    onLoad() {
      //如果是单个值 直接获取就行
      this.formData.mobileModel = this.userInfo.userName
    },
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

    &-content {
      margin: 8rpx 32rpx 0;
      &__input {
        text-align: right;
        width: 100%;
        height: 48rpx;
        color: $v-c0-65;
      }
      &__placeholder {
        color: $v-c0-25 !important;
        text-align: right;
      }
      &__code {
        width: 100%;
        text-align: right;
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
      &__item {
        text-align: right;
        .item-code {
          margin-left: 24rpx;
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
  }
</style>
