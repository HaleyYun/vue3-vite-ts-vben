<template>
  <BasicForm
    ref="opForm"
    @register="formRegister"
    @submit="handlerFilterSubmit"
    @reset="handlerFilterRest"
  >
  </BasicForm>
</template>

<script setup lang="ts">
  import { watch, defineProps, defineEmits, ref, nextTick } from 'vue'
  import {
    filterFormSchemasByAwait,
    submitData,
    accessGoneData,
    hasViolationData,
    lastGoneData,
  } from '/@/modules/GoodsModule/GoodsManage/view/GoodsApply/data/ApplyFiterColumns'
  import { BasicForm, FormSchema } from '/@/components/Form'
  import { createFormRegisterInstance } from '/@/components/Form/src/helper'
  import { sleep } from '/@/utils/dateUtil'
  import { _ } from '@vocen/shared'
  import adminHttp from '/@/utils/http/adminHttp'
  import { useRoute } from 'vue-router'

  const props = defineProps({
    currentTabIndex: {
      type: String,
      default: '',
    },
  })
  const route = useRoute()

  let showFilterForm = ref(false)
  let formRegister = ref()
  const [
    registerDefaultConfig,
    {
      resetFields,
      appendSchemaByField,
      removeSchemaByFiled,
      updateSchema,
      getFieldsValue,
      setFieldsValue,
    },
  ] = createFormRegisterInstance({
    schemas: filterFormSchemasByAwait,
    labelWidth: 120,
    actionColOptions: { span: 24 },
    baseColProps: { span: 8 }, // 配置所有选子项的 ColProps，不需要逐个配置，子项也可单独配置优先与全局
    fieldMapToTime: [
      ['searchTime', ['updateStartTime', 'updateEndTime'], 'YYYY-MM-DD'],
      ['logTime', [ 'logCreateStartTime','logCreateEndTime'], 'YYYY-MM-DD'],
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

      // let schemas: FormSchema[] = []
      const fullFiledList: FormSchema[] = [
        ...accessGoneData,
        ...hasViolationData,
        ...lastGoneData,
      ]
      fullFiledList.forEach((schema) => {
        removeSchemaByFiled(schema.field)
      })
      appendSchema(lastGoneData)
      resetFields()
      // switch (nval) {
      //   case 'one':
      //     appendSchema(lastGoneData)
      //     break
      //   case 'two':
      //     appendSchema(submitData)
      //     appendSchema(accessGoneData)
      //     updateTime('提交时间')
      //     break
      //   case 'three':
      //     appendSchema(accessGoneData)
      //     updateTime('审核时间')
      //     break
      //   case 'four':
      //     appendSchema(accessGoneData)
      //     updateTime('上架时间')
      //     break
      //   case 'five':
      //     appendSchema(accessGoneData)
      //     updateTime('下架时间')
      //     break
      //   case 'six':
      //     appendSchema(accessGoneData)
      //     updateTime('违规时间')
      //     break
      // }
    },
    {
      immediate: true,
    },
  )
  const fetching = ref(false)
  const sellerData = ref([])
  const emiter = defineEmits(['rest', 'submit'])

  if (route?.query?.id) {
    setTimeout(() => {
      setFieldsValue({ shopId: sellerData.value[0] })
      emiter('submit', { values: { shopId: sellerData.value[0] } })
    }, 1000)
  }

  const appendSchema = (data) => {
    data.forEach((schema) => {
      appendSchemaByField(schema, 'phone')
    })
  }

  const updateTime = (label) => {
    removeSchemaByFiled('searchTime')
    updateSchema({ field: 'logTime', label: label })
  }

  const handlerFilterRest = () => {
    updateSchema({
      field: 'categoryType',
      componentProps: {
        params:{categoryId:''},
      },
    })
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
    emiter('submit', { values })
  }
</script>

<style lang="scss">
  ::v-deep(.ant-form-item):nth-last-of-type(1) {
    margin-bottom: 0;
  }
</style>
