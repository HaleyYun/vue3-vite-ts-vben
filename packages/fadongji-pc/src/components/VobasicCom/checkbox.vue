<template>
  <div :style="{ borderBottom: '1px solid #E9E9E9' }">
    <Checkbox v-model:checked="checkAll" :indeterminate="indeterminate" @change="onCheckAllChange">
      全选
    </Checkbox>
  </div>
  <br />
  <CheckboxGroup v-model:value="checkedList" :options="plainOptions" />
</template>
<script lang="ts">
  import { Checkbox } from 'ant-design-vue'
  import { defineComponent, reactive, toRefs, watch } from 'vue'
  const plainOptions = ['苹果', '橘子', '菠萝']
  export default defineComponent({
    components: { Checkbox, CheckboxGroup: Checkbox.Group },
    setup() {
      const state = reactive({
        indeterminate: true,
        checkAll: false,
        checkedList: ['苹果', '橘子'],
      })

      const onCheckAllChange = (e: any) => {
        Object.assign(state, {
          checkedList: e.target.checked ? plainOptions : [],
          indeterminate: false,
        })
      }
      watch(
        () => state.checkedList,
        (val) => {
          state.indeterminate = !!val.length && val.length < plainOptions.length
          state.checkAll = val.length === plainOptions.length
        },
      )

      return {
        ...toRefs(state),
        plainOptions,
        onCheckAllChange,
      }
    },
  })
</script>
