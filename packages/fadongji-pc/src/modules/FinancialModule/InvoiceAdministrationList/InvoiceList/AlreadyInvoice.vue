<template>
  <div>
    <div class="mb-24px bg-white p-24px pb-4px">
      <SearchForm @rest="handlerRest" @submit="handlerSubmit" />
    </div>

    <div class="p-24px bg-white">
      <EraTableTitle :total="paginations.total" />
      <div>
        <ATable
          :loading="tableLoading"
          :columns="alreadyColumns"
          :data-source="tableData"
          :pagination="false"
          size="small"
          :scroll="{ x: 1200 }"
          bordered
        >
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex === 'amount'">
              <span>{{ record.amount }}元</span>
            </template>
            <template v-if="column.dataIndex === 'picture'">
              <div v-if="record.billUrl">
                <template v-for="(item, index) in record.billUrl.split(',')" :key="index">
                  <a-image
                    :width="40"
                    :height="40"
                    :src="item + '&type=1'"
                    :preview="{ src: item }"
                  />
                </template>
              </div>
            </template>
            <template v-if="column.dataIndex === 'operation'">
              <template v-if="record">
                <AButton
                  v-auth="'/v1/finance/invoice/detail/sell'"
                  type="link"
                  size="small"
                  @click="goInvoiceDetail(record)"
                  >详情
                </AButton>
              </template>
            </template>
          </template>
        </ATable>
      </div>
      <div class="flex justify-end py-15px bg-white">
        <VoPagination
          :size="'default'"
          :total="paginations.total"
          :current="paginations.pageNo"
          :page-size="paginations.pageSize"
          @pagination="paginationChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, onBeforeMount } from 'vue'

  import AdminHttp from '/@/utils/http/adminHttp'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import SearchForm from '../component/alreadyForm.vue'
  import { alreadyColumns } from '../data/configuration'
  import { useRouter } from 'vue-router'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";

  const router = useRouter()
  // --------全局参数---------------
  //   const { createMessage } = useMessage()

  // ------操作按钮----------
  // 详情
  const goInvoiceDetail = (record) => {
    router.push({
      path: '/financial/ticket/alreadyInvoiceDetail',
      query: { id: record.id },
    })
  }

  // ------form列表---------
  const filterData = ref({})
  // 重置
  const handlerRest = (values) => {
    paginations.pageNo = 1
    filterData.value = {
      ...values,
    }
    loadTableData()
  }
  // 搜索
  const handlerSubmit = (values) => {
    paginations.pageNo = 1

    filterData.value = {
      ...values,
    }
    loadTableData()
  }

  //------ 分页查询 -----------------
  const paginations = reactive({
    pageNo: 1,
    pageSize: 10,
    total: 0,
  }) // 分页配置
  const paginationChange = ({ current, pageSize }) => {
    paginations.pageNo = current
    paginations.pageSize = pageSize
    loadTableData()
  }

  //----- 加载列表数据 ---------
  const tableLoading = ref(false)
  const tableData = ref([])
  const loadTableData = async () => {
    try {
      tableLoading.value = true
      let params = {
        ...filterData.value,
        ...paginations,
        invoiceStatus: 2,
      }
      const { code, data } = await AdminHttp.FINANCE.financeInvoiceSelectList(params)
      console.log(tableData)
      if (code === '20001') {
        tableData.value = data.records ? data.records : []
        paginations.total = data.total

        // 这个判断当删除数据最后一条的时候，但是分页不在第一页，加载上一页的数据
        if (paginations.pageNo > 1 && tableData.value.length === 0) {
          paginations.pageNo = paginations.pageNo - 1
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
    // 初始化数据
    loadTableData()
  })
</script>

<style scoped lang="less"></style>
