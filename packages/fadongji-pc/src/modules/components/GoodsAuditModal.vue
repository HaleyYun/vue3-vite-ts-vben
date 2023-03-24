<template>
  <AModal
          v-model:visible="multipleAuditDialog.visible"
          :title="multipleAuditDialog.title"
          centered
          destroy-on-close
          width="600px"
          :confirm-loading="multipleAuditDialog.confirmLoading"
          @ok="multipleAuditHandler"
          @cancel="restMultipleAuditDialog">
    <div class="p-5">

      <a-form  ref="formRef"
               :model="multipleAuditDialog"
               :label-col="{ span: 6 }"
                :wrapper-col="{ span: 18 }">
        <AFormItem label="审核结果" name="flag"  >
          <a-radio-group v-model:value="multipleAuditDialog.flag" :rules="[{ required: true, message: '请选择审核结果', trigger: 'change' }]">
            <a-radio :value="true">审核通过</a-radio>
            <a-radio :value="false">审核不通过</a-radio>
          </a-radio-group>
        </AFormItem>
        <a-form-item v-if="multipleAuditDialog.flag == false" label="审核不通过原因" name="reason" :rules="[{ required: true, message: '请填写原因', trigger: 'blur' }]">
          <ATextarea
                  v-model:value="multipleAuditDialog.reason"
                  placeholder="请输入原因"
                  :rows="6"
          />
        </a-form-item>
      </a-form>
    </div>
  </AModal>

</template>

<script setup lang="ts">
  import { ref,reactive,defineProps,defineEmits,watch} from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage'
  const { createMessage } = useMessage()
   const props = defineProps({
     visible:{
       type:Boolean,
       default:false
     }
   })
  const emit = defineEmits(['update:visible', 'change'])
  let multipleAuditDialog = reactive({
    visible: false,
    title: '填写审核未通过原因',
    reason: '',
    flag:null,
    confirmLoading: false,
  })
  const formRef = ref()
  const multipleAuditHandler = async () =>{
    if(multipleAuditDialog.flag == null){
      createMessage.error('请选择审核结果');
      return;
    }
    try {
      const res = await formRef.value.validateFields();
      if(res){
        emit('change',{flag:multipleAuditDialog.flag,reason:multipleAuditDialog.reason})
        emit('update:visible',false)
      }
    }catch (e) {
     console.log(e)
    }
  };
  const restMultipleAuditDialog = () =>{
    emit('update:visible',false)
  }
  watch(()=>props.visible,(val)=>{
    multipleAuditDialog.flag = null
    multipleAuditDialog.reason = '';
    multipleAuditDialog.visible = val;
  })


</script>

<style scoped lang="less">

</style>
