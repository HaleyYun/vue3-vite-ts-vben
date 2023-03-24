<template>
  <view class="detail">
    <VoNav is-fixed is-have-more title="投诉详情">

    </VoNav>
    <view class="flex1 overflow-y">
      <view class="detail-box">
        <view class="detail-box__tip">
          <text v-if="info.dealStatus === 0">您的投诉申请提交成功，请等待平台处理。</text>
          <block v-if="info.dealStatus === 2 && (info.isEvaluate === 0 || info.isEvaluate === 1)">
            <view>投诉成立</view>
            <text>处理结果：{{ info.dealReason }}</text>
          </block>

          <!-- 已关闭 -->
          <block v-if="info.dealStatus === 1">
            <view>投诉关闭</view>
            <text>关闭原因：申请人手动撤销投诉申请</text>
          </block>
        </view>
        <view v-if="info.dealStatus === 0">提交时间：{{ info.createTime }}</view>
        <view v-if="info.dealStatus === 2">处理时间：{{ info.dealTime }}</view>
        <!-- 已关闭 -->
        <view v-if="info.dealStatus === 1">关闭时间：{{ info.updateTime }}</view>
      </view>
      <!--服务评价  -->
      <view v-if="info.dealStatus === 2 && info.isEvaluate === 1" class="detail-item">
        <view class="item-nav">
          <view class="time">服务评价</view>
        </view>
        <view class="flex flex-vertical-c m-t-16">
          <view class="lh42 fz-28 color-block fz-b">星级：</view>
          <u-rate
            :value="EvaInfo.starMark / 2"
            activeIcon="/static/created/evaluate/score_activate.png"
            gutter="12"
            inactiveIcon="/static/created/evaluate/score_not_active.png"
            readonly
          />
          <view v-if="EvaInfo.starMark / 2 === 5" class="fz-24 lh36 m-l-4 nowrap">非常满意</view>
          <view v-else-if="EvaInfo.starMark / 2 === 4" class="fz-24 lh36 m-l-4 nowrap">满意</view>
          <view v-else-if="EvaInfo.starMark / 2 === 3" class="fz-24 lh36 m-l-4 nowrap">良好</view>
          <view v-else-if="EvaInfo.starMark / 2 === 2" class="fz-24 lh36 m-l-4 nowrap">差</view>
          <view v-else-if="EvaInfo.starMark / 2 === 1" class="fz-24 lh36 m-l-4 nowrap">极差</view>
        </view>
        <view class="flex flex-vertical-c m-t-16">
          <view class="lh42 fz-28 color-block fz-b">内容：</view>
          <view class="color-block-65 fz-28">{{ EvaInfo.content }}</view>
        </view>
        <view class="flex flex-vertical-c m-t-16">
          <view class="lh42 fz-28 color-block fz-b">评价时间：</view>
          <view class="color-block-65 fz-28">{{ EvaInfo.createTime }}</view>
        </view>
      </view>
      <view class="detail-item">
        <view class="item-nav">
          <view class="time">投诉信息</view>
          <view v-if="info.dealStatus === 0" class="status">
            <view class="status-left flex flex-justify-r"
              >预计
              <u-count-down :time="restTime" format="HH:mm:ss" @change="onChange">
                <view class="time">
                  <text class="time__item">
                    {{ timeData.hours > 10 ? timeData.hours : '0' + timeData.hours }}：
                  </text>
                  <text class="time__item">{{ timeData.minutes }}：</text>
                  <text class="time__item">{{ timeData.seconds }}</text>
                </view>
              </u-count-down>
              后处理结束</view
            >
          </view>
        </view>
        <view class="item-row">
          <text class="label fz-b">投诉类型：</text>
          <text class="value" v-if="info.categoryId">{{ reasonData[info.categoryId] }}</text>
        </view>
        <view class="item-row">
          <text class="label fz-b">投诉描述：</text>
          <view v-if="info.audio" class="audio-wrap" @click.stop="audioPlayStart()">
            <view class="audio-wrap__icon">
              <VoIcon name="voice" />
              <view class="timer">{{ 10 + 'S' }}</view>
            </view>
            <video id="myVideo" ref="video" :src="$getDomain(info.audio[0]) + '&type=4'" class="hidden"></video>
          </view>
          <block v-else>
            <text v-if="info.content" class="value">
              {{ isExpand ? info.content : info.content.slice(0, 45) }}
            </text>
            <text v-if="info.content && info.content.length > 45 && !isExpand" class="value">
              ...
            </text>
            <text
              v-if="info.content && info.content.length > 45 && !isExpand"
              class="all"
              @click="toExpand"
            >
              全文
            </text>
          </block>
        </view>
        <view v-if="info.image && !info.video && !info.poster" class="media-container">
          <view v-for="(img, imgIndex) in info.image" :key="img" class="image-box">
            <image
              :src="$getDomain(img)"
              class="media-container__img"
              @click.stop="priviewImg(imgIndex)"
            />
          </view>
        </view>
        <view v-if="info.video && info.video.length">
          <view v-if="!isShowVideo" class="detail-video" @click="playClick">
            <image :src="info.image[0]" class="detail-video__image" />
            <image class="detail-video__paly" src="/static/created/circle/circle_video_play.png" />
          </view>
          <video
            v-if="isShowVideo"
            id="myVideo"
            :autoplay="true"
            :src="info.video[0] + '&type=4'"
            class="detail-video"
            @ended="eventHandle"
          ></video>
        </view>
        <view class="item-row">
          <text class="label fz-b">投诉时间：</text>
          <text class="value">{{ info.createTime }}</text>
        </view>
      </view>
    </view>

    <view v-if="info.dealStatus === 0" class="item-tip">
      <view class="btn" @click="modalVisible = true">撤销投诉</view>
    </view>
    <view v-else-if="info.dealStatus === 2 && info.isEvaluate === 0" class="item-tip">
      <view class="btn" @click="toEva">评价服务</view>
    </view>
    <u-gap :height="$systemInfo.safeAreaInsets.bottom" />

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
  import helpUtil from '@/common/helper'

  export default {
    name: 'CourseBox',
    props: {},
    data() {
      return {
        status: 1, // 1暂停 2播放
        videoContext: '',
        modalVisible: false,
        info: '',
        EvaInfo: '',
        isLoading: false,
        isExpand: false,
        timeData: {},
        isShowVideo: false,
        restTime: '',
        categoryType: { 0: '订单', 1: '用户', 9: '其他' },
        reasonData: {},
        optionsId: '',
      }
    },
    onLoad(options) {
      this.optionsId = options.id || ''
      this.getReasonList()
    },
    methods: {
      getReasonList() {
        this.$VoHttp
          .apiContentComplaintType()
          .then((res) => {
            if (res.data && res.data.length) {
              let data = res.data
              data.forEach((item) => {
                this.reasonData[item.code] = item.name
              })
              this.getDetail(this.optionsId)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      },
      //计时器change
      onChange(e) {
        this.timeData = e
      },
      getDetail(id) {
        this.$VoHttp.apiContentComplaintDetail$Id({ id: id }).then((res) => {
          console.log(res)
          let data = res.data
          if (data.fileUrl) {
            data.fileUrl = JSON.parse(data.fileUrl).json
          }
          helpUtil.regroupFileData(data)
          this.info = data
          let nowDate = this.$vocenApi.VoUtils.timeFormat(new Date(), 'yyyy-mm-dd hh:MM:ss')
          let cDate = new Date(data.createTime).getTime()
          let end = new Date(cDate + 24 * 60 * 60 * 1000)
          //24小时后的时间
          let endDate = this.$vocenApi.VoUtils.timeFormat(end.getTime(), 'yyyy-mm-dd hh:MM:ss')
          this.restTime = this.getHour(nowDate, endDate)
          if (data.dealStatus === 2 && data.isEvaluate === 1) {
            this.getEvaDetail(id)
          }
        })
      },
      //获取时间差
      getHour(s1, s2) {
        var reDate = /\d{4}-\d{1,2}-\d{1,2} /
        s1 = new Date((reDate.test(s1) ? s1 : '2018-1-1 ' + s1).replace(/-/g, '/'))
        s2 = new Date((reDate.test(s2) ? s2 : '2018-1-1 ' + s2).replace(/-/g, '/'))
        var ms = s2.getTime() - s1.getTime()
        if (ms < 0) return 0
        return Math.floor(ms)
      },
      //获取评价内容
      getEvaDetail(id) {
        this.$VoHttp
          .apiContentEvaluateQueryEvaluateById({ sourceId: id, sourceType: 1 })
          .then((res) => {
            let data = res.data
            data.content = JSON.parse(data.content).content
            this.EvaInfo = data
          })
      },
      //展开
      toExpand() {
        this.isExpand = true
      },
      /*
       * 预览图片
       */
      priviewImg(index) {
        uni.previewImage({
          urls: this.info.image,
          current: index,
        })
      },
      // 语音播放,暂停
      audioPlayStart() {
        this.playInnerAudioContext(this.info.audio)
        // if (this.status === 1) {
        //   this.play()
        // } else {
        //   this.stop()
        // }
      },
      //视频播放
      playClick() {
        this.isShowVideo = true
      },
      // video播放结束
      eventHandle() {
        this.isShowVideo = false
        this.videoContext.pause()
        this.videoContext.seek(0)
      },
      // 暂停video
      pause() {
        this.videoContext.pause()
        this.isShowVideo = false
      },
      //确定撤销
      confirmExit() {
        if (this.isLoading) {
          return
        }
        this.isLoading = true
        this.$VoHttp
          .apiContentComplaintRevocationComplaint$Id({ id: this.info.id })
          .then((res) => {
            if (res.code === '20001') {
              this.modalVisible = false
              uni.$u.toast('撤销成功')
              setTimeout(() => {
                this.$backFn()
              }, 1000)
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
      //去评价
      toEva() {
        this.$linkToEasy(`/pagesCommon/ComplaintPage/ComplaintEvaluate?id=${this.info.id}`)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .detail {
    height: 100vh;
    display: flex;
    flex-direction: column;
    &-box {
      margin-bottom: 16rpx;
      margin-top: 16rpx;
      padding: 32rpx;
      box-sizing: border-box;
      font-size: 14px;
      line-height: 1.5;
      color: $v-c0-85;
      background-color: #fff;
      &__tip {
        color: #e50012;
        margin-bottom: 16rpx;
      }
    }
    .detail-item {
      padding: 0 32rpx 32rpx 32rpx;
      box-sizing: border-box;
      margin-bottom: 16rpx;
      background: #fff;
      .item-nav {
        display: flex;
        font-size: 32rpx;
        font-weight: bold;
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
          &-left {
            color: $v-c0-65;
            font-size: 14px;
            line-height: 1.5;
            .time {
              color: #e50012;
              padding: 0 8rpx;
            }
          }
        }
      }
      .item-row {
        padding-top: 16rpx;
        box-sizing: border-box;
        font-size: 28rpx;
        line-height: 1.5;
        .label {
          color: $v-c0-85;
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

      .hidden {
        display: none;
      }
    }
    .modal-content {
      color: $v-c0-85;
      font-size: 32rpx;
      line-height: 1.5;
    }
    .item-tip {
      display: flex;
      margin-top: 16rpx;
      align-items: center;
      justify-content: flex-end;
      padding: 38rpx 32rpx 38rpx 32rpx;
      background: #fff;
      box-sizing: border-box;
      .btn {
        width: 160rpx;
        height: 56rpx;
        background: $color-primary-yellow;
        border-radius: 30rpx;
        color: #ffffff;
        text-align: center;
        font-size: 24rpx;
        line-height: 56rpx;
      }
    }
    &-video {
      position: relative;
      margin-top: 16rpx;
      height: 384rpx;
      max-height: 384rpx;
      width: 686rpx;
      display: inline-block;
      border-radius: 16rpx;

      &__image {
        height: 384rpx;
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
