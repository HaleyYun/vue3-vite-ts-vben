<template>
  <view class="audio-wrap" @click.stop="audioPlayStart()">
    <view class="audio-wrap__icon">
      <!--      <VoIcon name="voice" />-->
      <view class="voice-img">
        <image v-if="isPlay" src="/static/im/voiceRight.gif" />
        <image v-else src="/static/im/voiceRight.png" />
      </view>
      <view class="timer">{{ info.duration + 'S' }}</view>
    </view>
    <!--    <video id="myVideo" :src="$getDomain(info.audio[0])" class="hidden" ref="video"></video>-->
  </view>
</template>
<script>
  export default {
    name: 'VoAudioVoice',
    props: {
      info: {
        type: Object,
      },
    },
    data() {
      return {
        status: 1, // 1暂停 2播放
        videoContext: '',
        isPlay: false,
      }
    },
    created() {
      //给video创建一个动态的id
      // this.videoContext = uni.createVideoContext('myVideo')
      console.log('11111', this.info)
    },
    onShow() {
      this.status = 1
      this.isPlay = false
    },
    methods: {
      audioPlayStart() {
        this.playInnerAudioContext(this.$getDomain(this.info.audio[0]))
        this.isPlay = !this.isPlay
        setTimeout(() => {
          this.isPlay = false
        }, +this.info.duration * 1000)
        // if (this.status === 1) {
        //   this.play()
        // } else {
        //   this.stop()
        // }
      },
      // 播放
      play() {
        this.status = 2
        this.isPlay = true
        this.videoContext.play()
      },
      // 暂停
      stop() {
        // this.videoContext.pause()
        this.status = 1
        this.isPlay = false
      },
    },
  }
</script>
<style lang="scss" scoped>
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
  .voice-img {
    image {
      width: 46rpx;
      height: 46rpx;
    }
  }
</style>
