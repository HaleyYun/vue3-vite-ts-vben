<template>
  <div class="p-20px bg-white mb-82px">
    <div class="w-600px mx-auto">
      <a-form
        :model="formState"
        name="formRef"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 14 }"
        autocomplete="off"
        ref="formRef"
      >
        <a-form-item
          label="手机号码"
          name="mobile"
          :rules="[{ required: true, validator: checkMobile, trigger: 'blur' }]"
        >
          <a-input
            v-model:value="formState.mobile"
            :maxlength="11"
            placeholder="请输入手机号码"
            allow-clear
          />
        </a-form-item>
        <a-form-item
          label="营业执照"
          name="businessLicenseUrl"
          :rules="[{ required: true, message: '请上传营业执照', trigger: 'blur,change' }]"
        >
          <FormOcRUpload v-model:value="formState.businessLicenseUrl" @success="uploadSuccess" />
        </a-form-item>
        <a-form-item
          label="营业执照名称"
          name="fullName"
          :rules="[{ required: true, message: '请输入营业执照名称', trigger: 'blur,change' }]"
        >
          <a-input
            v-model:value="formState.fullName"
            placeholder="请输入营业执照名称"
            allow-clear
          />
        </a-form-item>
        <a-form-item
          label="统一信用代码"
          name="businessLicense"
          :rules="[
            {
              required: true,
              pattern: Pattern.credit_code,
              message: '填写正确的统一信用代码',
              trigger: 'blur,change',
            },
          ]"
        >
          <a-input
            v-model:value="formState.businessLicense"
            placeholder="请输入统一信用代码"
            allow-clear
          />
        </a-form-item>
        <a-form-item
          label="店铺简称"
          name="storeName"
          :rules="[{ required: true, message: '请输入店铺简称', trigger: 'blur,change' }]"
        >
          <a-input v-model:value="formState.storeName" placeholder="请输入店铺简称" allow-clear />
        </a-form-item>
        <a-form-item
          label="法人姓名"
          name="legalName"
          :rules="[{ required: true, message: '请输入法人姓名', trigger: 'blur,change' }]"
        >
          <a-input v-model:value="formState.legalName" placeholder="请输入法人姓名" allow-clear />
        </a-form-item>
        <a-form-item
          label="营业期限"
          style="margin-bottom: 0"
          name="businessLicenseEndDate"
          :rules="[{ required: true, message: '请输入营业期限', trigger: 'blur,change' }]"
        >
          <div class="flex justify-between items-baseline">
            <div>
              <a-form-item
                name="businessLicenseStartDate"
                :rules="[{ required: true, message: '请输入营业开始时间', trigger: 'blur,change' }]"
              >
                <a-date-picker
                  :value-format="dateFormat"
                  :format="dateFormat"
                  style="width: 100%"
                  v-model:value="formState.businessLicenseStartDate"
                />
              </a-form-item>
            </div>
            <div class="px-10px pt-5px">至</div>
            <div>
              <a-form-item
                v-if="!isLongDate || editBusinessLicenseEnd"
                name="businessLicenseEndDate"
                :rules="[{ required: true, message: '请输入营业结束时间', trigger: 'blur,change' }]"
              >
                <a-date-picker
                  :value-format="dateFormat"
                  :format="dateFormat"
                  :style="{ width: editType == 'edit' ? '80%' : '100%' }"
                  v-model:value="formState.businessLicenseEndDate"
                />
                <a v-if="editBusinessLicenseEnd" class="ml-5px" @click="editEndTime('close')"
                  >取消</a
                >
              </a-form-item>
              <div v-else class="text-center flex-1">
                <span class="text-gray-300 mr-20px">{{ formState.businessLicenseEndDate }}</span>
                <form-outlined v-if="!editBusinessLicenseEnd" @click="editEndTime('edit')" />
              </div>
            </div>
          </div>
        </a-form-item>
        <a-form-item
          label="店铺logo"
          name="storeUrl"
          :rules="[{ required: true, message: '请上传店铺logo', trigger: 'blur,change' }]"
        >
          <FormLocalUpload v-model:value="formState.storeUrl" />
        </a-form-item>
      </a-form>
    </div>
  </div>
  <div
    class="fixed bg-white left-250px right-30px bottom-0 flex items-center justify-center p-15px"
  >
    <div>
      <a-space>
        <a-button :disabled="disabled" type="primary" @click="nextHandler">下一步</a-button>
      </a-space>
    </div>
  </div>
</template>

<script setup lang="ts">
  //
  import { reactive, ref, computed } from 'vue'
  import type { Rule } from 'ant-design-vue/es/form'
  import AdminHttp from '/@/utils/http/adminHttp'
  import { FormOutlined } from '@ant-design/icons-vue'
  import FormOcRUpload from '/@/modules/components/FormOcRUpload.vue'
  import FormLocalUpload from '/@/modules/components/FormLocalUpload.vue'
  import WebStorage from '/@/utils/cache' // 缓存
  import { Pattern } from '@vocen/shared'

  const props = defineProps({
    current: {
      type: Number,
      default: 0,
    },
  })

  const emits = defineEmits(['update:value'])

  const formRef = ref()
  const date = ref<any>([])
  const isLongDate = computed(() => formState.businessLicenseEndDate === '长期')
  const dateFormat = 'YYYY-MM-DD'
  const defaultFormState = WebStorage.get('OneStepForm') || {
    companyType: 2, // 企业类型
    mobile: '', // 手机号码
    businessLicenseUrl: '', // 营业执照图片地址
    fullName: '', // 公司名称
    businessLicense: '', // 信用代码
    storeName: '', // 店铺简称
    legalName: '', // 法人姓名
    businessLicenseEndDate: '', //  营业结束时间 营业期限
    businessLicenseStartDate: '', // 营业开始时间
    storeUrl: '', // 企业logo
  }
  console.log(defaultFormState)
  const formState = reactive(defaultFormState)
  // 编辑长期时间
  const editBusinessLicenseEnd = ref(false) // 编辑长期输入框
  const editType = ref('close')
  const editEndTime = (type) => {
    editType.value = type
    if (type == 'close') {
      formState.businessLicenseEndDate = '长期'
      editBusinessLicenseEnd.value = false
    } else {
      formState.businessLicenseEndDate = ''
      editBusinessLicenseEnd.value = true
    }
  }

  const disabled = computed(() => {
    const keys = Object.keys(formState)
    return !keys.every((k) => formState[k])
  })

  // 下一步
  const nextHandler = () => {
    formRef.value
      .validate()
      .then(() => {
        WebStorage.set('OneStepForm', formState)
        emits('update:value', props.current + 1)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // 自定义校验营业执照信息
  let checkMobile = async (_rule: Rule, value) => {
    if (!value) {
      return Promise.reject('请输入手机号')
    }
    if (!Pattern.isPhone(value)) {
      return Promise.reject('请输入正确的手机号')
    }
    await AdminHttp.CUSTOMER.apiCompanyLegalSupplierMobile({ mobile: value })

    return Promise.resolve()
  }

  // 营业执照上传成功
  const uploadSuccess = (ocrData) => {
    formState.fullName = ocrData.companyName
    console.log(ocrData.period.indexOf('长期'))
    if (ocrData.period && ocrData.period.indexOf('长期') > -1) {
      // 属于长期
      formState.businessLicenseStartDate = ocrData.setDate
        .replaceAll('年', '-')
        .replaceAll('月', '-')
        .replaceAll('日', '')
      formState.businessLicenseEndDate = '长期'
      if (
        !Pattern.isDateDay(formState.businessLicenseStartDate) &&
        !Pattern.isDate(formState.businessLicenseStartDate)
      ) {
        formState.businessLicenseStartDate = ''
      }
    } else {
      const dateArr = ocrData.period
        .replaceAll('年', '-')
        .replaceAll('月', '-')
        .replaceAll('日', '')
        .split('至')
      const start = dateArr[0]
        .split('-')
        .map((item) => {
          const sItem = item.toString()
          return sItem[1] ? sItem : `0${sItem}`
        })
        .join('-')
      const end = dateArr[1]
        .split('-')
        .map((item) => {
          const sItem = item.toString()
          return sItem[1] ? sItem : `0${sItem}`
        })
        .join('-')
      date.value = [start, end]
      console.log(dateArr)
      console.log(ocrData.period)
      formState.businessLicenseStartDate = start
      formState.businessLicenseEndDate = end
      if (!Pattern.isDateDay(start) && !Pattern.isDate(start)) {
        formState.businessLicenseStartDate = ''
      }
      if (!Pattern.isDateDay(end) && !Pattern.isDate(end)) {
        formState.businessLicenseEndDate = ''
      }
    }

    formState.businessLicense = ocrData.regNum
    formState.businessLicenseUrl = ocrData.url
    formState.legalName = ocrData.person
  }
</script>

<style scoped lang="less"></style>
