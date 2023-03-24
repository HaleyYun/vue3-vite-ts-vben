<template>
  <div class="p-24px">
    <div v-if="detail" class="bg-white">
      <div class="page-table bg-white px-24px">
        <section class="rounded-md overflow-hidden">
          <div class="template--title my-16px">基础信息</div>
          <ADescriptions :column="3" :contentStyle="{ background: '#fff' }">
            <ADescriptionsItem :span="2" label="关联平台发动机型号">
              <div v-if="detail.modelCorrelation!=''  && detail.modelCorrelation!=null "> <span>{{ detail.modelCorrelation.toString()}}</span>
                <FormOutlined
                  :style="{ color: '#1890ff' }"
                  class="margin-l-10 text-blue-500"
                  @click="bindingDetail"
              />
            </div>
            <div v-else>
              <FormOutlined
                  :style="{ color: '#1890ff' }"
                  class="margin-l-10 text-blue-500"
                  @click="bindingNotDetail"
              />
            </div>
            </ADescriptionsItem>
            <ADescriptionsItem label="力洋ID">
              {{ detail.levelid }}
            </ADescriptionsItem>
            <ADescriptionsItem label="随车备注" :span="3">
              <div v-if="detail.modelCorrelation!=''  && detail.modelCorrelation!=null">
                {{ detail.remark }}
                <FormOutlined
                  :style="{ color: '#1890ff' }"
                  class="margin-l-10 text-blue-500"
                  @click="bindingDetail"
                />
              </div>
              <div v-else>
                {{ detail.remark }}
                <FormOutlined
                  :style="{ color: '#1890ff' }"
                  class="margin-l-10 text-blue-500"
                  @click="bindingRemarkDetail"
                />
              </div>
            </ADescriptionsItem>
            <ADescriptionsItem label="车型关联商品量">
              {{ detail.goodsNumber }}
            </ADescriptionsItem>
          </ADescriptions>
        </section>
      </div>
      <div class="page-table bg-white px-24px pb-30px mb-30px">
        <section class="rounded-md mt-3 overflow-hidden">
          <div class="template--title my-16px">车型库配置信息</div>
          <ADescriptions :column="2" :contentStyle="{ background: '#fff' }" bordered>
            <ADescriptionsItem label="品牌">
              {{ detail.brand }}
            </ADescriptionsItem>
            <ADescriptionsItem label="销售名称">
              {{ detail.salesName }}
            </ADescriptionsItem>
            <ADescriptionsItem label="发动机型号">
              {{ detail.engineModel }}
            </ADescriptionsItem>
            <ADescriptionsItem label="厂家">
              {{ detail.manufactor }}
            </ADescriptionsItem>
            <ADescriptionsItem label="气缸容积">
              {{ detail.cylinderVolume }}
            </ADescriptionsItem>
            <ADescriptionsItem label="车系">
              {{ detail.series }}
            </ADescriptionsItem>
            <ADescriptionsItem label="气缸排列形式">
              {{ detail.cylinderArrangement }}
            </ADescriptionsItem>
            <ADescriptionsItem label="车型">
              {{ detail.model }}
            </ADescriptionsItem>
            <ADescriptionsItem label="进气形式">
              {{ detail.induction }}
            </ADescriptionsItem>
            <ADescriptionsItem label="排量">
              {{ detail.displacement }}
            </ADescriptionsItem>
            <ADescriptionsItem label="年款">
              {{ detail.year }}
            </ADescriptionsItem>
            <ADescriptionsItem label="气缸数">
              {{ detail.cylinders }}
            </ADescriptionsItem>
            <ADescriptionsItem label="排放标准">
              {{ detail.emissionStandard }}
            </ADescriptionsItem>
            <ADescriptionsItem label="每缸气门数（个）">
              {{ detail.valvesPerCylinder }}
            </ADescriptionsItem>
            <ADescriptionsItem label="车辆类型">
              {{ detail.vehicleType }}
            </ADescriptionsItem>
            <ADescriptionsItem label="缸径">
              {{ detail.bore }}
            </ADescriptionsItem>
            <ADescriptionsItem label="燃油类型">
              {{ detail.fuelType }}
            </ADescriptionsItem>
            <ADescriptionsItem label="驱动方式">
              {{ detail.driveMode }}
            </ADescriptionsItem>
            <ADescriptionsItem label="燃油标号"> {{ detail.fuelGrade }} </ADescriptionsItem
            ><ADescriptionsItem label="驱动形式">
              {{ detail.driveModel }}
            </ADescriptionsItem>
            <ADescriptionsItem label="最大功率(KW)">
              {{ detail.powerKw }}
            </ADescriptionsItem>
            <ADescriptionsItem label="供油方式">
              {{ detail.compressionRatio }}
            </ADescriptionsItem>
            <ADescriptionsItem label="冲程">
              {{ detail.stroke }}
            </ADescriptionsItem>
            <ADescriptionsItem label="车辆级别">
              {{ detail.vehicleSize }}
            </ADescriptionsItem>
            <ADescriptionsItem label="整备质量(Kg)">
              {{ detail.curbWeight }}
            </ADescriptionsItem>
            <ADescriptionsItem label="压缩比">
              {{ detail.fueliInjection }}
            </ADescriptionsItem>
            <ADescriptionsItem label="变速器类型">
              {{ detail.transmissionType }}
            </ADescriptionsItem>
            <ADescriptionsItem label="发动机描述">
              {{ detail.engineDescription }} </ADescriptionsItem
            ><ADescriptionsItem label="档位数">
              {{ detail.gearNumber }}
            </ADescriptionsItem>
            <ADescriptionsItem label="发动机特有技术">
              {{ detail.engineKnowhow }}
            </ADescriptionsItem>
            <ADescriptionsItem label="变速器描述">
              {{ detail.transmissionDescription }}
            </ADescriptionsItem>
            <ADescriptionsItem label="发动机位置">
              {{ detail.engineLocation }}
            </ADescriptionsItem>
            <ADescriptionsItem label="油箱容积">
              {{ detail.fuelTankCapacity }}
            </ADescriptionsItem>
            <ADescriptionsItem label="代数（换代）">
              {{ detail.generation }}
            </ADescriptionsItem>
            <ADescriptionsItem label="车门数">
              {{ detail.doors }}
            </ADescriptionsItem>
            <ADescriptionsItem label="车顶型式">
              {{ detail.roofType }}
            </ADescriptionsItem>
            <ADescriptionsItem label="座位数">
              {{ detail.seats }}
            </ADescriptionsItem>
            <ADescriptionsItem label="最大载重质量">
              {{ detail.maxLoading }}
            </ADescriptionsItem>
            <ADescriptionsItem label="车身型式">
              {{ detail.bodyType }}
            </ADescriptionsItem>
            <ADescriptionsItem label="生产年份">
              {{ detail.producedYear }}
            </ADescriptionsItem>
            <ADescriptionsItem label="行李箱容积">
              {{ detail.luggagePlace }}
            </ADescriptionsItem>
            <ADescriptionsItem label="国别">
              {{ detail.country }}
            </ADescriptionsItem>
          </ADescriptions>
        </section>
      </div>
    </div>
  </div>
  <AModal
    v-model:visible="motorcycleModal.visible"
    width="600px"
    :title="motorcycleModal.title"
    centered
    destroy-on-close
    :confirm-loading="motorcycleModal.confirmLoading"
    @ok="BrandsAdd"
    @cancel="BrandsCancel"
  >
    <div class="p-15px">
      <AForm
        ref="formRef"
        :model="formState"
        name="basic"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 14 }"
        autocomplete="off"
      >
        <AFormItem label="选择型号" name="brandLoGo">

          <a-select
            v-model:value="formState.brandLoGo"
            mode="multiple"
            placeholder="请选择型号"
            :options="classData"
            show-search
            :max-tag-count="8"
            allow-clear
            :filter-option="false"
            :not-found-content="fetchStoreing ? undefined : null"
            @search="onStorageSearch"
          />
          <template v-if="fetchStoreing" #notFoundContent>
          <a-spin size="small" />
        </template>
        </AFormItem>
        <AFormItem label="随车备注" name="brandName">
          <a-textarea
            :rows="4"
            v-model:value="formState.brandName"
            :maxlength="50"
            placeholder="请输入随车备注"
            show-count
            allow-clear
          />
        </AFormItem>
      </AForm>
    </div>
  </AModal>
</template>

<script lang="ts" name="ConfigurationDetails" setup>
  import { _ } from '@vocen/shared'
  import { ref, onBeforeMount, reactive } from 'vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import { useRoute } from 'vue-router'
  import { FormOutlined } from '@ant-design/icons-vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  const { createMessage } = useMessage()
  let classData = ref([] as any[])
  interface FormState {
    brandName: any
    brandLoGo: any
  }
  const fetchStoreing = ref(false)
  const formRef = ref<any>()
  const formState = reactive<FormState>({
    brandName: '',
    brandLoGo: [],
  })
  //绑定
  const motorcycleModal = reactive({
    visible: false,
    title: '关联平台发动机型号',
    currentItem: null,
    correlationId: '',
    confirmLoading: false,
    currentId: '',
  })
  const detail = ref<any>(null)
  const route = useRoute()
  const loadTableData = async () => {
    try {
      const { data } = await adminHttp.VEHICLE.communityVehicleModelModelDetail({
        levelid: route.query.id,
      })

      detail.value = data
    } catch (e: any) {
      console.log(e)
      console.warn(e?.message || e?.data?.message || e?.error || '服务端错误')
    }
  }
  onBeforeMount(() => {
    loadTableData()
    getClassData()
  })
  const bindingDetail = () => {
    formState.brandLoGo = detail.value.modelCorrelationId.split(',')
    formState.brandName = detail.value.remark
    motorcycleModal.currentId = detail.value.levelid
    motorcycleModal.correlationId = detail.value.correlationId ? detail.value.correlationId : ''
    motorcycleModal.visible = true
  }
  const bindingRemarkDetail=() => {
    formState.brandLoGo = []
    formState.brandName = detail.value.remark
    motorcycleModal.visible = true
    motorcycleModal.currentId = detail.value.levelid
  }
  const bindingNotDetail = () => {
    formState.brandLoGo = []
    formState.brandName = ''
    motorcycleModal.currentId = detail.value.levelid
    motorcycleModal.correlationId = detail.value.correlationId ? detail.value.correlationId : ''
    motorcycleModal.visible = true
  }
  //点击确定
  const BrandsAdd = async () => {
    let paramsData = {
      modelId: formState.brandLoGo,
      remark: formState.brandName,
      levelId: motorcycleModal.currentId,
      // id: motorcycleModal.correlationId,
    }
    try {
      const { code } = await adminHttp.VEHICLE.communityVehicleModelBindBatchModel([paramsData])
      if (+code == 20001) {
        loadTableData()
        motorcycleModal.visible = false
        formState.brandLoGo = []
        formState.brandName=''
      }
    } catch (e: any) {
      console.log(e)
      console.warn(e?.message || e?.data?.message || e?.error || '服务端错误')
    }
  }
  //获取型号
  const getClassData = async (keyword:string) => {
    try {
      fetchStoreing.value = true
      const res = await adminHttp.GOODS.goodsModelSelectList({ pageSize: 999999 ,keyword})
      if (res.code === '20001') {
        classData.value = res.data.map((item) => ({
          label: item.model,
          value: item.id,
        }))
        fetchStoreing.value = false
      } else {
        createMessage.error('操作失败')
      }
    } catch (err: any) {}
  }
  const onStorageSearch = _.debounce(getClassData, 300)
  const BrandsCancel = () => {
    motorcycleModal.visible = false
    formState.brandName = ''
    formState.brandLoGo = []
  }
</script>

<style lang="less" scoped>
  ::v-deep(.ant-steps-item-description) {
    width: 127px !important;
  }

  ::v-deep(.ant-tabs-bar) {
    margin: 0 !important;
  }
</style>
