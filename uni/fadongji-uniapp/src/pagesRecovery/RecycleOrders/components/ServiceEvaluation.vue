<template>
  <view class="serve">
    <view class="serve-title p-b-24 fz-32 fz-b">服务评价</view>
    <view class="flex flex-vertical-c m-t-24">
      <view class="lh42 fz-28 color-block">星级：</view>
      <u-rate
        :value="info.starMark / 2"
        activeIcon="/static/created/evaluate/score_activate.png"
        gutter="12"
        inactiveIcon="/static/created/evaluate/score_not_active.png"
        readonly
      />
    </view>
    <view class="flex fz-28 lh42 m-t-16">
      <view class="color-block">内容：</view>
      <view class="flex1 m-l-4">{{ info.content.content }}</view>
    </view>
    <view class="lh42 fz-28 color-block m-t-16">图片：</view>
    <view class="serve-video">
      <view
        v-for="(item, index) of info.content.fileList"
        :key="index"
        class="serve-video__outside"
      >
        <view v-if="+item.type === 2" @click="previewFn(item)">
          <image :src="item.poster" class="outside-size" />
          <image
            class="outside-play"
            src="/static/oldbuyer/technical_workers/video_play.png"
          ></image>
        </view>
        <image v-else :src="item.src + '&type=1'" class="outside-size" @click="previewFn(item)" />
      </view>
    </view>
    <EraPreviewVideo ref="previewVideo" :videoSrc="video" />
  </view>
</template>

<script>
  export default {
    name: 'ServiceEvaluation',
    props: {
      info: {
        type: Object,
        default: () => {},
      },
    },
    // watch: {
    //   info: {
    //     immediate: true,
    //     deep: true,
    //     handler(val) {
    //       console.log(val);
    //       console.log("123321");
    //       let imgArr = []
    //       val.fileList.forEach(item => {
    //         if ()
    //       })
    //     },
    //   },
    // },
    data() {
      return {
        value: 4,
        content:
          '评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容',
        imageList: [
          {
            type: 'image',
            src: '/static/demo/rectangle.png',
          },
          {
            type: 'image',
            src: '/static/demo/rectangle.png',
          },
          {
            type: 'video',
            src: '/static/demo/rectangle.png',
          },
        ],
        video: '',
      }
    },
    methods: {
      previewFn(item) {
        if (+item.type === 1) {
          uni.previewImage({
            current: 0, // 当前点击缩略图的下标
            urls: [item.src],
            indicator: 'none', // 指示器/步长器  可取值："default" - 底部圆点指示器； "number" - 顶部数字指示器； "none" - 不显示指示器。
            loop: false, //轮播
            success: (res) => {
              console.log('调用成功', res)
            },
            fail: (err) => {
              console.log('调用失败', err)
            },
            complete: (ret) => {
              console.log('调用完成，管你成功失败', ret)
            },
          })
        } else {
          this.video = item.src
          this.$refs.previewVideo.show(this.video)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .serve {
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
