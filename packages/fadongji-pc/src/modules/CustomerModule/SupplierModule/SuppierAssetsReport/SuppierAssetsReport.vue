<template>

  <div>
    <div >
    <EraTabs :tabsList="tabsList" :tabs-active="activeKey" @tabsChange="tabsChange" />
  </div>
  <LevelDetail  class="pt-46px" :operationType="2"></LevelDetail>
  </div>

</template>

<script lang="ts" setup>
  import {ref} from 'vue';

  import LevelDetail from '/@/modules/components/LevelDetail/LevelDetail.vue'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'



  //------tabs页签配置-------
  const activeKey = ref('one')
  const tabsList = ref([
    { key: 'one', name: '成长值', },
  ])
  const tabsChange = (Key) => {
    activeKey.value = Key;

  };




</script>

<style scoped lang="less">

</style>
