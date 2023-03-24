<template>
  <div class="mx-24px mb-24px">
    <div class="my-24px bg-white p-24px pb-4px">
      <SearchForm @rest="handlerRest" @submit="handlerSubmit" />
    </div>
    <div class="p-24px bg-white">
      <EraTableTitle :total="paginations.total" />
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
              <AButton type="link" size="small" @click="resettingModalShowEvent(record)"
                >重置密码</AButton
              >
              <AButton type="link" size="small" @click="goDetail(record)">详情</AButton>
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
  import { defineComponent, ref, reactive, createVNode, onBeforeMount } from 'vue'
  import { Modal } from 'ant-design-vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import AdminHttp from '/@/utils/http/adminHttp'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import SearchForm from './component/SearchForm.vue'
  import { tableColumns, MockTableData } from './data/configuration'
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
  import { useRouter } from 'vue-router'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const router = useRouter()
  const { createMessage } = useMessage()

  // 重置密码（点击，重置密码，弹出modal）
  const loadingCtxkey = 'handlerRow'
  const resettingModalShowEvent = (filterTableItem) => {
    Modal.confirm({
      title: '确定要重置密码吗？。',
      icon: createVNode(ExclamationCircleOutlined),
      content: createVNode('div', { style: 'color:red;' }, '密码将被重置为手机号后６位'),
      onOk() {
        console.log(filterTableItem)
        resettingConfirmCloseModalEvent(filterTableItem.id)
      },
      onCancel() {
        console.log('Cancel')
      },
      class: 'test',
    })
  }
  // 重置密码
  const resettingConfirmCloseModalEvent = (id) => {
    try {
      createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
      const { code, message } = AdminHttp.USER.userInfoPassword({ userId: id })
      if (code === '20001') {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
      } else {
        createMessage.error({ content: `${message}`, key: loadingCtxkey })
      }
    } catch (e) {
      console.log(e)
    }
  }

  // 详情
  const goDetail = (record) => {
    console.log(record)
    router.push({ path: '/userModule/user/UserBlackDetails', query: { userId: record.id } })
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
      }
      const { code, data } = await AdminHttp.USER.userInfoPage(params)
      console.log(tableData)
      if (code === '20001') {
        tableData.value = data.records ? data.records : []
        paginations.total = data.total
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

  onMountedOrActivated(() => {
    loadTableData()
  })
</script>

<style scoped lang="less"></style>
