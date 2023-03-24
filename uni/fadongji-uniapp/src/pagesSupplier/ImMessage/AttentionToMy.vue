<template>
  <view class="concern flex flex-column">
    <VoNav is-fixed title="关注我的" is-have-more isShadow>
    </VoNav>
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

      <view v-if="myConcernList.length > 0">
        <MyConcernList
          :my-concern-list="concern"
          v-for="(concern, index) of myConcernList"
          :key="index"
          :attention="2"
          @refresh="refreshHandler"
        />
      </view>
      <!-- <view class="loading-more" v-if="loading">
        <VoIcon name="refresh" :size="20" color="#D3D4DB" />
      </view> -->
      <VoLoadMore v-if="myConcernList.length" :show="noMore" />
      <VoNoData v-if="!loading && !myConcernList.length" />
    </scroll-view>
  </view>
</template>

<script>
  import MyConcernList from './components/MyConcernList'
  import { throttle } from '@/common/helper'
  export default {
    name: 'AttentionToMy',
    components: { MyConcernList },
    data() {
      return {
        loading: false,
        keyword: '', // 搜索双向绑定
        myConcernList: [],

        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        pageNo: 1,
        pageSize: 20,
        total: 0,
        noMore: false,
      }
    },
    created() {
      this.getAttentionMeList()
    },
    methods: {
      refreshHandler() {
        this.myConcernList.length = 0
        this.getAttentionMeList()
      },
      getAttentionMeList() {
        // try {
        //   this.loading = true
        //   const { code, data } = await this.$VoHttp.IM.apiImAttentionMeList()
        //   if (code == '20001') {
        //     this.myConcernList = data ? data : []
        //   }
        //   this.loading = false
        // } catch (e) {
        //   this.loading = false
        //   console.log(e)
        // }
        let isfresh = this.refresh
        if (isfresh) {
          this.myConcernList = []
          this.pageNo = 1
        }
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        }
        this.loading = true
        this.$VoHttp.IM.apiImAttentionMeList(params)
          .then((res) => {
            let data = res.data.records
            this.total = res.data.total
            this.myConcernList = this.myConcernList.concat(data)
            if (this.myConcernList.length >= this.total) {
              this.noMore = true
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
        if (this.scrollTop === 0) {
          if (this.refresh) return
          this.refresh = true
          this.triggered = true
          this.loadingStatus = true
          this.getAttentionMeList()
        }
      },
      //滚到底部加载
      scrolltolower() {
        throttle(() => {
          console.log('底部加载')
          this.refresh = false
          console.log(this.myConcernList.length, this.total)
          if (this.myConcernList.length >= this.total) {
            this.noMore = true
            return false
          }
          this.pageNo++
          this.getAttentionMeList()
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
  .concern {
    height: 100vh;
    width: 100%;
    &-search {
      padding: 12rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
    }
  }
</style>
