<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="uploaded p-b-safe-area"
  >
    <!--  顶部导航栏模块：start  -->
    <VoNav title="提交实名认证信息" is-have-more />
    <!--  步骤二模块：start  -->
    <view>
      <div class="fixed-cert">
        <VoAlert
          :show-icon="false"
          :show-title="false"
          type="primary"
          description="说明：实名认证通过后开通账户余额功能"
          icon-position="right"
        />
      </div>
      <!--  上传照片模块：start  -->
      <UploadPhotos
        :twoPhotos="true"
        :upPhoto="twoPhotosList"
        @upload="uploadCardIs"
        @uploadSecond="uploadCardNo"
      />
      <!--  上传照片模块：end  -->
      <!--  温馨提示模块：start  -->
      <WarmPrompt />
      <!--  温馨提示模块：end  -->
      <!--  企业信息模块：start  -->
      <EraForm
        ref="form"
        :model="formData"
        :rules="rules"
        class="uploaded-form"
        labelPosition="left"
        labelWidth="128"
      >
        <EraFormItem
          class="uploaded-form__item"
          color="rgba(0, 0, 0, 0.85)"
          label="身份证号"
          prop="IDCard"
        >
          <u--input
            v-model="formData.IDCard"
            border="none"
            disabledColor="#ffffff"
            fontSize="16px"
            inputAlign="right"
            placeholder="请输入身份证号"
            placeholderClass="uploaded-form__placeholder"
          />
        </EraFormItem>
        <EraFormItem class="uploaded-form__item" color="rgba(0, 0, 0, 0.85)" label="身份证有效期">
          <view class="flex flex1 flex-end">
            <view
              class="uploaded-form__word"
              :class="{ 'color-gray': !formData.startTime }"
              @click="startFormShow = true"
              >{{ formData.startTime ? formData.startTime : nowDate }}
            </view>
            <view class="uploaded-form__word m-l-16 m-r-16">至</view>
            <view
              class="uploaded-form__word"
              :class="{ 'color-gray': !formData.endTime }"
              @click="endFormShow = true"
              >{{ formData.endTime ? formData.endTime : nowDate }}
            </view>
          </view>
        </EraFormItem>
        <EraFormItem
          class="uploaded-form__item"
          color="rgba(0, 0, 0, 0.85)"
          label="姓名"
          prop="name"
        >
          <u-input
            v-model="formData.name"
            border="none"
            class="item-input"
            color="rgba(0, 0, 0, 0.85)"
            fontSize="16px"
            inputAlign="right"
            placeholder="请输入您的姓名"
            placeholderClass="uploaded-form__placeholder"
          />
        </EraFormItem>
      </EraForm>
      <!--  企业信息模块：end  -->
    </view>
    <!--  步骤二模块：end  -->

    <!--  底部固定模块：start  -->
    <view class="uploaded-footer flex p-b-safe-area px-30">
      <u-button
        v-if="
          formData.name &&
          formData.IDCard &&
          formData.startTime &&
          formData.endTime &&
          twoPhotosList.firstSrc &&
          twoPhotosList.secondSrc
        "
        class="uploaded-footer__button flex1"
        color="#22284b"
        shape="circle"
        size="large"
        text="下一步"
        @click="nextStep"
      />
      <u-button
        v-else
        class="uploaded-footer__button uploaded-footer__color flex1"
        color="#F6F7F8"
        shape="circle"
        size="large"
        text="提交认证"
      />
    </view>

    <!--  底部固定模块：end  -->

    <u-datetime-picker
      :minDate="332747120000"
      :maxDate="3740967920000"
      :show="startFormShow"
      :value="formData.startTime || nowDate"
      cancelColor="rgba(0, 0, 0, 0.45)"
      confirmColor="#22284B"
      mode="date"
      title="日期选择器"
      @cancel="startFormShow = false"
      @confirm="confirmFormStart"
    />

    <u-datetime-picker
      :minDate="332747120000"
      :maxDate="3740967920000"
      :show="endFormShow"
      :value="formData.endTime || nowDate"
      cancelColor="rgba(0, 0, 0, 0.45)"
      confirmColor="#22284B"
      mode="date"
      title="日期选择器"
      @cancel="endFormShow = false"
      @confirm="confirmFormEnd"
    />
  </view>
</template>
<script>
  import UploadPhotos from './components/UploadPhotos'
  import WarmPrompt from './components/WarmPrompt'
  import { chooseImageOcrByPromise, hideLoading, showLoading, toRoleHome } from '@/common/helper'
  import VoAlert from '@/components/VoAlert/VoAlert'

  export default {
    name: 'DownloadApp',
    components: { UploadPhotos, WarmPrompt, VoAlert },
    data() {
      return {
        redirect: null,
        isLoading: false,
        startFormShow: false,
        endFormShow: false,
        upPhotoList: {
          defaultFirstSrc: '/static/created/certify/not_uploaded.png',
          firstSrc: '',
          firstContent: '拍照上传您的营业执照',
        },
        twoPhotosList: {
          defaultFirstSrc: '/static/created/certify/positive.png',
          firstSrc: '',
          firstContent: '拍照上传您的身份证正面',
          defaultSecondSrc: '/static/created/certify/back.png',
          secondSrc: '',
          secondContent: '拍照上传您的身份证反面',
        },
        formData: {
          IDCard: '', // 身份证号
          startTime: '', // 身份证日期开始
          endTime: '', // 身份证日期结束
          name: '', // 姓名
        },
        rules: {
          IDCard: [
            {
              type: 'string',
              required: true,
              message: '请输入身份证号',
              trigger: ['blur'],
            },
            {
              pattern: this.$vocenApi.Pattern.id_card,
              message: '身份证号号格式不正确',
              trigger: ['blur'],
            },
          ],
          name: {
            type: 'string',
            required: true,
            message: '请输入您的姓名',
            trigger: ['blur'],
          },
        },
        nowDate: this.$vocenApi.VoUtils.timeFormat(new Date(), 'yyyy-mm-dd'),
      }
    },
    methods: {
      noCertHandler() {
        this.$backFn()
        // if (this.redirect) {
        //   this.$linkToEasy(this.redirect)
        // } else {
        //   this.$backFn()
        // }
      },
      /**
       * 上传身份证正面
       */
      uploadCardIs() {
        chooseImageOcrByPromise({ count: 1, formData: { type: 1 }, tip: '识别中' })
          .then((res) => {
            const result = JSON.parse(res.data)
            console.log(res, 'resres', result)

            if (Number(result.code) === 20001) {
              this.formData.name = result.data.name
              this.formData.IDCard = result.data.idNum
              this.twoPhotosList.firstSrc = result.data.url
            } else if (Number(result.code) === 40005) {
              //图片识别失败
              this.twoPhotosList.firstSrc = result.data.url
              uni.$u.toast(result.message || '请求失败')
            } else {
              uni.$u.toast(result.message || '请求失败')
            }
          })
          .catch((err) => {
            if (!err.errMsg) {
              this.$u.toast(err.message || '网络错误')
            }
          })
      },
      /**
       *  上传身份证反面
       */
      uploadCardNo() {
        chooseImageOcrByPromise({ count: 1, formData: { type: 1 }, tip: '识别中' })
          .then((res) => {
            const result = JSON.parse(res.data)

            if (Number(result.code) === 20001) {
              this.formData.validity = result.data.validDate
              this.twoPhotosList.secondSrc = result.data.url

              let validDate = result.data.validDate.split('-')
              console.log(validDate, 'validDatevalidDatevalidDate')
              this.formData.startTime =
                validDate[0].substr(0, 4) +
                '-' +
                validDate[0].substr(5, 2) +
                '-' +
                validDate[0].substr(8, 2)
              if (validDate[1] === '长期') {
                this.formData.endTime = validDate[1]
              } else {
                this.formData.endTime =
                  validDate[1].substr(0, 4) +
                  '-' +
                  validDate[1].substr(5, 2) +
                  '-' +
                  validDate[1].substr(8, 2)
              }
            } else if (Number(result.code) === 40005) {
              //图片识别失败
              this.twoPhotosList.secondSrc = result.data.url
              uni.$u.toast(result.message || '请求失败')
            } else {
              uni.$u.toast(result.message || '请求失败')
            }
          })
          .catch((err) => {
            if (!err.errMsg) {
              this.$u.toast(err.message || '网络错误')
            }
          })
      },
      /**
       * 下一步
       */
      nextStep() {
        this.$refs.form.validate().then(() => {
          if (this.isLoading) return
          this.isLoading = true
          let param = {
            legalIdCardBack: this.twoPhotosList.secondSrc,
            legalIdCardFront: this.twoPhotosList.firstSrc,
            legalName: this.formData.name,
            legalStartDate: this.formData.startTime,
            legalEndDate: this.formData.endTime,
            legalId: this.formData.IDCard,
          }
          this.$VoHttp
            .apiCompanyLegalRealName$PUT(param)
            .then((res) => {
              uni.$u.toast('提交成功')
              setTimeout(() => {
                this.$backFn()
              }, 2000)

              this.isLoading = false
            })
            .catch((e) => {
              this.isLoading = false
              uni.$u.toast(e.message || '请求失败')
            })
        })
      },
      confirmFormStart(e) {
        this.startFormShow = false
        this.formData.startTime = this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm-dd')
      },
      confirmFormEnd(e) {
        this.endFormShow = false
        this.formData.endTime = this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm-dd')
      },
    },
    onLoad(options) {
      this.redirect = options?.redirect || null
      console.log(this.redirect)
    },
  }
</script>
<style lang="scss" scoped>
  .uploaded {
    width: 750rpx;
    min-height: 100vh;
    overflow-x: hidden;
    box-sizing: border-box;
    background: $v-bg-white;
    padding-bottom: 132rpx;

    &-logo {
      width: 100%;
      height: 368rpx;
      padding-left: 32rpx;

      &__name {
        padding: 24rpx 0;
        height: 48rpx;
        line-height: 48rpx;
        font-size: 32rpx;
        color: $v-c0-85;
      }
    }

    &-form {
      margin-top: 56rpx;
      padding: 0 32rpx;
      margin-bottom: 8rpx;

      &__item {
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
        font-size: 32rpx;
        line-height: 1.5;
        color: var(--color-primary);
      }

      &__placeholder {
        text-align: right;
        color: $v-c0-25 !important;
      }
    }

    &-success {
      text-align: center;
      margin-top: 72rpx;

      &__icon {
        width: 176rpx;
        height: 176rpx;
      }

      &__info {
        margin-top: 32rpx;
        height: 36rpx;
        line-height: 36rpx;
        font-weight: bold;
        font-size: 30rpx;
        color: $v-c0-85;
      }

      &__open {
        margin-top: 24rpx;
        height: 36rpx;
        line-height: 36rpx;
        font-size: 24rpx;
        color: $v-c0-45;
      }

      &__button {
        margin-top: 286rpx;
        width: 750rpx;
        padding: 0rpx 32rpx;
        box-sizing: border-box;
      }
    }

    &-footer {
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 3;
      right: 0;
      height: 132rpx;
      line-height: 132rpx;
      border-top: 2rpx solid rgba(24, 34, 65, 0.08);
      background: $v-bg-white;

      &__button {
        height: 92rpx;
        margin: auto;
      }

      &__color {
        color: $v-c0-25 !important;
      }
    }
  }

  :deep.u-form-item__body__left__content__required {
    top: 0rpx;
  }

  .color-gray {
    color: rgba(0, 0, 0, 0.25);
  }

  .flex-end {
    justify-content: flex-end;
  }
</style>
