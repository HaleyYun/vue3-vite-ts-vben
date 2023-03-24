<template>
  <div class='container'>
    <ATabs tab-position="left" v-model:activeKey="pageSwitchIndex" @change="changeStepContentFunc($event)">
      <ATabPane :key="tabsNameEnum.basicInformation" tab="基础信息" />
      <ATabPane :key="tabsNameEnum.CompanyQualification" tab="公司资质" />
      <ATabPane v-if="type != 'agent'" :key="tabsNameEnum.OperatingCategory" tab="经营品类" />
      <ATabPane :key="tabsNameEnum.financialInformation" tab="财务信息" />
      <ATabPane :key="tabsNameEnum.ContractInformation" tab="合同信息" />
      <ATabPane :key="tabsNameEnum.StoreInformation" tab="店铺信息" />
      <ATabPane :key="tabsNameEnum.AddressInformation" tab="地址信息" />
      <ATabPane v-if="type == 'agent'" :key="tabsNameEnum.ShieldingSettings" tab="屏蔽设置" />

    </ATabs>
  </div>
</template>
<script lang='ts'>
import { defineComponent, ref } from 'vue'
import { tabsNameEnum } from '/@/modules/ContentModule/view/HelpCenter/data/HelpCenterData'
export default defineComponent({
  name: 'CommonTaps',
  props: {
    activityInit: String,
    type:String
  },
  emits: ['changeStepContentProps'],
  setup(props, {emit}) {
    const pageSwitchIndex = ref(props.activityInit)
    const changeStepContentFunc = (event) => {
      emit('changeStepContentProps', event)
    }
    return {
      changeStepContentFunc,
      tabsNameEnum,
      pageSwitchIndex,
    }
  }
})
</script>
