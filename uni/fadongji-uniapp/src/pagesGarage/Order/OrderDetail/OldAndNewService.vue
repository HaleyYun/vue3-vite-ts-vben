<template>
  <view>
    <view class="service flex flex-column">
      <VoNav is-fixed isHaveMore title="待接单" />
      <view class="flex1 overflow-y">
        <view class="text-center color-red m-t-24 p-b-40 fz-28"
          >回收公司已查验通过，等待集师傅接单中</view
        >
        <view class="service-project">
          <view class="flex flex-justify-between fz-32 p-t-24 flex-vertical-c">
            <view>服务项目</view>
            <view class="flex" @click="editServiceClick">
              <view class="m-r-8 fz-28">修改</view>
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
          <view class="fz-32 p-t-24">旧机信息 </view>
          <view class="m-t-48 fz-32 flex color-block flex flex-justify-between flex-vertical-c">
            <view>发动机识别号</view>
            <view>X4565467657</view>
          </view>
          <view class="line m-t-24" />
          <image
            :src="urlStr"
            class="service-project__image m-t-24"
            @click="lookPreviewImage(urlStr)"
          />
          <view class="fz-28 m-t-16 color-block-45 p-b-24">发动机识别号 </view>
        </view>
        <view class="service-project m-t-16">
          <view class="flex flex-justify-between fz-32 p-t-24 flex-vertical-c">
            <view>购机订单</view>
            <VoIcon :opacity="0.45" color="#000000" name="right-arrow" />
          </view>
          <view class="m-t-24 flex flex flex-justify-between p-b-24">
            <image
              :src="urlStr"
              class="service-project__good m-t-24"
              @click="lookPreviewImage(urlStr)"
            />
            <view class="flex1 m-t-24">
              <view class="m-l-8 color-block fz-b fz-32 overTwoEllipsis"
                >江陵动力 全EA888发动机总成适用于奥迪1.8T 二代发动机(升级款)</view
              >
              <view class="m-l-8 color-block-45 fz-28 m-t-8">发动机识别码：UA435SDF345345</view>
            </view>
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
          <view class="m-t-16 fz-28 flex flex-justify-between m-b-16">
            <view class="color-block">下单时间：</view>
            <view class="color-block-45 p-b-24">2022-03-22 18:01:12</view>
          </view>
        </view>
      </view>
      <!--   底部固定区域   -->
      <view class="service-bottom flex flex-justify-r">
        <view class="p-b-safe-area" />
        <view class="service-bottom__button" @click="cancelClick">取消订单</view>
      </view>
      <view class="p-b-safe-area" />
    </view>
    <!--取消接单弹框-->
    <CancelReveiveOrder :show="cancelShow" @close="cancelShow = false" @confirm="cancelConfirm" />
  </view>
</template>

<script>
  import CancelReveiveOrder from '../components/CancelReveiveOrder'

  export default {
    name: 'CodeServiceDetail',
    components: { CancelReveiveOrder },
    data() {
      return {
        cancelShow: false,
        urlStr:
          'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp09%2F210F2130512J47-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663297545&t=5f2c056a02d152640d74e4a82045701b',
      }
    },
    methods: {
      editServiceClick() {
        this.$u.toast('修改')
      },
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
        this.cancelShow = true
      },
      cancelOrderClick() {
        this.cancelOrderModal = false
        this.$linkToEasy('/pagesGarage/Order/OrderDetail/InstallServiceCancelDetail')
      },
      editClick() {
        this.$linkToEasy('/pagesGarage/Order/OrderDetail/InstallServiceEdit')
      },
      cancelConfirm(data) {
        console.log('取消原因', data)
        this.$u.toast('订单已取消，您将收到退款23.00元')
        this.$u.toast('订单已取消，本次取消不扣取违约金，您将收到全额退款')
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
        width: 452rpx;
        height: 452rpx;
        border-radius: 8rpx;
      }
      &__good {
        width: 160rpx;
        height: 160rpx;
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
