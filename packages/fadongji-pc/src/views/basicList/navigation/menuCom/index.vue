<template>
  <div class="menu">
    <h1 class="titleMenu">Menu 导航菜单</h1>
    <h2
      >导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。一般分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构</h2
    >
  </div>
  <div class="menuList">
    <Menu v-model:selectedKeys="current" mode="horizontal">
      <MenuItem key="mail">
        <template #icon>
          <mail-outlined />
        </template>
        导航一
      </MenuItem>
      <MenuItem key="app" disabled>
        <template #icon>
          <appstore-outlined />
        </template>
        导航二
      </MenuItem>
      <SubMenu>
        <template #icon>
          <setting-outlined />
        </template>
        <template #title>导航三</template>
        <MenuItemGroup title="一单元">
          <MenuItem key="setting:1">模块一</MenuItem>
          <MenuItem key="setting:2">模块二</MenuItem>
        </MenuItemGroup>
        <MenuItemGroup title="二单元">
          <MenuItem key="setting:3">模块三</MenuItem>
          <MenuItem key="setting:4">模块四</MenuItem>
        </MenuItemGroup>
      </SubMenu>
      <MenuItem key="alipay">
        <a href="javascript:;" target="_blank" rel="noopener noreferrer"> 导航四 </a>
      </MenuItem>
    </Menu>
    <br />
    <br />
    <h1> 侧边垂直菜单，子菜单内嵌在菜单区域。 </h1>
    <Menu
      id="dddddd"
      style="width: 256px"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      @click="handleClick"
    >
      <SubMenu key="sub1" @titleClick="titleClick">
        <template #icon>
          <MailOutlined />
        </template>
        <template #title>导航一</template>
        <MenuItem-group key="g1">
          <template #icon>
            <QqOutlined />
          </template>
          <template #title>单元</template>
          <MenuItem key="1">模块一</MenuItem>
          <MenuItem key="2">模块二</MenuItem>
        </MenuItem-group>
      </SubMenu>
      <SubMenu key="sub2" @titleClick="titleClick">
        <template #icon>
          <AppstoreOutlined />
        </template>
        <template #title>导航二</template>
        <MenuItem key="5">模块一</MenuItem>
      </SubMenu>
      <SubMenu key="sub4">
        <template #icon>
          <SettingOutlined />
        </template>
        <template #title>导航三</template>
      </SubMenu>
    </Menu>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue'

  import {
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
    QqOutlined,
  } from '@ant-design/icons-vue'
  export default defineComponent({
    components: {
      MailOutlined,
      AppstoreOutlined,
      SettingOutlined,
      QqOutlined,
     
    },
    setup() {
      const current = ref<string[]>(['mail'])
      const selectedKeys = ref<string[]>(['1'])
      const openKeys = ref<string[]>(['sub1'])
      const handleClick = (e: Event) => {
        console.log('click', e)
      }
      const titleClick = (e: Event) => {
        console.log('titleClick', e)
      }
      watch(
        () => openKeys,
        (val) => {
          console.log('openKeys', val)
        },
      )
      return {
        current,
        selectedKeys,
        openKeys,

        handleClick,
        titleClick,
      }
    },
  })
</script>

<style scoped>
  .menu {
    width: 80%;
    height: 100px;
    margin: 20px auto;
  }

  .titleMenu {
    font-size: 30px;
  }

  .menuList {
    padding: 40px;
    width: 80%;
    height: 500px;
    border: 1px solid #b3b3b3;
    margin: 20px auto;
  }
</style>
