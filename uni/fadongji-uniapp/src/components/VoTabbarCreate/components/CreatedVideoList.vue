<template>
  <scroll-view
    :class="{
      'hide-nav': !showNav,
    }"
    :refresher-enabled="true"
    :refresher-threshold="10"
    :refresher-triggered="triggered"
    class="video-list"
    refresher-background="#F7F7F8"
    refresher-default-style="none"
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
    <!-- <view class="video-list__tag">
	  <view class="tag-item" v-for="(item, index) in tagList" :key="item">
		{{ item }}
      </view>
    </view> -->
    <template v-if="infoList.length > 0">
      <view class="video-list__list">
        <view
          v-for="(item, index) in infoList"
          :key="index"
          :class="{ 'm-r-0': (index + 1) % 2 === 0 }"
          class="list-item"
          @click.stop="toPage(item, index)"
        >
          <view
            v-if="showRadio && !item.isSelect && !isSelectAll"
            class="list-item__radio"
            @click.stop="select(item, index)"
          >
            <VoIcon :size="28" class="radio" color="#ffffff" name="circle" />
          </view>
          <view
            v-if="item.isSelect || isSelectAll"
            class="list-item__radio"
            @click.stop="selectCancel(item, index)"
          >
            <VoIcon :size="28" class="radio" name="select-right" />
          </view>
          <view class="list-item__main">
            <!-- <video
			  id="myVideo"
			  class="my-video"
			  :src="item.videoUrl"
			  @error="videoErrorCallback"
			  controls
			></video> -->
            <view class="main-img">
              <image :src="item.videoPoster" class="video-img" mode="aspectFill" />
              <image class="play-icon" src="/static/icons/play.png" />
              <image
                class="more"
                src="/static/created/circle/discover_clear_icon.png"
                @click.stop="moreClick(item)"
              />
            </view>

            <view class="main-desc">
              {{ item.title }}
            </view>
            <view class="flex-line">
              <view class="flex-line__photo" @click.stop="toUserHome(item)">
                <image
                  :src="item.photoUrl + '&type=2' || '/static/default_avatar.png'"
                  class="ava-img"
                />
                <!-- 认证通过展示大v标识4已认证 -->
                <VoIcon
                  v-if="Number(item.checkStatus) === 4"
                  :size="8"
                  class="v-img"
                  name="v-icon"
                />
                <image class="photo-frame" src="/static/icons/head.png" />
              </view>

              <view class="name-text">
                {{ item.nickName || item.userId }}
              </view>
              <view class="item-btn" @click.stop="giveLikeOperation(item, index)">
                <VoIcon v-if="item.isLike" :size="20" color="#E50012" name="heard-like" />
                <VoIcon v-else :opacity="0.45" :size="20" color="#000000" name="heart-b" />
                <!--              {{ item.likeNum ? item.likeNum : '点赞' }}-->
                <template v-if="item.likeNum">
                  <template v-if="item.likeNum >= 10000">
                    {{ parseInt((item.likeNum / 10000) * 10) / 10 }}w
                  </template>
                  <template v-if="item.likeNum >= 1000">
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
      <VoLoadingText
        :has-more="infoList.length < total"
        :loading="loading"
        noMoreSrc="/static/logo-bottom.png"
        noMoreText="没有更多了"
      />
    </template>
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
  import { hideLoading, showLoading, throttle } from '@/common/helper'

  export default {
    name: 'QuestionPage',
    props: {
      //跳转来源页面名称
      pageType: {
        type: String,
      },
      userId: {
        type: String,
        default: '',
      },
      showNav: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        showApprove: false, // 认证模态框
        tagList: ['汽修大咖', '找货攻略', '卖货攻略', '商机探索', '问大咖'],
        infoList: [],
        triggered: false,
        filterVisible: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        loading: false,
        pageNo: 1,
        pageSize: 10,
        total: 0,
        columnList: [],
        showRadio: false,
        isSelectAll: false, //全选
        columnId: '',
        hasMore: true,
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
        circleDetailData: '',
        showAction: false,
        endScroll: 0,
      }
    },
    created() {},
    mounted() {
      // this.getData()
    },
    methods: {
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
        this.$emit('showReport', item)
        // this.showAction = true
        // this.circleDetailData = item
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
      //选择事件
      select(item, index) {
        this.infoList[index].isSelect = true
        this.$forceUpdate()
        this.$emit('select', item)
      },
      //选择取消
      selectCancel(item, index) {
        this.infoList[index].isSelect = false
        this.$forceUpdate()
        this.$emit('selectCancel', item)
      },
      //选择全部
      selectAll() {
        this.infoList.forEach((item) => {
          item.isSelect = true
        })
        //用来获取全选数据
        this.$emit('getListData', this.infoList)
      },
      //取消选择全部
      selectAllCancel() {
        this.infoList.forEach((item) => {
          item.isSelect = false
        })
      },
      //收藏列表管理事件
      toManage(value) {
        this.showRadio = value
      },
      toPage(item, index) {
        // if (!this.$checkIsApproveFn()) {
        //   this.showApprove = true
        //   return
        // }
        console.log(item.id)
        //查看详情前调用此接口
        this.$VoHttp
          .apiCreateQuestionsQuestionView$Id({ id: item.id })
          .then((res) => {
            console.log('点击查看')
          })
          .catch((err) => {
            console.log('err', err)
          })
        console.log('用户id', this.userId)
        let isEdit = this.userId && this.userId === this.userInfo.id ? 1 : 0
        let disableTouch = this.userId || this.pageType === 'collectList' ? '1' : '0'

        // #ifdef H5
        this.$linkToEasy(
          `/pagesAgent/CreatedCenter/CreatedVideoList/VideoSwiper?id=${item.id}
            &index=${index}&pageSize=${this.pageSize}&pageNo=${item.pageNo}&isEdit=${isEdit}&columnId=${this.columnId}&disableTouch=${disableTouch}`,
        )
        // #endif
        // #ifdef APP-PLUS
        this.$linkToEasy(
          `/pagesAgent/DemoWang/VoVideo?id=${item.id}
            &index=${index}&pageSize=${this.pageSize}&pageNo=${item.pageNo}&isEdit=${isEdit}&columnId=${this.columnId}&disableTouch=${disableTouch}`,
        )
        // #endif
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
      getColumnList() {
        this.$VoHttp.apiCreateColumnList({ businessType: 2 }).then((res) => {
          this.columnList = res.data
        })
      },
      getData(columnId, refresh) {
        if (this.loading) return
        this.loading = true
        showLoading()
        console.log('showCosUrl', devConf.showCosUrl)
        this.columnId = columnId || ''
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.infoList = []
          this.pageNo = 1
        }
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          businessType: 2,
        }
        if (columnId) {
          params['columnId'] = columnId
        }
        if (this.userId) {
          params['userId'] = this.userId
        }
        if (this.$storage.get('searchCreate')) {
          params.content = this.$storage.get('searchCreate')
        }
        //如果是收藏列表则调取收藏列表接口
        let api = ''
        if (this.pageType === 'collectList') {
          params.userId = this.userInfo.id
          params.platformCode = this.userInfo.platformCode
          api = 'apiCreateQuestionsHomeGetCollection'
        } else {
          api = 'apiCreateQuestionsQuestionList'
        }
        this.$VoHttp[api](params)
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
                item.isSelect = false
                item.pageNo = this.pageNo
                //图片路径转换
                if (item.fileUrl) {
                  let urls = item.fileUrl.split('|')
                  item.videoUrl = urls[0]
                  item.videoPoster = urls[1]
                }
                item.isLike = item.mySelfLikeNum === 1 ? true : false
              })
              this.infoList = this.infoList.concat(data)
              this.hasMore = this.infoList.length < this.total
              // console.log('666', this.infoList)
              this.triggered = false
              this.refresh = false
              this.loadingStatus = false
            }
          })
          .catch((err) => {
            console.log('err', err)
            this.triggered = false
            this.refresh = false
            this.loadingStatus = false
            uni.$u.toast(err.message || '请检查网络')
          })
          .finally(() => {
            hideLoading()
            this.loading = false
          })
      },
      onPulling(e) {
        // console.log('onpulling')
        if (e.detail.deltaY < 0) return // 防止上滑页面也触发下拉
        this.loadingStatus = true
        // setTimeout(() => {
        //   this.loadingStatus = false
        // }, 2000)
      },
      onRefresh() {
        console.log('onRefresh下拉刷新')
        // this.loadingStatus = true
        if (this.scrollTop === 0) {
          if (this.refresh) return
          this.refresh = true
          this.triggered = true
          this.loadingStatus = true
          this.getData(this.columnId)
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
        if (!this.hasMore) return
        throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.infoList.length >= this.total) {
            return false
          }
          this.pageNo++
          this.getData(this.columnId)
        }, 2000)
      },
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
        if (!this.hasMore) return
        if (this.scrollTop > 0) {
          this.$emit('onScroll', e)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .video-list {
    width: 750rpx;
    height: 100%;
    touch-action: none;
    background-color: #fff;
    border-top: 16rpx solid #f7f7f8;
    &.hide-nav {
      height: calc(100vh - 93px - 70px);
    }

    &__list {
      // display: flex;
      // flex-wrap: wrap;
      width: 100%;
      //column-count: 2; //分为两列,用于瀑布流
      //column-gap: 18upx;
      padding: 16upx 0upx 32upx 32upx;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;

      .list-item {
        // width: 50%;
        position: relative;
        box-sizing: border-box;
        padding-bottom: 24rpx;
        break-inside: avoid; //用于瀑布流
        margin-right: 18rpx;
        &__radio {
          position: absolute;
          z-index: 10;
          right: 0;
          top: 0;
        }

        &__main {
          width: 334rpx;
          // position: relative;
          .main-img {
            position: relative;
            .video-img {
              width: 100%;
              height: 480rpx;
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
            height: 84rpx;
            font-weight: bold;
            font-size: 28rpx;
            line-height: 1.5;
            color: $v-c0-85;
            padding: 0 8rpx;
            word-break: break-all;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
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
        position: relative;
        .ava-img {
          width: 44rpx;
          height: 44rpx;
          border-radius: 50%;
        }
        .v-img {
          width: 16rpx;
          height: 16rpx;
          position: absolute;
          right: 0;
          top: 0;
          z-index: 11;
        }
        .photo-frame {
          width: 64rpx;
          height: 64rpx;
          position: absolute;
          top: -8rpx;
          left: -12rpx;
        }
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
  .m-r-0 {
    margin-right: 0rpx !important;
  }
</style>
