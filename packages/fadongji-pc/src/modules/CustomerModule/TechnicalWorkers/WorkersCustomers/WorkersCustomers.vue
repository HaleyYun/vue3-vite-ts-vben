<template>
  <div class="mx-24px mb-24px">
    <div class="my-24px bg-white p-24px pb-4px">
      <SearchForm @rest="handlerRest" @submit="handlerSubmit" />
    </div>
    <div class="p-24px bg-white">
      <EraTableTitle :total="paginations.total">
        <template #tableEdit>
          <!--<a-button type="primary" :disabled="selectedRow.length === 0" class="margin-l-r-10">数据导出</a-button>-->
        </template>
      </EraTableTitle>
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
            <template v-if="column.dataIndex === 'info'">
              <p>{{ record.storeName }}</p>
              <p>{{ record.contractPhone }}</p>
            </template>
            <template v-if="column.dataIndex === 'operation'">
              <APopconfirm
                title="  确定取消关联？"
                ok-text="是"
                cancel-text="否"
                @confirm="cancelBinding(record)"
              >
                <AButton type="link" size="small">取消关联</AButton>
              </APopconfirm>
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
  import { useRoute } from 'vue-router'
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
  const route = useRoute() // 获取传过来参数

  //---- 全选 复选框选择 ------
  const selectedRow = ref([])
  const rowSelection = {
    onChange: (selectedRowKeys: string[], selectedRows: object[]) => {
      selectedRow.value = selectedRowKeys
    },
  }

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

  // 取消关联
  const cancelBinding = async (record) => {
    try {
      // inviteeId 被绑定人企业ID  被绑定人是当前列表的 服务商 修理厂等角色
      // inviterId 绑定人企业ID
      let params = { inviteeId: record.id, inviterId: record.bindCompanyId }
      const { code } = await AdminHttp.COMPANY.companyInfoSkilledWorkerUnbind(params)
      if (code === '20001') {
        createMessage.success('操作成功')
        loadTableData()
      }
    } catch (e) {
      console.log(e)
    }
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
        companyId: route.query['id'],
        ...filterData.value,
        pageNo: paginations.current,
        pageSize: paginations.pageSize,
      }
      const { code, data } = await AdminHttp.COMPANY.companyInfoSkilledWorkerAssociatedPage(params)
      console.log(tableData)
      if (code === '20001') {
        tableData.value = data.records ? data.records : []
        paginations.total = data.total
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
    // 初始化数据
    loadTableData()
  })
</script>

<style scoped lang="less"></style>
