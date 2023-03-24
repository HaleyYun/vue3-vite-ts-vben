<template>
  <GrowCard />
  <GrowPending />
  <GrowFast />
  <GrowOverview />
  <GrowOrder />
  <GrowSale />
</template>

<script lang="ts">
  import GrowCard from '../component/GrowCard.vue'
  import GrowPending from '../component/growPending.vue'
  import GrowFast from '../component/growFast.vue'
  import GrowOverview from '../component/growOverview.vue'
  import GrowOrder from '../component/growOrder.vue'
  import GrowSale from '../component/growSale.vue'
  import { defineComponent } from 'vue'
  export default defineComponent({
    components: { GrowCard, GrowPending, GrowFast, GrowOverview, GrowOrder, GrowSale },
    setup() {
      return {}
    },
  })
</script>

<style lang="less" scoped></style>
