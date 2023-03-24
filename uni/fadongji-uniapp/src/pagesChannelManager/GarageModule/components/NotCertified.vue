<template>
  <view class="notcertified bg-white flex flex-row">
    <view class="notcertified-info flex1 flex flex-row">
      <image
        :src="info.storeUrl + '&type=1' || '/static/logo.jpg'"
        class="notcertified-info__head"
        @error="imgErr"
      />
      <view class="flex1 sflex flex-column">
        <view
          class="notcertified-info__titile flex1 flex flex-row flex-vertical-c text-nowrap m-l-16"
        >
          <view class="notcertified-info__titile-content overEllipsis">
            {{ info.storeName || info.fullName || info.userName }}
          </view>
          <view
            v-if="info.checkStatus === 0 || !info.isBindMobile"
            class="status flex flex-row flex-vertical-c grey"
          >
            <VoIcon :opacity="0.25" color="#000000" name="pending-review" size="12" />
            <view class="status-text1">未认证</view>
          </view>
          <view
            v-else-if="info.checkStatus === 1 && info.isBindMobile"
            class="status flex flex-row flex-vertical-c orange"
          >
            <VoIcon :size="12" color="#FF9B05" name="pending-review" />
            <view class="status-text2">待审核</view>
          </view>
          <view
            v-else-if="info.checkStatus === 4"
            class="status flex flex-row flex-vertical-c green"
          >
            <VoIcon :size="12" color="#00B359" name="pending-review" />
            <view class="status-text3">已认证</view>
          </view>
          <view v-else-if="info.checkStatus === 5" class="status flex flex-row flex-vertical-c red">
            <VoIcon :size="12" color="#EE0A24" name="pending-review" />
            <view class="status-text4">审核拒绝</view>
          </view>
          <VoIcon
            v-if="info.checkStatus === 4"
            :size="20"
            class="m-l-18"
            name="smile-m"
            @click.native.stop="goImUrl"
          />
        </view>

        <view class="flex flex-vertical-c flex-row m-l-16 m-t-8 lh42">
          <view class="mobile">{{ encryptPhone(info.userName) }}</view>
          <view class="mobile m-l-24">{{ info.storeName }}</view>
        </view>
        <view class="notcertified-address m-l-16 m-t-8 overTwoEllipsis lh42">
          {{ info.areaCodeStr + info.address }}
        </view>
        <view class="flex flex-justify-r">
          <slot></slot>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'NotCertified',
    props: {
      // 调用来源 0、渠道经理；1、招商经理
      origin: {
        type: Number,
        default: 0,
      },
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
    methods: {
      // 图片加载失败处理
      imgErr() {
        // eslint-disable-next-line vue/no-mutating-props
        this.info.storeUrl = '/static/default_avatar.png'
      },
      // 电话加密
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
  .notcertified {
    width: 750rpx;
    box-sizing: border-box;
    padding: 24rpx 32rpx;
    margin-top: 16rpx;
    &:first-child {
      margin-top: 16rpx;
    }
    &-info {
      &__head {
        width: 94rpx;
        height: 94rpx;
        border-radius: 8rpx;
        overflow: hidden;
      }
      &__titile {
        font-size: 32rpx;
        line-height: 48rpx;
        color: $v-c0-85;
        &-content {
          font-weight: bold;
          max-width: 300rpx;
        }
      }
      &__chat {
        width: 32rpx;
        height: 32rpx;
      }
    }
    &-address {
      font-size: 28rpx;
      color: $v-c0-45;
      line-height: 42rpx;
      width: 574rpx;
    }
    &-bt {
      padding: 0 24rpx;
      height: 52rpx;
      line-height: 52rpx;
      border: 2rpx solid #ff5319;
      border-radius: 30rpx;
      color: #ff5319;
      font-size: 24rpx;
    }
    &-lr {
      width: 140rpx;
      height: 52rpx;
      line-height: 52rpx;
      text-align: center;
      border: 2rpx solid #ff5319;
      border-radius: 30rpx;
      color: #ff5319;
      font-size: 24rpx;
    }
  }
  .status {
    border-radius: 200rpx;
    box-sizing: border-box;
    padding: 0 6rpx;
    height: 36rpx;
    margin-left: 8rpx;
    &.grey {
      color: $v-c0-25;
      background: #f7f7f8;
    }
    &.orange {
      color: #ff9b05;
      background-color: #fff5e6;
    }
    &.green {
      color: #1dc26f;
      background-color: #d9faea;
    }
    &.red {
      color: #ff5319;
      background: #feecee;
    }
    &-text1,
    &-text2,
    &-text3,
    &-text4 {
      font-size: 20rpx;
      line-height: 30rpx;
      height: 30rpx;
      padding: 0 4rpx;
    }
  }
  .mobile {
    &-status1 {
      height: 36rpx;
      color: #ff9b05;
      font-size: 24rpx;
      line-height: 36rpx;
      box-sizing: border-box;
      padding: 0 16rpx;
      background: #fff5e5;
      border-radius: 22rpx;
    }
    &-status2 {
      height: 36rpx;
      color: #ff5319;
      font-size: 24rpx;
      line-height: 36rpx;
      box-sizing: border-box;
      padding: 0 16rpx;
      background: #feecee;
      border-radius: 22rpx;
    }
    &-status3 {
      color: #ff9b05;
      font-size: 24rpx;
      line-height: 36rpx;
      box-sizing: border-box;
      padding: 0 16rpx;
      background: #fff5e5;
      border-radius: 22rpx;
    }
  }
  .mobile {
    font-size: 28rpx;
    line-height: 42rpx;
    color: $v-c0-85;
    box-sizing: border-box;
    align-items: center;
  }
</style>
