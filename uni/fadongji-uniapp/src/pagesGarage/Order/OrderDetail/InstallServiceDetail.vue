<template>
  <view>
    <view class="service flex flex-column">
      <VoNav is-fixed isHaveMore title="安装服务详情" />
      <view class="flex1">
        <view class="text-center m-t-12 p-b-18 fz-32">等待集师傅接单中</view>
        <view class="service-project">
          <view class="flex flex-justify-between fz-32 p-t-24 flex-vertical-c">
            <view>服务项目</view>
            <view class="flex">
              <view class="m-r-8">修改</view>
              <VoIcon :opacity="0.45" color="#000000" name="edit-line" />
            </view>
          </view>
          <view class="fz-b fz-28 m-t-24">B15B15B15B1回收B15B15B15B1回收</view>
          <view class="m-t-16 fz-28 flex flex-justify-between">
            <view class="color-block">服务金额:</view>
            <view class="color-red fz-b">100元</view>
          </view>
          <view class="m-t-16 fz-28 p-b-26 flex flex-justify-between">
            <view class="color-block p-r-32">安装地址:</view>
            <view class="color-block-45 flex1"
              >河南省郑州市管城回族区航海东路航海广场正商木华广场A座7楼</view
            >
          </view>
        </view>
        <view class="service-project m-t-16">
          <view class="flex flex-justify-between fz-32 p-t-24 flex-vertical-c">
            <view>购机订单</view>
            <VoIcon :opacity="0.45" color="#000000" name="right-arrow" />
          </view>
          <view class="m-t-16 fz-28 flex color-block">
            <view>商品名称:</view>
            <view class="m-l-12">江陵动力发动机-B15</view>
          </view>
          <view class="m-t-16 fz-28 flex color-block p-b-24">
            <view>发动机识别码：</view>
            <view class="m-l-12">UA435SDF345345</view>
          </view>
        </view>
        <view class="service-project m-t-16">
          <view class="fz-32 p-t-24 p-b-24">订单信息</view>
          <view class="line" />
          <view class="m-t-16 fz-28 flex flex-justify-between">
            <view class="color-block">订单编号：</view>
            <view class="flex flex-vertical-c">
              <view class="color-block-45">20221243455666666777</view>
              <view class="service-project__copy" @click="copyClick('20221243455666666777')"
                >复制</view
              >
            </view>
          </view>
          <view class="m-t-16 fz-28 flex flex-justify-between">
            <view class="color-block">下单时间：</view>
            <view class="color-block-45">2022-03-22 18:01:12</view>
          </view>
          <view class="m-t-16 fz-28 flex flex-justify-between">
            <view class="color-block">支付方式：</view>
            <view class="color-block-45">在线支付</view>
          </view>
          <view class="m-t-16 fz-28 flex flex-justify-between">
            <view class="color-block">支付时间：</view>
            <view class="color-block-45">2022-03-22 18:01:12</view>
          </view>
          <view class="m-t-16 p-b-22 fz-28 flex flex-justify-between">
            <view class="color-block">实付款：</view>
            <view class="color-red">200元</view>
          </view>
        </view>
      </view>
      <!--   底部固定区域   -->
      <view class="service-bottom flex flex-justify-r">
        <view class="p-b-safe-area" />
        <view class="service-bottom__button" @click="cancelClick">取消订单</view>
        <view class="service-bottom__button" @click="editClick">修改订单</view>
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
  </view>
</template>

<script>
  export default {
    name: 'CodeServiceDetail',
    data() {
      return {
        cancelOrderModal: false,
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
      editClick() {
        this.$linkToEasy('/pagesGarage/Order/OrderDetail/InstallServiceEdit')
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
      padding: 40rpx 32rpx;
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
