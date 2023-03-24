<template>
 <div>
  <div class="table-list">
    <div class="table-list__title">
      <div class="title-strip">数据列表</div>
    </div>
    <Table
        class="table-list_table"
        :dataSource="manualUseDataSourceList"
        :columns="manualUseColumnsList"
        :pagination="false"
        size="small"
        bordered
        :scroll="{ x: `${manualUseColumnsList.length}0%`, y: 500 }"
    >
      <!-- column  -->
      <template #operation="{ record }">
        <div class="solid-column__height">
          <a class="action-space" @click="editEvent(record)">编辑</a>
          <Popconfirm
              title="确认要删除吗?"
              ok-text="确认"
              cancel-text="取消"
              @confirm="confirmItem(record)"
          >
            <a class="action-space">删除</a>
          </Popconfirm>
        </div>
      </template>
    </Table>
    <div class="com-item">
      <VoPagination
          :total="pagination.total"
          :current="pagination.current"
          :page-size="pagination.pageSize"
          @pagination="paginationChange"
      />
    </div>
  </div>
  <EraColumnForm :width="popWidth" :title="modalTitle" :data="modelData" ref="editColumnFormRef">
    <template #content="{ row }">
      <!--  所属角色-->
      <template v-if="VoUtils.hasOwn(row, 'isSelect')">
        <Select
            v-model:value="row.value"
            :placeholder="row.isPlaceHolder"
            :options="options"
        />
      </template>
      <!--  编辑器 -->
      <template v-if="VoUtils.hasOwn(row, 'isEditMachine')">
        <!--<EraEditor  height="500" ref="eraEditRef" />-->
        <span>编辑器占位符</span>
      </template>
    </template>
  </EraColumnForm>
 </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import type { SelectProps } from 'ant-design-vue';
import { Table, Switch, Popconfirm, Select } from 'ant-design-vue'
import VoPagination from '/@/components/VoPagination/VoPagination.vue' // 分页
import {manualUseColumnsList} from "/@/modules/ContentModule/view/ContentManage/ManualUse/type/type";
import {manualUseDataSourceList} from "/@/modules/ContentModule/view/ContentManage/ManualUse/mock"; // 招商列表-column
import EraColumnForm from "/@/components/EraColumnForm/EraColumnForm.vue"; // 招商手册 - model列表弹框
import {manualUseEditFormData} from "/@/modules/ContentModule/view/ContentManage/ManualUse/type/type"; // 招商手册 - 编辑数据
// import {VoUtils} from "@vocen/shared";
import {VoUtils} from '../../../../../../../shared/src/index'
// import WangEditor
export default defineComponent({
  name: 'ManualUseTable',
  components: {
    Table,
    Switch,
    Select,
    VoPagination,
    Popconfirm,
    EraColumnForm,
  },
  emits: ['goDetails', 'goDeleteGoods'],
  setup() {
    const eraEditRef = ref() // "招商手册" - 编辑器
    const popWidth = ref() // “招商手册” - 宽度
    const modalTitle = ref('编辑')  // "招商手册" - 编辑标题
    const modelData = ref(manualUseEditFormData) // "招商手册" - 编辑“数据集”
    const editColumnFormRef = ref() // "招商手册" - 编辑 弹框 是否显示的ref关联
    // “招商手册” -- 编辑 数据集
    const options = ref<SelectProps['options']>([
      { value: 'jack', label: 'Jack' },
      { value: 'lucy', label: 'Lucy' },
      { value: 'tom', label: 'Tom' },
    ])
    // “招商手册” - 编辑event
    const editEvent = (item) => {
      console.log('编辑event===', item)
      popWidth.value = 1024
      // console.log(eraEditRef.value.getHtml(), 'ssss')
      editColumnFormRef.value.isOpenAlertShow()
    }
    // “招商手册” -- 删除
    const confirmItem = (item) => {
      console.log('商品删除单项item===', item)
    }
    // "招商手册" -- 分页
    const pagination = reactive({
      total: 158,
      current: 1,
      pageSize: 20,
    })
    // “招商手册” -- 触发事件
    const paginationChange = ({ current, pageSize }) => {
      pagination.current = current
      pagination.pageSize = pageSize
    }
    return {
      manualUseColumnsList,
      manualUseDataSourceList,
      VoUtils,
      eraEditRef,
      popWidth,
      editColumnFormRef,
      options,
      modelData,
      pagination,
      modalTitle,
      editEvent,
      confirmItem,
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
  padding: 10px 0;
  align-items: center;
  border-bottom: none;
  background-color: #ffffff;
  .title-strip {
    flex-grow: 1;
    align-items: center;
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
  padding: 10px 10px 0 0;
  background-color: #fff;
}
// 另外三个有switch的缘故，内容撑高了，为了保持一致，固定本模块column高度，保持一致
.solid-column__height {
  padding: 1px 0
}
</style>
