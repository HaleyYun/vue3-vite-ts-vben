<template>
  <view class="new color-block fz-28">
    <VoNav is-fixed title="修改商品" is-have-more />
    <view class="padding-box fz-32 font-weight-500 m-t-16 bg-white">回收信息</view>
    <EraForm
      class="new-form"
      labelWidth="180"
      labelPosition="left"
      :model="formData"
      :rules="rules"
      ref="form"
    >
      <!-- 发动机型号不可修改 -->
      <EraFormItem
        class="new-form__item"
        label="发动机型号"
        prop="size"
        color="rgba(0, 0, 0, 0.85)"
        required
      >
        <u-input
          v-model="formData.size"
          class="item-input"
          type="text"
          placeholder=""
          placeholderClass="apply-form__placeholder color-block-25"
          border="none"
          inputAlign="right"
          fontSize="16px"
          color="rgba(0, 0, 0, 0.85)"
          readonly
        />
      </EraFormItem>
      <EraFormItem
        class="new-form__item"
        label="回收价格"
        prop="price"
        color="rgba(0, 0, 0, 0.85)"
        required
      >
        <u-input
          v-model="formData.price"
          class="item-input"
          type="text"
          placeholder="请输入"
          placeholderClass="apply-form__placeholder color-block-25"
          border="none"
          inputAlign="right"
          fontSize="16px"
          color="rgba(0, 0, 0, 0.85)"
        />
        <view class="fz-32">元</view>
      </EraFormItem>
    </EraForm>
    <view class="new-bottom p-b-safe-area">
      <EraButton circle text="提交" v-if="formData.size && formData.price" @click="complete" />
      <EraButton circle text="提交" disabled fontColor="rgba(255, 255, 255, 0.85)" v-else />
      <view class="p-b-safe-area" />
    </view>
    <view class="p-b-safe-area" />
  </view>
</template>

<script>
  import { showLoading, hideLoading } from "@/common/helper";

  export default {
    name: 'NewDeliveryTimeliness',
    data() {
      return {
        optionsId: null,
        isLoading: false,
        formData: {
          size: '', // *发动机型号
          price: '', // *回收价格
        },
        rules: {
          size: {
            type: 'string',
            required: true,
            message: '请输入发动机型号',
            trigger: ['blur', 'change'],
          },
          price: [
            {
              type: 'number',
              required: true,
              message: '不可为空',
              trigger: ['blur', 'change'],
            },
            {
              // 自定义验证函数
              validator: (rule, value, callback) => {
                return this.$vocenApi.Pattern.isMoney(value)
              },
              message: '格式错误',
              trigger: ['change', 'blur'],
            },
            {
              // 自定义验证函数
              validator: (rule, value, callback) => {
                let bool = Number(value) <= 0 ? false : true
                return bool
              },
              message: '回收价格过低',
              trigger: ['change', 'blur'],
            },
          ],
        },
      }
    },
    methods: {
      complete() {
        let param = {
          id: this.id,
          warehouseId: this.warehouseId,
          name: this.formData.warehouseName,
          orderStartTime: this.pickerStart,
          orderEndTime: this.pickerEnd,
          estimatedDelivery: this.pickerTime,
          areaCode: JSON.stringify(this.formData.areaCode),
        }
        if (this.isLoading) return
        this.isLoading = true
        showLoading()
        this.$VoHttp
          .apiWarehouseDelivery$Put(param)
          .then((res) => {
            uni.$u.toast('保存发货时效成功！')

            setTimeout(() => {
              this.$backFn()
            }, 1500)
          })
          .catch((e) => {
            uni.$u.toast(e.message || '请求失败')
          })
          .finally(() => {
            this.isLoading = false
            hideLoading()
          })
      },
    },
    onLoad(options) {
      this.optionsId = options.id
    },
    onShow() {},
  }
</script>

<style lang="scss" scoped>
  .new {
    width: 750rpx;
    min-height: 100vh;
    box-sizing: border-box;
    .padding-box {
      padding: 24rpx 32rpx;
      box-sizing: border-box;
    }
    &-form {
      padding: 0 32rpx;
      background: #ffffff;
      &__item {
        text-align: right;
        border-bottom: 2rpx solid $v-bg-light;
        padding-bottom: 10rpx;
        .item-code {
          margin-left: 24rpx;
        }
        .item-textarea {
          padding: 4rpx;
        }
      }
      &__time {
        width: 168rpx;
        height: 64rpx;
        background: $v-bg-light;
        border-radius: 8rpx;
        font-size: 26rpx;
        line-height: 64rpx;
        text-align: center;
        color: $v-c0-65;
      }
      &__to {
        width: 24rpx;
        height: 2rpx;
        background: $v-text-disabled;
        margin: 0 12rpx;
      }
      &__box {
        font-size: 32rpx;
        color: $v-c0-65;
        line-height: 150%;
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
        font-size: 32rpx !important;
      }
    }
    &-delete {
      width: 750rpx;
      height: 96rpx;
      line-height: 96rpx;
      background: #ffffff;
      margin-top: 24rpx;
      text-align: center;
      font-size: 32rpx;
      color: $v-c0-45;
    }
    &-bottom {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      background: #ffffff;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      border-top: 2rpx solid $v-bg-light;
    }
  }
  .color-gray {
    color: rgba(0, 0, 0, 0.25) !important;
  }
  .flex-end {
    justify-content: flex-end;
  }
</style>
