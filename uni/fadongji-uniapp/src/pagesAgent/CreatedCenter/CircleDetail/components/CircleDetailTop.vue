<template>
  <!-- 问答详情 -->
  <view class="detail-top">
    <view class="flex">
      <VoIcon :size="24" class="detail-top__image" color="#155BD4" name="w-tag" />
      <view v-if="dataObj.title && !dataObj.audio" class="detail-top__title flex1">
        {{ dataObj.title || '' }}
      </view>
      <VoAudioVoice v-if="dataObj.audio && dataObj.audio.length" ref="VoAudioVoice" :info="dataObj" />
<!--      <view-->
<!--        v-if="dataObj.audio && dataObj.audio.length"-->
<!--        class="audio-wrap"-->
<!--        @click.stop="audioPlayStart()"-->
<!--      >-->
<!--        <view class="audio-wrap__icon">-->
<!--          <VoIcon name="voice" />-->
<!--          <view class="timer">{{ dataObj.duration + 'S' }}</view>-->
<!--        </view>-->
<!--        <video-->
<!--          id="myVideo"-->
<!--          ref="video"-->
<!--          :src="$getDomain(dataObj.audio[0]) + '&type=4'"-->
<!--          class="hidden"-->
<!--          @loadedmetadata="loadedmetadataVoice"-->
<!--        ></video>-->
<!--      </view>-->
    </view>

    <view class="detail-top__row flex flex-vertical-c flex-justify-between">
      <view
        class="question"
        @click="$linkToEasy('/pagesAgent/CreatedCenter/AnswerAll/NonAuthorAnswer?id=' + dataObj.id)"
      >
        <block v-if="dataObj.answerNum">
          <block v-if="dataObj.answerNum >= 100000"> 10w+ </block>
          <block v-else-if="dataObj.answerNum >= 10000">
            {{ (dataObj.answerNum / 10000).toFixed(1) }}w
          </block>
          <block v-else-if="dataObj.answerNum >= 1000">
            {{ (dataObj.answerNum / 1000).toFixed(1) }}k
          </block>
          <block v-else>{{ dataObj.answerNum }}</block>
        </block>
        <block v-else>0</block>
        个回答 >>
      </view>

      <view class="flex">
        <view
          v-show="!isEditHidden && dataObj.answerNum"
          class="flex flex-vertical-c flex-justify-c edit"
          @click="editAnswer"
        >
          <VoIcon :size="24" class="icon" color="#155BD4" name="edit-line" />
          <view class="title">修改回答</view>
        </view>

        <view class="flex flex-vertical-c flex-justify-c" @click="goAnswer">
          <VoIcon :size="20" class="icon" color="#0D66FF" name="edit" />
          <view class="title">写回答</view>
        </view>
      </view>
    </view>
    <view id="navTop" />
    <view class="detail-top__line" />
  </view>
</template>

<script>
  export default {
    name: 'CircleDetailTop',

    props: {
      /**
       * isEditHidden 是否隐藏编辑问题 默认true 隐藏
       */
      isEditHidden: {
        type: Boolean,
        default: true,
      },
      dataObj: {
        type: Object,
      },
    },

    data() {
      return {
        answerNum: '752',
        answerTitle: '最近问题有点多，库存周转不开,干着急最近问题有点多，库存周转不开。',
        lock: false, // 锁
        status: 1, // 1暂停 2播放
        videoContext: '',
        duration: 0, //语音秒数
      }
    },
    methods: {
      close() {
        this.$refs.VoAudioVoice.stop()
      },
      goAnswer() {
        this.$emit('goAnswer')
      },
      editAnswer() {
        this.$emit('editAnswer')
      },
      audioPlayStart() {
        if (this.status === 1) {
          this.play()
        } else {
          this.stop()
        }
      },
      // 播放
      play() {
        this.status = 2
        this.videoContext.play()
      },
      // 暂停
      stop() {
        this.videoContext.pause()
        this.status = 1
      },
      // video加载完成
      loadedmetadataVoice(data) {
        //获取语音秒数，取整
        this.duration = Math.trunc(data.detail.duration)
        console.log('voiceduration', data.detail.duration)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .detail-top {
    border-top: 1px solid #f0f0f0;
    padding: 24rpx 32rpx 0rpx 32rpx;

    &__image {
      margin-top: 6rpx;
      padding-right: 2rpx;
    }

    &__title {
      color: rgba(0, 0, 0, 0.85);
      font-size: 36rpx;
      word-break: break-all;
    }
    &__line {
      margin: 22rpx 0rpx 24rpx 0rpx;
      height: 1px;
      background-color: #f0f0f0;
    }
    &__row {
      margin-top: 46rpx;

      .question {
        font-size: 24rpx;
        color: rgba(0, 0, 0, 0.45);
      }
      .edit {
        padding-right: 48rpx;
      }
      .icon {
        padding-right: 16rpx;
      }
      .title {
        color: #0d66ff;
        font-size: 28rpx;
        text-align: center;
        font-weight: bold;
      }
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
  }
</style>
