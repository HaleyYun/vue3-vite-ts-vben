<template>
  <Form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" class="components-form">
    <FormItem label="创建用户">
      <Input v-model:value="formState.name" />
    </FormItem>
    <FormItem label="开关">
      <Switch v-model:checked="formState.delivery" />
    </FormItem>
    <FormItem label="多选">
      <CheckboxGroup v-model:value="formState.type">
        <Checkbox value="1" name="type">红色</Checkbox>
        <Checkbox value="2" name="type">黄色</Checkbox>
        <Checkbox value="3" name="type">蓝色</Checkbox>
      </CheckboxGroup>
    </FormItem>
    <FormItem label="单选">
      <RadioGroup v-model:value="formState.resource">
        <Radio value="1">星星</Radio>
        <Radio value="2">月亮</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem label="内容">
      <Input v-model:value="formState.desc" type="textarea" />
    </FormItem>
    <FormItem :wrapper-col="{ span: 14, offset: 4 }">
      <Button type="primary" @click="onSubmit">确认</Button>
      <Button style="margin-left: 10px">取消</Button>
    </FormItem>
  </Form>
</template>
<script lang="ts">
  import { defineComponent, reactive, toRaw } from 'vue'
  import { Form, Button, Radio, Input, Switch, Checkbox } from 'ant-design-vue'
  import type { UnwrapRef } from 'vue'

  interface FormState {
    name: string
    delivery: boolean
    type: string[]
    resource: string
    desc: string
  }
  export default defineComponent({
    components: {
      Form,
      FormItem: Form.Item,
      Button,
      Radio,
      Input,
      RadioGroup: Radio.Group,
      Switch,
      Checkbox,
      CheckboxGroup: Checkbox.Group,
    },
    setup() {
      const formState: UnwrapRef<FormState> = reactive({
        name: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      })
      const onSubmit = () => {
        console.log('submit!', toRaw(formState))
      }
      return {
        labelCol: { style: { width: '150px' } },
        wrapperCol: { span: 14 },
        formState,
        onSubmit,
      }
    },
  })
</script>
<style>
  .components-form {
    margin: 20px auto;
  }
</style>
