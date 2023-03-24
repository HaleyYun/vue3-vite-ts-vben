<template>
  <!-- <input
    class="common-input"
    :style="{
      width: width + 'px',
      height: height + 'px',
      fontSize: fontSize,
      color: color,
      borderRadius: borderRadius + 'px',
      border: border,
      textAlign: textAligns,
      paddingLeft: paddingLeft + 'px',
    }"
    v-model="msg"
    :placeholder="placeholder"
  /> -->
  <a-input v-model:value="value" placeholder="" />
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  export default defineComponent({
    setup() {
      const value = ref()
      return { value }
    },
    // import { defineProps, toRefs } from 'vue';
    // import { inputProps } from './Props';
    // const props = defineProps(inputProps);
    // 解构【props】数据
    // const {
    //   msg,
    //   width,
    //   height,
    //   placeholder,
    //   fontSize,
    //   color,
    //   borderRadius,
    //   border,
    //   paddingLeft,
    //   textAligns,
    // } = toRefs(props);
  })
</script>
<style>
  .common-input:focus {
    border: 1px solid green;
    outline: none;
  }
</style>
