<template>
  <u-popup :safeAreaInsetBottom="true" v-if="show" :show="show" mode="bottom" @close="cancle">
    <view class="share">
      <view class="share-title">分享至</view>
      <view class="share-top__line" />
      <view class="share-center">
        <view v-for="(item, index) in shareList" :key="index" @click="shareItem(item)">
          <image class="share-center__image" :src="item.src" />
          <view class="share-center__title">{{ item.name }}</view>
        </view>
      </view>
      <view class="share-bottom__line" />
      <view class="share-cancel" @click="cancle">取消</view>
    </view>
  </u-popup>
</template>

<script>
  export default {
    name: 'VoShareView',
    props: {
      /*
       * src 分享图片
       * name 标题
       * */
      // shareList: {
      //   type: Array,
      //   defaults: [],
      // },
      // show: Boolean,
    },
    data() {
      return {
        show: false,
        shareList: [
          {
            src: '/static/created/circle/share_friend.png',
            name: '微信好友',
            type: 'WXSceneSession',
          },
          {
            src: '/static/created/circle/share_circle.png',
            name: '朋友圈',
            type: 'WXSceneTimeline',
          },
        ],
      }
    },
    methods: {
      shareItem(item) {
        this.$emit('shareFn', item.type)
      },
      showShare(e) {
        this.show = e
      },
      cancle() {
        this.show = false
      }
    },
  }
</script>

<style lang="scss" scoped>
  .share {
    &-title {
      font-size: 28rpx;
      font-weight: bold;
      height: 74rpx;
      line-height: 74rpx;
      width: 750rpx;
      text-align: center;
      color: rgba(0, 0, 0, 0.85);
    }
    &-top__line {
      width: 750rpx;
      height: 1px;
      background: #f7f7f8;
    }
    &-center {
      margin: 40rpx 48rpx;
      display: grid;
      grid-row-gap: 40rpx;
      grid-column-gap: 40rpx;
      grid-template-columns: 1fr 1fr 1fr 1fr;

      &__image {
        width: 120rpx;
        height: 120rpx;
        display: block;
        margin: 0rpx auto 0rpx;
      }
      &__title {
        margin-top: 8rpx;
        font-size: 24rpx;
        line-height: 34rpx;
        text-align: center;
        color: rgba(0, 0, 0, 0.85);
      }
    }
    &-bottom__line {
      width: 750rpx;
      height: 16rpx;
      background: #f7f7f8;
    }
    &-cancel {
      width: 100%;
      height: 96rpx;
      line-height: 96rpx;
      text-align: center;
      font-size: 28rpx;
      color: rgba(0, 0, 0, 0.85);
    }
  }
</style>
