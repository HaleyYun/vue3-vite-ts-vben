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
  import {
    filterFormSchemasByAwait,
    hasNoneData,
    accessGoneData,
    hasViolationData,
    lastGoneData,
  } from '/@/modules/GoodsModule/GoodsManage/view/GoodsServiceProvider/data/ServiceFiterColumns'
  import { BasicForm, FormSchema } from '/@/components/Form'
  import { createFormRegisterInstance } from '/@/components/Form/src/helper'
  import { sleep } from '/@/utils/dateUtil'

  const props = defineProps({
    currentTabIndex: {
      type: String,
      default: '',
    },
  })

  let showFilterForm = ref(false)
  let formRegister = ref()
  const [registerDefaultConfig, {updateSchema,resetFields, appendSchemaByField, removeSchemaByFiled, getFieldsValue }] =
    createFormRegisterInstance({
      schemas: filterFormSchemasByAwait,
      labelWidth: 120,
      actionColOptions: { span: 24 },
      baseColProps: { span: 8 }, // 配置所有选子项的 ColProps，不需要逐个配置，子项也可单独配置优先与全局
      fieldMapToTime: [
        ['searchTime', ['updateStartTime', 'updateEndTime'], 'YYYY-MM-DD'],
        ['logTime', ['logCreateEndTime', 'logCreateStartTime'], 'YYYY-MM-DD']
      ],
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
        ...hasNoneData,
        ...accessGoneData,
        ...hasViolationData,
        ...lastGoneData,
      ]
      fullFiledList.forEach((schema) => {
        removeSchemaByFiled(schema.field)
      })
      appendSchema(lastGoneData);
      resetFields();
      // switch (nval) {
      //       case 'one':
      //           appendSchema(lastGoneData);
      //           break;
      //       case 'two':
      //           appendSchema(hasNoneData);
      //           appendSchema(accessGoneData);
      //           updateTime('上架时间');
      //           break;
      //       case 'three':
      //           appendSchema(accessGoneData);
      //           updateTime('下架时间');
      //           break;
      //       case 'four':
      //           appendSchema(accessGoneData);
      //           updateTime('违规时间');
      //           break;
      //
      //   }

    },
    {
      immediate: true,
    },
  )

  const appendSchema = (data) =>{
      data.forEach((schema) => {
          appendSchemaByField(schema, 'phone')
      })
  };

  const updateTime = (label) =>{
      removeSchemaByFiled('searchTime');
      updateSchema({field: 'logTime', label: label})
  };

  const emiter = defineEmits(['rest', 'submit'])

  const handlerFilterRest = () => {
    emiter('rest', { values: getFieldsValue() })
  }
  const handlerFilterSubmit = (values) => {
    let data = values
    if (data.updateStartTime) {
      data.updateStartTime = data.updateStartTime + ' 00:00:00'
      data.updateEndTime = data.updateEndTime + ' 23:59:59'
    }
    if (data.logCreateStartTime) {
      data.logCreateStartTime = data.logCreateStartTime + ' 00:00:00'
      data.logCreateEndTime = data.logCreateEndTime + ' 23:59:59'
    }
    console.log(values)
    emiter('submit', { values })
  }
</script>

<style lang="scss" scoped></style>
