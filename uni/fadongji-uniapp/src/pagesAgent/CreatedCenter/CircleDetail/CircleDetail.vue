<template>
  <view>
    <view class="wrap flex flex-column">
      <!-- <view :style="statusBarStyle" class="nav-block" /> -->
      <scroll-view
        :scroll-y="true"
        class="flex-top"
        @scroll="onScroll"
        @scrolltolower="scrolltolower"
      >
        <!--   渐变导航 :title="info.businessType === 1 ? info.content : info.title"-->
        <CircleGradualNav
          :icon="info.photoUrl || '/static/default_avatar.png'"
          :is-attention-hidden="false"
          :is-big-v-hidden="false"
          :nav-show="navShow"
          :style="{ opacity: opacity }"
          :title="info.title || info.content"
          @attentionFn="attentionFn"
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
          v-if="info.id && info.businessType !== 1"
          :dataObj="info"
          :isEditHidden="false"
          @editAnswer="editAnswer"
          @goAnswer="goAnswer"
        />
        <view id="navView" />
        <!--  文字详情-->
        <!--  <VoCircleDetail class="m-t-20" :circleDetailData="circleText" circelType="CircleText" @attentionFn="attentionFn" />-->
        <!--  详情-->
        <VoCircleDetail
          v-if="info.id"
          ref="voCircleDetail"
          :circleDetailData="info"
          :isAuthor="isAuthor"
          :isShowAttention="false"
          class="m-t-20"
          @attentionFn="attentionFn"
          @update="updateFn"
        />
        <view v-if="commentList.length" class="wrap-comment__title">评论</view>
        <CommentList
          ref="commentList"
          :parentData="info"
          @showActionPop="showActionPop"
          @toAnswer="toAnswerComment"
        />
        <!-- <VoCommentOne :bigV="true" :content="contentOne" :author="true" :twoLevel="true" />
              <VoCommentOne :bigV="true" :content="contentOne" />
              <VoCommentOne :bigV="true" :content="contentOne" />
              <VoCommentOne :bigV="true" :content="contentOne" /> -->

        <!--        <view class="wrap-bottom">  ENG-2771-->
        <!--          &lt;!&ndash; 底部写回答悬浮框 &ndash;&gt;-->
        <!--          &lt;!&ndash; 回答详情显示 &ndash;&gt;-->
        <!--          <CircleBottomPublishView-->
        <!--            v-if="!bottomPublishHidden && info.id && info.businessType !== 1"-->
        <!--            :info="info"-->
        <!--            :isAuthor="isAuthor"-->
        <!--            @editAnswer="editAnswer"-->
        <!--            @goAnswer="goAnswer"-->
        <!--          />-->
        <!--          &lt;!&ndash; 想法详情展示  &ndash;&gt;-->
        <!--          <view-->
        <!--            v-if="isAuthor && info.businessType === 1 && !bottomPublishHidden"-->
        <!--            class="publish flex flex1 flex-vertical-c flex-justify-c"-->
        <!--            @click="editIdea"-->
        <!--          >-->
        <!--            <VoIcon :size="24" class="publish-icon" color="#155BD4" name="edit" />-->
        <!--            <view class="publish-title">修改想法</view>-->
        <!--          </view>-->
        <!--        </view>-->
      </scroll-view>

      <!-- 评论输入框 -->
      <CommentInput
        v-if="info.id && origin != 'master' && showReview"
        ref="commentInput"
        :dataObj="info"
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
      @close="closeFn"
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
  import helpUtil from '@/common/helper'
  import { storage } from '@/common/unifyGlobalReg'
  import { hideLoading, showLoading } from '../../../common/helper'

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
        showReview: true,
        platformCode: '',
        info: '',
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
        userIcon: '/static/created/circle/circle_user_icon.png',
        collectNum: '22',
        shareNum: '44',
        contentOne: '',
        commentList: [],
        userinfo: {},
        optionsId: '',
        isAuthor: false, //是否是作者
        // 评论分页
        pageNo: 1,
        pageSize: 10,
        total: 0,

        origin: '',
      }
    },
    onPageScroll: function (e) {
      // let query = uni.createSelectorQuery().in(this)
      // query
      //   .select('#navTop')
      //   .boundingClientRect((data) => {
      //     console.log('#navTop', data)
      //     this.handleScroll(data.top)
      //   })
      //   .exec()
    },
    onLoad(options) {
      //master大咖说
      this.origin = options.origin || ''
      if (options.platformCode) {
        this.platformCode = options.platformCode
      }
      if (storage.get('userInfo')) {
        this.userinfo = storage.get('userInfo')
        console.log('this.userinfo===', this.userinfo)
      }
      uni.$off('refresh')
      uni.$on('refresh', () => {
        this.getDetail(options)
      })
      this.getDetail(options)
    },
    methods: {
      getDetail(options) {
        if (options.id) {
          this.optionsId = options.id
          let api = ''
          let param = {
            id: options.id,
          }
          if (options.businessType === '3') {
            api = 'apiCreateQuestionsAnswer$Id'
          } else {
            api = 'apiCreateQuestionsQuestion$Id'
          }

          if (this.platformCode) {
            param.platformCode = this.platformCode
          }
          if (this.userInfo && this.userInfo.id) {
            param.userId = this.userInfo.id
          }

          this.$VoHttp[api](param).then((res) => {
            this.info = res.data
            if (this.info.userId === this.userinfo.id) {
              this.isAuthor = true
            }
            if (this.info.businessType === 3) {
              this.transferHtml(this.info)
              this.info.title = this.info.communityContentVO.title
              this.info.content = this.getText(this.info.transferHtml)

              //提取图片
              this.info.image = []
              JSON.parse(this.info.fileUrl).json.replace(
                /<img [^>]*src=['"]([^'"]+)[^>]*>/g,
                (match, capture) => {
                  this.info.image.push(capture)
                },
              )
              //提取视频
              this.info.video = []
              JSON.parse(this.info.fileUrl).json.replace(
                /<video [^>]*src=['"]([^'"]+)[^>]*>/g,
                (match, capture) => {
                  this.info.video.push(capture)
                },
              )
            } else {
              helpUtil.regroupFileData(this.info)
            }
            console.log('asd')
            console.log(this.info)
            console.log('zxc')
          })
          this.getCommentList(true)
        }
      },
      closeFn() {
        this.showAction = false
        this.showReview = true
      },
      updateFn(val) {
        this.showReview = !val
      },
      /**
       * 搜索
       */
      goResult() {
        if (this.keyword) {
          this.$storage.set('searchCreate', this.keyword)
          uni.$emit('searchCreate', this.keyword)
          this.$backFn()
        }
      },
      //富文本视频解析
      transferHtml(item) {
        let str = JSON.parse(item.fileUrl).json
        // 匹配img自定义封面图标正则
        const reg2 = /<img.*?data-custom=.*.mp4">/g

        // 匹配视频地址正则
        const video = /video=.*\.mp4/g
        // 进行img转 video
        const afterHtmlStr = str.replace(reg2, (val) => {
          // 取出data-custom值
          const v = val.match(video)
          const vs = v[0].replace('video=https:', '')
          return `<video controls src="${vs}" preload width="500" height="300"></video>`
        })
        item.transferHtml = afterHtmlStr
      },
      //获取富文本文字内容
      getText(str) {
        return str.replace(/<[^<>]+>/g, '').replace(/&nbsp;/gi, '')
      },
      // 监听页面滚动
      handleScroll(scrollTop) {
        console.log('scrollTop', scrollTop)
        // 获取当前的滚动距离
        if (scrollTop < 0) {
          // 当滚动距离小于200时，计算导航透明度，可以考虑修改为每20增加0.1
          // this.opacity = (scrollTop / 200).toFixed(1);
          this.opacity = -scrollTop / 50
          this.navShow = true
          this.bottomPublishHidden = false
        } else {
          this.opacity = 0
          this.navShow = false
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
        console.log('asd')
        console.log('底部加载')
        if (this.commentList.length >= this.total) {
          // uni.$u.toast('没有更多了')
          return false
        }
        this.pageNo++
        this.getCommentList(false)
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
      editAnswer() {
        this.$u.toast('编辑问题')
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
        this.showReview = false
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
    &-search {
      font-weight: 400;
    }
    .flex-top {
      flex: 1;
      position: relative;
      overflow-y: scroll;
    }

    &-back {
      background-color: #ffffff;
      padding: 12rpx 0rpx 12rpx 32rpx;
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
    .publish {
      background-color: #ffffff;
      width: calc(100% - 64rpx);
      margin: 0rpx 32rpx 0 32rpx;
      box-shadow: 0rpx 4rpx 16rpx rgba(34, 40, 75, 0.15);
      border-radius: 14rpx;
      height: 98rpx;
      line-height: 98rpx;
      position: fixed;
      bottom: 150rpx;
      z-index: 99;

      &-icon {
        padding-right: 16rpx;
      }
      &-title {
        color: #155bd4;
        font-size: 28rpx;
      }
    }
  }
  .p-b-safe-area {
    background-color: #ffffff;
  }
</style>
