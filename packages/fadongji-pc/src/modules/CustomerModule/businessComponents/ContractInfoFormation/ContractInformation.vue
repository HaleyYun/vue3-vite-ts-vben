<template>
  <div class='container'>
    <!--平台商户入驻合同-->
    <div v-for="(item,index) of contractData" :key="index+'contract'">
      <div v-if="item.data &&item.data.contractUrl" class='flex items-center mb-20px'>
        <div class='item w-300px text-lg font-medium'>《{{item.contractTypeStr}}》</div>
        <AButton class="mx-30px" type='primary' @click="preview(item)">点击查看</AButton>
        <div><span>合同有效期：</span><span>{{item.data.validityStartDate}}-{{item.data.validityEndDate}}</span></div>
        <a class="ml-30px" @click="uploadContract(item,'edit')">更换</a>
      </div>
      <div v-else class='flex items-center mb-20px'>
        <div class=' text-lg w-300px font-medium '>《{{item.contractTypeStr}}》</div>
        <a class="ml-30px" @click="uploadContract(item,'add')">上传</a>
      </div>
    </div>
    <ContractUpload v-model:contract="contractModal" @success="uploadSuccess"></ContractUpload>


  </div>
</template>
<script lang='ts' setup>
  import {ref, watch, reactive, defineProps} from 'vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import ContractUpload from '/@/modules/components/ContractUpload.vue'
  import {useMessage} from '/@/hooks/web/useMessage'
  const { createMessage } = useMessage()

  const props = defineProps({
    companyId: {
      type: String,
      default: '',
    },
  });
  const contractData = ref([])

  const contractModal = ref({
    filePath: '', fileName: '', visible: false
  });

  // 更换/上传合同
  const uploadContract = (item,type) => {
    contractModal.value = {
      filePath: item.data ? item.data.contractUrl : "",
      fileName: item.data ? item.contractTypeStr : "",
      contractType:item.contractType,
      visible: true,
      type:type,
      id:item.data&&item.data.id,
      validityStartTime: item.data ? item.data.validityStartDate : '',
      validityEndTime: item.data ? item.data.validityEndDate : '',
    };
  };
  const uploadSuccess = (data) => {
    if(contractModal.value.type == 'add'){
      addContract({...data,contractType:contractModal.value.contractType})
    }else {
      editContract({...data,contractType:contractModal.value.contractType,id:contractModal.value.id})
    }
  }
  const addContract = async (data) => {
    try {
      let params = {
        companyId: props.companyId,
        contractType: data.contractType,
        contractUrl: data.filePath,
        validityEndDate: data.validityEndTime,
        validityStartDate: data.validityStartTime
      }
      const {code} = await AdminHttp.COMPANY.companyContractAdd(params)
      if(code === '20001'){
        createMessage.success('添加成功')
        contractModal.value.visible = false
        getContract()
      }

    } catch (e) {

    }
  }
  const editContract = async (data) => {
    try {
      let params = {
        companyId: props.companyId,
        contractType: data.contractType,
        contractUrl: data.filePath,
        id:data.id,
        validityEndDate: data.validityEndTime,
        validityStartDate: data.validityStartTime
      }
      const {code} = await AdminHttp.COMPANY.companyContractUpdate(params)
      if(code === '20001'){
        createMessage.success('编辑成功')
        contractModal.value.visible = false
        getContract()
      }

    } catch (e) {

    }
  }


  const preview = (item) => {
    window.open(item.data.contractUrl)
  }

  const getContract = async () => {
    try {
      let params = {companyId: props.companyId}
      const {code, data} = await AdminHttp.COMPANY.companyContractListBy$CompanyId(params)
      if (code === '20001') {
        contractData.value = data;
      }
    } catch (e) {

    }
  }

  watch(() => props.companyId, (newValue) => {
    getContract()
  }, {deep: true, immediate: true})


</script>
<style lang='less' scoped>

</style>


