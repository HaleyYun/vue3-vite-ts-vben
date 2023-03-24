<template>
  <view>
    <view class="good fz-28 color-block">
      <VoNav :rightWidth="200" is-fixed is-have-more title="型号申请记录">
      </VoNav>
      <!-- <view class="top-search">
        <VoSearch v-model="keyword" placeholder="请输入搜索" />
      </view> -->
      <view class="good-tabs">
        <EraTabs
          :current="current"
          :list="tabs"
          :activeStyle="{ 'font-size': '32rpx', color: '#FF5319', fontWeight: 500 }"
          class="tabs"
          inactiveStyle="font-size: 28rpx"
          itemStyle="padding: 24rpx 24rpx 30rpx 24rpx;"
          @change="tabChange"
        />
      </view>

      <swiper :current="current" class="swiper" @change="swiperChange">
        <swiper-item v-for="(item, index) in tabs" :key="index" class="swiper-item">
          <scroll-view
            :refresher-threshold="10"
            :refresher-triggered="triggered"
            :scroll-y="true"
            class="scroll-list"
            refresher-background="#F7F7F8"
            refresher-default-style="none"
            refresher-enabled="true"
            scroll-top="0"
            @refresherabort="onAbort"
            @refresherpulling="onPulling"
            @refresherrefresh="onRefresh"
            @refresherrestore="onRestore"
            @scroll="onScroll"
            @scrolltolower="scrolltolower"
          >
            <!-- 下拉刷新组件 -->
            <VoListFresh :show="loadingStatus" />
            <view
              class="record-item bg-white m-b-16"
              v-for="listItem in infoList"
              :key="listItem.id"
              @click="toDetail(listItem)"
            >
              <view class="flex flex-justify-between border-bottom p-b-32">
                <view class="color-block-45">{{ listItem.createTime }}</view>
                <view v-if="listItem.status === 1" class="color-y">审核中</view>
                <view v-else-if="listItem.status === 2" class="color-g">已通过</view>
                <view v-else-if="listItem.status === 3" class="color-r">未通过</view>
              </view>
              <view class="p-b-16 p-t-16"> 品牌名称：{{ listItem.applyModel }} </view>
            </view>
            <u-loadmore
              v-if="noMore && infoList.length"
              line
              status="nomore"
              nomore-text="暂无更多内容"
              lineColor="rgba(0, 0, 0, 0.08)"
              color="rgba(0, 0, 0, 0.45)"
            />

            <VoNoData
              v-if="!infoList.length && !isLoading"
              no-data-tips="暂无型号申请记录"
              imgUrl="/static/noData/noGoods.png"
            />
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>
<script>
  import { showLoading, hideLoading } from '@/common/helper'

  export default {
    name: 'TypeRecord',
    data() {
      return {
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        pageNo: 1,
        pageSize: 20,
        total: 0,
        noMore: false,
        isLoading: false,
        current: 1,
        tabs: [
          {
            name: '全部',
            num: '',
            value: 0,
            index: 0,
          },
          {
            name: '审核中',
            num: '',
            value: 1,
            index: 1,
          },
          {
            name: '已审核',
            num: '',
            value: 2,
            index: 2,
          },
        ],
        infoList: [
          {
            id: '11',
            status: 1,
          },
          {
            id: '22',
            status: 2,
          },
          {
            id: '33',
            status: 3,
          },
          {
            id: '44',
            status: 4,
          },
        ],
      }
    },
    onLoad() {
      this.getData(true)
    },
    methods: {
      toDetail(item) {
        console.log(item);
        this.$linkToEasy('./TypeRecordDetail?id=' + item.id)
      },
      //tab点击
      tabChange(tab) {
        console.log('tab', tab)
        if (this.current === tab.index) {
          return
        }
        this.current = tab.index
        this.getData(true)
      },
      //swiper切换
      swiperChange(event) {
        if (this.current === event.detail.current) {
          return
        }
        this.current = event.detail.current
        this.getData(true)
      },
      //获取列表数据
      getData(refresh) {
        showLoading()
        let isfresh = refresh || this.refresh
        this.isLoading = true
        if (isfresh) {
          this.infoList = []
          this.pageNo = 1
        }
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          queryStatus: this.tabs[this.current].value,
          orderProperty:'update_time',
          orderType:'DESC'

        }
        this.$VoHttp
          .apiGoodsModelApplyQuery(params)
          .then((res) => {
            console.log(res)
            if (res.code === '20001') {
              let data = res.data.records || []
              this.total = res.data.total
              this.infoList = [...this.infoList, ...data]
              console.log('this.infoList', this.infoList)
              this.triggered = false
              this.refresh = false
              this.loadingStatus = false
              this.isLoading = false
              hideLoading()
              this.noMore = this.infoList.length >= this.total
            } else {
              uni.$u.toast(res.message)
              hideLoading()
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '请检查网络')
            hideLoading()
            this.isLoading = false
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
        // this.loadingStatus = true
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
          if (this.infoList.length >= this.total) {
            // uni.$u.toast('没有更多了')
            this.noMore = true
            return false
          }
          this.noMore = false
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
        // console.log(111, e.detail)
        this.scrollTop = e.detail.scrollTop
        this.$emit('onScroll', e)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .good {
    height: 100vh;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    background: #f7f7f8;
    .nav-right {
      display: flex;
      width: auto;
      &__btn {
        background: #22284b;
        border-radius: 100px;
        font-size: 24rpx;
        line-height: 1.5;
        color: #ffffff;
        padding: 14rpx 36rpx;
        text-align: center;
        margin-right: 24rpx;
      }
    }
    &-tabs {
      background-color: #ffffff;
    }
    .top-search {
      padding: 12rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
    }
    .swiper {
      flex: 1;
      &-item,
      .scroll-list {
        height: 100%;
      }
    }
    .record-item {
      padding: 32rpx;
      box-sizing: border-box;
    }
    .color-y {
      color: #ff9b05;
    }
    .color-g {
      color: #07c160;
    }
    .color-r {
      color: #EE0A24;
    }
  }
</style>
