<template>
  <a-modal
    v-model:visible="compData.show"
    destroy-on-close
    :mask-closable="false"
    title="适配车型"
    @ok="handleOk"
    @cancel="cancelHandler"
    width="1024px"
    :style="{
      top: '30px',
    }"
  >
    <div class="flex">
      <div class="w-220px h-600px pr-10px">
        <!--	左侧品牌组件：start		-->
        <Brand @select="brandSelectHandler" />
        <!--	左侧品牌组件：end		-->
      </div>
      <!-- 右侧筛选项内容： start	  -->
      <div class="pl-10px pr-15px flex-1">
        <div v-if="currentBrand" class="py-10px">
          <div>
            已选：
            <a-tag color="processing" @close="currentBrand = null" closable>
              {{ currentBrand.name }}
            </a-tag>
          </div>
          <div class="pt-10px">
            <a-checkbox-group
              v-model:value="checked"
              name="checkboxgroup"
              :options="plainOptions"
            />
          </div>
          <div class="pt-10px flex items-center">
            <div>筛选：</div>
            <div>
              <a-form layout="inline" :model="formState" @change="formChangeHandler">
                <a-form-item>
                  <a-select
                    v-model:value="formState.brandIds"
                    placeholder="车系"
                    size="small"
                    mode="multiple"
                    style="width: 120px"
                    :bordered="false"
                    allow-clear
                  >
                    <a-select-option
                      v-for="(item, index) in seriesData"
                      :key="index"
                      :value="item.type"
                    >
                      {{ item.value }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item>
                  <a-select
                    v-model:value="formState.year"
                    placeholder="年款"
                    size="small"
                    style="width: 100px"
                    :bordered="false"
                    allow-clear
                  >
                    <a-select-option
                      v-for="(item, index) in compData.year"
                      :key="index"
                      :value="item.type"
                      >{{ item.value }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item>
                  <a-select
                    v-model:value="formState.displacementInduction"
                    placeholder="排量"
                    size="small"
                    style="width: 100px"
                    :bordered="false"
                    allow-clear
                  >
                    <a-select-option
                      v-for="(item, index) in compData.displacement_induction"
                      :value="item.type"
                      :key="index"
                    >
                      {{ item.value }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item>
                  <a-select
                    v-model:value="formState.transmissionDescription"
                    placeholder="变速箱"
                    size="small"
                    style="width: 100px"
                    :bordered="false"
                    allow-clear
                  >
                    <a-select-option
                      v-for="(item, index) in compData.transmission"
                      :key="index"
                      :value="item.type"
                    >
                      {{ item.value }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-form>
            </div>
          </div>
          <div class="pt-10px">
            <TransferTree @select="selectCarHandler" :data-source="treeDataSource" />
          </div>
        </div>
        <div v-else class="flex items-center justify-center h-500px">
          <a-empty description="暂无数据、请先选择品牌" />
        </div>
      </div>

      <!-- 右侧筛选项内容： end	  -->
    </div>
  </a-modal>
</template>

<script setup lang="ts">
  //
  // vue属性引入
  import { defineEmits, defineProps, reactive, watch, ref, toRaw } from 'vue'

  import Brand from './Brand.vue'
  import TransferTree from './TransferTree.vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import { message } from 'ant-design-vue'
  // 定义传入组件属性
  const props = defineProps({
    visible: {
      type: Boolean,
      default: false,
    },
  })

  // 已选当前的品牌
  const currentBrand = ref<any>(null)

  // 表单搜索
  const formState = reactive({
    brandIds: [], // 品牌列表
    year: null, // 年款搜索
    displacementInduction: null, // 排量进气形式列表
    transmissionDescription: null, // 变速箱列表
    orderType: 'ASC', // 排序
  })

  // 处理数据临时创建的map对象
  let seriesMap = new Map()

  // 车系选中的筛选
  const checked = ref<string[]>([])

  // 车系类型
  const plainOptions = ref([])

  // 页面自身数据
  const compData = reactive({
    show: props.visible,
    series: [],
    year: [],
    displacement_induction: [],
    transmission: [],
  })

  const putFormData = ref<any>([])

  // 车系数据
  const seriesData = ref<any>([])

  // 车型搜索出来的数据
  const treeDataSource = ref<any>([])

  // 定义抛出事件
  const emits = defineEmits(['update:visible', 'confirm'])

  // 确认操作
  const handleOk = () => {
    // console.log(putFormData.value)
    emits('confirm', toRaw(putFormData.value))
    closeModalHandler()
  }

  // 取消操作
  const cancelHandler = () => {
    closeModalHandler()
  }

  // 关闭弹窗后统一操作
  const closeModalHandler = () => {
    // 重置数据
    currentBrand.value = null
    formState.brandIds = []
    formState.transmissionDescription = null
    formState.year = null
    formState.displacementInduction = null
    treeDataSource.value = []

    emits('update:visible', false)
  }

  // 表单搜索变化
  const formChangeHandler = () => {
    fetchCarsData()
  }

  // 左侧选择品牌的回调
  const brandSelectHandler = (row) => {
    currentBrand.value = row
    console.log(row, 'xx')
  }

  // 获取所选品牌下的参数数据
  const fetchBrandParams = async () => {
    try {
      if (!currentBrand.value) return
      // 每次重新帅选重置一些默认数据
      seriesMap = new Map<any, any>()
      checked.value = []
      const { code, data } = await AdminHttp.VEHICLE.VehicleBrandSelectParameters({
        brandid: currentBrand.value.id,
      })
      if (+code === 20001 && data) {
        const { transmission, series, displacement_induction, year } = data
        compData.displacement_induction = displacement_induction
        compData.transmission = transmission
        compData.year = year
        compData.series = series
        seriesData.value = series
        series.forEach((item) => {
          const $key = item.subbrand
          const sList = seriesMap.get($key) || []
          sList.push(item)
          seriesMap.set($key, sList)
        })
        const plainOptionsTmpData: any = []
        seriesMap.forEach(($val, $key) => {
          plainOptionsTmpData.push({
            label: $key,
            value: $key,
          })
        })
        plainOptions.value = plainOptionsTmpData
      }
    } catch (e: any) {
      console.warn(e, 'ApplicationCars')
      message.warning(e?.data?.message || e?.message || e?.error || '服务端错误')
    }

    await fetchCarsData()
  }

  // 格式化车型数据
  const formatCarsData = (list) => {
    if (list && Array.isArray(list) && list.length) {
      return list.map((item) => {
        return {
          key: item.seriesId,
          title: item.type + '-全系',
          level: item.level,
          size: item.size,
          seriesId: item.seriesId,
          children: item.list.map((l) => {
            return {
              key: l.id,
              title: `${l.year} ${l.displacement} ${l.induction} ${l.transmissionDescription} ${l.name}`,
              level: l.level,
              size: 0,
              seriesId: l.seriesId,
              parentSize: item.size,
            }
          }),
        }
      })
    } else {
      return []
    }
  }

  // 获取车型数据
  const fetchCarsData = async () => {
    if (!currentBrand.value) return
    const queryForm = {}
    for (let $key in formState) {
      if ($key === 'brandIds') {
        // 多品牌搜索
        queryForm['brandIds'] = formState[$key].join(',')
      } else {
        queryForm[$key] = formState[$key] || ''
      }
    }
    const { data } = await AdminHttp.VEHICLE.VehicleBrandSelectMode({
      ...queryForm,
      brandIds: currentBrand.value.id,
    })
    let list = data && data.list ? data.list : []
    treeDataSource.value = formatCarsData(list)
  }

  // 回调-选择的车型数据
  const selectCarHandler = (res) => {
    putFormData.value = res
  }

  // console.warn(
  //   '备注说明： 适配车型当前数据，属于测试服模拟固定数据，供测试使用、如果正式数据已给到，则需注释掉固定数据逻辑，打开动态获取即可--@闫亚松',
  // )

  watch(
    checked,
    (val) => {
      // console.log(seriesMap, 'xx')
      if (val.length) {
        seriesData.value = compData.series.filter((item: any) => val.includes(item.subbrand))
      } else {
        seriesData.value = compData.series
      }
    },
    {
      deep: true,
    },
  )

  // 监控form变化
  watch(formState, () => fetchCarsData())

  watch(currentBrand, fetchBrandParams, {
    deep: true,
  })
</script>

<style scoped lang="less"></style>
