<template>
  <div>
    <div class=" flex items-center justify-between messageList">
      <div class="flex-col flex1">
        <div class="text-16px flex items-center">
          <img class="w-24px h-24px mr-15px" src="../../../../assets/images/Shape.png"/>
          {{ message }}
          <span class="text-14px ml-200px " >
            <slot name="description"></slot>
          </span>
        </div>
        <div class="mt-5px"  v-if="description">{{description?description:'--'}}</div>
      </div>
      <slot name="options"></slot>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'GoodAlert',
    props: {
      message: {
        type: String,
      },
      description: {
        type: String,
      },
      error: {
        type: String,
      },
    },
    setup() {},
  })
</script>
<style lang="scss" scoped>
  .messageList{
    background: #FAE3E3;
    border: 1px solid #F99696;
    border-radius: 2px;
    align-items: flex-start;
    padding: 16px 26px;
    color: rgba(0, 0, 0, 0.85);
  }
</style>
