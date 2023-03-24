<template>
  <div class="m-24px">
    <div class="mb-24px bg-white p-24px pb-4px">
      <div class="mb-20px text-l font-bold">
        <div v-if="operationType == 1">用户积分明细（当前用户积分：{{ score }}）</div>
        <div v-else>用户成长值明细（当前用户等级：{{ level }}）</div>
      </div>
      <SearchForm ref="Form" @rest="handlerRest" @submit="handlerSubmit" />
    </div>
    <div class="p-24px bg-white">
      <EraTableTitle :total="paginations.total" />
      <div>
        <ATable
          :loading="tableLoading"
          :columns="tableColumns"
          :data-source="tableData"
          :pagination="false"
          size="small"
          :scroll="{ x: 1200 }"
          bordered
        >
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex === 'score'">
              <!--加减积分 0:加 1:减 2:积分回退	-->
              <span>{{ record.isAdd == 0 ? '+' : '-' }}</span>
              <span>{{ record.score }}</span>
            </template>
          </template>
        </ATable>
      </div>
      <div class="flex justify-end py-15px bg-white">
        <VoPagination
          :size="'default'"
          :total="paginations.total"
          :current="paginations.current"
          :page-size="paginations.pageSize"
          @pagination="paginationChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { defineComponent, ref, reactive, createVNode, onBeforeMount, defineProps } from 'vue'
  import { Modal } from 'ant-design-vue'
  import { useRoute } from 'vue-router'
  import { useMessage } from '/@/hooks/web/useMessage'
  import AdminHttp from '/@/utils/http/adminHttp'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import SearchForm from './component/SearchForm.vue'
  import { tableColumns, MockTableData } from './data/configuration'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const { createMessage } = useMessage()

  // --------公用参数---------------
  const route = useRoute() // 获取传过来参数
  const Form = ref()
  const props = defineProps({
    operationType: {
      type: Number,
      default: 2,
    },
  })

  // ---搜索-------
  const filterData = ref({})
  const handlerRest = () => {
    paginations.current = 1
    filterData.value = {}
    loadTableData()
  }
  const handlerSubmit = (values) => {
    paginations.current = 1
    filterData.value = {
      ...values,
    }
    console.log(filterData.value)
    loadTableData()
  }

  //--- 分页查询 ------
  const paginations = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  })
  const paginationChange = ({ current, pageSize }) => {
    paginations.current = current
    paginations.pageSize = pageSize
    loadTableData()
  }

  // 加载数据
  const tableLoading = ref(false)
  const tableData = ref([])
  const score = ref(null) // 积分总值
  const level = ref(route.query.level)
  const loadTableData = async () => {
    try {
      tableLoading.value = true
      let params = {
        ...filterData.value,
        userId: route.query['userId'],
        companyId: route.query['companyId'] || route.query['id'] || 0,
        operationType: props.operationType, // 操作类型,1.积分  2.成长值
        pageNo: paginations.current,
        pageSize: paginations.pageSize,
      }
      const { code, data } = await AdminHttp.INTEGRAL.grantRecordList(params)
      console.log(tableData)
      if (code === '20001') {
        tableData.value = data.grantRecordDTO.records ? data.grantRecordDTO.records : []
        paginations.total = data.grantRecordDTO.total
        score.value = data.grantRecordDTO.score
      }
      tableLoading.value = false
    } catch (e) {
      console.log(e)
      tableLoading.value = false
    }
  }
  onMountedOrActivated(() => {
    loadTableData()
  })
</script>

<style scoped lang="less"></style>
