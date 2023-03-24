<template>
  <scroll-view v-if="visible" :scroll-y="scrollY" class="pop-list">
    <view v-for="(item, index) in commentList" :key="index" class="pop-list__item">
      <view class="item-top">
        <view class="user" @click="toUserHome(item)">
          <view class="relative">
            <image :src="item.userPhotoUrl || '/static/default_avatar.png'" class="user-photo" />
            <!-- 认证通过展示大v标识4已认证 -->
            <VoIcon v-if="Number(item.checkStatus) === 4" :size="8" class="v-img" name="v-icon" />
          </view>

          <view class="user-info"> {{ item.userName }} </view>
          <image
            v-show="parentData.userId === item.userId"
            class="autor-icon"
            src="/static/icons/autor.png"
          />
          <image
            v-show="+item.isTop === 1"
            class="discover-top"
            src="/static/created/circle/discover_comment_top.png"
          />
        </view>
        <view class="top-icon" @click.stop="showActionPop(item)">
          <VoIcon :opacity="0.45" :size="24" class="icon1" color="#000000" name="comment-more" />
        </view>
      </view>
      <view class="item-text">
        <view class="item-text__word">{{ item.texts }}</view>
        <text
          v-if="item.commentNew.length > 35"
          class="link-text"
          @click.stop="expand(item, index)"
        >
          {{ item.isExpand ? '收起' : '全部' }}
        </text>
      </view>
      <view class="item-opreate">
        <view class="item-opreate__time">{{ item.datetime }}</view>
        <VoIcon
          :opacity="0.45"
          :size="24"
          class="item-opreate__icon"
          color="#000000"
          name="commit"
          @click="toAnswer(item)"
        />
        <VoIcon
          v-if="item.isLike"
          :size="24"
          class="item-opreate__btn"
          color="#E50012"
          name="heard-like"
          @click="giveLike(item, index)"
        />
        <VoIcon
          v-else
          :opacity="0.45"
          :size="24"
          class="item-opreate__btn"
          color="#000000"
          name="heart-b"
          @click="giveLike(item, index)"
        />
        <view class="item-opreate__num">{{ item.likeNum || '' }}</view>
      </view>
      <view v-if="item.communityCommentVOList && item.communityCommentVOList.length" class="child">
        <view
          v-for="(child, childIndex) in item.communityCommentVOList"
          v-show="item.isShowAll ? childIndex < item.communityCommentVOList.length : childIndex < 1"
          :key="child.id"
          class="child-wrap"
        >
          <view class="child-title flex flex-justify-between">
            <view class="child-title-detail flex flex-vertical-c overflow-hidden">
              <!--            <view class="child-title-detail flex overflow-ellipsis flex-vertical-c">-->
              <!-- <image class="child-title-photo" :src="item.userPhotoUrl || '/static/default_avatar.png'" /> -->
              <view class="flex1 text-nowrap">
                <text class="child-title__name"> {{ child.userName }}</text>
                <text class="child-title__text">回复</text>
                <text class="child-title__name">{{ child.antherUserName || '' }}</text>
              </view>
              <VoIcon
                v-if="parentData.userId === child.userId"
                :size="24"
                class="m-l-4 m-r-4"
                name="auth-tag"
              />
            </view>
            <view class="top-icon" @click.stop="showActionPop(child)">
              <VoIcon
                :opacity="0.45"
                :size="24"
                class="icon1"
                color="#000000"
                name="comment-more"
              />
            </view>
          </view>
          <view class="item-text">
            <view class="item-text__word">{{ child.texts }}</view>
            <text
              v-if="child.commentNew.length > 35"
              class="link-text"
              @click.stop="expandChild(index, childIndex)"
            >
              {{ child.isExpand ? '收起' : '全部' }}
            </text>
          </view>
          <view class="item-opreate no-padding">
            <view class="item-opreate__time">{{ child.datetime }}</view>
            <VoIcon
              :opacity="0.45"
              :size="20"
              class="item-opreate__icon"
              color="#000000"
              name="commit"
              @click="toAnswer(child)"
            />
            <view class="icon-wrap" @click.stop="giveLike(child, index, childIndex)">
              <VoIcon
                v-if="child.isLike"
                :size="20"
                class="item-opreate__btn"
                color="#E50012"
                name="heard-like"
              />
              <VoIcon
                v-else
                :opacity="0.45"
                :size="20"
                class="item-opreate__btn"
                color="#000000"
                name="heart-b"
              />
            </view>

            <view class="item-opreate__num">{{ child.likeNum || '' }}</view>
          </view>
        </view>
      </view>
      <view
        v-if="item.communityCommentVOList && item.communityCommentVOList.length > 1"
        class="oprea-text"
        @click="showAllComment(index)"
      >
        <span v-if="item.isShowAll">收起</span>
        <span v-else-if="item.communityCommentVOList.length > 99">展开其他99+条回复</span>
        <span v-else>展开其他{{ item.communityCommentVOList.length - 1 }}条回复</span>
      </view>
    </view>
  </scroll-view>
</template>

<script>
  export default {
    name: 'CommentPop',
    props: {
      // list: {
      //   type: Array,
      //   require: true,
      // },
      scrollY: {
        type: Boolean,
        default: false,
      },
      // parentData: {
      //   type: Object,
      // },
    },
    data() {
      return {
        visible: false,
        commentList: [],
        userinfo: {},
        parentData: '',
        pageNo: 1,
        pageSize: 10,
        total: 0,
      }
    },
    mounted() {
      // this.init()
    },
    methods: {
      init(record, parentData) {
        this.parentData = parentData || ''
        let data = record
        // data.forEach((item) => {
        //   item.commentNew = JSON.parse(item.comment).json || item.comment
        //   item.isLike = item.mySelfLikeNum === 1 ? true : false
        //   // item.children = []
        //   //时间转换
        //   item.datetime = this.$vocenApi.VoUtils.timeTransfer(item.createTime)
        // })
        let list = this.commentHandle(data)
        list.forEach((item) => {
          if (item.communityCommentVOList && item.communityCommentVOList.length) {
            item.communityCommentVOList = this.commentHandle(item.communityCommentVOList)
          }
        })
        // list = list.filter((item) => !item.parentId || item.parentId === '0')
        // data.forEach((item) => {
        //   list.forEach((item2) => {
        //     if (item.parentId === item2.id) {
        //       item2.children.push(item)
        //     }
        //     item2.children.forEach((child) => {
        //       if (item.parentId === child.id) {
        //         item2.children.push(item)
        //       }
        //     })
        //   })
        // })
        // list.forEach((item) => {
        //   if (item.children.length > 1) {
        //     item.isShowAll = false
        //   } else {
        //     item.isShowAll = true
        //   }
        // })
        this.commentList = list
        console.log(this.commentList)
        // this.getCommentList()
        this.visible = true
      },
      //数据处理，超三十字省略
      commentHandle(arr) {
        arr.forEach((item) => {
          item.commentNew = JSON.parse(item.comment).json || item.comment
          item.isLike = item.mySelfLikeNum === 1 ? true : false
          // item.children = []
          //时间转换
          item.datetime = this.$vocenApi.VoUtils.timeTransfer(item.createTime)
          let txtCntIndex = item.commentNew.length
          if (txtCntIndex > 35) {
            item.isExpand = false
            item.texts = item.commentNew.substr(0, 35) + '...'
          } else {
            item.isExpand = true
            item.texts = item.commentNew
          }
        })
        return arr
      },
      // 文字展开事件
      expand(data, index) {
        let item = this.commentList[index]
        if (item.isExpand) {
          item.isExpand = false
          item.texts = item.commentNew.substr(0, 35) + '...'
        } else {
          item.isExpand = true
          item.texts = item.commentNew
        }
        this.$forceUpdate()
      },
      // 回复文字展开事件
      expandChild(index, childIndex) {
        console.log(this.commentList[index], childIndex, 'childIndex')
        if (this.commentList[index] && this.commentList[index].communityCommentVOList) {
          let item = this.commentList[index].communityCommentVOList[childIndex]
          if (item.isExpand) {
            item.isExpand = false
            item.texts = item.commentNew.substr(0, 35) + '...'
          } else {
            item.isExpand = true
            item.texts = item.commentNew
          }
          console.log(
            this.commentList[index].communityCommentVOList,
            ' this.commentList[index].children',
          )
          this.$forceUpdate()
        }
      },
      //展开所有回复
      showAllComment(index) {
        this.commentList[index].isShowAll = !this.commentList[index].isShowAll
        this.$forceUpdate()
      },
      confirm(value) {
        console.log('value', value)
        this.comment = value
      },
      toAnswer(item) {
        // let author = item.author || item.commentator
        let author = item.userName
        this.placeholder = '回复@' + author
        // this.isFocus = true
        this.$emit('toAnswer', item)
      },
      giveLike(item, index, childIndex) {
        if (item.isLike) {
          this.giveLikeCancel(item, index, childIndex)
        } else {
          this.giveLikeLight(item, index, childIndex)
        }

        // uni.$u.toast('点赞成功')
      },
      //点赞
      giveLikeLight(item, index, childIndex) {
        this.$VoHttp
          .apiCreateQuestionsCommentLike({
            contentId: item.id,
            // id: item.id,
          })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('点赞成功')
              if (childIndex >= 0) {
                item.isLike = true
                item.likeNum++
                // this.commentList.forEach((comment) => {
                //   comment.children.forEach((child) => {
                //     if (child.id === item.id) {
                //       child.isLike = true
                //       child.likeNum++
                //     }
                //   })
                // })
              } else {
                this.commentList[index].isLike = true
                this.commentList[index].likeNum++
                this.$forceUpdate()
              }
            } else {
              uni.$u.toast(res.message)
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('点赞失败')
          })
      },
      //取消点赞
      giveLikeCancel(item, index, childIndex) {
        this.$VoHttp
          .apiCreateQuestionsCommentCancelLike({
            contentId: item.id,
            // id: item.id,
          })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('取消成功')
              if (childIndex >= 0) {
                item.isLike = false
                item.likeNum--
                // this.commentList.forEach((comment) => {
                //   comment.children.forEach((child) => {
                //     if (child.id === item.id) {
                //       child.isLike = false
                //       child.likeNum--
                //     }
                //   })
                // })
              } else {
                this.commentList[index].isLike = false
                this.commentList[index].likeNum--
                this.$forceUpdate()
              }
            } else {
              uni.$u.toast(res.message)
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('取消失败')
          })
      },
      //点击更多icon
      showActionPop(item) {
        this.$emit('showActionPop', item)
      },
      //跳转作者主页
      toUserHome(item) {
        this.$linkToEasy(
          '/pagesAgent/PersonalHomepage/PersonalHomepage?userId=' +
            item.userId +
            '&platformCode=' +
            item.platformCode,
        )
      },
    },
  }
</script>

<style lang="scss" scoped>
  .pop-list {
    flex: 1;
    overflow-y: auto;
    background: #fff;

    &__item {
      .item-top {
        display: flex;
        padding: 20rpx 32rpx 0 32rpx;

        .user {
          flex: 1;
          display: flex;
          align-items: center;

          &-photo {
            width: 48rpx;
            height: 48rpx;
            border-radius: 50%;
          }

          &-info {
            color: rgba(0, 0, 0, 0.65);
            font-size: 24rpx;
            line-height: 1.5;
            padding-right: 8rpx;
            padding-left: 14rpx;
          }
          .v-img {
            position: absolute;
            right: 0;
            top: 0;
          }
        }
      }

      .item-text {
        overflow: hidden;
        position: relative;
        word-break: break-all;
        white-space: normal;
        text-align: justify;
        padding: 0 96rpx;
        box-sizing: border-box;

        display: flex;
        justify-content: space-between;

        &__word {
          font-size: 26rpx;
          line-height: 39rpx;
          color: rgba(0, 0, 0, 0.85);
          width: 89%;
        }

        .link-text {
          //position: absolute;
          right: 96rpx;
          bottom: 0;
          color: #0d66ff;
          opacity: 0.6;
          font-size: 26rpx;
          line-height: 1.5;
        }
      }

      .item-opreate {
        display: flex;
        align-items: center;
        padding: 8rpx 96rpx;
        box-sizing: border-box;
        &.no-padding {
          padding: 8rpx 16rpx 8rpx 32rpx;
        }

        &__time {
          flex: 1;
          font-size: 20rpx;
          line-height: 1.5;
          color: rgba(0, 0, 0, 0.45);
        }

        &__icon {
          margin-right: 24rpx;
        }

        &__num {
          font-size: 26rpx;
          line-height: 1.5;
          color: rgba(0, 0, 0, 0.45);
          padding-left: 6rpx;
        }
      }

      .child {
        margin: 0 96rpx;
        box-sizing: border-box;
        background: #f7f7f8;
        border-radius: 16rpx;

        &-wrap {
          padding: 8rpx 0;
          box-sizing: border-box;

          .item-text {
            padding: 0 32rpx;

            .link-text {
              right: 0;
            }
          }
        }

        &-title {
          line-height: 1.5;
          color: rgba(0, 0, 0, 0.85);
          font-size: 24rpx;
          padding: 0 32rpx;
          box-sizing: border-box;
          &-photo {
            width: 48rpx;
            height: 48rpx;
            border-radius: 50%;
            flex-shrink: 0;
            margin-right: 14rpx;
          }
          &__name {
            color: rgba(0, 0, 0, 0.65);
            flex-shrink: 0;
            //width: 150rpx;
            //overflow: hidden;
            //text-overflow: ellipsis;
          }

          &__text {
            padding: 0 8rpx;
          }
        }
      }

      .oprea-text {
        color: #155bd4;
        line-height: 1.5;
        font-size: 28rpx;
        padding: 8rpx 96rpx;
      }
    }
    .icon-wrap {
      height: 40rpx;
    }
    .discover-top {
      margin-left: 19rpx;
      height: 32rpx;
      width: 70rpx;
    }
    .autor-icon {
      width: 60rpx;
      height: 26rpx;
    }
  }
</style>
