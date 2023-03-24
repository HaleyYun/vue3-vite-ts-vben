<template>
  <view class="list flex flex-column">
    <VoNav title="店铺列表" :is-fixed="false" is-have-more />
<!--    <scroll-view-->
<!--      :refresher-threshold="10"-->
<!--      :refresher-triggered="triggered"-->
<!--      class="scroll-list flex1"-->
<!--      refresher-background="#F7F7F8"-->
<!--      refresher-default-style="none"-->
<!--      refresher-enabled="true"-->
<!--      scroll-top="0"-->
<!--      scroll-y="true"-->
<!--      @refresherabort="onAbort"-->
<!--      @refresherpulling="onPulling"-->
<!--      @refresherrefresh="onRefresh"-->
<!--      @refresherrestore="onRestore"-->
<!--      @scroll="onScroll"-->
<!--      @scrolltolower="scrolltolower"-->
<!--    >-->
    <scroll-view
      :refresher-threshold="10"
      :refresher-triggered="triggered"
      class="scroll-list flex1"
      refresher-background="#F7F7F8"
      refresher-default-style="none"
      :refresher-enabled="false"
      scroll-top="0"
      scroll-y="true"
    >
      <!-- 下拉刷新组件 -->
      <VoListFresh :show="loadingStatus" />
      <block v-if="dataList.length">
        <view
          class="flex border-box flex-vertical-c m-b-16"
          v-for="(item, index) in dataList"
          :key="index"
          @click="toDetail(item)"
        >
          <image class="list-img" :src="$transferCosUrl(item.storeUrl, 1) || '/static/default_logo.png'" />
          <view class="flex1 fz-32 color-block">{{ item.storeName }}</view>
        </view>
<!--        <VoLoadingText :loading="loading" :has-more="dataList.length < total" />-->
      </block>
      <VoNoData v-if="!dataList.length && !loading" no-data-tips="暂无数据" />
    </scroll-view>
  </view>
</template>
<script>
  export default {
    name: 'ShopStore',
    data() {
      return {
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        loading: false,
        pageNo: 1,
        pageSize: 10,
        total: 0,
        dataList: [],
      }
    },
    onLoad(options) {
      console.log(options);
      if (options.origin === 'voice') {
        //万能喊返回的数据
        let dataVoice = this.$storage.get('voiceRecords')
        this.$storage.remove('voiceRecords')
        if (dataVoice.records && dataVoice.records.records && dataVoice.records.records.length) {
          console.log('dataVoice', dataVoice.records.records)
          this.dataList = dataVoice.records.records
          this.total = dataVoice.records.total
        }
      } else {
        // this._init_func(true)
      }
    },
    methods: {
      toDetail(item){
        this.$linkToEasy('/pagesGarage/ShopList/ShopGoodsList?shopId=' + item.id)

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
            params.title = this.keyword
            data = await this.$VoHttp.apiContentUniversitySearch(params)
          }
          if (data && data.data && data.data.records) {
            let records = data.data.records
            records.forEach((item) => {
              helpUtil.regroupFileData(item, 'fileUrl', ',')
            })
            records.map((item) => {
              this.dataList.push(item)
            })
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
      padding-right: 32rpx;
      box-sizing: border-box;
      background: #fff;
    }
    &-img {
      width: 128rpx;
      height: 128rpx;
      margin-right: 16rpx;
      border-radius: 8rpx;
    }
  }
</style>
