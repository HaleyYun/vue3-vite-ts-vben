<template>
  <div>
    <Description :column="2" :data="info" :schema="DescItemData"/>
  </div>

</template>

<script lang="ts" setup>
  import {defineComponent, ref,defineProps} from 'vue';
  import { Description } from '/@/components/Description/index';
  import {DescItemData} from './data/configuration'
  const props = defineProps({
    info:{
      type:Object,
      default:{}
    }
  })

</script>

<style scoped lang="less">
  ::v-deep(.ant-descriptions-item-content){
    width: 30%;
  }
  ::v-deep(.ant-image-img){
    width: 100px;
    height: 100px;
  }

</style>
