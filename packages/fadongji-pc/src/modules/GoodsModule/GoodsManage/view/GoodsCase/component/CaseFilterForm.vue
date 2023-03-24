<template>
  <BasicForm
    ref="opForm"
    @register="formRegister"
    @submit="handlerFilterSubmit"
    @reset="handlerFilterRest"
  />
</template>

<script setup lang="ts">
  import { watch, defineProps, defineEmits, ref, nextTick } from 'vue'

  import { BasicForm, FormSchema } from '/@/components/Form'
  import { createFormRegisterInstance } from '/@/components/Form/src/helper'

  import { sleep } from '/@/utils/dateUtil'
  import { filterFormConfig } from '/@/modules/GoodsModule/GoodsManage/view/GoodsCase/data/GoodsCaseListContainerData'

  const props = defineProps({
    currentTabIndex: {
      type: String,
      default: '',
    },
  })

  let showFilterForm = ref(false)
  let formRegister = ref()
  const [registerDefaultConfig, { appendSchemaByField, removeSchemaByFiled,updateSchema,resetFields, getFieldsValue }] =
    createFormRegisterInstance({
      fieldMapToTime: [
        ['searchTime', ['stratUpdateTime', 'endUpdateTime'], 'YYYY-MM-DD'],
        ['creattime', ['stratCreatTime', 'endCreattime'], 'YYYY-MM-DD'],
        ['cancellationTime', ['stratCancellationTime', 'endCancellationTime'], 'YYYY-MM-DD']
      ],
      schemas: filterFormConfig.baseColumns,
      labelWidth: 120,
      baseColProps: { span: 8 }, // 配置所有选子项的 ColProps，不需要逐个配置，子项也可单独配置优先与全局
      actionColOptions: { span: 8, offset: 8 },
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
      // 重置表单
      resetFields()
      await nextTick().then(() => {})
      const fullFiledList: FormSchema[] = [
        ...filterFormConfig.endTimeColumns,
        ...filterFormConfig.accessColumns,
        ...filterFormConfig.rejectColumns,

      ]
      fullFiledList.forEach((schema) => {
        removeSchemaByFiled(schema.field)
      })

      if (nval === 'one') {
        filterFormConfig.endTimeColumns.forEach((schema) => {
          appendSchemaByField(schema)
        })
      } else if (nval === 'two') {
        filterFormConfig.accessColumns.forEach((schema) => {
          appendSchemaByField(schema)
        })
      } else if (nval === 'three') {
        filterFormConfig.rejectColumns.forEach((schema) => {
          appendSchemaByField(schema)
        })
        updateSchema({ field: 'cancellationTime', label:'发布时间'});
      }else if(nval === 'four'){

        filterFormConfig.rejectColumns.forEach((schema) => {
          appendSchemaByField(schema)
        })
        updateSchema({ field: 'cancellationTime', label:'取消时间'});
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
    if (values.stratUpdateTime) {
      values.stratUpdateTime = values.stratUpdateTime + ' 00:00:00'
      values.endUpdateTime = values.endUpdateTime + ' 23:59:59'
    }
    if (values.stratCreatTime) {
      values.stratCreatTime = values.stratCreatTime + ' 00:00:00'
      values.endCreattime = values.endCreattime + ' 23:59:59'
    }
    if (values.stratCancellationTime) {
      values.stratCancellationTime = values.stratCancellationTime + ' 00:00:00'
      values.endCancellationTime = values.endCancellationTime + ' 23:59:59'
    }
    emiter('submit', { values })
  }
</script>

<style lang="scss" scoped></style>
