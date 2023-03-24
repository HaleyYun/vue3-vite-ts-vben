<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="address flex flex-column"
  >
    <VoNav :title="title" is-fixed is-have-more />
    <view v-if="companyId" class="fz-28 warn-text">以下为买家设置的收货地址，请选择收货地址：</view>
    <scroll-view v-if="addressList && addressList.length" class="scroll-list" scroll-y>
      <view v-for="(item, index) in addressList" :key="index">
        <view class="address-line" />
        <AddressItem
          :address-item="item"
          :companyId="companyId"
          @defaultSet="getAddressList"
          @deleteAddressSucess="getAddressList"
          @refresh="getAddressList"
          @click.native="chooseHandler(item)"
        />
      </view>
    </scroll-view>
    <VoNoData
      v-else
      :no-data-tips="userInfo.roleCode === 'supplier' ? '您还没有发货地址' : '您还没有收货地址'"
    />
    <view v-if="companyId === ''" class="address-bottom p-b-safe-area">
      <view class="address-bottom__add" @click="addAddressClick">添加新地址</view>
    </view>
  </view>
</template>

<script>
  import AddressItem from './components/AddressItem'
  import { storage } from '@/common/unifyGlobalReg'

  export default {
    components: {
      AddressItem,
    },
    data() {
      return {
        companyId: '',
        addressList: [],
        //1.修理厂订单 修改地址
        type: null,
        currentUserFullInfo: {},
      }
    },
    // computed: {
    //   title() {
    //     if (this.companyId) {
    //       return '请选择收货地址'
    //     }
    //     return '收货地址'
    //   },
    // },
    onShow() {
      this.getAddressList()
    },
    onLoad(options) {
      this.type = options.type
      if (options.companyId) {
        this.companyId = options.companyId
      }
      this.currentUserFullInfo = storage.get('userInfo')
      if (options.title) {
        console.log(options.title);
        this.title = options.title
      } else {
        if (this.userInfo.roleCode === 'supplier') {
          // this.title = '发货地址'
          this.title = '退货地址管理'
        } else {
          this.title = '收货地址'
        }
      }

      // this.getAddressList()
    },
    methods: {
      chooseHandler(row) {
        if (this.type) {
          uni.$emit('ChooseAddress', row)
          this.$backFn()
        }
      },
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
      //获取地址列表
      getAddressList() {
        let param = {}
        if (this.companyId) {
          param.companyId = this.companyId
        }

        this.$VoHttp
          .apiReceiverAddressList(param)
          .then((res) => {
            this.addressList = res.data
            console.log(this.addressList)
            if (this.addressList) {
              let arr = this.addressList.filter((item) => item.isDefault === true)
              this.$storage.set('addressDefault', arr[0])
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
    overflow-x: hidden;
    .scroll-list {
      flex: 1;
      overflow-y: auto;
    }

    &-line {
      height: 24rpx;
      background-color: #f8f8f8;
      width: 100%;
    }

    &-bottom {
      // position: fixed;
      // left: 0rpx;
      // bottom: 0rpx;
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
  .warn-text {
    color: rgba(0, 0, 0, 0.85);
    padding: 30rpx 0;
    padding-left: 32rpx;
  }
</style>
