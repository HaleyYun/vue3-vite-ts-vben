<template>
  <div class="form-list">
	<div class="form-list-choice">
	  <RadioGroup v-model:value="ification">
		<RadioButton value="a" class="choice-btnItem" size="small">
		  待完善信息(<span class="choice-content">{{ 1000 }}</span
		>)
		</RadioButton>
		<RadioButton value="b" class="choice-btnItem" size="small"
		>待出售(<span class="choice-content">{{ 100 }}</span
		>)
		</RadioButton>
		<RadioButton value="c" class="choice-btnItem" size="small"
		>出售中(<span class="choice-content">{{ 100 }}</span
		>)
		</RadioButton>
		<RadioButton value="d" class="choice-btnItem" size="small"
		>缺货预警(<span class="choice-content">{{ 100 }}</span
		>)
		</RadioButton>
		<RadioButton value="e" class="choice-btnItem" size="small"
		>缺货停销(<span class="choice-content">{{ 100 }}</span
		>)
		</RadioButton>
		<RadioButton value="f" class="choice-btnItem" size="small"
		>违规商品(<span class="choice-content">{{ 1000 }}</span
		>)
		</RadioButton>
		<RadioButton value="g" class="choice-btnItem" size="small"
		>草稿箱(<span class="choice-content">{{ 1000 }}</span
		>)
		</RadioButton>
	  </RadioGroup>
	</div>
	<div class="form-list-box">
	  <Form class="box-layout" layout="inline" :label-col="{ span: 5 }">
		<Row>
		  <Col :span="6">
			<FormItem label="输入搜索">
			  <Input placeholder="商品名称" class="constant"/>
			</FormItem>
		  </Col>
		  <Col :span="6">
			<FormItem label="商品类别" :label-col="{ span: 7, offset: 3 }">
			  <Input placeholder="可输入关键字" class="constant"/>
			</FormItem>
		  </Col>
		  <Col :span="6">
			<FormItem label="商品品牌:" :label-col="{ span: 8, offset: 8 }">
			  <Input placeholder="可输入关键字" class="constant"/>
			</FormItem>
		  </Col>
		  <Col :span="6">
			<FormItem>
			  <div class="action-btn-box">
				<Button type="primary" class="submit-btn">查询结果</Button>
				<Button class="rest-btn">重置</Button>
			  </div>
			</FormItem>
		  </Col>
		</Row>
	  </Form>
	  <Form class="box-layout" layout="inline" :label-col="{ span: 5 }">
		<Row>
		  <Col :span="6">
			<FormItem label="供应商">
			  <Input placeholder="可输入关键字" class="constant"/>
			</FormItem>
		  </Col>
		  <Col :span="6">
			<FormItem label="上架时间" :label-col="{ span: 8 }">
			  <a-range-picker v-model:picker="value2" class="constant">
				<template #dateRender="{ current }">
				  <div class="ant-calendar-date" :style="getCurrentStyle(current)">
					{{ current.date() }}
				  </div>
				</template>
			  </a-range-picker>
			</FormItem>
		  </Col>
		  <Col v-if="false" :span="6">
			<FormItem label="下架时间:" :label-col="{ span: 13 }">
			  <a-range-picker v-model:picker="value2" class="constant">
				<template #dateRender="{ current }">
				  <div class="ant-calendar-date" :style="getCurrentStyle(current)">
					{{ current.date() }}
				  </div>
				</template>
			  </a-range-picker>
			</FormItem>
		  </Col>
		  <Col :span="6">
			<FormItem>
			  <div class="box-layout-item" style="width: 400px"></div>
			</FormItem>
		  </Col>
		</Row>
	  </Form>
	</div>
  </div>
  <GoodsTable/>
</template>

<script lang="ts">
import {defineComponent, ref, CSSProperties} from 'vue'
// import { SelectTypes } from 'ant-design-vue/es/select'
import {Dayjs} from 'dayjs'
import {Button, Form, Input, Radio, Row, Col} from 'ant-design-vue'
import GoodsTable from '/@/modules/GoodsModule/GoodsManage/component/GoodsTable.vue'

export default defineComponent({
  components: {
	GoodsTable,
	Button,
	Form,
	FormItem: Form.Item,
	Input,
	RadioGroup: Radio.Group,
	RadioButton: Radio.Button,
	Row,
	Col,
  },
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
	const ification = ref<string>('a')
	
	return {
	  //日期
	  ification,
	  value2: ref<Dayjs[]>([]),
	  getCurrentStyle,
	}
  },
})
</script>

<style lang="less" scoped>
.form-list {
  padding: 15px;
  
  .form-list-box {
	padding-top: 15px;
	position: relative;
	background-color: #fff;
	
	.action-btn-box {
	  display: flex;
	  
	  .submit-btn {
		margin-left: 150px;
	  }
	  
	  .rest-btn {
		margin-left: 15px;
	  }
	}
	
	.box-layout {
	  padding: 10px;
	  
	  .constant {
		width: 240px;
	  }
	  
	  .box-layout-item {
		width: 425px;
	  }
	}
  }
  
  .form-list-choice {
	padding: 20px;
	width: 100%;
	background-color: #fff;
	// margin-top: 20px;
	
	.choice-btnItem {
	  margin-right: 10px;
	  
	  .choice-content {
		color: #ff1a20;
	  }
	  
	  &.ant-radio-button-wrapper-checked:hover {
		color: #fff !important;
		
		.choice-content {
		  color: #fff !important;
		}
	  }
	  
	  :hover .choice-content {
		color: #0960bd !important;
	  }
	}
	
	.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
	  z-index: 1;
	  color: #fff;
	  background: #0960bd;
	  
	  .choice-content {
		color: #fff;
	  }
	}
  }
}
</style>
