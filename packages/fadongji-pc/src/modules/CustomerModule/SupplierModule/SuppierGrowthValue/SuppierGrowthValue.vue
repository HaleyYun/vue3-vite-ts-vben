<template>
  <div>
    <div class="page-wrap">
    <ATabs v-model:activity="activeKey" type="card" @change="tabEvent">
      <ATabPane v-for="(item, index) in tabComponent" :key="index" :tab="item.name" />
    </ATabs>
  </div>
  <div class="table-space">
    <component class="component-top" :is="currentComponent" />
  </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue'

  import IntegralSetting from '/@/modules/CustomerModule/SupplierModule/SuppierGrowthValue/child/IntegralSetting.vue'
  import GrowthValueSetting from '/@/modules/CustomerModule/SupplierModule/SuppierGrowthValue/child/GrowthValueSetting.vue'
  import RateSetting from '/@/modules/CustomerModule/SupplierModule/SuppierGrowthValue/child/RateSetting.vue'
  export default defineComponent({
    name: 'SupplierGrowth',
    components: {},
    setup() {
      // 供应商成长值 -- tab数据集
      const tabComponent = reactive([
        { name: '积分设置', code: '0', tabComponents: IntegralSetting },
        { name: '成长值设置', code: '1', tabComponents: GrowthValueSetting },
        { name: '等级设置', code: '2', tabComponents: RateSetting },
      ])
      let activeKey = ref<string>(tabComponent[0].code)
      let currentComponent = ref(tabComponent[0].tabComponents)
      const tabEvent = (index) => {
        switch (index) {
          case 0:
            currentComponent.value = tabComponent[0].tabComponents
            break
          case 1:
            currentComponent.value = tabComponent[1].tabComponents
            break
          case 2:
            currentComponent.value = tabComponent[2].tabComponents
            break
          default:
            currentComponent.value = tabComponent[0].tabComponents
            break
        }
      }
      return {
        activeKey,
        tabComponent,
        currentComponent,
        tabEvent,
      }
    },
  })
</script>
<style lang="less" scoped>
  .page-wrap {
    margin: 15px 15px 0 15px;
    .component-top {
      background-color: white;
    }
  }
  .table-space {
    margin: 0 5px;
  }
</style>
