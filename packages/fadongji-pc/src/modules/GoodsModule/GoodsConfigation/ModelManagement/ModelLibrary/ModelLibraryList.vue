<template>
 <div>
  <div class="mx-24px mt-72px mb-24px">
    <div class="my-24px bg-white p-24px pb-4px">
      <SearchForm @rest="handlerRest" @submit="handlerSubmit" />
    </div>

    <div class="p-24px bg-white">
      <EraTableTitle :total="paginations.total">
        <template #tableEdit>
          <a-button
            type="primary"
            v-auth="'/v1/goods/model/delete'"
            :disabled="selectedRow.length === 0"
            class="margin-l-r-10"
            @click="batchOperation"
          >
            批量删除
          </a-button>
          <a-button v-auth="'/v1/goods/model/apply/approval'" type="primary" class="margin-l-r-10" @click="add">添加新型号</a-button>
        </template>
      </EraTableTitle>

      <div>
        <ATable
          :row-selection="rowSelection"
          :rowKey="(record) => record.id"
          :loading="tableLoading"
          :columns="tableColumns"
          :data-source="tableData"
          :pagination="false"
          size="small"
          :scroll="{ x: 1200 }"
          bordered
          @change="handleTableChange"
        >
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex == 'isSaleEnable'">
              <div>
                <ASwitch
                  :checked="record.isSaleEnable"
                  checked-children="开"
                  un-checked-children="关"
                  :unCheckedValue="false"
                  :checkedValue="true"
                  @change="
                    switchStatusEvent(
                      { isSaleEnable: record.isSaleEnable ? 0 : 1, id: record.id },
                      record,
                      'isSaleEnable',
                    )
                  "
                />
              </div>
            </template>
            <template v-if="column.dataIndex == 'isRecycleEnable'">
              <div>
                <ASwitch
                  :checked="record.isRecycleEnable"
                  checked-children="开"
                  un-checked-children="关"
                  :unCheckedValue="false"
                  :checkedValue="true"
                  @change="
                    switchStatusEvent(
                      { isRecycleEnable: record.isRecycleEnable ? 0 : 1, id: record.id },
                      record,
                      'isRecycleEnable',
                    )
                  "
                />
              </div>
            </template>
            <template v-if="column.dataIndex === 'operation'">
              <AButton v-auth="'/v1/goods/model/update'" type="link" size="small" @click="edit(record)">编辑</AButton>
              <template v-if="record.isDeleteEnable">
                <APopconfirm
                  title="确定要删除吗？"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="deleteModel(record)"
                >
                  <AButton v-auth="'/v1/goods/model/delete'"  type="link" size="small">删除</AButton>
                </APopconfirm>
              </template>
              <template v-else>
                <a-tooltip placement="topLeft" title="该型号在使用中，无法删除。">
                  <AButton v-auth="'/v1/goods/model/delete'" type="link" size="small" disabled>删除</AButton>
                </a-tooltip>
              </template>
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
  <a-modal
    title="批量删除"
    v-model:visible="eraModal.visible"
    :confirmLoading="confirmLoading"
    @ok="eraModalOk"
  >
    <div class="p-24px">共{{ selectedRow.length }}个型号被选中，确定要删除吗？</div>
  </a-modal>
  <AddModal @register="registerDetailModal" @updateTable="loadTableData()" />
 </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, onBeforeMount } from 'vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import SearchForm from './component/SearchForm.vue'
  import AddModal from './component/AddModal.vue'
  import { tableColumns } from './data/configuration'
  import { useRouter } from 'vue-router'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { useModal } from '/@/components/Modal'
  import { usePermission } from '/@/hooks/web/usePermission'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";

  // --------全局参数---------------
  const { createMessage } = useMessage()
  const { hasPermission } = usePermission() // 判断有没有权限

  //  --- 全选 筛选操作 ----
  const selectedRow = ref<string[]>([])
  const rowSelection = {
    onChange: (selectedRowKeys: string[], selectedRows: object[]) => {
      // selectedRowKeys 返回id集合，selectedRows返回选中的那一条的数据
      console.log(selectedRows)
      selectedRow.value = selectedRowKeys
    },
    getCheckboxProps: (record) => ({
      disabled: !record.isDeleteEnable, // Column configuration not to be checked
    }),
  }

  // ----批量操作删除----
  const confirmLoading = ref(false)
  const eraModal = reactive({
    visible: false,
  })
  const batchOperation = () => {
    // 这里做一些初始化数据的操作 有可能弹出框是一批数据的设置
    eraModal.visible = true
  }
  const eraModalOk = async () => {
    confirmLoading.value = true
    try {
      let params = { ids: selectedRow.value }
      const { code, message } = await AdminHttp.GOODS.goodsModelBatchDelete(params)
      if (code === '20001') {
        createMessage.success('删除成功')
        eraModal.visible = false
        // 重新加载列表页面
        await loadTableData()
      } else {
        createMessage.error(message)
      }
      confirmLoading.value = false
    } catch (e) {
      console.log(e)
      confirmLoading.value = false
    }
  }

  // ------操作按钮----------
  const modalData = ref({
    type: 'detail',
    id: '',
    title: '',
    info: {},
  })
  const [registerDetailModal, { openModal }] = useModal()
  // 新增
  const add = () => {
    modalData.value.type = 'add'
    modalData.value.title = '添加型号'
    modalData.value.info = {
      categoryId: null,
      model: '',
      isSaleEnable: true,
      isRecycleEnable: true,
    }
    openModal(true, modalData.value)
  }
  // 编辑
  const edit = (record) => {
    modalData.value.type = 'edit'
    modalData.value.title = '编辑型号'
    modalData.value.info = {
      id: record.id,
      categoryId: record.categoryId,
      model: record.model,
      isSaleEnable: record.isSaleEnable,
      isRecycleEnable: record.isRecycleEnable,
    }
    openModal(true, modalData.value)
  }

  // 删除
  const deleteModel = async (record) => {
    try {
      let params = { id: record.id }
      const { code, message } = await AdminHttp.GOODS.goodsModelDeleteBy$id(params)
      if (code === '20001') {
        createMessage.success('删除成功')
        // 重新加载列表页面
        await loadTableData()
      } else {
        createMessage.error(message)
      }
    } catch (e) {
      console.log(e)
    }
  }

  // 切换启用禁用状态
  const switchStatusEvent = async (changeSwitch = {}, record, key) => {
    if(!hasPermission('/v1/goods/model/enable/update')){
      createMessage.error('暂无该操作权限！')
      return
    }
    try {
      const { code } = await AdminHttp.GOODS.goodsModelEnableUpdate(changeSwitch)
      if (code === '20001') {
        record[key] = !record[key]
      }
    } catch (e) {
      console.log(e)
    }
  }

  // ------form列表---------
  const filterData = ref({})
  // 重置
  const handlerRest = (values) => {
    paginations.current = 1
    filterData.value = {
      ...values,
    }
    loadTableData()
  }
  // 搜索
  const handlerSubmit = (values) => {
    paginations.current = 1
    filterData.value = {
      ...values,
    }
    loadTableData()
  }

  const handleTableChange = (pagination, filters, sorter) => {
    filterData.value.orderProperty = sorter.field
    filterData.value.orderType = sorter.order == 'ascend' ? 'ASC' : 'DESC'
    loadTableData()
  }

  //------ 分页查询 -----------------
  const paginations = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  }) // 分页配置
  const paginationChange = ({ current, pageSize }) => {
    paginations.current = current
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
        pageNo: paginations.current,
        pageSize: paginations.pageSize,
      }
      const { code, data } = await AdminHttp.GOODS.goodsModelQueryPage(params)
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
