<template>
  <view>
    <VoTabbarIm :tabbarVal="3" ref="imRef" :tabs-list="[{ name: '聊天' }]" />
  </view>
</template>

<script>
  import VoTabbarIm from '@/components/VoTabbarIm/VoTabbarIm'

  export default {
    name: 'LeaseTabbarIm',
    components: { VoTabbarIm },
    props: {
      tabbarVal: {
        type: Number,
        default: 3,
      },
    },
    data() {
      return {}
    },
    methods: {
      refreshData() {
        this.$refs.imRef.refreshData()
      },
    },
  }
</script>

<style lang="scss" scoped></style>
