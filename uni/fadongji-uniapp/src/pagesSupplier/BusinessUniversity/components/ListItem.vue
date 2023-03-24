<template>
  <view class="course-item" @click="itemClick">
    <view class="course-item__img">
      <image
        v-if="dataObj.fileUrl"
        :src="dataObj.type == 1 ? dataObj.fileUrl : dataObj.fileUrl.split(',')[1]"
        class="video-img"
        mode="aspectFit"
      />
      <image v-else :src="'/static/defaultStuty.png'" class="video-img" mode="aspectFit" />
      <image v-if="dataObj.type == 2" class="play-icon" src="/static/icons/play.png" />
      <view class="img-bottom">
        <VoIcon :size="24" color="#ffffff" name="eye" />
        <text>{{ dataObj.viewCount }}</text>
      </view>
    </view>
    <view class="course-item__content">
      <view class="content-text">
        {{ dataObj.name }}
        <!--{{ courseName.slice(0, 18) }}-->
        <!--<text class="point">...</text>-->
      </view>
      <view class="content-desc">
        <view class="left">{{ updateTimeText }}</view>
        <view v-if="dataObj.type === 2" class="right">
          时长：{{ formatSeconds(dataObj.duration) }}
        </view>
      </view>
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
      },
    },
    data() {
      return {
        updateTimeText: '',
        courseName:
          '课程名称课程名称课程名称课程名称课程名称课课程名称课程名称课程名称课程名称课程名称课',
      }
    },
    created() {
      if (this.dataObj.updateTime) {
        this.updateTimeText = this.$vocenApi.VoUtils.timeTransfer(this.dataObj.updateTime)
      }
    },
    methods: {
      // 根据秒获取时间
      formatSeconds(a) {
        let sec = parseInt(a / 1000)
        let hh = parseInt(sec / 3600)
        let mm = parseInt((sec - hh * 3600) / 60)
        if (mm < 10) mm = '0' + mm
        let ss = parseInt((sec - hh * 3600) % 60)
        if (ss < 10) ss = '0' + ss
        if (hh < 10) hh = hh == 0 ? '' : `0${hh}:`
        let length = hh + mm + ':' + ss
        if (sec >= 0) {
          return length
        } else {
          return '00:00'
        }
      },
      itemClick() {
        this.$emit('click')
        if (this.disabled) {
          return
        }
        this.$linkToEasy(`/pagesSupplier/BusinessUniversity/CourseDetail?id=${this.dataObj.id}`)
        //this.$emit('click')
      },
    },
  }
</script>
<style lang="scss" scoped>
  .course-item {
    background: #ffffff;
    box-sizing: border-box;
    break-inside: avoid;
    display: flex;
    flex-direction: row;
    padding: 32rpx 0rpx;
    &__img {
      position: relative;
      height: 176rpx;
      .video-img {
        width: 232rpx;
        height: 176rpx;
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
      }
    }
    &__content {
      flex: 1;
      padding-left: 16rpx;
      padding-right: 32rpx;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      .content-text {
        color: $v-c0-85;
        font-size: 28rpx;
        line-height: 42rpx;
        font-weight: 500;

        height: 84rpx;
        overflow: hidden;
        position: relative;
        word-break: break-all;
        text-align: justify;
        // text-overflow: ellipsis;
        // white-space: nowrap;
      }
      .content-desc {
        flex: 1;
        display: flex;
        align-items: flex-end;
        color: $v-c0-65;
        font-size: 24rpx;
        line-height: 42rpx;
        .right {
          flex: 1;
          text-align: right;
        }
      }
    }
  }
</style>
