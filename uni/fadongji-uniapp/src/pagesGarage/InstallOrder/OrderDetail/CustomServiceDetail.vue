<template>
  <view class="service flex flex-column">
    <VoNav is-fixed is-have-more title="定制服务详情" />
    <view class="service-address m-t-16 m-b-16">
      <view class="service-address__user fz-32 fz-b"> 服务项目 </view>
      <view class="service-address__line" />
      <view class="service-address__order fz-26">
        <view class="flex flex-vertical-c flex-justify-between m-b-22">
          <view>服务费：</view>
          <view class="flex flex-vertical-c color-gray">{{ codeServices[0].price || '--' }}元</view>
        </view>
        <view class="flex flex-vertical-c flex-justify-between m-b-16">
          <view>仓库名称：</view>
          <view class="flex flex-vertical-c color-gray">
            {{ orderData.warehouseName || '' }}
          </view>
        </view>
      </view>
    </view>
    <view class="service-address m-t-16 p-b-16">
      <view class="service-address__user fz-32 fz-b"> 打码信息 </view>
      <view class="service-address__line" />
      <view class="service-address__code">
        <view class="fz-26 color-block m-t-24">发动机铭牌/行驶证照片：</view>
        <view v-if="codeServices[0].picList" class="flex flex-vertical-c m-t-16">
          <image
            v-for="(item, index) in codeServices[0].picList"
            :key="index"
            :src="item"
            class="img"
            @click="lookPhoto(index)"
          />
        </view>
      </view>
    </view>
    <view class="service-address m-t-16 m-b-16">
      <view class="service-address__user fz-32 fz-b"> 订单信息 </view>
      <view class="service-address__line" />
      <view class="service-address__order fz-26">
        <view class="flex flex-vertical-c flex-justify-between m-b-22">
          <view>订单编号：</view>
          <view class="flex flex-vertical-c">
            <view class="color-gray"> {{ orderData.id }}</view>
            <view class="fz-20 m-l-16 copy" @click="copyClick">复制</view>
          </view>
        </view>
        <view class="flex flex-vertical-c flex-justify-between m-b-16">
          <view>下单时间：</view>
          <view class="flex flex-vertical-c color-gray">
            {{ orderData.createTime || '' }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'CustomServiceDetail',
    data() {
      return {
        orderData: {},
        codeServices: [{ price: '' }],
      }
    },
    onLoad(option) {
      this.getOrderDetailRequest(option.id)
    },
    methods: {
      //复制订单
      copyClick() {
        uni.setClipboardData({
          data: this.orderData.id,
        })
      },
      lookPhoto(e) {
        uni.previewImage({
          urls: this.codeServices[0].picList,
          current: e,
        })
      },
      //获取订单详情
      getOrderDetailRequest(id) {
        let param = { id: id }
        this.$VoHttp
          .apiOrderSell$Id(param)
          .then((res) => {
            this.orderData = res.data
            if (this.orderData.goodsDetail && this.orderData.goodsDetail.length) {
              let addedServices = this.orderData.goodsDetail[0].addedServices
              if (addedServices && addedServices.length) {
                this.installServices = addedServices.filter((item) => item.supportType === 32)
                this.codeServices = addedServices.filter((item) => item.supportType === 34)
                this.recycleServices = addedServices.filter((item) => item.supportType === 33)
              }
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('订单详情获取失败')
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .service {
    width: 750rpx;
    height: 100vh;
    box-sizing: border-box;
    &-address {
      background: #ffffff;
      color: $v-c0-85;
      &__user {
        padding: 24rpx 0;
        margin: 0 32rpx;
        color: #000;
      }
      &__line {
        background-color: $v-bg-light;
        width: 100%;
        height: 2rpx;
        margin-left: 32rpx;
        margin-bottom: 16rpx;
      }
      &__order {
        padding: 0 32rpx 24rpx;
        .copy {
          color: #0d66ff;
        }
      }
      &__code {
        padding: 0rpx 32rpx;
        line-height: 40rpx;
        .img {
          width: 218rpx;
          height: 218rpx;
        }
      }
    }
  }
</style>
