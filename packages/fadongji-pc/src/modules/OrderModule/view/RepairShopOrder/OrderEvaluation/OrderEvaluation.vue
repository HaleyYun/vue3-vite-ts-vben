<template>
<div>
  <div>
    <EraTabs :tabsList="tabsList" :tabsactive="activeKey" @tabsChange="tabsChange" />
  </div>
  <div class="mx-24px mt-72px mb-24px">
    <div class="my-24px bg-white p-24px pb-4px">
      <EvaluationFilterForm @rest="handlerRest" @submit="handlerSubmit" />
    </div>

    <div class="p-24px bg-white">
      <EraTableTitle :total="paginations.total" />

      <div>
        <ATable
          :loading="tableLoading"
          :rowKey="(record) => record.id"
          :columns="tableColumns"
          :data-source="tableData"
          :pagination="false"
          size="small"
          :scroll="{ x: 1200 }"
          bordered
        >
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex === 'starMark'">
              <a-rate
                :value="Math.ceil(record.starMark / 2)"
                disabled
                :count="Math.ceil(record.starMark / 2)"
              />
            </template>
            <template v-if="column.dataIndex === 'masterName'">
              <div>{{ record.orderTechnicianVO?.masterName }}</div>
              <div>{{ record.orderTechnicianVO?.phone }}</div>
            </template>
            <template v-if="column.dataIndex === 'sourceId'">
              <AButton type="link" size="small" @click="sourceDetails(record)"
                >{{ record.sourceId }}
              </AButton>
            </template>
            <template v-if="column.dataIndex === 'operation'">
              <AButton
                v-auth="'/v1/order/evaluate/service/Detail'"
                type="link"
                size="small"
                @click="goDetails(record)"
              >
                查看详情
              </AButton>
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
  import adminHttp from '/@/utils/http/adminHttp'
  import { clearObjectUnalbeAttr } from '/@/utils/helper/formHelper'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { tableColumns } from './data/OrderEvaluation'
  import EvaluationFilterForm from './component/EvaluationFilterForm.vue'
  import { usePermission } from '/@/hooks/web/usePermission'
  import { useMessage } from '/@/hooks/web/useMessage'

  const { hasPermission } = usePermission()
  const { createMessage } = useMessage()
  import { useRouter } from 'vue-router'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const router = useRouter()
  //------tabs页签配置-------
  const activeKey = ref('one')
  const tabsList = ref([
    { key: 'one', name: '安装服务', totalCount: 0 },
    { key: 'two', name: '回收服务', totalCount: 0 },
  ])
  const tabsChange = (Key) => {
    activeKey.value = Key
    paginations.pageNo = 1
    paginations.pageSize = 10

    loadTableData()
  }

  // 查看详情
  const goDetails = (record) => {
    router.push({
      path: '/OrderModule/repairShopOrder/evaluationDetails',
      query: { id: record.sourceId },
    })
  }
  // 服务订单详情
  const sourceDetails = (record) => {
    if (record.sourceType === 3) {
      if (!hasPermission('/v1/support/install/detail')) {
        createMessage.error('暂无此权限！')
        return
      }
      router.push({
        path: '/OrderModule/repairShopOrder/installationDetails',
        query: { id: record.sourceId },
      })
    } else {
      if (!hasPermission('/v1/order/recycle/detail')) {
        createMessage.error('暂无此权限！')
        return
      }
      router.push({
        path: '/OrderModule/repairShopOrder/recoveryDetails',
        query: { id: record.sourceId },
      })
    }
  }
  // ------form列表---------
  const filterData = ref({})
  // 重置
  const handlerRest = (values) => {
    paginations.pageNo = 1
    filterData.value = {
      ...values,
      ...paginations,
    }
    loadTableData()
  }
  // 搜索
  const handlerSubmit = (values) => {
    paginations.pageNo = 1
    filterData.value = {
      ...values,
      ...paginations,
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
  //----- 加载列表数据 ---------
  const statusAttrs = { one: 32, two: 33 }
  const tableLoading = ref(false)
  const tableData = ref([])
  const loadTableData = async () => {
    await handlerStatus()
    try {
      tableLoading.value = true
      const filterParams = {
        ...filterData.value,
        ...paginations,
        orderType: statusAttrs[activeKey.value],
      }
      const { code, data } = await adminHttp.ORDER.orderEvaluateServicePage(
        clearObjectUnalbeAttr(filterParams),
      )
      console.log(tableData)
      if (code === '20001') {
        tableLoading.value = false
        paginations.total = data.total
        tableData.value = data.records

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
  //页签数量
  const handlerStatus = async () => {
    const { data } = await adminHttp.ORDER.orderEvaluateServiceListCount()
    tabsList.value = [
      { key: 'one', name: '安装服务', totalCount: data.install },
      { key: 'two', name: '回收服务', totalCount: data.recycle },
    ]
  }

  onMountedOrActivated(() => {
    // 初始化数据
    loadTableData()
  })
</script>

<style scoped lang="less"></style>
