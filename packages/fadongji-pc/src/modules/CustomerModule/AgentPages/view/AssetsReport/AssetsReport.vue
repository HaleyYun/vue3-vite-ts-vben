<template>

 <div>
  <div >
    <EraTabs :tabsList="tabsList" :tabs-active="activeKey" @tabsChange="tabsChange" />
  </div>
  <div>
    <PaymentDays v-show="activeKey === '1'"></PaymentDays>
    <LevelDetail v-show="activeKey === '2'" class="pt-46px"  ></LevelDetail>
  </div>
 </div>
</template>

<script lang="ts" setup>
  import {defineComponent, ref, reactive, createVNode, onBeforeMount} from 'vue';
  import {Modal} from 'ant-design-vue';
  import {useRoute} from 'vue-router'
  import {useMessage} from '/@/hooks/web/useMessage'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import LevelDetail from '/@/modules/components/LevelDetail/LevelDetail.vue'
  import PaymentDays from './component/PaymentDays.vue'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";

  const {createMessage} = useMessage();

  // --------公用参数---------------
  const route = useRoute(); // 获取传过来参数
  const Form = ref();


  //------tabs页签配置-------
  const activeKey = ref('1')
  const tabsList = ref([
    { key: '1', name: '账期' },
    { key: '2', name: '成长值'},
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
