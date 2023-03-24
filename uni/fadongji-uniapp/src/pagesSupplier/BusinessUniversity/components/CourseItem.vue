<template>
  <view v-if="dataObj && dataObj.id" class="course-item" @click="itemClick">
    <view class="course-item__img">
      <image
        v-if="dataObj.fileUrl"
        :src="dataObj.type == 1 ? dataObj.fileUrl + '&type=1' : dataObj.fileUrl.split(',')[1] + '&type=1'"
        class="video-img"
        mode="aspectFit"
      />
      <image v-else :src="'/static/defaultStuty.png'" class="video-img" mode="aspectFit" />
      <image v-if="dataObj.type == 2" class="play-icon" src="/static/icons/play.png" />
      <view class="img-bottom">
        <VoIcon :size="24" color="#ffffff" name="eye" />
        <text>{{ dataObj.viewCount }}</text>
        <text v-if="dataObj.type == 2" class="img-bottom__time">{{
          formatSeconds(Number(dataObj.duration))
        }}</text>
      </view>
    </view>
    <view class="course-item__text overTwoEllipsis">
      {{ dataObj.name }}
      <!--{{ courseName.slice(0, 18) }}-->
      <!--<text class="point">...</text>-->
    </view>
  </view>
</template>
<script>
  export default {
    name: 'CourseBox',
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
      itemClick() {
        this.$emit('click')
        if (this.disabled) {
          return
        }
        this.$linkToEasy(`/pagesSupplier/BusinessUniversity/CourseDetail?id=${this.dataObj.id}`)
      },
      // 根据毫秒获取时间
      formatSeconds(a) {
        let sec = parseInt(a / 1000)
        var hh = parseInt(sec / 3600)
        var mm = parseInt((sec - hh * 3600) / 60)
        if (mm < 10) mm = '0' + mm
        var ss = parseInt((sec - hh * 3600) % 60)
        if (ss < 10) ss = '0' + ss
        if (hh < 10) hh = hh == 0 ? '' : `0${hh}:`
        var length = hh + mm + ':' + ss
        if (sec >= 0) {
          return length
        } else {
          return '00:00'
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  .course-item {
    background: #ffffff;
    box-sizing: border-box;
    break-inside: avoid;
    margin-bottom: 24rpx;

    &__img {
      position: relative;
      height: 252rpx;
      .video-img {
        width: 100%;
        height: 252rpx;
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
      font-weight: 500;
      margin: 16rpx 8rpx;
      height: 70rpx;
      overflow: hidden;
      position: relative;
      word-break: break-all;
      text-align: justify;
      text-overflow: ellipsis;
      // white-space: nowrap;
    }
  }
</style>
