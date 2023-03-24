<template>
  <div class="p-20px bg-white mb-82px">
    <div class="w-600px mx-auto">
      <a-form
        :model="formState"
        name="formRef"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 14 }"
        autocomplete="off"
        ref="formRef"
      >
        <a-form-item
          label="身份证-人像面"
          name="legalIdCardFront"
          :rules="[{ required: true, message: '身份证-人像面', trigger: 'blur,change' }]"
        >
          <FormOcRCardPositive
            :type="1"
            v-model:value="formState.legalIdCardFront"
            @success="uploadLegalIdCardFrontSuccess"
          />
        </a-form-item>
        <a-form-item
          label="身份证-国徽面"
          name="legalIdCardBack"
          :rules="[{ required: true, message: '身份证-国徽面', trigger: 'blur,change' }]"
        >
          <FormOcRCardCounter
            :type="1"
            v-model:value="formState.legalIdCardBack"
            @success="uploadLegalIdCardBackSuccess"
          />
        </a-form-item>
        <a-form-item
          label="法人姓名"
          name="legalName"
          :rules="[{ required: true, message: '请输入法人姓名', trigger: 'blur,change' }]"
        >
          <a-input v-model:value="formState.legalName" placeholder="请输入法人姓名" />
        </a-form-item>
        <a-form-item
          label="身份证号"
          name="legalId"
          :rules="[
            {
              required: true,
              pattern: Pattern.id_card,
              message: '请输入身份证号',
              trigger: 'blur,change',
            },
          ]"
        >
          <a-input v-model:value="formState.legalId" placeholder="请输入身份证号" />
        </a-form-item>
        <a-form-item
          style="margin-bottom: 0"
          label="身份证有效期"
          name="legalStartDate"
          :rules="[{ required: true, message: '请输入身份证有效期', trigger: 'blur,change' }]"
        >
          <div class="flex justify-between items-baseline">
            <div>
              <a-form-item
                name="legalStartDate"
                :rules="[{ required: true, message: '请选择开始时间', trigger: 'blur,change' }]"
              >
                <a-date-picker
                  :value-format="dateFormat"
                  :format="dateFormat"
                  style="width: 100%"
                  v-model:value="formState.legalStartDate"
                />
              </a-form-item>
            </div>
            <div class="px-10px pt-5px">至</div>
            <div>
              <a-form-item
                v-if="!isLongDate || editBusinessLicenseEnd"
                name="legalEndDate"
                :rules="[{ required: true, message: '请选择结束时间', trigger: 'blur,change' }]"
              >
                <a-date-picker
                  :value-format="dateFormat"
                  :format="dateFormat"
                  :style="{ width: editType == 'edit' ? '80%' : '100%' }"
                  v-model:value="formState.legalEndDate"
                />
                <a v-if="editBusinessLicenseEnd" class="ml-5px" @click="editEndTime('close')"
                  >取消</a
                >
              </a-form-item>
              <div v-else class="text-center flex-1">
                <span class="text-gray-300 mr-10px">{{ formState.legalEndDate }}</span>
                <form-outlined v-if="!editBusinessLicenseEnd" @click="editEndTime('edit')" />
              </div>
            </div>
          </div>
        </a-form-item>
        <a-form-item
          label="所属地区"
          name="areaCode"
          :rules="[{ required: true, message: '请选择所属地区', trigger: 'blur,change' }]"
        >
          <a-cascader
            class="codeCity"
            v-model:value="formState.areaCode"
            :field-names="{ label: 'name', value: 'code', children: 'children' }"
            :options="options"
            placeholder="请选择地区"
          />
        </a-form-item>
        <a-form-item
          label="详细地址"
          name="address"
          :rules="[{ required: true, message: '请输入详细地址', trigger: 'blur,change' }]"
        >
          <a-textarea v-model:value="formState.address" placeholder="请输入详细地址" allow-clear />
        </a-form-item>
        <a-form-item
          label="主体类型"
          name="companyType"
          :rules="[{ required: true, message: '主体类型不能为空', trigger: 'change' }]"
        >
          <a-radio-group v-model:value="formState.companyType">
            <a-radio :value="2">企业</a-radio>
            <a-radio :value="3">个人工商户</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          v-if="formState.companyType === 2"
          label="开户银行"
          name="parenBankName"
          :rules="[{ required: true, message: '请输入开户银行', trigger: 'blur,change' }]"
        >
          <div class="relative">
            <a-input v-model:value="formState.parenBankName" readonly placeholder="请输入开户银行">
              <template #addonAfter>
                <div @click="visible = true">选择</div>
              </template>
            </a-input>
          </div>
        </a-form-item>
        <a-form-item
          v-if="formState.companyType === 2"
          label="开户支行"
          name="bankName"
          :rules="[{ required: true, message: '请输入开户支行', trigger: 'blur' }]"
        >
          <a-input v-model:value="formState.bankName" readonly placeholder="请输入开户支行">
            <template #addonAfter>
              <div @click="visibleExta = true">选择</div>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item
          v-if="formState.companyType === 2"
          label="银行账号"
          name="accountNo"
          :rules="[
            {
              required: true,
              pattern: Pattern.positive_number,
              message: '请输入银行账号',
              trigger: 'blur',
            },
            {
              pattern: Pattern.positive_number,
              message: '银行账号格式不正确',
              trigger: 'blur',
            },
          ]"
        >
          <a-input v-model:value="formState.accountNo" placeholder="请输入银行账号" />
        </a-form-item>
      </a-form>
    </div>
    <BankList
      v-model:visible="visible"
      :value="formState.parenBankName"
      :type="1"
      @select="bankSelectHandler"
    />
    <BankList
      v-model:visible="visibleExta"
      :value="formState.bankName"
      :type="2"
      @select="bankEtraSelectHandler"
    />
  </div>
  <div
    class="fixed bg-white left-250px right-30px bottom-0 flex items-center justify-center p-15px"
  >
    <div>
      <a-space>
        <a-button type="primary" @click="prevHandler">上一步</a-button>
        <a-button :disabled="disabled" type="primary" @click="nextHandler">下一步</a-button>
      </a-space>
    </div>
  </div>
</template>

<script setup lang="ts">
  //
  import { reactive, ref, computed, onBeforeMount } from 'vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import FormOcRCardPositive from '/@/modules/components/FormOcRCardPositive.vue'
  import FormOcRCardCounter from '/@/modules/components/FormOcRCardCounter.vue'
  import WebStorage from '/@/utils/cache'
  import { FormOutlined } from '@ant-design/icons-vue'
  import BankList from '/@/modules/components/BankList.vue'
  import { Pattern, _ } from '@vocen/shared'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";

  const visible = ref(false)
  const visibleExta = ref(false)
  const options = ref([])

  defineProps({
    current: {
      type: Number,
      default: 0,
    },
  })

  const emits = defineEmits(['update:value'])
  const formRef = ref()
  const isLongDate = computed(() => formState.legalEndDate === '长期')
  const dateFormat = 'YYYY-MM-DD'
  const defaultFormState = WebStorage.get('TwoStepForm') || {
    legalId: '', // 法人身份证号
    legalStartDate: '', // 法人身份有效期 开始时间
    legalEndDate: '', // 法人身份有效期 结束时间
    legalIdCardBack: '', // 法人身份证反面
    legalIdCardFront: '', // 法人身份证正面
    legalName: '', // 法人姓名
    areaCode: [], //  区编码
    address: '', // 详细地址
    parenBankName: '', // 开户银行名称
    bankName: '', // 开户支行
    accountNo: '', // 银行账号
    unionBank: '', // 支付行号
    companyType: 2,
  }
  defaultFormState.companyType = 2
  const formState = reactive(defaultFormState)

  const disabled = computed(() => {
    if (formState.companyType === 2) {
      // 企业校验
      const keys = Object.keys(formState)
      return !keys.every((k) => formState[k])
    } else {
      // 个体工商户
      const checkForm = _.cloneDeep(formState)
      delete checkForm.parenBankName
      delete checkForm.bankName
      delete checkForm.accountNo
      delete checkForm.unionBank
      const keys = Object.keys(checkForm)
      return !keys.every((k) => checkForm[k])
    }
  })

  // 下一步
  const nextHandler = () => {
    formRef.value
      .validate()
      .then(() => {
        WebStorage.set('TwoStepForm', formState)
        emits('update:value', 2)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  // 编辑长期时间
  const editBusinessLicenseEnd = ref(false) // 编辑长期输入框
  const editType = ref('close')
  const editEndTime = (type) => {
    editType.value = type
    if (type == 'close') {
      formState.legalEndDate = '长期'
      editBusinessLicenseEnd.value = false
    } else {
      formState.legalEndDate = ''
      editBusinessLicenseEnd.value = true
    }
  }

  // 身份正面上传成功
  const uploadLegalIdCardFrontSuccess = (ocrData) => {
    formState.legalName = ocrData.name
    formState.legalId = ocrData.idNum
  }
  // 身份背面上传成功
  const uploadLegalIdCardBackSuccess = (ocrData) => {
    const date = ocrData.validDate.split('-')
    formState.legalStartDate = date[0].replaceAll('.', '-')
    if (date[1] === '长期') {
      formState.legalEndDate = date[1]
    } else {
      formState.legalEndDate = date[1].replaceAll('.', '-')
      if (!Pattern.isDateDay(formState.legalEndDate) && !Pattern.isDate(formState.legalEndDate)) {
        formState.legalEndDate = ''
      }
    }
    if (!Pattern.isDateDay(formState.legalStartDate) && !Pattern.isDate(formState.legalStartDate)) {
      formState.legalStartDate = ''
    }
  }
  const prevHandler = () => {
    emits('update:value', 0)
  }

  const bankSelectHandler = (val) => {
    formState.parenBankName = val
  }
  const bankEtraSelectHandler = (val) => {
    formState.bankName = val.bankName
    formState.unionBank = val.unionBank
  }

  // watch(isLongDate, (val) => {
  //   formState.legalEndDate = val ? '长期' : ''
  // })

  onMountedOrActivated(() => {
    AdminHttp.sixHotAreaTree().then((res) => {
      options.value = res.data
    })
  })
</script>

<style scoped lang="less"></style>
