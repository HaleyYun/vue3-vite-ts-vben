<template>
  <div>
    <div class="mx-24px mb-24px">
    <div class="my-24px bg-white p-24px pb-4px">
      <SearchForm @rest="handlerRest" @submit="handlerSubmit"></SearchForm>
    </div>
    <div class="p-24px bg-white">
      <EraTableTitle :total="paginations.total">
        <template #tableEdit>
          <AButton
            type="primary"
            :disabled="selectedRow.length === 0"
            class="margin-l-r-10"
            @click="batchOperation"
            v-auth="'/v1/content/content/batch/update'"
          >
            批量删除
          </AButton>
          <!-- v-auth="'/v1/content/category/condition'" -->
          <AButton type="primary" class="margin-l-r-10" @click="addDetails" v-auth="'/v1/content/content/save/batch'">新增课程</AButton>
          <AButton type="default" @click="goClassification" v-auth="'/v1/content/category/condition'" >管理分类</AButton>
        </template>
      </EraTableTitle>
      <div>
        <ATable
          :loading="tableLoading"
          :row-selection="rowSelection"
          :rowKey="(record) => record.id"
          :columns="tableColumns"
          :data-source="tableData"
          :pagination="false"
          size="small"
          :scroll="{ x: 1200 }"
          bordered
        >
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex === 'isEnable'">
              <!--@click="changeItem(record)"-->
              <ASwitch
                @change="stateEnable(record)"
                :checked="record.isEnable"
                checked-children="开"
                un-checked-children="关"
              />
            </template>
            <template v-if="column.dataIndex === 'isRecommend'">
              <ASwitch
                @change="selectedEnable(record)"
                :checked="record.isRecommend"
                checked-children="开"
                un-checked-children="关"
              />
            </template>
            <template v-if="column.dataIndex === 'platformCode'">
              <span v-if="record.platformCode === 'skilledWorker'">集师傅</span>
              <span v-if="record.platformCode === 'supplier'"> 供应商 </span>
              <span v-if="record.platformCode === 'agent'"> 服务商 </span>
              <span v-if="record.platformCode === 'garage'"> 修理厂 </span>
            </template>
            <template v-if="column.dataIndex === 'type'">
              <span v-if="record.type === 1">图文</span>
              <span v-if="record.type === 2">视频</span>
            </template>
            <template v-if="column.dataIndex === 'operation'">
              <AButton type="link" @click="editDetails(record)" v-auth="'/v1/content/category/condition'">编辑</AButton>
              
              <APopconfirm
                title="确定要删除吗？"
                ok-text="确定"
                cancel-text="取消"
                @confirm="handlerDeletedRow(record)"
              >
                <AButton type="link" v-auth="'/v1/content/content/delete'">删除</AButton>
               
              </APopconfirm>
            </template>
          </template>
        </ATable>
      </div>
      <div class="flex justify-end py-15px bg-white">
        <VoPagination
          :size="'default'"
          :total="paginations.total"
          :current="paginations.current"
          :page-size="paginations.pageSize"
          @pagination="paginationChange"
        />
      </div>
    </div>
  </div>
  <a-modal
    title="批量删除"
    v-model:visible="eraModal.visible"
    :confirmLoading="confirmLoading"
    @ok="eraModalOk"
  >
    <div class="p-24px">确定要删除这些数据吗？</div>
  </a-modal>
  </div>
</template>

<script lang="ts" name="StudyCenter" setup>
  import { ref, reactive, onBeforeMount, toRefs, unref } from 'vue'

  //   import { useMessage } from '/@/hooks/web/useMessage'
  import adminHttp from '/@/utils/http/adminHttp'
  import { clearObjectUnalbeAttr } from '/@/utils/helper/formHelper'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import { useContentWithOut } from '/@/store/modules/content'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import SearchForm from '../../compontents/SearchForm.vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { tableColumns } from '../../data/configuration'
  import { useRouter } from 'vue-router'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";
  const go = useRouter()
  //编辑
  const editDetails = (record) => {
    const useStore = useContentWithOut()
    console.log(unref(record.id))
    useStore.setDetailList({ ...toRefs(record) })
    console.log(record, 'record')
    go.push({
      path: '/contentModule/content/studyCenterDetails',
      query: {
        id: record.id,
      },
    })
  }
  //新增
  const addDetails = () => {
    go.push({
      path: '/contentModule/content/studyCenterDetails',
    })
  }
  //分类管理
  const goClassification = () => {
    go.push({
      path: '/contentModule/content/classificationManagement',
    })
  }
  // const loadingCtxkey = 'handlerRow'
  const { createMessage } = useMessage()
  //  --- 全选 筛选操作 ----
  const selectedRow = ref<string[]>([])
  const rowSelection = {
    onChange: (selectedRowKeys: string[], selectedRows: object[]) => {
      // selectedRowKeys 返回id集合，selectedRows返回选中的那一条的数据
      console.log(selectedRows)
      selectedRow.value = selectedRowKeys
    },
  }
  // ----批量操作删除----
  const confirmLoading = ref(false)
  const eraModal = reactive({
    visible: false,
  })
  const batchOperation = () => {
    // 这里做一些初始化数据的操作 有可能弹出框是一批数据的设置
    eraModal.visible = true
  }
  const eraModalOk = async () => {
    confirmLoading.value = true
    try {
      let params = { ids: selectedRow.value }
      const { code, message } = await adminHttp.CONTENTMENT.contentContentUpdate(params)
      if (code === '20001') {
        createMessage.success('删除成功')
        eraModal.visible = false
        // 重新加载列表页面
        selectedRow.value = []
        loadTableData()
      } else {
        createMessage.error(message)
      }
      confirmLoading.value = false
    } catch (e) {
      console.log(e)
      confirmLoading.value = false
    }
  }
  // ---搜索-------
  const filterData = ref({})
  const handlerRest = () => {
    paginations.current = 1
    filterData.value = {}
    loadTableData()
  }
  const handlerSubmit = (values) => {
    paginations.current = 1
    filterData.value = {
      ...values,
    }
    loadTableData()
  }
  //启用状态
  const stateEnable = (record) => {
    const changeSwitchMap = {
      id: record.id,
      isEnable: !record.isEnable,
    }
    adminHttp.CONTENTMENT.contentContentEnable(changeSwitchMap)
      .then(() => {
        loadTableData()
      })
      .catch((error) => {
        console.log('error=', error)
      })
  }
  //启用精选
  const selectedEnable = (record) => {
    const switchMap = {
      id: record.id,
      isRecommend: !record.isRecommend,
    }
    adminHttp.CONTENTMENT.contentContentCancelRecommend(switchMap)
      .then(() => {
        loadTableData()
      })
      .catch((error) => {
        console.log('error=', error)
      })
  }
  //--- 分页查询 ------
  const paginations = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  })
  const paginationChange = ({ current, pageSize }) => {
    paginations.current = current
    paginations.pageSize = pageSize
    loadTableData()
  }

  // 加载数据
  const tableLoading = ref(false)
  const tableData = ref([])
  const loadTableData = async () => {
    try {
      tableLoading.value = true
      let params = {
        ...filterData.value,
        ...paginations,
        pageSize: paginations.pageSize,
        pageNo: paginations.current,
      }
      const { code, data } = await adminHttp.CONTENTMENT.contentContentCondition(
        clearObjectUnalbeAttr(params),
      )
      console.log(tableData)
      if (code === '20001') {
        //tableData.value = data.records?data.records:[];
        paginations.total = data.total
        tableData.value = data.records
        // 这个判断当删除数据最后一条的时候，但是分页不在第一页，加载上一页的数据
        if (paginations.current > 1 && tableData.value.length === 0) {
          paginations.current = paginations.current - 1
          loadTableData()
        }
      }
      tableLoading.value = false
    } catch (e) {
      console.log(e)
      tableLoading.value = false
    }
  }
  //删除
  const loadingCtxkey = 'handlerRow'
  const handlerDeletedRow = (item) => {
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    adminHttp.CONTENTMENT.contentContentDelete({ id: item.id })
      .then(() => {
        createMessage.success({ content: `删除成功`, key: loadingCtxkey })
        loadTableData()
      })
      .catch((err) => {
        createMessage.error({ content: `删除失败:${err.message}`, key: loadingCtxkey })
      })
  }
  onMountedOrActivated(() => {
    loadTableData()
  })
</script>

<style scoped lang="less"></style>
