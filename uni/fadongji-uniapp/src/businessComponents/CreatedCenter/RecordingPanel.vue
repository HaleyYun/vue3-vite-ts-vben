<template>
  <view class="recording">
    <view class="recording-close" @click="close">
      <VoIcon :opacity="0.45" :size="16" color="#000" name="close" />
    </view>

    <view class="recording-time"
      ><text v-show="finish !== 0">{{ recordTime }}s</text></view
    >
    <view class="recording-auto flex flex-justify-c flex-vertical-c">
      <view class="recording-button retake-color" v-show="finish === 2" @click="reset">重录</view>
      <view
        v-show="finish !== 2"
        class="recording-voice background-gray flex flex-justify-c flex-vertical-c"
        :class="{ 'background-gray': finish === 0, 'background-white': finish === 1 }"
        @click="handle"
        @longpress="onStartRecoder"
        @touchend="onEndRecoder"
      >
        <view class="u-progress-content" v-if="finish === 1" style="z-index: 100">
          <view class="recording-voice__img bg-one" />
        </view>
        <CircularProgress
          :percent="recordTime > 0 ? (recordTime / 120) * 100 : 0"
          :duration="120000"
          v-if="finish === 1"
          style="position: absolute; top: 0; left: 0"
        />

        <view class="u-progress-content" v-show="finish === 0">
          <view class="recording-voice__img bg-zero" />
        </view>
      </view>
      <view
        v-show="finish === 2"
        class="recording-voice background-gray flex flex-justify-c flex-vertical-c"
        @click="playVoice"
      >
        <image
          v-if="!playStatus"
          class="recording-voice__img"
          src="/static/created/circle/play.png"
        />
        <image v-else class="recording-voice__img" src="/static/created/circle/recording.png" />
      </view>
      <view class="recording-button complete-color" v-show="finish === 2" @click="confirm"
        >完成</view
      >
    </view>
    <view class="recording-word" v-if="finish === 0">长按录制声音</view>
    <view class="recording-word" v-if="finish === 1">录音中</view>
    <view class="recording-word" v-if="finish === 2">点击播放</view>
  </view>
</template>

<script>
  import CircularProgress from '@/businessComponents/CreatedCenter/CircularProgress'
  import permission from '@/common/permission'
  const recorderManager = uni.getRecorderManager()
  export default {
    name: 'RecordingPanel',
    // eslint-disable-next-line vue/no-unused-components
    components: { CircularProgress },
    props: {
      width: {
        type: Number,
        default: 176,
      },
      height: {
        type: Number,
        default: 176,
      },
      showTop: {
        type: Boolean,
        default: true,
      },
      //最大时长（秒）
      maximum: {
        type: [Number, String],
        default: 120,
      },
      duration: {
        type: Number,
        default: 0,
      },
      theme: {
        type: String,
        default: '#6794E3',
      },
      //用于im录制完直接发送语音
      isImMessage: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        // 0是默认  1录制中  2录制完毕
        recordTime: 0,
        finish: 0,
        reDate: '00:00',
        sec: 0,
        min: 0,
        voicePath: '',
        playProgress: 100,
        playTimer: null,
        timer: null,
        playStatus: false,
        innerAudioContext: null,
      }
    },
    computed: {
      // 录制时间计算
      calcProgress() {
        return ((this.sec + this.min * 60) / this.maximum) * 100
      },
    },
    created() {
      this.innerAudioContext = uni.createInnerAudioContext()
      // 监听
      this.onMonitorEvents()
    },
    methods: {
      //关闭事件
      close() {
        this.$emit('close')
      },
      // 完成事件
      confirm() {
        if (!this.innerAudioContext.paused) {
          this.innerAudioContext.stop()
        }
        console.log(this.voicePath, this.recordTime)
        // return
        this.$emit('confirm', this.voicePath, this.recordTime)
        // this.$emit('confirm', this.voicePath, this.sec)
        this.reset()
        // console.log( 'duration', this.sec)
      },
      // 点击事件
      handle() {
        this.$emit('click')
      },
      // 重新录制
      reset() {
        this.voicePath = ''
        this.min = 0
        this.sec = 0
        this.reDate = '00:00'
        this.recordTime = 0
        this.playProgress = 100
        this.finish = 0
        this.$emit('reset')
      },
      // 播放暂停录音
      playVoice() {
        this.innerAudioContext.src = this.voicePath
        if (this.innerAudioContext.paused) {
          this.innerAudioContext.play()
          this.playStatus = true
        } else {
          this.innerAudioContext.stop()
        }
        this.$emit('playVoice', this.innerAudioContext.paused)
      },
      // 录制结束
      onEndRecoder() {
        console.log('录制结束end')
        recorderManager.stop()
      },
      // 开始录制
      async onStartRecoder() {
        // #ifdef APP-PLUS
        let a
        if (uni.getSystemInfoSync().platform == 'ios') {
          var avaudiosession = plus.ios.import('AVAudioSession')
          var avaudio = avaudiosession.sharedInstance()
          avaudio.requestRecordPermission((res) => {
            console.log('回调完成', res)
          })
          var permissionStatus = avaudio.recordPermission()
          a = await permission.judgeIosPermission('record')
          console.log(permissionStatus)
        } else {
          a = await permission.requestAndroidPermission('android.permission.RECORD_AUDIO')
          // 永久拒绝
          if (a === -1) {
            a = false
          }
        }
        // let a
        // if (uni.getSystemInfoSync().platform == 'ios') {
        //   a = await permission.judgeIosPermission('record')
        // } else {
        //   a = await permission.requestAndroidPermission('android.permission.RECORD_AUDIO')
        //   // 永久拒绝
        //   if (a === -1) {
        //     a = false
        //   }
        // }
        console.log(a)
        if (!a) {
          uni.showModal({
            title: '提示',
            content: '请去设置打开麦克风权限',
            success: function (res) {
              if (res.confirm) {
                permission.gotoAppPermissionSetting()
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            },
          })
          return
        } else {
          if (!this.$storage.get('canRecord')) {
            this.$storage.set('canRecord', 1)
            return
          }
        }
        this.finish = 1
        recorderManager.start({
          duration: this.maximum * 1000,
        })
        console.log('开始录制')
        // #endif
      },
      // 监听
      onMonitorEvents() {
        console.log("zxc");
        // 录制开始
        recorderManager.onStart(() => {
          this.finish = 1
          uni.showLoading({
            title: '录制中...',
          })
          this.startDate()
          this.$emit('start')
        })
        // 录制结束
        recorderManager.onStop(({ tempFilePath }) => {
          console.log('监听录制结束')
          if (!this.isImMessage) {
            this.finish = 2
          }
          this.voicePath = tempFilePath
          clearInterval(this.timer)
          uni.hideLoading()
          this.$emit('end')
          if (this.isImMessage) {
            this.confirm()
          }
        })
        // 播放进度
        this.innerAudioContext.onTimeUpdate(() => {
          let totalDate = this.innerAudioContext.duration
          let nowTime = this.innerAudioContext.currentTime
          let surplus = totalDate - nowTime
          this.playProgress = (surplus / totalDate) * 100

          let _min = Math.floor(surplus / 60)
          if (_min < 10) _min = '0' + _min
          let _sec = Math.floor(surplus % 60)
          if (_sec < 10) _sec = '0' + _sec
          this.reDate = _min + ':' + _sec

          this.recordTime = parseInt(_min) * 60 + parseInt(_sec)
        })
        // 播放暂停
        this.innerAudioContext.onPause(() => {
          this.resetDate()
          this.playProgress = 100
          this.playStatus = false
          console.log('播放暂停')
          this.$emit('stop')
        })
        // 播放停止
        this.innerAudioContext.onStop(() => {
          this.resetDate()
          this.playProgress = 100
          this.playStatus = false
          console.log('播放停止')
          this.$emit('stop')
        })
      },
      // 录音计时
      startDate() {
        clearInterval(this.timer)
        this.sec = 0
        this.min = 0
        this.timer = setInterval(() => {
          this.sec += 1
          if (this.sec >= 60) {
            this.min++
            this.sec = 0
          }
          this.resetDate()
        }, 1000)
      },
      // 播放时间
      resetDate() {
        let _s = this.sec < 10 ? '0' + parseInt(this.sec) : parseInt(this.sec)
        let _m = this.min < 10 ? '0' + this.min : this.min
        this.reDate = _m + ':' + _s
        if (this.maximum > parseInt(this.min) * 60 + parseInt(this.sec)) {
          this.recordTime = parseInt(this.min) * 60 + parseInt(this.sec)
        } else {
          this.recordTime = this.maximum
        }
        console.log(this.recordTime, parseInt(this.min) * 60, parseInt(this.sec))
      },
    },
    //监听页面隐藏
    onHide() {
      clearInterval(this.timer)
      this.timer = null
      this.innerAudioContext.destroy()
      this.innerAudioContext = null
    },
    //监听页面卸载
    onUnload() {
      clearInterval(this.timer)
      this.timer = null
      this.innerAudioContext.destroy()
      this.innerAudioContext = null
    },
  }
</script>

<style lang="scss" scoped>
  .recording {
    width: 750rpx;
    height: 380rpx;
    background: #ffffff;
    position: relative;
    &-close {
      position: absolute;
      right: 32rpx;
      top: 32rpx;
      z-index: 99;
    }
    &-time {
      height: 48rpx;
      line-height: 48rpx;
      font-size: 32rpx;
      margin: 24rpx 0 40rpx;
      text-align: center;
      font-weight: bold;
    }
    &-auto {
      //padding-top: 110rpx;
    }
    &-button {
      width: 144rpx;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      border-radius: 100rpx;
      font-size: 24rpx;
    }
    &-voice {
      width: 104px;
      height: 104px;
      line-height: 104px;
      border-radius: 50%;
      margin: 0 64rpx;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      &__img {
        display: block;
        width: 88px;
        height: 88px;
      }
    }
    &-word {
      width: 750rpx;
      text-align: center;
      height: 36rpx;
      line-height: 36rpx;
      font-size: 24rpx;
      color: $v-c0-65;
      margin-top: 24rpx;
    }
  }
  .background-gray {
    background: rgba(103, 148, 227, 0.15);
  }
  .background-white {
    background: #ffffff;
  }
  .retake-color {
    background: $v-btn-disabled;
    color: $v-c0-65;
  }
  .complete-color {
    background: linear-gradient(269.77deg, #155bd4 7.79%, #6794e3 101.85%);
    color: #ffffff;
  }
  .recording-voice {
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .u-progress-content {
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .bg-one {
    background-image: url('/static/created/circle/recording.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .bg-zero {
    background-image: url('/static/created/circle/recording_voice.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
</style>
