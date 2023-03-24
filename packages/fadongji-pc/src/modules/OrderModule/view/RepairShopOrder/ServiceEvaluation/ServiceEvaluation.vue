<template>
  <div>
    <div>
    <EraTabs :tabs-active="activeKey" :tabsList="tabsList" @tabsChange="tabsChange" />
  </div>
  <div class="mx-24px mt-72px mb-24px">
    <div class="my-24px bg-white p-24px pb-4px">
      <ServerFilterForm :active-key="activeKey" @rest="handlerRest" @submit="handlerSubmit" />
    </div>

    <div class="p-24px bg-white">
      <EraTableTitle :total="paginations.total">
        <template v-if="false" #tableEdit>
          <a-button type="default">导出数据</a-button>
        </template>
      </EraTableTitle>

      <div>
        <ATable
          :columns="tableColumns"
          :data-source="tableData"
          :loading="tableLoading"
          :pagination="false"
          :rowKey="(record) => record.id"
          :scroll="{ x: 1200 }"
          bordered
          size="small"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'starMark'">
              <VoHeart :level="Math.ceil(record.starMark / 2)" :size="20" />
            </template>
            <template v-if="column.dataIndex === 'isSolve'">
              <a-tag v-if="record.isSolve" color="green">已解决</a-tag>
              <a-tag v-else color="red">未解决</a-tag>
            </template>
            <template v-if="column.dataIndex === 'afterSaleName'">
              <div v-if="record.afterSaleName" class="text-blue-500">
                <div>{{ record.afterSaleName }}</div>
                <div>{{ record.afterSalePhone }}</div>
              </div>
              <div v-else class="text-gray-300">--</div>
            </template>
            <template v-if="column.dataIndex === 'afterSaleType'">
              <a-tag v-if="+record.afterSaleType === 1" plain color="red">运输损坏</a-tag>
              <a-tag v-if="+record.afterSaleType === 2" plain color="cyan">更换零部件</a-tag>
              <a-tag v-if="+record.afterSaleType === 3" plain color="processing">换机</a-tag>
            </template>
          </template>
        </ATable>
      </div>
      <div class="flex justify-end py-15px bg-white">
        <VoPagination
          :current="paginations.current"
          :page-size="paginations.pageSize"
          :size="'default'"
          :total="paginations.total"
          @pagination="paginationChange"
        />
      </div>
    </div>
  </div>
  </div>
</template>

<script lang="ts" setup>
  import { onBeforeMount, reactive, ref } from 'vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { tableColumns } from './data/ServerFilterData'
  import VoHeart from '/@/components/VoHeart/VoHeart.vue'
  import ServerFilterForm from './component/ServerFilterForm.vue'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'
  //   import { useRouter } from 'vue-router'
  //   import { useMessage } from '/@/hooks/web/useMessage'

  // --------全局参数---------------
  //   const { createMessage } = useMessage()
  //   const router = useRouter()

  const tabEnum = {
    all: {
      name: '全部评价',
      value: 0,
    },
    repair: {
      name: '运输损坏',
      value: 1,
    },
    unit: {
      name: '更换零部件',
      value: 2,
    },
    replace: {
      name: '换机',
      value: 3,
    },
  }

  //------tabs页签配置-------
  const activeKey = ref('all')
  const tabsList = ref([
    { key: 'all', name: '全部评价', totalCount: 0 },
    { key: 'repair', name: '运输损坏', totalCount: 0 },
    { key: 'unit', name: '更换零部件', totalCount: 0 },
    { key: 'replace', name: '换机', totalCount: 0 },
  ])
  const tabsChange = (Key) => {
    activeKey.value = Key
    paginations.current = 1
    paginations.pageSize = 10

    loadTableData()
  }

  // ------form列表---------
  const filterData = ref({})
  // 重置
  const handlerRest = (values) => {
    paginations.current = 1
    filterData.value = {
      ...values,
      ...paginations,
    }
    loadTableData()
  }
  // 搜索
  const handlerSubmit = ({ values }) => {
    paginations.current = 1
    filterData.value = {
      ...values,
      ...paginations,
    }
    loadTableData()
  }

  //------ 分页查询 -----------------
  const paginations = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  }) // 分页配置
  const paginationChange = ({ current, pageSize }) => {
    paginations.current = current
    paginations.pageSize = pageSize
    loadTableData()
  }
  //----- 加载列表数据 ---------
  const tableLoading = ref(false)
  const tableData = ref([])
  const loadTableData = async () => {
    try {
      await initStatisticsData()
      tableLoading.value = true
      const filterParams = {
        ...filterData.value,
        pageSize: paginations.pageSize,
        pageNo: paginations.current,
        afterSaleType: tabEnum[activeKey.value].value,
      }
      const { code, data } = await adminHttp.ORDER.orderEvaluateAfterSalePage(filterParams)
      console.log(tableData)
      if (code === '20001') {
        tableLoading.value = false
        paginations.total = data.total
        tableData.value = data.records

        // 这个判断当删除数据最后一条的时候，但是分页不在第一页，加载上一页的数据
        if (paginations.current > 1 && tableData.value.length === 0) {
          paginations.current = paginations.current - 1
          await loadTableData()
        }
      }
      tableLoading.value = false
    } catch (e) {
      console.log(e)
      tableLoading.value = false
    }
  }

  // 获取售后服务评价统计
  const initStatisticsData = async () => {
    const { data } = await adminHttp.ORDER.orderEvaluateAfterSaleCount()
    console.log(data)
    const tabData: any = Object.keys(data).map((item) => {
      return {
        key: item,
        name: tabEnum[item].name,
        value: tabEnum[item].value,
        totalCount: data[item],
      }
    })
    tabsList.value = tabData
    console.log(tabData, 'xx')
  }

  onMountedOrActivated(() => {
    // 初始化数据
    loadTableData()
  })
</script>

<style lang="less" scoped></style>
