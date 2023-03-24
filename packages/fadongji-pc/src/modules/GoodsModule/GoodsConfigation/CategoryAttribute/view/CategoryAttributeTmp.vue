<template>
  <div class="page-wrap">
    <ATabs v-model:activeKey="activeKey" type="card">
      <ATabPane key="one" tab="规格属性">
        <div class="page-containers">
          <div class="page-wrap_content">
            <GoodsCate />
          </div>
        </div>
      </ATabPane>
      <ATabPane key="two" tab="参数属性">
        <div class="page-containers">
          <div class="page-wrap_content">
            <GoodsParameter />
          </div>
        </div>
      </ATabPane>
    </ATabs>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'

  import GoodsCate from '/@/modules/GoodsModule/GoodsManage/component/GoodsCate.vue'
  import GoodsParameter from '/@/modules/GoodsModule/GoodsManage/component/GoodsParameter.vue'

  export default defineComponent({
    name: 'CategoryManager',
    components: { GoodsCate, GoodsParameter },
    setup() {
      return {
        activeKey: ref('one'),
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

    .page-containers {
      padding: 0;
    }
  }

  .page-wrap_content {
    background-color: white;
  }
</style>
