<template>
  <div class="page-wrap">
    <a-range-picker :style="{width: assetDatePickerCssEvent()}" @change="onRangeChange" @openChange="emitChange" v-model:value="timeRangeValue" />
  </div>
</template>
<script lang="ts">
import commonPorps from '/@/components/EraProForm/libs/commonPorps'
import defaultConfig from '/@/components/EraProForm/libs/defaultConfig'
import { Dayjs } from 'dayjs';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'EraProFormItemRangeDatePicker',
  props: {
    ...commonPorps,
    splitSign: {
      default: '-',
      type: String,
    },
  },
  emits: ['change','update:modelValue'],
  setup (props, { emit }) {

    const dateFormat = 'YYYY' + props.splitSign + 'MM' + props.splitSign + 'DD';
    const transDateString = ref<any>()
    const originDayjs = ref<any>()
    const timeRangeValue = ref<[Dayjs, Dayjs]>()
    const assetDatePickerCssEvent =()=> {
      return defaultConfig.DEFAULT_FORM_EL_WIDTH
    }
    const onRangeChange = (value: [Dayjs, Dayjs], dateString: [string, string]) => {
      originDayjs.value = value
      transDateString.value = dateString

    }
    const emitChange  =()=> {
      emit('change', {DayjsFormat: originDayjs, stringFormat: transDateString, startDate: transDateString['0'], endDate: transDateString['1']})
      emit('update:modelValue', transDateString)
    }
    return {
      dateFormat,
      timeRangeValue,
      transDateString,
      originDayjs,
      assetDatePickerCssEvent,
      onRangeChange,
      emitChange,
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
