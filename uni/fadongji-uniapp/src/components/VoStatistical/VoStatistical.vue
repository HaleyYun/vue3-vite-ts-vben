<template>
  <view class="bg-color flex flex-column">
    <vo-statistical-time
      :statustiCalDate="statustiCalDate"
      @timeConfirm="timeConfirm"
      @changeTab="tabsClick"
      @updatepops="showPop"
    />
    <view class="flex1 overflow-y mb-70px h-full">
      <view v-if="current == 0">
        <view class="statistical-card">
          <view v-for="(item, index) of totalList" :key="index + 'total'" class="totalList">
            <view class="count">{{ item.value }}</view>
            <view class="label">{{ item.label }}</view>
          </view>
        </view>
        <!--商品人气榜-->
        <commodities-list :timeParams="timeParams" />
        <!--订单支付情况饼图-->
        <payment-status-carts :timeParams="timeParams" />
        <!--支付明细-->
        <payment-details-list :timeParams="timeParams" />
      </view>
      <view v-if="current == 1">
        <sales-statistics-list :timeParams="timeParams" />
        <province-sales-ranking :timeParams="timeParams" />
      </view>
      <view v-if="current == 2" class="h-full">
        <ReplenishList :timeParams="timeParams" />
      </view>
      <view v-if="current == 3" class="h-full">
        <put-on-list :timeParams="timeParams" />
      </view>
      <view v-if="current == 4" class="h-full">
        <inventory-list :timeParams="timeParams" />
      </view>
      <view v-if="current == 5" class="h-full">
        <customer-clinch-ranking :timeParams="timeParams" />
      </view>
    </view>
    <VoSafetyArea :is-fixed="false" />
  </view>
</template>

<script>
  import CommoditiesList from './component/CommoditiesList'
  import PaymentDetailsList from './component/paymentDetails'
  import PaymentStatusCarts from './component/PaymentStatusCarts'
  import SalesStatisticsList from './component/SalesStatistics'
  import ProvinceSalesRanking from './component/ProvinceSalesRanking'
  import ReplenishList from './component/ReplenishList'
  import PutOnList from './component/PutOnList'
  import InventoryList from './component/InventoryList'
  import CustomerClinchRanking from './component/CustomerClinchRanking'
  import VoStatisticalTime from '../VoStatisticalTime/VoStatisticalTime'

  export default {
    name: 'VoStatistical',
    components: {
      VoStatisticalTime,
      CustomerClinchRanking,
      InventoryList,
      PutOnList,
      ReplenishList,
      ProvinceSalesRanking,
      SalesStatisticsList,
      PaymentStatusCarts,
      PaymentDetailsList,
      CommoditiesList,
    },
    data() {
      return {
        current: 0,
        timeCurrent: '1',
        isTimeOpen: false,

        orderInfo: {
          payment: 100,
          total: 200,
          typeNum: 120,
          waitingPay: 100,
        },
        statustiCalDate: [new Date().getTime()],
        selectTime: [],
        timeParams: {},
        totalList: [
          { label: '浏览量', value: 0 },
          { label: '访客数', value: 0 },
        ],
        timeList: [
          { label: '今天', value: 1 },
          { label: '本周', value: 2 },
          { label: '本月', value: 3 },
          { label: '自定义', value: 4 },
        ],
      }
    },
    created() {
      let time = this.$vocenApi.VoUtils.timeFormat(new Date().getTime(), 'yyyy-mm-dd')
      this.selectTime = [time + ' 00:00:00', time + ' 23:59:59']
      this.timeParams = { selectTime: this.selectTime, timeType: 1 }

      this.getRecordStatistic()
    },
    // eslint-disable-next-line vue/no-deprecated-destroyed-lifecycle
    beforeDestroy() {
      uni.setStorageSync('VoStatisticalTime', 1)
    },
    methods: {
      showPop(bool) {
        this.$emit('updatepops', bool)
      },
      tabsClick(item) {
        this.current = item.index
        this.initStatistic()
      },
      initStatistic() {
        if (this.current == 0) {
          this.getRecordStatistic()
        }
      },

      // 选择时间
      timeConfirm(data) {
        if (data.timeType == 2 || data.timeType == 3) {
          this.statustiCalDate = [
            new Date(data.selectTime[0]).getTime(),
            new Date(data.selectTime[1]).getTime(),
          ]
        } else {
          this.statustiCalDate = [new Date(data.selectTime[0]).getTime()]
        }
        this.selectTime = [data.selectTime[0] + ' 00:00:00', data.selectTime[1] + ' 23:59:59']
        this.timeParams = { selectTime: this.selectTime, timeType: data.timeType }
        this.initStatistic()
        console.log(data.selectTime)
      },
      // 商品流量统计
      async getRecordStatistic() {
        try {
          const { code, data } = await this.$VoHttp.GOODS.apiGoodsVisitRecordStatistic({
            endTime: this.selectTime[1],
            startTime: this.selectTime[0],
          })
          if (code == '20001') {
            this.totalList = [
              { label: '浏览量', value: data.scanCount },
              { label: '访客数', value: data.visitCount },
            ]
          }
        } catch (e) {
          console.log(e)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .statistical {
    font-weight: 400;
    font-size: 32rpx;
    color: rgba(0, 0, 0, 0.85);
    padding: 20rpx 40rpx;
    background: #fff;
    .time {
      font-style: normal;
      font-weight: 500;
      font-size: 28rpx;
      line-height: 150%;
      text-align: center;
      margin: 0 34rpx;
      color: rgba(0, 0, 0, 0.85);
    }
  }
  .bg-color {
    background: #f7f7f8;
    height: 100vh;
  }
  .selectTime {
    position: absolute;
    left: 0;
    top: 264rpx;
    width: 100%;
    z-index: 99;
    background: #fff;
    .mask {
      transition-duration: 350ms;
      transition-timing-function: ease-out;
      position: fixed;
      inset: 0px;
      z-index: -100;
      background-color: rgba(0, 0, 0, 0.5);
    }
    .selectCard {
      z-index: 9999;
      background: #fff;
    }

    .selectBlock {
      width: 144rpx;
      height: 56rpx;
      text-align: center;
      background: #f6f7f8;
      border-radius: 32rpx;
      margin-right: 40rpx;
      font-weight: 400;
      font-size: 24rpx;
      line-height: 2.5;
      border: 2rpx solid #f6f7f8;
      color: rgba(0, 0, 0, 0.85);
    }
    .selectBlockA {
      background: #ffece5;
      border: 2rpx solid #ff6633;
      border-radius: 32rpx;
      color: #ff5319;
    }
    .blockList {
      height: 168rpx;
      padding: 32rpx 24rpx;
    }
  }
  .selectTime-title {
    font-style: normal;
    font-weight: 500;
    font-size: 32rpx;
    color: rgba(0, 0, 0, 0.85);
    padding: 24rpx 32rpx 16rpx 32rpx;
    border-bottom: 2rpx solid #f7f7f8;
  }
  .zIndex9999 {
    z-index: 9999;
  }
  .buttons {
    border-top: 2rpx solid #f7f7f8;
    padding: 32rpx 24rpx;
  }
  .margin-r-18 {
    margin-right: 36rpx;
  }
  .vo {
    background: #ffffff;
    box-shadow: 0 2rpx 0 #f7f7f8;
    border-bottom: 2rpx solid #f7f7f8;
    padding: 18rpx 0;

    .vo-nav__title {
      font-weight: 500;
      font-size: 36rpx;
      line-height: 150%;
      text-align: center;
      color: rgba(0, 0, 0, 0.85);
    }
  }
  .statistical-card {
    margin-top: 16rpx;
    padding: 32rpx;
    display: flex;
    justify-content: center;
    background: #fff;
    .totalList {
      flex: 1;
      text-align: center;
      .count {
        font-size: 40rpx;
        font-weight: 700;
        color: rgba(0, 0, 0, 0.85);
        margin-bottom: 8rpx;
        .unit {
          font-size: 24rpx;
        }
      }
      .label {
        font-size: 24rpx;
        line-height: 150%;
        text-align: center;
        color: rgba(0, 0, 0, 0.65);
      }
    }
  }
  .mb-70px {
    margin-bottom: 140rpx;
  }
</style>
