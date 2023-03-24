<template>
  <BasicForm
    ref="opForm"
    @register="formRegister"
    @submit="handlerFilterSubmit"
    @reset="handlerFilterRest"
  />
</template>

<script setup lang="ts">
  import { watch, defineProps, defineEmits, ref, nextTick, reactive } from 'vue'

  import { BasicForm, FormSchema } from '/@/components/Form'
  import { createFormRegisterInstance } from '/@/components/Form/src/helper'

  import { sleep } from '/@/utils/dateUtil'
  import { filterFormConfig } from '/@/modules/OrderModule/view/AgentOrder/AgentAfterSalesOrder/data/AgentAfterContainerData'

  const props = defineProps({
    currentTabIndex: {
      type: String,
      default: '',
    },
  })

  const actionColOptions = reactive({ span: 8, offset: 16 }) // 操作按钮外层 Col 组件配置，offset 偏移多少

  let showFilterForm = ref(false)
  let formRegister = ref()
  const [
    registerDefaultConfig,
    { appendSchemaByField, setProps, removeSchemaByFiled, getFieldsValue },
  ] = createFormRegisterInstance({
    schemas: filterFormConfig.baseColumns,
    labelWidth: 120,
    autoSubmitOnEnter: true,
    actionColOptions: actionColOptions, // 操作按钮外层 Col 组件配置，offset 偏移多少
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

        await setProps({
          actionColOptions: { span: 8, offset: 16 },
        })
        filterFormConfig.rejectColumns.forEach((schema) => {
          appendSchemaByField(schema, 'phone')
        })
      }
      if (nval === 'two') {
        await setProps({
          actionColOptions: { span: 8, offset: 0 },
        })
        filterFormConfig.accessColumns.forEach((schema) => {
          appendSchemaByField(schema, 'phone')
        })
      }
      if (nval === 'three') {
        // filterFormConfig.rejectColumns.forEach((schema) => {
        //   appendSchemaByField(schema, 'phone')
        // })
        await setProps({
          actionColOptions: { span: 8, offset: 0 },
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
</script>

<style lang="scss" scoped></style>
