<template>
  <u-overlay :show="showVideo" @click="close" :opacity="1">
    <view class="videoWarp" @tap.stop @click="close">
      <video
        id="myVideo"
        ref="myVideo"
        class="video"
        :autoplay="autoplay"
        :src="videoUrl"
        :poster="poster"
        show-loading
        @fullscreenchange="fullscreenchange"
        @ended="ended"
        @error="videoErr"
      ></video>
    </view>
  </u-overlay>
</template>
<script>
  export default {
    name: 'EraPreviewVideo',
    props: {
      // 视频链接
      videoSrc: {
        type: String,
        default: '',
      },
      // 视频海报
      poster: {
        type: String,
        // default: '/static/demo/IMG_3839.JPG',
        default: '',
      },
      // 自动播放
      autoplay: {
        type: Boolean,
        default: false,
      },
      isFullScreen: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        showVideo: false,
        videoContext: null,
        videoUrl: '',
      }
    },
    created() {},
    methods: {
      transferCosUrl(url, type = 1) {
        if (!url) return ''
        if (url.indexOf('/api/file/operations') > -1) {
          return url + `&type=${type}`
        } else {
          return url
        }
      },
      videoErr(err) {
        console.log('视频播放错误', err)
      },
      close() {
        this.videoContext = null
        this.showVideo = false
      },
      ended() {
        console.log('播放完了')
        this.videoContext.pause()
        this.videoContext.seek(0)
      },
      // 调用展示预览方法
      show(videoUrl) {
        // this.handleUrl()
        if (videoUrl) {
          this.videoUrl = this.transferCosUrl(videoUrl, 4)
        } else {
          this.videoUrl = this.videoSrc
        }
        console.log(this.videoSrc)
        console.log('videoUrl=======', this.videoUrl)

        this.showVideo = true
        this.videoContext = uni.createVideoContext('myVideo', this)
        if (this.isFullScreen) {
          if (this.isFullScreen) {
            // #ifdef APP-PLUS
            this.videoContext.requestFullScreen({ direction: 0 })
            // #endif
            // #ifdef H5
            this.videoContext.requestFullScreen()
            // #endif
          }
        }
        if (this.autoplay) {
          this.videoContext.play()
        }
      },
      fullscreenchange(e) {
        if (!e.detail.fullScreen) {
          this.videoContext.pause()
          this.showVideo = false
        }
      },
    },
  }
</script>
<style scoped>
  .videoWarp {
    position: absolute;
    left: 0;
    top: 450rpx;
    width: 750rpx;
  }
  .video {
    width: 750rpx;
  }
</style>
