<template>
  <div class="componentsForm">
    <Steps :current="current">
      <Step v-for="item in steps" :key="item.title" :title="item.title" />
    </Steps>
    <div class="stepsContent">
      <!-- {{ steps[current].content }} -->
      <div class="stepsContent">
        <Input placeholder="步骤一" />
      </div>
    </div>
    <div class="stepsAction">
      <Button v-if="current < steps.length - 1" type="primary" @click="next">下一步</Button>
      <Button
        v-if="current == steps.length - 1"
        type="primary"
        @click="message.success('处理完成')"
      >
        完成
      </Button>
      <Button v-if="current > 0" style="margin-left: 8px" @click="prev">上一步</Button>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { message } from 'ant-design-vue'
  import { Steps, Step, Input, Button } from 'ant-design-vue'
  export default defineComponent({
    components: { Steps, Step, Input, Button },
    setup() {
      const current = ref<number>(0)
      const next = () => {
        current.value++
      }
      const prev = () => {
        current.value--
      }
      return {
        message,
        current,
        steps: [
          {
            title: '第一步',
            content: '内容',
          },
          {
            title: '第二步',
            content: '内容',
          },
          {
            title: '第三步',
            content: '内容',
          },
        ],
        next,
        prev,
      }
    },
  })
</script>
<style scoped>
  .stepsContent {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }

  .stepsAction {
    margin-top: 24px;
  }

  .componentsForm {
    margin: 20px 20px;
  }
</style>
