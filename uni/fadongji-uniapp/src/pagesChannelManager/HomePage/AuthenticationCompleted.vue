<template>
  <div class="complete">
    <VoNav is-fixed is-have-more :title="title" />
    <view v-if="state === 0">
      <view class="complete-state">
        <image class="complete-state__icon" src="/static/lease/home/pending_review.png" />
        <view class="complete-state__content"
          >尊敬的客户您好，您的认证资料已完成审核，为保障认证信息是您本人真实操作，请验证认证时的手机号：</view
        >
      </view>
      <EraForm
        ref="form"
        :model="formData"
        :rules="rules"
        class="complete-form"
        labelPosition="left"
        labelWidth="128"
      >
        <EraFormItem
          class="complete-form__item"
          color="rgba(0, 0, 0, 0.85)"
          label="联系电话"
          prop="mobile"
        >
          <u--input
            v-model.number="formData.mobile"
            border="none"
            disabledColor="#ffffff"
            fontSize="16px"
            inputAlign="right"
            placeholder="请输入手机号"
            placeholderClass="complete-form__placeholder"
            readonly
          />
        </EraFormItem>
        <EraFormItem
          class="complete-form__item"
          color="rgba(0, 0, 0, 0.85)"
          label="验证码"
          prop="code"
        >
          <u--input
            v-model="formData.code"
            :maxlength="type === 1 ? 6 : 4"
            border="none"
            class="item-input m-r-6"
            color="rgba(0, 0, 0, 0.85)"
            inputAlign="right"
            placeholder="请输入验证码"
            placeholderClass="complete-form__placeholder"
            type="number"
          />
          <u-code ref="uCode" change-text="xS" seconds="60" @change="codeChange" />
          <view slot="right" class="complete-form__code" @click="getCode">
            {{ tips }}
          </view>
        </EraFormItem>
      </EraForm>
      <view class="complete-footer">
        <u-button
          v-if="formData.code"
          class="complete-footer__button"
          color="#FF5319"
          shape="circle"
          size="large"
          text="确定"
          @click="bind"
        />
        <u-button
          v-else
          class="complete-footer__button complete-footer__color"
          color="#F6F7F8"
          shape="circle"
          size="large"
          text="确定"
        />
      </view>
    </view>
    <view v-else-if="state === 1">
      <view class="complete-state">
        <image class="complete-state__icon" src="/static/lease/home/pending_review.png" />
        <view class="complete-state__content text-center">
          <view>认证信息提交成功</view>
          <view>请等待第三方审核</view>
        </view>
        <view class="complete-state__annotate"
          >资料正在审核，审核通过后，会以短信方式 通知您，请注意短信提醒！</view
        >
      </view>
      <view class="complete-footer">
        <!-- #ifdef APP-PLUS -->
        <u-button
          class="complete-footer__button"
          color="#FF5319"
          shape="circle"
          size="large"
          :text="`返回${originStr[origin]}管理`"
          @click="returnFn"
        />
        <!-- #endif -->
        <!-- #ifdef H5 -->
        <u-button
          class="complete-footer__button"
          color="#FF5319"
          shape="circle"
          size="large"
          text="下载APP"
          @click="download"
        />
        <!-- #endif -->
      </view>
    </view>
    <view v-else-if="state === 2">
      <view class="complete-state">
        <image class="complete-state__icon" src="/static/lease/home/success_prompt.png" />
        <view class="complete-state__content text-center">
          <view>认证已完成，请登录APP开始赚钱~</view>
          <view>感谢您对平台的支持！</view>
        </view>
      </view>
      <view class="h478" />
      <view class="complete-footer">
        <u-button
          class="complete-footer__button"
          color="#FF5319"
          shape="circle"
          size="large"
          text="下载APP"
          @click="download"
        />
      </view>
    </view>
    <view v-else-if="state === 3">
      <view class="complete-state">
        <image class="complete-state__icon" src="/static/lease/home/failure_reminder.png" />
        <view class="complete-state__content text-center">审核失败</view>
        <view class="complete-state__annotate">资料审核失败，请修改认证信息后重新上传</view>
      </view>
      <view class="h146" />
      <view class="complete-footer">
        <u-button
          class="complete-footer__button"
          color="#FF5319"
          shape="circle"
          size="large"
          text="修改认证信息"
          @click="$backFn"
        />
      </view>
    </view>
  </div>
</template>
<script>
  export default {
    name: 'AuthenticationCompleted',
    data() {
      return {
        state: 0, // 0:验证认证手机号 1：待审核 2：审核成功 3：审核失败
        tips: '获取验证码',
        formData: {
          mobile: '', // 手机号
          code: '', // 验证码
          uuid: '',
        },
        rules: {
          code: {
            required: true,
            message: '请输入验证码',
            trigger: ['blur', 'change'],
          },
        },
        type: 0, // 类型： 1、通联绑定；2、关系绑定
        isLoading: false,
        origin: 0,
        originStr: ['', '修理厂', '服务商', '供应商'],
        title: '认证完成',
      }
    },
    onLoad(options) {
      console.log(options)
      if (options.data) {
        // h5传参(绑定)
        const data = JSON.parse(options.data)
        console.log(data);
        const { status, type, userPhone, inviteeId, inviterId, inviteUserId } = data
        this.state = status ? +status : 0
        this.type = +type
        this.formData.mobile = userPhone
        this.formData.phone = userPhone
        this.formData.inviteeId = inviteeId
        this.formData.inviterId = inviterId
        this.formData.inviteUserId = inviteUserId
        if (this.state === 0) {
          this.title = '认证信息'
        }
      }
      // 其余传参（状态展示）
      if (options.state) {
        this.state = options.state ? +options.state : 0
      }
      // 来源 ： 1修理厂；2服务商；3供应商
      if (options.origin) {
        this.origin = +options.origin
      }
      if (options.title) {
        this.title = options.title
      }
    },
    methods: {
      async bind() {
        let data
        if (!this.formData.code) {
          uni.$u.toast('请输入验证码')
          return
        }
        uni.showLoading({
          title: '绑定中...',
          mask: true,
        })
        try {
          if (this.type === 1) {
            data = await this.$VoHttp.apiCompanyInvitationH5BindMobile(this.formData)
          } else {
            data = await this.$VoHttp.apiCompanyInvitationH5BindInvitation(this.formData)
          }
          if (data.code === '20001') {
            this.$toast('绑定成功', 'success', '/static/icons/success_icon.png')
            this.state = this.type
          }
        } catch (e) {
          this.$u.toast(e.message || '网络请求失败')
        }
        uni.hideLoading()
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
            companyId: this.formData.inviteeId,
            mobile: this.formData.mobile,
            userId: this.formData.inviteUserId,
            uuid: this.formData.uuid ? this.formData.uuid : null,
          }
          // 通联绑定验证码
          if (this.type === 1) {
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
      download() {
        window.open('https://www.pgyer.com/IDhE')
      },
      returnFn() {
        let path = '../GarageModule/GarageManager'
        if (this.origin === 2) {
          path = '../ServiceManager/ServiceManager'
        } else if (this.origin === 3) {
          path = '/pagesLeaseManager/WorkingTable/SupplierManager'
        }
        uni.reLaunch({
          url: path,
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .complete {
    width: 750rpx;
    min-height: 100vh;
    overflow-x: hidden;
    background: #fff;
    //padding: 0 32rpx;
    //box-sizing: border-box;
    &-state {
      margin-top: 120rpx;
      &__icon {
        width: 176rpx;
        height: 176rpx;
        display: block;
        margin: 0 auto;
      }
      &__content {
        width: 556rpx;
        line-height: 48rpx;
        margin: 40rpx auto 0;
        font-weight: bold;
        font-size: 32rpx;
      }
      &__annotate {
        width: 456rpx;
        height: 72rpx;
        line-height: 36rpx;
        font-size: 28rpx;
        color: $v-c0-45;
        margin: 32rpx auto 312rpx;
        text-align: center;
      }
    }
    &-form {
      margin-top: 56rpx;
      padding: 0 32rpx;
      margin-bottom: 174rpx;
      box-sizing: border-box;
      &__item {
        //padding: 0rpx 32rpx;
        box-sizing: border-box;
        text-align: right;
        border-bottom: 2rpx solid $v-bg-light;
      }
      &__code {
        font-size: 32rpx;
        line-height: 1.5;
        color: var(--color-primary);
        margin-left: 44rpx;
      }
      &__placeholder {
        font-size: 32rpx;
        text-align: right;
        color: $v-c0-25 !important;
      }
    }
    &-footer {
      padding: 0 32rpx;
      box-sizing: border-box;
      &__button {
        width: 686rpx;
        height: 92rpx;
      }
      &__color {
        color: $v-c0-25 !important;
      }
    }
  }
</style>
