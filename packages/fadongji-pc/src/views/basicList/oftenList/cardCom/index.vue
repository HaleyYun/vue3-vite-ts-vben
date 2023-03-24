<template>
  <div class="card">
    <h1 class="titleCard">Card 卡片</h1>
    <h2>最基础的卡片容器，可承载文字、列表、图片、段落，常用于后台概览页面。</h2>
  </div>
  <div class="cardList">
    <h1> 栅格卡片 在系统概览页面常常和栅格进行配合。 </h1>
    <div style="background-color: #ececec; padding: 20px">
      <Row :gutter="16">
        <Col :span="8">
          <Card title="Card title" :bordered="false">
            <p>内容区域</p>
          </Card>
        </Col>
        <Col :span="8">
          <Card title="Card title" :bordered="false">
            <p>内容区域</p>
          </Card>
        </Col>
        <Col :span="8">
          <Card title="Card title" :bordered="false">
            <p>内容区域</p>
          </Card>
        </Col>
      </Row>
    </div>
    <br />
    <br />
    <h1> 简洁卡片 只包含内容区域。 </h1>
    <Card style="width: 300px">
      <p>Card 内容区域</p>
      <p>Card 内容区域</p>
      <p>Card 内容区域</p>
    </Card>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    components: {  },
    setup() {
      return {}
    },
  })
</script>

<style scoped>
  .card {
    width: 80%;
    height: 100px;
    margin: 20px auto;
  }

  .titleCard {
    font-size: 30px;
  }

  .cardList {
    padding: 40px;
    width: 80%;
    height: 500px;
    border: 1px solid #b3b3b3;
    margin: 20px auto;
  }
</style>
