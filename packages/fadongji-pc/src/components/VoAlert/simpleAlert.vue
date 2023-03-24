<template>
  <div>
    <a-modal
      v-model:visible="visible"
      :title="aletTilte"
      :confirm-loading="confirmLoading"
      :body-style="bodyStryle"
      :okText="'确定'"
      :cancelText="'取消'"
      @ok="handleOk"
    >
      <div class="modal-content"><slot name="simgpleContent"></slot></div>
    </a-modal>
  </div>
</template>
<script lang="ts">
  import { ref, defineComponent } from 'vue'
  export default defineComponent({
    name: 'SimpleAlert',
    props: {
      height: {
        type: String,
        default: '60px',
      },
      title: {
        type: String,
        default: '信息提醒',
      },
    },
    setup(props) {
      const aletTilte = ref<string>(props.title) // 弹框名称
      const alertHeight = ref<string>(props.height) // 设置弹框高度
      const bodyStryle = ref({
        height: props.height + '',
        overflow: 'hidden',
        overflowY: 'scroll',
      })
      const visible = ref<boolean>(false)
      const confirmLoading = ref<boolean>(false)

      const showModal = () => {
        visible.value = true
      }

      const handleOk = () => {
        confirmLoading.value = true
        setTimeout(() => {
          visible.value = false
          confirmLoading.value = false
        }, 2000)
      }
      return {
        aletTilte,
        alertHeight,
        bodyStryle,
        visible,
        confirmLoading,
        showModal,
        handleOk,
      }
    },
  })
</script>
<style lang="less" scoped>
  .modal-content {
    padding-left: 10px;
    margin-top: 24px;
    font-size: 14px;
  }
</style>
