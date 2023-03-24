<template>
  <div class="table-list">
    <div class="table-list-title">
      <div class="title-strip">数据列表</div>
    </div>

    <Table
      class="table-list_table"
      :dataSource="dataSourceList"
      :columns="columnsList"
      :row-selection="rowSelection"
      :pagination="pagination"
      size="small"
      bordered
      :scroll="{ x: 'calc(700px + 50%)', y: 500 }"
    >
      <template #action>
        <span><Button type="link" @click="seeBtn">上架</Button></span>
        <span><Button type="link">下架</Button></span>
        <span><Button type="link">查看详情</Button></span>
      </template>

      <template #enable="text">
        <span> {{ text.record.Enable ? '平台强制下架' : '缺货' }} </span>
      </template>
    </Table>
  </div>
</template>

<script lang="ts">
  import { dataSourceList } from '/@/modules/GoodsModule/GoodsManage/mock'
  import { columnsList } from '/@/modules/GoodsModule/GoodsManage/component/index'
  //   import AgentData from '/@/modules/AgentPages/component/AgentData.vue'
  import { useGo } from '/@/hooks/web/usePage'
  import { PageEnum } from '/@/enums/pageEnum'
  import { defineComponent, ref, computed, unref, onMounted, toRefs, reactive } from 'vue'
  import { Button, Table } from 'ant-design-vue'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  export default defineComponent({
    components: {
      Button,
      Table,
    },
    setup() {
      const onChange = (pageNumber: number) => {
        console.log('Page: ', pageNumber)
      }
      const pagination = reactive({
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: () => `共${dataSourceList.length}条`,
        pageSize: 10,
        pageSizeOptions: ['3', '5', '10'],
        style: 'margin-top: 50px; text-align: center;margin-right:20px',
      })
      const go = useGo()

      const seeBtn = () => {
        go(PageEnum.BASE_DOUT)
      }
      const ification = ref<string>('a')
      const selectedRowKeys = ref([]) // Check here to configure the default column

      const onSelectChange = (changableRowKeys) => {
        console.log('selectedRowKeys changed: ', changableRowKeys)
        selectedRowKeys.value = changableRowKeys
      }
      const cunt = ref(1)
      const cuntPage = ref(5)
      const rowSelection = computed(() => {
        return {
          selectedRowKeys: unref(selectedRowKeys),
          onChange: onSelectChange,
          hideDefaultSelections: true,
        }
      })
      onMountedOrActivated(() => {
        // console.log('mounted in the api!')
        // userInfo().then((res) => {
        //   console.log(res, '1111')
        // })totals
      })
      const editButton = (text) => {
        if (text.record.Enable) {
          text.record.Enable = false
        } else {
          text.record.Enable = true
        }
        console.log(text, text.record.Enable, '1111')
      }

      function clickFn(res) {
        console.log(res)
      }

      const modal2Visibles = (statu: Boolean) => {
        // debugger

        console.log(statu, '11')
        visible.value = false
      }

      const visible = ref<boolean>(false)

      const handleOk = (e: MouseEvent) => {
        console.log(e)
        visible.value = false
      }
      const state = reactive({ dataSourceList })
      const onShowSizeChange = (current: 1, pageSize: 5) => {
        console.log(current, pageSize)
      }
      const flagShow = ref(true)
      return {
        onChange,
        flagShow,
        onShowSizeChange,
        ...toRefs(state),
        seeBtn,
        cuntPage,
        modal2Visibles,
        ification,
        clickFn,
        selectedRowKeys,
        rowSelection,
        cunt,
        editButton,
        visible,
        handleOk,
        columnsList,
        pagination,
      }
    },
  })
</script>

<style lang="less" scoped>
  .table-list {
    padding: 20px;
    padding-top: 0;

    .table-list_table {
      background-color: #fff;
    }
  }

  .table-list-title {
    display: flex;
    padding: 0 15px;
    height: 50px;
    justify-content: space-between;
    align-items: center;
    border-bottom: none;
    background-color: #fff;

    .title-strip {
      flex-grow: 1;
      align-items: center;
      line-height: 50px;
      font-size: 14px;
    }

    .title-strip-sort {
      margin-left: 10px;
    }
  }
</style>
