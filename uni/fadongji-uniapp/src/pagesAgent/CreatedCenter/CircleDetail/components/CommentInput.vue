<template>
  <!-- 评论输入框 -->
  <view :class="safeareaShow ? 'p-b-safe-area' : ''" class="comment">
    <view class="comment-input flex">
      <view class="left flex1">
        <u--input
          v-model="comment"
          :auto-height="true"
          :focus="isFocus"
          :placeholder="placeholder"
          border="none"
          class="left-input"
          confirmType="send"
          placeholder-class="left-placeholder"
          @blur="blurFn"
          @confirm="releaseComment"
          @focus="focusFn"
        />
      </view>
      <view class="right flex flex-justify-between">
        <view class="right-item flex flex-column flex-justify-c flex-vertical-c">
          <VoIcon
            v-if="isLike"
            :size="20"
            color="#F20014"
            name="solid-heart"
            @click="likeCancel()"
          />
          <VoIcon
            v-else
            :opacity="0.45"
            :size="20"
            color="#000000"
            name="hollow-heart"
            @click="like()"
          />
          <view class="right-item__text">
            <block v-if="likeNum">
              <block v-if="likeNum >= 100000"> 10w+ </block>
              <block v-else-if="likeNum >= 10000">
                {{ parseInt((likeNum / 10000) * 10) / 10 }}w
              </block>
              <block v-else-if="likeNum >= 1000"> {{ (likeNum / 1000).toFixed(1) }}k </block>
              <block v-else>{{ likeNum }}</block>
            </block>
            <block v-else>点赞</block>
            <!--            {{isLike ? likeNum > 0 ? likeNum : '' : '点赞' }}-->
          </view>
        </view>
        <view class="right-item flex flex-column flex-justify-c flex-vertical-c">
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
            @click="collect()"
          />
          <view class="right-item__text text-nowrap">
            <block v-if="collectionNum">
              <block v-if="collectionNum >= 100000"> 10w+ </block>
              <block v-else-if="collectionNum >= 10000">
                {{ parseInt((collectionNum / 10000) * 10) / 10 }}w
              </block>
              <block v-else-if="collectionNum >= 1000">
                {{ (collectionNum / 1000).toFixed(1) }}k
              </block>
              <block v-else>{{ collectionNum }}</block>
            </block>
            <block v-else>收藏</block>
          </view>
        </view>
        <view class="right-item flex flex-column flex-justify-c flex-vertical-c">
          <VoIcon :opacity="0.45" :size="20" color="#000" name="share" @click="shareClick" />
          <view class="right-item__text">分享</view>
        </view>
        <view
          v-if="sys.osName !== 'ios'"
          class="right-item flex flex-column flex-justify-c flex-vertical-c"
        >
          <view class="send-text" @click="releaseComment">发送</view>
          <view v-if="collectionNum" class="right-item__text" />
        </view>
      </view>
    </view>
    <VoShareView ref="showFn" @shareFn="shareFn" />
  </view>
</template>

<script>
  import { shareWeixin } from '@/common/helper'
  import devConf from '@/common/env'

  export default {
    name: 'CommentInput',
    props: {
      dataObj: {
        type: Object,
      },
    },
    data() {
      return {
        safeareaShow: true,
        isCollect: false,
        isLike: false,
        collectionNum: '',
        likeNum: '',
        comment: '',
        isFocus: false,
        commentData: '',
        placeholder: '我来说两句',
        isLoading: false,
        sys: {},
      }
    },
    created() {
      // 获取系统信息
      this.sys = uni.getSystemInfoSync()
      console.log('created', this.dataObj)
      this.isCollect = this.dataObj.mySelfCollectNum === 1 ? true : false
      this.collectionNum = this.dataObj.collectionNum
      this.isLike = this.dataObj.mySelfLikeNum === 1 ? true : false
      this.likeNum = this.dataObj.likeNum
    },
    methods: {
      shareClick() {
        this.$refs.showFn.showShare(true)
      },
      //分享
      shareFn(type) {
        console.log('shareFn', type)
        this.$refs.showFn.cancle()
        let path =
          '/pagesAgent/CreatedCenter/CircleDetail/CircleDetail?id=' +
          this.dataObj.id +
          '&businessType=' +
          this.dataObj.businessType
        shareWeixin({
          scene: type,
          title: this.dataObj.title,
          path: devConf.shareBaseUrl + path,
          imageUrl: this.dataObj.image ? this.dataObj.image[0] : '',
        })
          .then((res) => {
            console.log('res分享', res)
          })
          .catch((err) => {
            console.log('shareWeixinErr', err)
          })
      },
      focusFn() {
        this.safeareaShow = false
      },
      blurFn() {
        this.isFocus = false
        this.safeareaShow = true
      },

      //收藏
      collect() {
        if (this.isLoading) {
          return
        }
        this.isLoading = true
        this.$VoHttp
          .apiCreateQuestionsQuestionCollect({
            contentId: this.dataObj.id,
          })
          .then((res) => {
            if (+res.code === 20001) {
              this.$toast('收藏成功', 'success', '/static/icons/success_icon.png')
              this.isCollect = true
              this.collectionNum = this.collectionNum + 1
            } else {
              uni.$u.toast(res.message)
            }
            this.isLoading = false
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '收藏失败')
            this.isLoading = false
          })
      },
      //取消收藏
      collectCancel() {
        if (this.isLoading) {
          return
        }
        this.isLoading = true
        this.$VoHttp
          .apiCreateQuestionsQuestionCancelCollect({
            contentId: this.dataObj.id,
          })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('已取消收藏')
              this.isCollect = false
              this.collectionNum = this.collectionNum - 1
            } else {
              uni.$u.toast(res.message)
            }
            this.isLoading = false
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('取消失败')
            this.isLoading = false
          })
      },
      //点赞
      like() {
        if (this.isLoading) {
          return
        }
        this.isLoading = true
        this.$VoHttp
          .apiCreateQuestionsQuestionLike({
            businessType: this.dataObj.businessType,
            contentId: this.dataObj.id,
          })
          .then((res) => {
            if (+res.code === 20001) {
              this.$toast('点赞成功', 'success', '/static/icons/success_icon.png')
              this.isLike = true
              this.likeNum = this.likeNum + 1
              uni.$emit('changeLikeFn', {
                likeNum: this.likeNum,
                contentId: this.dataObj.id,
                isLike: this.isLike,
              })
            } else {
              uni.$u.toast(res.message)
            }
            this.isLoading = false
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '点赞失败')
            this.isLoading = false
          })
      },
      //取消点赞
      likeCancel() {
        if (this.isLoading) {
          return
        }
        this.isLoading = true
        this.$VoHttp
          .apiCreateQuestionsQuestionCancelLike({
            businessType: this.dataObj.businessType,
            contentId: this.dataObj.id,
          })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('已取消点赞')
              this.isLike = false
              this.likeNum = this.likeNum - 1

              uni.$emit('changeLikeFn', {
                likeNum: this.likeNum,
                contentId: this.dataObj.id,
                isLike: this.isLike,
              })
            } else {
              uni.$u.toast(res.message)
            }
            this.isLoading = false
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('取消失败')
            this.isLoading = false
          })
      },
      //发布评论
      releaseComment() {
        if (this.isLoading) {
          return
        }
        if (!this.comment) {
          return
        }
        //过滤空格
        let valueNew = this.comment.replace(/\s+/g, '')
        if (!valueNew) {
          return
        }
        this.isLoading = true
        let obj = { json: valueNew }
        let comment = JSON.stringify(obj)
        //如果是回复评论，调回复接口，否则调发评论接口
        if (this.commentData.id) {
          let params = {
            antherUserId: this.commentData.userId,
            // businessType: this.commentData.businessType,
            comment: comment,
            contentId: this.commentData.contentId,
            parentId:
              this.commentData.level === 1 ? this.commentData.id : this.commentData.parentId,
          }
          this.$VoHttp
            .apiCreateQuestionsCommentReplay(params)
            .then((res) => {
              if (res.code === '20001') {
                uni.$u.toast('发送成功')
                this.resetInput()
                this.$emit('releaseCommentSuccess')
              } else {
                uni.$u.toast(res.message)
              }
              this.isFocus = false
              this.isLoading = false
            })
            .catch((err) => {
              console.log('err', err)
              uni.$u.toast('发送失败')
              this.isLoading = false
            })
        } else {
          let params = {
            antherUserId: this.dataObj.userId,
            businessType: this.dataObj.businessType,
            comment: comment,
            contentId: this.dataObj.id,
          }
          this.$VoHttp
            .apiCreateQuestionsCommentSave(params)
            .then((res) => {
              if (res.code === '20001') {
                uni.$u.toast('发布成功')
                this.resetInput()
                this.$emit('releaseCommentSuccess')
              } else {
                uni.$u.toast(res.message)
              }
              this.isLoading = false
            })
            .catch((err) => {
              console.log('err', err)
              uni.$u.toast(err.message)
              this.isLoading = false
            })
        }
      },
      //聚焦
      toFocus(item) {
        let author = item.userName
        this.placeholder = '回复@' + author
        this.isFocus = true
        this.commentData = item
        console.log('this.isFocus22', this.isFocus)
      },
      //重置输入框
      resetInput() {
        this.comment = ''
        this.commentData = ''
        this.placeholder = '我来说两句'
      },
    },
  }
</script>

<style lang="scss" scoped>
  .comment {
    background-color: #ffffff;
    width: 100%;
    // height: 100%;
    border-top: 1px solid $v-bg-light;
    .send-text {
      width: 122rpx;
      height: 64rpx;
      line-height: 64rpx;
      font-size: 24rpx;
      text-align: center;
      color: #fff;
      background: #ff5319;
      border-radius: 30rpx;
    }
    &-input {
      margin: 20rpx 32rpx 16rpx 32rpx;

      .left {
        border-radius: 16rpx;

        &-input {
          font-size: 28rpx;
          background-color: $v-bg-light;
          color: $v-c0-85;
          border-radius: 16rpx;
          height: 76rpx;
          text-indent: 30rpx;
        }
        &-placeholder {
          font-size: 28rpx;
          color: $v-c0-25;
        }
      }
      .right {
        height: 76rpx;

        &-item {
          padding-left: 32rpx;
          padding-right: 4rpx;
          &__text {
            align-content: center;
            font-size: 20rpx;
            color: $v-c0-45;
            height: 30rpx;
            line-height: 30rpx;
          }
        }
      }
    }
  }
</style>
