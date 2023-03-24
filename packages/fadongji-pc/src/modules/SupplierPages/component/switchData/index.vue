<template>
  <a-tabs v-model:activeKey="activeKey" type="card" @change="changeEvent">
    <a-tab-pane
      v-for="item of sliderData"
      v-model:class="getSliderClass"
      :key="item.index"
      :tab="item.title"
    />
  </a-tabs>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue'
  const props = {
    space: { type: Number, default: 10 },
    sliderData: {
      type: Array,
      default() {
        return []
      },
    },
  }
  export default defineComponent({
    name: 'SwitchData',
    inheritAttrs: false,
    props,
    emits: ['swichEevnt'],
    setup(props, { emit }) {
      const getSliderClass = ref([{ 'padding-left': props + 'px' }])
      const switchDatas = reactive({
        sliderData: props.sliderData,
        activeKey: props.sliderData.length > 0 ? 1 : '',
      })
      const changeEvent = (item) => {
        switchDatas.activeKey = item
        emit('swichEevnt', item)
      }
      return {
        switchDatas,
        getSliderClass,
        changeEvent,
      }
    },
  })
</script>
