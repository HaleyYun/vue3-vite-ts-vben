<template>
  <AModal
    v-model:visible="show"
    :title="brandModal.title"
    centered
    destroy-on-close
    :confirm-loading="brandModal.confirmLoading"
    @ok="BrandsAdd"
    @cancel="BrandsCancel"
  >
    <div class="p-5">
      <AForm
        ref="formRef"
        :model="formState"
        name="basic"
        autocomplete="off"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 20 }"
      >
        <AFormItem
          label="选择违规类型"
          name="radioGroup"
          :rules="[{ required: true, message: '请选择违规类型' }]"
        >
          <a-radio-group v-model:value="formState['radioGroup']">
            <a-radio value="1">全网违规</a-radio>
            <a-radio value="2">独立违规</a-radio>
          </a-radio-group>
        </AFormItem>
        <AFormItem
          label="具体违规说明"
          class="text-current"
          name="replyValue"
          :rules="[{ required: true, message: '请填写具体违规说明' }]"
        >
          <ATextarea
            v-model:value="formState.replyValue"
            placeholder="请填写具体违规说明"
            :maxlength="30"
            :rows="6"
          />
        </AFormItem>
      </AForm>
    </div>
  </AModal>
</template>

<script lang="ts" setup>
  import { ref, reactive, defineProps, defineEmits, watch } from 'vue'
  import { useMessage } from '/@/hooks/web/useMessage'

  const emit = defineEmits(['update:visible', 'change'])
  const props = defineProps({
    visible: {
      type: Boolean,
      default: false,
    },
  })
  const show = ref(props.visible)
  //违规审核弹窗状态
  const brandModal = reactive({
    visible: false,
    title: '审核详情',
    confirmLoading: false,
    name: '',
  })
  const formRef = ref<any | undefined>()

  interface FormState {
    replyValue: string
    radioGroup: any
  }

  const formState = reactive<FormState>({
    replyValue: '',
    radioGroup: '',
  })
  //审核确认框
  const BrandsAdd = () => {
    formRef.value.validate().then(async (res) => {
      console.log(res, 'success')
      emit('change', { ...formState })
    })
  }
  //审核框取消
  const BrandsCancel = () => {
    emit('update:visible', false)
  }

  watch(
    () => props.visible,
    (val) => {
      show.value = val
      formState.replyValue = ''
      formState.radioGroup = ''
    },
  )
</script>

<style scoped lang="less"></style>
