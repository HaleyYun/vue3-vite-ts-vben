<template>
  <div class="table-list">
    <RadioGroup v-model:value="ification" class="table-list-button">
      <RadioButton value="a" class="list-item">
        全部(<span class="list-item-content">{{ 1000 }}</span
        >)
      </RadioButton>
      <RadioButton value="b" class="list-item"
        >未认证(<span class="list-item-content">{{ 100 }}</span
        >)
      </RadioButton>
      <RadioButton value="c" class="list-item"
        >未审核(<span class="list-item-content">{{ 100 }}</span
        >)
      </RadioButton>
      <RadioButton value="d" class="list-item"
        >已禁用(<span class="list-item-content">{{ 100 }}</span
        >)
      </RadioButton>
    </RadioGroup>
  </div>
  <div class="table-list-head">
    <div class="list-head-box">
      <p class="head-box-strip">共有{{ 17 }}条数据</p>
      <Button class="head-box-sort" @click="editButton">新增供货商</Button>
      <Button class="head-box-sort">数据导出</Button>
      <Button class="head-box-sort">排序方式</Button>
    </div>

    <Table
      class="list-data"
      :dataSource="dataSourceList"
      :columns="columnsList"
      :row-selection="rowSelection"
      :pagination="paginationProps"
      bordered
    >
      <template #action>
        <span>
          <Button type="link" style="color: #25b97e" @click="seeBtn">查看 </Button>
          <Button type="link" style="color: #25b97e" @click="editButton">编辑</Button>
          <Button type="link" style="color: #25b97e">删除</Button>
        </span>
        <p>
          <Button type="link" style="color: #25b97e">员工管理</Button>
        </p>
      </template>

      <template #enable="text">
        <span>
          <Switch
            checked-children="开"
            un-checked-children="关"
            v-model:checked="text.record.Enable"
          />
        </span>
      </template>
    </Table>
  </div>
  <template>
    <div>
      <Modal
        centered
        :footer="null"
        :closable="false"
        v-model:visible="visible"
        width="1100px"
        title="编辑资料"
        @ok="handleOk"
      >
        <SupplyData @click="modal2Visibles" />
      </Modal>
    </div>
  </template>
</template>

<script lang="ts">
  // import { reqTradeMarkList } from '/@/api/supplier/supplierList'
  import { dataSourceList } from '/@/modules/SupplierPages/mock/index'
  import { columnsList } from '/@/modules/SupplierPages/component/index'
  import SupplyData from '/@/modules/SupplierPages/component/SupplyData.vue'
  import { useGo } from '/@/hooks/web/usePage'
  import { PageEnum } from '/@/enums/pageEnum'
  import { defineComponent, ref, computed, unref, onMounted, toRefs, reactive } from 'vue'
  import { Button, Table, Modal, Radio, Switch } from 'ant-design-vue'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  export default defineComponent({
    components: {
      Button,
      Table,
      SupplyData,
      Modal,
      RadioGroup: Radio.Group,
      Switch,
      RadioButton: Radio.Button,
    },
    setup() {
      const go = useGo()

      const seeBtn = () => {
        go(PageEnum.BASE_EDIT)
      }
      const ification = ref<string>('a')
      const selectedRowKeys = ref([]) // Check here to configure the default column

      const onSelectChange = (changableRowKeys) => {
        console.log('selectedRowKeys changed: ', changableRowKeys)
        selectedRowKeys.value = changableRowKeys
      }
      const cunt = ref(3)
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
      const editButton = () => {
        visible.value = true
      }

      function clickFn(res) {
        console.log(res, '1111')
      }

      const modal2Visibles = (statu: Boolean) => {
        // debugger

        console.log(statu, '11')
        visible.value = false
      }

      const paginationProps = {
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: () => `共${17}条`,
        pageSize: 5,
        current: 3,
        total: 3,
        position: 'bottom',
        defaultPageSize: 5,
        pageSizeOptions: ['3', '5', '10'],
        style: 'margin-top: 50px; text-align: center',
      }
      const visible = ref<boolean>(false)

      const handleOk = (e: MouseEvent) => {
        console.log(e)
        visible.value = false
      }
      const state = reactive({ dataSourceList })
      return {
        ...toRefs(state),
        seeBtn,
        modal2Visibles,
        ification,
        paginationProps,
        clickFn,
        selectedRowKeys,
        rowSelection,
        cunt,
        editButton,
        visible,
        handleOk,
        columnsList,
      }
    },
  })
</script>

<style lang="less" scoped>
  .list-head-box {
    display: flex;
    width: 100%;
    height: 50px;
    background-color: #e6e6e6;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #c4c4c4;
    border-bottom: none;

    .head-box-strip {
      flex-grow: 1;
      margin-left: 40px;
      margin-top: 15px;
      align-items: center;
      line-height: 50px;
      font-size: 14px;
    }

    .head-box-sort {
      margin: auto 40px;
    }
  }

  .table-list {
    padding: 0 20px;

    .list-data {
      border: 1px solid #c4c4c4;
    }

    .table-list-head {
      padding: 20px;
    }

    .table-list-button {
      .list-item {
        margin-right: 30px;

        &.ant-radio-button-wrapper-checked:hover {
          color: #fff !important;

          .list-item-content {
            color: #fff !important;
          }
        }
      }

      .list-item-content {
        color: red;
      }

      :hover .list-item-content {
        color: #1abc9c !important;
      }

      .list-item:hover {
        color: #1abc9c !important;
      }

      :hover .ant-radio-button-wrapper {
        position: relative;
        color: #33cc8f !important;
      }

      .ant-radio-button-wrapper:hover {
        position: relative;
        color: #33cc8f !important;
      }
    }

    .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
      z-index: 1;
      color: #fff;
      background: #1abc9c;

      .content {
        color: #fff;
      }
    }
  }
</style>
