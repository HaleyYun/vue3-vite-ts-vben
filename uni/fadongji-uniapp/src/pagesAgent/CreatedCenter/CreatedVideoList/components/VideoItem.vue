<template>
  <view :style="{ paddingTop: statusBarHeight + 'px' }" class="video-detail-nvue">
    <!-- <u-gap :height="statusBarHeight" /> -->
    <video
      v-if="videoDetail.videoUrl"
      :id="`myVideo${videoIndex}`"
      :autoplay="autoPlay"
      :controls="false"
      :loop="true"
      :show-center-play-btn="false"
      :src="videoDetail.videoUrl"
      class="my-video"
      object-fit="contain"
      @error="videoErrorCallback"
      @loadedmetadata="loadedmetadata"
      @timeupdate="videoUpdate"
    >
    </video>
    <!-- #ifdef H5 -->
    <view class="video-h5" @click="videoOpreation()">
      <image v-show="palyFlag" class="video-image" src="/static/icons/pause_white.png" />
      <view class="video-content__top">
        <image class="top-img" src="/static/icons/left-arrow.png" @click.stop="backPage()" />
        <view class="top-right">
          <image
            class="top-right__image"
            src="/static/icons/share-white.png"
            @click.stop="showSharePop()"
          />
        </view>
      </view>
      <view class="main">
        <view class="main-content">
          <view class="flex-line">
            <view class="flex-line__photo" @click.stop="toUserHome(videoDetail)">
              <image :src="videoDetail.photoUrl || '/static/default_avatar.png'" class="ava-img" />
              <image class="v-img" src="/static/icons/big_v.png" />
            </view>
            <text class="name-text">
              {{ videoDetail.nickName }}
            </text>
          </view>
          <view class="video-text">
            <text class="video-text__word">{{ videoTexts }}</text>
            <text v-if="videoDetail.title.length > 36" class="link-text" @click.stop="expand()">
              {{ isExpand ? '收起' : '展开全文' }}
            </text>
          </view>
          <view class="main-tags">
            <view class="main-tags__tag">{{ videoDetail.columnName }}</view>
            <!-- <view class="main-tags__tag">#离合器22</view> -->
          </view>
          <view class="main-slider">
            <slider
              v-model="sliderValue"
              activeColor="#FFFFFF"
              backgroundColor="#9f9587"
              block-color="#FFFFFF"
              block-size="12"
              class="uni-slider"
              step="1"
              @change="sliderChange"
              @changing="sliderChanging"
            />
          </view>
        </view>
        <view class="bottom-bar">
          <view class="item-btn" @click.stop="giveOperation()">
            <!-- <image class="item-btn__img" src="/static/icons/heart.png" /> -->
            <VoIcon
              :color="isLike ? '#E50012' : '#FFFFFF'"
              :name="isLike ? 'heard-like' : 'heart-b'"
              :size="36"
            />
            <text class="item-btn__text">点赞</text>
            <text class="item-btn__text num">{{ likeNum || '' }}</text>
          </view>
          <view class="item-btn" @click.stop="toCollect()">
            <VoIcon v-if="isCollect" :size="36" color="#FDA202" name="star" />
            <image v-else class="item-btn__img" src="/static/icons/star-white.png" />
            <text class="item-btn__text">收藏</text>
            <text class="item-btn__text num">{{ collectionNum || '' }}</text>
          </view>
          <view class="item-btn" @click.stop="showAnswerPop()">
            <image class="item-btn__img" src="/static/icons/info-white.png" />
            <text class="item-btn__text">评论</text>
            <text class="item-btn__text num">{{ commentNum || '' }}</text>
          </view>
        </view>
      </view>
      <!-- 分享弹框 -->
      <!-- <SharePop ref="sharePop" /> -->
      <VideoShare ref="videoShare" :isEdit="isEdit" @shareFn="shareFn" />
      <!-- 评论弹框 -->
      <CommentPop ref="commentPop" @close="CommentPopClose" />
    </view>
    <!-- #endif -->
    <u-gap :height="safeAreaHeight" />
  </view>
</template>

<script>
  // import  VideoContent from '@/pagesAgent/CreatedCenter/CreatedVideoList/subNVue/VideoContent'
  import CommentPop from '@/pagesAgent/CreatedCenter/Components/CommentPop.nvue'
  import VideoShare from '@/pagesAgent/CreatedCenter/CreatedVideoList/components/VideoShare.nvue'
  import helpUtil from '@/common/helper'
  import devConf from '@/common/env'
  export default {
    name: 'VideoDetail',
    components: { CommentPop, VideoShare },
    props: {
      //视频数据
      videoDetail: {
        type: Object,
        require: true,
      },
      current: {
        type: Number,
      },
      videoIndex: {
        type: Number,
      },
      //是否编辑
      isEdit: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        searchValue: '',
        isExpand: false,
        videoTexts: '',
        sharePopVisible: false,
        commentList: [],
        videoContext: '',
        statusBarHeight: 0,
        safeAreaHeight: 0,
        sliderValue: 0, //控制进度条slider的值，
        updateState: false, //防止视频播放过程中导致的拖拽失效
        duration: 0,
        palyFlag: false, //暂停图标显隐

        videoDruation: 0,

        isLike: this.videoDetail.mySelfLikeNum === 1 ? true : false,
        isCollect: this.videoDetail.mySelfCollectNum === 1 ? true : false,
        likeNum: this.videoDetail.likeNum || '',
        collectionNum: this.videoDetail.collectionNum || '',
        commentNum: this.videoDetail.commentNum || '',
        autoPlay: false,
      }
    },
    // 监听传过来的参数判断视频的播放与暂停
    watch: {
      current: {
        immediate: true,
        handler: function () {
          this.palyFlag = false
          this.videoContext = uni.createVideoContext(`myVideo${this.videoIndex}`, this)
          this.$nextTick(() => {
            if (this.current != this.videoIndex) {
              this.pause()
            } else {
              this.play()
            }
          })
        },
      },
    },
    created() {
      const res = uni.getSystemInfoSync()
      this.statusBarHeight = res.statusBarHeight
      this.safeAreaHeight = res.safeAreaInsets.bottom
      let _this = this
      let txtCntIndex = _this.videoDetail.title.length
      if (txtCntIndex > 36) {
        _this.isExpand = false
        _this.videoTexts = _this.videoDetail.title.substr(0, 36) + '...'
      } else {
        _this.isExpand = true
        _this.videoTexts = _this.videoDetail.title
      }
    },
    onShow() {},
    mounted() {
      this.updateState = true
      this.$nextTick(() => {
        if (this.current === this.videoIndex) {
          this.videoContext = uni.createVideoContext(`myVideo${this.videoIndex}`)
          setTimeout(() => {
            this.autoPlay = true
            this.videoContext.play()
          }, 500)
        }
      })
      // this.videoContext.requestFullScreen();
    },
    methods: {
      //跳转作者主页
      toUserHome(item) {
        this.$linkToEasy(
          '/pagesAgent/PersonalHomepage/PersonalHomepage?userId=' +
            item.userId +
            '&platformCode=' +
            item.platformCode,
        )
      },
      videoErrorCallback(e) {
        console.log('err', e)
      },
      expand() {
        if (this.isExpand) {
          this.isExpand = false
          this.videoTexts = this.videoDetail.title.substr(0, 36) + '...'
        } else {
          this.isExpand = true
          this.videoTexts = this.videoDetail.title
        }
      },
      showSharePop() {
        this.$refs.videoShare.showShare(this.videoDetail)
      },
      shareFn(type) {
        this.$refs.videoShare.cancle()
        let path = ''
        path = `/pagesAgent/CreatedCenter/CreatedVideoList/VideoSwiper?index=${this.current}&pageSize=${this.pageSize}&pageNo=${this.pageNo}`
        helpUtil
          .shareWeixin({
            scene: type,
            path: devConf.shareBaseUrl + path,
            imageUrl: this.shareData.image ? this.shareData.image[0] : '',
          })
          .then((res) => {
            console.log('res分享', res)
          })
          .catch((err) => {
            console.log('shareWeixinErr', err)
          })
        // uni.share({
        //   provider: 'weixin',
        //   scene: type,
        //   type: 0,
        //   href:
        //     'http://devm.fdjcyl.com/#/pagesAgent/DemoWang/VoVideo' +
        //     '?index=' +
        //     this.current +
        //     '&pageSize=' +
        //     this.pageSize +
        //     '&pageNo=' +
        //     this.pageNo,
        //   title: this.videoDetail.title,
        //   summary: '',
        //   imageUrl: this.videoDetail.image ? this.videoDetail.image[0] : '',
        //   success: function (res) {
        //     console.log('sharesuccess:' + JSON.stringify(res))
        //   },
        //   fail: function (err) {
        //     console.log('sharefail:' + JSON.stringify(err))
        //   },
        // })
        // shareWeixin({
        // 	scene: type,
        // 	title: this.videoDetail.title,
        // 	path: 'http://devm.fdjcyl.com/#/pagesAgent/DemoWang/VoVideo' +
        // 		'?index=' +
        // 		this.current +
        // 		'&pageSize=' +
        // 		this.pageSize +
        // 		'&pageNo=' +
        // 		this.pageNo,
        // 	imageUrl: '',
        // 	desc: '',
        // }).then(res => {
        // 	console.log('res分享', res)
        // }).catch(err => {
        // 	console.log('shareWeixinErr', err)
        // })
      },
      shareWeixin() {},
      backPage() {
        uni.navigateBack()
      },
      // 播放
      play() {
        this.videoContext.play()
      },
      // 暂停
      pause() {
        this.videoContext.pause()
      },
      //开始+暂停
      videoOpreation() {
        console.log('videoOpreation')
        this.palyFlag ? this.play() : this.pause()
        this.palyFlag = !this.palyFlag
      },
      // video加载完成
      loadedmetadata(data) {
        //获取语音秒数，取整
        this.videoDruation = Math.trunc(data.detail.duration)
        console.log('duration', data.detail.duration)
      },
      // 播放进度变化时触发，event.detail = {currentTime, duration} 。触发频率 250ms 一次
      videoUpdate(e) {
        // let duration = this.live.liveRoomRecordList[0].duration
        // let sliderValue = (e.detail.currentTime / duration) * 100
        // let second = (sliderValue / 100) * duration
        let sliderValue = (e.detail.currentTime / e.detail.duration) * 100
        if (this.updateState) {
          //判断拖拽完成后才触发更新，避免拖拽失效
          this.sliderValue = sliderValue
          this.duration = e.detail.duration
        }
      },
      sliderChange(e) {
        console.log(e.detail.value)
        if (this.duration) {
          this.videoContext.seek((e.detail.value / 100) * this.duration) //完成拖动后，计算对应时间并跳转到指定位置
          this.sliderValue = e.detail.value
          this.updateState = true
        }
      },
      //拖动过程中触发的事件
      sliderChanging() {
        //拖拽过程中，不允许更新进度条
        this.updateState = false
      },
      //点赞
      giveOperation() {
        if (this.isLike) {
          this.giveLikeCancel()
        } else {
          this.giveLike()
        }
      },
      //点赞
      giveLike() {
        this.$VoHttp
          .apiCreateQuestionsQuestionLike({
            businessType: this.videoDetail.businessType,
            contentId: this.videoDetail.id,
          })
          .then((res) => {
            if (res.code === '20001') {
              // uni.$u.toast('点赞成功')
              this.isLike = true
              this.likeNum = this.likeNum + 1
            } else {
              uni.$u.toast(res.message)
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('点赞失败')
          })
      },
      //取消点赞
      giveLikeCancel() {
        this.$VoHttp
          .apiCreateQuestionsQuestionCancelLike({
            businessType: this.videoDetail.businessType,
            contentId: this.videoDetail.id,
            userId: this.videoDetail.userId,
          })
          .then((res) => {
            if (res.code === '20001') {
              // uni.$u.toast('取消成功')
              this.isLike = false
              this.likeNum = this.likeNum - 1
            } else {
              uni.$u.toast(res.message)
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('取消失败')
          })
      },
      //收藏
      toCollect() {
        if (this.isCollect) {
          this.collectCancel()
        } else {
          this.collect()
        }
      },
      //收藏
      collect() {
        this.$VoHttp
          .apiCreateQuestionsQuestionCollect({
            contentId: this.videoDetail.id,
          })
          .then((res) => {
            if (+res.code === 20001) {
              this.$toast('收藏成功', 'success', '/static/icons/success_icon.png')
              this.isCollect = true
              this.collectionNum = this.collectionNum + 1
            } else {
              uni.$u.toast(res.message || '收藏失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '收藏失败')
          })
      },
      //取消收藏
      collectCancel() {
        this.$VoHttp
          .apiCreateQuestionsQuestionCancelCollect({
            contentId: this.videoDetail.id,
          })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('已取消收藏')
              this.isCollect = false
              this.collectionNum = this.collectionNum - 1
            } else {
              uni.$u.toast(res.message)
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('取消失败')
          })
      },
      //评论
      showAnswerPop() {
        this.$refs.commentPop.init(this.videoDetail)
        this.$emit('showAnswerPop')
      },
      CommentPopClose(commentNum) {
        this.commentNum = commentNum
        this.$emit('CommentPopClose')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .text {
    color: #fff;
  }

  .video-detail-nvue {
    height: 100vh;
    width: 750rpx;
    position: relative;
    font-size: 14px;
    box-sizing: border-box;
  }

  .my-video {
    width: 750rpx;
    height: 100%;
  }
  .video-image {
    width: 176rpx;
    height: 176rpx;
    position: absolute;
    top: calc(50% - 88rpx);
    right: calc(50% - 88rpx);
  }

  .video-h5 {
    width: 100%;
    height: 100vh;
    z-index: 999;
    // color: #fff;
    white-space: normal;
    position: absolute;
    top: 0;
    .video-content__top {
      display: flex;
      flex-direction: row;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      align-items: center;
      position: absolute;
      top: 0;
      width: 100%;
    }

    .top-right {
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
    .top-img {
      width: 48rpx;
      height: 48rpx;
    }
    .top-right__image {
      width: 72rpx;
      height: 72rpx;
    }

    .main {
      padding: 0 32rpx;
      position: fixed;
      bottom: 0;
      width: 750rpx;
      box-sizing: border-box;
      .main-content {
        .main-tags {
          padding: 16rpx 0;
          display: flex;
          &__tag {
            background-color: rgba(255, 255, 255, 0.25);
            border-radius: 200rpx;
            font-size: 24rpx;
            line-height: 1.5;
            color: #fff;
            padding: 0 16rpx;
            margin-right: 8rpx;
          }
        }
      }
    }

    .flex-line {
      display: flex;
      flex-direction: row;
      padding-top: 16rpx;
      align-items: center;
    }

    .flex-line__photo {
      position: relative;
    }

    .ava-img {
      width: 72rpx;
      height: 72rpx;
      border-radius: 50%;
    }

    .v-img {
      width: 24rpx;
      height: 24rpx;
      position: absolute;
      right: 0;
      top: 0;
    }

    .name-text {
      font-size: 24rpx;
      line-height: 1.5;
      color: #fff;
      padding-left: 8rpx;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .video-text {
      overflow: hidden;
      position: relative;
      word-break: break-all;
      white-space: normal;
      text-align: justify;
      // text-overflow: ellipsis;
      // display: -webkit-box;
      // -webkit-box-orient: vertical;
      // -webkit-line-clamp: 2;
    }
    .video-text__word {
      font-size: 30rpx;
      line-height: 46rpx;
      color: #fff;
    }

    .expand {
      max-height: none !important;
    }

    .link-text {
      position: absolute;
      right: 0;
      bottom: 0;
      color: rgba(255, 255, 255, 0.85);
      opacity: 0.6;
      font-size: 30rpx;
      line-height: 1.5;
    }
    .bottom-bar {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 116rpx;
    }

    .item-btn {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-right: 20rpx;
    }
    .item-btn__img {
      width: 72rpx;
      height: 72rpx;
    }
    .item-btn__text {
      font-size: 26rpx;
      color: #fff;
    }
    .num {
      padding-left: 8rpx;
    }

    .uni-slider {
      margin: 0;
    }
  }
</style>
