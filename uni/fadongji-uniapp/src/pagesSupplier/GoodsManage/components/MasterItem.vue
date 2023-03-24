<template>
  <view class="detail">
    <view class="user" @click.stop="toHomePage()">
      <image :src="info.photoUrl || '/static/default_avatar.png'" class="left" />
      <view v-if="pageName === 'evaluate'" class="right">
        <view class="right-title">{{ info.storeName }}</view>
        <view class="right-rate">
          <u-rate
            v-model="starValue"
            :count="5"
            activeColor="#E50012"
            allowHalf
            readonly
            size="10"
          />
          <view class="right-rate__line" />
          <view class="right-rate__num">数量：{{ info.evaluateNumber }}</view>
        </view>
        <view class="right-text evaluate"> {{ info.createTime }} </view>
      </view>
      <view v-else class="right">
        <view class="right-title flex">
          {{ info.nickName }}
          <view v-if="info.userLevel" class="lv-tag">{{ info.userLevel }}</view>
        </view>
        <view class="right-text"> {{ info.createTime }} </view>
      </view>
    </view>
    <view class="detail-content">
      {{ info.content.slice(0, 66) }}
    </view>
    <view v-if="info.image && !info.video && !info.poster" class="media-container">
      <view v-for="img in info.image" :key="img" class="image-box">
        <image :src="$getDomain(img)" class="media-container__img" />
      </view>
    </view>
    <view v-if="info.video || info.poster" class="poster">
      <image :src="info.poster || $getDomain(info.image[0])" class="poster-img" />
      <image class="poster-icon" src="/static/icons/play.png" />
    </view>
  </view>
</template>

<script>
  export default {
    name: 'VoCircleDetail',
    props: {
      info: {
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
        image: [],
        starValue: 0,
      }
    },
    mounted() {
      this.starValue = this.info.starMark / 2
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
      //去主页
      toHomePage() {
        this.$linkToEasy(
          `/pagesAgent/PersonalHomepage/PersonalHomepage?userId=${this.info.userId}&platformCode=${this.info.platformCode}`,
        )
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
    .poster {
      position: relative;
      &-img {
        height: 364rpx;
        width: 100%;
      }
      &-icon {
        width: 110rpx;
        height: 110rpx;
        position: absolute;
        right: calc(50% - 56rpx);
        top: calc(50% - 56rpx);
      }
    }
    .lv-tag {
      background: #f20014;
      border-radius: 20rpx;
      width: 80rpx;
      height: 36rpx;
      color: #ffffff;
      font-size: 24rpx;
      line-height: 36rpx;
      text-align: center;
      margin-left: 16rpx;
    }
  }
</style>
