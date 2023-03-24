<template>
  <view>
    <view class="detail flex flex-column color-block fz-28">
      <VoNav is-fixed is-have-more title="修改安装订单"> </VoNav>
      <view class="flex1 overflow-y">
        <!-- 服务信息 -->
        <view class="info bg-white m-t-16">
          <view class="title fz-32 border-bottom p-b-24">服务信息</view>
          <view class="font-weight-500 m-t-24 m-b-24">{{ orderData.supportName }}</view>
          <view class="info-row flex">
            <view>服务金额：</view>
            <view>
              <VoPointPrice :price="orderData.supportAmount" color="#E50012" show-unit />
            </view>
          </view>
        </view>
        <!--   地址信息   -->
        <view class="info bg-white m-t-16">
          <view class="title fz-32 border-bottom p-b-24 m-b-24">上门地址</view>
          <view class="">
            <view v-if="orderAddress.name" class="detail-address__info flex flex-vertical-c">
              <view>
                <VoIcon name="address" />
              </view>
              <view class="m-l-8 info-place">
                <view class="fz-28 flex flex-vertical-c">
                  <text class="m-r-8"> {{ orderAddress.name }} </text>
                  <text> {{ orderAddress.phone }}</text>
                  <!-- <VoIcon :size="20" color="#155bd4" name="phone-supplier" /> -->
                </view>
                <view class="fz-26 m-t-8">
                  {{ orderAddress.address }}{{ orderAddress.addressDetail }}</view
                >
              </view>
              <view class="flex flex1 flex-vertical-c flex-justify-r">
                <VoIcon
                  :opacity="0.45"
                  color="#000000"
                  name="right-arrow"
                  @click="editAddressClick()"
                />
              </view>
            </view>
            <view
              v-else
              class="add-box bg-white text-center font-weight-500 fz-32"
              @click="addAddressClick"
              >+添加新地址</view
            >
          </view>
        </view>
        <!-- 上门时间  -->
        <view class="info bg-white m-t-16">
          <view class="title fz-32 border-bottom p-b-24 m-b-24">上门时间</view>
          <view class="info-row flex">
            <view class="flex1">{{ upTime }}上门</view>
            <VoIcon :opacity="0.45" color="#000000" name="right-arrow" @click="showTimePicker()" />
          </view>
        </view>
      </view>
      <view class="btm flex flex-justify-r bg-white">
        <EraButton class="m-l-20" @click="toSubmit()">保存</EraButton>
        <view class="p-b-safe-area" />
      </view>
    </view>
    <VoTimePicker
      :default-time.sync="upTime"
      :show="timePickerShow"
      @close="timePickerShow = false"
      @confirm="timePickerConfirm"
    />
  </view>
</template>
<script>
  // import TimePicker from '@/pagesGarage/InstallOrder/components/TimePicker'
  // #ifdef APP-PLUS
  const vocenPay = uni.requireNativePlugin('vocen-pay')
  // #endif
  export default {
    name: 'OrderDetail',
    components: {},
    data() {
      return {
        showCancel: false,
        showPay: false,
        timePickerShow: false,
        upTime: '',

        totalPrice: 0,
        type: 1110,
        orderId: '',
        orderData: {
          // id: '111',
          // status: 1110,
          // shopName: 'danfihi1',
          // warehouseName: 'zhengzhou',
          // goodsDetail: [
          //   {
          //     status: 1110,
          //     goodsName: '江陵动力 全EA888发动机总成适用于奥迪1.8T 二代发动机(升级款)全',
          //     periodDays: 10,
          //     goodsCount: 1,
          //     originalPrice: 0,
          //     pic: ['/static/icons/reduce.png'],
          //     addedServices: [
          //       {
          //         name: '定制服务：',
          //         price: 99,
          //         count: 1,
          //       },
          //     ],
          //   },
          // ],
        }, //订单详情数据
        goodsDetail: '',
        //地址信息
        orderAddress: {
          id: '',
          name: '',
          phone: '',
          address: '',
          addressDetail: '',
        },
        timeData: {
          homeStartTime: '',
          homeEndTime: '',
        },
        isLoading: false,
      }
    },
    onLoad(option) {
      if (!this.orderId) {
        this.orderId = option.id
        this.getDetail()
      }
      //更改地址回显
      // uni.$off('selectAddress')
      uni.$off('ChooseAddress')
      // uni.$on('selectAddress', (res) => {
      uni.$on('ChooseAddress', (res) => {
        console.log('ChooseAddress', res)
        this.orderAddress = {
          id: res.id,
          name: res.name,
          phone: res.mobile,
          address: '',
          addressDetail: res.provinceName + res.cityName + res.areaName + res.address,
        }
      })
    },
    onShow() {},
    methods: {
      /**
       * 添加新地址
       */
      addAddressClick() {
        let data = {}
        this.$linkToEasy(
          `/pagesSupplier/Setting/AddAddress?data=${JSON.stringify(data)}&type=1&title=上门地址`,
        )
      },
      getDetail() {
        this.$VoHttp
          .apiOrderInstallDetail$Id({ id: this.orderId })
          .then((res) => {
            if (res.data) {
              let data = res.data
              if (res.data.goodsDetail && res.data.goodsDetail.length) {
                this.goodsDetail = res.data.goodsDetail[0]
              }
              //组装时间段
              if (data.homeStartTime && data.homeEndTime) {
                this.timeData = {
                  homeStartTime: data.homeStartTime,
                  homeEndTime: data.homeEndTime,
                }
                this.upTime =
                  this.$vocenApi.VoUtils.timeFormat(data.homeStartTime, 'yyyy-mm-dd hh:MM') +
                  '-' +
                  this.$vocenApi.VoUtils.timeFormat(data.homeEndTime, 'hh:MM')
              }
              if (res.data.addressDetail) {
                this.orderAddress = JSON.parse(res.data.addressDetail)

                //通过此方法获取地址id，防止id转换错误
                let arr = res.data.addressDetail.split(',')
                arr.forEach((ele) => {
                  if (ele.indexOf('id') > -1) {
                    this.orderAddress.id = ele.split(':')[1].trim()
                  }
                })
                console.log('orderAddress===', this.orderAddress)
              }

              this.orderData = data
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('订单详情获取失败')
          })
      },
      /**
       * 修改地址
       */
      editAddressClick() {
        // this.$linkToEasy(
        //   `/pagesCommon/AddressList/AddressList?addressId=${this.orderAddress.id}&type=3&origin=install&title=安装地址`,
        // )
        this.$linkToEasy('/pagesSupplier/Setting/AddressHome?type=1&title=上门地址')
      },
      //上门时间
      showTimePicker() {
        this.timePickerShow = true
      },
      //上门时间
      timePickerConfirm(data) {
        this.upTime = data.dateTime
        const timeArr = data.time.split('-')
        this.timeData.homeStartTime = data.date + ' ' + timeArr[0] + ':00'
        this.timeData.homeEndTime = data.date + ' ' + timeArr[1] + ':00'
        console.log(this.timeData)
        this.timePickerShow = false
      },
      //提交
      toSubmit() {
        if (this.isLoading) {
          return
        }
        this.isLoading = true
        let params = {
          id: this.orderId,
          addressId: this.orderAddress.id,
          homeStartTime: this.timeData.homeStartTime,
          homeEndTime: this.timeData.homeEndTime,
        }

        this.$VoHttp
          .apiOrderInstallUpdate(params)
          .then((res) => {
            this.$u.toast('修改成功')
            setTimeout(() => {
              this.$backFn()
              this.isLoading = true
              uni.$emit('updateSuccess')
            }, 1000)
          })
          .catch((err) => {
            this.$u.toast(err.message || '修改失败')
          })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .detail {
    width: 750rpx;
    height: 100vh;
    box-sizing: border-box;
    .padding-box {
      padding: 28rpx 32rpx;
      box-sizing: border-box;
    }
    .info {
      padding: 24rpx 32rpx;
      box-sizing: border-box;
      .title {
        color: #000000;
      }
      .link {
        color: #0d66ff;
      }
      &-row {
        padding-bottom: 16rpx;
        box-sizing: border-box;
      }
      .desc {
        padding-top: 16rpx;
        padding-bottom: 16rpx;
      }
    }
    .btm {
      padding: 22rpx;
      box-sizing: border-box;
    }
  }
</style>
