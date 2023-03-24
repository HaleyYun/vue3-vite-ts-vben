<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="address flex flex-column"
  >
    <VoNav :title="navTitle" is-fixed is-have-more />
    <view v-if="isShowTip && !origin" class="flex address-top flex-vertical-c flex-justify-between">
      <view class="m-l-32 flex flex-vertical-c">
        <VoIcon :size="20" color="#FDA202" name="error-full" />
        <view class="fz-24 m-l-16 address-top__info">订单收货地址仅支持修改一次，敬请谅解</view>
      </view>
      <VoIcon :size="16" class="m-r-32" name="close" @click="closeClick((isShowTip = false))" />
    </view>
    <view class="fz-28 fz-b m-l-32 m-r-32 m-t-30 p-b-36 color-block">
      {{
        origin === 'install'
          ? '以下为买家设置的安装地址，请选择新安装地址：'
          : '以下为买家设置的收货地址，请选择新收货地址：'
      }}
    </view>

    <view class="flex1 overflow-y">
      <view v-for="(item, index) in addressList" :key="index">
        <AddressItem :address-item="item" />
        <view class="address-item flex flex-justify-between flex-vertical-c">
          <view class="flex" @click="setDefaultClick(item)">
            <VoIcon v-if="item.selected" :size="24" name="select-right" color="#FF5319" />
            <VoIcon v-else :size="24" name="address_select" />
            <view class="address-item__default">选择地址</view>
          </view>
        </view>
      </view>
      <view class="m-l-32 p-t-16 p-b-50 m-r-32 color-red fz-24" v-if="!origin"
        >*修改地址可能会影响物流时效，请以实际配送为准。</view
      >
    </view>
    <view v-if="type != '3'" class="address-bottom p-b-safe-area">
      <view
        :class="isShow ? 'address-bottom__selected' : 'address-bottom__normal'"
        @click="selectAddress"
        > {{roleType === 1 ? '确定修改' : '确定'}}</view
      >
    </view>
  </view>
</template>

<script>
  import AddressItem from './components/AddressItem'

  export default {
    components: {
      AddressItem,
    },
    data() {
      return {
        orderId: '',
        addressId: '',
        addressList: [],
        companyId: '',
        //type 1.投资订单 2.销售订单 3.其他订单，选择地址之后直接返回
        type: '1',
        //roleType 角色来源 1.汽修厂 2.服务商 3.供应商
        roleType: '',
        isShow: false,
        isShowTip: true,
        navTitle: '收货地址',
        origin: '', //跳转页面 install安装订单
      }
    },
    onLoad(option) {
      this.orderId = option.orderId
      this.type = option.type
      this.roleType = Number(option.roleType)
      this.addressId = option.addressId
      this.companyId = option.companyId || ''
      this.origin = option.origin || ''
      if (option.title) {
        this.navTitle = option.title
      } else {
        if (+option.roleType === 1) {
          this.navTitle = '修改收货地址'
        }
      }
    },
    onShow() {
      this.getAddressList()
    },
    methods: {
      /**
       * 添加新地址
       */
      addAddressClick() {
        let data = {}
        this.$linkToEasy('/pagesSupplier/Setting/AddAddress?data=' + JSON.stringify(data))
      },
      /**
       * 编辑地址
       */
      editAddress(data) {
        this.$linkToEasy('/pagesSupplier/Setting/AddAddress?data=' + JSON.stringify(data.data))
      },
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
        if (this.type === '3') {
          this.$backFn()
          uni.$emit('selectAddress', data)
        }
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
        let param = {
          addressDetail: data.address,
          name: data.name,
          orderId: this.orderId,
          phone: data.mobile,
        }

        if (this.type === '1') {
          this.investAddressEdit(param)
          return
        }
        this.marketAddressEdit(param)
      },
      //获取地址列表
      getAddressList() {
        let param = {companyId : this.companyId}
        this.$VoHttp
          .apiReceiverAddressList(param)
          .then((res) => {
            if (res.code === '20001') {
              console.log(res)
              this.addressList = res.data
              this.addressList.forEach((item) => {
                if (item.id === this.addressId) {
                  item.selected = true
                } else {
                  item.selected = false
                }
              })
            } else {
              uni.$u.toast(res.message || '地址获取失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('地址获取失败')
          })
      },
      //销售订单修改地址
      marketAddressEdit(param) {
        this.$VoHttp
          .apiOrderSellAddressEdit({ req: param })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast(res.message || '地址修改成功')
              setTimeout(() => {
                this.$backFn()
              }, 1500)
              // if (this.roleType === '1') {
              //   setTimeout(() => {
              //     uni.redirectTo({
              //       url: '/pagesGarage/InstallOrder/InstallOrderList',
              //     })
              //   }, 1500)
              // } else if (this.roleType === '2') {
              //   setTimeout(() => {
              //     uni.redirectTo({
              //       url: '/pagesAgent/Order/MarketOrder/MarkerOrderList',
              //     })
              //   }, 1500)
              // } else if (this.roleType === '3') {
              //   setTimeout(() => {
              //     uni.redirectTo({
              //       url: '/pagesSupplier/Order/OrderList/OrderList',
              //     })
              //   }, 1500)
              // }
            } else {
              uni.$u.toast(res.message || '地址修改失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('地址修改失败')
          })
      },
      //投资订单修改地址
      investAddressEdit(param) {
        this.$VoHttp
          .apiOrderInvestAddressEdit({ req: param })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('收货地址修改成功！')
              setTimeout(() => {
                this.$backFn()
              }, 1500)
              // if (this.roleType === '1') {
              //   setTimeout(() => {
              //     uni.redirectTo({
              //       url: '/pagesGarage/InstallOrder/InstallOrderList',
              //     })
              //   }, 1500)
              // } else if (this.roleType === '2') {
              //   setTimeout(() => {
              //     uni.redirectTo({
              //       url: '/pagesAgent/Order/MarketOrder/MarkerOrderList',
              //     })
              //   }, 1500)
              // } else if (this.roleType === '3') {
              //   setTimeout(() => {
              //     uni.redirectTo({
              //       url: '/pagesSupplier/Order/OrderList/OrderList',
              //     })
              //   }, 1500)
              // }
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
      margin-bottom: 16rpx;
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
