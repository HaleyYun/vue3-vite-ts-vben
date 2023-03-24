<template>
  <div class="inputNum">
    <h1 class="titleInput">InputNumber 数字输入框</h1>
    <h2>通过鼠标或键盘，输入范围内的数值。</h2>
  </div>
  <div class="inputList">
    <h2>数字输入框。</h2>
    <InputNumber id="inputNumber" v-model:value="value" :min="1" :max="10" />
    当前值：{{ value }}
    <br />
    <br />
    <h1> 点击按钮切换可用/不可用状态。 </h1>
    <InputNumber :min="1" :max="10" :disabled="disabled" v-model:value="value1" />
    <div style="margin-top: 20px">
      <Button type="primary" @click="toggle">切换可用</Button>
    </div>
    <br />
    <br />
    <h1>精确小数</h1>
    <InputNumber v-model:value="value2" :min="0" :max="10" :step="0.1" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    components: {  },
    setup() {
      const value = ref<number>(3)
      const value1 = ref<number>(3)
      const value2 = ref<number>(0.0)
      const disabled = ref<boolean>(true)

      const toggle = () => {
        disabled.value = !disabled.value
      }
      return {
        value,
        value1,
        value2,
        disabled,
        toggle,
      }
    },
  })
</script>

<style scoped>
  .inputNum {
    width: 80%;
    height: 100px;
    margin: 20px auto;
  }

  .titleInput {
    font-size: 30px;
  }

  .inputList {
    padding: 40px;
    width: 80%;
    height: 500px;
    border: 1px solid #b3b3b3;
    margin: 20px auto;
  }
</style>
