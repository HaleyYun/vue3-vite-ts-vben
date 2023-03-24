<template>
  <div class="goods-layout">
    <div class="goods-form__search">
      <div class="form-list-choice">
        <RadioGroup v-model:value="ification">
          <RadioButton value="a" class="choice-btnItem" size="small">
            全部(<span class="choice-content">{{ 1000 }}</span
            >)
          </RadioButton>
          <RadioButton value="b" class="choice-btnItem" size="small"
            >未认证(<span class="choice-content">{{ 100 }}</span
            >)
          </RadioButton>
          <RadioButton value="c" class="choice-btnItem" size="small"
            >未审核(<span class="choice-content">{{ 100 }}</span
            >)
          </RadioButton>
          <RadioButton value="d" class="choice-btnItem" size="small"
            >审核中(<span class="choice-content">{{ 100 }}</span
            >)
          </RadioButton>
          <RadioButton value="e" class="choice-btnItem" size="small"
            >已认证(<span class="choice-content">{{ 100 }}</span
            >)
          </RadioButton>
        </RadioGroup>
      </div>
      <!-- <VoFormSearch :data="goodsEvaluatioForm">
        <template #content="{ row }">
          <template v-if="row.id === 3">
            <Cascader
              style="width: 246px"
              v-model:value="value"
              :options="addressOptions"
              placeholder="请选择地区"
            />
          </template>
          <template v-if="row.id === 4">
            <a-select style="width: 246px" v-model:value="cation" show-search :options="options1"
          /></template>
          <template v-if="row.id === 5">
            <a-range-picker style="width: 246px" v-model:value="pickerTime"
          /></template>
          <template v-if="row.id === 7">
            <a-button type="primary" class="submit-btn" @click="searchTableData()">{{
              row.name
            }}</a-button>
            <a-button type="primary" class="submit-btn">{{ row.reset }}</a-button>
          </template>
        </template>
      </VoFormSearch> -->
      <EraProForm mode="filter" :columns="goodsEvaluatioForm" layout="inline" />
    </div>
  </div>
</template>

<script lang="ts">
  import type { Dayjs } from 'dayjs'
  type RangeValue = [Dayjs, Dayjs]
  import { defineComponent, getCurrentInstance, ComponentInternalInstance, ref } from 'vue'
  import { Radio, Cascader } from 'ant-design-vue'
  import { SelectTypes } from 'ant-design-vue/es/select'
  import { addressOptions } from '/@/modules/CustomerModule/AgentPages/mock/index'
  import { goodsEvaluatioForm, goodsClassfy, contentClassfy } from '../type'
  // import VoFormSearch from '/@/components/VoFormSearch/VoFormSearch.vue'
  import EraProForm from '/@/components/EraProForm/EraProForm.vue'
  export default defineComponent({
    components: { EraProForm, RadioGroup: Radio.Group, RadioButton: Radio.Button, Cascader },
    setup() {
      const ification = ref<string>('a')
      // as ComponetInternalInstance表示类型断言，ts时使用。否则报错，proxy为null
      const { proxy } = getCurrentInstance() as ComponentInternalInstance
      const globInstance = proxy?.$.appContext.config.globalProperties
      const searchTableData = () => {
        globInstance?.$Message({ type: 'success', text: '测试返回的内容' })
      }
      //认证状态
      const options1 = ref<SelectTypes['options']>([
        { value: 'Lv3', label: 'Lv1' },
        { value: 'Lv3', label: 'Lv3' },
        { value: 'Lv3', label: 'Lv3' },
        { value: 'Lv3', label: 'Lv3' },
        { value: 'Lv3', label: 'Lv3' },
        { value: 'Lv3', label: 'Lv3' },
      ])
      return {
        ification,
        searchTableData,
        goodsEvaluatioForm,
        goodsClassfy,
        contentClassfy,
        addressOptions,
        //等级
        cation: ref<string | undefined>(undefined),
        options1,
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
      .form-list-choice {
        padding: 10px;
        width: 100%;
        background-color: #fff;
        // margin-top: 20px;

        .choice-btnItem {
          margin-right: 10px;

          .choice-content {
            color: #ff1a20;
          }

          &.ant-radio-button-wrapper-checked:hover {
            color: #fff !important;

            .choice-content {
              color: #fff !important;
            }
          }

          :hover .choice-content {
            color: #0960bd !important;
          }
        }

        .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
          z-index: 1;
          color: #fff;
          background: #0960bd;

          .choice-content {
            color: #fff;
          }
        }
      }
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
