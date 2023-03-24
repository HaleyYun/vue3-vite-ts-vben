<template>
  <view class="old_machine-con">
    <view>
      <view class="fz-32 fz-b p-b-24 title">验收情况 </view>
    </view>
    <view class="old_machine fz-28">
      <view class="flex flex-vertical-c m-t-24">
        <view class="fz-b m-r-16">验收结果：</view>
        <view v-if="info.supportQualityVO.quality === true" class="fz-32 lh48 old-green">合格</view>
        <view v-else class="fz-32 lh48 old-red">不合格</view>
      </view>
      <view class="m-t-24">
        <view v-if="info.supportQualityVO.checkMsg.video && info.supportQualityVO.checkMsg.video.length > 0" class="old_machine-image">
          <view
            v-for="(item, index) in info.supportQualityVO.checkMsg.video"
            :key="index"
            class="old-video"
            @click="choseVideo(item)"
          >
            <u--image :src="$transferCosUrl(item.poster,1)" height="218rpx" width="218rpx" />
            <image
              class="old-video__icon"
              src="/static/oldbuyer/technical_workers/video_play.png"
            ></image>
          </view>
        </view>
        <view v-if="info.supportQualityVO.checkMsg.pic && info.supportQualityVO.checkMsg.pic.length" class="old_machine-image m-t-12">
          <view v-for="(item, index) in list" :key="index">
            <view @click="choseImg(index)">
              <u--image
                :src="$transferCosUrl(info.supportQualityVO.checkMsg.pic[index],1)"
                height="218rpx"
                width="218rpx"
              />
            </view>
            <view class="fz-28 m-t-16">{{ item }}</view>
          </view>
        </view>
      </view>
    </view>
    <EraPreviewVideo ref="EraPreviewVideo" :poster="poster" :videoSrc="videoSrc" />
  </view>
</template>

<script>
  export default {
    name: 'AcceptanceCondition',
    props: {
      info: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        list: ['进气端', '排气端', '正时端', '曲后端'],
        poster: '/static/demo/IMG_3839.JPG', // 视频海报
        videoSrc: '',
      }
    },
    methods: {
      /**
       * 预览视频
       */
      choseVideo(data) {
        this.videoSrc = data.src
        this.poster = data.poster
        this.$refs.EraPreviewVideo.show(data.src)
      },
      /**
       * 预览图片
       */
      choseImg(index) {
        uni.previewImage({
          current: index,
          urls: this.info.supportQualityVO.checkMsg.pic,
          indicator: 'none',
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .title {
    border-bottom: 1rpx solid $v-bg-light;
  }

  .old_machine-con {
    padding: 24rpx 32rpx;
  }

  .old_machine {
    &-image {
      display: flex;
      flex-wrap: wrap;

      > :nth-child(n) {
        width: 218rpx;
        margin-bottom: 32rpx;

        > :nth-child(1) {
          width: 218rpx;
          height: 218rpx;
          overflow: hidden;
          border-radius: 8rpx;
        }

        > :nth-child(2) {
          text-align: center;
          color: rgba(0, 0, 0, 0.45);
        }
      }
      > :nth-child(2) {
        margin: 0 16rpx;
      }
      > :nth-child(4) {
        margin-bottom: 0;
      }
    }
  }
  .old-green {
    color: #07c160;
  }
  .old-red {
    color: #f20014;
  }
  .old-video {
    position: relative;
    width: 218rpx;
    height: 218rpx;

    &__icon {
      position: absolute;
      top: 80rpx;
      left: 80rpx;
      width: 58rpx;
      height: 58rpx;
      display: block;
    }
  }
</style>
