<template>
  <a-descriptions :column="3" title="回收垫付明细">
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
      <template v-if="item.field == 'statusName'">
        <span v-if="payInfo.advancesStatus === 0">未垫付</span>
        <span v-else-if="payInfo.advancesStatus === 1">垫付成功</span>
        <span v-else>垫付失败</span>
      </template>
      <template v-else-if="item.field == 'debitPhone'">
        <span v-if="payInfo.relationType === '修理厂'">{{ payInfo.garageInfo.userName }}</span>
        <span v-else-if="payInfo.relationType === '集师傅'">{{
          payInfo.technicianInfo.userName
        }}</span>
        <span v-else>平台</span>
      </template>
      <!-- <template v-else-if="item.field == 'relationType'">
        <span v-if="payInfo.relationType === '修理厂'">{{ payInfo.garageInfo.storeName }}</span>
        <span v-else-if="payInfo.relationType === '集师傅'">{{ payInfo.technicianInfo.realName }}</span>
        <span v-else>平台</span>
      </template> -->
      <template v-else> {{ payInfo[item.field] }}</template>
    </a-descriptions-item>
  </a-descriptions>
</template>

<script lang="ts" setup>
  import { defineComponent, ref, defineProps } from 'vue'
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
