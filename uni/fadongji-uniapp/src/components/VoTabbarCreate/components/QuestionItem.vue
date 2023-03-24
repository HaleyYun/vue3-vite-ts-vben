<template>
  <view class="ques-item" @click="click">
    <view class="ques-item__top">
      <view v-if="showRadio">
        <view v-if="selectAll" @click.stop="selectCancel()">
          <VoIcon :size="28" class="radio" color="#FF5319" name="select-right" />
        </view>
        <view v-if="!isSelect" @click.stop="select()">
          <VoIcon :opacity="0.45" :size="28" class="radio" color="#000000" name="circle" />
        </view>
        <view v-else @click.stop="selectCancel()">
          <VoIcon :size="28" class="radio" color="#FF5319" name="select-right" />
        </view>
      </view>
      <view class="user" @click.stop="toUserHome()">
        <view class="user-ava">
          <image class="user-ava__frame" src="/static/icons/head.png" />
          <image
            :src="dataObj.photoUrl + '&type=2' || '/static/default_avatar.png'"
            class="user-ava__img common-icon"
            mode="aspectFill"
          />
          <!-- 认证通过展示大v标识4已认证 -->
          <VoIcon v-if="Number(dataObj.checkStatus) === 4" :size="8" class="v-img" name="v-icon" />
        </view>

        <view class="user-info m-t-16 flex1">
          <p class="user-info__name">{{ dataObj.nickName || dataObj.userId }}</p>
          <p class="user-info__time">{{ dataObj.datetime }}</p>
        </view>
      </view>
      <view v-if="dataObj.businessType === 0" class="top-btn m-t-20" @click.stop="toAnswerPage">
        <VoIcon :size="20" color="#0D66FF" name="edit" />
        <text class="fz-26 lh150 edit-blue m-l-4">写回答</text>
      </view>
      <view class="top-icon m-t-16" @click.stop="showActionPop()">
        <VoIcon :opacity="0.45" :size="24" class="icon1" color="#000000" name="more" />
      </view>
    </view>
    <view class="ques-item__mid">
      <view v-if="dataObj.businessType !== 2" class="mid-title">
        <!-- <image class="mid-title__icon" src="/static/icons/question.png" /> -->
        <VoIcon
          v-if="dataObj.title || dataObj.audio"
          :name="dataObj.businessType === 1 ? 'x-tag' : 'w-tag'"
          :size="24"
          class="mid-title__icon"
        />
        <view v-if="dataObj.title && !dataObj.audio" class="title-text">
          {{ dataObj.title }}
        </view>
        <view
          v-if="dataObj.audio && dataObj.audio.length"
          class="audio-wrap"
          @click.stop="audioPlayStart(dataObj.audio)"
        >
          <view class="audio-wrap__icon">
            <!-- <image
              class="common-icon"
              v-show="stipshow"
              src="/static/icons/stop.png"
              @click.stop="play()"
            />
            <image
              class="common-icon"
              v-show="playshow"
              src="/static/icons/play.png"
              @click.stop="stop()"
            /> -->
            <VoIcon name="voice" />
            <view class="timer">{{ dataObj.duration + 'S' }}</view>
          </view>
          <!--          <video-->
          <!--            id="myVideo"-->
          <!--            ref="video"-->
          <!--            :src="$getDomain(dataObj.audio[0]) + '&type=4'"-->
          <!--            class="hidden"-->
          <!--            @loadedmetadata="loadedmetadata"-->
          <!--          ></video>-->
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
        <text class="mid-content__main">{{ dataObj.content.slice(0, 66) }}</text>
        <text v-if="!isExpand && dataObj.content.length > 69" class="link-text">
          <text>...</text>
          <text class="line">全文</text>
        </text>
      </view>
      <view v-if="dataObj.image" class="media-container">
        <view v-for="img in dataObj.image" :key="img" class="image-box">
          <image :src="$getDomain(img)" class="media-container__img" mode="aspectFill" />
        </view>

        <!-- <EraAlbum
          v-if="dataObj.image.length > 1"
          :urls="dataObj.image"
          multipleSize="223rpx"
          singleSize="105"
          space="8rpx"
          :showMore="false"
        /> -->
      </view>
      <view v-else-if="(dataObj.video && dataObj.video.length) || dataObj.poster" class="poster">
        <image
          :src="dataObj.poster || (dataObj.image ? $getDomain(dataObj.image[0]) : '')"
          class="poster-img"
          mode="aspectFit"
        />
        <image class="poster-icon" mode="aspectFill" src="/static/icons/play.png" />
      </view>
      <view v-if="dataObj.columnName" class="mid-tags">
        <view class="mid-tags__tag">#{{ dataObj.columnName }}</view>
        <!-- <view class="mid-tags__tag">#离合器22</view> -->
      </view>
    </view>

    <!--问题 v2.0.1 取消评论入口-->
    <block v-if="dataObj.businessType === 0">
      <view class="ques-item__btm flex">
        <view class="icon-btn flex-justify-c flex1" @click.stop="showShare()">
          <VoIcon :opacity="0.45" :size="20" color="#000000" name="share" />
          <view class="icon-btn__name">分享</view>
        </view>
        <view class="icon-btn flex-justify-c flex1" @click.stop="giveOperation()">
          <VoIcon v-if="isGiveLike" :size="20" color="#F20014" name="solid-heart" />
          <VoIcon v-else :opacity="0.45" :size="20" color="#000000" name="hollow-heart" />

          <view class="icon-btn__name">
            点赞
            <block v-if="likeNum">
              <block v-if="likeNum >= 100000">
                <text class="name-num">10w+</text>
              </block>
              <block v-else-if="likeNum >= 10000">
                <text class="name-num">{{ parseInt((likeNum / 10000) * 10) / 10 }}w</text>
              </block>
              <block v-else-if="likeNum >= 1000">
                <text class="name-num">{{ (likeNum / 1000).toFixed(1) }}k</text>
              </block>
              <block v-else>
                <text class="name-num">{{ likeNum }}</text>
              </block>
            </block>
            <text v-else class="name-num" />
          </view>
        </view>
      </view>
    </block>
    <!--1 想法，2 视频， 3 回答,  5发现 -->
    <block v-else>
      <view class="ques-item__btm">
        <view class="icon-btn flex-justify-c m-l-24" @click.stop="showShare()">
          <VoIcon :opacity="0.45" :size="20" color="#000000" name="share" />
          <view class="icon-btn__name">分享</view>
        </view>
        <view class="icon-btn flex-justify-c flex1" @click.stop="commentClick()">
          <VoIcon :opacity="0.45" :size="20" color="#000000" name="comment-new" />
          <view class="icon-btn__name">
            评论
            <block v-if="dataObj.commentNum">
              <block v-if="dataObj.commentNum >= 100000">
                <text class="name-num">10w+</text>
              </block>
              <block v-else-if="dataObj.commentNum >= 10000">
                <text class="name-num">{{ (dataObj.commentNum / 10000).toFixed(1) }}w</text>
              </block>
              <block v-else-if="dataObj.commentNum >= 1000">
                <text class="name-num">{{ (dataObj.commentNum / 1000).toFixed(1) }}k</text>
              </block>
              <block v-else>
                <text class="name-num">{{ dataObj.commentNum }}</text>
              </block>
            </block>
            <text v-else class="name-num" />
          </view>
        </view>
        <view class="icon-btn flex-justify-r" @click.stop="giveOperation()">
          <VoIcon v-if="isGiveLike" :size="20" color="#F20014" name="solid-heart" />
          <VoIcon v-else :opacity="0.45" :size="20" color="#000000" name="hollow-heart" />

          <view class="icon-btn__name">
            点赞
            <block v-if="likeNum">
              <block v-if="likeNum >= 100000">
                <text class="name-num">10w+</text>
              </block>
              <block v-else-if="likeNum >= 10000">
                <text class="name-num">{{ parseInt((likeNum / 10000) * 10) / 10 }}w</text>
              </block>
              <block v-else-if="likeNum >= 1000">
                <text class="name-num">{{ (likeNum / 1000).toFixed(1) }}k</text>
              </block>
              <block v-else>
                <text class="name-num">{{ likeNum }}</text>
              </block>
            </block>
            <text v-else class="name-num" />
          </view>
        </view>
      </view>
    </block>

    <!-- <VoActionSheet
      class="action-sheet"
      v-show="showAction"
      :actions="actions"
      :show="showAction"
      cancelText="取消"
      @select="actionSelect"
      @close="showAction = false"
    /> -->
  </view>
</template>

<script>
  export default {
    components: {},
    props: {
      dataObj: {
        type: Object,
        default() {
          return {}
        },
      },
      //显示radio
      showRadio: {
        type: Boolean,
        default: false,
      },
      //全选
      selectAll: {
        type: Boolean,
        default: false,
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
        status: 1, // 1暂停 2播放
        videoContext: null,
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
        isGiveLike: false,
        likeNum: 0,
        isSelect: false,
        isLoading: false,
      }
    },
    watch: {
      dataObj: {
        deep: true,
        immediate: true,
        handler(oldValue, newVal) {
          if (oldValue) {
            this.isGiveLike = oldValue.mySelfLikeNum === 1
            this.likeNum = oldValue.likeNum || 0
          }
          if (newVal) {
            this.isGiveLike = newVal.mySelfLikeNum === 1
            this.likeNum = newVal.likeNum || 0
          }
        },
      },
    },
    created() {
      console.log('111111121212', this.dataObj)
    },
    mounted() {
      //时间转换
      // if (this.dataObj.createTime) {
      //   // let timestamp = new Date(this.dataObj.createTime).getTime()
      //   this.datetime = this.$vocenApi.VoUtils.timeTransfer(this.dataObj.createTime)
      // }
    },

    methods: {
      //跳转作者主页
      toUserHome() {
        this.$linkToEasy(
          '/pagesAgent/PersonalHomepage/PersonalHomepage?userId=' +
            this.dataObj.userId +
            '&platformCode=' +
            this.dataObj.platformCode,
        )
      },
      //选择事件
      select() {
        this.$emit('select', this.dataObj)
        this.isSelect = true
      },
      //选择取消
      selectCancel() {
        this.isSelect = false
        this.$emit('selectCancel', this.dataObj)
        console.log('selectCancel', this.isSelect)
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
        // console.log('举报44')
        // this.showAction = true
        // this.$emit('showReport', this.dataObj)
        this.$emit('showMorePop', this.dataObj)
      },
      //分享
      showShare() {
        this.$emit('showShare')
      },
      expand() {
        this.isExpand = !this.isExpand
      },
      audioPlayStart(val) {
        console.log(val)
        // this.$emit('playAudio', val)
        // 共创圈问答列表
        this.playInnerAudioContext(val[0])
      },
      // 播放
      play(val) {
        // const innerAudioContext = uni.createInnerAudioContext();
        // innerAudioContext.autoplay = true;
        // innerAudioContext.src = data
        // this.audio = innerAudioContext
        // this.audioPlay = true
        // innerAudioContext.onEnded(() => {
        //   innerAudioContext.destroy()
        //   this.audio = ''
        // })
        // this.stipshow = false
        // this.playshow = true
        // this.status = 2
        this.videoContext.src = val[0]
        // console.log(this.videoContext.src);
        // console.log(this.videoContext);
        // this.videoContext.play()
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
      async giveOperation() {
        if (this.isLoading) return
        this.isLoading = true
        if (this.isGiveLike) {
          await this.giveLikeCancel()
        } else {
          await this.giveLike()
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
            uni.$u.toast(err.message || '取消失败')
          })
          .finally(() => {
            this.isLoading = false
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
            uni.$u.toast(err.message || '取消失败')
          })
          .finally(() => {
            this.isLoading = false
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .ques-item {
    width: 750rpx;
    background: #fff;
    box-sizing: border-box;
    &__top {
      display: flex;
      flex-direction: row;
      padding: 0 32rpx 16rpx 32rpx;
      .user {
        flex: 1;
        line-height: 1.5;
        display: flex;
        &-ava {
          width: 88rpx;
          height: 88rpx;
          position: relative;
          &__frame {
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: 10;
          }
          &__img {
            position: absolute;
            z-index: 9;
            border-radius: 50%;
            top: 20rpx;
            left: 20rpx;
          }
          .v-img {
            position: absolute;
            z-index: 11;
            right: 18rpx;
            top: 14rpx;
          }
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
      .top-btn {
        font-size: 28rpx;
        font-weight: bold;
        line-height: 48rpx;
        color: #0d66ff;
        display: flex;
        padding: 0 16rpx;
      }
    }
    &__mid {
      padding: 0 32rpx;
      width: 100%;
      box-sizing: border-box;
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
          vertical-align: top;
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
        padding: 16rpx 0 24rpx 0;
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
      align-items: center;
      height: 80rpx;
      padding: 0 32rpx;
      border-top: 2rpx solid #f7f7f8;
      .icon-btn {
        display: flex;
        align-items: center;
        &__name {
          color: $v-c0-65;
          line-height: 40rpx;
          font-size: 28rpx;
          margin-left: 8rpx;
        }
        .name-num {
          padding-left: 12rpx;
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
      background: #000;
      border-radius: 12rpx;
      overflow: hidden;
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
  .edit-blue {
    color: #0d66ff;
  }
</style>
