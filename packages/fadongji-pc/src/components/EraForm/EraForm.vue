<template>
  <div>
    <Form :label-col="labelCol" :wrapper-col="wrapperCol">
      <FormItem
        v-for="(item, index) of formData"
        :key="index"
        :label="item.label"
        v-bind="item.isRequireInput === true ? validateInfos[item.name] : ''"
      >
        <template v-if="item.type === EraFormEnum.isInputEnum">
          <Input v-model:value="modelRef[item.name]" class="form-width" />
        </template>
        <template v-else>
          <slot name="content" :row="item"></slot>
        </template>
      </FormItem>
      <FormItem>
        <div class="flex-layout">
          <Button type="primary" @click.prevent="onSubmit">确定</Button>
          <Button style="margin-left: 10px" @click="reset">重置</Button>
        </div>
      </FormItem>
    </Form>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, toRaw } from 'vue'
  import { Form, FormItem, Input, Button } from 'ant-design-vue'
  import { EraFormEnum } from '/@/components/EraForm/EraFormEnum'
  const useForm = Form.useForm
  export default defineComponent({
    components: {
      Form,
      FormItem,
      Input,
      Button,
    },
    props: {
      formData: {
        type: Array,
        default: [],
      },
      propsRules: {
        type: Object,
        default: {},
      },
      // hiddenBtn: {
      //   type: Object,
      //   default: false,
      // },
    },
    setup(props) {
      let propsRulesInfo = props.propsRules
      let propsRulesRef = propsRulesInfo?.propsRulesRef
      let propsModelRef = propsRulesInfo?.propsModelRef
      const modelRef = reactive(propsModelRef)
      const rulesRef = reactive(propsRulesRef)
      const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef)
      const onSubmit = () => {
        validate()
          .then((res) => {
            console.log('res====', res)
            console.log(res, toRaw(modelRef))
          })
          .catch((err) => {
            console.log('error', err)
          })
      }
      const reset = () => {
        resetFields()
      }
      return {
        labelCol: { span: 3 },
        wrapperCol: { span: 24 },
        reset,
        onSubmit,
        validateInfos,
        modelRef,
        EraFormEnum,
      }
    },
  })
</script>
<style lang="less" scoped>
  .form-width {
    width: 246px;
  }
  .flex-layout {
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
  }
</style>
