<template>
  <div>
    <div class="single-page-verticalAllInner m-24px" style="height: 500px">
    <div class="margin-10">
      <span class="line-color-gray"
        >截单时间对应商品详情页话述中截单时间，快递上门取件时间对应商品详情页发货时间，发货规则可按照区域单独设置，未照顾到的地区使用默认规则，支持单一地区多规则。</span
      >
    </div>
    <div class="table-content">
      <EraSlotTable>
        <template #leftContent>
          <span class="standard-red">（注：商家设置模板信息是T+1生效）</span>
        </template>
        <template #tableEdit>
          <AButton type="primary" @click="insertRulesFunc">添加规则</AButton>
        </template>
        <template #content>
          <ATable
            class="table-space"
            :columns="rulesColumn"
            :data-source="rulePageData"
            :pagination="false"
            size="small"
            bordered
            :scroll="{ x: `${rulesColumn.length}0%`, y: 300 }"
          >
            <template #bodyCell="{ column, text, record }">
              <!--<template v-if='VoUtils.hasOwn(record, "id")'>-->
              <template v-if="column.dataIndex === 'name'">
                <span>{{ record.name }}</span>
              </template>
              <template v-if="column.dataIndex === 'endTime'">
                <span>{{ record.endTime }}</span>
              </template>
              <template v-if="column.dataIndex === 'estimatedDelivery'">
                <span>{{ record.estimatedDelivery }}</span>
              </template>
              <template v-if="column.dataIndex === 'areaName'">
                <span>{{ record.areaName }}</span>
              </template>
              <template v-if="column.dataIndex === 'action'">
                <AButton type="primary" @click="deleteEvent(record)">删除</AButton>
              </template>
            </template>
          </ATable>
        </template>
        <template #pagination>
          <VoPagination
            :total="pagination.total"
            :current="pagination.current"
            :page-size="pagination.pageSize"
            @pagination="paginationChange"
          />
        </template>
      </EraSlotTable>
    </div>
  </div>
  <EraColumnForm title="新增" ref="addTimeLimitRef" @submit="createTimeLimitEvent">
    <template #NilFileContent>
      <BasicForm @register="registerAlertForm" @submit="handleCreateStore" />
    </template>
  </EraColumnForm>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, watch } from 'vue'
  import EraSlotTable from '/@/components/EraSlotTable/EraSlotTable.vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { rulesColumn } from '/@/modules/StoreHouseModule/view/StoreManager/data/StoreManagerData'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { VoUtils } from '../../../../../../../shared'

  const { createMessage } = useMessage()
  const loadingTag = 'handlerRow'
  import type { Dayjs } from 'dayjs'
  import { CascaderProps } from 'ant-design-vue'

  type RangeValue = [Dayjs, Dayjs]
  export default defineComponent({
    name: 'StoreDeliveryTimeLimit',
    components: {
      EraSlotTable,
      VoPagination,
    },
    props: {
      propsRecord: {
        type: Object,
        default: '',
      },
    },
    setup(props) {
      const options = ref<CascaderProps['options']>([])
      let realDataLen = ref<Number>(0)
      let localData = ref([])
      const loadingKeyWord = 'handlerRow'
      const switchTabsEventAPi = async () => {}
      let rulePageData = ref([])
      let wareHouseId = ref('')
      let timeLimitPage = ref([] as any[])
      const pagination = reactive({
        total: 0,
        current: 1,
        pageSize: 10,
      })
      watch(
        () => props.propsRecord.warehouseId,
        (newValue) => {
          console.log(newValue, 'newValue')
          wareHouseId.value = newValue
        },
        { immediate: true, deep: true },
      )

      const loadDatas = async (e) => {
        const targetOptions = e[e.length - 1]
        targetOptions.loading = true
        const data = await seconeApi(targetOptions)
        targetOptions.loading = false
        if (data !== null) {
          targetOptions.loading = false
          targetOptions.children = [...data]
        }
        options.value = [...options.value]
      }
      const loadData: CascaderProps['loadData'] = (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1]
        targetOption.loading = true
        options.value = [...options.value]
        // setTimeout(() => {
        //   targetOption.loading = false
        //   options.value = [...options.value]
        // }, 1000)
      }
      const paginationChange = ({ current, pageSize }) => {
        pagination.current = current
        pagination.pageSize = pageSize
      }
      /**
       * @description: 添加 “发货”时效
       */
      const insertRulesFunc = () => {
        let itemData = {
          name: '',
          endTime: '9',
          estimatedDelivery: '',
          areaName: '9',
          action: '16',
        }
        localData.value.push(itemData)
        rulePageData.value.push(itemData)
        pagination.total++
      }
      /**
       * @description: 创建“发货时效”
       */
      const createTimeLimitEvent = (async) => {}
      /**
       * @description: 分页查询发货时效规则
       */
      const pageRulesList = () => {}
      /**
       * @description: 初始化“规则”列表
       */
      const initRulesPage = () => {
        rulePageData.value = []
        const map = {
          pageSize: pagination.pageSize,
          pageNo: pagination.current,
          warehouseId: wareHouseId.value,
        }
        adminHttp.Store.deliveryPage(map)
          .then((res) => {
            createMessage.success({ content: `操作成功`, key: loadingKeyWord })
            if (
              res.data.pageInfo &&
              res.data.pageInfo.records &&
              res.data.pageInfo.records.length > 0
            ) {
              rulePageData.value = res.data.pageInfo.records
              realDataLen.value = res.data.pageInfo.records.length
              pagination.total = res.data.pageInfo.total
            }
          })
          .catch((err) => {
            createMessage.error({ content: `操作失败:${err.message}`, key: loadingKeyWord })
          })
      }
      const deleteEvent = async (item) => {
        let form = new FormData()
        form.append('id', item.id)
        try {
          const res = adminHttp.Store.deleteTimeLimit(form)
          if (res.code === '20001') {
            createMessage.success({ content: `删除成功`, key: loadingKeyWord })
            await initRulesPage()
          }
        } catch (err: any) {
          createMessage.error({ content: `删除操作失败:${err.message}`, key: loadingKeyWord })
        }
      }
      const deleteKeyItem = (Item) => {
        rulePageData.value = rulePageData.value.filter((item) => item != Item)
        localData.value = rulePageData.value.filter((item) => item != Item)
        pagination.total--
      }
      const ceshiFunc = () => {
        console.log('localData===', localData.value)
      }
      const textApi = async (code) => {
        const map = { parentCode: code }
        const { data } = await adminHttp.CUSTOMER.apiSixHotAreaSub(map)
        data.map((item) => {
          item.isLeaf = false
          return item
        })
        options.value = data
      }
      initRulesPage()
      textApi('86')
      return {
        rulesColumn,
        VoUtils,
        value2: ref<RangeValue>(),
        createTimeLimitEvent,
        ceshiFunc,
        loadData,
        loadDatas,
        realDataLen,
        localData,
        options,
        deleteEvent,
        insertRulesFunc,
        switchTabsEventAPi,
        pageRulesList,
        paginationChange,
        deleteKeyItem,
        rulePageData,
        timeLimitPage,
        pagination,
        wareHouseId,
      }
    },
  })
</script>
<style scoped lang="less">
  ::v-deep(.ant-tabs-nav) {
    margin: 0 !important;
  }

  .warn {
    color: #aaaaaad8;
    font-size: 16px;
  }
</style>
