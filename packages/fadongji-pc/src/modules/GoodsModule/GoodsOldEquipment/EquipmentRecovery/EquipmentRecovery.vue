<template>
<div>
  <div>
    <EraTabs :tabsList="tabsList" :tabs-active="activeKey" @tabsChange="tabsChange" />
  </div>
  <div class="mx-24px mt-72px mb-24px">
    <div class="my-24px bg-white p-24px pb-4px">
      <SearchForm :active-key="activeKey" @rest="handlerRest" @submit="handlerSubmit" />
    </div>

    <div class="p-24px bg-white">
      <div>
        <EraTableTitle :total="paginations.total">
          <template #tableEdit>
            <div>
              <span>修理厂价格小于等于0时,修理厂无法发起回收</span>
              <AButton
                class="ml-5"
                v-auth="'/v1/goods/model/recycle/status'"
                v-if="activeKey === 'two'"
                type="primary"
                :disabled="selectedRow.length === 0"
                @click="batchOperation(2)"
              >
                批量暂停
              </AButton>
              <AButton
                class="ml-5"
                v-auth="'/v1/goods/model/recycle/status'"
                v-if="activeKey === 'three'"
                type="primary"
                :disabled="selectedRow.length === 0"
                @click="batchOperation(1)"
              >
                批量启动回收
              </AButton>
            </div>
          </template>
        </EraTableTitle>
      </div>

      <div>
        <ATable
          :loading="tableLoading"
          :row-selection="rowSelection"
          :rowKey="(record) => record.id"
          :columns="shareColumn"
          :data-source="tableData"
          :pagination="false"
          size="small"
          :scroll="{ x: 1200 }"
          bordered
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'price'">
              <div>{{ record.price }}元</div>
            </template>
            <template v-if="column.dataIndex === 'garagePrice'">
              <div>{{ record.garagePrice }}元</div>
            </template>
            <template v-if="column.dataIndex === 'shopName'">
              <div>
                <p>{{ record.shopName }}</p>
                <p>{{ record.userName }}</p>
              </div>
            </template>
            <template v-if="column.dataIndex === 'status'">
              <div>
                <a-tag v-if="+record.status === 1" color="green">回收中</a-tag>
                <a-tag v-else>待回收</a-tag>
              </div>
            </template>
            <template v-if="column.dataIndex === 'operation'">
              <!-- 判断 -->
              <template v-if="record.status === 2">
                <APopconfirm
                  title="确定要启动回收吗？"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="startHandler(record)"
                >
                  <AButton v-auth="'/v1/goods/model/recycle/status'" type="link">启动回收</AButton>
                </APopconfirm>
              </template>

              <template v-else>
                <APopconfirm
                  title="确定要暂停回收吗？"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="pauseHandler(record)"
                >
                  <AButton v-auth="'/v1/goods/model/recycle/status'" type="link">暂停回收</AButton>
                </APopconfirm>
              </template>

              <AButton v-auth="'/v1/goods/model/recycle/detail'" type="link" size="small" @click="goDetails(record)">查看详情</AButton>
              <!-- </template> -->
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
  import { ref, reactive, onBeforeMount } from 'vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import SearchForm from './component/SearchForm.vue'
  import { tableColumns } from './data/configuration'
  import { useRouter } from 'vue-router'
  import { message, Modal } from 'ant-design-vue'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";
  // --------全局参数---------------
  const router = useRouter()

  // ------操作按钮----------
  // 查看详情
  const goDetails = (record) => {
    router.push({
      path: '/goodsManage/oldEquipment/equipmentDetails',
      query: { id: record.id },
    })
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
    { key: 'two', name: '回收中', totalCount: 0 },
    { key: 'three', name: '待回收', totalCount: 0 },
  ])
  //  --- 全选 筛选操作 ----
  const selectedRow = ref<string[]>([])
  let rowSelection = ref<any>(null)
  let activeSelection = ref<any>({
    onChange: (selectedRowKeys: string[], selectedRows: object[]) => {
      console.log(selectedRows)
      selectedRow.value = selectedRowKeys
    },
  })
  let shareColumn = ref(tableColumns)
  const tabsChange = (Key) => {
    activeKey.value = Key
    paginations.pageNo = 1
    paginations.pageSize = 10
    if (activeKey.value === 'one') {
      rowSelection.value = null
    } else {
      rowSelection.value = activeSelection.value
    }
    if (activeKey.value === 'two') {
      shareColumn.value = tableColumns.map((item) => {
        return {
          ...item,
          title: item.dataIndex === 'createTime' ? '启动回收时间' : item.title,
        }
      })
    } else if (activeKey.value === 'three') {
      shareColumn.value = tableColumns.map((item) => {
        return {
          ...item,
          title: item.dataIndex === 'createTime' ? '暂停回收时间' : item.title,
        }
      })
    } else {
      shareColumn.value = tableColumns.map((item) => {
        return {
          ...item,
          title: item.title,
        }
      })
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

  // ----批量操作删除----

  const batchOperation = (type) => {
    console.log(selectedRow.value)
    // 这里做一些初始化数据的操作 有可能弹出框是一批数据的设置
    const text =
      type === 1 ? '此操作将批量启动回收，是否继续？' : '此操作将批量暂停回收，是否继续？'
    Modal.confirm({
      title: '温馨提示',
      content: text,
      okText: '确认',
      cancelText: '取消',
      onOk() {
        return new Promise(async (resolve) => {
          const { code } = await AdminHttp.GOODS.goodsModelRecycleStatus({
            id: selectedRow.value,
            status: type,
          })
          if (+code === 20001) {
            message.success('操作成功')
            await loadTableData()
            resolve('操作成功')
          }
        })
      },
    })
  }

  //----- 加载列表数据 ---------
  const tableLoading = ref(false)
  const tableData = ref([])
  const loadTableData = async () => {
    await initStatisticData()
    try {
      tableLoading.value = true
      let params = {
        ...filterData.value,
        pageNo: paginations.pageNo,
        pageSize: paginations.pageSize,
        status:
          activeKey.value === 'one'
            ? ''
            : activeKey.value === 'two'
            ? 1
            : activeKey.value === 'three'
            ? 2
            : '',
      }
      const { code, data } = await AdminHttp.GOODS.goodsModelRecycleQueryListPage(params)
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

  // 初始化数据统计信息数据
  const initStatisticData = async () => {
    const { data } = await AdminHttp.GOODS.goodsModelRecycleCount()
    tabsList.value = [
      { key: 'one', name: '全部商品', totalCount: data.totalCount },
      { key: 'two', name: '回收中', totalCount: data.recoveringCount },
      { key: 'three', name: '待回收', totalCount: data.unRecoverCount },
    ]
  }

  // 启动回收
  const startHandler = async (record) => {
    try {
      const { code } = await AdminHttp.GOODS.goodsModelRecycleStatus({
        id: [record.id],
        status: 1,
      })
      if (+code === 20001) {
        message.success('启动回收成功')
        await loadTableData()
      }
    } catch (e: any) {
      message.error(e.message)
      console.warn(e, 'EquipmentRecovery.veu')
    }
  }

  // 暂停回收
  const pauseHandler = async (record) => {
    try {
      const { code } = await AdminHttp.GOODS.goodsModelRecycleStatus({
        id: [record.id],
        status: 2,
      })
      if (+code === 20001) {
        message.success('暂停回收成功')
        await loadTableData()
      }
    } catch (e: any) {
      message.error(e.message)
      console.warn(e, 'EquipmentRecovery.veu')
    }
  }

  onMountedOrActivated(() => {
    // 初始化数据
    loadTableData()
  })
</script>

<style scoped lang="less"></style>
