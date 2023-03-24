<template>
  <!-- 回答列表 -->
  <view class="answer flex flex-column">
    <!-- <view :style="statusBarStyle" class="nav-block" /> -->
    <scroll-view
      class="flex1 overflow-y"
      scroll-y="true"
      @scroll="onScroll"
      @scrolltolower="scrolltolower"
    >
      <!--   渐变导航-->
      <view v-if="opacity" :style="{ opacity: opacity }" class="answer-nav">
        <view :style="statusBarStyle" class="nav-block" />
        <view class="flex answer-nav__view flex-vertical-c">
          <view class="answer-back flex flex-vertical-c" @click="backFn">
            <VoIcon class="opacity" color="#000000" name="nav-back" />
          </view>
          <view class="flex1 title">{{ questionInfo.title }}</view>
          <VoIcon class="opacity" color="#000000" name="more" @click="$refs.voNav.iconFn()" />
        </view>
      </view>
      <!-- 默认导航栏 -->
      <VoNav ref="voNav" :left-width="64" :right-width="0" is-fixed>
        <view slot="title">
          <VoSearch
            v-model.trim="keyword"
            :actionStyle="{
              height: 'initial',
              color: '#FF5319',
            }"
            class="answer-search"
            height="34"
            placeholder="请输入关键字搜索"
            @custom="goResult"
            @search="goResult"
          />
        </view>
      </VoNav>
      <view class="answer-top">
        <view v-if="questionInfo.columnName" class="mid-tags">
          <view class="mid-tags__tag">#{{ questionInfo.columnName }}</view>
        </view>
        <view class="flex">
          <VoIcon class="answer-top__image" name="w-tag" />
          <view v-if="questionInfo.title && !questionInfo.audio" class="answer-top__title flex1">
            {{ questionInfo.title }}
          </view>
          <VoAudioVoice v-if="questionInfo.audio" ref="VoAudioVoice" :info="questionInfo" />
        </view>
        <view v-show="unfold">
          <view class="answer-top__content">
            <!-- <text class="content-tag">[共创项目：三离合变速器] </text> -->
            {{ questionInfo.content }}
          </view>
          <!--    视频-->
          <view v-if="questionInfo.video && questionInfo.video.length">
            <view class="detail-video" @click="playClick">
              <image :src="questionInfo.image[0]" class="detail-video__image" mode="aspectFit" />
              <image
                class="detail-video__paly"
                src="/static/created/circle/circle_video_play.png"
              />
            </view>
            <!--            <video-->
            <!--              v-if="isShowVideo"-->
            <!--              id="myVideo"-->
            <!--              :autoplay="true"-->
            <!--              :src="questionInfo.video[0]"-->
            <!--              class="detail-video"-->
            <!--              @ended="eventHandle"-->
            <!--            ></video>-->
          </view>
          <!--   图片  -->
          <view
            v-if="questionInfo.image && (!questionInfo.video || !questionInfo.video.length)"
            class="detail-photos"
          >
            <view
              v-for="(img, imgIndex) of questionInfo.image"
              :key="img"
              class="image-box"
              @click="priviewImg(imgIndex)"
            >
              <image :src="img" class="image-box__img" />
            </view>
          </view>
        </view>

        <view class="answer-top__row flex flex-vertical-c flex-justify-between">
          <view class="flex flex-vertical-c">
            <!--修改bug号：6667-->
            <!--<view class="question margin-right"> 分享</view>-->
            <view
              v-show="questionInfo.businessType && questionInfo.businessType !== 0"
              class="question margin-right"
              >{{ questionInfo.commentNum }} 评论</view
            >
            <view class="question">
              <block v-if="questionInfo.likeNum">
                <block v-if="questionInfo.likeNum >= 100000"> 10w+ </block>
                <block v-else-if="questionInfo.likeNum >= 10000">
                  {{ parseInt((questionInfo.likeNum / 10000) * 10) / 10 }}w
                </block>
                <block v-else-if="questionInfo.likeNum >= 1000">
                  {{ (questionInfo.likeNum / 1000).toFixed(1) }}k
                </block>
                <block v-else>{{ questionInfo.likeNum }}</block>
              </block>
              <block v-else>0</block>
              点赞
            </view>
          </view>
          <view v-if="unfold === false" class="flex flex-vertical-c" @click="unfoldFn">
            <view class="question m-r-8">展开</view>
            <VoIcon :opacity="0.45" :size="12" color="#000000" name="open-arrow-b" />
          </view>
          <view v-else class="flex flex-vertical-c" @click="packUp">
            <view class="question m-r-8">收起</view>
            <VoIcon :opacity="0.45" :size="12" color="#000000" name="close-arrow-t" />
          </view>
        </view>
      </view>
      <view id="navTop" />
      <!--      <view class="flex answer-info">-->
      <!--        <view class="flex1 flex flex-column flex-vertical-c">-->
      <!--          <VoIcon-->
      <!--            v-if="isCollect"-->
      <!--            :size="20"-->
      <!--            color="#FF9B05"-->
      <!--            name="star"-->
      <!--            @click="collectCancel()"-->
      <!--          />-->
      <!--          <VoIcon v-else :opacity="0.45" :size="20" name="collect-none" @click="collect()" />-->
      <!--          <view class="answer-info__word">收藏</view>-->
      <!--        </view>-->
      <!--        <view-->
      <!--          v-if="userinfo.id === questionInfo.userId"-->
      <!--          class="flex1 flex flex-column flex-vertical-c"-->
      <!--          @click="editQuestion"-->
      <!--        >-->
      <!--          <VoIcon :opacity="0.45" :size="20" name="edit" />-->
      <!--          <view class="answer-info__word">修改问题</view>-->
      <!--        </view>-->
      <!--        <view class="flex1 flex flex-column flex-vertical-c" @click="toAnswerPage">-->
      <!--          <VoIcon :opacity="0.45" :size="20" name="edit" />-->
      <!--          <view class="answer-info__word">写回答</view>-->
      <!--        </view>-->
      <!--        <view class="flex1 flex flex-column flex-vertical-c" @click="showSharePop">-->
      <!--          <VoIcon :opacity="0.45" :size="20" color="#000" name="share" />-->
      <!--          <view class="answer-info__word">分享</view>-->
      <!--        </view>-->
      <!--      </view>-->
      <view class="answer-top__line" />
      <view class="answer-circle">
        <view class="answer-circle__word">全部回答</view>
        <!-- <VoCircleDetail class="m-t-20" :circleDetailData="circleText" @attentionFn="attentionFn" /> -->
        <view
          v-for="(dataObj, index) in ansList"
          :key="dataObj.id + index"
          class="ans-item"
          @click="toPage(dataObj)"
        >
          <view class="ans-item__top">
            <view class="user">
              <image
                :src="dataObj.photoUrl || '/static/default_avatar.png'"
                class="user-icon"
                mode="aspectFill"
              />
              <view class="user-info">
                <p class="user-info__name">{{ dataObj.userName || dataObj.userId }}</p>
                <p class="user-info__time">{{ dataObj.datetime }}</p>
              </view>
            </view>
          </view>
          <view class="ans-item__tip">
            <text class="tip-left">{{ dataObj.likeNum || 0 }} 人赞同该回答</text>
            <text>{{ dataObj.commentNum || 0 }} 评论 · {{ dataObj.createTime.split(' ')[0] }}</text>
          </view>
          <view class="ans-item__mid">
            <view v-if="dataObj.content" class="mid-content">
              <text class="mid-content__main">{{ dataObj.content.slice(0, 45) }}</text>
              <text v-if="dataObj.content.length > 45" class="link-text">
                <text>...</text>
                <text class="line">全文</text>
              </text>
            </view>
            <view v-if="dataObj.poster" class="poster">
              <image :src="dataObj.poster" class="poster-img" mode="aspectFill" />
              <image class="poster-icon" src="/static/icons/play.png" />
            </view>
            <view v-if="dataObj.image && !dataObj.poster" class="media-container">
              <view v-for="img in dataObj.image" :key="img" class="image-box">
                <image :src="img" class="media-container__img" mode="aspectFill" />
              </view>
            </view>

            <view v-if="dataObj.columnName" class="mid-tags">
              <view class="mid-tags__tag">#{{ dataObj.columnName }}</view>
            </view>
          </view>
        </view>
        <VoNoData v-if="!ansList.length" no-data-tips="还没有人对这个问题进行回答~" />
      </view>
    </scroll-view>
    <!--  v-if="questionInfo.id && opacity > 0"  -->
    <VoWriteAnswers
      v-if="questionInfo.id"
      :is-collect="isCollect"
      :is-like="isLike"
      :questionData="questionInfo"
      :type="type"
      class="answer-bottom"
      @cancelCollect="collectCancel"
      @collect="collect"
      @like="like"
      @likeCancel="likeCancel"
    />
    <!-- 分享弹框 -->
    <VoShareView ref="sharePop" @shareFn="shareFn" />
    <EraPreviewVideo ref="previewVideo" :videoSrc="videoSrc" autoplay />
    <view class="safearea-box" />
  </view>
</template>

<script>
  import VoWriteAnswers from './components/VoWriteAnswers'
  import helpUtil from '@/common/helper'
  import { storage } from '@/common/unifyGlobalReg'
  import devConf from '@/common/env'

  export default {
    components: { VoWriteAnswers },
    data() {
      return {
        questionInfo: '',
        unfold: true, // 展开的内容默认为true
        type: 1,
        statusBarStyle: {
          height: this.$systemInfo.statusBarHeight + 'px',
          backgroundColor: '#ffffff',
        },
        answerTitle: '最近问题有点多，库存周转不开,干着急最近问题有点多，库存周转不开。',
        opacity: 0,
        keyword: '',
        userinfo: '',
        isCollect: false,
        isLike: false,
        ansList: [],
        optionsId: '',
        // videoContext: '',
        // isShowVideo: false,
        videoSrc: '',

        pageNo: 1,
        pageSize: 10,
        scrollTop: 0,
        total: 0,
        refresh: true,
        showBottom: false,
      }
    },
    /**
     * 监听滚动
     * @param e
     */
    onPageScroll: function (e) {
      let query = uni.createSelectorQuery().in(this)
      query
        .select('#navTop')
        .boundingClientRect((data) => {
          this.handleScroll(data.top)
        })
        .exec()
    },
    onShow() {
      uni.$off('refresh')
      uni.$on('refresh', () => {
        this.getAnswerList()
        this.getDetail()
      })
    },
    onHide() {
      this.closeInnerAudioContext()
      this.$refs?.VoAudioVoice.stop()
    },
    onUnload() {
      this.closeInnerAudioContext()
      this.$refs?.VoAudioVoice.stop()
    },
    onLoad(options) {
      if (storage.get('userInfo')) {
        this.userinfo = storage.get('userInfo')
      }
      if (options.id) {
        this.optionsId = options.id
        this.getAnswerList()
        this.getDetail()
        // this.videoContext = uni.createVideoContext('myVideo')
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
      getDetail() {
        let param = {
          id: this.optionsId,
        }
        if (this.userInfo && this.userInfo.id) {
          param.userId = this.userInfo.id
        }
        this.$VoHttp.apiCreateQuestionsQuestion$Id(param).then((res) => {
          this.questionInfo = res.data
          //提取图片
          this.questionInfo.image = []
          this.questionInfo.fileUrl.replace(
            /<img [^>]*src=['"]([^'"]+)[^>]*>/g,
            (match, capture) => {
              this.questionInfo.image.push(capture)
            },
          )
          //提取视频
          this.questionInfo.video = []
          this.questionInfo.fileUrl.replace(
            /<video [^>]*src=['"]([^'"]+)[^>]*>/g,
            (match, capture) => {
              this.questionInfo.video.push(capture)
            },
          )
          helpUtil.regroupFileData(res.data)
          if (this.userinfo.id === this.questionInfo.userId) {
            this.type === 2
          } else {
            this.type === 1
          }
          this.isCollect = this.questionInfo.mySelfCollectNum === 1 ? true : false
          this.isLike = this.questionInfo.mySelfLikeNum === 1 ? true : false
          console.log('this.questionInfo', this.questionInfo)
        })
      },
      //富文本视频解析
      transferHtml(item) {
        let str = JSON.parse(item.comment).json
        console.log('富文本视频解析', str)
        // 匹配img自定义封面图标正则
        const reg2 = /<img.*?class="video-poster" data-custom=.*.mp4">/g
        // 匹配视频地址正则
        const video = /video=.*\.mp4/g
        const posterReg = /https:.*\.png/g
        // 进行img转 video
        const afterHtmlStr = str.replace(reg2, (val) => {
          // 取出data-custom值
          // const v = val.match(video)
          const poster = val.match(posterReg)
          console.log('poster', poster)
          item.poster = poster && poster.length ? poster[0] : ''

          // const vs = v[0].replace('video=https:', '')
          // return `<video controls src="${vs}" poster=${img} preload width="500" height="300"></video>`
        })
      },
      //获取富文本文字内容
      getText(str) {
        if (str) {
          return str.replace(/<[^<>]+>/g, '').replace(/&nbsp;/gi, '')
        }
      },
      // 监听页面滚动
      handleScroll(scrollTop) {
        console.log(scrollTop)
        // 获取当前的滚动距离
        if (scrollTop < 0) {
          // 当滚动距离小于200时，计算导航透明度，可以考虑修改为每20增加0.1
          // this.opacity = (scrollTop / 200).toFixed(1);
          this.opacity = -scrollTop / 10
        } else {
          this.opacity = 0
        }
      },
      backFn() {
        this.$backFn()
      },
      attentionFn() {
        this.$u.toast('点击了关注')
      },
      //跳转详情
      toPage(item) {
        this.$linkToEasy('/pagesAgent/CreatedCenter/CircleDetail/AnswerDetail?id=' + item.id)
      },
      /**
       * 点击展开
       */
      unfoldFn() {
        this.unfold = true
      },
      packUp() {
        this.unfold = false
      },
      //滚到底部加载
      scrolltolower() {
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.ansList.length >= this.total) {
            return false
          }
          this.pageNo++
          this.getAnswerList()
        }, 2000)
      },
      onScroll(e) {
        // console.log(111, e.detail)
        this.scrollTop = e.detail.scrollTop
        let query = uni.createSelectorQuery().in(this)
        query
          .select('#navTop')
          .boundingClientRect((data) => {
            this.handleScroll(data.top)
          })
          .exec()
      },
      //获取回答列表
      getAnswerList() {
        if (this.refresh) {
          this.pageNo = 1
          this.ansList = []
        }
        this.$VoHttp
          .apiCreateQuestionsAnswerList({
            businessType: 3,
            contentId: this.optionsId,
            pageNo: this.pageNo,
            pageSize: this.pageSize,
          })
          .then((res) => {
            this.total = res.data.total
            if (res.data && res.data.records) {
              let data = res.data.records.map((item) => {
                return {
                  ...item,
                  poster: '',
                }
              })
              data.forEach((item) => {
                item.datetime = this.$vocenApi.VoUtils.timeTransfer(item.createTime)
                //pc端写的回答不是富文本只有文字
                if (JSON.parse(item.comment).json) {
                  this.transferHtml(item)

                  //提取图片\视频
                  item.image = []
                  let str = JSON.parse(item.comment).json
                  item.content = str.indexOf('</p>') > -1 ? this.getText(str) : str
                  str.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, (match, capture) => {
                    item.image.push(capture)
                  })
                  //提取视频
                  item.video = false
                  if (str.indexOf('video=') > -1) {
                    item.poster = item.image[0]
                    item.video = true
                  }
                } else {
                  //pc端写的回答不是富文本只有文字直接取值即可
                  item.content = item.comment
                }
              })

              this.ansList = this.ansList.concat(data)
              console.log('this.ansList', this.ansList)
            }
          })
      },
      //获取回答列表
      getCommentList() {
        //   this.$VoHttp
        //     .apiCreateQuestionsCommentList({
        //       businessType: 4,
        //       contentId: item.id,
        //     })
        //     .then((res) => {
        //       this.commentList = res.data.records
        //       this.$refs.commentList.init(res.data.records)
        //     })
      },
      //收藏
      collect() {
        this.$VoHttp
          .apiCreateQuestionsQuestionCollect({
            contentId: this.questionInfo.id,
          })
          .then((res) => {
            if (+res.code === 20001) {
              this.$toast('收藏成功', 'success', '/static/icons/success_icon.png')
              this.isCollect = true

              this.questionInfo.collectionNum = this.questionInfo.collectionNum + 1
            } else {
              uni.$u.toast(res.message)
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '收藏失败')
          })
      },
      //取消收藏
      collectCancel() {
        this.$VoHttp
          .apiCreateQuestionsQuestionCancelCollect({
            contentId: this.questionInfo.id,
          })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('已取消收藏')
              this.isCollect = false
              this.questionInfo.collectionNum = this.questionInfo.collectionNum - 1
            } else {
              uni.$u.toast(res.message)
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('取消失败')
          })
      },
      //点赞
      like() {
        this.$VoHttp
          .apiCreateQuestionsQuestionLike({
            businessType: 0,
            contentId: this.questionInfo.id,
          })
          .then((res) => {
            if (+res.code === 20001) {
              this.$toast('点赞成功', 'success', '/static/icons/success_icon.png')
              this.isLike = true
              this.questionInfo.likeNum = this.questionInfo.likeNum + 1
              uni.$emit('changeLikeFn', {
                likeNum: this.questionInfo.likeNum,
                contentId: this.questionInfo.id,
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
        this.$VoHttp
          .apiCreateQuestionsQuestionCancelLike({
            businessType: 0,
            contentId: this.questionInfo.id,
          })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('已取消点赞')
              this.isLike = false
              this.questionInfo.likeNum = this.questionInfo.likeNum - 1

              uni.$emit('changeLikeFn', {
                likeNum: this.questionInfo.likeNum,
                contentId: this.questionInfo.id,
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
      //写回答
      toAnswerPage() {
        this.$linkToEasy(
          '/pagesAgent/CreatedCenter/CreatedQuestion/ToAnswer?id=' + this.questionInfo.id,
        )
      },
      //分享
      showSharePop() {
        this.$refs.sharePop.showShare(true)
      },
      //分享
      shareFn(type) {
        console.log('shareFn', type)
        console.log('this.questionInfo', this.questionInfo)
        this.$refs.sharePop.cancle()
        let path = '/pagesAgent/CreatedCenter/AnswerAll/NonAuthorAnswer?id=' + this.optionsId
        let image = ''
        if (this.questionInfo.image && this.questionInfo.image.length) {
          image = this.questionInfo.image[0]
        }
        helpUtil
          .shareWeixin({
            scene: type,
            title: this.questionInfo.title,
            path: devConf.shareBaseUrl + path,
            imageUrl: image,
          })
          .then((res) => {
            console.log('res分享', res)
          })
          .catch((err) => {
            console.log('shareWeixinErr', err)
          })
      },
      // 编辑
      editQuestion() {
        this.$linkToEasy(
          '/pagesAgent/CreatedCenter/ReleaseCircle/ReleaseQuestion?id=' + this.questionInfo.id,
        )
      },
      /*
       * 预览图片
       */
      priviewImg(index) {
        uni.previewImage({
          urls: this.questionInfo.image,
          current: index,
        })
      },
      playClick() {
        // this.isShowVideo = true
        this.videoSrc = this.questionInfo.video[0]
        this.$refs.previewVideo.show(this.videoSrc)
      },
      // video播放结束
      eventHandle() {
        // this.isShowVideo = false
      },
      // 暂停video
      pause() {
        this.videoContext.pause()
        this.isShowVideo = false
      },
    },
  }
</script>

<style lang="scss" scope>
  .answer {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    box-sizing: border-box;
    background: $v-bg-white;
    &-icon {
      margin-top: 12rpx;
    }
    &-nav {
      position: fixed;
      top: 0;
      left: 0;
      background-color: #ffffff;
      width: 750rpx;
      box-sizing: border-box;
      z-index: 99;
      padding: 20rpx 32rpx;

      &__view {
        width: 100%;
        .title {
          //height: 88rpx;
          //line-height: 88rpx;
          flex: 1;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          font-size: 36rpx;
          color: #000000;
          padding-right: 140rpx;
          margin-left: 14rpx;
          font-weight: bold;
        }
        .icon {
          width: 32rpx;
          height: 32rpx;
          padding-right: 16rpx;
        }
        .text {
          color: #155bd4;
          font-size: 28rpx;
          text-align: center;
        }
      }
    }
    .mid-tags {
      padding: 16rpx 0;
      display: flex;
      // border-bottom: 1px solid #f7f7f8;
      &__tag {
        background: #f7f7f8;
        border-radius: 24rpx;
        font-size: 24rpx;
        line-height: 1.5;
        color: $v-c0-45;
        padding: 0 16rpx;
        margin-right: 8rpx;
      }
    }
    &-back {
      background-color: #ffffff;
      //padding: 12rpx 0rpx 12rpx 32rpx;
    }
    &-search {
      padding: 12rpx 0 12rpx 0;
      box-sizing: border-box;
      background: #fff;
      font-weight: 400;
    }
    &-top {
      padding: 0 32rpx 0rpx 32rpx;

      &__image {
        margin-top: 6rpx;
        padding-right: 2rpx;
      }

      &__title {
        // height: 108rpx;
        line-height: 54rpx;
        color: rgba(0, 0, 0, 0.85);
        font-size: 36rpx;
        font-weight: bold;
        word-break: break-all;
        //text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        //-webkit-line-clamp: 2; /* 这里是超出几行省略 */
        //overflow: hidden;
      }
      &__content {
        margin-top: 24rpx;
        font-size: 28rpx;
        box-sizing: border-box;
        color: rgba(0, 0, 0, 0.65);
        line-height: 42rpx;
        .content-tag {
          color: #155bd4;
        }
      }
      &__line {
        height: 16rpx;
        background-color: $v-btn-disabled;
      }
      &__row {
        margin-top: 24rpx;
        margin-bottom: 30rpx;
        .question {
          height: 36rpx;
          line-height: 36rpx;
          font-size: 24rpx;
          color: $v-c0-45;
        }
        .margin-right {
          margin-right: 32rpx;
        }
      }
    }
    &-info {
      padding: 24rpx 0;
      &__word {
        height: 40rpx;
        line-height: 40rpx;
        font-size: 26rpx;
        color: $v-c0-65;
        margin-top: 8rpx;
      }
    }
    &-circle {
      &__word {
        padding-top: 16rpx;
        padding-left: 32rpx;
        height: 42rpx;
        line-height: 42rpx;
        color: #000000;
        font-size: 28rpx;
        font-weight: bold;
      }
    }
    .ans-item {
      width: 750rpx;
      background: #fff;
      padding: 40rpx 32rpx 0 32rpx;
      box-sizing: border-box;
      &__top {
        display: flex;
        flex-direction: row;
        padding-top: 14rpx;
        padding-bottom: 8rpx;
        .user {
          flex: 1;
          line-height: 1.5;
          display: flex;
          &-icon {
            width: 48rpx;
            height: 48rpx;
          }
          &-info {
            padding-left: 8rpx;
            &__name {
              font-size: 28rpx;
              color: $v-c0-85;
            }
            &__time {
              font-size: 20rpx;
              line-height: 1.5;
              color: $v-c0-45;
            }
          }
        }
      }
      &__mid {
        padding-bottom: 32rpx;
        width: 100%;
        border-bottom: 1px solid #f0f0f0;
        .mid-content {
          font-size: 28rpx;
          color: $v-c0-45;
          line-height: 1.5;
          overflow: hidden;
          position: relative;
          word-break: break-all;
          white-space: normal;
          &__link {
            color: #155bd4;
          }
          &__icon {
            display: inline-block;
            margin-right: 8rpx;
            line-height: 1;
          }
          &__main {
            vertical-align: top;
          }

          &.expand {
            max-height: none;
            height: auto;
          }

          .link-text {
            vertical-align: top;
            &.right {
              position: absolute;
              right: 0;
              bottom: 0;
              z-index: 100;
              background: #fff;
            }
            .line {
              color: #155bd4;
            }
          }
        }
        .media-container {
          width: 100%;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          box-sizing: border-box;
          .image-box {
            width: 33.33%;
            height: 210rpx;
            padding-right: 8rpx;
            padding-top: 8rpx;
            box-sizing: border-box;

            &:nth-child(3n + 3) {
              padding-right: 0;
            }
          }
          .media-container__img {
            width: 100%;
            height: 100%;
            border-radius: 8rpx;
          }
        }
        .poster {
          position: relative;
          &-img {
            height: 364rpx;
            width: 100%;
            border-radius: 16rpx;
          }
          &-icon {
            width: 110rpx;
            height: 110rpx;
            position: absolute;
            right: calc(50% - 56rpx);
            top: calc(50% - 56rpx);
          }
        }
      }
      &__tip {
        color: rgba(0, 0, 0, 0.45);
        font-size: 24rpx;
        line-height: 1.5;
        padding-bottom: 16rpx;
        .tip-left {
          padding-right: 16rpx;
        }
      }
    }
    .detail-video {
      position: relative;
      margin-top: 16rpx;
      height: 384rpx;
      max-height: 384rpx;
      width: 686rpx;
      display: inline-block;
      border-radius: 16rpx;
      background-color: #000;
      &__image {
        height: 384rpx;
        width: 686rpx;
        border-radius: 16rpx;
      }

      &__paly {
        position: absolute;
        height: 110rpx;
        width: 110rpx;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
      }
    }

    .detail-photos {
      margin-top: 16rpx;
      // height: 100%;
      width: 686rpx;
      box-sizing: border-box;

      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .image-box {
        width: 33.33%;
        height: 210rpx;
        padding-right: 8rpx;
        padding-top: 8rpx;
        box-sizing: border-box;

        &:nth-child(3n + 3) {
          padding-right: 0;
        }
        &__img {
          width: 100%;
          height: 100%;
          border-radius: 8rpx;
        }
      }
    }
  }
  .opacity {
    opacity: 0.45 !important;
  }
</style>
