<template>
  <EraForm
    ref="editFormContentRef"
    hidden-btn="false"
    :props-rules="legalInforPropsRules"
    :form-data="legalInformationData"
  >
    <template #content="{ row }">
      <template v-if="row.id === legalInformationEnum.isIdCardFront">
        <EraUploadOneImage :upload-word="uploadIdCardFront" />
      </template>
      <template v-else-if="row.id === legalInformationEnum.isIdCardSide">
        <EraUploadOneImage :upload-word="uploadIdCardFront" />
      </template>
      <template v-else-if="legalInformationEnum.isIdCardDate">
        <RangePicker class="form-select" v-model:value="dateRange" @change="switchDateEvent" />
      </template>
    </template>
  </EraForm>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import type { Dayjs } from 'dayjs'

  type RangeValue = [Dayjs, Dayjs]
  import moment from 'dayjs'

  import {
    supplierNewAddSteps,
    baseFormData,
    propsRules,
    baseFormDataEnum,
    legalInformationData,
    legalInforPropsRules,
    legalInformationEnum,
  } from '/@/modules/CustomerModule/SupplierModule/SuppierNewAdd/type/type'
  // 供应商新增 -- form表单
  import EraForm from '/@/components/EraForm/EraForm.vue'
  // 供应商新增 -- 上传图片
  import EraUploadOneImage from '/@/components/EraUploadOneImage/EraUploadOneImage.vue'
  import { FormOutlined } from '@ant-design/icons-vue'

  export default defineComponent({
    name: 'SupplierLegalPersonInformation',
    components: {
      EraForm,
      FormOutlined,

      EraUploadOneImage,
    },
    setup() {
      let uploadIdCardFront = ref('正面')
      let uploadSide = ref('侧面')
      let dateRange = ref<RangeValue>()
      const editFormContentRef = ref()
      const switchDateEvent = (item) => {
        let dateRange =
          moment(item[0]).format('YYYY-MM-DD') + '-' + moment(item[1]).format('YYYY-MM-DD')
        propsRules.propsModelRef['businessDate'] = dateRange
      }
      const editContentEvent = () => {
        editFormContentRef.value.onSubmit()
      }
      return {
        baseFormData,
        supplierNewAddSteps,
        propsRules,
        legalInforPropsRules,
        legalInformationData,
        switchDateEvent,
        editContentEvent,
        editFormContentRef,
        baseFormDataEnum,
        legalInformationEnum,
        dateRange,
        uploadSide,
        uploadIdCardFront,
      }
    },
  })
</script>
<style lang="less" scoped>
  .form-select {
    width: 246px;
  }
</style>
