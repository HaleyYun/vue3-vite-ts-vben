<template>
  <div>
    <div class="m-24px bg-white p-24px mb-82px">
      <div class="template--title mb-20px">基础信息</div>
      <div class="flex justify-center">
        <div class="w-600px">
          <BasicForm
            :wrapperCol="{ span: 24 }"
            :labelCol="{ span: 8 }"
            @register="registerForm"
            @submit="GarageCreateItemApiEvent"
          >
            <template #storeUrlSlot="{ model, field }">
              <div style="width: 100%">
                <FormLocalUpload v-model:value="model[field]" />
              </div>
            </template>
            <template #addressSlot="{ model, field }">
              <div style="width: 100%">
                <a-input v-model:value="model[field]" readonly placeholder="请选择详细地址">
                  <template #addonAfter>
                    <div @click="chooseMapHandler">选择</div>
                  </template>
                </a-input>
              </div>
            </template>
          </BasicForm>
        </div>
      </div>
      <VoMap v-model:visible="visible" :value="address" @select="mapAddressSelectHandler" />
    </div>
    <div
      class="fixed bg-white left-251px right-31px bottom-0 flex items-center justify-center p-15px"
    >
      <AButton type="primary" @click="backGarageNewFunc" class="margin-r-10">返回</AButton>
      <AButton type="primary" @click="handleSubmit">立即提交</AButton>
    </div>
  </div>
</template>
<script lang="ts" name="garageNew" setup>
  import { FilterGarageNewForm } from '/@/modules/CustomerModule/Garage/view/GarageNew/view/data/GarageNewData'
  import { useForm, BasicForm } from '/@/components/Form'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useMessage } from '/@/hooks/web/useMessage'
  import adminHttp from '/@/utils/http/adminHttp'
  import VoMap from '/@/components/VoMap/VoMap.vue'
  import FormLocalUpload from '/@/modules/components/FormLocalUpload.vue'

  const { createMessage } = useMessage()
  const $router = useRouter()

  const [
    registerForm,
    { submit: opFormSbumitFunc, setFieldsValue: setFieldsValue, getFieldsValue },
  ] = useForm({
    labelWidth: 120,
    schemas: FilterGarageNewForm,
    showResetButton: false,
    showSubmitButton: false,
  })
  const goRouter = useRouter()
  const address = ref('')

  const visible = ref(false)

  const GarageCreateItemApiEvent = async (item) => {
    console.log(item)
    const postForm = {
      ...item,
      carSeries: item.carSeries ? item.carSeries.join(',') : '',
      serviceProject: item.serviceProject ? item.serviceProject.join(',') : '',
      areaCode: item.areaCode[2],
    }
    const res = await adminHttp.CUSTOMER.apiCompanyLegalGarage(postForm)
    if (res.code === '20001') {
      createMessage.success('修理厂创建成功')
      $router.push('/customerModule/garageRouter/garageList')
    } else {
      createMessage.error('修理厂创建失败')
    }
  }

  const chooseMapHandler = () => {
    const t = getFieldsValue()
    address.value = t?.address
    visible.value = true
  }

  const mapAddressSelectHandler = ({ address }) => {
    setFieldsValue({
      address,
    })
  }

  const backGarageNewFunc = () => {
    goRouter.go(-1)
  }
  const handleSubmit = async () => {
    await opFormSbumitFunc()
  }
</script>
<style lang="less" scoped>
  .warn {
    color: #d9001b;
  }

  .backRG {
    border: 1px solid #ffff33 !important;
    background-color: #ffff33 !important;
    color: black !important;
  }
</style>
