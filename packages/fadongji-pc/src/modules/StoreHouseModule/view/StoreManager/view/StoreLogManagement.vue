<template>
  <div class="m-24px">
    <div class="margin-10 flex flex-space-between">
      <ATabs v-model:activeKey="activeKey" type="card" @change="switchTabsEventAPi">
        <ATabsPane key="0" tab="库存操作记录" />
        <ATabsPane key="1" tab="补货记录" />
        <ATabsPane key="2" tab="调拨记录" />
      </ATabs>
    </div>
    <div class="table-content margin-10 padding-r-10">
      <div>
        <template v-if="activeKey === '0'">
          <div v-if="logData != ''">
            <template v-for="(item, index) of logData">
              <span class="margin-t-b-5 font-line-header font-asset-bold standard-red">{{
                item['operMonth']
              }}</span>
              <div style="flex-direction: column">
                <div
                  style="width: 100%; display: flex"
                  v-for="(content, contentIndex) of item['inOutLog']"
                  :key="contentIndex"
                >
                  <div class="item-box">
                    <span class="font-line-header font-asset-bold">{{
                      content.warehouseName
                    }}</span>
                    <span class="margin-t-b-5 line-color-gray"
                      >仓库：{{ content.warehouseName }}</span
                    >
                    <div class="flex margin-t-b-5 flex-space-between">
                      <span class="margin-t-b-5 line-color-gray"
                        >销售前商品库存：{{ content.changeNumber }}</span
                      >
                      <span class="margin-t-b-5 line-color-gray"
                        >销售前商品库存：{{ content['newNumber'] }}</span
                      >
                    </div>
                    <span class="margin-t-b-5 line-color-gray"
                      >订单编号：{{ content['typeId'] }}</span
                    >
                  </div>
                  <div class="right-box">
                    <span class="font-line-header font-asset-bold"
                      >订单出库：{{ content.typeName }}</span
                    >
                    <span class="margin-t-30">商品数量：{{ content['originNumber'] }}</span>
                    <span class="margin-t-20 line-color-gray">{{ content['orderTime'] }}</span>
                  </div>
                </div>
              </div>
            </template>
          </div>
          <div v-else>
            <a-empty />
          </div>
        </template>
        <template v-else-if="activeKey === '1'">
          <div v-if="refillData != ''">
            <template v-for="(item, index) of refillData">
              <span class="margin-t-b-5 font-line-header font-asset-bold standard-red">{{
                item['operMonth']
              }}</span>
              <div class="flex flex-column" v-for="content of item['refillGoodsStatisDTOS']">
                <div style="width: 100%" class="flex">
                  <div class="item-box">
                    <span class="font-line-header font-asset-bold">{{ content.goodsName }}</span>
                  </div>
                  <div class="right-box">
                    <span class="font-line-header font-asset-bold"
                      >商品数量：{{ content.changeNumber }}</span
                    >
                  </div>
                </div>
                <div class="flex box-main margin-t-10">
                  {{ content.goodsVin }}
                </div>
                <div class="flex box-main margin-t-10">
                  <div class="box-item line-color-gray"
                    >补货仓库：{{ content['outWarehouseName'] }}
                  </div>
                  <div class="box-item line-color-gray"
                    >入库仓库名称：{{ content['inWarehouseName'] }}
                  </div>
                  <div class="box-item line-color-gray">{{ content['createTime'] }}</div>
                </div>
                <div
                  class="flex expand-btn standard-blue"
                  v-if="content.goodsVin && content.goodsVin.length > 6"
                  @click="expandAndClose(content.open, content.id)"
                  >{{ content.open === true ? '展开' : '缩进' }}
                </div>
                <div class="margin-b-15">
                  <ASteps :current="1">
                    <a-step>
                      <!-- <span slot="title">Finished</span> -->
                      <template #title>补货申请</template>
                      <template #description>
                        <span>{{ content['warehouseTime'] }}</span>
                      </template>
                    </a-step>
                    <a-step title="商品入库">
                      <template #description>
                        <span>{{ content['scanTime'] }}</span>
                      </template>
                    </a-step>
                  </ASteps>
                </div>
              </div>
            </template>
          </div>
          <div v-else>
            <a-empty />
          </div>
        </template>
        <template v-else>
          <div v-if="transferData != ''">
            <template v-for="item of transferData">
              <span class="margin-t-b-5 font-line-header font-asset-bold standard-red">{{
                item['operMonth']
              }}</span>
              <div class="flex flex-column" v-for="content of item['transferGoodsStatisDTOS']">
                <div style="width: 100%" class="flex">
                  <div class="item-box">
                    <span class="font-line-header font-asset-bold">{{ content.goodsName }}</span>
                  </div>
                  <div class="right-box">
                    <span class="font-line-header font-asset-bold"
                      >商品数量：{{ content.changeNumber }}</span
                    >
                  </div>
                </div>
                <div class="flex box-main margin-t-10">
                  {{ content.goodsVin }}
                </div>
                <div class="flex box-main margin-t-10">
                  <div class="box-item line-color-gray"
                    >补货仓库：{{ content['outWarehouseName'] }}
                  </div>
                  <div class="box-item line-color-gray"
                    >入库仓库名称：{{ content['inWarehouseName'] }}
                  </div>
                  <div class="box-item line-color-gray">{{ content['createTime'] }}</div>
                </div>
                <div
                  class="flex expand-btn standard-blue"
                  v-if="content.goodsVin && content.goodsVin.length > 6"
                  @click="expandAndClose(content.open, content.id)"
                  >{{ content.open === true ? '展开' : '缩进' }}
                </div>
                <div class="margin-b-15">
                  <ASteps :current="1">
                    <a-step>
                      <!-- <span slot="title">Finished</span> -->
                      <template #title>补货申请</template>
                      <template #description>
                        <span>{{ content['warehouseTime'] }}</span>
                      </template>
                    </a-step>
                    <a-step title="商品入库">
                      <template #description>
                        <span>{{ content['scanTime'] }}</span>
                      </template>
                    </a-step>
                  </ASteps>
                </div>
              </div>
            </template>
          </div>
          <div v-else>
            <a-empty />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, watch } from 'vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import { useMessage } from '/@/hooks/web/useMessage'

  const { createMessage } = useMessage()
  const loadingKeyWord = 'handlerRow'
  export default defineComponent({
    name: 'StoreLogManager',
    props: {
      propsRecord: {
        type: Object,
        default: () => {
          return {}
        },
      },
    },
    setup(props) {
      let transferData = ref([] as any[])
      let storeHouseId = ref<Object>({})
      let logData = ref([] as any[])
      let refillData = ref([] as any[])
      let dateTime = ref('')
      let activeKey = ref('0')
      const switchTabsEventAPi = async () => {}
      const warehouseTypeData = async () => {
        try {
          const map = {
            pageSize: 1000,
            pageNo: 1,
            warehouseId: storeHouseId.value['warehouseId'],
          }
          const res = await adminHttp.Store.warehouseStatisSupplierInout(map)
          if (res.code === '20001') {
            logData.value = res.data.records
            dateTime.value = res.time
          }
        } catch (err: any) {
          createMessage.error({ content: `操作失败:${err.message}`, key: loadingKeyWord })
        }
      }
      watch(
        () => props.propsRecord,
        (newValue) => {
          storeHouseId.value = newValue
        },
        { immediate: true, deep: true },
      )
      const warehouseTypeData1 = async () => {
        try {
          const map = {
            pageSize: 1000,
            pageNo: 1,
            warehouseId: storeHouseId.value['warehouseId'],
          }
          const res = await adminHttp.Store.warehouseStatisticsSupplierRefill(map)
          if (res.code === '20001') {
            let data = res.data.records.map((item) => {
              item.refillGoodsStatisDTOS.map((innerItem) => {
                innerItem.open = false
                return innerItem
              })
              return item
            })
            refillData.value = data
          }
        } catch (err: any) {
          createMessage.error({ content: `操作失败:${err.message}`, key: loadingKeyWord })
        }
      }
      const warehouseTypeData2 = async () => {
        try {
          const map = {
            pageSize: 1000,
            pageNo: 1,
            warehouseId: storeHouseId.value['warehouseId'],
          }
          const res = await adminHttp.Store.warehouseStatisSupplierTransfe(map)
          if (res.code === '20001') {
            let data = res.data.records.map((item) => {
              item.transferGoodsStatisDTOS.map((innerItem) => {
                innerItem.open = false
                return innerItem
              })
              return item
            })
            transferData.value = data
          }
        } catch (err: any) {
          createMessage.error({ content: `操作失败:${err.message}`, key: loadingKeyWord })
        }
      }
      const expandAndClose = (status, id) => {
        refillData.value.map((item) => {
          item.refillGoodsStatisDTOS.map((innerItem) => {
            if (innerItem.id == id) {
              innerItem.open = !status
            }
            return innerItem
          })
          return item
        })
      }
      warehouseTypeData2()
      warehouseTypeData1()
      warehouseTypeData()
      return {
        switchTabsEventAPi,
        expandAndClose,
        activeKey,
        transferData,
        storeHouseId,
        logData,
        refillData,
        dateTime,
      }
    },
  })
</script>
<style scoped lang="less">
  ::v-deep(.ant-tabs-nav) {
    margin: 0 !important;
  }

  .table-content {
    height: 400px;
    overflow-y: auto;
  }

  .item-box {
    display: flex;
    flex-direction: column;
    width: 45%;
  }

  .small-color {
    color: #ff4d4f;
  }

  .right-box {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    width: 55%;
  }

  .box-main {
    width: 100%;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-bottom: 10px;

    .box-item {
      border: 1px solid #fff;
      flex: 1;
      margin: 0 8px 8px 0; // 间隙为5px
      width: calc(
        (100% - 24px) / 3
      ); // 这里的24px = (分布个数3-1)*间隙5px, 可以根据实际的分布个数和间隙区调整
      min-width: calc((100% - 24px) / 3); // 加入这两个后每个item的宽度就生效了
      max-width: calc((100% - 24px) / 3); // 加入这两个后每个item的宽度就生效了
      &:nth-child(3n) {
        // 去除第4n个的margin-right
        margin-right: 0;
      }
    }
  }

  .expand-btn {
    justify-content: flex-end;
  }
</style>
