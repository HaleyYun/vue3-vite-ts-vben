<template>
  <view class="w-full h-full flex flex-column bg">
    <VoNav :is-fixed="false" title="实时语音测试" />
    <view class="flex1">
      <view class="remark-content flex-vertical-c flex flex-column">
        <view class="btn" @click="start">开始</view>
        <view class="btn" @click="end">结束</view>
        <!--   文本域-->
        <EraTextarea
          v-model="textModel"
          border="none"
          class="voice-content__area"
          count
          height="498rpx"
          maxlength="450"
          placeholder=""
          placeholderStyle="color:$v-c0-25;font-size:28rpx"
        />
      </view>
    </view>
  </view>
</template>

<script>
  // #ifdef APP-PLUS
  const vocenVoice = uni.requireNativePlugin('vocen-voice')
  // #endif
  export default {
    name: 'VoVoiceDemo',
    data() {
      return {
        isStart: false,
        textModel: '',
      }
    },
    methods: {
      start() {
        this.isStart = true
        console.log('实时录音')
        let that = this
        vocenVoice.voVoiceStart(function (res) {
          if (res && res.data) {
            console.log(res.data, 'voVoiceStart')
            that.textModel = res.data
          }
        })
      },
      end() {
        this.isStart = false
        // #ifdef APP-PLUS
        vocenVoice.voVoiceEnd()
        // #endif
      },
    },
  }
</script>

<style lang="scss" scoped>
  .voice {
    &-content {
      margin-top: 40rpx;
      margin-left: 32rpx;
      margin-right: 32rpx;
      background-color: white;

      &__area {
        width: 100%;
        background-color: white;
        padding: 20rpx 32rpx;
      }
    }
  }
  .btn {
    margin: 20rpx;
    width: 100rpx;
    background-color: black;
    text-align: center;
    color: #fff;
    border-radius: 24rpx;
  }
</style>
