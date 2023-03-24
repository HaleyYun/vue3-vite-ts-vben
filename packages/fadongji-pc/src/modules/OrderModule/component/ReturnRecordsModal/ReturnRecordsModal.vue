<template>
  <AModal
    v-model:visible="show"
    title="退款退货记录"
    centered
    :width="1000"
    destroy-on-close
    @cancel="cancelHandler"
  >
    <div class="padding-24 max-h-70vh overflow-y-auto">
      <div class="mb-10px flex justify-between">
        <span>{{ goodsName }}</span>
        <span>购买数量：{{ goodsCount }}</span>
      </div>
      <ATable :dataSource="tableList" :columns="DeliveryTableColumn" :pagination="false">
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex == 'isRefundOnly'">
            {{ record['isRefundOnly'] ? '仅退款' : '退款退货' }}
          </template>
          <template v-if="column.dataIndex == 'amount'">
            {{ record['amount'] ? record['amount'] : '--' }}元
          </template>
        </template>
        <template v-if="column.dataIndex == 'options'">
          <AButton @click="detail()">查看详情</AButton>
        </template>
      </ATable>
    </div>
    <template #footer>
      <div class="flex justify-center">
        <AButton type="primary" @click="cancelHandler">关闭</AButton>
      </div>
    </template>
  </AModal>
</template>

<script lang="ts" setup>
  import { ref, defineProps, watch, defineEmits, reactive } from 'vue'
  import { DeliveryTableColumn } from './data'
  import adminHttp from '/@/utils/http/adminHttp'

  const emits = defineEmits(['update:visible'])

  const props = defineProps({
    visible: {
      default: false,
      type: Boolean,
    },
    goodsName: {
      default: '',
      type: String,
    },
    goodsCount: {
      default: '',
      type: [Number, String],
    },
    idList: {
      default: [],
      type: Array,
    },
  })

  const show = ref(props.visible)
  const tableLoading = ref(false)
  const paginations = reactive({
    total: 0,
  })
  const tableList = ref([])
  const detail = async () => {
    let filterParams = {
      idList: props.idList,
      status: 0,
    }
    try {
      const { code, data } = await adminHttp.Order.orderRefundQueryList(filterParams)
      if (code == '20001') {
        // paginations.total = data.total
        tableList.value = data
      }
    } catch (e) {
      console.log(e)
    } finally {
      tableLoading.value = false
    }
  }

  watch(
    () => props.visible,
    (v) => {
      show.value = v
      if (v) {
        detail()
      }
    },
  )

  const cancelHandler = () => {
    show.value = false
    emits('update:visible', false)
  }
</script>

<style scoped lang="less"></style>
