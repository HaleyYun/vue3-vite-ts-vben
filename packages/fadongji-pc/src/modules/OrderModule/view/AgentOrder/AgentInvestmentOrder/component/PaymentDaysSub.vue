<template>
  <AModal
    v-model:visible="show"
    title="账期应付款明细"
    centered
    :width="572"
    destroy-on-close
    @cancel="cancelHandler"
  >
    <div class="padding-24 max-h-70vh overflow-y-auto">
      <div class="mb-10px"
        >本次订单账期总额：{{ accountAmount ? accountAmount : '--' }}
      </div>
      <ATable :dataSource="list" :columns="TableColumn" :pagination="false" />
    </div>
    <template #footer>
      <div class="flex justify-center	 ">
        <AButton type="primary" @click="cancelHandler">关闭</AButton>
      </div>
    </template>
  </AModal>
</template>

<script lang="ts" setup>
  import { ref, defineProps, watch, defineEmits } from 'vue'

  const emits = defineEmits(['update:deliveryVisible'])

  const props = defineProps({
    visible: {
      default: false,
      type: Boolean,
    },
    accountAmount: {
      default: '',
      type: String,
    },
    list: {
      default: [],
      type: Array,
    },
  })

  const show = ref(props.visible)
  const TableColumn = [
    {
      title: '预计还款日',
      dataIndex: 'accountTime',
      ellipsis: true,
      width: '120px',
    },
    {
      title: '预计还款金额',
      dataIndex: 'accountAmount',
      ellipsis: true,
      width: '120px',
    },
  ]

  watch(
    () => props.visible,
    (v) => {
      show.value = v
    },
  )

  const cancelHandler = () => {
    show.value = false
    emits('update:deliveryVisible', false)
  }
</script>

<style scoped lang="less"></style>
