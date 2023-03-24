<template>
  <div class="header">
    <div>选择图片</div>
    <svg
      @click="closePhoto"
      t="1646014081269"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2200"
      width="18"
      height="18"
    >
      <path
        d="M1003.008 902.656L612.352 512l390.656-390.656c27.648-27.648 27.648-72.704 0-100.352-27.648-27.648-72.704-27.648-100.352 0L512 411.648 121.344 20.992c-27.648-27.648-72.704-27.648-100.352 0-27.648 27.648-27.648 72.704 0 100.352L411.648 512 20.992 902.656c-13.312 13.312-20.992 31.232-20.992 50.176 0 18.944 7.168 36.864 20.992 50.176 13.312 13.312 31.232 20.992 50.176 20.992 18.944 0 36.864-7.168 50.176-20.992l390.656-390.656 390.656 390.656c13.312 13.312 31.232 20.992 50.176 20.992 18.944 0 36.864-7.168 50.176-20.992 13.312-13.312 20.992-31.232 20.992-50.176 0-18.944-7.168-36.864-20.992-50.176z"
        p-id="2201"
        fill="#7e8081"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
  import { defineEmits } from 'vue'

  const emit = defineEmits(['closePhoto'])

  const closePhoto = () => {
    emit('closePhoto')
  }

  defineExpose({
    closePhoto,
  })
</script>

<style scoped lang="less">
  .header {
    width: 100%;
    height: 72px;
    box-sizing: border-box;
    padding: 0px 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    color: #353535;
  }

  .icon {
    cursor: pointer;
  }
</style>
