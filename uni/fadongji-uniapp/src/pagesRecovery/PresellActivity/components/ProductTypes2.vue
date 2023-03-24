<template>
  <view class="product_ flex m-t-12 p-b-24">
    <view class="product__price flex flex-column flex-justify-c flex-vertical-c">
      <view class="fz-32"><VoPointPrice :price="data.originalSalePrice || 0" /></view>
      <view class="fz-24 m-t-10 title">原价</view>
    </view>
    <view class="product__price flex flex-column flex-justify-c flex-vertical-c m-l-66">
      <view class="fz-32"><VoPointPrice :price="data.price || 0" /></view>
      <view class="fz-24 m-t-10 title">预售价</view>
    </view>
    <view class="product__price flex flex-column flex-justify-c flex-vertical-c m-l-66">
      <view class="fz-32">
        <VoPointPrice :price="data.expectedEarnings || 0" />
      </view>
      <view class="flex flex-vertical-c">
        <view class="fz-24 m-r-12 m-t-10 title">预计收益</view>
<!--        <VoIcon class="m-t-10" :size="20" color="#818181" name="question-line" @click="show = true" />-->
      </view>
    </view>
    <VoModal
      :content="content"
      :show="show"
      confirmColor="#22284B"
      confirmText="我知道了"
      title="预计收益=售卖价格-平台服务费-回收价格"
      @confirm="show = false"
    />
  </view>
</template>

<script>
  export default {
    name: 'ProductTypes2',
    props: {
      data: {
        type: Object,
        default() {},
      },
      //平台服务费
      platformPrice: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        content: '',
        show: false,
      }
    },
    mounted() {
      this.content = '此商品每售出1件，平台收取服务费 ' + (this.platformPrice || '0') + '元。'
    },
  }
</script>

<style lang="scss" scoped>
  .product_ {
    color: #e50012;
    .product__price {
      > :nth-child(1) {
        text-align: center;
        margin: 10rpx 10rpx 10rpx 0;
      }
    }
  }
  .title {
    border: 1rpx solid #e50012;
    text-align: center;
    line-height: 32rpx;
    width: fit-content;
    white-space: nowrap;
    padding: 4rpx 8rpx;
    background-color: #fdf2f3;
    border-radius: 8rpx;
  }
</style>
