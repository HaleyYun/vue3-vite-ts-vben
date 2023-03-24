<template>
  <view class="container" @scroll="onScroll">
    <!--    <VoBatteryBar />-->
    <VoNav title="工作台" />
    <!--    <view class="view-holder"></view>-->
    <view class="workbench-content flex1">
      <view class="workbench-content-item">
        <view class="charts href-pie padding">
          <view class="charts-title">
            <view class="bold">服务商入驻完成率</view>
            <view class="border"></view>
            <view class="lighter">2022.04-2022.06</view>
          </view>
          <!--          <view class="charts-data">-->
          <!--            <view class="title">实际完成</view>-->
          <!--            <view class="data">40/个</view>-->
          <!--            <view class="desc">计划完成50个</view>-->
          <!--          </view>-->
          <image class="charts-hare-pie" src="/static/channel/workbench/chart_href_pie.png"></image>
          <!-- <VoEchart ref="pieChart" /> -->
        </view>
        <view class="br"></view>
        <view class="charts padding">
          <view class="charts-title">
            <view class="bold">服务商入驻完成率</view>
            <view class="border"></view>
            <view class="lighter">2022.04-2022.06</view>
          </view>
          <image class="charts-bar" src="/static/channel/workbench/chart_bar.png"></image>
          <!-- <VoEchart ref="barChart" /> -->
        </view>
      </view>
      <view class="workbench flex flex-column flex1 bg-white">
        <view class="flex flex-column">
          <view class="workbench-title flex flex-row flex-vertical-c">
            <view class="workbench-title__text">数据汇总</view>
            <view class="workbench-title__line m-l-16 m-r-16"></view>
            <view class="workbench-title__subtitle">更新至2022-05-20 18:33:33</view>
          </view>
          <view class="flex flex-column workbench-list">
            <ItemWorkBench v-for="(item, index) in dataList" :key="index" />
          </view>
        </view>
      </view>
      <view class="h144 bg-white"></view>
    </view>
    <view class="workbench-bottom">
      <view class="workbench-bottom__view">
        <view class="workbench-bottom__text1 flex1 m-r-16" @click="toServiceManager"
          >服务商管理</view
        >
        <view class="workbench-bottom__text1 flex1 m-l-16" @click="goGarageManager"
          >修理厂管理</view
        >
      </view>
      <vo-safety-area :is-fixed="false"></vo-safety-area>
    </view>
  </view>
</template>
<script>
  import ItemWorkBench from './components/ItemWorkBench'
  // import * as echarts from '@/components/VoEchart/static/echarts.min.js'
  export default {
    name: 'ChannelTabbarWorkbench',
    components: { ItemWorkBench },
    data() {
      return {
        dataList: [
          {
            supplier: '总供应商数',
            supplierNum: 102,
            supplierAdd: 2,
            certified: '已认证数',
            certifiedNum: 998,
            certifiedAdd: 200,
            notCertified: '未认证数',
            notCertifiedNum: 859,
            notCertifiedAdd: 99,
          },
          {
            supplier: '总供应商数',
            supplierNum: 102,
            supplierAdd: 2,
            certified: '已认证数',
            certifiedNum: 998,
            certifiedAdd: 200,
            notCertified: '未认证数',
            notCertifiedNum: 859,
            notCertifiedAdd: 99,
          },
          {
            supplier: '总供应商数',
            supplierNum: 102,
            supplierAdd: 2,
            certified: '已认证数',
            certifiedNum: 998,
            certifiedAdd: 200,
            notCertified: '未认证数',
            notCertifiedNum: 859,
            notCertifiedAdd: 99,
          },
        ],
        // 备用,echarts参数，半圆环
        option: {
          color: ['#FF5319', '#F6F7F8', 'transparent'],
          series: [
            {
              name: '',
              type: 'pie',
              radius: ['80%', '90%'],
              avoidLabelOverlap: false,
              startAngle: 180,
              center: ['50%', '70%'],
              itemStyle: {
                borderRadius: 40,
              },
              label: {
                normal: {
                  position: 'inner',
                  textStyle: {
                    color: '#fff',
                    fontSize: 12,
                  },
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '12',
                    fontWeight: 'bold',
                  },
                },
              },
              labelLine: {
                normal: {
                  show: false,
                },
              },
              data: [
                {
                  value: 335,
                  name: '',
                },
                {
                  value: 15,
                  name: '',
                },
                {
                  value: 350,
                  name: '',
                  tooltip: {},
                },
              ],
            },
          ],
          grid: {
            top: '0',
          },
        },
      }
    },
    methods: {
      toServiceManager() {
        console.log('toServiceManager')
        this.$linkToEasy('/pagesChannelManager/ServiceManager/ServiceManager')
      },
      goGarageManager() {
        this.$linkToEasy('/pagesChannelManager/GarageModule/GarageManager')
      },
      onScroll(e) {
        // this.showRightBtn = true
        // if (e.detail.scrollTop > 0) {
        //   this.showActionNav = true
        //   this.gapBgColor = '#fff'
        // } else {
        //   this.showActionNav = false
        //   this.gapBgColor = 'transparent'
        // }
        // let query = uni.createSelectorQuery().in(this)
        // query
        //   .select('#navTop')
        //   .boundingClientRect((data) => {
        //     // this.handleScroll(data.top)
        //     console.log(data, '55555555555555555')
        //   })
        //   .exec()
      },
    },
    mounted() {
      // 把 echarts 传入
      // this.$refs.chart.init(echarts, chart => {
      //   chart.setOption(this.option);
      // });
    },
  }
</script>
<style lang="scss" scoped>
  .container {
    width: 750rpx;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    overflow-x: hidden;
    background-color: #f7f7f8;

    .workbench-content {
      width: 100%;
      height: 100%;
      //padding-bottom: 144rpx;
      &-item {
        background-color: #fff;
        padding: 0 32rpx;
      }
      .padding {
        padding: 32rpx 0;
      }
      .charts {
        text-align: center;
        &-title {
          display: flex;
          align-items: baseline;
          font-family: 'PingFang SC';
          margin-bottom: 24rpx;

          .bold {
            font-weight: 500;
            font-size: 32rpx;
            color: rgba(0, 0, 0, 0.85);
          }

          .lighter {
            font-weight: 400;
            font-size: 24rpx;
            color: rgba(0, 0, 0, 0.45);
          }

          .border {
            display: block;
            width: 4rpx;
            height: 24rpx;
            margin: 0 12rpx;
            background-color: #d9d9d9;
            border-radius: 4rpx;
          }
        }

        &-hare-pie {
          width: 440rpx;
          height: 232rpx;
        }

        &-bar {
          width: 648rpx;
          height: 544rpx;
        }
      }
      .br {
        width: 100%;
        height: 2rpx;
        background-color: #f7f7f8;
      }
      .charts-box {
        width: 440rpx;
        height: 232rpx;
      }
    }
  }
  ::v-deep .vo-nav__back {
    opacity: 0;
  }
  ::v-deep .uni-scroll-view-content {
    height: fit-content;
  }
  .workbench {
    width: 750rpx;
    &-list {
      margin: 24rpx;
    }
    &-title {
      box-sizing: border-box;
      padding: 32rpx 32rpx 0 32rpx;
      &__text {
        font-size: 32rpx;
        color: $v-c0-85;
        line-height: 28rpx;
        box-sizing: border-box;
        align-items: center;
      }
      &__line {
        width: 2rpx;
        height: 24rpx;
        background: #d9d9d9;
        border-radius: 4rpx;
      }
      &__subtitle {
        font-size: 24rpx;
        color: $v-c0-45;
        line-height: 36rpx;
        box-sizing: border-box;
        align-items: center;
      }
    }
    &-bottom {
      position: fixed;
      left: 0;
      bottom: 0;
      &__view {
        margin-left: 32rpx;
        margin-right: 32rpx;
        display: flex;
        flex-direction: row;
        margin-bottom: 174rpx;
      }
      &__text1 {
        background: #ff5319;
        border-radius: 48rpx;
        color: #fff;
        line-height: 48rpx;
        font-size: 32rpx;
        box-sizing: border-box;
        padding: 20rpx 80rpx;
        z-index: 11;
      }
    }
  }
</style>
