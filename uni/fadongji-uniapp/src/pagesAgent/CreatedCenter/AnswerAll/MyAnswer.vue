<template xmlns="">
  <view class="answer">
    <view class="m-t-30" />
    <view class="flex" @click="backFn">
      <view class="answer-back flex flex-vertical-c">
        <VoIcon name="left-arrow" />
      </view>
      <view class="answer-search flex1">
        <VoSearch placeholder="请输入关键字搜索" height="34" v-model="keyword" />
      </view>
    </view>
    <view class="answer-top">
      <view class="flex">
        <image class="answer-top__image" src="/static/circle/circle_detail_question.png" />
        <view class="answer-top__title flex1"
          >最近问题有点多，库存周转不开,干着急最近问题有点多，库存周转不开。</view
        >
      </view>
      <view class="answer-top__row">
        <view class="question">752个回答 >></view>
      </view>
      <view class="answer-top__line" />
    </view>
    <VoCircleDetail
      class="m-t-20"
      :circleDetailData="circlePhotoAndText"
      circelType="CirclePhotoAndText"
    />
    <view class="answer-comment__title">评论</view>
    <VoCommentOne :bigV="true" :content="contentOne" :twoLevel="true" :author="true" />
  </view>
</template>

<script>
  export default {
    data() {
      return {
        keyword: '',
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
        contentOne:
            '汽车好物老铁带你一镜到底汽车好物老铁带你一镜到底汽车好物老铁好一镜到底快来体验汽车好物老铁带你',
      }
    },
    methods: {
      backFn() {
        this.$backFn()
      },
      goAnswer() {
        this.$u.toast('写回答')
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
    &-back {
      background-color: #ffffff;
      padding: 12rpx 0rpx 12rpx 32rpx;
    }
    &-search {
      padding: 12rpx 32rpx 12rpx 24rpx;
      box-sizing: border-box;
      background: #fff;
    }
    &-top {
      border-top: 1px solid #f0f0f0;
      padding: 24rpx 32rpx 0rpx 32rpx;

      &__image {
        width: 52rpx;
        height: 52rpx;
        margin-top: 6rpx;
        padding-right: 2rpx;
      }

      &__title {
        color: rgba(0, 0, 0, 0.85);
        font-size: 36rpx;
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
        .icon {
          width: 32rpx;
          height: 32rpx;
          padding-right: 16rpx;
        }
        .title {
          color: #155bd4;
          font-size: 28rpx;
          text-align: center;
        }
      }
    }
    &-comment__title {
      margin-top: 40rpx;
      margin-left: 32rpx;
      padding-bottom: 20rpx;
      font-size: 36rpx;
      color: #000000;
    }
  }
</style>
