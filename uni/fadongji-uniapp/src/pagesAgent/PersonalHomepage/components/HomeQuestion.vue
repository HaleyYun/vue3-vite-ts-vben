<template>
  <scroll-view
    :refresher-enabled="false"
    :refresher-threshold="10"
    :refresher-triggered="triggered"
    :scroll-y="true"
    class="create-question"
    refresher-background="#F7F7F8"
    refresher-default-style="none"
    scroll-top="0"
    @refresherabort="onAbort"
    @refresherpulling="onPulling"
    @refresherrefresh="onRefresh"
    @refresherrestore="onRestore"
    @scroll="onScroll"
    @scrolltolower="scrolltolower"
    @scrolltoupper="scrolltoupper"
  >
    <!-- 下拉刷新组件 -->
    <VoListFresh :show="loadingStatus" />
    <block v-if="infoList.length > 0">
      <view class="create-question__list">
        <QuestionItem
          v-for="(item, index) in infoList"
          :key="index + item.title"
          :dataObj="item"
          class="list-item"
          @click="toPage(item)"
          @showMorePop="showMorePop(item)"
          @showReport="showReport(item)"
          @showShare="showShare(item)"
        />
        <VoLoadingText :has-more="infoList.length < total" :loading="loading" />
      </view>
    </block>
    <VoNoData v-if="!infoList.length && !refresh" no-data-tips="暂无数据" />
  </scroll-view>
</template>

<script>
  import QuestionItem from './QuestionItem'
  import helpUtil, { hideLoading, showLoading, throttle } from '@/common/helper'

  export default {
    name: 'QuestionPage',
    components: {
      QuestionItem,
    },
    props: {
      userId: {
        type: String,
      },
    },
    data() {
      return {
        tagList: [
          {
            name: '全部',
            choosed: true,
          },
          {
            name: '火花塞',
            choosed: false,
          },
          {
            name: '机油',
            choosed: false,
          },
          {
            name: '离合器',
            choosed: false,
          },
        ],
        infoList: [],
        showPopup: false,
        loading: false,
        triggered: false,
        filterVisible: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        pageNo: 1,
        pageSize: 10,
        total: 0,
        columnList: [],
      }
    },
    created() {},
    mounted() {
      // this.refresh = false
      // this.getColumnList()
      //   this.getData('', true)
    },
    methods: {
      //富文本视频解析
      transferHtml(item) {
        let str = JSON.parse(item.fileUrl).json
        // 匹配img自定义封面图标正则
        const reg2 = /<img.*?class="video-poster" data-custom=.*.mp4">/g

        // 匹配视频地址正则
        const video = /video=.*\.mp4/g
        const posterReg = /https:.*\.png/
        // 进行img转 video
        const afterHtmlStr = str.replace(reg2, (val) => {
          console.log(val, 'val')
          // 取出data-custom值
          // const v = val.match(video)
          // const vs = v[0].replace('video=https:', '')
          // return `<video controls src="${vs}" preload width="500" height="300"></video>`
          const poster = val.match(posterReg)
          console.log('poster', poster)
          item.poster = poster && poster[0]
        })
      },
      //获取富文本文字内容
      getText(str) {
        return str.replace(/<[^<>]+>/g, '').replace(/&nbsp;/gi, '')
      },
      toPage(item) {
        //查看详情前调用此接口
        this.$VoHttp
          .apiCreateQuestionsQuestionView$Id({ id: item.id })
          .then((res) => {
            console.log('点击查看')
          })
          .catch((err) => {
            console.log('err', err)
          })
        // this.$linkToEasy(
        //   '/pagesAgent/CreatedCenter/CreatedQuestion/QuestionDetail?data=' + JSON.stringify(item),
        // )
        if (item.businessType === 0) {
          //跳转到回答列表
          this.$linkToEasy('/pagesAgent/CreatedCenter/AnswerAll/NonAuthorAnswer?id=' + item.id)
        } else if (item.businessType === 3) {
          //跳转到回答详情
          this.$linkToEasy(
            '/pagesAgent/CreatedCenter/CircleDetail/AnswerDetail?id=' +
              item.id +
              '&businessType=' +
              item.businessType,
          )
        } else {
          this.$linkToEasy('/pagesAgent/CreatedCenter/CircleDetail/CircleDetail?id=' + item.id)
        }
      },
      getColumnList() {
        this.$VoHttp.apiCreateColumnList().then((res) => {
          this.columnList = res.data
        })
      },
      //获取列表数据
      getData(columnId, refresh) {
        if (this.loading) return
        showLoading()
        this.loading = true
        console.log(columnId, refresh, '===================')
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.infoList = []
          this.pageNo = 1
        }
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          businessType: '0,1,3',
        }
        if (columnId) {
          params['columnId'] = columnId
          this.infoList = []
          this.pageNo = 1
        }
        if (this.userId) {
          params['userId'] = this.userId
        }
        this.$VoHttp
          .apiCreateQuestionsQuestionList(params)
          .then((res) => {
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
              if (item.businessType === 3) {
                this.transferHtml(item)
                //问题信息
                item.title = item.communityContentVO.title

                let str = JSON.parse(item.fileUrl).json
                item.content = this.getText(str)
                //提取图片
                item.image = []
                str.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, (match, capture) => {
                  item.image.push(capture)
                })
                //提取语音
                if (item.communityContentVO.fileUrl.indexOf('.mp3') > -1 || item.communityContentVO.fileUrl.indexOf('.MP3') > -1) {
                  item.audio = [item.communityContentVO.fileUrl]
                  item.duration = item.communityContentVO.duration
                }
                //提取视频
                // item.video = []
                // str.replace(
                //   /<video [^>]*src=['"]([^'"]+)[^>]*>/g,
                //   (match, capture) => {
                //     item.video.push(capture)
                //   },
                // )
              } else {
                helpUtil.regroupFileData(item)
              }
              item.datetime = this.$vocenApi
                .dayjs(item.createTime.replace('-', '/'))
                .format('YYYY年MM月DD日')
            })
            this.infoList.push(...data)
            console.log(this.infoList)
            this.triggered = false
            this.refresh = false
            this.loadingStatus = false
            this.$forceUpdate()
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
      showTip(item) {
        this.infoList.forEach((item1) => {
          if (item1.id === item.id) {
            item1.itemtipVisible = !item.itemtipVisible
          }
        })
      },
      report(item) {
        uni.$u.toast('举报成功')
      },
      tagClick(item) {
        this.tagList.forEach((tag) => {
          tag.choosed = item.name === tag.name ? true : false
        })
      },
      //自定义下拉刷新控件被下拉
      onPulling(e) {
        // console.log('onpulling')
        if (e.detail.deltaY < 0) return // 防止上滑页面也触发下拉
        this.loadingStatus = true
        // setTimeout(() => {
        //   this.loadingStatus = false
        // }, 2000)
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
          this.getData('', true)
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
        console.log('============')
        throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.infoList.length >= this.total) {
            return false
          }
          this.pageNo++
          this.getData()
        }, 500)
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
        if (e.detail.scrollTop) {
          this.$emit('onScroll', 1)
        } else {
          this.$emit('onScroll', 2)
        }
      },
      scrolltoupper() {
        // this.$emit('onScroll', 2)
      },
      showFilter() {
        this.filterVisible = !this.filterVisible
      },
      reset() {},
      confirm(selectValue) {
        this.filterVisible = false
        console.log('selectValue', selectValue)
      },
      //举报
      showReport(item) {
        this.$emit('showReport', item)
      },
      //分享
      showShare(item) {
        this.$emit('showShare', item)
      },
      //点击更多
      showMorePop(item) {
        this.$emit('showMorePop', item)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .create-question {
    height: 100%;
    touch-action: none;
    .inline-block {
      display: inline-block;
    }

    &__list {
      .list-item {
        margin: 16rpx 0;
        position: relative;

        .title-icon {
          text-align: center;
          padding: 5px;
          background: #999;
          display: inline-block;
        }

        &__row {
          display: flex;

          .row-content {
            flex: 1;
          }

          .row-right {
            width: 80px;
            height: 80px;
            background-color: #999;
          }
        }

        .more-tip {
          background: #fff;
          text-align: center;
          padding: 10px;
          position: absolute;
          right: 10px;
          bottom: -26px;
          z-index: 99;
        }
      }
    }

    &__tag {
      // padding: 22rpx 0 22rpx 0;
      display: flex;
      background: #fff;
      align-items: center;
      position: relative;
      .tags {
        flex: 1;
        display: flex;
        white-space: nowrap;
        overflow: hidden;
        &-right {
          padding-left: 16rpx;
          padding-right: 16rpx;
          border-left: 1px solid #f7f7f8;
          &__icon {
            width: 48rpx;
            height: 48rpx;
          }
        }
      }

      .tag-item {
        display: inline-block;
        font-size: 10px;
        background-color: #f7f7f8;
        padding: 8rpx 16rpx;
        text-align: center;
        margin: 22rpx 0 22rpx 32rpx;
        border-radius: 100px;
        font-size: 24rpx;
        line-height: 1.5;
        color: $v-c0-85;
        &.choosed {
          background: $v-error-btn-disabled;
          border: 1px solid $v-error-light-two;
          color: #e50012;
        }

        .item-title {
          font-weight: bold;
        }
      }
      .filter {
        top: 96rpx;
        z-index: 99;
      }
    }

    .item-btn {
      display: inline-block;
      &.right {
        float: right;
      }
    }

    .flex-line {
      .top-row {
        display: flex;
        padding: 10px;
        align-items: center;
        position: relative;
      }

      .ava-img {
        .img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
        }
      }

      .name-text {
        padding-left: 5px;
      }
      .icon-wrap {
        padding-left: 10px;
      }

      .b-row {
        display: flex;
        justify-content: flex-end;
        padding-right: 15px;
      }
    }

    .popup-content {
      .popup-content-top {
        padding: 10px;
        display: flex;
      }
      .textarea-box {
        border: 0;
        min-height: 40px;
      }
      .btns {
        padding: 10px 20px;
        display: flex;
        .btns-right {
          text-align: right;
          flex: 1;
        }
      }
    }
  }
</style>
