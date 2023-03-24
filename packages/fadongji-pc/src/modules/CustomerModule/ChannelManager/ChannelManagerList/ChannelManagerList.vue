<template>
<div>
  <div class="tabs">
    <EraTabs :tabsList="tabsList" :tabsactive="activeKey" @tabsChange="tabsChange"></EraTabs>
  </div>
  <div class="mx-24px mt-72px mb-24px">
    <div class="my-24px bg-white p-24px pb-4px">
      <SearchForm @rest="handlerRest" @submit="handlerSubmit"></SearchForm>
    </div>
    <div class="p-24px bg-white">
      <EraTableTitle  :total="paginations.total">
        <template #tableEdit>
          <a-button type="primary" class="margin-l-r-10" @click="add" v-auth="'/v1/api/company/legal/channel/add'">新增渠道经理</a-button>
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
            <!--管辖服务商-->
            <template v-if="column.dataIndex === 'policeAgentNum'">
              <a @click="manageSuppliers(record, 'policeAgentNum')">{{ record.policeAgentNum }}</a>
            </template>
            <!--管辖修理厂-->
            <template v-if="column.dataIndex === 'policeGarageNum'">
              <a @click="manageSuppliers(record, 'policeGarageNum')">{{
                record.policeGarageNum
              }}</a>
            </template>
            <template v-if="column.dataIndex === 'operation'">
              <!-- 已认证 -->
              <AButton type="link" size="small" @click="liftRole(record)" v-auth="'/v1/company/info/unbind/role'">解除角色</AButton>
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

<script>
  import { Modal } from 'ant-design-vue'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
  import { createVNode } from 'vue'
  import { useRouter } from 'vue-router'
  import { tableColumns } from './data/configuration.ts'
  import SearchForm from './component/SearchForm.vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import { useMessage } from '/@/hooks/web/useMessage'
  const { createMessage } = useMessage()

  export default {
    name: 'ChannelManagerList',
    components: { SearchForm, EraTabs, VoPagination, EraTableTitle, ExclamationCircleOutlined },
    data() {
      return {
        activeKey: 'one',
        selectedRow: [],
        confirmLoading: false,
        tableLoading: false,
        tableColumns: tableColumns,
        tableData: [],
        filterData: {},
        router: useRouter(),
        paginations: {
          total: 0,
          pageNo: 1,
          pageSize: 10,
        },
        tabsList: [{ key: 'one', name: '全部' }],
      }
    },
    methods: {
      // 新增
      add() {
        this.router.push('/customerModule/ChannelManager/add')
      },
      // 管辖服务商 operationsManager 管辖修理厂 garage
      manageSuppliers(record, type) {
        if (type === 'policeAgentNum') {
          this.router.push({
            path: '/customerModule/ChannelManager/administerAgent',
            query: { id: record.companyId, type: 'agent' },
          })
        } else {
          this.router.push({
            path: '/customerModule/ChannelManager/administErgarage',
            query: { id: record.companyId, type: 'garage' },
          })
        }
      },
      // 解除角色
      liftRole(record) {
        let that = this
        const modal = Modal.confirm({
          title: '解除角色',
          icon: createVNode(ExclamationCircleOutlined),
          okText: '解除',
          content:
            '该操作会导致此账号失去招商经理角色，并解除已邀请供应商的绑定关系，确定要解除角色吗？',
          onOk() {
            // 调取解除角色的接口
            let params = { id: record.companyId }
            that.commpdityliftRole(params)
          },

          onCancel() {
            modal.destroy()
          },
        })
      },
      async commpdityliftRole(params) {
        try {
          const { code, message } = await AdminHttp.CUSTOMER.companyInfoUnbindRole(params)
          if (code === '20001') {
            createMessage.success('解除角色成功')
            // 重新加载列表页面
            this.loadTableData()
          } else {
            createMessage.error(message)
          }
        } catch (e) {
          console.log(e)
        }
      },

      // 重置
      handlerRest(values) {
        this.paginations.pageNo = 1
        this.filterData = {
          ...values,
        }
        this.loadTableData()
      },
      // 搜索
      handlerSubmit(values) {
        this.paginations.pageNo = 1
        console.log(values)
        this.filterData = {
          ...values,
        }
        this.loadTableData()
      },
      // 点击tabs发生变化更新数据
      tabsChange: (Key) => {
        this.activeKey = Key
        this.paginations.pageNo = 1
        this.paginations.pageSize = 10
        this.loadTableData()
      },
      // 分页查询
      paginationChange({ current, pageSize }) {
        this.paginations.pageNo = current
        this.paginations.pageSize = pageSize
        this.loadTableData()
      },

      async loadTableData() {
        try {
          this.tableLoading = true
          const platformCode = 'channelManager'
          //investmentManager  招商经理
          //channelManager  渠道经理'
          let params = {
            platformCode: platformCode,
            ...this.filterData,
            ...this.paginations,
          }
          const { code, data } = await AdminHttp.COMPANY.CompanyInfoManagerPage(params)

          if (code === '20001') {
            this.tableData = data.records ? data.records : []
            this.paginations.total = data.total
            // 这个判断当删除数据最后一条的时候，但是分页不在第一页，加载上一页的数据
            if (this.paginations.pageNo > 1 && this.tableData.length === 0) {
              this.paginations.pageNo = this.paginations.pageNo - 1
              this.loadTableData()
            }
          }
          this.tableLoading = false
        } catch (e) {
          console.log(e)
          this.tableLoading = false
        }
      },
    },
    mounted() {
      this.loadTableData()
    },
  }
</script>

<style scoped lang="scss"></style>
