<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="addressAdd flex flex-column"
  >
    <VoNav
      :isBack="false"
      :title="optionId ? '编辑地址' : '添加新地址'"
      is-fixed
      is-have-more
      @backFn="reback"
    />
    <view
      v-if="userInfo.platformCode === 'garage' && showAlert"
      class="alert-box flex border-box flex-vertical-c"
    >
      <VoIcon :size="20" class="m-r-16" color="#FDA202" name="error-full" />
      <view class="fz-24 flex1">收货地址要与订单中商品的销售区域一致！</view>
      <VoIcon :size="20" color="#373A4E" name="close" @click="showAlert = false" />
    </view>
    <view v-if="!showAlert" class="addressAdd-line" />
    <EraForm
      ref="form"
      :model="formData"
      :rules="rules"
      class="addressAdd-form"
      labelPosition="left"
      labelWidth="100"
    >
      <EraFormItem
        v-if="userInfo.roleCode === 'supplier'"
        class="addressAdd-form__item"
        color="rgba(0, 0, 0, 0.85)"
        label="收货人"
        prop="delivery"
        required
      >
        <u-input
          v-model.trim="formData.delivery"
          :maxlength="5"
          border="none"
          class="item-input"
          color="rgba(0, 0, 0, 0.85)"
          fontSize="16px"
          inputAlign="right"
          placeholder="请输入发货人"
          placeholderClass="addressAdd-form__placeholder color-block-25"
        />
      </EraFormItem>
      <EraFormItem
        v-else
        class="addressAdd-form__item"
        color="rgba(0, 0, 0, 0.85)"
        label="收货人"
        prop="personModel"
        required
      >
        <u-input
          v-model.trim="formData.personModel"
          :maxlength="5"
          border="none"
          class="item-input"
          color="rgba(0, 0, 0, 0.85)"
          fontSize="16px"
          inputAlign="right"
          placeholder="请输入收货人"
          placeholderClass="addressAdd-form__placeholder color-block-25"
          type="text"
        />
      </EraFormItem>
      <EraFormItem
        :label="'手机号'"
        class="addressAdd-form__item"
        color="rgba(0, 0, 0, 0.85)"
        prop="mobileModel"
        required
      >
        <u-input
          v-model.number="formData.mobileModel"
          :placeholder="'请输入手机号'"
          border="none"
          class="item-input"
          color="rgba(0, 0, 0, 0.85)"
          fontSize="16px"
          inputAlign="right"
          maxlength="11"
          placeholderClass="addressAdd-form__placeholder color-block-25"
          type="number"
        />
      </EraFormItem>
      <EraFormItem
        class="addressAdd-form__item"
        color="rgba(0, 0, 0, 0.85)"
        label="所在地区"
        prop="addressModel"
        required
        @click="chooseAddress"
      >
        <view class="p-b-12 bg-white flex flex-vertical-c flex1 flex-justify-r">
          <u-input
            v-model="formData.addressModel"
            :disabled="true"
            :placeholder="'省、市、区、街道'"
            border="none"
            class="item-input"
            color="rgba(0, 0, 0, 0.85)"
            disabledColor="#fff"
            fontSize="16px"
            inputAlign="right"
            maxlength="11"
            placeholderClass="addressAdd-form__placeholder color-block-25"
          />
          <VoIcon
            :size="24"
            class="right-icon"
            color="#22284B"
            name="address"
            @click.native.stop="choseMap"
          />
        </view>
      </EraFormItem>
      <EraFormItem
        class="addressAdd-form__item"
        color="rgba(0, 0, 0, 0.85)"
        label="详细地址"
        prop="detailModel"
        required
      />
      <view class="p-b-12 bg-white flex flex-vertical-c">
        <EraTextarea
          v-model="formData.detailModel"
          autoHeight
          border="none"
          class="flex1"
          maxlength="100"
          placeholder="街道/楼牌号等"
          placeholderClass="addressAdd-form__textarea color-block-25"
        />
        <VoIcon
          v-if="formData.detailModel"
          :opacity="0.45"
          :size="24"
          class="right-icon"
          color="#000"
          name="close-fill"
          @click="clearAddress"
        />
        <!--        <VoIcon-->
        <!--          v-else-->
        <!--          :size="24"-->
        <!--          class="right-icon"-->
        <!--          color="#22284B"-->
        <!--          name="address"-->
        <!--          @click="choseMap"-->
        <!--        />-->
      </view>
    </EraForm>
    <view class="addressAdd-content">
      <view class="addressAdd-content__line" />
      <view class="tips">*请务必完善地址信息，确保货物能够准确送达</view>
      <view class="addressAdd-content__address flex flex-justify-between flex-vertical-c">
        <view class="title">设置默认地址</view>
        <EraSwitch
          v-model="switchValue"
          activeColor="#00B259"
          inactiveColor="rgba(0, 0, 0, 0.15)"
          size="26"
          @change="switchChange"
        />
      </view>
      <view class="addressAdd-content__line" />
    </view>
    <view class="addressAdd-bottom p-b-safe-area">
      <view
        v-if="
          (formData.personModel || formData.delivery) &&
          formData.mobileModel &&
          formData.addressModel &&
          formData.detailModel
        "
        class="addressAdd-bottom__confirm addressAdd-bottom__select"
        @click="confirmClick"
        >确定
      </view>
      <view v-else class="addressAdd-bottom__confirm">确定 </view>
    </view>

    <VoAddress :show.sync="showProp" @sureFn="sureAddressFn" />
    <VoModal
      v-show="modalVisible"
      :show="modalVisible"
      cancelText="不保存"
      confirmText="保存"
      showCancelButton
      @cancel="cancelExit"
      @confirm="confirmClick"
    >
      <view class="slot-content color-block fz-32"> 是否保存本次修改的信息？</view>
    </VoModal>
  </view>
</template>

<script>
  import { storage } from '@/common/unifyGlobalReg'
  import { getLocation, hideLoading, showLoading } from '@/common/helper'

  export default {
    data() {
      return {
        confirmSelect: false,
        switchValue: false,
        showProp: false,
        // personModel: '',
        // mobileModel: '',
        // addressModel: '',
        // detailModel: '',
        areaCode: '',
        optionId: '',
        modalVisible: false,
        isSwitchChange: false,
        showAlert: true,
        rulePhone: '',
        formData: {
          delivery: '', //发货人
          personModel: '', // 收货人
          mobileModel: '', // 手机号
          addressModel: '', // 地址
          detailModel: '', // 详细地址
        },
        locationgTips: {
          message: '定位服务未开启，请在系统设置中开启定位服务',
          cancel: '取消',
          confirm: '去设置',
        },
        rules: {
          delivery: {
            type: 'string',
            required: true,
            message: '请输入发货人',
            trigger: ['blur', 'change'],
          },
          personModel: {
            type: 'string',
            required: true,
            message: '请输入收货人',
            trigger: ['blur', 'change'],
          },
          mobileModel: [
            {
              type: 'number',
              required: true,
              message: '请输入手机号',
              trigger: ['blur', 'change'],
            },
            {
              pattern: this.$vocenApi.Pattern.phone, // /^1[3456789][0-9]{9}$/g
              // 正则检验前先将值转为字符串
              transform(value) {
                return String(value)
              },
              message: '手机号格式不正确',
              trigger: ['blur'],
            },
          ],
        },
      }
    },
    onLoad(option) {
      // if (option.data == '{}') {
      //   return
      // }
      if (option.id) {
        this.optionId = option.id
        this.$VoHttp
          .apiReceiverAddress$Get({ id: option.id })
          .then((res) => {
            // let addressData = JSON.parse(option.data)
            let addressData = res.data
            this.formData.personModel = addressData.name
            this.formData.delivery = addressData.name
            this.formData.mobileModel = addressData.mobile
            this.formData.addressModel =
              addressData.provinceName + addressData.cityName + addressData.areaName
            this.formData.detailModel = addressData.address
            this.areaCode = addressData.areaCode
            this.switchValue = addressData.isDefault
          })
          .catch((err) => {
            this.$u.toast(err.message || '网络连接错误')
            if (this.userInfo.platformCode === 'agent' || this.userInfo.platformCode === 'garage') {
              this.formData.addressModel =
                this.userInfo.provinceName + this.userInfo.cityName + this.userInfo.areaName
              this.areaCode = this.userInfo.areaCode
              this.initInfo()
            }
          })
      } else if (
        this.userInfo.platformCode === 'agent' ||
        this.userInfo.platformCode === 'garage'
      ) {
        this.formData.addressModel =
          this.userInfo.provinceName + this.userInfo.cityName + this.userInfo.areaName
        this.areaCode = this.userInfo.areaCode
        this.initInfo()
      }
    },
    methods: {
      async initInfo() {
        if (this.userInfo.platformCode === 'agent') {
          await this.$VoHttp.apiReceiverAddressRegister().then((res) => {
            if (res.data) {
              this.formData.personModel = res.data.name
              this.formData.mobileModel = res.data.mobile
              this.formData.detailModel = res.data.address
            }
          })
          await this.$VoHttp.apiCompanyInfoAdminPhoneNumber().then((res) => {
            if (res.data) {
              this.formData.mobileModel = res.data
            }
          })
        } else if (this.userInfo.platformCode === 'garage') {
          await this.$VoHttp.apiCompanyInfoAdminPhoneNumber().then((res) => {
            if (res.data) {
              this.formData.mobileModel = res.data
            }
          })
        }
      },
      chooseAddress() {
        // 服务商和修理厂不能修改省市区地址
        if (this.userInfo.platformCode === 'agent') {
          this.$u.toast('服务商暂不可修改地区信息')
          return
        } else if (this.userInfo.platformCode === 'garage') {
          this.$u.toast('汽修厂暂不可修改地区信息')
          return
        }
        this.showProp = true
      },
      //清除地址
      clearAddress() {
        this.formData.detailModel = ''
      },
      // 地图选点
      async choseMap() {
        if (this.userInfo.platformCode === 'agent') {
          this.$u.toast('服务商暂不可修改地区信息')
          return
        } else if (this.userInfo.platformCode === 'garage') {
          this.$u.toast('汽修厂暂不可修改地区信息')
          return
        }
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
            this.areaCode = data.areaCode
            this.formData.addressModel = `${data.provinceName}${data.cityName}${data.areaName}`
            this.formData.detailModel = info.name
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
      //开关change事件
      switchChange() {
        this.isSwitchChange = true
      },
      reback() {
        let arr = ['personModel', 'mobileModel', 'addressModel', 'detailModel']
        let flag = false
        arr.forEach((item) => {
          console.log('reback', this[item])
          if (this[item] || this.isSwitchChange) {
            this.modalVisible = true
            flag = true
          }
        })
        if (flag) return
        this.$backFn()
      },
      //不保存
      cancelExit() {
        this.$backFn()
      },
      /**
       * 确定
       */
      confirmClick() {
        let param = {
          address: this.formData.detailModel,
          areaCode: this.areaCode,
          isDefault: this.switchValue,
          mobile: this.formData.mobileModel,
          name: this.formData.personModel || this.formData.delivery,
        }
        if (!this.$vocenApi.Pattern.isPhone(this.formData.mobileModel)) {
          uni.$u.toast('请输入正确的手机号')
          return
        }
        if (this.optionId) {
          param.id = this.optionId
          //编辑
          showLoading()
          this.$VoHttp
            .apiReceiverAddress$Put(param)
            .then((res) => {
              if (res.code === '20001') {
                uni.$u.toast('修改成功')
                setTimeout(() => {
                  this.$backFn()
                }, 1500)
              } else {
                uni.$u.toast(res.message || '修改失败')
              }
            })
            .catch((err) => {
              console.log('err', err)
              uni.$u.toast(err.message || '修改失败')
            })
            .finally(() => {
              hideLoading()
            })
        } else {
          this.addAddressRequest(param)
        }
      },
      /**
       * 确认选中的地址
       */
      sureAddressFn(data) {
        this.formData.addressModel = data[0].name + data[1].name + data[2].name
        this.areaCode = data[2].code
      },
      textChange() {
        // if (
        //   this.formData.mobileModel.length === 11 &&
        //   !this.$vocenApi.Pattern.isPhone(this.formData.mobileModel)
        // ) {
        //   this.rulePhone = '手机号格式有误，请重新填写'
        //   return
        // } else {
        //   this.rulePhone = ''
        // }
        console.log('this.formData', this.formData)
        if (
          (this.formData.personModel || this.formData.delivery) &&
          this.formData.mobileModel &&
          this.formData.addressModel &&
          this.formData.detailModel
        ) {
          this.confirmSelect = true
        } else {
          this.confirmSelect = false
        }
      },
      //新增地址
      addAddressRequest(param) {
        showLoading()
        this.$VoHttp
          .apiReceiverAddress$Post(param)
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('地址添加成功')
              setTimeout(() => {
                // this.$linkToEasy('/pagesSupplier/Setting/AddressHome')
                this.$backFn()
              }, 1500)
            } else {
              uni.$u.toast(res.message || '地址添加失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '地址添加失败')
          })
          .finally(() => {
            hideLoading()
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .addressAdd {
    width: 750rpx;
    height: 100vh;
    overflow: hidden;

    &-line {
      height: 24rpx;
      background-color: #f8f8f8;
      width: 100%;
    }

    &-form {
      padding: 0 32rpx 0 50rpx;
      background: #ffffff;

      &__item {
        text-align: right;
        border-bottom: 2rpx solid $v-bg-light;
        padding-bottom: 10rpx;

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

      &__textarea {
        color: $v-c0-25 !important;
        font-size: 32rpx !important;
      }
    }

    &-content {
      background-color: #ffffff;

      &__line {
        padding: 0rpx 32rpx;
        width: 100%;
        height: 2rpx;
        background-color: $v-bg-light;
      }

      &__people {
        padding: 0rpx 32rpx;
        height: 96rpx;

        .title {
          color: $v-c0-85;
          font-size: 32rpx;
        }

        .input {
          text-align: right;
          padding-left: 30rpx;
        }
      }

      &__address {
        padding: 0rpx 32rpx;
        height: 96rpx;

        .title {
          color: $v-c0-85;
          font-size: 32rpx;
        }

        .right {
          text-align: right;
          padding-left: 30rpx;
          font-size: 32rpx;

          &-icon {
            padding-left: 8rpx;
          }
        }
      }

      &__detail {
        padding: 0rpx 32rpx;

        .title {
          padding-top: 26rpx;
          color: $v-c0-85;
          font-size: 32rpx;
        }

        .right {
          text-align: right;
          padding-left: 30rpx;
          font-size: 32rpx;

          &-icon {
            padding-left: 8rpx;
          }
        }
      }
    }

    &-bottom {
      position: fixed;
      left: 0rpx;
      bottom: 0rpx;
      height: 132rpx;
      width: 100%;
      background-color: #ffffff;

      &__confirm {
        margin: 20rpx 47rpx;
        height: 92rpx;
        line-height: 92rpx;
        text-align: center;
        background-color: $color-disabled-yellow;
        color: $v-c0-25;
        font-size: 32rpx;
        border-radius: 48rpx;
      }

      &__select {
        background-color: $color-primary-yellow;
        color: #ffffff;
      }
    }

    .tips {
      color: #e50012;
      font-size: 24rpx;
      background-color: #f8f8f8;
      padding-left: 32rpx;
      padding-top: 8rpx;
      padding-bottom: 16rpx;
    }

    .alert-box {
      padding: 24rpx 32rpx;
      color: #fda202;
      background: #fff8eb;
    }
  }

  .flex1 {
    flex: 1;
  }
</style>
