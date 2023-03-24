<template>
  <div>
    <EraTabs :tabsList="tabsList" :tabs-active="activeKey" @tabsChange="tabsChange" />
    <div class="bg-white m-24px mt-72px">
      <GoodsCategory v-if="activeKey === 1" />
      <GoodsOperation v-if="+activeKey === 2" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import GoodsCategory from '/@/modules/GoodsModule/GoodsConfigation/CategoryManager/view/GoodsCategory.vue'
  import GoodsOperation from '/@/modules/GoodsModule/GoodsConfigation/CategoryManager/view/GoodsOperation.vue'

  const activeKey = ref(1)
  const tabsList = ref([
    { key: 1, name: '商品类别', totalCount: 0 },
    { key: 2, name: '运营类别', totalCount: 0 },
  ])
  const tabsChange = (key) => {
    activeKey.value = key
  }
</script>
<style lang="less" scoped>
  ::v-deep(.ant-tabs-bar) {
    margin: 0 !important;
  }

  .page-wrap {
    margin: 24px;
  }
</style>
