<template>
  <div class="vocen-desktop-dialog" v-if="photoShow">
    <div class="vocen-desktop-dialog__content">
      <PhotoHeader @closePhoto="closePhoto" />
      <PhotoBody />
      <PhotoGroup />
    </div>
  </div>
</template>

<script setup lang="ts">
  //引入头部组件
  import PhotoHeader from './components/PhotoHeader.vue'
  //引入中间组件
  import PhotoBody from './components/PhotoBody.vue'
  //引入选择信息组件
  import PhotoGroup from './components/PhotoGroup.vue'
  import { ref } from 'vue'

  //父组件的参数
  // const props = defineProps({
  //   data: String
  // })

  // 组件的变量 是否打开
  let photoShow = ref(false)

  import { defineExpose } from 'vue'

  /**
   * 打开当前组件
   */
  const openPhoto = () => {
    photoShow.value = true
  }
  /**
   * 关闭当前组件
   */
  const closePhoto = () => {
    photoShow.value = false
  }

  // 重点！！这里需要使用defineExpose暴露出去
  defineExpose({
    openPhoto,
  })
</script>

<style scoped lang="less">
  .vocen-desktop-dialog {
    z-index: 200;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    white-space: nowrap;
    overflow: auto;
    background-color: rgba(122, 122, 122, 0.5);

    &__content {
      z-index: 300;
      width: 980px;
      background-color: #ffffff;
      box-sizing: border-box;
      border-radius: 16px;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
