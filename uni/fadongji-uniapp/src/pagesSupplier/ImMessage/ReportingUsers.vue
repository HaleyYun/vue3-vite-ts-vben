<template>
  <view class="report flex flex-column">
    <VoNav :is-fixed="false" title="举报">

    </VoNav>
    <view class="report-content flex1 overflow-y">
      <view class="report-content__type">
        <view class="type-title">
          <text class="red m-r-2">*</text>
          请选择你想要举报的类型
        </view>
        <view
          v-for="info of labelList"
          :key="info.id"
          :class="info.selected ? 'select' : 'no-select'"
          class="type-button"
          @click="chooseFn(info.id)"
          >{{ info.name }}
        </view>
      </view>
      <view class="report-content__reason">
        <EraTextarea
          v-model="content"
          border="none"
          class="reason-textarea"
          count
          height="160"
          maxlength="500"
          placeholder="请输入申请理由"
          placeholderStyle="font-size: 30rpx;color: rgba(0, 0, 0, 0.25);"
        />
      </view>
      <view class="report-content__line" />
      <view class="report-content__upload reason-upload">
        <view class="upload-explain flex flex-justify-between flex-vertical-c">
          <view class="upload-explain__left">图片上传</view>
          <view class="upload-explain__right">{{ fileList1.length }}/9</view>
        </view>
        <view class="upload-pictures">
          <VoUpload
            :fileList="fileList1"
            :maxCount="9"
            :previewFullImage="true"
            height="108"
            multiple
            name="1"
            width="108"
            @success="uploadSuccess"
          >
            <image
              class="upload-pictures__img"
              mode="widthFix"
              src="/static/created/circle/upload_pictures.png"
            />
          </VoUpload>
        </view>
      </view>
    </view>
    <view class="report-bottom">
      <EraButton v-if="nextStep === true" circle text="提交" @click="submit()" />
      <EraButton v-else circle disabled text="提交" />
      <view class="safearea-box" />
    </view>
    <view class="safearea-box" />
  </view>
</template>

<script>
  import { hideLoading, showLoading } from '../../common/helper'

  export default {
    name: 'ReportingUsers',
    data() {
      return {
        content: '', // 双向绑定文本域
        labelList: [
          {
            id: 1,
            name: '广告内容',
            selected: false,
          },
          {
            id: 2,
            name: '冒充他人',
            selected: false,
          },
          {
            id: 3,
            name: '不友善内容',
            selected: false,
          },
          {
            id: 4,
            name: '虚假互动数据',
            selected: false,
          },
          {
            id: 5,
            name: '色情低俗',
            selected: false,
          },
          {
            id: 6,
            name: '违法违规',
            selected: false,
          },
          {
            id: 7,
            name: '其他',
            selected: false,
          },
        ],
        fileList1: [],
        nextStep: false, // 当nextStep为true时按钮变蓝色
      }
    },
    methods: {
      chooseFn(e) {
        // 多选
        // this.labelList.forEach((info) => {
        //   if (e === info.id) {
        //     info.selected = !info.selected
        //   }
        // })
        // 单选
        this.labelList.forEach((info) => {
          if (e === info.id) {
            info.selected = true
            this.nextStep = true
          } else {
            info.selected = false
          }
        })
      },
      uploadSuccess(e) {
        // console.warn(e, "9999999999")
        // let arr = e.map((item) => {
        //   return item.fileUrl
        // })
        this.videoSrc = ''
      },
      submit() {
        showLoading()
        setTimeout(() => {
          hideLoading()
          this.$u.toast('举报成功')
        }, 1000)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .report {
    width: 750rpx;
    height: 100vh;
    box-sizing: border-box;

    &-content {
      background: #ffffff;
      margin-top: 16rpx;

      &__type {
        padding: 24rpx 0;
        margin: 0 32rpx;
        border-bottom: 2rpx solid $v-bg-light;

        .type-title {
          height: 48rpx;
          font-size: 32rpx;
          line-height: 48rpx;
          color: $v-c0-85;
        }

        .type-button {
          width: 284rpx;
          height: 60rpx;
          line-height: 60rpx;
          text-align: center;
          font-size: 24rpx;
          border-radius: 80rpx;
          display: inline-block;
          margin-right: 48rpx;
          margin-top: 24rpx;
        }
      }

      &__reason {
        width: 750rpx;
        //height: 356rpx;
        padding: 6rpx 14rpx;
        box-sizing: border-box;

        .reason-textarea {
          width: 686rpx;
          font-size: 28rpx;
          line-height: 150%;
          color: $v-c0-85;
        }
      }

      &__line {
        background-color: $v-bg-light;
        width: 686rpx;
        height: 2rpx;
        margin-left: 32rpx;
      }

      &__upload {
        padding: 24rpx 0;

        .upload-explain {
          width: 686rpx;
          height: 48rpx;
          line-height: 48rpx;
          margin: 0 32rpx;

          &__left {
            font-size: 32rpx;
            color: $v-c0-85;
          }

          &__right {
            font-size: 28rpx;
            color: $v-c0-85;
          }
        }

        .upload-pictures {
          margin-top: 32rpx;
          padding-left: 32rpx;
          padding-right: 16rpx;

          &__img {
            width: 108px;
            height: 108px;
          }
        }
      }
    }

    &-bottom {
      width: 100%;
      background: #ffffff;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      border-top: 2rpx solid $v-bg-light;
    }
  }

  .red {
    color: $v-error;
  }

  .no-select {
    background: #f2f2f2;
    color: #262626;
    border: 2rpx solid transparent;
  }

  .select {
    background: rgba(229, 0, 18, 0.1);
    border: 2rpx solid $color-primary-yellow;
    color: $color-primary-yellow;
  }
</style>
