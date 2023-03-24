<template>
  <EraProForm
    :title="titles"
    modal-width="520px"
    layout="inline"
    mode="modal"
    cancelButtonText="取消"
    @submit="handlerOpFormSave"
    @rest="resetFields"
    ref="ParamPopEditFormRef"
  >
    <template #modalButton>
      <slot name="triggerBtn"></slot>
    </template>
    <template #formContainer>
      <div class="p-4">
        <BasicForm
          ref="opForm"
          @register="register"
          @submit="handleSubmit"
          @reset="handlerOpFormRest"
        />
      </div>
    </template>
  </EraProForm>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import { BasicForm, FormSchema, useForm } from '/@/components/Form'
  import { useMessage } from '/@/hooks/web/useMessage'
  import EraProForm from '/@/components/EraProForm/EraProForm.vue'
  import { handleViolationFormEditOrInsert } from '/@/modules/OrderModule/view/SupplierOrder/AfterSalesOrder/data/AfterEdit'

  defineProps({
    titles: {
      type: String,
      default: '新增',
    },
    confirmButtonText: {
      type: String,
      default: '保存',
    },
  })
  const { createMessage } = useMessage()
  // 弹框ref ParamPopEditFormRef
  const ParamPopEditFormRef = ref()

  let imgs = ref<string[]>([])
  let video = ref('')
  const uploadCommonParams = {}

  const onUploadProgress = function (evt) {
    // console.log(evt)
  }

  const handleChange = () => {}

  const handleSubmit = (values: any) => {
    createMessage.success('click search,values:' + JSON.stringify(values))
    ParamPopEditFormRef.value.hiddenModal()
  }
  const schemas: FormSchema[] = handleViolationFormEditOrInsert
  const [register, { submit: opFormSubmitFunc, resetFields }] = useForm({
    labelWidth: 120,
    schemas: schemas,
    showSubmitButton: false,
    showResetButton: false,
  })

  const handlerOpFormSave = async () => {
    await opFormSubmitFunc().catch((err) => {
      console.log(err, 'form表单校验失败')
    })
  }
  const handlerOpFormRest = () => {
    console.log(3333333)
    // console.log('333333')
    // ParamPopEditFormRef.value.hiddenModal()
  }
</script>
<style scoped lang="less"></style>
