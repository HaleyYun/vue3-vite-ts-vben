<template>
  <div class="goods-layout">
    <div class="goods-form__search">
      <VoFormSearch :data="goodsEvaluatioForm">
        <template #content="{ row }">
          <template v-if="row.id === 2">
            <span>
              <!-- <a-select
                v-model:value="goodsClassfy[0].value"
                :options="goodsClassfy"
                style="width: 246.2px"
                :placeholder="row.placeholderText"
              /> -->
              <a-range-picker v-model:value="pickerTime" />
            </span>
          </template>
          <template v-if="row.id === 3">
            <span>
              <a-select
                v-model:value="contentClassfy[0].value"
                :options="contentClassfy"
                style="width: 246.2px"
                :placeholder="row.placeholderText"
              />
            </span>
          </template>
          <template v-if="row.id === 5">
            <a-button type="primary" class="submit-btn" @click="searchTableData()">{{
              row.name
            }}</a-button>
            <a-button type="primary" class="submit-btn">{{ row.reset }}</a-button>
          </template>
        </template>
      </VoFormSearch>
    </div>
  </div>
</template>

<script lang="ts">
  import type { Dayjs } from 'dayjs'
  type RangeValue = [Dayjs, Dayjs]
  import { defineComponent, getCurrentInstance, ComponentInternalInstance, ref } from 'vue'

  import { goodsEvaluatioForm, goodsClassfy, contentClassfy } from '../type'
  import VoFormSearch from '/@/components/VoFormSearch/VoFormSearch.vue'
  export default defineComponent({
    components: { VoFormSearch },
    setup() {
      // as ComponetInternalInstance表示类型断言，ts时使用。否则报错，proxy为null
      const { proxy } = getCurrentInstance() as ComponentInternalInstance
      const globInstance = proxy?.$.appContext.config.globalProperties
      const searchTableData = () => {
        globInstance?.$Message({ type: 'success', text: '测试返回的内容' })
      }
      return {
        searchTableData,
        goodsEvaluatioForm,
        goodsClassfy,
        contentClassfy,
        pickerTime: ref<RangeValue>(),
      }
    },
  })
</script>

<style lang="less" scoped>
  .goods-layout {
    position: relative;
    // padding:  15px;
    .goods-form__search {
      padding: 10px 0;
      position: relative;
      background-color: #ffffff;
    }
  }
  .submit-btn {
    width: 88px;
    margin-left: 15px;
  }
  .commit-table {
    margin: 10px 15px;
    background-color: white;
  }
</style>
