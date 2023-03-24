<template>
  <Card :bordered="false" :loading="loading">
    <div>
      <div ref="chartRef" :style="{ height, width }"></div>
    </div>
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
      default: '375px',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    source: {
      type: Array,
      default() {
        return []
      },
    },
  })
  const chartRef = ref<HTMLDivElement | null>(null)
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>)

  const sourceData = ref<any>([])

  const xData = ref<any>([])

  const initChart = () => {
    const val = props.source
    xData.value = val.map((item: any) => item.time)
    sourceData.value = [
      {
        name: '投资订单',
        type: 'bar',
        color: '#5DA89A',
        data: val.map((item: any) => item.orderInvestNumber),
      },
      {
        name: '修理厂订单',
        type: 'bar',
        color: '#40A9FF',
        data: val.map((item: any) => item.orderSellNumber),
      },
      {
        name: '安装订单',
        type: 'bar',
        color: '#F86060',
        data: val.map((item: any) => item.orderInstallNumber),
      },
      {
        name: '回收订单',
        type: 'bar',
        color: '#916BFE',
        data: val.map((item: any) => item.orderRecycleNumber),
      },
      {
        name: '旧机销售订单',
        type: 'bar',
        color: '#FF6633',
        data: val.map((item: any) => item.orderOldNumber),
      },
    ]
    setOptions({
      grid: {
        left: '5%',
        right: '3%',
        bottom: '5%',
        top: '25%',
      },
      title: {
        show: false,
        text: '订单数',
      },
      tooltip: {
        trigger: 'axis',
        position: 'right',
      },
      legend: {
        align: 'left',
        right: 0,
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          color: '#989898',
          lineHeight: 1,
          padding: [0, 0, 0, 0],
        },
        icon: 'circle',
        data: ['投资订单', '修理厂订单', '安装订单', '回收订单', '旧机销售订单'],
      },
      toolbox: {
        show: false,
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          // prettier-ignore
          data: xData.value,
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: sourceData.value,
    })
  }

  watch(
    () => props.source,
    () => {
      initChart()
    },
    {
      deep: true,
      immediate: true,
    },
  )

  watch(
    () => props.loading,
    (loading) => {
      if (loading) return
      initChart()
    },
  )
</script>
