<template>
  <div class="voicon" v-html="svg"></div>
</template>

<script lang="ts" setup>

  import {ref} from "vue";

  const props = defineProps({
    name: {
      type: String,
      default: 'delete'
    },
    size: {
      type: [Number, String],
      default: 30
    },
    color: {
      type: String,
      default: '#22284B'
    },
    whiteColor: {
      type: Array,
      default: () => {
        return []
      }
    }
  })
  import getSvg from '@vocen/era-svg-icons'
  const svg = ref(getSvg(props.name, { size: props.size, color: props.color, whiteColor: props.whiteColor }))
</script>

<style scoped lang="less">
.voicon{
  display: inline-block;
  font-size: 0;
}
</style>
