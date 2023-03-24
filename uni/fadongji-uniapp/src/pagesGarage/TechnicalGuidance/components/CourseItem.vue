<template>
  <view v-if="dataObj && dataObj.id" class="course-item" @click="itemClick">
    <view class="course-item__img">
      <image
        :src="
          dataObj.image && dataObj.image.length
            ? transferCosUrlFn(dataObj.image[0], 1)
            : '/static/default_logo.png'
        "
        class="video-img" mode="aspectFit"
      />
      <image v-if="dataObj.type === 2" class="play-icon" src="/static/common/play.png" />
      <view class="img-bottom">
        <VoIcon :size="24" color="#ffffff" name="eye" />
        <text>{{ dataObj.viewCount }}</text>
        <text class="img-bottom__time">{{ dataObj.time }}</text>
      </view>
    </view>
    <view class="course-item__text overTwoEllipsis">
      {{ dataObj.name }}
      <!--{{ courseName.slice(0, 18) }}-->
      <!--<text class="point">...</text>-->
    </view>
    <!-- v-if="dataObj.keyword && JSON.parse(dataObj.keyword) && JSON.parse(dataObj.keyword).length" -->
    <view v-if="dataObj.keyword && dataObj.keyword != '[]'" class="tag-con">
      <view
        v-for="(item, index) in dataObj.keyword.split(',')"
        :key="index"
        class="tag-item color-block"
      >
        {{ item }}
      </view>
    </view>
    <view v-else class="tag-con"></view>
  </view>
</template>
<script>
  import { transferCosUrl } from '@/common/helper'

  export default {
    name: 'CourseItem',
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
      dataObj: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {}
    },
    methods: {
      transferCosUrlFn: transferCosUrl,
      itemClick() {
        // if (this.disabled) {
        //   return
        // }
        this.$emit('click', this.dataObj)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .course-item {
    background: #ffffff;
    box-sizing: border-box;
    break-inside: avoid;
    margin-bottom: 40rpx;
    height: 340rpx;
    &__img {
      position: relative;
      height: 188rpx;
      .video-img {
        width: 100%;
        height: 188rpx;
        border-radius: 8rpx;
      }
      .play-icon {
        width: 120rpx;
        height: 120rpx;
        position: absolute;
        right: calc(50% - 60rpx);
        top: calc(50% - 60rpx);
      }
      .img-bottom {
        width: 100%;
        color: #ffffff;
        font-size: 24rpx;
        line-height: 1.5;
        display: flex;
        align-items: center;
        position: absolute;
        bottom: 0;
        padding: 8rpx;
        box-sizing: border-box;
        background-image: url('/static/supplier/rectangle.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        &__time {
          flex: 1;
          text-align: right;
        }
      }
    }
    &__text {
      color: $v-c0-85;
      font-size: 28rpx;
      line-height: 42rpx;
      font-weight: bold;
      margin: 16rpx 8rpx;
      overflow: hidden;
      position: relative;
      word-break: break-all;
      text-align: justify;
      text-overflow: ellipsis;
      // white-space: nowrap;
    }
  }
  .tag-con {
    overflow: hidden;
    //display: flex;
    //flex-wrap: nowrap;
    //align-items: center;
    width: 100%;
    -webkit-line-clamp: 1; //行数
    -webkit-box-orient: vertical; //盒子中内容竖直排列
    height: 36rpx;
    .tag-item {
      margin-bottom: 20rpx;
      overflow: initial;
      flex-shrink: 0;
      margin-right: 16rpx;
      float: left;
      border: 1.6rpx solid #d3d4db;
      border-radius: 4rpx;
      background: #f6f7f8;
      width: fit-content;
      height: 36rpx;
      padding: 0 8rpx;
      font-size: 24rpx;
      box-sizing: border-box;
    }
  }
</style>
