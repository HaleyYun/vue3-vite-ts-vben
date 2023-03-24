<template>
  <view class="answer">
    <view class="answer-nav flex flex-vertical-c">
      <VoIcon name="left-arrow" @click="backFn" />
      <view class="answer-nav__title">{{ title }}</view>
      <svg
        class="answer-nav__more"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="4" cy="12" r="2" fill="black" fill-opacity="0.45" />
        <circle cx="12" cy="12" r="2" fill="black" fill-opacity="0.45" />
        <circle cx="20" cy="12" r="2" fill="black" fill-opacity="0.45" />
      </svg>
    </view>
    <VoCircleDetail class="m-t-20" :circleDetailData="circleText" @attentionFn="attentionFn" />
    <VoCircleDetail
      class="m-t-20"
      :circleDetailData="circleVideoAndText"
      circelType="CircleVideoAndText"
      @attentionFn="attentionFn"
    />
    <VoCircleDetail
      class="m-t-20"
      :circleDetailData="circlePhotoAndText"
      circelType="CirclePhotoAndText"
      @attentionFn="attentionFn"
    />
    <VoWriteAnswers class="answer-bottom" :type="type" />
  </view>
</template>

<script>
  import VoWriteAnswers from './components/VoWriteAnswers'
  export default {
    components: { VoWriteAnswers },
    data() {
      return {
        title: '最近问题有点多，库存周转不开,干着急最近问题有点多，库存周转不开。',
        circleText: {
          tagList: ['#离合器', '#汽修大咖', '#发动机'],
          userIcon: '/static/circle/circle_user_icon.png',
          vipIcon: '/static/circle/circle_user_vip.png',
          isVip: true,
          name: '李思思',
          time: '一分钟前',
          favourNum: '222',
          isAttention: false,
          endEditTime: '2022年05月10日17:11:35',
          poster: '',
          videoUrl: '',
          titleTag: '[共创项目：三离合变速器]',
          content:
            '库存乱，有没有合适的方法扩大库存？或者哪位老铁有空置的厂房可对外出租的，可以长期合作，有意的都可以回复，有钱大家一起赚~库存乱，有没有合适的方法扩大库存？',
        },
        circleVideoAndText: {
          tagList: ['#离合器', '#汽修大咖', '#发动机'],
          userIcon: '/static/circle/circle_user_icon.png',
          vipIcon: '/static/circle/circle_user_vip.png',
          isVip: true,
          name: '李思思',
          time: '一分钟前',
          favourNum: '222',
          isAttention: false,
          endEditTime: '2022年05月10日17:11:35',
          poster: '',
          videoUrl: '/static/video/video1.mp4',
          titleTag: '[共创项目：三离合变速器]',
          content:
            '库存乱，有没有合适的方法扩大库存？或者哪位老铁有空置的厂房可对外出租的，可以长期合作，有意的都可以回复，有钱大家一起赚~库存乱，有没有合适的方法扩大库存？',
        },
        circlePhotoAndText: {
          tagList: ['#离合器', '#汽修大咖', '#发动机'],
          photoList: [
            'https://cdn.uviewui.com/uview/album/1.jpg',
            'https://cdn.uviewui.com/uview/album/2.jpg',
            'https://cdn.uviewui.com/uview/album/3.jpg',
          ],
          userIcon: '/static/circle/circle_user_icon.png',
          vipIcon: '/static/circle/circle_user_vip.png',
          isVip: false,
          name: '李思思',
          time: '2022年05月10日11:09:17',
          favourNum: '222',
          isAttention: false,
          endEditTime: '2022年05月10日17:11:35',
          poster: '',
          videoUrl: '',
          titleTag: '[共创项目：三离合变速器]',
          content:
            '库存乱，有没有合适的方法扩大库存？或者哪位老铁有空置的厂房可对外出租的，可以长期合作，有意的都可以回复，有钱大家一起赚~库存乱，有没有合适的方法扩大库存？',
        },
        type: 2,
      }
    },
    methods: {
      backFn() {
        this.$backFn()
      },
      attentionFn() {
        this.$u.toast('点击了关注')
      },
    },
  }
</script>

<style lang="scss" scope>
  .answer {
    width: 750rpx;
    min-height: 100vh;
    overflow-x: hidden;
    box-sizing: border-box;
    background: $v-bg-white;
    padding: 88rpx 0 184rpx;
    &-nav {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 3;
      width: 750rpx;
      height: 88rpx;
      padding: 0 32rpx;
      box-sizing: border-box;
      background: $v-bg-white;
      &__title {
        margin-left: 14rpx;
        width: 440rpx;
        color: #000;
        font-size: 36rpx;
        font-weight: bold;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      &__more {
        margin-left: auto;
      }
    }
    &-bottom {
      position: fixed;
      bottom: 0;
      left: 0;
    }
  }
</style>
