<template>
  <view class="new color-block fz-28">
    <VoNav is-fixed :title="navTitle" is-have-more />
    <view class="new-top bg-white m-t-16 m-b-16 flex">
      <view class="flex1">
        <view class="fz-32 font-weight-500 m-b-24">
          <template v-if="info.status === 1">审核中...</template>
          <template v-else-if="info.status === 2">审核通过</template>
          <template v-else-if="info.status === 3">审核不通过原因</template>
        </view>
        <!-- 审核通过 -->
        <view v-if="info.approvalReason" class="m-b-24">{{ info.approvalReason }}</view>
        <view class="color-block-65">{{ info.updateTime || info.createTime }}</view>
      </view>
      <!-- 审核中 -->
      <image v-if="info.status === 1" class="sys-img" src="/static/icons/sys1.png" />
      <!-- 审核通过 -->
      <image v-else-if="info.status === 2" class="sys-img" src="/static/icons/sys2.png" />
      <!-- 审核不通过 -->
      <image v-else-if="info.status === 3" class="sys-img" src="/static/icons/sys3.png" />
    </view>
    <EraForm
      class="new-form"
      labelWidth="180"
      labelPosition="left"
      :model="formData"
      :rules="rules"
      ref="form"
    >
      <EraFormItem
        class="new-form__item m-t-16 text-right"
        label="型号名称"
        prop="size"
        color="rgba(0, 0, 0, 0.85)"
        required
      >
        <u-input
          v-model="info.applyModel"
          class="item-input font-weight-500"
          type="text"
          maxlength="20"
          placeholder=""
          placeholderClass="apply-form__placeholder color-block-25"
          border="none"
          inputAlign="right"
          fontSize="16px"
          color="rgba(0, 0, 0, 0.85)"
          readonly
        />
      </EraFormItem>
      <view class="padding-box fz-32 font-weight-500 bg-white">申请理由</view>
      <EraFormItem class="new-form__item" color="rgba(0, 0, 0, 0.85)">
        <EraTextarea
          class="text-area"
          v-model="info.applyReason"
          placeholder=""
          maxlength="200"
          border="none"
          height="160"
          countStyle="background: inherit;color: rgba(0, 0, 0, 0.25);font-size:28rpx"
          disabled
        />
      </EraFormItem>
      <EraFormItem
        class="new-form__item text-right"
        label="申请时间"
        prop="size"
        color="rgba(0, 0, 0, 0.85)"
      >
        <u-input
          v-model="info.createTime"
          class="item-input font-weight-500"
          type="text"
          maxlength="20"
          placeholder=""
          placeholderClass="apply-form__placeholder color-block-25"
          border="none"
          inputAlign="right"
          fontSize="16px"
          color="rgba(0, 0, 0, 0.85)"
          readonly
        />
      </EraFormItem>
<!--      <EraFormItem-->
<!--        v-if="info.updateTime !== info.createTime"-->
<!--        class="new-form__item text-right"-->
<!--        label="通过时间"-->
<!--        prop="size"-->
<!--        color="rgba(0, 0, 0, 0.85)"-->
<!--      >-->
<!--        <u-input-->
<!--          v-model="info.updateTime"-->
<!--          class="item-input font-weight-500"-->
<!--          type="text"-->
<!--          maxlength="20"-->
<!--          placeholder=""-->
<!--          placeholderClass="apply-form__placeholder color-block-25"-->
<!--          border="none"-->
<!--          inputAlign="right"-->
<!--          fontSize="16px"-->
<!--          color="rgba(0, 0, 0, 0.85)"-->
<!--          readonly-->
<!--        />-->
<!--      </EraFormItem>-->
      <EraFormItem
        class="new-form__item text-right"
        label="申请人"
        prop="size"
        color="rgba(0, 0, 0, 0.85)"
      >
        <u-input
          v-model="userInfo.storeName"
          class="item-input font-weight-500"
          type="text"
          maxlength="20"
          placeholder=""
          placeholderClass="apply-form__placeholder color-block-25"
          border="none"
          inputAlign="right"
          fontSize="16px"
          color="rgba(0, 0, 0, 0.85)"
          readonly
        />
      </EraFormItem>
    </EraForm>
    <!-- <view class="new-bottom p-b-safe-area">
      <EraButton circle text="提交" v-if="formData.typeName" @click="complete" />
      <EraButton circle text="提交" disabled v-else />
      <view class="p-b-safe-area" />
    </view> -->
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
  import { showLoading, hideLoading } from '@/common/helper'

  export default {
    name: 'NewDeliveryTimeliness',
    data() {
      return {
        applyId: '',
        isLoading: false,
        formData: {
          typeName: '测试', // *发动机型号
          reason: '测试', // 申请理由
          applyPeople: '213',
          applyTime: '2022-3-24 12:23:34',
          passTime: '2022-3-24 12:23:34',
        },
        rules: {
          typeName: {
            type: 'string',
            required: true,
            message: '请输入发动机型号',
            trigger: ['blur', 'change'],
          },
        },
        content: '',
        confirmText: '',
        showModal: false,
        navTitle: '',
        info: {},
      }
    },
    methods: {
      // 获取详情数据
      async getData() {
        showLoading()
        try {
          const { data } = await this.$VoHttp.apiGoodsModelApplyView({ applyId: this.applyId })
          if (data.status === 1) {
            this.navTitle = '审核中'
          } else if (data.status === 2) {
            this.navTitle = '审核通过'
          } else if (data.status === 3) {
            this.navTitle = '审核失败'
          }
          console.log(data)
          this.info = data
        } catch (e) {
          this.$u.toast(e.message || '网络请求失败')
        }
        hideLoading()
      },
      confirmFn() {
        this.$linkToEasy(`/pagesRecovery/GoodsRecycle/GoodsAdd?typeName=${this.formData.typeName}`)
      },
      //申请记录
      toRecord() {
        this.$linkToEasy(`/pagesRecovery/GoodsRecycle/TypeRecord`)
      },
      //提交
      complete() {
        //所填型号名称已存在列表中
        this.showModal = true
        this.confirmText = '立即使用'
        this.content = `${this.formData.typeName}型号已存在，是否立即使用？`
        //已申请过该型号
        // this.confirmText = '查看详情'
        // this.content = `您已申请过该型号`
        // let param = {
        //   id: this.id,
        //   warehouseId: this.warehouseId,
        //   name: this.formData.warehouseName,
        //   orderStartTime: this.pickerStart,
        //   orderEndTime: this.pickerEnd,
        //   estimatedDelivery: this.pickerTime,
        //   areaCode: JSON.stringify(this.formData.areaCode),
        // }
        // if (this.isLoading) return
        // this.isLoading = true
        // this.$VoHttp
        //   .apiWarehouseDelivery$Put(param)
        //   .then((res) => {
        //     uni.$u.toast('保存发货时效成功！')

        //     setTimeout(() => {
        //       this.$backFn()
        //     }, 1500)
        //   })
        //   .catch((e) => {
        //     uni.$u.toast(e.message || '请求失败')
        //   })
        //   .finally(() => {
        //     this.isLoading = false
        //   })
      },
    },
    onLoad(options) {
      this.applyId = options.id || ''
      this.getData()
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
    }
    .record-icon {
      width: 48rpx;
      height: 48rpx;
      margin-right: 32rpx;
    }
    &-top {
      padding: 40rpx 32rpx;
      box-sizing: border-box;
      position: relative;
      .sys-img {
        width: 176rpx;
        height: 176rpx;
        position: absolute;
        right: 32rpx;
        top: 0;
      }
    }
    &-form {
      &__item {
        padding-bottom: 10rpx;
        background: #ffffff;
        padding: 0 32rpx;
        border-bottom: 2rpx solid #f7f7f8;
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
