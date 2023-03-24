<template>
  <div class="page-wrap">
    <ATabs v-model:activeKey="activeKey" type="card" @tabsChange="tabsChange">
      <ATabPane :key="1" tab="待开发票">
        <WaitInvoice v-if="activeKey === 1" />
      </ATabPane>
      <ATabPane :key="2" tab="已开发票">
        <AlreadyInvoice v-if="activeKey === 2" />
      </ATabPane>
    </ATabs>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  import WaitInvoice from './WaitInvoice.vue'
  import AlreadyInvoice from './AlreadyInvoice.vue'

  const activeKey = ref(1)
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
