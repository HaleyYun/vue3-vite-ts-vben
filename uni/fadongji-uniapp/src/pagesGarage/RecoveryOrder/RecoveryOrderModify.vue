<!-- eslint-disable vue/no-deprecated-destroyed-lifecycle -->
<template>
  <view>
    <view class="val flex flex-column">
      <VoNav :left-width="200" is-fixed isHaveMore title="修改回收单" />
      <view class="flex1">
        <view class="val-explain fz-32">
          <view class="fz-b">服务项目</view>
          <view class="m-t-48 flex flex-justify-between">
            <view>{{ orderDetail.supportName }}</view>
            <view>{{ orderDetail.supportAmount }}元</view>
          </view>
        </view>
        <EraForm
          ref="form"
          :model="formData"
          :rules="rules"
          class="val-form m-t-16"
          labelPosition="left"
          labelWidth="130"
        >
          <EraFormItem
            class="val-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="上门地址"
            required
            @click="goShippingAddress"
          >
            <VoIcon slot="right" :opacity="0.45" :size="20" color="#000" name="right-arrow" />
          </EraFormItem>

          <EraFormItem class="val-form__item" color="rgba(0, 0, 0, 0.85)" prop="addressDetail">
            <view
              class="val-choose flex flex-vertical-c flex-justify-between"
              @click="goShippingAddress"
            >
              <VoIcon :size="20" color="#373A4E" name="address" class="m-r-16" />
              <view :class="address !== '请选择地址' ? 'val-form__text' : 'val-form__placeholder'">
<!--                {{ orderDetail }}-->
                <view class="fz-28 color-block font-weight-500">
                  {{ addressInfo.name }} {{ addressInfo.phone || addressInfo.mobile }}
                </view>
                <view class="fz-28 color-block">{{ address }}</view>
              </view>
            </view>
          </EraFormItem>
          <EraFormItem
            class="val-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="上门时间"
            required
            @click="showTime = true"
          >
            <VoIcon slot="right" :opacity="0.45" :size="20" color="#000" name="right-arrow" />
          </EraFormItem>
          <EraFormItem class="val-form__item" color="rgba(0, 0, 0, 0.85)" prop="homeStartTime">
            <view
              class="val-choose flex flex-vertical-c flex-justify-between"
              @click="showTime = true"
            >
              <view :class="serviceDate ? 'val-form__text' : 'val-form__placeholder'">
                {{ serviceDate + '  ' + serviceTime }}
                <text v-if="serviceDate">(上门)</text>
                <text v-else>请选择上门时间</text>
              </view>
            </view>
          </EraFormItem>
        </EraForm>

        <view class="m-b-20" />
        <VoTimePicker
          :default-time.sync="dateTime"
          :show="showTime"
          @close="showTime = false"
          @confirm="timePickerConfirm"
        />
      </view>
      <view class="val-bottom flex flex-justify-between flex-vertical-c">
        <view class="flex flex-vertical-c flex-column m-r-32">
          <VoIcon name="customer-service-new" />
          <view class="fz-22 color-block-main m-t-8">客服</view>
        </view>
        <!--        <u-button color="#FF5319" shape="circle" text="立即换钱"></u-button>-->
        <view class="val-bottom__disabled">
          <u-button
            v-if="formData.homeEndTime"
            class="uploaded-footer__button"
            shape="circle"
            text="保存"
            color="#ff5319"
            :loading="loading"
            @click="handleSubmit"
          />
          <u-button v-else class="uploaded-footer__button" shape="circle" text="保存" disabled />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import VoTimePicker from '@/components/VoTimePicker/VoTimePicker'
  export default {
    name: 'RecoveryValuation',
    components: { VoTimePicker },
    data() {
      return {
        loading: false,
        timer: null,
        id: '',
        orderDetail: {},
        supportSource: 1,
        showTime: false, // 选择上门时间弹框
        countArr: ['1'], //当前页面发动机显示数量
        serviceDate: '',
        serviceTime: '',
        dateTime: '',
        address: '请选择地址',
        engineNm: 1,
        formData: {
          addressDetail: '', // 上门地址
          homeEndTime: '', //上门结束时间
          homeStartTime: '', //上门开始时间
        },
        addressInfo: '',
        rules: {
          addressDetail: {
            required: true,
            message: '请选择地址',
            trigger: ['blur'],
          },
          homeStartTime: {
            required: true,
            message: '请选择上门时间',
            trigger: ['blur'],
          },
        },
      }
    },
    onLoad(val) {
      if (val && val.id) {
        this.id = val.id
      }
      uni.$on('ChooseAddress', (val) => {
        console.log(val);
        const address = val.provinceName + val.cityName + val.areaName + val.address
        this.address = address
        this.formData.addressDetail = val.id
        this.addressInfo = val
      })
      this.reqDetail()
    },

    methods: {
      /**
       * 去收货地址页面
       */
      goShippingAddress() {
        this.$linkToEasy('/pagesSupplier/Setting/AddressHome?type=1')
      },

      timePickerConfirm(val) {
        this.serviceDate = val.date
        const timeArr = val.time.split('-')
        this.formData.homeStartTime = this.serviceDate + ' ' + timeArr[0] + ':00'
        this.formData.homeEndTime = this.serviceDate + ' ' + timeArr[1] + ':00'
        this.serviceTime = val.time
        this.showTime = false
      },
      async handleSubmit() {
        try {
          console.log(this.formData, this.id)
          const { code, message } = await this.$VoHttp.apiOrderRecycleUpdate({
            ...this.formData,
            addressDetail: this.formData.addressDetail.toString(),
            id: this.id,
          })
          uni.$u.toast(message)
          if (code == 20001) {
            uni.$u.toast(message)
            this.timer = setTimeout(() => {
              uni.navigateBack()
              uni.$emit('refresh')
            }, 1500)
          } else {
            this.loading = false
          }
        } catch (err) {
          uni.$u.toast(err.message)
          this.loading = false
        }
      },
      async reqDetail() {
        const res = await this.$VoHttp.apiOrderRecycleDetail({
          id: this.id,
        })
        if ((res.code = 20001)) {
          const { address, addressDetail, areaCode, id } = JSON.parse(
            res.data.addressDetail,
            (key, val) => {
              if (key == 'id') return BigInt(val)
              else return val
            },
          )
          console.log(res.data);
          this.address = address + addressDetail
          this.orderDetail = res.data
          this.addressInfo = JSON.parse(res.data.addressDetail)
          console.log(this.orderDetail);
          this.formData.addressDetail = id
          this.formData.homeStartTime = res.data.homeStartTime
          this.formData.homeEndTime = res.data.homeEndTime
          this.serviceDate = res.data.homeStartTime.split(' ')[0]
          this.serviceTime =
            res.data.homeStartTime.split(' ')[1] + '-' + res.data.homeEndTime.split(' ')[1]
          this.dateTime = `${this.serviceDate} ${res.data.homeStartTime
            .split(' ')[1]
            .slice(0, 5)}-${res.data.homeEndTime.split(' ')[1].slice(0, 5)}`
          console.log(this.dateTime)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .val {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    &-record {
      width: 120rpx;
      height: 56rpx;
      line-height: 56rpx;
      text-align: center;
      margin-right: 24rpx;
      color: #ff5319;
      font-size: 24rpx;
      border: 2rpx solid #ff5319;
      border-radius: 100rpx;
      box-sizing: border-box;
    }
    &-explain {
      margin-top: 16rpx;
      background: #fff;
      padding: 24rpx 32rpx;
    }
    &-form {
      &__item {
        text-align: right;
        padding: 0 32rpx;
        border-bottom: 2rpx solid $v-bg-light;
        background: #ffffff;

        .item-input {
          padding: 4rpx;
        }
        .item-code {
          margin-left: 24rpx;
        }
      }
      &__code {
        font-size: 32rpx;
        line-height: 1.5;
        color: var(--color-primary);
      }
      &__placeholder {
        color: $v-c0-25 !important;
        font-size: 32rpx !important;
      }
      &__text {
        width: 100%;
        color: $v-c0-85 !important;
        font-size: 32rpx !important;
      }
    }
    &-expect {
      background: #fff;
      padding: 24rpx 32rpx;
      font-size: 32rpx;
      color: $v-c0-85;
    }
    &-add {
      padding: 24rpx 32rpx;
      font-size: 32rpx;
      text-align: center;
      color: $v-c0-45;
    }
    &-choose {
      width: 100%;
      text-align: left;
      background: #fff;
      font-size: 32rpx;
    }
    &-bottom {
      padding: 24rpx 32rpx;
      background: #fff;
      &__disabled {
        width: 100%;
        // height: 80rpx;
        // line-height: 80rpx;
        // text-align: center;
        // background: #f6f7f8;
        // border-radius: 48rpx;
        // color: $v-c0-25;
        font-size: 32rpx;
        .uploaded-footer__button {
          height: 80rpx;
        }
      }
    }
  }
</style>
