<template>
  <a-form
    name="dynamic_form_item"
    :model="dynamicValidateForm"
    class="edit-form-layout"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 16 }"
    labelAlign="right"
    ref="formRef"
  >
    <a-form-item
      v-for="(domain, index) in dynamicValidateForm.domains"
      :key="domain.key"
      :label="domain.label"
      :name="['domains', index, 'value']"
      :rules="domain.rule"
    >
      <template v-if="domain.select === true">
        <a-select
          v-model:value="domain.value"
          :placeholder="domain.placeholder"
          style="width: 240px"
          :options="domain.selectArr"
        />
      </template>
      <template v-else-if="domain.select === false && !domain.hasOwnProperty('resource')">
        <a-input
          v-model:value="domain.value"
          :placeholder="domain.placeholder"
          class="edit-form-input"
        />
      </template>
      <template v-else>
        <div v-if="domain.resource === 'multiSelect'">
          <Region />
        </div>
        <div v-else>
          <div :style="setBgColor(domain.src)" class="item-resourcebox__svg"></div>
        </div>
      </template>
    </a-form-item>
  </a-form>
  <button class="form-btn" @click="submitForm">下一步</button>
</template>
<script lang="ts">
  import { defineComponent, onMounted, reactive, ref } from 'vue'
  import { FormInstance } from 'ant-design-vue'
  import Region from '/@/modules/CustomerModule/AgentPages/component/AgentRegion.vue'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  interface Domain {
    value: string
    rule: string
    label: string
    placeholder: string
    ruleName: string
    key: string
    select: Boolean
  }

  interface isStatus {
    status: Boolean
  }

  export default defineComponent({
    name: 'VoEditColumnForm',
    components: { Region },
    props: {
      itemData: Object,
    },
    emits: ['getFormValue'],
    setup(props, { emit }) {
      // const emit = defineEmits(['getFormValue']) //暴露内部方法
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
        formRef.value
          .validate()
          .then(() => {
            emit('getFormValue', dynamicValidateForm.domains)
          })
          .catch((error) => {
            console.log('error=', error)
          })
      }
      const setBgColor = (srcPath) => {
        return { background: 'url(' + srcPath + ') no-repeat center / 90% ' }
      }
      return {
        submitForm,
        setBgColor,
        dynamicValidateForm,
        formRef,
        isStatus,
      }
    },
  })
</script>
<style scoped>
  .form-btn {
    position: relative;
    width: 242px;
    height: 35px;
    margin-left: calc(50% - 121px);
    background-color: #0960bd;
    color: white;
    border-radius: 5px;
  }

  .edit-form-layout {
    width: 60%;
    margin-left: 20px;
  }

  .edit-form-input {
    width: 240px;
    margin-right: 8px;
  }

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

  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    height: 40px;
  }

  .ant-select-single .ant-select-selector .ant-select-selection-item,
  .ant-select-single .ant-select-selector .ant-select-selection-placeholder {
    line-height: 40px;
  }

  .item-resourcebox__svg {
    width: 89px;
    height: 89px;
    flex-shrink: 0; /*去除flex子元素宽度均分问题*/
  }
</style>
