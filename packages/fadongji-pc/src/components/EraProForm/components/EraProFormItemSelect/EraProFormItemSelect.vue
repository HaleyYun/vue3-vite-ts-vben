<template>
  <div class-name="comp-wrap">
    <ASelect
      :style="{ width }"
      :options="formElOptions.options"
      @change="handlerSelectChange"
      :placeholder="placeholder"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, watch } from 'vue'
  import defaultConfig from '/@/components/EraProForm/libs/defaultConfig'

  export default defineComponent({
    name: 'EraProFormItemSelect',
    emits: ['update:modelValue', 'change'],
    props: {
      formElOptions: {
        type: Object,
        default: () => ({ options: [] }),
      },
      placeholder: {
        type: String,
        default: '请输入该值',
      },
      options: {
        type: Array,
        default: ()=> {
          return []
        }
      },
      width: {
        type: [String, Number],
        default: defaultConfig.DEFAULT_FORM_EL_WIDTH,
      },
      value: {
        type: String,
        default: '',
      }
    },
    setup (props, { emit }) {
      console.log('formElOptions.options==', props.formElOptions.options)
      const handlerSelectChange = (targetValue) => {
        console.log('targetValue===', targetValue)
        emit('update:modelValue', targetValue)
        emit('change', targetValue)
      }
      watch(() => props.formElOptions,
          (newValue, oldValue) => {
            console.log(newValue, 'newValue')
          }
      )
      return {
        handlerSelectChange,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
