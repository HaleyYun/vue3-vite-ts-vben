<template>
  <div class="m-24px">
    <div>
      <div class="p-24px bg-white mb-24px pb-4px">
        <ConsignmentForm
          ref="ConsignmentFormRef"
          @rest="handlerFilterRest"
          @submit="handlerFilterSubmit"
        />
      </div>
      <div class="bg-white p-24px">
        <EraTableTitle :total="paginations.total">
          <template #tableEdit>
            <a-button type="link" @click="downTemplateFn">下载模板</a-button>
            <div style="display: inline-block">
              <a-upload
                accept=".xlsx"
                name="file"
                :multiple="false"
                :action="apiUrl + '/vocen-jarvis/v1/goods/goods/import/consignment'"
                :headers="headers"
                :showUploadList="false"
                :before-upload="beforeUpload"
                @change="importDataFn"
              >
                <a-button :loading="loadingBtn" class="ml-25px" type="primary">
                  <UploadOutlined></UploadOutlined>寄售数据导入
                </a-button>
              </a-upload>
            </div>

            <a-button class="ml-25px" type="primary" @click="deriveDataFn"> 寄售数据导出 </a-button>
          </template>
        </EraTableTitle>
        <div>
          <ATable
            :loading="tableLoading"
            :columns="tabColumns"
            :data-source="tableData"
            :pagination="false"
            size="small"
            :scroll="{ x: 1200 }"
            bordered
          >
            <template #bodyCell="{ column, text, record }">
              <!-- 修理厂价格 -->
              <template v-if="column.dataIndex === 'repairDepot'">
                <div v-if="record.cashPrice">{{ record.cashPrice }}元</div>
                <div v-if="record.accountPeriodDays && record.accountPrice"
                  >{{ record.accountPeriodDays }}天账期<span>{{ record.accountPrice }}元</span></div
                >
              </template>
              <!--实际库存  -->
              <template v-if="column.dataIndex === 'number'">
                <div v-if="record.status">
                  <span>{{ record['number'] }}</span>
                </div>
                <div v-else>
                  <span>--</span>
                </div>
              </template>
              <!--寄售可用库存  -->
              <template v-if="column.dataIndex === 'availableNumber'">
                <div v-if="record.status">
                  <span>{{ record['availableNumber'] }}</span>
                  <FormOutlined
                    :style="{ color: '#1890ff' }"
                    class="margin-l-10 text-blue-500"
                    @click="editConsignment(record, alertSell.Stock)"
                  />
                </div>
                <div v-else>
                  <span>--</span>
                </div>
              </template>
              <!-- 寄售价 -->
              <template v-if="column.dataIndex === 'distributionPrice'">
                <div v-if="record.status">
                  <span>{{ record.distributionPrice.toFixed(2) }}</span>
                  <FormOutlined
                    :style="{ color: '#1890ff' }"
                    class="margin-l-10 text-blue-500"
                    @click="editConsignment(record, alertSell.Sell)"
                  />
                </div>
                <div v-else>
                  <span>--</span>
                </div>
              </template>
              <template v-if="column.dataIndex === 'status'">
                <template v-if="record.status">
                  <ASwitch
                    @change="stateClose(record)"
                    :checked="record.status"
                    checked-children="已开启"
                    un-checked-children="关闭中"
                  />
                </template>
                <template v-else>
                  <ASwitch
                    @change="stateVisible(record)"
                    :checked="record.status"
                    checked-children="已开启"
                    un-checked-children="关闭中"
                  />
                </template>
              </template>
            </template>
          </ATable>
        </div>
        <div class="flex justify-end py-15px bg-white">
          <VoPagination
            :total="paginations.total"
            :current="paginations.current"
            :page-size="paginations.pageSize"
            @pagination="paginationChange"
          />
        </div>
      </div>
    </div>
    <AModal
      v-model:visible="sellModal.visible"
      :title="sellModal.title"
      centered
      destroy-on-close
      :confirm-loading="sellModal.confirmLoading"
      @ok="BrandsModify"
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
            v-if="sellModal.title == '修改寄售价'"
            label="寄售价"
            name="consignment"
            :rules="[{ required: true, message: '请输入寄售价' }]"
          >
            <AInput
              v-model:value="formState.consignment"
              :maxlength="10"
              placeholder="请输入寄售价"
              allow-clear
              @blur="changeConsignment"
              @change="blurConsignment"
            />
          </AFormItem>
          <AFormItem
            v-else
            label="寄售可用库存"
            name="available"
            :rules="[{ required: true, message: '请输入寄售可用库存' }]"
          >
            <AInput
              v-model:value="formState.available"
              :maxlength="7"
              placeholder="请输入寄售可用库存"
              allow-clear
              @change="changeAvailable"
            />
          </AFormItem>
        </AForm>
      </div>
    </AModal>
    <AModal v-model:visible="visible" title="设置寄售信息" centered destroy-on-close @ok="handleOk">
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
            label="寄售价"
            name="setConsignment"
            :rules="[{ required: true, message: '请输入寄售价' }]"
          >
            <AInput
              v-model:value="formState.setConsignment"
              :maxlength="10"
              placeholder="请输入寄售价"
              allow-clear
              @blur="switchConsignment"
              @change="priceConsignment"
            />
          </AFormItem>
          <AFormItem
            label="寄售库存"
            name="setAvailable"
            :rules="[{ required: true, message: '请输入寄售库存' }]"
          >
            <AInput
              v-model:value="formState.setAvailable"
              :maxlength="7"
              placeholder="请输入寄售库存"
              allow-clear
              @change="switchAvailable"
            />
          </AFormItem>
        </AForm>
      </div>
    </AModal>
    <a-modal
      v-model:visible="modalBoo"
      width="800px"
      centered
      destroy-on-close
      title="导入失败提示"
      @ok="modalBoo = false"
    >
      <div class="p-15px">
        <ATable :dataSource="modalData" :columns="columns" bordered>
          <template #bodyCell="{ column, index }">
            <template v-if="column.dataIndex === 'index'">
              {{ index + 1 }}
            </template>
          </template>
        </ATable>
      </div>
    </a-modal>
  </div>
</template>
<script setup name="ConsignmentGoods" lang="ts">
  import { useGlobSetting } from '/@/hooks/setting'

  import { UploadOutlined } from '@ant-design/icons-vue'
  import ConsignmentForm from '../ConsignmentGoods/component/ConsignmentForm.vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  //11
  import { onBeforeMount, reactive, ref } from 'vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { FormOutlined } from '@ant-design/icons-vue'
  import { containerConfig } from '../ConsignmentGoods/data/ConsignmentData'
  import adminHttp from '/@/utils/http/adminHttp'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { clearObjectUnalbeAttr } from '/@/utils/helper/formHelper'
  import { Pattern } from '@vocen/shared'
  import { message } from 'ant-design-vue'
  import { getVoToken } from '/@/utils/http/src/helper'

  import axios from 'axios'
  const globSetting = useGlobSetting()
  // 修改“运营类别”的
  let tableData = ref([])
  const visible = ref<boolean>(false)
  const InfoVisible = ref<any>('')
  const { createMessage } = useMessage()
  const loadingCtxkey = 'handlerRow'
  const formRef = ref<any>()
  const formState = reactive<FormState>({
    consignment: '',
    available: '',
    setAvailable: '',
    setConsignment: '',
  })
  interface FormState {
    consignment: any
    available: any
    setAvailable: any
    setConsignment: any
  }
  //寄售价格和库存
  enum alertSell {
    Sell = '修改寄售价',
    Stock = '修改寄售可用库存',
  }
  //增加
  const sellModal = reactive({
    visible: false,
    title: '',
    currentItem: null,
    rejectReason: '',
    confirmLoading: false,
    distributionId: '',
  })
  const token = getVoToken()
  const apiUrl = ref(globSetting.apiUrl)

  const filterData = ref()
  const handlerFilterRest = ({ values }) => {
    filterData.value = values
    loadTableData()
  }
  const handlerFilterSubmit = ({ values }) => {
    paginations.current = 1
    filterData.value = values

    loadTableData()
  }

  // table 列
  const tabColumns = ref(containerConfig.tableColumns)
  const tableLoading = ref(false)
  const paginations = reactive({
    total: 0,
    current: 1,
    pageSize: 10,
  })

  // 分页
  const paginationChange = ({ current, pageSize }) => {
    paginations.current = current
    paginations.pageSize = pageSize
    loadTableData()
  }
  //初始
  const loadTableData = async () => {
    tableLoading.value = true
    const filterParams = {
      ...filterData.value,
      // shopId:'',
      pageSize: paginations.pageSize,
      pageNo: paginations.current,
    }
    const { records, total } = await adminHttp
      .goodsGoodsDistributionPageList(clearObjectUnalbeAttr(filterParams))
      .then((res) => {
        //res?.data?.records)
        if (res && res.data && res.data.records) {
          return res.data
        } else {
          return {
            records: [],
            total: 0,
          }
        }
      })
      .catch((err) => {
        // console.log(err)
        console.log(`获取寄售列表失败:${err.message}`)
        return { records: [], total: 0 }
      })
      .finally(() => {
        tableLoading.value = false
      })
    // console.log(records)
    paginations.total = total
    tableData.value = records
  }

  onBeforeMount(() => {
    loadTableData()
  })
  //寄售价和寄售库存
  const editConsignment = (item, title) => {
    if (title == alertSell.Sell) {
      //寄售价格
      formState.consignment = item.distributionPrice.toFixed(2)
      sellModal.title = title
      sellModal.visible = true
    } else {
      formState.available = item.availableNumber
      sellModal.title = title
      sellModal.visible = true
    }
    sellModal.distributionId = item.id
  }

  //修改寄售价和库存
  const BrandsModify = () => {
    if (sellModal.title === alertSell.Sell) {
      // 编辑寄售价
      formRef.value
        .validate()
        .then((res) => {
          adminHttp
            .goodsGoodsDistributionUpdatePrice({
              distributionPrice: res.consignment,
              id: sellModal.distributionId,
            })
            .then(({ code }) => {
              if (code == '20001') {
                createMessage.success({ content: `操作成功`, key: loadingCtxkey })
                loadTableData()
                sellModal.visible = false
              }
            })
            .catch((err) => {
              createMessage.error({ content: `${err.message}`, key: loadingCtxkey })
            })
        })
        .catch((e) => {
          console.log(e, '校验不通过')
        })
    } else {
      // 编辑可用库存
      formRef.value.validate().then(async (res) => {
        console.log(res, 'success')
        createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
        adminHttp
          .warehouseStockUpdate({
            changeNumber: formState.available,
            goodsId: sellModal.distributionId,
          })
          .then(({ code }) => {
            if (+code === 20001) {
              createMessage.success({ content: `操作成功`, key: loadingCtxkey })
              loadTableData()
              sellModal.visible = false
            }
          })
          .catch((err) => {
            createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
          })
      })
    }
  }
  //输入框校验/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/
  //寄售价格
  const reg = /^([1-9]\d*|0)(\.?\d{1,3})?$/
  const regs = /^\d+(\.\d{0,2})?$/
  const changeConsignment = () => {
    if (!reg.test(formState.consignment)) {
      message.error('价格只能输入非负数，最大9999999.必填')
      formState.consignment = ''
    }
    // if (formState.consignment.indexOf('.') != -1 ) {
    //   message.error('白云')
    //   message.error(formState.consignment)

    // }
    let temp = formState.consignment
    if (temp < 0) {
      formState.consignment = ''
      return
    }
    let posDot = temp.indexOf('.') //返回指定字符在此字符串中第一次出现处的索引
    if (posDot < 0) {
      //不包含小数点
      if (temp.length <= 7) {
        return //小于五位数直接返回
      } else {
        // formState.consignment.delete(5, 6);//大于五位数就删掉第六位（只会保留五位）
        if (temp.length > 7) {
          formState.consignment = temp.substring(1, 7 + 1)
        }
        return
      }
    }
    let lastDot = temp.lastIndexOf('.')
    if (posDot != lastDot) {
      formState.consignment = ''
      return
    }
    //走到这有小数点
    if (posDot > 7) {
      // edt.delete(5, 6);//大于五位数就删掉第六位（只会保留五位）
      if (temp.length > 7) {
        formState.consignment = temp.substring(1, 7 + 1)
      }
      return
    }
    if (temp.length - posDot - 1 > 2) {
      //如果包含小数点
      // edt.delete(posDot + 3, posDot + 4);//删除小数点后的第三位
      formState.consignment = temp.substring(0, posDot + 3)
    }
  }
  let ret = /([0-9]+\.[0-9]{2})[0-9]*/
  const blurConsignment = () => {
    if (!regs.test(formState.consignment)) {
      formState.consignment = formState.consignment.replace(ret, '$1')
    }
  }

  //寄售库存
  const changeAvailable = () => {
    if (!Pattern.isIntNumber(formState.available)) {
      message.error('库存只能输入正整数，最大9999999.必填')
      formState.available = ''
    } else {
      formState.available = formState.available.replace(/\D/g, '').replace(/^0{1,}/g, '')
    }
  }

  //开启开关
  const statesOpen = async (InfoVisible) => {
    const changeSwitchMap = {
      id: InfoVisible.value.id,
      isDistribution: !InfoVisible.value.status,
      distributionPrice: formState.setConsignment || '',
      changeNumber: formState.setAvailable,
      shopId: InfoVisible.value.shopId,
    }
    try {
      const { code } = await adminHttp.goodsGoodsDistributionStatus(changeSwitchMap)
      if (code === '20001') {
        // 重新加载列表页面
        loadTableData()
      } else {
        // createMessage.error(message)
      }
    } catch (e) {
      console.log(e)
    }
  }
  const handleOk = (e: MouseEvent) => {
    formRef.value.validate().then(() => {
      statesOpen(InfoVisible)
      visible.value = false
    })
  }
  const stateVisible = (record) => {
    InfoVisible.value = record
    formState.setAvailable = ''
    formState.setConsignment = ''
    visible.value = true
  }
  const stateClose = (record) => {
    const changeMap = {
      id: record.id,
      isDistribution: !record.status,
      distributionPrice: record.distributionPrice,
      changeNumber: record.availableNumber,
      shopId: record.shopId,
    }
    adminHttp
      .goodsGoodsDistributionStatus(changeMap)
      .then(() => {
        loadTableData()
      })
      .catch((error) => {
        console.log('error=', error)
      })
  }
  //输入框校验
  //寄售价格
  const switchConsignment = () => {
    if (!reg.test(formState.setConsignment)) {
      message.error('价格只能输入非负数，最大9999999.必填')
      formState.setConsignment = ''
    }
    let temp = formState.setConsignment
    if (temp < 0) {
      formState.setConsignment = ''
      return
    }
    let posDot = temp.indexOf('.') //返回指定字符在此字符串中第一次出现处的索引
    if (posDot < 0) {
      //不包含小数点
      if (temp.length <= 7) {
        return //小于五位数直接返回
      } else {
        // formState.setConsignment.delete(5, 6);//大于五位数就删掉第六位（只会保留五位）
        if (temp.length > 7) {
          formState.setConsignment = temp.substring(1, 7 + 1)
        }
        return
      }
    }
    let lastDot = temp.lastIndexOf('.')
    if (posDot != lastDot) {
      formState.setConsignment = ''
      return
    }
    //走到这有小数点
    if (posDot > 7) {
      // edt.delete(5, 6);//大于五位数就删掉第六位（只会保留五位）
      if (temp.length > 7) {
        formState.setConsignment = temp.substring(1, 7 + 1)
      }
      return
    }
    if (temp.length - posDot - 1 > 2) {
      //如果包含小数点
      // edt.delete(posDot + 3, posDot + 4);//删除小数点后的第三位
      formState.setConsignment = temp.substring(0, posDot + 3)
    }
  }
  const priceConsignment = () => {
    if (!regs.test(formState.setConsignment)) {
      formState.setConsignment = formState.setConsignment.replace(ret, '$1')
    }
  }
  //寄售库存
  const switchAvailable = () => {
    if (!Pattern.isIntNumber(formState.setAvailable)) {
      message.error('库存只能输入正整数，最大9999999.必填')
      formState.setAvailable = ''
    } else {
      formState.setAvailable = formState.setAvailable.replace(/\D/g, '').replace(/^0{1,}/g, '')
    }
  }
  // 下载模板
  const downTemplateFn = () => {
    let a = document.createElement('a')
    a.href =
      'https://dcp.fdjcyl.com/GongChuangJi/template/寄售导入模板.xlsx?t=' + Date.parse(new Date())
    a.click()
  }

  const ConsignmentFormRef = ref(null)
  // 导出
  const deriveDataFn = () => {
    let param = {
      ...ConsignmentFormRef.value.searchFn(),
    }

    axios
      .post(
        apiUrl.value + '/vocen-jarvis/v1/goods/goods/distribution/export',
        {},
        {
          headers: {
            Authorization: token ? 'Bearer ' + token.replaceAll('"', '') : '',
          },
          responseType: 'blob',
        },
      )
      .then((res) => {
        if (res.data) {
          const blob = res.data
          let a = document.createElement('a')
          a.href = URL.createObjectURL(blob)
          a.download = `寄售数据.xlsx`
          a.style.display = 'none'
          document.body.appendChild(a)
          a.click()
          a.remove()
          loadTableData()
        }
      })
      .catch((e) => {
        console.log(e, 'eeee')
      })

    // adminHttp.goodsGoodsDistributionExport(param,{
    //
    // }).then(res=>{
    //   console.log(res,"1111")
    // }).catch(e=>{
    //   console.log(e,"22222222222222222")
    // })
  }

  const loadingBtn = ref(false)
  const headers = ref({})
  headers.value.Authorization = token ? 'Bearer ' + token.replaceAll('"', '') : ''
  const beforeUpload = () => {
    loadingBtn.value = true
    console.log(loadingBtn.value, 'loadingBtn')
  }

  const modalBoo = ref(false)
  const modalData = ref([])
  const columns = ref([
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: '80px',
    },
    {
      title: '品号',
      dataIndex: 'articleNumber',
      key: 'articleNumber',
    },
    {
      title: '导入失败原因',
      dataIndex: 'failReason',
      key: 'failReason',
    },
  ])
  // 导入
  const importDataFn = (result) => {
    console.log(result, '1111111')

    if (result.file.status == 'done') {
      const response = result.file.response
      if (response.code == '20001' && response.data && response.data.length > 0) {
        modalData.value = response.data
        modalBoo.value = true
      } else if (response.code == '20001' && response.data.length > 0) {
        createMessage.success(`文件导入成功`)
        loadTableData()
      } else if (response.data.length === 0) {
        createMessage.success(`${response.message}`)
        loadTableData()
      } else {
        createMessage.error(`文件导入失败:${response.message}`)
      }
      loadingBtn.value = false
    }
  }
</script>
<style lang="less" scoped>
  ::v-deep(.ant-tabs-nav) {
    margin: 0 !important;
  }
</style>
