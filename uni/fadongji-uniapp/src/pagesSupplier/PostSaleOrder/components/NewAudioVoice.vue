<template>
  <view class="audio-wrap" @click="audioPlayStart">
    <view class="audio-wrap__icon">
      <VoIcon name="voice" />
      <view class="timer">{{ info.duration }}S</view>
    </view>
  </view>
</template>
<script>
  export default {
    name: 'NewAudioVoice',
    props: {
      info: {
        type: Object,
      },
    },
    data() {
      return {
        status: 1, // 1暂停 2播放
        audio: null,
      }
    },
    created() {
      this.audio = uni.createInnerAudioContext()
      console.log(this.info)
      this.audio.src = this.info.fileNameUrl
    },
    mounted() {
      console.log(this.src)
      this.audio.onEnded((e) => {
        this.stop()
      })
      this.audio.onError((e) => {
        console.log(e, '报错了')
      })
    },
    beforeUnmount() {
      this.audio.offEnded()
      if (this.timer) {
        clearInterval(this.timer)
      }
    },
    methods: {
      audioPlayStart() {
        if (this.status == 1) {
          this.play()
        } else {
          this.stop()
        }
      },
      // 播放
      play() {
        this.status = 2
        this.audio.play()
      },
      // 暂停
      stop() {
        this.status = 1
        this.audio.stop()
      },
    },
  }
</script>
<style lang="scss" scoped>
  .audio-wrap {
    width: 500rpx;
    background: #ffffff;
    box-shadow: 0px 2px 8px rgba(34, 40, 75, 0.15);
    border-radius: 8rpx;
    padding: 12rpx 22rpx;
    margin-right: 30rpx;
    margin-top: 8rpx;
    margin-bottom: 12rpx;
    &__icon {
      display: flex;

      .timer {
        flex: 1;
        font-weight: bold;
        font-size: 20rpx;
        line-height: 1.5;
        color: --color-primary;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
    }
  }
  .hidden {
    display: none;
  }
</style>
