<template>
  <view class="info flex flex-row bg-white">
    <image :src="infos.storeUrl" class="info-head m-t-6" />
    <view class="flex flex-column flex1 m-l-16">
      <view class="flex flex-row flex-vertical-c">
        <view class="info-title">{{ infos.storeName }}</view>
        <view v-if="infos.checkStatus === 0" class="flex flex-vertical-c info-certified grey">
          <VoIcon :opacity="0.25" color="#000000" name="success-fill" size="12" />
          <view class="m-l-6">未认证</view>
        </view>
        <view
          v-else-if="infos.checkStatus === 1"
          class="flex flex-row flex-vertical-c info-certified orange"
        >
          <VoIcon color="#FF9B05" name="success-fill" size="12" />
          <view class="m-l-6">待审核</view>
        </view>
        <view
          v-else-if="infos.checkStatus === 4"
          class="flex flex-row flex-vertical-c info-certified green"
        >
          <VoIcon color="#26BF26" name="success-fill" size="12" />
          <view class="m-l-6">已认证</view>
        </view>
        <VoIcon v-if="infos.checkStatus === 4"  class="m-l-12" name="smile-m" size="16.67" @click="toChat" />
      </view>
      <view class="flex flex-row flex-vertical-c m-t-8">
        <view class="info-mobile">{{ infos.userName }}{{infos.address}}</view>
        <VoIcon
          :size="20"
          class="m-l-12"
          color="#155BD4"
          name="phone-supplier"
          @click="$cellPhone(infos.userName)"
        />
      </view>
      <view class="info-address">{{ infos.areaCodeStr }}</view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      // 卡片展示信息
      infos: {
        type: Object,
        default: function () {
          return {}
        },
      },
    },
    name: 'ServiceInfo',
    data() {
      return {
        infoHeight: 0,
      }
    },
    mounted() {
      this.getHeight()
    },
    methods: {
      toChat() {

        const info = {
          targetId: this.infos.userId,
          type: 0,
          note: this.infos.storeName,
          platformCode: this.infos.platformCode, // 1供应商  2服务商
        }
        this.$storage.set('temp_im_room_info', info)
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
      },
      getHeight() {
        const _this = this
        let info = uni.createSelectorQuery().select('.info')
        info
          .boundingClientRect(function (data) {
            //data - 各种参数
            // console.log(data.height) // 获取元素的相关信息
            _this.infoHeight = data.height
            // console.log('this.infoHeight ' + this.infoHeight) // 获取元素的相关信息
            _this.sendHeight()
          })
          .exec()
      },
      sendHeight() {
        this.$emit('getInfoHeight', { height: this.infoHeight })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .info {
    height: 140px;
    position: relative;
    z-index: 4;
    box-sizing: border-box;
    padding: 18rpx 32rpx;
    border-top: 16rpx solid #f7f7f8;
    border-bottom: 16rpx solid #f7f7f8;
    &-title {
      font-size: 32rpx;
      font-weight: bold;
      line-height: 48rpx;
      color: $v-c0-85;
    }
    &-head {
      width: 96rpx;
      height: 96rpx;
      border-radius: 8rpx;
    }
    &-title {
      font-size: 32rpx;
      font-weight: bold;
      color: $v-c0-85;
      line-height: 48rpx;
    }
    &-certified {
      border-radius: 200rpx;
      box-sizing: border-box;
      padding: 2rpx 10rpx 2rpx 6rpx;
      height: 36rpx;
      line-height: 30rpx;
      margin-left: 8rpx;
      font-size: 20rpx;
      font-weight: bold;
      &.grey {
        color: $v-c0-25;
        background: #f7f7f8;
      }
      &.orange {
        color: #ff9b05;
        background-color: #fff5e5;
      }
      &.green {
        color: $v-success;
        background-color: #ecfaf3;
      }
    }
    &-mobile {
      font-size: 28rpx;
      line-height: 42rpx;
      color: $v-c0-85;
    }
    &-address {
      font-size: 28rpx;
      line-height: 42rpx;
      color: $v-c0-45;
      margin-top: 8rpx;
      padding-bottom: 6rpx;
    }
  }
</style>
