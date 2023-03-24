<template>
  <div class="fast-list">
    <Card
      :loading="loading"
      bordered
      :hoverAble="true"
      class="list-card w-full"
      title="快捷方式"
      :headStyle="{ backgroundColor: '#F3F3F3', fontSize: '14px' }"
    >
      <div class="card-box">
        <template v-for="item in growQuickList" :key="item.title">
          <div class="card-box-quick">
            <img class="quick-img" :src="item.img" />
            <p>{{ item.title }}</p>
          </div>
        </template>
      </div>
    </Card>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { Card } from 'ant-design-vue'
  import { growQuickList } from './quickData'
  export default defineComponent({
    components: { Card },
    setup() {
      const loading = ref(false)
      return {
        growQuickList,
        loading,
      }
    },
  })
</script>
<style lang="less">
  .fast-list {
    padding: 20px;
    padding-top: 0;

    .list-card {
      border: 1px solid #ccc;

      .card-box {
        display: flex;
        justify-content: space-between;

        .card-box-quick {
          .quick-img {
            width: 50px;
            height: 50px;
            margin-bottom: 15px;
          }
        }
      }
    }
  }
</style>
