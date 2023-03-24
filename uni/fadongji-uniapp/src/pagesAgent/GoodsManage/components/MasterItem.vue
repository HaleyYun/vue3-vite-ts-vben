<template>
  <view class="detail">
    <view class="user">
      <image class="left" src="/static/logo-2.png" />
      <view class="right" v-if="pageName === 'evaluate'">
        <view class="right-title">河南新乡服务商</view>
        <view class="right-rate">
          <u-rate :count="5" v-model="starValue" size="10" activeColor="#E50012" readonly />
          <view class="right-rate__line" />
          <view class="right-rate__num">数量：1</view>
        </view>
        <view class="right-text evaluate"> 2022.05.21 </view>
      </view>
      <view class="right" v-else>
        <view class="right-title">河南新乡服务商</view>
        <view class="right-text"> 2022.05.21 </view>
      </view>
    </view>
    <view class="detail-content">
      保险那么多，自己预算有限，保险那么多，自己预算有限，保险那么多，自己预算有限，保险那么多，自己预算有限，保险那么多，自己预算有限。
    </view>
    <view class="media-container">
      <view class="image-box" v-for="img in image" :key="img">
        <image class="media-container__img" :src="$getDomain(img)" />
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'VoCircleDetail',
    props: {
      detailData: {
        type: Object,
      },
      //区分大咖说和评价
      pageName: {
        type: String,
      },
    },
    data() {
      return {
        isShowVideo: false,
        datetime: '',
        photoList: [],
        videoContext: '',
        image: [
          'https://cdn.uviewui.com/uview/swiper/swiper3.png',
          'https://cdn.uviewui.com/uview/swiper/swiper2.png',
          'https://cdn.uviewui.com/uview/swiper/swiper1.png',
        ],
        starValue: 5,
      }
    },
    mounted() {
      //时间转换
      // if (this.circleDetailData.createTime) {
      //   let timestamp = new Date(this.circleDetailData.createTime).getTime()
      //   this.datetime = this.$vocenApi.VoUtils.timeFormat(timestamp, 'yyyy年mm月dd日 hh:MM:ss')
      // }
      // console.log('this.circleDetailData', this.circleDetailData)
      // this.videoContext = uni.createVideoContext('myVideo')
    },
    methods: {
      /*
       * 预览图片
       */
      priviewImg(index) {
        uni.previewImage({
          urls: this.circleDetailData.image,
          current: index,
        })
      },
      playClick() {
        this.isShowVideo = true
      },
      // video播放结束
      eventHandle() {
        this.isShowVideo = false
      },
      // 暂停video
      pause() {
        this.videoContext.pause()
        this.isShowVideo = false
      },
    },
  }
</script>

<style lang="scss" scoped>
  .detail {
    padding: 0 32rpx 32rpx 32rpx;
    background-color: #ffffff;
    box-sizing: border-box;
    width: 750rpx;
    margin-bottom: 16rpx;

    .user {
      display: flex;
      .left {
        width: 72rpx;
        height: 72rpx;
        margin-right: 16rpx;
        border-radius: 50%;
      }
      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        line-height: 1.5;
        position: relative;
        &-title {
          font-weight: 500;
          font-size: 26rpx;
          color: $v-c0-85;
        }
        &-text {
          font-size: 24rpx;
          color: $v-c0-45;
          &.evaluate {
            position: absolute;
            right: 0;
          }
        }
        &-rate {
          display: flex;
          align-items: center;
          &__line {
            width: 1px;
            height: 16rpx;
            background-color: $v-c0-25;
            margin: 0 16rpx;
          }
          &__num {
            color: $v-c0-45;
            font-size: 24rpx;
          }
        }
      }
    }
    &-content {
      font-size: 28rpx;
      color: $v-c0-85;
      line-height: 1.5;
      padding-top: 24rpx;
      padding-bottom: 16rpx;
    }

    .media-container {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      box-sizing: border-box;
      .image-box {
        width: 33.33%;
        height: 210rpx;
        padding-right: 8rpx;
        padding-top: 8rpx;
        box-sizing: border-box;

        &:nth-child(3n + 3) {
          padding-right: 0;
        }
      }
      .media-container__img {
        width: 100%;
        height: 100%;
        border-radius: 8rpx;
      }
    }
  }
</style>
