<template>
  <view class="replenish">
    <VoNav :is-fixed="false" :show-back="false" title="补充信息" />
    <view class="bg-white p-l-32 p-b-20 m-t-20">
      <u--form
        labelPosition="left"
        label-width="80"
        :model="replenishForm"
        :rules="rules"
        ref="replenishForm"
      >
        <u-form-item label="负责人名称" prop="name" required border-bottom>
          <u-input
            v-model="replenishForm.name"
            inputAlign="right"
            border="none"
            placeholder="请输入负责人名称"
            cearable
          >
            <view slot="suffix" class="flex flex-vertical-c p-r-32" />
          </u-input>
        </u-form-item>
        <u-form-item
          label="所在地区"
          prop="areaCode"
          required
          border-bottom
          @click="showChooseAddressProp = true"
        >
          <u-input
            v-model="replenishForm.areaCodeName"
            inputAlign="right"
            border="none"
            readonly
            placeholder="请选择省、市、区/县"
          >
            <view
              slot="suffix"
              class="flex flex-vertical-c p-r-32"
              @click.stop="chooseAddressHandler"
            >
              <view class="map-icon" />
              <view class="color-block-65 lh0 m-l-5 text-32">定位</view>
            </view>
          </u-input>
        </u-form-item>
        <u-form-item label-position="top" label="详细地址" prop="address" required border-bottom>
          <view class="flex w-full flex-vertical-c">
            <u-textarea
              v-model="replenishForm.address"
              border="none"
              autoHeight
              placeholder="小区漏楼栋/乡村名称"
              class="flex-1"
            />
            <view class="w-80">
              <VoIcon
                v-if="replenishForm.address"
                :opacity="0.45"
                :size="24"
                class="right-icon"
                color="#000"
                name="close-fill"
                @click="replenishForm.b = ''"
              />
            </view>
          </view>
        </u-form-item>
        <u-form-item label="联系电话" prop="contractPhone" required border-bottom>
          <u-input
            v-model="replenishForm.contractPhone"
            inputAlign="right"
            border="none"
            placeholder="请输入联系电话"
          >
            <view slot="suffix" class="flex flex-vertical-c p-r-32">
              <view class="color-block-65 lh0 m-l-5 text-32" />
            </view>
          </u-input>
        </u-form-item>
        <u-form-item label="验证码" prop="verificationCode" required>
          <u-input
            v-model="replenishForm.verificationCode"
            inputAlign="right"
            border="none"
            type="number"
            :maxlength="6"
            placeholder="请输入验证码"
          >
            <view slot="suffix" class="flex flex-vertical-c p-r-32">
              <view class="color-block-65 lh0 m-l-5 text-32 msg-code" @click="getCode">{{
                tips
              }}</view>
            </view>
          </u-input>
        </u-form-item>
      </u--form>
    </view>
    <view class="submit bg-white">
      <u-button
        size="large"
        :disabled="disabled"
        color="#FF5319"
        shape="circle"
        text="提交认证信息"
        :loading="loading"
        @click="submitHandler"
      />
    </view>
    <u-code :seconds="seconds" changeText="xs" ref="uCode" @change="codeChange" />
    <VoAddress :show.sync="showChooseAddressProp" @sureFn="sureAddressFn" />
  </view>
</template>

<script>
  import { getLocation, hideLoading, showLoading, toRoleHome } from '@/common/helper'

  export default {
    name: 'ReplenishInfo',
    data() {
      return {
        loading: false,
        showChooseAddressProp: false,
        seconds: 60,
        tips: '获取验证码',
        rules: {
          name: [
            {
              type: 'string',
              required: true,
              message: '负责人名称不能为空',
              trigger: ['blur', 'change'],
            },
          ],
          areaCode: [
            {
              type: 'string',
              required: true,
              message: '所在地区不能为空',
              trigger: ['blur', 'change'],
            },
          ],
          address: [
            {
              type: 'string',
              required: true,
              message: '详细地址不能为空',
              trigger: ['blur', 'change'],
            },
          ],
          contractPhone: [
            {
              type: 'string',
              pattern: this.$vocenApi.Pattern.phone,
              required: true,
              message: '联系方式格式不正确',
              trigger: ['blur', 'change'],
            },
          ],
          verificationCode: [
            {
              pattern: /\d{6}/,
              type: 'string',
              required: true,
              message: '验证码格式不正确',
              trigger: ['blur', 'change'],
            },
          ],
        },
        replenishForm: {
          name: '',
          areaCodeName: '',
          verificationCode: '',
          address: '',
          contractPhone: '',
          areaCode: '',
        },
        locationgTips: {
          message: '定位服务未开启，请在系统设置中开启定位服务',
          cancel: '取消',
          confirm: '去设置',
        },
      }
    },
    computed: {
      disabled() {
        return !(
          this.replenishForm.address &&
          this.replenishForm.contractPhone &&
          this.replenishForm.verificationCode &&
          this.replenishForm.areaCode
        )
      },
    },
    methods: {
      submitHandler() {
        this.$refs.replenishForm
          .validate()
          .then(async () => {
            this.loading = true
            try {
              const { code, message } = await this.$VoHttp.apiCompanyLegalAddressGarage(
                this.replenishForm,
              )
              console.log(message)
              this.loading = false
              if (+code === 20001) {
                uni.$u.toast('提交成功')
                setTimeout(() => {
                  toRoleHome()
                }, 1500)
              }
            } catch (e) {
              this.loading = false
              uni.$u.toast(e.message || '提交失败~~')
            }
          })
          .catch((errors) => {
            this.loading = false
            if (errors && errors.length) {
              uni.$u.toast(errors[0].message)
            }
          })
      },
      /**
       * 通过经纬度获取省市区
       */
      async getAddress(info) {
        showLoading()
        await this.$VoHttp
          .apiSixhotAreaTertiaryInfo({ ...info })
          .then(({ data }) => {
            this.replenishForm.areaCode = data.areaCode
            this.replenishForm.areaCodeName = `${data.provinceName}${data.cityName}${data.areaName}`
            this.replenishForm.address = info.name
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
      sureAddressFn(data) {
        this.replenishForm.areaCodeName = data[0].name + data[1].name + data[2].name
        this.replenishForm.areaCode = data[2].code
      },
      async chooseAddressHandler() {
        console.log('选择地址')
        let LocationInfo = await getLocation(this.locationgTips)
        console.log(LocationInfo)
        if (!LocationInfo || !LocationInfo.longitude) return
        const data = await this.$openLocation()
        console.log(data)
        await this.getAddress(data)
      },
      codeChange(text) {
        this.tips = text
      },
      getCode() {
        if (!this.replenishForm.contractPhone) {
          return uni.$u.toast('联系方式不能为空')
        }
        if (!this.$vocenApi.Pattern.isPhone(this.replenishForm.contractPhone)) {
          uni.$u.toast('请输入正确的手机号')
          return
        }
        if (this.$refs.uCode.canGetCode) {
          // 模拟向后端请求验证码
          uni.showLoading({
            title: '正在获取验证码',
            mask: true,
          })
          let param = {
            mobile: this.replenishForm.contractPhone,
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
    },
    onReady() {
      //如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
      this.$refs.replenishForm.setRules(this.rules)
    },
    onLoad(option) {
      this.replenishForm.contractPhone = option?.phone
    },
  }
</script>

<style scoped lang="scss">
  ::v-deep .u-form-item__body__right__message {
    margin-left: 0 !important;
  }
  .msg-code {
    color: #ff5319;
  }
  .map-icon {
    width: 40rpx;
    height: 40rpx;
    background: url('https://dcp.fdjcyl.com/GongChuangJi/2023/1/30/1675068473159lQLPJv87ZcH99SAoKLA5Jt4P40F_RQPSFT2TwAgA_40_40.png')
      no-repeat center center;
    background-size: 100% 100%;
  }
  .replenish {
    padding-bottom: 85px;
  }
  .submit {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20rpx 32rpx 70rpx;
  }
</style>
