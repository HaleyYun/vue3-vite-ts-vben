<template>
  <u-popup v-if="visible" :round="8" :show="visible" class="popup" mode="bottom" @close="close">
    <view class="popup-title">
      <view class="popup-title__text fz-b">配送至</view>
      <view class="popup-title__right">
        <VoIcon :opacity="0.85" :size="20" color="#000000" name="close" @click="close" />
      </view>
    </view>
    <view class="address-list">
      <view v-for="item in addressList" :key="item.id" class="address-list__item flex">
        <VoIcon
          v-if="item.selected"
          :size="24"
          color="#FF5319"
          name="select-right"
          @click="selectFn(item)"
        />
        <VoIcon v-else :size="24" name="address_select" @click="selectFn(item)" />
        <view class="flex1">
          <view class="color-block fz-b fz-28 p-b-8">{{ item.address }}</view>
          <view class="color-block-45 fz-24">
            {{ item.provinceName }}{{ item.cityName }}{{ item.areaName }}
          </view>
        </view>
      </view>
    </view>
    <view class="popup-btn">
      <view class="popup-btn__item" @click="addAddressClick()"> 添加新地址 </view>
    </view>
  </u-popup>
</template>
<script>
  export default {
    name: 'GoodsPop',
    data() {
      return {
        visible: false,
        record: '',
        addressList: [],
      }
    },
    methods: {
      show(record) {
        this.visible = true
        // helper.showLoading()
        this.$VoHttp
          .apiReceiverAddressList()
          .then((res) => {
            this.addressList = res.data.map((item) => {
              return {
                ...item,
                selected: false,
              }
            })
            //回显
            if (record) {
              this.addressList.forEach((item) => {
                if (record.id === item.id) {
                  item.selected = true
                }
              })
            }

            // helper.hideLoading()
          })
          .catch((err) => {
            // helper.hideLoading()
          })
      },
      close() {
        this.visible = false
      },
      selectFn(data) {
        this.$emit('select', data)
        this.addressList.forEach((item) => {
          if (item.id === data.id) {
            item.selected = true
          } else {
            item.selected = false
          }
        })
        this.close()
      },
      /**
       * 添加新地址
       */
      addAddressClick() {
        this.$linkToEasy('/pagesSupplier/Setting/AddAddress')
      },
    },
  }
</script>
<style lang="scss" scoped>
  .popup {
    height: 500rpx;
    display: flex;
    flex-direction: column;
    &-title {
      padding: 24rpx 0;
      display: flex;
      border-bottom: 1px solid #f7f7f8;
      &__text {
        flex: 1;
        color: $v-c0-85;
        font-size: 32rpx;
        line-height: 1.5;
        padding-left: 32rpx;
        padding-right: 38rpx;
      }
      &__right {
        width: 40rpx;
        padding-right: 24rpx;
      }
    }
    .address-list {
      padding: 0 24rpx;
      box-sizing: border-box;
      flex: 1;
      overflow-y: auto;
      &__item {
        padding: 24rpx 0;
        box-sizing: border-box;
        border-bottom: 1px solid #f7f7f8;
      }
    }
    &-btn {
      display: flex;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      &__item {
        flex: 1;
        background: #ff5319;
        border-radius: 48rpx;
        text-align: center;
        color: #ffffff;
        font-size: 32rpx;
        line-height: 80rpx;
      }
    }
  }
</style>
