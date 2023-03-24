<template>
  <div class="era-section-by-tab">
    <slot name="header">
      <div class="header">
        <div class="title">{{ title }}</div>
      </div>
    </slot>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
  defineProps({
    title: {
      type: String,
    },
  })
</script>

<style lang="less" scoped>
  .era-section-by-tab {
    .header {
      .title {
        font-size: 14px;
        padding: 4px 0;
        width: 140px;
        text-align: center;
        background: rgba(@primary-color,.8);
        border-radius: 4px 4px 0 0;
        color: #fff;
      }
      border-bottom: 1px solid rgba(@border-color-base,.6);
    }
  }
</style>
