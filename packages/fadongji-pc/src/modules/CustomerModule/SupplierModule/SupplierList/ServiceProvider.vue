<template>
  <div class="mx-24px mt-72px mb-24px">
    <div class="p-24px bg-white">
      <div>
        <EraTableTitle :total="paginations.total">
          <template #tableEdit>
            <a-button type="primary" @click="addService">新增服务商</a-button>
          </template>
        </EraTableTitle>
      </div>

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
          <template #bodyCell="{ column, text, record, index }">
            <template v-if="column.dataIndex === 'index'">
              {{ index + 1 }}
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
    <a-modal v-model:visible="serviceVisible" :footer="null"  destroy-on-close width="1200px" title="添加服务商">
      <div class="p-15px">
        <div class="p-10px">
          <serviceComment @rest="handlerRest" @submit="handlerSubmit" />
        </div>
        <div>
          <EraTableTitle :total="total">
            <template #tableEdit>
              <a-button type="primary" @click="serviceOk" :disabled="!hasSelected"
                >绑定服务商
              </a-button>
            </template>
          </EraTableTitle>
        </div>
        <!-- :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" -->
        <ATable
           v-if="serviceData.length"
          :row-selection="{
            selectedRowKeys: state.selectedRowKeys,
            onChange: onSelectChange,
          }"
          :dataSource="serviceData"
          :columns="assignColumns"
          :rowKey="(record) => record.agentId"
          bordered
          :pagination="false"
        >
          <template #bodyCell="{ column, text, record, index }">
            <template v-if="column.dataIndex === 'index'">
              {{ index + 1 }}
            </template>
          </template>
        </ATable>
        <div class="flex justify-end py-15px bg-white">
          <VoPagination
            size="'default'"
            :total="total"
            :current="pageCurrent"
            :page-size="currentPageSize"
            @pagination="pagesChange"
          />
        </div>
      </div>
    </a-modal>
    <a-modal v-model:visible="bindingVisible" :confirm-loading="confirmLoading"  destroy-on-close title="绑定自营服务商确认" @ok="bindingOk">
      <div class="p-20px">
        <div class="text-base">请确认是否绑定自营服务商</div>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import AdminHttp from '/@/utils/http/adminHttp'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { clearObjectUnalbeAttr } from '/@/utils/helper/formHelper'
  import serviceComment from './component/serviceComment.vue'
  import { tableColumns } from './data/configuration'
  import dayjs from 'dayjs'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'
  import { commentConfig } from './data/serviceColumns'
  import { useMessage } from '/@/hooks/web/useMessage'
  // --------全局参数---------------
  const state = reactive<{ selectedRowKeys: [] }>({
    selectedRowKeys: [], // Check here to configure the default column
  })
  const confirmLoading = ref<boolean>(false);
  const serviceData = ref([])
  const bindingVisible = ref<boolean>(false)
  const assignColumns = ref(commentConfig.commentColumns)
  const serviceVisible = ref<boolean>(false)
  const route = useRoute()
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
        ...paginations,
        inviterId: route.query?.id,
      }
      const { code, data } = await AdminHttp.CUSTOMER.memberCompanyBindingInviteePage(params)
      console.log(tableData)
      if (code === '20001') {
        tableData.value = data.records
          ? data.records.map((item) => {
              return {
                ...item,
                qualityBeginTimeOne: dayjs(item.qualityBeginTime).format('YYYY-MM-DD'),
                qualityEndTime: dayjs(item.qualityEndTime).format('YYYY-MM-DD'),
              }
            })
          : []
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
  //添加服务商
  const addService = async () => {
    serviceVisible.value = true
    state.selectedRowKeys =[]
   await loadAssignData()
  }
  //绑定服务商
  const serviceOk = () => {
    bindingVisible.value = true
  }
  onMountedOrActivated(() => {
    // 初始化数据
    loadTableData()
  })
  // 分页
  const currentPageSize = ref(10)
  const pageCurrent = ref(1)
  const total = ref()
  const pagesChange = ({ current, pageSize }) => {
    pageCurrent.value = current
    currentPageSize.value = pageSize
    loadAssignData()
  }
  const loadAssignData = async () => {
    try {
      const filterParams = {
        ...commentData.value,

        pageSize: currentPageSize.value,
        pageNo: pageCurrent.value,
        inviterId: route.query?.id,
      }
      const { code, data } = await AdminHttp.CUSTOMER.companyInfoAgentPage(
        clearObjectUnalbeAttr(filterParams),
      )
      if (code === '20001') {
        total.value = data.total
        serviceData.value = data.records
      }
    } catch (e) {
      console.log(e)
    }
  }
  //查询
  const commentData = ref({})
  const handlerSubmit = (values) => {
    pageCurrent.value = 1
    commentData.value = {
      ...values,
    }
    loadAssignData()
  }
  // 重置
  const handlerRest = (values) => {
    pageCurrent.value = 1
    commentData.value = {
      ...values,
    }
    loadAssignData()
  };
  // 全选

  const hasSelected = computed(() => state.selectedRowKeys.length > 0)
  const onSelectChange = (selectedRowKeys:[]) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    state.selectedRowKeys = selectedRowKeys
  }

  // 确认绑定
  const { createMessage } = useMessage()
  const bindingOk = async () => {
    try {
      confirmLoading.value = true
      const params = {
        inviterId: route.query?.id,
        inviteeIdList: state.selectedRowKeys,
      }
      const { code } = await AdminHttp.CUSTOMER.memberCompanyBindingOperation(
        clearObjectUnalbeAttr(params),
      )
      if (code === '20001') {
        confirmLoading.value = false;
        serviceVisible.value = false
        bindingVisible.value = false
        loadTableData()
        createMessage.success('绑定成功')
      }
    } catch (e) {
      console.log(e)
    }
  }
</script>

<style scoped lang="less"></style>
