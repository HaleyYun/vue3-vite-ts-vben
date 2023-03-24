<template>
  <div class="comp-wrap">
    <AInput :style="{ width }" @change="handlerInpoutChange" :placeholder="placeholder" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import defaultConfig from '/@/components/EraProForm/libs/defaultConfig'

  export default defineComponent({
    props: {
      modelValue: String,
      placeholder: {
        type: String,
        default: '请输入该值',
      },
      width: {
        type: [String, Number],
        default: defaultConfig.DEFAULT_FORM_EL_WIDTH,
      },
    },
    emits: ['update:modelValue'],
    methods: {
      handlerInpoutChange(e: KeyboardEvent) {
        const targetValue = (e.target as HTMLInputElement).value
        console.log(targetValue)
        this.$emit('update:modelValue', targetValue)
      },
    },
  })
</script>

<style lang="scss" scoped></style>
