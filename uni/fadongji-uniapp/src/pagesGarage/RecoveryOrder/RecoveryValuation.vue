<!-- eslint-disable vue/no-deprecated-destroyed-lifecycle -->
<template>
  <view>
    <view class="val flex flex-column">
      <VoNav :left-width="200" :right-width="200" is-fixed isHaveMore title="回收估价">
        <block slot="operation">
          <view class="val-record" @click="toList">回收订单</view>
        </block>
      </VoNav>
      <view class="flex1 overflow-y">
        <view class="val-explain">
          <view class="fz-b fz-28 color-block">回收说明</view>
          <view class="m-t-8 fz-24 color-block-65">提交订单-上门查验-极速放款</view>
        </view>
        <EngineComponentVue
          v-for="(item, index) in countArr"
          :key="item"
          :ref="'Engine' + index"
          :index="index"
          :tag="item"
          @deleteCount="deleteCount"
          @refresh="validateFormHandler"
        />
        <view v-if="engineNm < 10" class="val-add" @click="addCount">+添加发动机</view>
        <EraForm
          ref="form"
          :model="formData"
          :rules="rules"
          class="val-form"
          labelPosition="left"
          labelWidth="130"
        >
          <EraFormItem
            class="val-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="上门地址"
            required
          />
          <EraFormItem class="val-form__item" color="rgba(0, 0, 0, 0.85)" prop="addressDetail">
            <view
              class="val-choose flex flex-vertical-c flex-justify-between"
              @click="goShippingAddress"
            >
              <view :class="address !== '请选择地址' ? 'val-form__text' : 'val-form__placeholder'">
                <view v-if="address !== '请选择地址'">{{ choseName + ' ' + choseMobile }}</view>
                <view class="overOneEllipsis">{{ address }}</view>
              </view>
              <VoIcon :opacity="0.45" :size="20" color="#000" name="right-arrow" />
            </view>
          </EraFormItem>
          <EraFormItem
            class="val-form__item m-t-16"
            color="rgba(0, 0, 0, 0.85)"
            label="上门时间"
            required
          />
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
              <VoIcon :opacity="0.45" :size="20" color="#000" name="right-arrow" />
            </view>
          </EraFormItem>
        </EraForm>

        <view class="m-b-20" />
        <VoTimePicker
          :default-time.sync="serviceDefaultDate"
          :show="showTime"
          @close="showTime = false"
          @confirm="timePickerConfirm"
        />
      </view>
      <view class="fixed">
        <view class="val-bottom flex flex-justify-between flex-vertical-c">
          <view class="flex flex-vertical-c flex-column m-r-32" @click="goOnlineFn">
            <VoIcon name="customer-service-new" />
            <view class="fz-22 color-block-main m-t-8">客服</view>
          </view>
          <!--        <u-button color="#FF5319" shape="circle" text="立即换钱"></u-button>-->
          <view class="val-bottom__disabled">
            <u-button
              v-if="isEnable"
              :loading="loading"
              class="uploaded-footer__button"
              color="#ff5319"
              shape="circle"
              text="立即换钱"
              @click="handleSubmit"
            />
            <view v-else class="bottom-btn"> 立即换钱</view>
          </view>
        </view>
        <VoSafetyArea :is-fixed="false" />
      </view>
    </view>
    <u-modal
      :show="showReal"
      cancel-text="暂不实名"
      confirm-text="立即实名"
      confirmColor="#22284B"
      show-cancel-button
      @cancel="$backFn"
      @confirm="confirmHandler"
    >
      <view class="info-content">您的账号未实名，请先完成实名认证。</view>
    </u-modal>

    <!-- <TimePopup :show.sync="showTime" /> -->
  </view>
</template>

<script>
  import { mapGetters } from 'vuex'
  import VoTimePicker from '@/components/VoTimePicker/VoTimePicker'
  import EngineComponentVue from './components/EngineComponent.vue'
  import { fetchNextTimeDistance, goOnlineCustomerFn } from '@/common/helper'

  // 申请回收存储key
  // const keyForm = 'RecoveryValuationForm'

  export default {
    name: 'RecoveryValuation',
    components: { VoTimePicker, EngineComponentVue },
    data() {
      return {
        isEnable: false,
        showReal: false,
        isRealName: true,
        loading: false,
        timer: null,
        supportSource: 1,
        showTime: false, // 选择上门时间弹框
        countArr: ['1'], //当前页面发动机显示数量
        serviceDate: '',
        serviceTime: '',
        address: '请选择地址',
        choseName: '',
        choseMobile: '',
        engineNm: 1,
        formData: {
          supportSource: 1, //1:单独发起回收，2：订单回收
          isDisplay: true,

          addressDetail: '', // 上门地址
          //   buyerId: '', //客户id
          //   buyerName: '', //客户名称
          engineMsg: [],
          homeEndTime: '', //上门结束时间
          homeStartTime: '', //上门开始时间
          homeMsg: '', //上门指导信息
          //   relationOrderId: '', //关联订单
          //   supportAmount: '', //服务价格
          //   supportName: null,
          //   supportProfit: '',
          supportType: 33,
        },
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
        nowDate: this.$vocenApi.VoUtils.timeFormat(new Date(), 'yyyy-mm-dd hh:MM:ss'),
        serviceDefaultDate: '',
      }
    },
    watch: {
      formData: {
        deep: true,
        handler() {
          this.validateFormHandler()
        },
      },
    },
    computed: {
      ...mapGetters({
        userInfo: 'user/userInfoGetter',
      }),
    },
    onLoad() {
      console.log('onLoad')
    },
    mounted() {
      uni.$on('ChooseAddress', (val) => {
        this.choseName = val.name
        this.choseMobile = val.mobile
        const address = val.provinceName + val.cityName + val.areaName + val.address
        this.address = address
        this.formData.addressDetail = val.id
      })
    },
    // eslint-disable-next-line vue/no-deprecated-destroyed-lifecycle
    beforeDestroy() {
      if (this.timer) {
        console.log('清除timer')
        this.loading = false
        clearTimeout(this.timer)
      }
    },
    onShow() {
      // 临时注释-放到2月5号处理
      // if (this.$storage.keyForm) {
      //   const { postForm, choseName, choseMobile, address, serviceDate, serviceTime } =
      //     this.$storage.get(keyForm)
      //   console.log(postForm)
      //   this.chooseName = choseName
      //   this.choseMobile = choseMobile
      //   this.address = address
      //   this.serviceDate = serviceDate
      //   this.serviceTime = serviceTime
      //   // this.formData = this.$vocenApi._.cloneDeep(postForm)
      // } else {
      //   const serviceTime = fetchNextTimeDistance()
      //   const sArr = serviceTime.split(' ')
      //   this.serviceDate = sArr[0]
      //   this.serviceTime = sArr[1]
      //   this.formData.homeStartTime = this.serviceDate + ' ' + sArr[0] + ':00'
      //   this.formData.homeEndTime = this.serviceDate + ' ' + sArr[1] + ':00'
      // }

      // 默认上门时间
      const serviceTime = fetchNextTimeDistance()
      this.serviceDefaultDate = serviceTime
      const sArr = serviceTime.split(' ')
      this.serviceDate = sArr[0]
      this.serviceTime = sArr[1]
      const secondTime = sArr[1].split('-')
      this.formData.homeStartTime = this.serviceDate + ' ' + secondTime[0] + ':00'
      this.formData.homeEndTime = this.serviceDate + ' ' + secondTime[1] + ':00'
      this.initFn()
    },
    methods: {
      validateFormHandler() {
        const arr = []
        for (let i = 0; i < this.countArr.length; i++) {
          arr.push(this.$refs['Engine' + i][0].validate())
        }
        arr.push(this.$refs.form.validate())

        Promise.all(arr)
          .then((res) => {
            console.log(res)
            this.isEnable = res.every((item) => item === true)
          })
          .catch((res) => {
            console.log(res)
            this.isEnable = false
          })
      },
      goOnlineFn() {
        goOnlineCustomerFn(1)
      },
      confirmHandler() {
        this.$linkToEasy('/pagesGarage/UserCenter/RealName')
      },
      async initFn() {
        this.isRealName = await this.$VoHttp.apiCompanyLegalRealName$GET().then((res) => res.data)
      },
      /**
       * 去收货地址页面
       */
      goShippingAddress() {
        this.$linkToEasy('/pagesSupplier/Setting/AddressHome?type=1')
      },
      addCount() {
        if (this.engineNm < 10) {
          const date = new Date()
          this.countArr.push(date.toString())
          this.engineNm++
        }
      },
      deleteCount(val) {
        this.countArr.splice(this.countArr.indexOf(val, 1))
      },
      timePickerConfirm(val) {
        let homeEndTime = val.date + ' ' + val.time.split('-')[1] + ':00'
        if (homeEndTime <= this.nowDate) {
          this.$u.toast('上门时间不能小于当前时间~~')
          return
        }
        this.serviceDate = val.date
        const timeArr = val.time.split('-')
        this.formData.homeStartTime = this.serviceDate + ' ' + timeArr[0] + ':00'
        this.formData.homeEndTime = this.serviceDate + ' ' + timeArr[1] + ':00'
        this.serviceTime = val.time
        this.showTime = false
      },
      toList() {
        this.$linkToEasy('/pagesGarage/RecoveryOrder/RecoveryOrderList')
      },
      //重置
      resetFn() {
        for (let i = 0; i < this.countArr.length; i++) {
          this.$refs['Engine' + i][0].resetForm()
        }
        this.countArr = ['1']
        this.address = '请选择地址'
        for (let key in this.formData) {
          this.formData[key] = ''
        }
        this.formData.supportType = 33
        this.formData.supportSource = 1 //1:单独发起回收，2：订单回收
        this.formData.isDisplay = true
        this.formData.engineMsg = []
        this.serviceDate = ''
        this.serviceTime = ''
      },
      async handleSubmit() {
        const arr = []
        for (let i = 0; i < this.countArr.length; i++) {
          arr.push(this.$refs['Engine' + i][0].validate())
        }
        arr.push(this.$refs.form.validate())

        Promise.all(arr)
          .then(async (res) => {
            this.loading = true
            this.formData.engineMsg = []
            for (let i = 0; i < this.countArr.length; i++) {
              const obj = {
                ...this.$refs['Engine' + i][0].formData,
                pic: JSON.parse(this.$refs['Engine' + i][0].formData.pic),
              }
              this.formData.engineMsg.push(obj)
            }
            const postForm = {
              ...this.formData,
              engineMsg: JSON.stringify(this.formData.engineMsg),
            }
            // 临时暂存-放到2月5号处理
            // if (!this.isRealName) {
            //   // 存储表单信息
            //   this.loading = false
            //   this.$storage.set(keyForm, {
            //     postForm: postForm,
            //     choseName: this.chooseName,
            //     choseMobile: this.choseMobile,
            //     address: this.address,
            //     serviceDate: this.serviceDate,
            //     serviceTime: this.serviceTime,
            //   })
            //   this.$linkToEasy(
            //     '/pagesGarage/UserCenter/RealName?redirect=/pagesGarage/RecoveryOrder/RecoveryValuation',
            //   )
            //   return
            // }
            if (!this.isRealName) {
              this.loading = false
              this.$linkToEasy(
                '/pagesGarage/UserCenter/RealName?redirect=/pagesGarage/RecoveryOrder/RecoveryValuation',
              )
              return
            }
            try {
              const { code, data, message } = await this.$VoHttp.apiOrderRecycleSave(postForm)
              uni.$u.toast(message)
              if (code == '20001') {
                uni.$u.toast(message)
                this.timer = setTimeout(() => {
                  this.loading = false
                  this.resetFn()
                  this.$linkToEasy('/pagesGarage/RecoveryOrder/RecoveryOrderList')
                }, 1500)
              } else {
                uni.$u.toast(err.message)
                this.loading = false
              }
            } catch (e) {
              this.loading = false
            }
          })
          .catch((err) => {
            this.loading = false
            console.log(err)
          })
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

  .info-content {
    padding: 15px 3px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 30rpx;
    line-height: 150%;
  }

  .bottom-btn {
    font-size: 32rpx;
    line-height: 1.5;
    padding: 16rpx 0;
    color: rgba(0, 0, 0, 0.25);
    background: #f6f7f8;
    border-radius: 48rpx;
    text-align: center;
  }
</style>
