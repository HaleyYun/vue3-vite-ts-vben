<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="invoiceList flex flex-column"
  >
    <VoNav isHaveMore :is-fixed="false" title="申请发票" />
    <scroll-view
      :refresher-threshold="10"
      :refresher-triggered="triggered"
      class="scroll-list flex1"
      refresher-background="#F7F7F8"
      refresher-default-style="none"
      refresher-enabled="true"
      scroll-top="0"
      :scroll-y="true"
      @refresherabort="onAbort"
      @refresherpulling="onPulling"
      @refresherrefresh="onRefresh"
      @refresherrestore="onRestore"
      @scroll="onScroll"
      @scrolltolower="scrolltolower"
    >
      <VoNoData v-if="!infoList.length" no-data-tips="暂无可申请的发票" />
      <view v-else>
        <!-- 下拉刷新组件 -->
        <VoListFresh :show="loadingStatus" />
        <view v-for="(item, index) in infoList" :key="index">
          <view class="h16" />
          <TicketOrderItem :dataObj="item" @select="selectItem" />
        </view>
        <vo-loading-text :loading="loading" :has-more="infoList.length < total" />
      </view>
    </scroll-view>
    <view class="btm-popup">
      <view class="left">
        <EraCheckboxGroup v-model="checkAll" placement="column" @change="changeCheckFn">
          <view class="check-item">
            <EraCheckbox
              :name="true"
              label="全选"
              labelColor="rgba(0, 0, 0, 0.45)"
              shape="circle"
            />
          </view>
        </EraCheckboxGroup>
        <!-- <VoIcon
          class="radio"
          name="circle"
          color="#000000"
          :size="28"
          :opacity="0.45"
          v-if="!isSelect"
          @click="select()"
        />
        <VoIcon
          class="radio"
          name="select-right"
          :size="28"
          v-if="isSelect"
          @click="selectCancel()"
        />
        <view class="left-text">全选</view> -->
      </view>
      <view class="right">
        <view class="right-text">
          合计：<VoPointPrice :price="totalPrice" :show-unit="true" display="inline-block" />
          <view class="text-right fz-24 color-block-65">共{{ selectList.length }}个订单</view>
        </view>
        <view class="right-btn" @click="applyTicket()">申请发票</view>
      </view>
    </view>
    <VoSafetyArea :is-fixed="false"></VoSafetyArea>
  </view>
</template>

<script>
  import TicketOrderItem from './components/TicketOrderItem'
  import { decimalAddFn } from '@/common/helper'

  export default {
    components: {
      TicketOrderItem,
    },
    data() {
      return {
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        loading: false,
        pageNo: 1,
        pageSize: 10,
        total: 0,
        infoList: [],
        selectList: [],
        checkAll: [],
        totalPrice: 0,
      }
    },
    onShow() {
      this.refresh = true
      this.checkAll = []
      this.getData()
    },
    watch: {
      infoList: {
        handler(newValue, oldValue) {
          this.selectList = newValue.filter((item) => item.selected)
          this.calculatePrice()
        },
        deep: true,
      },
    },
    methods: {
      changeCheckFn(val) {
        this.infoList.forEach((item) => {
          item.selected = val.length ? true : false
        })
        this.calculatePrice()
      },
      initSelectAll() {
        let num = 0
        this.infoList.map((item) => {
          item.selected && num++
        })
        if (num == this.infoList.length) {
          this.checkAll = [true]
        } else {
          this.checkAll = []
        }
      },
      //选择事件
      selectItem(data) {
        this.infoList.forEach((item) => {
          if (item.id === data.id) {
            item.selected = !item.selected
          }
        })
        this.initSelectAll()
      },
      //计算价格
      calculatePrice() {
        let price = 0
        this.selectList.forEach((item) => {
          if (item.selected) {
            price = decimalAddFn(price, parseFloat(item.payAmount))
          }
        })
        this.totalPrice = price || 0
      },
      //获取列表数据
      getData(refresh) {
        if (this.loading) return
        this.loading = !this.loading
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
          .apiInvoiceOrderListEnable(params)
          .then((res) => {
            if (res.data) {
              let data = res.data.records.map((item) => {
                return {
                  ...item,
                  selected: false,
                }
              })
              this.total = res.data.total
              this.infoList = this.infoList.concat(data)
              this.triggered = false
              this.refresh = false
              this.loadingStatus = false
              this.loading = !this.loading
            }
          })
          .catch((err) => {
            console.log('err', err)
            this.triggered = false
            this.refresh = false
            this.loadingStatus = false
            this.loading = !this.loading
            uni.$u.toast(err.message || '请检查网络')
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
        // this.loadingStatus = true
        if (this.scrollTop === 0) {
          if (this.refresh) return
          this.refresh = true
          this.triggered = true
          this.loadingStatus = true
          this.getData()
        }
        // console.log('this.triggered', this.triggered)
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
        }, 1000)
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
      /**
       * 开票
       */
      openInvoice() {
        this.$linkToEasy('/pagesSupplier/UserCenter/Invoice/CreateInvoice')
      },
      applyTicket() {
        if (this.selectList.length <= 0) {
          uni.$u.toast('请先选择订单')
          return
        }
        this.$linkToEasy(
          '/pagesSupplier/UserCenter/Invoice/ApplyForm?data=' +
            JSON.stringify(this.selectList) +
            '&amount=' +
            this.totalPrice,
        )
      },
    },
  }
</script>

<style lang="scss" scoped>
  .invoiceList {
    width: 750rpx;
    height: 100vh;
    overflow: hidden;
    .btm-popup {
      background: #ffffff;
      display: flex;
      padding: 18rpx 32rpx;
      box-sizing: border-box;
      height: 116rpx;
      .left {
        display: flex;
        align-items: center;
        &-text {
          font-size: 32rpx;
          line-height: 1.5;
          color: rgba(0, 0, 0, 0.45);
          padding-left: 8rpx;
        }
      }
      .right {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        &-btn {
          padding: 0 40rpx;
          background: $color-primary-yellow;
          border-radius: 48rpx;
          font-size: 32rpx;
          line-height: 80rpx;
          text-align: center;
          color: #ffffff;
          &.default {
            border: 1px solid #22284b;
            color: $v-c0-85;
            background: #fff;
            line-height: 76rpx;
            margin-right: 32rpx;
          }
        }
        &-text {
          font-size: 28rpx;
          line-height: 1.5;
          color: $v-c0-85;
          padding-right: 24rpx;
          .value {
            font-size: 28rpx;
            font-weight: 500;
          }
        }
      }
    }
  }
  .scroll-list{
    overflow-y: scroll;
  }
</style>
