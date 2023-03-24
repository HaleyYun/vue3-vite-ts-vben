<script setup lang="ts">
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
  import '../../packages/theme-default/photoGallery.scss'
  import { ref } from 'vue'
  let photoGalleryRef = ref(null)

  let VoWangEditorRef = ref(null)

  const showFn = () => {
    console.log(VoWangEditorRef.value.getHtml(), 'ssss')
    photoGalleryRef.value.openPhoto()
  }
  const returnPhoto = (res) => {
    console.log(res, 'ssss')
  }
</script>

<template>
  <div>
    <VoWangEditor height="500" ref="VoWangEditorRef"></VoWangEditor>
    <VoPhotoGallery @returnPhoto="returnPhoto" ref="photoGalleryRef" />
    <!-- <vo-photo-gallery ref="photoGalleryRef"></vo-photo-gallery> -->
    <div @click="showFn">55555</div>
  </div>
</template>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
