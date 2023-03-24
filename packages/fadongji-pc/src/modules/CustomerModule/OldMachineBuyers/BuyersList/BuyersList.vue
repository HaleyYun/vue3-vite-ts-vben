<template>
 <div>
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
          <a-button type="primary" class="margin-l-r-10" @click="add" v-auth="'/v1/api/company/legal/oldMachine/add'">新增旧机买家</a-button>
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
            <template v-if="column.dataIndex === 'status'">
              <div>
                <span>{{ record.statusStr }}</span><br/>
                <AButton v-if="record.status" type="link" @click="EditShopStatus(record)" v-auth="'/v1/company/info/change/store/status'">编辑</AButton>
              </div>
            </template>
            <template v-if="column.dataIndex === 'operation'">

              <!-- 1审核中 4已认证 3审核失败 -->
              <AButton type="link" size="small" @click="goDetails(record)" v-auth="'/v1/company/info/oldMachine/get/'">详情</AButton>
              <template v-if="record.checkStatus === 4 && !record.isBlacklist">
                <AButton type="link" size="small" @click="triggerBlacklist(record,1)" v-auth="'/v1/company/info/change/black'">加入黑名单</AButton>
                <AButton type="link" size="small" @click="liftRole(record)" v-auth="'/v1/company/info/unbind/role'">解除角色</AButton>
              </template>
              <template v-else-if="record.checkStatus === 3 && !record.isBlacklist">
                <AButton type="link" size="small" @click="edit(record)" v-auth="'/v1/api/company/legal/auth/info'">修改</AButton>
              </template>
              <template v-else-if="record.isBlacklist">
                <AButton type="link" size="small" @click="triggerBlacklist(record,2)" v-auth="'/v1/company/info/change/black'">取消黑名单</AButton>
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
    <div class="p-24px">{{eraModal.content}}</div>
  </a-modal>
  <ShopStatusModal @register="register" @update="loadTableData"></ShopStatusModal>
 </div>

</template>

<script lang="ts" setup>
  import { ref, reactive, createVNode, onBeforeMount } from 'vue'
  import { Modal } from 'ant-design-vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import SearchForm from './component/SearchForm.vue'
  import ShopStatusModal from './component/ShopStatusModal.vue'
  import { tableColumns, mockTableData } from './data/configuration'
  import { useRouter } from 'vue-router'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { useModal } from '/@/components/Modal'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";

  // --------全局参数---------------
  const { createMessage } = useMessage()
  const router = useRouter()




  // ------操作按钮----------

  // 新增旧机买家
  const add = () => {
    router.push('/customerModule/OldMachineBuyers/OldMachineBuyersAdd')
  };
  // 编辑旧机买家
  const edit = (record) =>{
    router.push({path:'/customerModule/OldMachineBuyers/OldMachineBuyersAdd',query:{id:record.id}})
  }

  // 详情
  const goDetails = (record) =>{
    // TechnicalWorkersDetail
    router.push({
      path: '/customerModule/OldMachineBuyers/OldMachineBuyersDetail',
      query: { id: record.id },
    })

  };
  // 编辑店铺状态
  const [register, {openModal}] = useModal();
  const EditShopStatus = (res) => {
    console.log(res.status.split(','))
    openModal(true, {status: res.status,id:res.id})
  };



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
  };


  // ----加入黑名单 解除黑名单 ----
  const confirmLoading = ref(false)
  const eraModal = reactive({
    title:'',
    content:'',
    type:1,// 1 加入黑名单 2解除黑名单
    visible: false,
    id:''
  });
  const triggerBlacklist = (record,type) => {
    // 这里做一些初始化数据的操作 有可能弹出框是一批数据的设置
    if(type == 1){
      eraModal.title = '加入黑名单';
      eraModal.content = '确定要加入黑名单吗？'
    }else {
      eraModal.title = '解除黑名单';
      eraModal.content = '确定要解除黑名单吗?'
    }
    eraModal.type = type;
    eraModal.id = record.id;
    eraModal.visible = true
  }
  const eraModalOk = async () => {
    try {
      confirmLoading.value = true
      const map = { id: eraModal.id, isBlacklist:eraModal.type == 1?true:false}
      const { code,message } = await AdminHttp.CUSTOMER.companyInfoChangeBlack(map)
      if (code == '20001') {
        eraModal.visible = false;
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
      const { code, data } = await AdminHttp.COMPANY.companyInfoOldMachineTab()

      if (code === '20001') {
        tabsList.value =  data.map(item => {
          return {key: item.checkStatus, name: item.checkStatusStr, totalCount: item.count}
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
    };
    loadTableData()
  }
  // 搜索
  const handlerSubmit = (values) => {
    paginations.current = 1
    filterData.value = {
      ...values,
    };
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
      tableLoading.value = true;
      let params = {
        ...filterData.value,
        checkStatus:activeKey.value,
        pageNo:paginations.current,
        pageSize:paginations.pageSize,
      };
      const { code, data } = await AdminHttp.COMPANY.companyInfoOldMachinePage(params)
      console.log(tableData)
      if (code === '20001') {
        tableData.value = data.records?data.records:[];
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
  };
  const init_data = () =>{
    getTabs();
    loadTableData()
  }

  onMountedOrActivated(() => {
    // 初始化数据
    init_data()
  })
</script>

<style scoped lang="less"></style>
