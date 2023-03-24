<template>
  <div class="page-wrap">
    <div class="page-containner">
      <div class="page-container">
        <div class="margin-10">
          <span class="line-color-gray"
            >截单时间对应商品详情页话述中截单时间，快递上门取件时间对应商品详情页发货时间，发货规则可按照区域单独设置，未照顾到的地区使用默认规则，支持单一地区多规则。</span
          >
        </div>
        <EraSwitchTable title="">
          <template #tableEdit>
            <span class="standard-red">（注：商家设置模板信息是T+1生效）</span>
            <AButton type="primary" @click="insertRulesFunc">添加规则</AButton>
          </template>
          <template #content>
            <ATable
              :loading="tableLoading"
              :rowKey="(record) => record.id"
              :columns="tabColumns"
              :data-source="rulePageData"
              :pagination="false"
              size="small"
              bordered
            >
              <template #bodyCell="{ column, text, record }">
                <template v-if="column.dataIndex === 'name'">
                  <a-input v-model:value="record.name" placeholder="请填写规则名称" allow-clear />
                </template>
                <template v-if="column.dataIndex === 'orderStartTime'">
                  <div>
                    <a-input-number
                      id="inputNumber"
                      style="width: 100px"
                      v-model:value="record.orderStartTime"
                      :min="0"
                      :max="24"
                      addon-after="时"
                    />
                    到
                    <a-input-number
                      id="inputNumber1"
                      style="width: 100px"
                      v-model:value="record.orderEndTime"
                      :min="0"
                      :max="24"
                      addon-after="时"
                    />
                  </div>
                </template>
                <template v-if="column.dataIndex === 'deliveryStartTime'">
                  <div>
                    <a-input-number
                      id="inputNumber"
                      style="width: 100px"
                      v-model:value="record.deliveryStartTime"
                      :min="0"
                      :max="24"
                      addon-after="时"
                    />
                    到
                    <a-input-number
                      id="inputNumber1"
                      style="width: 100px"
                      v-model:value="record.deliveryEndTime"
                      :min="0"
                      :max="24"
                      addon-after="时"
                    />
                  </div>
                </template>
                <template v-if="column.dataIndex === 'estimatedDelivery'">
                  <a-input-number
                    id="inputNumber2"
                    style="width: 200px"
                    v-model:value="record.estimatedDelivery"
                    :min="0"
                    :max="100"
                    addon-after="天"
                  />
                </template>
                <template v-if="column.dataIndex === 'areaName'">
                  <template v-if="record.areaName === '全国'">
                    <span>全国</span>
                  </template>
                  <template v-else>
                    <ACascader
                      class="codeCity"
                      v-model:value="record.areaCode"
                      :field-names="{ label: 'name', value: 'code', children: 'children' }"
                      :options="options"
                      placeholder="请选择地区"
                      @change="onChange"
                    />
                  </template>
                </template>
                <template v-if="column.dataIndex === 'operation'">
                  <APopconfirm
                    title="确定要删除吗？"
                    ok-text="确定"
                    cancel-text="取消"
                    v-if="record.identification"
                    @confirm="onDelete(record.key)"
                  >
                    <AButton type="link">删除</AButton>
                  </APopconfirm>
                  <APopconfirm
                    v-else
                    title="确定要删除吗？"
                    ok-text="确定"
                    cancel-text="取消"
                    @confirm="handlerDeletedRow(record)"
                  >
                    <AButton type="link">删除</AButton>
                  </APopconfirm>
                </template>
              </template>
            </ATable>
          </template>

          <template #pagination>
            <VoPagination
              :total="paginations.total"
              :current="paginations.current"
              :page-size="paginations.pageSize"
              @pagination="paginationChange"
            />
          </template>
        </EraSwitchTable>
        <AButton
          v-if="preservationList != ''"
          class="ml-200 m-10"
          type="primary"
          @click="preservation()"
          >保存
        </AButton>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { reactive, ref, watch, computed, onBeforeMount } from 'vue'
  import EraSwitchTable from '/@/components/EraSwitchTable/EraSwitchTable.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { StoreData } from '/@/modules/StoreHouseModule/view/StoreManager/data/StoreData'
  import adminHttp from '/@/utils/http/adminHttp'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { clearObjectUnalbeAttr } from '/@/utils/helper/formHelper'
  import { useRoute } from 'vue-router'
  import type { Ref, UnwrapRef } from 'vue'
  import type { CascaderProps } from 'ant-design-vue'
  import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue'
  import { cloneDeep } from 'lodash-es'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  interface DataItem {
    key: string
    name: string
    age: number
    address: string
  }

  let preservationList = ref<any>([])
  // const warehouseAddress = ref<string[]>([])
  const options = ref<CascaderProps['options']>([])
  let areaCode = ref([])
  const route = useRoute()
  const loadingKeyWord = 'handlerRow'
  const activeKey = ref('one')
  let rulePageData = ref<DataItem[]>([])
  let realDataLen = ref<Number>(0)
  const loadingCtxkey = 'handlerRow'
  const { createMessage } = useMessage()
  // table 列

  const tabColumns = ref(StoreData)
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

  // //删除/v1/warehouse/delivery
  const handlerDeletedRow = (item) => {
    console.log('删除===', item)
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    adminHttp.Store.warehouseDelete({ id: item.id })
      .then(() => {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        // item.status = 1
        loadTableData()
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
  }
  //选择完地区拿到code
  const onChange: CascaderProps['onChange'] = (item) => {
    areaCode.value = item
  }

  // 分页
  const paginationChange = ({ current, pageSize }) => {
    paginations.current = current
    paginations.pageSize = pageSize
    loadTableData()
  }
  //初始化调用/v1/warehouse/delivery/page
  const loadTableData = () => {
    // tableLoading.value = true
    const filterParams = {
      pageSize: paginations.pageSize,
      pageNo: paginations.current,
      warehouseId: route.query?.id,
    }
    adminHttp.Store.warehouseDeliveryPage(clearObjectUnalbeAttr(filterParams))
      .then((res) => {
        if (
          res.data.pageInfo &&
          res.data.pageInfo.records &&
          res.data.pageInfo.records.length > 0
        ) {
          rulePageData.value = res.data.pageInfo.records.map((item) => {
            return {
              ...item,
              areaCode: JSON.parse(item.areaCode),
            }
          })
          realDataLen.value = res.data.pageInfo.records.length
          paginations.total = res.data.pageInfo.total
          preservationList.value = []
        } else {
          if (rulePageData.value.length === 0) {
            insertRulesFunc()
          }
        }
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingKeyWord })
      })
  }
  //保存/v1/warehouse/delivery
  const preservation = () => {
    adminHttp.Store.warehouseDelivery({
      boList: preservationList.value.map((item) => {
        return {
          ...item,
          areaCode: JSON.stringify(areaCode.value),
        }
      }),
    })
      .then((res) => {
        if (res.code === '20001') {
          loadTableData()
          createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        }
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
  }
  //省市区
  const initArea = () => {
    adminHttp
      .sixHotAreaTree()
      .then((res) => {
        console.log('省市区信息=>', res)
        options.value = res.data
      })
      .catch((err) => {
        createMessage.error({ content: `获取列表失败:${err.message}` })
      })
  }

  onMountedOrActivated(() => {
    // 初始化数据
    loadTableData()
    initArea()
  })
  //---

  const dataSource: Ref<DataItem[]> = ref([
    {
      key: '0',
      name: '默认规则',
      age: 32,
      address: '0',
    },
  ])
  const count = computed(() => rulePageData.value.length + 1)
  const editableData: UnwrapRef<Record<string, DataItem>> = reactive({})

  const onDelete = (key: string) => {
    rulePageData.value = rulePageData.value.filter((item) => item.key !== key)
  }
  const insertRulesFunc = () => {
    const newData = {
      identification: 1,
      key: `${count.value}`,
      name: '',
      warehouseId: route.query?.id,
      orderStartTime: '',
      orderEndTime: '',
      deliveryStartTime: '',
      deliveryEndTime: '',
      estimatedDelivery: '',
      areaCode: '',
    }
    rulePageData.value.push(newData)
    preservationList.value.push(newData)
    // localData.value.push(newData)
    // pagination.total++
  }
</script>
<style lang="less" scoped>
  ::v-deep(.ant-tabs-nav) {
    margin: 0 !important;
  }

  .page-wrap {
    margin: 24px;
  }

  .filter-form {
    background: #fff;
    margin-bottom: 15px;
    padding: 10px 10px 0;
  }

  .page-container {
    background-color: white;
  }

  .table-list {
    .table-list-title {
      display: flex;
      padding: 10px;
      height: 40px;
      justify-content: space-between;
      align-items: center;
      border-bottom: none;
      background-color: #fff;
    }
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

  .codeCity {
    width: 300px;
  }
</style>
