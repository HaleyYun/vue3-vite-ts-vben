<template>
  <div>
    <ADescriptions :column="2"   bordered :schema="descItem">
      <ADescriptionsItem v-for="(item,index) of descItem" :key="index+'netData'" :label="item.label">
        <div v-if="item.field == 'accountInfo'" class="flex items-center justify-between">
          <a class="ml-20px" @click="viewAccount()">查看</a>
        </div>
        <div v-if="item.field == 'paymentAccount'" class="flex items-center justify-between">
          <span>{{netData[item.field]}}</span>
          <a class="ml-20px" @click="viewPayment()">查看明细</a>
        </div>
        <div v-else> {{netData[item.field]}}</div>
      </ADescriptionsItem>
    </ADescriptions>
    <AModal
            v-model:visible="visible"
            title="法人银行卡"
            centered
            :footer="null"
            :width="590"
            destroy-on-close
    >
      <div class="padding-24">
        <ATable :dataSource="bankCardList" :columns="accountColumns" />
      </div>

    </AModal>
  </div>

</template>

<script lang="ts" setup>
  import {defineComponent, ref,defineProps,watch,defineEmits} from 'vue';
  import adminHttp from '/@/utils/http/adminHttp'
  import { Description } from '/@/components/Description/index';
  import {DescItemData,accountColumns} from './data/configuration'
  const props = defineProps({
    companyId:{
      type:String,
      default:''
    }
  })
  const emit = defineEmits(['goPayment'])
  const descItem = ref(DescItemData)

  const visible = ref(false);
  const bankCardList = ref([]);
  const viewAccount = () =>{
    getBankCard()
    visible.value = true
  }
  const getBankCard = async () =>{
    try {
      let params = {companyId:props.companyId}
      const { code, data } = await adminHttp.COMPANY.companyInfoBankCardListBy$CompanyId(params)
      if (code === '20001') {
        bankCardList.value = data;
      }
    } catch (e) {
      console.log(e)
    }
  }

  // 跳转账期明细页面
  const viewPayment = () =>{
    emit('goPayment')
  }

  // 获取银行卡信息
  const netData = ref({});
  const getFinancia = async ()=>{
    try {
      let params = {companyId:props.companyId}
      const { code, data } = await adminHttp.COMPANY.companyInfoFinancialBy$CompanyId(params)
      if (code === '20001') {
        netData.value = data;
        if(data.platformCode == 'agent'){
          descItem.value[5] = {
            field: 'paymentAccount',
            label: '账期额度',
            labelMinWidth:120
          }
          console.log(descItem)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
  getFinancia()


</script>

<style scoped lang="less">
  ::v-deep(.ant-descriptions-item-content){
    width: 30%;
  }

</style>
