<template>
  <view class="ques-item">
    <view class="ques-item__top">
      <view class="user">
        <view class="relative">
          <image
            :src="dataObj.photoUrl || '/static/default_avatar.png'"
            class="common-icon user-img"
          />
          <!-- 认证通过展示大v标识4已认证 -->
          <VoIcon v-if="Number(dataObj.checkStatus) === 4" :size="8" class="v-img" name="v-icon" />
        </view>
        <view class="user-info">
          <p class="user-info__name">
            {{ dataObj.nickName || '未知' }}
          </p>
          <p class="user-info__time">
            <text>{{ dataObj.datetime }}</text>
            <text class="p-l-8 p-r-8">·</text>
            <text>{{
              dataObj.businessType === 0
                ? '提出了问题'
                : dataObj.businessType === 3
                ? '回答了问题'
                : '发表了想法'
            }}</text>
          </p>
        </view>
      </view>
      <!-- <view class="top-btn" @click.stop="toAnswerPage" v-if="dataObj.businessType === 0">
        <VoIcon name="edit" :size="24" color="#155BD4" />
        <text>写回答</text>
      </view> -->
      <view v-show="dataObj.userId !== userInfo.id" class="top-icon" @click.stop="showActionPop()">
        <VoIcon :opacity="0.45" :size="24" class="icon1" color="#000000" name="more" />
      </view>
    </view>
    <view class="ques-item__mid" @click="click">
      <view v-if="dataObj.businessType !== 2" class="mid-title">
        <VoIcon
          v-if="dataObj.title || dataObj.audio"
          :name="dataObj.businessType === 1 ? 'x-tag' : 'w-tag'"
          :size="24"
          class="mid-title__icon"
        />
        <view v-if="dataObj.title && !dataObj.audio" class="title-text">
          {{ dataObj.title }}
        </view>
        <view v-if="dataObj.audio" class="audio-wrap" @click.stop="audioPlayStart(dataObj)">
          <view class="audio-wrap__icon">
            <VoIcon name="voice" />
            <view class="timer">{{ dataObj.duration + 'S' }}</view>
          </view>
          <video
            id="myVideo"
            ref="video"
            :src="$getDomain(dataObj.audio[0]) + '&type=4'"
            class="hidden"
            @loadedmetadata="loadedmetadata"
          ></video>
        </view>
      </view>
      <view v-if="dataObj.content" class="mid-content">
        <!--        <span class="mid-content__link">[共创项目：三离合变速器] </span>-->
        <VoIcon
          v-if="dataObj.businessType === 1 && !dataObj.audio"
          :size="24"
          class="mid-content__icon"
          name="x-tag"
        />
        <text class="mid-content__main">{{ dataObj.content.slice(0, 60) }}</text>
        <text v-show="dataObj.content.length > 60" class="link-text">
          <text>...</text>
          <text class="line">全文</text>
        </text>
      </view>
      <view v-if="dataObj.image && !dataObj.video && !dataObj.poster" class="media-container">
        <view v-for="img in dataObj.image" :key="img" class="image-box">
          <image :src="$getDomain(img)" class="media-container__img" />
        </view>
      </view>
      <view v-if="dataObj.video || dataObj.poster" class="poster">
        <image
          :src="dataObj.poster || (dataObj.image ? $getDomain(dataObj.image[0]) : '')"
          class="poster-img"
        />
        <image class="poster-icon" src="/static/icons/play.png" />
      </view>

      <view v-if="dataObj.columnName" class="mid-tags">
        <view class="mid-tags__tag">#{{ dataObj.columnName }}</view>
      </view>
    </view>
    <view v-if="dataObj.businessType === 0" class="ques-desc">
      <text class="ques-desc__text">{{ dataObj.answerNum || 0 }}回答</text>
      <text>{{ dataObj.lookNum || 0 }}阅读</text>
      <view class="ques-desc__right">
        <view v-if="isMySelf.status" class="right-btn" @click.stop="editQuestion"> 修改问题 </view>
        <view v-else class="right-btn" @click.stop="toAnswerPage"> 写回答 </view>
      </view>
    </view>
    <view v-else class="ques-item__btm">
      <view class="icon-btn" @click.stop="showShare()">
        <VoIcon :opacity="0.45" :size="24" color="#000000" name="share" />
        <view class="icon-btn__name">分享</view>
      </view>
      <view class="icon-btn" @click.stop="commentClick()">
        <VoIcon :opacity="0.45" :size="24" color="#000000" name="commit" />
        <view class="icon-btn__name">
          评论
          <text class="name-num">{{ dataObj.commentNum || '' }}</text>
        </view>
      </view>
      <view class="icon-btn" @click.stop="giveOperation()">
        <VoIcon v-if="isGiveLike" :size="24" color="#E50012" name="heard-like" />
        <VoIcon v-else :opacity="0.45" :size="24" color="#000000" name="heart-b" />

        <view class="icon-btn__name">
          点赞
          <text class="name-num">{{ likeNum || '' }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    components: {},
    inject: {
      isMySelf: {
        type: Object,
        default() {
          return { status: false }
        },
      },
    },
    props: {
      dataObj: {
        type: Object,
        default() {
          return {}
        },
      },
    },
    data() {
      return {
        isExpand: false,
        current: {
          poster: '',
          name: '',
          author: '',
          src: '/static/video/test.mp3',
        },
        audioAction: {
          method: 'pause',
        },
        playshow: false, //播放的图片
        stipshow: true, //暂停的图片
        lock: false, // 锁
        // status: 1, // 1暂停 2播放
        // videoContext: '',
        duration: 0, //语音秒数

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
        datetime: '',
        isGiveLike: this.dataObj.mySelfLikeNum === 1 ? true : false,
        likeNum: this.dataObj.likeNum || 0,
      }
    },
    computed: {
      // overTimer() {
      //   return this.calcTimer(this.duration)
      // },
    },
    watch: {
      isMySelf: {
        handler(val) {
          console.log(val)
        },
        deep: true,
        immediate: true,
      },
    },
    created() {
      //给video创建一个动态的id
      // this.videoContext = uni.createVideoContext('myVideo')
    },
    mounted() {
      //时间转换
      // if (this.dataObj.createTime) {
      //   // let timestamp = new Date(this.dataObj.createTime).getTime()
      //   this.datetime = this.$vocenApi.VoUtils.timeTransfer(this.dataObj.createTime)
      // }
    },
    methods: {
      //评论点击事件
      commentClick() {
        //查看详情前调用此接口
        this.$VoHttp
          .apiCreateQuestionsQuestionView$Id({ id: this.dataObj.id })
          .then((res) => {
            console.log('点击查看')
          })
          .catch((err) => {
            console.log('err', err)
          })
        if (this.dataObj.businessType === 0) {
          //跳转到回答列表
          //问题、想法详情
          this.$linkToEasy(
            '/pagesAgent/CreatedCenter/CircleDetail/CircleDetail?id=' +
              this.dataObj.id +
              '&businessType=' +
              this.dataObj.businessType,
          )
        } else if (this.dataObj.businessType === 3) {
          //跳转到回答详情
          this.$linkToEasy(
            '/pagesAgent/CreatedCenter/CircleDetail/AnswerDetail?id=' +
              this.dataObj.id +
              '&businessType=' +
              this.dataObj.businessType,
          )
        } else {
          //想法详情
          this.$linkToEasy(
            '/pagesAgent/CreatedCenter/CircleDetail/CircleDetail?id=' +
              this.dataObj.id +
              '&businessType=' +
              this.dataObj.businessType,
          )
        }
      },
      toHomePage() {
        this.$linkToEasy(
          `/pagesAgent/PersonalHomepage/PersonalHomepage?userId=${this.dataObj.userId}&platformCode=recycling`,
        )
      },
      //列表点击
      click() {
        this.$emit('click')
      },
      //富文本视频解析
      transferHtml() {
        // 匹配img自定义封面图标正则
        const reg2 = /<img.*?data-custom=.*.mp4">/g

        // 匹配视频地址正则
        const video = /video=.*\.mp4/g
        // 进行img转 video
        const afterHtmlStr = this.test.replace(reg2, (val) => {
          // 取出data-custom值
          const v = val.match(video)
          const vs = v[0].replace('video=https:', '')
          return `<video controls src="${vs}" preload width="500" height="300"></video>`
        })
        this.test = afterHtmlStr
      },
      //写回答
      toAnswerPage() {
        this.$linkToEasy('/pagesAgent/CreatedCenter/CreatedQuestion/ToAnswer?id=' + this.dataObj.id)
      },
      actionSelect(e) {
        console.log(e.name)
      },
      //举报
      showActionPop() {
        // this.showAction = true
        this.$emit('showMorePop')
      },
      //分享
      showShare() {
        // this.$refs.shareView.showShare(true)
        this.$emit('showShare', this.dataObj)
      },
      expand() {
        this.isExpand = !this.isExpand
      },
      audioPlayStart(val) {
        console.log(val)
        // if (this.status === 1) {
        //   this.play()
        // } else {
        //   this.stop()
        // }
        // this.$emit('playAudio', val.fileUrl)

        this.playInnerAudioContext(val.audio[0])
      },
      // 播放
      play() {
        this.stipshow = false
        this.playshow = true
        this.status = 2
        this.videoContext.play()
      },
      // 暂停
      stop() {
        this.stipshow = true
        this.playshow = false
        this.videoContext.pause()
        this.status = 1
      },
      // video加载完成
      loadedmetadata(data) {
        console.log('voiceduration', data.detail.duration)
        //获取语音秒数，取整
        this.duration = Math.trunc(data.detail.duration)
      },
      calcTimer(timer) {
        if (timer === 0 || typeof timer !== 'number') {
          return '00:00'
        }
        let mm = Math.floor(timer / 60)
        let ss = Math.floor(timer % 60)
        if (mm < 10) {
          mm = '0' + mm
        }
        if (ss < 10) {
          ss = '0' + ss
        }
        return mm + ':' + ss
      },
      giveOperation() {
        if (this.isGiveLike) {
          this.giveLikeCancel()
        } else {
          this.giveLike()
        }
      },
      //点赞
      giveLike() {
        this.$VoHttp
          .apiCreateQuestionsQuestionLike({
            businessType: this.dataObj.businessType,
            contentId: this.dataObj.id,
          })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('点赞成功')
              this.isGiveLike = true
              this.likeNum = this.likeNum + 1
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
      giveLikeCancel() {
        this.$VoHttp
          .apiCreateQuestionsQuestionCancelLike({
            businessType: this.dataObj.businessType,
            contentId: this.dataObj.id,
            userId: this.dataObj.userId,
          })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('取消成功')
              this.isGiveLike = false
              this.likeNum = this.likeNum - 1
            } else {
              uni.$u.toast(res.message)
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('取消失败')
          })
      },
      // 修改问题
      editQuestion() {
        this.$linkToEasy(
          '/pagesAgent/CreatedCenter/ReleaseCircle/ReleaseQuestion?id=' + this.dataObj.id,
        )
      },
    },
  }
</script>

<style lang="scss" scoped>
  .ques-item {
    width: 750rpx;
    background: #fff;
    padding: 0 32rpx;
    box-sizing: border-box;
    &__top {
      display: flex;
      flex-direction: row;
      padding-top: 14rpx;
      padding-bottom: 16rpx;
      .user {
        flex: 1;
        line-height: 1.5;
        display: flex;
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
        &-img {
          border-radius: 50%;
        }
        .v-img {
          position: absolute;
          right: 0;
          top: 0;
        }
      }
      .top-btn {
        font-size: 26rpx;
        line-height: 48rpx;
        color: $color-primary-yellow;
        display: flex;
        padding-right: 32rpx;
      }
    }
    &__mid {
      width: 100%;
      .mid-title {
        line-height: 1.5;
        font-size: 32rpx;
        color: $v-c0-85;
        font-weight: bold;
        display: flex;
        align-items: center;
        &__icon {
          margin-right: 8rpx;
          width: 52rpx;
          height: 52rpx;
        }
        .title-text {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .audio-wrap {
        flex: 1;
        background: #ffffff;
        box-shadow: 0px 2px 8px rgba(34, 40, 75, 0.15);
        border-radius: 8rpx;
        padding: 12rpx 22rpx;
        margin-right: 134rpx;
        margin-top: 8rpx;
        margin-bottom: 12rpx;
        &__icon {
          display: flex;

          .timer {
            flex: 1;
            font-weight: bold;
            font-size: 20rpx;
            line-height: 1.5;
            color: --color-primary;
            display: flex;
            align-items: center;
            justify-content: flex-end;
          }
        }
      }
      .mid-content {
        font-size: 28rpx;
        color: $v-c0-45;
        line-height: 1.5;
        overflow: hidden;
        position: relative;
        word-break: break-all;
        white-space: normal;
        // height: 126rpx;
        // text-align: justify;
        // display: -webkit-box;
        // -webkit-box-orient: vertical;
        // -webkit-line-clamp: 3;
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
    }
    &__btm {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80rpx;
      .icon-btn {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 26rpx;
        line-height: 1.5;
        color: $v-c0-45;
        .name-num {
          padding-left: 12rpx;
        }
      }
    }
    .ques-desc {
      font-size: 24rpx;
      line-height: 1.5;
      color: $v-c0-45;
      padding: 34rpx 0;
      display: flex;
      align-items: center;
      &__text {
        margin-right: 16rpx;
      }
      &__right {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        .right-btn {
          font-size: 24rpx;
          color: $color-primary-yellow;
          text-align: center;
          height: 56rpx;
          line-height: 54rpx;
          border: 1px solid $color-primary-yellow;
          padding: 0 26rpx;
          border-radius: 100px;
          display: inline-block;
        }
      }
    }
    .common-icon {
      width: 48rpx;
      height: 48rpx;
    }
    .hidden {
      display: none;
    }

    .poster {
      position: relative;
      &-img {
        height: 364rpx;
        width: 100%;
      }
      &-icon {
        width: 110rpx;
        height: 110rpx;
        position: absolute;
        right: calc(50% - 56rpx);
        top: calc(50% - 56rpx);
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
  }
</style>
