<template>
  <view>
    <view class="cancel flex flex-column">
      <VoNav is-fixed is-have-more title="注销供应商" />
      <view class="flex1 overflow-y">
        <!--  待处理时的头部样式  -->
        <view class="cancel-title">
          <view class="cancel-title__top">您的注销信息一提交成功，工作人员正在审核中</view>
          <view class="cancel-title__under color-block-65">
            预计<text class="c-required">20小时40分</text>后处理结束，请及时接听工作人员电话
          </view>
        </view>
        <!--  已拒绝时的头部样式  -->
        <view class="cancel-title">
          <view class="cancel-title__top">您的注销信息审核已拒绝，如有疑问请联系平台客服</view>
          <view class="cancel-title__under c-required">审核拒绝原因：存在订单未处理完毕，请处理完毕后重新发起</view>
        </view>
        <view class="cancel-info">
          <view class="cancel-info__title flex flex-justify-between">
            <view><text class="color-red">*</text>注销理由</view>
            <view class="color-block-65">注销理由内容</view>
          </view>
          <view class="cancel-info__con">
            <view class="fz-32"><text class="color-red">*</text>详情描述</view>
            <view class="con-describe">
              详情描述内容，详情描述内容详情描述内容，详情描述内容，详情描述内容详情描述内容，详情描述内容，详情描述内容，详情描述内容。
            </view>
          </view>
        </view>
        <view class="cancel-picture">
          <view class="fz-32 color-block m-b-24">上传图片</view>
          <image class="cancel-picture__img" src="/static/demo/good.png" />
        </view>
      </view>
      <view class="cancel-button">
        <EraButton circle text="撤销申请" @click="showModalCancel = true" />
        <view class="p-b-safe-area" />
      </view>
    </view>
    <VoModal
      :show="showModalCancel"
      :content="content"
      :showCancelButton="true"
      :closeOnClickOverlay="true"
      @confirm="confirm"
      @cancel="cancel"
    />
  </view>
</template>

<script>
  export default {
    name: 'CancelSupplierDetails',
    data() {
      return {
        showModalCancel: false, // 撤销模态框
        content: '确认要撤销吗？',
      }
    },
    methods: {
      /**
       *  打开
       */
      open() {
        this.showModalCancel = true
      },
      /**
       * 关闭
       */
      close() {
        this.showModalCancel = false
      },
      /**
       * 模态框点击确认按钮时触发
       */
      confirm() {
        this.close()
        uni.$u.toast('撤销成功！')
        setTimeout(() => {
          this.$backFn()
        }, 1500)
      },
      /**
       * 模态框点击取消按钮时触发
       */
      cancel() {
        this.close()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .cancel {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    &-title {
      width: 750rpx;
      height: 274rpx;
      text-align: center;
      background: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      &__top {
        line-height: 42rpx;
        font-weight: bold;
        font-size: 28rpx;
        color: $v-c0-85;
      }
      &__under {
        margin-top: 24rpx;
        line-height: 36rpx;
        font-size: 24rpx;
      }
    }
    &-info {
      margin-top: 16rpx;
      background: #fff;
      padding: 0 32rpx;
      box-sizing: border-box;
      &__title {
        padding: 24rpx 0;
        box-sizing: border-box;
        font-size: 32rpx;
        border-bottom: 2rpx solid $v-bg-light;
        color: $v-c0-85;
      }
      &__con {
        padding-top: 24rpx;
        .con-describe {
          //line-height: 44rpx;
          font-size: 28rpx;
          padding: 24rpx 0;
          box-sizing: border-box;
        }
      }
    }
    &-picture {
      margin-top: 16rpx;
      padding: 24rpx 0 24rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
      &__img {
        width: 218rpx;
        height: 218rpx;
        border-radius: 8rpx;
        overflow: hidden;
      }
    }
    &-button {
      width: 100%;
      background: #ffffff;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
    }
  }
</style>
