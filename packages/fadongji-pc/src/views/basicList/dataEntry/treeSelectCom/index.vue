<template>
  <div class="treeSelect">
    <h1 class="titleTree">TreeSelect 树选择</h1>
    <h2
      >可选择的数据结构是一个树形结构时，可以使用
      TreeSelect，例如公司层级、学科系统、分类目录等等。</h2
    >
  </div>
  <div class="treeList">
    <h1> 数据直接生成树结构 </h1>
    <TreeSelect
      v-model:value="value"
      show-search
      style="width: 100%"
      :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
      placeholder="Please select"
      allow-clear
      tree-default-expand-all
    >
      <TreeSelectNode key="0-1" value="parent 1" title="parent 1">
        <TreeSelectNode key="0-1-1" value="parent 1-0" title="parent 1-0">
          <TreeSelectNode key="random" value="leaf1" title="my leaf" />
          <TreeSelectNode key="random1" value="leaf2" title="your leaf" />
        </TreeSelectNode>
        <TreeSelectNode key="random2" value="parent 1-1" title="parent 1-1">
          <TreeSelectNode key="random3" value="sss">
            <template #title><b style="color: #08c">sss</b></template>
          </TreeSelectNode>
        </TreeSelectNode>
      </TreeSelectNode>
    </TreeSelect>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <h1> 可勾选 使用勾选框实现多选功能 </h1>
    <treeSelectCom />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue'

  import treeSelectCom from '/@/components/VobasicCom/treeSelect.vue'

  export default defineComponent({
    components: { treeSelectCom },
    setup() {
      const value = ref<string>()
      watch(value, () => {})
      return {
        value,
      }
    },
  })
</script>

<style scoped>
  .treeSelect {
    width: 80%;
    height: 100px;
    margin: 20px auto;
  }

  .titleTree {
    font-size: 30px;
  }

  .treeList {
    padding: 40px;
    width: 80%;
    height: 500px;
    border: 1px solid #b3b3b3;
    margin: 20px auto;
  }
</style>
