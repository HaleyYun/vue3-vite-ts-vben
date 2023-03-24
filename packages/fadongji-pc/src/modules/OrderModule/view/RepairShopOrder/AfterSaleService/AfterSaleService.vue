<template>
  <div>
    <div>
      <EraTabs :tabs-active="activeKey" :tabsList="tabsList" @tabsChange="tabsChange" />
    </div>
    <div class="mx-24px input-special mt-72px mb-24px">
      <div class="my-24px bg-white p-24px pb-4px">
        <ServiceFilterForm @rest="handlerRest" @submit="handlerSubmit" />
      </div>
      <div class="p-24px bg-white">
        <EraTableTitle :total="paginations.total" />
        <div class="custom-title-table">
          <a-table
            :columns="saleTableColumn"
            :data-source="tableData"
            :pagination="false"
            :row-class-name="rowClassName"
            :scroll="{ x: 1200 }"
            bordered
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.dataIndex === 'engineNo'">
                <div
                  class="absolute -left-1px px-20px -right-1px top-0 z-200 h-56px bg-white"
                ></div>
                <div
                  class="absolute flex items-center left-0px px-20px right-0px top-16px z-200 h-56px bg-gray-100"
                >
                  <div class="flex">
                    <div class="flex">
                      <div class="font-bold">订单号：</div>
                      <div class="font-bold">{{ record.id }}</div>
                    </div>
                    <div class="flex ml-50px">
                      <div>申请时间：</div>
                      <div>{{ record.createTime }}</div>
                    </div>
                    <div class="flex ml-50px">
                      <div>关联订单单号：</div>
                      <div>{{ record.oriOrderId }}</div>
                    </div>
                    <div class="flex ml-50px">
                      <div> 售后类型：</div>
                      <div> {{ record.typeName }}</div>
                    </div>
                  </div>
                </div>
                <div class="pt-72px">{{ record.engineNo }}</div>
              </template>
              <template v-if="column.dataIndex === 'productInfo' && record.goodsDetail">
                <div class="pt-72px">
                  {{ record.goodsDetail.goodsName }}
                </div>
              </template>
              <template v-if="column.dataIndex === 'statusName'">
                <div class="pt-72px">{{ record.statusName }}</div>
              </template>
              <template v-if="column.dataIndex === 'amount'">
                <div class="pt-72px">{{ record.amount }}</div>
              </template>
              <template v-if="column.dataIndex === 'unit'">
                <div class="pt-72px">{{ record.unit }}</div>
              </template>
              <template v-if="column.dataIndex === 'result'">
                <div class="pt-72px">{{ record.result }}</div>
              </template>
              <template v-if="column.dataIndex === 'supportOrderId'">
                <div class="pt-72px">
                  <div>{{ record.supportOrderId }}</div>
                  <div>{{ record.supportOrderStatus }}</div>
                </div>
              </template>
              <template v-if="column.dataIndex === 'isSendBack'">
                <div class="pt-72px">{{ record.isSendBack ? '是' : '否' }}</div>
              </template>
              <template v-if="column.dataIndex === 'shopName' && record.goodsDetail">
                <div class="pt-72px">
                  <div>{{ record.goodsDetail.shopName }}</div>
                  <div>{{ record.goodsDetail.shopPhone }}</div>
                </div>
              </template>
              <template v-if="column.dataIndex === 'buyerName' && record.goodsDetail">
                <div class="pt-72px">
                  <div>{{ record.goodsDetail.buyerName }}</div>
                  <div>{{ record.goodsDetail.buyerPhone }}</div>
                </div>
              </template>
              <template v-if="column.dataIndex === 'supplierName' && record.goodsDetail">
                <div class="pt-72px">
                  <div>{{ record.goodsDetail.supplierName }}</div>
                  <div>{{ record.goodsDetail.supplierPhone }}</div>
                </div>
              </template>

              <template v-if="column.dataIndex === 'modelName' && record.goodsDetail">
                <div class="pt-72px">{{ record.goodsDetail.modelName }}</div>
              </template>
              <template v-if="column.dataIndex === 'operation'">
                <!-- 已认证 -->
                <div class="pt-72px">
                  <a-space direction="vertical">
                    <!--<a-->
                    <!--v-auth="'/v1/order/after/sale/audit'"-->
                    <!--v-if="record.statusName === '待处理'"-->
                    <!--@click="goDetails(record)"-->
                    <!--&gt;去审核</a-->
                    <!--&gt;-->
                    <!--&lt;!&ndash;		v2.0.1版本工单迭代，去掉下发售后任务功能		  &ndash;&gt;-->
                    <!--<a-->
                    <!--v-auth="'/v1/order/support/after/sale/save'"-->
                    <!--v-if="record.statusName === '待处理' && false"-->
                    <!--@click="auditHandler(record)"-->
                    <!--&gt;-->
                    <!--下发售后任务-->
                    <!--</a>-->
                    <a v-auth="'/v1/order/after/sale'" @click="goDetails(record)">详情</a>
                  </a-space>
                </div>
              </template>
              <template v-if="column.dataIndex === 'installFee'">
                {{ record.platformAmount + record.masterAmount }}
              </template>
            </template>
          </a-table>
        </div>
        <div class="flex justify-end py-15px bg-white">
          <VoPagination
            :current="paginations.current"
            :page-size="paginations.pageSize"
            :size="'default'"
            :total="paginations.total"
            @pagination="paginationChange"
          />
        </div>
      </div>

      <SendSaleAfterTask v-if="operateRow" :detail="operateRow" v-model:visible="visible" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import ServiceFilterForm from './component/ServiceFilterForm.vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import { onBeforeMount, reactive, ref } from 'vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import {
    afterSaleTableColumn,
    afterSaleTableColumnThree,
    afterSaleTableColumnTwo,
  } from './data/ServerAssignData'
  import { useRouter } from 'vue-router'
  import SendSaleAfterTask from './component/SendSaleAfterTask.vue'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const operateRow = ref<any>(null)
  const visible = ref<boolean>(false)
  const saleTableColumn = ref(afterSaleTableColumn)

  const rowClassName = () => {
    return 'relative'
  }

  const go = useRouter()
  const goDetails = (record) => {
    console.log(record, 'record')
    go.push({
      path: '/OrderModule/repairShopOrder/afterServiceDetails',
      query: {
        id: record.id,
      },
    })
  }

  const auditHandler = (record) => {
    visible.value = true
    operateRow.value = {
      ...record,
      ...record.goodsDetail,
    }
  }
  //----- 加载列表数据 ---------
  let tableData = ref<any>([])
  const loadTableData = async () => {
    const filterParams = {
      ...filterData.value,
      pageSize: paginations.pageSize,
      pageNo: paginations.current,
      type: activeKey.value,
    }
    try {
      await initStaticsData()
      const { code, data } = await adminHttp.ORDER.orderAfterSaleQueryList(filterParams)
      if (code == '20001') {
        paginations.total = data.total
        tableData.value = data.records.map((item) => {
          return {
            ...item,
            goodsDetail: item.goodsDetail ? item.goodsDetail[0] : null,
          }
        })
        if (paginations.current > 1 && tableData.value.length == 0) {
          paginations.current = paginations.current - 1
          await loadTableData()
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
  //------tabs页签配置-------
  const activeKey = ref(1)
  const tabsList = ref([
    { key: 1, name: '运输损坏', totalCount: 0 },
    { key: 2, name: '更换零部件', totalCount: 0 },
    { key: 3, name: '换机', totalCount: 0 },
  ])
  const tabsChange = (Key) => {
    activeKey.value = Key
    paginations.current = 1
    paginations.pageSize = 10
    if (+Key === 1) {
      saleTableColumn.value = afterSaleTableColumn
    }
    if (+Key === 2) {
      saleTableColumn.value = afterSaleTableColumnTwo
    }
    if (+Key === 3) {
      saleTableColumn.value = afterSaleTableColumnThree
    }

    loadTableData()
  }
  // ------form列表---------
  const filterData = ref({})
  // 重置
  const handlerRest = ({ values }) => {
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
  const initStaticsData = async () => {
    const { data } = await adminHttp.ORDER.orderAfterSaleTypeCount()
    tabsList.value = Object.keys(data).map((item) => {
      const key = +item
      const value = data[item]
      const name =
        +item === 1 ? '运输损坏' : +item === 2 ? '更换零部件' : +item === 3 ? '换机' : '换机'
      return { key, name, totalCount: value }
    })
  }

  onMountedOrActivated(() => {
    // 初始化数据
    loadTableData()
  })
</script>
<style lang="less">
  .input-special {
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none !important;
    }
  }

  .custom-title-table {
    .ant-table-tbody > tr > td {
      position: static;
      // padding: 37px 16px 16px 16px !important;
    }
  }
</style>
<style lang="less" scoped>
  td,
  th {
    padding: 10px 0;
    border: 1px solid #e5e5e5;
    vertical-align: top;
    text-align: center;
  }

  ::v-deep(.table-inner-space) {
    padding: 0 !important;
  }
  ::v-deep(.ant-table-content) {
    overflow: visible !important;
  }

  // 表格数据
  .order-body {
    .body_top {
      width: 100%;

      .body_top_con {
        margin-top: 10px;
        background: #f5f5f5;
        border: 1px solid #e5e5e5;
        width: 100%;
        padding: 5px;
        display: flex;
        justify-content: space-between;
      }
    }

    .body_content {
      display: flex;

      .body_content_info {
        border-top: unset;
      }

      //商品操作
      .body_content_handle {
        flex: 1;
        text-align: center;
        border-top: unset;
      }
    }
  }
</style>
