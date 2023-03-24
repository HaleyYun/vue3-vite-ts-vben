<template>
 <div>
  <div>
    <ADescriptions :column="2" :data="info"  bordered :schema="descItem">
      <ADescriptionsItem
        v-for="(item, index) of descItem"
        :key="index + 'ADescriptionsItem'"
        :label="item.label"
      >
        <div v-if="item.field == 'level'" class="flex items-center justify-between">
          <span>{{ info[item.field] }}</span>
          <a class="ml-20px" @click="assetsReport()">查看明细</a>
        </div>
        <div v-else-if="item.field == 'address'">
          <span class="mr-5px">{{ info['areaStr'] ? info['areaStr'] : '' }}</span>
          <span>{{ info['address'] ? info['address'] : '--' }}</span>
        </div>
        <div v-else-if="item.field == 'channelManagerName'">
          <span>{{ info['channelManagerName'] ? info['channelManagerName'] : '--' }}</span>
          <AButton class="ml-20px" type="link" @click="editDetails(info)">编辑</AButton>
        </div>
        <div v-else-if="item.field == 'agentNum'">
            <a class="ml-20px" @click="seeFullName">{{ info[item.field] }}</a>
        </div>
        <div v-else> {{ info[item.field] }}</div>
      </ADescriptionsItem>
    </ADescriptions>
  </div>
  <AModal
    v-model:visible="editModal.visible"
    :title="editModal.title"
    centered
    destroy-on-close
    @ok="categoryAdd"
    @cancel="BrandsCancel"
  >
    <div class="p-5">
      <AForm
        ref="formRef"
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 14 }"
        autocomplete="off"
      >
        <template v-if="props.type == 'supplier'">
          <AFormItem
            name="select"
            label="招商经理"
            :rules="[{ required: true, message: '请选择招商经理' }]"
          >
            <a-select
              v-model:value="formState.select"
              placeholder="请选择招商经理"
              :options="classData"
              @change="onChange"
            />
          </AFormItem>
        </template>
        <template v-else>
          <AFormItem
            name="select"
            label="渠道经理"
            :rules="[{ required: true, message: '请选择渠道经理' }]"
          >
            <a-select
              v-model:value="formState.select"
              placeholder="请选择渠道经理"
              :options="classData"
              @change="onChange"
            />
          </AFormItem>
        </template>
      </AForm>
    </div>
  </AModal>
 </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, onBeforeMount, defineProps, defineEmits, watch } from 'vue'
  import { Description } from '/@/components/Description/index'
  import { DescItemData,DescData} from './data/configuration'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { useRouter ,useRoute} from 'vue-router'
  import adminHttp from '/@/utils/http/adminHttp'
  import type { FormInstance } from 'ant-design-vue'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";
  const { createMessage } = useMessage()
  const loadingCtxkey = 'handlerRow'
  const go = useRouter()
  const route = useRoute()
  const emit = defineEmits(['levelDetail', 'refresh'])
  const props = defineProps({
    info: {
      type: Object,
      default: {},
    },
    type: {
      type: String,
      default: false,
    },
  })
  const descItem = ref([...DescItemData])
  watch(
    () => props.type,
    (val) => {
      console.log(val)
      if (props.type == 'OldBuyers') {
        descItem.value = descItem.value.filter(
          (item) => item.field != 'level' && item.field != 'channelManagerName'  && item.field != 'agentNum',
        )
      } else if (props.type == 'supplier') {
        descItem.value[descItem.value.length - 1] = {
          field: 'channelManagerName',
          label: '招商经理',
          labelMinWidth: 120,
        }
      } else {
        
        descItem.value = DescData
      }
    },
    { immediate: true },
  )

  const assetsReport = () => {
    emit('levelDetail')
  }
  const seeFullName = () => {
        go.push({
          path: '/customerModule/supplier/serviceProvider',
          query: {
            id: route.query.id,
          },
        })
      }
  //修改招商经理
  let editBrand = {
    id: '',
    channelManagerId: '',
  }
  const companyId = ref<any>('')
  const classData = ref([] as any[])
  const formState = reactive<FormState>({
    select: null,
  })
  const editTitle = ref<any>('编辑招商经理')
  const formRef = ref<FormInstance | undefined>()
  const editModal = reactive({
    visible: false,
    title: editTitle,
  })
  const editDetails = async (record) => {
    console.log(record, 'record')
    if (props.type == 'supplier') {
      editTitle.value = '编辑招商经理'
    } else {
      editTitle.value = '编辑渠道经理'
    }
    formState.select = record.channelManagerName
    editBrand.id = record.id
    editBrand.channelManagerId = record.channelManagerId
    editModal.visible = true
  }
  const categoryAdd = () => {
    formRef.value.validate().then(() => {
      createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
      adminHttp.COMPANY.companyInfoChangeManager({
        bindingType: 1,
        id: editBrand.id,
        oldBinderId: editBrand.channelManagerId ? editBrand.channelManagerId : '',
        newBinderId: companyId.value,
      })
        .then(() => {
          createMessage.success({ content: `操作成功`, key: loadingCtxkey })
          // item.status = 1
          emit('refresh')
          editModal.visible = false
          formState.select = null
        })
        .catch((err) => {
          createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
        })
    })
  }
  const onChange = (item) => {
    companyId.value = item
  }
  //取消
  const BrandsCancel = () => {
    editModal.visible = false
  }
  //角色下拉
  const getClassDataEvent = async () => {
    let param = {}
    if (props.type == 'supplier') {
      param = {
        platformCode: 'investmentManager',
        realName: '',
      }
    } else {
      param = {
        platformCode: 'channelManager',
        realName: '',
      }
    }
    try {
      const res = await adminHttp.CUSTOMER.companyInfoSelectPage(param)
      if (res.code === '20001') {
        classData.value = []
        classData.value = res.data.records.map((item) => ({
          label: item.realName + item.userName,
          value: item.companyId,
        }))
        console.log(classData.value)
      } else {
        createMessage.error('操作失败')
      }
    } catch (err: any) {}
  }

  onMountedOrActivated(() => {
    getClassDataEvent()
  })
</script>

<style scoped lang="less">
  ::v-deep(.ant-descriptions-item-content) {
    width: 30%;
  }
</style>
