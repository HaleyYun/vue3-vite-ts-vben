<template>
  <view class="board">
    <view class="bg-white">
      <view class="board-top">
        <view class="lh48 fz-b fz-32 color-block">数据看板</view>
        <view class="m-t-12 flex flex-vertical-c">
          <view class="lh 42 fz-28 color-block-45 m-r-8">更新于{{ time }}</view>
          <VoIcon :opacity="0.85" :size="16" name="refresh-home" @click="updateData" />
        </view>
      </view>
      <view class="board-line" />
      <view class="board-bottom">
        <view class="board-bottom__item right bottom">
          <view class="lh60 fz-b fz-40 color-block">
            <text>{{ dataBoard.totalAmount || '--' }}</text>
            <!-- <text class="fz-24 m-l-2">万</text> -->
          </view>
          <view class="lh42 fz-28 color-block">成交金额</view>
          <view class="m-t-14 lh36 fz-24 color-block-45"
            >上月{{ beforeDataBoard.totalAmount }}</view
          >
          <!--          <view class="flex flex-vertical-c fz-24 lh36 m-t-8">-->
          <!--            <text class="color-block-45">环比</text>-->
          <!--            <text class="color-red m-l-4">+102.6%</text>-->
          <!--            <image class="board-bottom__img" src="/static/supplier/home/on_union.png" />-->
          <!--          </view>-->
        </view>
        <view class="board-bottom__item right bottom">
          <view class="lh60 fz-b fz-40 color-block">{{ dataBoard.dealOrder || '--' }}</view>
          <view class="lh42 fz-28 color-block">成交订单</view>
          <view class="m-t-14 lh36 fz-24 color-block-45">上月{{ beforeDataBoard.dealOrder }}</view>
          <!--          <view class="flex flex-vertical-c fz-24 lh36 m-t-8">-->
          <!--            <text class="color-block-45">环比</text>-->
          <!--            <text class="color-red m-l-4 board-bottom__color">-199.8%</text>-->
          <!--            <image class="board-bottom__img" src="/static/supplier/home/down_union.png" />-->
          <!--          </view>-->
        </view>
        <view class="board-bottom__item bottom">
          <view class="lh60 fz-b fz-40 color-block">{{ dataBoard.dealGoods || '--' }}</view>
          <view class="lh42 fz-28 color-block">成交商品</view>
          <view class="m-t-14 lh36 fz-24 color-block-45">上月{{ beforeDataBoard.dealGoods }}</view>
          <!--          <view class="fz-24 lh36 m-t-8 color-block-45">环比 - -</view>-->
        </view>
        <view class="board-bottom__item right bottom">
          <view class="lh60 fz-b fz-40 color-block">
            <text>{{ dataBoard.visitCount || '--' }}</text>
            <!-- <text class="fz-24 m-l-2">万</text> -->
          </view>
          <view class="lh42 fz-28 color-block">总访客</view>
          <view class="m-t-14 lh36 fz-24 color-block-45">上月{{ beforeDataBoard.visitCount }}</view>
          <!--          <view class="fz-24 lh36 m-t-8 color-block-45">环比 - -</view>-->
        </view>
        <view class="board-bottom__item right bottom">
          <view class="lh60 fz-b fz-40 color-block">
            {{
              dataBoard.orderPercentConversion && dataBoard.orderPercentConversion != 'NaN'
                ? dataBoard.orderPercentConversion
                : '--'
            }}
          </view>
          <view class="lh42 fz-28 color-block">下单转化率</view>
          <view class="m-t-14 lh36 fz-24 color-block-45"
            >上月{{
              dataBoard.orderPercentConversion && dataBoard.orderPercentConversion != 'NaN'
                ? dataBoard.orderPercentConversion
                : '--'
            }}</view
          >
          <!--          <view class="fz-24 lh36 m-t-8 color-block-45">环比 - -</view>-->
        </view>
        <view class="board-bottom__item bottom">
          <view class="lh60 fz-b fz-40 color-block">
            <text>{{ dataBoard.dealConsume || '--' }}</text>
            <!-- <text class="fz-24 m-l-2">万</text> -->
          </view>
          <view class="lh42 fz-28 color-block">成交客户</view>
          <view class="m-t-14 lh36 fz-24 color-block-45"
            >上月{{ beforeDataBoard.dealConsume }}</view
          >
          <!--          <view class="fz-24 lh36 m-t-8 color-block-45">环比 - -</view>-->
        </view>
        <view class="board-bottom__item right">
          <view class="lh60 fz-b fz-40 color-block">
            <text>{{ dataBoard.scanCount || '--' }}</text>
            <!-- <text class="fz-24 m-l-2">万</text> -->
          </view>
          <view class="lh42 fz-28 color-block">浏览量</view>
          <view class="m-t-14 lh36 fz-24 color-block-45">上月{{ beforeDataBoard.scanCount }}</view>
          <!--          <view class="fz-24 lh36 m-t-8 color-block-45">环比 - -</view>-->
        </view>
        <view class="board-bottom__item right">
          <view class="lh60 fz-b fz-40 color-block">{{ dataBoard.goodsVisitCount || '--' }}</view>
          <view class="lh42 fz-28 color-block">浏览商品</view>
          <view class="m-t-14 lh36 fz-24 color-block-45"
            >上月{{ beforeDataBoard.goodsVisitCount }}</view
          >
          <!--          <view class="fz-24 lh36 m-t-8 color-block-45">环比 - -</view>-->
        </view>
        <view class="board-bottom__item">
          <view class="lh60 fz-b fz-40 color-block">{{
            dataBoard.moveOffRate && dataBoard.moveOffRate != 'NaN' ? dataBoard.moveOffRate : '--'
          }}</view>
          <view class="lh42 fz-28 color-block">动销率</view>
          <view class="m-t-14 lh36 fz-24 color-block-45"
            >上月{{
              dataBoard.moveOffRate && dataBoard.moveOffRate != 'NaN' ? dataBoard.moveOffRate : '--'
            }}</view
          >
          <!--          <view class="fz-24 lh36 m-t-8 color-block-45">环比 - -</view>-->
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'DataBoard',
    data() {
      return {
        //当月数据
        dataBoard: {},
        //上月数据
        beforeDataBoard: {},
        time: '',
      }
    },
    mounted() {
      //请求当月
      this.getDataBoardRequest()
      //请求上个月
      this.getBeforeDataBoardRequest()
    },
    methods: {
      updateData() {
        //请求当月
        this.getDataBoardRequest()
      },
      getDataBoardRequest() {
        let firstDate = new Date()
        let startDate =
          firstDate.getFullYear() +
          '-' +
          (firstDate.getMonth() + 1 < 10 ? '0' : '') +
          (firstDate.getMonth() + 1) +
          '-' +
          '01' +
          ' 00:00:00'

        let date = new Date()
        let currentMonth = date.getMonth() + 1
        let nextMonth = ++currentMonth
        let nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1)
        let oneDay = 1000 * 60 * 60 * 24
        let lastDate = new Date(nextMonthFirstDay - oneDay)
        // let endDate =
        //   lastDate.getFullYear() +
        //   '-' +
        //   (lastDate.getMonth() + 1 < 10 ? '0' : '') +
        //   (lastDate.getMonth() + 1) +
        //   '-' +
        //   '01' +
        //   ' 00:00:00'
        let end = new Date(date.getTime() - oneDay)
        let endDate = this.$vocenApi.VoUtils.timeFormat(end.getTime(), 'yyyy-mm-dd 23:59:59')

        this.$VoHttp
          .apiOrderStatisticsSupplierBoard({ startTime: startDate, endTime: endDate })
          .then((res) => {
            this.dataBoard = res.data
            this.time = res.time
          })
          .catch((e) => {
            uni.$u.toast(e.message || '请检查网络')
          })
      },
      getBeforeDataBoardRequest() {
        let firstDate = new Date()
        let startDate =
          firstDate.getFullYear() +
          '-' +
          (firstDate.getMonth() < 10 ? '0' : '') +
          firstDate.getMonth() +
          '-' +
          '01' +
          ' 00:00:00'

        if (firstDate.getMonth() <= 0) {
          startDate = firstDate.getFullYear() - 1 + '-' + 12 + '-' + '01' + ' 00:00:00'
        }

        let date = new Date()
        let currentMonth = date.getMonth()
        let nextMonth = ++currentMonth
        let nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1)
        let oneDay = 1000 * 60 * 60 * 24
        let lastDate = new Date(nextMonthFirstDay - oneDay)
        let endDate =
          lastDate.getFullYear() +
          '-' +
          (lastDate.getMonth() + 1 < 10 ? '0' : '') +
          (lastDate.getMonth() + 1) +
          '-' +
          '01' +
          ' 00:00:00'

        this.$VoHttp
          .apiOrderStatisticsSupplierBoard({ startTime: startDate, endTime: endDate })
          .then((res) => {
            this.beforeDataBoard = res.data
          })
          .catch((e) => {
            uni.$u.toast(e.message || '请检查网络')
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .board {
    padding-bottom: 32rpx;
    box-sizing: border-box;
    .bg-white {
      border-radius: 16rpx;
      overflow: hidden;
    }
    &-top {
      padding: 32rpx;
      box-sizing: border-box;
    }
    &-line {
      width: 638rpx;
      height: 2rpx;
      background: $v-bg-light;
      margin: 0 24rpx;
    }
    &-bottom {
      padding: 32rpx 0 32rpx 32rpx;
      //display: grid;
      //grid-template-columns: 176rpx 176rpx 176rpx;
      //grid-column-gap: 52rpx;
      //grid-row-gap: 40rpx;
      display: flex;
      flex-wrap: wrap;
      &__item {
        width: 176rpx;
        height: 152rpx;
        &.right {
          margin-right: 26px;
        }
        &.bottom {
          margin-bottom: 40rpx;
        }
      }
      &__color {
        color: #07c160;
      }
      &__img {
        width: 16rpx;
        height: 24rpx;
        margin-left: 6rpx;
      }
    }
  }
</style>
