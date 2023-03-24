<template>
  <div class="era-form-footer" :style="extStyles" :class="extClass">
    <AButton :disabled="btnLoading" @click="handlerRest">{{ cancelButtonText }}</AButton>
    <AButton
      @click="handlerSubmit"
      :disabled="btnLoading"
      :loading="btnLoading"
      class="ml-4"
      type="primary"
      >{{ confirmButtonText }}</AButton
    >
  </div>
</template>

<script>
  export default {
    name: 'EraProFormFooter',
    emits: ['footerSubmit','footerRest'],
    props: {
      extStyles: {
        type: Object,
        default: () => {},
      },
      extClass: {
        type: String,
        default: '',
      },
      cancelButtonText: {
        type: String,
      },
      confirmButtonText: {
        type: String,
      },
    },
    data() {
      return {
        btnLoading: false,
      }
    },
    methods: {
      handlerRest() {
        this.$emit('footerRest')
      },
      handlerSubmit() {
        this.$emit('footerSubmit')
      },
    },
    created() {},
  }
</script>

<style lang="less" scoped>
  .era-form-footer {
    &.filter {
      margin-left: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .submit-btn {
      margin-left: 10px;
    }
  }
</style>
