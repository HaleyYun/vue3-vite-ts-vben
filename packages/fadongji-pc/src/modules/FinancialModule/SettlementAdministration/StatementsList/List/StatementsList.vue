<template>
  <div>
    <EraTabs :tabsList="tabsList" :tabs-active="activeKey" @tabsChange="tabsChange" />

    <div class="mx-24px mt-72px mb-24px">
      <div class="my-24px bg-white p-24px pb-4px">
        <SearchForm @rest="handlerRest" @submit="handlerSubmit" />
      </div>
      <div class="p-24px bg-white">
        <EraTableTitle :total="paginations.total" />
        <div>
          <ATable
            :loading="tableLoading"
            :columns="tableColumns"
            :data-source="tableData"
            :pagination="false"
            :scroll="{ x: 1200 }"
            bordered
          >
            <template #bodyCell="{ column, text, record }">
              <template v-if="column.dataIndex === 'type'">
                <span v-if="record.type === 11">销售订单</span>
                <span v-if="record.type === 12">投资订单</span>
                <span v-if="record.type === 13">旧机订单</span>
              </template>
              <template v-if="column.dataIndex === 'status'">
                <span v-if="record.status === 1">已结算</span>
                <span v-if="record.status === -1">结算异常</span>
              </template>
              <template v-if="column.dataIndex === 'operation'">
                <AButton
                  v-auth="'/v1/finance/bill/manage/id'"
                  type="link"
                  size="small"
                  @click="goDetail(record)"
                  >详情
                </AButton>
                <template v-if="record.status === -1">
                  <a-divider type="vertical" />
                  <AButton
                    v-auth="'/v1/finance/bill/manage/manual/bill'"
                    type="link"
                    class="ml-10px"
                    size="small"
                    @click="confirmSettlement(record)"
                  >
                    结算
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
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
  import { tableColumns } from './data/configuration'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const { createMessage } = useMessage()

  // --------公用参数---------------
  const router = useRouter() // 路由跳转函数

  // 详情跳转
  const goDetail = (record) => {
    router.push({
      path: '/financial/settlement/StatementsDetail',
      query: { id: record.id },
    })
  }

  // 结算
  const confirmSettlement = (record) => {
    Modal.confirm({
      title: '结算',
      icon: createVNode(ExclamationCircleOutlined),
      content: `确定要对该结算单进行结算吗？`,
      async onOk() {
        await financeBill(record.id)
        Modal.destroyAll()
        await loadTableData()
      },
      onCancel() {},
    })
  }

  const financeBill = async (id) => {
    try {
      let params = { id: id }
      const { code } = await AdminHttp.FINANCE.financeBillManageManualBill(params)
      if (code === '20001') {
        createMessage.success('结算完成')
      }
    } catch (e) {
      console.log(e)
    }
  }

  // ---搜索-------
  const filterData = ref({})
  const handlerRest = () => {
    paginations.pageNo = 1
    filterData.value = {}
    loadTableData()
  }
  const handlerSubmit = (values) => {
    paginations.pageNo = 1
    filterData.value = {
      ...values,
    }
    loadTableData()
  }

  // tabs 配置
  const activeKey = ref(null)
  const tabsList = ref([
    { key: null, name: '全部' },
    { key: 1, name: '已结算' },
    { key: -1, name: '结算异常' },
  ])
  const tabsChange = (Key) => {
    activeKey.value = Key
    paginations.pageNo = 1
    paginations.pageSize = 10

    loadTableData()
  }

  //--- 分页查询 ------
  const paginations = reactive({
    pageNo: 1,
    pageSize: 10,
    total: 0,
  })
  const paginationChange = ({ current, pageSize }) => {
    paginations.pageNo = current
    paginations.pageSize = pageSize
    loadTableData()
  }

  // 加载数据
  const tableLoading = ref(false)
  const tableData = ref([])
  const platformCode = 'supplier'
  const loadTableData = async () => {
    try {
      tableLoading.value = true
      let params = {
        status: activeKey.value,
        ...filterData.value,
        pageNo: paginations.pageNo,
        pageSize: paginations.pageSize,
      }
      const { code, data } = await AdminHttp.FINANCE.financeBillManagePage(params)
      if (code === '20001') {
        tableData.value = data.records ? data.records : []
        //tableData.value = MockTableData
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
