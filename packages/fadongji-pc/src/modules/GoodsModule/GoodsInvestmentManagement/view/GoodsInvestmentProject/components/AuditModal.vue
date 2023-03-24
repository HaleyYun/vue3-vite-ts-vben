<template>
  <AModal
          v-model:visible="multipleAuditDialog.visible"
          :title="multipleAuditDialog.title"
          centered
          destroy-on-close
          width="500px"
          :confirm-loading="multipleAuditDialog.confirmLoading"
          @ok="multipleAuditHandler"
          @cancel="restMultipleAuditDialog">
    <div class="p-5">
      <a-form   :label-col="{ span: 4 }"
                :wrapper-col="{ span: 24 }">
        <a-form-item  required label="填写原因"
        >
          <ATextarea
                  v-model:value="multipleAuditDialog.reason"
                  placeholder="请填写审核未通过原因"
                  :rows="6"
                  :maxlength="30"
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
    confirmLoading: false,
  })

  const multipleAuditHandler = () =>{
    if(multipleAuditDialog.reason.trim() == ''){
        createMessage.error('请填写审核未通过原因')
        return;
    }
    emit('change',multipleAuditDialog.reason)
    emit('update:visible',false)
  };
  const restMultipleAuditDialog = () =>{
    emit('update:visible',false)
  }
  watch(()=>props.visible,(val)=>{
    multipleAuditDialog.reason = ''
    multipleAuditDialog.visible = val;
  })


</script>

<style scoped lang="less">

</style>
