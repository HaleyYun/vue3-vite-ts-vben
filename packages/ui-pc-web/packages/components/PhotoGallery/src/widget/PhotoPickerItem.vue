<template>
  <div class="picker-item">
    <div class="picker-item__block" :class="{ 'active-item': isCheckEd }">
      <span class="block-checkbox" :class="{ selected: isCheckEd }"></span>
      <img src="https://qn.antdv.com/vue.png" class="block-img" />
    </div>
    <div class="picker-item__text">红色旅游等等</div>
  </div>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue'

  defineProps({
    /**
     * 是否选中
     */
    isCheckEd: {
      type: Boolean,
      default: false,
    },
  })
</script>
