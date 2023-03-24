<template>
  <div class='component-container'>
    <div class='bgColor-#fafafa h-40'>
      <slot name='title'></slot>
    </div>
    <div class='table'>
      <slot name='content'></slot>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'EraFinancialTable',
  setup() {

  }
})

</script>