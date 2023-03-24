<template>
  <view class="evaluateItem">
    <view class="flex">
      <image class="evaluateItem-icon" :src="evaluateData.photoUrl||'/static/default_avatar.png'" />
      <view class="evaluateItem-info flex1">
        <view class="flex flex-justify-between">
          <view class="evaluateItem-info__name"> {{ evaluateData.storeName }} </view>
          <view class="evaluateItem-info__time"> {{ evaluateData.createTime }} </view>
        </view>
        <view class="flex flex-vertical-c">
          <u-rate :readonly="true" :value="evaluateData.starMark / 2" activeColor="#E50012" />
          <view class="evaluateItem-info__line" />
          <view class="evaluateItem-info__numberTitle">数量:</view>
          <view class="evaluateItem-info__number"> {{ evaluateData.evaluateNumber || '' }} </view>
        </view>
      </view>
    </view>
    <block v-if="evaluateData.mainContent.content ||(evaluateData.mainContent.imgArr&&evaluateData.mainContent.imgArr.length>0)">
      <view class="evaluateItem-content">{{ evaluateData.mainContent.content  }}</view>
      <view class="evaluateItem-photo flex">
        <view
            class="evaluateItem-photo__box"
            @click="priviewImg(item)"
            v-for="(item, imgIndex) of evaluateData.mainContent.imgArr"
            :key="imgIndex"
        >
          <image class="img" :src="item.pic || item.src" />
          <!-- <video
            v-if="item.type === '2'"
            class="img"
            :poster="item.videoPoster"
            :src="item.url"
          ></video> -->
        </view>
      </view>
    </block>
    <view v-else class="evaluateItem-content">此用户没有填写评价</view>


  </view>
</template>

<script>
  export default {
    name: 'EvaluateItem',
    props: {
      evaluateData: {
        type: Object,
        evaluateData: {},
      },
    },
    methods: {
      /*
       * 预览图片
       */
      priviewImg(item) {
        if (item.type === '1') {
          uni.previewImage({
            urls: [item.url],
            current: 0,
          })
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .evaluateItem {
    margin: 20rpx 0rpx;
    &-icon {
      width: 72rpx;
      height: 72rpx;
      border-radius: 36rpx;
    }
    &-info {
      margin-left: 16rpx;
      &__name {
        color: $v-c0-85;
        font-size: 26rpx;
        font-weight: bold;
      }
      &__time {
        color: $v-c0-45;
        font-size: 24rpx;
      }
      &__numberTitle {
        color: $v-c0-45;
        margin-left: 16rpx;
        font-size: 24rpx;
      }
      &__number {
        color: $v-c0-45;
        font-size: 24rpx;
        margin-left: 8rpx;
      }
      &__line {
        width: 2rpx;
        height: 16rpx;
        background-color: $v-c0-25;
      }
    }
    &-content {
      margin-top: 26rpx;
      color: $v-c0-85;
      font-size: 28rpx;
    }
    &-photo {
      margin-top: 16rpx;
      &__box {
        width: 33.33%;
        height: 216rpx;
        padding-right: 16rpx;
        padding-top: 16rpx;
        box-sizing: border-box;

        &:nth-child(3n + 3) {
          padding-right: 0;
        }
        .img {
          width: 100%;
          height: 100%;
          background-color: #00feff;
          border-radius: 8rpx;
        }
      }
    }
  }
</style>
