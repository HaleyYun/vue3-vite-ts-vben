<template>
  <div class="button">
    <h1 class="titleBtn">Button 按钮</h1>
    <h2
      >按钮有五种类型：主按钮、次按钮、虚线按钮、文本按钮和链接按钮。主按钮在同一个操作区域最多出现一次。</h2
    >
  </div>
  <div class="buttonList">
    <Button type="primary">主按钮</Button>&nbsp;&nbsp; <Button>默认按钮</Button>&nbsp;&nbsp;
    <Button type="dashed">虚线按钮</Button>&nbsp;&nbsp;
    <Button type="text">文本按钮</Button>&nbsp;&nbsp;
    <Button type="link">链接按钮</Button>&nbsp;&nbsp;
    <br />
    <br />
    <h1>
      图标按钮:当需要在 Button 内嵌入 Icon 时，可以设置 icon 属性，或者直接在 Button 内使用 Icon
      组件
    </h1>
    <Button type="primary" shape="circle">
      <template #icon>
        <SearchOutlined />
      </template> </Button
    >&nbsp;&nbsp; <Button type="primary" shape="circle">A</Button>&nbsp;&nbsp;
    <Button type="primary">
      <template #icon>
        <SearchOutlined />
      </template>
      搜索 </Button
    >&nbsp;&nbsp;
    <Button shape="circle">
      <template #icon>
        <SearchOutlined />
      </template> </Button
    >&nbsp;&nbsp;
    <Button>
      <template #icon>
        <SearchOutlined />
      </template>
      搜索 </Button
    >&nbsp;&nbsp;
    <Button shape="circle">
      <template #icon>
        <SearchOutlined />
      </template> </Button
    >&nbsp;&nbsp;
    <Button>
      <template #icon>
        <SearchOutlined />
      </template>
      搜索 </Button
    >&nbsp;&nbsp;
    <Button type="dashed" shape="circle">
      <template #icon>
        <SearchOutlined />
      </template> </Button
    >&nbsp;&nbsp;
    <Button type="dashed">
      <template #icon>
        <SearchOutlined />
      </template>
      搜索
    </Button>
    <br />
    <br />
    <br />
    <Button type="primary" disabled>禁用按钮</Button>&nbsp;&nbsp;
    <Button type="primary" loading>Loading</Button>&nbsp;&nbsp;
    <RadioGroup v-model:value="size">
      <RadioButton value="large">Large</RadioButton>
      <RadioButton value="default">Default</RadioButton>
      <RadioButton value="small">Small</RadioButton>
    </RadioGroup>
  </div>
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'

  import { SearchOutlined } from '@ant-design/icons-vue'
  export default defineComponent({
    components: {
      SearchOutlined,

    },
    setup() {
      console.log('333')
      return {
        size: ref('large'),
      }
    },
  })
</script>

<style scoped>
  .button {
    width: 80%;
    height: 100px;
    margin: 20px auto;
  }

  .buttonList {
    padding: 40px;
    width: 80%;
    height: 400px;
    border: 1px solid #b3b3b3;
    margin: 20px auto;
  }

  .titleBtn {
    font-size: 30px;
  }
</style>
