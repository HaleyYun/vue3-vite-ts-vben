<template>
  <view class="uploaded">
    <VoNav is-have-more title="提交认证信息" :is-back="false" @backFn="goHomePage" />

    <view v-if="isTip" class="uploaded-fixed">
      <view :style="statusBarStyle"></view>
      <view class="tip">
        <view class="flex flex-vertical-c lh150">
          <view class="w-h-20">
            <VoIcon color="#FF9B05" name="error-full" size="20" />
          </view>
          <view class="tip-required m-l-16">*</view>
          <view class="tip-text">为必填项</view>
        </view>
        <VoIcon :size="20" color="#000" name="close" opacity="0.45" @click="isTip = false" />
      </view>
    </view>
    <view v-if="isTip" class="tip-block" />
    <view v-else class="line-bg h16" />
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
        label="联系人姓名"
        prop="contractName"
        required
      >
        <u--input
          v-model="formData.contractName"
          border="none"
          disabledColor="#ffffff"
          fontSize="16px"
          inputAlign="right"
          placeholder="请输入联系人姓名"
          placeholderClass="uploaded-form__placeholder"
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
          disabledColor="#ffffff"
          fontSize="16px"
          inputAlign="right"
          placeholder="请输入修理厂名称"
          placeholderClass="uploaded-form__placeholder"
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
      <view class="color-block flex flex-vertical-c form-block">
        <view class="fz-40 red-required">*</view>
        <view>详细地址</view>
      </view>
      <EraFormItem
        class="uploaded-form__item1"
        color="rgba(0, 0, 0, 0.85)"
        label=""
        labelWidth="0"
        prop="address"
      >
        <!--        <u&#45;&#45;input-->
        <!--          v-model="formData.address"-->
        <!--          border="none"-->
        <!--          disabledColor="#ffffff"-->
        <!--          fontSize="16px"-->
        <!--          placeholder="小区楼栋/乡村名称"-->
        <!--          placeholderClass="uploaded-form__placeholder text-left"-->
        <!--        />-->
        <textarea
          v-model="formData.address"
          auto-height
          class="item1-textarea"
          placeholder="小区楼栋/乡村名称"
          placeholder-class="uploaded-form__placeholder text-left"
        ></textarea>
        <image
          v-if="formData.address"
          class="item1-icon"
          src="/static/created/certify/clear2.png"
          @click="removeFn"
        />
      </EraFormItem>

      <EraFormItem
        class="uploaded-form__item"
        color="rgba(0, 0, 0, 0.85)"
        label="主修车系"
        prop="carSeries"
      >
        <view class="w-full flex flex-justify-r flex-vertical-c" @click="showCarSeriesBoo = true">
          <view v-if="formData.carSeriesProject" class="flex1">{{
            formateSeriesProject(formData.carSeriesProject)
          }}</view>
          <view v-else class="uploaded-form__placeholder">请选择主修车系</view>
          <VoIcon :size="24" class="m-l-6" color="#000" name="right-arrow" opacity="0.45" />
        </view>
      </EraFormItem>
      <EraFormItem
        class="uploaded-form__item"
        color="rgba(0, 0, 0, 0.85)"
        label="服务项目"
        prop="serviceProject"
        @click="serviceShow = true"
      >
        <view class="w-full flex flex-justify-r flex-vertical-c">
          <view v-if="formData.serviceProject" class="flex1">{{
            formateServiceProject(formData.serviceProject)
          }}</view>
          <view v-else class="uploaded-form__placeholder"> 洗美/换修发动集/保养 </view>
          <VoIcon :size="24" class="m-l-6" color="#000" name="right-arrow" opacity="0.45" />
        </view>
      </EraFormItem>
      <EraFormItem
        class="uploaded-form__item"
        color="rgba(0, 0, 0, 0.85)"
        label="工位数量"
        prop="locationNumber"
      >
        <u--input
          v-model.number="formData.locationNumber"
          border="none"
          disabledColor="#ffffff"
          fontSize="16px"
          inputAlign="right"
          maxlength="999"
          placeholder="请输入工位数量"
          placeholderClass="uploaded-form__placeholder"
          type="number"
        />
      </EraFormItem>
      <EraFormItem
        class="uploaded-form__item"
        color="rgba(0, 0, 0, 0.85)"
        label="规模"
        prop="scale"
      >
        <u--input
          v-model.number="formData.scale"
          border="none"
          disabledColor="#ffffff"
          fontSize="16px"
          inputAlign="right"
          maxlength="999"
          placeholder="请输入规模"
          placeholderClass="uploaded-form__placeholder"
          type="number"
        />
      </EraFormItem>
      <view class="uploaded-logo">
        <view class="uploaded-logo__name">门头照片</view>
        <UploadLogo @success="successStoreUrlFn" />
      </view>
      <view class="line-bg h16" />
      <EraFormItem
        class="uploaded-form__item"
        color="rgba(0, 0, 0, 0.85)"
        label="联系电话"
        prop="contractPhone"
        required
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
    </EraForm>

    <view class="safearea-box bg-white"></view>

    <!--  底部固定模块：start  -->
    <view class="uploaded-footer flex p-b-safe-area">
      <u-button
        class="uploaded-footer__button skip-btn"
        color="rgba(0, 0, 0, 0.85)"
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
          formData.contractName &&
          formData.contractPhone &&
          formData.storeName &&
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

    <!--    <u-picker-->
    <!--      @cancel="showCarSeriesBoo = false"-->
    <!--      :columns="columns"-->
    <!--      :show="showCarSeriesBoo"-->
    <!--      @confirm="confirm"-->
    <!--    />-->
    <u-popup :show="showCarSeriesBoo" @open="carSeriesOpen">
      <view class="pop-head">主修车系</view>
      <view>
        <view class="pop-series">
          <view
            v-for="item in carSeriesList"
            :key="item.code"
            :class="{ 'pop-content-select': carSeriesCurrent.includes(item.value) }"
            class="pop-content-item"
            @click="selectSeries(item)"
            >{{ item.name }}</view
          >
        </view>
        <view class="pop-bottom">
          <u-button
            class="button-cancel"
            shape="circle"
            text="取消"
            @click="showCarSeriesBoo = false"
          />
          <u-button
            v-if="noCarSeriesCurrent"
            class="button-disable"
            shape="circle"
            text="确定"
          ></u-button>
          <u-button v-else class="button-sure" shape="circle" text="确定" @click="confirmSeries" />
        </view>
      </view>
    </u-popup>
    <u-popup :show="serviceShow" @open="carServiceOpen">
      <view class="pop-head">服务项目</view>
      <view>
        <view class="pop-content">
          <view
            v-for="item in serviceList"
            :key="item.code"
            :class="{ 'pop-content-select': currentService.includes(item.code) }"
            class="pop-content-item"
            @click="selectService(item)"
            >{{ item.name }}</view
          >
        </view>
        <view class="pop-bottom">
          <u-button class="button-cancel" shape="circle" text="取消" @click="serviceShow = false" />
          <u-button
            v-if="noCurrentService"
            class="button-disable"
            shape="circle"
            text="确定"
          ></u-button>
          <u-button v-else class="button-sure" shape="circle" text="确定" @click="confirmService" />
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
  import UploadLogo from './components/UploadLogo'
  import { getLocation, hideLoading, showLoading, toRoleHome } from '@/common/helper'

  export default {
    name: 'GarageAccounts',
    components: { UploadLogo },
    data() {
      return {
        statusBarStyle: {
          height: this.$systemInfo.statusBarHeight + 'px',
          backgroundColor: '#fff',
        },
        isTip: true, // 是否显示提示
        currentService: [],
        serviceList: [],
        serviceShow: false,
        tips: '获取验证码',
        isLoading: false,
        showAddress: false,
        showCarSeriesBoo: false,
        noCurrentService: false,
        noCarSeriesCurrent: false,
        carSeriesCurrent: [],
        carAllSelect: 0,
        carServiceSelect: 0,
        carSeriesList: [],
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
            message: '请填写联系人姓名',
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
          // scale: {
          //   required: true,
          //   message: '请填写规模',
          //   trigger: ['blur', 'change'],
          // },
          // locationNumber: {
          //   required: true,
          //   message: '请填写工位数量',
          //   trigger: ['blur', 'change'],
          // },
        },
      }
    },
    // mounted() {
    //   this.getServiceList()
    //   this.getCarSeriesList()
    // },
    methods: {
      carServiceOpen() {
        if (this.currentService.length === this.serviceList.length - 1) {
          this.currentService.push(this.carServiceSelect)
        }
      },
      carSeriesOpen() {
        if (this.carSeriesCurrent.length === this.carSeriesList.length - 1) {
          this.carSeriesCurrent.push(this.carAllSelect)
        }
      },
      formateServiceProject(val) {
        if (!val) {
          return ''
        }
        const arr = val.split(',')
        return arr
          .map((item) => {
            return this.serviceList.find((value) => value.code == item).name
          })
          .join()
      },
      formateSeriesProject(val) {
        if (!val) {
          return ''
        }
        const arr = val.split(',')
        return arr
          .map((item) => {
            return this.carSeriesList.find((value) => value.value == item).name
          })
          .join()
      },
      selectService(val) {
        const index = this.currentService.findIndex((item) => item === val.code)
        if (index === -1) {
          console.log(val.code, '1234')
          if (val.code === this.carAllSelect) {
            this.currentService = []
            this.serviceList.forEach((item) => this.currentService.push(item.code))
          } else {
            this.currentService.push(val.code)
            if (this.currentService.length === this.serviceList.length - 1) {
              this.currentService.push(this.carServiceSelect)
            }
          }
        } else {
          if (val.code === this.carAllSelect) {
            this.currentService = []
          } else {
            this.currentService.splice(index, 1)
            const pos = this.currentService.findIndex((item) => item === this.carAllSelect)
            if (pos !== -1) {
              this.currentService.splice(pos, 1)
            }
          }
        }
        console.log(this.currentService, 'currentService')
        this.noCurrentService = this.currentService.length === 0
      },
      confirmService() {
        // if (!this.currentService.length) {
        //   this.$u.toast('请选择服务项目')
        //   return
        // }
        const pos = this.currentService.findIndex((item) => item === this.carServiceSelect)
        if (pos !== -1) {
          this.currentService.splice(pos, 1)
        }
        this.formData.serviceProject =
          this.currentService && this.currentService.length ? this.currentService.join() : ''
        this.serviceShow = false
      },
      selectSeries(val) {
        const index = this.carSeriesCurrent.findIndex((item) => item === val.value)
        if (index === -1) {
          if (val.value === this.carAllSelect) {
            this.carSeriesCurrent = []
            this.carSeriesList.forEach((item) => this.carSeriesCurrent.push(item.value))
          } else {
            this.carSeriesCurrent.push(val.value)
            if (this.carSeriesCurrent.length === this.carSeriesList.length - 1) {
              this.carSeriesCurrent.push(this.carAllSelect)
            }
          }
        } else {
          if (val.value === this.carAllSelect) {
            this.carSeriesCurrent = []
          } else {
            this.carSeriesCurrent.splice(index, 1)
            const pos = this.carSeriesCurrent.findIndex((item) => item === this.carAllSelect)
            if (pos !== -1) {
              this.carSeriesCurrent.splice(pos, 1)
            }
          }
        }
        this.noCarSeriesCurrent = this.carSeriesCurrent.length === 0
      },
      confirmSeries() {
        // if (!this.carSeriesCurrent.length) {
        //   this.$u.toast('请选择主修车系')
        //   return
        // }
        const pos = this.carSeriesCurrent.findIndex((item) => item === this.carAllSelect)
        if (pos !== -1) {
          this.carSeriesCurrent.splice(pos, 1)
        }
        this.formData.carSeriesProject = this.carSeriesCurrent ? this.carSeriesCurrent.join() : ''
        this.showCarSeriesBoo = false
        console.log(this.carSeriesCurrent, 'carSeriesCurrent')
      },
      async getServiceList() {
        const res = await this.$VoHttp.apiCompanyInfoServiceProject()
        if (!res || !res.data) return
        this.serviceList = []
        //全选的value值为this.carServiceSelect(0) 若有数据的value也为0请改为其他
        this.serviceList.push({ name: '全部项目', code: this.carServiceSelect })
        this.serviceList.push(...res.data)
        console.log(this.serviceList, 'serviceList')
      },
      async getCarSeriesList() {
        const res = await this.$VoHttp.apiCompanyInfoSerialDic()
        if (!res || !res.data) return
        this.carSeriesList = []
        //全选的value值为this.carAllSelect(0) 若有数据的value也为0请改为其他
        this.carSeriesList.push({ name: '全部车系', value: this.carAllSelect })
        this.carSeriesList.push(...res.data)
      },
      removeFn() {
        this.formData.address = ''
      },
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
            serviceProject: this.formData.serviceProject,
            areaCode: this.formData.areaCode,
            carSeries: this.formData.carSeriesProject,
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
        if (!data) return
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
            // this.latitude = info.latitude
            // this.longitude = info.longitude
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
      this.getServiceList()
      this.getCarSeriesList()
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
      position: relative;

      &__name {
        padding: 24rpx 0;
        height: 48rpx;
        line-height: 48rpx;
        font-size: 32rpx;
        color: $v-c0-85;
        position: relative;
        margin-left: 22rpx;
        &::before {
          color: $color-primary-red;
          content: '*';
          position: absolute;
          font-size: 40rpx;
          left: -20rpx;
          top: 30rpx;
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
      &__item1 {
        padding: 0rpx 32rpx;
        border-bottom: 2rpx solid $v-bg-light;
        .item1-textarea {
          width: 622rpx;
        }
        .item1-icon {
          width: 40rpx;
          height: 40rpx;
          margin-left: auto;
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
        color: #ff5319;
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
  .pop-head {
    box-sizing: border-box;
    margin: 0 32rpx;
    padding: 24rpx 0;
    font-size: 32rpx;
    font-weight: bold;
    border-bottom: 2rpx solid #f7f7f8;
  }
  .pop-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 32rpx 286rpx 32rpx;
    border-bottom: 2rpx solid #f7f7f8;
    &-item {
      box-sizing: border-box;
      width: 200rpx;
      height: 64rpx;
      text-align: center;
      line-height: 64rpx;
      font-size: 24rpx;
      border-radius: 64rpx;
      border: 2rpx solid #f6f7f8;
      background: #f6f7f8;
      color: rgba(0, 0, 0, 0.85);
      margin-top: 42rpx;
    }
    &-select {
      background: #ffece5;
      border: 2rpx solid #ff6633;
      color: #ff6633;
    }
  }
  .pop-series {
    padding: 0 32rpx 286rpx 32rpx;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 64rpx 64rpx 64rpx;
    grid-row-gap: 44rpx;
    grid-column-gap: 34rpx;
    &-item {
      box-sizing: border-box;
      width: 200rpx;
      height: 64rpx;
      text-align: center;
      line-height: 64rpx;
      font-size: 24rpx;
      border-radius: 64rpx;
      border: 2rpx solid #f6f7f8;
      background: #f6f7f8;
      color: rgba(0, 0, 0, 0.85);
      margin-top: 42rpx;
      margin-right: 44rpx;
    }
    &-select {
      background: #ffece5;
      border: 2rpx solid #ff6633;
      color: #ff6633;
    }
  }
  .pop-bottom {
    display: flex;
    justify-content: space-between;
    padding: 24rpx 32rpx 80rpx 32rpx;
    .button-cancel,
    .button-sure {
      width: 325rpx;
      height: 80rpx;
    }
    .button-sure {
      background: #ff5319;
      color: #fff;
    }
    .button-disable {
      width: 325rpx;
      height: 80rpx;
      background-color: #f6f7f8;
      color: $v-c0-25;
    }
  }
  .uploaded-fixed {
    width: 750rpx;
    position: fixed;
    left: 0rpx;
    top: 88rpx;
    z-index: 2;
  }
  .tip {
    background-color: #fff5e6;
    width: 750rpx;
    height: 80rpx;
    padding-left: 24rpx;
    padding-right: 32rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-required {
      color: #f20014;
      font-size: 24rpx;
    }
    &-text {
      color: #ff9b05;
      font-size: 24rpx;
    }
    .w-h-20 {
      width: 20px;
      height: 20px;
    }
  }
  .tip-block {
    padding-bottom: 88rpx;
  }
  .skip-btn {
    border: 2rpx solid rgba(0, 0, 0, 0.25) !important;
  }
  .form-block {
    position: relative;
    font-size: 30rpx;
    margin: 34rpx 0 0 56rpx;
  }
  .red-required {
    color: $color-primary-red;
    position: absolute;
    left: -20rpx;
    top: 8rpx;
    line-height: 40rpx;
    font-size: 40rpx;
  }
  ::v-deep .u-form-item__body__left {
    margin-left: 20rpx;
  }
  ::v-deep .u-form-item__body__left__content__label {
    margin-left: 4rpx;
  }
</style>
