<template>
  <div>
    <div>
      <EraTabs :tabsList="tabsList" :tabs-active="activeKey" @tabsChange="tabsChange" />
    </div>
    <div class="bg-white m-24px mt-72px p-24px page-bg">
      <div class="page-container">
        <div class="page-wrap_content">
          <SupplierDetails v-if="activeKey === 'one'" />
          <employmentPage v-if="activeKey === 'two'" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onBeforeMount, onMounted, ref } from 'vue'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import SupplierDetails from '/@/modules/CustomerModule/SupplierModule/conponents/SupplierDetails.vue'
  import employmentPage from '/@/modules/CustomerModule/SupplierModule/conponents/employmentPage/employmentPage.vue'
  import { useRoute } from 'vue-router'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  export default defineComponent({
    name: 'EmployeeManagement',
    components: { EraTabs, SupplierDetails, employmentPage },
    setup() {
      let activeKey = ref('one')
      let route = useRoute()
      const tabsList = ref([
        { key: 'one', name: '供应商详情', totalCount: 0 },
        { key: 'two', name: '员工管理', totalCount: 0 },
      ])
      const tabsChange = (Key) => {
        activeKey.value = Key
      }
      const initData = () => {
        if (route.query.type === 'one') {
          activeKey.value = 'one'
        } else {
          activeKey.value = 'two'
        }
      }
      onBeforeMount(() => {
        initData()
        
      })
      return {
        initData,
        route,
        activeKey,
        tabsList,
        tabsChange,
      }
    },
  })
</script>
<style lang="less" scoped>
  ::v-deep(.ant-tabs-bar) {
    margin: 0 !important;
  }

  .page-wrap {
    margin: 24px;
    //background: #fff;

    .page-container {
      padding: 0;
    }
  }

  .page-wrap_content {
    background-color: white;
  }

  .page-bg {
    background-color: white;
  }
</style>
