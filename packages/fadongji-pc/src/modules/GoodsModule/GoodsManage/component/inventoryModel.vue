<template>
  <div>
    <AModal
      v-model:visible="brandModal.visible"
      title="库存详情"
      centered
      :footer="null"
      :width="1000"
      destroy-on-close
      :confirm-loading="brandModal.confirmLoading"
      v-if="brandModal.visible"
    >
      <div class="padding-24 max-h-70vh overflow-y-auto">
        <div class="pb-24px text-center text-lg">{{ brandModal.name }}</div>
        <ATable :dataSource="dataSource" :pagination="false" :columns="columns">
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex == 'warehouseName'">
              <a-tag color="red" v-if="record.availableNumber == 0">无货</a-tag>
              <a-tag
                color="red"
                v-if="
                  record.availableNumber != 0 && record.availableNumber <= record.warningThreshold
                "
                >安全库存预警
              </a-tag>
              {{ record.warehouseName }}
            </template>
            <template v-if="column.dataIndex == 'IdentificationCode'">
            
              <a v-if="record.sortGoodsVin != null && record.sortGoodsVin != ''" @click="viewCode(record.sortGoodsVin)">
                查看识别码</a
              >
              <span v-else>--</span>
            </template>
          </template>
        </ATable>
        <a-drawer
          v-model:visible="visibleCode"
          class="custom-class"
          size="large"
          title="发动机识别码"
          placement="right"
        >
          <div class="flex flex-wrap">
            <div
              v-for="(item, index)  of goodsVinList" :key="index" 

            >
              <div class="text-xl m-5px bg-gray-400" >{{ item }}</div>
            </div>
          </div>
        </a-drawer>
      </div>
    </AModal>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue'
  import adminHttp from '/@/utils/http/adminHttp'
  const visibleCode = ref<boolean>(false)
  const brandModal = reactive({
    visible: false,
    id: null,
    name: '',
    confirmLoading: false,
  })
  const inventoryData = reactive({})
  const columns = [
    {
      title: '仓库类型',
      dataIndex: 'typeName',
      width: '10%',
    },
    {
      title: '仓库名称',
      dataIndex: 'warehouseName',
      width: '25%',
    },
    {
      title: '库存预警',
      dataIndex: 'warningThreshold',
      width: '15%',
    },
    {
      title: '总库存',
      dataIndex: 'number',
      width: '10%',
    },
    {
      title: '可用库存',
      dataIndex: 'availableNumber',
      width: '10%',
    },
    {
      title: '订单占用',
      dataIndex: 'orderNumber',
      width: '10%',
    },
    {
      title: '发动机识别码',
      dataIndex: 'IdentificationCode',
      width: '20%',
    },
  ]
  const dataSource = ref([])
  const goodsVinList = ref<any>([])
  const showModal = (id, name) => {
    brandModal.id = id
    brandModal.name = name
    getWarehouse()
    brandModal.visible = true
  }
  const getWarehouse = async () => {
    try {
      const { code, data } = await adminHttp.WAREHOUSE.warehouseStockGoodsWarehouse({
        goodId: brandModal.id,
      })
      if (code == '20001') {
        dataSource.value = data
      }
    } catch (e) {
      console.log(e)
    }
  }
  const viewCode = (record) => {
    console.log(record,'pppp');
    
    visibleCode.value = true
    goodsVinList.value = record
  }

  defineExpose({ showModal })
</script>

<style scoped></style>
