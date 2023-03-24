<template>
  <view class="install" v-if="imgs.length || video.length">
    <view class="install-box">
      <view class="install-box__title">
        <view class="left fz-16">安装指导</view>
      </view>
      <view class="install-box__title" v-if="imgs.length">
        <view class="left">安装说明</view>
        <view class="right color" @click="uploadImages">点击下载</view>
      </view>
      <view class="images">
        <view v-for="(img, index) in imgs" :key="index">
          <image class="install-image" :src="img" mode="aspectFill" />
        </view>
      </view>
      <view v-if="video.length">
        <view class="install-box__title">
          <view class="left">安装视频</view>
          <view class="right color" @click="downloadVideo">点击下载</view>
        </view>
        <view class="relative" @click="playVideo()">
          <image class="install-image" :src="video[0] + '&type=3'" mode="widthFix" />
          <image class="play" src="/static/created/circle/circle_video_play.png" />
        </view>
        <!-- <video id="myVideo" class="install-video" :src="video[0]"></video> -->
      </view>
      <EraPreviewVideo
        ref="EraPreviewVideo"
        v-if="video && video.length"
        :videoSrc="video[0]"
        :poster="video[0] + '&type=3'"
      />
    </view>
  </view>
</template>
<script>
  import { downloadImage } from '@/common/helper'
  export default {
    name: 'CellInfo',
    props: {
      info: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        visible: true,
        labelArr: [
          {
            name: '',
            value: '',
            require: true,
          },
        ],
        imgs: [],
        video: [],
      }
    },
    mounted() {
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
      uploadImages() {
        const _this = thiss
        //  #ifdef APP-PLUS
        for (let i = 0; i < this.imgs.length; i++) {
          uni.saveImageToPhotosAlbum({
            filePath: this.imgs[i],
            success: function (res) {
              _this.$u.toast('保存至相册')
            },
            fail: function (err) {
              _this.$u.toast('保存失败')
              // console.log('保存失败', err)
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

    &-image {
      width: 100%;
      height: 464rpx !important;
    }

    &-video {
      width: 100%;
      height: 384rpx;
      border-radius: 16rpx;
    }
    .play {
      width: 120rpx;
      height: 120rpx;
      position: absolute;
      top: 132rpx;
      left: 280rpx;
      z-index: 99;
    }
  }
</style>
