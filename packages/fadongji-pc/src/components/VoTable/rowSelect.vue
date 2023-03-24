<template>
  <Table
    :row-selection="rowSelection"
    :columns="columns"
    :data-source="data"
    bordered
    class="componentsTableDemo"
  />
</template>
<script>
  import { defineComponent, computed, ref } from 'vue'
  import { Table } from 'ant-design-vue'
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '111',
      dataIndex: 'age',
    },
    {
      title: '333',
      dataIndex: 'address',
    },
  ]
  const data = []

  for (let i = 0; i < 5; i++) {
    data.push({
      key: i,
      name: `发动机 ${i}`,
      age: 100,
      address: `发动机性能 ${i}`,
    })
  }

  export default defineComponent({
    components: { Table },
    setup() {
      const selectedRowKeys = ref([]) // Check here to configure the default column

      const onSelectChange = (changableRowKeys) => {
        console.log('selectedRowKeys changed: ', changableRowKeys)
        selectedRowKeys.value = changableRowKeys
      }

      const rowSelection = computed(() => {
        return {
          // selectedRowKeys: unref(selectedRowKeys),
          onChange: onSelectChange,
          hideDefaultSelections: true,
        }
      })
      return {
        data,
        columns,
        // selectedRowKeys,
        rowSelection,
      }
    },
  })
</script>
<style>
  .componentsTableDemo {
    margin: 10px auto;
    width: 90%;
  }
</style>
