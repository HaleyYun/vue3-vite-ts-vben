<template>
  <div>
    <div class="mx-24px mb-24px">
    <div class="my-24px bg-white p-24px pb-4px">
      <SearchForm @rest="handlerRest" @submit="handlerSubmit" />
    </div>

    <div class="p-24px bg-white pb-0px">
      <EraTableTitle :total="paginations.total">
        <template #tableEdit>
          <a-space>
            <a-button v-auth="'/v1/goods/model/compensate/save'" type="primary" @click="addHandler"
              >新建售后规则</a-button
            >
            <a-button v-if="false" type="info">导出数据</a-button>
          </a-space>
        </template>
      </EraTableTitle>

      <div class="custom-table">
        <div class="custom-table-header">
          <a-table :columns="tableColumns" emptyText="1" />
        </div>
        <div v-for="(item, index) in tableData" :key="index" style="margin-top: -1px">
          <a-table
            :columns="tableColumns"
            :data-source="item.compensateVOS"
            :showHeader="false"
            :pagination="false"
            bordered
          >
            <template #title>
              <div>
                <div>发动机型号：{{ item.model || '无' }}</div>
              </div>
            </template>
            <template #bodyCell="{ column, record }">
              <template v-if="column.dataIndex === 'isSendBack'">
                <a-switch
                  un-checked-children="否"
                  checked-children="是"
                  :checked="record.isSendBack"
                  @change="changeHandler($event, record)"
                />
              </template>
              <template v-if="column.dataIndex === 'repairAmount'">
                <span>{{ record.repairAmount }}元</span>
              </template>
              <template v-if="column.dataIndex === 'replaceAmount'">
                <span>{{ record.replaceAmount }}元</span>
              </template>
              <template v-if="column.dataIndex === 'operation'">
                <!-- 已认证 -->
                <a-space>
                  <a v-auth="'/v1/goods/model/compensate/update'" @click="edithHandler(record)"
                    >编辑</a
                  >
                  <a-divider type="vertical" />
                  <a v-auth="'/v1/goods/model/compensate/delete'" @click="delHandler(record)"
                    >删除</a
                  >
                </a-space>
              </template>
            </template>
          </a-table>
        </div>
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
  <ModelForm v-model:show="visible" :row="row" @refresh="loadTableData" />
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, createVNode, onBeforeMount } from 'vue'
  import { message, Modal } from 'ant-design-vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import SearchForm from './component/SearchForm.vue'
  import ModelForm from './component/ModelForm.vue'
  import { tableColumns } from './data/configuration'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { _ } from '@vocen/shared'
  import { usePermission } from '/@/hooks/web/usePermission'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";

  const { hasPermission } = usePermission()

  const visible = ref(false)
  const edit = ref(false)
  const row = ref<object | null>(null)

  // --------全局参数---------------
  const { createMessage } = useMessage()

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
  const handlerSubmit = ({ values }) => {
    paginations.current = 1
    filterData.value = {
      ...values,
    }
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

  // ------操作按钮----------

  // 旧机寄回切换
  const changeHandler = async (val, { id, isSendBack }) => {
    if (!hasPermission('/v1/goods/model/compensate/sendBack/update')) {
      message.error('暂无该操作权限！')
      return
    }
    const { code } = await AdminHttp.GOODS.goodsModelCompensateSendBackUpdate({ id })
    if (+code === 20001) {
      isSendBack = !isSendBack
      loadTableData()
      message.success('操作成功')
    }
  }

  // 新增招商经理
  const addHandler = () => {
    edit.value = false
    row.value = null
    visible.value = !visible.value
  }

  // 编辑操作
  const edithHandler = (record) => {
    edit.value = true
    row.value = _.cloneDeep(record)
    visible.value = !visible.value
  }
  // 删除操作
  const delHandler = (record) => {
    const modal = Modal.confirm({
      title: '删除',
      icon: createVNode(ExclamationCircleOutlined),
      okText: '确定',
      content: '确认要删除该条补偿数据吗？ 删除后，此型号下该部件将不可申请售后。',
      onOk() {
        // 调取解除角色的接口
        let params = { id: record.id }
        delApiHandler(params)
        modal.destroy()
      },

      onCancel() {
        modal.destroy()
      },
    })
  }
  const delApiHandler = async (params) => {
    try {
      const { code, message } = await AdminHttp.GOODS.goodsModelCompensateDeleteBy$id(params)
      if (code == +20001) {
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

  //----- 加载列表数据 ---------
  const tableLoading = ref(false)
  const tableData = ref<any>([])
  const loadTableData = async () => {
    try {
      tableLoading.value = true
      const { code, data } = await AdminHttp.GOODS.goodsModelCompensateQueryPage({
        ...filterData.value,
        pageNo: paginations.current,
        pageSize: paginations.pageSize,
      })
      console.log(tableData)
      if (code == '20001') {
        //tableData.value = data.records?data.records:[];
        paginations.total = data.total
        // 这里是模拟数据，真实开发用接口返回数据
        tableData.value = data.records.map((item) => {
          return {
            ...item,
            compensateVOS: item.compensateVOS.map((c) => {
              return {
                ...c,
                model: item.model,
              }
            }),
          }
        })
        // 这个判断当删除数据最后一条的时候，但是分页不在第一页，加载上一页的数据
        if (paginations.current > 1 && tableData.value.length == 0) {
          paginations.current = paginations.current - 1
          await loadTableData()
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
<style lang="less">
  .custom-table {
    .custom-table-header {
      .ant-table-tbody {
        display: none;
      }
    }

    .ant-table-title {
      background-color: #f2f2f2;
      padding: 8px 10px;
    }

    .ant-table-tbody > tr > td {
      padding: 10px 10px !important;
    }
  }
</style>
<style scoped lang="less"></style>
