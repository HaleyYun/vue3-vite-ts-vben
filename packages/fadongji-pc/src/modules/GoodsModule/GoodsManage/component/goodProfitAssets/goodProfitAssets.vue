<template>
  <EraProForm
    title="设置分润"
    modal-width="1000px"
    layout="inline"
    mode="modal"
    @submit="handlerOpFormSave"
    @rest="handlerOpFormRest"
  >
    <template #modalButton>
      <a type="primary" @click='getValueEvent'>应用</a>
    </template>
    <template #formContainer>
      <div class="p-4">
        <BasicForm ref="opForm" @register="register" @submit="handleSubmit"></BasicForm>
      </div>
    </template>
  </EraProForm>
</template>
<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { BasicForm, FormSchema, useForm } from '/@/components/Form'
  import { useMessage } from '/@/hooks/web/useMessage'
  import EraProForm from '/@/components/EraProForm/EraProForm.vue'
  const { createMessage } = useMessage()
  const handleSubmit = (values: any) => {
    createMessage.success('click search,values:' + JSON.stringify(values))
  }
  const emits = defineEmits(['getData'])
  const handlerOpFormRest = () => {}
  // const props = defineProps({
  //   profitData: Array,
  // })
  const profitData = ref()
  const opFormConfig = []
  const getChildData = (data) => {
    console.log('DataData33333333===', data)
    // data.forEach((item: any) => {
    //   let map = {
    //     field: item.key,
    //     component: 'Input',
    //     label: item.name,
    //     componentProps: {
    //       style: { width: '25%'},
    //       placeholder: '请输入' + item.name ,
    //       onChange: (e) => {
    //         console.log(e)
    //       },
    //     },
    //   }
    //   opFormConfig.push(map)

    // })

  }
  const getValueEvent = () => {
   emits('getData')
  }
  const schemas: FormSchema[] = opFormConfig

  const [register, { submit: opFormSbumitFunc }] = useForm({
    labelWidth: 100,
    schemas: schemas,
    showSubmitButton: false,
    showResetButton: false,
  })
  const handlerOpFormSave = async () => {
    await opFormSbumitFunc()
  }

  const resrouceType = ref('img')
  defineExpose({ getChildData })
</script>
<style scoped lang="less"></style>
