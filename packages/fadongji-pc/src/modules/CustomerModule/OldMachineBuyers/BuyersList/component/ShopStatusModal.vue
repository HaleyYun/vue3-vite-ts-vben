<template>
    <div>
        <BasicModal
                v-bind="$attrs"
                @register="register"
                title="更改主体状态"
                :width="517"
                :canFullscreen="false"
                :confirmLoading="confirmLoading"
                @ok="modalOk"

        >
            <div >
                <a-alert message="说明：若没有标签则说明状态为正常" type="info" show-icon />
                <div class="p-20px">
                    <a-radio-group v-model:value="checkValue" class="w-full ">
                        <a-row>
                            <a-col :span="12" class="pb-20px" v-for="(item,index) of checkLabel" :key="index+'label'" >
                                <a-radio :value="item.value">{{item.label}}</a-radio>
                            </a-col>
                        </a-row>
                    </a-radio-group>
                </div>
            </div>
        </BasicModal>
    </div>


</template>

<script setup lang="ts">
  import {  reactive, ref,defineExpose,watch,nextTick,defineEmits } from 'vue'
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import AdminHttp from '/@/utils/http/adminHttp'
  import { useMessage } from '/@/hooks/web/useMessage'
  const { createMessage } = useMessage()
  const emits = defineEmits(['update'])
  const checkLabel = ref([
    {label:'正常',value:'1'},
    {label:'逾期',value:'2'}, {label:'禁言',value:'3'},
    ]);
  const confirmLoading = ref(false);
  const id = ref(null);
  const checkValue = ref('');
  const [register, {setModalProps,closeModal }]= useModalInner((data) => {
    console.log(data)
    id.value = data.id;
    checkValue.value = data.status;
  });

  const modalOk = async ()=>{
    try {
      confirmLoading.value = true;
      let params = {status:checkValue.value,id:id.value}
      const res = await AdminHttp.CUSTOMER.companyInfoChangeStoreStatus(params)
      if (res.code == '20001') {
        createMessage.success('修改店铺成功')
        emits('update')
        closeModal()
      }
      confirmLoading.value = false;
    } catch (err: any) {
      confirmLoading.value = false;
      createMessage.error(err.message)
    } finally {
    }
  }










</script>

<style scoped>

</style>
