<template>
  <div class="box-bg">
    <div class="box">
      <div class="px-30px pt-30px pb-5 bg-white">
        <a-steps :current="current">
          <a-step
            v-for="(step, index) in stepList"
            :key="index"
            :title="step.title"
            :description="step.description"
          />
        </a-steps>
      </div>
      <div class="box-steps__content">
        <div >
          <OneStepForm
            v-model:value="current"
            :failureStatus="failureStatus"
            v-if="!loading && current === 0"
          />
          <TwoStepForm
            v-model:value="current"
            :failureStatus="failureStatus"
            v-if="!loading && current === 1"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" name="AddBuyers"  setup>
  import { ref, onBeforeUnmount } from 'vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import { FormOutlined } from '@ant-design/icons-vue'
  import OneStepForm from './child/OneStepForm.vue'
  import TwoStepForm from './child/TwoStepForm.vue'
  import WebStorage from '/@/utils/cache' // 缓存
  import { Pattern } from '@vocen/shared'
  import { useRoute } from 'vue-router'

  const stepList = ref([
    {
      title: '企业信息',
      description: '企业的基本信息',
    },
    {
      title: '法人信息',
      description: '法人基本信息',
    },
  ])
  const current = ref(0)
  const route = useRoute()
  const loading = ref(true)
  const failureStatus = ref(null)

  const getAuthInfo = async () => {
    try {
      const params = { companyId: route.query.id }
      const { code, data } = await AdminHttp.COMPANY.companyLegalAuthInfo(params)
      loading.value = true
      if (code == '20001') {
        failureStatus.value = data.failureStatus
        setOneForm(data)
        setTwoForm(data)
      }
      loading.value = false
    } catch (e) {
      console.log(e)
      loading.value = false
    }
  }
  const setOneForm = (info) => {
    const data = {
      mobile: info.userName, // 手机号码
      businessLicenseUrl: info.businessLicenseUrl, // 营业执照图片地址
      fullName: info.fullName, // 公司名称
      businessLicense: info.businessLicense, // 信用代码
      storeName: info.storeName, // 店铺简称
      legalName: info.legalName, // 法人姓名
      businessLicenseEndDate: info.businessLicenseEndDate, //  营业结束时间 营业期限
      businessLicenseStartDate: info.businessLicenseStartDate, // 营业开始时间
      storeUrl: info.storeUrl, // 企业logo
    }
    if (
      !Pattern.isDateDay(data.businessLicenseStartDate) &&
      !Pattern.isDate(data.businessLicenseStartDate)
    ) {
      data.businessLicenseStartDate = ''
    }
    WebStorage.set('OneStepFormAddBuyer', data)
  }
  const setTwoForm = (info) => {
    const data = {
      legalId: info.legalId, // 法人身份证号
      legalStartDate: info.legalStartDate, // 法人身份有效期 开始时间
      legalEndDate: info.legalEndDate, // 法人身份有效期 结束时间
      legalIdCardBack: info.legalIdCardBack, // 法人身份证反面
      legalIdCardFront: info.legalIdCardFront, // 法人身份证正面
      legalName: info.legalName, // 法人姓名
      areaCode: [info.provinceCode, info.cityCode, info.areaCode], //  区编码
      address: info.address, // 详细地址
      parenBankName: info.parenBankName, // 开户银行名称
      bankName: info.bankName, // 开户支行
      accountNo: info.accountNo, // 银行账号
      unionBank: info.unionBank, // 支付行号
      latitude: info.latitude,
      longitude: info.longitude,
    }
    WebStorage.set('TwoStepFormAddBuyer', data)
  }
  if (route.query && route.query.id) {
    getAuthInfo()
  } else {
    loading.value = false
  }

  onBeforeUnmount(() => {
    WebStorage.remove('OneStepFormAddBuyer')
    WebStorage.remove('TwoStepFormAddBuyer')
  })
</script>
<style lang="less" scoped>
  .box-bg {
    margin: 24px;
    .box {
      .box-steps {
        width: 100%;
        padding: 10px;
      }

      .box-steps__content {
        width: 100%;

        .box-title {
          .box-space {
            width: 100%;
            padding: 10px;
            box-sizing: border-box;
            border-bottom: 1px solid #e4e4e4;
          }
        }
      }

      .bottom-btn {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: 15px;
        width: calc(100% - 30px);
        height: 50px;

        .form-btn {
          margin-right: 10px;
          width: 80px;
        }
      }
    }

    .box-form {
      margin-top: 10px;
      width: 100%;
    }

    .form-select {
      width: 246px;
    }
  }
</style>
