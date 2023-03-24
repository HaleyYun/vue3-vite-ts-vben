<template>
  <scroll-view scroll-top="0" scroll-y="true" class="video-list">
    <view class="tag-wrap">
      <view class="tag-item" v-for="(item, index) in tagList" :key="index">
        {{ item }}
      </view>
    </view>
    <view class="info-list">
      <view
        class="info-list-item"
        v-for="(item, index) in videoList"
        :key="index"
        @click.stop="toPage(item)"
      >
        <view class="item-main">
          <!-- <video
            id="myVideo"
            class="my-video"
            :src="item.videoUrl"
            @error="videoErrorCallback"
            controls
          ></video> -->
          <image class="video-img" :src="item.img"></image>
          <u-icon class="play-icon" name="play-circle-fill" size="40"></u-icon>
          <view>{{ item.desc }}</view>
          <view class="flex-line">
            <view class="ava-img">
              <image src="/static/headPhoto/girl.jpg"></image>
            </view>
            <view class="name-text">
              {{ item.name }}
            </view>
            <view class="item-btn" @click.stop="giveLike(item)">
              <u-icon name="thumb-up"></u-icon>
              点赞（{{ item.giveNum }}）
            </view>
          </view>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script>
  export default {
    name: 'videoListPage',
    props: {},
    data() {
      return {
        tagList: ['汽修大咖', '找货攻略', '卖货攻略', '商机探索', '问大咖'],
        videoList: [
          {
            id: 1,
            name: '汽配老炮',
            videoUrl: '/static/video/video1.mp4',
            desc: '火花塞安装教程火花塞安装教程火花塞安装教程火花塞安装教程火花塞安装教程火花塞安装教程火花塞安装教程火花塞安装教程火花塞安装教程',
            img: '/static/headPhoto/girl.jpg',
            giveNum: 100,
            time: '3-25',
          },
          {
            id: 2,
            name: '汽配老炮',
            videoUrl: '/static/video/video2.mp4',
            desc: '火花塞安装教程2',
            img: '/static/headPhoto/girl.jpg',
            giveNum: 100,
            time: '3-25',
          },
          {
            id: 3,
            name: '汽配老炮',
            videoUrl: '/static/video/video1.mp4',
            desc: '火花塞安装教程3',
            img: '/static/headPhoto/girl.jpg',
            giveNum: 100,
            time: '3-25',
          },
          {
            id: 4,
            name: '汽配老炮',
            videoUrl: '/static/video/video1.mp4',
            desc: '火花塞安装教程4',
            img: '/static/headPhoto/girl.jpg',
            giveNum: 100,
            time: '3-25',
          },
          {
            id: 5,
            name: '汽配老炮',
            videoUrl: '/static/video/video1.mp4',
            desc: '火花塞安装教程5',
            img: '/static/headPhoto/girl.jpg',
            giveNum: 100,
            time: '3-25',
          },
          {
            id: 6,
            name: '汽配老炮22',
            videoUrl: '/static/video/video1.mp4',
            desc: '火花塞安装教程4666',
            img: '/static/headPhoto/girl.jpg',
            giveNum: 100,
            time: '3-25',
          },
        ],
      }
    },

    methods: {
      toPage(item) {
        this.$linkToEasy('/pages/agent/home/creat/videoDetail?data=' + JSON.stringify(item))
      },
      giveLike(item) {
        uni.$u.toast('点赞成功')
      },
      videoErrorCallback() {
        uni.showModal({
          content: e.target.errMsg,
          showCancel: false,
        })
      },
    },
    created() {},
  }
</script>

<style lang="scss" scoped>
  .video-list {
    height: 100%;
    width: 750rpx;

    .info-list {
      // display: flex;
      // flex-wrap: wrap;
      height: 100%;
      column-count: 2; //分为两列,用于瀑布流
      column-gap: 10upx;
      padding: 10upx;
      box-sizing: border-box;

      .info-list-item {
        // width: 50%;
        position: relative;
        box-sizing: border-box;
        padding: 10upx 0;
        break-inside: avoid; //用于瀑布流

        .item-main {
          width: 100%;
          position: relative;
          .play-icon {
            position: absolute;
            right: 10px;
            top: 10px;
          }
        }
      }
    }

    .my-video {
      width: 100%;
      height: 200px;
    }
    .video-img {
      width: 100%;
      height: 200px;
    }
    .uni-video-cover {
      z-index: auto !important;
    }

    .tag-wrap {
      padding: 5px;
      border-bottom: 1px solid #eee;

      .tag-item {
        display: inline-block;
        font-size: 10px;
        background-color: #eee;
        padding: 5px;
        text-align: center;
        margin: 5px;
        border-radius: 10px;

        .item-title {
          font-weight: bold;
        }
      }
    }
    .flex-line {
      display: flex;
      padding: 10upx;
      align-items: center;
      font-size: 12px;

      .ava-img {
        image {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }

      .name-text {
        padding-left: 5px;
      }
      .item-btn {
        flex: 1;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
</style>
