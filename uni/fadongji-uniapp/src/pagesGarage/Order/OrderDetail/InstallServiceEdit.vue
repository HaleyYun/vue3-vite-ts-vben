<template>
  <view>
    <view class="service flex flex-column">
      <VoNav is-fixed isHaveMore title="修改安装订单" />
      <view class="flex1">
        <view class="service-project m-t-16">
          <view class="fz-32 fz-b p-t-24">服务信息</view>
          <view class="line m-t-24" />
          <view class="fz-28 fz-b p-t-24">江陵动力发动机-B15安装</view>
          <view class="m-t-16 fz-28 flex">
            <view class="color-block">服务金额:</view>
            <view class="color-red m-l-12 fz-b">100元</view>
          </view>
          <view class="fz-28 color-block-45 p-t-4">修改</view>
          <view class="fz-32 fz-b p-t-24">上门地址</view>
          <view class="line m-t-24" />
          <view
            class="m-t-16 fz-28 p-b-24 flex flex-justify-between flex-vertical-c"
            @click="editAddressClick"
          >
            <view class="flex flex-vertical-c">
              <VoIcon name="address" />
              <view class="color-block flex1">
                <view>张木子 132 8888 9999</view>
                <view class="m-t-8">河南省郑州市管城回族区航海东路航海广场正商木华广场A座7楼</view>
              </view>
            </view>
            <VoIcon :opacity="0.45" color="#000000" name="right-arrow" />
          </view>
        </view>
        <view class="service-project m-t-16">
          <view class="fz-32 p-t-24"> 上门时间 </view>
          <view class="line m-t-24" />
          <view
            class="m-t-24 flex flex-justify-between color-block fz-28 p-b-24"
            @click="showTimePicker"
          >
            <view v-if="upTime">{{ upTime }}上门</view>
            <view v-esle class="flex1" />
            <VoIcon :opacity="0.45" color="#000000" name="right-arrow" />
          </view>
        </view>
      </view>
      <!--   底部固定区域   -->
      <view class="service-bottom flex flex-justify-r">
        <view class="p-b-safe-area" />
        <EraButton text="保存" />
      </view>
      <view class="p-b-safe-area" />
    </view>
    <!--取消订单弹框-->
    <VoModal
      :show="cancelOrderModal"
      :showCancelButton="true"
      cancelText="我在想想"
      confirmText="取消订单"
      content="该安装订单为随新机购买生成的订单，如要取消，则将同步取消关联的购买订单"
      @cancel="cancelOrderModal = false"
      @confirm="cancelOrderClick"
    />
    <VoTimePicker
      :show="timePickerShow"
      @close="timePickerShow = false"
      @confirm="timePickerConfirm"
    />
  </view>
</template>

<script>
  // import TimePicker from '@/pagesGarage/InstallOrder/components/TimePicker'

  export default {
    name: 'CodeServiceDetail',
    components: {},

    data() {
      return {
        timePickerShow: false,
        cancelOrderModal: false,
        upTime: '',
      }
    },
    methods: {
      copyClick(data) {
        uni.setClipboardData({
          data: data,
        })
      },
      lookPreviewImage(data) {
        // 预览图片
        uni.previewImage({
          urls: [data],
        })
      },
      cancelClick() {
        this.cancelOrderModal = true
      },
      cancelOrderClick() {
        this.cancelOrderModal = false
        this.$linkToEasy('/pagesGarage/Order/OrderDetail/InstallServiceCancelDetail')
      },
      /**
       * 上门地址
       */
      editAddressClick() {
        this.$linkToEasy(`/pagesSupplier/Setting/AddressHome?title=上门地址`)
      },
      //上门时间
      showTimePicker() {
        this.timePickerShow = true
      },
      timePickerConfirm(date) {
        this.upTime = date.dateTime
        this.timePickerShow = false
      },
    },
  }
</script>

<style lang="scss" scoped>
  .service {
    width: 750rpx;
    height: 100vh;
    &-project {
      padding: 0rpx 32rpx;
      background: #fff;
      &__image {
        width: 218rpx;
        height: 218rpx;
        border-radius: 8rpx;
      }
      &__copy {
        color: $v-tip;
        font-size: 24rpx;
        margin-left: 8rpx;
      }
    }
    &-bottom {
      padding: 20rpx 32rpx;
      background: #ffffff;
      border-top: 2rpx solid $v-bg-light;

      &__button {
        width: 160rpx;
        height: 64rpx;
        line-height: 60rpx;
        border: 2rpx solid $v-c0-25;
        border-radius: 30rpx;
        text-align: center;
        font-size: 24rpx;
        color: $v-c0-85;
        margin-left: 32rpx;
        box-sizing: border-box;
      }

      &__width {
        width: 200rpx;
      }

      &__fill {
        width: 160rpx;
        height: 64rpx;
        line-height: 64rpx;
        background: $color-primary-yellow;
        border-radius: 30rpx;
        text-align: center;
        font-size: 24rpx;
        color: #ffffff;
        margin-left: 32rpx;
      }
    }
  }
  .line {
    background-color: $v-bg-light;
    height: 2rpx;
  }
</style>
