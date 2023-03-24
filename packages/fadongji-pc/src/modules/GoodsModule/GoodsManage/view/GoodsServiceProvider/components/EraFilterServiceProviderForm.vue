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
  import {
    filterFormSchemasByAwait,
    hasNoneData,
    accessGoneData,
  } from '/@/modules/ContentModule/view/ThinkManager/data/ThinkListContainerData'
  import {
    filterServiceProviderFormByAwait,
    filterDynamicViolations,
  } from '/@/modules/GoodsModule/GoodsManage/view/GoodsServiceProvider/data/serviceProvider'
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
  const [
    registerDefaultConfig,
    { updateSchema, appendSchemaByField, removeSchemaByFiled, getFieldsValue },
  ] = createFormRegisterInstance({
    schemas: filterServiceProviderFormByAwait,
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
        removeSchemaByFiled('InventoryStatus')
        updateSchema({
          field: '[startTime, endTime]',
          label: '最后更新时间',
        })
        // schemas = [...filterServiceProviderFormByAwait]
      }
      if (newValue === 'two') {
        appendSchemaByField(
          {
            field: 'InventoryStatus',
            component: 'Select',
            label: '库存状态',
            colProps: {
              span: 6,
            },
            defaultValue: '1',
            componentProps: {
              placeholder: '请选择库存状态',
              options: [
                {
                  label: '全部',
                  value: '1',
                },
                {
                  label: '库存正常',
                  value: '2',
                },
                {
                  label: '安全库存预警',
                  value: '3',
                },
                {
                  label: '无货',
                  value: '4',
                },
              ],
            },
          },
          'seller',
        )

        updateSchema({
          field: '[startTime, endTime]',
          label: '上架时间',
        })
        // hasNoneData.forEach((schema) => {
        //   appendSchemaByField(schema, 'phone')
        // })
      }
      if (newValue === 'three') {
        removeSchemaByFiled('InventoryStatus')
        updateSchema({
          field: '[startTime, endTime]',
          label: '下架时间',
        })
        // accessGoneData.forEach((schema) => {
        //   appendSchemaByField(schema, 'phone')
        // })
      }
      if (newValue === 'four') {
        removeSchemaByFiled('InventoryStatus')
        updateSchema({
          field: '[startTime, endTime]',
          label: '违规时间',
        })
        // accessGoneData.forEach((schema) => {
        //   appendSchemaByField(schema, 'phone')
        // })
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
