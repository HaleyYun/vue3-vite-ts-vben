<template>
  <div class="box">
    <h1 class="title">Timeline 时间轴</h1>
    <h2>当有一系列信息需按时间排列时，可正序和倒序。 需要有一条时间轴进行视觉上的串联时</h2>
  </div>
  <div class="boxList">
    <h1> 一条时间轴进行视觉上的串联时。 </h1>
    <br />
    <br />
    <Timeline>
      <TimelineItem color="red">创建服务 2022-04-01 </TimelineItem>
      <TimelineItem>解决初期网络问题 2022-04-01</TimelineItem>
      <TimelineItem>技术检测 2022-04-01</TimelineItem>
      <TimelineItem>正在解决的网络问题 2015-09-01</TimelineItem>
      <TimelineItem>解决初期网络问题 2022-04-01</TimelineItem>
      <TimelineItem>技术检测 2022-04-01</TimelineItem>
      <TimelineItem>正在解决的网络问题 2015-09-01</TimelineItem>
    </Timeline>
    <br />
    <br />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  // import { ClockCircleOutlined } from '@ant-design/icons-vue';

  export default defineComponent({
    components: {  },
    setup() {
      return {}
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
    background-color: #ffffff;
  }
</style>
