
<template>
  <BasicForm
    ref="opForm"
    @register="formRegister"
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
  import { BasicForm, FormSchema } from '/@/components/Form'
  import { createFormRegisterInstance } from '/@/components/Form/src/helper'
  import { _ } from '@vocen/shared'
  import adminHttp from '/@/utils/http/adminHttp'
  import { sleep } from '/@/utils/dateUtil'
  import { filterFormConfig } from '../data/MotorcycleTypeData'
  const fetchStoreing = ref(false)
  const storageData = ref([])
  const props = defineProps({
    currentTabIndex: {
      type: String,
      default: '',
    },
  })

  let showFilterForm = ref(false)
  let formRegister = ref()
  const [registerDefaultConfig, { appendSchemaByField, removeSchemaByFiled, getFieldsValue }] =
    createFormRegisterInstance({
      schemas: filterFormConfig.baseColumns,
      labelWidth: 110,
      baseColProps: { span: 6 }, // 配置所有选子项的 ColProps，不需要逐个配置，子项也可单独配置优先与全局
      actionColOptions: { span: 8, offset: 16 }, // 操作按钮外层 Col 组件配置，offset 偏移多少
      autoSubmitOnEnter: true,
      autoAdvancedLine: 3,
      alwaysShowLines: 2,
      showAdvancedButton:true ,
      // submitOnReset:true
      // compact:true
      
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
        ...filterFormConfig.accessColumns,
        ...filterFormConfig.rejectColumns,
      ]
      fullFiledList.forEach((schema) => {
        removeSchemaByFiled(schema.field)
      })
      if (nval === 'one') {
        // schemas = [...filterFormSchemasByAwait]
      }
      if (nval === 'two') {
        filterFormConfig.accessColumns.forEach((schema) => {
          appendSchemaByField(schema, 'phone')
        })
      }
      if (nval === 'three') {
        filterFormConfig.rejectColumns.forEach((schema) => {
          appendSchemaByField(schema, 'phone')
        })
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
  const onStorageSearchFn = async (name: string) => {
    fetchStoreing.value = true
    const { data } =  adminHttp.VEHICLE.communityVehicleModelCondition(name)
    fetchStoreing.value = false
    console.log(data,'oooooo');
    
    storageData.value = data.brandList.map((item) => {
      return {
        value: item.item,
        label: item.item,
      }
    })
    console.log(storageData.value,'storageData.value');
    
  }
  const onStorageSearch = _.debounce(onStorageSearchFn, 300)
</script>

<style lang="scss" scoped>
  ::v-deep(.ant-btn-primary) {
    margin-right: 10px !important;
  }
</style>
