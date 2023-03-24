<template>
  <div class="box">
    <h1 class="title">Alert 警告提示</h1>
    <h2>当某个页面需要向用户显示警告的信息时。</h2>
  </div>
  <div class="boxList">
    <h1> 当某个页面需要向用户显示警告的信息时。 </h1>
    <Alert message="Success Tips" type="success" showIcon />&nbsp;&nbsp;
    <Alert message="Informational Notes" type="info" showIcon />&nbsp;&nbsp;
    <Alert message="Warning" type="warning" showIcon />&nbsp;&nbsp;
    <Alert message="Error" type="error" showIcon />&nbsp;&nbsp;

    <Alert
      message="Error"
      description="This is an error message about copywriting."
      type="error"
      showIcon
    />
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
