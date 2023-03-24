<template>
  <div class="pb-16px">
    <div class="template--title">基础信息</div>
    <div v-if="props.data.checkStatus == 4" class="pt-16px">
      <AButton type="primary" @click="modifyOperation">信息修改</AButton>
    </div>
  </div>
  <ADescriptions :column="2" :data="data" bordered :schema="basicesItem">
    <ADescriptionsItem
      v-for="(item, index) of basicesItem"
      :key="index + 'ADescriptionsItem'"
      :label="item.label"
    >
      <div v-if="item.field === 'bindInviteeStatus'" class="flex items-center justify-between">
        <div v-if="data.bindInviteeStatus" class="table-item__right">
          <div v-if="data.bindInviteeRole === 'agent'" class="mr-10px">{{
            data.bindInviteeName
          }}</div>
          <div class="mr-10px">{{ data.bindInviteeRealName }}</div>
          <div class="mr-10px">{{ data.bindInviteePhone }}</div>
          <div>{{ transferRoleName(data.bindInviteeRole) }}</div>
        </div>
      </div>
      <div v-else-if="item.field === 'bindPeople'" class="flex items-center justify-between">
        <div v-if="data.bindPhone" class="table-item__right">
          <div class="mr-10px">{{ data.bindRealName }}</div>
          <div class="mr-10px">{{ data.bindPhone }}</div>
          <div class="mr-10px">{{ data[item.field] }}</div>
          <AButton type="link" @click="removeBindFn(1)">解除绑定</AButton>
        </div>
        <div v-else class="table-item__right">
          <AButton type="link" @click="bindGarageFn(1)">未绑定</AButton>
        </div>
      </div>
      <div
        v-else-if="item.field === 'bindCommissionStatus'"
        class="flex items-center justify-between"
      >
        <div v-if="data.bindCommissionStatus" class="table-item__right">
          <!-- <div v-if="data.bindInviteeRole === 'agent'" class="w-100px !whitespace-nowrap">{{
            data.bindCommissionName
          }}</div> -->
           <div class="mr-10px">{{ data.bindCommissionName }}</div>
          <div class="mr-10px">{{ data.bindCommissionRealName }}</div>
          <div class="mr-10px">{{ data.bindCommissionPhone }}</div>
          <div>{{ transferRoleName(data.bindCommissionRole) }}</div>
          <AButton type="link" @click="removeBindFn(2)">解除绑定</AButton>
        </div>
        <div v-else class="table-item__right">
          <AButton type="link" @click="bindGarageFn(2)">未绑定</AButton>
        </div>
      </div>
      <div v-else-if="item.field === 'level'" class="flex items-center justify-between">
        <span>{{ data[item.field] }}</span>
        <a class="ml-20px" @click="CheckLevel(2)" v-auth="'/v1/grant/record/list'">查看明细</a>
      </div>
      <div v-else-if="item.field === 'storeName'">
        <span>{{ data[item.field] }}</span>
        <AButton class="ml-10px" type="link" @click.stop="setVisible(true)">查看门头</AButton>
        <div class="image-show">
          <a-image
            :src="data.storeUrl"
            :style="{ display: 'none' }"
            :preview="{
              visible,
              onVisibleChange: setVisible,
            }"
            :width="88"
          />
        </div>
      </div>
      <div v-else-if="item.field === 'integral'" class="flex items-center justify-between">
        <span>{{ data[item.field] }}</span>
        <a class="ml-20px" @click="CheckLevel(1)" v-auth="'/v1/grant/record/list'">查看明细</a>
      </div>
      <div v-else> {{ data[item.field] }}</div>
    </ADescriptionsItem>
  </ADescriptions>
  <a-modal
    v-model:visible="showBindBoo"
    cancelText="取消"
    okText="确认绑定"
    :title="bindInfoType === 1 ? '绑定人(服务商)' : '绑定人（分佣）'"
    @ok="toBindingSureFn"
  >
    <div>
      <div class="p-5">
        <div class="flex flex-vertical-c">
          <div class="m-r-2 w-120px text-right"> 请选择绑定人角色</div>
          <a-select
            v-model:value="bindInfo.platformCode"
            class="w-200px"
            @change="changePlatFormCodeFn"
            allow-clear
            placeholder="请输入绑定人角色"
          >
            <a-select-option v-if="bindInfoType === 2" value="supplier">供应商</a-select-option>
            <a-select-option value="agent">服务商</a-select-option>
            <a-select-option v-if="bindInfoType === 2" value="garage">修理厂</a-select-option>
            <a-select-option v-if="bindInfoType === 2" value="skilledWorker"
              >集师傅
            </a-select-option>
          </a-select>
        </div>
        <div class="flex flex-vertical-c">
          <div class="m-r-2 w-120px text-right"> 请选择绑定人</div>
          <a-select
            :default-active-first-option="false"
            :filter-option="false"
            :not-found-content="null"
            v-model:value="bindInfo.userName"
            :disabled="!bindInfo.platformCode"
            :options="bindInfo.data"
            class="w-200px"
            show-search
            allow-clear
            placeholder="请选择绑定人"
            @search="searchUserName"
          />
        </div>
      </div>
    </div>
  </a-modal>
  <a-modal
    v-model:visible="InformationVisible"
    width="800px"
    title="修理厂基本信息修改"
    destroy-on-Close
    @ok="InformationOk"
  >
    <div class="p-20px">
      <AForm ref="formRef" :model="formState" name="basic" autocomplete="off">
        <AFormItem :label-col="{ span: 4 }" :wrapper-col="{ span: 12 }" label="门头照片">
          <EraUpload
            uploadType="img"
            :fileListData="fileUrl"
            :maxSize="50"
            :maxNumber="1"
            uploadFuncChannel="localStore"
            :multiple="true"
            upload-tip="点击上传"
            @done="handleDone"
            @delete="handerUpDel"
          />
        </AFormItem>
        <AFormItem
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
          name="carSeries"
          label="主修车系"
        >
          <a-checkbox-group v-model:value="formState.carSeries" :options="seriesOptions" />
        </AFormItem>
        <AFormItem
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
          name="serviceProject"
          label="服务项目"
        >
          <a-checkbox-group v-model:value="formState.serviceProject" :options="serviceOptions" />
        </AFormItem>
        <AFormItem
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 12 }"
          name="locationNumber"
          label="工位数量"
        >
          <a-input
            class="w-230px"
            v-model:value="formState.locationNumber"
            :maxlength="3"
            controls
            style="width: 400px"
            placeholder="请输入工位数量"
            @change="changeNumber"
          />
        </AFormItem>
        <AFormItem
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 12 }"
          name="locationScale"
          label="规模(人)"
        >
          <a-input
            style="width: 400px"
            v-model:value="formState.locationScale"
            :maxlength="3"
            controls
            placeholder="请输入规模"
            @change="changeScale"
          />
        </AFormItem>
      </AForm>
    </div>
  </a-modal>

  <a-modal
    v-model:visible="removeBindingShow"
    cancelText="取消"
    okText="解除绑定"
    title="解除绑定"
    @ok="removeBindingSureFn"
  >
    <div class="p-5">
      该操作会导致修理厂再次下单后，绑定人无法获取新订单的分佣收益，已支付订单可继续获得订单分佣收益，确定要解除绑定人关系吗？
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref, defineProps, defineEmits, reactive, onMounted } from 'vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import EraUpload from '/@/components/EraUpload/EraUpload.vue'
  import { basicesItem } from '/@/modules/CustomerModule/Garage/view/GarageList/view/data/StaffManagementData'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { useRouter, useRoute } from 'vue-router'
  import { transferRoleName } from '/@/utils'
  import { Pattern } from '@vocen/shared'
  import { message } from 'ant-design-vue'
  const formState = reactive<FormState>({
    carSeries: [],
    serviceProject: [],
    locationNumber: 0,
    locationScale: 0,
  })
  interface FormState {
    carSeries: any
    serviceProject: any
    locationNumber: any
    locationScale: any
  }
  const fileUrl = ref([])
  const seriesOptions = ref<any>([]) //车系
  const serviceOptions = ref<any>([]) //服务项目
  const bindInfoType = ref(1)
  let timeout = null
  const InformationVisible = ref<boolean>(false)
  const router = useRouter()
  const route = useRoute()
  const { createMessage } = useMessage()
  const emit = defineEmits(['update'])
  const props = defineProps({
    data: {
      type: Object,
      default() {
        return {}
      },
    },
  })
  const loadingCtxkey = 'handlerRow'
  const visible = ref<boolean>(false)
  const setVisible = (value): void => {
    if (props.data.storeUrl == '') {
      message.error('暂未上传门头图片')
      return
    }
    visible.value = value
  }

  // 查看明细
  const CheckLevel = (type) => {
    //UseLevelDetail
    router.push({
      path: '/customerModule/garageRouter/GarageReport',
      query: {
        userId: props.data.userId,
        type: type,
        companyId: props.data.id,
        level: props.data.level,
      },
    })
  }
  // 解除绑定人相关
  const removeBindingShow = ref(false)
  const removeBindFn = (type) => {
    removeBindingShow.value = true
    bindInfoType.value = type
  }

  /**
   * 确认接触绑定
   */
  const removeBindingSureFn = () => {
    if (bindInfoType.value === 1) {
      adminHttp
        .companyInfoRemoveBinder({
          id: props.data.id,
          oldBinderId: props.data.bindingCompanyId,
          newBinderId: props.data.platformCode,
        })
        .then(() => {
          emit('update')
          removeBindingShow.value = false
          createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        })
        .catch(() => {})
    }
    if (bindInfoType.value === 2) {
      adminHttp.COMPANY.companyInfoRemoveRelation({
        id: props.data.id,
        oldBinderId: props.data.bindCommissionCompanyId,
      })
        .then(() => {
          emit('update')
          removeBindingShow.value = false
          createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        })
        .catch(() => {})
    }
  }

  const showBindBoo = ref(false)
  const bindInfo = ref<any>({
    platformCode: null,
    userName: null,
    data: [],
  })

  const bindGarageFn = (type) => {
    bindInfo.value.platformCode = null
    bindInfo.value.userName = null
    bindInfoType.value = type
    showBindBoo.value = true
  }

  /**
   * 绑定人
   */
  const toBindingSureFn = () => {
    if (!bindInfo.value.platformCode) {
      createMessage.error({ content: `请选择绑定人角色`, key: loadingCtxkey })
      return
    }
    if (!bindInfo.value.userName) {
      createMessage.error({ content: `请选择绑定人`, key: loadingCtxkey })
      return
    }
    if (bindInfoType.value === 1) {
      adminHttp
        .companyInfoChangeBinder({
          id: props.data.id,
          oldBinderId: props.data.bindingCompanyId,
          newBinderId: bindInfo.value.userName,
        })
        .then(({ code }) => {
          if (+code === 20001) {
            emit('update')
            showBindBoo.value = false
            createMessage.success({ content: `操作成功`, key: loadingCtxkey })
          }
        })
        .catch(() => {})
    }

    if (bindInfoType.value === 2) {
      adminHttp.COMPANY.companyInfoChangeRelation({
        id: props.data.id,
        oldBinderId: props.data.bindingCompanyId,
        newBinderId: bindInfo.value.userName,
      })
        .then(({ code }) => {
          if (+code === 20001) {
            emit('update')
            showBindBoo.value = false
            createMessage.success({ content: `操作成功`, key: loadingCtxkey })
          }
        })
        .catch((err) => {})
    }
  }

  // 模糊搜索名称
  const searchUserName = (userName) => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }

    timeout = setTimeout(() => {
      getPlatListFn({ userName })
    }, 300)
  }

  const getPlatListFn = (info = {}) => {
    let param: any = {
      pageSize: 100,
      pageNo: 1,
      platformCode: bindInfo.value.platformCode,
      isCommission: +bindInfoType.value === 2,
      ...info,
    }
    adminHttp.CUSTOMER.companyInfoSelectPage(param).then((res) => {
      bindInfo.value.data = []
      res.data.records.map((item) => {
        bindInfo.value.data.push({
          label: item.realName + item.userName,
          value: item.companyId,
        })
      })

      console.log(bindInfo.value.data, 'bindInfo.value.databindInfo.value.data')
    })
  }
  const changePlatFormCodeFn = () => {
    getPlatListFn()
  }

  //解除绑定人结束

  adminHttp.apiRolePage({ companyId: route.query?.id }).then(() => {})
  //信息修改
  //确定
  const InformationOk = () => {
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    adminHttp.COMPANY.companyInfoGarageBaseUpdate({
      id: props.data.id,
      // carSeries: formState.carSeries.toString(),
      carSeries: formState.carSeries === null ? '' : formState.carSeries.toString(),
      locationNumber: formState.locationNumber === '' ? 0 : formState.locationNumber,
      scale: formState.locationScale === '' ? 0 : formState.locationScale,
      // serviceProject: formState.serviceProject.toString(),
      serviceProject: formState.serviceProject === null ? '' : formState.serviceProject.toString(),
      storeUrl: fileUrl.value.toString(),
    })
      .then(() => {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        emit('update')
        InformationVisible.value = false
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
  }
  const modifyOperation = () => {
    formState.locationNumber = props.data.locationNumber
    formState.locationScale = props.data.scale
    formState.carSeries = props.data.carSeries
    formState.serviceProject = props.data.serviceProject
    if (props.data.storeUrl) {
      fileUrl.value = props.data.storeUrl.split(',')
    } else {
      fileUrl.value = []
    }
    InformationVisible.value = true
  }
  //获取车系
  const getSeries = async () => {
    try {
      const { code, data } = await adminHttp.COMPANY.companyInfoCarSeries()
      if (code == '20001') {
        seriesOptions.value = data
          ? data.map((item) => {
              return {
                label: item.name,
                value: item.code,
              }
            })
          : []
      }
    } catch (e) {
      console.log(e)
    }
  }
  //获取服务项目
  const getServiceItems = async () => {
    try {
      const { code, data } = await adminHttp.COMPANY.companyInfoServiceProject()
      if (code == '20001') {
        serviceOptions.value = data
          ? data.map((item) => {
              return {
                label: item.name,
                value: item.code,
              }
            })
          : []
      }
    } catch (e) {
      console.log(e)
    }
  }
  const handleDone = (info) => {
    fileUrl.value.push(info.file.filePath)
  }
  const handerUpDel = (record) => {
    console.log(record, fileUrl.value)
    fileUrl.value = fileUrl.value.filter((item) => item != record.url)
    console.log(fileUrl.value)
    fileUrl.value = []
  }
  //校验规模
  const changeScale = () => {
    if (!Pattern.isIntNumber(formState.locationScale)) {
      message.error('输入范围不正确，请输入1~999之间的数字')
      formState.locationScale = ''
    } else {
      formState.locationScale = formState.locationScale.replace(/\D/g, '').replace(/^0{1,}/g, '')
    }
  }
  //校验工位
  const changeNumber = () => {
    if (!Pattern.isIntNumber(formState.locationNumber)) {
      message.error('输入范围不正确，请输入1~999之间的数字')
      formState.locationNumber = ''
    } else {
      formState.locationNumber = formState.locationNumber.replace(/\D/g, '').replace(/^0{1,}/g, '')
    }
  }
  onMounted(() => {
    // 初始化数据
    getSeries()
    getServiceItems()
  })
</script>

<style scoped lang="less">
  .nickWidth {
    width: calc(100% - 60px);
  }
</style>
