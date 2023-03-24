<template>
  <div>
    <div class="bg-white m-24px p-24px">
      <div class="text-18px bg-white pb-24px messageList relative">
        <a-alert type="error" showIcon>
          <template #icon><exclamation-circle-outlined /></template>
          <!-- <template #icon><smile-outlined /></template> -->
          <template #message>
            <div class="py-10px"
              >当前商品状态：
              <span v-if="detail.status === 1" class=" text-15px cursor-pointer">
                回收中
              </span>
              <span v-else class=" text-15px cursor-pointer">待回收</span>
              
              </div>
              
          </template>
        </a-alert>
        <div class="absolute bottom-38px right-24px">
          <AButton @click="operationLog">操作记录</AButton>
        </div>
        
      </div>

    <div>
      <!-- bg-white -->
      <div class="mb-50">
        <section class="rounded-md overflow-hidden">
          <div class="template--title my-16px">回收公司信息</div>
          <div>
            <ATable
              :columns="companyTableColumns"
              :dataSource="serviceDetailsData"
              size="small"
              :pagination="false"
              bordered
            >
              <template #bodyCell="{ column, text, record }">
                <template v-if="column.dataIndex === 'shopName'">
                  <span>{{ record.shopName }}-{{ record.userName }}</span>
                </template>
                <template v-if="column.dataIndex === 'submitterUserName'">
                  <span>{{ record.submitter }}-{{ record.submitterUserName }}</span>
                </template>
              </template>
            </ATable>
          </div>
        </section>
        <section class="mt-5 rounded-md overflow-hidden">
          <div class="template--title my-16px">回收信息</div>
          <div>
            <div class="border-assets p-5 border">
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
                <div class="text-14px text-gray-500">{{ detail.model }}</div>
              </div>
              <div class="flex mb-5 items-center">
                <div class="font-bold text-15px text-gray-800">
                  <span class="text-red-600">*</span>
                  回收价格：
                </div>
                <div class="text-14px text-gray-500">{{ detail.price }}元</div>
              </div>
              <div class="flex items-center">
                <div class="font-bold text-15px text-gray-800">
                  <span class="text-red-600">*</span>
                  修理厂价格：
                </div>
                <div class="text-14px text-gray-500">{{ detail.garagePrice }}元</div>
              </div>
            </div>
          </div>
        </section>
        <div class="flex mt-30px items-center justify-center">
          <div>
            <a-space>
              <a-button
                v-auth="'/v1/goods/model/recycle/status'"
                v-if="detail.status === 2"
                type="primary"
                @click="startHandler"
              >
                启动回收
              </a-button>
              <a-button
                v-auth="'/v1/goods/model/recycle/status'"
                v-if="detail.status === 1"
                type="primary"
                @click="pauseHandler"
              >
                暂停回收
              </a-button>
            </a-space>
          </div>
        </div>
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
      :footer="false"
      width="1000px"
      title="操作记录"
      @ok="handleOk"
    >
      <div class="p-5">
        <ATable :dataSource="tableData" :columns="operateTableColumns" bordered :pagination="false">
          <template #bodyCell="{ column, index, record }">
            <template v-if="column.dataIndex === 'index'">
              <span>{{ index + 1 }}</span>
            </template>
          </template>
        </ATable>
      </div>
      <div class="text-right px-20px pb-20px">
        <a-button type="primary" @click="logVisible = false">确定</a-button>
      </div>
    </AModal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onBeforeMount, reactive } from 'vue'
  import adminHttp from '/@/utils/http/adminHttp'
  // @ts-ignore
  import { companyTableColumns, operateTableColumns } from './data/configuration'
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
  import { BarChartOutlined } from '@ant-design/icons-vue'
  import { useRoute, useRouter } from 'vue-router'
  import { message, Modal } from 'ant-design-vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const router = useRouter()
  // 旧机详情
  const detail = ref({})
  const formState = reactive<FormState>({
    replyValue: '',
  })

  interface FormState {
    replyValue: string
  }

  const logVisible = ref<boolean>(false)
  const route = useRoute()

  const serviceDetailsData = ref<any>([])

  // 加载详情数据
  const loadTableData = async () => {
    const { data } = await adminHttp.GOODS.goodsModelRecycleDetail({
      id: route.query.id,
    })
    detail.value = data
    serviceDetailsData.value = [
      {
        ...data,
      },
    ]
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
  const examineAdd = () => {
    examineModal.visible = false
  }
  let tableData = ref([])

  //操作记录
  const operationLog = async () => {
    const { data } = await adminHttp.GOODS.goodsModelRecycleOperate({
      id: route.query.id,
    })
    logVisible.value = true
    tableData.value = data
  }
  //ok
  const handleOk = () => {
    logVisible.value = false
  }

  // 启动回收
  const startHandler = () => {
    Modal.confirm({
      title: '温馨提示',
      content: '此操作将启动回收，是否继续？',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        return new Promise(async () => {
          try {
            const { code } = await AdminHttp.GOODS.goodsModelRecycleStatus({
              id: [detail.value.id],
              status: 1,
            })
            if (+code === 20001) {
              message.success('启动回收成功')
              await router.back()
            }
          } catch (e: any) {
            message.error(e.message)
            console.warn(e, 'EquipmentRecovery.veu')
          }
        })
      },
    })
  }

  // 暂停回收
  const pauseHandler = () => {
    Modal.confirm({
      title: '温馨提示',
      content: '此操作将暂停回收，是否继续？',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        return new Promise(async () => {
          try {
            const { code } = await AdminHttp.GOODS.goodsModelRecycleStatus({
              id: [detail.value.id],
              status: 2,
            })
            if (+code === 20001) {
              message.success('启动回收成功')
              await router.back()
            }
          } catch (e: any) {
            message.error(e.message)
            console.warn(e, 'EquipmentRecovery.veu')
          }
        })
      },
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
  .messageList{
    border-radius: 2px;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.85);
  }
</style>
