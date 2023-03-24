<template>
  <div class="flex pb-10px border-b-none justify-between items-center">
    <div class="title-strip-sort flex flex-vertical-c">
      <VoIcon name="category" :size="20" />
      共{{ total }}条数据
    </div>

    <div>
      <slot name="tableEdit"></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, defineProps } from 'vue'
  import VoIcon from '/@/components/VoIcon/VoIcon.vue'
  export default defineComponent({
    components: { VoIcon },
    props: {
      total: {
        type: Number || String,
        default: 0,
      },
    },
  })
</script>

<style scoped lang="less"></style>
