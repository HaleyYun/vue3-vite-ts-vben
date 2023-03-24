<template>
  <view>
    <view class="answers flex flex-justify-between flex-vertical-c p-b-safe-area">
      <view v-if="type === 1" class="answers-one" @click="toAnswerPage">写回答</view>
      <view v-if="type === 2" class="answers-two flex flex-justify-between flex1">
        <view class="answers-two__button" @click="editQuestion">修改问题</view>
        <view class="answers-two__button" @click="toAnswerPage">写回答</view>
      </view>
      <view class="answers-height flex">
        <view class="answers-right flex flex-column flex-vertical-c m-l-30">
          <image
            v-if="isLike"
            class="answers-right__img"
            src="/static/created/circle/discover_like_selected.png"
            @click="likeCancel()"
          ></image>
          <image
            v-else
            class="answers-right__img"
            src="/static/created/circle/discover_like_normal.png"
            @click="like()"
          ></image>
          <view class="answers-right__num">
            {{ isLike ? (likeNum > 0 ? likeNum : '') : '点赞' }}
          </view>
        </view>
        <view class="answers-right flex flex-column flex-vertical-c m-l-30">
          <VoIcon
            v-if="isCollect"
            :size="20"
            color="#FDA202"
            name="star"
            @click="collectCancel()"
          />
          <VoIcon
            v-else
            :opacity="0.45"
            :size="20"
            color="#000"
            name="collect-none"
            @click="collect"
          />
          <view class="answers-right__num">
            <text>{{ questionData.collectionNum > 0 ? questionData.collectionNum : '收藏' }}</text>
          </view>
        </view>
        <view class="answers-right flex flex-column flex-vertical-c m-l-30">
          <VoIcon :opacity="0.45" :size="20" color="#000" name="share" @click="showSharePop" />
          <view class="answers-right__num"> 分享 </view>
        </view>
      </view>
    </view>
    <!-- 分享弹框 -->
    <VoShareView ref="sharePop" @shareFn="shareFn" />
  </view>
</template>

<script>
  import helpUtil from '@/common/helper'
  import devConf from '@/common/env'

  export default {
    props: {
      type: {
        type: Number,
        default: 1,
      },
      questionData: {
        type: Object,
      },
      isCollect: {
        type: Boolean,
        default: false,
      },
      isLike: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        collectionNum: this.questionData.collectionNum || '',
        likeNum: this.questionData.likeNum || '',
        isLoading: false,
      }
    },
    methods: {
      //分享
      shareFn(type) {
        console.log('shareFn', type)
        this.$refs.sharePop.cancle()
        let path = ''
        if (this.questionData.businessType === 0) {
          //问题
          path = '/pagesAgent/CreatedCenter/AnswerAll/NonAuthorAnswer?id=' + this.questionData.id
        } else if (this.questionData.businessType === 3) {
          //回答
          path =
            '/pagesAgent/CreatedCenter/CircleDetail/AnswerDetail?id=' +
            this.questionData.id +
            '&businessType=' +
            this.questionData.businessType
        } else {
          //想法
          path =
            '/pagesAgent/CreatedCenter/CircleDetail/CircleDetail?id=' +
            this.questionData.id +
            '&businessType=' +
            this.questionData.businessType
        }
        helpUtil
          .shareWeixin({
            scene: type,
            title: this.questionData.title,
            path: devConf.shareBaseUrl + path,
            imageUrl: this.questionData.image.length ? this.questionData.image[0] : '',
          })
          .then((res) => {
            console.log('res分享', res)
          })
          .catch((err) => {
            console.log('shareWeixinErr', err)
          })
      },
      //写回答
      toAnswerPage() {
        this.$linkToEasy(
          '/pagesAgent/CreatedCenter/CreatedQuestion/ToAnswer?id=' + this.questionData.id,
        )
      },
      //分享
      showSharePop() {
        this.$refs.sharePop.showShare(true)
      },
      editQuestion() {
        this.$linkToEasy(
          '/pagesAgent/CreatedCenter/ReleaseCircle/ReleaseQuestion?id=' + this.questionData.id,
        )
      },
      //收藏
      collect() {
        this.$emit('collect')
      },
      //取消收藏
      collectCancel() {
        this.$emit('cancelCollect')
      },
      //点赞
      like() {
        this.$emit('like')
      },
      //取消点赞
      likeCancel() {
        this.$emit('likeCancel')
      },
    },
  }
</script>

<style lang="scss" scope>
  .answers {
    width: 750rpx;
    box-sizing: border-box;
    background: $v-bg-white;
    padding: 12rpx 32rpx;
    &-one {
      width: 536rpx;
      height: 80rpx;
      font-size: 32rpx;
      background: $color-primary-yellow;
      color: #ffffff;
      border-radius: 148rpx;
      text-align: center;
      line-height: 80rpx;
    }
    &-two {
      width: 544rpx;
      &__button {
        width: 212rpx;
        height: 80rpx;
        font-size: 32rpx;
        background: $color-primary-yellow;
        color: #ffffff;
        border-radius: 148rpx;
        text-align: center;
        line-height: 80rpx;
      }
    }
    &-height {
      height: 80rpx;
    }
    &-right {
      height: 78rpx;
      line-height: 78rpx;
      width: 80rpx;
      &__num {
        height: 30rpx;
        line-height: 30rpx;
        font-size: 20rpx;
        color: $v-c0-45;
      }
      &__img {
        width: 40rpx;
        height: 40rpx;
      }
    }
  }
</style>
