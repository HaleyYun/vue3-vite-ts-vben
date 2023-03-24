<template>
  <div class="mx-24px mt-0px mb-24px">
    <div class="mb-24px bg-white p-24px pb-4px">
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
          size="small"
          :scroll="{ x: 1200 }"
          bordered
        >
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex == 'OrderNumber'">
              <a @click="goOrderDetails(record)">{{ record['orderId'] }}</a>
            </template>
            <template v-if="column.dataIndex == 'status'">
              <span v-if="record.status === '1'">未收款</span>
              <span v-if="record.status === '2'">已收款</span>
            </template>
            <template v-if="column.dataIndex == 'isSettlement'">
              <span v-if="record.advancesStatus === 0">未垫付</span>
              <span v-else-if="record.advancesStatus === 1">垫付成功</span>
              <span v-else>垫付失败</span>
            </template>
            <template v-if="column.dataIndex == 'refundAmount'">
              <span v-if="record.amount">{{ record.amount }}元</span>
              <span v-else>--</span>
            </template>
            <template v-if="column.dataIndex === 'operation'">
              <AButton
                v-auth="'/v1/finance/advances/standing/detail'"
                type="link"
                size="small"
                @click="goDetail(record)"
                >详情
              </AButton>
              <template v-if="record.status === '1'">
                <a-divider type="vertical" />
                <AButton
                  v-auth="'/v1/finance/advances/standing/confirm'"
                  type="link"
                  class="ml-10px"
                  size="small"
                  @click="confirmReceipt(record)"
                >
                  确认还款
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
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
  import { ref, reactive, createVNode, onBeforeMount } from 'vue'
  import { message, Modal } from 'ant-design-vue'
  import { useRouter } from 'vue-router'
  import AdminHttp from '/@/utils/http/adminHttp'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import SearchForm from './component/SearchForm.vue'
  import { tableColumns } from './data/configuration'
  import { useMessage } from '/@/hooks/web/useMessage'

  import { usePermission } from '/@/hooks/web/usePermission'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const { hasPermission } = usePermission()

  const { createMessage } = useMessage()
  // --------公用参数---------------
  const router = useRouter() // 路由跳转函数

  // 回收订单详情
  const goOrderDetails = (record) => {
    const flag = hasPermission('/v1/order/recycle/detail')
    if (!flag) {
      return message.warn('暂无权限，无法操作')
    }
    router.push({
      path: '/OrderModule/repairShopOrder/recoveryDetails',
      query: { id: record.orderId },
    })
  }

  const goDetail = (record) => {
    router.push({
      path: '/financial/account/PaymentRecyclingDetail',
      query: { id: record.id },
    })
  }

  // 确认收款
  const confirmReceipt = (record) => {
    Modal.confirm({
      title: '确认收款',
      icon: createVNode(ExclamationCircleOutlined),
      content: `请确定卖家是否已对订单“${record.orderId}”进行还款，还款金额为“${record.amount}元”，确认无误请点击确定完成收款！`,
      async onOk() {
        try {
          let params = { id: record.id }
          const { code, message } = await AdminHttp.FINANCE.financeAdvancesStandingConfirmBy$id(
            params,
          )
          if (code == +20001) {
            createMessage.success('操作成功')
            // 重新加载列表页面
            await loadTableData()
          } else {
            createMessage.error(message)
          }
        } catch (e) {
          console.log(e)
        }
      },
      onCancel() {},
    })
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
  const loadTableData = async () => {
    try {
      tableLoading.value = true
      let params = {
        ...filterData.value,
        ...paginations,
        type: 33,
      }
      const { code, data } = await AdminHttp.FINANCE.financeAdvancesStandingPage(params)
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
