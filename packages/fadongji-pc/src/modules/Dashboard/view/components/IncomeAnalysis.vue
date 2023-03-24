<template>
  <Card :bordered="false" :loading="loading">
    <div>
      <div ref="chartRef" :style="{ height, width }"></div>
      <div
        v-for="(item, index) in dataList"
        :key="index"
        class="flex border-b-1 items-center py-10px"
      >
        <div class="flex w-120px text-14px items-center">
          <Icon size="12" :color="item.iconColor" icon="ci:dot-05-xl" />
          <div class="ml-10px">{{ item.name }}</div>
        </div>
        <div> ￥{{ item.value }}</div>
        <div class="ml-auto text-gray-300">{{ item.percent }}</div>
      </div>
    </div>
  </Card>
</template>

<script lang="ts" setup>
  import { ref, Ref, watch } from 'vue'
  import { useECharts } from '/@/hooks/web/useECharts'
  import { Card } from 'ant-design-vue'
  import { Icon } from '/@/components/Icon'
  import { Decimal, VoUtils } from '@vocen/shared'

  const props = defineProps({
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: '300px',
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

  const dataList = ref<any>([])
  watch(
    () => props.loading,
    (loading) => {
      if (loading) return
      initData()
    },
  )

  const initData = () => {
    const total = VoUtils.hasOwn(props.source, 'countAmount') ? props.source.countAmount : 0
    const payAmount = VoUtils.hasOwn(props.source, 'payAmount') ? props.source.payAmount : 0
    const coverCharge = VoUtils.hasOwn(props.source, 'coverCharge') ? props.source.coverCharge : 0
    const installationFee = VoUtils.hasOwn(props.source, 'installationFee')
      ? props.source.installationFee
      : 0
    const commission = VoUtils.hasOwn(props.source, 'commission') ? props.source.commission : 0

    const payAmountPercent = total
      ? Decimal.div(payAmount, total).mul(100).toFixed(2).toString() + '%'
      : '0%'
    const coverChargePercent = total
      ? Decimal.div(coverCharge, total).mul(100).toFixed(2).toString() + '%'
      : '0%'
    const installationFeePercent = total
      ? Decimal.div(installationFee, total).mul(100).toFixed(2).toString() + '%'
      : '0%'
    const commissionPercent = total
      ? Decimal.div(+commission, +total)
          .mul(100)
          .toFixed(2)
          .toString() + '%'
      : '0%'
    dataList.value = [
      {
        name: '自营',
        value: payAmount,
        percent: payAmountPercent,
        iconColor: '#40A9FF',
      },
      {
        name: '服务费',
        value: coverCharge,
        percent: coverChargePercent,
        iconColor: '#5DA89A',
      },
      {
        name: '安装费',
        value: installationFee,
        percent: installationFeePercent,
        iconColor: '#F87777',
      },
      {
        name: '交易手续费',
        value: commission,
        percent: commissionPercent,
        iconColor: '#FFCD26',
      },
    ]

    const options: any = {
      title: {
        left: 'center',
        top: 'center',
        show: true,
        text: `￥${total}`,
        subtext: '平台总收入',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        show: false,
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: '平台总收入',
          type: 'pie',
          radius: ['65%', '80%'],
          data: [
            {
              value: commission,
              name: '交易手续费',
              itemStyle: { color: '#FFCD26' },
              label: {
                rich: { hr: { backgroundColor: '#FFCD26' } },
              },
            },
            {
              value: installationFee,
              name: '安装费',
              itemStyle: { color: '#F87777' },
              label: {
                rich: { hr: { backgroundColor: '#F87777' } },
              },
            },
            {
              value: coverCharge,
              name: '服务费',
              itemStyle: { color: '#5DA89A' },
              label: {
                rich: { hr: { backgroundColor: '#5DA89A' } },
              },
            },
            {
              value: payAmount,
              name: '自营',
              itemStyle: { color: '#40A9FF' },
              label: {
                rich: { hr: { backgroundColor: '#40A9FF' } },
              },
            },
          ],
          labelLine: {
            show: false,
            length: 15,
            length2: 25,
            lineStyle: {
              width: 1,
            },
          },
          label: {
            lineHeight: 20,
            fontSize: 14,
            show: false,
            position: 'outside',
            formatter: '{a|{b}\n{c} \n{d}%}',
            padding: [0, 5, 0, 5],
          },
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
    setOptions(options)
  }

  watch(
    () => props.source,
    (val) => {
      if (!VoUtils.hasOwn(val, 'countAmount')) return
      initData()
    },
    {
      deep: true,
      immediate: true,
    },
  )
</script>
