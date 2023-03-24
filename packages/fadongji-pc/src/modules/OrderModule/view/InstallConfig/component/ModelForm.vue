<template>
  <a-modal
    width="800px"
    :title="title"
    destroy-on-close
    v-model:visible="visible"
    @ok="okHandler"
    @cancel="cancelHandler"
    :confirmLoading="confirmLoading"
  >
    <div class="p-5">
      <a-form
        :model="data.formState"
        name="basic"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 15 }"
        autocomplete="off"
        ref="formRef"
      >
        <a-form-item
          label="发动机型号"
          name="modelId"
          :rules="[{ required: true, message: '不可为空' }]"
        >
          <a-select
            v-model:value="data.formState.modelId"
            :options="typeOptionData"
            :not-found-content="fetching ? undefined : null"
            :default-active-first-option="false"
            :filter-option="false"
            placeholder="请选择发动机型号"
            allow-clear
            show-search
            @search="fetchTypeData"
            :disabled="edit"
          >
            <template v-if="fetching" #notFoundContent>
              <a-spin size="small" />
            </template>
          </a-select>
        </a-form-item>
        <a-form-item
          label="服务范围"
          name="supportArea"
          :rules="[{ required: true, message: '不可为空' }]"
        >
          <a-select
            :disabled="!data.formState.modelId"
            v-model:value="data.formState.supportArea"
            :options="data.serviceOptionData"
            placeholder="请选择服务范围"
            mode="multiple"
            show-search
            allow-clear
            :filter-option="filterServiceOption"
          />
        </a-form-item>
        <a-form-item
          label="集师傅佣金"
          name="masterAmount"
          :rules="[
            { pattern: Pattern.positive_number, message: '金额格式错误' },
            { validator: validateNum },
          ]"
        >
          <a-input
            style="width: 100%"
            v-model:value="data.formState.masterAmount"
            placeholder="请输入"
            :min="0"
            :max="10000"
            :parser="(item) => (+item).toFixed(2)"
          >
            <template #addonAfter> 元</template>
          </a-input>
        </a-form-item>
        <a-form-item
          label="平台佣金"
          name="platformAmount"
          :rules="[
            { required: true, message: '不可为空' },
            { pattern: Pattern.positive_number, message: '金额格式错误' },
            { validator: validateAmountNum },
          ]"
        >
          <a-input
            style="width: 100%"
            v-model:value="data.formState.platformAmount"
            placeholder="请输入"
            :min="0"
            :max="10000"
            :parser="(item) => (+item).toFixed(2)"
          >
            <template #addonAfter>元</template>
          </a-input>
        </a-form-item>
        <a-form-item
          name="installFee"
          :rules="[
            { required: true, message: '不可为空' },
            { pattern: Pattern.positive_number, message: '金额格式错误' },
          ]"
        >
          <template #label>
            <div>
              <span class="mr-5px">安装费</span>
              <a-tooltip>
                <template #title>
                  <div>
                    <div>安装费指修理厂安装一台机器时，需付费用。</div>
                    <div>安装费=平台佣金+集师傅佣金。</div>
                  </div>
                </template>
                <QuestionCircleOutlined />
              </a-tooltip>
            </div>
          </template>
          <a-input
            style="width: 100%"
            v-model:value="installFee"
            placeholder="请输入"
            :min="0"
            :max="10000"
            readonly
          >
            <template #addonAfter>元</template>
          </a-input>
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
  import { ref, defineProps, watch, reactive, computed, defineEmits, onBeforeMount } from 'vue'
  import { Pattern, _ } from '@vocen/shared'
  import AdminHttp from '/@/utils/http/adminHttp'
  import { message } from 'ant-design-vue'
  import { QuestionCircleOutlined } from '@ant-design/icons-vue'
  import { Rule } from 'ant-design-vue/es/form'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";

  const formRef = ref()
  const visible = ref(false)
  const fetching = ref(false)
  const confirmLoading = ref(false)
  let timeout: any

  // 定义emits
  const emits = defineEmits(['update:show', 'refresh'])

  // 定义props
  const props = defineProps({
    edit: {
      type: Boolean,
      default: false,
    },
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

  // 平台佣金判断
  let validateAmountNum = async (_rule: Rule, value: string) => {
    if (value === '') {
      return Promise.reject('平台佣金不能为空')
    } else {
      if (+value < 0) {
        return Promise.reject('平台佣金是大于等于0，最大10000')
      }
      if (+value > 10000) {
        return Promise.reject('平台佣金是大于等于0，最大1000')
      }
      return Promise.resolve()
    }
  }

  // 集师傅佣金判断
  let validateNum = async (_rule: Rule, value: string) => {
    if (value === '') {
      return Promise.reject('集师傅佣金不能为空')
    } else {
      if (+value <= 0) {
        return Promise.reject('集师傅佣金是大于0,最大10000')
      }
      if (+value > 10000) {
        return Promise.reject('集师傅佣金是大于0,最大10000')
      }
      return Promise.resolve()
    }
  }

  // 是否编辑
  const edit = computed(() => !!props.row)

  // modal 标题
  const title = ref(edit.value ? '编辑服务规则' : '新增服务规则')

  const defaultFormState = {
    modelId: null, // 型号ID
    supportArea: [], // 服务区域
    supportType: 32, // 服务类型 32：安装服务  33：回收服务
    masterAmount: '', // 集师傅佣金
    platformAmount: '', // 平台佣金
    installFee: '', // 安装费
  }
  const typeOptionData = ref<any>([])

  // 组件数据
  const data = reactive<any>({
    formState: _.cloneDeep(defaultFormState),
    serviceOptionData: [],
    typeOptionData: [],
  })

  // 安装费
  const installFee = computed(() => {
    if (data.formState.masterAmount && data.formState.platformAmount) {
      const installFee = (+data.formState.masterAmount + +data.formState.platformAmount).toFixed(2)
      data.formState.installFee = installFee
      return installFee
    } else {
      return ''
    }
  })

  // 对服务范围地区进行模糊本地搜索
  const filterServiceOption = (input: string, option: any) => {
    const reg = new RegExp(input)
    return reg.test(option.label)
  }

  // 监控
  watch(
    () => props.show,
    (val) => {
      title.value = props.row ? '编辑服务规则' : '新增服务规则'
      if (!edit.value) {
        // 新增逻辑
        data.formState = _.cloneDeep(defaultFormState)
      } else {
        // 修改逻辑
        data.formState = _.cloneDeep(props.row)
        data.formState.installFee = data.formState.masterAmount + data.formState.platformAmount
        console.log(data.formState)
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
        const ret: any = await AdminHttp.GOODS.goodsModelCommissionUpdate({
          ...props.row,
          ...formVal,
        })
        confirmLoading.value = false
        if (+ret.code === 20001) {
          message.success('编辑成功')
          emits('refresh')
          visible.value = false
        }
      } catch (e) {
        confirmLoading.value = false
        message.error(e.message)
        console.warn(e, 'ModelForm')
      }
    } else {
      // 新增
      try {
        confirmLoading.value = true
        const ret: any = await AdminHttp.GOODS.goodsModelCommissionSave({
          ...formVal,
          supportType: 32, // 服务类型 32：安装服务  33：回收服务
        })
        confirmLoading.value = false
        if (+ret.code === 20001) {
          message.success('添加成功')
          emits('refresh')
          cancelHandler()
        }
      } catch (e: any) {
        confirmLoading.value = false
        message.error(e.message)
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
      const { data } = await AdminHttp.GOODS.goodsModelSelectList({
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

  // 获取服务范围数据
  const fetchServiceData = async () => {
    const global = [
      {
        label: '全国',
        value: '86',
      },
    ]
    const ret = await AdminHttp.GOODS.goodsModelCommissionProvince()

    data.serviceOptionData = global.concat(
      ret.data.map((item) => {
        return {
          value: item.code,
          label: item.name,
        }
      }),
    )
  }

  onMountedOrActivated(() => {
    // 服务范围数据
    fetchServiceData()
    // 立即拿数据
    fetchTypeData()
  })
</script>
