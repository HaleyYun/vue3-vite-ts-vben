<template>
  <div class="box">
    <h1 class="title">List 列表</h1>
    <h2>最基础的列表展示，可承载文字、列表、图片、段落，常用于后台数据展示页面。</h2>
  </div>
  <div class="boxList">
    <h1> 通用列表。 </h1>
    <List item-layout="horizontal" :data-source="data">
      <template #renderItem="{ item }">
        <ListItem>
          <ListItemMeta description="这是内容区域">
            <template #title>
              <a href="https://www.antdv.com/">{{ item.title }}</a>
            </template>
            <template #avatar>
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            </template>
          </ListItemMeta>
        </ListItem>
      </template>
    </List>
    <br />
    <br />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  interface DataItem {
    title: string
  }
  const data: DataItem[] = [
    {
      title: '这是一个标题 1',
    },
    {
      title: '这是一个标题 2',
    },
    {
      title: '这是一个标题 3',
    },
    {
      title: '这是一个标题 4',
    },
  ]
  export default defineComponent({
    components: {  },
    setup() {
      return { data }
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
