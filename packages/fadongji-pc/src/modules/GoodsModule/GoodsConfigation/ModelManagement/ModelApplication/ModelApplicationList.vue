<template>
 <div>
  <div class="mx-24px mt-72px mb-24px">
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
            <template v-if="column.dataIndex == 'shopName'">
              <div>{{record.shopName}}</div>
              <div>{{record.legalPhone}}</div>
            </template>
            <template v-if="column.dataIndex == 'creatorName'">
              <div>{{record.creatorName}}</div>
              <div>{{record.creatorPhone}}</div>
            </template>
            <template v-if="column.dataIndex == 'shop_status'">
              <div>
                <span>{{ record.shop_status == 1 ? '正常' : '禁言' }}</span
                ><br />
                <AButton v-if="record.shop_status" type="link" @click="EditShopStatus(record)"
                  >编辑
                </AButton>
              </div>
            </template>
            <template v-if="column.dataIndex === 'operation'">
              <!-- 1未处理 模拟数据的状态 -->
              <template v-if="record.status === 1">
                <AButton v-auth="'/v1/goods/model/apply/approval'" type="link" size="small" @click="audit(record)">审核</AButton>
              </template>
              <template v-else>
                <AButton v-auth="'/v1/goods/model/apply/view'" type="link" size="small" @click="goDetails(record)">查看详情</AButton>
              </template>
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

  <DetailModal @register="registerDetailModal" @update="updateTableData" />
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
  import DetailModal from './component/DetailModal.vue'
  import { tableColumns } from './data/configuration'
  import { useRouter } from 'vue-router'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { useModal } from '/@/components/Modal'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";

  // --------全局参数---------------
  const { createMessage } = useMessage()
  const router = useRouter()

  // ------操作按钮----------
  // 详情
  const [registerDetailModal, { openModal }] = useModal()
  const modalData = {
    type: 'detail',
    id: '',
    title: '',
  }

  const goDetails = (record) => {
    modalData.type = 'detail'
    modalData.id = record.id
    modalData.title = '查看详情'
    console.log(modalData)
    openModal(true, modalData)
  }

  const audit = (record) => {
    modalData.type = 'audit'
    modalData.id = record.id
    modalData.title = '型号申请'
    openModal(true, modalData)
  }
  const updateTableData = () => {
    loadTableData()
  }

  // ------form列表---------
  const filterData = ref({})
  // 重置
  const handlerRest = (values) => {
    paginations.current = 1
    filterData.value = {
      ...values,
    }
    loadTableData()
  }
  // 搜索
  const handlerSubmit = (values) => {
    paginations.current = 1
    filterData.value = {
      ...values,
    }
    loadTableData()
  }

  //------ 分页查询 -----------------
  const paginations = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  }) // 分页配置
  const paginationChange = ({ current, pageSize }) => {
    paginations.current = current
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
        pageNo: paginations.current,
        pageSize: paginations.pageSize,
      }
      const { code, data } = await AdminHttp.GOODS.goodsModelApplyQueryPage(params)
      if (code === '20001') {
        tableData.value = data.records ? data.records : []
        paginations.total = data.total
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
