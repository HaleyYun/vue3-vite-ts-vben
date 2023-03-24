<template>
  <div class="collapse">
    <h1 class="titleCollapse">Collapse 折叠面板</h1>
    <h2>'手风琴' 是一种特殊的折叠面板，只允许单个内容区域展开。</h2>
  </div>
  <div class="collapseList">
    <h1> 可以同时展开多个面板，这个例子默认展开了第一个 </h1>
    <br />
    <br />
    <Collapse v-model:activeKey="activeKey">
      <CollapsePanel key="1" header="这是面板标题 1">
        <p>{{ text }}</p>
      </CollapsePanel>
      <CollapsePanel key="2" header="这是面板标题 2" :disabled="false">
        <p>{{ text }}</p>
      </CollapsePanel>
      <CollapsePanel key="3" header="这是面板标题 3" disabled>
        <p>{{ text }}</p>
      </CollapsePanel>
    </Collapse>
    <br />
    <br />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue'

  export default defineComponent({
    components: {  },
    setup() {
      const text = `内容区域`
      const activeKey = ref(['1'])

      watch(activeKey, (val) => {
        console.log(val)
      })

      return {
        text,
        activeKey,
      }
    },
  })
</script>

<style scoped>
  .collapse {
    width: 80%;
    height: 100px;
    margin: 20px auto;
  }

  .titleCollapse {
    font-size: 30px;
  }

  .collapseList {
    padding: 40px;
    width: 80%;
    height: 500px;
    border: 1px solid #b3b3b3;
    margin: 20px auto;
  }
</style>
