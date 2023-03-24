<template>
  <div class="box">
    <h1 class="title">Image 图片</h1>
    <h2>可预览的图片，需要展示图片时使用</h2>
  </div>
  <div class="boxList">
    <h1> 多张图片预览 点击左右切换按钮可以预览多张图片。 </h1>
    <ImagePreviewGroup>
      <Image :width="200" src="https://aliyuncdn.antdv.com/vue.png" />
      <Image :width="200" src="https://aliyuncdn.antdv.com/logo.png" />
    </ImagePreviewGroup>
    <br />
    <br />
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
