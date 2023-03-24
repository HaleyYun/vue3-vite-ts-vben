<template>
  <div>
    <EraTabs :tabsList="tabsList" :tabs-active="activeKey" @tabsChange="tabsChange" />
  </div>
  <div class="bg-white p-24px  m-24px mt-72px" >
    <div class="bg-white ">
      <TechnicalInformation :info="info" @openQualification="openQualification"></TechnicalInformation>
    </div>
  </div>
  <QualificationModal v-model:visible="qualificationModal.visible"
                      :qualifyType="qualificationModal.qualifyType" @change="openqualify"></QualificationModal>

</template>

<script lang="ts" setup>
  import {defineComponent, ref,reactive} from 'vue';
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import TechnicalInformation from './TechnicallInfomation/TechnicalInformation.vue'
  import QualificationModal from '/@/modules/CustomerModule/businessComponents/QualificationModal/QualificationModal.vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import { useRoute } from 'vue-router'
  import { useMessage } from '/@/hooks/web/useMessage'

  const { createMessage } = useMessage()
  const activeKey = ref('one');
  const route = useRoute()
  const info = ref({})
  const tabsList = ref([{ key: 'one', name: '基础信息', totalCount: 0 }])
  const tabsChange = (key)=>{
    activeKey.value = key;
  }
  const getDetailInfo = async () =>{
    try {
      let params = {id:route.query.id}
      const { code, data } = await AdminHttp.COMPANY.companyInfoSkilledWorkerDetailsBy$id(params)
      if (code === '20001') {
        info.value = data;
      }
    } catch (e) {
      console.log(e)
    }
  }
  // ------开通资质-------
  const qualificationModal = reactive({
    visible:false,
    id:null,
    qualifyType:[], // 认证类型  31:售后回收单 32:安装单 33:回收单；  多选逗号分隔
  })
  const openQualification = (record)=>{
    // record.qualifyAfterSaleStatus 售后资质
    // record.qualifyInstallStatus 安装资质
    // record.qualifyRecycleStatus 回收资质
    let qualifyAfterSaleStatus = record.qualifyAfterSaleStatus?31:0
    let qualifyInstallStatus = record.qualifyInstallStatus?32:0
    let qualifyRecycleStatus = record.qualifyRecycleStatus?33:0
    qualificationModal.id = record.id;
    qualificationModal.qualifyType = [qualifyAfterSaleStatus,qualifyInstallStatus,qualifyRecycleStatus]
    qualificationModal.visible = true;
  }
  const openqualify = async ({qualifyType})=>{
    try {
      let params = {id:qualificationModal.id,qualifyType}
      let {code} = await AdminHttp.COMPANY.companyInfoSkilledWorkerOpenqualify(params)
      if(code == '20001'){
        createMessage.success('操作成功');
        qualificationModal.visible = false;
        getDetailInfo()
      }
    }catch (e) {
      createMessage.error(e.message)
      console.log(e)
    }

  }
  getDetailInfo()


</script>

<style scoped lang="less">

</style>
