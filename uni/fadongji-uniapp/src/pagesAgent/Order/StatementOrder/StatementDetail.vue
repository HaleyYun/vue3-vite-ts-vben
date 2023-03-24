<template>
  <view>
    <VoNav :is-fixed="false" is-have-more title="结算单详情" />
    <view class="content">
      <view class="top m-t-16 b-b-16">
        <view class="price p-t-20">
          <text>结算金额</text>
          <text>{{ info.amount }}元</text>
        </view>
        <view class="content_btm m-t-18 m-b-18">
          <view class="stateNm">
            <text>结算单号：</text>
            <text>{{ info.id }}</text>
          </view>
          <view class="finishTime m-t-16">
            <text>结算完成时间：</text>
            <text>{{ info.updateTime }}</text>
          </view>
        </view>
      </view>
      <view class="tab">
        <view v-for="(item, index) of list" :key="index" class="m-b-16">
          <view class="tab_content">
            <view class="text">
              <text>订单号：</text>
              <text>{{ item.orderId }}</text>
            </view>
            <view class="text">
              <text>支付时间：</text>
              <text>{{ item.updateTime }}</text>
            </view>
            <view class="text">
              <text>订单金额：</text>
              <view class="flex flex-vertical-c fz-32 fz-b" :style="{ color: item.amount > 0 ? '#F20014' : '#00B359' }">
                <text class="m-r-8">{{ item.amount > 0 ? '+' : '-' }}</text>
                <VoPointPrice
                  :color="item.platFee > 0 ? '#F20014' : '#00B359'"
                  :leftSize="16"
                  :price="item.amount"
                  showUnit
                />
              </view>
            </view>
            <view class="text">
              <text>平台抽佣：</text>
              <view class="flex flex-vertical-c fz-32" style="color: #00B359">
                <text class="m-r-8">-</text>
                <VoPointPrice
                  color="#00B359"
                  :leftSize="16"
                  :price="item.platFee"
                  showUnit
                />
              </view>
            </view>
            <view class="text border-bottom p-b-16">
              <text>结算金额：</text>
              <view
                class="flex flex-vertical-c fz-32 fz-b"
                :style="{ color: item.platFee > 0 ? '#F20014' : '#00B359' }"
              >
                <text class="m-r-8">{{ item.platFee > 0 ? '+' : '-' }}</text>
                <VoPointPrice
                  :color="item.platFee > 0 ? '#F20014' : '#00B359'"
                  :leftSize="16"
                  :price="item.shopAmount"
                  showUnit
                />
              </view>
            </view>
            <view
              class="flex flex-vertical-c flex-justify-c fz-28 color"
              @click="goto(item)">
              <view>查看订单详情</view>
              <VoIcon class="m-t-4" color="#0D66FF" name="right-arrow" size="14" />
            </view>
          </view>
        </view>
      </view>
    </view>
    <VoSafetyArea />
    <view class="bottemBtn bg-white">
      <EraButton
        circle
        text="去提现"
        @click="$linkToEasy('/pagesSupplier/UserCenter/MyAccount/GoWithdrawal')"
      />
      <VoSafetyArea />
    </view>
  </view>
</template>

<script>
  export default {
    components: {},

    data() {
      return {
        info: {},
        id: '',
        pageNo: 1,
        pageSize: 10,
        total: 0,
        list: [],
      }
    },
    methods: {
      goto(item) {
        console.log(item);
        let path
        // 10,"正向销售订单,大类"
        // 11,"销售订单"
        // 12,"投资订单"
        // 13,"旧机订单"
        // 21,"退换货订单"
        //
        // 30,"服务订单,大类"
        // 31,"售后上门订单"
        // 32,"安装服务订单"
        // 33,"回收服务订单"
        if (+item.orderType === 11) {
          // 销售订单
          if (this.userInfo.platformCode === 'agent') {
            path = `/pagesAgent/Order/OrderDetail/OrderDetail?id=${item.orderId}&origin=statement`
          } else if (this.userInfo.platformCode === 'supplier') {
            path = `/pagesSupplier/Order/OrderDetail/OrderDetail?id=${item.orderId}&origin=statement`
          } else if (this.userInfo.platformCode === 'recycling') {
            path = `/pagesRecovery/SellOrder/OrderDetail/OrderDetail?data=${item.orderId}&origin=statement`
          }
        } else if (+item.orderType === 12) {
          // 投资订单（转投资详情）都跳转投资, 因为服务商的结算单数据只能由转投资订单产生
          if (this.userInfo.platformCode === 'agent') {
            path = `/pagesAgent/Order/OrderDetail/TurnInvestDetail?data=${item.orderId}&origin=statement`
          } else if (this.userInfo.platformCode === 'supplier') {
            path = `/pagesSupplier/Order/OrderDetail/InvestDetail?id=${item.orderId}&origin=statement`
          }
        } else if (+item.orderType === 13) {
          // 旧机再销售
          path = `/pagesRecovery/SellOrder/OrderDetail/OrderDetail?data=${item.orderId}&origin=statement`
        } else if (+item.orderType === 33) {
          // 回收订单
          path = `/pagesRecovery/RecycleOrders/TypeRecordDetail?id=${item.orderId}&origin=statement`
        }
        this.$linkToEasy(path)
      },
      initFn(init) {
        if (init) {
          this.list = []
          this.pageNo = 1
        }
        let param = {
          id: this.id,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        }
        this.$VoHttp.apiFinanceBillManageDetail(param).then((res) => {
          this.info = res.data
          this.list = this.list.concat(res.data.orderFeeVOPage.records)
          this.total = res.data.orderFeeVOPage.total
        })
      },
    },
    onLoad(options) {
      this.id = options.id
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
  .content {
    font-size: 28rpx;
    border-bottom: 145rpx solid transparent;
    .top {
      background-color: #fff;
      padding: 0 32rpx 32rpx 32rpx;
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
    .color {
      color: #0d66ff;
    }
    .tab {
      margin-top: 16rpx;
      .tab-con {
        background-color: #fff;
        border-bottom: 1rpx solid #f7f7f8;
      }
      .tab_content {
        background-color: #fff;
        color: rgba(0, 0, 0, 0.65);
        font-size: 28rpx;
        padding: 32rpx;
        .text {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16rpx;
        }
      }
    }
  }
  .detail {
    text-align: center;
    display: block !important;
    color: #0d66ff;
    font-size: 28rpx;
    border-top: 1rpx solid #f7f7f8;
    padding-top: 18rpx;
  }
  .red {
    color: #e50012;
    font-weight: bold;
  }
  .green {
    color: #00b359;
    font-weight: bold;
  }
  .bottemBtn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    padding: 22rpx;
    box-sizing: border-box;
  }
</style>
