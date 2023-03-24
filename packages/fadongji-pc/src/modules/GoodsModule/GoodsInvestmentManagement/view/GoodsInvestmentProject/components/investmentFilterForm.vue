<template>
  <BasicForm
    ref="opForm"
    @register="formRegister"
    :actionColOptions="{ span: 8, offset: offset }"
    @submit="handlerFilterSubmit"
    @reset="handlerFilterRest"
  >
    <template #remoteStorageSearch="{ model, field }">
      <a-select
        v-model:value="model[field]"
        label-in-value
        show-search
        allow-clear
        placeholder="发货仓搜索"
        style="width: 100%"
        :filter-option="false"
        :not-found-content="fetchStoreing ? undefined : null"
        :options="storageData"
        @search="onStorageSearch"
      >
        <template v-if="fetchStoreing" #notFoundContent>
          <a-spin size="small" />
        </template>
      </a-select>
    </template>
  </BasicForm>
</template>

<script setup lang="ts">
  import { watch, defineProps, defineEmits, ref, nextTick } from 'vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import {
    filterFormSchemasByAwait,
    submitData,
    hasNoneData,
    accessGoneData,
    hasViolationData,
    lastGoneData,
    fiveGoneData,
    sixGoneData,
    sevenGoneData,
  } from '/@/modules/GoodsModule/GoodsInvestmentManagement/view/GoodsInvestmentProject/data/investmentFiterColumns'
  import { _ } from '@vocen/shared'
  import { BasicForm, FormSchema } from '/@/components/Form'
  import { createFormRegisterInstance } from '/@/components/Form/src/helper'
  import { sleep } from '/@/utils/dateUtil'

  const fetchStoreing = ref(false)
  const props = defineProps({
    currentTabIndex: {
      type: String,
      default: '',
    },
  })
  const sellerData = ref([])
  const fetching = ref(false)
  const storageData = ref([])
  const onStorageSearchFn = async (name: string) => {
    fetchStoreing.value = true
    const { data } = await adminHttp.WAREHOUSE.warehouseListAll({
      name,
    })
    fetchStoreing.value = false
    storageData.value = data.map((item) => {
      return {
        value: item.id,
        label: item.name,
      }
    })
  }
  const fetchSeller = async (val) => {
    fetching.value = true
    const { data } = await adminHttp.COMPANY.companyInfoManageList({
      storeName: val,
      platformCode: ['agent', 'supplier'],
    })
    fetching.value = false
    sellerData.value = data.map((item) => {
      return {
        value: item.companyId,
        label: item.storeName,
      }
    })
  }
  let showFilterForm = ref(false)
  let formRegister = ref()
  const offset = ref(16)
  const [
    registerDefaultConfig,
    { appendSchemaByField, appendSchema, removeSchemaByFiled, getFieldsValue },
  ] = createFormRegisterInstance({
    schemas: filterFormSchemasByAwait,
    labelWidth: 120,
    actionColOptions: { span: 8, offset: 8 },
    baseColProps: { span: 8 }, // 配置所有选子项的 ColProps，不需要逐个配置，子项也可单独配置优先与全局
    autoSubmitOnEnter: true,
  })
  formRegister.value = registerDefaultConfig
  // const currentTabIndex = props.currentTabIndex
  watch(
    () => props.currentTabIndex,
    async (nval) => {
      showFilterForm.value = false
      await nextTick().then(() => {})
      sleep(10)
      showFilterForm.value = true
      await nextTick().then(() => {})
      console.log(`currentTabIndex is value change ${nval}`)
      // let schemas: FormSchema[] = []
      const fullFiledList: FormSchema[] = [
        ...submitData,
        ...hasNoneData,
        ...accessGoneData,
        ...hasViolationData,
        ...lastGoneData,
        ...fiveGoneData,
        ...sixGoneData,
        ...sevenGoneData,
      ]
      fullFiledList.forEach((schema) => {
        removeSchemaByFiled(schema.field)
      })
      if (nval === 'one') {
        // schemas = [...filterFormSchemasByAwait]
        lastGoneData.forEach((schema) => {
          appendSchemaByField(schema, 'phone')
        })
        offset.value = 16
      }
      if (nval === 'two') {
        submitData.forEach((schema) => {
          appendSchemaByField(schema, 'phone')
        })
        hasNoneData.forEach((schema) => {
          appendSchemaByField(schema, 'phone')
        })
        offset.value = 8
      }
      if (nval === 'three') {
        submitData.forEach((schema) => {
          appendSchemaByField(schema, 'phone')
        })
        accessGoneData.forEach((schema) => {
          appendSchemaByField(schema, 'phone')
        })
        offset.value = 8
      }
      if (nval === 'four') {
        hasViolationData.forEach((schema) => {
          appendSchemaByField(schema, 'phone')
        })
        offset.value = 16
      }
      if (nval === 'five') {
        fiveGoneData.forEach((schema) => {
          appendSchemaByField(schema, 'phone')
        })
        offset.value = 16
      }
      if (nval === 'six') {
        sixGoneData.forEach((schema) => {
          appendSchemaByField(schema, 'phone')
        })
        offset.value = 8
      }
      if (nval === 'seven') {
        sevenGoneData.forEach((schema) => {
          appendSchemaByField(schema, 'phone')
        })
        offset.value = 8
      }
    },
    {
      immediate: true,
    },
  )
  const onSearch = _.debounce(fetchSeller, 300)
  const onStorageSearch = _.debounce(onStorageSearchFn, 300)
  const emiter = defineEmits(['rest', 'submit'])

  const handlerFilterRest = () => {
    emiter('rest', { values: getFieldsValue() })
  }
  const handlerFilterSubmit = (values) => {
    console.log(values, 'kkkk')
    emiter('submit', { values })
  }
</script>

<style lang="scss" scoped></style>
