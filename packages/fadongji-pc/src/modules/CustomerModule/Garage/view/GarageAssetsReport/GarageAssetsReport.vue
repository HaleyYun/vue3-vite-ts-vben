<template>
<div>
  <div>
    <EraTabs :tabsList="tabsList" :tabs-active="activeKey" @tabsChange="tabsChange" />
  </div>
  <div class="pt-46px">
    <LevelDetail v-if="activeKey == 1" :operationType="1"></LevelDetail>
    <LevelDetail v-if="activeKey == 2" :operationType="2"></LevelDetail>
  </div>
</div>
  

</template>

<script lang="ts" setup>
  import { ref,onBeforeMount} from 'vue';
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import {useRoute} from 'vue-router'
  import LevelDetail from '/@/modules/components/LevelDetail/LevelDetail.vue'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";





  //------tabs页签配置-------
  const activeKey = ref('1')
  const route = useRoute(); // 获取传过来参数
  const tabsList = ref([
    { key: '1', name: '积分', },
    { key: '2', name: '成长值', },
  ])
  const tabsChange = (Key) => {
    activeKey.value = Key;
  };
  onMountedOrActivated(()=>{
    if(route.query.type == 2){
      activeKey.value = '2'
    }
  })





</script>

<style scoped lang="less">

</style>
