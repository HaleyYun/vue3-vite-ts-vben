<template> <Bpmn /> </template>

<script lang="ts">
  import Bpmn from '/@/components/VoFlow/bpmn.vue'

  import { defineComponent } from 'vue'
  export default defineComponent({
    components: { Bpmn },
    setup() {
      return {}
    },
  })
</script>

<style scoped></style>
