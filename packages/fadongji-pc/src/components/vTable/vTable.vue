<template>
  <a-table bordered :data-source="tableData" :columns="columnsData.columnsData">
    <template v-for="name in slotsData" #[name]="{ text }">
      <slot :name="name" :text="text"></slot>
    </template>
    <template #operation="{ record }">
      <a @click="onDelete(record)">删除</a>
      <a @click="onChange(record)">修改</a>
      <a @click="onCheck(record)">查看</a>
    </template>
  </a-table>
</template>
<script lang="ts">
  import { defineComponent, onMounted, reactive, ref } from 'vue'
  const map = {
    id: 'operationId',
    title: '操作',
    dataIndex: 'operation',
    slots: { customRender: 'operation' },
    width: 300,
    align: 'center',
  }
  export default defineComponent({
    name: 'User',
    props: {
      tableData: {
        type: Array,
        default() {
          return []
        },
      },
      columns: {
        type: Array,
        default() {
          return []
        },
      },
      hiddenHandle: {
        type: Boolean,
        default() {
          return false
        },
      },
      showHandleColumn: {
        type: Number,
        default() {
          return 0
        },
      },
    },
    setup(props, cxs) {
      const slotsData = ref<string[]>([])
      const changeColor = ref<string>('#e8edf6')
      const columnsData = reactive({
        columnsData: props.columns,
      })
      props.columns.map((value: any) => {
        if (value.slots) {
          slotsData.value.push(value.slots.customRender)
        }
      })
      onMounted(() => {
        isShowhandle()
      })
      function isShowhandle() {
        let items = { id: 'operationId' }
        let isExitColumn = columnsData.columnsData.find((item) => item.id === items.id)
        if (props.showHandleColumn === 1) {
          if (!isExitColumn) {
            columnsData.columnsData.push(map)
          }
        } else {
          if (!isExitColumn) {
            columnsData.columnsData = columnsData.columnsData.filter((item) => item.id !== items.id)
          }
        }
      }

      const onDelete = (deleteItem: any) => {
        cxs.emit('onDelete', deleteItem)
      }
      const onChange = (deleteItem: any) => {
        cxs.emit('onChange', deleteItem)
      }
      const onCheck = (deleteItem: any) => {
        cxs.emit('onCheck', deleteItem)
      }
      return {
        columnsData,
        slotsData,
        onMounted,
        onDelete,
        onChange,
        onCheck,
        changeColor,
      }
    },
  })
</script>
<style scoped>
  a {
    margin-right: 10px;
  }

  ::v-deep .ant-table-thead > tr > th {
    padding-left: px;
    font-size: px;
    background: #e8edf6 !important;
    color: #6b6d72 !important;
    text-align: center;
  }
</style>
