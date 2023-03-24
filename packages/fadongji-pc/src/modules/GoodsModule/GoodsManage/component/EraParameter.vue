<template>
  <a-modal
    v-model:visible="visible"
    :footer="null"
    width="600px"
    title="B15荣光黑色OCV阀参数信息:"
    @ok="handleOk"
  >
    <div class="p-5">
      <a-form
        ref="formRef"
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 10 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="排量"
          name="displacement"
          :rules="[{ required: true, message: '请选择排量' }]"
        >
          <a-select
            ref="select"
            v-model:value="formState.displacement"
            :options="displacementData"
            @focus="displacementFocus"
            @change="displacementChange"
          />
          <!-- <a-input v-model:value="formState.displacement" /> -->
        </a-form-item>

        <a-form-item
          label="压缩比"
          name="compression"
          :rules="[{ required: true, message: '请选择压缩比' }]"
        >
          <a-input v-model:value="formState.compression" />
        </a-form-item>
        <a-form-item label="最大功率" name="power">
          <a-input v-model:value="formState.power" placeholder="请录入" />
        </a-form-item>
        <a-form-item label="最大扭矩" name="torque">
          <a-input v-model:value="formState.torque" placeholder="请录入" />
        </a-form-item>
        <a-form-item
          label="排量"
          name="displacement"
          :rules="[{ required: true, message: '请选择排量' }]"
        >
          <a-input v-model:value="formState.displacement" />
        </a-form-item>

        <a-form-item
          label="压缩比"
          name="compression"
          :rules="[{ required: true, message: '请选择压缩比' }]"
        >
          <a-input v-model:value="formState.compression" />
        </a-form-item>
        <a-form-item label="最大功率" name="power">
          <a-input v-model:value="formState.power" placeholder="请录入" />
        </a-form-item>
        <a-form-item label="最大扭矩" name="torque">
          <a-input v-model:value="formState.torque" placeholder="请录入" />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 8, span: 10 }">
          <a-button type="primary" class="cancel-btn" @click="cancel">取消</a-button>
          <a-button type="primary" html-type="submit">提交</a-button>
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>
<script lang="ts">
  import type { SelectProps } from 'ant-design-vue'
  import type { FormInstance } from 'ant-design-vue'
  import { defineComponent, reactive, ref } from 'vue'

  interface FormState {
    displacement: string
    compression: string
    power: string
    torque: string
  }

  export default defineComponent({
    emits: ['update:visible'],
    setup(_, { emit }) {
      const displacementData = ref<SelectProps['options']>([
        {
          value: '1.3L',
          label: '1.3L',
        },
        {
          value: '1.5L',
          label: '1.5L',
        },
        {
          value: '1.8L',
          label: '1.8L',
        },
        {
          value: '2.0L',
          label: '2.0L',
        },
      ])
      const formRef = ref<FormInstance>()
      const displacementFocus = () => {
        console.log('displacementFocus')
      }

      const displacementChange = (value: string) => {
        console.log(`selected ${value}`)
      }
      const formState = reactive<FormState>({
        displacement: '',
        compression: '',
        power: '',
        torque: '',
      })
      const onFinish = (values: any) => {
        console.log('Success:', values)
        emit('update:visible', false)
        formRef.value.resetFields()
      }

      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
      }
      //对话框
      const visible = ref<boolean>(false)
      const handleOk = (e: MouseEvent) => {
        console.log(e)
        visible.value = false
      }
      const cancel = () => {
        emit('update:visible', false)
        // visible.value = true
        formRef.value.resetFields()
      }
      const showModal = () => {
        visible.value = true
      }
      return {
        formState,
        onFinish,
        onFinishFailed,
        //选择器
        displacementData,
        displacementFocus,
        displacementChange,
        //对话框
        handleOk,
        cancel,
        visible,
        showModal,
        formRef,
      }
    },
  })
</script>
<style lang="less" scoped>
  .cancel-btn {
    margin-right: 100px;
  }
</style>
