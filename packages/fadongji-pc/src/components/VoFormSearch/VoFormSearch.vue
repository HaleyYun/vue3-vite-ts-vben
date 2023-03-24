<template>
  <div>
    <!--:label-col="{ span: 6 }"-->
    <AForm layout="inline" class="search-form">
      <!--<a-row :gutter="16">-->
      <!--  <a-col class="gutter-row" :span="6" v-for="item of data" :key="item.id">-->
      <!--    <div class="gutter-box">-->
      <!--      <template v-if="item.slot !== 'slot'">-->
      <!--        <a-form-item :label="item.className" :name="item.name">-->
      <!--          <Input v-model="item.value" :placeholder="item.placeholderText" class="constant" />-->
      <!--        </a-form-item>-->
      <!--      </template>-->
      <!--      <template v-else>-->
      <!--        <a-form-item :label="item.className" :name="item.name">-->
      <!--          <div class="flex-item">-->
      <!--            <slot name="content" :row="item"></slot>-->
      <!--          </div>-->
      <!--        </a-form-item>-->
      <!--      </template>-->
      <!--    </div>-->
      <!--  </a-col>-->
      <!--</a-row>-->

      <AFormItem
        v-for="item of props.data"
        :key="item.id"
        :label="item.className"
        :name="item.name"
      >
        <template v-if="item.slot !== 'slot'">
          <AInput v-model="item.value" :placeholder="item.placeholderText" />
        </template>
        <template v-else>
          <slot name="content" :row="item"></slot>
        </template>
      </AFormItem>

      <!--<div class="search-form-item" v-for="item of props.data" :key="item.id">-->
      <!--  <template v-if="item.slot !== 'slot'">-->
      <!--    -->
      <!--  </template>-->
      <!--  <template v-else>-->
      <!--    <AFormItem :label="item.className" :name="item.name">-->
      <!--      <div class="flex-item">-->
      <!--        <slot name="content" :row="item"></slot>-->
      <!--      </div>-->
      <!--    </AFormItem>-->
      <!--  </template>-->
      <!--</div>-->
    </AForm>
  </div>
</template>
<script setup lang="ts">
  import { reactive } from 'vue'

  const props = defineProps({
    data: {
      type: Object,
      required: true,
    },
  })
  // const data = props.data
  const title = reactive({
    titleInfo: 'value',
  })
</script>
<style scoped>
  /*.gutter-example :deep(.ant-row > div) {*/
  /*  background: transparent;*/
  /*  border: 0;*/
  /*}*/
  /*.gutter-box {*/
  /*  height: 40px;*/
  /*  padding: 5px 0;*/
  /*}*/
  /*.constant {*/
  /*  width: 246px;*/
  /*}*/
  /*.flex-item {*/
  /*  display: flex;*/
  /*  align-content: flex-start;*/
  /*}*/
</style>
