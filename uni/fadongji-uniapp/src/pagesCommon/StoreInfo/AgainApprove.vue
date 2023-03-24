<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="uploaded p-b-safe-area"
  >
    <!--  顶部导航栏模块：start  -->
    <VoNav title="提交认证信息" is-have-more />
    <!--  步骤二模块：start  -->
    <view v-if="+formData.failureStatus===2||+formData.failureStatus===3">
      <!--  上传照片模块：start  -->
      <UploadPhotos :twoPhotos="true" :upPhoto="twoPhotosList" @upload="uploadCardIs" @uploadSecond="uploadCardNo" />
      <!--  上传照片模块：end  -->

      <view class="h26"></view>
      <!--  上传照片模块：start  -->

      <!--  温馨提示模块：start  -->
<!--      <WarmPrompt  />-->
      <!--  温馨提示模块：end  -->
      <!--  企业信息模块：start  -->
<!--      <EraForm-->
<!--        ref="form"-->
<!--        class="uploaded-form"-->
<!--        labelPosition="left"-->
<!--        labelWidth="128"-->
<!--      >-->
<!--        <EraFormItem-->
<!--          class="uploaded-form__item"-->
<!--          color="rgba(0, 0, 0, 0.85)"-->
<!--          label="身份证号"-->
<!--          prop="IDCard"-->
<!--        >-->
<!--          <u&#45;&#45;input-->
<!--            v-model="formData.legalId"-->
<!--            border="none"-->
<!--            disabled-->
<!--            disabledColor="#ffffff"-->
<!--            fontSize="16px"-->
<!--            inputAlign="right"-->
<!--            placeholder="请输入身份证号"-->
<!--            placeholderClass="uploaded-form__placeholder"-->
<!--          />-->
<!--        </EraFormItem>-->
<!--        <EraFormItem-->
<!--          class="uploaded-form__item"-->
<!--          color="rgba(0, 0, 0, 0.85)"-->
<!--          label="身份证有效期"-->
<!--        >-->
<!--          <view  class="flex flex1 flex-end">-->
<!--            <view class="uploaded-form__word" >{{-->
<!--                formData.legalStartDate-->
<!--              }}-->
<!--            </view>-->
<!--            <view class="uploaded-form__word m-l-16 m-r-16">至</view>-->
<!--            <view class="uploaded-form__word"  >{{-->
<!--                formData.legalEndDate-->
<!--              }}-->
<!--            </view>-->
<!--          </view>-->
<!--        </EraFormItem>-->
<!--        <EraFormItem-->
<!--          class="uploaded-form__item"-->
<!--          color="rgba(0, 0, 0, 0.85)"-->
<!--          label="姓名"-->
<!--          prop="name"-->
<!--        >-->
<!--          <u-input-->
<!--            disabled-->
<!--            v-model="formData.fullName"-->
<!--            border="none"-->
<!--            class="item-input"-->
<!--            color="rgba(0, 0, 0, 0.85)"-->
<!--            fontSize="16px"-->
<!--            inputAlign="right"-->
<!--            placeholder="请输入您的姓名"-->
<!--            placeholderClass="uploaded-form__placeholder"-->
<!--          />-->
<!--        </EraFormItem>-->
<!--      </EraForm>-->
      <!--  企业信息模块：end  -->
    </view>
    <!--  步骤二模块：end  -->

    <view  v-if="+formData.failureStatus===1||+formData.failureStatus===3">
      <UploadPhotos :upPhoto="upPhotoList" @upload="uploadBusiness" />
      <view class="h26"></view>
    </view>

    <!--  底部固定模块：start  -->
    <view  class="uploaded-footer flex p-b-safe-area">
      <u-button
        class="uploaded-footer__button"
        color="#22284b"
        plain
        shape="circle"
        size="large"
        text="返回"
        @click="$backFn"
      />
      <u-button
        v-if="
          twoPhotosList.firstSrc&&twoPhotosList.secondSrc&&+formData.failureStatus===2
        "
        class="uploaded-footer__button"
        color="#22284b"
        shape="circle"
        size="large"
        text="下一步"
        @click="nextStep"
      />
      <u-button
        v-else-if="
          upPhotoList.firstSrc&&+formData.failureStatus===1
        "
        class="uploaded-footer__button"
        color="#22284b"
        shape="circle"
        size="large"
        text="下一步"
        @click="nextStep"
      />
      <u-button
        v-else-if="
          upPhotoList.firstSrc&&twoPhotosList.firstSrc&&twoPhotosList.secondSrc&&+formData.failureStatus===3
        "
        class="uploaded-footer__button"
        color="#22284b"
        shape="circle"
        size="large"
        text="下一步"
        @click="nextStep"
      />
      <u-button
        v-else
        class="uploaded-footer__button uploaded-footer__color"
        color="#F6F7F8"
        shape="circle"
        size="large"
        text="提交认证"
      />
    </view>

  </view>
</template>
<script>
import UploadPhotos from "./components/UploadPhotos";
import WarmPrompt from "./components/WarmPrompt";
import { chooseImageOcrByPromise, hideLoading, showLoading, toRoleHome } from "@/common/helper";

export default {
  name: "DownloadApp",
  components: { UploadPhotos, WarmPrompt },
  data() {
    return {
      isLoading:false,
      startFormShow: false,
      endFormShow: false,
      upPhotoList: {
        defaultFirstSrc: "/static/created/certify/not_uploaded.png",
        firstSrc: "",
        firstContent: "拍照上传您的营业执照"
      },
      twoPhotosList: {
        defaultFirstSrc: "/static/created/certify/positive.png",
        firstSrc: "",
        firstContent: "拍照上传您的身份证正面",
        defaultSecondSrc: "/static/created/certify/back.png",
        secondSrc: "",
        secondContent: "拍照上传您的身份证反面"
      },
      formData: {
        IDCard: "", // 身份证号
        startTime: "", // 身份证日期开始
        endTime: "", // 身份证日期结束
        name: "", // 姓名
      }
    };
  },
  methods: {
    /**
     * 上传营业执照
     */
    uploadBusiness() {
      chooseImageOcrByPromise({ count: 1, formData: { type: 2 }, tip: "识别中" }).then(res => {
        const result = JSON.parse(res.data);
        if (Number(result.code) === 20001) {
          this.upPhotoList.firstSrc = result.data.url;
        }else if(Number(result.code)===40005){
          //图片识别失败
          this.upPhotoList.firstSrc = result.data.url;
          uni.$u.toast('上传成功');
        } else {
          uni.$u.toast(result.message||'请求失败');
        }

      }).catch((err) => {
        if (!err.errMsg) {
          this.$u.toast(err.message || '网络错误')
        }
      })
    },
    /**
     * 上传身份证正面
     */
    uploadCardIs() {
      chooseImageOcrByPromise({ count: 1, formData: { type: 1 }, tip: "识别中" }).then(res => {
        const result = JSON.parse(res.data);
        if (Number(result.code) === 20001) {
          this.twoPhotosList.firstSrc = result.data.url;
        }  else if(Number(result.code)===40005){
          //图片识别失败
          this.twoPhotosList.firstSrc = result.data.url;
          uni.$u.toast('上传成功');
        }else {
          uni.$u.toast(result.message||'请求失败');
        }

      }).catch((err) => {
        if (!err.errMsg) {
          this.$u.toast(err.message || '网络错误')
        }
      })
    },
    /**
     *  上传身份证反面
     */
    uploadCardNo() {
      chooseImageOcrByPromise({ count: 1, formData: { type: 1 }, tip: "识别中" }).then(res => {
        const result = JSON.parse(res.data);
        if (Number(result.code) === 20001) {
          this.formData.validity = result.data.validDate;
          this.twoPhotosList.secondSrc = result.data.url;
        } else if(Number(result.code)===40005){
          this.twoPhotosList.secondSrc = result.data.url;
          //图片识别失败
          uni.$u.toast('上传成功');
        }else {
          uni.$u.toast(result.message||'请求失败');
        }

      }).catch((err) => {
        if (!err.errMsg) {
          this.$u.toast(err.message || '网络错误')
        }
      })
    },
    /**
     * 下一步
     */
    nextStep() {
          if(this.isLoading)return
          this.isLoading=true


      if(+this.formData.failureStatus===2){
        // 只认证身份证
        let param={
          legalIdCardBack:this.twoPhotosList.secondSrc,
          legalIdCardFront:this.twoPhotosList.firstSrc
        }
        this.$VoHttp.apiCompanyLegalAuthAnewIdentity(param).then(res=>{
          uni.$u.toast('提交成功')
          setTimeout(()=>{
            this.$backFn()
          },2000)

          this.isLoading=false
        }).catch(e=>{
          this.isLoading=false
          uni.$u.toast(e.message||'请求失败')
        })
      }else if(+this.formData.failureStatus===1){
        // 认证营业执照
        let param={
          businessLicenseUrl:this.upPhotoList.firstSrc,
        }
        this.$VoHttp.apiCompanyLegalAuthAnewLicense(param).then(res=>{
          uni.$u.toast('提交成功')
          setTimeout(()=>{
            this.$backFn()
          },2000)

          this.isLoading=false
        }).catch(e=>{
          this.isLoading=false
          uni.$u.toast(e.message||'请求失败')
        })
      }else if(+this.formData.failureStatus===3){
        //都认证
        let param={
          legalIdCardBack:this.twoPhotosList.secondSrc,
          legalIdCardFront:this.twoPhotosList.firstSrc,
          businessLicenseUrl:this.upPhotoList.firstSrc,
        }
        this.$VoHttp.apiCompanyLegalAuthAnewAll(param).then(res=>{
          uni.$u.toast('提交成功')
          setTimeout(()=>{
            this.$backFn()
          },2000)

          this.isLoading=false
        }).catch(e=>{
          this.isLoading=false
          uni.$u.toast(e.message||'请求失败')
        })
      }

    },
    initFn() {
      this.$VoHttp.apiCompanyLegalInfo().then((res) => {
        this.formData = res.data
      })
    }
  },
  onLoad() {
      this.initFn()
  }
};
</script>
<style lang="scss" scoped>
.uploaded {
  width: 750rpx;
  min-height: 100vh;
  overflow-x: hidden;
  box-sizing: border-box;
  background: $v-bg-white;
  padding-bottom: 132rpx;

  &-logo {
    width: 100%;
    height: 368rpx;
    padding-left: 32rpx;

    &__name {
      padding: 24rpx 0;
      height: 48rpx;
      line-height: 48rpx;
      font-size: 32rpx;
      color: $v-c0-85;
    }
  }

  &-form {
    margin-top: 56rpx;
    padding: 0 32rpx;
    margin-bottom: 8rpx;

    &__item {
      text-align: right;
      border-bottom: 2rpx solid $v-bg-light;

      .item-code {
        margin-left: 24rpx;
      }
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
    }
  }

  &-success {
    text-align: center;
    margin-top: 72rpx;

    &__icon {
      width: 176rpx;
      height: 176rpx;
    }

    &__info {
      margin-top: 32rpx;
      height: 36rpx;
      line-height: 36rpx;
      font-weight: bold;
      font-size: 30rpx;
      color: $v-c0-85;
    }

    &__open {
      margin-top: 24rpx;
      height: 36rpx;
      line-height: 36rpx;
      font-size: 24rpx;
      color: $v-c0-45;
    }

    &__button {
      margin-top: 286rpx;
      width: 750rpx;
      padding: 0rpx 32rpx;
      box-sizing: border-box;
    }
  }

  &-footer {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 3;
    height: 132rpx;
    line-height: 132rpx;
    border-top: 2rpx solid rgba(24, 34, 65, 0.08);
    width: 100%;
    background: $v-bg-white;

    &__button {
      width: 324rpx;
      height: 92rpx;
      margin: auto;
    }

    &__color {
      color: $v-c0-25 !important;
    }
  }
}

:deep.u-form-item__body__left__content__required {
  top: 0rpx;
}

.color-gray {
  color: rgba(0, 0, 0, 0.25);
}

.flex-end {
  justify-content: flex-end;
}

</style>
