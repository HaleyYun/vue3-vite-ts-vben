<template>
  <view class="install">
    <view class="install-box">
      <view class="install-box__title">
        <view class="left fz-16">安装指导</view>
      </view>
      <view class="install-box__title" v-if="info.image">
        <view class="left">安装说明</view>
        <view v-if="false" class="right color">点击下载</view>
      </view>
      <view class="images" v-if="info.image">
        <view v-for="img of info.image" :key="img">
          <image class="install-image" :src="img" />
        </view>
      </view>
      <view class="install-box__title">
        <view class="left">安装视频</view>
        <view v-if="false" class="right color">点击下载</view>
      </view>
      <video
        id="myVideo"
        class="install-video"
        src="https://www.bilibili.com/video/BV1RP4y1h7NK?t=9.3"
      ></video>
    </view>
  </view>
</template>
<script>
  export default {
    name: 'CellInfo',
    props: {
      info: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        visible: true,
        labelArr: [
          {
            name: '',
            value: '',
            require: true,
          },
        ],
      }
    },
    methods: {
      show() {
        this.visible = true
      },
      close() {
        this.visible = false
      },
      confirm() {
        this.visible = false
      },
    },
  }
</script>
<style lang="scss" scoped>
  .install {
    .fz-16 {
      font-size: 32rpx !important;
    }

    &-box {
      background: #fff;
      margin-bottom: 16rpx;
      padding: 0 32rpx;

      &__title {
        display: flex;
        padding: 20rpx 0;

        .left {
          font-size: 28rpx;
          line-height: 1.5;
          color: $v-c0-85;
          font-weight: 500;
        }

        .right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          font-size: 28rpx;
          line-height: 1.5;
          color: $v-c0-65;

          &.color {
            color: #155bd4;
            text-decoration: underline;
          }
        }
      }
    }

    &-image {
      width: 100%;
      height: 464rpx;
    }

    &-video {
      width: 100%;
      height: 384rpx;
      border-radius: 16rpx;
    }
  }
</style>
