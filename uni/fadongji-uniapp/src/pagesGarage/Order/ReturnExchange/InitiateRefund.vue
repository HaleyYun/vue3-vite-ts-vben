<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="refund flex flex-column"
  >
    <VoNav title="退货/退款" />
    <view class="flex1 overflow-y refund-overflow">
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
              formData.refundType !== '请选择退款类型'
                ? 'refund-form__text'
                : 'refund-form__placeholder'
            "
            class="flex1"
          >
            {{ formData.refundType }}
          </view>
          <VoIcon class="m-l-8" name="right-arrow" />
        </EraFormItem>

        <EraFormItem
          v-show="formData.refundType === '退款'"
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
              formData.refundReason !== '请选择退款原因'
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
            <u-number-box
              v-model="value"
              :max="goodData.goodsCount"
              disabled
              min="0"
              @change="valChange"
            />
          </view>
        </EraFormItem>
      </EraForm>
      <EngineCode :goodData="goodData" @selectedFn="selectedFn"></EngineCode>
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
          label="退款金额"
          prop="refundPrice"
        >
          <view class="flex1 color-red fz-32"> {{ formData.refundPrice }}元 </view>
        </EraFormItem>
      </EraForm>

      <!--  文本域  -->
      <view class="refund-area m-t-16">
        <view class="color-block fz-b fz-32 position-relative"
          ><span class="red-required">*</span>补充描述和凭证</view
        >
        <view class="refund-area__problem">
          <view class="line" />
          <EraTextarea
            v-model="content"
            :maxlength="200"
            border="none"
            class="area"
            confirmType="done"
            count
            countStyle="background: inherit;right: 28rpx;bottom: 16rpx;color: rgba(0, 0, 0, 0.25);font-size:28rpx"
            height="100"
            placeholder="补充描述，有助于商家更好的处理售后问题"
            placeholderStyle="font-size: 28rpx;color: rgba(0, 0, 0, 0.25);"
            @input="inputChange"
          />
        </view>
      </view>
      <!--上传凭证-->
      <view class="refund-upload">
        <view class="refund-upload__name flex flex-justify-between flex-vertical-c">
          <view class="color-block fz-b fz-32 position-relative"
            ><span class="red-required">*</span>上传凭证</view
          >
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
        v-if="formData.refundType === '退款'"
        :class="
          content.replace(/\s+/g, '') &&
          (formData.refundPrice || formData.refundPrice === 0) &&
          formData.refundType !== '请选择退款类型' &&
          formData.receiveGood !== '请选择' &&
          formData.refundReason !== '请选择退款原因'
            ? 'refund-bottom__selected'
            : 'refund-bottom__normal'
        "
        class="refund-bottom__btn"
        @click="confirmClick(true)"
        >确定</view
      >
      <view
        v-else
        :class="
          content.replace(/\s+/g, '') &&
          (formData.refundPrice || formData.refundPrice === 0) &&
          formData.refundType !== '请选择退款类型' &&
          formData.refundReason !== '请选择退款原因'
            ? 'refund-bottom__selected'
            : 'refund-bottom__normal'
        "
        class="refund-bottom__btn"
        @click="confirmClick(false)"
        >确定</view
      >
      <view class="p-b-safe-area" />
    </view>
    <RefundActionPopup ref="actionPopup" :type-list="typeList" @select="selectType" />
    <RefundReasonPopup ref="reasonPopup" :radio-list="radioList" @select="selectReason" />
  </view>
</template>

<script>
  import RefundActionPopup from './components/RefundActionPopup.vue'
  import RefundReasonPopup from './components/RefundReasonPopup.vue'
  import EngineCode from './components/EngineCode.vue'
  import { appSource } from '../../../common/helper'

  export default {
    name: 'InitiateRefund',
    components: { RefundActionPopup, RefundReasonPopup, EngineCode },
    onLoad(option) {
      //修改
      if (option.isEdit) {
        this.isEdit = option.isEdit
        this.index = option.index
        this.goodData = JSON.parse(option.data)
        this.returnDetailRequest(this.goodData.orderId)
        this.refundReasonRequest(1)
        this.refundGoodReasonRequest(2)
        return
      }
      this.goodData = JSON.parse(option.data)
      this.value = this.goodData.goodsCount
      console.log(this.goodData)
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
        radioList: [],
        formData: {
          refundType: '请选择退款类型', // 退款类型
          receiveGood: '请选择', // 是否收到货
          refundReason: '请选择退款原因', //退款原因
          refundNumber: '', //退款数量
          refundPrice: '', //退款金额
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
        //是否是编辑
        isEdit: '',
        orderStatus: '',
        index: '',
        engineNoList: [], // 选中的识别码列表
      }
    },
    methods: {
      // 拿到选中的的识别码数据
      selectedFn(data) {
        console.log('data==', data)
        this.engineNoList = data.map((item) => item.name)
        console.log(this.engineNoList, this.engineNoList)
        this.value = this.engineNoList.length || 0
        this.getRefundCalculateAmount()
      },
      inputChange(e) {
        this.content = e.replace(/\s+/g, '')
      },
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
        if (
          (this.formData.refundType === '退款' && this.formData.receiveGood === '已收货') ||
          this.formData.refundType === '退货退款'
        ) {
          this.radioList = this.refundReasonList
        } else {
          this.radioList = this.refundGoodReasonList
        }
        this.$refs.reasonPopup.show()
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
      },
      selectReason(item) {
        console.log(item)
        this.formData.refundReason = item.reason
      },
      valChange(e) {
        this.value = e.value
        this.getRefundCalculateAmount()
      },
      uploadSuccess(e) {
        console.log(e)
      },
      confirmClick(receive) {
        if (receive) {
          if (
            this.formData.refundType === '请选择退款类型' ||
            this.formData.receiveGood === '请选择' ||
            this.formData.refundReason === '请选择退款原因'
          ) {
            return
          }
        } else {
          if (
            this.formData.refundType === '请选择退款类型' ||
            this.formData.refundReason === '请选择退款原因'
          ) {
            return
          }
        }
        if (this.value < 1) {
          uni.$u.toast('请勾选退回机器的发动机识别码')
          return
        }
        //过滤空格
        let valueNew = this.content.replace(/\s+/g, '')
        if (!valueNew) {
          return
        }
        if (this.isEdit) {
          this.getEditRefundUpdate()
          return
        }
        this.applyForRefundRequest()
      },
      //计算可退金额请求
      getRefundCalculateAmount() {
        console.log(this.value)
        let params = {
          orderId: this.goodData.orderId,
          goodsId: this.goodData.goodsId,
          goodsCount: this.value,
          projectId: 0,
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
          reason: this.formData.refundReason,
          totalAmount: this.formData.refundPrice,
          goodsInfos: [
            {
              goodsId: this.goodData.goodsId,
              goodsCount: this.value,
              amount: this.formData.refundPrice,
              engineNoList: this.engineNoList,
            },
          ],
        }
        if (this.formData.refundType === '退款') {
          params.isRefundOnly = true
          if (this.formData.receiveGood === '已收货') {
            params.whetherReceiptGoods = true
          } else if (this.formData.receiveGood === '未收货') {
            params.whetherReceiptGoods = false
          } else {
            params.whetherReceiptGoods = this.goodData.whetherReceiptGoods
          }
        } else if (this.formData.refundType === '退货退款') {
          params.isRefundOnly = false
          params.whetherReceiptGoods = true
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
        console.log(params)
        uni.showLoading({
          title: '加载中',
        })
        this.$VoHttp
          .apiRefundCreateFefundApply(params)
          .then((res) => {
            uni.hideLoading()
            if (res.code === '20001') {
              uni.$u.toast('发起退货申请成功')

              uni.$emit('back', 1)
              setTimeout(() => {
                this.$backFn()
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
      //仅退款原因 退货
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
      /**
       * 退款详情请求
       */
      returnDetailRequest(orderId) {
        let params = {
          id: orderId,
        }
        this.$VoHttp
          .apiRefundDetail(params)
          .then((res) => {
            if (res.code === '20001') {
              console.log('退款详情', res)
              let refundInformation = res.data.refundInformation
              //退款类型
              this.formData.refundType = refundInformation.isRefundOnly ? '退款' : '退货退款'
              //是否收到货
              this.formData.receiveGood = refundInformation.whetherReceiptGoods
                ? '已收货'
                : '未收货'
              //退款原因
              this.formData.refundReason = refundInformation.reason
              //描述
              this.content = refundInformation.remark || ''
              this.fileList1 = [{ url: refundInformation.refundPic }]
              this.refundNumber = res.data.refundGoods.goodsCount
              this.formData.refundPrice = refundInformation.amount
              this.orderStatus = res.data.status
              this.goodData.whetherReceiptGoods = refundInformation.whetherReceiptGoods
              this.goodData.projectId = res.data.refundGoods.projectId
              this.goodData.goodsId = res.data.refundGoods.goodsId
              this.value = res.data.refundGoods.goodsCount
            } else {
              uni.$u.toast(res.message || '退款详情获取失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '退款详情获取失败')
          })
      },
      //修改退货单
      getEditRefundUpdate() {
        let params = {
          orderId: this.goodData.orderId,
          reason: this.formData.refundReason,
          orderStatus: this.orderStatus,
          goodsCount: this.value,
          whetherReceiptGoods: this.goodData.whetherReceiptGoods,
          goodsId: this.goodData.goodsId,
          projectId: this.goodData.projectId || 0,
          amount: this.formData.refundPrice,
        }
        if (this.formData.refundType === '退款') {
          params.isRefundOnly = true
        } else if (this.formData.refundType === '退货退款') {
          params.isRefundOnly = false
        }
        if (!params.isRefundOnly) {
          params.whetherReceiptGoods = true
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
          .apiRefundUpdateApply(params)
          .then((res) => {
            uni.hideLoading()
            if (res.code === '20001') {
              uni.$u.toast('发起退货申请成功')
              setTimeout(() => {
                this.$backFn()
                uni.$emit('back', this.index)
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
    },
  }
</script>

<style lang="scss" scoped>
  .refund {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    &-overflow {
      width: 100%;
      overflow-x: hidden;
    }
    &-form {
      padding: 16rpx 32rpx 0rpx 32rpx;
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
      box-sizing: border-box;
      &__problem {
        margin-top: 24rpx;
        .area {
          background: #f7f7f8;
          border-radius: 4px;
          margin-top: 24rpx;
          padding-bottom: 60rpx;
          box-sizing: border-box;
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
  .red-required {
    color: #f56c6c;
    position: absolute;
    left: -9px;
    top: 3px;
    line-height: 20px;
    font-size: 20px;
    font-weight: 400;
  }
  .position-relative {
    position: relative;
  }
</style>
