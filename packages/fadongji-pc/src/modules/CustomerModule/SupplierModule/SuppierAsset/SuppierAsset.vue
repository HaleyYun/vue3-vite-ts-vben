<template>
  <div class="mx-24px mb-24px">
    <div class="my-24px bg-white p-24px pb-4px">
      <SearchForm @rest="handlerRest" @submit="handlerSubmit"></SearchForm>
    </div>
    <div class="p-24px bg-white">
      <EraTableTitle :total="paginations.total"></EraTableTitle>
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
            <template v-if="column.dataIndex === 'growth_value'">
              <a v-if="record.growth_value > 0" @click="assetsReport(record, 2)">{{
                record.growth_value
              }}</a>
              <span v-else>0</span>
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
  import { defineComponent, ref, reactive, createVNode, onBeforeMount } from 'vue'
  import { Modal } from 'ant-design-vue'
  import { useRouter } from 'vue-router'
  import { useMessage } from '/@/hooks/web/useMessage'
  import AdminHttp from '/@/utils/http/adminHttp'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import SearchForm from './component/SearchForm.vue'
  import { tableColumns, MockTableData } from './data/configuration'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";

  const { createMessage } = useMessage()

  // --------公用参数---------------
  const router = useRouter() // 获取传过来参数

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
    loadTableData()
  }

  // 资产明细
  const assetsReport = async (record, type) => {
    router.push({
      path: '/customerModule/supplier/SuppieAssetReport',
      query: { id: record.id, type: type },
    })
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
  const loadTableData = async () => {
    try {
      tableLoading.value = true
      let params = {
        ...filterData.value,
        pageNo: paginations.current,
        pageSize: paginations.pageSize,
      }
      const { code, data } = await AdminHttp.CUSTOMER.companyInfoPage(params)
      console.log(tableData)
      if (code === '20001') {
        //tableData.value = data.records?data.records:[];
        paginations.total = data.total
        // 这里是模拟数据，真实开发用接口返回数据
        tableData.value = MockTableData
        // 这个判断当删除数据最后一条的时候，但是分页不在第一页，加载上一页的数据
        if (paginations.current > 1 && tableData.value.length === 0) {
          paginations.current = paginations.current - 1
          loadTableData()
        }
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
