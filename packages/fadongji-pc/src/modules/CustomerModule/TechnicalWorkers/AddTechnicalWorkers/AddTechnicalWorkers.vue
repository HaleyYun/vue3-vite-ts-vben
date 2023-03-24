<template>
  <div class="bg-white m-24px p-24px mb-82px">
    <div class="template--title mb-20px">新增集师傅</div>
    <div class="w-600px mr-auto ml-auto m-0">
      <a-form
        :model="formState"
        name="formRef"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 14 }"
        autocomplete="off"
        ref="formRef"
      >
        <a-form-item
          label="联系电话"
          name="userName"
          :rules="[{ required: true, validator: checkMobile, trigger: 'blur' }]"
        >
          <a-input
            v-model:value="formState.userName"
            :maxlength="11"
            placeholder="请输入联系电话"
            allow-clear
          />
        </a-form-item>
        <a-form-item
          label="主修车系"
          name="carSeries"
          :rules="[{ required: true, trigger: 'blur,change' }]"
        >
          <a-select
            v-model:value="formState.carSeries"
            mode="multiple"
            :maxTagCount="5"
            style="width: 100%"
            placeholder="请选择"
            allow-clear
          >
            <a-select-option
              v-for="(item, index) of carSeriesList"
              :key="index + 'car'"
              :value="item.code"
              >{{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="技能专长"
          name="skillType"
          :rules="[{ required: true, trigger: 'blur,change' }]"
        >
          <a-select
            v-model:value="formState.skillType"
            mode="multiple"
            :maxTagCount="5"
            style="width: 100%"
            placeholder="请选择"
            allow-clear
          >
            <a-select-option value="1">电路</a-select-option>
            <a-select-option value="2">变速箱</a-select-option>
            <a-select-option value="3">发动机</a-select-option>
            <a-select-option value="4">车身底盘</a-select-option>
            <a-select-option value="5">油路</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="所在区域"
          name="areaCode"
          :rules="[{ required: true, trigger: 'blur,change' }]"
        >
          <a-cascader
            v-model:value="formState.areaCode"
            :field-names="fieldNames"
            :options="AreaOptions"
            placeholder="请选择"
          />
        </a-form-item>
        <a-form-item
          label="详细地址"
          name="address"
          :rules="[{ required: true, message: '请选择详细地址', trigger: 'blur,change' }]"
        >
          <a-input v-model:value="formState.address" readonly placeholder="请选择详细地址">
            <template #addonAfter>
              <div @click="chooseMapHandler">选择</div>
            </template>
          </a-input>
        </a-form-item>
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
          label="姓名"
          name="legalName"
          :rules="[{ required: true, message: '请输入姓名', trigger: 'blur,change' }]"
        >
          <a-input v-model:value="formState.legalName" placeholder="请输入姓名" />
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
        <a-form-item style="margin-bottom: 0" label="身份证有效期" name="legalStartDate">
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
      </a-form>
    </div>
    <VoMap v-model:visible="showMapBoo" :value="address" @select="mapAddressSelectHandler" />
  </div>
  <div
    class="fixed bg-white left-251px right-31px bottom-0 flex items-center justify-center p-15px"
  >
    <a-button
      v-auth="'/v1/api/company/legal/SkilledWorker/add'"
      type="primary w-150px"
      @click="submit"
      :loading="loading"
      >新增</a-button
    >
  </div>
</template>

<script lang="ts" name="TechnicalWorkersAdd" setup>
  import { computed, onBeforeMount, reactive, ref, watch } from 'vue'
  import type { Rule } from 'ant-design-vue/es/form'
  import { Pattern } from '@vocen/shared'
  import AdminHttp from '/@/utils/http/adminHttp'
  import { AreaDataApi, getcompanyInfoCarSeries } from '/@/api/model/dictionaryApi'

  import VoMap from '/@/components/VoMap/VoMap.vue'
  import { FormOutlined } from '@ant-design/icons-vue'

  import FormOcRCardPositive from '/@/modules/components/FormOcRCardPositive.vue'
  import FormOcRCardCounter from '/@/modules/components/FormOcRCardCounter.vue'
  import { message } from 'ant-design-vue'
  import { useRouter } from 'vue-router'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const router = useRouter()

  const address = ref<string>('')
  const loading = ref(false)
  // ---form 表单设置----
  const formRef = ref()

  const defaultFormState = {
    userName: '', // 联系电话
    carSeries: [], // 车系
    special_skills: [], // 技能专长类型
    areaCode: [], //  所在区域
    address: '', // 详细地址
    legalId: '', // 身份证号
    legalStartDate: '', // 身份有效期 开始时间
    legalEndDate: '', // 身份有效期 结束时间
    legalIdCardBack: '', // 身份证反面
    legalIdCardFront: '', // 身份证正面
    legalName: '', // 姓名
    latitude: '', //
    longitude: '',
  }
  const formState = reactive(defaultFormState)

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

  // 身份证 身份证时间
  const dateFormat = 'YYYY-MM-DD'
  const isLongDate = computed(() => formState.legalEndDate === '长期')
  // 身份正面上传成功
  const uploadLegalIdCardFrontSuccess = (ocrData) => {
    formState.legalName = ocrData.name
    formState.legalId = ocrData.idNum
  }

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

  // 自定义校验营业执照信息
  let checkMobile = async (_rule: Rule, value) => {
    if (!value) {
      return Promise.reject('请输入手机号')
    }
    if (!Pattern.isPhone(value)) {
      return Promise.reject('请输入正确的手机号')
    }
    await AdminHttp.COMPANY.companyLegalSkilledWorkerMobile({ mobile: value })

    return Promise.resolve()
  }

  watch(isLongDate, (val) => {
    formState.legalEndDate = val ? '长期' : ''
  })

  // 选择地图
  const showMapBoo = ref(false)

  //---- 提交表单验证表单------
  const submit = async () => {
    loading.value = true
    try {
      const values = await formRef.value.validateFields()
      if (values) {
        const postForm = {
          ...formState,
          areaCode: values.areaCode[2],
          skillType: values.skillType.join(','),
          carSeries: values.carSeries.join(','),
        }
        const { code } = await AdminHttp.COMPANY.companyLegalSkilledWorkerAdd(postForm)
        loading.value = false
        if (+code === 20001) {
          message.success('新增成功')
          await router.push('/customerModule/TechnicalWorkers/TechnicalWorkersList')
        }
      }
    } catch (errorInfo) {
      loading.value = false
      console.log('Failed:', errorInfo)
    }
  }

  //----- 获取地区数据 dict 数据--------
  const AreaOptions = ref<any>([])
  const fieldNames = ref({ children: 'children', label: 'name', value: 'id' })
  const getArea = async () => {
    try {
      AreaOptions.value = await AreaDataApi()
    } catch (e) {
      console.log(e)
    }
  }

  // -------获取主修车系数据--------
  const carSeriesList = ref<any>([])
  const getCarSeriesList = async () => {
    try {
      let { data } = await getcompanyInfoCarSeries()
      carSeriesList.value = data ? data : []
    } catch (e) {
      console.log(e)
    }
  }

  onMountedOrActivated(() => {
    getArea()
    getCarSeriesList()
  })
</script>

<style scoped lang="less">
  .box-bg {
    height: calc(100vh - 80px);
  }
</style>
