<template>
  <div>
    <ASteps :current="currentTag" size="small">
      <a-step v-for="item of linkData" :key="item.checkStatus" :title="item['checkStatusStr']">
        <template #description> {{ item.auditTime }}</template>
      </a-step>
    </ASteps>
    <div class="flex mt-20px">
      <div class="">
        <CommonTaps
          :activityInit="pageSwitchIndex"
          @changeStepContentProps="changeStepContentFunc($event)"
        />
      </div>
      <div class="flex1">
        <template v-if="showTitle === '基础信息'">
          <div class="template--title mb-20px">基础信息</div>
          <TechnicallInfomation
            type="supplier"
            :info="commonDetailData"
            @levelDetail="levelDetail"
            @refresh="managementData"
          />
        </template>
        <template v-if="showTitle === '公司资质'">
          <div class="template--title mb-20px">公司资质</div>
          <CompanyQualification :info="commonDetailData" />
        </template>
        <template v-if="showTitle === '经营品类'">
          <div class="template--title mb-20px">经营品类</div>
          <BusinessCategory :id="route.query.id" />
        </template>
        <template v-if="showTitle === '财务信息'">
          <div class="template--title mb-20px">财务信息</div>
          <FinancialInformation :companyId="route.query.id" />
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
          <AddressInfoMation :companyId="route.query.id" />
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

  import { reactive, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

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
      path: '/customerModule/supplier/SuppieAssetReport',
      query: {
        userId: commonDetailData.value.userId,
        type: 2,
        companyId: commonDetailData.value.id,
        level: commonDetailData.value.level,
      },
    })
  }
  const managementData = () => {
    initLinkDataEvent()
    initSupplierEvent()
  }

  const changeStepContentFunc = (event) => {
    showTitle.value = event
  }
  const initLinkDataEvent = async () => {
    try {
      const { code, data } = await adminHttp.CUSTOMER.companyInfoAuditLink(route.query.id)
      if (code == '20001') {
        linkData.value = data
        let indexT
        data.forEach((item: any, index) => {
          if (item.auditTime) {
            indexT = index + 1
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
      const { code, data } = await adminHttp.CUSTOMER.companyInfoManage(route.query.id)
      if (code == '20001') {
        commonDetailData.value = data
      }
    } catch (err) {
      console.log(err, '详情请求失败')
    } finally {
    }
  }
  onMountedOrActivated(() => {
    initLinkDataEvent()
    initSupplierEvent()
  })
</script>

<style scoped lang="scss">
  .change-content {
    padding: 24px;
  }
</style>
