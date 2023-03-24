<template
  ><div class="slider">
    <h1 class="titleSlider">Slider 滑动输入条</h1>
    <h2>当用户需要在数值区间/自定义区间内进行选择时，可为连续或离散值。</h2>
  </div>
  <div class="sliderList">
    <h2>带输入框的滑块 和 数字输入框 组件保持同步。。</h2>
    <Row>
      <Col :span="12">
        <Slider v-model:value="inputValue1" :min="1" :max="20" />
      </Col>
      <Col :span="4">
        <InputNumber v-model:value="inputValue1" :min="1" :max="20" style="margin-left: 16px" />
      </Col>
    </Row>
    <Row>
      <Col :span="12">
        <Slider v-model:value="inputValue" :min="0" :max="1" :step="0.01" />
      </Col>
      <Col :span="4">
        <InputNumber
          v-model:value="inputValue"
          :min="0"
          :max="1"
          :step="0.01"
          style="margin-left: 16px"
        />
      </Col>
    </Row>
    <br />
    <br />
    <br />
    <h1> 使用属性标注分段式滑块, 指定滑块位置。 </h1>
    <br />
    <sliderCom />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import sliderCom from '/@/components/VobasicCom/sliderCom.vue'

  export default defineComponent({
    components: {  },
    setup() {
      const inputValue = ref<number>(0)
      const inputValue1 = ref<number>(1)
      return {
        inputValue,
        inputValue1,
      }
    },
  })
</script>

<style scoped>
  .slider {
    width: 80%;
    height: 100px;
    margin: 20px auto;
  }

  .titleSlider {
    font-size: 30px;
  }

  .sliderList {
    padding: 40px;
    width: 80%;
    height: 500px;
    border: 1px solid #b3b3b3;
    margin: 20px auto;
  }
</style>
