<template>
  <a-descriptions :column="3" title="退款垫付明细">
    <a-descriptions-item
      v-for="(item, index) of descData"
      :key="index"
      :label="item.label"
      :span="item.span"
    >
      <template v-if="item.field == 'pay_price'">
        <span class="text-red-600">{{ payInfo.amount }}元</span>
      </template>
      <template v-if="item.field == 'pay_results'">
        <span v-if="payInfo.status === '1'">未收款</span>
        <span v-if="payInfo.status === '2'">已收款</span>
      </template>
      <template v-else> {{ payInfo[item.field] }}</template>
    </a-descriptions-item>
  </a-descriptions>
</template>

<script lang="ts" setup>
  import { defineProps } from 'vue'
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
