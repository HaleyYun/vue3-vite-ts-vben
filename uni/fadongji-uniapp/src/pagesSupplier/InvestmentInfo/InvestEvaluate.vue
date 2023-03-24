<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="evaluate flex flex-column"
  >
    <VoNav is-fixed is-have-more title="全部评价" />

    <scroll-view
      :refresher-threshold="10"
      :refresher-triggered="triggered"
      class="flex1 overflow-y"
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
      <EvaluateTags v-if="tagList && tagList.length" :tags="tagList" @chooseFn="chooseFn" />
      <!--      <view class="evaluate-line" />-->
      <EvaluateItem
        v-for="(item, index) in evaluateData"
        :key="index"
        :evaluate-data="item"
        class="evaluate-item"
      />
      <VoNoData v-if="!evaluateData.length && !refresh" no-data-tips="暂无数据" />
    </scroll-view>
    <u-gap :height="$systemInfo.safeAreaInsets.bottom" />
  </view>
</template>

<script>
  import EvaluateTags from './components/EvaluateTags'
  import EvaluateItem from './components/EvaluateItem'

  export default {
    components: {
      EvaluateTags,
      EvaluateItem,
    },
    data() {
      return {
        tagList: [],
        evaluateData: [],
        goodsId: '',
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        triggered: false,
        pageNo: 1,
        pageSize: 10,
        total: 0,
        companyId: '',
        chooseList: [], // 选中的评价标签列表
      }
    },
    onLoad(options) {
      this.companyId = options.companyId || ''
      if (options.goodsId) {
        this.goodsId = options.goodsId
        if (this.goodsId) {
          this.getData(true)
          this.getTags()
        }
      }
    },
    methods: {
      getTags() {
        //获取好评度及评价总数,获取评价标签
        let param = {
          sourceId: this.goodsId,
        }
        if (this.companyId) {
          param.companyId = this.companyId
        }
        this.$VoHttp.apiOrderEvaluateFavorableComment(param).then((res) => {
          if (res.data) {
            let keywordVOList = res.data.keywordVOList
            this.tagList = keywordVOList.map((item) => {
              return {
                ...item,
                choose: false,
              }
            })
          }
        })
      },
      /**
       * 选择评价标签
       * @param e 选中的评价标签列表
       */
      chooseFn(e) {
        console.log(e, 8888888888888888)
        this.chooseList = e

        this.getData(true)
      },
      //获取评价
      getData(refresh) {
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.evaluateData = []
          this.pageNo = 1
        }
        this.$VoHttp
          .apiContentEvaluateQueryProductEvaluatePage({
            sourceType: 0,
            sourceId: this.goodsId,
            pageNo: this.pageNo,
            pageSize: this.pageSize,
            keywords: this.chooseList,
          })
          .then((res) => {
            if (res.data) {
              let data = res.data.records
              this.total = res.data.total
              data.forEach((item) => {
                if (item.content) {
                  item.mainContent = JSON.parse(item.content)
                  item.mainContent.imgArr = item.mainContent.pic
                    ? JSON.parse(item.mainContent.pic)
                    : []
                }
              })
              this.evaluateData = this.evaluateData.concat(data)

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
      },
      //自定义下拉刷新控件被下拉
      onPulling(e) {
        if (e.detail.deltaY < 0) return // 防止上滑页面也触发下拉
        this.loadingStatus = true
      },
      //自定义下拉刷新被触发
      onRefresh() {
        console.log('onRefresh下拉刷新')
        if (this.scrollTop === 0) {
          if (this.refresh) return
          this.refresh = true
          this.triggered = true
          this.loadingStatus = true
          this.getData()
        }
      },
      //滚到底部加载
      scrolltolower() {
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.evaluateData.length >= this.total) {
            uni.$u.toast('没有更多了')
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
        this.scrollTop = e.detail.scrollTop
      },
    },
  }
</script>

<style lang="scss" scoped>
  .evaluate {
    width: 750rpx;
    height: 100vh;
    background-color: #ffffff;
    box-sizing: border-box;

    &-item {
      padding: 0rpx 32rpx;
    }
    &-line {
      height: 16rpx;
      width: 750rpx;
      background-color: $v-bg-light;
    }
  }
</style>
