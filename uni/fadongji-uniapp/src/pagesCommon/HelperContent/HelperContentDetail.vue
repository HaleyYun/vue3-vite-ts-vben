<template>
  <div class="page-wrap">
    <VoNav is-fixed title="详情" is-have-more>
      <!--      <VoIcon-->
      <!--        slot="operation"-->
      <!--        @click="showShareBox"-->
      <!--        class="m-r-24"-->
      <!--        color="#000"-->
      <!--        :opacity="0.45"-->
      <!--        name="share"-->
      <!--      />-->
    </VoNav>
    <view class="page-header">
      <view class="title">{{ info.name }}</view>
      <view class="info">
        <view class="create-time">{{ info.updateTime }}</view>
        <view class="author">{{ info.author || '' }}</view>
      </view>
    </view>
    <view class="page-container">
      <template v-if="info.content.json">
        <u-parse :content="info.content.json" />
      </template>
      <template v-if="info.fileUrl && info.fileUrl.match(/\.mp4|avi|mov|3gp|mkv/g)">
        <view  class="relative" @click="playVideo">
          <image class="guide-image" :src="info.fileUrl + '&type=3'" mode="aspectFill" />
          <image class="play" src="/static/created/circle/circle_video_play.png" />
        </view>
        <EraPreviewVideo ref="EraPreviewVideo" :videoSrc="info.fileUrl" :poster="info.fileUrl + '&type=3'" />
        <!--<video-->
          <!--@ended="playVideo"-->
          <!--id="myVideo"-->
          <!--:src="info.fileUrl"-->
          <!--:poster="info.fileUrl + '&type=3'"-->
          <!--:style="{ width: '100%', height: '500rpx' }"-->
          <!--@error="test"-->
        <!--&gt;</video>-->
      </template>
    </view>
    <VoShareView ref="shareRef" @shareFn="shareFn" />
    <!--<VoShareView></VoShareView>-->
  </div>
</template>

<script>
  import VoShareView from '@/components/VoShareView/VoShareView'
  import helpUtil from '@/common/helper'
  import devConf from '@/common/env'

  export default {
    name: 'HelperContentList',
    components: { VoShareView },
    data() {
      return {
        info: {},
        content: '',
        id: null,
        showVideo: false,
      }
    },
    onLoad(options) {
      if (options.id) {
        this.id = options.id
        this.getDetail(options.id, options.categoryId)
      }
    },
    async created() {
      // helper.showLoading()
      // setTimeout(() => {
      //   helper.hideLoading()
      // }, 500)
    },
    methods: {
      test(e) {
        // video.play()
        console.log(video)
        console.log(e)
      },
      playVideo() {
        this.$refs.EraPreviewVideo.show(this.info.fileUrl)
      },
      getDetail(id, categoryId) {
        let data = this.$storage.get('helpQuestionData')
        this.info = data
        this.info.content = JSON.parse(this.info.content)
        console.log(this.info)
      },
      showShareBox() {
        this.$refs.shareRef && this.$refs.shareRef.showShare(true)
      },
      //分享
      shareFn(type) {
        console.log('shareFn', type)
        this.$refs.shareRef.cancle()
        let path = ''
        path = '/pagesCommon/HelperContent/HelperContentDetail?id=' + this.id
        helpUtil
          .shareWeixin({
            scene: type,
            title: this.info.name,
            path: devConf.shareBaseUrl + path,
            desc: '帮助中心',
            imageUrl: this.info.image ? this.info.image[0] : '',
          })
          .then((res) => {
            console.log('res分享', res)
          })
          .catch((err) => {
            console.log('shareWeixinErr', err)
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .page {
    &-wrap {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      overflow-y: scroll;
      background: #fff;
      padding: 0 32rpx;
    }
    &-container {
      padding: 24rpx 0;
    }
    &-header {
      border-bottom: 1px solid #f0f0f0;
      padding-bottom: 22rpx;
      .title {
        font-size: 36rpx;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;
        line-height: 1.5;
        margin-bottom: 24rpx;
      }
      .info {
        display: flex;
      }
      .create-time {
        font-size: 24rpx;
        color: rgba(0, 0, 0, 0.45);
        margin-right: 30rpx;
      }
      .author {
        font-size: 24rpx;
        color: rgba(0, 0, 0, 0.45);
      }
    }
  }
  .guide-image {
    width: 100%;
    height: 500rpx;
  }
  .play {
    width: 120rpx;
    height: 120rpx;
    position: absolute;
    top: 180rpx;
    left: 280rpx;
    z-index: 99;
  }
</style>
