<template>
  <div class="era-form-item">
    <slot :rowConfig="config">
      <!--<a-form-item-->
      <!--  :labelCol="{ span: 8, offset: 0 }"-->
      <!--  :wrapperCol="{ span: 8, offset: 0 }"-->
      <!--  :label="options.label"-->
      <!--  :name="options.name"-->
      <!--&gt;-->
      <!--  <EraProFormItemInput-->
      <!--    v-if="!options.type || options.type === 'input'"-->
      <!--    :formElOptions="options"-->
      <!--    :placeholder="options.placeholder"-->
      <!--  />-->
      <!--  <EraProFormItemSelect-->
      <!--    v-if="options.type === 'select'"-->
      <!--    :formElOptions="options"-->
      <!--    :placeholder="options.placeholder"-->
      <!--  />-->
      <!--  <EraProFormItemDatePicker-->
      <!--    v-if="options.type === 'datePicker'"-->
      <!--    :placeholder="options.placeholder"-->
      <!--  />-->
      <!--</a-form-item>-->
    </slot>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    props: {
      config: {
        type: Object,
      },
    },
  })
</script>

<style lang="scss" scoped>
  .era-form-item {
    margin-bottom: 10px;
  }
</style>
