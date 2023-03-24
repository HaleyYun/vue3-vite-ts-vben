<template>
  <div class="m-24px">
    <div class="bg-white p-24px mb-24px pb-4px">
      <BasicForm @register="registerForm" @rest="handlerFilterRest" @submit="handlerFilterSubmit" />
    </div>
    <div class="bg-white p-24px">
      <EraTableTitle :total="pagination.total" />
      <div>
        <ATable
          rowKey="id"
          class="case-table"
          :columns="shareColumn"
          :dataSource="commitData"
          :pagination="false"
          size="small"
          :loading="tableLoading"
          bordered
          :scroll="{ x: `${shareColumn.length}0%` }"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'shopName'">
              <div>
                {{ record.shopName }}
                <p>{{ record.shopPhone }}</p>
              </div>
            </template>
            <!--价格-->
            <template v-if="column.dataIndex == 'cashPrice'">
              {{ record.cashPrice }}元
              <div v-if="record.accountPeriodDays != 0">
                {{ record.accountPeriodDays }}天账期{{ record.accountPrice }}元
              </div>
            </template>
          </template>
        </ATable>
      </div>
      <div class="text-right pt-20px">
        <VoPagination
          :total="pagination.total"
          :current="pagination.current"
          :page-size="pagination.pageSize"
          @pagination="paginationChange"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, onBeforeMount, reactive, ref, toRefs } from 'vue'
  import { BasicForm, useForm } from '/@/components/Form'
  import {
    FilterGoodsProfitsForm,
    GoodsProfitsColumns,
  } from '/@/modules/GoodsModule/GoodsManage/view/GoodsProfitSharing/data/GoodsProfitsData'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import { useMessage } from '/@/hooks/web/useMessage'

  const { createMessage } = useMessage()
  export default defineComponent({
    name: 'GoodsProfitSharing',
    components: {
      BasicForm,
      EraTableTitle,
      VoPagination,
    },
    setup() {
      let shareModel = ref({
        goodsName: '',
        shopName: '',
        type: 0,
      })

      const load = ref(true)
      let shareColumn = ref(GoodsProfitsColumns)
      const tabColumns = ref([])
      let commitData: any = ref([])
      const tableLoading = ref(false)
      const state = reactive({
        loading: false,
        hiddenLoading: false,
        selectedRowKeys: [],
        selectNum: 0,
      })
      const pagination = reactive({
        total: 0,
        current: 1,
        pageSize: 10,
      })
      const hasSelected = computed(() => state.selectedRowKeys.length > 0)
      const [registerForm] = useForm({
        labelWidth: 120,
        baseColProps: { span: 8 }, // 配置所有选子项的 ColProps，不需要逐个配置，子项也可单独配置优先与全局
        actionColOptions: { span: 8, offset: 16 }, // 操作按钮外层 Col 组件配置，offset 偏移多少
        schemas: FilterGoodsProfitsForm,
        autoSubmitOnEnter: true,
      })
      const paginationChange = ({ current, pageSize }) => {
        pagination.current = current
        pagination.pageSize = pageSize
        loadTableData()
      }

      const p1 = (obj) => {
        return new Promise((resolve, reject) => {
          adminHttp
            .goodsGoodsProfitList(obj)
            .then((res) => {
              pagination.total = res.data.total
              resolve(res.data.records)
            })
            .catch((error) => {
              reject(new Error(error))
            })
        })
          .then((result) => result)
          .catch((e) => e)
      }

      const p2 = new Promise((resolve, reject) => {
        adminHttp
          .goodsTemplateGetProfit()
          .then((res) => {
            resolve(res.data)
          })
          .catch((error) => {
            reject(new Error(error))
          })
      })
        .then((result) => result)
        .catch((e) => e)

      /**
       * @function searchTableEvent
       * @description 刷新“商品评价”列表数据
       * @return void
       * @author stoneAge 2022/06/13
       */
      const loadTableData = async () => {
        let listArr: any = []
        let needInsertArr: any = []
        tableLoading.value = true
        const map = {
          ...shareModel.value,
          pageNo: pagination.current,
          pageSize: pagination.pageSize,
        }
        await Promise.all([p1(map), p2])
          .then((res) => {
            listArr = res[0]
            needInsertArr = res[1]
            listArr.map((item) => {
              if (item.shareProfitInfo) {
                item.shareProfitInfo.forEach((innerItem) => {
                  item[innerItem.key] = (innerItem.value != null ? innerItem.value : '--') + '元'
                })
              }
              return item
            })
            commitData.value = res[0]
            if (needInsertArr.length > 0) {
              let shareTmp = shareColumn.value.slice(0, 4)
              needInsertArr.forEach((item) => {
                let map: any = { title: item['name'], dataIndex: item['key'], width: 150 }
                shareTmp.push(map)
              })
              shareColumn.value = shareTmp
            }
            tableLoading.value = false
          })
          .catch((err) => {
            createMessage.error('数据加载失败：' + `$${err}`)
          })
      }
      const handlerFilterRest = ({ values }) => {
        shareModel.value = values
        loadTableData()
      }
      const handlerFilterSubmit = (values) => {
        pagination.current = 1
        shareModel.value = {
          ...values,
          type: values?.type || '0',
        }
        loadTableData()
      }
      onBeforeMount(() => {
        loadTableData()
      })

      return {
        load,
        registerForm,
        paginationChange,
        ...toRefs(state),
        handlerFilterRest,
        handlerFilterSubmit,
        shareModel,
        shareColumn,
        hasSelected,
        tabColumns,
        commitData,
        tableLoading,
        pagination,
      }
    },
  })
</script>
<style lang="less" scoped>
  .case-table {
    background-color: #fff;
  }

  .page-container {
    background-color: white;
  }

  .filter-bg {
    padding-top: 10px;
    background-color: white;
  }
</style>
