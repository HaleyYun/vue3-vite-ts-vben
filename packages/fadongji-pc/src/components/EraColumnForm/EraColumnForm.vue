<template>
  <Modal v-if="changeVisible" :style='{width: popWidthRef}' v-model:visible="changeVisible" destroyOnClose :title="title">
    <Form class="form-style" ref="formRef" name="dynamic_rule" v-bind="formItemLayout">
      <template v-if="data.length > 0">
        <template v-for="(item, key) in data" :key="key">
          <!-- ocr 显示只有下边框线的样式的input -->
          <template v-if="VoUtils.hasOwn(item, 'isInput') && !VoUtils.hasOwn(item, 'isText')">
            <FormItem
              :label="item.label"
              :name="item.value"
              :rules="[{ required: item.isRequire, message: item.RequireMessage }]"
            >
              <Input
                style="width: 100%"
                v-model:value="item.value"
                :placeholder="item.isPlaceHolder"
                class="form-input"
              />
            </FormItem>
          </template>
          <!-- ocr 显示只有下边框线的样式的text -->
          <template v-else-if="!VoUtils.hasOwn(item, 'isInput') && VoUtils.hasOwn(item, 'isText')">
            <FormItem :label="item.label">
              <span>{{ item.value }}</span>
            </FormItem>
          </template>
          <template v-else>
            <slot name="special" :row="item"></slot>
            <FormItem :label="item.label">
              <div class="content-assets">
                <slot name="content" :row="item"></slot>
              </div>
            </FormItem>
          </template>
        </template>
      </template>
      <template v-else>
        <slot name="NilFileContent"></slot>
      </template>
    </Form>
    <template #footer>
      <AButton :disabled="btnLoading" @click="close">{{ cancelButtonText }}</AButton>
      <AButton type="primary" :loading="btnLoading" :disabled="btnLoading" @click="confirm"
        >{{ confirmButtonText }}
      </AButton>
    </template>
  </Modal>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, watch } from 'vue'
  import type { FormInstance } from 'ant-design-vue'
  import { Form, FormItem, Input, Modal } from 'ant-design-vue'
  import { VoUtils } from '../../../../shared/src/index'
  import AButton from '/@/components/Button/src/BasicButton.vue'

  interface FormState {
    username: string
    nickname: string
    checkNick: boolean
  }

  export default defineComponent({
    name: 'EraColumnForm',
    components: {
      AButton,
      Form,
      FormItem,
      Input,
      Modal,
    },
    props: {
      confirmButtonText: {
        type: String,
        default: '确认',
      },
      cancelButtonText: {
        type: String,
        default: '取消',
      },
      title: {
        type: String,
        default: '',
      },
      data: {
        type: Array,
        default: () => [],
      },
      width: {
        type: Number,
        default: 520,
      },
    },
    emits: ['submit', 'close'],
    setup(props, { emit }) {
      let popWidthRef = ref()
      let changeVisible = ref(false) // changeVisible -- 弹框是否显示
      const modelTitle = ref('') // 弹框标题是否显示
      const formRef = ref<FormInstance>()
      const formState = reactive<FormState>({
        username: '',
        nickname: '',
        checkNick: false,
      })
      const btnLoading = ref(false)
      const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 12 },
      }
      const isOpenAlertShow = () => {
        changeVisible.value = true
      }
      const isCloseAlertShow = () => {
        changeVisible.value = false
      }
      const openBtnLoaidng = () => {
        btnLoading.value = true
      }
      const closeBtnLoaidng = () => {
        btnLoading.value = false
      }
      // 点击确定，结束编辑
      const confirm = () => {
        emit('submit', { formData: props.data, formRef, openBtnLoaidng, closeBtnLoaidng })
        // changeVisible.value = false
      }
      const close = () => {
        popWidthRef.value = 520 + 'px'
        changeVisible.value = false
      }
      watch(
        () => props.width,
        (newVal, _) => {
          popWidthRef.value = newVal + 'px'
        },
        { deep: true, immediate: true },
      )

      return {
        VoUtils,
        confirm,
        close,
        isOpenAlertShow,
        isCloseAlertShow,
        formState,
        formItemLayout,
        formRef,
        popWidthRef,
        changeVisible,
        modelTitle,
        btnLoading,
        openBtnLoaidng,
        closeBtnLoaidng,
      }
    },
  })
</script>
<style lang="less" scoped>
  .form-style {
    margin-left: 30px;
    margin-top: 30px;
  }

  .form-input {
    width: 246px;
  }

  .content-assets {
  }
</style>
