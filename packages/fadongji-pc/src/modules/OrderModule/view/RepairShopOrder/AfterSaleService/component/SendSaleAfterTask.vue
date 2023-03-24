<template>
  <a-modal
    width="824px"
    title="售后上门服务"
    v-model:visible="show"
    destroy-on-close
    @cancel="cancelHandler"
    :footer="false"
  >
    <div class="p-4">
      <a-form
        ref="formRef"
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 14 }"
        autocomplete="off"
        @finish="onFinish"
      >
        <a-form-item label="商品型号" name="modelName">
          {{ formState.modelName }}
        </a-form-item>
        <a-form-item label="发动机识别码" name="engineNo">
          {{ formState.engineNo }}
        </a-form-item>
        <a-form-item label="修理厂" name="buyerName">
          {{ formState.buyerName }}
        </a-form-item>
        <a-form-item
          label="上门地址"
          name="address"
          :rules="[{ required: true, message: '请选择上门地址' }]"
        >
          <a-select
            v-model:value="formState.address"
            :options="buyerAddressList"
            placeholder="请选择上门地址"
            allow-clear
          />
        </a-form-item>

        <a-form-item style="padding-bottom: 20px" label="上门时间" name="homeTime" :rules="[{ validator: checkHomeTime,trigger:'change' }]">
          <FormSelectTime  v-model:homeTime="homeTime" ></FormSelectTime>
        </a-form-item>

        <a-form-item
          style="margin-top: -20px"
          label="服务金额"
          name="supportAmount"
          :rules="[{ required: true, message: '服务金额不能为空' }]"
        >
          <a-input-number
            style="width: 100%"
            placeholder="请输入"
            v-model:value="formState.supportAmount"
            :min="0"
            addon-after="元"
            allow-clear
          />
        </a-form-item>
        <a-form-item
          label="上门指导"
          name="homeMsg"
          :rules="[{ required: true, message: '上门指导不能为空' }]"
        >
          <a-textarea
            style="width: 100%"
            placeholder="请输入上门指导"
            v-model:value="formState.homeMsg"
            :rows="5"
            :maxlength="100"
            allow-clear
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 12, span: 8 }">
          <a-space>
            <a-button type="primary" :loading="loading" html-type="submit">确定</a-button>
            <a-button @click="cancelHandler">取消</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
  import { defineProps, reactive, ref, watch, watchEffect,onMounted } from 'vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import { VoUtils } from '@vocen/shared'
  import FormSelectTime from '/@/modules/components/FormSelectTime.vue'
  import { message } from 'ant-design-vue'

  const formRef = ref()
  const loading = ref(false)

  const props = defineProps({
    visible: {
      type: Boolean,
      default: false,
    },
    detail: {
      type: Object,
      default() {
        return {}
      },
    },
  })

  const buyerAddressList = ref([])
  const addressList = ref([])
  const homeTime = ref([])
  const formState = reactive({
    modelName: '',
    engineNo: '',
    buyerName: '',
    address: null,
    homeStartTime: '',
    homeEndTime: '',
    homeMsg: '',
    id: '',
    relationOrderId: '',
    remark: '',
    supportAmount: '',
  })
  const checkHomeTime = (data)=>{
    console.log(homeTime)
    if(!homeTime.value[0] || !homeTime.value[1]){
      return Promise.reject(new Error('请选择上门时间'));
    }else {
      return Promise.resolve();
    }

  }

  const emits = defineEmits(['update:visible', 'refresh'])
  const show = ref(false)

  //
  const cancelHandler = () => {
    formRef.value.resetFields()
    show.value = false
    emits('update:visible', false)
  }

  const initAddressData = async () => {
    const { data } = await adminHttp.COMPANY.receiverAddressList({
      companyId: props.detail.buyerId,
      // companyId: '161166913819508736',
    })

    addressList.value = data
    buyerAddressList.value = data
      ? data.map((item) => {
          return {
            label: `${item.name} ${item.mobile} ${item.provinceName}${item.cityName}${item.areaName}${item.address}`,
            value: item.id,
          }
        })
      : []
    console.log(data)
  }

  watchEffect(() => {
    show.value = props.visible
    formState.modelName = props.detail.modelName
    formState.engineNo = props.detail.engineNo
    formState.buyerName = props.detail.buyerName
    if(show.value){
      formState.homeStartTime = props.detail.homeStartTime?props.detail.homeStartTime: VoUtils.timeFormat(new Date().getTime(),'yyyy-mm-dd')
      formState.homeEndTime = ''
      homeTime.value = [formState.homeStartTime,formState.homeEndTime]
      initAddressData()
    }
    console.log(333333333)
  })

  // 提交下发售后任务
  const onFinish = async (val) => {
    const { address } = val
    const addressInfo: any = addressList.value.find((item) => item.id === address)
    // const
    const postAddress = {
      addressDetail: `${addressInfo.name} ${addressInfo.mobile} ${addressInfo.provinceName}${addressInfo.cityName}${addressInfo.areaName}${addressInfo.address}`,
      id: addressInfo.id,
      latitude: addressInfo.latitude,
      longitude: addressInfo.longitude,
      name: addressInfo.name,
      phone: addressInfo.mobile,
    }
    const postForm = {
      ...val,
      address: postAddress,
      homeStartTime: homeTime.value[0],
      homeEndTime: homeTime.value[1],
      id: props.detail.id,
      relationOrderId: props.detail.id,
    }

    try {
      loading.value = true
      const { code } = await adminHttp.ORDER.orderSupportAfterSaleSave(postForm)
      loading.value = false
      if (+code === 20001) {
        message.success('操作成功')
        cancelHandler()
        emits('refresh')
      }
    } catch (e) {
      loading.value = false
    }
  }

  watch(
    () => props.detail,
    (d) => {
      formState.modelName = d.modelName
      formState.engineNo = d.engineNo
      formState.buyerName = d.buyerName
    },
    {
      deep: true,
    },
  )

  // watch(
  //   () => props.visible,
  //   (val) => {
  //     console.log(val,'visiblevisiblevisiblevisible');
  //     show.value = val
  //     if (val) initAddressData()
  //   },
  // )

</script>

<style scoped lang="less"></style>
