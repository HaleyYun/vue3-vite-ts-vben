<template>
  <div>
    <div>
    <EraTabs :tabsList="tabsList" :tabs-active="activeKey" @tabsChange="tabsChange" />
  </div>
  <div class="mx-24px mt-72px mb-24px">
    <div class="my-24px bg-white p-24px pb-4px">
      <SearchForm @rest="handlerRest" :status="activeKey" @submit="handlerSubmit" />
    </div>

    <div class="p-24px bg-white">
      <div>
        <template v-if="activeKey === 3">
          <EraTableTitle :total="paginations.total">
            <template #tableEdit>
              <AButton
                v-auth="'/v1/goods/recycle/model/update/status'"
                type="primary"
                :disabled="selectedRow.length === 0"
                class="margin-l-r-10"
                @click="batchOperation(2)"
              >
                批量下架
              </AButton>
            </template>
          </EraTableTitle>
        </template>
        <template v-else-if="activeKey === 4">
          <EraTableTitle :total="paginations.total">
            <template #tableEdit>
              <AButton
                v-auth="'/v1/goods/recycle/model/update/status'"
                type="primary"
                :disabled="selectedRow.length === 0"
                class="margin-l-r-10"
                @click="batchOperation(1)"
              >
                批量上架
              </AButton>
            </template>
          </EraTableTitle>
        </template>
        <template v-else>
          <EraTableTitle :total="paginations.total">
            <template #tableEdit></template>
          </EraTableTitle>
        </template>
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
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex === 'levelVOS'">
              <div v-if="record.levelVOS">
                <div v-for="(item, index) in record.levelVOS" v-show="item" :key="index">
                  {{ item.level }}类：{{ item.price }}元
                </div>
              </div>
            </template>
            <template v-if="column.dataIndex === 'shopName'">
              <p>{{ record.shopName }}</p>
              <p>{{ record.legalPhone }}</p>
            </template>
            <template v-if="column.dataIndex === 'availableNumber'">
              <AvailableStock
                :name="record.name"
                :num="record.availableNumber"
                :level-vos="record.levelVOS"
              />
            </template>
            <template v-if="column.dataIndex === 'operation'">
              <a-space>
                <!-- 判断 -->
                <APopconfirm
                  v-if="record.status === 4"
                  title="确定要上架吗？"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="startUpSell(record)"
                >
                  <a v-auth="'/v1/goods/recycle/model/update/status'" type="link">上架</a>
                </APopconfirm>

                <APopconfirm
                  v-if="record.status === 3"
                  title="确定要下架吗？"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="startDownSell(record)"
                >
                  <a v-auth="'/v1/goods/recycle/model/update/status'" type="link">下架</a>
                </APopconfirm>
                <a-divider v-if="record.status === 3 || record.status === 4" type="vertical" />
                <a
                  v-auth="'/v1/goods/recycle/model/approval'"
                  v-if="record.status === 1"
                  type="link"
                  size="small"
                  @click="goDetails(record)"
                >
                  去审核
                </a>
                <a-divider v-if="record.status === 1" type="vertical" />
                <AButton
                  v-auth="'/v1/goods/recycle/model/view'"
                  type="link"
                  size="small"
                  @click="goDetails(record)"
                >
                  查看详情
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
  import { ref, reactive, onBeforeMount } from 'vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import SearchForm from './component/SearchForm.vue'
  import { tableSaveColumns } from './data/configuration'
  import { useRouter } from 'vue-router'
  import { TabListData } from './type'
  import { message, Modal } from 'ant-design-vue'
  import AvailableStock from './component/AvailableStock.vue'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";
  // --------全局参数---------------
  const router = useRouter()
  const status = ref<string | number | undefined>(0)
  const operateStatus = ref<number>(1)
  const operateTitle = ref<string>('批量上架')

  // ------操作按钮----------
  // 查看详情
  const goDetails = (record) => {
    router.push({
      path: '/goodsManage/oldEquipment/resaleDetails',
      query: { id: record.id },
    })
  }
  // 上架操作
  const startUpSell = async (record) => {
    try {
      const { code } = await AdminHttp.GOODS.goodsRecycleModelUpdateStatus({
        ids: [record.id],
        status: 3,
      })
      if (+code === 20001) {
        message.success('上架成功')
        await loadTableData()
      }
    } catch (e: any) {
      message.warning(e?.data?.message || e?.message || e?.error || '服务端错误')
    }
  } // 启动预售
  const startDownSell = async (record) => {
    try {
      const { code } = await AdminHttp.GOODS.goodsRecycleModelUpdateStatus({
        ids: [record.id],
        status: 4,
      })
      if (+code === 20001) {
        message.success('下架成功')
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
  const activeKey = ref<string | number>(0)
  const tabsList = ref<TabListData[]>([])
  let shareColumn = ref(tableSaveColumns)
  const tabsChange = (Key) => {
    status.value = tabsList.value.find((item) => item.key === Key)?.statisticCode as string
    activeKey.value = Key
    paginations.pageNo = 1
    paginations.pageSize = 10
    //判断不同的页签展示不同的内容
    if (+activeKey.value === 0) {
      rowSelection.value = null
      shareColumn.value = tableSaveColumns.map((item) => {
        return {
          ...item,
          title: item.dataIndex === 'updateTime' ? '更新时间' : item.title,
        }
      })
    } else if (activeKey.value === 1) {
      rowSelection.value = null
      shareColumn.value = tableSaveColumns.map((item) => {
        return {
          ...item,
          title: item.dataIndex === 'updateTime' ? '提交时间' : item.title,
        }
      })
    } else if (activeKey.value === 2) {
      rowSelection.value = null
      shareColumn.value = tableSaveColumns.map((item) => {
        return {
          ...item,
          title: item.dataIndex === 'updateTime' ? '审核时间' : item.title,
        }
      })
    } else if (activeKey.value === 3) {
      rowSelection.value = activeSelection.value
      shareColumn.value = tableSaveColumns.map((item) => {
        return {
          ...item,
          title: item.dataIndex === 'updateTime' ? '上架时间' : item.title,
        }
      })
    } else if (activeKey.value === 4) {
      rowSelection.value = activeSelection.value
      shareColumn.value = tableSaveColumns.map((item) => {
        return {
          ...item,
          title: item.dataIndex === 'updateTime' ? '下架时间' : item.title,
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
  //  --- 全选 筛选操作 ----
  const selectedRow = ref<string[]>([])
  let rowSelection = ref<any>(null)
  let activeSelection = ref<any>({
    onChange: (selectedRowKeys: string[], selectedRows: object[]) => {
      console.log(selectedRows)
      selectedRow.value = selectedRowKeys
    },
  })
  // ----批量操作删除----
  const confirmLoading = ref(false)
  const eraModal = reactive({
    visible: false,
  })

  // 批量上下架
  const batchOperation = async (type) => {
    // 这里做一些初始化数据的操作 有可能弹出框是一批数据的设置
    operateStatus.value = type
    operateTitle.value = type === 1 ? '批量上架' : '批量下架'
    // eraModal.visible = true

    Modal.confirm({
      title: '温馨提示',
      content: `确定要${operateTitle.value}所选择的商品吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk() {
        return new Promise(async (resolve) => {
          const { code } = await AdminHttp.GOODS.goodsRecycleModelUpdateStatus({
            ids: selectedRow.value,
            status: type === 1 ? 3 : 4,
          })
          selectedRow.value = []
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
    try {
      tableLoading.value = true
      let params = {
        ...filterData.value,
        ...paginations,
        status: status.value ? status.value : '',
      }
      const { code, data } = await AdminHttp.GOODS.goodsRecycleModelQueryPage(params)
      if (code === '20001') {
        tableData.value = data.pageResult.records.map((item) => {
          return {
            ...item,
            levelVOS: item.levelVOS.filter((item) => item.price),
          }
        })
        paginations.total = data.pageResult.total
        // 计算总和
        const statisticTotal = data.statistics.reduce((total, cur) => {
          return +cur.statisticCount + total
        }, 0)
        const allTabItem = [
          { key: 0, name: '全部商品', totalCount: statisticTotal, statisticCode: '' },
        ]
        tabsList.value = allTabItem.concat(
          data.statistics.map((item) => {
            return {
              key: +item.statisticCode,
              name: item.statisticName,
              totalCount: item.statisticCount,
              statisticCode: item.statisticCode,
            }
          }),
        )
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

  onMountedOrActivated(() => {
    // 初始化数据
    loadTableData()
  })
</script>

<style scoped lang="less"></style>
