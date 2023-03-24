<template>
  <div>
    <EraTabs :tabsList="tabsList" :tabs-active="activeKey" @tabsChange="tabsChange" />
    <div v-if="activeKey === 'one'">
      <ModelApplicationList />
    </div>
    <div v-if="activeKey === 'two'">
      <ModelLibraryList />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import ModelApplicationList from './ModelApplication/ModelApplicationList.vue'
  import ModelLibraryList from './ModelLibrary/ModelLibraryList.vue'

  //------tabs页签配置-------
  const activeKey = ref('one')
  const tabsList = ref([
    { key: 'one', name: '型号申请记录' },
    { key: 'two', name: '型号库' },
  ])
  const tabsChange = (Key) => {
    activeKey.value = Key
    console.log(Key)
  }
</script>

<style scoped lang="less"></style>
