<template>
  <view>
    <view class="list flex flex-column">
      <VoNav :right-width="200" :title="navTitle" is-fixed is-have-more>

      </VoNav>
      <view class="course-search">
        <VoSearch
          v-model.lazy="keyWord"
          :actionStyle="{ color: '#fff' }"
          :showInsideAction="true"
          bgColor="#fff"
          borderColor="#FF5319"
          height="34"
          placeholder="请输入搜索"
          @custom="searchFn"
          @search="searchFn"
        />
        <!-- <image
          @click="modelPopup = true"
          class="scree-icon"
          src="/static/created/product/screening_grey.png"
        /> -->
        <view class="flex flex-vertical-c" @click="modelPopup = true">
          <view class="fz-28 m-r-4 color-block-85 m-l-24">筛选</view>
          <image class="scree-icon" src="/static/created/product/screening_grey.png" />
        </view>
        <!-- <VoBadge
        v-if="modelName"
        value="1"
        class="scree-badge"
        customStyle="width: 40rpx;height: 40rpx;text-align: center;line-height:34rpx;justify-content: center;"
      /> -->
      </view>
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
          <block v-if="categoryId">
            <view class="course-list">
              <CourseItem
                v-for="(item, i) in dataList"
                :key="i"
                :data-obj="item"
                more
                @click="clickItem"
              />
            </view>
          </block>
          <block v-else>
            <ListItem v-for="(item, i) in dataList" :key="i" :data-obj="item" />
          </block>
          <VoLoadingText :has-more="dataList.length < total" :loading="loading" />
        </block>
        <VoNoData v-if="!dataList.length && !loading" no-data-tips="暂无课程" />
      </scroll-view>
    </view>
    <u-popup :safeAreaInsetTop="true" :show="modelPopup" closeOnClickOverlay mode="right">
      <view class="flex flex-column modelPopup">
        <view class="p-t-30 p-l-32 w-full p-r-22 flex border-box flex-vertical-c">
          <VoSearch
            v-model.lazy="modelName"
            :showAction="false"
            actionText="搜索"
            height="34"
            placeholder="请输入搜索"
            @custom="modelSearch"
          />
          <text class="fz-32 m-l-40 color-block-65 lh45" @click="modelPopup = false">取消</text>
        </view>
        <scroll-view class="pop-content" scroll-y>
          <block v-for="(item, index) in modelList" :key="index">
            <view :key="item.initials" class="p-l-56 fz-24">{{ item.initials }}</view>
            <view
              v-for="val in item.modelVOS"
              :key="val.id + item.initials"
              :class="{ 'pop-content-select': currentModelId == val.id }"
              class="pop-content-item"
              @click="selectModelId(val.id)"
              >{{ val.model }}</view
            >
          </block>
        </scroll-view>
      </view>
    </u-popup>
  </view>
</template>
<script>
  import ListItem from './components/ListItem'
  import CourseItem from './components/CourseItem'
  import helpUtil from '@/common/helper'

  export default {
    name: 'CourseList',
    components: { ListItem, CourseItem },
    props: {
      // list: {
      //   type: Array,
      // },
    },
    data() {
      return {
        currentModelId: '',
        modelList: [],
        modelName: '',
        modelPopup: false,
        categoryId: '',
        navTitle: '',
        keyWord: '',
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
    watch: {
      modelName(newValue, oldValue) {
        this.getModelList()
      },
      // keyWord() {
      //   this.refresh = true
      //   this._init_func()
      // },
    },
    mounted() {
      this.getModelList()
    },
    methods: {
      searchFn() {
        this.refresh = true
        this._init_func()
      },
      clickItem(data) {
        this.$linkToEasy(`/pagesGarage/TechnicalGuidance/CourseDetail?id=${data.id}`)
      },
      selectModelId(val) {
        this.currentModelId == val ? (this.currentModelId = '') : (this.currentModelId = val)
        this.modelPopup = false
        this.refresh = true
        this._init_func()
      },
      modelSearch() {},
      confirmService() {},
      toPage(item) {
        console.log(item.detailPage)
      },
      toDetail(listItem) {
        this.$linkToEasy('/pagesSupplier/BusinessUniversity/CourseDetail')
      },
      async getModelList() {
        try {
          const res = await this.$VoHttp.apiGoodsModelContentModelList({ keyword: this.modelName })
          console.log(res)
          this.modelList = res.data
        } catch (err) {
          console.log(err)
        }
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
          model: this.currentModelId,
          keyword: this.keyWord,
        }
        if (this.categoryId) {
          params.categoryIds = [this.categoryId]
        }
        let data
        try {
          if (this.categoryId) {
            data = await this.$VoHttp.apiContentTechnicalGuidanceSearch(params)
          } else if (this.type === 'keyWord') {
            data = await this.$VoHttp.apiContentUniversitySearch(params)
          } else if (this.type === 'recommend') {
            // 精选课程
            if (this.origin) {
              data = await this.$VoHttp.apiContentTechnicalGuidanceRecommendCourse(params)
            } else {
              data = await this.$VoHttp.apiContentUniversityRecommendCourse(params)
            }
          } else if (this.type === 'new') {
            data = await this.$VoHttp.apiContentUniversityNewCourse(params)
          } else if (this.type === 'hot') {
            // 热门课程
            if (this.origin) {
              data = await this.$VoHttp.apiContentTechnicalGuidanceHotCourse(params)
            } else {
              data = await this.$VoHttp.apiContentUniversityHotCourse(params)
            }
          } else if (this.type === 'lately') {
            // 最近在学
            data = await this.$VoHttp.apiContentTechnicalGuidanceStudyCourse(params)
          } else {
            data = await this.$VoHttp.apiContentUniversityStudyCourse(params)
          }
          if (data && data.data && data.data.records) {
            let records = data.data.records
            records.forEach((item) => {
              helpUtil.regroupFileData(item, 'fileUrl', ',')
            })
            this.dataList.push(...records)
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
          if (this.dataList.length >= this.total) {
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
      if (opts.categoryId) {
        this.navTitle = opts.name
        this.categoryId = opts.categoryId
      }

      let channel = 'default'
      if (this.keyWord) {
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
      padding: 0 32rpx;
      box-sizing: border-box;
      background: #fff;
      margin-top: 16rpx;
      padding-top: 20rpx;
    }
  }
  .course-search {
    padding: 8rpx 32rpx;
    box-sizing: border-box;
    background: #fff;
    display: flex;
    align-items: center;
    position: relative;
    .scree-icon {
      flex-shrink: 1;
      width: 40rpx;
      height: 40rpx;
    }
    .scree-badge {
      position: absolute;
      top: -10rpx;
      right: -20rpx;
    }
  }
  .course-list {
    width: 100%;
    column-count: 2; //分为两列,用于瀑布流
    column-gap: 32rpx;
    row-gap: 24rpx;
  }

  .modelPopup {
    align-items: center;
    height: 100vh;
    overflow: hidden;
  }
  .pop-content {
    flex: 1;
    overflow-y: scroll;
    padding: 0 32rpx 0 32rpx;
    border-bottom: 2rpx solid #f7f7f8;
    &-item {
      box-sizing: border-box;
      width: 606rpx;
      height: 64rpx;
      margin: 24rpx auto;
      text-align: center;
      line-height: 64rpx;
      font-size: 24rpx;
      border-radius: 64rpx;
      border: 2rpx solid #f6f7f8;
      background: #f6f7f8;
      color: rgba(0, 0, 0, 0.85);
    }
    &-select {
      background: #ffece5;
      border: 2rpx solid #ff6633;
      color: #ff6633;
    }
  }
</style>
