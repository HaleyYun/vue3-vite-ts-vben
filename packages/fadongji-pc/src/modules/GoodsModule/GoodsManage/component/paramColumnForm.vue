<template>
  <AModal
    v-model:visible="show"
    width="900px"
    :title="title"
    @ok="handleOk"
    destroy-on-close
    @cancel="cancel"
  >
    <div class="p-10 w-full mx-auto max-h-70vh overflow-y-auto">
      <AForm ref="formRef" layout="horizontal" :model="formObj" v-bind="formItemLayout">
        <ARow>
          <ACol :span="24">
            <AFormItem
              v-for="(domain, index) in propsData"
              :key="index"
              labelAlign="left"
              :labelCol="{ span: 5 }"
              :label="domain.name"
              :name="domain.id"
              :rules="[
                {
                  required: domain.isRequired,
                  message: `${domain.name}不能为空`,
                  trigger: 'change,blur',
                },
              ]"
            >
              <template v-if="domain.entryMethod === 1">
                <a-select v-model:value="formObj[domain.id]" placeholder="请选择" allow-clear>
                  <a-select-option v-for="(l, i) in domain.values" :key="i" :value="l.value">
                    {{ l.label }}
                  </a-select-option>
                </a-select>
              </template>
              <template v-else>
                <AInput
                  v-model:value="formObj[domain.id]"
                  placeholder="请输入"
                  :addon-after="domain.unit"
                  allow-clear
                />
              </template>
            </AFormItem>
          </ACol>
        </ARow>
      </AForm>
    </div>
  </AModal>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue'

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
      default() {
        return []
      },
    },
    pramProperties: {
      type: Array,
      default() {
        return []
      },
    },
  })
  let formObj = ref({})

  const show = ref(props.visible)

  // const propsData = ref()
  const formItemLayout = ref({
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  })
  const getGoodsCaseId = (item) => {
    patterForm.value = item
  }

  const emit = defineEmits(['update:visible', 'finish', 'setStatus'])

  const cancel = () => {
    emit('update:visible', false)
  }
  const handleOk = () => {
    formRef.value
      .validate()
      .then(() => {
        let arr: any = []
        console.log(formObj)
        arr = Object.keys(formObj.value).map((item) => {
          return {
            key: item,
            value: formObj.value[item],
          }
        })
        console.log(arr)
        emit('finish', arr)
        emit('update:visible', false)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  watch(
    () => props.visible,
    (val) => {
      show.value = val
      console.log(val, props.pramProperties, formObj.value)
      if (val && props.pramProperties.length > 0) {
        props.pramProperties.map((item) => {
          formObj.value[item.key] = item.value
          return item
        })
      } else {
        formObj.value = {}
      }
    },
    { immediate: true },
  )

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
