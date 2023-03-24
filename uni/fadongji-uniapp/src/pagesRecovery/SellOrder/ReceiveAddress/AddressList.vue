<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="address flex flex-column"
  >
    <VoNav is-fixed is-have-more title="收货地址" />
    <block v-if="addressList && addressList.length > 0">
      <view v-if="isShowTip" class="flex address-top flex-vertical-c flex-justify-between">
        <view class="m-l-32 flex flex-vertical-c">
          <VoIcon :size="20" color="#FDA202" name="warning" />
          <view class="fz-24 m-l-16 address-top__info">订单收货地址仅支持修改一次，敬请谅解</view>
        </view>
        <VoIcon :size="16" class="m-r-32" name="close" @click="isShowTip = false" />
      </view>
      <view class="fz-28 fz-b m-l-32 m-r-32 m-t-30 p-b-36 color-block"
        >以下为买家设置的收货地址，请选择新收货地址：</view
      >

      <view class="flex1 overflow-y">
        <view v-for="(item, index) in addressList" :key="index">
          <AddressItem :address-item="item" />
          <view class="address-item flex flex-justify-between flex-vertical-c">
            <view class="flex" @click="setDefaultClick(item)">
              <VoIcon v-if="item.selected" :size="24" name="certified" />
              <VoIcon v-else :size="24" name="address_select" />
              <view class="address-item__default">选择地址</view>
            </view>
          </view>
        </view>
        <view class="m-l-32 p-t-16 p-b-50 m-r-32 color-red fz-24"
          >*修改地址可能会影响物流时效，请以实际配送为准。</view
        >
      </view>
      <view class="address-bottom p-b-safe-area">
        <view
          :class="isShow ? 'address-bottom__selected' : 'address-bottom__normal'"
          @click="selectAddress"
          >确认修改</view
        >
      </view>
    </block>
    <VoNoData v-else no-data-tips="还没有收货地址哦～" />
  </view>
</template>

<script>
  import AddressItem from '../components/AddressItem'
  import { showLoading, hideLoading } from '@/common/helper'

  export default {
    components: {
      AddressItem,
    },
    data() {
      return {
        orderId: '',
        addressList: [],
        //type 1.投资订单 2.销售订单
        type: '1',
        isShow: false,
        isShowTip: true,
      }
    },
    onLoad(option) {
      this.orderId = option.orderId
      this.type = +option.type
      this.companyId = option.companyId
      this.getAddressList()
    },
    methods: {
      /**
       * 选择地址
       */
      setDefaultClick(data) {
        this.addressList.forEach((item) => {
          if (item.id === data.id) {
            if (item.selected) {
              item.selected = false
              this.isShow = false
            } else {
              item.selected = true
              this.isShow = true
            }
          } else {
            item.selected = false
          }
        })
        this.$forceUpdate()
      },
      selectAddress() {
        if (!this.isShow) {
          return
        }
        let data = {}
        this.addressList.forEach((item) => {
          if (item.selected) {
            data = item
          }
        })
        const { name, mobile, provinceName, cityName, areaName, address, areaCode } = data
        let param = {
          addressDetail: address,
          name,
          orderId: this.orderId,
          phone: mobile,
          areaCode,
          address: provinceName + cityName + areaName,
        }

        if (this.type === '1') {
          this.investAddressEdit(param)
          return
        }
        this.marketAddressEdit(param)
      },
      //获取地址列表
      getAddressList() {
        showLoading()
        this.$VoHttp
          .apiReceiverAddressList({ companyId: this.companyId })
          .then((res) => {
            if (res.code === '20001') {
              console.log(res)
              this.addressList = res.data
              this.addressList.forEach((item) => {
                item.selected = false
              })
              console.log(this.addressList)
            } else {
              uni.$u.toast(res.message || '地址获取失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('地址获取失败')
          })
          .finally(() => {
            hideLoading()
          })
      },
      //销售订单修改地址
      marketAddressEdit(param) {
        showLoading()
        this.$VoHttp
          .apiOrderOldAddressEdit(param)
          .then((res) => {
            if (+res.code === 20001) {
              this.$toast('地址修改成功', 'success', '/static/icons/success_icon.png')
              setTimeout(() => {
                this.$backFn()
              }, 1500)
            } else {
              uni.$u.toast(res.message || '地址修改失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '地址修改失败')
          })
          .finally(() => {
            hideLoading()
          })
      },
      //投资订单修改地址
      investAddressEdit(param) {
        this.$VoHttp
          .apiOrderInvestAddressEdit({ req: param })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast(res.message || '地址修改成功')
              setTimeout(() => {
                this.$backFn()
              }, 1500)
            } else {
              uni.$u.toast(res.message || '地址修改失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('地址修改失败')
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .address {
    width: 750rpx;
    height: 100vh;

    &-line {
      height: 24rpx;
      background-color: #f8f8f8;
      width: 100%;
    }
    &-top {
      height: 80rpx;
      line-height: 80rpx;
      line-height: 80rpx;
      background-color: #fff8eb;
      &__info {
        color: #fda202;
      }
    }
    &-item {
      width: 100%;
      height: 112rpx;
      background-color: #ffffff;
      padding-left: 32rpx;
      &__default {
        margin-left: 8rpx;
        color: $v-c0-65;
        font-size: 28rpx;
      }
    }

    &-bottom {
      height: 132rpx;
      width: 100%;
      background-color: #ffffff;

      &__selected {
        margin: 20rpx 47rpx;
        height: 92rpx;
        line-height: 92rpx;
        text-align: center;
        background-color: $color-primary-yellow;
        color: #ffffff;
        font-size: 32rpx;
        border-radius: 48rpx;
      }
      &__normal {
        margin: 20rpx 47rpx;
        height: 92rpx;
        line-height: 92rpx;
        text-align: center;
        background-color: $v-bg-light;
        color: $v-c0-25;
        font-size: 32rpx;
        border-radius: 48rpx;
      }
    }
  }
</style>
