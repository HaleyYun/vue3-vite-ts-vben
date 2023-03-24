<template>
  <a-modal
    title="预览"
    :footer="null"
    :visible="visible"
    cancelText="关闭"
    :destroyOnClose="true"
    :centered="true"
    :dialogStyle="dialogStyle"
    :bodyStyle="bodyStyle"
    @cancel="handleCancel"
    wrapClassName="k-form-modal"
    style="top: 20px"
    :width="`${previewWidth}px`"
  />
</template>
<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue'
  import { dialogStyle, bodyStyle } from '../../config/model.js'
  interface preViewData {
    visible: Boolean
    previewWidth: Number
  }
  export default defineComponent({
    name: 'PreView',
    props: {},
    setup() {
      const preViewData = reactive<preViewData>({
        visible: false,
        previewWidth: 850,
      })
      const handleCancel = () => {}
      return {
        ...toRefs(preViewData),
        handleCancel, //取消“预览”
        dialogStyle,
        bodyStyle,
      }
    },
  })
</script>
