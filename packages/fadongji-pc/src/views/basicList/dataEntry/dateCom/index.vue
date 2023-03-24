<template>
  <div class="picker">
    <h1 class="titlePicker">DatePicker 日期 与 Checkbox 多选框</h1>
    <h2>DatePicker:日期范围选择框</h2>
    <h2>Checkbox:在一组可选项中进行多项选择时；</h2>
  </div>
  <div class="pickerList">
    <Space direction="vertical">
      <DatePicker show-time placeholder="选择时间" @change="onChange" @ok="onOk" />
      <a-range-picker
        :show-time="{ format: 'HH:mm' }"
        format="YYYY-MM-DD HH:mm"
        @change="onChange"
        @ok="onOk"
      />
    </Space>
    <br />
    <br />
    <br />
    <br />
    <h1> 在一组可选项中进行多项选择时。 </h1>
    <br />
    <checkbox />
    <br />
    <br />
    <br />
    <br />
    <h1> 用于在多个备选项中选中单个状态 </h1>
    <br />
    <radio />
  </div>
</template>

<script lang="ts">
  // import { Moment } from 'moment'
  import { defineComponent } from 'vue'
  import checkbox from '/@/components/VobasicCom/checkbox.vue'
  import radio from '/@/components/VobasicCom/radio.vue'

  export default defineComponent({
    components: { checkbox, radio },
    setup() {
      const onChange = (value, dateString) => {}

      const onOk = (value) => {}

      return {
        onChange,
        onOk,
      }
    },
  })
</script>

<style scoped>
  .picker {
    width: 80%;
    height: 100px;
    margin: 20px auto;
  }

  .titlePicker {
    font-size: 30px;
  }

  .pickerList {
    padding: 40px;
    width: 80%;
    height: 500px;
    border: 1px solid #b3b3b3;
    margin: 20px auto;
  }
</style>
