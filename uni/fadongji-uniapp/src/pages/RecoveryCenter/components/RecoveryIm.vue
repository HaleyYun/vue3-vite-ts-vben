<template>
  <view >
    <VoTabbarIm :tabbarVal="tabbarVal" ref="imRef"></VoTabbarIm>
  </view>
</template>

<script>
import VoTabbarIm from "@/components/VoTabbarIm/VoTabbarIm";

export default {
  name: 'RecoveryIm',
  components:{VoTabbarIm},
  props: {
    tabbarVal: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {

    }
  },
  methods: {
    refreshData() {
      this.$refs.imRef.refreshData()
    },
  },
  onLoad(options){
    // this.$refs.imRef.initList()
  }
}
</script>

<style lang="scss" scoped>

</style>
