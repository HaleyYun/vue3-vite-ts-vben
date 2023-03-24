<template>
  <view class="list">
    <VoNav :leftWidth="72" :rightWidth="88" :title="navTitle" is-fixed>
      <view slot="title">
        <VoSearch
          v-model="keyWord"
          :showAction="false"
          placeholder="请输入搜索"
          height="34"
          @custom="SearchFn"
          @search="SearchFn"
        />
      </view>
      <view slot="operation">
        <view class="fz-32 color-block-65" @click="SearchFn">搜索</view>
      </view>
    </VoNav>
    <scroll-view
      v-if="dataList.length > 0"
      :refresher-threshold="10"
      :refresher-triggered="triggered"
      class="scroll-list"
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
      <ListItem v-for="(item, index) in dataList" :key="index" :data-obj="item" />
    </scroll-view>
    <VoNoData v-else />
  </view>
</template>
<script>
  import ListItem from './components/ListItem'
  import helpUtil from '@/common/helper'
  import { hideLoading, regroupFileData } from '../../common/helper'

  export default {
    name: 'CourseList',
    components: { ListItem },
    props: {
      // list: {
      //   type: Array,
      // },
    },
    data() {
      return {
        triggered: false,
        navTitle: '正时指导',
        keyWord: '',
        pageNo: 1,
        pageSize: 10,
        total: 0,
        dataList: [],
        categoryId: '', // 分类id
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        curLength: 0,
        type: 1, // 如果type等于1是从收藏页面跳转进结果页的
      }
    },
    methods: {
      toPage(item) {
        console.log(item.detailPage)
      },
      toDetail(listItem) {
        this.$linkToEasy('/pagesGarage/TechnicalGuidance/CourseDetail')
      },
      SearchFn() {
        console.log('this.type==', this.type)
        if (!this.type == 1) {
          this._init_func()
        } else {
          this.coursData(true)
        }
      },
      // 收藏接口
      async _init_func() {
        this.dataList = await this.$VoHttp
          .apiContentTechnicalGuidanceMyCollection({ keyword: this.keyWord })
          .then((res) => {
            if (res && res.data) {
              // return res.data.records.map((item) => ({ ...item, check: false }))
              let records = res.data.records
              records.forEach((item) => {
                item.check = false
                helpUtil.regroupFileData(item, 'fileUrl', ',')
              })
              return records
            } else {
              return []
            }
          })
          .catch((err) => {
            return []
          })
      },
      async coursData(refresh) {
        let param = {
          keyword: this.keyWord,
          categoryId: this.categoryId,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        }
        if (this.currentModelId) {
          param.modal = this.currentModelId
        }
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.dataList = []
          param.pageNo = 1
          this.curLength = 0
        }
        this.$VoHttp
          .apiContentTechnicalGuidanceSearch(param)
          .then((res) => {
            if (res && res.data) {
              let data = res.data.records
              data.forEach((item) => {
                regroupFileData(item, 'fileUrl', ',')
              })
              this.total = res.data.total
              this.dataList = this.dataList.concat(data)
              console.log(this.dataList, 'this.dataList')
              this.triggered = false
              this.refresh = false
              this.loadingStatus = false
              hideLoading()
            }
          })
          .catch((err) => {
            uni.$u.toast(err.message || '请检查网络')
            this.triggered = false
            this.refresh = false
            this.loadingStatus = false
            hideLoading()
          })

        // this.$VoHttp
        //   .apiContentUniversitySelectCourse(param)
        //   .then((res) => {
        //     if (res.data) {
        //       console.log(res.data, 'res.data')
        //       let data = res.data.records
        //       data.forEach((item) => {
        //         regroupFileData(item, 'fileUrl', ',')
        //       })
        //       this.total = res.data.total
        //       this.dataList = this.dataList.concat(data)
        //       console.log(this.dataList, 'this.dataList')
        //       this.triggered = false
        //       this.refresh = false
        //       this.loadingStatus = false
        //       hideLoading()
        //       this.$forceUpdate()
        //     }
        //   })
        //   .catch((err) => {
        //     console.log('err', err)
        //     uni.$u.toast(err.message || '请检查网络')
        //   })
      },
      //自定义下拉刷新控件被下拉
      onPulling(e) {
        // console.log('onpulling')
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
          this.coursData(true)
        }
      },
      //滚到底部加载
      scrolltolower() {
        console.log('底部加载this.loadingStatus', this.loadingStatus)
        if (this.loadingStatus) return
        this.loadingStatus = true
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.dataList.length >= this.total) {
            uni.$u.toast('没有更多了')
            return false
          }
          this.pageNo++
          this.coursData()
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
      },
      // async _init_func(channel) {
      //   if (channel === 'keyWord') {
      //     this.dataList = await this.$VoHttp
      //       .apiContentTechnicalGuidanceSearch({
      //         title: this.keyWord,
      //         pageNo: this.pageNo,
      //         pageSize: this.pageSize,
      //       })
      //       .then((res) => {
      //         if (res && res.data) {
      //           return res.data.records
      //         }
      //       })
      //       .catch((err) => {
      //         return []
      //       })
      //   } else if (channel === 'recommend') {
      //     this.dataList = await this.$VoHttp
      //       .apiContentTechnicalGuidanceRecommendCourse({
      //         pageNo: this.pageNo,
      //         pageSize: this.pageSize,
      //       })
      //       .then((res) => {
      //         if (res && res.data) {
      //           return res.data.records
      //         }
      //       })
      //       .catch((err) => {
      //         return []
      //       })
      //   } else if (channel === 'new') {
      //     // this.dataList = await this.$VoHttp
      //     //   .apiContentUniversityNewCourse({
      //     //     pageNo: this.pageNo,
      //     //     pageSize: this.pageSize,
      //     //   })
      //     //   .then((res) => {
      //     //     if (res && res.data) {
      //     //       return res.data.records
      //     //     }
      //     //   })
      //     //   .catch((err) => {
      //     //     return []
      //     //   })
      //   } else if (channel === 'hot') {
      //     this.dataList = await this.$VoHttp
      //       .apiContentTechnicalGuidanceHotCourse({
      //         pageNo: this.pageNo,
      //         pageSize: this.pageSize,
      //       })
      //       .then((res) => {
      //         if (res && res.data) {
      //           return res.data.records
      //         }
      //       })
      //       .catch((err) => {
      //         return []
      //       })
      //   } else {
      //     this.dataList = await this.$VoHttp
      //       .apiContentTechnicalGuidanceStudyCourse({
      //         pageNo: this.pageNo,
      //         pageSize: this.pageSize,
      //       })
      //       .then((res) => {
      //         if (res && res.data) {
      //           return res.data.records
      //         }
      //       })
      //       .catch((err) => {
      //         return []
      //       })
      //   }
      // },
    },
    onLoad(opts) {
      console.log(opts, '===========')
      this.keyWord = opts.keyWord
      if (opts.type) {
        this.type = opts.type
        this._init_func()
        return
      }

      if (opts.id) {
        this.categoryId = opts.id
      }
      if (opts.title) {
        this.navTitle = opts.title
      }
      if (opts.currentModelId) {
        this.currentModelId = opts.currentModelId
      }
      let channel = 'default'

      this.coursData(1)
      if (this.keyWord) {
        this.navTitle = '搜索结果'
        uni.setNavigationBarTitle({
          title: '搜索结果',
        })
        channel = 'search'
      }
      if (opts.hot) {
        this.navTitle = '热门内容'
        uni.setNavigationBarTitle({
          title: '热门课程',
        })
        channel = 'hot'
      }
      if (opts.new) {
        this.navTitle = '课程上新'
        uni.setNavigationBarTitle({
          title: '课程上新',
        })
        channel = 'new'
      }
      if (opts.recommend) {
        this.navTitle = '精选内容'
        uni.setNavigationBarTitle({
          title: '精选课程',
        })
        channel = 'recommend'
      }

      // this.this._init_func(channel)
    },
  }
</script>
<style lang="scss" scoped>
  .list {
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    &-search {
      padding: 8rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
    }
    .scroll-list {
      flex: 1;
      overflow-y: auto;
      padding-left: 32rpx;
      box-sizing: border-box;
      background: #fff;
    }
  }
</style>
