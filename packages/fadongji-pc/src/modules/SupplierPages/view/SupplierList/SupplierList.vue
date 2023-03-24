<template>
  <div>
    <SupplyForm />
    <SupplyTable />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import SupplyTable from '/@/modules/SupplierPages/component/SupplyTable.vue'
  import SupplyForm from '/@/modules/SupplierPages/component/SupplyForm.vue'
  export default defineComponent({
    components: { SupplyForm, SupplyTable },
    setup() {
      return {}
    },
  })
</script>

<style lang="less" scoped></style>
