<template>
  <div class="mx-24px mb-24px">
    <div class="my-24px bg-white p-24px pb-4px">
      <SearchForm @rest="handlerRest" @submit="handlerSubmit" />
    </div>
    <div class="p-24px bg-white">
      <EraTableTitle :total="paginations.total">
        <template #tableEdit>
          <span>单位：元</span>
        </template>
      </EraTableTitle>
      <div>
        <ATable
          :loading="tableLoading"
          rowKey="id"
          :columns="shareColumn"
          :data-source="tableData"
          :pagination="false"
          size="small"
          :scroll="{ x: `${shareColumn.length}0%` }"
          bordered
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'shopName'">
              <div>
                <div>{{ record.shopName }}</div>
                <div>{{ record.shopPhone }}</div>
              </div>
            </template>
            <template v-if="column.dataIndex === 'cashPrice'">
              <div>{{ record.cashPrice }}元</div>
              <div v-if="record.accountPeriodDays > 0">{{ record.accountPeriodDays }}天账期{{record.accountPrice}}元</div>
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
  import { ref, reactive, onBeforeMount } from 'vue'
  //   import { useMessage } from '/@/hooks/web/useMessage'
  import adminHttp from '/@/utils/http/adminHttp'

  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import SearchForm from './component/SearchForm.vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { tableColumns } from './data/configuration'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";

  let tableData: any = ref([])
  // ---搜索-------
  const filterData = ref({
    goodsName: '',
    type: 0,
  })
  const handlerRest = () => {
    paginations.current = 1
    filterData.value = { type: 0, goodsName: '' }
    loadTableData()
  }
  const handlerSubmit = (values) => {
    paginations.current = 1
    filterData.value = { ...values }
    if (!filterData.value.type) {
      filterData.value.type = 0
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

  const tableLoading = ref(false)
  let shareColumn = ref(tableColumns)
  const getTemplateData = async () => {
    try {
      const { code, data } = await adminHttp.GOODS.goodsInvestmentProfitRole()
      if (code === '20001') {
        let templateData = data
        if (templateData.length > 0) {
          templateData = templateData.map((item) => {
            return { title: item['name'] + '(元)', dataIndex: item['key'], width: 150 }
          })
          shareColumn.value = [...shareColumn.value, ...templateData]
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
  const loadTableData = async () => {
    let listArr: any = []
    tableLoading.value = true
    const map = {
      ...filterData.value,
      pageNo: paginations.current,
      pageSize: paginations.pageSize,
    }
    const { code, data } = await adminHttp.GOODS.goodsInvestmentProfitList(map)
    if (code == '20001') {
      listArr = data.records ? data.records : []
      listArr.map((item) => {
        if (item.shareProfitInfo) {
          item['warehouse'] = null
          item.shareProfitInfo.forEach((innerItem) => {
            item[innerItem.key] = (innerItem.value!= null?innerItem.value:'--')+'元'
          })
        }
        return item
      })
      tableData.value = listArr
      paginations.total = data.total
      tableLoading.value = false
    }
  }

  onMountedOrActivated(() => {
    getTemplateData()
    loadTableData()
  })
</script>

<style scoped lang="less"></style>
