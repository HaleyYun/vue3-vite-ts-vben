<template>
  <view :class="list.length > 0 ? '' : 'bg-white'" class="record flex flex-column overflow-hidden">
    <VoNav
      :left-width="240"
      :right-width="240"
      :z-index="10"
      is-have-more
      place-bg-color="#f6f7f8"
      title="提现记录"
    />
    <scroll-view
      :refresher-threshold="10"
      :refresher-triggered="triggered"
      :scroll-y="true"
      class="scroll-list flex1 flex flex-column overflow-y"
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
      <block v-if="list.length > 0">
        <view v-for="(item, index) of list" :key="index" class="record-item">
          <u-sticky customNavHeight="0">
            <view class="record-item__title">
              <view class="flex flex-vertical-c fz-30" @click="showPicker = true">
                <view class="m-r-8">{{ item.date }}</view>
                <VoIcon :size="12" name="open-arrow-b" />
                <!--            <VoIcon name="open-arrow-t" :size="12"></VoIcon>-->
              </view>

              <view class="fz-24">
                <view v-if="item.show" class="flex flex-vertical-c" @click="changeFn(index, false)">
                  <view class="m-r-4 c-gray">收起</view>
                  <VoIcon :size="16" color="#d9d9d9" name="arrow-top-line" />
                </view>
                <view v-else class="flex flex-vertical-c" @click="changeFn(index, true)">
                  <view class="m-r-4 c-gray">展开</view>
                  <VoIcon :size="16" color="#d9d9d9" name="arrow-bottom-line" />
                </view>
              </view>
            </view>
          </u-sticky>
          <view v-show="item.show" class="flex1">
            <view v-for="(it, i) in item.list" :key="i" class="bill-detail">
              <view class="bill-detail__line" />
              <view class="bill-detail__detail">
                <!--            <view class="flex flex-justify-between">-->
                <!--              <view class="fz-28 fz-b black">{{ it.title || '提现' }}</view>-->
                <!--              <view v-if="it.amountType === '2'" class="red flex flex-vertical-c fz-24">-->
                <!--                <view>+</view>-->
                <!--                <VoPointPrice :price="it.amount" />-->
                <!--                <view>元</view>-->
                <!--              </view>-->
                <!--              <view v-else class="green flex flex-vertical-c fz-24">-->
                <!--                <view>-</view>-->
                <!--                <VoPointPrice :price="it.amount" color="#07C160" />-->
                <!--                <view>元</view>-->
                <!--              </view>-->
                <!--            </view>-->
                <view class="flex flex-justify-between fz-28">
                  <view class="fz-b black flex1">
                    <text>提现-</text>
                    <text>{{ it.bankName }}</text>
                    <text
                      >（{{
                        it.bankCardNo.substring(it.bankCardNo.length - 4, it.bankCardNo.length)
                      }}）</text
                    >
                  </view>
                  <view class="color-block-45">
                    <block v-if="it.payStatus === 'success'">已到账</block>
                    <block v-else-if="it.payStatus === 'pending'">处理中...</block>
                    <block v-else-if="it.payStatus === 'fail'">失败 提现失败</block>
                  </view>
                </view>
                <view class="flex flex-justify-between">
                  <view class="fz-28 gay m-t-18"
                    >变动时间：{{ it.arriveTime || it.createTime }}</view
                  >
                  <view class="flex flex-vertical-c fz-24">
                    <!--                    <view>-</view>-->
                    <!--                    <VoPointPrice :price="it.amount" color="#07C160" />-->
                    <VoPointPrice
                      v-if="it.payStatus === 'fail'"
                      :price="it.amount"
                      show-unit
                      color="#000000"
                      style="opacity: 0.85"
                    />
                    <VoPointPrice v-else :price="it.amount" show-unit />
                  </view>
                </view>
              </view>
            </view>
          </view>
          <u-datetime-picker
            v-model="dateValue"
            :show="showPicker"
            closeOnClickOverlay
            mode="year-month"
            title="选择月份"
            @cancel="showPicker = false"
            @close="showPicker = false"
            @confirm="confirmFn"
          />
        </view>
        <VoLoadingText v-if="!loading" :has-more="isMore" :loading="loading" />
      </block>
      <VoNoData v-else />
      <VoSafetyArea :is-fixed="false" />
    </scroll-view>
  </view>
</template>

<script>
  import { hideLoading, showLoading } from '@/common/helper'

  export default {
    name: 'WithdrawalRecord',
    data() {
      return {
        loading: false,
        triggered: false,
        isMore: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        noMore: false,
        pageNo: 1,
        pageSize: 20,
        total: 0,
        list: [],
        dateValue: new Date().getTime(),
        showPicker: false,
        historyMap: new Map(),
      }
    },
    methods: {
      changeFn(index, boo) {
        this.list[index].show = boo
      },
      mGetDate(year, month) {
        const d = new Date(year, month, 0)
        return d.getDate()
      },
      confirmFn(e){
        this.dateValue=e.value
        this.showPicker=false
        this.initFn('init')
      },
      initFn(init) {
        if (init) {
          this.list = []
          this.historyMap = new Map()
          this.pageNo = 1
        }
        let param = {
          pageSize: this.pageSize,
          pageNo: this.pageNo,
          bizUserId: this.userInfo.companyId,
        }
        if (this.dateValue) {
          const date=new Date(this.dateValue)
          const year=date.getFullYear()
          const month=date.getMonth()
          param.startTime=this.$vocenApi.VoUtils.timeFormat(new Date(year,month,1), 'yyyy-mm-dd hh:MM:ss')
          param.endTime=this.$vocenApi.VoUtils.timeFormat(new Date(year,month+1,1), 'yyyy-mm-dd hh:MM:ss')


        }
        this.loading = true
        this.$VoHttp.USER.apiAccountDetailsWithdrawPage(param)
          .then((res) => {
            res.data.records.forEach((item, index) => {
              item.show = index === 0
            })
            let data = res.data.records
            data.forEach(({ date, list }) => {
              const hList = this.historyMap.get(date) || []
              if (hList.length) {
                const rList = hList.concat(list)
                this.historyMap.set(date, rList)
              } else {
                this.historyMap.set(date, list || [])
              }
            })
            const tList = this.transferHistoryDate()
            this.list = tList
            console.log(this.list)
            this.total = res.data.total
            this.$forceUpdate()
          })
          .catch((e) => {
            console.log(e)
            uni.$u.toast(e.message || '请求失败')
          })
          .finally(() => {
            hideLoading()
            this.loading = this.refresh = this.triggered = this.loadingStatus = false
          })
      },
      // 重新组装一下数据
      transferHistoryDate() {
        const list = []
        this.curLength = 0
        this.historyMap.forEach((val, key) => {
          const listItem = {
            date: key,
            title: key,
            show: true,
            list: val,
          }
          this.curLength = this.curLength + val.length
          console.log(listItem, 'listItem')
          list.push(listItem)
        })
        this.isMore = this.curLength < this.total
        return list
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
          this.historyMap=new Map()
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
    onLoad() {
      this.initFn('init')
    },
  }
</script>

<style lang="scss" scoped>
  .record {
    width: 750rpx;
    height: 100vh;
    background-color: #f6f7f8;
    box-sizing: border-box;

    &-title {
      width: 750rpx;
      height: 90rpx;
      padding: 0rpx 32rpx;
      display: flex;
      align-items: center;
      font-size: 28rpx;
      font-weight: bold;
      color: rgba(0, 0, 0, 0.85);
    }
    &-item {
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
  }
  .bill-detail {
    background-color: #ffffff;
    &__line {
      height: 2rpx;
      width: 100%;
      background-color: $v-bg-light;
    }
    &__detail {
      padding: 32rpx;
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
  .c-gray {
    color: rgba(0, 0, 0, 0.45);
  }
</style>
