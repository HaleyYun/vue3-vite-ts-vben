<template>
  <BasicForm
    ref="opForm"
    @register="formRegister"
    @submit="handlerFilterSubmit"
    @reset="handlerFilterRest"
  >
    <template #categorySlot="{ model, field }">
      <TreeSelect
        v-model:value="model[field]"
        show-search
        style="width: 100%"
        :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
        placeholder="请选择商品类别"
        allow-clear
        multiple
        :showCheckedStrategy="SHOW_CHILD"
        tree-default-expand-all
        :tree-data="treeData"
      />
    </template>
  </BasicForm>
</template>

<script setup lang="ts">
  import { watch, defineProps, defineEmits, ref, nextTick } from 'vue'
  // filterInvestmentFormByAwait -- 筛选基本项
  import {
    filterInvestmentFormByAwait,
    filterDynamicDoneAssets,
    filterDynamicInProgressAssets,
    filterDynamicRemovedAssets,
    filterDynamicViolationsAssets,
    filterDynamicAllAssets,
    filterDynamicAuditFailedAssets,
    filterDynamicPendingReviewAssets,
  } from '/@/modules/GoodsModule/GoodsInvestmentManagement/view/GoodsInvestmentProject/data/filterGoodsInvestmentFormData'
  import { BasicForm, FormSchema } from '/@/components/Form'
  import { createFormRegisterInstance } from '/@/components/Form/src/helper'
  import { TreeSelect, TreeSelectProps } from 'ant-design-vue'
  import { sleep } from '/@/utils/dateUtil'
  const { SHOW_CHILD } = TreeSelect

  const props = defineProps({
    currentTabIndex: {
      type: String,
      default: '',
    },
  })
  const treeData = ref<TreeSelectProps['treeData']>([
    {
      title: 'parent 1',
      value: 'parent 1',
      disabled: true,
      children: [
        {
          title: 'parent 1-0',
          value: 'parent 1-0',
          disabled: false,
        },
        {
          title: 'parent 1-1',
          value: 'parent 1-1',
          disabled: false,
        },
        {
          disabled: false,
          title: 'parent 1-2',
          value: 'parent 1-2',
        },
      ],
    },
    {
      title: 'parent 2-0',
      value: 'parent 2-0',
      disabled: true,
      children: [
        {
          disabled: false,
          title: 'parent 2-1',
          value: 'parent 2-1',
        },
      ],
    },
  ])
  let showFilterForm = ref(false)
  let formRegister = ref()
  const [registerDefaultConfig, { appendSchemaByField, removeSchemaByFiled, getFieldsValue }] =
    createFormRegisterInstance({
      schemas: filterInvestmentFormByAwait,
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
      const fullFiledList: FormSchema[] = [
        ...filterDynamicDoneAssets,
        ...filterDynamicInProgressAssets,
        ...filterDynamicRemovedAssets,
        ...filterDynamicViolationsAssets,
        ...filterDynamicAllAssets,
        ...filterDynamicAuditFailedAssets,
        ...filterDynamicPendingReviewAssets,
      ]
      fullFiledList.forEach((schema) => {
        removeSchemaByFiled(schema.field)
      })
      if (newValue === 'one') {
        appendSchemaByFieldFunc(filterDynamicAllAssets)
      }
      if (newValue === 'two') {
        appendSchemaByFieldFunc(filterDynamicPendingReviewAssets)
      }
      if (newValue === 'three') {
        appendSchemaByFieldFunc(filterDynamicAuditFailedAssets)
      }
      if (newValue === 'four') {
        appendSchemaByFieldFunc(filterDynamicInProgressAssets)
      }
      if (newValue === 'five') {
        appendSchemaByFieldFunc(filterDynamicRemovedAssets)
      }
      if (newValue === 'six') {
        appendSchemaByFieldFunc(filterDynamicDoneAssets)
      }
      if (newValue === 'seven') {
        appendSchemaByFieldFunc(filterDynamicViolationsAssets)
      }
    },
    {
      immediate: true,
    },
  )
  const appendSchemaByFieldFunc = (dynamicForm: FormSchema[]) => {
    dynamicForm.forEach((item) => {
      appendSchemaByField(item, item.field)
    })
  }

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
