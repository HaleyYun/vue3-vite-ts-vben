<template>
  <div class="box">
    <h1 class="title">Result 结果 </h1>
    <h2>当有重要操作需告知用户处理结果，且反馈内容较为复杂时使用。</h2>
  </div>
  <div class="boxList">
    <h1> 成功的结果。 </h1>
    <Result
      status="success"
      title="成功购买xxxxx"
      sub-title="Order number: 订单号:2017182818828182881 云服务器配置需要1-5分钟,请稍候。"
    >
      <template #extra>
        <Button key="console" type="primary">返回首页</Button>
        <Button key="buy">继续购买</Button>
      </template>
    </Result>
    <br />
    <br />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    components: {  },
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
</style>
