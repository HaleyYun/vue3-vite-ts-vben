<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="accountBill flex flex-column"
  >
    <view>
      <VoNav is-fixed isHaveMore title="账户明细">
        <block slot="operation">
          <view class="fz-32 m-r-32 color-block-65" @click="screenClick">筛选</view>
        </block>
      </VoNav>
      <view class="h16 relative">
        <AccountAlert
          ref="orderScreen"
          :selectData="selectData"
          class="accountBill-alert"
          @screening="screening"
        />
      </view>
    </view>
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
      <block v-if="historyList && historyList.length > 0">
        <view v-for="(item, index) in historyList" :key="index">
          <view class="m-b-16">
            <AccountBillItem :billData="item" />
          </view>
          <!--            <AccountBillItem :bill-data="item" @click.native="invoiceDetailClick" />-->
        </view>
        <VoLoadingText :has-more="curLength < total" :loading="loading" />
      </block>
      <VoNoData v-else />
    </scroll-view>
  </view>
</template>

<script>
  import AccountBillItem from './components/AccountBillItem'
  import AccountAlert from './components/AccountAlert'

  export default {
    components: {
      AccountBillItem,
      AccountAlert,
    },
    data() {
      return {
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        loading: false,
        pageNo: 1,
        pageSize: 20,
        total: 0,
        historyList: [
          // {
          //   isOpen: false,
          //   list: [],
          // },
          // {
          //   isOpen: false,
          //   list: [],
          // },
          // {
          //   isOpen: false,
          //   list: [],
          // },
        ],
        selectData: {},
        curLength: 0,
        detailType: [
          '未知',
          '提现',
          '货款',
          '批发收益',
          '拓客收益',
          '仓储费用',
          '提现失败退回',
          '',
          '违约金',
          '退款',
        ],
        // { name: '未知', selected: false, id: 0 },
        // { name: '提现', selected: false, id: 1 },
        // { name: '货款', selected: false, id: 2 },
        // { name: '批发收益', selected: false, id: 3 },
        // { name: '拓客收益', selected: false, id: 4 },
        // { name: '仓储费用', selected: false, id: 5 },
        // { name: '提现失败退回', selected: false, id: 6 },
        historyMap: new Map(),
        noLoading: true,
      }
    },
    methods: {
      async initFn(refresh) {
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.historyList = []
          this.historyMap = new Map()
          this.pageNo = 1
          this.curLength = 0
        }
        let param = {
          pageSize: this.pageSize,
          pageNo: this.pageNo,
          companyId: this.userInfo.companyId,
          // ...this.selectData,
        }
        console.log(this.selectData)
        if (this.selectData) {
          if (this.selectData.startTime && this.selectData.endTime) {
            param.startTime = this.selectData.startTime
            param.endTime = this.selectData.endTime
          }
          if (this.selectData.detailType && this.selectData.detailType.length > 0) {
            param.detailType = this.selectData.detailType
          }
        }
        console.log('params===', param)
        try {
          const res = await this.$VoHttp.USER.apiAccountDetailsPage(param, { noLoading: this.noLoading })
          let data = res.data.records
          data.forEach(({ date,expend,income, list }) => {
            var dateKey =  date+'--'+income+'--'+expend;
            console.log('dateKey ---->'+dateKey);
            const hList = this.historyMap.get(dateKey) || []
            if (hList.length) {
              const rList = hList.concat(list)
              this.historyMap.set(dateKey, rList)
            } else {
              this.historyMap.set(dateKey, list)
            }
          })
          const tList = this.transferHistoryDate()
          this.historyList = tList
          this.total = res.data.total
        } catch (e) {
          console.log(e)
          this.$u.toast(e.message || '网络连接错误')
        }
        this.loadingStatus = false
        this.refresh = false
        this.triggered = false
        this.scrollTop = 0
        this.loading = false
        if (this.noLoading) {
          this.noLoading = false
          uni.hideLoading()
        }
      },
      // 重新组装一下数据
      transferHistoryDate() {
        const list = []
        this.curLength = 0
        this.historyMap.forEach((val, key) => {
          const listItem = {
            date: key,
            title: key,
            isOpen: true,
            list: val,
          }
          this.curLength = this.curLength + val.length
          console.log(listItem, 'listItem')
          list.push(listItem)
        })
        return list
      },
      screenClick() {
        this.$refs.orderScreen.showShare(true)
      },
      //回显数据
      setValue(data) {
        console.log('111111111111111111', data)
        this.$refs.orderScreen.setValues(data)
      },
      /**
       * 筛选
       */
      screening(e) {
        console.log(e)
        this.selectData = e
        this.initFn(true)
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
          this.historyMap=new Map()
          this.initFn(true)
        }
      },
      //滚到底部加载
      scrolltolower() {
        console.log('底部加载==', this.loadingStatus)
        if (this.loadingStatus) return
        this.loadingStatus = true
        console.log('底部加载')
        this.refresh = false
        console.log(this.curLength, this.total)
        if (this.curLength >= this.total) {
          uni.$u.toast('没有更多了')
          return false
        }
        this.pageNo++
        this.initFn()
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
    onLoad(opt) {
      uni.showLoading({title: '加载中',mask: true,})
      if (opt.ids) {
        setTimeout(() => {
          this.setValue(JSON.parse(opt.ids))
        }, 1000)
        this.selectData.detailType = JSON.parse(opt.ids)
      }
      this.initFn(true)
    },
  }
</script>

<style lang="scss" scoped>
  .accountBill {
    width: 750rpx;
    height: 100vh;
    overflow: hidden;

    &-screen {
      height: 84rpx;
      line-height: 84rpx;
      width: 750rpx;

      &__title {
        color: $v-c0-85;
      }
    }

    &-alert {
      width: 750rpx;
    }

    .scroll-list {
      flex: 1;
      overflow: auto;
    }
  }
</style>
