<template>
  <view class="addressItem">
    <!--    <view class="addressItem-warehouse">商家自有仓</view>-->
    <view class="addressItem-info flex flex-vertical-c">
      <view class="flexShrink"><VoIcon :size="24" color="#22284B" name="address" /></view>
      <view class="addressItem-info__name overEllipsis"> {{ addressItem.name }}</view>
      <view class="addressItem-info__name flexShrink"> {{ addressItem.mobile }}</view>
      <view v-if="addressItem.isDefault === true" class="addressItem-info__default flexShrink">
        <view class="text">默认地址</view>
      </view>
    </view>
    <view class="addressItem-address overTwoEllipsis">
      {{ addressItem.provinceName }}{{ addressItem.cityName }}{{ addressItem.areaName
      }}{{ addressItem.address }}
    </view>
    <view class="addressItem-line" />
    <view v-if="!companyId" class="addressItem-bottom flex flex-justify-between flex-vertical-c">
      <view class="flex" @click.stop="setDefaultClick">
        <VoIcon
          v-if="addressItem.isDefault === true"
          :size="24"
          color="#FF5319"
          name="select-right"
        />
        <VoIcon v-else :size="24" name="address_select" />
        <view class="addressItem-bottom__default">默认地址</view>
      </view>
      <view class="flex">
        <view class="flex edit-padding" @click.stop="editClick(addressItem)">
          <VoIcon :size="20" color="#595959" name="edit" />
          <view class="addressItem-bottom__default">编辑</view>
        </view>
        <view class="flex" @click.stop="deleteClick">
          <VoIcon :size="20" color="#595959" name="delete" />
          <view class="addressItem-bottom__default">删除</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import { confirm } from '@/common/helper'

  export default {
    name: 'AddressItem',
    props: {
      companyId: {
        type: String,
        default: '',
      },
      addressItem: {
        type: Object,
        default() {
          return {}
        },
      },
    },
    methods: {
      /**
       * 设置默认地址
       */
      setDefaultClick() {
        if (this.addressItem.isDefault) return
        if (this.companyId) return
        uni.showLoading({ title: '修改中', mask: true })
        this.$VoHttp
          .apiReceiverAddress$Put({
            ...this.addressItem,
            isDefault: true,
          })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('修改成功')
              uni.$emit('ChooseAddress', this.addressItem)
              this.$emit('refresh')
            } else {
              uni.$u.toast(res.message || '修改失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('修改失败')
          })
          .finally(() => {
            uni.hideLoading()
          })
        // this.$VoHttp
        //   .apiReceiverAddress$Patch({ id: this.addressItem.id })
        //   .then((res) => {
        //     if (res.code === '20001') {
        //       uni.$u.toast('设置成功')
        //       this.$emit('defaultSet')
        //     } else {
        //       uni.$u.toast(res.message || '设置失败')
        //     }
        //   })
        //   .catch((err) => {
        //     console.log('err', err)
        //     uni.$u.toast('设置失败')
        //   })
      },
      /**
       * 编辑地址
       */
      editClick() {
        if (this.companyId) return

        // this.$emit('editAddress', { data: data })
        this.$linkToEasy('/pagesSupplier/Setting/AddAddress?id=' + this.addressItem.id)
      },
      /**
       * 删除地址
       */
      deleteClick() {
        console.log('===================')
        if (this.companyId) return
        console.log('--------------------')
        confirm({
          title: '提示',
          content: '确定要删除该地址吗?',
          confirmColor: '#22284B',
        }).then((res) => {
          this.$VoHttp
            .apiReceiverAddress$Delete({ id: this.addressItem.id })
            .then((res) => {
              if (res.code === '20001') {
                uni.$u.toast('操作成功')
                this.$emit('deleteAddressSucess')
              }
            })
            .catch((err) => {
              console.log('err', err)
              uni.$u.toast('操作失败')
            })
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .addressItem {
    background-color: #ffffff;
    padding: 0rpx 32rpx;
    box-sizing: border-box;
    &-warehouse {
      padding-top: 32rpx;
      font-size: 32rpx;
      font-weight: bold;
    }
    &-info {
      padding-top: 32rpx;

      &__name {
        margin-left: 16rpx;
        color: $v-c0-85;
        font-weight: bold;
        font-size: 32rpx;
      }

      &__default {
        margin-left: 16rpx;
        background-color: $v-error-btn-disabled;
        border-radius: 24rpx;

        .text {
          padding: 4rpx 16rpx;
          color: $color-clicked-red;
          font-size: 24rpx;
          box-sizing: border-box;
        }
      }
    }

    &-address {
      overflow: hidden;
      margin: 32rpx 0rpx;
      box-sizing: border-box;
      color: $v-c0-85;
      font-size: 28rpx;
    }

    &-line {
      width: 100%;
      background-color: $v-bg-light;
      height: 2rpx;
    }

    &-bottom {
      width: 100%;
      height: 112rpx;

      &__default {
        margin-left: 8rpx;
        color: $v-c0-65;
        font-size: 28rpx;
      }
    }
  }
  .flexShrink {
    flex-shrink: 0;
  }
  .edit-padding {
    padding-right: 40rpx;
  }
</style>
