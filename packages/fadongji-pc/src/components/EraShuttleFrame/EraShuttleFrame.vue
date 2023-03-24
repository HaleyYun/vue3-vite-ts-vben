<!--<template>-->
<!--  <div class="transfer" >-->
<!--    &lt;!&ndash; 左框 &ndash;&gt;-->
<!--    <ul class="list left">-->
<!--      <template v-for="(item, index) in info">-->
<!--        <li :key="index">-->
<!--          <input type="checkbox" :id=`checkbox${item.id}` name="checkbox" :checked="item.select" @click="item.select=!item.select"  />-->
<!--          <label :for=`checkbox${item.id}` >{{ item.name }} </label>-->
<!--        </li>-->
<!--      </template>-->
<!--    </ul>-->

<!--    &lt;!&ndash; 添加/删除 &ndash;&gt;-->
<!--    <div class="content">-->
<!--      <p class="push" @click='push' >>>></p>-->
<!--      <p class="del"  @click='del' ><<<</p>-->
<!--    </div>-->

<!--    &lt;!&ndash; 右框 &ndash;&gt;-->
<!--    <ul class="list right">-->
<!--      <template v-for="(item, index) in new_info">-->
<!--        <li :key="index" >-->
<!--          <input type="checkbox" :id=`newcheckbox${item.id}` name="newcheckbox" :checked="item.select" @click="item.select=!item.select"  />-->
<!--          <label :for=`newcheckbox${item.id}`>{{ item.name }} </label>-->
<!--        </li>-->
<!--      </template>-->
<!--    </ul>-->
<!--  </div>-->
<!--</template>-->
<!--<script lang="ts">-->
<!--  import { defineComponent, ref } from 'vue'-->
<!--  // mock-->
<!--  import { list } from "/@/components/EraShuttleFrame/mockData";-->
<!--  export default defineComponent({-->
<!--   name: 'EraShuttleFrame',-->
<!--   setup() {-->
<!--     const treeData = ref(list)-->
<!--     const scopesDefault = ref() // 第一级-->
<!--     const scopes = ref([]) // 第二级-->
<!--     const eraShuttleData = ref(list)-->
<!--     const changeStatus = (index) => {-->
<!--       if (scopesDefault.value[index] == true) {-->
<!--         scopesDefault.value[index] = false-->
<!--       } else {-->
<!--         scopesDefault.value[index] = true-->
<!--       }-->
<!--     }-->
<!--     // scope 节点-->
<!--     const scope = () => {-->
<!--       treeData.value.forEach((item, index) => {-->
<!--         scopesDefault.value[index] = false-->
<!--         if ('children' in item) {-->
<!--           scopes[index] = true-->
<!--         } else {-->
<!--           scopes[index] = false-->
<!--         }-->
<!--       })-->
<!--     }-->
<!--     return {-->
<!--      treeData,-->
<!--      eraShuttleData,-->
<!--      scopesDefault,-->
<!--      scopes,-->
<!--      changeStatus,-->
<!--      scope,-->
<!--    }-->
<!--  },-->
<!--})-->
<!--</script>-->
<!--<style lang="less" scoped>-->
<!--.transfer{-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--}-->
<!--.transfer>.list {-->
<!--  width: 200px;-->
<!--  height: 300px;-->
<!--  border: 1px solid #000;-->
<!--  list-style: none;-->
<!--}-->
<!--.content{-->
<!--  font-size: 30px;-->
<!--  margin: 0 20px;-->
<!--}-->
<!--.list>li{-->
<!--  padding: 5px;-->
<!--  box-sizing: border-box;-->
<!--}-->
<!--</style>-->