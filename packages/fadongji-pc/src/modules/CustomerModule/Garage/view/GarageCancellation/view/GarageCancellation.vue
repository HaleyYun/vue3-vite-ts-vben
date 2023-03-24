<template>
  <div class="m-24px">
    <div class="bg-white p-24px mb-24px pb-4px">
      <BasicForm @register="registerForm" @submit="handleFilterTable" />
    </div>
    <div class="bg-white p-24px">
      <EraTableTitle :total="pagination.total" />
      <div>
        <ATable
          :loading="tableLoading"
          :rowKey="(record) => record.id"
          :columns="GarageCanCellColumn"
          :data-source="tableData"
          :pagination="false"
          size="small"
          :scroll="{ x: `${GarageCanCellColumn.length}0%`, y: 500 }"
          bordered
        />
      </div>
      <div class="flex justify-end py-15px bg-white">
        <VoPagination
          :total="pagination.total"
          :current="pagination.current"
          :page-size="pagination.pageSize"
          @pagination="paginationChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  // 分页
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import AgentTable from '/@/modules/CustomerModule/AgentPages/component/AgentTable.vue'
  import AgentForm from '/@/modules/CustomerModule/AgentPages/component/AgentForm.vue'
  import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import FileUrlPrase from '/@/modules/ContentModule/component/FileUrlPrase/FileUrlPrase.vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import BasicForm from '/@/components/Form/src/BasicForm.vue'
  import { useForm } from '/@/components/Form'
  import { useMessage } from '/@/hooks/web/useMessage'

  const { createMessage } = useMessage()
  const loadingHandleRow = 'handlerRow'
  import { useRouter } from 'vue-router'
  import { CascaderProps } from 'ant-design-vue'
  import { PageEnum } from '/@/enums/pageEnum'
  import {
    filterGarageCanCellForm,
    GarageCanCellColumn,
  } from '/@/modules/CustomerModule/Garage/view/GarageCancellation/data/GarageCanCellationData'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  export default defineComponent({
    name: 'GarageCancellation',
    components: { EraTableTitle, FileUrlPrase, BasicForm, AgentTable, AgentForm, VoPagination },
    setup() {
      let GarageCancellModel = reactive({
        userName: '',
        storeName: '',
        platformCode: 'garage',
      })
      const go = useRouter()

      const agentTabData = ref([])
      const activeKey = ref('')
      // 查询条件
      let filterMap = ref()
      const tableLoading = ref(false)
      const pagination = reactive({
        total: 0,
        current: 1,
        pageSize: 10,
      })
      //
      const garageModel = reactive({
        checkStatus: 0,
      })
      let tableData = ref([])
      const [registerForm] = useForm({
        labelWidth: 120,
        baseColProps: { span: 8 },
        actionColOptions: { span: 8 },
        autoSubmitOnEnter: true,
        schemas: filterGarageCanCellForm,
      })
      const initGarageTabApiEvent = async () => {
        try {
          const { data } = await adminHttp.CUSTOMER.companyInfoGarageTab()
          console.log(data)
          agentTabData.value = data
          activeKey.value = agentTabData.value[0]['checkStatus']
        } catch (err) {
        } finally {
        }
      }
      watch(activeKey, async () => {
        pagination.total = 0
        pagination.current = 1
        pagination.pageSize = 10
        await initCompanyInfoGarageTabData()
      })
      // 分页
      const paginationChange = ({ current, pageSize }) => {
        pagination.current = current
        pagination.pageSize = pageSize
        initCompanyInfoGarageTabData()
      }
      const handleFilterTable = async (values) => {
        pagination.current = 1
        filterMap.value = values
        GarageCancellModel.userName = values.userName
        GarageCancellModel.storeName = values.storeName
        await initCompanyInfoGarageTabData()
      }
      const tapsPageFunc = async (statusStr) => {
        console.log(statusStr, '=====StatusStatus')
        garageModel.checkStatus = statusStr
        await initCompanyInfoGarageTabData()
      }
      /**
       *@desc 改变状态
       *@param id [String] 改变对象的id
       *@param status [String] 改变对象的status
       *@return config [Object] 配置对象
       */
      const initCompanyInfoGarageTabData = async () => {
        tableLoading.value = true
        try {
          const filterParams = {
            pageSize: pagination.pageSize,
            pageNo: pagination.current,
            ...GarageCancellModel,
          }
          const { data } = await adminHttp.CUSTOMER.companyInfoLogoffPage(filterParams)
          tableData.value = data.records
          pagination.total = data.total
        } catch (err) {
          createMessage.error('操作失败')
        } finally {
          tableLoading.value = false
        }
      }
      const unbindEvent = async () => {}
      const options = ref<CascaderProps['options']>([
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          isLeaf: false,
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          isLeaf: false,
        },
      ])

      const loadData: CascaderProps['loadData'] = (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1]
        targetOption.loading = true

        // load options lazily
        setTimeout(() => {
          targetOption.loading = false
          targetOption.children = [
            {
              label: `${targetOption.label} Dynamic 1`,
              value: 'dynamic1',
            },
            {
              label: `${targetOption.label} Dynamic 2`,
              value: 'dynamic2',
            },
          ]
          options.value = [...options.value]
        }, 1000)
      }
      /**
       *@desc 点击【员工管理】进入详情
       *@param id [String] 改变对象的id
       */
      const employManagementFunc = (item) => {
        go.push({
          path: PageEnum.EMPLOYEE_MANAGEMENT,
          params: {
            goodsParam: PageEnum.INVOICING_DETAILS,
            message: '当前开票状态',
            description: '当前开票状态：未开票',
            error: 'error',
            id: item.id,
          },
        })
      }
      const JoinTheBlacklistEvent = async (item, status) => {
        const map = { id: item.id, isBlacklist: status }
        const { code } = await adminHttp.CUSTOMER.companyInfoChangeBlack(map)

        if (code == '20001') {
          await initCompanyInfoGarageTabData()
          await initGarageTabApiEvent()
          createMessage.success({ content: `操作成功`, key: loadingHandleRow })
        } else {
          createMessage.error({ content: `操作成功`, key: loadingHandleRow })
        }
      }
      onMountedOrActivated(() => {
        initCompanyInfoGarageTabData()
      })
      return {
        filterGarageCanCellForm,
        GarageCanCellColumn,
        GarageCancellModel,
        handleFilterTable,
        tapsPageFunc,
        employManagementFunc,
        registerForm,
        paginationChange,
        JoinTheBlacklistEvent,
        options,
        loadData,
        unbindEvent,
        garageModel,
        filterMap,
        tableData,
        agentTabData,
        activeKey,
        tableLoading,
        pagination,
      }
    },
  })
</script>

<style lang="less" scoped>
  ::v-deep(.ant-tabs-nav) {
    margin: 0 !important;
  }
</style>
