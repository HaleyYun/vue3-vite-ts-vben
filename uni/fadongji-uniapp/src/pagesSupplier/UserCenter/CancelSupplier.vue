<template>
  <view>
    <view
      :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
      class="cancel flex flex-column"
    >
      <VoNav :is-fixed="false" :left-width="190" :right-width="190" :title="title" is-have-more>
        <template #operation>
          <view class="cancel-complete disable m-r-24" @click="historyApply">历史申请</view>
        </template>
      </VoNav>
      <view class="flex1 overflow-y bg-white">
        <view class="cancel-tips">
          <image class="cancel-tips__img" src="/static/created/UserCenter/group.png" />
          <view class="cancel-tips__word">注销后会清除当前角色信息，请慎重操作！</view>
        </view>
        <EraForm
          ref="form"
          :model="formData"
          :rules="rules"
          class="cancel-form m-t-16"
          labelPosition="left"
          labelWidth="130"
        >
          <EraFormItem
            class="cancel-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="注销理由"
            prop="reason"
            required
          >
            <view class="add-form__placeholder flex1" @click="roleShow = true">
              <view v-if="formData.reason">{{ formData.reason }}</view>
              <view v-else class="color-block-25 flex1">请选择注销理由</view>
            </view>
            <VoIcon :opacity="0.25" class="m-l-8" name="right-arrow" />
          </EraFormItem>
          <view class="cancel-form__text">
            <text class="text-star">*</text>
            <text>详情描述</text>
          </view>
          <view class="cancel-form__textarea">
            <textarea
              v-model="formData.describe"
              class="textarea-text"
              maxlength="500"
              placeholder="请输入详情描述"
              placeholder-style="font-size: 28rpx;color: rgba(0, 0, 0, 0.25);"
            ></textarea>
            <view class="textarea-num">{{ formData.describe.length }}/500</view>
          </view>
        </EraForm>
        <view class="cancel-upload">
          <view class="cancel-upload__name flex flex-justify-between flex-vertical-c">
            <view class="name-left">图片上传</view>
            <view class="name-right">{{ fileList1.length }}/9</view>
          </view>
          <view class="cancel-upload__format">支持png.jpg.jpge.格式</view>
          <view class="cancel-upload__pictures">
            <VoUpload
              :fileList="fileList1"
              :maxCount="9"
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
      <view class="cancel-button">
        <EraButton
          v-if="formData.describe && formData.reason"
          circle
          fontSize="32rpx"
          text="提交注销申请"
          @click="showModalCancel = true"
        />
        <EraButton v-else circle disabled fontSize="32rpx" text="提交注销申请" />
        <view class="p-b-safe-area" />
      </view>
    </view>
    <u-picker-era
      :columns="roleArr"
      :defaultIndex="[1]"
      :show="roleShow"
      cancelColor="rgba(0, 0, 0, 0.45)"
      confirmColor="#22284B"
      keyName="roleName"
      title="注销理由"
      @cancel="roleShow = false"
      @confirm="confirmRole"
    />
    <VoModal
      :closeOnClickOverlay="true"
      :content="content"
      :show="showModalCancel"
      :showCancelButton="true"
      @cancel="cancel"
      @confirm="confirm"
    />
  </view>
</template>

<script>
  export default {
    name: 'CancelSupplier',
    data() {
      return {
        formData: {
          reason: '', // 注销理由 (返回的当前picker选择的值)
          describe: '', // 详情描述
        },
        rules: {
          reason: {
            required: true,
            message: '请选择注销理由',
            trigger: ['blur', 'change'],
          },
        },
        title: '注销供应商',
        fileList1: [],
        roleShow: false, // 选择器默认收起
        roleArr: [['注销理由选项', '注销理由选项', '注销理由选项', '注销理由选项', '注销理由选项']],
        showModalCancel: false, // 删除模态框
        content: '确认要提交吗？',
      }
    },
    onLoad(option) {
      console.log(option)
      this.title = option.title
    },
    methods: {
      uploadSuccess() {
        this.videoSrc = ''
      },
      /**
       * picker点击确定按钮返回当前单列选择的值
       */
      confirmRole(e) {
        this.roleShow = false
        this.formData.reason = e.value[0]
      },
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
        uni.$u.toast('提交成功！')
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
      /**
       * 点击历史申请
       */
      historyApply() {
        this.$linkToEasy('/pagesSupplier/UserCenter/HistoryApply')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .cancel {
    width: 750rpx;
    height: 100vh;
    &-complete {
      width: 120rpx;
      height: 36rpx;
      line-height: 36rpx;
      text-align: center;
      font-weight: bold;
      font-size: 24rpx;
      color: $color-primary-yellow;
      border: 2rpx solid $color-primary-yellow;
      padding: 10rpx 0;
      background: #fffff;
      border-radius: 100rpx;
    }
    &-tips {
      background: #fff;
      text-align: center;
      padding: 44rpx;
      box-sizing: border-box;
      &__img {
        width: 120rpx;
        height: 120rpx;
      }
      &__word {
        height: 42rpx;
        line-height: 42rpx;
        font-weight: bold;
        font-size: 28rpx;
        color: $v-c0-85;
      }
    }
    &-form {
      padding: 0 32rpx 0 48rpx;
      background: #ffffff;
      &__item {
        text-align: right;
        border-bottom: 2rpx solid $v-bg-light;
        .item-input {
          padding: 4rpx;
        }
      }
      &__text {
        position: relative;
        height: 48rpx;
        font-size: 32rpx;
        line-height: 48rpx;
        color: $v-c0-85;
        margin-top: 36rpx;
        .text-star {
          position: absolute;
          left: -16rpx;
          top: 2rpx;
          color: #e50012;
        }
      }
      &__placeholder {
        text-align: right;
        color: $v-c0-25 !important;
        font-size: 32rpx !important;
      }
      &__textarea {
        border-bottom: 2rpx solid $v-bg-light;
        padding: 12rpx 0 16rpx;
        .textarea-text {
          width: 100%;
        }
        .textarea-num {
          font-size: 28rpx;
          margin-top: 8rpx;
          text-align: right;
          color: $v-c0-85;
        }
      }
    }
    &-upload {
      padding: 40rpx 0;
      background: #fff;
      box-sizing: border-box;
      &__name {
        width: 686rpx;
        height: 48rpx;
        line-height: 48rpx;
        margin: 0 32rpx 0 32rpx;
        .name-left {
          font-size: 32rpx;
          color: $v-c0-85;
        }
        .name-right {
          font-size: 28rpx;
          color: $v-c0-85;
        }
      }
      &__format {
        height: 42rpx;
        line-height: 42rpx;
        font-size: 28rpx;
        color: $v-c0-25;
        margin-left: 32rpx;
        margin-top: 12rpx;
      }
      &__pictures {
        margin-top: 24rpx;
        padding-left: 32rpx;
        padding-right: 16rpx;
        .pictures-img {
          width: 218rpx;
          height: 218rpx;
        }
      }
    }
    &-button {
      width: 100%;
      background: #ffffff;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      border-top: 2rpx solid $v-bg-light;
    }
  }
</style>
