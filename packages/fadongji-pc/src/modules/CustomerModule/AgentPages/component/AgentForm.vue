<template>
  <div class="form-list">
    <div class="form-list-choice">
      <RadioGroup v-model:value="ification">
        <RadioButton value="a" class="choice-btnItem" size="small">
          全部(<span class="choice-content">{{ 1000 }}</span
          >)
        </RadioButton>
        <RadioButton value="b" class="choice-btnItem" size="small"
          >未认证(<span class="choice-content">{{ 100 }}</span
          >)
        </RadioButton>
        <RadioButton value="c" class="choice-btnItem" size="small"
          >未审核(<span class="choice-content">{{ 100 }}</span
          >)
        </RadioButton>
        <RadioButton value="d" class="choice-btnItem" size="small"
          >审核中(<span class="choice-content">{{ 100 }}</span
          >)
        </RadioButton>
        <RadioButton value="e" class="choice-btnItem" size="small"
          >已认证(<span class="choice-content">{{ 100 }}</span
          >)
        </RadioButton>
      </RadioGroup>
    </div>
    <div class="form-list-box">
      <EraProForm mode="filter" :columns="goodsEvaluatioForm" layout="inline" />
      <!-- <Form class="box-layout" layout="inline" :label-col="{ span: 5 }">
        <Row>
          <Col :span="6">
            <FormItem label="代理商ID">
              <Input placeholder="代理商ID" class="constant" />
            </FormItem>
          </Col>
          <Col :span="6">
            <FormItem label="代理商名称" :label-col="{ span: 7, offset: 3 }">
              <Input placeholder="代理商名称" class="constant" />
            </FormItem>
          </Col>
          <Col :span="6">
            <FormItem label="代理商手机号:" :label-col="{ span: 8, offset: 8 }">
              <Input placeholder="代理商手机号" class="constant" />
            </FormItem>
          </Col>
          <Col :span="6">
            <FormItem>
              <div class="action-btn-box">
                <Button type="primary" class="submit-btn">查询结果</Button>
                <Button class="rest-btn">重置</Button>
              </div>
            </FormItem></Col
          >
        </Row>
      </Form>
      <Form class="box-layout" layout="inline" :label-col="{ span: 5 }">
        <Row>
          <Col :span="6">
            <FormItem label="认证状态">
              <Select
                class="constant"
                v-model:value="cation"
                show-search
                placeholder="认证状态"
                :options="options1"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange"
              />
            </FormItem>
          </Col>
          <Col :span="6">
            <FormItem
              label="所属地区"
              :label-col="{ span: 6, offset: 3 }"
              :wrapper-col="{ span: 18 }"
            >
              <Cascader v-model:value="value" :options="addressOptions" placeholder="请选择地区" />
            </FormItem>
          </Col>
          <Col :span="6">
            <FormItem label="注册时间:" :label-col="{ span: 10, offset: 5 }">
              <RangePicker v-model:picker="value2" class="constant">
                <template #dateRender="{ current }">
                  <div class="ant-calendar-date" :style="getCurrentStyle(current)">
                    {{ current.date() }}
                  </div>
                </template>
              </RangePicker>
            </FormItem>
          </Col>
          <Col :span="6">
            <FormItem> <div class="box-layout-item" style="width: 510px"> </div> </FormItem
          ></Col>
        </Row>
      </Form> -->
    </div>
  </div>
</template>

<script lang="ts">
  import { goodsEvaluatioForm } from '../mock/type'
  import EraProForm from '/@/components/EraProForm/EraProForm.vue'
  // import AgentRegion from '/@/modules/AgentPages/component/AgentRegion.vue'
  import { defineComponent, ref, CSSProperties } from 'vue'
  import { addressOptions } from '/@/modules/CustomerModule/AgentPages/mock/index'
  import { SelectTypes } from 'ant-design-vue/es/select'
  import { Dayjs } from 'dayjs'
  import { Radio } from 'ant-design-vue'
  export default defineComponent({
    components: {
      // Cascader,
      // Button,
      // Form,
      // FormItem: Form.Item,
      // Input,
      // Select,
      // RangePicker,
      RadioGroup: Radio.Group,
      RadioButton: Radio.Button,
      // Row,
      // Col,
      EraProForm,
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
      //运营
      const options = ref<SelectTypes['options']>([
        { value: '张三', label: '张三' },
        { value: '李四', label: '李四' },
        { value: '王五', label: '王五' },
        { value: '赵66', label: '王66' },
        { value: '王小五', label: '王小五' },
        { value: '王大五', label: '王大五' },
        { value: '王老五', label: '王小五' },
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
        { value: '未认证', label: '未认证' },
        { value: '未审核', label: '未审核' },
        { value: '待审核', label: '待审核' },
        { value: '已审核', label: '已审核' },
        { value: '待认证', label: '待认证' },
        { value: '已认证', label: '已认证' },
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
        { value: '开启', label: '开启' },
        { value: '关闭', label: '关闭' },
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
        { value: '抖音', label: '抖音' },
        { value: '微信', label: '微信' },
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
        ification,
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
        addressOptions,
        goodsEvaluatioForm,
      }
    },
  })
</script>

<style lang="less" scoped>
  .form-list {
    padding: 10px;

    .form-list-box {
      position: relative;
      background-color: #fff;

      .action-btn-box {
        display: flex;

        .submit-btn {
          margin-left: 150px;
        }

        .rest-btn {
          margin-left: 15px;
          // width: 100px;
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
      padding: 10px;
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
