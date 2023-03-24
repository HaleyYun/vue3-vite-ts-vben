<template>
  <div class="person-info__area">ddd</div>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue'
  interface personModel {
    headpicture: String
    personName: String
    goodsCount: String | Number | undefined
    commit: String
    date: String | undefined
    ipAddress: String
  }
  export default defineComponent({
    setup() {
      const personData = reactive<personModel>({
        headpicture: '',
        personName: '',
        goodsCount: '',
        commit: '',
        date: '',
        ipAddress: '',
      })
      return {
        personData,
      }
    },
  })
</script>
<style lang="less" scoped>
  .person-info__area {
    width: 300px;
    display: flex;
    flex-grow: 1;
    background-color: red;
  }
</style>
