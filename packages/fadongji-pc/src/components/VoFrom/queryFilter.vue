<template>
  <div>
    <Form
      ref="formRef"
      name="advanced_search"
      class="ant-advanced-search-form"
      :model="formState"
      @finish="onFinish"
    >
      <Row :gutter="24">
        <template v-for="i in 6" :key="i">
          <Col v-show="expand || i <= 6" :span="8">
            <FormItem
              :name="`内容${i}`"
              :label="`内容${i}`"
              :rules="[{ required: true, message: '请输入查询' }]"
            >
              <Input v-model:value="formState[`内容${i}`]" placeholder="请输入查询" />
            </FormItem>
          </Col>
        </template>
      </Row>
      <Row>
        <Col :span="24" style="text-align: right">
          <Button type="primary" html-type="submit">查询</Button>
          <Button style="margin: 0 8px" @click="() => formRef.resetFields()">清除</Button>
          <!-- <a style="font-size: 12px" @click="expand = !expand">
            <template v-if="expand">
              <UpOutlined />
            </template>
            <template v-else>
              <DownOutlined />
            </template>
            Collapse
          </a> -->
        </Col>
      </Row>
    </Form>
    <!-- <div class="search-result-list"
      >查询结果
      {{ formState }}
    </div> -->
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue'
  import { Form, Row, Col, Input, Button } from 'ant-design-vue'
  // import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';
  // import type { FormInstance } from 'ant-design-vue';
  export default defineComponent({
    components: { Form, Row, Col, Input, Button, FormItem: Form.Item },
    setup() {
      const expand = ref(false)
      const formRef = ref()
      const formState = reactive({
        a: 'sss',
        b: 'dddd',
      })
      const onFinish = (values: any) => {
        console.log('11111values ', values)
        console.log('222222:formState ', formState)
      }
      return {
        formRef,
        formState,
        expand,
        onFinish,
      }
    },
  })
</script>
<style>
  #components-form-demo-advanced-search .ant-form {
    max-width: none;
  }

  #components-form-demo-advanced-search .search-result-list {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 2px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }

  [data-theme='dark'] .ant-advanced-search-form {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid #434343;
    padding: 24px;
    border-radius: 2px;
  }

  .search-result-list {
    border: 1px dashed #434343;
    width: 180px;
    height: 300px;
    background-color: aqua;
  }

  .ant-advanced-search-form {
    margin: 20px 20px;
  }
</style>
