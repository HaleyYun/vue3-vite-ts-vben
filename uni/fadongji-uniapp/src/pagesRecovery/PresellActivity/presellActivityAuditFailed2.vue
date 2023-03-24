<template>
  <view class="content">
    <VoNav is-have-more :title="title" :isFixed="false" />
    <view>
      <view class="flex flex-justify-between reason">
        <view>
          <view class="fz-b fz-32 p-b-24">审核不通过原因：</view>
          <view class="fz-28 reason_text"
            >上传的图片尺寸过小，图片模糊，请按照规定的尺寸重新上传。</view
          >
          <view class="reason_time p-t-8">2020-06-18 15:32:56</view>
        </view>
        <view>
          <view>
            <u--image src="https://cdn.uviewui.com/uview/album/1.jpg" mode="widthFix" />
          </view>
        </view>
      </view>
      <view class="product fz-32">
        <view class="product_name">
          <view>商品名称</view>
          <view>
            <view>B15 适配宏光黑色OCV阀 </view>
            <VoIcon name="right-arrow" class="m-l-18" size="20" color="#8C8C8C" />
          </view>
        </view>
        <view>预售信息</view>
      </view>
      <view class="types">
        <view>
          <view>A类</view>
          <ProductTypes2 />
          <view class="presell fz-32">
            <text class="fz-28 m-r-26">预售进度</text>
            <u-line-progress :percentage="50" activeColor="#FF5319" />
            <view class="fz-24 m-l-8"><view class="red">已售0</view><view>303330</view> </view>
          </view>
        </view>
        <view>
          <view>B类</view>
          <ProductTypes2 />
          <view class="presell fz-32">
            <text class="fz-28 m-r-26">预售进度</text>
            <u-line-progress :percentage="50" activeColor="#FF5319" />
            <view class="fz-24 m-l-8"><view class="red">已售0</view><view>303330</view> </view>
          </view>
        </view>
      </view>
      <view class="bottom">
        <view>
          <text>运费</text>
          <text>包邮</text>
        </view>
        <view>
          <text>预售时间</text>
          <text>2月7日 14:25 至 4月7日 09:25</text>
        </view>
        <view>
          <text>预计发货时间</text>
          <text>4月10日</text>
        </view>
      </view>
    </view>

    <view class="uploaded-footer flex p-b-safe-area">
      <u-button
        class="uploaded-footer__button"
        shape="circle"
        text="预览活动"
        @click="nextpage()"
      />
      <u-button
        class="uploaded-footer__button"
        shape="circle"
        text="暂停预售"
        @click="nextpage()"
      />
      <u-button class="uploaded-footer__button" color="#FF5319" shape="circle" plain text="修改" />
    </view>
  </view>
</template>

<script>
  import ProductTypes2 from './components/ProductTypes2.vue'
  export default {
    components: {
      ProductTypes2,
    },
    data() {
      return {
        title: '审核未通过',
      }
    },
  }
</script>

<style lang="scss" scoped>
  .content {
    height: 100vh;
    display: flex;
    flex-direction: column;
    > :nth-child(2) {
      flex-grow: 1;
      overflow: auto;
    }
    .reason {
      display: flex;
      justify-content: space-between;
      padding: 32rpx;
      background-color: #fff;
      margin-top: 16rpx;

      > :nth-child(1) {
        flex-grow: 1;
        .reason_text {
          color: rgba(0, 0, 0, 0.85);
        }
        .reason_time {
          color: rgba(0, 0, 0, 0.65);
          font-size: 28rpx;
        }
      }
      > :nth-child(2) {
        flex-shrink: 0;
        margin-left: 48rpx;
        > :nth-child(1) {
          width: 144rpx;
          height: 144rpx;
          border-radius: 50%;
          overflow: hidden;
        }
      }
    }
    .product {
      background-color: #fff;
      padding: 0 32rpx 32rpx 32rpx;
      margin-top: 16rpx;
      &_name {
        display: flex;
        justify-content: space-between;
        > :nth-child(2) {
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
      }
      > :nth-child(n) {
        border-bottom: 1rpx solid #f7f7f8;
        padding: 24rpx 0;
      }
    }
    .types {
      > :nth-child(n + 1) {
        background-color: #fff;
        margin-top: 16rpx;
        padding: 32rpx 32rpx 0 32rpx;
      }
      > :nth-child(n) {
        > :nth-child(1) {
          font-size: 32rpx;
          font-weight: bold;
        }
        .presell {
          color: rgba(0, 0, 0, 0.85);
          padding: 24rpx 0;
          border-bottom: 1rpx solid #f7f7f8;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .red {
            color: #ff5319;
            text-align: right;
          }
        }
      }
    }
    .bottom {
      background-color: #fff;
      margin-top: 16rpx;
      font-size: 32rpx;
      color: rgba(0, 0, 0, 0.85);
      padding: 0 32rpx;
      margin-bottom: 50rpx;
      > :nth-child(n) {
        display: flex;
        justify-content: space-between;
        padding: 24rpx 0;
        border-bottom: 1rpx solid #f7f7f8;
      }
    }
    .uploaded-footer {
      width: 100%;
      height: 184rpx;
      padding-top: 24rpx;
      line-height: 184rpx;
      box-sizing: border-box;

      background: $v-bg-white;

      &__button {
        width: 192rpx;
        height: 80rpx;
      }
    }
  }
</style>
