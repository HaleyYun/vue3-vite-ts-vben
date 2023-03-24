<template>
  <view
    class="address flex flex-column"
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
  >
    <VoNav is-fixed is-have-more :title="this.userInfo.roleCode === 'supplier' ? '发货地址' : '收货地址'" />
    <scroll-view v-if="addressList && addressList.length" scroll-y class="scroll-list">
      <view v-for="(item, index) in addressList" :key="index">
        <view class="address-line" />
        <AddressItem
            :companyId="companyId"
            :address-item="item"
            @defaultSet="getAddressList"
            @deleteAddressSucess="getAddressList"
            @click.native="chooseHandler(item)"
            @refresh="getAddressList"
        />
      </view>
    </scroll-view>
    <VoNoData v-else :no-data-tips="this.userInfo.roleCode === 'supplier' ? '您还没有发货地址' : '您还没有收货地址'" />
    <view class="address-bottom p-b-safe-area">
      <view class="address-bottom__add" @click="addAddressClick">添加新地址</view>
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
        addressList: [],
      }
    },
    onShow() {
      this.getAddressList()
    },
    onLoad() {
      // this.getAddressList()
    },
    methods: {
      // 选择地址操作
      chooseHandler(row) {
        this.$emit('ChooseAddress', row)
        console.log(row, 'sssssssssss')
        this.$backFn()
      },
      /**
       * 添加新地址
       */
      addAddressClick() {
        let data = {}
        this.$linkToEasy('/pagesSupplier/Setting/AddAddress?data=' + JSON.stringify(data))
      },
      //设置默认地址
      setDefault() {
        this.$u.toast('设置默认地址')
      },
      /**
       * 编辑地址
       */
      editAddress(data) {
        this.$linkToEasy('/pagesSupplier/Setting/AddAddress?data=' + JSON.stringify(data.data))
      },
      /**
       * 删除地址
       */
      deleteAddress() {
        this.$u.toast('删除')
      },
      //获取地址列表
      getAddressList() {
        this.$VoHttp
          .apiReceiverAddressList()
          .then((res) => {
            if (res.code === '20001') {
              console.log(res)
              this.addressList = res.data
            } else {
              uni.$u.toast(res.message || '地址获取失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('地址获取失败')
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

    &-bottom {
      position: fixed;
      left: 0rpx;
      bottom: 0rpx;
      height: 132rpx;
      width: 100%;
      background-color: #ffffff;

      &__add {
        margin: 20rpx 47rpx;
        height: 92rpx;
        line-height: 92rpx;
        text-align: center;
        background-color: $color-primary-yellow;
        color: #ffffff;
        font-size: 32rpx;
        border-radius: 48rpx;
      }
    }
  }
</style>
