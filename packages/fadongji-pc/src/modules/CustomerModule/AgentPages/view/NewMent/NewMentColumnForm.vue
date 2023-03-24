<template>
  <div class="resorce-pool-horizon">
    <VoEditColumnForm :itemData="formItem.domains" @get-form-value="getFormEditData" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue'
  import VoEditColumnForm from '/@/modules/CustomerModule/AgentPages/component/VoEditColumnForm.vue'
  import { formLocalData } from '/@/modules/CustomerModule/AgentPages/view/NewMent/NewMentExtentData'
  export default defineComponent({
    name: 'NewMentColumnForm',
    components: { VoEditColumnForm },
    emits: ['getFormValue'],
    setup(props, { emit }) {
      const formItem = reactive({
        domains: formLocalData,
      })
      async function getFormEditData(formValue) {
        emit('getFormValue', formValue)
      }
      return {
        formItem,
        getFormEditData,
      }
    },
  })
</script>
<style scoped></style>
