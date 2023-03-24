<template>
  <view class="wrap">
    <!--  头部  -->
    <VoNav :left-width="200" :right-width="200" is-fixed isHaveMore title="互动消息">
      <block slot="operation">
        <view class="val-record m-r-28 fz-32 color-block-65" @click="goSetUp(3)">设置</view>
      </block>
    </VoNav>
    <view class="border-bottom" />
    <EraTabs
      :current="current"
      :list="bill"
      :scrollable="false"
      class="bg-white"
      inactiveStyle="color: rgba(0, 0, 0, 0.45)"
      line-color="#FF5319"
      @click="changeNav"
    />
    <swiper :autoplay="false" :current="current" class="wrap-swiper" @change="changeSwiper">
      <swiper-item>
        <scroll-view
          :refresher-enabled="false"
          :refresher-threshold="10"
          :refresher-triggered="triggered"
          :scroll-y="true"
          class="scroll-view"
          refresher-background="#F7F7F8"
          refresher-default-style="none"
          scroll-top="0"
          @refresherabort="onAbort"
          @refresherpulling="onPulling"
          @refresherrefresh="onRefresh"
          @refresherrestore="onRestore"
          @scroll="onScroll"
          @scrolltolower="scrolltolower($event, 1)"
        >
          <!-- 下拉刷新组件 -->
          <VoListFresh :show="loadingStatus" />
          <block v-if="title.length">
            <block v-for="(info, index) of title">
              <view :key="index" class="wrap-swiper__scroll">
                <view class="scroll-title flex flex-vertical-c flex-justify-between">
                  <view class="flex flex-vertical-c">
                    <view class="wrap-card__image">
                      <image :src="info.photoUrl + '&type=2'" class="image" />
                    </view>
                    <view class="scroll-title__name">
                      <view :class="{ hasRead: info.isRead }" class="name-top">{{
                        info.name
                      }}</view>
                      <view class="name-bottom flex">
                        <view :class="{ hasRead: info.isRead }" class="m-r-30">回复了你</view>
                        <view :class="{ hasRead: info.isRead }">{{
                          formateTime(info.createTime)
                        }}</view>
                      </view>
                    </view>
                  </view>
                  <view
                    :class="{ btnIsRead: info.isRead }"
                    class="scroll-title__image"
                    @click="reply(info)"
                    >回复</view
                  >
                </view>
                <view
                  v-if="info.comment"
                  :class="{ hasRead: info.isRead }"
                  class="scroll-con"
                  v-html="JSON.parse(info.comment).json"
                  @click="tapToPage(info)"
                />
                <view
                  v-if="info.commentContent"
                  :class="{ hasRead: info.isRead }"
                  class="scroll-body"
                  @click="tapToPage(info)"
                  >{{ info.commentContent ? getText(info.commentContent) : '' }}</view
                >
<!--                <view v-else-if="info.fileUrl">-->
                  <!-- @click.stop="audioPlayStart(info)" -->
<!--                  <view class="idea-voice__wrap" @click="tapToPage(info)">-->
<!--                    <view class="wrap-icon flex-vertical-c">-->
<!--                      <image class="wrap-icon__common" src="/static/icons/voice.png" />-->
                      <!-- <view class="wrap-icon__timer" v-if="duration[info.fileUrl]">{{
                        duration[info.fileUrl] + 'S'
                      }}</view> -->
<!--                    </view>-->
<!--                  </view>-->
<!--                </view>-->
              </view>
            </block>
            <VoLoadingText
              :has-more="title.length < getMessageList.commentList.total"
              :loading="getMessageList.commentList.loading"
            />
          </block>
          <VoNoData v-if="!title.length && !getMessageList.commentList.loading" />
        </scroll-view>
      </swiper-item>
      <swiper-item>
        <scroll-view
          :refresher-enabled="false"
          :refresher-threshold="10"
          :refresher-triggered="triggered"
          :scroll-y="true"
          class="scroll-view"
          refresher-background="#F7F7F8"
          refresher-default-style="none"
          scroll-top="0"
          @refresherabort="onAbort"
          @refresherpulling="onPulling"
          @refresherrefresh="onRefresh"
          @refresherrestore="onRestore"
          @scroll="onScroll"
          @scrolltolower="scrolltolower($event, 2)"
        >
          <!-- 下拉刷新组件 -->
          <VoListFresh :show="loadingStatus" />
          <block v-if="title.length">
            <block v-for="(info, index) of title">
              <view :key="index" class="wrap-swiper__scroll">
                <view class="scroll-title flex flex-vertical-c flex-justify-between">
                  <view class="flex flex-vertical-c">
                    <view class="wrap-card__image">
                      <image :src="info.photoUrl" class="image" />
                    </view>
                    <view class="scroll-title__name">
                      <view :class="{ hasRead: info.isRead }" class="name-top">{{
                        info.name
                      }}</view>
                      <view class="name-bottom flex">
                        <view :class="{ hasRead: info.isRead }" class="m-r-30"
                          >{{ info.resourceType == 1 ? '点赞' : '收藏' }}了你的{{
                            getType(info.businessType)
                          }}</view
                        >
                        <view :class="{ hasRead: info.isRead }">{{
                          formateTime(info.createTime)
                        }}</view>
                      </view>
                    </view>
                  </view>
                  <!-- <view class="scroll-title__image" @click="reply(info)">回复</view> -->
                </view>
                <view
                  v-if="info.commentContent"
                  :class="{ hasRead: info.isRead }"
                  class="scroll-body"
                  @click="tapToPage(info)"
                  >{{ info.commentContent ? getText(info.commentContent) : '' }}</view
                >
<!--                <view v-else-if="info.fileUrl">-->
                  <!-- @click.stop="audioPlayStart(info)" -->
<!--                  <view class="idea-voice__wrap" @click="tapToPage(info)">-->
<!--                    <view class="wrap-icon flex-vertical-c">-->
<!--                      <image class="wrap-icon__common" src="/static/icons/voice.png" />-->
<!--                    </view>-->
<!--                  </view>-->
<!--                </view>-->
              </view>
            </block>
            <VoLoadingText
              :has-more="title.length < getMessageList.collectList.total"
              :loading="getMessageList.collectList.loading"
            />
          </block>
          <VoNoData v-if="!title.length && !getMessageList.collectList.loading" />
        </scroll-view>
      </swiper-item>
      <swiper-item>
        <scroll-view
          :refresher-enabled="false"
          :refresher-threshold="10"
          :refresher-triggered="triggered"
          :scroll-y="true"
          class="scroll-view m-t-18"
          refresher-background="#F7F7F8"
          refresher-default-style="none"
          scroll-top="0"
          @refresherabort="onAbort"
          @refresherpulling="onPulling"
          @refresherrefresh="onRefresh"
          @refresherrestore="onRestore"
          @scroll="onScroll"
          @scrolltolower="scrolltolower($event, 2)"
        >
          <!-- 下拉刷新组件 -->
          <VoListFresh :show="loadingStatus" />
          <block v-if="title.length">
            <block v-for="(info, index) of title">
              <view :key="index" class="wrap-swiper__scroll wrap-swiper__scroll2">
                <view class="scroll-title scroll-title2 flex flex-vertical-c flex-justify-between">
                  <view class="flex flex-vertical-c" @click="tapToPage(info)">
                    <view class="wrap-card__image">
                      <image :src="info.photoUrl" class="image" />
                    </view>
                    <view class="scroll-title__name">
                      <view :class="{ hasRead: info.isRead }" class="name-top">{{
                        info.nickName
                      }}</view>
                      <view class="name-bottom flex">
                        <view :class="{ hasRead: info.isRead }" class="m-r-30">关注了你</view>
                        <view :class="{ hasRead: info.isRead }">{{
                          formateTime(info.createTime)
                        }}</view>
                      </view>
                    </view>
                  </view>
                </view>
              </view>
            </block>
            <VoLoadingText
              :has-more="title.length < getMessageList.attentionList.total"
              :loading="getMessageList.attentionList.loading"
            />
          </block>
          <VoNoData v-if="!title.length && !getMessageList.attentionList.loading" />
        </scroll-view>
      </swiper-item>
    </swiper>
    <VoSafetyArea :isFixed="false" />
    <CommentInput ref="commentInput" @releaseCommentSuccess="releaseCommentSuccess" />
  </view>
</template>

<script>
  import CommentInput from './components/CommentInput.vue'
  import { mapActions, mapGetters } from 'vuex'
  import mixin from './components/mixin'

  export default {
    name: 'Interaction',
    components: {
      CommentInput,
    },
    mixins: [mixin],
    data() {
      return {
        loading: false,
        hasMore: true,
        triggered: false, // 下拉刷新判断布尔值
        refresh: false, // 下拉刷新判断布尔值
        loadingStatus: false, // 下拉刷新防抖
        duration: {},
        current: 0,
        playStatus: 1,
        // videoContextVoice: '',
        bill: [
          {
            name: '评论和@',
          },
          {
            name: '赞和收藏',
          },
          {
            name: '新增关注',
          },
        ],
        info: {},
      }
    },

    computed: {
      ...mapGetters('serviceNotification', ['getMessageList']),
      title() {
        if (this.current == 0) {
          if (this.getMessageList.commentList.list.length) {
            return this.getMessageList.commentList.list
          } else {
            return []
          }
        } else if (this.current == 1) {
          if (this.getMessageList.collectList.list.length) {
            return this.getMessageList.collectList.list
          } else {
            return []
          }
        } else {
          if (this.getMessageList.attentionList.list.length) {
            return this.getMessageList.attentionList.list
          } else {
            return []
          }
        }
      },
    },
    watch: {
      // title: {
      //   deep: true,
      //   immediate: true,
      //   handler(val) {
      //     if (val && val.length) {
      //       let isReadList = val.filter((item) => {
      //         return !item.isRead
      //       })
      //       if (isReadList.length) {
      //         let ids = isReadList.map((item) => {
      //           return item.id
      //         })
      //         console.log(ids)
      //         this.$VoHttp.apiContentMessageLogMessageRead({ ids }).then((res) => {
      //           console.log(res)
      //         })
      //       }
      //     }
      //   },
      // },
    },
    onLoad(option) {
      this.setMsgRead()
      this.getListData()
      this.current = +option.index || 0
      // this.videoContextVoice = uni.createInnerAudioContext()
    },
    methods: {
      ...mapActions('serviceNotification', [
        'reqCollectList',
        'reqCommentList',
        'reqAttentionList',
      ]),
      //消息设置已读
      setMsgRead() {
        //1互动消息，2：服务通知，3：交易物流  4：公告
        this.$VoHttp.apiContentMessageLogMessageRead({ type: 1 }).then((res) => {
          console.log(res)
        })
      },
      //自定义下拉刷新控件被下拉
      onPulling(e) {
        // console.log('onpulling')
        if (e.detail.deltaY < 0) return // 防止上滑页面也触发下拉
        this.loadingStatus = true
        setTimeout(() => {
          this.loadingStatus = false
        }, 2000)
      },
      //自定义下拉刷新被触发
      onRefresh() {
        console.log('onRefresh下拉刷新')
        // this.loadingStatus = true
        if (this.scrollTop === 0) {
          if (this.refresh) return
          this.refresh = true
          this.triggered = true
          this.loadingStatus = true
          this.getListData()
          // setTimeout(() => {
          //   this.triggered = false
          //   this.refresh = false
          //   this.loadingStatus = false
          // }, 500)
        }
        // console.log('this.triggered', this.triggered)
      },
      //自定义下拉刷新被复位
      onRestore() {
        this.triggered = false // 需要重置
        this.loadingStatus = false
        console.log('onRestore下拉复位')
      },
      //自定义下拉刷新被中止
      onAbort() {
        this.triggered = false // 需要重置
        this.loadingStatus = false
        console.log('onAbort')
      },
      onScroll(e) {
        // console.log(111, e.detail)
        this.scrollTop = e.detail.scrollTop
        this.$emit('onScroll', e)
      },
      scrolltolower(val, index) {
        switch (index) {
          case 1:
            if (this.getMessageList.commentList.loading) return
            if (
              this.getMessageList.commentList.list.length >= this.getMessageList.commentList.total
            ) {
              //   this.$u.toast('没有更多了')
              return
            }
            this.reqCommentList()
            break
          case 2:
            if (this.getMessageList.collectList.loading) return
            if (
              this.getMessageList.collectList.list.length >= this.getMessageList.collectList.total
            ) {
              //   this.$u.toast('没有更多了')
              return
            }
            this.reqCollectList()
            break
          case 3:
            if (this.getMessageList.attentionList.loading) return
            if (
              this.getMessageList.attentionList.list.length >=
              this.getMessageList.attentionList.total
            ) {
              //   this.$u.toast('没有更多了')
              return
            }
            this.reqAttentionList()
            break
          default:
            break
        }
      },
      async getListData() {
        try {
          await this.reqCollectList(true)
          await this.reqCommentList(true)
          await this.reqAttentionList(true)
        } catch (e) {
          console.log(e)
        }
      },
      getText(str) {
        let reg = /json/g
        return str.match(/>[^<>]+</g)
          ? str
              .match(/>[^<>]+</g)
              .map((item) => {
                return item.replace('<', '').replace('>', '')
              })
              .join('')
          : reg.test(str)
          ? JSON.parse(str).json
          : str
      },
      getType(val) {
        switch (val) {
          case 0:
            return '问题'
          case 1:
            return '想法'
          case 2:
            return '视频'
          case 3:
            return '回答'
          case 4:
            return '评论'
          case 5:
            return '发现'
          default:
            return ''
        }
      },
      loadedmetadata(e, val) {
        console.log('voiceduration', data.detail.duration)
        //获取语音秒数，取整
        this.duration[val.fileUrl] = Math.trunc(data.detail.duration)
      },
      audioPlayStart(val) {
        console.log(val.fileUrl)
        const valArr = val.fileUrl.split('|')
        const mp3Arr = valArr.filter((item) => {
          return item.indexOf('mp3') > -1
        })
        console.log(mp3Arr)
        this.playInnerAudioContext(mp3Arr?.[0])
        // this.videoContextVoice.src = mp3Arr?.[0]
        // if (this.playStatus === 1) {
        //   this.play()
        // } else {
        //   this.stop()
        // }
      },
      // 播放
      play() {
        this.videoContextVoice.play()
        this.playStatus = 2
      },
      // 暂停
      stop() {
        this.videoContextVoice.pause()
        this.playStatus = 1
      },
      tapToPage(val) {
        console.log(val);
        if (val.url.indexOf('VideoSwiper') != -1) {
          this.$VoHttp
            .apiCreateQuestionsQuestionView$Id({ id: val.id })
            .then((res) => {
              console.log('点击查看')
            })
            .catch((err) => {
              console.log('err', err)
            })
          let isEdit = 0
          let disableTouch = '0'
          // #ifdef H5
          this.$linkToEasy(
            `/pagesAgent/CreatedCenter/CreatedVideoList/VideoSwiper?id=${val.id}
            &index=0&pageSize=10&pageNo=1&isEdit=${isEdit}&columnId=&disableTouch=${disableTouch}`,
          )
          // #endif
          // #ifdef APP-PLUS
          this.$linkToEasy(
            `/pagesAgent/DemoWang/VoVideo?id=${val.id}
            &index=0&pageSize=10&pageNo=1&isEdit=${isEdit}&columnId=&disableTouch=${disableTouch}`,
          )
          // #endif
        } else {
          this.$linkToEasy(`${val.url.trim()}`)
        }
      },
      releaseCommentSuccess() {
        console.log('===')
      },
      reply(to) {
        this.info = to
        console.log(this.$refs)
        this.$refs.commentInput.toFocus(to)
      },
      // 返回上一页
      returnFn() {
        this.$backFn()
      },
      // 去设置页
      goSetUp(type) {
        this.$linkToEasy('/pagesCommon/serviceMessagePage/SetUp?type=' + type)
      },
      changeNav(e) {
        console.log(e)
        this.current = e.index
      },
      changeSwiper(e) {
        this.current = e.detail.current
        switch (e.detail.current) {
          case 0:
            this.reqCommentList(true)
            break
          case 1:
            this.reqCollectList(true)
            break
          case 2:
            this.reqAttentionList(true)
            break
          default:
            break
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .wrap {
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    &-navigation {
      height: 100rpx;
      background-color: #fff;
      &__return {
        width: 54rpx;
        height: 54rpx;
        margin: 0 20rpx;
      }
      &__msg {
        font-size: 36rpx;
        margin: 0 16rpx;
      }
      &__right {
        margin-right: 20rpx;
        font-size: 32rpx;
        text-align: end;
        padding-top: 18rpx;
      }
    }
    &-swiper {
      flex-grow: 1;
      overflow: auto;
      &__scroll {
        padding: 20rpx 20rpx 20rpx 30rpx;
        margin-top: 24rpx;
        background-color: #fff;
        .scroll-title {
          &__photo {
            margin-right: 8rpx;
          }
          &__name {
            color: #999;
            font-weight: 400 !important;
            .name-top {
              font-size: 28rpx;
              margin-bottom: 6rpx;
              color: rgba(0, 0, 0, 0.85);
            }
            .name-bottom {
              font-size: 24rpx;
              color: rgba(0, 0, 0, 0.45);
            }
          }
          &__image {
            width: 120rpx;
            height: 64rpx;
            box-sizing: border-box;
            font-size: 24rpx;
            color: #ff5319;
            text-align: center;
            line-height: 64rpx;
            text-align: center;
            border-radius: 32rpx;
            border: 2rpx solid #ff5319;
          }
          &__attention {
            font-size: 32rpx;
            color: #333333;
            border: 2rpx solid #999;
            padding: 10rpx 14rpx;
            border-radius: 40rpx;
          }
          &__concerned {
            font-size: 32rpx;
            color: #666666;
            padding: 10rpx 14rpx;
          }
        }
        .scroll-title2 {
          border-bottom: 2rpx solid rgba(247, 247, 248, 1);
          padding-bottom: 30rpx;
        }
        .scroll-con {
          font-size: 28rpx;
          line-height: 42rpx;
          margin-left: 10rpx;
          margin-top: 20rpx;
          color: rgba(0, 0, 0, 0.65);
        }
        .scroll-body {
          font-size: 28rpx;
          line-height: 42rpx;
          box-sizing: border-box;
          color: rgba(0, 0, 0, 0.65);
          margin: 10rpx;
          background: #f7f7f8;
          padding: 16rpx 24rpx;
        }
        .scroll-reply {
          margin-bottom: 30rpx;
          &__icon {
            width: 36rpx;
            height: 36rpx;
            margin-right: 20rpx;
          }
          &__word {
            font-size: 28rpx;
          }
        }
      }
      .scroll-view {
        height: 100%;
      }
      &__scroll2 {
        padding: 20rpx 20rpx 0 30rpx;

        margin-top: 0;
      }
    }
  }
  .idea-voice__wrap {
    margin: 30rpx 0;
    background: #ffffff;
    box-shadow: 0px 2px 8px rgba(34, 40, 75, 0.15);
    border-radius: 8rpx;
    width: 520rpx;
    height: 80rpx;
    line-height: 80rpx;
    box-sizing: border-box;
    padding: 0 24rpx;
    margin-right: 40rpx;
    .wrap-icon {
      height: 100%;
      display: flex;
      &__common {
        width: 48rpx;
        height: 48rpx;
      }
      &__timer {
        flex: 1;
        font-weight: bold;
        font-size: 24rpx;
        line-height: 1.5;
        color: --color-primary;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
    }
  }
  .hidden {
    display: none;
  }
  .wrap-card__image {
    width: 48rpx;
    height: 48rpx;
    border-radius: 50%;
    margin-right: 8rpx;
    position: relative;
  }
  .image {
    width: 48rpx;
    height: 48rpx;
    border-radius: 50%;
  }
  //   .hasRead {
  //     color: rgba(0, 0, 0, 0.25) !important;
  //   }
  //   .btnIsRead {
  //     color: rgba(0, 0, 0, 0.25) !important;
  //     border: 2rpx solid #f6f7f8 !important;
  //   }
  .imgIsRead::after {
    content: ' ';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5) !important;
  }
</style>
