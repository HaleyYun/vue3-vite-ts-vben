<template>
  <div class="mx-24px mb-24px">
    <div class="my-24px bg-white p-24px pb-4px">
      <SearchForm @rest="handlerRest" @submit="handlerSubmit"></SearchForm>
    </div>
    <div class="p-24px bg-white">
      <EraTableTitle :total="paginations.total">
        <template #tableEdit>
          <a-button type="primary" class="margin-l-r-10" @click="goClassification"
            >分类管理</a-button
          >
          <a-button type="default" @click="addDetails">添加内容</a-button>
        </template>
      </EraTableTitle>

      <div>
        <ATable
          :loading="tableLoading"
          :columns="tableColumns"
          :data-source="tableData"
          :pagination="false"
          size="small"
          :scroll="{ x: 1200 }"
          bordered
        >
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex === 'operation'">
              <AButton type="link" @click="editDetails(record)">编辑</AButton>

              <APopconfirm
                title="确定要删除吗？"
                ok-text="确定"
                cancel-text="取消"
                @confirm="handlerDeletedRow(record)"
              >
                <AButton type="link">删除</AButton>
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
</template>

<script lang="ts" setup>
  import { ref, reactive, onBeforeMount, unref, toRefs } from 'vue'

  //   import { useMessage } from '/@/hooks/web/useMessage'
  import adminHttp from '/@/utils/http/adminHttp'

  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import { useContentWithOut } from '/@/store/modules/content'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { clearObjectUnalbeAttr } from '/@/utils/helper/formHelper'
  import SearchForm from './component/SearchForm.vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { tableColumns, MockTableData } from './data/configuration'
  import { useRouter } from 'vue-router'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";
  const go = useRouter()
  const editDetails = (record) => {
    const useStore = useContentWithOut()
    console.log(unref(record.id))
    useStore.setDetailList({ ...toRefs(record) })
    console.log(record, 'record')
    go.push({
      name: 'ManualContent',
      query: {
        id: record.id,
      },
    })
  }
  const addDetails = () => {
    go.push({
      name: 'ManualContent',
    })
  }
  //分类管理
  const goClassification = () => {
    go.push({
      name: 'ManualClassification',
    })
  }

  const loadingCtxkey = 'handlerRow'
  const { createMessage } = useMessage()

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
        platformCode: 'supplier',
      }
      const { code, data } = await adminHttp.CONTENTMENT.contentHelpContentCondition(
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
  //删除/v1/order/evaluate/delete
  const handlerDeletedRow = (item) => {
    // createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    // adminHttp
    //   .orderEvaluateDelete({ id: item.id })
    //   .then(() => {
    //     createMessage.success({ content: `操作成功`, key: loadingCtxkey })
    //     loadTableData()
    //   })
    //   .catch((err) => {
    //     createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
    //   })
  }
  onMountedOrActivated(() => {
    loadTableData()
  })
</script>

<style scoped lang="less"></style>
