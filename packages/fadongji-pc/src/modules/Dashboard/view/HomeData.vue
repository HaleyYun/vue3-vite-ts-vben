<template>
  <div class="pb-24px pt-24px px-24px">
    <div class="bg-white px-24px border-b-1px border-gray-100">
      <div class="py-15px flex items-center">
        <div class="text-16px font-bold">数据概览</div>
        <div class="pl-40px text-gray-400 line-h-1"> 数据更新时间 {{ nowTime }}</div>
        <div class="ml-auto">
          <a-space>
            <a-space v-if="dateType === 0" :size="32">
              <div class="cursor-pointer text-blue-500" @click="dateTypeHandler(0)"> 今日</div>
              <div class="cursor-pointer text-gray-300" @click="dateTypeHandler(1)"> 按月</div>
            </a-space>

            <a-space v-else :size="32">
              <div class="cursor-pointer text-gray-300" @click="dateTypeHandler(0)"> 今日</div>
              <div class="cursor-pointer text-blue-500" @click="dateTypeHandler(1)"> 按月</div>
            </a-space>

            <div class="ml-24px">
              <a-date-picker
                v-if="dateType === 0"
                v-model:value="datetime"
                value-format="YYYY-MM-DD HH:mm:ss"
              />
              <a-date-picker
                v-if="dateType === 1"
                v-model:value="datetime"
                picker="month"
                value-format="YYYY-MM"
              />
            </div>
          </a-space>
        </div>
      </div>
    </div>
    <GrowCard
      :income="dealInfo.income"
      :order-number="dealInfo.orderNumber"
      :turnover="dealInfo.turnover"
      :loading="loading"
      class="enter-y"
    />
    <div class="md:flex mt-24px">
      <div class="md:w-2/3">
        <div class="bg-white">
          <div class="p-20px border-b-1 leading-tight">
            <div class="flex justify-between">
              <div class="text-gray-800 font-bold text-16px">平台交易额</div>
              <div class="flex items-center">
                <Icon size="12" color="#40A9FF" icon="ci:dot-05-xl" />
                <span class="text-gray-400 ml-5px">单位：元</span>
              </div>
            </div>
          </div>

          <DealAnalysis :source="dealInfo.dealData" :loading="loading" />
        </div>
        <div class="pt-10px">
          <div class="mt-24px">
            <div
              style="margin-bottom: -60px; position: relative; z-index: 99"
              class="p-20px border-b-1 leading-tight"
            >
              <div class="flex justify-between">
                <div class="text-gray-800 font-bold text-16px">订单数</div>
              </div>
            </div>
            <OrderAnalysis :source="dealInfo.lineData" :loading="loading" />
          </div>
        </div>
      </div>
      <div class="md:w-1/3 md:ml-24px">
        <div class="bg-white">
          <div class="p-20px border-b-1 leading-tight">
            <div class="flex justify-between">
              <div class="text-gray-800 font-bold text-16px">数据概览</div>
            </div>
          </div>
          <IncomeAnalysis :source="dealInfo.incomeData" :loading="loading" />
        </div>
        <div class="mt-24px bg-white">
          <div class="p-20px border-b-1 leading-tight">
            <div class="flex justify-between">
              <div class="text-gray-800 font-bold text-16px">平台用户数</div>
            </div>
          </div>
          <div class="p-20px">
            <div class="flex py-28px border-b-1">
              <div class="w-1/2 pl-20px">
                <div class="text-gray-600 text-14px">修理厂（个）</div>
                <div class="mt-10px">
                  <CountTo
                    class="text-28px text-gray-700 font-medium"
                    :startVal="0"
                    :endVal="customerStatistic.garageNum"
                  />
                </div>
              </div>
              <div class="w-1/2 pl-20px">
                <div class="text-gray-600 text-14px">服务商（个)</div>
                <div class="mt-10px">
                  <CountTo
                    class="text-28px text-gray-700 font-medium"
                    :startVal="0"
                    :endVal="customerStatistic.agentNum"
                  />
                </div>
              </div>
            </div>
            <div class="flex py-28px">
              <div class="w-1/2 pl-20px">
                <div class="text-gray-600 text-14px">供应商（个）</div>
                <div class="mt-10px">
                  <CountTo
                    class="text-28px text-gray-700 font-medium"
                    :startVal="0"
                    :endVal="customerStatistic.supplierNum"
                  />
                </div>
              </div>
              <div class="w-1/2 pl-20px">
                <div class="text-gray-600 text-14px">集师傅（个)</div>
                <div class="mt-10px">
                  <CountTo
                    class="text-28px text-gray-700 font-medium"
                    :startVal="0"
                    :endVal="customerStatistic.skilledWorkerNum"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { onBeforeMount, reactive, ref, watch } from 'vue'
  import GrowCard from './components/GrowCard.vue'
  import DealAnalysis from './components/DealAnalysis.vue'
  import IncomeAnalysis from './components/IncomeAnalysis.vue'
  import { dayjs } from '@vocen/shared'
  import { CountTo } from '/@/components/CountTo'
  import OrderAnalysis from './components/OrderAnalysis.vue'
  import { Icon } from '/@/components/Icon'
  import AdminHttp from '/@/utils/http/adminHttp'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const datetime = ref<string>(dayjs().format('YYYY-MM-DD HH:mm:ss'))
  const dateType = ref(0)
  const loading = ref(true)

  const dealInfo = reactive({
    orderNumber: 0, // 平台订单数
    turnover: 0, // 平台交易额
    income: 0, // 平台总收入
    lineData: [],
    dealData: [],
    incomeData: {},
  })

  const nowTime = dayjs().format('YYYY-MM-DD HH:mm:ss')

  const customerStatistic = ref({
    agentNum: 0,
    garageNum: 0,
    skilledWorkerNum: 0,
    supplierNum: 0,
  })

  const dateTypeHandler = (type) => {
    if (type === 0) {
      datetime.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
    }
    if (type === 1) {
      datetime.value = dayjs().format('YYYY-MM')
    }
    dateType.value = type
  }

  watch(datetime, (val) => {
    // 时间变化
    if (!val) return
    initData()
  })

  // 用户统计
  const initCustomerStatistic = async () => {
    const { data } = await AdminHttp.COMPANY.companyInfoCustomerCount()
    customerStatistic.value = data
  }

  // 初始化订单数
  const initOrderNumberLine = async () => {
    const { data } = await AdminHttp.HOME.homePagePcOrderNumberLine({
      type: dateType.value,
      time: dateType.value === 0 ? datetime.value : datetime.value + '-01 00:00:00',
    })
    dealInfo.orderNumber = data.orderNumber
    dealInfo.lineData = data.orderNumberLineVOList
  }

  // 初始化交易额
  const initDealData = async () => {
    const { data } = await AdminHttp.HOME.homePagePcAmountCountLine({
      type: dateType.value,
      time: dateType.value === 0 ? datetime.value : datetime.value + '-01 00:00:00',
    })
    dealInfo.turnover = data.turnover
    dealInfo.dealData = data.turnoverLineChar
  }

  // 初始化平台总收入
  const initIncomeData = async () => {
    const { data } = await AdminHttp.HOME.homePagePcAmountFeePie({
      type: dateType.value,
      time: dateType.value === 0 ? datetime.value : datetime.value + '-01 00:00:00',
    })
    dealInfo.income = data.countAmount
    dealInfo.incomeData = data
  }

  const initData = async () => {
    await initCustomerStatistic()
    await initDealData()
    await initOrderNumberLine()
    await initIncomeData()
    loading.value = false
  }
  onMountedOrActivated(() => {
    initData()
  })
</script>
