<template>
  <div class="page-wrap">
    <div class="bg-white p-24px pb-4px mb-24px">
      <BasicForm
        ref="opForm"
        @register="formRegister"
        @submit="handlerFilterSubmit"
        @reset="handlerFilterRest"
      />
    </div>
    <div class="bg-white p-24px">
      <UserTable ref="userRef" />
    </div>
  </div>
</template>

<script lang="ts">
  import { BasicForm } from '/@/components/Form'
  import { defineComponent, ref } from 'vue'
  import UserTable from './component/UserTable.vue'
  import { createFormRegisterInstance } from '/@/components/Form/src/helper'
  import { filterFormUserAwait } from '/@/modules/UserModule/view/UserList/data'

  export default defineComponent({
    components: { UserTable, BasicForm },
    setup() {
      let userRef = ref()
      let formRegister = ref()
      const registerDefaultConfig = createFormRegisterInstance({
        schemas: filterFormUserAwait,
        baseColProps: { span: 8 },
        actionColOptions: { span: 8,offset:16},
        labelWidth: 120,
        autoSubmitOnEnter: true,
      })
      formRegister.value = registerDefaultConfig
      const handlerFilterSubmit = (values) => {
        console.log(values, 'searchForm')
        userRef.value.refreshUpdateChildTable(values)
      }
      const handlerFilterRest = (values) => {
        userRef.value.refreshUpdateChildTable(values)
      }
      return {
        formRegister,
        userRef,
        handlerFilterSubmit,
        handlerFilterRest,
      }
    },
  })
</script>

<style lang="less" scoped>
  .page-wrap {
    margin: 24px;

    .page-Table {
      padding-top: 15px;
    }
  }
</style>
