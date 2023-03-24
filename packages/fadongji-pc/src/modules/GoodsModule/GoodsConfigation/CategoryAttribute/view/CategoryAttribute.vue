<template>
  <div >
    <EraTabs :tabsList="tabsList" :tabs-active="activeKey" @tabsChange="tabsChange" />
    <div class=" m-24px mt-72px">
      <SkuTable v-if="activeKey == 'sku'" />
      <ParamsTable v-if="activeKey == 'param'" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  import SkuTable from './SkuTable.vue'
  import ParamsTable from './ParamsTable.vue'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'

  const activeKey = ref('sku')
  const tabsList = ref([
    { key: 'sku', name: '规格属性', totalCount: 0 },
    { key: 'param', name: '参数属性', totalCount: 0 }
  ])
  const tabsChange = (key)=>{
    activeKey.value = key;
  }
</script>
<style lang="less" scoped></style>
