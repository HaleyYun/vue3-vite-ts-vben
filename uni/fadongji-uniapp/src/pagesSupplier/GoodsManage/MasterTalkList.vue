<template>
  <view class="list">
    <VoNav is-fixed title="大咖说" isHaveMore>
    </VoNav>
    <scroll-view
      class="scroll-list"
      :refresher-threshold="10"
      :refresher-triggered="triggered"
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
      <view class="h16" />
      <!-- 下拉刷新组件 -->
      <VoListFresh :show="loadingStatus" />
      <MasterItem
        class="scroll-list__item"
        v-for="item in infoList"
        :key="item.id"
        :info="item"
        @click.native="toDetail(item)"
      />
      <VoLoadMore v-if="infoList.length" :show="noMore" />
      <VoNoData v-if="!infoList.length && !refresh" no-data-tips="暂无更多内容" />
    </scroll-view>
  </view>
</template>
<script>
  import MasterItem from '@/pagesSupplier/GoodsManage/components/MasterItem.vue'
  import helpUtil, { hideLoading, showLoading, throttle } from '@/common/helper'
  export default {
    name: 'MasterTalkList',
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

        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        pageNo: 1,
        pageSize: 10,
        total: 0,
        noMore: false,
        goodId: '',
      }
    },
    onLoad(options) {
      if (options.goodId) {
        this.goodId = options.goodId
        this.getData(true)
      }

      // h5动态设置Title
      // #ifdef H5
      // uni.setNavigationBarTitle({
      //   title: this.navTitle,
      // })
      // #endif
    },
    methods: {
      toPage(item) {
        console.log(item.detailPage)
      },
      //排序弹框显隐
      showTipModal() {
        this.showTip = !this.showTip
      },
      //排序
      sort(key) {
        console.log(key)
      },
      toDetail(item) {
        //想法详情
        this.$linkToEasy(
          `/pagesAgent/CreatedCenter/CircleDetail/CircleDetail?id=${item.id}&businessType=${item.businessType}&origin=master`,
        )
      },
      //获取列表数据
      getData(refresh) {
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.infoList = []
          this.pageNo = 1
        }
        let params = {
          businessType: 1,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          businessType: 1,
          goodsId: this.goodId,
          showLevel: 1,
        }
        this.$VoHttp
          .apiCreateQuestionsQuestionList(params)
          .then((res) => {
            if (res.data) {
              let data = res.data.records
              this.total = res.data.total
              data.forEach((item) => {
                helpUtil.regroupFileData(item)
                item.datetime = this.$vocenApi.VoUtils.timeTransfer(item.createTime)
              })
              this.infoList = this.infoList.concat(data)
              if (this.infoList.length >= this.total) {
                this.noMore = true
              }
              // console.log('this.infoList', this.infoList)
              this.triggered = false
              this.refresh = false
              this.loadingStatus = false
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
          })
      },
      //自定义下拉刷新控件被下拉
      onPulling(e) {
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
          this.getData(this.columnId, true)
        }
      },
      //滚到底部加载
      scrolltolower() {
        throttle(() => {
          console.log('底部加载')
          this.refresh = false
          console.log(this.infoList.length, this.total)
          if (this.infoList.length >= this.total) {
            this.noMore = true
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
  }
</style>
