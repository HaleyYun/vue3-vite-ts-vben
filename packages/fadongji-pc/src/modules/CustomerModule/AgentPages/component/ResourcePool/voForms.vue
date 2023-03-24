<template>
  <a-form
    name="dynamic_form_item"
    :model="dynamicValidateForm"
    style="width: 60%; margin-left: 20px"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 16 }"
    labelAlign="left"
    ref="formRef"
  >
    <a-form-item
      v-for="(domain, index) in dynamicValidateForm.domains"
      :key="domain.key"
      :label="domain.label"
      :name="['domains', index, 'value']"
      :rules="{
        required: true,
        message: domain.rule,
        trigger: 'change',
      }"
    >
      <a-input
        v-model:value="domain.value"
        :placeholder="domain.placeholder"
        style="width: 240px; height: 40px; margin-right: 8px"
      />
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
  import { defineComponent, onMounted, reactive, ref } from 'vue'
  import { FormInstance } from 'ant-design-vue'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  interface Domain {
    value: string
    rule: string
    label: string
    placeholder: string
    ruleName: string
    key: string
  }

  interface isStatus {
    status: Boolean
  }

  export default defineComponent({
    props: {
      itemData: Object,
    },
    setup(props) {
      const isStatus = reactive<isStatus>({
        status: false,
      })
      const formRef = ref<FormInstance>()
      const dynamicValidateForm = reactive<{ domains: Domain[] }>({
        domains: [],
      })
      onMountedOrActivated(() => {
        dynamicValidateForm.domains = props.itemData
      })
      const submitForm = () => {
        return new Promise(function (resolve, reject) {
          formRef.value
            .validate()
            .then(() => {
              // console.log('valuesvalues', dynamicValidateForm.domains)
              // isStatus.status = true
              resolve(dynamicValidateForm.domains)
            })
            .catch((error) => {
              // console.log('error', error)
              // isStatus.status = false
              // localStorage.setItem('complete', '0')
              reject(error)
            })
        })
      }
      return {
        submitForm,
        dynamicValidateForm,
        formRef,
        isStatus,
      }
    },
  })
</script>
<style>
  .dynamic-delete-button {
    cursor: pointer;
    position: relative;
    top: 4px;
    font-size: 24px;
    color: #999;
    transition: all 0.3s;
  }

  .dynamic-delete-button:hover {
    color: #777;
  }

  .dynamic-delete-button[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
</style>
