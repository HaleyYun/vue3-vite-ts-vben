<template>
  <div class="form-assembly" style="padding: 20px">
	<!--  labelAlign="right" -->
	<div class="form-assembly-head">
	  <p class="head-query">筛选查询</p>
	  <!-- <Button type="text" class="moreSort">更多查询</Button> -->
	  <Button class="head-result">查询结果</Button>
	</div>
	<div class="assembly-box">
	  <Form
		class="assembly-box-from"
		layout="inline"
		:label-col="{ span: 9 }"
		:wrapper-col="{ span: 40 }"
	  >
		<FormItem class="box-from-supply often" label="供应商信息:">
		  <Input class="from-supply-input" size="large" placeholder="供应商ID/账号/名称/手机号"/>
		</FormItem>
		<FormItem label="所属地区:" class="box-from-region often">
		  <Select
			class="from-supply-select"
			v-model:value="cation"
			show-search
			placeholder="选择注册认证状态"
			size="large"
			:options="options1"
			@focus="handleFocus"
			@blur="handleBlur"
			@change="handleChange"
		  />
		</FormItem>
		<FormItem label="注册时间:" class="box-from-data often">
		  <a-range-picker v-model:value="value2" size="large">
			<template #dateRender="{ current }">
			  <div class="ant-calendar-date" :style="getCurrentStyle(current)">
				{{ current.date() }}
			  </div>
			</template>
		  </a-range-picker>
		</FormItem>
		<FormItem label="产品运营:" class="box-from-operate often">
		  <Select
			class="from-supply-operate"
			v-model:value="value"
			show-search
			placeholder="选择产品运营"
			size="large"
			:options="options"
			@focus="handleFocus1"
			@blur="handleBlur1"
			@change="handleChange1"
		  />
		</FormItem>
		<FormItem label="选择注册认证状态:" class="box-from-state often">
		  <Select
			class="from-supply-state"
			v-model:value="cation"
			show-search
			placeholder="选择注册认证状态"
			size="large"
			:options="options1"
			@focus="handleFocus2"
			@blur="handleBlur2"
			@change="handleChange2"
		  />
		</FormItem>
		<FormItem label="账号启用状态:" class="from-from-enable often">
		  <Select
			class="from-supply-enable"
			v-model:value="enable"
			show-search
			placeholder="选择账号启用状态"
			size="large"
			:options="options2"
			@focus="handleFocus3"
			@blur="handleBlur3"
			@change="handleChange3"
		  />
		</FormItem>
		<FormItem label="来源:" class="often">
		  <Select
			class="from-supply-source"
			v-model:value="source"
			show-search
			placeholder="选择来源"
			size="large"
			:options="options3"
			@focus="handleFocus"
			@blur="handleBlur"
			@change="handleChange"
		  />
		</FormItem>
	  </Form>
	</div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, CSSProperties} from 'vue'
import {SelectTypes} from 'ant-design-vue/es/select'
import {Dayjs} from 'dayjs'
import {Button, Form, Input, Select} from 'ant-design-vue'

export default defineComponent({
  components: {Button, Form, FormItem: Form.Item, Input, Select},
  setup() {
	//日期
	const getCurrentStyle = (current: Dayjs) => {
	  const style: CSSProperties = {}
	  if (current.date() === 1) {
		style.border = '1px solid #1890ff'
		style.borderRadius = '50%'
	  }
	  return style
	}
	//运营
	const options = ref<SelectTypes['options']>([
	  {value: '张三', label: '张三'},
	  {value: '李四', label: '李四'},
	  {value: '王五', label: '王五'},
	  {value: '赵66', label: '王66'},
	  {value: '王小五', label: '王小五'},
	  {value: '王大五', label: '王大五'},
	  {value: '王老五', label: '王小五'},
	])
	const handleChange = (value: string) => {
	  console.log(`selected ${value}`)
	}
	const handleBlur = () => {
	  console.log('blur')
	}
	const handleFocus = () => {
	  console.log('focus')
	}
	const filterOption = (input: string, option: any) => {
	  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
	}
	//认证状态
	const options1 = ref<SelectTypes['options']>([
	  {value: '未认证', label: '未认证'},
	  {value: '未审核', label: '未审核'},
	  {value: '待审核', label: '待审核'},
	  {value: '已审核', label: '已审核'},
	  {value: '待认证', label: '待认证'},
	  {value: '已认证', label: '已认证'},
	])
	const handleChange1 = (value: string) => {
	  console.log(`selected ${value}`)
	}
	const handleBlur1 = () => {
	  console.log('blur')
	}
	const handleFocus1 = () => {
	  console.log('focus')
	}
	const filterOption1 = (input: string, option: any) => {
	  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
	}
	//账号启用
	const options2 = ref<SelectTypes['options']>([
	  {value: '开启', label: '开启'},
	  {value: '关闭', label: '关闭'},
	])
	const handleChange2 = (value: string) => {
	  console.log(`selected ${value}`)
	}
	const handleBlur2 = () => {
	  console.log('blur')
	}
	const handleFocus2 = () => {
	  console.log('focus')
	}
	const filterOption2 = (input: string, option: any) => {
	  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
	}
	//来源
	const options3 = ref<SelectTypes['options']>([
	  {value: '抖音', label: '抖音'},
	  {value: '微信', label: '微信'},
	])
	const handleChange3 = (value: string) => {
	  console.log(`selected ${value}`)
	}
	const handleBlur3 = () => {
	  console.log('blur')
	}
	const handleFocus3 = () => {
	  console.log('focus')
	}
	const filterOption3 = (input: string, option: any) => {
	  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
	}
	return {
	  //日期
	  value2: ref<Moment[]>([]),
	  getCurrentStyle,
	  //运营
	  value: ref<string | undefined>(undefined),
	  filterOption,
	  handleBlur,
	  handleFocus,
	  handleChange,
	  options,
	  //认证状态
	  cation: ref<string | undefined>(undefined),
	  filterOption1,
	  handleBlur1,
	  handleFocus1,
	  handleChange1,
	  options1,
	  //启用状态
	  enable: ref<string | undefined>(undefined),
	  filterOption2,
	  handleBlur2,
	  handleFocus2,
	  handleChange2,
	  options2,
	  //启用状态
	  source: ref<string | undefined>(undefined),
	  filterOption3,
	  handleBlur3,
	  handleFocus3,
	  handleChange3,
	  options3,
	}
  },
})
</script>

<style lang="less" scoped>
.form-assembly {
  padding: 20px;
  
  .form-assembly-head {
	border: 1px solid #c4c4c4;
	display: flex;
	width: 100%;
	height: 50px;
	background-color: #e6e6e6;
	justify-content: space-between;
	align-items: center;
	
	.head-query {
	  flex-grow: 1;
	  margin-left: 40px;
	  margin-top: 15px;
	  align-items: center;
	  line-height: 50px;
	  font-size: 14px;
	}
	
	.head-result {
	  margin: auto 20px;
	}
	
	.moreSort {
	  margin-right: 50px;
	}
  }
  
  .assembly-box {
	border: 1px solid #c4c4c4;
	border-top: none;
	
	.assembly-box-from {
	  padding: 10px;
	  
	  .often {
		margin-bottom: 15px;
		align-items: center;
	  }
	  
	  .box-from-supply {
		margin-right: 150px;
		
		.from-supply-input {
		  width: 200px;
		}
	  }
	  
	  .box-from-region {
		margin-right: 150px;
		
		.from-supply-select {
		  width: 200px;
		}
	  }
	  
	  .box-from-data {
		margin-right: 150px;
	  }
	  
	  .box-from-operate {
		margin-right: 195px;
		
		.from-supply-operate {
		  width: 200px;
		}
	  }
	  
	  .box-from-state {
		margin-right: 125px;
		
		.from-supply-state {
		  width: 200px;
		}
	  }
	  
	  .from-from-enable {
		margin-right: 130px;
		
		.from-supply-enable {
		  width: 200px;
		}
	  }
	  
	  .from-supply-source {
		width: 200px;
	  }
	}
  }
}
</style>
