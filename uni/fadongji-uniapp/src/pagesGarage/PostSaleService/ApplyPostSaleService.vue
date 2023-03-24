<template>
  <view class="page" @click="scrollViewFn">
    <vo-qi-mo-customer ref="qiMoRef" :show-phone="false" :is-platform="2"></vo-qi-mo-customer>
    <VoNav :is-fixed="false" :left-width="240" :right-width="240" is-have-more title="申请售后">
      <block slot="operation">
        <view class="fz-24 nav_button m-r-20" @click="tapToList">售后记录</view>
      </block>
    </VoNav>
    <view class="content m-t-16">
      <!-- <view v-if="warnShow" class="warning">-->
      <!--        <VoIcon class="m-r-16" color="#FDA202" name="error-full" size="20" />-->
      <!--        <view class="fz-24">每个发动机只有3次自助售后机会，超出后需联系售后客服处理。</view>-->
      <!--        <VoIcon class="m-l-29" color="#8C877E" name="close" size="20" @click="warnClose" />-->
      <!--      </view> -->
      <view>
        <u--form
          ref="form1"
          :borderBottom="false"
          :model="formData"
          :rules="rules"
          label-width="120"
          labelPosition="left"
        >
          <u-form-item
            class="form_item bg_white text-right"
            label="发动机识别号"
            prop="engineNo"
            required
          >
            <u--input
              v-model="formData.engineNo"
              border="none"
              class="m-r-12"
              inputAlign="right"
              placeholderClass="placeholderStyle"
              @blur="vinClick"
            />
            <VoIcon :opacity="0.65" color="#000" name="scan-not-vin" @click="tapOcr" />
          </u-form-item>
          <view v-if="ruleMsg" class="fz-24 rule-text text-right p-r-32">{{ ruleMsg }}</view>
          <view v-if="ocrImg" class="form-scan_image bg_white">
            <view class="flex flex-justify-r">
              <view class="form_image">
                <image :src="ocrImg" class="ocr_img" />
                <view @click="imageClose">
                  <VoIcon color="#fff" name="close" size="16" />
                </view>
              </view>
            </view>
            <!-- <view class="form_warn">该发动机自助售后次数已达上限，请联系客服处理。</view> -->
          </view>
          <u-form-item class="form_item bg_white m-t-16" label="故障描述" required />
          <view v-if="formData.voice" class="flex audio-con p-l-32">
            <NewAudioVoice ref="newAudioVoice" :info="formData.voice" />
            <VoIcon name="close" size="16" @click="clearVoice" />
          </view>
          <u-form-item v-else ref="item2" class="form_item2 bg_white" prop="faultDesc">
            <view class="u__textarea">
              <u--textarea
                v-model="formData.faultDesc"
                border="none"
                class="textarea"
                confirmType="done"
                count
                height="94"
                maxlength="165"
                placeholder="请输入内容"
              />
              <!-- #ifdef APP-PLUS -->
              <view class="voice">
                <VoIcon class="m-l-8" color="#FF5319" name="voice-icon" size="16" />
                <view
                  class="fz-24 m-l-4 fz-b"
                  @touchend.stop="recordEnd"
                  @touchstart.stop="recordStart"
                  >按住说话
                </view>
              </view>
              <!-- #endif -->
            </view>
          </u-form-item>
          <u-form-item ref="item1" class="form_item bg_white" label="">
            <view class="form-left">
              <view class="form-left__icon">*</view>
              <view>上传凭证</view>
            </view>
            <view class="form-right">
              {{ fileList && fileList.length ? fileList.length : 0 }}/9
            </view>
          </u-form-item>
          <u-form-item ref="item4" class="form_item2 bg_white" prop="pic">
            <VoFormUpload
              :limit="9"
              :source.sync="fileList"
              :video-limit="9"
              btnText="上传图片/视频"
              class="vo_form_upload"
              uploadStyle="{width:218rpx;height:218rpx}"
              @change="productHandlerChange"
            />
          </u-form-item>

          <u-form-item
            ref="item5"
            class="form_item bg_white m-t-16"
            label="处理类型"
            label-position="top"
            label-width="80"
            prop="type"
            required
          >
            <view class="flex-1 p-t-20 w-full">
              <u-radio-group v-model="formData.type" class="flex flex-justify-between">
                <u-radio
                  v-for="(item, index) in radiolist"
                  :key="index"
                  :label="item.name"
                  :name="item.value"
                  activeColor="#FF5319"
                />
              </u-radio-group>
            </view>
          </u-form-item>
          <block v-if="formData.type != 3">
            <u-form-item
              ref="item6"
              class="form_item bg_white m-t-2"
              label="选择故障件"
              label-width="80"
              prop="unit"
              required
              @click="nextPage"
            >
              <u--input
                v-model="formData.unit"
                border="none"
                class="m-r-8"
                inputAlign="right"
                placeholder="请选择"
                placeholderClass="placeholderStyle"
                readonly
              />
              <VoIcon slot="right" :opacity="0.65" name="arrow-right" size="20" />
            </u-form-item>

            <u-form-item
              ref="item7"
              class="form_item bg_white m-b-16 m-t-2"
              label="补偿费用"
              label-width="80"
              prop="amount"
              required
            >
              <u--input
                v-model="formData.amount"
                border="none"
                class="m-r-8"
                inputAlign="right"
                placeholder=""
                placeholderClass="placeholderStyle"
                readonly
              />
              <view slot="right">元</view>
            </u-form-item>
            <block v-if="formData.type == 2">
              <u-form-item
                ref="item8"
                class="form_item bg_white"
                label="故障件返还"
                label-width="80"
                prop="isSendBack"
                required
              >
                <view class="align_right">
                  {{ formData.isSendBack | isSendBackFilter }}
                </view>
              </u-form-item>
              <view class="warn">
                <view v-if="formData.isSendBack" class="warn_text">
                  本次售后，需要您将旧件寄回至下方地址。邮费使用到付方式。
                </view>
                <block v-if="formData.isSendBack">
                  <view v-if="addressDetail" class="addressee bg_white fz-28">
                    <view class="addressee_desc">
                      <text class="m-r-16">{{ addressDetail.name }}</text>
                      <text>{{ addressDetail.mobile }}</text>
                    </view>
                    <view class="addr"
                      >{{
                        addressDetail.provinceName +
                        '-' +
                        addressDetail.cityName +
                        '-' +
                        addressDetail.areaName +
                        '-' +
                        addressDetail.address
                      }}
                    </view>
                  </view>
                  <view v-else class="warn_chat" @click="toChat">
                    <VoIcon class="#8C8C8C" name="customer-service-new" size="13" />
                    <view>请联系客服获取退件地址</view>
                  </view>
                </block>
              </view>
            </block>
          </block>
        </u--form>

        <view class="m-b-32" />
      </view>
      <u-picker
        :columns="columns"
        :show="picker2Show"
        keyName="label"
        @cancel="picker2Close"
        @confirm="picker2Confirm"
      />
      <u-modal
        :show="showReal"
        cancel-text="暂不实名"
        confirm-text="立即实名"
        confirmColor="#22284B"
        show-cancel-button
        @cancel="cancelFn"
        @confirm="confirmHandler"
      >
        <view class="info-content">您的账号未实名，请先完成实名认证。</view>
      </u-modal>
    </view>

    <view class="uploaded-footer">
      <block v-if="+formData.type < 3">
        <view
          v-if="
            !formData.engineNo ||
            (!formData.faultDesc && !formData.voice) ||
            !formData.pic.length ||
            !formData.unit ||
            !formData.amount
          "
          class="uploaded-footer__button"
          @click="submitFormData(1)"
          >提交</view
        >
        <EraButton v-else font-size="32rpx" text="提交" @click="submitFormData" />
      </block>
      <block v-else>
        <view
          v-if="
            !formData.engineNo || (!formData.faultDesc && !formData.voice) || !formData.pic.length
          "
          class="uploaded-footer__button"
          @click="submitFormData(1)"
          >提交</view
        >
        <EraButton v-else font-size="32rpx" text="提交" @click="submitFormData" />
      </block>
    </view>
    <VoSafetyArea :is-fixed="false"></VoSafetyArea>
    <!--  底部悬浮end  -->
    <VoComplaintAction ref="complaintRef" />
  </view>
</template>

<script>
  const record = uni.getRecorderManager()

  //   import RecordingPanel from '@/businessComponents/CreatedCenter/RecordingPanel.vue'
  import {
    appSource,
    chooseImageOcrByPromise,
    goOnlineCustomerFn,
    uploadMp3,
  } from '@/common/helper'
  import { mapGetters } from 'vuex'
  import NewAudioVoice from './components/NewAudioVoice.vue'

  export default {
    components: { NewAudioVoice },
    filters: {
      isSendBackFilter: function (value) {
        if (value) {
          return '是'
        } else {
          return '否'
        }
      },
    },
    data() {
      return {
        showReal: false,
        isCanApply: true,
        repairAmount: '',
        replaceAmount: '',
        duration: '',
        voice: '',
        content: '',
        isRealName: true,
        isLoading: false,
        // recording: true,
        warnShow: true,
        picker2Show: false,
        action: false,
        fileList: [],
        companyId: '',
        goodsId: '',
        modelId: '',
        ocrImg: '',
        formData: {
          buyerInfo: {
            addressId: '',
            buyerId: '',
          },
          pic: [],
          source: '', //来源
          type: 1,
          unit: '',
          unitId: '',
          voice: '',
          isSendBack: false,
          faultDesc: '',
          engineNo: '', // 发动机识别号
          amount: '',
          activityDetail: '',
        },
        id: '',
        addressDetail: '',
        columns: [
          [
            { label: '是', id: true },
            { label: '否', id: false },
          ],
        ],
        radiolist: [
          {
            name: '运输损坏',
            value: 1,
            disabled: false,
          },
          {
            name: '更换零部件',
            value: 2,
            disabled: false,
          },
          {
            name: '换机',
            value: 3,
            disabled: false,
          },
        ],
        rules: {
          pic: [
            {
              required: true,
              type: 'array',
              message: '凭证不能为空',
              trigger: ['blur', 'change'],
            },
          ],
          engineNo: [
            {
              required: true,
              message: '不能为空',
              trigger: ['blur', 'change'],
            },
            // {
            //   asyncValidator: async (rule, value, callback) => {
            //     if (value) {
            //       const res = await this.$VoHttp.apiOrderAfterSaleCheck(value)
            //       if (res.success) {
            //         console.log('companyId', res.data.supplierId)
            //         this.companyId = res.data.supplierId
            //         this.goodsId = res.data.goodsId
            //         this.modelId = res.data.modelId
            //         callback()
            //       } else {
            //         callback(new Error(res.message))
            //       }
            //     }
            //   },
            //   trigger: ['blur', 'change'],
            // },
          ],
          faultDesc: [
            {
              required: true,
              message: '请输入故障描述',
              trigger: ['blur', 'change'],
            },
          ],
          unit: [
            {
              required: true,
              message: '请选择故障件',
              trigger: ['blur', 'change'],
            },
          ],
          amount: [
            // {
            //   required: true,
            //   message: '请输入补偿费用',
            //   trigger: ['change'],
            // },
            // {
            //   validator: (rule, value) => {
            //     return this.$vocenApi.Pattern.isMoney(value)
            //   },
            //   trigger: ['change'],
            //   message: '请输入整数或小数',
            // },
          ],
        },
        ruleMsg: '',
      }
    },
    computed: {
      isInput() {
        return Object.values(this.formData).some((item) => {
          return item && item.length
        })
      },
      ...mapGetters({ userInfo: 'user/userInfoGetter' }),
    },
    watch: {
      fileList: {
        deep: true,
        handler(val) {
          if (val && val.length) {
            this.formData.pic = val.map((item) => {
              return { type: item.type == 1 ? 'image' : 'video', pic: item.src }
            })
          } else {
            this.formData.pic = []
          }
        },
      },
      // companyId: {
      //   deep: true,
      //   handler(val) {
      //     if (val) {
      //       this.getAddress(val)
      //     }
      //   },
      // },
      'formData.unitId': {
        handler(val) {
          if (val) {
            this.getPrice(val)
          }
        },
      },
      'formData.type': {
        handler(val) {
          if (this.repairAmount || this.replaceAmount) {
            if (val == 1) {
              this.formData.amount = this.repairAmount
            } else if (val == 2) {
              this.formData.amount = this.replaceAmount
            }
          }
        },
      },
      'formData.engineNo': {
        handler(value) {
          if (value) {
            // this.isCanApply = true
            // this.$VoHttp
            //   .apiOrderAfterSaleCheck(value)
            //   .then((res) => {
            //     if (res.success) {
            //       console.log('companyId', res.data.supplierId)
            //       this.companyId = res.data.supplierId
            //       this.getAddress(this.companyId)
            //       this.goodsId = res.data.goodsId
            //       this.modelId = res.data.modelId
            //     }
            //   })
            //   .catch((err) => {
            //     this.$u.toast(err.message || '该发动机不支持申请售后')
            //     this.isCanApply = false
            //   })
          }
        },
      },
    },
    onLoad(val) {
      if (val && val.id) {
        this.id = val.id
        this.getOrderDetail()
      }
      if (val && val.engineNo) {
        this.formData.engineNo = val.engineNo
      }
    },
    mounted() {
      console.log(record)
      console.log('zxc')
      record.onStop((res) => {
        uploadMp3({ url: res.tempFilePath, name: 'audio.mp3', isPath: true })
          .then((res) => {
            console.log('222222', res)
            this.formData.voice = res
            console.log('语音path', this.formData.voice)
          })
          .catch((err) => {
            // this.isLoading = false
            console.log('err语音', err)
          })
      })

      uni.$on('getUnit', (val) => {
        if (val.unit && val.unitId) {
          this.formData.unit = val.unit
          this.formData.unitId = val.unitId
        }
      })

      if (this.formData.engineNo) {
        this.$refs.form1.validateField('engineNo')
      }
    },
    onShow() {
      this.initFn()
    },
    onHide() {
      if (this.$refs.newAudioVoice) {
        this.$refs.newAudioVoice.clearAudio()
      }
    },
    methods: {
      scrollViewFn() {
        this.$refs.qiMoRef?.close()
      },
      vinClick() {
        let value = this.formData.engineNo
        if (!value) return
        this.isCanApply = true
        //过滤空格
        this.engineNo = value.replace(/\s+/g, '')
        this.$VoHttp
          .apiOrderAfterSaleCheck(value)
          .then((res) => {
            if (res.success) {
              this.ruleMsg = ''
              console.log('companyId', res.data.supplierId)
              this.companyId = res.data.supplierId
              this.getAddress(this.companyId)
              this.goodsId = res.data.goodsId
              this.modelId = res.data.modelId
            }
          })
          .catch((err) => {
            this.ruleMsg = err.message || '该发动机不支持申请售后'
            console.log(err.message || '该发动机不支持申请售后')
            this.isCanApply = false
          })
      },
      warnClose() {
        this.warnShow = false
      },
      imageClose() {
        this.ocrImg = ''
      },
      tapToList() {
        this.$linkToEasy('/pagesGarage/PostSaleService/ApplyPostSaleList')
      },
      nextPage() {
        if (!this.formData.engineNo) {
          this.$u.toast('未录入发动机识别号')
          return
        }
        if (!this.isCanApply) {
          this.$u.toast('该发动机不支持申请售后')
          return
        }
        this.$linkToEasy(
          '/pagesGarage/PostSaleService/ApplyPostSaleSelectFault?modelId=' + this.modelId,
        )
      },
      clearVoice() {
        this.formData.voice = ''
      },
      recordStart() {
        console.log('开始录音')
        uni.showLoading({
          title: '录音中',
        })
        record.start()
      },
      recordEnd() {
        console.log('结束录音')
        uni.hideLoading()
        record.stop()
      },
      async getPrice(val) {
        await this.$VoHttp
          .apiGoodsModelCompensateDetailCondition({ unitId: val, modelId: this.modelId })
          .then((res) => {
            console.log('getPrice', res.data)
            if (this.formData.type == 1) {
              this.formData.amount = res.data.repairAmount
            } else if (this.formData.type == 2) {
              this.formData.amount = res.data.replaceAmount
            }
            this.repairAmount = res.data.repairAmount
            this.replaceAmount = res.data.replaceAmount
            this.formData.isSendBack = res.data.isSendBack
          })
      },
      isBack() {
        if (this.formData.buyerInfo.addressId) {
          this.picker2Show = true
        } else {
          uni.$u.toast('请先输入发动机识别号')
        }
      },
      picker2Confirm(e) {
        console.log(e)
        this.formData.isSendBack = e.value[0].id
        this.picker2Show = false
      },
      picker2Close(e) {
        this.picker2Show = false
        console.log(e)
      },
      async submitFormData(isReturn) {
        if (isReturn) {
          console.log(this.formData)
          return
        }
        if (!this.isCanApply) {
          this.$u.toast('该发动机不支持申请售后')
          return
        }
        if (
          this.formData.type === 2 &&
          !this.formData.buyerInfo.addressId &&
          this.formData.isSendBack
        ) {
          this.$u.toast('请联系客服获取卖家退件地址')
          return
        }
        this.$refs.form1.validate().then(async (res) => {
          this.formData.buyerInfo.buyerId = this.userInfo.companyId
          let params = this.formData
          if (!params.buyerInfo.addressId) {
            delete params.buyerInfo.addressId
          }
          try {
            if (!this.formData.pic.length) {
              return this.$u.toast('凭证不能为空')
            }
            if (!this.isRealName) {
              this.$linkToEasy(
                '/pagesGarage/UserCenter/RealName?type=/pagesGarage/PostSaleService/ApplyPostSaleService',
              )
              return
            }
            const resData = await this.$VoHttp.apiOrderAfterSalePlace({
              req: {
                ...params,
                source: appSource(),
                voice: JSON.stringify(this.formData.voice),
              },
            })
            //重置表单
            this.$refs.form1.resetFields()
            this.ocrImg = ''
            this.fileList = []

            this.tapToList()
          } catch (err) {
            uni.$u.toast(err.message)
          }
        })
      },
      async initFn() {
        this.isRealName = await this.$VoHttp.apiCompanyLegalRealName$GET().then((res) => res.data)
      },
      confirmHandler() {
        this.$linkToEasy('/pagesGarage/UserCenter/RealName')
      },
      cancelFn() {
        this.$backFn()
      },
      async getAddress(val) {
        const res = await this.$VoHttp.USER.apiReceiverAddressDefault({ companyId: val })
        console.log('getAddress', res.data)
        if (res.data && Object.keys(res.data).length) {
          this.addressDetail = res.data
          this.formData.buyerInfo.addressId = res.data.id
        }
      },
      productHandlerChange(val) {
        console.log(val)
      },
      toChat() {
        goOnlineCustomerFn(2)
      },
      async tapOcr() {
        try {
          const res = await await chooseImageOcrByPromise({
            apiUrl: '/v1/api/business/vehicle/brand/ocr',
            sizeType: ['compressed'],
            formData: {
              type: '1',
            },
          })
          console.log('res.imffff===', res)
          this.ocrImg = res.url.path || res.url
          if (res.data) {
            const data = JSON.parse(res.data)
            if (data.success) {
              this.formData.engineNo = data.data
              this.$refs.form1.clearValidate('engineNo')
              this.vinClick(this.formData.engineNo)
            } else {
              uni.$u.toast(data.message)
            }
          }
        } catch (err) {
          if (!err.errMsg) {
            this.$u.toast(err.message || '网络错误')
          }
        }
      },
      async getOrderDetail() {
        try {
          const res = await this.$VoHttp.apiOrderAfterSale(this.id)
          this.orderDetail = res.data
          this.fileList = res.data.afterSaleFaultDetail.pic.map((item) => {
            return { type: item.type == 'video' ? 2 : 1, src: item.pic }
          })
          this.formData.buyerInfo.buyerId = res.data.afterSaleFaultDetail.buyerId
          this.formData.type = res.data.type
          this.formData.unit = res.data.afterSaleFaultDetail.unit
          this.formData.unitId = res.data.afterSaleFaultDetail.unitId
          this.formData.voice = res.data.afterSaleFaultDetail.voice
          this.formData.isSendBack = res.data.afterSaleFaultDetail.isSendBack
          this.formData.faultDesc = res.data.afterSaleFaultDetail.desc
          this.formData.engineNo = res.data.engineNo
          this.formData.amount = res.data.afterSaleFaultDetail.amount
        } catch (e) {
          console.log(e)
          if (e.code) {
            if (+e.code !== 40001) {
              uni.$u.toast(e.message)
            }
          } else {
            uni.$u.toast('网络链接错误')
          }
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .page {
    display: flex;
    height: 100vh;
    flex-direction: column;
    overflow-x: hidden;
    width: 750rpx;
    box-sizing: border-box;

    &-fixbtns {
      position: fixed;
      right: 32rpx !important;
      bottom: 0;
      z-index: 99;
      height: 264rpx;
      width: 190rpx;

      &__item {
        color: #ffffff;
        font-size: 26rpx;
        height: 64rpx;
        line-height: 64rpx;
        background: linear-gradient(90.22deg, #ff7321 2.68%, #ff5622 99.81%);
        mix-blend-mode: normal;
        display: flex;
        align-items: center;
        padding-left: 12rpx;
        padding-right: 16rpx;
        border-radius: 100rpx;
        margin-bottom: 24rpx;
      }
    }

    .nav_button {
      padding: 10rpx 24rpx;
      color: #ff5319;
      border: 1rpx solid #ff5319;
      border-radius: 200rpx;
      margin-bottom: 2rpx;
    }

    .content {
      flex-grow: 1;
      width: 750rpx;
      overflow-x: hidden;
      overflow-y: auto;
      box-sizing: border-box;

      .warning {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fda202;
        background-color: #fff5e6;
        padding: 24rpx;
      }

      .form_item,
      .form_item2,
      .form-scan_image {
        padding: 0 32rpx;
      }

      .form_image {
        position: relative;

        .ocr_img {
          width: 218rpx;
          height: 218rpx;
          border-radius: 8rpx;
        }

        > :nth-child(2) {
          width: 40rpx;
          height: 40rpx;
          line-height: 40rpx;
          border-radius: 50%;
          text-align: center;
          position: absolute;
          right: 10rpx;
          top: 10rpx;
          background-color: rgba(0, 0, 0, 0.45);
        }
      }

      .form_warn {
        text-align: right;
        color: #f20014;
        font-size: 24rpx;
      }

      .form-left {
        position: relative;

        &__icon {
          position: absolute;
          top: -6rpx;
          left: -14rpx;
          color: #f56c6c;
          font-size: 40rpx;
        }
      }

      .form-right {
        margin-left: auto;
        color: $v-c0-25;
      }

      .placeholderStyle {
        text-align: right;
        font-size: 32rpx;
        color: $v-c0-45 !important;
      }
    }

    .uploaded-footer {
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: $v-bg-white;

      .uploaded-footer__button {
        width: 686rpx;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        font-size: 32rpx;
        background: #f6f7f8;
        border-radius: 48rpx;
        color: $v-c0-25;
      }
    }

    .addressee {
      padding: 32rpx;

      .addressee_desc {
        display: flex;
        align-items: center;
        margin-bottom: 8rpx;
      }
    }
  }

  .warn {
    background-color: #fff;

    .warn_text {
      padding: 0 32rpx 22rpx 32rpx;
      border-bottom: 1rpx solid #f7f7f8;
      font-size: 24rpx;
      color: #ff5319;
      text-align: right;
    }

    .warn_chat {
      font-size: 24rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 30rpx;
      color: rgba(0, 0, 0, 0.65);

      > :nth-child(n) {
        vertical-align: middle;
      }
    }
  }

  ::v-deep {
    .form_item2 .u-form-item__body {
      padding-top: 0;
    }

    .u-radio-group--row {
      justify-content: space-between;
    }

    .u-textarea__count {
      background-color: #f7f7f8 !important;
      bottom: 20rpx;
      font-size: 28rpx;
    }
  }

  .bg_white {
    background-color: #fff;
  }

  .align_right {
    text-align: right;
    width: 100%;
  }

  .u__textarea {
    width: 100%;
    position: relative;

    .textarea {
      background-color: #f7f7f8;
      padding-bottom: 80rpx;
    }
  }

  .u__upload {
    width: 218rpx;
    height: 218rpx;
    font-size: 28rpx;
    color: #bfbfbf;
    background-color: #f7f7f8;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 8rpx;
  }

  .voice {
    width: 156rpx;
    height: 52rpx;
    background-color: #fff;
    color: #ff5319;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-radius: 64rpx;
    position: absolute;
    left: 10rpx;
    bottom: 20rpx;

    view {
      vertical-align: middle;
    }
  }

  .vo_form_upload {
    width: 100%;
  }

  .audio-con {
    background: #fff;
    align-items: center;
  }

  .info-content {
    padding: 15px 3px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 30rpx;
    line-height: 150%;
  }

  .rule-text {
    color: #f56c6c;
  }
  ::v-deep .u-form-item__body__right__message {
    text-align: right;
  }
</style>
