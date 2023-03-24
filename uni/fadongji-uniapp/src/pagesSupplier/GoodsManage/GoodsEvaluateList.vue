<template>
  <view class="list">
    <!-- 此页面重复，全部评价页面统一为 '/pagesSupplier/InvestmentInfo/InvestEvaluate?goodsId=' + this.info.goodsId -->
    <VoNav is-fixed title="全部评价" is-have-more>
    </VoNav>
    <view class="evaluate-tag">
      <view class="tag"> 全部(3) </view>
      <view class="tag" v-for="item in tags" :key="item">
        {{ item }}
      </view>
    </view>
    <scroll-view
      class="scroll-list"
      scroll-top="0"
      scroll-y="true"
      refresher-enabled="true"
      :refresher-triggered="triggered"
      refresher-background="#F7F7F8"
      :refresher-threshold="10"
      @refresherpulling="onPulling"
      @refresherrefresh="onRefresh"
      @refresherrestore="onRestore"
      @refresherabort="onAbort"
      @scroll="onScroll"
      @scrolltolower="scrolltolower"
      refresher-default-style="none"
    >
      <!-- 下拉刷新组件 -->
      <VoListFresh :show="loadingStatus" />
      <MasterItem
        class="scroll-list__item"
        v-for="(item, index) in infoList"
        :key="index"
        :info="item"
        pageName="evaluate"
      />
    </scroll-view>
  </view>
</template>
<script>
  import MasterItem from '@/pagesSupplier/GoodsManage/components/MasterItem.vue'
  export default {
    name: 'GoodsEvaluateList',
    components: { MasterItem },
    props: {
      // list: {
      //   type: Array,
      // },
    },
    data() {
      return {
        keyword: '',
        infoList: [],
        showTip: false,
        tags: ['安装简单(256)', '省油(256)', '服务热情(999+)', '耐磨好用(256)'],
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        pageNo: 1,
        pageSize: 10,
        total: 0,
      }
    },
    onLoad() {
      this.getData(true)
    },
    methods: {
      toPage(item) {
        console.log(item.detailPage)
      },
      toDetail(listItem) {
        this.$linkToEasy('/pagesSupplier/BusinessUniversity/CourseDetail')
      },
      //排序弹框显隐
      showTipModal() {
        this.showTip = !this.showTip
      },
      //排序
      sort(key) {
        console.log(key)
      },
      //获取列表数据
      getData(refresh) {
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.infoList = []
          this.pageNo = 1
        }
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        }
        this.$VoHttp
          .apiContentEvaluateQueryProductEvaluateInfo(params)
          .then((res) => {
            if (res.data) {
              let data = res.data
              this.total = res.data.total || data.length
              this.infoList = this.infoList.concat(data)
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
        this.$emit('onScroll', e)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .list {
    height: 100vh;
    display: flex;
    flex-direction: column;
    .scroll-list {
      flex: 1;
      overflow-y: auto;
      box-sizing: border-box;
      &__item {
        padding-top: 24rpx;
      }
    }
    .evaluate-tag {
      display: flex;
      flex-wrap: wrap;
      padding-left: 32rpx;
      padding-bottom: 20rpx;
      padding-top: 24rpx;
      margin-bottom: 16rpx;
      box-sizing: border-box;
      background-color: #fff;
      .tag {
        background: #feecee;
        border: 1px solid #f95865;
        border-radius: 100px;
        font-size: 24rpx;
        line-height: 1.5;
        text-align: center;
        color: #e50012;
        padding: 4rpx 24rpx;
        margin-right: 36rpx;
        margin-bottom: 22rpx;
      }
    }
  }
</style>
