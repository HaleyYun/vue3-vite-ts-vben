<template>
  <div class="md:flex bg-white p-5">
    <Card
      size="small"
      :loading="loading"
      class="md:w-1/4 w-full !md:mr-4 !md:mt-0 !mt-4"
      :bordered="false"
    >
      <div class="flex">
        <div class="pl-10px">
          <div
            class="w-64px text-0px h-64px flex rounded-34px items-center justify-center rounded-50%"
          >
            <img class="w-54px h-54px" :src="data1" alt="" />
          </div>
        </div>
        <div class="pl-20px">
          <CountTo
            class="text-32px text-gray-700 font-medium"
            :decimals="2"
            :startVal="0"
            :endVal="turnover"
          />
          <div class="text-12px mt-10px text-gray-400">平台交易额（元）</div>
        </div>
      </div>
    </Card>
    <Card
      size="small"
      :loading="loading"
      class="md:w-1/4 w-full !md:mr-4 !md:mt-0 !mt-4"
      :bordered="false"
    >
      <div class="flex">
        <div class="pl-10px">
          <div
            class="w-64px text-0px h-64px flex rounded-34px items-center justify-center rounded-50%"
          >
            <img class="w-54px h-54px" :src="data2" alt="" />
          </div>
        </div>
        <div class="pl-20px">
          <CountTo
            class="text-32px text-gray-700 font-medium"
            :decimals="2"
            :startVal="0"
            :endVal="income"
          />
          <div class="text-12px mt-10px text-gray-400">平台总收入（元）</div>
        </div>
      </div>
    </Card>
    <Card
      size="small"
      :loading="loading"
      class="md:w-1/4 w-full !md:mr-4 !md:mt-0 !mt-4"
      :bordered="false"
    >
      <div class="flex">
        <div class="pl-10px">
          <div
            class="w-64px text-0px h-64px flex rounded-34px items-center justify-center rounded-50%"
          >
            <img class="w-54px h-54px" :src="data3" alt="" />
          </div>
        </div>
        <div class="pl-20px">
          <CountTo
            class="text-32px text-gray-700 font-medium"
            :startVal="0"
            :decimals="2"
            :endVal="orderNumber"
          />
          <div class="text-12px mt-10px text-gray-400">下单订单数</div>
        </div>
      </div>
    </Card>
    <Card
      size="small"
      :loading="loading"
      class="md:w-1/4 w-full !md:mr-4 !md:mt-0 !mt-4"
      :bordered="false"
    >
      <div class="flex">
        <div class="pl-10px">
          <div
            class="w-64px text-0px h-64px flex rounded-34px items-center justify-center rounded-50%"
          >
            <img class="w-54px h-54px" :src="data4" alt="" />
          </div>
        </div>
        <div class="pl-20px">
          <CountTo
            class="text-32px text-gray-700 font-medium"
            :decimals="2"
            :startVal="0"
            :endVal="peopleNum"
          />
          <div class="text-12px mt-10px text-gray-400">平台用户数</div>
        </div>
      </div>
    </Card>
  </div>
</template>
<script lang="ts" setup>
  import { onBeforeMount, ref } from 'vue'
  import { CountTo } from '/@/components/CountTo'
  import { Card } from 'ant-design-vue'
  import data1 from '/@/assets/images/data-1.png'
  import data2 from '/@/assets/images/data-2.png'
  import data3 from '/@/assets/images/data-3.png'
  import data4 from '/@/assets/images/data-4.png'
  import AdminHttp from '/@/utils/http/adminHttp'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const peopleNum = ref(0)

  defineProps({
    loading: {
      type: Boolean,
    },
    turnover: {
      type: Number,
      default: 0,
    },
    orderNumber: {
      type: Number,
      default: 0,
    },
    income: {
      type: Number,
      default: 0,
    },
  })

  const initPeopleNum = async () => {
    const { code, data } = await AdminHttp.COMPANY.companyInfoCustomerTotal()
    if (+code === 20001) {
      peopleNum.value = data
    }
  }

  onMountedOrActivated(() => {
    initPeopleNum()
  })
</script>
