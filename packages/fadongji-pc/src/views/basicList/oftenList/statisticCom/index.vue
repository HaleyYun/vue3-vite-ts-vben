<template>
  <div class="box">
    <h1 class="title">Statistic 统计数值</h1>
    <h2>当需要突出某个或某组数字时 当需要展示带描述的统计类数据时使用</h2>
  </div>
  <div class="boxList">
    <h1> 展示带描述的统计类数据 </h1>
    <Row>
      <Col :span="12">
        <Statistic title="活跃用户" :value="112893" style="margin-right: 50px" />
      </Col>
      <Col :span="12">
        <Statistic title="账户余额(CNY)" :precision="2" :value="112893" />
      </Col>
    </Row>
    <br />
    <br />
    <br />
    <br />
    <h1> 在卡片中展示统计数值。 </h1>
    <div style="background: #ececec; padding: 30px">
      <Row :gutter="16">
        <Col :span="12">
          <Card>
            <Statistic
              title="上升指数"
              :value="11.28"
              :precision="2"
              suffix="%"
              :value-style="{ color: '#3f8600' }"
              style="margin-right: 50px"
            >
              <template #prefix> <ArrowUpOutlined /> </template>
            </Statistic>
          </Card>
        </Col>
        <Col :span="12">
          <Card>
            <Statistic
              title="下降指数"
              :value="9.3"
              :precision="2"
              suffix="%"
              class="demo-class"
              :value-style="{ color: '#cf1322' }"
            >
              <template #prefix>
                <ArrowDownOutlined />
              </template>
            </Statistic>
          </Card>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script lang="ts">
  import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons-vue'
  import { defineComponent } from 'vue'

  export default defineComponent({
    components: { ArrowUpOutlined, ArrowDownOutlined },
    setup() {
      return {}
    },
  })
</script>

<style scoped>
  .box {
    width: 80%;
    height: 100px;
    margin: 20px auto;
  }

  .title {
    font-size: 30px;
  }

  .boxList {
    padding: 40px;
    width: 80%;
    height: 500px;
    border: 1px solid #b3b3b3;
    margin: 20px auto;
  }

  #components-popover-demo-placement .ant-btn {
    width: 70px;
    text-align: center;
    padding: 0;
    margin-right: 8px;
    margin-bottom: 8px;
  }
</style>
