<template>
 <div>
  <EraTabs :tabsList="tabsList" :tabs-active="activeKey" @tabsChange="tabsChange" />
  <div class="bg-white p-24px mb-82px m-24px mt-72px" >
    <div class="bg-white overflow-y-auto card-height" >
      <GrowthValue v-if="activeKey == 'one'" :operationType="1" platformCode="garage"></GrowthValue>
      <GrowthValue v-if="activeKey == 'two'" :operationType="2" platformCode="garage"></GrowthValue>
      <LevelSet v-if="activeKey == 'three'"  platformCode="garage"></LevelSet>
    </div>
  </div>
 </div>

</template>

<script lang="ts" setup>
  import { ref} from 'vue';
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import LevelSet from '/@/modules/components/LevelSet/LevelSet.vue'
  import GrowthValue from '/@/modules/components/GrowthValue/GrowthValue.vue'
  const activeKey = ref('one')
  const tabsList = ref([
    { key: 'one', name: '积分设置', totalCount: 0 },
    { key: 'two', name: '成长值设置', totalCount: 0 },
    { key: 'three', name: '等级设置', totalCount: 0 }
  ])
  const tabsChange = (Key) => {
    activeKey.value = Key
  }

</script>

<style scoped lang="less">
  .card-height{
    height: calc(100vh - 90px)
  }

</style>
