<template>
<div>
  <div class="table-list">
    <div class="table-list__title">
      <div class="title-strip">数据列表</div>
    </div>

    <Table
      class="table-list_table"
      :dataSource="dataSourceList"
      :columns="columnsList"
      :row-selection="rowSelection"
      :pagination="false"
      size="small"
      bordered
      :scroll="{ x: 'calc(700px + 50%)', y: 500 }"
    >
      <!-- column  -->
      <template #enable="{ record }">
        <Switch v-model:checked="record.isShow" checked-children="开" un-checked-children="关" />
      </template>
      <template #action="{ record }">
        <a class="action-space" @click="checkDetails(record)">查看</a>
        <a class="action-space" @click="deleteGoodsItem(record)">删除</a>
      </template>
    </Table>
    <div class="com-item">
      <VoPagination
        :total="paginations.total"
        :current="paginations.current"
        :page-size="paginations.pageSize"
        @pagination="paginationChange"
      />
    </div>
    <SimpleAlert ref="simleAlertRef" :title="alertTitle" :height="alertHeight"
      ><template #simgpleContent><span>确认要删除吗？</span></template>
    </SimpleAlert>
  </div>
  <MessageAlert
    ref="messageAlertRef"
    v-if="messageVisible"
    :show-type="messageShow"
    :message="messageTip"
    :description="desciptionInfo"
  />
</div>
</template>
<script lang="ts">
  import { dataSourceList } from '/@/modules/GoodsModule/GoodsManage/view/GoodsEvaluation/mock'
  import { columnsList } from '/@/modules/GoodsModule/GoodsManage/view/GoodsEvaluation/view/type/type'
  import { defineComponent, ref, computed, unref, toRefs, reactive } from 'vue'
  import { Table, Switch } from 'ant-design-vue'
  import SimpleAlert from '/@/components/VoAlert/simpleAlert.vue'
  import MessageAlert from '/@/components/VoAlert/messageAlert.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue' // 分页
  // show enum of type about messageAlert
  import { ResultEnum } from '/@/components/VoAlert/messageEnum'
  export default defineComponent({
    name: 'GoodsEvaluationTable',
    components: {
      Table,
      Switch,
      SimpleAlert,
      MessageAlert,
      VoPagination,
    },
    emits: ['goDetails', 'goDeleteGoods'],
    setup(_, { emit }) {
      //暴露内部方法
      const alertTitle = ref<string>('删除')
      const alertHeight = ref<string>('130px')
      const visible = ref<Boolean>(false)
      const simleAlertRef = ref()
      const messageAlertRef = ref()
      const messageVisible = ref<Boolean>(false)
      // type‘s variable of messageAlert, due to which messageAlert
      const messageShow = ref<string>(ResultEnum.EROOR)
      // messageAlert Tip in messageAlert
      const messageTip = ref<string>()
      // description of content in messageAlert
      const desciptionInfo = ref<string>()
      const onChange = (pageNumber: number) => {
        console.log('page===', pageNumber)
      }
      const pagination = reactive({
        showSizeChanger: true,
        showQuickJumper: true,
        showTatal: () => '共${dataSourceList.length}条',
        pageSize: 10,
        pageSizeOptions: ['3', '5', '10'],
        style: 'margin-top: 50px; text-align: center; margin-right: 20px',
      })
      const ification = ref<string>('a')
      const selectedRowKeys = ref([])
      const onSelectChange = (changeableRowKeys) => {
        console.log('selectedRowKeys changed: ', changeableRowKeys)
        selectedRowKeys.value = changeableRowKeys
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
      const editButton = (text) => {
        if (text.record.Enable) {
          text.record.Enable = false
        } else {
          text.record.Enable = true
        }
      }
      function clickFn(res) {
        console.log(res)
      }
      const state = reactive({ dataSourceList })
      const onShowSizeChange = (current: 1, pageSize: 5) => {
        console.log(current, pageSize)
      }
      const flagShow = ref(true)
      // 查看详情
      const checkDetails = (item) => {
        console.log('查看详情===', item)
        emit('goDetails', item)
      }
      // 删除"商品评价"
      const deleteGoodsItem = (item) => {
        console.log('商品删除单项item===', item)
        simleAlertRef.value.showModal()
      }

      const paginations = reactive({
        total: 158,
        current: 1,
        pageSize: 20,
      })
      // 分页
      const paginationChange = ({ current, pageSize }) => {
        paginations.current = current
        paginations.pageSize = pageSize
      }
      return {
        flagShow,
        cuntPage,
        ification,
        selectedRowKeys,
        rowSelection,
        cunt,
        columnsList,
        pagination,
        alertTitle,
        alertHeight,
        visible,
        simleAlertRef,
        messageAlertRef,
        messageVisible,
        ResultEnum,
        messageShow,
        messageTip,
        desciptionInfo,
        paginations,
        clickFn,
        onShowSizeChange,
        ...toRefs(state),
        onChange,
        checkDetails,
        deleteGoodsItem,
        editButton,
        paginationChange,
      }
    },
  })
</script>
<style lang="less" scoped>
  .table-list {
    padding: 0 10px 10px 10px;
    .table-list__table {
      background-color: #ffffff;
    }
  }
  .table-list__title {
    display: flex;
    padding: 10px;
    height: 50px;
    justify-content: space-around;
    align-items: center;
    border-bottom: none;
    background-color: #ffffff;
    .title-strip {
      flex-grow: 1;
      align-items: center;
      line-height: 50px;
      font-size: 14px;
    }
    .title-strip__sort {
      margin-left: 10px;
    }
  }
  .action-space {
    margin-right: 10px;
  }
  .com-item {
    display: flex;
    justify-content: flex-end;
    padding: 10px 10px 10px 0;
    background-color: #fff;
  }
</style>
