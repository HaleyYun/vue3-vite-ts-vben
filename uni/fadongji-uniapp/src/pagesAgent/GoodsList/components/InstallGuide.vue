<template>
  <view class="install" v-if="info.guideVideo && info.guideVideo.length">
    <view class="install-box">
      <view class="install-box__title">
        <view class="left fz-16">安装指导</view>
      </view>
      <view class="install-box__title" v-if="imgs && imgs.length">
        <view class="left">安装说明</view>
        <view class="right color" @click="uploadImages">点击下载</view>
      </view>
      <view class="images" v-if="imgs && imgs.length">
        <view v-for="img of imgs" :key="img">
          <image class="install-image" :src="img" />
        </view>
      </view>
      <view class="install-box__title" v-if="video && video.length">
        <view class="left">安装视频</view>
        <view class="right color" @click="downloadVideo">点击下载</view>
      </view>
      <view class="relative" @click="playVideo" v-if="video.length">
        <image class="guide-image" :src="video[0] + '&type=3'" />
        <image class="play" src="/static/created/circle/circle_video_play.png" />
      </view>
      <!-- <video id="myVideo" class="install-video" :src="video[0]"></video> -->
      <EraPreviewVideo ref="EraPreviewVideo" :videoSrc="video[0]" :poster="video[0] + '&type=3'" />
    </view>
  </view>
</template>
<script>
  import { downloadImage } from '@/common/helper'

  export default {
    name: 'InstallGuide',
    props: {
      info: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        visible: true,
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
      playVideo() {
        this.$refs.EraPreviewVideo.show(this.video[0])
      },
      show() {
        this.visible = true
      },
      close() {
        this.visible = false
      },
      confirm() {
        this.visible = false
      },
      //下载保存图片
      async uploadImages() {
        const _this = thiss
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
      //下载保存视频
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
  .install {
    .fz-16 {
      font-size: 32rpx !important;
    }

    &-box {
      background: #fff;
      margin-bottom: 16rpx;
      padding: 0 32rpx;

      &__title {
        display: flex;
        padding: 20rpx 0;

        .left {
          font-size: 28rpx;
          line-height: 1.5;
          color: $v-c0-85;
          font-weight: 500;
        }

        .right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          font-size: 28rpx;
          line-height: 1.5;
          color: $v-c0-65;

          &.color {
            color: #155bd4;
            text-decoration: underline;
          }
        }
      }
    }

    &-video {
      width: 100%;
      height: 384rpx;
      border-radius: 16rpx;
    }
    .guide-image {
      width: 686rpx;
      height: 464rpx;
      border: 1px solid #f6f7f8;
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
