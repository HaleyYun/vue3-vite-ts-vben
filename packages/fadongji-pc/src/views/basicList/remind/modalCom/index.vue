<template>
  <div class="box">
    <h1 class="title">Modal 对话框</h1>
    <h2>需要用户处理事务，又不希望跳转页面以致打断工作流程时使用</h2>
  </div>
  <div class="boxList">
    <h1> 自定义位置 </h1>
    <br />
    <br />
    <br />
    <div>
      <Button type="primary" @click="showModal">打开</Button>
      <Modal v-model:visible="visible" title="Basic Modal" @ok="handleOk">
        <p>一些内容...</p>
        <p>一些内容...</p>
        <p>一些内容...</p>
      </Modal>
    </div>
    <br />
    <br />
    <div id="components-modal-demo-position">
      <Button type="primary" @click="setModal1Visible(true)"> 在距离顶部20px打开</Button>
      <Modal
        title="20px to Top"
        style="top: 20px"
        v-model:visible="modal1Visible"
        @ok="setModal1Visible(false)"
      >
        <p>一些内容...</p>
        <p>一些内容...</p>
        <p>一些内容...</p>
      </Modal>
      <br />
      <br />
      <br />
      <Button type="primary" @click="modal2Visible = true"> 居中打开</Button>
      <Modal
        v-model:visible="modal2Visible"
        title="Vertically centered modal dialog"
        centered
        @ok="modal2Visible = false"
      >
        <p>一些内容...</p>
        <p>一些内容...</p>
        <p>一些内容...</p>
      </Modal>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    components: {},
    setup() {
      const visible = ref<boolean>(false)

      const showModal = () => {
        visible.value = true
      }

      const handleOk = (e: MouseEvent) => {
        visible.value = false
      }
      const modal1Visible = ref<boolean>(false)
      const modal2Visible = ref<boolean>(false)

      const setModal1Visible = (visible: boolean) => {
        modal1Visible.value = visible
      }
      return {
        visible,
        showModal,
        handleOk,
        modal1Visible,
        modal2Visible,
        setModal1Visible,
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
