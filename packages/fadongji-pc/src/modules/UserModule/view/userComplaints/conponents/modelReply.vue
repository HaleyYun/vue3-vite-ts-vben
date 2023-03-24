<template>
  <BasicModal
      v-bind="$attrs"
      @register="register"
      :title="propsTitle"
      @visible-change="handleVisibleChange"
      @ok="handleSubmit"
  >
    <div class="pt-3px pr-3px">
      <BasicForm @register="registerForm" :model="model" />
    </div>
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
const schemas: FormSchema[] = [
  {
    field: 'replay',
    component: 'InputTextArea',
    label: '处理投诉',
      colProps: {
        span: 24,
      },
    componentProps: {
      placeholder: '请输入投诉内容',
      rows: 4,
    },
    required: true,
  },
];
export default defineComponent({
  components: { BasicModal, BasicForm },
  props: {
    userData: { type: Object },
  },
  emits: ['confirm'],
  setup(props, { emit }) {
    const propsTitle = ref<string>('')
    const modelRef = ref({});
    const [
      registerForm,
      {
        // setFieldsValue,
        // setProps
      },
    ] = useForm({
      labelWidth: 120,
      schemas,
      showActionButtonGroup: false,
      actionColOptions: {
        span: 24,
      },
    });

    const [register] = useModalInner((data) => {
      data && onDataReceive(data);
    });

    function onDataReceive(data) {
      console.log('Data Received', data);
      modelRef.value = { replay: data.data};
      propsTitle.value = data.modelTitle
    }
    function handleSubmit(v) {
      console.log('333333')
      emit('confirm', v)

    }
    function handleVisibleChange(v) {
      v && props.userData && nextTick(() => onDataReceive(props.userData));
    }
    return { register, schemas, registerForm, model: modelRef, handleVisibleChange, propsTitle, handleSubmit };
  },
});
</script>
