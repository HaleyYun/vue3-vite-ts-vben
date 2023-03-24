<template>
  <view class="container">
    <VoNav :is-fixed="false" is-have-more title="结算单" />
    <scroll-view
      :refresher-threshold="50"
      :refresher-triggered="triggered"
      :scroll-y="true"
      class="content flex1"
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
      <template v-if="list.length > 0">
        <u-collapse ref="collapse" :border="false" :value="[0]">
          <u-collapse-item v-for="(item, index) of list" :key="index" class="m-t-16 content_coll">
            <view slot="title">{{ item.operMonth }}</view>
            <view slot="value">收起</view>
            <view>
              <view
                v-for="(it, itIndex) of item.billDtoList"
                :key="itIndex"
                class="content"
                @click="nextPage(it)"
              >
                <view class="price p-t-20 p-b-20">
                  <text>到账金额</text>
                  <text
                    >{{ it.amount }}元
                    <VoIcon name="right-arrow" size="15" />
                  </text>
                </view>
                <view class="content_btm m-t-18 m-b-18">
                  <view class="stateNm">
                    <text>结算单号：</text>
                    <text>{{ it.id }}</text>
                  </view>
                  <view class="finishTime m-t-16">
                    <text>结算完成时间：</text>
                    <text>{{ it.updateTime }}</text>
                  </view>
                </view>
              </view>
            </view>
          </u-collapse-item>
        </u-collapse>
        <VoLoadingText :has-more="curLength < total" :loading="loading" />
      </template>
      <VoNoData v-else-if="!loading" />
    </scroll-view>
    <view class="bottemBtn bg-white">
      <EraButton
        v-if="list.length"
        circle
        text="去提现"
        @click="$linkToEasy('/pagesSupplier/UserCenter/MyAccount/GoWithdrawal')"
      />
      <VoSafetyArea :is-fixed="false" />
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        //下拉刷新上拉加载
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        loading: false,
        pageNo: 1,
        pageSize: 10,
        total: 0,
        list: [],
        historyMap: new Map(),
        curLength: 0,
      }
    },
    methods: {
      // 重新组装一下数据
      transferHistoryDate() {
        const list = []
        this.curLength = 0
        this.historyMap.forEach((val, key) => {
          const listItem = {
            operMonth: key,
            title: key,
            isOpen: true,
            billDtoList: val,
          }
          this.curLength = this.curLength + val.length
          list.push(listItem)
        })
        console.log(list)
        return list
      },
      initFn(init) {
        if (this.loading) return
        this.loading = true
        let isfresh = init || this.refresh
        if (isfresh) {
          this.list = []
          this.pageNo = 1
        }
        let param = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        }
        this.$VoHttp
          .apiFinanceBillManagePage(param)
          .then((res) => {
            const data = res.data.records
            data.forEach(({ operMonth, billDtoList }) => {
              const hList = this.historyMap.get(operMonth) || []
              if (hList.length) {
                const rList = hList.concat(billDtoList)
                this.historyMap.set(operMonth, rList)
              } else {
                this.historyMap.set(operMonth, billDtoList)
              }
            })
			this.list = this.transferHistoryDate()
			this.total = res.data.total
			this.loading = false
			this.triggered = false
			this.$nextTick(() => {
              this.$refs.collapse.init()
              this.$forceUpdate()
            })
          })
          .catch((err) => {
            this.$u.toast(err.message || '网络错误')
          })
          .finally(() => {
            this.triggered = false
            this.loadingStatus = false
            this.refresh = false
            this.loading = false
          })
      },
      nextPage(item) {
        this.$linkToEasy('/pagesAgent/Order/StatementOrder/StatementDetail?id=' + item.id)
      },
      //自定义下拉刷新控件被下拉
      onPulling(e) {
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
          this.historyMap = new Map()
          this.initFn(1)
        }
      },
      //滚到底部加载
      scrolltolower() {
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          console.log(this.list.length)
          console.log(this.total)
          if (this.list.length >= this.total) {
            uni.$u.toast('已经到底了')
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
    onReachBottom() {
      if (this.list.length < this.total) {
        this.pageNo++
        this.initFn()
      }
    },
  }
</script>

<style lang="scss" scoped>
  .container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .content {
    font-size: 28rpx;
    overflow: auto;
    border-top: 1rpx solid #f7f7f8;

    .content_coll {
      background-color: #fff;
    }

    .price {
      display: flex;
      justify-content: space-between;
      font-weight: bold;
      align-items: center;

      > :nth-child(1) {
        color: rgba(0, 0, 0, 0.85);
      }

      > :nth-child(2) {
        color: #e50012;
        font-size: 32rpx;

        :nth-child(n) {
          vertical-align: middle;
        }
      }
    }

    .content_btm {
      color: rgba(0, 0, 0, 0.65);
    }
  }

  .bottemBtn {
    width: 100vw;
    padding: 22rpx;
    box-sizing: border-box;
  }
</style>
