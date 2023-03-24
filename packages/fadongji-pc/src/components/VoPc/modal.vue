<template>
  <div id="components-modal-demo-position">
    <br />
    <br />
    <Button type="primary" @click="modal2Visible = true" style="margin-left: 70px">
      编辑资料按钮
    </Button>
    <Modal v-model:visible="modal2Visible" centered :footer="null" :closable="false" width="1100px">
      <editData />
    </Modal>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { Button, Modal } from 'ant-design-vue'
  import editData from './editData.vue'
  export default defineComponent({
    components: { editData, Button, Modal },
    setup() {
      const modal1Visible = ref<boolean>(false)
      const modal2Visible = ref<boolean>(false)

      return {
        modal1Visible,
        modal2Visible,
      }
    },
  })
</script>
