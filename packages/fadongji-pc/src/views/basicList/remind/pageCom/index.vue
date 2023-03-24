<template
  ><div class="page">
    <h1 class="titlePage">PageHeader 页头 · 分页</h1>
    <h2
      >页头:
      当需要使用户快速理解当前页是什么以及方便用户使用页面功能时使用，通常也可被用作页面间导航。</h2
    >
    <h2>分页: 采用分页的形式分隔长列表，每次只加载一个页面。</h2>
  </div>
  <div class="pageList">
    <h2>标准页头，适合使用在需要简单描述的场景。</h2>
    <PageHeader
      style="border: 1px solid rgb(235, 237, 240)"
      title="标题"
      subTitle="描述(back 返回上一层)"
      @back="() => null"
    />
    <br />
    <br />
    <h1> 分页的形式分隔长列表 </h1>
    <br />
    <br />
    <Pagination v-model:current="current" :total="50" show-less-items />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    components: {  },
    setup() {
      return {
        current: ref(2),
      }
    },
  })
</script>

<style scoped>
  .page {
    width: 80%;
    height: 100px;
    margin: 20px auto;
  }

  .titlePage {
    font-size: 30px;
  }

  .pageList {
    padding: 40px;
    width: 80%;
    height: 500px;
    border: 1px solid #b3b3b3;
    margin: 20px auto;
  }
</style>
