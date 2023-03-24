<template>
  <div class="box">
    <h1 class="title">Tabs 标签页</h1>
    <h2>提供平级的区域将大块内容进行收纳和展现，保持界面整洁。</h2>
  </div>
  <div class="boxList">
    <h1> 选项卡窗格 1 的内容 </h1>
    <div class="tab1">
      <Tabs v-model:activeKey="activeKey">
        <TabPane key="1" tab="选项一">内容一</TabPane>
        <TabPane key="2" tab="选项二" force-render>内容二</TabPane>
        <TabPane key="3" tab="选项三">内容三</TabPane>
      </Tabs>
    </div>
    <br />
    <br />
    <br />
    <h1>有图标的标签。</h1>
    <div class="tab1">
      <Tabs v-model:activeKey="activeKey1">
        <TabPane key="1">
          <template #tab>
            <span>
              <AppleOutlined />
              选项一
            </span>
          </template>
          内容一
        </TabPane>
        <TabPane key="2">
          <template #tab>
            <span>
              <AndroidOutlined />
              选项二
            </span>
          </template>
          内容二
        </TabPane>
      </Tabs>
    </div>

    <br />
    <br />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'

  import { AppleOutlined, AndroidOutlined } from '@ant-design/icons-vue'
  export default defineComponent({
    components: { AppleOutlined, AndroidOutlined },
    setup() {
      return {
        activeKey: ref('1'),
        activeKey1: ref('1'),
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

  .tab1 {
    border: 1px solid #b3b3b3;
    height: 150px;
  }
</style>
