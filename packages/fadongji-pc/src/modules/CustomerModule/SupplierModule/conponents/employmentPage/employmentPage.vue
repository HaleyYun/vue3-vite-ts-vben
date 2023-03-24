<template>
  <div class="filter-bg">
    <BasicForm
      ref="BasicForm"
      @register="registerForm"
      @submit="handleFilterTable"
      @reset="handlerFilterRest"
    />
  </div>
  <div>
    <EraSlotTable>
      <template #content>
        <ATable
          rowKey="id"
          class="case-table"
          :dataSource="employeePageData"
          :columns="employeePageColumn"
          :pagination="false"
          size="small"
          bordered
          :scroll="{ x: `${employeePageColumn.length}0%`, y: 500 }"
        >
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex === 'status'">
              <a-switch
                checked-children="启用"
                un-checked-children="禁用"
                :checked="!record.status"
                @change="handleSwitchStatusApiResultEvent(record, !record.status)"
              />
            </template>
            <template v-if="column.dataIndex === 'action'">
              <a @click="deleteEmployeeApiEvent(record)">删除</a>
            </template>
          </template>
        </ATable>
      </template>
      <template #pagination>
        <VoPagination
          :total="pagination.total"
          :current="pagination.current"
          :page-size="pagination.pageSize"
          @pagination="paginationChange"
        />
      </template>
    </EraSlotTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, reactive, ref, nextTick } from 'vue'
  import BasicForm from '/@/components/Form/src/BasicForm.vue'
  import { useForm } from '/@/components/Form'
  import adminHttp from '/@/utils/http/adminHttp'
  import { useRoute } from 'vue-router'
  import {
    employeePageColumn,
    editEmployeeForm,
  } from '/@/modules/CustomerModule/SupplierModule/conponents/employmentPage/employeePageData'
  import EraSlotTable from '/@/components/EraSlotTable/EraSlotTable.vue'
  import EraProForm from '/@/components/EraProForm/EraProForm.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const { createMessage } = useMessage()
  const loadingHandleRow = 'handlerRow'
  export default defineComponent({
    name: 'EmploymentPage',
    components: {
      EraSlotTable,
      VoPagination,
      BasicForm,
      EraProForm,
    },
    setup() {
      const route = useRoute()
      const employeeModel = {
        id: '',
        companyId: route.query.id,
      }
      let searchParams = {}
      const pagination = reactive({
        current: 1,
        pageSize: 10,
        total: 0,
      })
      const [registerForm, { updateSchema }] = useForm({
        labelWidth: 120,
        baseColProps: { span: 8 },
        actionColOptions: { span: 8, offset: 8 },
        fieldMapToTime: [['searchTime', ['startTime', 'endTime'], 'YYYY-MM-DD HH:mm:ss']],
        schemas: editEmployeeForm,
      })

      const employeePageData = ref([])
      const handleFilterTable = (data) => {
        searchParams = data
        initEmployeeListData(data)
      }
      const handlerFilterRest = () => {
        searchParams = {}
        pagination.current = 1
        initEmployeeListData(searchParams)
      }
      /**
       *@desc 新增员工
       */
      const handleAddEmployeeApiEvent = async () => {
        try {
          const { code } = await adminHttp.CUSTOMER.useInfoAddAccount()
          if (code == '20001') {
            createMessage.success({ content: '新增成功', key: loadingHandleRow })
          } else {
            await initEmployeeListData()
          }
        } catch (err: any) {
          createMessage.error({ content: '新增失败', key: loadingHandleRow })
          await initEmployeeListData()
        }
      }
      /**
       *@desc 删除员工账号
       */
      const handleDeleteEmployeeApiEvent = async (item) => {
        try {
          const deleteEmployeeMap = { id: item.id }
          const { code } = await adminHttp.CUSTOMER.useInfoAddAccount(deleteEmployeeMap)
          if (code == '20001') {
            createMessage.success({ content: '删除成功', key: loadingHandleRow })
          } else {
            await initEmployeeListData()
          }
        } catch (err: any) {
          createMessage.error({ content: '删除失败', key: loadingHandleRow })
          await initEmployeeListData()
        }
      }
      /**
       *@desc 切换启用状态
       */
      const handleSwitchStatusApiResultEvent = async (item, status) => {
        try {
          const switchMap = { id: item.id, status: status }
          const { code } = await adminHttp.CUSTOMER.companyInfoChangeUserStatus(switchMap)
          if (code == '20001') {
            createMessage.success({ content: '切换启用状态成功', key: loadingHandleRow })
            await initEmployeeListData()
          } else {
          }
        } catch (err: any) {
          createMessage.error({ content: '切换启用状态失败', key: loadingHandleRow })
          await initEmployeeListData()
        }
      }
      /**
       *@desc 列表数据
       */
      const initEmployeeListData = async (params = {}) => {
        const map = {
          pageNo: pagination.current,
          pageSize: pagination.pageSize,
          companyId: employeeModel.companyId,
          ...params,
        }
        const { data, code } = await adminHttp.CUSTOMER.companyInfoStaffPage(map)
        if (code == '20001') {
          employeePageData.value = data.records
          pagination.total = data.total
        }
      }
      /**
       *@desc 删除
       */
      const deleteEmployeeApiEvent = async (item) => {
        try {
          const { code } = await adminHttp.CUSTOMER.useInfoAccountItem({ id: item.accountId })
          if (code == '20001') {
            createMessage.success({ content: '删除成功', key: loadingHandleRow })
            initEmployeeListData()
          }
        } catch (err: any) {
          createMessage.error({ content: '删除失败', key: loadingHandleRow })
        }
      }
      /**
       *@desc 分页
       */
      const paginationChange = ({ current, pageSize }) => {
        pagination.current = current
        pagination.pageSize = pageSize
        initEmployeeListData(searchParams)
      }
      const BasicForm = ref()
      onMountedOrActivated(() => {
        console.log(BasicForm.value, updateSchema)
        nextTick(() => {
          updateSchema({
            field: 'roleId',
            componentProps: { params: { companyId: route.query.id } },
          })
        })

        initEmployeeListData()
      })
      return {
        employeePageColumn,
        handleSwitchStatusApiResultEvent,
        deleteEmployeeApiEvent,
        handleAddEmployeeApiEvent,
        handleDeleteEmployeeApiEvent,
        handleFilterTable,
        handlerFilterRest,
        paginationChange,
        registerForm,
        pagination,
        employeePageData,
        route,
      }
    },
  })
</script>
