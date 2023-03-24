<template>
    <div>
      <div>
        <EraTabs :tabsList="tabsList" :tabsactive="activeKey" @tabsChange="tabsChange" />
      </div>
      <div class="mx-24px mt-72px mb-24px">
        <div class="page-containner">
          <div class="filter-form">
            <DistributionFilterForm
              @rest="handlerFilterRest"
              @submit="handlerFilterSubmit"
              :currentTabIndex="activeKey"
            />
          </div>
          <div class="p-24px bg-white">
            <EraTableTitle :total="paginations.total" />
            <div class="text-center min-h-150px">
              <div class="w-full flex text-center items-contents head-style">
                <div
                  class="p-16px headItem"
                  v-for="(item, index) of tabColumns"
                  :key="index + 'order'"
                  :style="{ width: item.width }"
                >
                  {{ item.title }}
                </div>
              </div>
              <a-spin tip="加载中..." :spinning="tableLoading">
                <TableList
                  v-for="(item, index) of tableData"
                  :key="index + 'order'"
                  :tab-data="item"
                  @updateTable="loadTableData"
                />
                <a-empty class="pt-40px" v-if="!tableLoading && tableData.length == 0" />
              </a-spin>
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
    </div>
    </template>
    
    <script setup name="salesOrder" lang="ts">
      import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
      import { reactive, ref, watch } from 'vue'
      import adminHttp from '/@/utils/http/adminHttp'
      import EraTabs from '/@/components/EraTabs/EraTabs.vue'
      import { clearObjectUnalbeAttr } from '/@/utils/helper/formHelper'
      import VoPagination from '/@/components/VoPagination/VoPagination.vue'
      import TableList from './component/tableList.vue'
      import DistributionFilterForm from '../DistributionOrder/component/DistributionFilterForm.vue'
      import { containerConfig } from '../DistributionOrder/data/DistributionData'
      import { useMessage } from '/@/hooks/web/useMessage'
      import { useRouter } from 'vue-router'
    
      const { createMessage } = useMessage()
      const go = useRouter()
    
      const loadingCtxkey = 'handlerRow'
  
      /** reject action end **/
    
      const activeKey = ref('one')
      const tabsList = ref([
        {
          key: 'one',
          name: '全部订单',
          totalCount: 0,
        },
        { key: 'two', name: '待发货', totalCount: 0 },
        { key: 'three', name: '已收货', totalCount: 0 },
        { key: 'four', name: '已取消', totalCount: 0 },
      ])
      const tabsChange = (Key) => {
        activeKey.value = Key
        paginations.current = 1
        paginations.pageSize = 10
        loadTableData()
      }
    
      const filterData = ref()
      const handlerFilterRest = ({ values }) => {
        filterData.value = values
        loadTableData()
      }
      const handlerFilterSubmit = ({ values }) => {
        paginations.current = 1
        filterData.value = values
    
        loadTableData()
      }
    
      // table 列
      const tabColumns = ref(containerConfig.tableColumns)
      const tableLoading = ref(false)
      const paginations = reactive({
        total: 0,
        current: 1,
        pageSize: 10,
      })
    
      watch(activeKey, async () => {
        paginations.total = 0
        paginations.current = 1
        paginations.pageSize = 10
        loadTableData()
      })
    
      let tableData = ref([])
    
      // 分页
      const paginationChange = ({ current, pageSize }) => {
        paginations.current = current
        paginations.pageSize = pageSize
        loadTableData()
      }
      ///v1/order/sell/query/list
      const statusAttrs = {
        one: 0,
        two : 5110,
        three: 5120,
        four: 5130,
      }
      const loadTableData = async () => {
        await handlerStatus()
        tableLoading.value = true
        const filterParams = {
          ...filterData.value,
          status: statusAttrs[activeKey.value],
          isDeleted:false,
          // shopPlatformCode: 'supplier',
          pageSize: paginations.pageSize,
          pageNo: paginations.current,
		  t: new Date().getTime()
        }
        if (filterParams.time) {
          filterParams.startTime = filterParams.time[0] + ' 00:00:00'
          filterParams.endTime = filterParams.time[1] + ' 23:59:59'
        }
        if (filterParams.areaCode) {
          filterParams.area = filterParams.areaCode[2]
        }
        const { records, total } = await adminHttp
          .orderDistributionPage(clearObjectUnalbeAttr(filterParams))
          .then((res) => res.data)
          .catch((err) => {
            // console.log(err)
            console.log(`获取订单列表失败:${err.message}`)
            return { records: [], total: 0 }
          })
          .finally(() => {
            tableLoading.value = false
          })
        // console.log(records)
        paginations.total = total
        tableData.value = records
    
        
      }
      
      const handlerStatus = async () => {
        const { data } = await adminHttp.orderDistributionCountList()
        tabsList.value = [
          {
            key: 'one',
            name: '全部订单',
            totalCount:
              parseInt(data[5110]) +
              parseInt(data[5120]) +
              parseInt(data[5130]) ,
          },
          { key: 'two', name: '待发货', totalCount: data[5110] },
          { key: 'three', name: '已收货', totalCount: data[5120] },
          { key: 'four', name: '已取消', totalCount: data[5130] },
        ]
      }
      loadTableData()
    </script>
    
    <style lang="less" scoped>
      ::v-deep(.ant-tabs-nav) {
        margin: 0 !important;
      }
    
      .page-wrap {
        margin: 0 10px;
      }
    
      .filter-form {
        background: #fff;
        margin-bottom: 15px;
        padding: 10px 10px 0;
      }
    
      .page-container {
        background-color: white;
      }
    
      .rich-column {
        display: flex;
    
        .rich-resource {
          margin-right: 10px;
          cursor: pointer;
        }
    
        .rich-content {
        }
      }
    
      .show-row {
        margin-bottom: 10px;
    
        &__label {
          color: #555;
        }
    
        &__content {
          color: #000;
        }
      }
    
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
          // 商品信息
          .body_content_info {
            // flex-grow: 2;
            // width: 436px;
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
    
      .order-head {
        width: 100%;
      }
    
      .info_list {
        display: flex;
        // align-items: center;
        justify-content: center;
        flex-direction: column;
      }
    
      .info_box {
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #e5e5e5;
    
        &:last-child {
          border: none;
        }
    
        .info-item {
          padding: 10px 0;
        }
      }
    
      .goods_status {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    </style>
