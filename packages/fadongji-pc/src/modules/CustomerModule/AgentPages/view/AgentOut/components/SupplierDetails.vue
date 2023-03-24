<template>
  <div>
    <ASteps :current="currentTag" size="small">
      <template v-for="item of linkData" :key="item?.checkStatus">
        <a-step :title="item['checkStatusStr']" >
          <template #description> {{ item.auditTime }}</template>
        </a-step>
      </template>
    </ASteps>
    <div class="flex mt-20px">
      <div>
        <CommonTaps
                type="agent"
                :activityInit="pageSwitchIndex"
                @changeStepContentProps="changeStepContentFunc($event)"
        />
      </div>
      <div class="flex1">
        <template v-if="showTitle === '基础信息'">
          <TechnicallInfomation
            :info="commonDetailData"
            @refresh="managementData"
            @levelDetail="levelDetail"
          />
        </template>
        <template v-if="showTitle === '公司资质'">
          <div class="template--title mb-20px">公司资质</div>
          <CompanyQualification :info="commonDetailData" />
        </template>
        <template v-if="showTitle === '财务信息'">
          <div class="template--title mb-20px">财务信息</div>
          <FinancialInformation :companyId="route.query.id" @goPayment="goPayment" />
        </template>
        <template v-if="showTitle === '合同信息'">
          <div class="template--title mb-20px">合同信息</div>
          <ContractInformation :companyId="route.query.id" />
        </template>
        <template v-if="showTitle === '店铺信息'">
          <div class="template--title mb-20px">店铺信息</div>
          <StoreInfoMation :companyId="route.query.id" />
        </template>
        <template v-if="showTitle == '地址信息'">
          <div class="template--title mb-20px">地址信息</div>
          <AddressInfoMation :companyId="route.query.id"></AddressInfoMation>
        </template>
        <template v-if="showTitle == '屏蔽设置'">
          <div class="template--title mb-20px">屏蔽设置</div>
          <ShieldingSettings :companyId="route.query.id"></ShieldingSettings>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import {
    tabsNameEnum,
    basicInformationEnum,
  } from '/@/modules/ContentModule/view/HelpCenter/data/HelpCenterData'
  import {
    filterEmploymentPageForm,
    financialDesc,
  } from '/@/modules/CustomerModule/SupplierModule/SupplierList/data/detaildata.ts'
  import adminHttp from '/@/utils/http/adminHttp'
  import { FormOutlined } from '@ant-design/icons-vue'
  import CommonTaps from '/@/modules/CustomerModule/SupplierModule/SupplierList/component/commonTaps.vue'
  import TechnicallInfomation from '/@/modules/CustomerModule/businessComponents/TechnicallInfomation/TechnicalInformation.vue'
  import BusinessCategory from '/@/modules/CustomerModule/businessComponents/businessCategory/businessCategory.vue'
  import CompanyQualification from '/@/modules/CustomerModule/businessComponents/CompanyQualification/CompanyQualification.vue'
  import FinancialInformation from '/@/modules/CustomerModule/businessComponents/FinancialInformation/FinancialInformation.vue'
  import ContractInformation from '/@/modules/CustomerModule/businessComponents/ContractInfoFormation/ContractInformation.vue'
  import StoreInfoMation from '/@/modules/CustomerModule/businessComponents/StoreInformation/StoreInformation.vue'
  import AddressInfoMation from '/@/modules/CustomerModule/businessComponents/AddressInfication/AddressInfication.vue'
  import ShieldingSettings from '/@/modules/CustomerModule/businessComponents/ShieldingSettings/ShieldingSettings.vue'


  import { reactive, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  const route = useRoute()
  const router = useRouter()
  const linkData = ref([])
  let currentTag = ref(null)
  const pageSwitchIndex = ref(tabsNameEnum.basicInformation)
  const showTitle = ref(tabsNameEnum.basicInformation)
  const commonDetailData = ref({})
  let supplierDetailsModel = reactive({
    id: route.query.id || '',
  })

  // 跳转到等级明细页面
  const levelDetail = () => {
    router.push({
      path: '/customerModule/agent/AssetsReport',
      query: {
        id: commonDetailData.value.id,
        type: 2,
        userId: commonDetailData.value.userId,
        level: commonDetailData.value.level,
      },
    })
  }
  const managementData = () => {
    initLinkDataEvent()
    initSupplierEvent()
  }
  // 跳转到账期额度页面
  const goPayment = () => {
    router.push({
      path: '/customerModule/agent/AssetsReport',
      query: {
        id: commonDetailData.value.id,
        type: 1,
        userId: commonDetailData.value.userId,
        level: commonDetailData.value.level,
      },
    })
  }

  const changeStepContentFunc = (event) => {
    showTitle.value = event
  }
  const initLinkDataEvent = async () => {
    try {
      const { code, data } = await adminHttp.CUSTOMER.companyInfoAuditLink(
        supplierDetailsModel['id'],
      )
      if (code == '20001') {
        linkData.value = data
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
  }
  const initSupplierEvent = async () => {
    try {
      const { code, data } = await adminHttp.CUSTOMER.companyInfoManage(supplierDetailsModel['id'])
      if (code == '20001') {
        commonDetailData.value = data
      }
    } catch (err) {
      console.log(err, '详情请求失败')
    } finally {
    }
  }
  initLinkDataEvent()
  initSupplierEvent()
</script>

<style scoped lang="scss">
  .change-content {
    padding: 24px;
  }
</style>
