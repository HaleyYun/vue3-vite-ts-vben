<template>
    <BasicForm
      ref="opForm"
      @register="formRegister"
      @submit="handlerFilterSubmit"
      @reset="handlerFilterRest"
    />

  </template>

  <script setup lang="ts">
    import { watch, defineProps, defineEmits, ref, nextTick,defineExpose } from 'vue'

    import { BasicForm, FormSchema } from '/@/components/Form'
    import { createFormRegisterInstance } from '/@/components/Form/src/helper'

    import { sleep } from '/@/utils/dateUtil'
    import { filterFormConfig } from '../../ConsignmentGoods/data/ConsignmentData'

    const props = defineProps({
      currentTabIndex: {
        type: String,
        default: '',
      },
    })

    let showFilterForm = ref(false)
    let formRegister = ref()
    const [
      registerDefaultConfig,
      { updateSchema, appendSchemaByField, removeSchemaByFiled, getFieldsValue },
    ] = createFormRegisterInstance({
      schemas: filterFormConfig.baseColumns,
      labelWidth: 130,
      baseColProps: { span: 8 }, // 配置所有选子项的 ColProps，不需要逐个配置，子项也可单独配置优先与全局
      actionColOptions: { span: 8 }, // 操作按钮外层 Col 组件配置，offset 偏移多少
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





    const  searchFn=()=>{

      return getFieldsValue()
    }



    defineExpose({
      searchFn
    })
  </script>

  <style lang="scss" scoped></style>
