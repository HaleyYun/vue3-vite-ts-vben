<template>
  <div class="p-20px bg-white mb-82px">
    <div class="mx-auto flex justify-center items-center brand-box">
      <a-form
		class="w-560px"
        :model="formState"
        name="formRef"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 19 }"
        autocomplete="off"
        ref="formRef"
      >
        <a-form-item
          label="供货品类"
          name="categoryList"
          :rules="[
            { required: true, type: 'array', message: '请选择供货的品类', trigger: 'blur,change' },
          ]"
        >
          <a-tree-select
            v-model:value="formState.categoryList"
            style="width: 100%"
            :field-names="{ label: 'name', value: 'id' }"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            placeholder="请选择所属分类"
            allow-clear
            tree-checkable
            tree-default-expand-all
            :tree-data="categoryTreeData"
          />
        </a-form-item>
        <a-form-item
          label="请选择品牌"
          name="brandId"
          :rules="[{ required: true, message: '请选择品牌', trigger: 'blur,change' }]"
        >
          <a-select
            ref="select"
            v-model:value="formState.brandId"
            placeholder="请选择品牌"
            style="width: 100%"
            allow-clear
          >
            <a-select-option v-for="(item, index) in brandListData" :key="index" :value="item.id">
              <div class="flex">
                <img class="w-20px h-20px" :src="item.logoUrl + '&type=1'" alt="" />
                <div class="font-bold pl-10px">{{ item.name }}</div>
              </div>
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </div>
  </div>
  <div
    class="fixed bg-white left-260px right-25px bottom-0 flex items-center justify-center p-15px"
  >
    <div>
      <a-space>
        <a-button type="primary" @click="prevHandler">上一步</a-button>
        <a-button
          :disabled="!disabled"
          :loading="loading"
          type="primary"
          v-auth="'/v1/api/company/legal/supplier'"
          @click="submitHandler"
          >提交
        </a-button>
      </a-space>
    </div>
  </div>
</template>

<script setup lang="ts">
  //
  import AdminHttp from '/@/utils/http/adminHttp'
  import { onBeforeMount, ref, defineEmits, reactive, computed, watch } from 'vue'
  import WebStorage from '/@/utils/cache'
  import { message } from 'ant-design-vue'
  import { useRouter } from 'vue-router'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const $router = useRouter()

  const loading = ref(false)

  const formRef = ref()

  defineProps({
    value: {
      type: [String, Number],
      default: 0,
    },
  })

  const brandListData = ref([])
  const categoryTreeData = ref([])
  const emits = defineEmits(['update:value'])

  const oneForm = WebStorage.get('OneStepForm')
  const twoForm = WebStorage.get('TwoStepForm')

  const defaultFormState = WebStorage.get('ThreeStepForm') || {
    categoryList: [], // 经营品类
    brandList: [], // 经营品牌
    brandId: null, // 经营品牌
  }
  const formState = reactive(defaultFormState)
  const disabled = computed(() => formState.categoryList.length && formState.brandList.length)

  const initGoodsCategoryTreeData = async () => {
    const { data } = await AdminHttp.goodsCategoryCategorySelect({ name: '' })
    categoryTreeData.value = data.map((item) => {
      return {
        ...item,
        disabled: true,
      }
    })
  }

  const initBrandList = async () => {
    const { data } = await AdminHttp.goodsBrandList({
      pageNo: 1,
      pageSize: 9999,
    })
    brandListData.value = data
  }

  // 表单提交
  const submitHandler = () => {
    formRef.value
      .validate()
      .then(async () => {
        if (formState.categoryList.length > 5) {
          return message.warn('品类最多选择5个')
        }
        const postForm = Object.assign(
          {},
          {
            ...oneForm,
            ...twoForm,
            ...formState,
            areaCode: twoForm.areaCode[2],
          },
        )
        try {
          loading.value = true
          const ret = await AdminHttp.CUSTOMER.apiCompanyLegalSupplier(postForm)
          loading.value = false
          if (+ret.code === 20001) {
            WebStorage.remove('OneStepForm')
            WebStorage.remove('TwoStepForm')
            WebStorage.remove('ThreeStepForm')
            message.success('新增成功')
            $router.push('/customerModule/supplier/supplierList')
          }
        } catch (e) {
          loading.value = false
          console.warn(e, 'ThreeStepForm')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  watch(
    formState,
    (val) => {
      WebStorage.set('ThreeStepForm', val)
    },
    {
      deep: true,
    },
  )

  watch(
    () => formState.brandId,
    (val) => {
      formState.brandList = [val]
    },
  )

  const prevHandler = () => {
    emits('update:value', 1)
  }
  onMountedOrActivated(() => {
    initGoodsCategoryTreeData()
    initBrandList()
  })
</script>

<style scoped lang="less">
.brand-box {
  min-height: calc(100vh - 280px);
}
</style>
