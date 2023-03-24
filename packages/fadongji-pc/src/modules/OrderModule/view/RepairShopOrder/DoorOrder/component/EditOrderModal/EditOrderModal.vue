<template>
  <AModal v-model:visible="orderInfo.assignVisible" width="572px" title="修改订单" @ok="modifyOk">
    <div class="p-5">
      <AForm
              ref="formRef"
              :model="formState"
              name="basic"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 15 }"
              autocomplete="off"
      >
        <AFormItem label="商品型号">
          {{  orderInfo.modelId }}
        </AFormItem>
        <AFormItem label="发动机识别码">
          {{ orderInfo.engineNo }}
        </AFormItem>
        <AFormItem label="修理厂">
          {{ orderInfo.buyerName }}
        </AFormItem>
        <AFormItem
                label="上门地址"
                name="address"
                :rules="[{ required: true, message: '请选择回收地址' }]"
        >
          <a-select
                  v-model:value="formState.address"
                  placeholder="请选择上门地址"
                  :options="serviceAddress"
                  @change="Addresschange"
          />
        </AFormItem>
        <AFormItem label="上门时间" name="homeTime" :rules="[{ validator: checkHomeTime,trigger:'change' }]">
          <FormSelectTime  v-model:homeTime="homeTime" ></FormSelectTime>
        </AFormItem>
        <AFormItem label="服务金额" name="supportAmount"  :rules="[{ required: true, message: '请输入服务金额' }]">
          <a-input-number
                  style="width: 94%"
                  v-model:value="formState.supportAmount"
                  :max="99999999"
                  :min="0"
                  placeholder="请输入服务金额"
                  allow-clear
          />
          <span class="ml-5px">元</span>
        </AFormItem>
        <AFormItem
                label="上门指导"
                name="homeMsg"
                :rules="[{ required: true, message: '请填写上门指导' }]"
        >
          <a-textarea
                  v-model:value="formState.homeMsg"
                  :rows="4"
                  placeholder="请填写需要集师傅提交的图片、视频信息"
                  show-count
                  :maxlength="100"
          />
        </AFormItem>
        <!--v-model:file-list="fileList1"-->
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
        relationOrderId:null,
        modelId:null,
        engineNo:null,
        buyerName:null,
        buyerId:null,
        assignVisible:false,
      },
      type:Object,
    },
  })
  const serviceAddress = ref([]) // 地址信息 显示在上门地址
  const addressList = ref([])
  // 时间处理
  const startChange = (val) => {
    if (!val) {
      formState.homeStartTime = ''
    }
    if (formState.homeEndTimeTmp) {
      const vArr = formState.homeEndTimeTmp.split('~')
      formState.homeStartTime = formState.homeStartTimeTmp + ' ' + vArr[0]
      formState.homeEndTime = formState.homeStartTimeTmp + ' ' + vArr[1]
    }
  }
  const selectChange = (val) => {
    if (!val) {
      formState.homeEndTime = ''
    }
    const vArr = val.split('~')
    if (formState.homeStartTime) {
      formState.homeStartTime = formState.homeStartTimeTmp + ' ' + vArr[0]
      formState.homeEndTime = formState.homeStartTimeTmp + ' ' + vArr[1]
    }
  }
  const startDisabledDate = (current) => {
    let y = new Date(current.$d).getFullYear() <= new Date().getFullYear()
    let m = new Date(current.$d).getMonth() <= new Date().getMonth()
    let d = new Date(current.$d).getDate() < new Date().getDate()
    return y&&m&&d
  }
  const endDisabledDate = (endTime) => {

    const vArr = endTime.split('~')
    const vArrStart = vArr[0].split(':')[0]
    const vArrEnd = vArr[1].split(':')[0]
    let time = new Date().getHours()
    if(vArrStart<time &&vArrEnd<=time){
      return true
    }else {
      return false
    }
  }

  const checkHomeTime = (data)=>{
    console.log(homeTime)
    if(!homeTime.value[0] || !homeTime.value[1]){
      return Promise.reject(new Error('请选择上门时间'));
    }else {
      return Promise.resolve();
    }

  }

  interface FormState {
    id: string
    address: object
    homeMsg: string
    homeEndTime: string
    homeStartTime: String
    relationOrderId: String
    supportAmount: number
    homeStartTimeTmp?: string
    homeEndTimeTmp?: string | null
  }
  const formRef = ref<any>()
  const defaultStatte = {
    id: null,
    relationOrderId: '',
    homeMsg: '',
    address: null,
    homeStartTime: '',
    homeEndTime: '',
    homeStartTimeTmp:'',
    homeEndTimeTmp:'',
    supportAmount: null,

  }
  const formState = reactive<FormState>(defaultStatte)
  const homeTime = ref([])
  const modifyOrder = (data) => {
    formRef.value&&formRef.value.resetFields()
    formState.id = data.id
    formState.relationOrderId = data.relationOrderId
    formState.homeStartTime = data.homeStartTime?data.homeStartTime: VoUtils.timeFormat(new Date().getTime(),'yyyy-mm-dd')
    formState.homeEndTime = ''
    homeTime.value = [formState.homeStartTime,formState.homeEndTime]
    getAddressList()
  }
  // 获取回收地址数据
  const getAddressList = async () => {
    const res = await adminHttp.COMPANY.receiverAddressList({ companyId: props.orderInfo.buyerId })
    addressList.value = res.data
    serviceAddress.value = res.data.map((item) => {
      const label =
          item.name + item.mobile + item.provinceName + item.cityName + item.areaName + item.address
      return {
        label,
        value: item.id,
      }
    })
  }
  //选择回收地址的id
  const Addresschange = (item) => {
    formState.address = item
  }

  const modifyOk = async () => {
    const retForm = await formRef.value.validate()
    let address = {}
    let addressData = addressList.value.find((item) => item.id == retForm.address)
    if (addressData) {
      address = {
        id: addressData.id,
        addressDetail:
            addressData.address,
        latitude: addressData.latitude,
        longitude: addressData.longitude,
        name: addressData.name,
        phone: addressData.mobile,
      }
    }
    const { code } = await adminHttp.ORDER.orderSupportAfterSaleUpdate({
      id: formState.id,
      address: address,
      homeStartTime: homeTime.value[0],
      homeEndTime: homeTime.value[1],
      homeMsg: retForm.homeMsg,
      relationOrderId: formState.relationOrderId,
      supportAmount: retForm.supportAmount,
    })
    if (+code === 20001) {
      createMessage.success('操作成功')
      props.orderInfo.assignVisible = false;
      emit('updateData')

    }

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
