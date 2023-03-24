<template>
  <view class="search flex flex-column">
    <!--  搜索  -->
    <VoBatteryBar />
    <view class="search-search flex flex-vertical-c">
      <VoIcon :size="24" name="left-arrow" @click="$backFn" />
      <VoSearch
              v-model.trim="param.userName"
              height="34"
              placeholder="请输入搜索"
              @change="getData"
              @clear="clear"
      />
    </view>
    <scroll-view
            class="workbench flex1"
            scroll-top="0"
            :refresher-enabled="true"
            :refresher-triggered="triggered"
            refresher-background="#F7F7F8"
            refresher-default-style="none"
            scroll-y="true"
            @refresherabort="onAbort"
            @refresherpulling="onPulling"
            @refresherrefresh="onRefresh"
            @refresherrestore="onRestore"
            @scroll="onScroll"
            @scrolltolower="scrolltolower"
    >
      <VoListFresh :show="loadingStatus" />
      <view v-if="contactList.length > 0" class="search-contact">
        <view class="search-contact__tips" v-if="param.type == 2">联系人</view>
        <view class="search-contact__tips" v-else>好友列表</view>
        <view v-for="(concern, index) of contactList"
              :key="index" @click.capture.stop="goChatPage(concern)">
          <MyConcernList :my-concern-list="concern"/>
        </view>
        <VoLoadingText  :loading="loading" :has-more="contactList.length < total" />
      </view>
      <VoNoData v-if="contactList.length === 0 && !loading" />
    </scroll-view>

    <!-- <view class="search-more">
      <view class="search-more__list flex flex-vertical-c flex-justify-between">
        <view>更多聊天记录</view>
        <VoIcon :opacity="0.25" name="right-arrow" />
      </view>
    </view> -->
  </view>
</template>

<script>
  import MyConcernList from './components/MyConcernList'
  import { hideLoading, showLoading, toRoleHome } from '@/common/helper'
  export default {
    name: 'SearchMore',
    components: { MyConcernList },
    data() {
      return {
        loading:false,
        //下拉刷新上拉加载
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        total:0,
        contactList: [],
        param: {
          userName: '', // 搜索双向绑定
          pageNo:1,
          pageSize:10,
          type:0, // 搜索类型(0:全部  1:好友列表  2:消息列表 3:聊天记录)
        },
      }
    },
    onLoad(option) {
      if (option.keyword) {
        this.param.userName = option.keyword
        this.param.type = option.type
      }
    },
    methods: {
      clear() {
        this.$storage.set('toIm', 1)
        toRoleHome()
      },
      /**
       * 获取搜索结果
       */
      getData() {
        if (!this.param.userName) return
        this.loading = true;
        this.$VoHttp.IM.apiImMessageListSearch(this.param)
            .then((res) => {
              if(this.param.type == 2){
                this.contactList = this.contactList.concat(res.data.messageList.records)
                this.total = res.data.messageList.total;
              }else if(this.param.type == 1) {
                this.contactList = this.contactList.concat(res.data.myFriend.records)
                this.total = res.data.myFriend.total;
              }
            })
            .catch((e) => {
              this.$u.toast(e.message || '网络请求失败')
            })
            .finally(() => {
              this.loading = false;
              this.loadingStatus = false
              this.triggered = false
              this.refresh = false
            })
      },
      /**
       * 去聊天详情页
       */
      goChatPage(data) {
        console.log(data, '聊天列表页面进入')
        const info = {
          targetId: data.targetId || data.friendId,
          type: 0,
          note: data.targetName,
          platformCode: data.targetPlatformCode || data.platformCode,
        }
        this.$storage.set('temp_im_room_info', info)
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
      },

      //自定义下拉刷新控件被下拉
      onPulling(e) {
        if (e.detail.deltaY < 0 ) return // 防止上滑页面也触发下拉
        this.loadingStatus = true
      },
      //自定义下拉刷新被触发
      onRefresh() {
        console.log('onRefresh下拉刷新',this.scrollTop)
        if (this.scrollTop === 0 ) {
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
          if (this.contactList.length >= this.total) {
            uni.$u.toast('已经到底了')
            return false
          }
          this.param.pageNo++
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
      onScroll(){}


    },
  }
</script>

<style lang="scss" scoped>
  .search {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    &-search {
      padding: 12rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
    }
    &-contact {
      margin-top: 16rpx;
      background: #ffffff;
      &__tips {
        height: 42rpx;
        line-height: 42rpx;
        font-size: 28rpx;
        font-weight: bold;
        padding: 24rpx 0 0 32rpx;
      }
    }
    &-more {
      background: #ffffff;
      &__list {
        padding: 24rpx 32rpx 24rpx 0;
        margin-left: 32rpx;
        font-size: 28rpx;
        color: $v-c0-85;
        border-top: 2rpx solid $v-bg-light;
        border-bottom: 2rpx solid $v-bg-light;
      }
    }
    .workbench{
      flex: 1;
      overflow: hidden;
    }
  }
</style>
