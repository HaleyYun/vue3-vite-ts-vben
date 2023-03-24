<template>
  <div class="home-head">
    <Row :gutter="24">
      <template v-for="item in growCardList" :key="item.id">
        <Col :span="6">
          <Card :loading="loading" bordered class="head-card w-full">
            <img class="head-current" :src="item.img" alt="展示图片" />
            <CardMeta :title="item.title" class="head-text" />
            <br />
            <CountTo :startVal="2" :endVal="item.value" class="text-2xl" />
          </Card>
        </Col>
      </template>
    </Row>
  </div>
</template>

<script lang="ts" setup>
  import { CountTo } from '/@/components/CountTo/index'
  import { Card, Row, Col } from 'ant-design-vue'
  import { growCardList } from './data'
  const CardMeta = Card.Meta

  defineProps({
    loading: {
      type: Boolean,
    },
  })
</script>
<style lang="less" scoped>
  .home-head {
    padding: 20px;

    .ant-card-body {
      position: relative;

      .text-2xl {
        position: absolute;
        left: 100px;
        top: 50px;
      }
    }

    .head-text {
      position: absolute;
      left: 100px;
      top: 30px;
    }

    .head-card {
      border: 1px solid #ccc;

      .head-current {
        margin-top: 10px;
        width: 50px;
        height: 50px;
      }
    }
  }
</style>
