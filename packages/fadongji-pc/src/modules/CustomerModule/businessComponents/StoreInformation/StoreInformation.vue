<template>
  <div>
    <a-form :label-col="{ span: 24 }" :wrapper-col="{ span: 24 }">
      <a-row>
        <a-col :span="5" :offset="1">
          <a-form-item label="店铺名称" class="pb-20px">
            <div class="w-full">
              <a-input :value="info.storeName" disabled />
            </div>
          </a-form-item>
          <a-form-item label="简称">
            <div class="w-full">
              <a-input
                v-model:value="storeShortName"
                :maxlength="10"
                @blur="saveInfo('storeShortName')"
              />
            </div>
          </a-form-item>
          <a-form-item label="收藏人数">
            <a-input
              disabled
              v-if="info.storeCollectNum"
              :value="info.storeCollectNum + '人已收藏'"
            />
            <div v-else>暂无</div>
          </a-form-item>
        </a-col>
        <a-col :span="5" :offset="1">
          <a-form-item label="商品综合评价">
            <a-rate :value="info.merchantEvaluate" disabled />
            <span class="ant-rate-text">{{ info.merchantEvaluate }}分</span>
          </a-form-item>
          <a-form-item label="店家服务">
            <a-rate :value="info.storeServe" disabled />
            <span class="ant-rate-text">{{ info.storeServe }}分</span>
          </a-form-item>
          <a-form-item label="物流履约">
            <a-rate :value="info.physicalAgreement" disabled />
            <span class="ant-rate-text">{{ info.physicalAgreement }}分</span>
          </a-form-item>
        </a-col>
        <a-col :span="5" :offset="1">
          <a-form-item label="店铺LOGO" :span="1">
            <div>
              <FormLocalUpload v-model:value="info.storeUrl" @success="successStoreUrl">
                <div>
                  <a-avatar :size="100" :src="info.storeUrl" />
                  <div class="mt-20px">
                    <a-button class="ml-15px" @click="isEditStoreUrl = true">点击更换</a-button>
                  </div>
                </div>
              </FormLocalUpload>
            </div>
            <div v-if="false">
              <a-avatar :size="100" :src="info.storeUrl" />
              <div class="mt-20px">
                <a-button class="ml-15px" @click="isEditStoreUrl = true">点击更换</a-button>
              </div>
            </div>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>

    <ADescriptions :column="2" layout="vertical" />
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import { useMessage } from '/@/hooks/web/useMessage'
  import FormLocalUpload from '/@/modules/components/FormLocalUpload.vue'

  const { createMessage } = useMessage()
  const props = defineProps({
    companyId: {
      type: String,
      default: '',
    },
  })
  const storeShortName = ref('') // 编辑的店铺简称

  // 保存 店铺名称 店铺简称信息
  const saveInfo = async (type) => {
    if (storeShortName.value.trim() == '') {
      createMessage.warning('店铺简称不能为空')
      return
    }
    let params = {
      id: props.companyId,
      storeName: storeShortName.value,
    }
    try {
      const { code, message } = await AdminHttp.COMPANY.companyInfoManageUpdate(params)
      if (code === '20001') {
        createMessage.success('修改成功')
        getStoreInfo()
      } else {
        createMessage.error(message)
      }
    } catch (e) {
      console.log(e)
    }
  }

  // 更换店铺logo
  const isEditStoreUrl = ref(false)
  const successStoreUrl = async (data) => {
    info.value.storeUrl = data.filePath
    let params = {
      id: props.companyId,
      storeUrl: data.filePath,
    }
    try {
      const { code, message } = await AdminHttp.COMPANY.companyInfoManageUpdate(params)
      if (code === '20001') {
        createMessage.success('修改成功')
        getStoreInfo()
        isEditStoreUrl.value = false
      } else {
        createMessage.error(message)
      }
    } catch (e) {
      console.log(e)
    }
  }

  // 获取详情数据
  const info = ref({})
  const getStoreInfo = async () => {
    try {
      let params = { companyId: props.companyId }
      const { code, data } = await AdminHttp.COMPANY.companyInfoStoreInfoBy$CompanyId(params)
      if (code === '20001') {
        info.value = data
        storeShortName.value = info.value.storeName
      }
    } catch (e) {
      console.log(e)
    }
  }
  watch(
    () => props.companyId,
    (newValue) => {
      getStoreInfo()
    },
    { deep: true, immediate: true },
  )
</script>

<style scoped lang="less"></style>
