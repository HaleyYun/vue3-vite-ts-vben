<template>
  <div class="page-wrap">
    <ASpace  :style="{width: assetDatePickerCssEvent()}" direction="horizontal">
      <a-radio-group v-model:value="radioValue" :options="options" @change="onChange" />
    </ASpace>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import defaultConfig from '/@/components/EraProForm/libs/defaultConfig'
  export default defineComponent({
    name: 'EraProItemRadioGroup',
    props: {
      options: {
        type: Array,
        default: ()=> {
          return []
        }
      },
      value: {
        type: String,
        default: '',
      }
    },
    emits: ['radioEmit'],
    setup(props, { emit }) {
      let radioValue = ref(props.value)
      const onChange =() => {
        emit('radioEmit', radioValue)
      }
      const assetDatePickerCssEvent =()=> {
        return defaultConfig.DEFAULT_FORM_EL_WIDTH
      }
      return {
        onChange,
        assetDatePickerCssEvent,
        radioValue,
      }
    }
  })
</script>