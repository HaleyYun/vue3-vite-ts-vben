<template>
  <div class="box">
    <h1 class="title">Tag 标签</h1>
    <h2>用于标记事物的属性和维度。 进行分类。</h2>
  </div>
  <div class="boxList">
    <h1> 可选择，点击切换选中效果。 </h1>
    <div class="tag1">
      <br />
      分类:
      <CheckableTag v-model:checked="checked1" @change="handleChange">电影</CheckableTag>
      <CheckableTag v-model:checked="checked2" @change="handleChange">音乐</CheckableTag>
      <CheckableTag v-model:checked="checked3" @change="handleChange">图书</CheckableTag>
      <br />
      <br />
      <h4 style="margin-bottom: 16px">预设:</h4>
      <div>
        <Tag color="pink">pink</Tag>
        <Tag color="red">red</Tag>
        <Tag color="orange">orange</Tag>
        <Tag color="green">green</Tag>
        <Tag color="cyan">cyan</Tag>
        <Tag color="blue">blue</Tag>
        <Tag color="purple">purple</Tag>
      </div>
      <br />
      <h4 style="margin: '16px 0'">颜色:</h4>
      <div>
        <Tag color="#f50">#f50</Tag>
        <Tag color="#2db7f5">#2db7f5</Tag>
        <Tag color="#87d068">#87d068</Tag>
        <Tag color="#108ee9">#108ee9</Tag>
      </div>
    </div>
    <br />
    <br />
    <h1>动态添加和删除</h1>
    <div class="tag2">
      <br />
      <tagCom />
    </div>
    <br />
    <br />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'

  import tagCom from '/@/components/VobasicCom/tagCom.vue'
  export default defineComponent({
    components: { tagCom },
    setup() {
      // or use watch
      const handleChange = (checked: boolean) => {
        console.log(checked)
      }

      return {
        handleChange,
        checked1: ref(false),
        checked2: ref(false),
        checked3: ref(false),
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

  .tag1 {
    border: 1px solid #b3b3b3;
    height: 230px;
  }

  .tag2 {
    border: 1px solid #b3b3b3;
    height: 100px;
  }
</style>
