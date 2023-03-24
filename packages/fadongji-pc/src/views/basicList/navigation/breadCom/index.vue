<template>
  <div class="bread">
    <h1 class="titleBread">Breadcrumb 面包屑</h1>
    <h2>显示当前页面在系统层级结构中的位置，并能向上返回。</h2>
  </div>
  <div class="breadList">
    <Breadcrumb>
      <BreadcrumbItem>主页</BreadcrumbItem>
      <BreadcrumbItem><a href="javascript:;">应用中心</a></BreadcrumbItem>
      <BreadcrumbItem><a href="javascript:;">产品列表</a></BreadcrumbItem>
      <BreadcrumbItem>设置</BreadcrumbItem>
    </Breadcrumb>
    <br />
    <br />
    <h1> 图标:带有图标的面包屑 </h1>
    <Breadcrumb>
      <BreadcrumbItem href="javascript:;">
        <HomeOutlined />
      </BreadcrumbItem>
      <BreadcrumbItem href="javascript:;">
        <UserOutlined />
        <span>个人中心</span>
      </BreadcrumbItem>
      <BreadcrumbItem>设置</BreadcrumbItem>
    </Breadcrumb>
    <br />
    <br />
    <h1>带下拉菜单的面包屑</h1>
    <Breadcrumb>
      <BreadcrumbItem>VOCEN</BreadcrumbItem>
      <BreadcrumbItem><a href="javascript:;">应用中心</a></BreadcrumbItem>
      <BreadcrumbItem>
        <a href="">产品</a>
        <template #overlay>
          <Menu>
            <MenuItem>
              <a target="_blank" rel="noopener noreferrer" href="javascript:;">发动机</a>
            </MenuItem>
            <MenuItem>
              <a target="_blank" rel="noopener noreferrer" href="javascript:;">机油</a>
            </MenuItem>
            <MenuItem>
              <a target="_blank" rel="noopener noreferrer" href="javascript:;">轮胎</a>
            </MenuItem>
          </Menu>
        </template>
      </BreadcrumbItem>
      <BreadcrumbItem>按钮</BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { HomeOutlined, UserOutlined } from '@ant-design/icons-vue'

  export default defineComponent({
    components: {
      HomeOutlined,
      UserOutlined,

    },
    setup() {
      console.log('2222')
      return {}
    },
  })
</script>

<style scoped>
  .bread {
    width: 80%;
    height: 100px;
    margin: 20px auto;
  }

  .titleBread {
    font-size: 30px;
  }

  .breadList {
    padding: 40px;
    width: 80%;
    height: 400px;
    border: 1px solid #b3b3b3;
    margin: 20px auto;
  }
</style>
