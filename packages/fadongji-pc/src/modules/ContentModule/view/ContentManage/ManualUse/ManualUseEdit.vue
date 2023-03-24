<template>
  <EraColumnForm  :title="modalTitle" :data="modelData"></EraColumnForm>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue'
  import EraColumnForm from "/@/components/EraColumnForm/EraColumnForm.vue";
  import {manualUseEditFormData} from "/@/modules/ContentModule/view/ContentManage/ManualUse/type/type";
  export default defineComponent({
    name: 'ManualUseEdit',
    components: {
      EraColumnForm,
    },
    setup() {
    }
  })
</script>
