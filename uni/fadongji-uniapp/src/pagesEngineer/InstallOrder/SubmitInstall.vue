<template>
  <view class="sub flex flex-column">
    <VoNav is-fixed is-have-more title="提交安装凭证" />
    <view class="flex1 overflow-y">
      <view class="sub-top">完成情况</view>
      <view class="sub-con">
        <view class="sub-con__tips"
          >安装完成标准：发动及怠速正常、无异响、无漏水漏油、无故障码</view
        >
        <view class="sub-con__name flex flex-justify-between flex-vertical-c">
          <view class="name-left">上传安装完成视频：</view>
          <!-- <view class="name-right">{{ productDetail.length }}/3</view> -->
        </view>
        <view class="sub-con__pictures">
          <VoFormUpload
            :limit="1"
            :source.sync="productDetail"
            :video-limit="1"
            btnText="上传视频"
            uploadType="video"
            @change="productDetailImgHandler"
          />
          <!--          <view @click="uploadVideo">-->
          <!--            <image-->
          <!--              class="pictures-img"-->
          <!--              mode="widthFix"-->
          <!--              src="/static/oldbuyer/technical_workers/upload_video.png"-->
          <!--            />-->
          <!--          </view>-->
        </view>
      </view>
    </view>
    <view v-if="productDetail.length > 0" class="sub-bottom">
      <EraButton circle @click="submitFn" />
      <VoSafetyArea :is-fixed="false" />
    </view>
    <view v-else class="sub-bottom">
      <EraButton circle disabled />
      <VoSafetyArea :is-fixed="false" />
    </view>
  </view>
</template>

<script>
  export default {
    name: 'SubmitInstall',
    data() {
      return {
        productDetail: [],
        optionsId: '',
        isLoading: false,
      }
    },
    onLoad(options) {
      this.optionsId = options.id
    },
    methods: {
      // 上传视频
      productDetailImgHandler(res) {
        console.log(res, 'woshi')
        this.productDetail = res
      },
      submitFn() {
        if (this.isLoading) {
          return
        }
        let obj = {
          pic: this.productDetail,
        }
        let installVoucher = JSON.stringify(obj)
        this.isLoading = true
        this.$VoHttp
          .apiOrderTechnicianInstallSubmit({ id: this.optionsId, installVoucher: installVoucher })
          .then((res) => {
            this.$u.toast('提交成功')
            setTimeout(() => {
              // this.$backFn()
              uni.reLaunch({
                url: '/pages/EngineerCenter/EngineerTabbar?tabbarVal=1',
              })
            }, 2000)
          })
          .catch((err) => {
            this.$u.toast(err.message || '提交失败')
          })
          .finally(() => {
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
    &-con {
      padding: 32rpx 32rpx 0;
      box-sizing: border-box;
      background: #fff;
      &__tips {
        line-height: 42rpx;
        padding-bottom: 32rpx;
        margin-right: 32rpx;
        font-size: 28rpx;
        color: $v-c0-65;
        border-bottom: 2rpx solid $v-bg-light;
      }
      &__name {
        width: 686rpx;
        height: 48rpx;
        line-height: 48rpx;
        margin: 32rpx 0 24rpx 0;
        .name-left {
          font-weight: bold;
          font-size: 32rpx;
          color: $v-c0-85;
        }
        .name-right {
          font-size: 28rpx;
          color: $v-c0-85;
        }
      }
      &__pictures {
        padding-bottom: 32rpx;
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
