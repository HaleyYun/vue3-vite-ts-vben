<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="refund flex flex-column"
  >
    <VoNav title="退货/退款" />
    <view class="flex1 overflow-y">
      <EraForm
        ref="form"
        :model="formData"
        :rules="rules"
        class="refund-form m-t-16"
        labelPosition="left"
        labelWidth="130"
      >
        <EraFormItem
          class="refund-form__item"
          color="rgba(0, 0, 0, 0.85)"
          label="退款类型"
          prop="refundType"
          required
          @click="refundTypeClick"
        >
          <view
            :class="
              formData.refundType !== '内容' ? 'refund-form__text' : 'refund-form__placeholder'
            "
            class="flex1"
          >
            {{ formData.refundType }}
          </view>
          <VoIcon class="m-l-8" name="right-arrow" />
        </EraFormItem>

        <EraFormItem
          class="refund-form__item"
          color="rgba(0, 0, 0, 0.85)"
          label="是否收到货"
          prop="receiveGood"
          required
          @click="receiveGoodClick"
        >
          <view
            :class="
              formData.receiveGood !== '请选择' ? 'refund-form__text' : 'refund-form__placeholder'
            "
            class="flex1"
          >
            {{ formData.receiveGood }}
          </view>
          <VoIcon class="m-l-8" name="right-arrow" />
        </EraFormItem>

        <EraFormItem
          class="refund-form__item"
          color="rgba(0, 0, 0, 0.85)"
          label="退款原因"
          prop="receiveGood"
          required
          @click="refundReasonClick"
        >
          <view
            :class="
              formData.refundReason !== '请选择退款类型'
                ? 'refund-form__text'
                : 'refund-form__placeholder'
            "
            class="flex1"
          >
            {{ formData.refundReason }}
          </view>
          <VoIcon class="m-l-8" name="right-arrow" />
        </EraFormItem>

        <EraFormItem
          class="refund-form__item"
          color="rgba(0, 0, 0, 0.85)"
          label="退款数量"
          prop="refundReason"
          required
        >
          <view class="flex1 flex flex-justify-r">
            <u-number-box v-model="value" :max="goodData.goodsCount" @change="valChange" />
          </view>
        </EraFormItem>

        <EraFormItem
          class="refund-form__item"
          color="rgba(0, 0, 0, 0.85)"
          label="退款金额"
          prop="refundPrice"
        >
          <view class="flex1 color-red fz-32"> {{ formData.refundPrice }}元 </view>
        </EraFormItem>
      </EraForm>

      <!--  文本域  -->
      <view class="refund-area m-t-16">
        <view class="color-block fz-b fz-32">补充描述和凭证</view>
        <view class="refund-area__problem">
          <view class="line" />
          <EraTextarea
            v-model.trim="content"
            border="none"
            class="area"
            confirmType="done"
            count
            countStyle="background: inherit;right: 28rpx;bottom: 16rpx;color: rgba(0, 0, 0, 0.25);font-size:28rpx"
            height="130"
            maxlength="200"
            placeholder="补充描述，有助于商家更好的处理售后问题"
            placeholderStyle="font-size: 28rpx;color: rgba(0, 0, 0, 0.25);"
          />
        </view>
      </view>
      <!--上传凭证-->
      <view class="refund-upload">
        <view class="refund-upload__name flex flex-justify-between flex-vertical-c">
          <view class="color-block fz-b fz-32">上传凭证</view>
          <view class="name-right">{{ fileList1.length }}/6</view>
        </view>
        <view class="fz-28 m-l-32 m-t-12 color-block-25">最多上传6张</view>
        <view class="refund-upload__pictures">
          <VoUpload
            :fileList="fileList1"
            :maxCount="6"
            :previewFullImage="true"
            height="109"
            multiple
            name="1"
            width="109"
            @success="uploadSuccess"
          >
            <image
              class="pictures-img"
              mode="widthFix"
              src="/static/created/circle/upload_pictures.png"
            />
          </VoUpload>
        </view>
      </view>
    </view>
    <!--底部按钮-->
    <view class="refund-bottom p-b-safe-area">
      <view
        :class="
          formData.refundPrice &&
          formData.refundType !== '内容' &&
          formData.receiveGood !== '请选择' &&
          formData.refundReason !== '请选择退款类型'
            ? 'refund-bottom__selected'
            : 'refund-bottom__normal'
        "
        class="refund-bottom__btn"
        @click="confirmClick"
        >确定</view
      >
      <view class="p-b-safe-area" />
    </view>
    <RefundActionPopup ref="actionPopup" :type-list="typeList" @select="selectType" />
  </view>
</template>

<script>
  import RefundActionPopup from '../components/RefundActionPopup.vue'
  import { appSource, toRoleHome } from '@/common/helper'

  export default {
    name: 'InitiateRefund',
    components: { RefundActionPopup },
    onLoad(option) {
      this.goodData = JSON.parse(option.data)
      this.value = this.goodData.goodsCount

      this.getRefundCalculateAmount()
      this.refundReasonRequest(1)
      this.refundGoodReasonRequest(2)
    },
    data() {
      return {
        goodData: {},
        value: 0,
        content: '',
        fileList1: [],
        disabled: false,
        //退款类型数组
        refundTypeList: [{ name: '退款' }, { name: '退货退款' }],
        //收货类型数组
        receiveGoodList: [{ name: '已收货' }, { name: '未收货' }],
        //仅退款原因
        refundReasonList: [],
        //退货退款原因
        refundGoodReasonList: [],
        //1.退款类型 2.是否收到货 3.请选择退款类型
        typeString: '',
        typeList: [],
        formData: {
          refundType: '内容', // 退款类型
          receiveGood: '请选择', // 是否收到货
          refundReason: '请选择退款类型', //退款原因
          refundNumber: '', //退款数量
          refundPrice: '', //退款数量
        },
        rules: {
          refundType: {
            required: true,
            message: '请选择退款类型',
            trigger: ['blur', 'change'],
          },
          receiveGood: {
            required: true,
            message: '请选择是否收到货',
            trigger: ['blur', 'change'],
          },
          refundReason: {
            required: true,
            message: '请选择退款原因',
            trigger: ['blur', 'change'],
          },
          refundNumber: {
            required: true,
            message: '请输入退款数量',
            trigger: ['blur', 'change'],
          },
        },
      }
    },
    methods: {
      refundTypeClick() {
        this.$refs.actionPopup.show()
        this.typeList = this.refundTypeList
        this.typeString = '1'
      },
      receiveGoodClick() {
        this.$refs.actionPopup.show()
        this.typeList = this.receiveGoodList
        this.typeString = '2'
      },
      refundReasonClick() {
        if (this.formData.refundType === '内容') {
          this.$u.toast('请选择退款类型')
          return
        }
        if (this.formData.refundType === '退款') {
          this.typeList = this.refundReasonList
        }
        if (this.formData.refundType === '退货退款') {
          this.typeList = this.refundGoodReasonList
        }
        console.log(this.refundGoodReasonList)
        this.$refs.actionPopup.show()
        this.typeString = '3'
      },
      // 选择投诉类型
      selectType(item) {
        this.$refs.actionPopup.close()
        if (this.typeString === '1') {
          this.formData.refundType = item.name
          return
        }
        if (this.typeString === '2') {
          this.formData.receiveGood = item.name
          return
        }
        if (this.typeString === '3') {
          this.formData.refundReason = item.name
          return
        }
      },
      valChange(e) {
        this.value = e.value
        this.getRefundCalculateAmount()
      },
      uploadSuccess(e) {
        console.log(e)
      },
      confirmClick() {
        if (
          this.formData.refundType === '内容' ||
          this.formData.receiveGood === '请选择' ||
          this.formData.refundReason === '请选择退款类型'
        ) {
          return
        }
        this.applyForRefundRequest()
      },
      //计算可退金额请求
      getRefundCalculateAmount() {
        console.log(this.goodData)
        let params = {
          orderId: this.goodData.orderId,
          goodsId: this.goodData.goodsId,
          goodsCount: this.value,
          projectId: this.goodData.projectId || 0,
        }
        this.$VoHttp
          .apiRefundCalculateAmount(params)
          .then((res) => {
            if (res.code === '20001') {
              this.formData.refundPrice = res.data
            } else {
              uni.$u.toast(res.message || '退款金额获取失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '退款金额获取失败')
          })
      },
      //发起退款申请请求
      applyForRefundRequest() {
        let params = {
          orderId: this.goodData.orderId,
          source: appSource(),
          shopId: this.goodData.shopId,
          shopPlatformCode: this.goodData.shopPlatformCode,
          whetherReceiptGoods: this.goodData.whetherReceiptGoods,
          reason: this.formData.refundReason,
          totalAmount: this.formData.refundPrice,
          goodsInfos: [
            {
              goodsId: this.goodData.projectId ? this.goodData.projectId : this.goodData.goodsId,
              goodsCount: this.value,
              amount: this.formData.refundPrice,
            },
          ],
        }

        if (this.formData.refundType === '退款') {
          params.isRefundOnly = true
        } else if (this.formData.refundType === '退货退款') {
          params.isRefundOnly = false
        }
        //备注
        if (this.content) {
          params.remark = this.content
        }
        //图片
        if (this.fileList1) {
          let picArr = []
          this.fileList1.forEach((item) => {
            picArr.push(item.url)
          })
          let refundPic = picArr.join(',')
          params.refundPic = refundPic
        }
        uni.showLoading({
          title: '加载中',
        })
        this.$VoHttp
          .apiRefundCreateFefundApply(params)
          .then((res) => {
            uni.hideLoading()
            if (res.code === '20001') {
              uni.$u.toast('发起退货申请成功')
              setTimeout(() => {
                toRoleHome()
              }, 1500)
            } else {
              uni.$u.toast(res.message || '发起退货失败')
            }
          })
          .catch((err) => {
            uni.hideLoading()
            console.log('err', err)
            uni.$u.toast(err.message || '发起退货失败')
          })
      },
      //仅退款原因
      refundReasonRequest(type) {
        let params = {
          type: type,
        }
        this.$VoHttp
          .apiOrderRefundCauseQueryList(params)
          .then((res) => {
            if (res.code === '20001') {
              console.log(res)
              let array = res.data
              this.refundReasonList = []
              array.forEach((item) => {
                let param = {
                  name: item,
                }
                this.refundReasonList.push(param)
              })
            } else {
            }
          })
          .catch((err) => {
            uni.hideLoading()
            console.log('err', err)
          })
      },
      //仅退款退货原因
      refundGoodReasonRequest(type) {
        let params = {
          type: type,
        }
        this.$VoHttp
          .apiOrderRefundCauseQueryList(params)
          .then((res) => {
            if (res.code === '20001') {
              console.log(res)
              let array = res.data
              this.refundGoodReasonList = []
              array.forEach((item) => {
                let param = {
                  name: item,
                }
                this.refundGoodReasonList.push(param)
              })
            } else {
            }
          })
          .catch((err) => {
            uni.hideLoading()
            console.log('err', err)
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .refund {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    &-form {
      padding: 0 32rpx;
      background: #ffffff;
      &__item {
        text-align: right;
        border-bottom: 2rpx solid $v-bg-light;
        .item-input {
          padding: 4rpx;
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
        font-size: 32rpx !important;
      }
      &__text {
        text-align: right;
        color: $v-c0-85 !important;
        font-size: 32rpx !important;
      }
    }
    &-area {
      background-color: #ffffff;
      padding: 24rpx 32rpx;
      &__problem {
        margin-top: 24rpx;
        .area {
          background: #f7f7f8;
          border-radius: 4px;
          margin-top: 24rpx;
        }
        .line {
          background-color: $v-bg-light;
          width: 686rpx;
          height: 2rpx;
          margin-top: 24rpx;
        }
      }
    }
    &-upload {
      background-color: #ffffff;
      padding-bottom: 24rpx;
      &__name {
        width: 686rpx;
        height: 48rpx;
        line-height: 48rpx;
        margin: 0rpx 32rpx 0 32rpx;
        .name-right {
          font-size: 28rpx;
          color: $v-c0-25;
        }
      }
      &__pictures {
        margin-top: 32rpx;
        padding-left: 32rpx;
        padding-right: 16rpx;

        .pictures-img {
          width: 218rpx;
          height: 218rpx;
        }
      }
    }
    &-bottom {
      background: #ffffff;
      height: 132rpx;
      width: 750rpx;
      &__btn {
        margin: 18rpx 48rpx;
        border-radius: 48rpx;
        height: 92rpx;
        line-height: 92rpx;
        text-align: center;
        font-size: 32rpx;
      }
      &__normal {
        background-color: $v-bg-light;
        color: $v-c0-25;
      }
      &__selected {
        background-color: $color-primary-yellow;
        color: #ffffff;
      }
    }
  }
</style>
