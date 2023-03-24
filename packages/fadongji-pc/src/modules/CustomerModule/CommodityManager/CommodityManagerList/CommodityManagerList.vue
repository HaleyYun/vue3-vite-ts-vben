<template>
  <div>
    <div>
    <EraTabs :tabsList="tabsList" :tabsactive="activeKey" @tabsChange="tabsChange" />
  </div>
  <div class="mx-24px mt-72px mb-24px">
    <div class="my-24px bg-white p-24px pb-4px">
      <SearchForm @rest="handlerRest" @submit="handlerSubmit" />
    </div>

    <div class="p-24px bg-white">
      <EraTableTitle :total="paginations.total">
        <template #tableEdit>
          <a-button
            type="primary"
            class="margin-l-r-10"
            @click="add"
            v-auth="'/v1/api/company/legal/attract/add'"
          >
            新增招商经理
          </a-button>
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
            <template v-if="column.dataIndex === 'policeSupplierNum'">
              <a @click="manageSuppliers(record)">{{ record.policeSupplierNum }}</a>
            </template>
            <template v-if="column.dataIndex === 'operation'">
              <AButton
                type="link"
                size="small"
                @click="liftRole(record)"
                v-auth="'/v1/company/info/unbind/role'"
                >解除角色
              </AButton>
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
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, createVNode, onBeforeMount } from 'vue'
  import { Modal } from 'ant-design-vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import SearchForm from './component/SearchForm.vue'
  import { tableColumns } from './data/configuration'
  import { useRouter } from 'vue-router'
  import { useMessage } from '/@/hooks/web/useMessage'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";

  // --------全局参数---------------
  const { createMessage } = useMessage()
  const router = useRouter()

  // ------操作按钮----------
  // 管辖供应商
  const manageSuppliers = (record) => {
    router.push({
      path: '/customerModule/CommodityManager/manageSuppliers',
      query: { id: record.companyId },
    })
  }
  // 新增招商经理
  const add = () => {
    router.push('/customerModule/CommodityManager/CommodityAdd')
  }
  // 解除角色
  const liftRole = (record) => {
    const modal = Modal.confirm({
      title: '解除角色',
      icon: createVNode(ExclamationCircleOutlined),
      okText: '解除',
      content:
        '该操作会导致此账号失去招商经理角色，并解除已邀请供应商的绑定关系，确定要解除角色吗？',
      onOk() {
        // inviteeId 被绑定人企业ID inviterId 绑定人企业ID modifier 修改人ID

        let params = { id: record.companyId }
        commpdityliftRole(params)
        modal.destroy()
      },

      onCancel() {
        modal.destroy()
      },
    })
  }
  const commpdityliftRole = async (params) => {
    try {
      const { code, message } = await AdminHttp.CUSTOMER.companyInfoUnbindRole(params)
      if (code === '20001') {
        createMessage.success('解除角色成功')
        // 重新加载列表页面
        loadTableData()
      } else {
        createMessage.error(message)
      }
    } catch (e) {
      console.log(e)
    }
  }

  // ------form列表---------
  const filterData = ref({})
  // 重置
  const handlerRest = (values) => {
    paginations.pageNo = 1
    filterData.value = {
      ...values,
    }
    loadTableData()
  }
  // 搜索
  const handlerSubmit = (values) => {
    paginations.pageNo = 1

    filterData.value = {
      ...values,
    }
    loadTableData()
  }

  //------tabs页签配置-------
  const activeKey = ref('one')
  const tabsList = ref([
    { key: 'one', name: '全部' },
    // { key: 'two', name: '未认证', totalCount: 199 },
    // { key: 'three', name: '未审核', totalCount: 28 },
    // { key: 'four', name: '审核中', totalCount: 83 },
    // { key: 'five', name: '已认证', totalCount: 49 },
    // { key: 'six', name: '审核拒绝', totalCount: 19 },
    // { key: 'seven', name: '黑名单', totalCount: 19 },
  ])
  const tabsChange = (Key) => {
    activeKey.value = Key
    paginations.current = 1
    paginations.pageSize = 10

    loadTableData()
  }

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
  const platformCode = 'investmentManager'
  //investmentManager  招商经理
  //channelManager  渠道经理'
  const loadTableData = async () => {
    try {
      tableLoading.value = true
      let params = {
        platformCode: platformCode,
        ...filterData.value,
        ...paginations,
      }
      const { code, data } = await AdminHttp.COMPANY.CompanyInfoManagerPage(params)
      console.log(tableData)
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
