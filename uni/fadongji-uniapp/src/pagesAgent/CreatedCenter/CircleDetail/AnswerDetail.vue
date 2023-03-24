<template>
  <view>
    <view class="wrap flex flex-column">
      <!-- <view :style="statusBarStyle" class="nav-block" /> -->
      <scroll-view
        :scroll-y="true"
        class="flex-top"
        scroll-top="0"
        @scroll="onScroll"
        @scrolltolower="scrolltolower"
      >
        <!--   渐变导航 -->
        <CircleGradualNav
          :icon="answerInfo.userPhotoUrl || '/static/default_avatar.png'"
          :is-attention-hidden="false"
          :is-big-v-hidden="false"
          :nav-show="navShow"
          :style="{ opacity: opacity }"
          :title="info.title"
          @attentionFn="attentionFn"
          @click="navClick"
        />
        <!-- 默认导航栏 -->
        <VoNav ref="voNav" :left-width="64" :right-width="0" is-fixed>
          <block slot="title">
            <VoSearch
              v-model.trim="keyword"
              :actionStyle="{
                height: 'initial',
                color: '#FF5319',
              }"
              class="wrap-search"
              height="34"
              placeholder="请输入关键字搜索"
              @custom="goResult"
              @search="goResult"
            />
          </block>
        </VoNav>
        <!--    头部标题-->
        <CircleDetailTop
          v-if="info.id"
          ref="CircleDetailTop"
          :dataObj="info"
          :isEditHidden="answerInfo.userId != userInfo.id"
          @editAnswer="editAnswer"
          @goAnswer="goAnswer"
        />
        <view id="navView" />
        <!--  详情-->
        <VoCircleDetail
          v-if="info.id"
          ref="voCircleDetail"
          :circleDetailData="answerInfo"
          :isAuthor="isAuthor"
          :isShowAttention="false"
          class="m-t-20"
          @attentionFn="attentionFn"
        />
        <!-- 评论列表  -->
        <view v-if="commentList.length" class="wrap-comment__title">评论</view>
        <CommentList
          ref="commentList"
          :parentData="answerInfo"
          :scrollY="false"
          @showActionPop="showActionPop"
          @toAnswer="toAnswerComment"
        />
      </scroll-view>

      <!-- 底部写回答悬浮框 -->
      <!-- 回答详情显示 -->
      <CircleBottomPublishView
        v-if="!bottomPublishHidden && info.id"
        :info="info"
        :isAuthor="isAuthor"
        @editAnswer="editAnswer"
        @goAnswer="goAnswer"
      />

      <!-- 评论输入框 -->
      <CommentInput
        v-if="info.id"
        ref="commentInput"
        :dataObj="answerInfo"
        @releaseCommentSuccess="releaseCommentSuccess"
      />
    </view>
    <!-- 举报弹层 -->
    <VoActionSheet
      v-show="showAction"
      :actions="actions"
      :show="showAction"
      cancelText="取消"
      class="action-sheet"
      @close="showAction = false"
      @select="actionSelect"
    />
  </view>
</template>

<script>
  import CommentInput from './components/CommentInput.vue'
  import CircleDetailTop from './components/CircleDetailTop.vue'
  import CircleGradualNav from './components/CircleGradualNav.vue'
  import CircleBottomPublishView from './components/CircleBottomPublishView.vue'
  import CommentList from '@/pagesAgent/CreatedCenter/Components/CommentList'
  import helpUtil, { hideLoading, showLoading } from '@/common/helper'
  import { storage } from '@/common/unifyGlobalReg'

  export default {
    components: {
      CommentInput,
      CircleDetailTop,
      CircleGradualNav,
      CircleBottomPublishView,
      CommentList,
    },
    data() {
      return {
        info: '',
        answerInfo: '',
        statusBarStyle: {
          height: this.$systemInfo.statusBarHeight + 'px',
          backgroundColor: '#ffffff',
        },
        reportData: '',
        showAction: false,
        actions: [
          {
            name: '举报作者',
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: '14',
          },
          {
            name: '举报内容',
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: '14',
          },
          {
            name: '拉黑用户',
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: '14',
          },
        ],
        //控制渐变导航的显示隐藏
        navShow: false,
        safeareaShow: true,
        bottomPublishHidden: true,
        show: 'true',
        keyword: '',
        opacity: 0,
        answerTitle: '最近问题有点多，库存周转不开,干着急最近问题有点多，库存周转不开。',
        answerIcon: '/static/created/circle/circle_detail_question.png',
        collectNum: '22',
        shareNum: '44',
        contentOne:
          '汽车好物老铁带你一镜到底汽车好物老铁带你一镜到底汽车好物。汽车好物老铁带你一镜到底汽车好物老铁带你一镜到底汽车好物。',
        commentList: [],
        userinfo: {},
        optionsId: '',
        isAuthor: false, //是否是作者
        // 评论分页
        pageNo: 1,
        pageSize: 10,
        total: 0,
        businessType: '',
      }
    },
    onPageScroll: function (e) {
      // let query = uni.createSelectorQuery().in(this)
      // query
      //   .select('#navView')
      //   .boundingClientRect((data) => {
      //     console.log('#navView', data)
      //     this.handleScroll(data.top)
      //   })
      //   .exec()
    },
    onShow() {
      if (this.optionsId) {
        this.getDetail()
      }
    },
    onHide() {
      this.closeInnerAudioContext()
      this.$refs.CircleDetailTop.close()
    },
    onUnload() {
      this.closeInnerAudioContext()
      this.$refs.CircleDetailTop.close()
    },
    onLoad(options) {
      if (storage.get('userInfo')) {
        this.userinfo = storage.get('userInfo')
        console.log('this.userinfo===', this.userinfo)
      }
      if (options.id) {
        this.optionsId = options.id
        this.businessType = parseInt(options.businessType)
        this.getDetail()
        this.getCommentList(true)
      }
    },
    methods: {
      /**
       * 搜索
       */
      goResult() {
        if (this.keyword) {
          let historyList = []
          if (this.$storage.get('create_history')) {
            historyList = JSON.parse(this.$storage.get('create_history'))
            if (historyList.indexOf(this.keyword) === -1) {
              historyList.push(this.keyword)
              this.$storage.set('create_history', JSON.stringify(historyList))
            }
          } else {
            historyList.push(this.keyword)
            this.$storage.set('create_history', JSON.stringify(historyList))
          }
          this.$storage.set('searchCreate', this.keyword)
          uni.$emit('searchCreate', this.keyword)
          this.$backFn()
        }
      },
      navClick() {
        this.$linkToEasy('/pagesAgent/CreatedCenter/AnswerAll/NonAuthorAnswer?id=' + this.info.id)
      },
      //获取详情
      getDetail() {
        this.$VoHttp
          .apiCreateQuestionsAnswer$Id({
            id: this.optionsId,
          })
          .then((res) => {
            this.info = res.data
            helpUtil.regroupFileData(this.info)
            //回答内容
            this.answerInfo = res.data.communityCommentVOList[0]
            this.answerInfo.columnName = this.info.columnName
            this.answerInfo.categoryName = this.info.categoryName
            //判断是否是作者
            if (this.answerInfo.userId === this.userinfo.id) {
              this.isAuthor = true
            }
            this.transferHtml(this.answerInfo)
            this.answerInfo.content = this.getText(this.answerInfo.transferHtml)
            const comment = JSON.parse(this.answerInfo.comment).json
            //提取图片
            const imgReg = /<img [^>]*src=['"]([^'"]+)[^>]*>/g
            const videoReg = /<img[^<]*data-custom=[^>]*\.mp4"[^>]*>/g

            this.answerInfo.image = []
            this.answerInfo.commentParse = comment.replace(/<img/g, '<br><img')

            const images = comment.match(imgReg)
            const imgs =
              images && images.length
                ? images.filter((item) => {
                    return !videoReg.test(item)
                  })
                : []
            this.answerInfo.image.push(
              ...imgs.map((item) => {
                return item.match(/http[^"]*[(.png)(.jpg)(.gif)]/g)[0]
              }),
            )
            //提取视频

            this.answerInfo.video = []
            if (comment.match(videoReg)) {
              const video = comment.match(videoReg).map((item) => {
                return {
                  video: item.match(/http[^"<>]*\.mp4/g)[0],
                  poster: item.match(/http[^"]*\.jpg/g)[0],
                }
              })
              this.answerInfo.video.push(...video)
            }
            console.log('comment', this.answerInfo)
            // this.$refs.voCircleDetail.transferHtml(this.answerInfo.commentParse)
          })
      },
      //富文本视频解析
      transferHtml(item) {
        let str = JSON.parse(item.comment).json
        // 匹配img自定义封面图标正则
        const reg2 = /<img[^<]*data-custom=[^>]*\.mp4"[^>]*>/g
        const imgReg = /http[^"]*\.jpg/g
        // 匹配视频地址正则
        const video = /video=.*\.mp4/g
        // 进行img转 video
        const afterHtmlStr = str.replace(reg2, (val) => {
          // 取出data-custom值
          const v = val.match(video)
          const poster = val.match(imgReg)
          const vs = v[0].replace('video=', '')

          return `<video controls src="${vs}" poster="${poster[0]}" style="background:#000" preload width="100%" height="200"></video>`
        })
        item.transferHtml = afterHtmlStr
      },
      //获取富文本文字内容
      getText(str) {
        return str.replace(/<[^<>]+>/g, '').replace(/&nbsp;/gi, '')
      },
      // 监听页面滚动
      handleScroll(scrollTop) {
        // console.log('scrollTop', scrollTop)
        // 获取当前的滚动距离
        if (scrollTop < 0) {
          // 当滚动距离小于200时，计算导航透明度，可以考虑修改为每20增加0.1
          // this.opacity = (scrollTop / 200).toFixed(1);
          this.opacity = -scrollTop / 50
          this.navShow = true
          this.bottomPublishHidden = false
        } else {
          this.opacity = 0
          this.bottomPublishHidden = true
        }
      },
      onScroll(e) {
        // console.log('scrollTop', e.detail.deltaY)
        let query = uni.createSelectorQuery().in(this)
        query
          .select('#navView')
          .boundingClientRect((data) => {
            this.handleScroll(data.top)
          })
          .exec()
        //页面滚动暂停播放视频
        uni.$u.throttle(() => {
          this.$refs.voCircleDetail.pause()
        }, 500)
      },
      //滚到底部加载
      scrolltolower() {
        // uni.$u.throttle(() => {
        console.log('底部加载')
        if (this.commentList.length >= this.total) {
          return false
        }
        this.pageNo++
        this.getCommentList(false)
        // }, 2000)
      },
      backFn() {
        this.$backFn()
      },
      goAnswer() {
        // this.$u.toast('写回答')
        this.$linkToEasy('/pagesAgent/CreatedCenter/CreatedQuestion/ToAnswer?id=' + this.info.id)
      },
      editIdea() {
        this.$linkToEasy('/pagesAgent/CreatedCenter/ReleaseCircle/ReleaseIdea?id=' + this.info.id)
      },
      attentionFn() {
        this.$u.toast('点击了关注')
      },
      //去修改回答
      editAnswer() {
        this.$linkToEasy(
          '/pagesAgent/CreatedCenter/CreatedQuestion/ToAnswer?answerId=' + this.answerInfo.id,
        )
      },
      focusFn() {
        this.safeareaShow = false
      },
      blurFn() {
        this.safeareaShow = true
      },
      //获取评论列表
      getCommentList(isFresh) {
        if (isFresh) {
          this.commentList = []
          this.pageNo = 1
        }
        let params = {
          businessType: 4,
          contentId: this.optionsId,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        }
        if (this.userInfo && this.userInfo.id) {
          params.userId = this.userInfo.id
        }
        this.$VoHttp.apiCreateQuestionsCommentList(params).then((res) => {
          this.total = res.data.total
          this.commentList = this.commentList.concat(res.data.records)
          this.$refs.commentList.init(this.commentList, this.info)
        })
      },
      //回复评论
      toAnswerComment(item) {
        // console.log(item)
        this.$refs.commentInput.toFocus(item)
      },
      //评论成功刷新评论列表
      releaseCommentSuccess() {
        this.getCommentList(true)
      },
      //评论举报
      showActionPop(obj) {
        this.showAction = true
        this.reportData = obj
      },
      actionSelect(e) {
        if (e.name === '举报作者') {
          showLoading()
          setTimeout(() => {
            hideLoading()
            this.$u.toast('举报成功')
          }, 1500)
          return
        }
        if (e.name === '拉黑用户') {
          showLoading()
          setTimeout(() => {
            hideLoading()
            this.$u.toast('拉黑成功')
          }, 1000)
          return
        }
        if (e.name === '举报内容') {
          this.$linkToEasy(
            '/pagesAgent/CreatedCenter/AnswerAll/CircleReport?data=' +
              JSON.stringify(this.reportData) +
              '&page=comment',
          )
          return
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .wrap {
    background-color: #ffffff;
    width: 750rpx;
    height: 100vh;
    overflow: hidden;
    // padding-bottom: 236rpx;
    box-sizing: border-box;
    .flex-top {
      flex: 1;
      position: relative;
      overflow-y: scroll;
    }

    &-back {
      background-color: #ffffff;
      padding: 12rpx 0rpx 12rpx 32rpx;
    }
    &-search {
      font-weight: 400;
    }

    &-comment__title {
      margin-top: 40rpx;
      margin-left: 32rpx;
      padding-bottom: 24rpx;
      font-size: 36rpx;
      color: #000000;
    }
    &-bottom {
      // position: fixed;
      // left: 0;
      // bottom: 0;
      width: 100%;
    }
    //.publish {
    //  background-color: #ffffff;
    //  width: calc(100% - 64rpx);
    //  margin: 0rpx 32rpx 40rpx 32rpx;
    //  box-shadow: 0rpx 4rpx 16rpx rgba(34, 40, 75, 0.15);
    //  border-radius: 14rpx;
    //  height: 98rpx;
    //  line-height: 98rpx;
    //  position: fixed;
    //  bottom: 150rpx;
    //  z-index: 99;
    //
    //  &-icon {
    //    padding-right: 16rpx;
    //  }
    //  &-title {
    //    color: #155bd4;
    //    font-size: 28rpx;
    //  }
    //}
  }
  .p-b-safe-area {
    background-color: #ffffff;
  }
</style>
