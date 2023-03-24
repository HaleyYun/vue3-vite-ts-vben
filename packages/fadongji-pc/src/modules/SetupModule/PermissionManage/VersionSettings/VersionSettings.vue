<template>
  <div class="mx-24px mt-20px mb-24px">
    <div class="my-24px bg-white p-24px pb-4px">
      <div class="template--title mb-20px">APP版本号管理</div>
      <div class="px-24px py-32px">
        <AForm
          layout="inline"
          ref="formRef"
          :model="formState"
          name="basic"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 19 }"
          autocomplete="off"
        >
          <AFormItem label="安卓" name="classRole">
            <AInput
              v-model:value="formState.AndroidCode"
              :maxlength="10"
              placeholder="请输入安卓版本号"
            />
          </AFormItem>
          <AFormItem label="IOS" name="describe">
            <AInput v-model:value="formState.IOSCode" placeholder="请输入IOS版本号" />
          </AFormItem>
          <AFormItem>
            <a-button type="primary" class="ml-20px" @click="submit">保存</a-button>
          </AFormItem>
        </AForm>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onBeforeMount, reactive } from 'vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import { useMessage } from '/@/hooks/web/useMessage'

  const { createMessage } = useMessage()
  const loadingCtxkey = 'handlerRow'

  interface FormState {
    IOSCode: any
    AndroidCode: any
  }

  const formRef = ref<any>()
  const formState = reactive<FormState>({
    IOSCode: '',
    AndroidCode: '',
  })
  //----- 加载列表数据 ---------
  const IOSCodeList = ref<any>({})
  const AndroidList = ref<any>({})
  const tableLoading = ref(false)
  const loadTableData = async () => {
    try {
      tableLoading.value = true
      const { code, data } = await AdminHttp.ROLE.versionCurrentVersion()
      if (code === '20001') {
        IOSCodeList.value = data.find((item) => item.channel === 2)
        AndroidList.value = data.find((item) => item.channel === 1)
        formState.IOSCode = IOSCodeList.value.versionNum
        formState.AndroidCode = AndroidList.value.versionNum
      }
      tableLoading.value = false
    } catch (e) {
      console.log(e)
      tableLoading.value = false
    }
  }

  const submit = async () => {
    try {
      const params = [
        { id: '2', versionNum: formState.IOSCode },
        { id: '1', versionNum: formState.AndroidCode },
      ]
      const { code } = await AdminHttp.ROLE.versionSave(params)
      if (code == '20001') {
        await loadTableData()
        createMessage.success({ content: `保存成功`, key: loadingCtxkey })
      }
    } catch (err) {
    } finally {
    }
  }
  onBeforeMount(() => {
    // 初始化数据
    loadTableData()
  })
</script>

<style scoped lang="less"></style>
