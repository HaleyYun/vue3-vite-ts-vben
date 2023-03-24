<template>
  <view class="list">
    <VoNav is-fixed is-have-more title="投诉记录">

    </VoNav>
    <view class="subsection-wrap">
      <EraTabs
        :current="current"
        :list="list"
        :scrollable="false"
        activeStyle="font-weight: bold;color: #FF5319;font-size: 16px;"
        class="order-tab"
        inactiveStyle="color: rgba(0, 0, 0, 0.45);font-size: 14px;"
        line-color="#FF5319"
        @click="sectionChange"
      />
    </view>

    <scroll-view
      v-if="dataList.length"
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
      <!-- 下拉刷新组件 -->
      <VoListFresh :show="loadingStatus" />
      <!--      <RecordItem-->
      <!--        v-for="(item, index) in dataList"-->
      <!--        :key="index"-->
      <!--        :dataObj="item"-->
      <!--        :reasonData="reasonData"-->
      <!--        @play="audioPlayStart"-->
      <!--        @undoSucess="_init_func(true)"-->
      <!--      />-->
      <RecordItem
        v-for="(item, index) in dataList"
        :key="index"
        :dataObj="item"
        :reasonData="reasonData"
        @undoSucess="_init_func(true)"
      />
      <VoLoadingText :has-more="dataList.length < total" :loading="loading" />
    </scroll-view>
    <VoNoData v-else-if="!dataList.length && !loading" />
    <vo-safety-area :is-fixed="false" />
    <!-- <VoModal
      v-show="modalVisible"
      :show="modalVisible"
      showCancelButton
      @confirm="confirmExit"
      @cancel="cancelExit"
    >
      <view class="slot-content"> 确认要撤销吗？ </view>
    </VoModal> -->
  </view>
</template>
<script>
  import RecordItem from './components/RecordItem'
  import helpUtil from '@/common/helper'

  export default {
    name: 'ComplaintRecord',
    components: { RecordItem },
    props: {
      // list: {
      //   type: Array,
      // },
    },
    data() {
      return {
        list: [
          {
            name: '全部',
          },
          {
            name: '处理中',
          },
          {
            name: '待评价',
          },
          {
            name: '已完成',
          },
        ],
        current: 0,
        pageNo: 1,
        pageSize: 10,
        total: 0,
        modalVisible: false,

        dataList: [
          //{
          //  id: '1',
          //},
          //{
          //  id: '2',
          //},
          //{
          //  id: '3',
          //},
          //{
          //  id: '4',
          //},
          //{
          //  id: '5',
          //},
          //{
          //  id: '9',
          //},
          //{
          //  id: '91',
          //},
        ],
        loadingStatus: false,
        refresh: false,
        triggered: false,
        scrollTop: 0,
        loading: false,
        reasonData: {},
      }
    },
    onShow() {
      this.getReasonList()
      this._init_func(true)
    },
    methods: {
      getReasonList() {
        this.$VoHttp
          .apiContentComplaintType()
          .then((res) => {
            let data = res.data
            data.forEach((item) => {
              this.reasonData[item.code] = item.name
            })
          })
          .catch((err) => {
            console.log(err)
          })
      },
      // 语音播放
      play() {
        this.status = 2
        this.videoContext.play()
      },
      // 语音暂停
      stop() {
        this.videoContext.pause()
        this.status = 1
      },
      //切换tab
      sectionChange(e) {
        this.current = e.index
        this._init_func(1)
      },
      toPage(item) {
        console.log(item.detailPage)
      },
      toDetail(listItem) {
        this.$linkToEasy('/pagesSupplier/BusinessUniversity/CourseDetail')
      },
      _init_func(refresh) {
        if (this.loading) return
        this.loading = !this.loading
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.dataList = []
          this.pageNo = 1
        }
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          dealStatus: 3,
        }
        if (this.current === 1) {
          params['dealStatus'] = 0
        }
        if (this.current === 2) {
          params['dealStatus'] = 2
          params.isEvaluate = 0
        }
        if (this.current === 3) {
          params['dealStatus'] = 2
          params['isEvaluate'] = 1
        }

        this.$VoHttp
          .apiContentComplaintQueryListByDealStatus(params)
          .then((res) => {
            if (res && res.data) {
              let data = res.data.records
              this.total = res.data.total
              data.forEach((item) => {
                if (item.fileUrl) {
                  let file = JSON.parse(item.fileUrl) || {}
                  item.fileUrl = file.json
                  helpUtil.regroupFileData(item)
                }
              })
              this.dataList = this.dataList.concat(data)
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '请检查网络')
          })
          .finally(() => {
            this.loading = !this.loading
            this.triggered = false
            this.refresh = false
            this.loadingStatus = false
          })
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
          this._init_func(true)
        }
        // console.log('this.triggered', this.triggered)
      },
      //滚到底部加载
      scrolltolower() {
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.dataList.length >= this.total) {
            uni.$u.toast('已经到底了')
            return false
          }
          this.pageNo++
          this._init_func()
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
  .operation {
    display: flex;
    align-items: center;
  }
  .done {
    color: #22284b;
    font-size: 32rpx;

    margin-right: 36rpx;
  }
  .edit {
    font-size: 32rpx;
    color: rgba(0, 0, 0, 0.65);
    margin-right: 36rpx;
  }
  .list {
    height: 100vh;
    display: flex;
    flex-direction: column;
    .scroll-list {
      flex: 1;
      overflow-y: auto;
      box-sizing: border-box;
      margin-top: 16rpx;
    }
  }

  .subsection {
    background: #f7f7f8;
    border-radius: 78px;
    height: 56rpx;
  }
  .subsection-wrap {
    width: 750rpx;
    background: #fff;
    padding: 18rpx 32rpx;
    box-sizing: border-box;
  }
</style>
