<template>
  <div>
    <EraTabs :tabsList="tabsList" :tabs-active="activeKey" @tabsChange="tabsChange" />
  </div>
  <div class="mx-24px mt-72px mb-24px">
    <div class="my-24px bg-white p-24px pb-4px">
      <SearchForm @rest="handlerRest" @submit="handlerSubmit" />
    </div>

    <div class="p-24px bg-white">
      <EraTableTitle :total="paginations.total">
        <template #tableEdit>
          <a-button
            type="primary"
            class="margin-l-r-10"
            @click="add"
            v-auth="'/v1/api/company/legal/SkilledWorker/add'"
            >新增集师傅
          </a-button>
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
            <!-- 拓客 -->
            <template v-if="column.dataIndex === 'showStatus'">
                <ASwitch
                  @change="stateVisible(record)"
                  :checked="record.showStatus"
                  checked-children="开启"
                  un-checked-children="关闭"
                />
            </template>
            <!--接单资质-->
            <template v-if="column.dataIndex === 'qualify'">
              <div>
                <span>{{ record.qualify }}</span
                ><br />
                <a-tooltip
                  v-if="
                    record.qualifyAfterSaleStatus &&
                    record.qualifyInstallStatus &&
                    record.qualifyRecycleStatus
                  "
                  placement="topLeft"
                  title="无资质可点击"
                >
                  <AButton type="link" disabled>开通资质</AButton>
                </a-tooltip>
                <AButton v-else type="link" @click="openQualification(record)">开通资质</AButton>
              </div>
            </template>
            <!--集师傅拓客-->
            <template v-if="column.dataIndex === 'skilledWorkerNum'">
              <a @click="technicalWorkersTalk(record)">{{ record.skilledWorkerNum }}</a>
            </template>
            <!--修理厂拓客-->
            <template v-if="column.dataIndex === 'garageNum'">
              <a @click="repairShopCustomer(record)">{{ record.garageNum }}</a>
            </template>
            <template v-if="column.dataIndex == 'areaCodeStr'">
              <div>
                <span>{{ record.areaCodeStr }}</span
                ><br />
                <AButton v-if="record.areaCodeStr" type="link" @click="openAddressFn(record)"
                  >详细地址
                </AButton>
              </div>
            </template>
            <template v-if="column.dataIndex == 'inviteUserName'">
              {{ record['inviteUserName'] ? record['inviteUserName'] : '无' }}
            </template>
            <template v-if="column.dataIndex === 'operation'">
              <!--  1待审核 4已审核 5审核失败 6黑名单 checkStatus -->
              <template v-if="record.checkStatus === 4 && !record.isBlacklist">
                <AButton
                  type="link"
                  size="small"
                  @click="goDetails(record)"
                  v-auth="'/v1/company/info/skilledWorker/details/'"
                  >详情
                </AButton>
                <AButton
                  type="link"
                  size="small"
                  @click="triggerBlacklist(record, 1)"
                  v-auth="'/v1/company/info/change/black'"
                  >加入黑名单
                </AButton>
              </template>
              <template v-else-if="record.isBlacklist">
                <AButton
                  type="link"
                  size="small"
                  @click="goDetails(record)"
                  v-auth="'/v1/company/info/skilledWorker/details/'"
                  >详情
                </AButton>
                <AButton
                  type="link"
                  size="small"
                  @click="triggerBlacklist(record, 2)"
                  v-auth="'/v1/company/info/change/black'"
                  >取消黑名单
                </AButton>
              </template>
              <template v-else>
                <AButton
                  type="link"
                  size="small"
                  v-if="+record.checkStatus === 0"
                  @click="liftRole(record)"
                  v-auth="'/v1/company/info/unbind/role'"
                  >解除角色
                </AButton>
                <AButton
                  type="link"
                  size="small"
                  @click="goDetails(record)"
                  v-auth="'/v1/company/info/skilledWorker/details/'"
                  >详情
                </AButton>
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
  <a-modal
    :title="eraModal.title"
    v-model:visible="eraModal.visible"
    :confirmLoading="confirmLoading"
    @ok="eraModalOk"
  >
    <div class="p-24px">{{ eraModal.content }}</div>
  </a-modal>
  <VoMap v-model:visible="showMapBoo" :mark-position="mapInfo" />
  <QualificationModal
    v-model:visible="qualificationModal.visible"
    :qualifyType="qualificationModal.qualifyType"
    @change="openqualify"
  />
  <a-modal v-model:visible="visible" title="操作确认" @ok="handleOk">
      <div class="p-14px">请确定是否{{ InfoVisible.showStatus ? '关闭' : '开启' }}该客户推广扩客功能</div>
    </a-modal>
</template>

<script lang="ts" setup>
  import { ref, reactive, createVNode } from 'vue'
  import { Modal } from 'ant-design-vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import SearchForm from './component/SearchForm.vue'
  import VoMap from '/@/components/VoMap/VoMap.vue'
  import { tableColumns } from './data/configuration'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import QualificationModal from '/@/modules/CustomerModule/businessComponents/QualificationModal/QualificationModal.vue'

  import { useRouter } from 'vue-router'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  // --------全局参数---------------
  const { createMessage } = useMessage()
  const router = useRouter()
  const visible = ref<boolean>(false);
  const InfoVisible=ref<any>('')
  //  --- 全选 筛选操作 ----
  const selectedRow = ref<string[]>([])
  const rowSelection = {
    onChange: (selectedRowKeys: string[], selectedRows: object[]) => {
      // selectedRowKeys 返回id集合，selectedRows返回选中的那一条的数据
      console.log(selectedRows)
      selectedRow.value = selectedRowKeys
    },
  }

  // ------操作按钮----------
  //   集师傅拓客
  const technicalWorkersTalk = (record) => {
    router.push({
      path: '/customerModule/TechnicalWorkers/WorkersCustomers',
      query: { id: record.id },
    })
  }
  // 修理厂拓客
  const repairShopCustomer = (record) => {
    router.push({
      path: '/customerModule/TechnicalWorkers/GarageCustomer',
      query: { id: record.id },
    })
  }
  // 新增集师傅
  const add = () => {
    router.push('/customerModule/TechnicalWorkers/TechnicalWorkersAdd')
  }

  // 详情
  const goDetails = (record) => {
    // TechnicalWorkersDetail
    router.push({
      path: '/customerModule/TechnicalWorkers/TechnicalWorkersDetail',
      query: { id: record.id },
    })
  }
  // 查看详细地址
  const showMapBoo = ref(false)
  const mapInfo = ref<string | number[]>([])
  const openAddressFn = (res) => {
    mapInfo.value = [res.longitude, res.latitude]

    console.log(mapInfo.value, '9999')
    showMapBoo.value = true
  }

  // 解除角色
  const liftRole = (record) => {
    const modal = Modal.confirm({
      title: '解除角色',
      icon: createVNode(ExclamationCircleOutlined),
      okText: '解除',
      content: '确定要解除角色吗？',
      onOk() {
        // 调取解除角色的接口
        let params = { id: record.id }
        commpdityliftRole(params)
        modal.destroy()
      },

      onCancel() {
        modal.destroy()
      },
    })
  }
  const commpdityliftRole = async (params) => {
    try {
      const { code, message } = await AdminHttp.CUSTOMER.companyInfoUnbindRole(params)
      if (code === '20001') {
        createMessage.success('解除角色成功')
        // 重新加载列表页面
        loadTableData()
      } else {
        createMessage.error(message)
      }
    } catch (e) {
      console.log(e)
    }
  }

  // ----加入黑名单 解除黑名单 ----
  const confirmLoading = ref(false)
  const eraModal = reactive({
    title: '',
    content: '',
    type: 1, // 1 加入黑名单 2解除黑名单
    visible: false,
    id: '',
  })
  const triggerBlacklist = (record, type) => {
    // 这里做一些初始化数据的操作 有可能弹出框是一批数据的设置
    if (type == 1) {
      eraModal.title = '加入黑名单'
      eraModal.content = '确定要加入黑名单吗？'
    } else {
      eraModal.title = '解除黑名单'
      eraModal.content = '确定要解除黑名单吗?'
    }
    eraModal.type = type
    eraModal.id = record.id
    eraModal.visible = true
  }
  const eraModalOk = async () => {
    try {
      confirmLoading.value = true
      const map = { id: eraModal.id, isBlacklist: eraModal.type == 1 ? true : false }
      const { code, message } = await AdminHttp.CUSTOMER.companyInfoChangeBlack(map)
      if (code == '20001') {
        eraModal.visible = false
        // 重新加载列表页面
        init_data()
        createMessage.success('操作成功')
      } else {
        createMessage.error(message)
      }
      confirmLoading.value = false
    } catch (e) {
      console.log(e)
      confirmLoading.value = false
    }
  }

  // ------开通资质-------
  const qualificationModal = reactive({
    visible: false,
    id: null,
    qualifyType: [], // 认证类型  31:售后回收单 32:安装单 33:回收单；  多选逗号分隔
  })
  const openQualification = (record) => {
    // record.qualifyAfterSaleStatus 售后资质
    // record.qualifyInstallStatus 安装资质
    // record.qualifyRecycleStatus 回收资质
    let qualifyAfterSaleStatus = record.qualifyAfterSaleStatus ? 31 : 0
    let qualifyInstallStatus = record.qualifyInstallStatus ? 32 : 0
    let qualifyRecycleStatus = record.qualifyRecycleStatus ? 33 : 0
    qualificationModal.id = record.id
    qualificationModal.qualifyType = [
      qualifyAfterSaleStatus,
      qualifyInstallStatus,
      qualifyRecycleStatus,
    ]
    qualificationModal.visible = true
  }
  const openqualify = async ({ qualifyType }) => {
    try {
      let params = { id: qualificationModal.id, qualifyType }
      let { code } = await AdminHttp.COMPANY.companyInfoSkilledWorkerOpenqualify(params)
      if (code == '20001') {
        createMessage.success('操作成功')
        qualificationModal.visible = false
        loadTableData()
      }
    } catch (e) {
      createMessage.error(e.message)
      console.log(e)
    }
  }

  //------tabs页签配置-------
  const activeKey = ref(null)
  const tabsList = ref([])
  const tabsChange = (Key) => {
    activeKey.value = Key
    paginations.current = 1
    paginations.pageSize = 10

    loadTableData()
  }
  const getTabs = async () => {
    try {
      const { code, data } = await AdminHttp.COMPANY.companyInfoSkilledWorkerTab()

      if (code === '20001') {
        tabsList.value = data.map((item) => {
          return { key: item.checkStatus, name: item.checkStatusStr, totalCount: item.count }
        })
      }
    } catch (e) {
      console.log(e)
    }
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
        checkStatus: activeKey.value,
        pageNo: paginations.current,
        pageSize: paginations.pageSize,
      }
      const { code, data } = await AdminHttp.COMPANY.companyInfoSkilledWorkerPage(params)
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
  // 初始化数据
  const init_data = () => {
    getTabs()
    loadTableData()
  }
  //启用状态
  const stateShow = (InfoVisible) => {
    console.log(!InfoVisible.value.showStatus,'InfoVisible');
    const changeSwitchMap = {
      companyId: InfoVisible.value.id,
      showStatus: !InfoVisible.value.showStatus,
    }
    AdminHttp.COMPANY.companyInfoShowStatus(changeSwitchMap).then(() => {
        loadTableData()
      })
      .catch((error) => {
        console.log('error=', error)
      })
  }
  const handleOk = async (e: MouseEvent) => {
     await stateShow(InfoVisible)
    visible.value = false;
    };
    
 const stateVisible=(record) => {
      InfoVisible.value = record
      visible.value = true;
    }
  onMountedOrActivated(() => {
    init_data()
  })
</script>

<style scoped lang="less"></style>
