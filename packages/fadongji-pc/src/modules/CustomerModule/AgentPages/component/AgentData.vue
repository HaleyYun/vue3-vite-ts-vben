<template>
  <div class="edit-data">
    <div class="edit-data-list">
      <Form
        :model="formState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :rules="rules"
        ref="formRef"
      >
        <FormItem label="代理商ID:" nameID="nameID">
          <Input disabled v-model:value="formState.nameID" />
        </FormItem>
        <FormItem label="手机号:" phone="phone">
          <Input disabled v-model:value="formState.phone" />
        </FormItem>
        <FormItem label="代理商名称:" name="name">
          <Input v-model:value="formState.name" />
        </FormItem>
        <FormItem label="所属地区:" name="region">
          <AgentRegion />
        </FormItem>

        <FormItem label="详细地址:" name="desc">
          <Input v-model:value="formState.desc" type="textarea" />
        </FormItem>
        <FormItem label="负责人:" name="charge">
          <Input v-model:value="formState.charge" type="textarea" />
        </FormItem>
        <FormItem label="客户运营:" name="operate">
          <Select class="form-select" v-model:value="formState.operate" :options="options" />
        </FormItem>
        <FormItem label="业务代表:" name="merchant">
          <Select class="form-select" v-model:value="formState.merchant" :options="options" />
        </FormItem>
        <br />
        <br />
        <FormItem :wrapper-col="{ offset: 6 }">
          <Button
            @click="onSubmit"
            style="
              width: 242px;
              height: 35px;
              background-color: rgba(26, 188, 156, 1);
              color: #ffffff;
            "
            >提交</Button
          >
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
  import AgentRegion from '/@/modules/CustomerModule/AgentPages/component/AgentRegion.vue'
  import { Dayjs } from 'dayjs'
  import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
  import { Button, Form, Input, Select, message } from 'ant-design-vue'
  import { defineComponent, reactive, toRaw, UnwrapRef, ref } from 'vue'
  import { SelectTypes } from 'ant-design-vue/es/select'
  interface FormState {
    nameID: string
    phone: string
    name: string
    region: string | undefined
    date1: Dayjs | undefined
    delivery: boolean
    type: string[]
    resource: string
    desc: string
    charge: string
    operate: string
    merchant: string
  }
  export default defineComponent({
    components: { Button, Form, FormItem: Form.Item, Input, Select, AgentRegion },
    // props: {
    //   childVisible: Boolean,
    // },
    emits: { click: null },
    setup() {
      // console.log(props)
      const formState: UnwrapRef<FormState> = reactive({
        nameID: '864522',
        phone: '18888888888',
        name: '长葛姜天龙',
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: '',
        desc: '正商木华广场3号楼A座7层',
        charge: '张三',
        operate: '',
        merchant: '',
      })
      const onSubmit = () => {
        formRef.value
          .validate()
          .then(() => {
            console.log('values', formState, toRaw(formState))
            message.success('编辑成功')
            // emit('click', false)
          })
          .catch((error: ValidateErrorEntity<FormState>) => {
            console.log('error', error)
          })
      }
      const formRef = ref()
      const rules = {
        name: [
          { required: true, message: '请输入代理商名称', trigger: 'blur' },
          // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },  options: ['张三', '李四', '王五', '赵六'],
        ],
        region: [{ required: false, message: '请输入地区', trigger: 'change' }],
        desc: [{ required: true, message: '请输入地址', trigger: 'blur' }],
        charge: [{ required: true, message: '请输入负责人', trigger: 'blur' }],
        operate: [{ required: true, message: '请输入客户运营', trigger: 'blur' }],
        merchant: [{ required: true, message: '请输入业务代表', trigger: 'blur' }],
      }
      const options = ref<SelectTypes['options']>([
        { value: '张三', label: '张三' },
        { value: '李四', label: '李四' },
        { value: '王五', label: '王五' },
      ])
      return {
        formRef,
        labelCol: { span: 8 },
        wrapperCol: { span: 14 },
        formState,
        onSubmit,
        rules,
        value1: ref('张三'),
        options,
      }
    },
  })
</script>

<style lang="less" scoped>
  .edit-data {
    width: 1100px;
    height: 723px;

    .edit-data-list {
      position: absolute;
      width: 400px;
      height: 600px;
      left: 50%;
      top: 120px;
      transform: translate(-50%, 0);

      .form-select {
        width: 235px;
      }
    }
  }
</style>
