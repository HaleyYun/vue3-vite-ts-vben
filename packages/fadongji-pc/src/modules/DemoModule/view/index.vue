<template>
  <div class="page-wrap p-4 bg-white m-4">
    <EraProForm ref="form2" :columns="form2ColumnsConfig" layout="inline" title="测试内页" />
  </div>
</template>
<script lang="ts" setup>
  import EraProForm from '/@/components/EraProForm/EraProForm.vue'
  import EraProFormItem from '/@/components/EraProForm/components/EraProFormItem/EraProFormItem.vue'
  import EraProFormItemInput from '/@/components/EraProForm/components/EraProFormItemInput/EraProFormItemInput.vue'
  import { ref } from 'vue'
  // import EraProFormItemDatePicker from '/@/components/EraProForm/components/EraProFormItemDatePicker/EraProFormItemDatePicker.vue'
  const form2ColumnsConfig = ref([
    {
      name: 'name',
      label: '签约客户名称',
      tooltip: '最长为 24 位',
      placeholder: '请输入名称',
    },
    {
      name: 'name1',
      label: '签约客户名称',
      tooltip: '最长为 24 位',
      placeholder: '请输入名称',
    },
    {
      name: 'name2',
      label: '签约客户名称',
      tooltip: '最长为 24 位',
      placeholder: '请输入名称',
    },
    {
      name: 'name3',
      label: '签约客户名称',
      tooltip: '最长为 24 位',
      placeholder: '请输入名称',
    },
    {
      name: 'name4',
      label: '签约客户名称',
      tooltip: '最长为 24 位',
      placeholder: '请输入名称',
    },
  ])
</script>
