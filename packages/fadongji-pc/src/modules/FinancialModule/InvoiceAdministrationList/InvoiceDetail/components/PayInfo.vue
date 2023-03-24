<template>
  <a-descriptions :column="3">
    <a-descriptions-item v-for="(item, index) of descData" :key="index" :label="item.label">
      <template v-if="item.field == 'pay_price'">
        <div class="text-red-500">{{ payInfo.amount }}元</div>
      </template>
      <template v-else> {{ payInfo[item.field] }}</template>
    </a-descriptions-item>
    <div v-if="payInfo.payType == 2" class="text-red-500 py-10px"
      >失败原因：服务相应超时，系统自动取消本次结算操作。</div
    >
  </a-descriptions>
</template>

<script lang="ts" setup>
  import { ref, defineProps } from 'vue'
  defineProps({
    descData: {
      type: Array,
      default: [],
    },
    payInfo: {
      type: Object,
      default: {},
    },
  })
</script>

<style scoped lang="less"></style>
