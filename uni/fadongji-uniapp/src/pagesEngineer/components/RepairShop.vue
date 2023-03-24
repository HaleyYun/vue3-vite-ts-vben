<template>
  <view>
    <view class="repair_shop-con">
      <view class="fz-32 p-b-24 fz-b repaire_shop-title">修理厂信息</view>
      <view class="repair_shop-name">
        <text class="fz-28 fz-b">{{ info.buyerName || repairShop.name }}</text>
        <slot name="navigation">
          <view class="repair_shop-name-btn" @click="openGPSApp">
            <VoIcon color="#155BD4" name="plane" size="11" />
            <view class="fz-24 p-l-10 repair_shop-name-btn-text">导航</view>
          </view>
        </slot>
      </view>
      <view class="repair_shop-address">
        {{ repairShop.address + (repairShop.addressDetail ? repairShop.addressDetail : '') }}
      </view>
    </view>
    <slot name="bottom">
      <view class="send_message" @click="goChatPage">
        <VoIcon :opacity="0.65" :size="20" color="#000" name="smile-m" />
        <view class="fz-28 m-l-14 send_message-text">发消息</view>
      </view>
    </slot>
  </view>
</template>

<script>
import {getImUserId, openGpsAppFn} from '@/common/helper'

  export default {
    name: 'RepairShop',
    props: {
      repairShop: {
        type: Object,
        default() {
          return {}
        },
      },
      info: {
        type: Object,
        default() {
          return {}
        },
      },
    },
    data() {
      return {
        imData: {
          // 聊天室数据
          shopUserId: '',
          type: 0,
          note: 'shopName',
          platformCode: 'platformCode',
        },
      }
    },
    methods: {
      // 打开第三方导航
      openGPSApp() {
        if (this.repairShop.latitude && this.repairShop.longitude) {

          openGpsAppFn( this.repairShop.latitude,this.repairShop.longitude,this.info.buyerName || this.repairShop.name)

        } else {
          uni.$u.toast('无修理厂位置信息')
        }
      },
      // 跳转聊天页面
      goImUrl() {
        const info = {
          targetId: this.info.buyerId,
          type: 0,
          note: this.info.buyerName,
          platformCode: 'garage',
        }
        this.$storage.set('temp_im_room_info', info)
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
      },
      /**
       * 去聊天详情页
       */
      goChatPage() {
        //根据店铺id获取userId
        getImUserId({ companyId: this.info.buyerId })
          .then((res) => {
            console.log('res', res)
            if (res.data) {
              const info = {
                targetId: res.data.userId,
                type: 0,
                note: this.info.buyerName,
                platformCode: res.data.platformCode,
              }
              this.$storage.set('temp_im_room_info', info)
              this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
            } else {
              this.$u.toast('用户信息错误')
            }
          })
          .catch((err) => {
            this.$u.toast('用户信息错误')
            console.log(err)
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .repair_shop-con {
    padding: 24rpx;
    border-bottom: 2rpx solid $v-bg-light;

    .repaire_shop-title {
      border-bottom: 2rpx solid $v-bg-light;
    }

    .repair_shop-name {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24rpx 0;

      .repair_shop-name-btn {
        display: flex;
        width: 144rpx;
        height: 56rpx;
        box-sizing: border-box;
        border-radius: 200rpx;
        justify-content: center;
        align-items: center;
        border: 2rpx solid #0d66ff;

        &-text {
          color: #0d66ff;
        }
      }
    }

    .repair_shop-address {
      font-size: 28rpx;
    }
  }

  .send_message {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 26rpx 0;

    &-text {
      color: rgba(0, 0, 0, 0.65);
    }
  }
</style>
