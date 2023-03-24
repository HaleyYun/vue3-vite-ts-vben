<template>
  <view class="guide">
    <view class="guide-title">安装指导</view>
    <view class="guide-subView flex flex-justify-between" v-if="imgs && imgs.length">
      <view>安装说明</view>
      <view class="guide-subView__url" @click="uploadImages">点击下载</view>
    </view>
    <view class="flex flex-column">
      <image
        v-for="(img, index) of imgs"
        @click="previewFn(imgs, index)"
        :key="index"
        class="guide-image"
        :src="img"
        mode="aspectFill"
      />
    </view>

    <view class="guide-video flex flex-justify-between" v-if="video.length">
      <view>安装视频</view>
      <view class="guide-subView__url" @click="downloadVideo">点击下载</view>
    </view>
    <view class="relative" @click="playVideo" v-if="video.length">
      <image class="guide-image" :src="video[0] + '&type=3'" mode="aspectFill" />
      <image class="play" src="/static/created/circle/circle_video_play.png" />
    </view>
    <!-- <video class="guide-video__content" :src="video[0]" v-if="video.length"></video> -->
    <EraPreviewVideo ref="EraPreviewVideo" :videoSrc="video[0]" :poster="video[0] + '&type=3'" />
  </view>
</template>

<script>
  import { downloadImage } from '@/common/helper'
  export default {
    name: 'InstallationGuide',
    props: {
      info: {
        type: Object,
      },
    },
    data() {
      return {
        imgs: [],
        video: [],
      }
    },
    created() {
      if (this.info.guideVideo && this.info.guideVideo.length) {
        this.info.guideVideo.forEach((item) => {
          const isImage = this.$vocenApi.Pattern.isImgUrl(item)
          if (!isImage) {
            this.video.push(item)
          } else {
            this.imgs.push(item)
          }
        })
      }
    },
    methods: {
      previewFn(url, index) {
        uni.previewImage({
          urls: url,
          current: index,
        })
      },
      playVideo() {
        this.$refs.EraPreviewVideo.show(this.video[0])
      },
      async uploadImages() {
        const _this = this
        // #ifdef APP-PLUS

        for (let i = 0; i < this.imgs.length; i++) {
          await uni.saveImageToPhotosAlbum({
            filePath: this.imgs[i],
            success: function (res) {
              _this.$u.toast('保存至相册')
            },
            fail: function (err) {
              console.log('保存失败', err)
            },
          })
        }
        // #endif

        // #ifdef H5
        for (let i = 0; i < this.imgs.length; i++) {
          downloadImage(this.imgs[i], '安装指导')
        }
        // #endif
      },

      downloadVideo() {
        const _this = this
        // #ifdef APP-PLUS
        uni.saveVideoToPhotosAlbum({
          filePath: _this.video[0],
          success: function () {
            _this.$u.toast('保存至相册')
          },
        })
        // #endif
        // #ifdef H5
        window.location.href = this.video[0]
        // #endif
      },
    },
  }
</script>

<style lang="scss" scoped>
  .guide {
    width: 750rpx;
    padding: 16rpx 32rpx 32rpx;
    background-color: #ffffff;
    box-sizing: border-box;
    margin-top: 16rpx;

    &-title {
      color: $v-c0-85;
      font-size: 28rpx;
      font-weight: bold;
    }

    &-subView {
      margin-top: 24rpx;
      padding-bottom: 24rpx;
      font-size: 28rpx;
      color: $v-c0-85;

      &__url {
        color: $v-tip;
        text-decoration: underline;
      }
    }

    &-image {
      width: 686rpx;
      height: 464rpx;
      border: 1px solid #f6f7f8;
    }

    &-video {
      margin-top: 32rpx;
      padding-bottom: 24rpx;
      font-size: 28rpx;
      color: $v-c0-85;
    }

    &-video__content {
      width: 686rpx;
      height: 384rpx;
      border-radius: 20rpx;
    }
    .play {
      width: 120rpx;
      height: 120rpx;
      position: absolute;
      top: 180rpx;
      left: 280rpx;
      z-index: 99;
    }
  }
</style>
