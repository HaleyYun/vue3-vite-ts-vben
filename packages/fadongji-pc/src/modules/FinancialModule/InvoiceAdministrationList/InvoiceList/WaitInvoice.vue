<template>
<div>
  <div>
    <div class="mb-24px bg-white p-24px pb-4px">
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
            <template v-if="column.dataIndex === 'amount'">
              <span>{{ record.amount }}元</span>
            </template>
            <template v-if="column.dataIndex === 'operation'">
              <template v-if="record">
                <AButton
                  v-auth="'/v1/finance/invoice/detail/sell'"
                  type="link"
                  size="small"
                  @click="goInvoiceDetail(record)"
                >
                  详情
                </AButton>
                <a-dropdown>
                  <a
                    v-auth="'/v1/finance/invoice/confirm/invoice'"
                    class="ant-dropdown-link"
                    @click.prevent
                  >
                    开具
                    <DownOutlined />
                  </a>
                  <template #overlay>
                    <a-menu>
                      <a-menu-item>
                        <AButton type="link" @click="singleInvoice(record)">开单张</AButton>
                      </a-menu-item>
                      <a-menu-item>
                        <AButton type="link" @click="multiInvoice(record)">开多张</AButton>
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </template>
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
  <!-- 开单张发票 -->
  <AModal
    v-model:visible="leafletVisible"
    width="1000px"
    title="收票方开票信息"
    destroy-on-close
    @ok="leafletOk"
    @cancel="leafCancel"
  >
    <div class="p-5">
      <div>
        <a-descriptions layout="horizontal">
          <a-descriptions-item label="发票金额">{{ detail.amount }}元</a-descriptions-item>
          <a-descriptions-item label="发票抬头"
            >{{ detail.sellerEnterpriseName }}
          </a-descriptions-item>
          <a-descriptions-item label="纳税人识别号"
            >{{ detail.sellerTaxpayerNum }}
          </a-descriptions-item>
        </a-descriptions>
      </div>
      <AForm
        ref="formRef"
        :model="formState"
        name="basic"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 20 }"
        autocomplete="off"
      >
        <AFormItem
          label="请上传发票"
          name="billUrl"
          :rules="[{ required: true, message: '请上传发票', trigger: 'blur,change' }]"
        >
          <FormOcrInvoiceUpload v-model="formState.billUrl" @success="uploadSuccess" />
        </AFormItem>
      </AForm>
      <div>
        发票号 ：
        <span>{{ invoice }}</span>
      </div>
    </div>
  </AModal>
  <!-- 开多张发票 -->
  <AModal
    v-model:visible="invoiceVisible"
    width="1000px"
    title="发票信息"
    :footer="null"
    destroy-on-close
    @cancel="leafCancel"
  >
    <div class="p-5">
      <a-steps :current="invoiceCurrent" labelPlacement="vertical">
        <a-step v-for="item in stepsList" :key="item.title" :title="item.title" />
      </a-steps>
    </div>
    <div class="p-5" v-if="invoiceCurrent === 0">
      <ATable :dataSource="tableDataInvoice" :columns="invoiceColumns" bordered :pagination="false">
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'amount'">
            <span>{{ record.amount }}元</span>
          </template>
        </template>
      </ATable>
    </div>
    <div class="p-5" v-else-if="invoiceCurrent === 1">
      <div>
        <a-descriptions title="收票方开票信息">
          <a-descriptions-item label="发票金额" :span="1"
            >{{ detail.amount }}元
          </a-descriptions-item>
          <a-descriptions-item label="发票抬头"
            >{{ detail.sellerEnterpriseName }}
          </a-descriptions-item>
          <a-descriptions-item label="纳税人识别号"
            >{{ detail.sellerTaxpayerNum }}
          </a-descriptions-item>
        </a-descriptions>
      </div>
      <AForm
        ref="formRef"
        :model="formState"
        name="basic"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 20 }"
        autocomplete="off"
      >
        <AFormItem
          label="请上传发票"
          name="billUrl"
          :rules="[{ required: true, message: '请上传发票!', trigger: 'blur,change' }]"
        >
          <!-- <EraUpload
			:uploadType="resrouceType"
			:fileListData="fileUrl"
			:maxSize="50"
			:maxNumber="6"
			uploadFuncChannel="localStore"
			:multiple="true"
			upload-tip="点击上传发票"
			help-text="最多上传6张发票。"
			@done="handleDone"
			@delete="handerUpDel"
		  /> -->
          <FormOcrInvoiceUpload
            v-model="formState.billUrl"
            :limit="2"
            @mulSuccess="mulSuccessHandler"
            @mulImgs="mulImgs"
          />
          <div class="text-red-600 text-14px">提示：最多上传6张发票</div>
        </AFormItem>
      </AForm>
      <div
        >发票号：<span>{{ invoice }}</span></div
      >
    </div>
    <div class="p-5" v-else-if="invoiceCurrent === 2">
      <a-result status="success" title="开票信息提交成功" />
    </div>
    <div class="p-5 flex flex-justify-between">
      <div>
        <AButton @click="cancel" v-if="invoiceCurrent !== stepsList.length - 1">取消</AButton>
      </div>
      <a-space>
        <AButton
          type="primary"
          v-if="invoiceCurrent > 0 && invoiceCurrent !== stepsList.length - 1"
          @click="prev"
          >上一步
        </AButton>
        <AButton
          type="primary"
          @click="next"
          v-if="invoiceCurrent < stepsList.length - 1 && invoiceCurrent !== stepsList.length - 1"
          >下一步
        </AButton>
      </a-space>
      <a-button
        class="ml-110"
        v-if="invoiceCurrent == stepsList.length - 1"
        type="primary"
        @click="complete"
      >
        知道了
      </a-button>
    </div>
  </AModal>
</div>
</template>

<script lang="ts" setup>
  import { ref, reactive, onBeforeMount } from 'vue'
  import { DownOutlined } from '@ant-design/icons-vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import FormOcrInvoiceUpload from '/@/modules/components/FormOcrInvoiceUpload.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import SearchForm from '../component/SearchForm.vue'
  import { tableColumns, invoiceColumns } from '../data/configuration'
  import { useRouter } from 'vue-router'
  import { message } from 'ant-design-vue'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";

  const router = useRouter()
  const invoice = ref<any>()
  const detail = ref<any>({}) //数据详情对象
  // --------全局参数---------------
  //识别
  const uploadSuccess = (ocrData) => {
    console.log(ocrData, 'ocrData')

    const invoiceUpload = ocrData.vatInvoiceInfos
      .filter((item) => item.name === '发票号码')
      .map((invoice) => {
        return invoice.value
      })
    invoice.value = invoiceUpload.toString()
    formState.billUrl = ocrData.imgUrl
  }

  const mulImgs = (res) => {
    formState.billUrl = res
    formRef.value.validate()
  }
  const mulSuccessHandler = (res) => {
    invoice.value = res
  }

  //开单张
  const leafletVisible = ref<boolean>(false)
  const singleInvoice = async (record) => {
    const ret = await AdminHttp.FINANCE.financeInvoiceDetailBy$id({ id: record.id })
    detail.value = ret.data
    fileUrl.value = []
    leafletVisible.value = true
  }
  const leafCancel = () => {
    formState.billUrl = ''
    leafletVisible.value = false
    invoice.value = ''
    fileUrl.value = []
  }
  //确定
  const leafletOk = async () => {
    await formRef.value.validate()
    const { code } = await AdminHttp.FINANCE.financeInvoiceConfirmInvoice({
      id: detail.value.id,
      billUrl: formState.billUrl,
      invoiceNo: invoice.value,
    })
    if (+code === 20001) {
      message.success('操作成功')
      await loadTableData()
    } else {
      message.error('操作失败')
    }
    leafletVisible.value = false
  }
  //开多张发票
  const invoiceVisible = ref<boolean>(false)
  const tableDataInvoice = ref<any>([])
  const multiInvoice = async (record) => {
    const res = await AdminHttp.FINANCE.financeInvoiceDetailBy$id({ id: record.id })
    detail.value = res.data
    fileUrl.value = []
    invoiceVisible.value = true
    const data = await AdminHttp.FINANCE.financeInvoiceOrderListBy$id({
      id: record.id,
    })
      .then((res) => res.data)
      .catch((err) => {
        console.log(`获取列表失败:${err.message}`)
        return { records: [], total: 0 }
      })

    tableDataInvoice.value = data
  }
  //发票列表
  const fileUrl = ref([])
  const resrouceType = ref('img')
  const formRef = ref()
  const formState = reactive<FormState>({
    billUrl: '',
  })

  interface FormState {
    billUrl: any
  }

  //取消
  const cancel = () => {
    invoiceCurrent.value = 0
    invoiceVisible.value = false
  }
  //下一步
  const next = async () => {
    if (invoiceCurrent.value === 0) {
      invoiceCurrent.value++
    } else {
      await formRef.value.validate()
      const { code } = await AdminHttp.FINANCE.financeInvoiceConfirmInvoice({
        id: detail.value.id,
        billUrl: formState.billUrl,
        invoiceNo: invoice.value,
      })
      if (+code === 20001) {
        message.success('上传成功')
        invoiceCurrent.value++
      } else {
        message.error('操作失败')
      }
    }
  }
  //上一步
  const prev = () => {
    invoiceCurrent.value--
  }
  //完成
  const complete = () => {
    invoiceCurrent.value = 0
    invoiceVisible.value = false
    loadTableData()
  }
  const invoiceCurrent = ref<number>(0)
  const stepsList = ref([
    {
      title: '选择开票订单',
    },
    {
      title: '确认开票信息并上传发票',
    },
    {
      title: '完成开票',
    },
  ])
  // ------操作按钮----------
  // 详情
  const goInvoiceDetail = (record) => {
    router.push({
      path: '/financial/ticket/waitInvoiceDetail',
      query: { id: record.id },
    })
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
        invoiceStatus: 1,
      }
      const { code, data } = await AdminHttp.FINANCE.financeInvoiceSelectList(params)
      console.log(tableData)
      if (code === '20001') {
        tableData.value = data.records ? data.records : []
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
