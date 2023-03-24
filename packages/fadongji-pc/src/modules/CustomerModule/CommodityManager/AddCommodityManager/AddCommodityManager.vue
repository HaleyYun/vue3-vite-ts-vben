<template>
  <div>
    <div class="box-bg  bg-white m-24px p-24px mb-82px">
    <div class="template--title mb-20px">基础信息</div>
    <div class="w-600px mr-auto ml-auto m-0">
      <a-form
        :model="formState"
        name="formRef"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 14 }"
        :rules="rules"
        autocomplete="off"
        ref="formRef"
      >
        <a-form-item label="手机号码" name="userName">
          <a-input
            v-model:value="formState.userName"
            :maxlength="11"
            placeholder="请输入手机号码"
            allow-clear
          />
        </a-form-item>
        <a-form-item label="招商经理名称（昵称）" name="contractName">
          <a-input
            v-model:value="formState.contractName"
            :maxlength="10"
            placeholder="请输入"
            allow-clear
          />
        </a-form-item>
        <a-form-item label="所属地区" name="areaCode">
          <a-cascader
            v-model:value="formState.areaCode"
            :field-names="fieldNames"
            :options="AreaOptions"
            placeholder="请选择"
          />
        </a-form-item>
      </a-form>
    </div>
  </div>
  <div class="fixed bg-white left-250px right-25px bottom-0 flex items-center justify-center p-15px">
    <a-button v-auth="'/v1/api/company/legal/attract/add'" type="primary w-200px" :loading="loading" @click="submit">新增</a-button>
  </div>
  </div>
</template>

<script lang="ts" setup>
  import { defineComponent, ref, reactive, onBeforeMount } from 'vue'
  import type { Rule } from 'ant-design-vue/es/form'
  import { Pattern } from '@vocen/shared'
  import AdminHttp from '/@/utils/http/adminHttp'
  import { AreaDataApi } from '/@/api/model/dictionaryApi'
  import { useMessage } from '/@/hooks/web/useMessage'

  const { createMessage } = useMessage()
  import { useRouter } from 'vue-router'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";

  // ---form 表单设置----
  const formRef = ref()
  const router = useRouter()
  // 自定义校验营业执照信息
  let checkMobile = async (_rule: Rule, value) => {
    if (!value) {
      return Promise.reject('请输入手机号')
    }
    if (!Pattern.isPhone(value)) {
      return Promise.reject('请输入正确的手机号')
    }
    await AdminHttp.COMPANY.CompanyLegalAttractMobile({ mobile: value })

    return Promise.resolve()
  }
  const rules = {
    userName: [{ required: true, validator: checkMobile, trigger: 'blur' }],
    contractName: [{ required: true, trigger: 'blur' }],
    areaCode: [{ required: true, trigger: 'blur' }],
  }
  const formState = reactive({ userName: '', contractName: '', areaCode: '' })

  //---- 提交表单验证表单------
  const submit = async () => {
    try {
      const values = await formRef.value.validateFields()
      if (values) {
        addCommodity()
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  }
  const loading = ref(false)
  const addCommodity = async () => {
    try {
      loading.value = true
      let params = {
        userName: formState.userName,
        contractName: formState.contractName,
        areaCode: formState.areaCode[formState.areaCode.length - 1],
      }
      const { code, data } = await AdminHttp.COMPANY.CompanyLegalAttractAdd(params)
      if (code === '20001') {
        createMessage.success('新增成功')
        router.push('/customerModule/CommodityManager/CommodityManagerList')
      }
      loading.value = false
    } catch (e) {
      loading.value = false
    }
  }

  //----- 获取地区数据 dict 数据--------
  const AreaOptions = ref([])
  const fieldNames = ref({ children: 'children', label: 'name', value: 'id' })
  const getArea = async () => {
    try {
      const data = await AreaDataApi()
      AreaOptions.value = data
    } catch (e) {
      console.log(e)
    }
  }
  onMountedOrActivated(() => {
  
    getArea()
  })
</script>

<style scoped lang="less">
  .box-bg {
    height: calc(100vh - 162px);
  }
</style>
