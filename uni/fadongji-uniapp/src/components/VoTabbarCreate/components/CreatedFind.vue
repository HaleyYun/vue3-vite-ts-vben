<template>
  <scroll-view
    :refresher-threshold="10"
    :refresher-triggered="triggered"
    class="video-list"
    refresher-background="#F7F7F8"
    refresher-default-style="none"
    refresher-enabled="true"
    scroll-top="0"
    scroll-y="true"
    @refresherabort="onAbort"
    @refresherpulling="onPulling"
    @refresherrefresh="onRefresh"
    @refresherrestore="onRestore"
    @scroll="onScroll"
    @scrolltolower="scrolltolower"
  >
    <!-- 下拉刷新组件 -->
    <VoListFresh :show="loadingStatus" />
    <view>
      <view class="video-list__list">
        <view
          v-for="(item, index) in infoList"
          :key="index"
          class="list-item"
          @click.stop="toDetailPage(item, index)"
        >
          <view class="list-item__main">
            <!-- <video
			id="myVideo"
			class="my-video"
			:src="item.videoUrl"
			@error="videoErrorCallback"
			controls
		  ></video> -->
            <view class="main-img">
              <image
                :src="item.poster || (item.image && item.image.length) ? item.image[0] : ''"
                class="video-img"
                mode="widthFix"
              />
              <image
                v-if="item.businessType === 2"
                class="play-icon"
                src="/static/icons/play.png"
              />
              <image
                class="more"
                src="/static/created/circle/discover_clear_icon.png"
                @click.stop="moreClick(item)"
              />
            </view>

            <view class="main-desc">
              {{ item.businessType === 1 ? item.content.slice(0, 20) : item.title.slice(0, 20) }}
              <text
                v-if="item.businessType === 1 ? item.content.length > 20 : item.title.length > 20"
              >
                ...
              </text>
            </view>
            <view class="flex-line">
              <view class="flex-line__photo" @click.stop="toUserHome(item)">
                <image
                  :src="item.photoUrl + '&type=2' || '/static/default_avatar.png'"
                  class="flex-line__img common-icon"
                />
                <!-- <VoIcon class="ava-img" name="avatar" :size="20" /> -->
                <!-- 认证通过展示大v标识4已认证 -->
                <VoIcon
                  v-if="Number(item.checkStatus) === 4"
                  :size="8"
                  class="v-img"
                  name="v-icon"
                />
                <image class="flex-line__frame" src="/static/icons/head.png" />
              </view>

              <view class="name-text" @click.stop="toUserHome(item)">
                {{ item.nickName || item.userId }}
              </view>
              <view class="item-btn" @click.stop="giveLikeOperation(item, index)">
                <VoIcon v-if="item.isLike" :size="20" color="#E50012" name="heard-like" />
                <VoIcon v-else :opacity="0.45" :size="20" color="#000000" name="heart-b" />
                <template v-if="item.likeNum">
                  <template v-if="item.likeNum >= 100000"> 10w+ </template>
                  <template v-else-if="item.likeNum >= 10000">
                    {{ parseInt((item.likeNum / 10000) * 10) / 10 }}w
                  </template>
                  <template v-else-if="item.likeNum >= 1000">
                    {{ (item.likeNum / 1000).toFixed(1) }}k
                  </template>
                  <template v-else>{{ item.likeNum }}</template>
                </template>
                <template v-else>点赞</template>
              </view>
            </view>
          </view>
        </view>
      </view>
      <VoLoadMore v-if="infoList.length" :show="noMore" />
    </view>

    <VoNoData v-if="!infoList.length && !refresh && !loading" no-data-tips="暂无数据" />
    <!--    <view v-else class="bg-white" />-->
    <EraApproveModal :show.sync="showApprove" />
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
  </scroll-view>
</template>

<script>
  import devConf from '@/common/env'
  import helpUtil, { hideLoading, showLoading } from '@/common/helper'

  export default {
    data() {
      return {
        loading: false,
        showApprove: false, // 认证模态框
        tagList: ['汽修大咖', '找货攻略', '卖货攻略', '商机探索', '问大咖'],
        infoList: [
          // {
          //   id: 0,
          //   name: '汽配老炮',
          //   videoUrl: '/static/video/video1.mp4',
          //   desc: '火花塞安装教程火花塞安装教程火花塞安装教程火花塞安装教程火花塞安装教程火花塞安装教程火花塞安装教程火花塞安装教程火花塞安装教程',
          //   img: '/static/logo-2.png',
          //   giveNum: 0,
          //   time: '3-25',
          //   isNoble: true,
          //   isLike: false,
          // },
        ],
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
        triggered: false,
        filterVisible: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        pageNo: 1,
        pageSize: 10,
        total: 0,
        noMore: false,
        columnList: [],
        columnId: '',
        circleDetailData: '',
        showAction: false,
      }
    },
    mounted() {
      if (uni.getSystemInfoSync().platform == 'android') {
      } else {
        console.log('非安卓平台')
        this.refresh = false
        this.getData()
      }
    },
    methods: {
      // 图片加载失败处理
      imgErr(item) {
        console.log('1111111111111111', item.poster)
        this.infoList.forEach((ele) => {
          if (ele.id === item.id) {
            ele.poster = '/static/logo.jpg'
          }
        })
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
      moreClick(item) {
        this.showAction = true
        this.circleDetailData = item
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
              JSON.stringify(this.circleDetailData),
          )
          return
        }
      },
      //富文本视频解析
      transferHtml(item) {
        let str = JSON.parse(item.fileUrl).json
        // 匹配img自定义封面图标正则
        const reg2 = /<img.*?data-custom=.*.mp4">/g

        // 匹配视频地址正则
        const video = /video=.*\.mp4/g

        const posterReg = /https:.*\.png/g
        // 进行img转 video
        const afterHtmlStr = str.replace(reg2, (val) => {
          // 取出data-custom值
          // const v = val.match(video)
          // const vs = v[0].replace('video=https:', '')
          // return `<video controls src="${vs}" preload width="500" height="300"></video>`
          const poster = val.match(posterReg)
          item.poster = poster && poster.length ? poster[0] : ''
        })
      },
      //获取富文本文字内容
      getText(str) {
        return str.replace(/<[^<>]+>/g, '').replace(/&nbsp;/gi, '')
      },
      toDetailPage(item, index) {
        // if (!this.$checkIsApproveFn()) {
        //   this.showApprove = true
        //   return
        // }
        //查看详情前调用此接口
        this.$VoHttp
          .apiCreateQuestionsQuestionView$Id({ id: item.id })
          .then((res) => {
            console.log('点击查看')
          })
          .catch((err) => {
            console.log('err', err)
          })
        //跳转不同详情页面
        if (item.businessType === 2) {
          // #ifdef H5
          this.$linkToEasy(
            `/pagesAgent/CreatedCenter/CreatedVideoList/VideoSwiper?id=${item.id}&disableTouch=1`,
          )
          // #endif
          // #ifdef APP-PLUS
          this.columnId = '0'
          console.log('点击查看', item.id, index)
          console.log('点击查看', index)
          console.log('点击查看', this.pageSize)
          console.log('点击查看', this.pageNo)
          console.log('点击查看', this.columnId)
          this.$linkToEasy(
            `/pagesAgent/DemoWang/VoVideo?id=${item.id}
            &index=${index}&pageSize=${this.pageSize}&pageNo=${
              this.pageNo
            }&isEdit=${false}&columnId=${this.columnId || '0'}&disableTouch=1`,
          )
          console.log('点击查看', this.columnId)
          // #endif
        }
        if (item.businessType === 1) {
          this.$linkToEasy('/pagesAgent/CreatedCenter/CircleDetail/CircleDetail?id=' + item.id)
        }
        if (item.businessType === 3) {
          this.$linkToEasy('/pagesAgent/CreatedCenter/CircleDetail/AnswerDetail?id=' + item.id)
        }
      },
      giveLikeOperation(item, index) {
        if (item.isLike) {
          this.giveLikeCancel(item, index)
        } else {
          this.giveLike(item, index)
        }
      },
      //点赞
      giveLike(item, index) {
        this.$VoHttp
          .apiCreateQuestionsQuestionLike({
            businessType: item.businessType,
            contentId: item.id,
          })
          .then((res) => {
            if (res.code === '20001') {
              // uni.$u.toast('点赞成功')
              this.infoList[index].isLike = true
              this.infoList[index].likeNum++
              this.$forceUpdate()
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
      giveLikeCancel(item, index) {
        this.$VoHttp
          .apiCreateQuestionsQuestionCancelLike({
            businessType: item.businessType,
            contentId: item.id,
            userId: item.userId,
          })
          .then((res) => {
            if (res.code === '20001') {
              // uni.$u.toast('取消成功')
              this.infoList[index].isLike = false
              this.infoList[index].likeNum--
              this.$forceUpdate()
            } else {
              uni.$u.toast(res.message)
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('取消失败')
          })
      },
      videoErrorCallback() {
        uni.showModal({
          content: e.target.errMsg,
          showCancel: false,
        })
      },
      //获取列表数据
      getData(refresh, searchCreate) {
        console.log('showCosUrl', devConf.showCosUrl)
        this.loading = true
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.infoList = []
          this.pageNo = 1
        }
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          businessType: '1,2,3,5',
        }
        console.log(this.$storage.get('searchCreate'))
        if (this.$storage.get('searchCreate')) {
          params.content = this.$storage.get('searchCreate')
        }
        // if (columnId) {
        //   params['columnId'] = columnId
        //   this.infoList = []
        //   this.pageNo = 1
        // }
        this.$VoHttp
          .apiCreateQuestionsQuestionList(params)
          .then((res) => {
            if (res.data) {
              let data = res.data.records
              this.total = res.data.total
              //获取columnName
              // this.columnList.forEach((item) => {
              //   data.forEach((dataItem) => {
              //     if (dataItem.columnId && item.id === dataItem.columnId) {
              //       dataItem.columnName = item.columnName
              //     }
              //   })
              // })
              data.forEach((item) => {
                item.isLike = item.mySelfLikeNum === 1 ? true : false
                if (item.businessType !== 3) {
                  helpUtil.regroupFileData(item)
                }
                //图片路径转换
                if (item.businessType === 2) {
                  let urls = item.fileUrl.split('|')
                  item.videoUrl = urls[0]
                  item.poster = urls[1]
                }
                //回答类型单独处理，从富文本中获取图片数据
                if (item.businessType === 3) {
                  this.transferHtml(item)
                  let str = JSON.parse(item.fileUrl).json
                  item.content = this.getText(str)
                  //提取图片
                  item.image = []
                  str.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, (match, capture) => {
                    item.image.push(capture)
                  })
                  //提取视频
                  // item.video = []
                  // JSON.parse(item.fileUrl).json.replace(
                  //   /<video [^>]*src=['"]([^'"]+)[^>]*>/g,
                  //   (match, capture) => {
                  //     item.video.push(capture)
                  //   },
                  // )
                }
              })
              // console.log('data===', data)
              this.infoList = this.infoList.concat(data)
              if (this.infoList.length >= this.total) {
                this.noMore = true
              }
              console.log(res)
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '请检查网络')
          })
          .finally(() => {
            this.triggered = false
            this.refresh = false
            this.loadingStatus = false
            this.loading = false
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
          this.getData()
          // setTimeout(() => {
          //   this.triggered = false
          //   this.refresh = false
          //   this.loadingStatus = false
          // }, 500)
        }
        // console.log('this.triggered', this.triggered)
      },
      //滚到底部加载
      scrolltolower() {
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.infoList.length >= this.total) {
            this.noMore = true
            return false
          }
          this.pageNo++
          this.getData()
        }, 2000)
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
    },
  }
</script>

<style lang="scss" scoped>
  .video-list {
    height: 100%;
    width: 750rpx;
    overflow-y: scroll;
    touch-action: none;
    background-color: #fff;
    border-top: 16rpx solid #f7f7f8;
    box-sizing: border-box;

    &__list {
      // display: flex;
      // flex-wrap: wrap;
      width: 100%;
      column-count: 2; //分为两列,用于瀑布流
      column-gap: 18upx;
      padding: 16upx 32rpx 0 32rpx;
      box-sizing: border-box;

      .list-item {
        // width: 50%;
        position: relative;
        box-sizing: border-box;
        padding-bottom: 24rpx;
        break-inside: avoid; //用于瀑布流

        &__main {
          width: 100%;
          // position: relative;
          .main-img {
            position: relative;
            width: 100%;
            max-height: 600rpx;
            overflow-y: hidden;
            .video-img {
              width: 100%;
              background-image: url('/static/logo.jpg');
              background-repeat: no-repeat;
              background-size: 100% 100%;
              border-radius: 8rpx;
            }

            .play-icon {
              width: 110rpx;
              height: 110rpx;
              position: absolute;
              right: calc(50% - 56rpx);
              top: calc(50% - 56rpx);
            }
            .more {
              position: absolute;
              top: 0;
              right: 0;
              width: 40rpx;
              height: 40rpx;
            }
          }
          .main-desc {
            max-height: 84rpx;
            overflow: hidden;
            font-weight: bold;
            font-size: 28rpx;
            line-height: 42rpx;
            color: $v-c0-85;
            padding: 0 8rpx;
            word-break: break-all;
            position: relative;
            .point {
              position: absolute;
              height: 42rpx;
              width: 30rpx;
              right: 8rpx;
              bottom: 0;
              background: #fff;
              z-index: 99;
            }
          }
        }
      }
    }

    .my-video {
      width: 100%;
      height: 200px;
    }

    .uni-video-cover {
      z-index: auto !important;
    }

    &__tag {
      padding: 5px;
      border-bottom: 1px solid #eee;

      .tag-item {
        display: inline-block;
        font-size: 10px;
        background-color: #eee;
        padding: 5px;
        text-align: center;
        margin: 5px;
        border-radius: 10px;

        .item-title {
          font-weight: bold;
        }
      }
    }

    .flex-line {
      display: flex;
      padding-top: 16rpx;
      align-items: center;

      &__photo {
        width: 88rpx;
        height: 88rpx;
        position: relative;
      }
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
      .common-icon {
        width: 48rpx;
        height: 48rpx;
      }
      .v-img {
        position: absolute;
        z-index: 11;
        right: 18rpx;
        top: 14rpx;
      }

      .name-text {
        font-size: 24rpx;
        line-height: 1.5;
        color: $v-c0-45;
        padding-left: 8rpx;
        flex: 1;
        overflow: hidden;
        word-break: break-all;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .item-btn {
        display: flex;
        //justify-content: flex-end;
        width: 100rpx;
        font-size: 26rpx;
        line-height: 1.5;
        color: $v-c0-65;
      }
    }
  }
  .bg-white {
    background: #fff;
    margin-top: 16rpx;
    height: 100%;
  }
</style>
