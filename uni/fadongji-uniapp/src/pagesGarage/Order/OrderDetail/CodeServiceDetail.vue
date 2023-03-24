<template>
  <view class="service flex flex-column">
    <VoNav is-fixed title="定制服务详情" />
    <view class="service-project">
      <view class="fz-32 m-l-32 m-t-24 p-b-24">服务项目</view>
      <view class="line" />
      <view class="m-t-16 m-l-44 m-r-20 fz-28 flex flex-justify-between">
        <view class="color-block">服务费</view>
        <view class="color-block-45">100元</view>
      </view>
      <view class="m-t-16 p-b-22 m-l-44 m-r-20 fz-28 flex flex-justify-between">
        <view class="color-block">仓库名称：</view>
        <view class="color-block-45">郑州时丰仓库</view>
      </view>
    </view>
    <view class="service-project">
      <view class="fz-32 m-l-32 m-t-24 fz-b p-b-24">定制信息</view>
      <view class="line" />
      <view class="m-l-34 m-t-16 color-block-25 fz-24">发动机号照片</view>
      <view class="m-l-32 m-t-16 p-b-24">
        <image :src="urlStr" class="service-project__image" @click="lookPreviewImage(urlStr)" />
      </view>
      <view class="line" />
      <view class="m-l-34 m-t-16 color-block-25 fz-24">选项二：发动机铭牌、行驶证照片</view>
      <view class="flex p-b-24">
        <view class="m-l-32 m-t-16">
          <image :src="urlStr" class="service-project__image" @click="lookPreviewImage(urlStr)" />
        </view>
        <view class="m-l-32 m-t-16">
          <image :src="urlStr" class="service-project__image" @click="lookPreviewImage(urlStr)" />
        </view>
      </view>
    </view>

    <view class="service-project">
      <view class="fz-32 m-l-32 m-t-24 p-b-24">订单信息</view>
      <view class="line" />
      <view class="m-t-16 m-l-36 m-r-36 fz-28 flex flex-justify-between">
        <view class="color-block">订单编号：</view>
        <view class="flex flex-vertical-c">
          <view class="color-block-45">20221243455666666777</view>
          <view class="service-project__copy" @click="copyClick('20221243455666666777')">复制</view>
        </view>
      </view>
      <view class="m-t-16 p-b-22 m-l-36 m-r-36 fz-28 flex flex-justify-between">
        <view class="color-block">下单时间：</view>
        <view class="color-block-45">2022-03-22 18:01:12</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'CodeServiceDetail',
    data() {
      return {
        urlStr:
          'http://testgate.fdjcyl.com/vocen-wolverine/v1/api/file/operations/getImage?fileName=temporary/20220811/d00815640933480e8c9f40c5f4007cf7.PNG',
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
    },
  }
</script>

<style lang="scss" scoped>
  .service {
    width: 750rpx;
    height: 100vh;
    &-project {
      margin-top: 16rpx;
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
  }
  .line {
    background-color: $v-bg-light;
    height: 2rpx;
    margin-left: 32rpx;
  }
</style>
