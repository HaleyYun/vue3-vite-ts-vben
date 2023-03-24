<template>
  <view class="new color-block fz-28">
    <VoNav is-fixed title="申请型号" is-have-more></VoNav>
    <EraForm
      class="new-form"
      labelWidth="180"
      labelPosition="left"
      :model="formData"
      :rules="rules"
      ref="form"
    >
      <EraFormItem
        class="new-form__item m-t-16 m-b-16 text-right"
        label="型号名称"
        prop="applyModel"
        color="rgba(0, 0, 0, 0.85)"
        required
      >
        <u-input
          v-model.trim="formData.applyModel"
          class="item-input font-weight-500"
          type="text"
          maxlength="20"
          placeholder="请输入型号名称"
          placeholderClass="apply-form__placeholder color-block-25"
          border="none"
          inputAlign="right"
          fontSize="16px"
          color="rgba(0, 0, 0, 0.85)"
          @blur="checkRecord"
          :adjustPosition="false"
        />
      </EraFormItem>
      <view class="padding-box fz-32 font-weight-500 bg-white">申请理由</view>
      <EraFormItem class="new-form__item" color="rgba(0, 0, 0, 0.85)">
        <EraTextarea
          class="text-area"
          v-model.trim="formData.applyReason"
          placeholder=""
          maxlength="200"
          border="none"
          height="160"
          count
          countStyle="background: inherit;color: rgba(0, 0, 0, 0.25);font-size:28rpx"
        />
      </EraFormItem>
    </EraForm>
    <view class="new-bottom p-b-safe-area">
      <EraButton circle text="提交" v-if="formData.applyModel" @click="complete" />
      <EraButton circle text="提交" disabled v-else />
      <view class="p-b-safe-area" />
    </view>
    <VoModal
      :show="showModal"
      :content="content"
      :showCancelButton="true"
      :closeOnClickOverlay="true"
      :confirmText="confirmText"
      cancelText="申请其他型号"
      @confirm="confirmFn"
      @cancel="showModal = false"
    />
    <view class="p-b-safe-area" />
  </view>
</template>

<script>
  import { showLoading, hideLoading } from "@/common/helper"

  export default {
    name: 'NewDeliveryTimeliness',
    data() {
      return {
        optionsId: '',
        isLoading: false,
        formData: {
          applyModel: '', // *发动机型号
          applyReason: '', // *申请原因
          source: 1, // 页面跳转来源: 1、发布回收商品；旧机再售商品
        },
        rules: {
          applyModel: {
            type: 'string',
            required: true,
            message: '请输入发动机型号',
            trigger: ['blur'],
          },
        },
        content: '',
        confirmText: '',
        showModal: false,
        existRecord: {}, // 已存在数据
      }
    },
    methods: {
      // 已存在弹窗跳转判断
      confirmFn() {
        if (this.confirmText === '查看详情') {
          this.$linkToEasy(`./TypeRecordDetail?id=${this.existRecord.applyId}`)
        } else if (this.confirmText === '立即使用') {
          uni.$emit('select', {
            model: this.formData.applyModel,
            id: this.existRecord.applyId,
          })
          uni.navigateBack({
            delta: 2,
          })
        }
      },
      // 校验型号
      async checkRecord(e) {
        if (this.isLoading || !e) {
          return
        }
        console.log(e);
        this.isLoading = true
        showLoading()
        try {
          const { data } = await this.$VoHttp.apiGoodsModelApplyCheck({ model: e })
          this.existRecord = data
          if (data.isExist) {
            //所填型号名称已存在列表中
            this.showModal = true
            this.confirmText = '立即使用'
            this.content = `${e}型号已存在，是否立即使用？`
          } else if (data.isApply) {
            this.showModal = true
            this.confirmText = '查看详情'
            this.content = `您已申请过该型号`
          }
        } catch (e) {
          this.$u.toast(e.message || '网络请求失败')
        }
        this.isLoading = false
        hideLoading()
      },
      //提交
      async complete() {
        if (this.isLoading) {
          return
        }
        this.isLoading = true
        showLoading()
        console.log(this.formData)
        try {
          const data = await this.$VoHttp.apiGoodsModelApplySave(this.formData)
          this.$u.toast('提交成功，审核通过后即可使用。')
          setTimeout(() => {
            if (this.formData.source === 1) {
              this.$linkToEasy(`./GoodsAdd`)
            } else {
              this.$linkToEasy(`/pagesRecovery/SellGood/ReleaseSellGood/ReleaseSellGood`)
            }
          }, 1500)
        } catch (e) {
          this.$u.toast(e.message || '网络请求失败')
        }
        this.isLoading = false
        hideLoading()
      },
    },
    onLoad(options) {
      this.formData.source = Number(options.origin) || 1
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
    .text-area {
      background: #f7f7f8;
      border-radius: 8rpx;
      padding-bottom: 48rpx;
    }
    &-form {
      &__item {
        padding-bottom: 10rpx;
        background: #ffffff;
        padding: 0 32rpx;
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
