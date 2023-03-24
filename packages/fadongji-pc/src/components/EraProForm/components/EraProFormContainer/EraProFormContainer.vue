<template>
  <a-form :model="formModel" :rules="formRules" :labelWrap="true" :ref="formRefName" :layout="layout">
    <slot name="formBody" :data="formColumns">
      <EraProFormItem v-for="(row, idx) of formColumns" :key="idx" :config="row">
        <template v-if="!row.hidden" #default="{ rowConfig }">
          <slot name="formItem" :record="row">
            <a-form-item :labelCol="FORM_ITEM_LABEL_COL" :wrapperCol="FORM_ITEM_WRAPPER_COL" :label="rowConfig.label"
              :name="rowConfig.name">
              <EraProFormItemInput v-if="!row.type || row.type === 'input'" :formElOptions="row"
                v-model="formModel[row.name]" :placeholder="row.placeholderText" />
              <EraProFormItemSelect v-if="row.type === 'select'" v-model="formModel[row.name]" :formElOptions="row"
                :placeholder="row.placeholderText" />
              <EraProFormItemDatePicker v-if="row.type === 'DatePicker'" :placeholder="row.placeholderText" />
              <EraProFormItemRangeDatePicker :formElOptions="row" v-if="row.type === 'RangeDatePicker'"
                v-model="formModel[row.name]" :placeholder="row.placeholderText" />
              <EraProItemRadioGroup v-if="row.type === 'RadioGroup'" :options="row.options" :value="row.value">
              </EraProItemRadioGroup>
            </a-form-item>
          </slot>
        </template>
      </EraProFormItem>
    </slot>
    <slot name="action"></slot>
  </a-form>
</template>

<script>
import EraProFormItem from '/@/components/EraProForm/components/EraProFormItem/EraProFormItem.vue'
import dayjs from 'dayjs'
import EraProFormItemInput from '/@/components/EraProForm/components/EraProFormItemInput/EraProFormItemInput.vue'
import EraProFormItemSelect from '/@/components/EraProForm/components/EraProFormItemSelect/EraProFormItemSelect.vue'
import EraProFormItemDatePicker from '/@/components/EraProForm/components/EraProFormItemDatePicker/EraProFormItemDatePicker.vue'
import form from '/@/utils/lib/form'
import defaultConfig from '/@/components/EraProForm/libs/defaultConfig'
import EraProFormItemRangeDatePicker from '/@/components/EraProForm/components/EraProItemRangeDatePicker/EraProFormItemRangeDatePicker.vue'
import EraProItemRadioGroup from '/@/components/EraProForm/components/EraProFormItemRadioGroup/EraProFormItemRadioGroup.vue'

export default {
  name: 'EraProFormContainer',
  components: {
    EraProItemRadioGroup,
    EraProFormItemRangeDatePicker,
    EraProFormItemDatePicker,
    EraProFormItemSelect,
    EraProFormItemInput,
    EraProFormItem,
  },
  props: {
    columns: {
      default: () => [],
      type: Array,
    },
    layout: {
      default: 'horizontal',
      type: String,
    },
    formRefName: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      FORM_ITEM_LABEL_COL: defaultConfig.FORM_ITEM_LABEL_COL,
      FORM_ITEM_WRAPPER_COL: defaultConfig.FORM_ITEM_WRAPPER_COL,
      formModel: {},
      formRules: {},
      formColumns: [],
      formUnionRefs: `eraForm${dayjs().unix()}`,
    }
  },
  methods: {
    getFormInstacne() {
      return this.$refs[this.formRefName]
    },
  },
  created() {
    let model = {}
    let rules = {}
    const formColumns = []

      this.columns.forEach((row) => {
        model[row.name] = row.value
        rules[row.name] = form.buildRuleByOpt(row)
        formColumns.push(row)
      })
      this.formColumns = formColumns
      this.formModel = model
      this.formRules = rules
    },
  mounted() {
    console.log(this.columns, 'column')
  }
}
</script>

<style lang="scss" scoped>
</style>
