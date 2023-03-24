<template>
  <AModal v-model:visible="orderInfo.assignVisible" title="修改订单" width="650px" @ok="modifyOk">
    <div class="p-5">
      <AForm
              ref="formRef"
              :label-col="{ span: 6 }"
              :model="formState"
              :wrapper-col="{ span: 16 }"
              autocomplete="off"
              name="basic"
      >
        <AFormItem label="修理厂" name="manufacturer">
          {{formState.manufacturer}}
        </AFormItem>
        <AFormItem label="安装服务名称" name="serviceName">
          {{formState.serviceName}}
        </AFormItem>
        <AFormItem name="homeTime" :rules="[{ validator: checkHomeTime,trigger:'change' }]" label="上门时间">
          <FormSelectTime  v-model:homeTime="homeTime" ></FormSelectTime>
        </AFormItem>
        <AFormItem
                :rules="[{ required: true, message: '请选择回收地址' }]"
                label="回收地址"
                name="addressId"
        >
          <a-select
                  v-model:value="formState.addressId"
                  :options="serviceAddress"
                  placeholder="请选择回收地址"
          />
        </AFormItem>
        <AFormItem
                :rules="[{ required: true, message: '请填写原因' }]"
                label="修改原因"
                name="manufacturerReason"
        >
          <a-textarea
                  v-model:value="formState.manufacturerReason"
                  :maxlength="200"
                  :rows="6"
                  placeholder="请填写原因"
                  show-count
          />
        </AFormItem>
      </AForm>
    </div>
  </AModal>

</template>

<script lang="ts" setup>
  import {defineComponent, ref,reactive,defineEmits,defineProps,watch} from 'vue';
  import FormSelectTime from '/@/modules/components/FormSelectTime.vue'
  import { VoUtils } from '@vocen/shared'
  import { useMessage } from '/@/hooks/web/useMessage'
  import adminHttp from '/@/utils/http/adminHttp'
  import {timeSelectOptions} from '/@/api/model/dictionaryApi.ts'
  const { createMessage } = useMessage()
  const loadingCtxkey = 'handlerRow'
  const emit = defineEmits(['update:orderInfo','updateData'])
  const props = defineProps({
    orderInfo:{
      default:{
        id:null,
        supportName:null,
        homeEndTime:null,
        homeStartTime:null,
        buyerName:null,
        buyerId:null,
        addressDetail:null,
        assignVisible:false,
      },
      type:Object,
    },
  })


  const checkHomeTime = (data)=>{
    console.log(homeTime)
    if(!homeTime.value[0] || !homeTime.value[1]){
      return Promise.reject(new Error('请选择上门时间'));
    }else {
      return Promise.resolve();
    }

  }
  const homeTime = ref([])
  //修改订单
  const formRef = ref<any>()
  const serviceAddress = ref([])
  const addressList = ref([])
  const modifyOrder = async (detail) => {
    formRef.value&&formRef.value.resetFields()
    formState.manufacturer = detail.buyerName
    formState.serviceName = detail.supportName
    formState.homeEndTime = detail.homeEndTime
    formState.homeStartTime = detail.homeStartTime
    // json 数据精度丢失问题
    try {
      console.log(detail.addressDetail)
      if(typeof detail.addressDetail == 'string'){
        detail.addressDetail = detail.addressDetail.replace(/\"id\": (\d+)/g,'"id":"$1"')
        formState.addressId = JSON.parse(detail.addressDetail)?.id
      }else {
        formState.addressId = detail.addressDetail?.id
      }
    }catch (e) {
      console.log(e)
    }
    formState.homeStartTime =  VoUtils.timeFormat(new Date().getTime(),'yyyy-mm-dd')
    formState.homeEndTime = ''
    homeTime.value = [formState.homeStartTime,formState.homeEndTime]
    const res = await adminHttp.COMPANY.receiverAddressList({ companyId: detail.buyerId })
    addressList.value = res.data
    serviceAddress.value = res.data.map((item) => {
      const label =
          item.name + item.mobile + item.provinceName + item.cityName + item.areaName + item.address
      return {
        label,
        value: item.id,
      }
    })
    console.log(formState.addressId,serviceAddress.value)
  }

  interface FormState {
    manufacturer: string
    serviceName: string
    homeStartTime: string
    homeEndTime: any
    addressId: any
    manufacturerReason: string
    homeStartTimeTmp?: string
    homeEndTimeTmp?: string | null
  }
  const formState = reactive<FormState>({
    manufacturer: '修理厂',
    serviceName: '回收',
    homeStartTime: '',
    homeEndTime: '',
    addressId: '',
    manufacturerReason: '',
    homeStartTimeTmp:'',
    homeEndTimeTmp:''
  })


  //确认修改
  const modifyOk = async () => {
    const retForm = await formRef.value.validate()
    const { code } = await adminHttp.ORDER.orderRecycleUpdate({
      id: props.orderInfo.id,
      addressId:formState.addressId,
      homeStartTime: homeTime.value[0],
      homeEndTime: homeTime.value[1],
      reason: formState.manufacturerReason,
    })
    if (+code === 20001) {
      createMessage.success('操作成功')
      props.orderInfo.assignVisible = false
      emit('updateData')
    }

  }

  watch(()=>props.orderInfo.assignVisible,async (value)=>{
    if(value){
      modifyOrder(props.orderInfo)
    }
    console.log(props.orderInfo)
  },{immediate:true})


</script>

<style scoped lang="less">

</style>
