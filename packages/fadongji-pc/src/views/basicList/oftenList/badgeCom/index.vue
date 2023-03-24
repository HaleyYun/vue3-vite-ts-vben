<template>
  <div class="badge">
    <h1 class="titleBadge">Badge 徽标数</h1>
    <h2
      >一般出现在通知图标或头像的右上角，用于显示需要处理的消息条数，通过醒目视觉形式吸引用户处理</h2
    >
  </div>
  <div class="badgeList">
    <h1> 自定义标题 </h1>
    <div id="components-badge-demo-title">
      <Badge :count="5" title="Custom hover text">
        <a href="#" class="head-example"></a>
      </Badge>
    </div>
    <br />
    <br />
    <h1> 独立使用 不包裹任何元素即是独立使用，可自定样式展现。 在右上角的 badge 则限定为红色。 </h1>
    <Badge count="25" />
    <Badge
      count="4"
      :number-style="{
        backgroundColor: '#fff',
        color: '#999',
        boxShadow: '0 0 0 1px #d9d9d9 inset',
      }"
    />
    <Badge count="109" :number-style="{ backgroundColor: '#52c41a' }" />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <h1> 封顶数字 </h1>
    <br />
    <Badge :count="99"> <a href="#" class="head-example"></a> </Badge>&nbsp;&nbsp;
    <Badge :count="100"> <a href="#" class="head-example"></a> </Badge>&nbsp;&nbsp;
    <Badge :count="99" :overflow-count="10"> <a href="#" class="head-example"></a> </Badge
    >&nbsp;&nbsp;
    <Badge :count="1000" :overflow-count="999">
      <a href="#" class="head-example"></a>
    </Badge>
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
  .badge {
    width: 80%;
    height: 100px;
    margin: 20px auto;
  }

  .titleBadge {
    font-size: 30px;
  }

  .badgeList {
    padding: 40px;
    width: 80%;
    height: 500px;
    border: 1px solid #b3b3b3;
    margin: 20px auto;
  }

  #components-badge-demo-title .ant-badge:not(.ant-badge-status) {
    margin-right: 20px;
  }

  .head-example {
    width: 42px;
    height: 42px;
    border-radius: 4px;
    background: rebeccapurple;
    display: inline-block;
  }
</style>
