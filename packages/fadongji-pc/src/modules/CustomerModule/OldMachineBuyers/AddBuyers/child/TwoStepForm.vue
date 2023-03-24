<template>
  <div class="p-20px bg-white mb-82px">
    <div class="w-600px mx-auto">
      <a-alert
        style="margin-bottom: 20px"
        type="error"
        v-if="failureStatus == 2 || failureStatus == 3"
        message="身份证审核失败"
        show-icon
      />
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
            :disabled="isDisabled('legalIdCardFront')"
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
            :disabled="isDisabled('legalIdCardBack')"
            v-model:value="formState.legalIdCardBack"
            @success="uploadLegalIdCardBackSuccess"
          />
        </a-form-item>
        <a-form-item
          label="法人姓名"
          name="legalName"
          :rules="[{ required: true, message: '请输入法人姓名', trigger: 'blur,change' }]"
        >
          <a-input
            :disabled="isDisabled()"
            v-model:value="formState.legalName"
            placeholder="请输入法人姓名"
          />
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
          <a-input
            :disabled="isDisabled()"
            v-model:value="formState.legalId"
            placeholder="请输入身份证号"
          />
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
                  :disabled="isDisabled()"
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
                  :disabled="isDisabled()"
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
            :disabled="isDisabled()"
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
          <a-input
            :disabled="isDisabled()"
            v-model:value="formState.address"
            readonly
            placeholder="请选择详细地址"
          >
            <template #addonAfter>
              <div @click="chooseMapHandler">选择</div>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item
          label="开户银行"
          name="parenBankName"
          :rules="[{ required: true, message: '请输入开户银行', trigger: 'blur,change' }]"
        >
          <div class="relative">
            <a-input
              :disabled="isDisabled()"
              v-model:value="formState.parenBankName"
              readonly
              placeholder="请输入开户银行"
            >
              <template #addonAfter>
                <div @click="visible = true">选择</div>
              </template>
            </a-input>
          </div>
        </a-form-item>
        <a-form-item
          label="开户支行"
          name="bankName"
          :rules="[{ required: true, message: '请输入开户支行', trigger: 'blur,change' }]"
        >
          <a-input
            :disabled="isDisabled()"
            v-model:value="formState.bankName"
            readonly
            placeholder="请输入开户支行"
          >
            <template #addonAfter>
              <div @click="visibleExta = true">选择</div>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item
          label="银行账号"
          name="accountNo"
          :rules="[
            {
              required: true,
              pattern: Pattern.positive_number,
              message: '请输入银行账号',
              trigger: ['blur', 'change'],
            },
            {
              pattern: Pattern.positive_number,
              message: '银行账号格式不正确',
              trigger: 'blur',
            },
          ]"
        >
          <a-input
            :disabled="isDisabled()"
            v-model:value="formState.accountNo"
            placeholder="请输入银行账号"
          />
        </a-form-item>
      </a-form>
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
      <VoMap
        v-model:visible="showMapBoo"
        :value="formState.address"
        @select="mapAddressSelectHandler"
      />
    </div>
    <div
      class="fixed bg-white left-250px right-30px bottom-0 flex items-center justify-center p-15px"
    >
      <div>
        <a-space>
          <a-button type="primary" @click="prevHandler">上一步</a-button>
          <a-button
            :disabled="disabled"
            type="primary"
            v-auth="'/v1/api/company/legal/oldMachine/add'"
            :loading="loading"
            @click="submit"
          >
            提交
          </a-button>
        </a-space>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  //
  import { reactive, watch, ref, computed, onBeforeMount } from 'vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import { FormOutlined } from '@ant-design/icons-vue'
  import FormOcRCardPositive from '/@/modules/components/FormOcRCardPositive.vue'
  import FormOcRCardCounter from '/@/modules/components/FormOcRCardCounter.vue'
  import WebStorage from '/@/utils/cache'
  import BankList from '/@/modules/components/BankList.vue'
  import { Pattern } from '@vocen/shared'
  import { message } from 'ant-design-vue'
  import { useRouter, useRoute } from 'vue-router'
  import VoMap from '/@/components/VoMap/VoMap.vue'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";

  const $router = useRouter()
  const route = useRoute()

  const visible = ref(false)
  const showMapBoo = ref(false)
  const visibleExta = ref(false)
  const options = ref([])
  const address = ref<string>('')

  const props = defineProps({
    current: {
      type: Number,
      default: 0,
    },
    failureStatus: {
      type: Number,
      default: 0,
    },
  })

  const emits = defineEmits(['update:value'])
  const formRef = ref()
  const isLongDate = computed(() => formState.legalEndDate === '长期')
  const dateFormat = 'YYYY-MM-DD'
  const defaultFormState = WebStorage.get('TwoStepFormAddBuyer') || {
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
    latitude: '',
    longitude: '',
  }
  const formState = reactive(defaultFormState)
  // OneStepFormAddBuyer
  const oneForm = WebStorage.get('OneStepFormAddBuyer')

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

  const disabled = computed(() => {
    const keys = Object.keys(formState)
    return !keys.every((k) => formState[k])
  })
  const isDisabled = computed(() => {
    return function (key) {
      // 审核拒绝后的状态(1:营业执照失败 ，2：身份证失败 ，3：营业执照和身份证都失败，5：通联审核失败)
      let statusTwo = ['legalIdCardBack', 'legalIdCardFront', 'businessLicenseUrl']
      if (props.failureStatus == 1 && key && key == 'businessLicenseUrl') {
        return false
      } else if (
        props.failureStatus == 2 &&
        key &&
        (key == 'legalIdCardBack' || key == 'legalIdCardFront')
      ) {
        console.log(props.failureStatus == 2, 'car')
        return false
      } else if (props.failureStatus == 3 && key && statusTwo.includes(key)) {
        return false
      } else if (props.failureStatus == 5 || !(route.query && route.query.id)) {
        return false
      } else {
        return true
      }
    }
  })

  // 选择地址回显
  const mapAddressSelectHandler = (data) => {
    formState.address = data.name + `(${data.address})`
    const { location } = data
    address.value = data.address
    formState.latitude = location.lat
    formState.longitude = location.lng
  }
  // 选择地址
  const chooseMapHandler = () => {
    showMapBoo.value = true
  }

  const loading = ref(false)
  const submit = async () => {
    if (route.query && route.query.id) {
      const { res } = await formRef.value.validateFields()
      console.log(res)
      switch (props.failureStatus) {
        case 1:
          upDateLicense()
          break
        case 2:
          upDateAnewIdentity()
          break
        case 3:
          upDateLegalAnewAll()
          break
        case 5:
          upDate()
          break
      }
    } else {
      addData()
    }
  }
  const addData = async () => {
    const postForm = Object.assign(
      {},
      {
        ...oneForm,
        ...formState,
        areaCode: formState.areaCode[2],
        companyType: 2, // 默认
      },
    )
    try {
      loading.value = true
      const ret = await AdminHttp.COMPANY.companyLegalOldMachineAdd(postForm)
      loading.value = false
      if (+ret.code === 20001) {
        WebStorage.remove('OneStepFormAddBuyer')
        WebStorage.remove('TwoStepFormAddBuyer')
        message.success('新增成功')
        await $router.push('/customerModule/OldMachineBuyers/BuyersList')
      }
    } catch (e) {
      loading.value = false
      console.warn(e, 'ThreeStepForm')
    }
  }
  // 编辑全部的内容
  const upDate = async () => {
    const postForm = Object.assign(
      {},
      {
        ...oneForm,
        ...formState,
        id: route.query.id,
        areaCode: formState.areaCode[2],
      },
    )
    try {
      loading.value = true
      const ret = await AdminHttp.COMPANY.companyLegalOldMachineUpdate(postForm)
      loading.value = false
      if (+ret.code === 20001) {
        WebStorage.remove('OneStepFormAddBuyer')
        WebStorage.remove('TwoStepFormAddBuyer')
        message.success('编辑成功')
        await $router.push('/customerModule/OldMachineBuyers/BuyersList')
      }
    } catch (e) {
      loading.value = false
      console.warn(e, 'ThreeStepForm')
    }
  }
  // 更新营业执照 companyLegalWnewLicense
  const upDateLicense = async () => {
    const postForm = { companyId: route.query.id, businessLicenseUrl: oneForm.businessLicenseUrl }
    try {
      loading.value = true
      const ret = await AdminHttp.COMPANY.companyLegalWnewLicense(postForm)
      loading.value = false
      if (+ret.code === 20001) {
        WebStorage.remove('OneStepFormAddBuyer')
        WebStorage.remove('TwoStepFormAddBuyer')
        message.success('编辑成功')
        await $router.push('/customerModule/OldMachineBuyers/BuyersList')
      }
    } catch (e) {
      loading.value = false
      console.warn(e, 'ThreeStepForm')
    }
  }
  // 更新身份证 companyLegalAnewIdentity
  const upDateAnewIdentity = async () => {
    const postForm = {
      companyId: route.query.id,
      legalIdCardFront: formState.legalIdCardFront,
      legalIdCardBack: formState.legalIdCardBack,
    }
    try {
      loading.value = true
      const ret = await AdminHttp.COMPANY.companyLegalAnewIdentity(postForm)
      loading.value = false
      if (+ret.code === 20001) {
        WebStorage.remove('OneStepFormAddBuyer')
        WebStorage.remove('TwoStepFormAddBuyer')
        message.success('编辑成功')
        await $router.push('/customerModule/OldMachineBuyers/BuyersList')
      }
    } catch (e) {
      loading.value = false
      console.warn(e, 'ThreeStepForm')
    }
  }
  // 更新营业执照和身份证 companyLegalAnewAll
  const upDateLegalAnewAll = async () => {
    const postForm = {
      companyId: route.query.id,
      legalIdCardFront: formState.legalIdCardFront,
      legalIdCardBack: formState.legalIdCardBack,
      businessLicenseUrl: oneForm.businessLicenseUrl,
    }
    try {
      loading.value = true
      const ret = await AdminHttp.COMPANY.companyLegalAnewAll(postForm)
      loading.value = false
      if (+ret.code === 20001) {
        WebStorage.remove('OneStepFormAddBuyer')
        WebStorage.remove('TwoStepFormAddBuyer')
        message.success('编辑成功')
        await $router.push('/customerModule/OldMachineBuyers/BuyersList')
      }
    } catch (e) {
      loading.value = false
      console.warn(e, 'ThreeStepForm')
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

  watch(isLongDate, (val) => {
    formState.businessLicenseEndDate = val ? '长期' : ''
  })

  onMountedOrActivated(() => {
    AdminHttp.sixHotAreaTree().then((res) => {
      options.value = res.data
    })
  })
</script>

<style scoped lang="less"></style>
