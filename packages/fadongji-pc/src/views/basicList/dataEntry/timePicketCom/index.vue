<template>
  <div class="picket">
    <h1 class="titlePicket">TimePicker 时间选择框</h1>
    <h2>当用户需要输入一个时间，可以点击标准输入框，弹出时间面板进行选择。</h2>
  </div>
  <div class="picketList">
    <h1> 点击 TimePicker,然后可以在浮层中选择或者输入某一时间 </h1>
    <TimePicker v-model:value="value" />
    <TimePicker v-model:value="strValue" valueFormat="HH:mm:ss" />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <h1> 禁用时间选择。 </h1>
    <TimePicker :value="moment('12:08:23', 'HH:mm:ss')" disabled />
  </div>
</template>

<script lang="ts">
  import moment from 'dayjs'

  import { defineComponent, ref, watch } from 'vue'

  export default defineComponent({
    components: {},
    setup() {
      const value = ref(moment('08:00:00', 'HH:mm:ss'))
      const strValue = ref<string>('09:00:00')

      watch(value, () => {})
      watch(strValue, () => {})
      return {
        value,
        strValue,
        moment,
      }
    },
  })
</script>

<style scoped>
  .picket {
    width: 80%;
    height: 100px;
    margin: 20px auto;
  }

  .titlePicket {
    font-size: 30px;
  }

  .picketList {
    padding: 40px;
    width: 80%;
    height: 500px;
    border: 1px solid #b3b3b3;
    margin: 20px auto;
  }
</style>
