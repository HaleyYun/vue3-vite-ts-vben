<template>
  <div class="bg-white p-24px mb-82px m-24px" >
    <ATabs v-model:activeKey="activeKey" >
      <ATabPane key="one" tab="成长值设置">
        <div class="bg-white overflow-y-auto card-height">
          <GrowthValue :operationType="1" platformCode="oldMachine"></GrowthValue>
        </div>
      </ATabPane>
      <ATabPane key="two" tab="等级设置">
        <div class="bg-white overflow-y-auto card-height">
          <LevelSet  platformCode="oldMachine"></LevelSet>
        </div>
      </ATabPane>
    </ATabs>
  </div>

</template>

<script lang="ts" setup>
  import { ref} from 'vue';
  import LevelSet from '/@/modules/components/LevelSet/LevelSet.vue'
  import GrowthValue from '/@/modules/components/GrowthValue/GrowthValue.vue'
  const activeKey = ref('one')
</script>

<style scoped lang="less">
  .card-height{
    height: calc(100vh - 90px)
  }

</style>
