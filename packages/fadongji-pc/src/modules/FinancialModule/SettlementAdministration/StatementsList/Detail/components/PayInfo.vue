<template>
  <a-descriptions :column="3" title="结算单明细">
    <a-descriptions-item v-for="(item,index) of descData" :key="index" :label="item.label">
      <template v-if="item.field == 'amount'">
        <span class="text-red-600	">{{payInfo[item.field]}}元</span>
      </template>
      <template v-else-if="item.field == 'type'">
        <span v-if="payInfo.type == 11">销售订单</span>
        <span v-if="payInfo.type == 12">投资订单</span>
        <span v-if="payInfo.type == 13">旧机订单</span>
      </template>
      <template v-else-if="item.field === 'status'">
        <span v-if="payInfo.status == 1">已结算</span>
        <span v-if="payInfo.status == -1">结算异常</span>
      </template>
      <template v-else> {{payInfo[item.field]}}</template>
    </a-descriptions-item>
  </a-descriptions>
  <div v-if="payInfo.status == -1 && payInfo.errorMsg" class="text-red-500 py-10px">原因：{{payInfo.errorMsg}}！</div>


</template>

<script lang="ts" setup>
  import {defineComponent, ref,defineProps} from 'vue';
  defineProps({
    descData:{
      type:Array,
      default: []
    },
    payInfo:{
      type:Object,
      default:{}
    }
  })

</script>

<style scoped lang="less">

</style>
