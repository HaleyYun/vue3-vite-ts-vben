<template>
  <div class="box">
    <h1 class="title">Spin 加载中</h1>
    <h2>页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。</h2>
  </div>
  <div class="boxList">
    <h1> 小的用于文本加载，默认用于卡片容器级加载，大的用于页面级加载。 </h1>
    <Space>
      <Spin size="small" />
      <Spin />
      <Spin size="large" />
    </Space>
    <br />
    <br />
    <br />
    <br />
    <h1> 自定义描述文案</h1>
    <Spin tip="Loading...">
      <a-alert
        message="Alert message title"
        description="Further details about the context of this alert."
      />
    </Spin>
    <br />
    <br />
    <br />
    <br />
    <h1>自定义指示符</h1>
    <Spin :indicator="indicator" />
  </div>
</template>

<script lang="ts">
import { LoadingOutlined } from "@ant-design/icons-vue";
import { defineComponent, h } from "vue";

export default defineComponent({
    components: {  },
    setup() {
      const indicator = h(LoadingOutlined, {
        style: {
          fontSize: '24px',
        },
        spin: true,
      })
      return {
        indicator,
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
