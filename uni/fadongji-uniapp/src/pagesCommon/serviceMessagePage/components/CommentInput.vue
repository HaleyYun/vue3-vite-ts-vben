<template>
  <!-- 评论输入框 -->
  <view :class="safeareaShow ? 'p-b-safe-area' : ''" class="comment">
    <view class="comment-input flex" v-if="commentData">
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
      <view class="right">
        <view class="right-item__text fz-28" @click="releaseComment(comment)">发表</view>
      </view>
    </view>
  </view>
</template>

<script>
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
        comment: '',
        isFocus: false,
        commentData: '',
        placeholder: '我来说两句',
        isLoading: false,
      }
    },
    methods: {
      focusFn() {
        this.safeareaShow = false
      },
      blurFn() {
        this.isFocus = false
        this.safeareaShow = true
      },

      //发布评论
      releaseComment(value) {
        if (this.isLoading) {
          return
        }
        if (!value) {
          return
        }
        //过滤空格
        let valueNew = value.replace(/\s+/g, '')
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
            parentId: this.commentData.resourceId,
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
            businessType: 4,
            comment: comment,
            contentId: this.dataObj.contentId,
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
              uni.$u.toast(err.message || '发布失败')
              this.isLoading = false
            })
        }
      },
      //聚焦
      toFocus(item) {
        let author = item.name
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

    &-input {
      margin: 20rpx 32rpx;

      .left {
        border-radius: 16rpx;

        &-input {
          font-size: 28rpx;
          background-color: $v-bg-light;
          color: #000000;
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
        width: 100rpx;
        height: 76rpx;

        &-item {
          padding-left: 32rpx;
          padding-right: 4rpx;
          &__text {
            align-content: center;
            color: $v-c0-45;
            line-height: 76rpx;
            margin-left: 20rpx;
          }
        }
      }
    }
  }
</style>
