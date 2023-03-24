<template>
  <AModal
    v-model:visible="props.visible"
    width="900px"
    :footer="null"
    :title="title"
    @ok="handleOk"
    destroy-on-close
    @cancel="cancel"
  >
    <div class="p-5">
      <div class="pb-20px text-black text-lg">{{ goodsName }}分润信息：</div>
      <AForm
        ref="formRef"
        layout="horizontal"
        :model="formObj"
        v-bind="formItemLayout"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <ARow>
          <ACol :span="12">
            <AFormItem
              v-for="(domain, index) in propsData"
              :key="index"
              labelAlign="left"
              :wrapper-col="{ span: 16 }"
              :labelCol="{ span: 5 }"
              :label="domain.name"
              :name="domain.key"
              :rules="[
                {
                  required: domain.isRequired,
                  message: `${domain.name}分润不能为空`,
                  trigger: 'change,blur',
                },
              ]"
            >
              <AInputNumber
                :precision="2"
                :min="0"
                :max="1000000"
                v-model:value="formObj[domain.key]"
                placeholder="请输入"
                addon-after="元"
              />
            </AFormItem>
          </ACol>
        </ARow>
        <a-form-item :wrapper-col="{ span: 14, offset: 10 }">
          <div class="pt-15px">
            <a-button type="primary" @click="handleOk">确定</a-button>
            <a-button style="margin-left: 10px" @click="cancel">取消</a-button>
          </div>
        </a-form-item>
      </AForm>
    </div>
  </AModal>
</template>

<script lang="ts" setup>
  import adminHttp from '/@/utils/http/adminHttp'
  import { reactive, ref, toRaw, watch, watchEffect } from 'vue'
  import type { Rule } from 'ant-design-vue/es/form'
  import { Pattern } from '@vocen/shared'
  import type { FormInstance } from 'ant-design-vue'
  import { object } from 'vue-types'
  // import { watch } from 'fs'
  const patterForm = ref()
  const formRef = ref()
  const props = defineProps({
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    width: {
      type: Number,
      default: 1300,
    },
    propsData: {
      type: Array,
    },
    goodsName: {
      type: String,
      default: '',
    },
    profitShare: {
      type: Array,
      default: [],
    },
  })
  const formObj = ref({})

  // const propsData = ref()
  const formItemLayout = ref({
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  })
  const getGoodsCaseId = (item) => {
    patterForm.value = item
  }
  const validateNum = async (_rule: Rule, value: string) => {
    if (!value) {
      return Promise.reject('请输入')
    }
    if (!Pattern.isNum(value)) {
      return Promise.reject('请输入数字')
    } else {
      return Promise.resolve()
    }
  }
  // console.log(propsData, '请输入数字请输入数字请输入数字请输入数字请输入数字')

  const emit = defineEmits(['update:visible', 'finish', 'setStatus'])

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }
  const getParentValue = (item) => {
    console.log(item, 'ITWEMITE#M')
  }
  const shareProfit = ref([])
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  const cancel = () => {
    emit('update:visible', false)
  }
  watch(
    () => props.visible,
    (val) => {
      if (val) {
        if (props.profitShare.length > 0) {
          props.profitShare.map((item) => {
            formObj.value[item.key] = item.value
          })
        } else {
          formObj.value = {}
        }
      }
    },
    { immediate: true },
  )
  ///v1/goods/template/profit
  const handleOk = () => {
    formRef.value
      .validate()
      .then((res) => {
        console.log(res, 'values')
        const formRet = Object.keys(res).map((item) => {
          return {
            key: item,
            value: res[item],
            type: props.propsData.find((p) => p.key === item).type,
          }
        })
        emit('finish', formRet)
        emit('update:visible', false)

        // console.log(formRet, 'xxxxx')
        // shareProfit.value = res
        // adminHttp
        //   .goodsTemplateProfit({ tempLateId: patterForm.value, shareProfit: formRet })
        //   .then(() => {
        //     emit('update:visible', false)
        //   })
        //   .catch((err) => {})
      })
      .catch((error) => {
        console.log('error', error)
      })
  }
  defineExpose({ getGoodsCaseId })
</script>

<style scoped lang="less">
  .benefit-box {
    .benefit-list {
      .benefit-item {
        display: flex;

        .benefit-item--label {
          width: 120px;
          text-align: center;
          font-size: 14px;
          font-weight: bold;
        }

        .benefit-item--content {
          flex: 1;
        }
      }
    }
  }
</style>
