<template>
  <template>
    <div class="table-box">
      <!--table header-->
      <div class="table-list">
        <div class="table-list-title">
          <div class="title-strip-sort">数据列表</div>
          <div>
            <slot name="tableEdit"></slot>
          </div>
        </div>
      </div>
      <div>
        <div class="table-inner-space">
          <ATable
              class="case-table"
              :columns="columns"
              :dataSource="dataSource"
              :pagination="false"
              size="small"
              bordered
              :scroll="{ x: `${columns.length}0%`, y: 500 }"
          >
            <template #bodyCell="{ column }">
              <template v-if="column.dataIndex === 'action'">
                <slot name="action" :row="column"></slot>
              </template>
            </template>
          </ATable>
        </div>
      </div>
      <div class="table-footer">
        <slot name="pagination"></slot>
      </div>
    </div>
  </template>
</template>
<script lang="ts">
  import {defineComponent, ref, watch } from 'vue'
  export default defineComponent({
    name: 'EraTable',
    props: {
      columns: {
        type: Object,
        default: [],
      },
      dataSource: {
        type: Object,
        default: [],
      },
    },
    setup(props) {
      const tableColumn = ref()
      const tableData = ref()
      watch(
          () => props.columns,
          (newValue) => {
            console.log(newValue, 'column')
            tableColumn.value = newValue
          },
          { deep: true },
      )
      watch(
          () => props.dataSource,
          (newValue) => {
            console.log(newValue, 'tableData')
            tableData.value = newValue
          },
          { deep: true },
      )
      return {
        tableColumn,
        tableData,
      }
    }
  })
</script>

<style lang="less" scoped>
.com-item {
  display: flex;
  justify-content: flex-end;
  padding: 10px 10px 10px 0;
  background-color: #fff;
}
.table-list {
  .table-list-title {
    display: flex;
    padding: 10px;
    justify-content: space-between;
    align-items: center;
    border-bottom: none;
    background-color: #fff;
  }
}
.table-box {
  margin: 15px;
  .table-inner-space {
    background-color: #fff;
    padding: 0 10px;
  }
  .table-footer {
    display: flex;
    justify-content: flex-end;
    padding: 10px 10px 10px 0;
    background-color: #fff;
  }
}

</style>

