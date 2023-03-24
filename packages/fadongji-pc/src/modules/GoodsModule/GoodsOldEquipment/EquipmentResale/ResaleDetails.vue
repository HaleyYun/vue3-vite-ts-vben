<template>
 <div>
  <div v-if="false" class="bg-gray-100">
    <div class="leading-7 text-14px text-gray-600 font-bold p-20px">商品详情</div>
  </div>
  <div class="bg-white m-24px p-24px">
    <div class="text-18px bg-white pb-24px messageList relative">
      <a-alert type="error" showIcon>
        <template #message>
          <div class="py-10px"
              >当前商品状态：
              <span  class="text-15px cursor-pointer">
                {{ detail.statusName }}
              </span>
            </div>
            <div class="mt-10px" v-if="detail.status == 2"
          >审核不通过原因：{{ detail.result ? detail.result : '--' }}
        </div>
        </template>

      </a-alert>
      <div class="absolute bottom-38px right-24px">
          <AButton @click="operationLog">操作记录</AButton>
        </div>
      </div>
   
    <!-- bg-white -->
    <div>
      <section class="rounded-md overflow-hidden">
        <div class="template--title mb-16px">卖家信息</div> 
        <div>
          <ATable
            :columns="sellerTableColumns"
            :dataSource="serviceDetailsData"
            size="small"
            :pagination="false"
            bordered
          >
            <template #bodyCell="{ column, text, record }">
              <template v-if="column.dataIndex === 'creator'">
                <span>{{ record.creatorName }}{{ record.creatorPhone }}</span>
              </template>
              <template v-if="column.dataIndex === 'shopName'">
                <span>{{ record.shopName }}{{ record.legalPhone }}</span>
              </template>
            </template>
          </ATable>
        </div>
      </section>
      <section class="mt-5 rounded-md overflow-hidden border">
        <div class="template--title mb-16px">商品信息</div> 
        <div>
          <div class="border-assets p-5">
            <div class="flex mb-5 items-center">
              <div class="font-bold text-15px text-gray-800">
                <span class="text-red-600">*</span>
                商品编码：
              </div>
              <div class="text-14px text-gray-500">{{ detail.code }}</div>
            </div>
            <div class="flex mb-5 items-center">
              <div class="font-bold text-15px text-gray-800">
                <span class="text-red-600">*</span>
                发动机型号：
              </div>
              <div class="text-14px text-gray-500">{{ detail.modelName }}</div>
            </div>
            <div class="flex items-center">
              <div class="font-bold text-15px text-gray-800">
                <span class="text-red-600">*</span>
                商品名称：
              </div>
              <div class="text-14px text-gray-500">{{ detail.name }}</div>
            </div>
          </div>
        </div>
      </section>
      <section class="mt-5 rounded-md overflow-hidden">
        <div class="template--title mb-16px">销售信息</div> 
        <div class="bg-white">
          <ATable
            :dataSource="serviceSaleColumn"
            :columns="saleInfoTableColumns"
            size="small"
            :pagination="false"
            bordered
          />
        </div>
      </section>
      <section class="mt-5 rounded-md overflow-hidden border">
        <div class="template--title mb-16px">商品头图</div> 
        <div class="p-5 bg-white">
          <VoPreviewHeadImg :data-source="detail.pictures" />
        </div>
      </section>
      <section class="mt-5 rounded-md overflow-hidden">
        <div class="template--title mb-16px">商品库存</div> 
        <div class="bg-white">
          <ATable
            :dataSource="stockTableData"
            :columns="stockTableColumns"
            size="small"
            :pagination="false"
            bordered
          />
        </div>
      </section>
      <section class="mt-5 rounded-md overflow-hidden border">
        <div class="template--title mb-16px">商品分润</div> 
        <div class="bg-white">
          <div class="text-16px flex items-center p-3">
            <div class="font-bold">平台服务费:</div>
            <span v-if="switchCost || detail.status === 1" class="pl-5">
              <a-input
                class="pl-5"
                style="width: 190px"
                placeholder="请输入"
                :max="minPrice"
                allow-clear
                addon-after="元"
                v-model:value="startingPoint"
              />
              <template v-if="detail.status !== 1">
                <AButton
                  class="ml-5"
                  type="link"
                  :disabled="startingPoint < 0 || startingPoint == null"
                  @click="editSave"
                >
                  保存
                </AButton>
                <AButton type="link" @click="investmentSave">取消</AButton>
              </template>
            </span>
            <div v-else class="pl-5">
              <span class="ml-5">{{ startingPoint }} 元</span>
              <AButton class="ml-10" type="link" @click="editProfit">编辑</AButton>
            </div>
          </div>
          <div class="text-red-500 pl-140px pb-10px" v-if="startingPoint > minPrice">
            分润总额不能大于各成色价格
          </div>
        </div>
      </section>
      <div v-if="detail.status === 1" class="flex justify-center pt-5">
        审核通过后是否立即发布：
        <a-switch
          v-model:checked="isAvailable"
          :checked-value="1"
          :un-checked-value="0"
          checked-children="是"
          un-checked-children="否"
        />
      </div>
      <div v-if="detail.status === 1" class="flex justify-center pt-5">
        <AButton
          v-auth="'/v1/goods/recycle/model/approval'"
          type="primary"
          class="mr-20"
          @click="auditHandler"
          >审核通过
        </AButton>
        <AButton v-auth="'/v1/goods/recycle/model/approval'" type="primary" @click="viewExamine"
          >审核不通过
        </AButton>
      </div>
      <div v-if="detail.status === 3" class="flex justify-center pt-5">
        <AButton
          v-auth="'/v1/goods/recycle/model/update/status'"
          type="primary"
          class="mr-20"
          @click="downHandler"
          >下架
        </AButton>
      </div>
      <div v-if="detail.status === 4" class="flex justify-center pt-5">
        <AButton
          v-auth="'/v1/goods/recycle/model/update/status'"
          type="primary"
          class="mr-20"
          @click="upHandler"
          >上架
        </AButton>
      </div>
    </div>
  </div>
  <AModal
    v-model:visible="examineModal.visible"
    :title="examineModal.title"
    centered
    destroy-on-close
    :confirm-loading="examineModal.confirmLoading"
    @ok="examineAdd"
    @cancel="BrandsCancel"
  >
    <div class="p-5">
      <AForm
        ref="formRef"
        :model="formState"
        name="basic"
        autocomplete="off"
        :label-col="{ span: 9 }"
        :wrapper-col="{ span: 20 }"
      >
        <AFormItem
          label="审核未通过原因"
          class="text-current"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 20 }"
          name="replyValue"
          :rules="[{ required: true, message: '请填写审核未通过原因' }]"
        >
          <ATextarea
            v-model:value="formState.replyValue"
            placeholder="请填写审核未通过原因"
            :showCount="true"
            :rows="6"
            :maxlength="20"
          />
        </AFormItem>
      </AForm>
    </div>
  </AModal>
  <!-- 操作日志 -->
  <AModal
    v-model:visible="logVisible"
    width="1000px"
    title="操作日志"
    @ok="handleOk"
    :footer="false"
  >
    <div class="p-5">
      <ATable :dataSource="tableData" :columns="operateColumns" bordered :pagination="false">
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.dataIndex === 'index'">
            {{ index + 1 }}
          </template>
          <template v-if="column.dataIndex === 'operatorNickName'">
            {{ record.operatorNickName }} {{ record.operatorPhone }}
          </template>
        </template>
      </ATable>
      <div class="text-right pt-15px">
        <a-button type="primary" @click="logVisible = false">确定</a-button>
      </div>
    </div>
  </AModal>
 </div>
</template>

<script lang="ts" setup>
  import VoPreviewHeadImg from '/@/components/VoPreviewHeadImg/VoPreviewHeadImg.vue'
  import { ref, onBeforeMount, reactive } from 'vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import { BarChartOutlined } from '@ant-design/icons-vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { useRoute, useRouter } from 'vue-router'
  import { _ } from '@vocen/shared'
  import { message, Modal } from 'ant-design-vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  // @ts-ignore
  import { sellerTableColumns, operateColumns } from './data/TableColumnsConfig'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";

  const router = useRouter()

  const { createMessage } = useMessage()
  const formState = reactive<FormState>({
    replyValue: '',
  })

  interface FormState {
    replyValue: string
  }

  const formRef = ref()
  const isAvailable = ref<number>(1)
  const logVisible = ref<boolean>(false)
  const startingPoint = ref<string | number>('')
  const loadingCtxkey = 'handlerRow'
  const route = useRoute()
  const switchCost = ref<boolean>(false)
  let personData = ref<any>({})
  const serviceSaleColumn = ref<any>([])
  const shopMobile = ref<any>('')
  let goodsStatus = ref<any>()
  const serviceDetailsData = ref<any>([])
  let violtionStatus = ref<any>()
  let commodityStatus = ref<any>()
  const detail = ref<any>({})
  const saleInfoTableColumns = ref<any>([])
  const saleInfoTableData = ref<any>([])
  const stockTableData = ref<any>([])
  const stockTableColumns = ref<any>([])
  const minPrice = ref<string | number>(0)
  let tableData = ref([])
  const loadTableData = () => {
    adminHttp.GOODS.goodsRecycleModelViewBy$id({
      id: route.query.id as string,
    })
      .then((res) => {
        isAvailable.value = res.data.isAvailable ? 1 : 0
        detail.value = res.data
        startingPoint.value = res.data.platformPrice === 0 ? '' : res.data.platformPrice
        //卖家信息
        shopMobile.value = res.data.shopMobile
        serviceDetailsData.value = [
          {
            shopId: res.data.shopId,
            shopName: res.data.shopName,
            legalPhone: res.data.legalPhone,
            shopMobile: res.data.shopMobile,
            creator: res.data.creator,
            creatorName: res.data.creatorName,
            creatorPhone: res.data.creatorPhone,
            createTime: res.data.createTime,
          },
        ]
        // 销售信息title编辑
        //销售信息
        serviceSaleColumn.value = [
          {
            shippingType: res.data.shippingType === 1 ? '包邮' : '到付',
          },
        ]
        if (res.data.levelVOS && res.data.levelVOS.length) {
          const m: any = _.minBy(
            res.data.levelVOS.filter((item) => item.price),
            (item) => item.price,
          )
          minPrice.value = m.price
          // 组装销售信息数据
          saleInfoTableColumns.value = res.data.levelVOS.map((item) => {
            let level = item.level
            serviceSaleColumn.value[0][level] = (item.price ? item.price : '--') + '元'
            return {
              title: item.level + '类',
              dataIndex: item.level,
              align: 'center',
            }
          })
          saleInfoTableColumns.value.push({
            title: '运费',
            dataIndex: 'shippingType',
            align: 'center',
          })
          console.log(serviceSaleColumn, saleInfoTableColumns)

          const dataListObj = {}
          res.data.levelVOS.map((item) => {
            dataListObj[item.level] = item.price + '元'
            return item
          })
          dataListObj['shippingType'] = res.data.shippingType === 1 ? '包邮' : '到付'
          saleInfoTableData.value = [dataListObj]

          // 组装库存数据
          stockTableColumns.value = res.data.levelVOS.map((item) => {
            return {
              title: item.level + '类',
              dataIndex: item.level,
              align: 'center',
            }
          })
          stockTableColumns.value.unshift({
            title: '总库存',
            dataIndex: 'availableNumber',
            align: 'center',
          })
          const stockObj = {
            availableNumber: res.data.availableNumber || 0,
          }
          res.data.levelVOS.map((item) => {
            stockObj[item.level] = item.availableNumber
            return item
          })
          stockTableData.value = [stockObj]
        }
        personData.value = {
          category: res.data.categoryInfo,
          operationCategory: res.data.categoryOperateInfo,
          goodsBrand: res.data.brandName,
          goodsType: res.data.categoryType,
          goodsSize: res.data.skuProperty,
          goodsName: res.data.name,
        }

        //状态
        goodsStatus.value = res.data.status
        violtionStatus.value = res.data.violationStatus
        if (goodsStatus.value === 4 && violtionStatus.value === 3) {
          commodityStatus.value = '已下架'
        } else if (goodsStatus.value === 1 && violtionStatus.value === 3) {
          commodityStatus.value = '已上架'
        } else if (goodsStatus.value === 2 && violtionStatus.value === 3) {
          commodityStatus.value = '待审核'
        } else if (goodsStatus.value === 3 && violtionStatus.value === 3) {
          commodityStatus.value = '审核未通过'
        }

        // createMessage.success({ content: `获取列表成功`, key: loadingCtxkey })
      })
      .catch((err) => {
        createMessage.error({ content: `获取列表失败:${err.message}`, key: loadingCtxkey })
      })
    // loadTableData()
  }

  // 下架操作
  const downHandler = () => {
    Modal.confirm({
      title: '温馨提示',
      content: '是否确认下架？',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        return new Promise(async (resolve) => {
          const { code } = await AdminHttp.GOODS.goodsRecycleModelUpdateStatus({
            ids: [detail.value.id],
            status: 4,
          })
          if (+code === 20001) {
            message.success('操作成功')
            router.back()
            resolve('操作成功')
          }
        })
      },
    })
  }

  // 审核通过操作
  const auditHandler = () => {
    if (!startingPoint.value) {
      message.warn('平台服务不能为空或为0')
      return
    }
    if (startingPoint.value > minPrice.value) {
      message.warn('分润总额不能大于各成色价格')
      return
    }
    Modal.confirm({
      title: '温馨提示',
      content: '此操作将审核通过，是否继续？',
      okText: '确认',
      cancelText: '取消',
      async onOk() {
        try {
          const { code } = await AdminHttp.GOODS.goodsRecycleModelApproval({
            id: detail.value.id,
            approvalReason: '同意',
            approvalStatus: 1,
            isAvailable: isAvailable.value,
            platformPrice: startingPoint.value,
          })
          if (+code === 20001) {
            message.success('操作成功')
            router.back()
          }
        } catch (e) {
          message.error(e.message)
        }
      },
    })
  }
  // 上架操作
  const upHandler = () => {
    if (!startingPoint.value) {
      message.warn('平台服务不能为空或为0')
      return
    }
    Modal.confirm({
      title: '温馨提示',
      content: '是否确认上架？',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        return new Promise(async (resolve) => {
          const { code } = await AdminHttp.GOODS.goodsRecycleModelUpdateStatus({
            ids: [detail.value.id],
            status: 3,
          })
          if (+code === 20001) {
            message.success('操作成功')
            router.back()
            resolve('操作成功')
          }
        })
      },
    })
  }
  //分润编辑
  const editProfit = () => {
    switchCost.value = true
  }
  //保存
  const editSave = () => {
    setProfit()
    switchCost.value = false
  }
  const setProfit = async () => {
    try {
      let params = { id: detail.value.id, platformPrice: startingPoint.value }
      const { code } = await adminHttp.GOODS.goodsRecycleModelUpdateProfit(params)
      if (code == '20001') {
        createMessage.success('操作成功')
        detail.value.platformPrice = startingPoint.value
        loadTableData()
      }
    } catch (e) {
      console.log(e)
    }
  }
  //审核弹窗
  const viewExamine = () => {
    examineModal.visible = true
  }
  const examineModal = reactive({
    visible: false,
    title: '填写审核未通过原因',
    currentItem: null,
    rejectReason: '',
    confirmLoading: false,
    currentId: '',
  })
  //审核框取消
  const BrandsCancel = () => {
    examineModal.visible = false
  }
  //审核确认
  const examineAdd = async () => {
    const retForm = await formRef.value.validate()
    const { code } = await AdminHttp.GOODS.goodsRecycleModelApproval({
      id: detail.value.id,
      approvalStatus: 0,
      approvalReason: retForm.replyValue,
      isAvailable: 0,
      platformPrice: startingPoint.value,
    })
    if (+code === 20001) {
      message.success('操作成功')
      router.back()
    }
    examineModal.visible = false
  }
  //取消
  const investmentSave = () => {
    switchCost.value = false
    // loadTableData()
  }
  //操作记录
  const operationLog = async () => {
    const ret = await AdminHttp.GOODS.goodsRecycleModelQueryOpLogList({ id: detail.value.id })
    tableData.value = ret.data
    logVisible.value = true
  }
  //ok
  const handleOk = () => {
    logVisible.value = false
  }

  onMountedOrActivated(() => {
    // 初始化数据
    loadTableData()
  })
</script>

<style lang="less" scoped>
  .orderTitle {
    padding: 0 16px;
    position: fixed;
    z-index: 999;
    /* width: 100%; */
    width: calc(100% - 210px);
    top: 48px;
    flex: 0 0 auto;
    transition: width 0.2s;
  }
  .messageList{
    border-radius: 2px;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.85);
  }
</style>
