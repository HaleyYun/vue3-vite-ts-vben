<template>
  <view class="live-page">
    <view class="anchor-list">
      <view class="anchor-list-item" v-for="(item, index) in anchorList" :key="index">
        <image class="ava-img" :src="item.img"></image>
        <view class="name">
          {{ item.name }}
        </view>
      </view>
      <view
        class="anchor-list-item"
        @click="toPage('/pagesAgent/CreatedCenter/CreatedLive/AnchorList')"
      >
        <u-icon name="arrow-right" size="30"></u-icon>
      </view>
    </view>
    <view class="tag-wrap">
      <view
        class="tag-item"
        :class="item.choosed ? 'choosed' : ''"
        v-for="(item, index) in tagList"
        :key="item.tag"
        @click="tagClick(item)"
      >
        {{ item.tag }}
      </view>
    </view>
    <view class="info-list-colum" v-if="tagValue === '我的'">
      <view class="info-list-item-colum" v-for="(item, index) in liveList" :key="index + item.name">
        <view class="status-icon" :class="item.status === '预告' ? 'green' : ''">
          {{ item.status }}
        </view>
        <view class="left">
          <image class="live-img" src="/static/headPhoto/girl.jpg"></image>
        </view>
        <view class="right">
          <view>奥迪A6L发动机跟我选</view>
          <view>直播时间：2022.3.20 15:00</view>
          <view class="right-btn"> 开始直播 </view>
        </view>
      </view>
    </view>
    <view class="info-list" v-else>
      <view class="info-list-item" v-for="(item, index) in liveList" :key="index">
        <view class="item-main">
          <view class="live-top">
            <view class="status-icon" :class="item.status === '预告' ? 'green' : ''">
              {{ item.status }}
            </view>
            <view class="status-icon right"> 666人观看 </view>
          </view>

          <image class="video-img" :src="item.liveImg"></image>
          <u-icon class="play-icon" name="play-circle-fill" size="40"></u-icon>
          <view>{{ item.desc }}</view>
          <view class="flex-line">
            <view class="ava-img">
              <image class="head-img" :src="item.photo"></image>
            </view>
            <view class="name-text">
              {{ item.name }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        tagList: [
          {
            tag: '关注',
            choosed: false,
          },
          {
            tag: '精选',
            choosed: false,
          },
        ],
        tagValue: '',
        anchorList: [
          {
            img: '/static/headPhoto/girl.jpg',
            name: '安图',
          },
          {
            img: '/static/headPhoto/girl.jpg',
            name: '安图',
          },
          {
            img: '/static/headPhoto/girl.jpg',
            name: '安图',
          },
          {
            img: '/static/headPhoto/girl.jpg',
            name: '安图',
          },
          {
            img: '/static/headPhoto/girl.jpg',
            name: '安图',
          },
        ],
        liveList: [
          {
            id: 1,
            name: '汽配老炮',
            liveImg: '/static/headPhoto/girl.jpg',
            desc: '奥迪A6L发动机跟我选',
            photo: '/static/headPhoto/girl.jpg',
            status: '直播中',
          },
          {
            id: 2,
            name: '汽配老炮',
            liveImg: '/static/headPhoto/girl.jpg',
            desc: '奥迪A6L发动机跟我选',
            photo: '/static/headPhoto/girl.jpg',
            status: '预告',
          },
        ],
        role: 'audience', //用户角色观众和主播
      }
    },
    created() {
      // if (options.role) {
      // this.role = options.role;
      this.role = uni.getStorageSync('live_role') || 'audience'
      console.log('role', this.role)
      if (this.role === 'anchor') {
        this.tagList = [
          {
            tag: '我的',
            choosed: false,
          },
          {
            tag: '关注',
            choosed: false,
          },
          {
            tag: '精选',
            choosed: false,
          },
        ]
      } else {
        this.tagList = [
          {
            tag: '关注',
            choosed: false,
          },
          {
            tag: '精选',
            choosed: false,
          },
        ]
      }
    },
    methods: {
      tagClick(item) {
        this.tagList.forEach((tag) => {
          if (tag.tag === item.tag) {
            tag.choosed = !tag.choosed
          } else {
            tag.choosed = false
          }
        })
        this.tagValue = item.tag
      },
      toPage(url) {
        this.$linkToEasy(url)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .live-page {
    height: 100%;
    position: relative;

    .anchor-list {
      display: flex;

      .anchor-list-item {
        padding: 10px;

        .name {
          text-align: center;
        }

        .ava-img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
    }

    .tag-wrap {
      padding: 5px;

      .tag-item {
        display: inline-block;
        font-size: 10px;
        background-color: #eee;
        padding: 5px 10px;
        text-align: center;
        margin: 5px;
        border-radius: 10px;

        &.choosed {
          background-color: #999;
          color: #fff;
        }

        .item-title {
          font-weight: bold;
        }
      }
    }

    .info-list {
      height: 100%;
      column-count: 2; //分为两列,用于瀑布流
      column-gap: 10upx;
      padding: 10upx;
      box-sizing: border-box;

      .info-list-item {
        position: relative;
        box-sizing: border-box;
        padding: 10upx 0;
        break-inside: avoid; //用于瀑布流
        border-radius: 10px;

        .item-main {
          width: 100%;
          position: relative;

          .play-icon {
            position: absolute;
            right: 10px;
            top: 10px;
          }

          .live-top {
            display: flex;
            z-index: 99;
            position: absolute;
            left: 0;
            top: 0;
          }
        }
        .video-img {
          width: 100%;
          height: 150px;
          border-radius: 10px;
        }

        .flex-line {
          display: flex;
          padding: 10upx;
          align-items: center;
          font-size: 12px;

          .name-text {
            padding-left: 5px;
          }
        }

        .head-img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }
    }
    .status-icon {
      color: #fff;
      background-color: red;
      border-radius: 10px;
      padding: 2px 5px;

      &.green {
        background-color: green;
      }

      &.right {
        background-color: #d3d4db;
      }
    }
    .info-list-item-colum {
      display: flex;
      margin-bottom: 10px;
      position: relative;
      padding: 10px;

      .left {
        .live-img {
          width: 80px;
          height: 80px;
          border-radius: 10px;
        }
      }

      .right {
        flex: 1;
        padding-left: 10px;

        .right-btn {
          display: inline-block;
          font-size: 14px;
          background-color: #999;
          padding: 5px 10px;
          text-align: center;
          color: #fff;
          border-radius: 10px;
          margin-top: 10px;
        }
      }

      .status-icon {
        position: absolute;
        left: 10px;
        top: 10px;
        z-index: 99;
      }
    }
  }
</style>
