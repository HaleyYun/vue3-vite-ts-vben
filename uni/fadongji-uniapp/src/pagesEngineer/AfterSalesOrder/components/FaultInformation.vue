<template>
  <view class="fault">
    <view class="fault-title p-b-24 fz-32 fz-b">故障信息</view>
    <!--  当描述是文字  -->
    <view v-if="describeType === 'text'" class="fault-describe">
      故障描述：{{ faultInfo.describe }}
    </view>
    <!--  当描述是音频  -->
    <view v-else-if="describeType === 'voice'">
      <view class="fault-describe">故障描述：</view>
      <view class="m-t-16">
        <VoAudioVoice v-if="describeType.audio" :info="describeType" />
      </view>
    </view>
    <view class="fault-image">故障图片：</view>
    <view class="fault-image__box">
      <image
        v-for="(info, index) in faultInfo.faultImage"
        :key="index + '1'"
        :src="info"
        class="box-img"
        @click="choseImg(index, faultInfo.faultImage)"
      ></image>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'FaultInformation',
    props: {
      describeType: {
        type: String,
        default: 'text', // 故障类型：'text'文字，'voice'语音
      },
      faultInfo: {
        type: Object,
        default: {},
      },
    },
    methods: {
      /**
       * 预览图片
       */
      choseImg(index, list) {
        uni.previewImage({
          current: index,
          urls: list,
          indicator: 'none',
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .fault {
    padding: 24rpx 32rpx;
    &-title {
      border-bottom: 2rpx solid $v-bg-light;
    }
    &-describe {
      margin: 24rpx 0 16rpx 0;
      font-size: 28rpx;
      color: $v-c0-85;
      line-height: 42rpx;
    }
    &-image {
      margin-top: 16rpx;
      font-size: 28rpx;
      color: $v-c0-85;
      line-height: 42rpx;
      &__box {
        display: flex;
        flex-wrap: wrap;
        .box-img {
          width: 218rpx;
          height: 218rpx;
          display: block;
          margin: 16rpx 16rpx 0 0;
          &:nth-child(3n + 3) {
            margin-right: 0;
          }
        }
      }
    }
  }
</style>
