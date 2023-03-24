<template>
  <view class="list flex flex-column">
    <VoNav :title="navTitle" :is-fixed="false" :leftWidth="72" :rightWidth="72">

      <block slot="title">
        <VoSearch v-model="keyword" height="34" :showAction="false" placeholder="请输入关键字搜索" @search="handlerCourseSearch"></VoSearch>
      </block>
      <block slot="operation">
        <view class="fz-32 color-block-65" @click="keyword = ''">取消</view>
      </block>
    </VoNav>
    <scroll-view
      :refresher-threshold="10"
      :refresher-triggered="triggered"
      class="scroll-list flex1"
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
      <block v-if="dataList.length">
        <ListItem v-for="(item, index) in dataList" :key="index" :data-obj="item" />
        <VoLoadingText :loading="loading" :has-more="dataList.length < total"/>
      </block>
      <VoNoData v-if="!dataList.length && !loading" no-data-tips="暂无课程" />
    </scroll-view>
  </view>
</template>
<script>
  import ListItem from '@/pagesSupplier/BusinessUniversity/components/ListItem'
import VoSearch from '../../components/VoSearch/VoSearch.vue'

  export default {
    name: 'SearchResult',
    components: { ListItem, VoSearch },
    props: {
      // list: {
      //   type: Array,
      // },
    },
    data() {
      return {
        navTitle: '',
        keyword: '',
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        loading: false,
        pageNo: 1,
        pageSize: 20,
        total: 0,
        dataList: [],
        type: 'default',
        origin: null,
      }
    },
    methods: {
      handlerCourseSearch() {
        if (!this.keyword) {
          helper.error('请输入搜索关键词')
          return
        }
        this.$linkToEasy(`/pagesSupplier/BusinessUniversity/SearchResult?keyword=${this.keyword}`)
      },
      toPage(item) {
        console.log(item.detailPage)
      },
      toDetail(listItem) {
        this.$linkToEasy('/pagesSupplier/BusinessUniversity/CourseDetail')
      },
      async _init_func() {
        if (this.loading) return
        this.loading = true
        if (this.refresh) {
          this.pageNo = 1
          this.dataList = []
        }
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        }
        let data
        try {
          if (this.type === 'keyword') {
            data = await this.$VoHttp.apiContentUniversitySearch(params)
          } else if (this.type === 'recommend') {// 精选课程
            if (this.origin) {
              data = await this.$VoHttp.apiContentTechnicalGuidanceRecommendCourse(params)
            } else {
              data = await this.$VoHttp.apiContentUniversityRecommendCourse(params)
            }
          } else if (this.type === 'new') {
            data = await this.$VoHttp.apiContentUniversityNewCourse(params)
          } else if (this.type === 'hot') {// 热门课程
            if (this.origin) {
              data = await this.$VoHttp.apiContentTechnicalGuidanceHotCourse(params)
            } else {
              data = await this.$VoHttp.apiContentUniversityHotCourse(params)
            }
          } else if (this.type === 'lately') {// 最近在学
            data = await this.$VoHttp.apiContentTechnicalGuidanceStudyCourse(params)
          } else {
            params.title=this.keyword
            data = await this.$VoHttp.apiContentUniversitySearch(params)
          }
          if (data && data.data && data.data.records) {
            this.dataList.push(...data.data.records)
            this.total = data.data.total
          }
        } catch (e) {
          this.$u.toast(e.message || '网络错误')
        }
        this.loading = false
        this.triggered = false
        this.refresh = false
        this.loadingStatus = false
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
        if (this.scrollTop === 0) {
          if (this.refresh) return
          this.refresh = true
          this.triggered = true
          this.loadingStatus = true
          this._init_func()
        }
      },
      //滚到底部加载
      scrolltolower() {
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.orderList.length >= this.total) {
            // uni.$u.toast('没有更多了')
            return false
          }
          this.pageNo++
          this._init_func()
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
        this.scrollTop = e.detail.scrollTop
      },
    },
    onLoad(opts) {
      this.keyword = opts.keyword

      let channel = 'default'
      if (this.keyword) {
        this.navTitle = '搜索结果'
        uni.setNavigationBarTitle({
          title: '搜索结果',
        })
        channel = 'search'
      }
      if (opts.hot) {
        this.navTitle = '热门课程'
        uni.setNavigationBarTitle({
          title: '热门课程',
        })
        channel = 'hot'
      }
      if (opts.lately) {
        this.navTitle = '最近在学'
        uni.setNavigationBarTitle({
          title: '最近在学',
        })
        channel = 'lately'
      }
      if (opts.new) {
        this.navTitle = '课程上新'
        uni.setNavigationBarTitle({
          title: '课程上新',
        })
        channel = 'new'
      }
      if (opts.recommend) {
        this.navTitle = '精选课程'
        uni.setNavigationBarTitle({
          title: '精选课程',
        })
        channel = 'recommend'
      }
      this.origin = opts?.origin || null
      this.type = channel
      this._init_func()
    },
  }
</script>
<style lang="scss" scoped>
  .list {
    height: 100vh;
    overflow: hidden;
    .scroll-list {
      flex: 1;
      overflow-y: auto;
      padding-left: 32rpx;
      box-sizing: border-box;
      background: #fff;
    }
  }
</style>
