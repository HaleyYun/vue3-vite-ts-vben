<template>
  <div class="region-list">
    <Select
      v-model:value="defaultProValue"
      show-search
      placeholder="请选择省份"
      size="large"
      :style="{ marginRight: space, width: width }"
      :default-active-first-option="false"
      :show-arrow="false"
      :filter-option="false"
      :not-found-content="null"
      :options="cascaderList"
      @change="getProvince"
    />
    <Select
      v-model:value="defaultCityInProValue"
      show-search
      size="large"
      placeholder="请选择城市"
      :style="{ marginRight: space, width: width }"
      :default-active-first-option="false"
      :show-arrow="false"
      :filter-option="false"
      :not-found-content="null"
      :options="cityList"
      @change="getCityInPro"
    />
    <Select
      v-model:value="defaultAreaInCity"
      show-search
      size="large"
      placeholder="请选择县区"
      :style="{ width: width }"
      :default-active-first-option="false"
      :show-arrow="false"
      :filter-option="false"
      :not-found-content="null"
      :options="areaList"
      @change="getAreaInCity"
    />
  </div>
</template>
<script lang="ts">
  import { Select } from 'ant-design-vue'
  import { defineComponent, reactive, toRefs } from 'vue'
  import { options } from '/@/modules/CustomerModule/AgentPages/component/area'
  interface cascadeData {
    cascaderList: any
    cityList: Array<Object> | undefined | null
    areaList: Array<Object> | undefined | null
    defaultProValue: string | null
    defaultCityInProValue: string | null
    defaultAreaInCity: string | null
  }
  export default defineComponent({
    name: 'VoCascades',
    components: { Select },
    props: {
      space: { type: String, default: '5px' },
      width: { type: String, default: '200px' },
    },
    emits: {
      // 暴露的触发时间
      getProvinceData: null,
      getCityData: null,
      getAreaData: null,
    },
    setup(props, { emit }) {
      console.log(props)
      const casCade = reactive<cascadeData>({
        cascaderList: options,
        cityList: [],
        areaList: [],
        defaultProValue: null,
        defaultCityInProValue: null,
        defaultAreaInCity: null,
      })
      const getProvince = (val, option) => {
        if (option.children) {
          casCade.cityList = option.children
          refreshSelected('pro')
        }
        const provinceData = { value: val, item: option }
        emit('getProvinceData', provinceData)
      }
      const getCityInPro = (val, option) => {
        if (option.children) {
          refreshSelected('city')
          casCade.areaList = option.children
        }
        const provinceData = { value: val, item: option }
        emit('getCityData', provinceData)
      }
      const getAreaInCity = (val, option) => {
        const provinceData = { value: val, item: option }
        emit('getAreaData', provinceData)
      }
      const refreshSelected = (val) => {
        // 切换时清除下一级的默认选中状态
        if (val === 'pro') {
          if (casCade.defaultCityInProValue) {
            casCade.defaultCityInProValue = null
          }
          if (casCade.defaultAreaInCity) {
            casCade.defaultAreaInCity = null
          }
        } else {
          if (casCade.defaultAreaInCity) {
            casCade.defaultAreaInCity = null
          }
        }
      }
      return {
        ...toRefs(casCade),
        getProvince,
        getCityInPro,
        getAreaInCity,
      }
    },
  })
</script>
<style lang="less" scoped>
  .region-list {
    width: 700px;
  }
</style>
