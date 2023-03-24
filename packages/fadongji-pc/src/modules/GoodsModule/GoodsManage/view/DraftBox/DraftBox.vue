<template>
  <div>
    <div class="m-24px">
      <div class="p-24px pb-4px bg-white mb-24px">
        <BasicForm @register="register" @submit="handleSubmit" @reset="handlerFilterRest" />
      </div>
      <div class="bg-white p-24px">
        <EraTableTitle :total="totalNum">
          <template #tableEdit>
            <AButton
              type="primary"
              v-auth="'/v1/goods/template/draft/batch/delete'"
              :disabled="hasSelected"
              @click.stop="batchDeleteEvent()"
              >批量删除
            </AButton>
          </template>
        </EraTableTitle>
        <div>
          <ATable
            rowKey="id"
            :row-selection="rowSelection"
            class="case-table"
            :dataSource="draftData"
            :columns="draftColumns"
            :pagination="false"
            size="small"
            bordered
            @change="handleTableChange"
            :scroll="{ x: `${draftColumns.length}0%`, y: 500 }"
          >
            <template #action="{ record }">
              <span>
                <AButton
                  v-auth="'/v1/goods/template/draft/update'"
                  type="link"
                  @click="goEdit(record)"
                  >去编辑</AButton
                ></span
              >

              <APopconfirm
                title="确认要删除吗?"
                ok-text="确认"
                cancel-text="取消"
                @confirm="deleteList(record.id)"
              >
                <span>
                  <a v-auth="'/v1/goods/template/draft/batch/delete'" type="link">删除</a></span
                >
              </APopconfirm>
            </template>
          </ATable>
        </div>
        <div class="flex justify-end py-15px bg-white">
          <VoPagination
            :total="totalNum"
            :current="paginations.pageNo"
            :page-size="paginations.pageSize"
            @pagination="paginationChange"
          />
        </div>
        <AModal
          :title="batchModal.title"
          :zIndex="1001"
          v-model:visible="batchModal.visible"
          :confirm-loading="batchModal.confirmLoading"
          @ok="batchOK"
        >
          <div class="p-40px">
            {{ batchModal.content }}
          </div>
        </AModal>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import { Dayjs } from 'dayjs'
  import { draftList } from '/@/modules/GoodsModule/GoodsManage/component'
  import { defineComponent, reactive, ref, CSSProperties, onMounted, watch, computed } from 'vue'

  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import AdminHttp from '/@/utils/http/adminHttp'

  import {
    searchList,
    draftColumns,
    draftSearchMap,
    isBlank,
  } from '/@/modules/GoodsModule/GoodsManage/view/DraftBox/data/data'
  import { BasicForm, useForm } from '/@/components/Form/index'
  import { schemas } from '/@/modules/GoodsModule/GoodsManage/view/DraftBox/data/data'
  import adminHttp from '/@/utils/http/adminHttp'
  import { useRouter } from 'vue-router'

  type Key = string | number

  interface DataType {
    key: string | number
    name: string
    brandName?: string
    categoryInfo?: string
    id: string
    updateTime?: string
  }

  import dayjs from 'dayjs'
  import { transmitEnum } from '/@/modules/GoodsModule/GoodsTemplate/data/data'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  export default defineComponent({
    components: {
      BasicForm,
      VoPagination,
      EraTableTitle,
    },
    setup() {
      let idsList: any[] = []
      const hasSelected = ref<boolean>(false)
      const go = useRouter()
      const [register] = useForm({
        schemas,
        labelWidth: 120,
        baseColProps: { span: 8 },
        actionColOptions: {
          span: 8,
          offset: 8,
        },
        autoSubmitOnEnter: true,
      })
      let draftData = ref([])
      let totalNum = ref<Number>(50)
      const paginations = reactive({
        pageNo: 1,
        pageSize: 10,
      })
      const filterData = ref({})
      //日期
      const getCurrentStyle = (current: Dayjs) => {
        const style: CSSProperties = {}
        if (current.date() === 1) {
          style.border = '1px solid #1890ff'
          style.borderRadius = '50%'
        }
        return style
      }
      // 分页“效果”
      const paginationChange = ({ current, pageSize }) => {
        paginations.pageNo = current
        paginations.pageSize = pageSize

        initData()
      }
      // 排序
      const handleTableChange = (pagination, filters, sorter) => {
        filterData.value.orderProperty = sorter.field
        filterData.value.orderType = sorter.order == 'ascend' ? 'ASC' : 'DESC'
        paginations.pageNo = 1
        initData()
      }

      const onSelectChange = (selectedRowK: Key[]) => {
        console.log('selectedRowKeys changed: ', selectedRowK)
        if (selectedRowK.length === 0) {
          return false
        }
        idsList = []
      }
      // 是否进入详情页面的标识
      const editTag = ref<Boolean>(false)
      const goEdit = (item) => {
        go.push({
          path: '/goodsManage/goods/goodsForm',
          query: {
            categoryName: item.categoryInfo,
            name: item.name,
            type: transmitEnum.SHOW,
            id: item.id,
            edit: 1,
            from: 2,
          },
        })
      }
      const handleDelete = (e: MouseEvent) => {
        deleteStaff.value = false
      }
      const deleteStaff = ref<boolean>(false)
      //删除
      const deleteList = (item) => {
        let ids = item
        idsList.push(ids)
        deleteBatchOrDelete(idsList)
      }
      // 批量删除
      const batchModal = reactive({
        title: '',
        visible: false,
        confirmLoading: false,
        content: '',
        type: 1, // 1批量发布 2批量取消发布 3批量删除
      })
      const batchDeleteEvent = () => {
        if (idsList.length === 0) {
          return false
        }
        batchModal.title = '确认删除'
        batchModal.content = `共${idsList.length}条数据被选中，确定要删除吗？`
        batchModal.type = 1
        batchModal.visible = true
      }
      const batchOK = () => {
        deleteBatchOrDelete(idsList)
      }
      const deleteBatchOrDelete = (idsList) => {
        const idMap = { ids: idsList }
        AdminHttp.goodsTemplateDraftBatchDelete(idMap).then((res) => {
          const isNilObject = {}
          hasSelected.value = true
          batchModal.visible = false
          initData()
        })
      }

      const handleSubmit = (values: Recordable) => {
        paginations.pageNo = 1
        let brandIds = values.brandIds
        let categoryIds = values.categoryIds
        let searchMap = {
          updateEndTime: '',
          updateStartTime: '',
          name: values.name,
          brandIds: [],
          categoryIds: [],
        }
        if (
          values.updateTime !== null &&
          values.updateTime !== undefined &&
          values.updateTime !== ''
        ) {
          searchMap.updateStartTime =
            dayjs(values.updateTime[0]).format('YYYY-MM-DD') + ' ' + '00:00:00'
          searchMap.updateEndTime =
            dayjs(values.updateTime[1]).format('YYYY-MM-DD') + ' ' + '23:59:59'
        }
        if (brandIds !== null && brandIds !== undefined && brandIds !== '') {
          searchMap.brandIds.push(brandIds)
        } else {
          searchMap.brandIds = []
        }

        if (categoryIds !== null && categoryIds !== undefined && categoryIds !== '') {
          searchMap.categoryIds.push(categoryIds.at(-1))
        } else {
          searchMap.categoryIds = []
        }
        filterData.value = { ...searchMap, ...values }
        initData()
      }
      const handlerFilterRest = () => {
        filterData.value = {}
        paginations.pageNo = 1
        initData()
      }

      let filterFormConfig = ref(searchList)

      onMountedOrActivated(() => {
        initData()
        initBrand()
        const map = { name: '' }
        initCategory(map)
      })
      const initBrand = async (filterParams = {}) => {
        const opts: any = []
        const Idxs = schemas.map((item) => item.field).indexOf('brandIds')
        await adminHttp
          .goodsBrandList(filterParams)
          .then((res) => {
            res.data.forEach((item) => {
              opts.push({ label: item.name, value: item.id, key: item.id })
            })
            return res
          })
          .catch((err) => {
            console.log(err)
            return []
          })
      }
      const initCategory = (map) => {
        // if (!map.name) delete map.name
        adminHttp.goodsCategoryCategorySelect(map).then((res) => {
          // console.log(res, '商品类目222')
        })
      }
      const initData = () => {
        adminHttp.goodsTemplateDraftList({ ...filterData.value, ...paginations }).then((res) => {
          draftData.value = res.data.records
          totalNum.value = res.data.total
        })
      }
      const rowSelection: TableProps['rowSelection'] = {
        onChange: (selectedRowKeys: string[], selectedRows: DataType[]) => {
          hasSelected.value = selectedRows.length > 0 ? false : true
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
          idsList = selectedRowKeys
        },
        getCheckboxProps: (record: DataType) => ({
          name: record.name,
        }),
      }

      watch(
        () => schemas,
        (newValue, originValue) => {
          // console.log(newValue, 'newValueddddddddddd')
        },
      )
      return {
        rowSelection,
        paginations,
        onSelectChange,
        goEdit,
        handleDelete,
        batchDeleteEvent,
        deleteList,
        deleteStaff,
        getCurrentStyle,
        paginationChange,
        timeData: ref<Moment[]>([]),
        draftList,
        editTag,
        category: ref<string | undefined>(undefined),
        filterFormConfig,
        totalNum,
        draftColumns,
        idsList,
        draftData,
        draftSearchMap,
        register,
        handleSubmit,
        hasSelected,
        schemas,
        batchModal,
        batchOK,
        handleTableChange,
      }
    },
  })
</script>

<style lang="less" scoped>
  .page-wrap {
    min-width: 1200px;
    margin: 15px 0 15px 0;

    .search-form {
      //margin: 0 15px;
      padding: 10px;
      background-color: #fff;

      .search-from__box {
        width: 100%;
      }

      .action-btn-box {
        display: flex;

        .submit-btn {
          margin-left: 80px;
        }

        .rest-btn {
          margin-left: 15px;
        }
      }
    }

    .case-list {
      //margin-top: 10px;
      .case-table {
        background-color: #fff;
      }
    }

    .staff-delete {
      margin: 30px;
      font-size: 16px;
      font-weight: 600;
    }
  }

  .com-item {
    display: flex;
    justify-content: flex-end;
    padding: 10px 10px 10px 0;
    background-color: #fff;
  }

  .search-form__space {
    margin: 0 15px;
    padding-top: 10px;
    padding-right: 10px;
    background-color: white;
  }
</style>
