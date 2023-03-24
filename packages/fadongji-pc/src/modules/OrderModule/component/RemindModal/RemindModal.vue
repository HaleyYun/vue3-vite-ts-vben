<template>
  <AModal
    v-model:visible="show"
    title="提醒发货记录"
    centered
    :footer="null"
    :width="572"
    destroy-on-close
    @cancel="cancelHandler"
  >
    <div class="padding-24 max-h-70vh overflow-y-auto">
      <div class="mb-10px"
        >订单承诺发货时间：{{ predictDeliveryTime ? predictDeliveryTime : '--' }}前发货
      </div>
      <ATable :dataSource="remindDeliveryList" :columns="DeliveryTableColumn" :pagination="false" />
    </div>
  </AModal>
</template>

<script lang="ts" setup>
  import { ref, defineProps, watch, defineEmits } from 'vue'
  import { DeliveryTableColumn } from './data'

  const emits = defineEmits(['update:deliveryVisible'])

  const props = defineProps({
    deliveryVisible: {
      default: false,
      type: Boolean,
    },
    predictDeliveryTime: {
      default: '',
      type: String,
    },
    remindDeliveryList: {
      default: [],
      type: Array,
    },
  })

  const show = ref(props.deliveryVisible)

  watch(
    () => props.deliveryVisible,
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
