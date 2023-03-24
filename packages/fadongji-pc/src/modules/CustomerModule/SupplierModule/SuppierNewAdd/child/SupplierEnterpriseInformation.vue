<template>
  <EraForm hidden-btn="false" :props-rules="propsRules" :form-data="baseFormData">
	<template #content="{row}">
	  <template v-if="row.id ===baseFormDataEnum.isBusinessLicense">
		<EraUploadOneImage :upload-word="businessLicense"/>
	  </template>
	  <template v-else-if="row.id === baseFormDataEnum.isBusinessDate">
		<a-range-picker class="form-select" v-model:value="dateRange" @change="switchDateEvent"/>
	  </template>
	  <template v-else>
		<EraUploadOneImage :upload-word="companyLogoDescription"/>
	  </template>
	</template>
  </EraForm>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import moment, {Dayjs} from 'dayjs';

type RangeValue = [Dayjs, Dayjs];

import EraUploadOneImage from "/@/components/EraUploadOneImage/EraUploadOneImage.vue";

import {
  supplierNewAddSteps,
  baseFormData,
  propsRules,
  baseFormDataEnum,
} from "/@/modules/CustomerModule/SupplierModule/SuppierNewAdd/type/type";
// 供应商新增 -- form表单
import EraForm from "/@/components/EraForm/EraForm.vue";
// 供应商新增 -- 上传图片
import {FormOutlined} from "@ant-design/icons-vue";

export default defineComponent({
  name: 'SupplierEnterpriseInformation',
  components: {
	EraForm,
	FormOutlined,
	EraUploadOneImage,
  },
  setup() {
	let dateRange = ref<RangeValue>()
	const businessLicense = ref('上传营业执照')
	const companyLogoDescription = ref('上传企业logo')
	const switchDateEvent = (item) => {
	  let dateRange = moment(item[0]).format('YYYY-MM-DD') + '-' + moment(item[1]).format('YYYY-MM-DD')
	  propsRules.propsModelRef['businessDate'] = dateRange
	}
	return {
	  baseFormData,
	  supplierNewAddSteps,
	  propsRules,
	  switchDateEvent,
	  baseFormDataEnum,
	  dateRange,
	  businessLicense,
	  companyLogoDescription,
	}
  }
})
</script>
<style lang="less" scoped>
.box {
  width: 100%;
  
  .form-select {
	width: 246px;
  }
}
</style>
