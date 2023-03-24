<template>
  <div class="down">
    <h1 class="titleDown">Dropdown 下拉菜单</h1>
    <h2
      >当页面上的操作命令过多时，用此组件可以收纳操作元素。点击或移入触点，会出现一个下拉菜单。可在列表中进行选择，并执行相应的命令。</h2
    >
  </div>
  <div class="downList">
    <Dropdown>
      <a class="ant-dropdown-link" @click.prevent>
        主菜单
        <DownOutlined />
      </a>
      <template #overlay>
        <Menu>
          <MenuItem>
            <a href="javascript:;">菜单一</a>
          </MenuItem>
          <MenuItem>
            <a href="javascript:;">菜单二</a>
          </MenuItem>
          <MenuItem>
            <a href="javascript:;">菜单三</a>
          </MenuItem>
        </Menu>
      </template>
    </Dropdown>
    <br />
    <br />
    <h1> 默认是移入触发菜单，可以点击鼠标右键触发 </h1>
    <Dropdown :trigger="['contextmenu']">
      <div
        :style="{
          textAlign: 'center',
          background: '#f7f7f7',
          height: '200px',
          lineHeight: '200px',
          color: '#777',
        }"
      >
        点击鼠标右键触发
      </div>
      <template #overlay>
        <Menu>
          <MenuItem key="1">内容一</MenuItem>
          <MenuItem key="2">内容二</MenuItem>
          <MenuItem key="3">内容三</MenuItem>
        </Menu>
      </template>
    </Dropdown>
  </div></template
>

<script lang="ts">
  import { defineComponent } from 'vue'

  import { DownOutlined } from '@ant-design/icons-vue'
  export default defineComponent({
    components: { DownOutlined,  },
    setup() {
      console.log('6666')
      return {}
    },
  })
</script>

<style scoped>
  .down {
    width: 80%;
    height: 100px;
    margin: 20px auto;
  }

  .titleDown {
    font-size: 30px;
  }

  .downList {
    padding: 40px;
    width: 80%;
    height: 400px;
    border: 1px solid #b3b3b3;
    margin: 20px auto;
  }
</style>
