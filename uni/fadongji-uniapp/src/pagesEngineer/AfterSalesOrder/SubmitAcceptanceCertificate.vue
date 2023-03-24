<template>
  <view class="sub flex flex-column">
    <VoNav is-fixed is-have-more title="提交上门结果" />
    <view class="flex1 overflow-y">
      <view class="sub-top">鉴定结果</view>
      <view class="sub-con">
        <view class="sub-con__tips">上门指导：{{ deatilInfo.homeMsg }}</view>
        <!--        <view class="sub-con__code flex flex-vertical-c">-->
        <!--          <vire class="fz-32">*发动机识别码：</vire>-->
        <!--          <u-input :border="0"></u-input>-->
        <!--          <VoIcon></VoIcon>-->
        <!--        </view>-->
        <EraForm
          ref="form"
          :model="formData"
          :rules="rules"
          class="sub-form"
          labelPosition="left"
          labelWidth="122"
        >
          <EraFormItem
            class="sub-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="发动机识别码："
            prop="identifyCode"
            required
          >
            <u-input
              v-model.trim="formData.identifyCode"
              border="none"
              class="item-input"
              color="rgba(0, 0, 0, 0.85)"
              fontSize="16px"
              inputAlign="left"
              placeholder="可手动输入"
              placeholderClass="apply-form__placeholder color-block-25"
              type="text"
            />
            <VoIcon :size="24" name="scan-not-vin" @click="vin" />
          </EraFormItem>
        </EraForm>
        <view class="sub-con__name flex flex-justify-between flex-vertical-c">
          <view class="name-left">上传故障原因视频：</view>
          <view class="name-right">{{ uploadVideo.length }}/3</view>
        </view>
        <view class="sub-con__pictures border">
          <VoFormUpload
            :limit="3"
            :source.sync="uploadVideo"
            :video-limit="3"
            btnText="上传视频"
            uploadType="video"
            @change="uploadVideoImgHandler"
          />
        </view>
        <view class="sub-con__name flex flex-justify-between flex-vertical-c">
          <view class="name-left">上传鉴定结果图片：</view>
          <view class="name-right">{{ uploadImage.length }}/6</view>
        </view>
        <view class="sub-con__pictures border">
          <VoFormUpload
            :limit="6"
            :source.sync="uploadImage"
            :video-limit="0"
            btnText="上传图片"
            uploadType="image"
            @change="uploadImageImgHandler"
          />
        </view>
      </view>
    </view>
    <view
      v-if="formData.identifyCode && uploadVideo.length > 0 && uploadImage.length > 0"
      class="sub-bottom"
    >
      <EraButton circle @click="toSubmit" />
      <VoSafetyArea :is-fixed="false" />
    </view>
    <view v-else class="sub-bottom">
      <EraButton circle disabled />
      <VoSafetyArea :is-fixed="false" />
    </view>
  </view>
</template>

<script>
  import { chooseImageOcrByPromise } from '@/common/helper'

  export default {
    name: 'SubmitAcceptanceCertificate',
    data() {
      return {
        optionsId: '',
        deatilInfo: '',
        uploadVideo: [],
        uploadImage: [],
        formData: {
          identifyCode: '', // 发动机识别码
        },
        rules: {
          identifyCode: {
            type: 'string',
            required: true,
            message: '请输入发动机识别码',
            trigger: ['blur'],
          },
        },
        isLoading: false,
      }
    },
    onLoad(options) {
      this.optionsId = options.id
      this.getDetail()
    },
    methods: {
      // 扫一扫
      vin() {
        if (!this.$checkIsApproveFn()) {
          this.showApprove = true
          return
        }
        // if (this.isLoading) return
        // this.isLoading = !this.isLoading
        chooseImageOcrByPromise({
          count: 1,
          sizeType: ['compressed'],
          tip: '正在识别',
          apiUrl: '/v1/api/business/vehicle/brand/cylinderOcr',
        })
          .then((res) => {
            console.log(res)
            const data = JSON.parse(res.data)
            if (+data.code === 20001) {
              if (data.data && data.data.length) {
                this.formData.identifyCode = data.data
              }
            } else {
              this.$u.toast(data.message || '网络错误')
            }
          })
          .catch((err) => {
            if (!err.errMsg) {
              this.$u.toast(err.message || '网络错误')
            }
          })
          .finally(() => {
            // this.isLoading = !this.isLoading
          })
      },
      // 上传视频
      uploadVideoImgHandler(res) {
        console.log(res, 'uploadVideoImgHandler')
        this.uploadVideo = res
      },
      // 上传图片
      uploadImageImgHandler(res) {
        console.log(res, 'uploadImageImgHandler')
        this.uploadImage = res
      },
      getDetail() {
        // 获取订单详情
        this.$VoHttp
          .apiOrderSupportAfterSaleDetail$Id({ id: this.optionsId })
          .then((res) => {
            if (res.data) {
              let data = res.data
              this.deatilInfo = data
            }
          })
          .catch((err) => {
            this.$u.toast(err.message || '获取信息失败')
          })
      },
      //提交
      toSubmit() {
        if (this.isLoading) {
          return
        }
        this.isLoading = true
        //待上门
        if (this.deatilInfo.status === 3140) {
          this.visitFn()
        } else {
          this.postFn()
        }
      },
      postFn() {
        let params = {
          req: {
            engineNo: this.formData.identifyCode,
            id: this.optionsId,
            pic: this.uploadImage.map((item) => item.src),
            video: JSON.stringify(this.uploadVideo),
          },
        }
        console.log('params', params)
        this.$VoHttp
          .apiOrderSupportAfterSaleResultCommit(params)
          .then(() => {
            this.$u.toast('提交成功')
            setTimeout(() => {
              uni.reLaunch({
                url: '/pages/EngineerCenter/EngineerTabbar?tabbarVal=1',
              })
            })
          })
          .catch((err) => {
            this.$u.toast(err.message || '提交失败')
          })
          .finally(() => {
            this.isLoading = false
          })
      },
      visitFn() {
        this.$VoHttp
          .apiOrderSupportAfterSaleVisit({ id: this.optionsId })
          .then(() => {
            this.postFn()
          })
          .catch((err) => {
            this.$u.toast(err.message || '上门失败')
            this.isLoading = false
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .sub {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    &-top {
      padding: 24rpx 32rpx;
      font-size: 28rpx;
      line-height: 42rpx;
      color: $v-c0-65;
    }
    &-form {
      border-bottom: 2rpx solid $v-bg-light;
      &__item {
        .item-input {
          margin-right: 10rpx;
        }
        &__placeholder {
          text-align: left;
          color: $v-c0-25 !important;
        }
      }
    }
    &-con {
      padding: 32rpx 32rpx 0;
      box-sizing: border-box;
      background: #fff;
      &__tips {
        line-height: 42rpx;
        padding-bottom: 24rpx;
        font-size: 32rpx;
        color: $v-c0-85;
        border-bottom: 2rpx solid $v-bg-light;
      }
      &__code {
        color: $v-c0-85;
        padding: 24rpx 0;
        border-bottom: 2rpx solid $v-bg-light;
      }
      &__name {
        width: 686rpx;
        height: 48rpx;
        line-height: 48rpx;
        margin: 32rpx 0 24rpx 0;
        .name-left {
          font-weight: 500;
          font-size: 32rpx;
          color: $v-c0-85;
        }
        .name-right {
          font-size: 28rpx;
          color: $v-c0-45;
        }
      }
      &__pictures {
        padding-bottom: 32rpx;
        &.border {
          border-bottom: 2rpx solid $v-bg-light;
        }
      }
    }
    &-bottom {
      width: 100%;
      background: #ffffff;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
    }
    .color-star {
      color: #f56c6c;
    }
  }
</style>
