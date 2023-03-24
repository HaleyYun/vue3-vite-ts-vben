<template>
  <div class="component-container">
    <div class="bgColor-#fafafa h-40">
      <slot name="title"></slot>
    </div>
    <div class="table h-120" style='overflow-y: scroll'>
      <slot name="content"></slot>
    </div>
    <div class="h-40 footer">
      <div class="bgColor-#fafafa padding-t-10 padding-b-10">
        <span class="margin-r-5">商品总价:</span><span>¥700.00 </span>
        <span class="margin-r-5"> 运费:</span><span> ¥10.00 </span>
        <span class="margin-r-5">优惠券:</span><span>¥200.00 </span>
        <span class="margin-r-5">订单总金额:</span><span>¥510.00 </span>
        <span class="margin-r-5">支付方式:</span><span>支付宝 </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'EraLinkMoreInformationTable',
    setup() {},
  })
</script>
