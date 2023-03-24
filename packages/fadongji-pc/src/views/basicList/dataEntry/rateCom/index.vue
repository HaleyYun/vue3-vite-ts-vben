<template>
  <div class="rate">
    <h1 class="titleRate">Switch 开关 · Select 选择器 · Rate 评分</h1>
  </div>
  <div class="rateList">
    <h1>需要表示开关状态/两种状态之间的切换时 文字和图标</h1>
    <Switch checked-children="开" un-checked-children="关" v-model:checked="checked1" />
    <br />
    <br />
    <Switch checked-children="1" un-checked-children="0" v-model:checked="checked2" />
    <br />
    <br />
    <Switch v-model:checked="checked3">
      <template #checkedChildren><CheckOutlined /></template>
      <template #unCheckedChildren><CloseOutlined /></template>
    </Switch>
    <br />
    <br />
    <h1> 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。 </h1>
    <br />
    <choice />
    <br />
    <br />
    <br />
    <br />
    <h1>对事物进行快速的评级操作 </h1>
    <a-rate v-model:value="value" allow-half />
    <br />
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, ref } from 'vue'

  import choice from '/@/components/VobasicCom/choice.vue'
  import { CheckOutlined, CloseOutlined } from '@ant-design/icons-vue'
  export default defineComponent({
    components: { choice, CheckOutlined, CloseOutlined },
    setup() {
      const value = ref<number>(2.5)
      const state = reactive({
        checked1: true,
        checked2: false,
        checked3: false,
      })
      return { ...toRefs(state), CheckOutlined, CloseOutlined, value }
    },
  })
</script>

<style scoped>
  .rate {
    width: 80%;
    height: 100px;
    margin: 20px auto;
  }

  .titleRate {
    font-size: 30px;
  }

  .rateList {
    padding: 40px;
    width: 80%;
    height: 500px;
    border: 1px solid #b3b3b3;
    margin: 20px auto;
  }
</style>
