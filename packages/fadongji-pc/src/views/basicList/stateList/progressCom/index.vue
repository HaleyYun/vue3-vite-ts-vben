<template>
  <div class="box">
    <h1 class="title">Progress 进度条</h1>
    <h2>在操作需要较长时间才能完成时，为用户显示该操作的当前进度和状态。</h2>
  </div>
  <div class="boxList">
    <h1> 标准的进度条。 </h1>
    <Progress :percent="30" />
    <Progress :percent="50" status="active" />
    <Progress :percent="70" status="exception" />
    <Progress :percent="100" />
    <Progress :percent="50" :show-info="false" />
    <br />
    <br />
    <h1> 会动的进度条才是好进度条 </h1>
    <br />
    <br />
    <div>
      <Progress
        type="circle"
        :percent="defaultPercent"
      />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <ButtonGroup>
        <Button @click="decline">
          <template #icon><minus-outlined /></template>
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button @click="increase">
          <template #icon><plus-outlined /></template>
        </Button>
      </ButtonGroup>
    </div>
  </div>
</template>

<script lang="ts">
import { MinusOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
    components: {
      MinusOutlined,
      PlusOutlined,

    },
    setup() {
      const defaultPercent = ref<number>(0)

      const increase = () => {
        const percent = defaultPercent.value + 10
        defaultPercent.value = percent > 100 ? 100 : percent
      }

      const decline = () => {
        const percent = defaultPercent.value - 10
        defaultPercent.value = percent < 0 ? 0 : percent
      }
      return {
        defaultPercent,
        increase,
        decline,
      }
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
