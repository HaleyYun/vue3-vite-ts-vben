<template>
  <view class="productDetail">
    <view class="productDetail-title">商品详情</view>
    <view class="productDetail-line" />
    <view class="productDetail-subTitle">图文介绍</view>
    <view class="productDetail-content" v-if="info.detailPic && info.detailPic.length">
      <view
        class="productDetail-content__image"
        v-for="(item, index) of info.detailPic"
        :key="index"
      >
        <view v-if="item.endsWith('.mp4')">
          <view class="relative" @click="playVideo(item)">
            <image class="productDetail-content__image" :src="item + '&type=3'" mode="widthFix" />
            <image class="play" src="/static/created/circle/circle_video_play.png" />
          </view>
          <!-- <video
            v-if="isShowVideo"
            :id="'myVideo' + index"
            class="productDetail-content__video"
            :src="item"
            @ended="eventHandle"
            :autoplay="true"
          ></video> -->
        </view>
        <image
          @click="previewFn(info.detailPic, index)"
          v-else
          class="productDetail-content__image"
          :src="item"
          mode="widthFix"
        />
      </view>
    </view>
    <EraPreviewVideo ref="EraPreviewVideo" :videoSrc="videoSrc" :poster="videoSrc + '&type=3'" />
  </view>
</template>

<script>
  export default {
    name: 'ProductDetail',
    props: {
      info: {
        type: Object,
      },
    },
    data() {
      return {
        detailPic: [],
        videoSrc: '',
      }
    },
    created() {},
    methods: {
      previewFn(url, index) {
        uni.previewImage({
          urls: url,
          current: index,
        })
      },
      playVideo(src) {
        this.videoSrc = src
        this.$refs.EraPreviewVideo.show(src)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .productDetail {
    padding: 24rpx 0rpx 0rpx;
    background-color: #ffffff;
    box-sizing: border-box;
    margin-top: 16rpx;
    &-title {
      padding: 0rpx 32rpx;
      color: $v-c0-85;
      font-size: 32rpx;
      font-weight: bold;
    }

    &-line {
      width: 100%;
      height: 2rpx;
      background-color: $v-bg-light;
      margin-top: 16rpx;
    }

    &-subTitle {
      padding: 24rpx 32rpx 16rpx;
      color: $v-c0-85;
      font-size: 28rpx;
      font-weight: bold;
    }

    &-info {
      margin-top: 16rpx;
      color: $v-c0-85;
      font-size: 26rpx;
    }
    &-content {
      padding: 0rpx 32rpx;
      &__image {
        width: 100%;
      }
    }
    .play {
      width: 120rpx;
      height: 120rpx;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 99;
    }
  }
</style>
