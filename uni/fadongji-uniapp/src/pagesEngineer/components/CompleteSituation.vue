<template>
  <view class="info">
    <view class="info-title p-b-24 fz-32 fz-b">完成情况</view>
    <!-- <view>
      <view class="m-t-24 fz-28 color-block">安装完成凭证：</view>
      <view class="info-video">
        <view
          v-for="(info, index) in imageList"
          :key="index + '1'"
          class="info-video__outside"
          @click="choseImg(index, imageList)"
        >
          <image :src="info" class="outside-size" />
        </view>
      </view>
    </view> -->
    <view class="m-t-24 fz-28 color-block">安装完成视频：</view>
    <view class="info-video" v-if="info.finishVideo">
      <view
        v-for="(item, index) in info.finishVideo.pic"
        :key="index + '1'"
        class="info-video__outside"
        @click="choseVideo(item)"
      >
        <image :src="item.poster" class="outside-size" />
        <image class="outside-play" src="/static/oldbuyer/technical_workers/video_play.png" />
      </view>
    </view>
    <view class="m-t-16 fz-28 color-block">安装时长：{{ hours }}小时{{ min }}分钟</view>
    <EraPreviewVideo ref="EraPreviewVideo" :poster="poster" :videoSrc="videoSrc" />
  </view>
</template>

<script>
  export default {
    name: 'CompleteSituation',
    props: {
      info: {
        type: Object,
        default() {
          return {}
        },
      },
    },

    data() {
      return {
        // 图片
        imageList: [
          '/static/demo/rectangle.png',
          '/static/demo/rectangle.png',
          '/static/demo/rectangle.png',
        ],
        // 视频
        videoList: [
          {
            type: 'video',
            src: 'https://www.runoob.com/try/demo_source/movie.mp4',
            poster: '/static/demo/rectangle.png',
          },
          {
            type: 'video',
            src: 'https://www.runoob.com/try/demo_source/movie.mp4',
            poster: '/static/demo/rectangle.png',
          },
          {
            type: 'video',
            src: 'https://www.runoob.com/try/demo_source/movie.mp4',
            poster: '/static/demo/rectangle.png',
          },
        ],
        videoSrc: '', // 视频链接
        poster: '/static/demo/IMG_3839.JPG', // 视频海报
        hours: 0,
        min: 0,
      }
    },
    mounted() {
      let hours = this.getHour(
        this.info.timeObj['安装时间'].createTime,
        this.info.timeObj['完成时间'].createTime,
      )
      let h = parseInt(hours / 1000 / 60 / 60)
      this.hours = h
      this.min = parseInt((hours % 3600000) / 60 / 1000)
    },
    methods: {
      /**
       * 预览图片
       */
      choseImg(index, list) {
        uni.previewImage({
          current: index,
          urls: list,
          indicator: 'none',
        })
      },
      /**
       * 预览视频
       */
      choseVideo(data) {
        this.videoSrc = data.src
        this.poster = data.poster
        this.$refs.EraPreviewVideo.show(data.src)
      },
      getHour(s1, s2) {
        console.log(s1, s2)
        var reDate = /\d{4}-\d{1,2}-\d{1,2} /
        s1 = new Date((reDate.test(s1) ? s1 : '2018-1-1 ' + s1).replace(/-/g, '/'))
        s2 = new Date((reDate.test(s2) ? s2 : '2018-1-1 ' + s2).replace(/-/g, '/'))
        var ms = s2.getTime() - s1.getTime()
        if (ms < 0) return 0
        return ms //小时
      },
    },
  }
</script>

<style lang="scss" scoped>
  .info {
    padding: 24rpx 32rpx;
    &-title {
      border-bottom: 2rpx solid $v-bg-light;
    }
    &-video {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      &__outside {
        position: relative;
        width: 218rpx;
        height: 218rpx;
        .outside-size {
          width: 218rpx;
          height: 218rpx;
          border-radius: 8rpx;
          overflow: hidden;
          display: block;
        }
        .outside-play {
          position: absolute;
          top: 48rpx;
          left: 48rpx;
          z-index: 99;
          width: 120rpx;
          height: 120rpx;
          display: block;
        }
        margin: 16rpx 16rpx 0 0;
        &:nth-child(3n + 3) {
          margin-right: 0;
        }
      }
    }
  }
</style>
