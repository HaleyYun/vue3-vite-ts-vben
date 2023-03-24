<template>
  <BasicForm
    ref="opForm"
    @register="formRegister"
    @submit="handlerFilterSubmit"
    @reset="handlerFilterRest">
  </BasicForm>
</template>

<script setup lang="ts">
import { watch, defineProps, defineEmits, ref, nextTick } from 'vue'
import {
  hasNoneData,
  accessGoneData,
} from '/@/modules/ContentModule/view/ThinkManager/data/ThinkListContainerData'
import { BasicForm, FormSchema } from '/@/components/Form'
import { createFormRegisterInstance } from '/@/components/Form/src/helper'
import { sleep } from '/@/utils/dateUtil'
import {
  filterCashSettlementFormByAwait
} from '/@/modules/FinanceModule/view/financialPaymentManagement/financialCashSettlement/data/financialCashSettlementTableData'

const props = defineProps({
  currentTabIndex: {
    type: String,
    default: '',
  },
})
let showFilterForm = ref(false)
let formRegister = ref()
const [registerDefaultConfig, {updateSchema, appendSchemaByField, removeSchemaByFiled, getFieldsValue }] =
  createFormRegisterInstance({
    schemas: filterCashSettlementFormByAwait,
    labelWidth: 120,
  })
formRegister.value = registerDefaultConfig
watch(
  () => props.currentTabIndex,
  async (newValue) => {
    showFilterForm.value = false
    await nextTick().then(() => {})
    sleep(10)
    showFilterForm.value = true
    await nextTick().then(() => {})
    console.log(`currentTabIndex is value change ${newValue}`)
    // let schemas: FormSchema[] = []
    const fullFiledList: FormSchema[] = [...hasNoneData, ...accessGoneData]
    fullFiledList.forEach((schema) => {
      removeSchemaByFiled(schema.field)
    })
    if (newValue === 'one') {
    }
    if (newValue === 'two') {
    }
  },
  {
    immediate: true,
  },
)

const emiter = defineEmits(['rest', 'submit'])

const handlerFilterRest = () => {
  emiter('rest', { values: getFieldsValue() })
}
const handlerFilterSubmit = (values) => {
  console.log(values)
  emiter('submit', { values })
}
</script>

<style lang="scss" scoped></style>
