<template>
  <view class="chart-container">
    <!-- <VoChart ref="chart" /> -->
    <VoEchart ref="chart" style="width: 100%" />
  </view>
</template>
<script>
  // import F2 from '@/assets/f2-all.min'
  import * as echarts from '@/components/VoEchart/static/echarts.min.js'

  export default {
    name: 'ProjectProcess',
    props: {
      info: {
        type: Object,
      },
    },
    data() {
      return {}
    },
    watch: {
      info: {
        deep: true,
        handler(val) {
          if (val && val.hasOwnProperty('goodsId')) {
            this.initCharts()
          }
        },
      },
    },
    mounted() {},
    methods: {
      initCharts() {
        //info.alreadyInvestedNum
        console.log('info.remainingAvailable', this.info.remainingAvailable)
        let data = [
          {
            name: '已售',
            value: this.info.alreadyInvestedNum,
            const: 'const',
            title: '已售数量/金额',
            valueB: this.info.alreadyInvestedNum + '/' + this.info.investedAmount + '元',
          },
          {
            name: '未售',
            value: this.info.remainingAvailable,
            const: 'const',
            title: '未售数量/金额',
            valueB: this.info.remainingAvailable + '/' + this.info.notInvestAmount + '元',
          },
        ]

        this.$refs.chart.init(echarts, (chart) => {
          let option = {
            legend: {
              orient: 'vertical',
              left: 'left',
              top: 8,
              itemWidth: 10,
              itemHeight: 10,
              borderRadius: 2,
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: '50%',
                labelLine: {
                  normal: {
                    lineStyle: {
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
  .chart-container {
    width: 100%;
    height: 256rpx;
  }
</style>
