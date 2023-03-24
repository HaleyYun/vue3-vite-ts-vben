<template>
  <view class="addressItem">
    <view class="addressItem-info flex flex-vertical-c">
      <view class="flexShrink"><VoIcon name="address" :size="24" color="#22284B" /></view>
      <view class="addressItem-info__name overEllipsis"> {{ addressItem.name }}</view>
      <view class="addressItem-info__name flexShrink"> {{ addressItem.mobile }}</view>
      <view v-if="addressItem.default === true" class="addressItem-info__default flexShrink">
        <view class="text">默认2地址</view>
      </view>
    </view>
    <view class="addressItem-address">
      {{ addressItem.provinceName }}{{ addressItem.cityName }}{{ addressItem.areaName
      }}{{ addressItem.address }}
    </view>
    <view class="addressItem-line" />
    <view class="addressItem-bottom flex flex-justify-between flex-vertical-c">
      <view class="flex" @click.stop="setDefaultClick">
        <VoIcon v-if="addressItem.default === true" name="select-right" :size="24" />
        <VoIcon v-else name="address_select" :size="24" />
        <view class="addressItem-bottom__default">默认地址</view>
      </view>
      <view class="flex">
        <view class="flex edit-padding" @click.stop="editClick(addressItem)">
          <VoIcon name="edit" :size="20" color="#595959" />
          <view class="addressItem-bottom__default">编辑</view>
        </view>
        <view class="flex" @click.stop="deleteClick">
          <VoIcon name="delete" :size="20" color="#595959" />
          <view class="addressItem-bottom__default">删除</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'AddressItem',
    props: {
      addressItem: {
        type: Object,
        default: {},
      },
    },
    methods: {
      chooseHandler() {
        alert(11)
        this.$emit('choose', this.addressItem)
      },
      /**
       * 设置默认地址
       */
      setDefaultClick() {
        this.$emit('default')
      },
      /**
       * 编辑地址
       */
      editClick(data) {
        this.$emit('editAddress', { data: data })
      },
      /**
       * 删除地址
       */
      deleteClick() {
        this.$emit('deleteAddress')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .addressItem {
    background-color: #ffffff;
    padding: 0rpx 32rpx;

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
        }
      }
    }

    &-address {
      padding: 32rpx 0rpx;
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
