<template>
  <view v-if="info.id" class="modify">
    <u-popup :round="10" :show="show" mode="bottom" @close="close">
      <view class="modify-title flex flex-justify-between">
        <view class="modify-title__width">{{ info.name }}</view>
        <VoIcon :opacity="0.65" color="#000000" name="close" @click="close"></VoIcon>
      </view>
      <EraForm
        ref="form"
        :model="formData"
        :rules="rules"
        class="modify-form"
        labelPosition="left"
        labelWidth="128"
      >
        <EraFormItem
          class="modify-form__item"
          color="rgba(0, 0, 0, 0.85)"
          label="修理厂支付形式"
          prop="paymentForm"
          required
        >
          <EraCheckboxGroup v-model="payType" class="item-group" color="#FF5319">
            <EraCheckbox :name="1" disabled label="现金" />
            <VoIcon
              :opacity="0.25"
              :size="20"
              class="m-l-8"
              color="#000000"
              name="account-question"
              @click.native="priceAlert"
            />
            <EraCheckbox :name="2" class="m-l-48" label="账期" />
          </EraCheckboxGroup>
        </EraFormItem>
        <EraFormItem
          class="modify-form__item cash"
          color="rgba(0, 0, 0, 0.85)"
          label="修理厂现金价格"
          prop="cashPrice"
          required
        >
          <u--input
            v-model.trim="formData.cashPrice"
            border="none"
            class="item-input m-r-6"
            color="rgba(0, 0, 0, 0.85)"
            inputAlign="right"
            placeholder="请输入修理厂现金价格"
            placeholderClass="item-placeholder"
            type="number"
            :formatter="formatterMoney"
          />
          <text class="item-text">元</text>
          <view v-if="info.minPredictProfit || info.maxPredictProfit" class="modify-form__block">
            预计收益{{ info.minPredictProfit || 0 }}-{{ info.maxPredictProfit || 0 }}元
          </view>
          <view v-else class="modify-form__block"> 预计收益0元 </view>
        </EraFormItem>
        <EraFormItem
          v-if="payType.includes(2)"
          class="modify-form__item"
          color="rgba(0, 0, 0, 0.85)"
          label="账期天数"
          prop="accountPeriodDays"
          required
        >
          <u--input
            v-model.trim="formData.accountPeriodDays"
            border="none"
            class="item-input m-r-6"
            color="rgba(0, 0, 0, 0.85)"
            inputAlign="right"
            placeholder="请输入"
            placeholderClass="item-placeholder"
            type="number"
            :formatter="formatterMonth"
          />
          <text class="item-text">天</text>
        </EraFormItem>
        <EraFormItem
          v-if="payType.includes(2)"
          class="modify-form__item"
          color="rgba(0, 0, 0, 0.85)"
          label="账期价格"
          prop="accountPrice"
          required
        >
          <u--input
            v-model.trim="formData.accountPrice"
            border="none"
            class="item-input m-r-6"
            color="rgba(0, 0, 0, 0.85)"
            inputAlign="right"
            placeholder="请输入"
            placeholderClass="item-placeholder"
            type="number"
            :formatter="formatterMoney"
          />
          <text class="item-text">元</text>
        </EraFormItem>
      </EraForm>
      <view class="modify-bottom flex flex-justify-between p-b-safe-area">
        <EraButton v-if="operationType === 'up'" circle text="申请上架" @click="confirm" />
        <block v-else>
          <EraButton circle size="small" text="取消" themeType="Default" @click="cancel" />
          <EraButton circle size="small" text="确定" @click="confirm" />
        </block>
      </view>
    </u-popup>
  </view>
</template>

<script>
  import { formatterHandle } from '@/common/helper'

  export default {
    name: 'ModifyPopup',
    props: {
      show: {
        type: Boolean,
        default: false,
      },
      operationType: {
        type: String,
        default: 'edit',
      },
    },
    data() {
      return {
        formData: {
          paymentForm: '', // 支付形式
          cashPrice: '', // 现金价格
          accountPrice: '', // 账期价格
          accountPeriodDays: '', // 账期天数
        },
        rules: {
          cashPrice: {
            required: true,
            message: '请输入修理厂现金价格',
            trigger: ['blur', 'change'],
          },
          accountPrice: {
            required: true,
            message: '请输入账期价格',
            trigger: ['blur', 'change'],
          },
          accountPeriodDays: {
            required: true,
            message: '请输入账期价格',
            trigger: ['blur', 'change'],
          },
        },
        payType: [1],
        info: '',
        formatterMonth: (value) => formatterHandle(value, 'int'),
        formatterMoney: (value) => formatterHandle(value, 'money'),
      }
    },
    methods: {
      init(info) {
        // console.log('open', info)
        this.info={}
        this.info = info
        if (info.accountPrice === 0) {
          info.accountPrice = ''
        }
        this.formData.cashPrice = info.cashPrice
        this.formData.accountPrice = info.accountPrice
        if (info.accountPeriodDays === 0) {
          info.accountPeriodDays = ''
        }
        this.formData.accountPeriodDays = info.accountPeriodDays
        if (info.accountPeriodDays) {
          this.payType = [1, 2]
        }
      },
      priceAlert() {},
      close() {
        this.$emit('update:show', false)
        // console.log('close');
      },
      cancel() {
        this.$emit('update:show', false)
      },
      confirm() {
        let params = {
          cashPrice: this.formData.cashPrice,
          id: this.info.id,
          violationStatus: this.operationType === 'up' ? 1 : 3,
        }
        if (this.payType.includes(2)) {
          params.accountPrice = this.formData.accountPrice
          params.accountPeriodDays = this.formData.accountPeriodDays
        }else{
          params.accountPrice = 0
          params.accountPeriodDays = 0
        }
        this.$VoHttp
          .apiGoodsUpdateAgent(params)
          .then((res) => {
            this.close()
            this.$emit('editSuccess')
          })
          .catch((err) => {
            uni.$u.toast(err.message || '操作失败')
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .modify {
    width: 750rpx;
    &-title {
      padding: 24rpx 32rpx;
      border-bottom: 2rpx solid $v-bg-light;
      line-height: 43rpx;
      font-weight: bold;
      font-size: 32rpx;
      &__width {
        width: 616rpx;
      }
    }
    &-form {
      padding: 0 32rpx 0 50rpx;
      margin-bottom: 8rpx;
      &__item {
        //padding: 0rpx 32rpx;
        box-sizing: border-box;
        text-align: right;
        border-bottom: 2rpx solid $v-bg-light;
        position: relative;
        .item-input {
          height: 48rpx;
          line-height: 150%;
        }
        .item-placeholder {
          text-align: right;
          color: $v-c0-25 !important;
          font-size: 32rpx;
        }
        .item-text {
          font-size: 32rpx;
          line-height: 48rpx;
          margin-left: 24rpx;
        }
        &.cash {
          height: 120rpx;
        }
        .item-group {
          margin-left: auto;
        }
      }
      &__block {
        height: 50rpx;
        line-height: 50rpx;
        text-align: right;
        font-size: 28rpx;
        color: #ee0a24;
        // border-bottom: 2rpx solid $v-bg-light;
        position: absolute;
        right: 0;
        bottom: 0;
        padding-bottom: 10rpx;
      }
      &__code {
        font-size: 32rpx;
        line-height: 1.5;
        color: var(--color-primary);
        margin-left: 44rpx;
      }
    }
    &-bottom {
      width: 100%;
      background: #ffffff;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
    }
  }
</style>
