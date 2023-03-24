<template>

  <div>
    <EraTabs :tabsList="tabsList" :tabsactive="activeKey" @tabsChange="tabsChange" />
  </div>
  <div class="pt-46px">
    <LevelDetail :operationType="2"></LevelDetail>
  </div>

</template>

<script lang="ts" setup>
  import { ref} from 'vue';
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import LevelDetail from '/@/modules/components/LevelDetail/LevelDetail.vue'





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
