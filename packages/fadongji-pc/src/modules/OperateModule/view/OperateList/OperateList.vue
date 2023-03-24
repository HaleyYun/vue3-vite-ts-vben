<template>
  <div class="mx-24px mt-20px mb-24px">
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
            <template v-if="column.dataIndex === 'qualityTime'">
              <template v-if="record.qualityBeginTime">
                <span>{{ record.qualityBeginTimeOne }}</span> -
                <span>{{ record.qualityEndTime }}</span>
              </template>
            </template>
            <template v-if="column.dataIndex === 'qualityStatus'">
              <span v-if="record.qualityStatus === 0">未质保</span>
              <span v-if="record.qualityStatus === 1">预激活</span>
              <span v-if="record.qualityStatus === 2">保修中</span>
              <span v-if="record.qualityStatus === 3">已过保</span>
            </template>
            <template v-if="column.dataIndex === 'operation'">
              <template v-if="record.qualityStatus === 2">
                <AButton
                  v-auth="'/v1/activation/record/'"
                  type="link"
                  size="small"
                  @click="cancelActivation(record)"
                  >取消激活
                </AButton>
              </template>
              <template v-else>--</template>
            </template>
          </template>
        </ATable>
      </div>
      <div class="flex justify-end py-15px bg-white">
        <VoPagination
          :size="'default'"
          :total="paginations.total"
          :current="paginations.pageNo"
          :page-size="paginations.pageSize"
          @pagination="paginationChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, createVNode, onBeforeMount } from 'vue'
  import { Modal } from 'ant-design-vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import SearchForm from './component/SearchForm.vue'
  import { tableColumns } from './data/configuration'
  import { useMessage } from '/@/hooks/web/useMessage'
  import dayjs from 'dayjs'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";
  // --------全局参数---------------
  const { createMessage } = useMessage()

  // ------操作按钮----------
  // 解除角色
  const cancelActivation = (record) => {
    const modal = Modal.confirm({
      title: '取消激活',
      icon: createVNode(ExclamationCircleOutlined),
      okText: '取消激活确认',
      content: '确定要取消激活吗？',
      onOk() {
        let params = { id: record.id }
        cancelDeactivate(params)
        modal.destroy()
      },

      onCancel() {
        modal.destroy()
      },
    })
  }
  const cancelDeactivate = async (params) => {
    try {
      const { code, message } = await AdminHttp.ACTIVATION.activationRecordBy$id(params)
      if (code === '20001') {
        createMessage.success('取消激活成功')
        // 重新加载列表页面
        loadTableData()
      } else {
        createMessage.error(message)
      }
    } catch (e) {
      console.log(e)
    }
  }

  // ------form列表---------
  const filterData = ref({})
  // 重置
  const handlerRest = (values) => {
    paginations.pageNo = 1
    filterData.value = {
      ...values,
    }
    loadTableData()
  }
  // 搜索
  const handlerSubmit = (values) => {
    paginations.pageNo = 1

    filterData.value = {
      ...values,
    }
    loadTableData()
  }

  //------ 分页查询 -----------------
  const paginations = reactive({
    pageNo: 1,
    pageSize: 10,
    total: 0,
  }) // 分页配置
  const paginationChange = ({ current, pageSize }) => {
    paginations.pageNo = current
    paginations.pageSize = pageSize
    loadTableData()
  }

  //----- 加载列表数据 ---------
  const tableLoading = ref(false)
  const tableData = ref([])
  const loadTableData = async () => {
    try {
      tableLoading.value = true
      let params = {
        ...filterData.value,
        ...paginations,
      }
      const { code, data } = await AdminHttp.ACTIVATION.activationRecordQueryPage(params)
      console.log(tableData)
      if (code === '20001') {
        tableData.value = data.records
          ? data.records.map((item) => {
              return {
                ...item,
                qualityBeginTimeOne: dayjs(item.qualityBeginTime).format('YYYY-MM-DD'),
                qualityEndTime: dayjs(item.qualityEndTime).format('YYYY-MM-DD'),
              }
            })
          : []
        paginations.total = data.total

        // 这个判断当删除数据最后一条的时候，但是分页不在第一页，加载上一页的数据
        if (paginations.pageNo > 1 && tableData.value.length === 0) {
          paginations.pageNo = paginations.pageNo - 1
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
    // 初始化数据
    loadTableData()
  })
</script>

<style scoped lang="less"></style>
