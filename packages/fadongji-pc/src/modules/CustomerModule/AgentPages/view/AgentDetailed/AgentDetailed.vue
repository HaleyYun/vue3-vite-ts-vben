<template>
  <div class="repair-list">
    <div class="list-box">
      <span class="repair-list-title">张三汽配零售维修厂</span>
      <span class="repair-list-title"> 客户运营（李四）</span>
    </div>

    <Tabs v-model:activeKey="activeKey" class="tab-form">
      <TabPane key="1" tab="账期">
        <div class="title-form">
          <Form :label-col="{ span: 2 }" :wrapper-col="{ span: 3 }">
            <FormItem label="账期额度">
              <Input />
            </FormItem>
            <FormItem label="账期系数">
              <Input />
            </FormItem>
          </Form>
        </div>
        <div class="form-grid"></div>
        <div class="form-record">修改记录</div>
        <Table class="title-form-table" :dataSource="dataSource" :columns="detailedList" bordered />
      </TabPane>
      <TabPane key="2" tab="积分" force-render>
        <div class="tab-integral" style="margin: 20px">
          <RangePicker v-model:value="value3" />
          <Button type="primary" class="form-check">查询</Button>
        </div>
        <div class="form-grid"></div>
        <Table class="title-form-grow" :dataSource="dataSource" :columns="integralList" bordered />
      </TabPane>
      <TabPane key="3" tab="成长值">
        <div class="tab-integral">
          <RangePicker v-model:value="value3" />
          <Button type="primary" class="form-check">查询</Button>
        </div>
        <div class="form-grid"></div>
        <Table class="title-form-sign" :dataSource="dataSource" :columns="growList" bordered
      /></TabPane>
    </Tabs>
  </div>
</template>
<script lang="ts">
  import { detailedList } from '/@/modules/CustomerModule/AgentPages/component'
  import { integralList } from '/@/modules/CustomerModule/AgentPages/component'
  import { growList } from '/@/modules/CustomerModule/AgentPages/component'
  import { defineComponent, ref } from 'vue'
  import { Dayjs } from 'dayjs'
  export default defineComponent({
    components: {},
    setup() {
      return {
        value3: ref<Dayjs[]>([]),
        activeKey: ref('1'),
        dataSource: [
          {
            key: '1',
            name: '张三',
            department: '客服',
            quota: '10000',
            rule: '发帖',
            rules: '新人注册',
            type: '获取',
            quantity: '+2',
            coefficient: '0.2',
            timeData: '2022.05.01 17:00',
          },
          {
            key: '2',
            name: '李四',
            department: '运营',
            quota: '29999',
            rule: '交易',
            type: '获取',
            rules: '每日登录',
            quantity: '+21',
            coefficient: '1',
            timeData: '2022.05.01 17:00',
          },
          {
            key: '3',
            name: '李四',
            department: '运营',
            quota: '29999',
            rule: '社群活跃',
            type: '兑换',
            rules: '无',
            quantity: '+11',
            coefficient: '1',
            timeData: '2022.05.01 17:00',
          },
        ],
        detailedList,
        integralList,
        growList,
      }
    },
  })
</script>
<style scoped lang="less">
  .repair-list {
    margin: 15px;
    .tab-integral {
      margin: 20px;
    }
    .list-box {
      background-color: #fff;
    }

    .tab-form {
      background-color: #fff;
    }

    .form-grid {
      height: 20px;
      background-color: #f0f2f5;
    }
    .repair-list-title {
      font-size: 24px;
      font-weight: 700;
      font-style: normal;
    }

    .form-record {
      font-size: 24px;
      font-weight: 700;
      font-style: normal;
    }

    .form-check {
      margin-left: 30px;
    }

    .title-form-table {
      background-color: #fff;
    }

    .title-form-grow {
      border: 1px solid #c4c4c4;
    }

    .title-form-sign {
      border: 1px solid #c4c4c4;
    }
  }
</style>
