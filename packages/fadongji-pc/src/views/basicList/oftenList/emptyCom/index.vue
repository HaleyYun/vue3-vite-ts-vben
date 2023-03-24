<template>
  <div class="box">
    <h1 class="title">Descriptions 空状态</h1>
    <h2>当目前没有数据时，用于显式的用户提示，初始化场景时的引导创建流程。</h2>
  </div>
  <div class="boxList">
    <h1> 可以通过设置 image 为 Empty.PRESENTED_IMAGE_SIMPLE 选择另一种风格的图片。 </h1>
    <Empty />
    <br />
    <br />
    <h3>选择</h3>
    <Select :style="style" :options="[]" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    components: { },
    setup() {
      return { style: { width: '200px' } }
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
