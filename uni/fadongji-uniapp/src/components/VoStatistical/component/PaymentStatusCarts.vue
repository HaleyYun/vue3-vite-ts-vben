<template>
  <view class="statusCarts">
    <view class="title">订单支付情况</view>
    <view v-if="!loading && !isNoData">
      <VoEchart ref="chart" style="width: 100%" />
      <view class="text" v-if="info.typeNum">
        共提交{{ info.typeNum }}个商品，共{{ info.total }}台
      </view>
    </view>
    <VoNoData v-if="!loading && isNoData" no-data-tips="暂无数据" />
  </view>
</template>

<script>
  import * as echarts from '@/components/VoEchart/static/echarts.min.js'

  export default {
    name: 'PaymentStatusCarts',
    props: {
      timeParams: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        loading: false,
        isNoData: false,
        info: {
          waitingPay: 0,
          payment: 0,
        },
      }
    },
    watch: {
      timeParams: {
        deep: true,
        handler(newVal) {
          console.log(newVal)
          this.getPaymentApi()
        },
      },
    },
    mounted() {
      this.getPaymentApi()
    },
    methods: {
      // apiOrderStatisticsOrderPaymentApi
      async getPaymentApi() {
        if (this.loading) return
        this.loading = true
        try {
          let params = {
            startTime: this.timeParams.selectTime[0],
            endTime: this.timeParams.selectTime[1],
          }
          const { code, data } = await this.$VoHttp.apiOrderStatisticsOrderPayment(params)
          if (code == '20001') {
            this.info = data
            if (!data || (!this.info.waitingPay && !this.info.payment)) {
              this.isNoData = true
            } else {
              setTimeout(() => {
                this.initCharts()
              }, 100)
            }
          }
        } catch (e) {
          this.isNoData = true
          console.log(e)
          this.isNoData = true
        }
        this.loading = false
      },
      initCharts() {
        let data = [
          {
            name: '未支付商品',
            value: this.info.waitingPay ? this.info.waitingPay : 0,
            const: 'const',
            title: '未支付商品',
            valueB: this.info.waitingPay ? this.info.waitingPay : 0,
          },
          {
            name: '已支付商品',
            value: this.info.payment ? this.info.payment : 0,
            const: 'const',
            title: '已支付商品',
            valueB: this.info.payment ? this.info.payment : 0,
          },
        ]

        this.$refs.chart.init(echarts, (chart) => {
          let option = {
            legend: {
              orient: 'vertical',
              // left: 'right',
              top: 12,
              right: 16,
              itemWidth: 10,
              itemHeight: 10,
              borderRadius: 2,
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: '50%',
                roseType: 'radius',
                labelLine: {
                  normal: {
                    lineStyle: {
                      join: 'round',
                      color: 'rgba(0, 0, 0, 0.65)',
                    },
                  },
                },
                label: {
                  show: true,
                  formatter(params) {
                    return `{dark|${params.data.valueB}}\n {color|${params.data.title}}`
                  },
                  rich: {
                    dark: {
                      color: 'rgba(0, 0, 0, 0.85)',
                      fontWeight: 500,
                      fontSize: 14,
                      lineHeight: 23,
                    },
                    color: {
                      color: 'rgba(0, 0, 0, 0.65)',
                      fontWeight: 400,
                      fontSize: 12,
                      lineHeight: 18,
                    },
                  },
                },
                data: data,
                color: ['#FF9B05', '#0D66FF'],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                  },
                },
              },
            ],
          }
          chart.setOption(option)
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .statusCarts {
    margin-top: 16rpx;
    background: #fff;
    padding-bottom: 24rpx;
    position: relative;
    min-height: 406rpx;
    .title {
      font-weight: 500;
      font-size: 32rpx;
      line-height: 150%;
      padding: 24rpx 32rpx;
      position: absolute;
      color: rgba(0, 0, 0, 0.85);
    }
  }
  ::v-deep .page-img {
    padding-top: 0;
  }
  .text {
    margin-top: -48rpx;
    font-size: 28rpx;
    color: $v-c0-85;
    line-height: 1.5;
    text-align: center;
  }
</style>
