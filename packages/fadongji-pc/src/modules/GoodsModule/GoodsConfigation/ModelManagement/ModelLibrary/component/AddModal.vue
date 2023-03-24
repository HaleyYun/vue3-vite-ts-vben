<template>
  <div>
    <BasicModal
      v-bind="$attrs"
      :title="modalData.title"
      @register="registerModal"
      width="500px"
      destroy-on-close
      :canFullscreen="false"
      :confirm-loading="confirmLoading"
      @ok="modalOk"
      @cancel="modalCancel"
    >
      <div class="padding-24">
        <AForm
          ref="formRef"
          :model="formState"
          name="basic"
          showSearch
          autocomplete="off"
          :label-col="{ span: 7 }"
          :wrapper-col="{ span: 17 }"
        >
          <AFormItem
            label="商品类别"
            name="categoryId"
            :rules="[{ required: true, message: '请选择商品类别', trigger: 'change' }]"
          >
            <a-tree-select
              v-model:value="formState.categoryId"
              show-search
              style="width: 100%"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              placeholder="请选择商品类别"
              allow-clear
              tree-default-expand-all
              :tree-data="classfyOptions"
            />
          </AFormItem>
          <AFormItem
            label="型号名称"
            name="model"
            :rules="[{ required: true, message: '请填写型号名称', trigger: 'blur' }]"
          >
            <a-input
              v-model:value="formState.model"
              placeholder="请输入型号名称"
              :showCount="true"
              :maxlength="50"
            />
          </AFormItem>
          <AFormItem label="新机售卖是否启用">
            <ASwitch
              v-model:checked="formState.isSaleEnable"
              checked-children="是"
              un-checked-children="否"
              :unCheckedValue="false"
              :checkedValue="true"
            />
          </AFormItem>
          <AFormItem label="旧机回收是否启用">
            <ASwitch
              v-model:checked="formState.isRecycleEnable"
              checked-children="是"
              un-checked-children="否"
              :unCheckedValue="false"
              :checkedValue="true"
            />
          </AFormItem>
        </AForm>
      </div>
    </BasicModal>
  </div>
</template>

<script setup lang="ts">
  import { ref, defineEmits } from 'vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { getCategoryAllFunc } from '/@/api/model/dictionaryApi'
  import { BasicModal, useModalInner } from '/@/components/Modal'

  const { createMessage } = useMessage()

  const emits = defineEmits(['updateTable'])

  const modalData = ref({})
  const confirmLoading = ref(false)
  const formRef = ref()
  const formState = ref({ categoryId: null })
  const [registerModal, { closeModal }] = useModalInner((data: any) => {
    getclassfy()
    modalData.value = data
    formState.value = data.info
    console.log(formState.value)
  })

  const modalOk = async () => {
    try {
      const values = await formRef.value.validateFields()
      if (values) {
        if (modalData.value.type == 'add') {
          await ModelAdd()
        } else {
          await ModelEdit()
        }
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  }
  const ModelAdd = async () => {
    try {
      let params = { ...formState.value }

      confirmLoading.value = true
      const { code, data } = await AdminHttp.GOODS.goodsModelSave(params)
      if (code === '20001') {
        createMessage.success('添加成功')
        emits('updateTable')
        closeModal()
      }
      confirmLoading.value = false
    } catch (e) {
      console.log(e)
      createMessage.error(e.message)
      confirmLoading.value = false
    }
  }
  const ModelEdit = async () => {
    try {
      let params = { ...formState.value }
      confirmLoading.value = true
      const { code } = await AdminHttp.GOODS.goodsModelUpdate(params)
      if (code === '20001') {
        createMessage.success('编辑成功')
        emits('updateTable')
        closeModal()
      }
      confirmLoading.value = false
    } catch (e) {
      console.log(e)
      createMessage.error(e.message)
      confirmLoading.value = false
    }
  }

  const modalCancel = () => {
    closeModal()
  }

  // 获取商品类别参数
  const classfyOptions = ref([])
  const getclassfy = async () => {
    try {
      const data = await getCategoryAllFunc()
      classfyOptions.value = data
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }
</script>

<style scoped></style>
