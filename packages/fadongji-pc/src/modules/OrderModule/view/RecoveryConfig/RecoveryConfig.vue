<template>
  <div>
    <div class="mx-24px mb-24px">
    <div class="my-24px bg-white p-24px pb-4px">
      <SearchForm @rest="handlerRest" @submit="handlerSubmit" />
    </div>

    <div class="p-24px bg-white">
      <EraTableTitle :total="paginations.total">
        <template #tableEdit>
          <a-button v-auth="'/v1/goods/model/commission/save'" type="primary" @click="addHandler"
            >新建</a-button
          >
        </template>
      </EraTableTitle>
      <div v-if="false" class="pb-20px">
        <div class="text-red-400 text-right">
          标红的服务区域，设定的平台佣金+集师傅佣金>回收公司设定的回收价格。修理厂将无法发起回收申请。
        </div>
      </div>
      <div class="custom-table">
        <div class="custom-table-header">
          <a-table :columns="tableColumns" emptyText="1">
            <template #headerCell="{ column }">
              <template v-if="column.dataIndex === 'area'">
                <span>
                  服务范围
                  <a-tooltip placement="bottom">
                    <template #title>
                      <span>
                        推广佣金指邀请集师傅注册的人，在集师傅接单后能获取的费用。分账时，此部分资金从集师傅佣金中扣除。
                      </span>
                    </template>
                    <QuestionCircleOutlined /> </a-tooltip
                ></span>
              </template>
            </template>
          </a-table>
        </div>
        <div v-for="(item, index) in tableData" :key="index" style="margin-top: -1px">
          <a-table
            :columns="tableColumns"
            :data-source="item.modelCommission"
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
              <template v-if="column.dataIndex === 'masterAmount'">
                <span>{{ record.masterAmount }}元</span>
              </template>
              <template v-if="column.dataIndex === 'platformAmount'">
                <span>{{ record.platformAmount }}元</span>
              </template>
              <template v-if="column.dataIndex === 'operation'">
                <!-- 已认证 -->
                <a-space>
                  <a v-auth="'/v1/goods/model/commission/update'" @click="edithHandler(record)"
                    >编辑</a
                  >
                  <a-divider type="vertical" />
                  <a v-auth="'/v1/goods/model/commission'" @click="delHandler(record)">删除</a>
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
  import { useRouter } from 'vue-router'
  import { _ } from '@vocen/shared'
  import { QuestionCircleOutlined } from '@ant-design/icons-vue'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";

  const visible = ref(false)
  const edit = ref(false)
  const row = ref<object | null>(null)

  // --------全局参数---------------
  const router = useRouter()

  // ------form列表---------
  const filterData = ref({})
  // 重置
  const handlerRest = (values) => {
    paginations.current = 1
    filterData.value = {
      ...values,
      ...paginations,
    }
    loadTableData()
  }
  // 搜索
  const handlerSubmit = (values) => {
    paginations.current = 1
    filterData.value = {
      ...values,
      ...paginations,
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
  // 管辖供应商
  const manageSuppliers = (record) => {
    router.push({
      path: '/customerModule/CommodityManager/manageSuppliers',
      query: { id: record.id },
    })
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
      content: '确认要删除该服务吗？ 删除后此策略所覆盖的区域，将无法发起安装服务。',
      async onOk() {
        // 调取解除角色的接口
        let params = { id: record.id }
        const { code } = await AdminHttp.GOODS.goodsModelCommissionDelBy$id(params)
        if (+code === 20001) {
          message.success('删除成功')
        }
        await loadTableData()
        modal.destroy()
      },

      onCancel() {
        modal.destroy()
      },
    })
  }

  //----- 加载列表数据 ---------
  const tableLoading = ref(false)
  const tableData = ref<any>([])
  const loadTableData = async () => {
    try {
      tableLoading.value = true
      const { code, data } = await AdminHttp.GOODS.goodsModelCommissionQueryPageList({
        ...filterData.value,
        pageNo: paginations.current,
        pageSize: paginations.pageSize,
        type: 33,
        orderType: 'ASC',
        orderProperty: 'update_time',
      })
      console.log(tableData)
      if (code == '20001') {
        //tableData.value = data.records?data.records:[];
        paginations.total = data.total
        // 这里是模拟数据，真实开发用接口返回数据
        tableData.value = data.records.map((item) => {
          return {
            ...item,
            modelCommission: item.modelCommission.map((m) => {
              return {
                ...m,
                modelId: item.modelId,
                supportArea: JSON.parse(m.supportArea).map((s) => s.toString()),
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

<style scoped lang="less"></style>
