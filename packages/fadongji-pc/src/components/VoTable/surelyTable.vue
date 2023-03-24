<template>
  <div class="surely">
    <Table bordered :columns="columns" :data-source="data" class="components-table-demo-nested">
      <template #operation>
        <a>xxxxxx</a>
      </template>
      <template #expandedRowRender>
        <Table :columns="innerColumns" :data-source="innerData" :pagination="false">
          <template #status>
            <span>
              <a-badge status="success" />
              Finished
            </span>
          </template>
          <template #operation>
            <span class="table-operation">
              <a>展示</a>
              <!-- <a>Stop</a> -->
              <!-- <a-dropdown>
							<template #overlay>
								<a-menu>
									<a-menu-item>模式一</a-menu-item>
									<a-menu-item>模式二</a-menu-item>
								</a-menu>
							</template> -->
              <!-- <a> -->
              <!-- More -->
              <!-- <down-outlined /> -->
              <!-- </a> -->
              <!-- </a-dropdown> -->
            </span>
          </template>
        </Table>
      </template>
    </Table>
  </div>
</template>
<script>
  import { DownOutlined } from '@ant-design/icons-vue'
  import { Table } from 'ant-design-vue'
  import { defineComponent } from 'vue'
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '系统',
      dataIndex: 'platform',
      key: 'platform',
    },
    {
      title: '版本',
      dataIndex: 'version',
      key: 'version',
    },
    {
      title: '升级',
      dataIndex: 'upgradeNum',
      key: 'upgradeNum',
    },
    {
      title: '操作者',
      dataIndex: 'creator',
      key: 'creator',
    },
    {
      title: '日期',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'xxxxx',
      key: 'operation',
      slots: {
        customRender: 'operation',
      },
    },
  ]
  const data = []

  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      name: 'iPhone',
      platform: 'iOS',
      version: '10.3.4.5654',
      upgradeNum: 500,
      creator: 'Jack',
      createdAt: '2014-12-24 23:12:00',
    })
  }

  const innerColumns = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '状态',
      key: 'state',
      slots: {
        customRender: 'status',
      },
    },
    {
      title: '升级状态',
      dataIndex: 'upgradeNum',
      key: 'upgradeNum',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      slots: {
        customRender: 'operation',
      },
    },
  ]
  const innerData = []

  for (let i = 0; i < 3; ++i) {
    innerData.push({
      key: i,
      date: '2014-12-24 23:12:00',
      name: '品牌',
      upgradeNum: '升级: 56',
    })
  }

  export default defineComponent({
    components: {
      // eslint-disable-next-line vue/no-unused-components
      DownOutlined,
      Table,
    },

    setup() {
      return {
        data,
        columns,
        innerColumns,
        innerData,
      }
    },
  })
</script>
<style>
  .components-table-demo-nested {
    margin: 10px auto;
    width: 90%;
  }
</style>
