<template>
  <div class="box">
    <h1 class="title">Message 全局提示</h1>
    <h2>全局展示操作反馈信息。</h2>
  </div>
  <div class="boxList">
    <h1> 提供成功、警告和错误等反馈信息。 </h1>
    <br />
    <Button type="primary" @click="info">显示正常信息</Button>
    <br />
    <br />
    <Button type="primary" @click="openMessage">打开消息框</Button>
    <br />
    <br />
    <Button @click="success">成功</Button>
    <br />
    <br />
    <Button @click="error">错误</Button>
    <br />
    <br />
    <Button @click="warning">警告</Button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { message } from "ant-design-vue";

const key = 'updatable'
  export default defineComponent({
    components: {  },
    setup() {
      const openMessage = () => {
        message.loading({ content: 'Loading...', key })
        setTimeout(() => {
          message.success({ content: 'Loaded!', key, duration: 2 })
        }, 1000)
      }
      const info = () => {
        message.info('这是正常的信息')
      }
      const success = () => {
        message.success('这是一个成功的信息')
      }
      const error = () => {
        message.error('这是一条错误消息')
      }
      const warning = () => {
        message.warning('这是一条警告信息')
      }
      return {
        info,
        openMessage,
        success,
        error,
        warning,
      }
    },
  })
</script>

<style scoped>
  .box {
    width: 80%;
    height: 100px;
    margin: 20px auto;
  }

  .title {
    font-size: 30px;
  }

  .boxList {
    padding: 40px;
    width: 80%;
    height: 500px;
    border: 1px solid #b3b3b3;
    margin: 20px auto;
  }
</style>
