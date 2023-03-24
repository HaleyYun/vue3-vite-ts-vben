<template>
  <view class="serve">
    <view class="serve-title p-b-24 fz-32 fz-b">服务评价</view>
    <view class="flex flex-vertical-c m-t-24">
      <view class="lh42 fz-28 color-block">星级：</view>
      <u-rate
        :value="info.installEvaluate.starMark / 2"
        activeIcon="/static/created/evaluate/score_activate.png"
        gutter="12"
        inactiveIcon="/static/created/evaluate/score_not_active.png"
        readonly
      />
    </view>
    <view class="flex fz-28 lh42 m-t-16">
      <view class="color-block">内容：</view>
      <view class="flex1 m-l-4">{{ info.installEvaluate.content.content }}</view>
    </view>
    <block v-if="imgList && imgList.length">
      <view class="lh42 fz-28 color-block m-t-16">图片：</view>
      <view class="serve-video">
        <view v-for="(info, index) in imgList" :key="index" class="serve-video__outside">
          <image :src="info.src" class="outside-size" @click="previewFn(index)" @error="imgErr" />
        </view>
      </view>
    </block>
    <EraPreviewVideo ref="EraPreviewVideo" :poster="poster" :videoSrc="videoSrc" />
  </view>
</template>

<script>
  export default {
    name: 'ServiceEvaluation',
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
        videoSrc: '', // 视频链接
        poster: '/static/demo/IMG_3839.JPG', // 视频海报
        imgList: [],
        maps: [],
      }
    },
    created() {
      this.filterImgList()
    },
    methods: {
      // 图片加载失败处理
      imgErr() {
        this.data.photoUrl = '/static/default_avatar.png'
      },
      /**
       * 预览视频
       */
      choseVideo(data) {
        this.videoSrc = data.src
        this.poster = data.poster + '&type=3'
        this.$refs.EraPreviewVideo.show(data.src)
      },
      /**
       * 预览图片
       */
      previewFn(index) {
        uni.previewImage({
          current: index, // 当前点击缩略图的下标
          urls: this.maps,
          indicator: 'none', // 指示器/步长器  可取值："default" - 底部圆点指示器； "number" - 顶部数字指示器； "none" - 不显示指示器。
          loop: true, //轮播
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
      },
      // 重组图片预览列表
      filterImgList() {
        if (this.info.installEvaluate && this.info.installEvaluate.content) {
          this.imgList = JSON.parse(this.info.installEvaluate.content.pic)
          for (let i = 0; i < this.imgList.length; i++) {
            this.maps.push(this.imgList[i].src)
          }
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .serve {
    background-color: #fff;
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
