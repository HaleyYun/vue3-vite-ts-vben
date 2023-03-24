<template>
  <AModal
    v-model:visible="orderInfo.assignVisible"
    :footer="null"
    width="1200px"
    title="指派集师傅"
  >
    <div class="p-5">
      <DoorAssignForm ref="DoorAssign" @rest="handlerRest" @submit="handlerSubmit" />

      <ATable
        :dataSource="assignData"
        :columns="orderRefund.assignColumns"
        bordered
        :pagination="false"
      >
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'initials'">
            <span>售后</span>
          </template>
          <template v-if="column.dataIndex === 'status'">
            <span>空闲</span>
          </template>
          <template v-if="column.dataIndex === 'carSeries'">
            <span v-if="record.carSeries.indexOf('1') > -1">日系</span>
            <span v-if="record.carSeries.indexOf('2') > -1">国产</span>
            <span v-if="record.carSeries.indexOf('3') > -1">韩系</span>
            <span v-if="record.carSeries.indexOf('4') > -1">德系</span>
            <span v-if="record.carSeries.indexOf('5') > -1">其他</span>
          </template>
          <template v-if="column.dataIndex === 'operation'">
            <a-popconfirm
              title="确定指派吗？"
              ok-text="确定"
              cancel-text="取消"
              @confirm="confirmSeries(record)"
            >
              <AButton type="link">指派</AButton>
            </a-popconfirm>
          </template>
        </template>
      </ATable>
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
  </AModal>
</template>

<script lang="ts" setup>
  import { defineComponent, nextTick, watch, ref, reactive, defineProps, defineEmits } from 'vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import DoorAssignForm from './DoorAssignForm.vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { orderRefund } from '../../../InstallationOrder/data/InvestData'

  const { createMessage } = useMessage()
  const loadingCtxkey = 'handlerRow'
  const emit = defineEmits(['update:orderInfo', 'updateData'])
  const props = defineProps({
    orderInfo: {
      default: {
        id: null,
        supportType: null,
        homeStartTime: null,
        homeEndTime: null,
        assignVisible: false,
        areaCode: null,
      },
      type: Object,
    },
  })

  const DoorAssign = ref()
  const assignOrder = () => {
    if (new Date(props.orderInfo.homeStartTime).getTime() > new Date().getTime()) {
      filterData.value = {
        homeStartTime: props.orderInfo.homeStartTime,
        homeEndTime: props.orderInfo.homeEndTime,
      }
      nextTick(() => {
        DoorAssign.value &&
          DoorAssign.value.setFormValue(props.orderInfo.homeStartTime, props.orderInfo.homeEndTime)
      })
    }

    loadAssignData()
  }
  const paginations = reactive({
    pageNo: 1,
    pageSize: 5,
    total: 0,
  }) // 分页配置
  const paginationChange = ({ current, pageSize }) => {
    paginations.pageNo = current
    paginations.pageSize = pageSize
    loadAssignData()
  }
  // 搜索
  const filterData = ref({})
  const handlerSubmit = (values) => {
    paginations.pageNo = 1
    filterData.value = {
      ...values,
    }
    loadAssignData()
  }
  // 重置
  const handlerRest = (values) => {
    paginations.pageNo = 1
    filterData.value = {}
    loadAssignData()
  }

  //----- 加载指派列表数据 ---------
  const assignData = ref([])
  const loadAssignData = async () => {
    try {
      const filterParams = {
        orderId: props.orderInfo.id,
        supportType: props.orderInfo.supportType,
        //supportType: 32, //暂时用固定的 其他得没数据
        areaCode: props.orderInfo.areaCode,
        //areaCode: '130606', //暂时用固定的 其他得没数据
        ...filterData.value,
        ...paginations,
      }
      const { code, data } = await adminHttp.ORDER.orderAssignTechnicians(filterParams)
      console.log(assignData)
      if (code === '20001') {
        paginations.total = data && data.total ? data.total : 0
        assignData.value = data && data.records ? data.records : []
        // 这个判断当删除数据最后一条的时候，但是分页不在第一页，加载上一页的数据
        if (paginations.pageNo > 1 && assignData.value.length === 0) {
          paginations.pageNo = paginations.pageNo - 1
          loadAssignData()
        }
      }
    } catch (e) {
      assignData.value = []
      paginations.total = 0
      console.log(e)
    }
  }
  //指派
  const confirmSeries = (item) => {
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    adminHttp.ORDER.orderAssignAssign({
      orderId: props.orderInfo.id,
      companyId: item.id,
    })
      .then(() => {
        createMessage.success({ content: `指派成功`, key: loadingCtxkey })
        props.orderInfo.assignVisible = false
        // emit('update:orderInfo',{...props.orderInfo,...{assignVisible:false}})
        emit('updateData')
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
  }
  watch(
    () => props.orderInfo.assignVisible,
    async (value) => {
      if (value) {
        assignOrder()
      }
      console.log(props.orderInfo)
    },
    { immediate: true },
  )
</script>

<style scoped lang="less"></style>
