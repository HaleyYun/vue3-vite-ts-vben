<template>
  <view class="concern flex flex-column">
    <VoNav is-fixed is-have-more title="我的关注">

    </VoNav>
    <view class="concern-search flex flex-vertical-c">
      <VoSearch v-model="keyword" height="34" placeholder="搜索你关注的人" @custom="handlerSearch" />
    </view>
    <scroll-view
      :refresher-threshold="10"
      :refresher-triggered="triggered"
      class="concern-list flex1"
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

      <view class="concern-list__empty" />
      <!-- <VoIcon v-if="loading" :size="20" color="#D3D4DB" name="refresh" /> -->
      <MyConcernList
        v-for="(concern, index) of myConcernList"
        :key="index"
        :attention="1"
        :my-concern-list="concern"
        @click="goToHome(concern)"
        @refresh="refreshHandler"
      />
      <VoLoadMore v-if="myConcernList.length" :show="noMore" />
      <VoNoData :is-fixed="false" v-if="!loading && myConcernList.length === 0" />
    </scroll-view>
  </view>
</template>

<script>
  import MyConcernList from './components/MyConcernList'
  import { throttle } from '@/common/helper'

  export default {
    name: 'MyConcern',
    components: { MyConcernList },
    data() {
      return {
        keyword: '', // 搜索双向绑定
        loading: false,
        isSearch: false,
        myConcernList: [],
        listData: [],

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
      this.getMyConcernList()
    },
    methods: {
      refreshHandler() {
        this.myConcernList.length = 0
        this.getMyConcernList()
      },
      //点击跳转到详情
      goToHome(concern) {
        console.log(concern)
        this.$linkToEasy(
          '/pagesAgent/PersonalHomepage/PersonalHomepage?userId=' +
            concern.targetUserId +
            '&platformCode=' +
            concern.targetPlatformCode,
        )
      },
      getMyConcernList() {
        let isfresh = this.refresh
        if (isfresh) {
          this.myConcernList = []
          this.pageNo = 1
        }
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        }
        if (this.keyword) {
          params['name'] = this.keyword
        }
        this.loading = true
        this.$VoHttp.IM.apiImMyAttentionList(params)
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
        // const { code, data } = await this.$VoHttp.IM.apiImMyAttentionList(params)
        // if (code == '20001') {
        //   this.listData = this.myConcernList = data ? data : []
        // }
        // this.loading = false
      },
      handlerSearch() {
        this.isSearch = true
        this.refresh = true
        this.getMyConcernList()
        // if (this.keyword) {
        //   this.myConcernList = this.myConcernList.filter(
        //     (item) => item.nickName.indexOf(this.keyword) > -1,
        //   )
        // } else {
        //   this.myConcernList = this.listData
        // }
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
          this.getMyConcernList()
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
          this.getMyConcernList()
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

    &-search {
      padding: 12rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
    }

    &-list {
      overflow-y: scroll;

      &__empty {
        width: 750rpx;
        height: 16rpx;
        background: #f6f7f8;
      }
    }
  }
</style>
