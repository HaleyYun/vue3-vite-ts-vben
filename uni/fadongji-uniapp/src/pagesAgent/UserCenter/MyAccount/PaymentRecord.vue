<template>
  <view class="store flex flex-column">
    <VoNav :rightWidth="200" is-fixed is-have-more title="还款记录">
      <!--      <template #operation>-->
      <!--        <view @click="showPicker = true" class="fz-24 m-r-36">筛选</view>-->
      <!--      </template>-->
    </VoNav>
    <view class="flex1 bg-white border-box overflow-y">
      <scroll-view
        v-if="recordList.length > 0"
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
        <view v-for="(item, index) in recordList" :key="index" class="record-item">
          <u-sticky style="top: 0">
            <view class="record-item__title" @click="item.show = !item.show">
              <view class="flex flex-vertical-c fz-30">
                <view class="m-r-8">{{ item.month }}</view>
                <!--              <VoIcon :size="12" name="open-arrow-b" />-->
                <!--            <VoIcon name="open-arrow-t" :size="12"></VoIcon>-->
              </view>

              <view class="fz-24">
                <view v-if="item.show" class="flex flex-vertical-c">
                  <view class="m-r-4 c-gray">收起</view>
                  <VoIcon :size="16" color="#d9d9d9" name="arrow-top-line" />
                </view>
                <view v-else class="flex flex-vertical-c">
                  <view class="m-r-4 c-gray">展开</view>
                  <VoIcon :size="16" color="#d9d9d9" name="arrow-bottom-line" />
                </view>
              </view>
            </view>
            <view class="flex p-l-32 p-b-22 flex-vertical-c">
              <view class="fz-28 color-block-65">本月还款：</view>
              <VoPointPrice :left-size="16" :price="item.amount" showUnit />
            </view>
          </u-sticky>
          <view
            v-for="(it, idx) in item.list"
            v-show="item.show"
            :key="index + '' + idx"
            class="detail"
            @click="$linkToEasy(`./PaymentRecordDetail?id=${it.id}`)"
          >
            <view class="detail__line" />
            <view class="flex flex-justify-between flex-vertical-c p-l-32 p-r-32 p-t-32">
              <view class="fz-28 fz-b black">{{ it.typeStr }}</view>
              <VoPointPrice :left-size="16" :price="it.amount" showUnit />
            </view>
            <view class="detail__detail flex-vertical-c">
              <view class="flex1">
                <view class="fz-28 gay m-t-18">变动时间：{{ it.createTime }}</view>
                <view class="fz-28 gay m-t-18"
                  >还款方式：{{ it.style ? styleObj[it.style] : '--' }}</view
                >
              </view>
              <VoIcon :opacity="0.45" color="#000000" name="right-arrow" size="20" />
            </view>
          </view>
        </view>
        <VoLoadingText :has-more="recordList.length < total" :loading="loading" />
      </scroll-view>
      <VoNoData v-else no-data-tips="暂无数据" />
    </view>
    <u-datetime-picker
      v-if="showPicker"
      v-model="dateValue"
      :maxDate="3740967920000"
      :minDate="1640966400000"
      :show="showPicker"
      closeOnClickOverlay
      mode="year-month"
      title="选择月份"
      @cancel="showPicker = false"
      @close="showPicker = false"
      @confirm="dateConfirm"
    />
  </view>
</template>
<script>
  import { hideLoading, showLoading } from '@/common/helper'

  export default {
    name: 'PaymentRecord',
    data() {
      return {
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        loading: false,
        goodsName: '',
        tagList: [
          {
            id: 0,
            name: '全部',
            choosed: true,
          },
        ],
        warehouseId: '',
        total: 0,
        pageSize: 10,
        pageNo: 1,
        recordList: [],
        goodsId: '',
        dateValue: this.$vocenApi.VoUtils.timeFormat(new Date(), 'yyyy-mm'),
        chooseDate: '',
        showPicker: false,
        styleObj: { 1: '微信', 11: '支付宝', 51: '银联' },
      }
    },
    onLoad() {
      this.initFn(true)
    },
    methods: {
      mGetDate(date) {
        let timeRange = date.split('-')
        const d = new Date(timeRange[0], timeRange[1], 0)
        return d.getDate()
      },
      dateConfirm(e) {
        this.chooseDate = this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm')
        console.log(e.value, this.chooseDate)
        this.showPicker = false
        this.initFn(true)
      },
      initFn(init) {
        showLoading()
        if (this.loading) return
        this.loading = true
        if (init) {
          this.pageNo = 1
          this.recordList = []
        }
        let param = {
          pageSize: this.pageSize,
          pageNo: this.pageNo,
        }
        if (this.chooseDate) {
          param.startTime = `${this.chooseDate}-01 00:00:00`
          param.endTime = `${this.chooseDate}-${this.mGetDate(this.chooseDate)} 23:59:59`
        }

        this.$VoHttp
          .apiRepaymentLogList(param)
          .then((res) => {
            res.data.records.map((item) => {
              item.show = true
              this.recordList.push(item)
            })
            this.total = res.data.total
            this.$forceUpdate()
          })
          .catch((e) => {
            uni.$u.toast(e.message || '请求失败')
          })
          .finally(() => {
            this.loading = false
            this.loadingStatus = false
            this.refresh = false
            console.log('请求结束')
            hideLoading()
          })
      },
      //自定义下拉刷新控件被下拉
      onPulling(e) {
        if (e.detail.deltaY < 0) return // 防止上滑页面也触发下拉
        this.loadingStatus = true
      },
      //自定义下拉刷新被触发
      onRefresh() {
        // this.loadingStatus = true
        // if (this.loadingStatus) return
        if (this.scrollTop === 0) {
          if (this.refresh) return
          this.refresh = true
          this.triggered = true
          this.loadingStatus = true
          this.initFn(true)
        }
      },
      //滚到底部加载
      scrolltolower() {
        if (this.loadingStatus) return
        this.loadingStatus = true
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.noMore) {
            uni.$u.toast('没有更多了')
            return false
          }
          this.pageNo++
          this.initFn()
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
  .store {
    height: 100vh;
    .line {
      width: 1px;
      margin: 8rpx 0;
      background-color: #f7f7f8;
      margin-right: 28rpx;
    }
    .record-item {
      background-color: #ffffff;
      position: sticky;
      &__title {
        background-color: #ffffff;
        width: 686rpx;
        height: 96rpx;
        margin: 0rpx auto 0rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: rgba(0, 0, 0, 0.85);
      }
    }
    .detail {
      background-color: #ffffff;
      &__line {
        height: 2rpx;
        width: 100%;
        background-color: $v-bg-light;
      }
      &__detail {
        padding: 18rpx 32rpx 32rpx 32rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .black {
          color: $v-c0-85;
        }
        .red {
          color: $color-primary-red;
        }
        .green {
          color: $v-success;
        }
        .gay {
          color: $v-c0-65;
        }
      }
    }
    .scroll-list {
      height: 100%;
    }
  }
</style>
