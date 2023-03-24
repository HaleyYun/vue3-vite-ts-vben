<template>
  <Card :bordered="false" :loading="loading">
    <div ref="chartRef" :style="{ height, width }"></div>
  </Card>
</template>

<script lang="ts" setup>
  import { ref, Ref, watch } from 'vue'
  import { useECharts } from '/@/hooks/web/useECharts'
  import { Card } from 'ant-design-vue'

  const props = defineProps({
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: '360px',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    source: {
      type: Object,
      default() {
        return {}
      },
    },
  })
  const chartRef = ref<HTMLDivElement | null>(null)
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>)

  const xData = ref([])
  const sData = ref([])

  watch(
    () => props.source,
    () => {
      initData()
    },
    {
      deep: true,
    },
  )

  const initData = () => {
    xData.value = props.source.map((item) => item.time)
    sData.value = props.source.map((item) => item.turnover)
    setOptions({
      title: {
        show: false,
        text: '平台交易额',
        subtext: '单元：元',
        subtextStyle: {
          align: 'right',
        },
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        show: false,
      },
      grid: {
        right: '5%',
        bottom: '8%',
      },
      toolbox: {
        show: false,
        feature: {
          dataZoom: {
            yAxisIndex: 'none',
          },
          dataView: { readOnly: false },
          magicType: { type: ['line', 'bar'] },
          restore: {},
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xData.value,
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} 元',
        },
      },
      series: [
        {
          name: '交易额',
          type: 'line',
          data: sData.value,
          markPoint: {
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' },
            ],
            label: {
              color: '#FFFFFF',
            },
          },
          smooth: true,
          markLine: {
            data: [{ type: 'average', name: 'Avg' }],
          },
          itemStyle: {
            color: '#1890FF',
          },
          label: {
            show: false,
          },
        },
      ],
    })
  }

  watch(
    () => props.loading,
    (loading) => {
      if (loading) return
      initData()
    },
  )
</script>
