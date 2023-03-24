<template>
  <div class="sale-list">
    <Card
      bordered
      class="list-card w-full"
      title="销售统计"
      :headStyle="{ backgroundColor: '#F3F3F3', fontSize: '14px' }"
    >
      <CardGrid class="list-card-left" :hoverAble="true">
        <div class="card-left-up">
          <p class="card-left-title">本月销售总额</p>
          <CountTo :endVal="1000000" class="card-left-count" />
          <div class="card-left-year">
            <img class="left-year-img" src="../../../assets/svg/u509.svg" />
            <span class="left-year-percent">10%</span>
            <span>同比上月</span>
          </div>
        </div>
        <div class="card-left-down">
          <p class="left-title">本周销售总额</p>
          <CountTo :endVal="5000000" class="left-count" />
          <div class="left-year">
            <img class="year-img" src="../../../assets/svg/u505.svg" />
            <span class="year-percent">10%</span>
            <span>同比上周</span>
          </div>
        </div>
      </CardGrid>
      <CardGrid style="width: 80%; text-align: center" :hoverAble="true">
        <div class="saleList">
          <div ref="charRef" :style="{ height, width }"></div>
        </div>
      </CardGrid>
    </Card>
  </div>
</template>
<script lang="ts" setup>
  import { basicProps } from './props'
  import { onMounted, ref, Ref } from 'vue'
  import { Card } from 'ant-design-vue'
  import { useECharts } from '/@/hooks/web/useECharts'
  import { CountTo } from '/@/components/CountTo/index'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const CardGrid = Card.Grid
  defineProps({
    ...basicProps,
  })
  const charRef = ref<HTMLDivElement | null>(null)
  const { setOptions } = useECharts(charRef as Ref<HTMLDivElement>)

  onMountedOrActivated(() => {
    setOptions({
      xAxis: {
        type: 'category',
        data: ['周六', '周日', '周一', '周二', '周三', '周四', '周五'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line', // smooth: true,
        },
      ],
    })
  })
</script>
<style lang="less" scoped>
  .sale-list {
    padding: 20px;
    padding-top: 0;

    .list-card {
      border: 1px solid #ccc;

      .list-card-left {
        width: 20%;
        height: 330px;
        text-align: center;

        .card-left-up {
          margin-top: 20px;

          .card-left-title {
            margin-bottom: -1px;
            font-weight: 400;
            font-size: 12px;
            color: #989898;
          }

          .card-left-count {
            font-size: 24px;
            color: #666666;
            font-family: '微软雅黑';
            font-weight: 400;
          }

          .card-left-year {
            display: flex;
            justify-content: center;

            .left-year-img {
              width: 7px;
              height: 4px;
              margin-top: 9px;
              margin-right: 5px;
            }

            .left-year-percent {
              color: #f04844;
              margin-right: 5px;
            }
          }
        }

        .card-left-down {
          margin-top: 40px;

          .left-title {
            margin-bottom: -1px;
            font-weight: 400;
            font-size: 12px;
            color: #989898;
          }

          .left-count {
            font-size: 24px;
            color: #666666;
            font-family: '微软雅黑';
            font-weight: 400;
          }

          .left-year {
            display: flex;
            justify-content: center;

            .year-img {
              width: 7px;
              height: 4px;
              margin-top: 9px;
              margin-right: 5px;
            }

            .year-percent {
              color: #f04844;
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
</style>
