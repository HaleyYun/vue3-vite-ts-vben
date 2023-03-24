<template>
  <a-modal
    v-model:visible="visible"
    :confirmLoading="confirmLoading"
    :title="title"
    destroy-on-close
    width="800px"
    @cancel="cancelHandler"
    @ok="okHandler"
  >
    <div class="p-5">
      <a-form
        ref="formRef"
        :label-col="{ span: 6 }"
        :model="data.formState"
        :wrapper-col="{ span: 15 }"
        autocomplete="off"
        name="basic"
      >
        <a-form-item
          :rules="[{ required: true, message: '不可为空' }]"
          label="发动机型号"
          name="modelId"
        >
          <a-select
            v-model:value="data.formState.modelId"
            :default-active-first-option="false"
            :filter-option="false"
            :not-found-content="fetching ? undefined : null"
            :options="typeOptionData"
            allow-clear
            placeholder="请选择发动机型号"
            show-search
            @search="fetchTypeData"
          >
            <template v-if="fetching" #notFoundContent>
              <a-spin size="small" />
            </template>
          </a-select>
        </a-form-item>

        <a-form-item
          :rules="[{ required: true, message: '不可为空' }]"
          label="部件名称"
          name="unitId"
        >
          <a-select
            v-model:value="data.formState.unitId"
            :default-active-first-option="false"
            :filter-option="false"
            :not-found-content="fetchingService ? undefined : null"
            :options="serviceOptionData"
            allow-clear
            placeholder="请选择部件名称"
            show-search
            @search="fetchServiceData"
          >
            <template v-if="fetchingService" #notFoundContent>
              <a-spin size="small" />
            </template>
          </a-select>
        </a-form-item>
        <a-form-item
          :rules="[
            { required: true, message: '不可为空' },
            { pattern: Pattern.positive_number, message: '金额格式错误' },
          ]"
          label="运输损坏"
          name="repairAmount"
        >
          <a-input-number
            v-model:value="data.formState.repairAmount"
            :max="10000"
            :min="0"
            placeholder="请输入"
            style="width: 100%"
          >
            <template #addonAfter> 元</template>
          </a-input-number>
        </a-form-item>
        <a-form-item
          :rules="[
            { required: true, message: '不可为空' },
            { pattern: Pattern.positive_number, message: '金额格式错误' },
          ]"
          label="更换零部件"
          name="replaceAmount"
        >
          <a-input-number
            v-model:value="data.formState.replaceAmount"
            :max="10000"
            :min="0"
            placeholder="请输入"
            style="width: 100%"
          >
            <template #addonAfter> 元</template>
          </a-input-number>
        </a-form-item>
        <a-form-item
          :rules="[{ required: true, message: '不可为空' }]"
          label="换下旧件是否寄回"
          name="isSendBack"
        >
          <a-switch
            v-model:checked="data.formState.isSendBack"
            checked-children="是"
            un-checked-children="否"
          />
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
  import { computed, defineEmits, defineProps, onBeforeMount, reactive, ref, watch } from 'vue'
  import { _, Pattern } from '@vocen/shared'
  import AdminHttp from '/@/utils/http/adminHttp'
  import adminHttp from '/@/utils/http/adminHttp'
  import { message } from 'ant-design-vue'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";

  const formRef = ref()
  const visible = ref(false)
  const fetching = ref(false)
  const fetchingService = ref(false)
  const confirmLoading = ref(false)
  let timeout: any
  let timeoutService: any

  // 定义emits
  const emits = defineEmits(['update:show', 'refresh'])

  // 定义props
  const props = defineProps({
    show: {
      type: Boolean,
      default: false,
    },
    row: {
      type: Object,
      default() {
        return {}
      },
    },
  })

  // 是否编辑
  const edit = computed(() => !!props.row)

  // modal 标题
  const title = ref(edit.value ? '编辑售后补偿规则' : '新增售后补偿规则')

  const defaultFormState = {
    modelId: null,
    unitId: null,
    repairAmount: '',
    replaceAmount: '',
    isSendBack: true,
  }

  // 组件数据
  const data = reactive<any>({
    formState: _.cloneDeep(defaultFormState),
  })

  const typeOptionData = ref<any>([])
  const serviceOptionData = ref<any>([])

  // 监控
  watch(
    () => props.show,
    (val) => {
      title.value = props.row ? '编辑售后补偿规则' : '新增售后补偿规则'
      if (!edit.value) {
        // 新增逻辑
        data.formState = _.cloneDeep(defaultFormState)
      } else {
        // 修改逻辑
        data.formState = _.cloneDeep(props.row)
      }
      visible.value = val
    },
  )

  // 确认操作
  const okHandler = async () => {
    const formVal = await formRef.value.validate()
    // 完成数据设置-然后调用请求
    if (edit.value) {
      // 编辑
      try {
        confirmLoading.value = true
        const ret: any = await AdminHttp.GOODS.goodsModelCompensateUpdate({
          ...props.row,
          ...formVal,
        })
        confirmLoading.value = false
        if (+ret.code === 20001) {
          message.success('编辑成功')
          cancelHandler()
          emits('refresh')
        }
      } catch (e) {
        confirmLoading.value = false
        console.warn(e, 'ModelForm')
      }
    } else {
      // 新增
      try {
        confirmLoading.value = true
        const ret: any = await AdminHttp.GOODS.goodsModelCompensateSave(formVal)
        confirmLoading.value = false
        if (+ret.code === 20001) {
          message.success('创建成功')
          cancelHandler()
          emits('refresh')
        }
      } catch (e) {
        confirmLoading.value = false
        console.warn(e, 'ModelForm')
      }
    }
  }

  // 取消操作
  const cancelHandler = () => {
    emits('update:show', false)
  }

  // 更改变化 获取发动机型号数据
  const fetchTypeData = (keyword = '') => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }

    // 去请求数据
    timeout = setTimeout(async () => {
      fetching.value = true
      const { data } = await adminHttp.GOODS.goodsModelSelectList({
        keyword,
      })
      fetching.value = false
      typeOptionData.value = data.map((item) => {
        return {
          label: item.model,
          value: item.id,
        }
      })
    }, 300)
  }

  // 更改变化 获取发动机型号数据
  const fetchServiceData = (keyword = '') => {
    if (timeoutService) {
      clearTimeout(timeoutService)
      timeoutService = null
    }

    // 去请求数据
    timeoutService = setTimeout(async () => {
      fetchingService.value = true
      const { data } = await adminHttp.GOODS.goodsModelCompensateUnitList({
        keyword,
      })
      fetchingService.value = false
      serviceOptionData.value = Object.keys(data).map((item) => {
        return {
          label: data[item],
          value: item,
        }
      })
      console.log(serviceOptionData, 'xx')
    }, 300)
  }

  onMountedOrActivated(() => {
    // 服务范围数据
    fetchServiceData()
    // 立即拿数据
    fetchTypeData()
  })
</script>
