<template>
  <p class="paragraph">Times clicked: {{ count }}</p>
  <button @click="increment">increment</button>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  var count = ref(0)

  function increment() {
    console.log(count)
  }
</script>
