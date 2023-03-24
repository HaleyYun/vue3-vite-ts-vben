<template>
  <view class="register">
    <VoNav is-fixed  title="发动集" no-left>

    </VoNav>
    <scroll-view
      :scroll-top="scrollTop"
      class="flex1 overflow-y"
      scroll-y
      @scroll="onScroll"
    >
      <view class="register-logo flex flex-justify-c">
        <image :src="logoImg" class="register-logo__img" />
      </view>
      <view class="fz-32 lh150 color-block text-center m-l-52 m-r-52">
        您的好友“{{ encryptPhone(options.userName) }}”
        <!--        <block v-if="options.roleCode === 'supplier'">邀请您成为服务于千万用户的供应商</block>-->
        <!--        <block v-else-if="options.roleCode === 'agent'">邀请您成为服务于千万用户的服务商</block>-->
        <!--        <block v-else-if="options.roleCode === 'skilledWorker'"-->
        <!--          >邀请您成为服务于全国30万家修理厂的集师傅</block-->
        <!--        >-->
        <!--      <template v-else-if="options.roleCode === 'recycling'">回收公司</template>-->
        <!--      <template v-else-if="options.roleCode === 'oldMachine'">旧机买家</template>-->
        <!--        <block v-else>邀请您加入全国30万家修理厂都在用的发动机大全&#45;&#45;发动集</block>-->
        <!--        ，共同发展！-->
        邀请您加入发动集平台，全渠道一键比价，技术视频图文讲解，发动机回收
      </view>
      <!--  手机号验证码模块：start  -->
      <EraForm
        ref="form"
        :model="formData"
        :rules="rules"
        class="register-form m-l-32 m-r-32 m-t-72"
        labelPosition="left"
        labelWidth="120"
      >
        <view
          class="register-form__item m-t-44 flex flex-row flex-justify-between fz-32"
          @click="chooseIdentityClick"
        >
          <view class="left">身份选择</view>
          <view class="flex flex-row">
            <view class="right m-r-8">
              {{ getRoleName(options.roleCode, roleArr) || '请选择角色' }}
            </view>
            <!--          <VoIcon v-if="options.canChoose" :size="24" color="#BFBFBF" name="right-arrow" />-->
            <text v-if="options.canChoose" class="c-ff5319">切换身份</text>
          </view>
        </view>
        <EraFormItem
          class="register-form__item m-t-44 fz-32"
          color="rgba(0, 0, 0, 0.85)"
          label="联系电话"
          required
          prop="mobile"
        >
          <u-input
            v-model.number="formData.mobile"
            border="none"
            color="rgba(0, 0, 0, 0.85)"
            disabledColor="#fff"
            fontSize="32rpx"
            inputAlign="right"
            maxlength="11"
            placeholder="请输入手机号"
            placeholderClass="register-form__placeholder"
            type="number"
            @blur="checkPhone"
          />
        </EraFormItem>
        <block v-if="options.roleCode === 'garage'">
          <EraFormItem
            class="register-form__item m-t-44 fz-32"
            color="rgba(0, 0, 0, 0.85)"
            label="联系人姓名"
            prop="contractName"
            required
          >
            <u-input
              v-model.trim="formData.contractName"
              border="none"
              color="rgba(0, 0, 0, 0.85)"
              disabledColor="#fff"
              fontSize="32rpx"
              inputAlign="right"
              maxlength="11"
              placeholder="请输入联系人姓名"
              placeholderClass="register-form__placeholder"
            />
          </EraFormItem>

          <EraFormItem
            class="register-form__item m-t-44 fz-32"
            color="rgba(0, 0, 0, 0.85)"
            label="修理厂名称"
            prop="storeName"
            required
          >
            <u-input
              v-model.trim="formData.storeName"
              border="none"
              color="rgba(0, 0, 0, 0.85)"
              disabledColor="#fff"
              fontSize="32rpx"
              inputAlign="right"
              maxlength="11"
              placeholder="请输入修理厂名称"
              placeholderClass="register-form__placeholder"
            />
          </EraFormItem>
          <view class="register-form__label m-t-44 flex flex-vertical-c flex-justify-between">
            <view><view class="label-star">*</view>所在地区</view>
            <view class="flex flex-vertical-c" @click.native.stop="openLocation">
              <VoIcon :size="20" color="#373A4E" name="gradual-positioning" />
              定位
            </view>
          </view>
          <EraFormItem
            class="register-form__item fz-32"
            color="rgba(0, 0, 0, 0.85)"
            label=""
            labelWidth="0"
            prop="areaCode"
            @click="showAddress = true"
          >
            <view v-if="formData.areaStr" class="flex1 uploaded-form__box m-r-8 text-left">{{
              formData.areaStr
            }}</view>
            <view v-else class="flex1 uploaded-form__box color-block-25 m-r-16 text-left">
              省/市/区
            </view>
            <!--          <VoIcon :opacity="0.25" name="right-arrow" />-->
            <!--          <view class="flex flex-vertical-c">-->
            <!--            <VoIcon :size="20" color="#373A4E" name="gradual-positioning" @click.native.stop="openLocation" />-->
            <!--            定位-->
            <!--          </view>-->
          </EraFormItem>

          <view class="register-form__label m-t-44"><view class="label-star">*</view>详细地址</view>
          <EraFormItem
            class="register-form__item custom"
            color="rgba(0, 0, 0, 0.85)"
            label=""
            labelWidth="0"
            prop="address"
          >
            <u-textarea
              v-model.trim="formData.address"
              auto-height
              class="item-textarea"
              maxlength="100"
              border="none"
              placeholder="小区楼栋/乡村名称"
              placeholder-class="register-form__placeholder text-left"
              @blur="validateForm('address')"
            ></u-textarea>
            <VoIcon
              v-if="formData.address"
              :size="20"
              color="#000000"
              opacity="0.45"
              name="close-c"
              class="m-l-28"
              @click="clearAddress"
            />
          </EraFormItem>
        </block>

        <EraFormItem
          class="register-form__item m-t-44 fz-32"
          color="rgba(0, 0, 0, 0.85)"
          label="验证码"
          prop="code"
          required
        >
          <u-input
            v-model.trim="formData.code"
            :maxlength="options.roleCode === 'garage' ? 6 : 4"
            border="none"
            class="item-input"
            color="rgba(0, 0, 0, 0.85)"
            fontSize="32rpx"
            inputAlign="right"
            placeholder="请输入验证码"
            placeholderClass="register-form__placeholder"
            type="number"
            ref="code"
          />
          <u-code
            ref="uCode"
            change-text="xS"
            class="item-code"
            seconds="60"
            @change="codeChange"
          />
          <view slot="right" class="register-form__code" @click="getCode">
            {{ tips }}
          </view>
        </EraFormItem>
      </EraForm>
    </scroll-view>
    <view class="main-checkbox">
      <view class="main-checkbox__input" @click="selectChange">
        <image :src="selectImg" class="input-img" />
      </view>
      <view class="main-checkbox__text">
        我已阅读并同意
        <span class="text-a" @click="goWebView('/pages/CommonWeb/UserPolicy')">《用户协议》</span>
        <span class="text-a" @click="goWebView('/pages/CommonWeb/PrivacyPolicy')"
          >《隐私政策》</span
        >
        <!--            <span class="text-a">《联通统一认证服务条款》</span>-->
        ；未注册的手机号将自动注册
      </view>
    </view>
    <view class="main-btn">
      <u-button class="main-btn__btn" size="large" text="确定" @click="login" />
    </view>
    <!--  底部固定模块：start  -->
    <!--    <view class="register-footer">-->
    <!--      <text class="register-footer__word">拨打电话：</text>-->
    <!--      <text class="register-footer__num">400-893-5518</text>-->
    <!--    </view>-->
    <!--  底部固定模块：end  -->
    <VoSelectRolePopup
      class="position-f"
      ref="roleRef"
      :not-arr="notArr"
      :roleCode="options.roleCode"
      :show.sync="showSelectBoo"
      @confirmFn="confirmRoleFn"
    />
    <VoAddress class="position-f" :show.sync="showAddress" @sureFn="sureFn" />
    <VoModal
      class="position-f"
      :closeOnClickOverlay="true"
      :content="content"
      :show="showModal"
      :showCancelButton="true"
      @cancel="showModal = false"
      @confirm="goDownLoad"
    />
  </view>
</template>

<script>
  import devConf from '@/common/env'
  import { getLocation, hideLoading, isWeiXin, shareWeixin, showLoading } from '@/common/helper'
  import VoModal from '@/components/VoModal/VoModal.vue'

  export default {
    name: 'ShareRegister',
    components: { VoModal },
    data() {
      return {
        scrollTop: 0,
        showModal: false,
        content: '',
        isAccept: false,
        // 是否展示角色选择
        showSelectBoo: false,
        selectImg: '/static/common/select_false.png',
        tips: '获取验证码',
        logoImg: '/static/logo-3.png',
        // 表单数据
        formData: {
          mobile: '',
          code: '',
          uuid: '',
          address: null,
          areaCode: null,
          contractName: null,
          storeName: null,
        },
        rules: {
          mobile: [
            {
              type: 'number',
              required: true,
              message: '请输入手机号',
              trigger: ['blur'],
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
            trigger: ['blur'],
          },
          storeName: {
            type: 'string',
            required: true,
            message: '请输入修理厂名称',
            trigger: ['blur'],
          },
          address: {
            type: 'string',
            required: true,
            message: '请填写详细地址',
            trigger: ['change', 'blur'],
          },
          areaCode: {
            type: 'number',
            required: true,
            message: '请选择地址',
            trigger: ['change'],
          },
          contractName: {
            type: 'string',
            required: true,
            message: '请输入联系人姓名',
            trigger: ['blur'],
          },
        },
        options: {},
        // 后台获取角色code
        roleArr: [],
        // 不可选择的角色
        notArr: [
          'investmentManager',
          'channelManager',
          'recycling',
          'oldMachine',
          'supplier',
          'agent',
        ],
        showAddress: false, // 地区选择弹窗
      }
    },
    async onLoad(options) {
      if (options.data) {
        this.options = JSON.parse(options.data)
        console.log(this.options)
      } else if (options.code) {
        try {
          const { data } = await this.$VoHttp.apiShareLinkDetail({ id: options.code })
          console.log(data)
          this.options = JSON.parse(data)
          await this.initRoleFn()
        } catch (e) {
          console.log(e)
          this.$u.toast(e.message || '网络请求错误')
        }
      }
      this.options.roleCode = this.options.roleCode || 'garage'
      this.options.canChoose = !!this.options.canChoose
    },
    methods: {
      clearAddress() {
        this.formData.address = ''
        this.validateForm('address')
      },
      validateForm(item) {
        if (item) {
          this.$refs.form.validateField(item)
        } else {
          this.$refs.form.validate()
        }
      },
      /**
       * 选择地址
       */
      sureFn(data) {
        console.log(data);
        this.formData.areaCode = +data[2].code
        this.formData.areaStr = data[0].name + data[1].name + data[2].name
      },
      /**
       * 选择详细地址
       */
      async openLocation() {
        let LocationInfo = await getLocation(this.locationgTips)
        console.log(LocationInfo);
        if (!LocationInfo || !LocationInfo.longitude) return
        const data = await this.$openLocation()
        console.log(data)
        await this.getAddress(data)
      },
      /**
       * 通过经纬度获取省市区
       */
      async getAddress(info) {
        console.log(info)
        showLoading()
        await this.$VoHttp
          .apiCompanyInvitationH5TertiaryInfo({ ...info })
          .then(({ data }) => {
            this.formData.areaCode = +data.areaCode
            this.formData.areaStr = `${data.provinceName}${data.cityName}${data.areaName}`
            this.formData.address = info.name
            this.validateForm('address')
            this.validateForm('areaCode')
            // this.latitude = info.latitude
            // this.longitude = info.longitude
          })
          .catch((e) => {
            this.$u.toast(e.message || '网络错误')
          })
          .finally(() => {
            hideLoading()
          })
      },
      // 设置分享样式(卡片)
      initShare() {
        // #ifdef H5
        if (!isWeiXin()) {
          this.$u.toast('请在微信中打开！')
          return
        }
        if (item.type !== 'savePoster') {
          shareWeixin({
            scene: item.type,
            path: window.location.href,
            imageUrl: this.shareImg,
          })
            .then((res) => {
              console.log('res分享', res)
              // #ifdef H5
              this.showMask = true
              // #endif
            })
            .catch((err) => {
              console.log('shareWeixinErr', err)
            })
        }
        // #endif
      },
      // 加密电话
      encryptPhone(phone) {
        if (isNaN(+phone)) {
          return phone
        } else {
          return phone ? this.$vocenApi.VoUtils.encryptPhone(phone) : ''
        }
      },
      /**
       * @description 选择角色
       */
      confirmRoleFn(e) {
        this.options.roleCode = e
        this.showSelectBoo = false
      },
      async initRoleFn() {
        this.roleArr = await this.$store.dispatch('role/getRoleArr')
        this.options.licenseId = this.roleArr[0].licenseId
      },
      goDownLoad() {
        this.$linkToEasy(
          `/pagesAgent/TokerDistrict/GoLoginDownload?data=${JSON.stringify(this.options)}`,
        )
      },
      checkPhone() {
        if (!this.formData.mobile) {
          uni.$u.toast('请输入手机号')
          return false
        }
        if (!this.$vocenApi.Pattern.isPhone(this.formData.mobile)) {
          uni.$u.toast('请输入正确的手机号')
          return false
        }
        let param = {}
        param.mobile = this.formData.mobile
        param.inviterUserId = this.options.inviteUserId
        param.platformCode = this.options.roleCode
        param.inviterId = this.options.companyId
        this.$VoHttp
          .apiCompanyInvitationH5CheckGarage(param)
          .then((res) => {
            if (+res.code === 20001) {
              console.log("验证通过");
            }
          })
          .catch((e) => {
            if (e.code === 'U1103') {
              this.content = e.message.split('，')[0] + '，请直接下载APP'
              this.showModal = true
            } else {
              uni.$u.toast(e.message || '网络链接错误')
            }
          })
      },
      async login() {
        this.validateForm()
        if (!this.formData.mobile) {
          uni.$u.toast('请输入联系电话')
          return false
        }
        if (!this.$vocenApi.Pattern.isPhone(this.formData.mobile)) {
          uni.$u.toast('请输入正确的联系电话')
          return false
        }
        if (this.options.roleCode === 'garage') {
          if (!this.formData.contractName) {
            uni.$u.toast('请输入联系人姓名')
            return
          }
          if (!this.formData.storeName) {
            uni.$u.toast('请输入修理厂名称')
            return
          }
          if (!this.formData.areaCode) {
            uni.$u.toast('请选择所在地区')
            this.scrollTop = 500
            return
          }
          if (!this.formData.address) {
            uni.$u.toast('请输入详细地址')
            this.scrollTop = 500
            return
          } else {
            this.formData.address = this.formData.address.trim()
          }
        }

        if (!this.formData.code) {
          uni.$u.toast('请输入验证码')
          this.scrollTop = 500
          return
        }
        if (!this.isAccept) {
          uni.$u.toast('请阅读并勾选底部 用户协议 和 隐私政策')
          return false
        }
        uni.showLoading({
          title: '注册中...',
          mask: true,
        })
        let param = Object.assign({}, this.formData)
        param.inviteUserId = this.options.inviteUserId
        param.platformCode = this.options.roleCode
        param.inviterId = this.options.companyId
        try {
          let data
          if (this.options.roleCode === 'garage') {
            data = await this.$VoHttp.apiCompanyInvitationH5Garage(param)
          } else {
            data = await this.$VoHttp.apiCompanyInvitationH5Common(param)
          }
          uni.$u.toast('注册成功')
          setTimeout(() => {
            this.$linkToEasy(
              `/pagesAgent/TokerDistrict/GoLoginDownload?data=${JSON.stringify(this.options)}`,
            )
          }, 1500)
        } catch (e) {
          console.log(e)
          if (e.code === 'U1103') {
            this.content = e.message.split('，')[0] + '，请直接下载APP'
            this.showModal = true
          } else {
            uni.$u.toast(e.message || '网络链接错误')
          }
        }
        uni.hideLoading()
      },
      onScroll(e) {
        this.scrollTop = e.detail.scrollTop
      },
      //获取验证码
      getCode() {
        if (!this.$vocenApi.Pattern.isPhone(this.formData.mobile)) {
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
            companyId: this.options.companyId,
            mobile: this.formData.mobile,
            userId: this.options.inviteUserId,
            uuid: this.formData.uuid ? this.formData.uuid : null,
            licenseId: this.options.licenseId,
            inviterUserId: this.options.inviteUserId,
            inviteUserId: this.options.inviteUserId,
          }
          if (this.options.roleCode === 'garage') {
            this.$VoHttp
              .apiCompanyInvitationH5Sms(param)
              .then((res) => {
                // this.formData.uuid = res.data
                this.formData.garageId = res.data
                uni.$u.toast('发送成功')
                this.$refs.uCode.start()
              })
              .catch((e) => {
                if (e.code === 'U1103') {
                  this.content = e.message.split('，')[0] + '，请直接下载APP'
                  this.showModal = true
                } else {
                  uni.$u.toast(e.message || '网络链接错误')
                }
              })
              .finally(() => {
                uni.hideLoading()
              })
          } else {
            this.$VoHttp
              .smsSend(param)
              .then((res) => {
                this.formData.uuid = res.data
                uni.$u.toast('发送成功')
                this.$refs.uCode.start()
              })
              .catch((e) => {
                if (e.code === 'U1103') {
                  this.content = e.message.split('，')[0] + '，请直接下载APP'
                  this.showModal = true
                } else {
                  uni.$u.toast(e.message || '网络链接错误')
                }
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
        console.log(123)
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
      chooseIdentityClick() {
        if (this.options.canChoose) {
          this.showSelectBoo = true
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .position-f {
    position: fixed;
  }
  .register {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    background-color: $v-bg-white;
    display: flex;
    flex-direction: column;
    &-logo {
      &__img {
        width: 240rpx;
        height: 240rpx;
        margin: 48rpx auto;
      }
    }
    .main-btn {
      padding: 50rpx 50rpx 60rpx 50rpx;
      &__btn {
        background-color: #ff5319;
        border-radius: 24px;
        color: #fff;
        border: 0;
        height: 92rpx;
        &.disabled {
          background: $v-btn-disabled;
          color: $v-c0-45;
          opacity: 1;
        }
      }
      &__text {
        font-size: 28rpx;
        line-height: 1.5;
        color: $v-c0-45;
        text-align: center;
        padding-top: 24rpx;
      }
    }
    &-form {
      //height: 100%;
      padding: 0 32rpx;

      &__item {
        //height: 96rpx;
        //line-height: 56rpx;
        text-align: right;
        border-bottom: 2rpx solid $v-bg-light;
        ::v-deep .u-form-item__body__left__content__label {
          font-size: 32rpx;
        }
        &.custom {
          text-align: left;
        }
        .item-code {
          margin-left: 44rpx;
          color: #22284b;
        }
      }

      &__word {
        font-size: 32rpx;
        color: $v-c0-85;
      }
      &__label {
        padding-top: 24rpx;
        font-size: 32rpx;
        position: relative;
        .label-star {
          position: absolute;
          left: -16rpx;
          top: 24rpx;
          color: $v-error;
        }
      }
      &__box {
        font-size: 32rpx;
        color: $v-c0-65;
        line-height: 150%;
      }
      &__code {
        font-size: 32rpx;
        line-height: 1.5;
        color: $v-tags;
      }
      .item-textarea {
        width: 100%;
      }

      &__placeholder {
        text-align: right;
        color: $v-c0-25 !important;
        &.text-left {
          text-align: left;
        }
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
  .left {
    color: $v-c0-85;
  }
  .c-ff5319 {
    color: #ff5319;
  }
  .right {
    color: $v-c0-65;
    padding-right: 8rpx;
    line-height: 48rpx;
  }
</style>
