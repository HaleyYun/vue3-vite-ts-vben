<template>
  <div class="box">
    <h1 class="title">Notification 通知提醒框</h1>
    <h2>全局展示通知提醒信息。</h2>
  </div>
  <div class="boxList">
    <h1> 在系统四个角显示通知提醒信息。经常用于以下情况： </h1>
    <br />
    <br />
    <br />
    <br />
    <div>
      <Button type="primary" @click="openNotification('topLeft')">
        <RadiusUpleftOutlined />
        上左
      </Button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Button type="primary" @click="openNotification('topRight')">
        <RadiusUprightOutlined />
        上右
      </Button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <a-divider />
      <Button type="primary" @click="openNotification('bottomLeft')">
        <RadiusBottomleftOutlined />
        下左
      </Button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Button type="primary" @click="openNotification('bottomRight')">
        <RadiusBottomrightOutlined />
        下右
      </Button>
    </div>
    <br />
    <br />
  </div>
</template>

<script lang="ts">
import {
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined
} from "@ant-design/icons-vue";
import { notification } from "ant-design-vue";
import { defineComponent } from "vue";

export default defineComponent({
    components: {
      RadiusUpleftOutlined,
      RadiusUprightOutlined,
      RadiusBottomleftOutlined,
      RadiusBottomrightOutlined,

    },
    setup() {
      const openNotification = (placement) => {
        notification.open({
          message: ` ${placement}`,
          description:
            '这是通知的内容。这是通知的内容。这是通知的内容。这是通知的内容。这是通知的内容。这是通知的内容。',
          placement,
        })
      }
      return {
        openNotification,
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
