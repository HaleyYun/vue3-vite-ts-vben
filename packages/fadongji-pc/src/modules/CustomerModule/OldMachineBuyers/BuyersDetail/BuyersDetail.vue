<template>
  <div class="bg-white p-24px h-screen m-24px" >
    <div class="px-24px pb-24px">
      <ASteps :current="currentTag" size="small">
        <template v-for="item of linkData" :key="item?.checkStatus">
          <a-step :title="item['checkStatusStr']" >
            <template #description> {{ item.auditTime }}</template>
          </a-step>
        </template>
      </ASteps>
    </div>
    <ATabs v-model:activeKey="activeKey" tab-position="left" >
      <ATabPane key="one" tab="基础信息">
        <div class="bg-white w-1000px ">
          <div class="template--title mb-20px">基础信息</div>
          <TechnicalInformation :info="info" type="OldBuyers" @levelDetail="levelDetail"></TechnicalInformation>
        </div>
      </ATabPane>
      <ATabPane key="two" tab="公司资质">
        <div class="bg-white w-1000px ">
          <div class="template--title mb-20px">公司资质</div>
          <CompanyQualification :info="info" />
        </div>
      </ATabPane>
      <ATabPane key="three" tab="财务信息">
        <div class="bg-white  w-1000px">
          <div class="template--title mb-20px">财务信息</div>
          <FinancialInformation :companyId="route.query.id"  />
        </div>
      </ATabPane>
      <ATabPane key="four" tab="合同信息">
        <div class="bg-white  ">
          <div class="template--title mb-20px">合同信息</div>
          <ContractInformation :companyId="route.query.id" />
        </div>
      </ATabPane>
      <ATabPane key="five" tab="店铺信息">
        <div class="bg-white ">
          <div class="template--title mb-20px">店铺信息</div>
          <StoreInfoMation :companyId="route.query.id"  />
        </div>
      </ATabPane>
      <ATabPane key="six" tab="地址信息">
        <div class="bg-white  w-1000px">
          <div class="template--title mb-20px">地址信息</div>
          <AddressInfoMation :companyId="route.query.id"  />
        </div>
      </ATabPane>
    </ATabs>
  </div>

</template>

<script lang="ts" setup>
  import {defineComponent, ref,reactive,onBeforeMount} from 'vue';
  import adminHttp from '/@/utils/http/adminHttp'
  import TechnicalInformation from '/@/modules/CustomerModule/businessComponents/TechnicallInfomation/TechnicalInformation.vue'
  import BusinessCategory from '/@/modules/CustomerModule/businessComponents/businessCategory/businessCategory.vue'
  import CompanyQualification from '/@/modules/CustomerModule/businessComponents/CompanyQualification/CompanyQualification.vue'
  import FinancialInformation from '/@/modules/CustomerModule/businessComponents/FinancialInformation/FinancialInformation.vue'
  import ContractInformation from '/@/modules/CustomerModule/businessComponents/ContractInfoFormation/ContractInformation.vue'
  import StoreInfoMation from '/@/modules/CustomerModule/businessComponents/StoreInformation/StoreInformation.vue'
  import AddressInfoMation from '/@/modules/CustomerModule/businessComponents/AddressInfication/AddressInfication.vue'

  import { useRoute,useRouter } from 'vue-router'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";
  // 公共参数
  const activeKey = ref('one');
  const route = useRoute(); // 获取参数
  const router = useRouter() // 跳转页面
  const info = ref({})
  const storeInfo = ref({})


  // 进度条 注册入驻等
  const linkData = ref([]);
  let currentTag = ref(null);
  let supplierDetailsModel = reactive({
    id: route.query.id || ''
  });
  const initLinkDataEvent = async () => {
    try {
      const { code, data } = await adminHttp.CUSTOMER.companyInfoAuditLink(supplierDetailsModel['id'])
      if (code == '20001') {
        linkData.value = data;
        console.log(linkData)
        let indexT;
        data.forEach((item: any, index) => {
          if (item.auditTime) {
            indexT = index+1
          }
        })
        currentTag.value = indexT
      }
    } catch (err) {
      console.log(err, '链路请求失败')
    } finally {
    }
  };

  // 跳转到等级明细页面
  const levelDetail =  () => {
    router.push({path:'/customerModule/OldMachineBuyers/BuyersAsset/BuyersAssetReport',
      query:{companyId: info.value.id,userId:info.value.userId,level:info.value.level}
    })

  }

  const getInfo = async() =>{
    try {
      let params = {id:route.query.id}
      const { code, data } = await adminHttp.COMPANY.companyInfoOldMachineGetBy$id(params)
      if (code === '20001') {
        info.value = data;
      }
    } catch (e) {
      console.log(e)
    }
  }










  onMountedOrActivated(()=>{
    initLinkDataEvent()
    getInfo()
  })

</script>

<style scoped lang="less">

</style>
