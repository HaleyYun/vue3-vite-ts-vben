<template>
  <view class="info flex bg-white">
    <image :src="info.storeUrl + '&type=1' || '/static/logo.jpg'" class="info-head m-t-6" />
    <view class="flex flex-column flex1 m-l-16">
      <view class="flex">
        <view class="info-title">
          {{ info.fullName || info.storeName || info.userName }}
        </view>
        <view
          v-if="info.checkStatus === 2"
          class="flex flex-row flex-vertical-c info-certified orange"
        >
          <VoIcon color="#FF9B05" name="success-fill" size="12" />
          <view class="m-l-6">待审核</view>
        </view>
        <view
          v-else-if="info.checkStatus === 4"
          class="flex flex-row flex-vertical-c info-certified green"
        >
          <VoIcon color="#26BF26" name="success-fill" size="12" />
          <view class="m-l-6">已认证</view>
        </view>
        <view v-else class="flex flex-vertical-c info-certified grey">
          <VoIcon :opacity="0.25" color="#000000" name="success-fill" size="12" />
          <view class="m-l-6">未认证</view>
        </view>
      </view>
      <view class="flex p-b-12 m-t-8">
        <view class="flex1">
          <view v-if="info.userName" class="info-mobile">{{ encryptPhone(info.userName) }}</view>
          <view class="info-address overTwoEllipsis">{{
            info.address ? info.areaCodeStr + info.address : '暂无地址'
          }}</view>
        </view>
        <view class="flex m-l-32">
          <view class="flex flex-column flex-vertical-c" @click="$cellPhone(info.userName)">
            <image class="info-img" src="/static/lease/SupplierDdetail/telephone.png"></image>
            <view class="fz-20 color-block-45 m-t-16">电话</view>
          </view>
          <view
            v-if="info.checkStatus === 4"
            class="flex flex-column flex-vertical-c m-l-48"
            @click="toChat"
          >
            <image class="info-img" src="/static/lease/SupplierDdetail/chat.png"></image>
            <view class="fz-20 color-block-45 m-t-16">聊天</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'ServiceInfo',
    props: {
      // 卡片展示信息
      info: {
        type: Object,
        default: function () {
          return {}
        },
      },
    },
    data() {
      return {}
    },
    created() {},
    methods: {
      toChat() {
        console.log('info', this.info)
        const content = {
          targetId: this.info.userId,
          type: 0,
          note: this.info.storeName,
          platformCode: this.info.platformCode, // 1供应商  2服务商
        }
        this.$storage.set('temp_im_room_info', content)
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
      },
      // 图片加载失败处理
      imgErr() {
        // eslint-disable-next-line vue/no-mutating-props
        this.info.storeUrl = '/static/default_avatar.png'
      },
      // 加密电话
      encryptPhone(phone) {
        return phone ? this.$vocenApi.VoUtils.encryptPhone(phone) : ''
      },
      /**
       * 到聊天界面
       */
      goImUrl() {
        const data = {
          targetId: this.info.userId,
          type: 0,
          note: this.info.storeName,
          platformCode: this.info.platformCode,
        }
        this.$storage.set('temp_im_room_info', data)
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .info {
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
      max-width: 448rpx;
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
      margin-top: 6rpx;
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
      margin-top: 8rpx;
    }
    &-address {
      font-size: 28rpx;
      line-height: 42rpx;
      color: $v-c0-45;
      margin-top: 14rpx;
    }
    &-img {
      width: 56rpx;
      height: 56rpx;
    }
  }
</style>
