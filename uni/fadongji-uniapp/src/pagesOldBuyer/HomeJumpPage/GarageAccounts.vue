<template>
  <view class="uploaded">
    <VoNav is-have-more title="提交认证信息" />

    <view class="line-bg h16" />
    <EraForm
      ref="form"
      :model="formData"
      :rules="rules"
      class="uploaded-form"
      labelPosition="left"
      labelWidth="128"
    >
      <EraFormItem
        class="uploaded-form__item"
        color="rgba(0, 0, 0, 0.85)"
        label="联系电话"
        prop="contractPhone"
      >
        <u--input
          v-model="formData.contractPhone"
          border="none"
          disabled
          disabledColor="#ffffff"
          fontSize="16px"
          inputAlign="right"
          placeholder="请输入联系电话"
          placeholderClass="uploaded-form__placeholder"
        />
      </EraFormItem>
      <EraFormItem
        class="uploaded-form__item"
        color="rgba(0, 0, 0, 0.85)"
        label="验证码"
        prop="verificationCode"
        required
      >
        <u--input
          v-model="formData.verificationCode"
          :maxlength="6"
          border="none"
          class="item-input m-r-6"
          color="rgba(0, 0, 0, 0.85)"
          inputAlign="right"
          placeholder="请输入验证码"
          placeholderClass="placeholder"
          type="number"
        />
        <u-code ref="uCode" change-text="xS" seconds="60" @change="codeChange" />
        <view slot="right" class="main-form__code" @click="getCode">
          {{ tips }}
        </view>
      </EraFormItem>

      <!--温馨提示-->
      <view class="m-l-32 m-r-32 m-t-32 m-b-6">
        <view class="fz-28 color-red">温馨提示</view>
        <view class="fz-24 color-block-45"
          >尊敬的客户您好，为保障认证信息是您本人真实操作，请验证认证时的手机号</view
        >
      </view>
      <view class="line-bg h16" />
      <EraFormItem
        class="uploaded-form__item"
        color="rgba(0, 0, 0, 0.85)"
        label="负责人名称"
        prop="contractName"
        required
      >
        <u--input
          v-model="formData.contractName"
          border="none"
          disabledColor="#ffffff"
          fontSize="16px"
          inputAlign="right"
          placeholder="请输入负责人名称"
          placeholderClass="uploaded-form__placeholder"
          maxlength="40"
        />
      </EraFormItem>
      <EraFormItem
        class="uploaded-form__item"
        color="rgba(0, 0, 0, 0.85)"
        label="修理厂名称"
        prop="storeName"
        required
      >
        <u--input
          v-model="formData.storeName"
          border="none"
          color="#FF3F00"
          disabledColor="#ffffff"
          fontSize="16px"
          inputAlign="right"
          placeholder="请输入修理厂名称"
          placeholderClass="uploaded-form__placeholder"
          maxlength="40"
        />
      </EraFormItem>

      <EraFormItem
        class="uploaded-form__item"
        color="rgba(0, 0, 0, 0.85)"
        label="所在地区"
        prop="areaCode"
        required
      >
        <view class="flex flex-justify-r flex-vertical-c w-full">
          <view v-if="formData.areaCode" class="overEllipsis w300" @click="showAddress = true">{{
            formData.areaName
          }}</view>
          <view v-else class="uploaded-form__placeholder" @click="showAddress = true"
            >请选择地址</view
          >

          <VoIcon :size="24" class="m-l-6" name="address" @click.native.stop="chooseLocation" />
        </view>
      </EraFormItem>
      <view class="color-block fz-32 m-l-24 m-t-34 flex flex-vertical-c">
        <view class="fz-40" style="color: #e47470">*</view>
        <view>详细地址</view>
      </view>
      <EraFormItem
        class="uploaded-form__item"
        color="rgba(0, 0, 0, 0.85)"
        label=""
        labelWidth="0"
        prop="address"
      >
        <u--input
          v-model="formData.address"
          border="none"
          disabledColor="#ffffff"
          fontSize="16px"
          placeholder="小区楼栋/乡村名称"
          placeholderClass="uploaded-form__placeholder text-left"
        />
      </EraFormItem>

      <EraFormItem
        class="uploaded-form__item"
        color="rgba(0, 0, 0, 0.85)"
        label="主修车系"
        prop="carSeries"
        required
      >
        <view class="w-full flex flex-justify-r flex-vertical-c" @click="showCarSeriesBoo = true">
          <view v-if="formData.carSeries">{{ columns[0][formData.carSeries - 1] }}</view>
          <view v-else class="uploaded-form__placeholder">请选择主修车系</view>
          <VoIcon :size="24" class="m-l-6" name="right-arrow" />
        </view>
      </EraFormItem>

      <EraFormItem
        class="uploaded-form__item"
        color="rgba(0, 0, 0, 0.85)"
        label="工位数量"
        prop="locationNumber"
        required
      >
        <u--input
          v-model.number="formData.locationNumber"
          border="none"
          disabledColor="#ffffff"
          fontSize="16px"
          inputAlign="right"
          placeholder="请输入工位数量"
          placeholderClass="uploaded-form__placeholder"
          type="number"
          maxlength="999"
        />
      </EraFormItem>
      <EraFormItem
        class="uploaded-form__item"
        color="rgba(0, 0, 0, 0.85)"
        label="规模"
        prop="scale"
        required
      >
        <u--input
          v-model.number="formData.scale"
          border="none"
          disabledColor="#ffffff"
          fontSize="16px"
          inputAlign="right"
          placeholder="请输入规模"
          placeholderClass="uploaded-form__placeholder"
          type="number"
          maxlength="999"
        />
      </EraFormItem>
      <view class="uploaded-logo">
        <view class="uploaded-logo__name">门头照片</view>
        <UploadLogo @success="successStoreUrlFn" />
      </view>
    </EraForm>

    <!--  底部固定模块：start  -->
    <view class="uploaded-footer flex p-b-safe-area">
      <u-button
        class="uploaded-footer__button"
        color="#FF5319"
        plain
        shape="circle"
        size="large"
        text="跳过，暂不认证"
        @click="goHomePage"
      />
      <u-button
        v-if="
          formData.verificationCode &&
          formData.address &&
          formData.carSeries &&
          formData.contractName &&
          formData.contractPhone &&
          formData.locationNumber &&
          formData.storeName &&
          formData.scale &&
          formData.storeUrl
        "
        class="uploaded-footer__button"
        color="#FF5319"
        shape="circle"
        size="large"
        text="提交认证信息"
        @click="nextStep"
      />
      <u-button
        v-else
        class="uploaded-footer__button uploaded-footer__color"
        color="#F6F7F8"
        shape="circle"
        size="large"
        text="提交认证信息"
      />
    </view>
    <!--  底部固定模块：end  -->

    <VoAddress :show.sync="showAddress" @sureFn="sureFn" />

    <u-picker :columns="columns" :show="showCarSeriesBoo" @confirm="confirm" />
  </view>
</template>

<script>
  import UploadLogo from './components/UploadLogo'
  import { getLocation, hideLoading, showLoading, toRoleHome } from "@/common/helper";

  export default {
    components: { UploadLogo },
    name: 'GarageAccounts',
    data() {
      return {
        tips: '获取验证码',
        isLoading: false,
        showAddress: false,
        showCarSeriesBoo: false,
        columns: [['国产车', '韩系车', '德系车', '日系车', '美系车']],
        formData: {
          verificationCode: '', // 验证码
          address: '', // 详细地址
          areaCode: '', //区县code
          areaName: '',
          carSeries: '', // 车系
          contractName: '', // 负责人姓名
          contractPhone: '', // 负责人手机号
          // latitude: '', // 纬度
          // longitude: '', // 经度
          locationNumber: '', // 工位数量
          storeName: '', // 店铺名称
          storeUrl: '', // 店铺头像
          scale: '', // 规模
        },
        locationgTips: {
          message: '定位服务未开启，请在系统设置中开启定位服务',
          cancel: '取消',
          confirm: '去设置',
        },
        rules: {
          verificationCode: {
            required: true,
            message: '请输入验证码',
            trigger: ['blur', 'change'],
          },
          address: {
            required: true,
            message: '请填写详细地址',
            trigger: ['blur', 'change'],
          },
          contractName: {
            required: true,
            message: '请填写负责人姓名',
            trigger: ['blur', 'change'],
          },
          contractPhone: {
            pattern: /^1[3456789][0-9]{9}$/g, //this.$vocenApi.Pattern.phone
            // 正则检验前先将值转为字符串
            transform(value) {
              return String(value)
            },
            trigger: ['blur', 'change'],
            message: '手机号格式不正确',
          },
          storeName: {
            required: true,
            message: '请填写汽修厂名称',
            trigger: ['blur', 'change'],
          },
          storeUrl: {
            required: true,
            message: '请上传门头照片',
            trigger: ['blur', 'change'],
          },
          scale: {
            required: true,
            message: '请填写规模',
            trigger: ['blur', 'change'],
          },
          locationNumber: {
            required: true,
            message: '请填写工位数量',
            trigger: ['blur', 'change'],
          },
        },
      }
    },
    methods: {
      goHomePage() {
        toRoleHome()
      },
      //验证码Change
      codeChange(text) {
        this.tips = text
      },
      //获取验证码
      getCode() {
        if (this.$refs.uCode.canGetCode) {
          // 模拟向后端请求验证码
          uni.showLoading({
            title: '正在获取验证码',
            mask: true,
          })
          let param = {
            mobile: this.formData.contractPhone,
          }
          this.$VoHttp
            .apiCompanyInfoSms(param)
            .then((res) => {
              this.uuid = res.data
              uni.$u.toast('发送成功')
              this.$refs.uCode.start()
            })
            .catch((e) => {
              uni.$u.toast(e.message || '请求失败')
            })
            .finally(() => {
              uni.hideLoading()
            })
        } else {
          uni.$u.toast('倒计时结束后再发送')
        }
      },
      sureFn(res) {
        this.formData.areaCode = res[2].code
        this.formData.areaName = res[0].name + res[1].name + res[2].name
      },
      confirm(e) {
        this.showCarSeriesBoo = false
        this.formData.carSeries = Number(e.indexs[0]) + 1
      },
      nextStep() {
        this.$refs.form.validate().then((res) => {
          if (!this.formData.areaCode) {
            uni.$u.toast('请选择地址')
            return
          }
          if (this.isLoading) return
          this.isLoading = true
          let param = {
            verificationCode: this.formData.verificationCode,
            address: this.formData.address,
            areaCode: this.formData.areaCode,
            carSeries: this.formData.carSeries,
            contractName: this.formData.contractName,
            contractPhone: this.formData.contractPhone,
            locationNumber: this.formData.locationNumber,
            // longitude: this.formData.longitude,
            // latitude: this.formData.latitude,
            scale: this.formData.scale,
            storeName: this.formData.storeName,
            storeUrl: this.formData.storeUrl,
          }
          this.$VoHttp
            .apiCompanyLegalAuthGarage(param)
            .then((res) => {
              uni.$u.toast('提交成功')
              setTimeout(() => {
                this.isLoading = false
                toRoleHome()
              }, 1500)
            })
            .catch((e) => {
              uni.$u.toast(e.message || '请求失败')
              this.isLoading = false
            })
        })
      },
      /**
       * 选择地图
       */
      async chooseLocation() {
        let LocationInfo = await getLocation(this.locationgTips)
        if (!LocationInfo || !LocationInfo.longitude) return
        const data = await this.$openLocation()
        console.log(data)
        await this.getAddress(data)
      },
      /**
       * 通过经纬度获取省市区
       */
      async getAddress(info) {
        showLoading()
        await this.$VoHttp
          .apiSixhotAreaTertiaryInfo({ ...info })
          .then(({ data }) => {
            this.formData.areaCode = data.areaCode
            this.formData.areaName = `${data.provinceName}${data.cityName}${data.areaName}`
            this.formData.address = info.name
            // this.formData.latitude = info.latitude
            // this.formData.longitude = info.longitude
          })
          .catch((e) => {
            this.$u.toast(e.message || '网络错误')
          })
          .finally(() => {
            hideLoading()
          })
      },
      /**
       * 企业logo
       */
      successStoreUrlFn(res) {
        this.formData.storeUrl = res
      },
    },
    onLoad(options) {
      this.formData.contractPhone = this.userInfo.userName
    },
  }
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
      box-sizing: border-box;

      &__name {
        padding: 24rpx 0;
        height: 48rpx;
        line-height: 48rpx;
        font-size: 32rpx;
        color: $v-c0-85;
        position: relative;
        &::before {
          color: #f56c6c;
          content: '*';
          position: absolute;
          left: -16rpx;
        }
      }
    }
    &-form {
      padding: 0 0rpx;
      margin-bottom: 8rpx;

      &__item {
        padding: 0rpx 32rpx;
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
        &.text-left {
          text-align: left;
        }
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

    .w300 {
      width: 340rpx;
    }
    .main-form {
      padding: 0 52rpx;
      &__code {
        font-weight: 400;
        font-size: 32rpx;
        line-height: 1.5;
        color: #22284b;
      }
      &__item {
        margin-bottom: 46rpx;
        color: $v-c0-85;
        font-weight: bold;
        position: relative;
        border-bottom: 2rpx solid #f7f7f8;
        .placeholder {
          color: $v-c0-25 !important;
        }
        .item-label {
          font-weight: 400;
          font-size: 24rpx;
          line-height: 1.5;
          color: $v-c0-25;
          position: absolute;
          top: -20rpx;
        }
        .item-input {
          flex: 1;
        }
        .item-icon {
          height: 24px;
        }
        &.last {
          margin-bottom: 0;
        }
      }
    }
  }
</style>
