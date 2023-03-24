<template>
  <div>
    <div v-if="false" class="orderTitle bg-blue-100 h-8 w-full mb-10">
      <span class="leading-7 text-lg ml-2">商品详情</span>
    </div>
    <div class="pt-30px">
      <div class="flex p-20px items-center justify-between">
        <div class="text-16px">
          当前商品状态：
          <span class="text-blue-700 text-15px cursor-pointer">{{ statusName }}</span>
        </div>
        <div class="text-20px" v-if="detail.resaleStatus === 1 || detail.resaleStatus === 2">
          因预售活动关联的商品尚未审核通过，请先
          <AButton type="link" style="font-size: 15px" @click="goExamine">去审核</AButton>
          商品。
        </div>
        <AButton @click="operationLog">操作记录</AButton>
      </div>
      <!-- bg-white -->
      <div class="p-3 px-20px pb-100px">
        <section class="rounded-md overflow-hidden shadow-md">
          <div class="bg-section px-20px">
            <BarChartOutlined class="mr-2" />
            卖家信息
          </div>
          <div>
            <ATable
              :columns="sellerTableColumns"
              :dataSource="serviceDetailsData"
              size="small"
              :pagination="false"
              bordered
            >
              <template #bodyCell="{ column, text, record }">
                <template v-if="column.dataIndex === 'shopName'">
                  <span>{{ record.shopName }} {{ record.shopMobile }}</span>
                </template>

                <template v-if="column.dataIndex === 'creator'">
                  <span>{{ record.submitterName }} {{ record.submitterMobile }}</span>
                </template>
              </template>
            </ATable>
          </div>
        </section>
        <section class="mt-5 rounded-md overflow-hidden shadow-md">
          <div class="bg-section px-20px">
            <BarChartOutlined class="mr-2" />
            活动信息
          </div>
          <div>
            <div class="border-assets p-5">
              <div class="flex mb-5 items-center">
                <div class="font-bold text-15px text-gray-800">
                  <span class="text-red-600">*</span>
                  活动编码：
                </div>
                <div class="text-14px text-gray-500">{{ detail.code }}</div>
              </div>
              <div class="flex mb-5 items-center">
                <div class="font-bold text-15px text-gray-800">
                  <span class="text-red-600">*</span>
                  发动机型号：
                </div>
                <div class="text-14px text-gray-500">{{ detail.model }}</div>
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
        <section class="mt-5 rounded-md overflow-hidden shadow-md">
          <div class="bg-section px-20px">
            <BarChartOutlined class="mr-2" />
            销售信息
          </div>
          <div>
            <ATable
              :columns="saleInfoTableColumns"
              :dataSource="saleInfoTableData"
              size="small"
              :pagination="false"
              bordered
            />
          </div>
        </section>
        <section class="mt-5 rounded-md overflow-hidden shadow-md">
          <div class="bg-section px-20px">
            <BarChartOutlined class="mr-2" />
            商品介绍
          </div>
          <div class="p-5 bg-white">
            <VoPreviewHeadImg :data-source="detail.pictureList" />
          </div>
        </section>
        <section class="mt-5 rounded-md overflow-hidden shadow-md">
          <div class="bg-section px-20px">
            <BarChartOutlined class="mr-2" />
            预售数量
          </div>
          <div>
            <ATable
              :columns="saleInfoCountColumns"
              :dataSource="saleInfoCountData"
              size="small"
              :pagination="false"
              bordered
            />
            <div class="p-3">
              <div class="text-lg pb-3">
                预售时间： <span>{{ detail.startTime }}</span> 至
                <span>{{ detail.endTime }}</span>
              </div>
              <div class="text-lg">
                发货时间：<span>{{ detail.deliveryTime }}</span>
              </div>
            </div>
          </div>
        </section>

        <section class="mt-5 rounded-md overflow-hidden shadow-md">
          <div class="bg-section px-20px">
            <BarChartOutlined class="mr-2" />
            商品分润
          </div>
          <div class="bg-white">
            <div class="text-16px p-3">
              <span class="font-bold">平台服务费:</span>
              <span class="pl-5">
                <template v-if="switchCost">
                  <a-input-number
                    class="pl-5"
                    style="width: 190px"
                    placeholder="请输入"
                    :min="0"
                    allow-clear
                    v-model:value="startingPoint"
                  />
                  <AButton class="ml-5" type="link" @click="editSave()">保存</AButton>
                  <AButton type="link" @click="investmentSave()">取消</AButton>
                  <div v-if="startingPoint > minPrice" class="text-12px mt-5px text-red-500"
                    >平台服务费不能高于：{{ minPrice }}</div
                  >
                </template>
                <template v-else>
                  <span class="pl-5">{{ startingPoint }}元</span>
                  <AButton class="ml-10" type="link" @click="editProfit()">编辑</AButton>
                </template></span
              >
            </div>
          </div>
        </section>
        <div v-if="detail.status === 1" class="flex justify-center pt-5">
          <span>
            审核通过后是否立即发布：<span>{{ detail.isAvailable === 1 ? '是' : '否' }}</span>
          </span>
          <!-- <a-switch
		  v-model:checked="isAvailable"
		  :checked-value="1"
		  :un-checked-value="0"
		  checked-children="是"
		  un-checked-children="否"
		/> -->
        </div>
        <!--当预售活动与商品同时发布时，商品未审核前，活动的待审核/审核不通过按钮都置灰不可点击-->
        <div v-if="detail.status === 1" class="flex justify-center pt-5">
          <AButton
            type="primary"
            :disabled="detail.resaleStatus == 1 || detail.resaleStatus == 2"
            class="mr-20"
            @click="auditHandler"
            >审核通过
          </AButton>
          <AButton
            type="primary"
            :disabled="detail.resaleStatus == 1 || detail.resaleStatus == 2"
            @click="viewExamine"
          >
            审核不通过
          </AButton>
        </div>
        <div v-if="detail.status === 3 || detail.status === 2" class="flex justify-center pt-5">
          <AButton type="primary" class="mr-20" @click="downHandler">暂停预售</AButton>
        </div>
        <div v-if="detail.status === 4" class="flex justify-center pt-5">
          <AButton
            :disabled="startingPoint > minPrice"
            type="primary"
            class="mr-20"
            @click="upHandler"
            >启动预售
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
            :rules="[{ required: true, message: '请填写未通过原因' }]"
          >
            <ATextarea
              v-model:value="formState.replyValue"
              placeholder="拒绝原因最多输入20字"
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
      :footer="false"
      @ok="handleOk"
    >
      <div class="p-5">
        <ATable :dataSource="tableData" :columns="handleColumns" bordered :pagination="false">
          <template #bodyCell="{ column, text, record, index }">
            <template v-if="column.dataIndex === 'index'">
              {{ index + 1 }}
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
  import { message, Modal } from 'ant-design-vue'
  import { sellerTableColumns, handleColumns } from './data/configuration'
  import { ref, onBeforeMount, reactive } from 'vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import { BarChartOutlined } from '@ant-design/icons-vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { useRoute, useRouter } from 'vue-router'
  import { _ } from '@vocen/shared'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const { createMessage } = useMessage()
  const formState = reactive<FormState>({
    replyValue: '',
  })

  interface FormState {
    replyValue: string
  }

  let tableData = ref([])
  const formRef = ref()
  const router = useRouter()
  // const isAvailable = ref<number>(1)
  const saleInfoTableColumns = ref<any>([])
  const detail = ref<any>({})
  const logVisible = ref<boolean>(false)
  const startingPoint = ref<string | number>(0)
  const statusName = ref<string>('')
  const loadingCtxkey = 'handlerRow'
  const route = useRoute()
  const switchCost = ref<boolean>(false)
  const saleInfoTableData = ref<any>([])
  const saleInfoCountColumns = ref<any>([])
  const saleInfoCountData = ref<any>([])
  const serviceDetailsData = ref<any>([])
  const minPrice = ref<string | number>(0)
  const loadTableData = () => {
    adminHttp.GOODS.goodsRecyclePreSaleDetail({
      id: route.query.id as string,
    })
      .then((res) => {
        detail.value = res.data
        if (detail.value.status === 1) {
          statusName.value = '待审核 '
        } else if (detail.value.status === 2) {
          statusName.value = '未开始'
        } else if (detail.value.status === 3) {
          statusName.value = '进行中'
        } else if (detail.value.status === 4) {
          statusName.value = '已暂停'
        } else if (detail.value.status === 5) {
          statusName.value = '已结束'
        } else if (detail.value.status === 6) {
          statusName.value = '审核不通过'
        }
        startingPoint.value = res.data.platformPrice
        //卖家信息
        serviceDetailsData.value = [
          {
            shopCode: res.data.shopCode,
            shopName: res.data.shopName,
            shopMobile: res.data.shopMobile,
            submitterName: res.data.submitterName,
            submitterMobile: res.data.submitterMobile,
            createTime: res.data.createTime,
          },
        ]
        // 销售信息title编辑
        if (res.data.levelVOS && res.data.levelVOS.length) {
          const m: any = _.minBy(res.data.levelVOS, (item) => item.price)
          minPrice.value = m.price
          // 组装销售信息数据
          saleInfoTableColumns.value = res.data.levelVOS.map((item) => {
            return {
              title: item.level + '类',
              dataIndex: item.level,
              align: 'center',
            }
          })
          saleInfoTableColumns.value.unshift({
            title: '价格类型',
            dataIndex: 'priceType',
            align: 'center',
          })
          saleInfoTableColumns.value.push({
            title: '运费',
            dataIndex: 'shippingType',
            align: 'center',
          })

          const dataListObj = {}
          res.data.levelVOS.map((item) => {
            dataListObj[item.level] = item.originalSalePrice + '元'
            return item
          })
          dataListObj['priceType'] = '原价'
          dataListObj['shippingType'] = res.data.shippingType === 1 ? '包邮' : '到付'
          saleInfoTableData.value.push(dataListObj)

          const dataListObjB = {}
          res.data.levelVOS.map((item) => {
            dataListObjB[item.level] = item.price + '元'
            return item
          })
          dataListObjB['priceType'] = '预售价格'
          dataListObjB['shippingType'] = res.data.shippingType === 1 ? '包邮' : '到付'
          saleInfoTableData.value.push(dataListObjB)
        }
        //以上销售信息
        // 销售数量title编辑
        if (res.data.levelVOS && res.data.levelVOS.length) {
          saleInfoCountColumns.value = res.data.levelVOS.map((item) => {
            return {
              title: item.level + '类',
              dataIndex: item.level,
              align: 'center',
            }
          })
          saleInfoCountColumns.value.unshift({
            title: '商品等级',
            dataIndex: 'commodityGrade',
            align: 'center',
          })
          const dataCountListObjB = {}
          res.data.levelVOS.map((item) => {
            dataCountListObjB[item.level] = item.count
            return item
          })
          dataCountListObjB['commodityGrade'] = '总可预售量'
          saleInfoCountData.value.push(dataCountListObjB)

          const dataCountListObj = {}
          res.data.levelVOS.map((item) => {
            dataCountListObj[item.level] = item.sold
            return item
          })
          dataCountListObj['commodityGrade'] = '已预售量'
          saleInfoCountData.value.push(dataCountListObj)
        }
        //以上销售数量信息
      })
      .catch((err) => {
        createMessage.error({ content: `获取列表失败:${err.message}`, key: loadingCtxkey })
      })
    // loadTableData()
  }
  //分润编辑
  const editProfit = () => {
    switchCost.value = true
  }
  //保存
  const editSave = () => {
    switchCost.value = false
  }
  //审核弹窗
  const viewExamine = () => {
    examineModal.visible = true
  }
  const examineModal = reactive({
    visible: false,
    title: '审核详情',
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
    const { code } = await adminHttp.GOODS.goodsRecyclePreSaleUpdate({
      id: detail.value.id,
      status: 6,
      result: retForm.replyValue,
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
    const ret = await adminHttp.GOODS.goodsRecyclePreSaleOperateList({ id: detail.value.id })
    tableData.value = ret.data
    logVisible.value = true
  }
  //ok
  const handleOk = () => {
    logVisible.value = false
  }
  // 启动预售操作
  const upHandler = () => {
    if (!startingPoint.value) {
      message.warn('平台服务费不能为空或为0')
      return
    }
    Modal.confirm({
      title: '温馨提示',
      content: '是否确认启动预售？',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        return new Promise(async (resolve) => {
          const { code } = await adminHttp.GOODS.goodsRecyclePreSaleUpdate({
            id: detail.value.id,
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
  // 暂停预售操作
  const downHandler = () => {
    Modal.confirm({
      title: '温馨提示',
      content: '是否确认暂停预售？',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        return new Promise(async (resolve) => {
          const { code } = await adminHttp.GOODS.goodsRecyclePreSaleUpdate({
            id: detail.value.id,
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
      message.warn('平台服务费不能为空或为0')
      return
    }
    Modal.confirm({
      title: '温馨提示',
      content: '此操作将审核通过，是否继续？',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        return new Promise(async (resolve) => {
          const { code } = await adminHttp.GOODS.goodsRecyclePreSaleUpdate({
            id: detail.value.id,
            status: 2,
            result: '同意',
            platformPrice: startingPoint.value,
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
  //跳转
  const goExamine = () => {
    router.push({
      path: '/goodsManage/oldEquipment/resaleDetails',
      query: { id: detail.value.resaleId },
    })
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
</style>
