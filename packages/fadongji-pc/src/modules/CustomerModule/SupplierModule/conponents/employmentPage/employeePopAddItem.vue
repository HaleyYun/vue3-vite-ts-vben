<template>
  <EraProForm
    title="添加员工"
    modal-width="1000px"
    layout="inline"
    mode="modal"
    @submit="handlerOpFormSave"
    @rest="handlerOpFormRest"
  >
    <template #modalButton>
      <AButton type="primary">添加员工</AButton>
    </template>
    <template #formContainer>
      <div class="p-4">
        <BasicForm ref="opForm" @register="register" @submit="handleSubmit">
          <template #roleSlot="{ model, field }">
            <ASelect v-model:value="model[field]" size="size" :options="getRoleApi" />
          </template>
        </BasicForm>
      </div>
    </template>
  </EraProForm>
</template>
<script setup lang="ts">
import { BasicForm, FormSchema, useForm } from '/@/components/Form'
import { useMessage } from '/@/hooks/web/useMessage'
import EraProForm from '/@/components/EraProForm/EraProForm.vue'
import { opFormConfig } from '/@/modules/ContentModule/view/ThinkManager/data/ThinkListContainerData'
import adminHttp from '/@/utils/http/adminHttp'
import { watch } from 'vue'
const { createMessage } = useMessage()
let categoryId = ''
const handleSubmit = (values: any) => {
  createMessage.success('click search,values:' + JSON.stringify(values))
}
const props = defineProps({
  categoryId: {
    type: String,
    default: ''
  }
})
const handlerOpFormRest = () => {}
const schemas: FormSchema[] = opFormConfig
const [register, { submit: opFormSbumitFunc }] = useForm({
  labelWidth: 100,
  baseColProps:{span:8},
  actionColOptions:{span:8},
  schemas: schemas,
  showSubmitButton: false,
  showResetButton: false,
})

watch(() => props.categoryId,(newValue) => {
  categoryId = newValue
},{immediate: true})
const getRoleApi = async () => {
  return new Promise((resolve) => {
    adminHttp.CUSTOMER.apiRoleNum({ categoryId: categoryId })
      .then((res) => {
        resolve(
          res.data.records.map((item) => ({
            label: item.columnName,
            value: item.columnCode,
          })),
        )
      })
      .catch(() => {
        resolve([])
      })
  })
}

const handlerOpFormSave = async () => {
  await opFormSbumitFunc()
}
</script>
<style scoped lang="less"></style>
