<template>
  <AModal v-model:visible="orderInfo.assignVisible" width="572px" title="修改订单" @ok="modifyOk">
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
          <AInput v-model:value="formState.manufacturer" :maxlength="10" allow-clear disabled />
        </AFormItem>
        <AFormItem label="安装服务名称" name="serviceName">
          <AInput v-model:value="formState.serviceName" :maxlength="10" allow-clear disabled />
        </AFormItem>
        <AFormItem  label="上门时间" name="homeTime" :rules="[{ validator: checkHomeTime,trigger:'change' }]">
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
  import { message } from 'ant-design-vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import {timeSelectOptions} from '/@/api/model/dictionaryApi.ts'


  const loadingCtxkey = 'handlerRow'
  const emit = defineEmits(['update:orderInfo','updateData'])
  const props = defineProps({
    orderInfo:{
      default:{
        id:null,
        assignVisible:false,
      },
      type:Object,
    },
  })
  const formRef = ref() //校验
  const serviceAddress = ref([] as any[]) //回收地址下拉
  const serviceAddressId = ref<string>('') //地址id
  const modifyVisible = ref<boolean>(false)
  const detail = ref({})
  const modifyOrder = async (item) => {
    await adminHttp.SUPPORT.supportInstallDetailBy$id({
      id: item.id,
    })
        .then((res) => {
          detail.value = res.data
        })
        .catch((err) => {
          console.log(err)
          message.error({ content: `获取列表失败:${err.message}`, key: loadingCtxkey })
        })
    formState.manufacturerReason = ''
    formState.manufacturer = detail.value.buyerName
    formState.serviceName = detail.value.supportName
    formState.homeEndTime = detail.value.homeEndTime
    formState.homeStartTime = detail.value.homeStartTime
    formState.homeStartTime =  VoUtils.timeFormat(new Date().getTime(),'yyyy-mm-dd')
    formState.homeEndTime = ''
    homeTime.value = [formState.homeStartTime,formState.homeEndTime]
    modifyVisible.value = true
    try {
      if( typeof detail.value?.addressDetail == 'string'){
        formState.addressId = JSON.parse(detail.value?.addressDetail)?.id
      }else {
        formState.addressId = detail.value?.addressDetail?.id
      }
    }catch (e) {
      formState.addressId = detail.value?.addressDetail?.id
    }
    console.log(formState.addressId)
    try {
      const res = await adminHttp.COMPANY.receiverAddressList({ companyId: detail.value.buyerId })
      serviceAddress.value = res.data.map((item) => {
        const label =
            item.name + item.mobile + item.provinceName + item.cityName + item.areaName + item.address
        return {
          label,
          value: item.id,
        }
      })
    } catch (e: any) {
      // alert(11)
      const message = e?.message || e?.data?.message || e?.error || '服务端错误'
      console.warn(message, 'InstallationDetails')
      message.error(message)
    }
  }
  //上门时间
  const onTimeOk = (value: any) => {
    formState.homeEndTime = value
  }
  //上门结束时间
  const onEndTimeOk = (value: any) => {
    formState.homeStartTime = value
  }

  const homeTime = ref([])
  const formState = reactive<FormState>({
    manufacturer: '修理厂',
    serviceName: '回收',
    homeStartTimeTmp: '',
    homeStartTime: '',
    homeEndTime: null,
    homeEndTimeTmp: '',
    addressId: '',
    manufacturerReason: '',
  })


  interface FormState {
    manufacturer: string
    serviceName: string
    homeStartTime: string
    homeEndTime: string
    addressId: string
    manufacturerReason: string
    homeStartTimeTmp?: string
    homeEndTimeTmp?: string | null
  }
  const checkHomeTime = (data)=>{
    console.log(homeTime)
    if(!homeTime.value[0] || !homeTime.value[1]){
      return Promise.reject(new Error('请选择上门时间'));
    }else {
      return Promise.resolve();
    }
  }
  //确认修改
  const modifyOk = async () => {
    const retForm = await formRef.value.validate()
    const { code } = await adminHttp.SUPPORT.supportInstallUpdate({
      id: detail.value.id,
      addressId: formState.addressId,
      homeStartTime: homeTime.value[0],
      homeEndTime: homeTime.value[1],
      reason: formState.manufacturerReason,
    })
    if (+code === 20001) {
      message.success('操作成功')
      props.orderInfo.assignVisible = false;
      emit('updateData')
    }
    modifyVisible.value = false
  }

  watch(()=>props.orderInfo.assignVisible,async (value)=>{
    if(value ){
      modifyOrder(props.orderInfo)
    }
    console.log(props.orderInfo)
  },{immediate:true})


</script>

<style scoped lang="less">


</style>
