<template>
  <div class="page-wrap">
    <div class="mb-24px filter-form">
      <AssociatedForm @rest="handlerFilterRest" @submit="handlerFilterSubmit" />
    </div>

    <div class="page-container">
      <EraSwitchTable :total="paginations.total">
        <template #tableEdit>
          <a-button type="primary" class="margin-l-r-10 mb-15px" @click="asssociated">关联修理厂</a-button>
        </template>
        <template #content>
          <ATable
            :loading="tableLoading"
            :columns="tabColumns"
            :data-source="tableData"
            :pagination="false"
            size="small"
            :scroll="{ x: 1200 }"
            bordered
          >
            <template #bodyCell="{ column, text, record }">
              <template v-if="column.dataIndex == 'action'">
                <APopconfirm
                  title="  确定取消关联?"
                  ok-text="是"
                  cancel-text="否"
                  @confirm="cancelAssociated(record)"
                >
                  <AButton type="link">取消绑定</AButton>
                </APopconfirm>
              </template>
              <template v-if="column.dataIndex == 'contractPhone'">
                <div>
                  <a-tag v-if="record.source && record.source === 5" color="orange">小程序</a-tag>
                  <div class="mt-5px">{{ record.contractPhone }}</div>
                </div>
              </template>
            </template>
          </ATable>
        </template>
        <template #pagination>
          <VoPagination
            :size="'default'"
            :total="paginations.total"
            :current="paginations.current"
            :page-size="paginations.pageSize"
            @pagination="paginationChange"
          />
        </template>
      </EraSwitchTable>
    </div>
    <AssociatedGrage @register="register" @update="loadTableData()" />
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, onBeforeMount } from 'vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import EraSwitchTable from '/@/components/EraSwitchTable/EraSwitchTable.vue'
  import AssociatedForm from '/@/modules/CustomerModule/AgentPages/view/AssociatedWithGarage/components/AssociatedForm.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { agentTableColumn } from '/@/modules/CustomerModule/AgentPages/view/AssociatedWithGarage/data/configuration'
  import AssociatedGrage from '/@/modules/CustomerModule/businessComponents/AssociatedGrarge/AssociatedGarage.vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { useRoute } from 'vue-router'
  import { useModal } from '/@/components/Modal'

  const { createMessage } = useMessage()

  const route = useRoute() // 获取route 传参过来的信息
  const tabColumns = ref(agentTableColumn)
  // 加载表格loading
  const tableLoading = ref(false)
  // 搜索参数
  const filterData = ref({})
  // 分页数据
  const paginations = reactive({
    total: 0,
    current: 1,
    pageSize: 10,
  })
  // 列表数据
  const tableData = ref([])
  // 关联修理厂
  const [register, { openModal }] = useModal()
  const asssociated = () => {
    // 绑定类型（1：从属关系（渠道经理，招商经理），2：分佣关系（服务商邀请修理厂），3：普通邀请关系（通用二维码邀请））
    openModal(true, { id: route.query['id'], bindingType: 2 })
  }
  //---------方法------
  // 重置
  const handlerFilterRest = ({ values }) => {
    filterData.value = values
    loadTableData()
  }
  // 搜索
  const handlerFilterSubmit = ({ values }) => {
    paginations.current = 1
    filterData.value = values
    if (filterData.value.areaCode) {
      filterData.value.areaCode = filterData.value.areaCode[filterData.value.areaCode.length - 1]
    }
    loadTableData()
  }
  // 取消关联
  const cancelAssociated = async (record) => {
    console.log(record)
    try {
      let params = { id: record.id, oldBinderId: route.query['id'] } // id:修理厂id oldBinderId 原绑定人所属企业ID
      const { code } = await adminHttp.companyInfoRemoveBinder(params)
      if (code == '20001') {
        createMessage.success('解除绑定成功')
        await loadTableData()
      }
    } catch (e) {
      console.log(e)
    }
  }

  // 分页
  const paginationChange = ({ current, pageSize }) => {
    paginations.current = current
    paginations.pageSize = pageSize
    loadTableData()
  }

  const loadTableData = async () => {
    try {
      tableLoading.value = true
      const params = {
        ...filterData.value,
        pageSize: paginations.pageSize,
        pageNo: paginations.current,
        companyId: route.query['id'] ? route.query['id'] : undefined,
      }
      const { data, code } = await adminHttp.COMPANY.companyInfoAgentAssociatedGaragePage(params)
      if (code == '20001') {
        tableData.value = data.records
        paginations.total = data.total
      }
      tableLoading.value = false
    } catch (e) {
      console.log(e)
      tableLoading.value = false
    }
  }
  onBeforeMount(() => {
    loadTableData()
  })
</script>

<style scoped lang="less">
  .page-wrap {
    margin: 0 auto;
    padding: 24px;
  }

  .filter-form {
    background: #fff;
    padding: 24px 24px 4px 24px;
  }

  .page-container {
    background-color: white;
    padding: 24px;
  }
</style>
