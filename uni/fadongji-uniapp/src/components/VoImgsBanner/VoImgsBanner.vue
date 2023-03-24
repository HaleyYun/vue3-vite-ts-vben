<template name="imgsBanner">
  <view class="imgsBannerBox">
    <swiper
      class="imgsBanner_swiper"
      :autoplay="autoplay"
      :interval="Number(interval)"
      :duration="Number(duration)"
      :current="comCurrentImg"
      @change="changCurrent"
    >
      <swiper-item v-for="(item, index) of imgList" :key="index" @click="imgClick(item, index)">
        <slot></slot>
        <image class="play-img" :src="getItemUrl(item)" mode="aspectFit" />
        <image
          v-if="item.url.indexOf('mp4') > -1 || item.url.indexOf('MP4') > -1"
          class="play-icon"
          src="/static/created/circle/circle_video_play.png"
        />
      </swiper-item>
    </swiper>
    <!-- 图片位置 -->
    <view class="imgLength">{{ comCurrentImg + 1 + '/' + imgList.length }}</view>
    <scroll-view
      scroll-x="true"
      class="scrollImgBox"
      :scroll-left="scrollImgList"
      scroll-with-animation
      v-if="isShowSmallImgs"
    >
      <view class="scrollImgList">
        <image
          :src="getItemUrl(item)"
          mode="aspectFill"
          v-for="(item, index) in imgList"
          :key="index"
          :class="comCurrentImg == index ? 'activeImageItem' : ''"
          @click="onClickImg(index)"
          :id="'item' + index"
        />
      </view>
    </scroll-view>
    <EraPreviewVideo ref="EraPreviewVideo" :poster="videoUrl + '&type=3'" />
  </view>
</template>

<script>
  export default {
    name: 'ImgsBannerTag',
    props: {
      imgList: {
        type: Array,
        default: () => [],
      },
      currentImg: {
        type: Number,
        default: 0,
      },
      isShowSmallImgs: {
        //是否需要展示小图
        type: Boolean,
        default: true,
      },
      customizeDisplayField: {
        //自定义展示字段
        type: String,
        default: '',
      },
      // 是否循环
      autoplay: {
        type: Boolean,
        default: false,
      },
      // 自动切换时间间隔
      interval: {
        type: [Number, String],
        default: 5000,
      },
      // 滑动动画时长
      duration: {
        type: [Number, String],
        default: 500,
      },
    },
    data() {
      return {
        comCurrentImg: 0,
        scrollImgList: 0,
        imgLeftList: [],
        videoUrl: '',
      }
    },
    created() {
      this.comCurrentImg = this.currentImg
    },
    mounted() {
      uni.getSystemInfo({
        success: () => {
          this.imgList.forEach((i, v) => {
            let info = uni.createSelectorQuery().in(this)
            info
              .select('#item' + v)
              .boundingClientRect((res) => {
                res && this.imgLeftList.push(res.left)
              })
              .exec()
          })
          this.imgListScroll(this.comCurrentImg)
        },
      })
    },
    methods: {
      imgClick(item, index) {
        this.$emit('imgClick', item)
        if (item.url.indexOf('mp4') > -1 || item.url.indexOf('MP4') > -1) {
          this.videoPoster = item.url
          this.$refs.EraPreviewVideo.show(item.originUrl)
        } else {
          let arr = []
          this.imgList.map((item) => {
            arr.push(item.url)
          })

          uni.previewImage({
            urls: arr,
            current: index,
          })
        }
      },
      getItemUrl(item) {
        let { customizeDisplayField } = this
        if (customizeDisplayField) {
          return customizeDisplayField.split('.').reduce((v, k) => v[k], item)
        } else {
          return item
        }
      },
      onClickImg(index) {
        this.comCurrentImg = index
        this.imgListScroll(index)
      },
      changCurrent(e) {
        this.comCurrentImg = e.target.current
        this.imgListScroll(e.target.current)
        this.$emit('change', this.imgList[e.target.current], e.target.current)
      },
      // 图片滑动
      imgListScroll(index) {
        if (index >= 2) {
          this.scrollImgList = this.imgLeftList[index - 2]
        } else {
          this.scrollImgList = 0
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .imgsBannerBox {
    position: relative;
  }
  .imgLength {
    position: absolute;
    top: 686rpx;
    right: 24rpx;
    background: rgba(0, 0, 0, 0.45);
    padding: 0 12rpx;
    line-height: 32rpx;
    font-size: 22rpx;
    border-radius: 40rpx;
    color: #fff;
  }
  .imgsBanner_swiper {
    width: 750rpx;
    height: 750rpx;
    //margin-bottom: 24rpx;
    swiper-item {
      width: 750rpx;
      height: 100%;
      .play-img {
        width: 750rpx;
        height: 750rpx;
      }
    }
  }
  .play-icon {
    width: 120rpx;
    height: 120rpx;
    position: absolute;
    top: 170rpx;
    left: 330rpx;
    z-index: 99;
  }
  .scrollImgBox {
    .scrollImgList {
      white-space: nowrap;
      image {
        width: 132rpx;
        height: 132rpx;
        margin-right: 16rpx;
        display: inline-block;
        border: 6rpx solid #fff;
      }
      image:last-child {
        margin-right: 0;
      }
      .activeImageItem {
        border: 6rpx solid #f57341;
      }
    }
  }
</style>
