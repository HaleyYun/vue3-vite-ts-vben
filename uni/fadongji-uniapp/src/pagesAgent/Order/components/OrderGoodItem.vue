<template>
  <view>
    <view class="good flex">
      <block v-if="goodData.pic && goodData.pic.length">
        <image
          v-if="goodData.pic[0].indexOf('mp4') > -1 || goodData.pic[0].indexOf('MP4') > -1"
          :src="goodData.pic[0] + '&type=3'"
          class="good-img"
        />
        <image
          v-else
          :src="goodData.pic[0]"
          class="good-img"
          @click="lookPreviewImage(goodData.pic[0])"
        />
      </block>
      <view class="flex1">
        <view class="good-title">
          <text v-show="goodData.categoryType" class="good-tips m-r-8">{{
            goodData.categoryType
          }}</text>
          {{ goodData.goodsName }}
        </view>
        <view class="good-bottom flex flex-justify-between">
          <view class="good-bottom__left flex flex-vertical-c">
            <view class="tips">{{
              goodData.periodDays && goodData.periodDays > 0
                ? `${goodData.periodDays}天账期`
                : '现金价'
            }}</view>
            <view class="price flex flex-vertical-c">
              <VoPointPrice
                :price="goodData.originalPrice ? goodData.originalPrice.toString() : 0"
              />
              <view>元</view>
            </view>
          </view>
          <view class="good-bottom__num">x{{ goodData.goodsCount || 0 }}</view>
        </view>
      </view>
    </view>
    <!--    <view v-if="engineNo" class="flex m-t-16 m-b-24 p-l-32 p-r-32">-->
    <!--      <view class="title">识别码:</view>-->
    <!--      <view class="flex1 text-right p-l-22 border-box">-->
    <!--        <view class="code-title" v-for="(item, index) in engineNo" :key="index">{{ item }}</view>-->
    <!--      </view>-->
    <!--    </view>-->
  </view>
</template>

<script>
  export default {
    name: 'OrderGoodItem',
    props: {
      goodData: {
        type: Object,
        goodData: {},
      },
      engineNo: {
        type: Array,
        default() {
          return []
        },
      },
    },
    methods: {
      lookPreviewImage(data) {
        // 预览图片
        uni.previewImage({
          urls: [data],
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .good {
    padding: 8rpx 0;
    &-img {
      width: 160rpx;
      height: 160rpx;
      margin-right: 16rpx;
      border-radius: 8rpx;
    }
    &-title {
      font-weight: bold;
      font-size: 32rpx;
      color: $v-c0-85;
      line-height: 150%;
      word-break: break-all;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      /* 这里是超出几行省略 */
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    &-bottom {
      &__left {
        margin-top: 16rpx;
        height: 42rpx;
        .tips {
          padding: 0 4rpx;
          height: 28rpx;
          line-height: 28rpx;
          text-align: center;
          background: #fdf2f3;
          border: 2rpx solid #ec404d;
          border-radius: 4rpx;
          font-size: 24rpx;
          color: #ec404d;
        }
        .price {
          font-size: 28rpx;
          color: $color-primary-red;
          margin-left: 8rpx;
        }
      }
      &__num {
        margin-top: 8rpx;
        height: 42rpx;
        line-height: 42rpx;
        font-weight: bold;
        font-size: 28rpx;
        color: $v-c0-45;
      }
    }
  }
  .good-tips {
    height: 36rpx;
    line-height: 36rpx;
    font-size: 24rpx;
    color: $color-primary-yellow;
    padding: 0 12rpx;
    background: $v-tags-btn-disabled;
    border-radius: 24rpx;
  }
  .title {
    color: $v-c0-85;
    font-size: 28rpx;
  }
  .code {
    &-title {
      // background-color: #f6f7f8;
      border-radius: 4rpx;
      font-size: 28rpx;
      line-height: 46rpx;
      // text-align: center;
      color: rgba(0, 0, 0, 0.45);
      word-break: break-all;
    }
  }
</style>
