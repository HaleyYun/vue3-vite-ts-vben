<template>
  <div class="item-wrap">
    <a-checkbox-group v-model:value="checks" @change="handlerSpecRowAttrChange">
      <a-checkbox v-for="item of row.attrs" :value="item.name">{{ item.name }}</a-checkbox>
    </a-checkbox-group>
  </div>
</template>

<script lang="ts" setup>
  import { watch, ref, reactive } from 'vue'

  const props = defineProps({
    row: {
      required: true,
    },
  })

  const checks = ref([])

  const handlerSpecRowAttrChange = (evt) => {
    console.log('handlerSpecRowAttrChange', evt)
  }
</script>

<style lang="scss" scoped>
  .spec {
    &-box {
    }
    &-row {
      &__title {
      }
      &__attr {
      }
    }
  }
</style>
