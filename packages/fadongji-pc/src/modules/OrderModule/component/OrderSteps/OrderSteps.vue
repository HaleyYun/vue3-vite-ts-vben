<template>
  <ASteps :current="getStepsList(stepsList)" :status="getStatus()" >
    <AStep disabled v-for="item in stepsList" :key="item.index" :title="item.statusEvent">
      <template #description> {{ item.createTime }}</template>
    </AStep>
  </ASteps>
</template>

<script lang="ts" setup>
  import { defineProps } from 'vue'
  const props = defineProps({
    stepsList: {
      type: Array,
      default: [],
    },
    status: {
      type: Number,
      default: 0,
    },
  })
  const getStepsList = () => {
    if (getStatus() == 'error') {
      console.log(props.stepsList.length - 1, 'getStepsList')
      return props.stepsList.length - 1
    } else {
      // const index = props.stepsList.findIndex((item) => !item.createTime)
      // if (index >= 0) {
      //   return index
      // } else {
      //   return props.stepsList.length
      // }
      let indexT: number = 0
      props.stepsList.forEach((item: any, index) => {
        if (item.createTime) {
          indexT = index
        }
      })
      return indexT
    }
  }
  const getStatus = () => {
    let statusText = ''
    let errList = [3180, 1150, 1160, 1250, 1260, 3270, 1350, 1360, 3370]
    if (errList.includes(props.status)) {
      statusText = 'error'
    } else {
      statusText = 'process'
    }
    return statusText
  }
</script>

<style scoped lang="less">
  ::v-deep .ant-steps-horizontal:not(.ant-steps-label-vertical) .ant-steps-item-description {
    max-width: 150px;
    white-space: normal;
  }
</style>
