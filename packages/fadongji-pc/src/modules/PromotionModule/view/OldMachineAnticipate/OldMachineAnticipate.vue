<template>
  <div>
    <div>
      <EraTabs :tabsList="tabsList" :tabsactive="activeKey" @tabsChange="tabsChange" />
    </div>
    <div class="mx-24px mt-72px mb-24px">
      <div class="my-24px bg-white p-24px pb-4px">
        <SearchForm @rest="handlerRest" @submit="handlerSubmit" :activeKey="activeKey" />
      </div>

      <div class="p-24px bg-white">
        <div>
          <!-- <template v-if="activeKey === 'six' || activeKey === 'four'">
		  <EraTableTitle :total="paginations.total">
			<template #tableEdit>
			  <AButton
				type="primary"
				:disabled="selectedRow.length === 0"
				class="margin-l-r-10"
				@click="batchOperation(2)"
			  >
				批量启动预售
			  </AButton>
			</template>
		  </EraTableTitle>
		</template>
		<template v-else-if="activeKey === 'five'">
		  <EraTableTitle :total="paginations.total">
			<template #tableEdit>
			  <AButton
				type="primary"
				:disabled="selectedRow.length === 0"
				class="margin-l-r-10"
				@click="batchOperation(1)"
			  >
				批量暂停预售
			  </AButton>
			</template>
		  </EraTableTitle>
		</template> -->

          <EraTableTitle :total="paginations.total">
            <template #tableEdit></template>
          </EraTableTitle>
        </div>
        <div>
          <ATable
            :loading="tableLoading"
            :row-selection="rowSelection"
            :rowKey="(record) => record.id"
            :columns="getColumns(activeKey)"
            :data-source="tableData"
            :pagination="false"
            size="small"
            :scroll="{ x: 1200 }"
            bordered
          >
            <template #bodyCell="{ column, text, record }">
              <template v-if="column.dataIndex === 'levelPrice'">
                <div v-if="record.levelInfo">
                  <div v-for="(item, index) in record.levelInfo" :key="index">
                    {{ item.level }}类：{{ item.price }}元
                  </div>
                </div>
              </template>
              <template v-if="column.dataIndex === 'levelCount'">
                <div v-if="record.levelInfo">
                  <div v-for="(item, index) in record.levelInfo" :key="index">
                    {{ item.level }}类：{{ item.count }}
                  </div>
                </div>
              </template>
              <template v-if="column.dataIndex === 'levelTime'">
                <div>
                  <div>{{ record.startTime }} 至</div>
                  <div>{{ record.endTime }}</div>
                </div>
              </template>
              <template v-if="column.dataIndex === 'shopName'">
                <div>
                  <div>{{ record.shopName }}</div>
                  <div>{{ record.userName }}</div>
                </div>
              </template>
              <!-- 1：待审核   2：未开始 3：进行中 4：已暂停 5：已结束 6：审核不通过 -->
              <template v-if="column.dataIndex === 'status'">
                <span v-if="record.status === 1">待审核</span>
                <span v-if="record.status === 2">未开始</span>
                <span v-if="record.status === 3">进行中</span>
                <span v-if="record.status === 4">已暂停</span>
                <span v-if="record.status === 5">已结束</span>
                <span v-if="record.status === 6">审核不通过</span>
              </template>
              <template v-if="column.dataIndex === 'operation'">
                <a-space v-auth="'/v1/goods/recycle/pre/sale/update'">
                  <APopconfirm
                    v-if="record.status === 4"
                    title="确定要启动预售吗？"
                    ok-text="确定"
                    cancel-text="取消"
                    @confirm="startUpSell(record)"
                  >
                    <AButton type="link">启动预售</AButton>
                  </APopconfirm>
                  <APopconfirm
                    v-if="record.status === 3 || record.status === 2"
                    title="确定要暂停预售吗？"
                    ok-text="确定"
                    cancel-text="取消"
                    @confirm="startDownSell(record)"
                  >
                    <AButton type="link">暂停预售</AButton>
                  </APopconfirm>

                  <AButton
                    v-auth="'/v1/goods/recycle/pre/sale/update'"
                    v-if="record.status === 1"
                    type="link"
                    size="small"
                    @click="goDetails(record)"
                  >
                    去审核
                  </AButton>
                  <AButton
                    v-auth="'/v1/goods/recycle/pre/sale/detail'"
                    type="link"
                    size="small"
                    @click="goDetails(record)"
                    >查看详情
                  </AButton>
                </a-space>
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

<script lang="ts" setup>
  import { ref, reactive } from 'vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import SearchForm from './component/SearchForm.vue'
  import { getColumns } from './data/configuration'
  import { useRouter } from 'vue-router'
  import { message } from 'ant-design-vue'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'
  // --------全局参数----Modal-----------
  const router = useRouter()
  // const operateStatus = ref<number>(1)
  // const operateTitle = ref<string>('启动预售')

  // ------操作按钮----------
  // 查看详情
  const goDetails = (record) => {
    router.push({
      path: '/promotion/oldMachine/machineDetails',
      query: { id: record.id },
    })
  }
  // 启动预售
  const startUpSell = async (record) => {
    try {
      const { code } = await AdminHttp.GOODS.goodsRecyclePreSaleUpdate({
        id: record.id,
        status: 3,
      })
      if (+code === 20001) {
        message.success('启动成功')
        await loadTableData()
      }
    } catch (e: any) {
      message.warning(e?.data?.message || e?.message || e?.error || '服务端错误')
    }
  }
  // 暂停预售
  const startDownSell = async (record) => {
    try {
      const { code } = await AdminHttp.GOODS.goodsRecyclePreSaleUpdate({
        id: record.id,
        status: 4,
      })
      if (+code === 20001) {
        message.success('暂停成功')
        await loadTableData()
      }
    } catch (e: any) {
      message.warning(e?.data?.message || e?.message || e?.error || '服务端错误')
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
    { key: 'one', name: '全部商品', totalCount: 0 },
    { key: 'two', name: '待审核', totalCount: 0 },
    { key: 'three', name: '审核未通过', totalCount: 0 },
    { key: 'four', name: '未开始', totalCount: 0 },
    { key: 'five', name: '进行中', totalCount: 0 },
    { key: 'six', name: '已暂停', totalCount: 0 },
    { key: 'seven', name: '已结束', totalCount: 0 },
  ])
  const tabsChange = (Key) => {
    activeKey.value = Key
    paginations.pageNo = 1
    paginations.pageSize = 10
    if (activeKey.value === 'four' || activeKey.value === 'five' || activeKey.value === 'six') {
      rowSelection.value = activeSelection.value
    } else {
      rowSelection.value = null
    }

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
  //  --- 全选 筛选操作 ----
  const selectedRow = ref<string[]>([])
  let rowSelection = ref<any>(null)
  let activeSelection = ref<any>({
    onChange: (selectedRowKeys: string[], selectedRows: object[]) => {
      console.log(selectedRows)
      selectedRow.value = selectedRowKeys
    },
  })

  //批量暂时不做
  // const batchOperation = async (type) => {
  //   operateStatus.value = type
  //   operateTitle.value = type === 1 ? '启动预售' : '暂停预售'
  //   Modal.confirm({
  //     title: '温馨提示',
  //     content: `确定要${operateTitle.value}所选择的商品吗？`,
  //     okText: '确认',
  //     cancelText: '取消',
  //     onOk() {
  //       return new Promise(async (resolve) => {
  //         const { code } = await AdminHttp.GOODS.goodsRecycleModelUpdateStatus({
  //           ids: selectedRow.value,
  //           status: type === 1 ? 3 : 4,
  //         })
  //         selectedRow.value = []
  //         if (+code === 20001) {
  //           message.success('操作成功')
  //           await loadTableData()
  //           resolve('操作成功')
  //         }
  //       })
  //     },
  //   })
  // }

  //----- 加载列表数据 ---------
  const tableLoading = ref(false)
  const tableData = ref([])
  const statusAttrs = { one: '', two: 1, three: 6, four: 2, five: 3, six: 4, seven: 5 }
  const loadTableData = async () => {
    await handlerStatus()
    try {
      tableLoading.value = true
      let params = {
        ...filterData.value,
        ...paginations,
        status: statusAttrs[activeKey.value],
      }
      const { code, data } = await AdminHttp.GOODS.goodsRecyclePreSaleQueryList(params)
      if (code === '20001') {
        tableData.value = data.records ? data.records : []
        paginations.total = data.total

        // 这个判断当删除数据最后一条的时候，但是分页不在第一页，加载上一页的数据
        if (paginations.pageNo > 1 && tableData.value.length === 0) {
          paginations.pageNo = paginations.pageNo - 1
          await loadTableData()
        }
      }
      tableLoading.value = false
    } catch (e) {
      console.log(e)
      tableLoading.value = false
    }
  }
  const handlerStatus = async () => {
    const { data } = await AdminHttp.GOODS.goodsRecyclePreSaleListCount({})
    tabsList.value = [
      { key: 'one', name: '全部商品', totalCount: data.total },
      { key: 'two', name: '待审核', totalCount: data.waitingAudit },
      { key: 'three', name: '审核未通过', totalCount: data.auditFail },
      { key: 'four', name: '未开始', totalCount: data.notStart },
      { key: 'five', name: '进行中', totalCount: data.processing },
      { key: 'six', name: '已暂停', totalCount: data.paused },
      { key: 'seven', name: '已结束', totalCount: data.over },
    ]
  }
  onMountedOrActivated(() => {
    // 初始化数据
    loadTableData()
  })
</script>

<style scoped lang="less"></style>
