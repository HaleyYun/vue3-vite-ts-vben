<template>
  <div>
    <Table :columns="columns" :data-source="dataSource" bordered class="componentsTable">
      <template v-for="col in ['name', 'age', 'address']" #[col]="{ text, record }" :key="col">
        <div>
          <Input
            v-if="editableData[record.key]"
            v-model:value="editableData[record.key][col]"
            style="margin: -5px 0"
          />
          <template v-else>
            {{ text }}
          </template>
          <!-- <Input-group compact>
					<a-select v-if="editableData[record.key]" style="margin: -5px 0">
						<a-select-option value="机油">机油</a-select-option>
						<a-select-option value="润滑油">润滑油</a-select-option>
						<a-select-option value="发动机">发动机</a-select-option>
						<a-select-option value="刹车油">刹车油</a-select-option>
						<a-select-option value="轮胎">轮胎</a-select-option>
						<a-select-option value="方向盘">方向盘</a-select-option>
						<a-select-option value="底盘">底盘</a-select-option>
						<a-select-option value="玻璃水">玻璃水</a-select-option>
					</a-select>
					<template v-else>
						{{ text }}
					</template>
				</Input-group> -->
        </div>
      </template>
      <template #operation="{ record }">
        <div class="editableRowOperations">
          <span v-if="editableData[record.key]">
            <Popconfirm
              v-if="dataSource.length"
              title="确认删除?"
              ok-text="确定"
              cancel-text="取消"
              @confirm="onDelete(record.key)"
            >
              <a>删除</a>
            </Popconfirm>
            <a @click="save(record.key)">保存</a>
            <Popconfirm
              title="确定取消？"
              ok-text="确定"
              cancel-text="取消"
              @confirm="cancel(record.key)"
            >
              <a>取消</a>
            </Popconfirm>
          </span>
          <span v-else>
            <a @click="edit(record.key)">编辑</a>
          </span>
        </div>
      </template>
    </Table>
  </div>
</template>
<script>
  import { cloneDeep } from 'lodash-es'
  import { defineComponent, reactive, ref } from 'vue'
  import { Table, Input, Popconfirm } from 'ant-design-vue'
  const columns = [
    {
      title: '产品名称',
      dataIndex: 'name',
      width: '25%',
      slots: {
        customRender: 'name',
      },
    },
    {
      title: '产品价格',
      dataIndex: 'age',
      width: '15%',
      slots: {
        customRender: 'age',
      },
    },
    {
      title: '描述',
      dataIndex: 'address',
      width: '40%',
      slots: {
        customRender: 'address',
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      slots: {
        customRender: 'operation',
      },
    },
  ]
  const data = []

  for (let i = 0; i < 100; i++) {
    data.push({
      key: i.toString(),
      name: `发动机 ${i}`,
      age: 32,
      address: `好东西 ${i}`,
    })
  }

  export default defineComponent({
    components: { Table, Input, Popconfirm },
    setup() {
      const dataSource = ref(data)
      const editableData = reactive({})

      const edit = (key) => {
        editableData[key] = cloneDeep(dataSource.value.filter((item) => key === item.key)[0])
      }
      const onDelete = (key) => {
        dataSource.value = dataSource.value.filter((item) => item.key !== key)
      }
      const save = (key) => {
        Object.assign(dataSource.value.filter((item) => key === item.key)[0], editableData[key])
        delete editableData[key]
      }

      const cancel = (key) => {
        delete editableData[key]
      }
      const value = ref('')

      const onSearch = (searchValue) => {
        console.log('use value', searchValue)
        console.log('or use this.value', value.value)
      }
      return {
        dataSource,
        columns,
        editingKey: '',
        editableData,
        edit,
        save,
        cancel,
        onDelete,
        value,
        onSearch,
      }
    },
  })
</script>
<style scoped>
  .editableRowOperations a {
    margin-right: 8px;
  }

  .componentsTable {
    margin: 10px auto;
    width: 90%;
  }
</style>
