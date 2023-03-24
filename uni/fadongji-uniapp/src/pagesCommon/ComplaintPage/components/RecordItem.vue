<template>
  <view class="scroll-list__item" @click="itemClick">
    <view class="item-nav">
      <view class="time">{{ dataObj.createTime }}</view>
      <view class="status">{{
        dataObj.dealStatus === 0
          ? '处理中'
          : dataObj.dealStatus === 1
          ? '已关闭'
          : dataObj.dealStatus === 2 && dataObj.isEvaluate === 0
          ? '待评价'
          : dataObj.dealStatus === 2 && dataObj.isEvaluate === 1
          ? '已完成'
          : ''
      }}</view>
    </view>
    <view class="item-row">
      <text class="label">投诉类型：</text>
      <text class="value">{{ reasonData[dataObj.categoryId] }}</text>
    </view>
    <view class="item-row">
      <text class="label">投诉描述：</text>
      <view v-if="dataObj.audio" class="audio-wrap" @click.stop="audioPlayStart()">
        <view class="audio-wrap__icon">
          <VoIcon name="voice" />
          <view class="timer">{{ dataObj.duration || 0 }}S</view>
        </view>
        <video id="myVideo" ref="video" :src="$getDomain(dataObj.audio[0]) + '&type=4'" class="hidden"></video>
      </view>
      <block v-else>
        <text class="value">{{ dataObj.content.slice(0, 45) }}</text>
        <text v-if="dataObj.content && dataObj.content.length > 45" class="value">...</text>
        <text v-if="dataObj.content && dataObj.content.length > 45" class="all">全文</text>
      </block>
    </view>
    <view v-if="dataObj.image && !dataObj.video && !dataObj.poster" class="media-container">
      <view v-for="(img, imgIndex) in dataObj.image" :key="img" class="image-box">
        <image
          :src="$getDomain(img)"
          class="media-container__img"
          @click.stop="priviewImg(imgIndex)"
        />
      </view>
    </view>
    <view v-if="dataObj.video && dataObj.video.length">
      <view class="detail-video">
        <image :src="dataObj.image[0]" class="detail-video__image" />
        <image class="detail-video__paly" src="/static/created/circle/circle_video_play.png" />
      </view>
    </view>
    <view v-if="dataObj.dealStatus === 0" class="item-tip">
      <view class="item-tip__left flex">
        预计
        <u-count-down :time="restTime" format="HH:mm:ss" @change="onChange">
          <view class="time">
            <text class="time__item">
              {{ timeData.hours > 10 ? timeData.hours : '0' + timeData.hours }}：
            </text>
            <text class="time__item">{{ timeData.minutes || '00' }}：</text>
            <text class="time__item">{{ timeData.seconds || '00' }}</text>
          </view>
        </u-count-down>
        <!-- <text class="time">23：59：00 </text> -->
        后处理结束
      </view>
      <view class="item-tip__right">
        <view class="btn" @click.stop="modalVisible = true">撤销投诉</view>
      </view>
    </view>
    <view v-if="dataObj.dealStatus === 2 && dataObj.isEvaluate === 0" class="item-tip">
      <view class="item-tip__right">
        <view class="btn" @click.stop="toEva()">立即评价</view>
      </view>
    </view>
    <VoModal
      v-show="modalVisible"
      :show="modalVisible"
      showCancelButton
      @cancel="cancelExit"
      @confirm="confirmExit"
    >
      <view class="modal-content"> 确认要撤销吗？ </view>
    </VoModal>
  </view>
</template>
<script>
  export default {
    name: 'CourseBox',
    props: {
      dataObj: {
        type: Object,
      },
      //投诉类型
      reasonData: {
        type: Object,
      },
    },
    data() {
      return {
        modalVisible: false,
        timeData: {},
        restTime: 0, //'24 * 60 * 60 * 1000
        categoryType: { 0: '订单', 1: '用户', 9: '其他' },
      }
    },
    created() {
      let nowDate = this.$vocenApi.VoUtils.timeFormat(new Date(), 'yyyy-mm-dd hh:MM:ss')
      let cDate = new Date(this.dataObj.createTime.replace(/-/g, '/')).getTime()
      let end = new Date(cDate + 24 * 60 * 60 * 1000)
      //24小时后的时间
      let endDate = this.$vocenApi.VoUtils.timeFormat(end.getTime(), 'yyyy-mm-dd hh:MM:ss')
      this.restTime = this.getHour(nowDate, endDate)
    },
    methods: {
      //获取时间差
      getHour(s1, s2) {
        var reDate = /\d{4}-\d{1,2}-\d{1,2} /
        s1 = new Date((reDate.test(s1) ? s1 : '2018-1-1 ' + s1).replace(/-/g, '/'))
        s2 = new Date((reDate.test(s2) ? s2 : '2018-1-1 ' + s2).replace(/-/g, '/'))
        var ms = s2.getTime() - s1.getTime()
        if (ms < 0) return 0
        return Math.floor(ms)
      },
      //计时器change
      onChange(e) {
        // console.log(e)
        //         days: 0
        // hours: 23
        // milliseconds: 974
        // minutes: 59
        // seconds: 47
        this.timeData = e
      },
      itemClick() {
        this.$emit('click')
        this.$linkToEasy(`/pagesCommon/ComplaintPage/RecordDetail?id=${this.dataObj.id}`)
      },
      //去评价
      toEva() {
        this.$linkToEasy(`/pagesCommon/ComplaintPage/ComplaintEvaluate?id=${this.dataObj.id}`)
      },
      /*
       * 预览图片
       */
      priviewImg(index) {
        uni.previewImage({
          urls: this.dataObj.image,
          current: index,
        })
      },
      // 语音播放,暂停
      audioPlayStart() {
        this.playInnerAudioContext(this.dataObj.fileUrl)
        // this.$emit('play', this.dataObj)
        // if (this.status === 1) {
        //   this.play()
        // } else {
        //   this.stop()
        // }
      },

      //确定撤销
      confirmExit() {
        this.$VoHttp
          .apiContentComplaintRevocationComplaint$Id({ id: this.dataObj.id })
          .then((res) => {
            if (res.code === '20001') {
              this.modalVisible = false
              uni.$u.toast('撤销成功')
              this.$emit('undoSucess')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('撤销失败')
            this.modalVisible = false
          })
      },
      //取消撤销
      cancelExit() {
        this.modalVisible = false
      },
    },
  }
</script>
<style lang="scss" scoped>
  .scroll-list__item {
    padding: 0 32rpx 32rpx 32rpx;
    box-sizing: border-box;
    margin-bottom: 16rpx;
    background: #fff;
    .item-nav {
      display: flex;
      font-size: 28rpx;
      line-height: 1.5;
      border-bottom: 1px solid #f7f7f8;
      padding-top: 24rpx;
      padding-bottom: 16rpx;
      .time {
        color: $v-c0-85;
      }
      .status {
        flex: 1;
        text-align: right;
        color: rgba(0, 0, 0, 0.45);
      }
    }
    .item-row {
      padding-top: 16rpx;
      box-sizing: border-box;
      font-size: 28rpx;
      line-height: 1.5;
      .label {
        color: $v-c0-85;
        font-weight: bold;
      }
      .value {
        color: $v-c0-65;
      }
      .all {
        color: #155bd4;
      }
    }
    .item-collect {
      flex: 1;
    }
    .audio-wrap {
      flex: 1;
      background: #ffffff;
      box-shadow: 0px 2px 8px rgba(34, 40, 75, 0.15);
      border-radius: 8rpx;
      padding: 12rpx 22rpx;
      margin-right: 134rpx;
      margin-top: 8rpx;
      margin-bottom: 12rpx;
      &__icon {
        display: flex;

        .timer {
          flex: 1;
          font-weight: 500;
          font-size: 20rpx;
          line-height: 1.5;
          color: --color-primary;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
      }
    }
    .media-container {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      box-sizing: border-box;
      .image-box {
        width: 33.33%;
        height: 210rpx;
        padding-right: 8rpx;
        padding-top: 8rpx;
        box-sizing: border-box;

        &:nth-child(3n + 3) {
          padding-right: 0;
        }
      }
      .media-container__img {
        width: 100%;
        height: 100%;
        border-radius: 8rpx;
      }
    }
    .item-tip {
      display: flex;
      margin-top: 40rpx;
      align-items: center;
      &__left {
        color: $v-c0-65;
        font-size: 14px;
        line-height: 1.5;
        .time {
          color: #e50012;
          padding: 0 8rpx;
        }
      }
      &__right {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        .btn {
          width: 160rpx;
          height: 56rpx;
          background: #fff;
          border-radius: 30rpx;
          border: 2rpx solid rgba(0, 0, 0, 0.25);
          color: $v-c0-85;
          text-align: center;
          font-size: 24rpx;
          line-height: 56rpx;
        }
      }
    }
    .modal-content {
      color: $v-c0-85;
      font-size: 32rpx;
      line-height: 1.5;
    }
    .hidden {
      display: none;
    }
    .detail-video {
      position: relative;
      margin-top: 16rpx;
      height: 384rpx;
      max-height: 384rpx;
      width: 686rpx;
      display: inline-block;
      border-radius: 8rpx;

      &__image {
        height: 364rpx;
        width: 686rpx;
        border-radius: 16rpx;
      }

      &__paly {
        position: absolute;
        height: 110rpx;
        width: 110rpx;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
      }
    }
  }
</style>
