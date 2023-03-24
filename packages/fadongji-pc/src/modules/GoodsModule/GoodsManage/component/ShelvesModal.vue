<template>
  <AModal
    v-model:visible="batchShelvesModal.visible"
    :title="batchShelvesModal.title"
    centered
    destroy-on-close
    :confirm-loading="batchShelvesModal.confirmLoading"
    @ok="goodsAdd"
    @cancel="goodsCancel"
  >
    <div class="p-5">
      <AForm
        ref="formRef"
        :model="batchShelvesModal"
        name="basic"
        autocomplete="off"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }"
      >
        <AFormItem label="下架原因" name="goodsReason">
          <ATextarea v-model:value="batchShelvesModal.reason" placeholder="" :rows="8" />
        </AFormItem>
      </AForm>
    </div>
  </AModal>
</template>

<script lang="ts" setup>
  import { ref, reactive, defineProps, defineEmits, watch } from 'vue'
  import { useMessage } from '/@/hooks/web/useMessage'

  const { createMessage } = useMessage()
  const emit = defineEmits(['update:visible', 'change'])
  const props = defineProps({
    visible: {
      type: Boolean,
      default: false,
    },
  })
  // ---批量下架--------
  const batchShelvesModal = reactive({
    visible: false,
    title: '填写下架原因',
    reason: '',
    confirmLoading: false,
  })
  //批量下架确认框
  const goodsAdd = () => {
    if (batchShelvesModal.reason.trim() == '') {
      createMessage.error('请填写下架原因！')
      return
    }
    emit('change', batchShelvesModal.reason)
  }
  //批量下架取消
  const goodsCancel = () => {
    emit('update:visible', false)
  }

  watch(
    () => props.visible,
    (val) => {
      batchShelvesModal.reason = ''
      batchShelvesModal.visible = val
    },
  )
</script>

<style scoped lang="less"></style>
