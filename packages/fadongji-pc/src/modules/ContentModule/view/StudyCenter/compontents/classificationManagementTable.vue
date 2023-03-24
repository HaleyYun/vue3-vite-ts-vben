<template>
  <div class="mx-24px mt-20px mb-24px">
    <div class="my-24px bg-white p-24px pb-4px">
      <classFilterForm @rest="handlerRest" @submit="handlerSubmit" />
    </div>
    <div>
      <EraSwitchTable :total="pagination.total">
        <template #tableEdit>
          <AButton type="primary" class="m-10px" @click="editItemDetails(record, alertEnum.Add)" v-auth="'/v1/content/category/save/batch'"
            >新增分类
          </AButton>
          <AButton type="primary" class="m-10px" @click="merchantUniversityFunc" v-auth="'/v1/content/content/condition'"
            >返回商家大学
          </AButton>
        </template>
        
        <template #content>
          <ATable
            rowKey="id"
            class="case-table"
            :columns="tableColumn"
            :data-source="studyCenterData"
            :pagination="false"
            size="small"
            bordered
            :scroll="{ y: 1200 }"
          >
            <template #bodyCell="{ column, text, record }">
              <template v-if="column.dataIndex === 'platformCode'">
                <template v-if="record.platformCode === 'supplier'"> 供应商</template>
                <template v-else-if="record.platformCode === 'agent'"> 服务商</template>
                <template v-else-if="record.platformCode === 'garage'"> 修理厂</template>
                <template v-else>投资人</template>
              </template>
              <template v-if="column.dataIndex === 'order'">
                <ArrowUpOutlined
                  v-if="hasShowUp !== record.id"
                  class="margin-r-10"
                  @click="ArrowUpOutlinedEvent(record)"
                />
                <ArrowDownOutlined
                  v-if="hasShowDown !== record.id"
                  class="margin-r-10"
                  @click="ArrowDownOutlinedEvent(record)"
                />
                <VerticalAlignTopOutlined
                  v-if="hasShowUp !== record.id"
                  class="margin-r-10"
                  @click="VerticalAlignTopOutEvent(record)"
                />
                <VerticalAlignBottomOutlined
                  v-if="hasShowDown !== record.id"
                  @click="VerticalAlignBottomOutEvent(record)"
                />
              </template>
              <template v-if="column.dataIndex === 'isEnable'">
                <ASwitch
                  checked-children="开"
                  un-checked-children="关"
                  v-model:checked="record.isEnable"
                  @change="helpCategoryEnable(record.id, record.isEnable)"
                />
              </template>
              <template v-if="column.dataIndex === 'isRecommend'">
                <ASwitch
                  checked-children="开"
                  un-checked-children="关"
                  v-model:checked="record.isRecommend"
                  @change="contentContentRecommendEvent(record.id, record.isRecommend)"
                />
              </template>
              <!--  是否启用-->
              <template v-if="column.dataIndex === 'operation'">
                <div class="flex">
                  <classEditPop class="margin-r-10" :title="titleType" ref="editContentRef">
                    <template #slotContent>
                      <a @click="editItemDetails(record, alertEnum.Edit)" v-auth="'/v1/content/category/modify'">编辑</a>
                    </template>
                    <!-- v-auth="'/v1/content/category/delete'" -->
                  </classEditPop>
                  <APopconfirm
                    title="确认要删除吗?"
                    ok-text="确认"
                    cancel-text="取消"
                    @confirm="deleteItemEvent(record.id)"
                    v-auth="'/v1/content/category/delete'"
                  >
                    <a>删除</a>
                  </APopconfirm>
                </div>
              </template>
            </template>
          </ATable>
        </template>
        <template #pagination>
          <VoPagination
            :total="pagination.total"
            :current="pagination.current"
            :page-size="pagination.pageSize"
            @pagination="paginationChange"
          />
        </template>
      </EraSwitchTable>
    </div>
  </div>
  <AModal
    v-model:visible="classModal.visible"
    :title="classModal.title"
    centered
    destroy-on-close
    :confirm-loading="classModal.confirmLoading"
    @ok="classAdd"
    @cancel="classCancel"
  >
    <div class="p-10">
      <AForm
        ref="formRef"
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 14 }"
        autocomplete="off"
      >
        <AFormItem
          label="分类名称"
          name="className"
          :rules="[{ required: true, message: '请填写分类名称' }]"
        >
          <AInput
            v-model:value="formState.className"
            :maxlength="8"
            placeholder="请输入分类名称"
            allow-clear
          />
        </AFormItem>
        <AFormItem
          label="所属角色"
          name="classRole"
          :rules="[{ required: true, message: '请选择所属角色' }]"
        >
          <!-- alertEnum.Add) -->
          <a-select
            v-if="editBrand.id != ''"
            v-model:value="formState.classRole"
            placeholder="请选择所属角色"
          >
            <a-select-option value="supplier">供应商</a-select-option>
            <a-select-option value="agent">服务商</a-select-option>
            <a-select-option value="garage">修理厂</a-select-option>
          </a-select>
          <a-select
            v-else
            v-model:value="formState.classRole"
            placeholder="请选择所属角色"
            mode="multiple"
          >
            <a-select-option value="supplier">供应商</a-select-option>
            <a-select-option value="agent">服务商</a-select-option>
            <a-select-option value="garage">修理厂 </a-select-option>
          </a-select>
        </AFormItem>
        <AFormItem label="是否启用" name="classSwitch">
          <a-switch v-model:checked="formState.classSwitch" />
        </AFormItem>
      </AForm>
    </div>
  </AModal>
</template>
<script lang="ts">
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import {
    ArrowUpOutlined,
    ArrowDownOutlined,
    VerticalAlignTopOutlined,
    VerticalAlignBottomOutlined,
  } from '@ant-design/icons-vue'
  import { defineComponent, reactive, ref, watch, computed, toRefs, nextTick } from 'vue'
  // 招商手册 - table
  import EraSwitchTable from '/@/components/EraSwitchTable/EraSwitchTable.vue'
  import classFilterForm from './classFilterForm.vue'
  import { Classification } from '/@/modules/ContentModule/view/StudyCenter/data/configuration'
  import adminHttp from '/@/utils/http/adminHttp'
  import { manualUseData } from '/@/modules/ContentModule/view/ContentManage/ManualUse/type/type'
  import { useMessage } from '/@/hooks/web/useMessage'
  import classEditPop from '/@/modules/ContentModule/view/StudyCenter/compontents/classEditPop.vue'
  import { router } from '/@/router'

  const { createMessage } = useMessage()

  export default defineComponent({
    name: 'ClassificationManagementTable',
    components: {
      EraSwitchTable,
      ArrowUpOutlined,
      ArrowDownOutlined,
      VerticalAlignTopOutlined,
      VerticalAlignBottomOutlined,
      VoPagination,
      classFilterForm,
      classEditPop,
    },
    emits: ['propsClassification'],
    setup(_, { emit }) {
      const editContentRef = ref()
      const titleType = ref('')
      let filterData = ref({})

      let sortName = ref('')
      let isTaps = ref(0)
      const loadingCtxkey = 'handlerRow'
      const studyCenterData = ref()
      // 弹框标题
      let title = ref('')
      const pagination = reactive({
        total: 0,
        current: 1,
        pageSize: 10,
      })
      const state = reactive({
        loading: false,
        selectedRowKeys: [],
      })
      let hasShowUp = ref('')
      let hasShowDown = ref('')
      const hasSelected = computed(() => state.selectedRowKeys.length > 0)
      const tableColumn = ref(Classification)
      // “招商手册” -- 默认选中的角色
      const roleValue = ref()
      const data = reactive({
        item: 0,
      })
      const goodsDetailsTag = ref<Boolean>(false)
      // 查看详情 返回首页
      const againGoodsPage = () => {
        goodsDetailsTag.value = false
      }
      const goDetails = () => {
        goodsDetailsTag.value = true
      }
      /**
       *   切换分页，实现实时刷新列表.
       */
      const paginationChange = ({ current, pageSize }) => {
        pagination.current = current
        pagination.pageSize = pageSize
        initStudyData()
      }
      /**
       *@desc 删除列表项
       *@param id [String] 改变对象的id
       */
      const deleteItemEvent = async (itemId) => {
        createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
        try {
          createMessage.success({ content: `删除成功`, key: loadingCtxkey })
          const deleteMap = { id: itemId }
          const { code } = await adminHttp.CONTENTMENT.contentCategoryDelete(deleteMap)
          if (code == '20001') {
            await initStudyData()
          }
        } catch (err) {
        } finally {
        }
      }
      /**
       *@desc 初始化“分类”
       *@param id [String] 改变对象的id
       *@param status [String] 改变对象的status
       *@return config [Object] 配置对象
       */
      const initStudyData = async () => {
        createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
        try {
          studyCenterData.value = []
          const filterFormParam = {
            ...filterData.value,
            pageSize: pagination.pageSize,
            pageNo: pagination.current,
          }
          const { data } = await adminHttp.CONTENTMENT.contentCategoryCondition(filterFormParam)
          studyCenterData.value = data.records
          if (studyCenterData.value.length > 0) {
            hasShowUp.value = studyCenterData.value[0].id
            hasShowDown.value = studyCenterData.value[studyCenterData.value.length - 1].id
          }
          pagination.total = data.total
          pagination.current = data.current
          createMessage.success({ content: `更新列表成功`, key: loadingCtxkey })
        } catch (err) {
        } finally {
        }
      }
      /**
       *@desc 是否启用
       *@param id [String] 改变对象的id
       *@param status [String] 改变对象的status
       */
      const helpCategoryEnable = async (ID, eventStatus) => {
        let isEnableMap = { id: ID, isEnable: eventStatus }
        createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
        try {
          const { code } = await adminHttp.CONTENTMENT.contentCategoryEnable(isEnableMap)
          if (code === '20001') {
            // await initStudyData()
            createMessage.success({ content: `操作成功`, key: loadingCtxkey })
          } else {
            createMessage.error({ content: `操作失败`, key: loadingCtxkey })
            // await initStudyData()
          }
        } catch (err) {
        } finally {
        }
      }
      /**
       *@desc 是否精选(contentContentRecommendEvent)
       *@param id [String] 改变对象的id
       *@param status [String] 改变对象的status
       */
      const contentContentRecommendEvent = async (ID, eventStatus) => {
        let isEnableMap = { id: ID, isRecommend: eventStatus }
        createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
        try {
          const { code } = await adminHttp.CONTENTMENT.contentCategoryCondition(isEnableMap)
          if (code == '20001') {
            createMessage.success({ content: `精选状态修改成功`, key: loadingCtxkey })
          } else {
            createMessage.error({ content: `操作失败`, key: loadingCtxkey })
            await initStudyData()
          }
        } catch (err) {
        } finally {
        }
      }
      const patchDeleteFunc = () => {}

      /**
       *@desc 新增/编辑
       */
      interface FormState {
        className: string
        classRole: any
        classSwitch: any
      }

      const formRef = ref<any>()
      const formState = reactive<FormState>({
        className: '',
        classRole: [],
        classSwitch: true,
      })
      let editBrand = {
        id: '',
      }
      //增加
      const classModal = reactive({
        visible: false,
        title: '',
        currentItem: null,
        rejectReason: '',
        confirmLoading: false,
        currentId: '',
      })

      enum alertEnum {
        Edit = '编辑',
        Add = '新增',
      }

      const editItemDetails = (record, title) => {
        if (title == alertEnum.Add) {
          classModal.title = title
          classModal.visible = true
          formState.classSwitch = true
        } else {
          classModal.title = title
          classModal.visible = true
          formState.classRole = record.platformCode
          formState.className = record.name
          formState.classSwitch = record.isEnable
          editBrand.id = record.id
        }
      }

      //确定/v1 /vocen-jarvis/v1/
      const classAdd = () => {
        if (classModal.title === alertEnum.Add) {
          formRef.value
            .validate()
            .then(() => {
              createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
              adminHttp.CONTENT.contentCategorySaveBatch({
                name: formState.className,
                platformCodeList: formState.classRole,
                isEnable: formState.classSwitch,
              })
                .then(() => {
                  createMessage.success({ content: `操作成功`, key: loadingCtxkey })
                  initStudyData()
                  classModal.visible = false
                  formState.className = ''
                  formState.classRole = []
                  formState.classSwitch = ''
                })
                .catch((err) => {
                  createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
                })
            })
            .catch((e) => {
              console.log(e, '校验不通过')
            })
        } else {
          formRef.value.validate().then(async (res) => {
            console.log(res, 'success')
            createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
            adminHttp.CONTENTMENT.contentCategoryModify({
              name: formState.className,
              platformCode: formState.classRole,
              isEnable: formState.classSwitch,
              id: editBrand.id,
            })
              .then(() => {
                createMessage.success({ content: `操作成功`, key: loadingCtxkey })
                // item.status = 1
                initStudyData()
                classModal.visible = false
                formState.className = ''
                formState.classRole = []
                formState.classSwitch = ''
                editBrand.id = ''
              })
              .catch((err) => {
                createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
              })
          })
        }
      }
      //取消
      const classCancel = () => {
        formState.classSwitch = ''
        formState.classRole = []
        formState.className = ''
        editBrand.id = ''
      }
      /**
       *@desc 内容管理
       */
      const contentManagementFunc = () => {
        isTaps.value = 0
      }
      const merchantUniversityFunc = () => {
        router.go(-1)
      }
      watch(
        () => isTaps.value,
        (newValue) => {
          isTaps.value = newValue
        },
        { deep: true },
      )
      initStudyData()
      const ArrowUpOutlinedEvent = async (item) => {
        let currentIndex = studyCenterData.value.findIndex((items) => {
          return items.id == item.id
        })
        sortName.value = '上移成功'
        const upIndex = currentIndex - 1
        const currentItem = {
          id: item.id,
          sort: studyCenterData.value[upIndex].sort,
          platformCode: item.platformCode,
        }
        const upItem = {
          id: studyCenterData.value[upIndex].id,
          sort: item.sort,
          platformCode: studyCenterData.value[upIndex].platformCode,
        }
        const sortArr = [currentItem, upItem]
        const arrowUpMap = {
          sortType: 2,
          categoryBOList: sortArr,
        }
        await handleSortEvent(arrowUpMap)
      }
      const ArrowDownOutlinedEvent = async (item) => {
        sortName.value = '下移成功'
        let currentIndex = studyCenterData.value.findIndex((items) => {
          return items.id == item.id
        })
        const upIndex = currentIndex + 1
        const currentItem = {
          id: item.id,
          sort: studyCenterData.value[upIndex].sort,
          platformCode: item.platformCode,
        }
        const upItem = {
          id: studyCenterData.value[upIndex].id,
          sort: item.sort,
          platformCode: studyCenterData.value[upIndex].platformCode,
        }
        const sortArr = [currentItem, upItem]
        const arrowDownMap = {
          sortType: 2,
          categoryBOList: sortArr,
        }
        await handleSortEvent(arrowDownMap)
      }
      const VerticalAlignTopOutEvent = async (item) => {
        sortName.value = '置顶成功'
        const map = { id: item.id, sortType: 1, platformCode: item.platformCode }
        await handleSortEvent(map)
      }
      const VerticalAlignBottomOutEvent = async (item) => {
        sortName.value = '置底成功'
        const map = { id: item.id, sortType: 3, platformCode: item.platformCode }
        await handleSortEvent(map)
      }
      const handleSortEvent = async (map) => {
        const maps = map
        const { code } = await adminHttp.CONTENTMENT.contentCategorySort(maps)
        if (code == '20001') {
          createMessage.success(`${sortName.value}`)
          await initStudyData()
        } else {
          createMessage.error({ content: '置顶失败' })
        }
      }
      // const parentClassificationManagementFunc = async (item) => {
      //   let filterMap = {}
      //   filterMap = item
      //   filterData.value = filterMap
      //   await initStudyData()
      // }
      // 重置
      const handlerRest = ({ values }) => {
        pagination.current = 1
        filterData.value = {
          ...values,
          ...pagination,
        }
        filterData.value = values
        initStudyData()
      }
      // 搜索
      const handlerSubmit = ({ values }) => {
        pagination.current = 1
        filterData.value = {
          ...values,
          ...pagination,
        }
        initStudyData()
      }
      return {
        editBrand,
        formState,
        classAdd,
        classCancel,
        classModal,
        handlerSubmit,
        handlerRest,
        manualUseData,
        ...toRefs(state),
        initStudyData,
        deleteItemEvent,
        againGoodsPage,
        goDetails,
        paginationChange,
        helpCategoryEnable,
        contentContentRecommendEvent,
        contentManagementFunc,
        patchDeleteFunc,
        merchantUniversityFunc,
        ArrowUpOutlinedEvent,
        ArrowDownOutlinedEvent,
        VerticalAlignTopOutEvent,
        VerticalAlignBottomOutEvent,
        // parentClassificationManagementFunc,
        editItemDetails,
        editContentRef,
        alertEnum,
        titleType,
        title,
        filterData,
        sortName,
        hasShowUp,
        hasShowDown,
        hasSelected,
        isTaps,
        studyCenterData,
        roleValue,
        goodsDetailsTag,
        pagination,
        data,
        tableColumn,
        formRef,
      }
    },
  })
</script>
