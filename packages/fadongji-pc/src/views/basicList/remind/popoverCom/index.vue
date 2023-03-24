<template>
  <div class="box">
    <h1 class="title">Popover 气泡卡片</h1>
    <h2>当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。</h2>
  </div>
  <div class="boxList">
    <h1> 位置有十二个方向。 </h1>
    <br />
    <br />
    <br />
    <br />
    <div id="components-popover-demo-placement">
      <div :style="{ marginLeft: `${buttonWidth}px`, whiteSpace: 'nowrap' }">
        <Popover placement="topLeft">
          <template #content>
            <p>Content</p>
            <p>Content</p>
          </template>
          <template #title>
            <span>Title</span>
          </template>
          <Button>TL</Button>
        </Popover>
        <Popover placement="top">
          <template #content>
            <p>Content</p>
            <p>Content</p>
          </template>
          <template #title>
            <span>Title</span>
          </template>
          <Button>Top</Button>
        </Popover>
        <Popover placement="topRight">
          <template #content>
            <p>Content</p>
            <p>Content</p>
          </template>
          <template #title>
            <span>Title</span>
          </template>
          <Button>TR</Button>
        </Popover>
      </div>
      <div :style="{ width: `${buttonWidth}px`, float: 'left' }">
        <Popover placement="leftTop">
          <template #content>
            <p>Content</p>
            <p>Content</p>
          </template>
          <template #title>
            <span>Title</span>
          </template>
          <Button>LT</Button>
        </Popover>
        <Popover placement="left">
          <template #content>
            <p>Content</p>
            <p>Content</p>
          </template>
          <template #title>
            <span>Title</span>
          </template>
          <Button>Left</Button>
        </Popover>
        <Popover placement="leftBottom">
          <template #content>
            <p>Content</p>
            <p>Content</p>
          </template>
          <template #title>
            <span>Title</span>
          </template>
          <Button>LB</Button>
        </Popover>
      </div>
      <div :style="{ width: `${buttonWidth}px`, marginLeft: `${buttonWidth * 4 + 24}px` }">
        <Popover placement="rightTop">
          <template #content>
            <p>Content</p>
            <p>Content</p>
          </template>
          <template #title>
            <span>Title</span>
          </template>
          <Button>RT</Button>
        </Popover>
        <Popover placement="right">
          <template #content>
            <p>Content</p>
            <p>Content</p>
          </template>
          <template #title>
            <span>Title</span>
          </template>
          <Button>Right</Button>
        </Popover>
        <Popover placement="rightBottom">
          <template #content>
            <p>Content</p>
            <p>Content</p>
          </template>
          <template #title>
            <span>Title</span>
          </template>
          <Button>RB</Button>
        </Popover>
      </div>
      <div :style="{ marginLeft: `${buttonWidth}px`, clear: 'both', whiteSpace: 'nowrap' }">
        <Popover placement="bottomLeft">
          <template #content>
            <p>Content</p>
            <p>Content</p>
          </template>
          <template #title>
            <span>Title</span>
          </template>
          <Button>BL</Button>
        </Popover>
        <Popover placement="bottom">
          <template #content>
            <p>Content</p>
            <p>Content</p>
          </template>
          <template #title>
            <span>Title</span>
          </template>
          <Button>Bottom</Button>
        </Popover>
        <Popover placement="bottomRight">
          <template #content>
            <p>Content</p>
            <p>Content</p>
          </template>
          <template #title>
            <span>Title</span>
          </template>
          <Button>BR</Button>
        </Popover>
      </div>
    </div>
    <br />
    <br />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    components: {  },
    setup() {
      return {
        buttonWidth: ref<number>(70),
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

  #components-popover-demo-placement .ant-btn {
    width: 70px;
    text-align: center;
    padding: 0;
    margin-right: 8px;
    margin-bottom: 8px;
  }
</style>
