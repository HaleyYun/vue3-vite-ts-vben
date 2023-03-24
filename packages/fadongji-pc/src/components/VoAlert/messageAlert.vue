<template>
  <div class="message-alert__position">
    <a-alert :message="messageInfo" :description="descriptionInfo" type="success" show-icon>
      <template #icon><smile-outlined /></template>
    </a-alert>
  </div>
</template>
<script lang="ts">
  import { ref } from 'vue'
  import { SmileOutlined } from '@ant-design/icons-vue'
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'MessageAlert',
    components: { SmileOutlined },
    props: {
      showType: {
        type: String,
        default: 'error',
      },
      message: {
        type: String,
        default: '错误',
      },
      description: {
        type: String,
        default: '获取内容有误',
      },
      type: {
        type: String,
        default: 'error',
      },
    },
    setup(prop) {
      const typeShow = ref(prop.showType)
      const messageInfo = ref(prop.message)
      const descriptionInfo = ref(prop.description)
      return {
        typeShow,
        messageInfo,
        descriptionInfo,
      }
    },
  })
</script>
<style lang="less" scoped>
  .message-alert__position {
    width: 40%;
    margin-left: 30%;
  }
</style>
