<template>
  <h2>常规表单</h2>
  <div class="components-form-demo">
    <drawerForm />
  </div>
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <h2>弹窗表单</h2>
  <div class="components components-form-demo">
    <Button @click="showModal" class="components-button-demo">ModalForm</Button>
    <Modal v-model:visible="loading" width="1000px" title="" @ok="handleOk">
      <div style="height: 600px">
        <br />
        <br />
        <br />
        <drawerForm />
      </div>
    </Modal>
  </div>
  <br />
  <br />
  <br />
  <br />
  <br />
  <h2>抽屉表单</h2>
  <div class="components components-form-demo">
    <Button @click="showDrawer" class="components-button-demo">DrawerForm</Button>
    <Drawer
      v-model:visible="visible"
      class="custom-class"
      style="color: red"
      width="600px"
      title="创建用户"
      placement="right"
      @after-visible-change="afterVisibleChange"
    >
      <drawerForm />
    </Drawer>
  </div>
  <br />
  <br />
  <br />
  <br />
  <br />
  <h2>分步表单</h2>
  <div class="components components-form-demo"> <stepsForm /></div>
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <h2>查询表单</h2>
  <div class="filerList components-form-demo">
    <queryFilter />
  </div>
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
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { Button, Modal, Drawer } from 'ant-design-vue'
  import drawerForm from '/@/components/VoFrom/drawerForm.vue'
  import queryFilter from '../../../components/VoFrom/queryFilter.vue'
  import stepsForm from '../../../components/VoFrom/stepsForm.vue'
  export default defineComponent({
    components: { stepsForm, drawerForm, queryFilter, Button, Modal, Drawer },
    setup() {
      const visible = ref(false)

      const afterVisibleChange = (bool) => {
        console.log('visible', bool)
      }

      const showDrawer = () => {
        visible.value = true
      }
      //弹窗
      const loading = ref<boolean>(false)

      const showModal = () => {
        loading.value = true
      }

      const handleOk = (e: MouseEvent) => {
        console.log(e)
        loading.value = false
      }

      //常规
      const showProForm = () => {
        showPro.value = true
      }
      const showPraForm = () => {
        showPro.value = false
      }
      const showPro = ref<boolean>(false)
      return {
        //抽屉
        visible,
        afterVisibleChange,
        showDrawer,
        // 弹出
        loading,
        showModal,
        handleOk,
        //常规
        showProForm,
        showPro,
        showPraForm,
      }
    },
  })
</script>

<style scoped>
  h2 {
    font-size: 24px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }

  .components-form-demo {
    /* display: flex; */
    border: 1px solid #c4c4c4;
    margin: 10px auto;
    width: 90%;
  }

  .components-button-demo {
    margin: 10px 30%;
    width: 20%;
  }
</style>
