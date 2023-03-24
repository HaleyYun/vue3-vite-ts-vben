<template
  ><div>
    <h2 class="titleTable">嵌套表格</h2>
    <surelyTable />

    <h2 class="title1 titleTable">编辑表格</h2>
    <proTable />
    <h2 class="title2 titleTable">全选/单选表格</h2>
    <rowSelect />
    <!-- <proEditable /> -->
  </div></template
>

<script>
  // import { defineCoponent } from 'vue'
  import proTable from '../../../components/VoTable/proTable.vue'
  import surelyTable from '../../../components/VoTable/surelyTable.vue'
  import rowSelect from '../../../components/VoTable/rowSelect.vue'
  // import proEditable from '../../../components/VoTable/rowSelect.vue';
  export default {
    components: { proTable, surelyTable, rowSelect },
    setup() {
      console.log('3333')
      return {}
    },
  }
</script>

<style scoped>
  .titleTable {
    /* margin: 20px auto; */
    font-size: 24px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }
</style>
