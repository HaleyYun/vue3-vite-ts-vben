<template>
  <view class="problem">
    <view class="problem-close" @click="closeFn">取消</view>
    <view class="problem-hair flex flex-vertical-c flex-justify-c" @click="goReleaseQuestion">
      <VoIcon :size="24" name="w-tag" />
      <view class="problem-hair__word">发问题</view>
    </view>
    <view class="problem-line flex flex-justify-between">
      <view class="problem-line__button flex flex-vertical-c flex-justify-c" @click="goReleaseIdea">
        <VoIcon :size="24" name="x-tag" />
        <view class="problem-hair__word">发想法</view>
      </view>
      <view
        class="problem-line__button flex flex-vertical-c flex-justify-c"
        @click="goReleaseVideo"
      >
        <VoIcon :size="24" name="s-video" />
        <view class="problem-hair__word">发视频</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {},
    data() {
      return {}
    },
    methods: {
      closeFn() {
        this.$emit('close')
      },
      /**
       * 去发想法
       */
      goReleaseIdea() {
        this.$emit('clickIdea')
      },
      /**
       * 去发问题
       */
      goReleaseQuestion() {
        this.$emit('clickQuestion')
      },
      /**
       * 去发视频
       */
      goReleaseVideo() {
        this.$emit('clickVideo')
      },
    },
  }
</script>

<style lang="scss" scope>
  .problem {
    width: 750rpx;
    padding: 0 32rpx;
    box-sizing: border-box;
    background: #f6f7f8;
    border-top-left-radius: 12rpx;
    border-top-right-radius: 12rpx;
    overflow: hidden;
    &-close {
      width: 100%;
      height: 48rpx;
      line-height: 48rpx;
      font-size: 32rpx;
      text-align: right;
      color: $v-c0-45;
      margin: 24rpx 0 48rpx;
    }
    &-hair {
      width: 686rpx;
      height: 92rpx;
      background: #fff;
      border-radius: 64rpx;
      text-align: center;
      box-shadow: 0px 4px 8px rgba(244, 241, 240, 0.7);
      &__word {
        margin-left: 8rpx;
        font-size: 32rpx;
        color: $v-c0-85;
        height: 48rpx;
        line-height: 48rpx;
      }
    }
    &-line {
      margin-top: 48rpx;
      padding-bottom: 68rpx;
      &__button {
        width: 326rpx;
        height: 92rpx;
        background: #fff;
        box-shadow: 0px 4px 8px rgba(244, 241, 240, 0.7);
        color: $v-c0-85;
        border-radius: 64rpx;
        text-align: center;
      }
    }
  }
</style>
