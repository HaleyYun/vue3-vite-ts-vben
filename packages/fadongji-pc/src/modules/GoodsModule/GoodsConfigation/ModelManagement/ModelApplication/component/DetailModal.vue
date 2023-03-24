<template>
  <div>
    <BasicModal
      v-bind="$attrs"
      @register="registerModal"
      :title="modalData.title"
      width="600px"
      centered
      destroy-on-close
      :canFullscreen="false"
      :confirm-loading="confirmLoading"
      @ok="modalOk"
      @cancel="modalCancel"
      @visible-change="handleVisibleChange"
    >
      <div class="padding-24">
        <AForm
          ref="formRef"
          :model="formState"
          name="basic"
          autocomplete="off"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
        >
          <div class="template--title mb-20px">申请信息</div>
          <div class="margin-t-10">
            <AFormItem label="型号名称" style="margin-bottom: 10px">
              <span>{{ info.applyModel ? info.applyModel : '--' }}</span>
            </AFormItem>
            <AFormItem label="申请说明" style="margin-bottom: 10px">
              <span>{{ info.applyReason ? info.applyReason : '--' }}</span>
            </AFormItem>
            <AFormItem label="提交人" style="margin-bottom: 10px">
              <span>{{ info.creatorName ? info.creatorName : '--' }}</span>
            </AFormItem>
            <AFormItem label="手机号" style="margin-bottom: 10px">
              <span>{{ info.creatorPhone ? info.creatorPhone : '--' }}</span>
            </AFormItem>
            <AFormItem label="回收公司" style="margin-bottom: 10px">
              <span>{{ info.shopName ? info.shopName : '--' }}</span>
            </AFormItem>
          </div>
          <div class="template--title mb-20px">处理信息</div>
          <div class="margin-t-10" v-if="modalData.type === 'audit'">
            <AFormItem
              label="处理结果"
              name="status"
              :rules="[{ required: true, message: '请选择处理结果', trigger: 'change' }]"
            >
              <a-radio-group v-model:value="formState.status">
                <a-radio :value="2">通过</a-radio>
                <a-radio :value="3">不通过</a-radio>
              </a-radio-group>
            </AFormItem>
            <AFormItem
              label="拒绝原因"
              v-if="formState.status === 3"
              name="approvalReason"
              :rules="[{ required: true, message: '请填写拒绝原因', trigger: 'blur' }]"
            >
              <ATextarea
                v-model:value="formState.approvalReason"
                placeholder="拒绝原因最多输入50字"
                :showCount="true"
                :rows="6"
                :maxlength="50"
              />
            </AFormItem>
          </div>
          <div v-else>
            <AFormItem label="处理结果" style="margin-bottom: 10px">
              <span>{{ info.statusName }}</span>
            </AFormItem>
            <AFormItem label="原因说明" v-if="info.status == 3" style="margin-bottom: 10px">
              <span>{{ info.approvalReason }}</span>
            </AFormItem>
            <AFormItem label="处理人" style="margin-bottom: 10px">
              <span>{{ info.modifierName }}</span>
            </AFormItem>
            <AFormItem label="处理时间" style="margin-bottom: 10px">
              <span>{{ info.updateTime }}</span>
            </AFormItem>
          </div>
        </AForm>
      </div>
    </BasicModal>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, watch, defineEmits } from 'vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { BasicModal, useModalInner } from '/@/components/Modal'

  const { createMessage } = useMessage()

  const emits = defineEmits(['update'])
  const modalData = ref({})
  const confirmLoading = ref(false)
  const info = ref({})
  const formRef = ref()
  const formState = ref({
    status: 2,
    approvalReason: '',
  })
  const [registerModal, { closeModal, setModalProps }] = useModalInner((data: any) => {
    modalData.value = data
    if (modalData.value.id) {
      formState.value.status = 2
      formState.value.approvalReason = ''
      loadApplyView()
    }
  })
  const handleVisibleChange = (val) => {
    console.log(val, modalData.value)
  }

  const modalOk = async () => {
    if (modalData.value.type == 'detail') {
      return closeModal()
    }
    try {
      const values = await formRef.value.validateFields()
      if (values) {
        ModelAudit()
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  }
  const ModelAudit = async () => {
    try {
      let params = { ...formState.value, id: modalData.value.id }
      const { code, data } = await AdminHttp.GOODS.goodsModelApplyApproval(params)
      if (code === '20001') {
        createMessage.success('审核成功')
        if (modalData.value.type == 'audit') {
          emits('update')
          closeModal()
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  const modalCancel = () => {
    closeModal()
  }

  const loadApplyView = async () => {
    try {
      let params = {
        applyId: modalData.value.id,
      }
      const { code, data } = await AdminHttp.GOODS.goodsModelApplyView(params)
      if (code === '20001') {
        info.value = data
      }
    } catch (e) {
      console.log(e)
    }
  }
</script>

<style scoped></style>
