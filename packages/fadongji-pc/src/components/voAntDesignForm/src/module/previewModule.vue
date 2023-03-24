<template>
  <a-modal
    title="预览"
    :visible="visible"
    @cancel="handleCancel"
    wrapClassName="code-modal-9136076486841566"
    style="top: 20px"
    width="850px"
    :destroyOnClose="true"
  >
    <a-form
      :layout="widgetForm?.config.layout"
      :labelAlign="widgetForm?.config.labelAlign"
      :labelCol="widgetForm?.config.labelCol"
      :hideRequiredMark="widgetForm?.config.hideRequiredMark"
    >
      <a-layout-content :class="{ 'widget-empty': widgetForm?.list }">
        <div style="min-height: 300px; padding: 30px">
          <AntdWidgetForm ref="widgetFormRef" v-if="!resetJson" :widgetForm="widgetForm" />
        </div>
      </a-layout-content>
    </a-form>
  </a-modal>
</template>
<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue'
  import AntdWidgetForm from '../core/AntdWidgetForm.vue'
  interface preViewData {
    visible: Boolean
    preViewData: Object
    resetJson: Boolean
  }
  export default defineComponent({
    name: 'PreviewData',
    components: {
      AntdWidgetForm,
    },
    props: {
      widgetForm: {
        type: Object,
      },
    },
    setup() {
      const preState = reactive<preViewData>({
        visible: false,
        preViewData: {},
        resetJson: false,
      })
      const handleCancel = () => {
        // 取消 “预览” 弹框
        preState.visible = false
      }
      const getPreViewData = () => {
        //  预览 “组件”内容
        preState.visible = true
      }
      return {
        ...toRefs(preState),
        handleCancel,
        getPreViewData,
      }
    },
  })
</script>
<style scoped></style>
