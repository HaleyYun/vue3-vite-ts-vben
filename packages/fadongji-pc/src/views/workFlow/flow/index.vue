<template>
  <PageWrapper title="流程图" content="流程图" contentFullHeight fixedHeight>
    <FlowChart :data="demoData" />
  </PageWrapper>
</template>

<script lang="ts">
  import { FlowChart } from '/@/components/FlowChart'
  import { PageWrapper } from '/@/components/Page'

  import demoData from '../flow/dataTurbo.json'
  export default {
    components: { FlowChart, PageWrapper },
    setup() {
      return { demoData }
    },
  }
</script>
