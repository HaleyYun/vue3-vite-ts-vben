<template>
  <div class="box">
    <h1 class="title">Tree 树形控件</h1>
    <h2
      >文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用树控件可以完整展现其中的层级关系，并具有展开收起选择等交互功能。</h2
    >
  </div>
  <div class="boxList">
    <h1> 内置的目录树 </h1>
    <br />
    <br />
    <div class="tree">
      <DirectoryTree
        multiple
        v-model:expandedKeys="expandedKeys"
        v-model:selectedKeys="selectedKeys"
      >
        <TreeNode key="0-0" title="文件夹1">
          <TreeNode key="0-0-0" title="文件1" is-leaf />
          <TreeNode key="0-0-1" title="文件2" is-leaf />
        </TreeNode>
        <TreeNode key="0-1" title="文件夹2">
          <TreeNode key="0-1-0" title="文件1" is-leaf />
          <TreeNode key="0-1-1" title="文件2" is-leaf />
        </TreeNode>
      </DirectoryTree>
    </div>

    <br />
    <br />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    components: {  },
    setup() {
      const expandedKeys = ref<string[]>(['0-0', '0-1'])
      const selectedKeys = ref<string[]>([])
      return {
        expandedKeys,
        selectedKeys,
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

  .tree {
    padding: 20px;
    border: 1px solid #b3b3b3;
    height: 350px;
  }
</style>
