<template>
  <view class="course-item" @click="itemClick">
    <view class="course-item__img">
      <block v-if="dataObj.type == 1">
        <image
          :src="
            dataObj.image && dataObj.image.length ? dataObj.image[0] : '/static/default_logo.png'
          "
          class="video-img"
        />
      </block>
      <block v-else>
        <image
          :src="
            dataObj.image && dataObj.image.length ? dataObj.image[0] : '/static/default_logo.png'
          "
          class="video-img"
        />
        <image class="play-icon" src="/static/icons/play.png" />
      </block>
      <view class="img-bottom">
        <VoIcon :size="24" color="#ffffff" name="eye" />
        <text>{{ dataObj.viewCount }}</text>
      </view>
    </view>
    <view class="course-item__content">
      <view class="content-text">
        <view class="content-name overTwoEllipsis">
          {{ dataObj.name }}
        </view>

        <!--{{ courseName.slice(0, 18) }}-->
        <!--<text class="point">...</text>-->
        <view v-if="dataObj.keyword && dataObj.keyword != '[]'" class="tag-con">
          <view
            v-for="(item, index) in dataObj.keyword.split(',')"
            :key="index"
            class="tag-item color-block"
          >
            {{ item }}
          </view>
        </view>
      </view>
      <view class="content-desc">
        <view class="left">{{ dataObj.updateTime }}</view>
        <view v-if="dataObj.type != 1" class="right"
          >时长：{{ formatSeconds(Number(dataObj.duration || '')) }}</view
        >
      </view>
    </view>
  </view>
</template>
<script>
  export default {
    name: 'ListItem',
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
      // this.updateTimeText = this.$vocenApi.VoUtils.timeTransfer(this.dataObj.updateTime || '')
      // console.log(this.dataObj);
    },
    methods: {
      itemClick() {
        this.$emit('click')
        if (this.disabled) {
          return
        }
        this.$linkToEasy(`/pagesGarage/TechnicalGuidance/CourseDetail?id=${this.dataObj.id}`)
        //this.$emit('click')
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
    display: flex;
    flex-direction: row;
    margin-bottom: 24rpx;
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
        .content-name {
          color: $v-c0-85;
          font-size: 28rpx;
          line-height: 42rpx;
          font-weight: 500;
          // height: 84rpx;
        }
        .tag-con {
          overflow: hidden;
          // -webkit-line-clamp: 1; //行数
          -webkit-box-orient: vertical; //盒子中内容竖直排列
          // height: 60rpx;
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
