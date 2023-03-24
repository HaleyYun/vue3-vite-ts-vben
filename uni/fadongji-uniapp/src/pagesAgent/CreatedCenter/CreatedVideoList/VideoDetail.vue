<template>
  <view class="video-detail-nvue" :style="{ paddingTop: statusBarHeight + 'px' }">
    <!-- <u-gap :height="statusBarHeight" /> -->
    <video
      v-if="info.videoUrl"
      id="myVideo"
      class="my-video"
      :src="info.videoUrl"
      @error="videoErrorCallback"
      object-fit="contain"
      :controls="false"
      :autoplay="true"
      :loop="true"
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
            <view class="flex-line__photo">
              <image class="ava-img" src="/static/headPhoto/photo1.png" />
              <image class="v-img" src="/static/icons/big_v.png" />
            </view>
            <text class="name-text">
              {{ info.name }}
            </text>
          </view>
          <view class="video-text">
            <text class="video-text__word">{{ videoTexts }}</text>
            <text v-if="info.desc.length > 40" class="link-text" @click.stop="expand()">
              {{ isExpand ? '收起' : '展开全文' }}
            </text>
          </view>
          <view class="main-tags">
            <view class="main-tags__tag">#离合器</view>
            <view class="main-tags__tag">#离合器22</view>
          </view>
          <view class="main-slider">
            <slider
              class="uni-slider"
              @change="sliderChange"
              @changing="sliderChanging"
              step="1"
              v-model="sliderValue"
              backgroundColor="#9f9587"
              activeColor="#FFFFFF"
              block-color="#FFFFFF"
              block-size="12"
            />
          </view>
        </view>

        <view class="bottom-bar">
          <view class="item-btn">
            <image class="item-btn__img" src="/static/icons/heart.png" />
            <text class="item-btn__text">点赞</text>
            <text class="item-btn__text num">{{ info.giveNum }}</text>
          </view>
          <view class="item-btn">
            <image class="item-btn__img" src="/static/icons/star-white.png" />
            <text class="item-btn__text">收藏</text>
            <text class="item-btn__text num">89</text>
          </view>
          <view class="item-btn" @click="showAnswerPop(item)">
            <image class="item-btn__img" src="/static/icons/info-white.png" />
            <text class="item-btn__text">评论</text>
            <text class="item-btn__text num">350</text>
          </view>
        </view>
      </view>
      <u-popup
        v-if="sharePopVisible"
        :show="sharePopVisible"
        mode="bottom"
        @close="sharePopVisible = false"
      >
        <view class="pop">
          <view class="pop-title">分享至</view>
          <view class="pop-content">
            <view class="pop-content__btn" @click="shareWeixin">
              <image class="btn-img" src="/static/icons/weixin.png" />
              <view class="btn-name">微信好友</view>
            </view>
            <view class="pop-content__btn">
              <image class="btn-img" src="/static/icons/friend.png" />
              <view class="btn-name">朋友圈</view>
            </view>
          </view>
          <view class="pop-btm" @click="shareCancel">取消</view>
        </view>
      </u-popup>
    </view>
    <!-- #endif -->
    <u-gap :height="safeAreaHeight" />
  </view>
</template>

<script>
  // import  VideoContent from '@/pagesAgent/CreatedCenter/CreatedVideoList/subNVue/VideoContent'
  export default {
    name: 'VideoDetail',
    components: {},
    data() {
      return {
        searchValue: '',
        info: '',
        isExpand: false,
        videoTexts: '',
        sharePopVisible: false,
        commentList: [
          {
            id: 1,
            text: '汽配行业的仓库真是不好干，不赚钱又费时',
            name: '海鲜先森',
            time: '2022-01-19 12:28',
            giveNum: 108,
            itemtipVisible: false,
          },
        ],
        videoContext: '',
        statusBarHeight: 0,
        safeAreaHeight: 0,
        sliderValue: 0, //控制进度条slider的值，
        updateState: false, //防止视频播放过程中导致的拖拽失效
        duration: 0,
        palyFlag: false, //暂停图标显隐

        videoDruation: 0,
      }
    },
    onLoad(options) {
      const res = uni.getSystemInfoSync()
      this.statusBarHeight = res.statusBarHeight
      this.safeAreaHeight = res.safeAreaInsets.bottom
      if (options.data) {
        let data = JSON.parse(options.data)
        this.info = data

        let _this = this
        let txtCntIndex = _this.info.desc.length
        if (txtCntIndex > 40) {
          _this.isExpand = false
          _this.videoTexts = _this.info.desc.substr(0, 40) + '...'
        } else {
          _this.isExpand = true
          _this.videoTexts = _this.info.desc
        }

        // #ifdef APP-PLUS
        //向子窗体传值
        console.log('向子窗体传值', this.info)

        console.log('向子窗体传值', this.info)
        const subNvue = uni.getSubNVueById('VideoContent')
        // console.log('subNvue', subNvue)
        subNvue.show('slide-in-left', 200, () => {
          uni.$emit('sendData', {
            data: this.info,
            duration: this.videoDruation,
          })
        })
        // #endif
      }
    },
    onShow() {},
    onReady() {
      this.videoContext = uni.createVideoContext('myVideo')
      this.updateState = true
      // this.videoContext.requestFullScreen();
    },
    methods: {
      videoErrorCallback(e) {
        console.log('err', e)
      },
      expand() {
        if (this.isExpand) {
          this.isExpand = false
          this.videoTexts = this.info.desc.substr(0, 40) + '...'
        } else {
          this.isExpand = true
          this.videoTexts = this.info.desc
        }
      },
      showSharePop() {
        this.sharePopVisible = true
      },
      shareCancel(){
        this.sharePopVisible = false
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
      width: 16rpx;
      height: 16rpx;
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
      // position: absolute;
      // right: 0;
      // bottom: 0;
      color: rgba(255, 255, 255, 0.85);
      opacity: 0.6;
      font-size: 30rpx;
      line-height: 1.5;
    }

    .line-text {
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

  .pop {
    &-title {
      font-weight: bold;
      font-size: 28rpx;
      line-height: 1.5;
      text-align: center;
      color: rgba(0, 0, 0, 0.85);
      border-bottom: 1px solid #f7f7f8;
      padding: 16rpx 0;
    }
    &-content {
      display: flex;
      padding: 48rpx 40rpx 80rpx 40rpx;
      &__btn {
        margin-right: 40rpx;
        .btn-img {
          width: 120rpx;
          height: 120rpx;
        }
        .btn-name {
          font-size: 24rpx;
          line-height: 34rpx;
          text-align: center;
          color: rgba(0, 0, 0, 0.85);
        }
      }
    }
    &-btm {
      font-size: 32rpx;
      line-height: 1.5;
      text-align: center;
      color: rgba(0, 0, 0, 0.85);
      padding: 24rpx;
      border-top: 1px solid #f7f7f8;
    }
  }
</style>
