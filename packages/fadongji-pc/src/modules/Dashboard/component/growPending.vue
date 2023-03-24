<template>
  <div class="details-list">
    <Row type="flex" justify="space-around">
      <template v-for="item in pendingData" :key="item.title">
        <Col :span="8">
          <Card :bordered="false" class="w-full">
            <a href="#">{{ item.title }}</a>
          </Card>
        </Col>
      </template>
    </Row>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue'
  import { Card, Row, Col } from 'ant-design-vue'
  export default defineComponent({
    components: { Card, Row, Col },
    setup() {
      const pendingData = reactive([
        { title: '待付款订单', content: '1' },
        { title: '待发货订单', content: '2' },
        { title: '已发货订单', content: '3' },
        { title: '已完成订单', content: '4' },
        { title: '新缺货登记', content: '5' },
        { title: '待处理退货订单', content: '6' },
        { title: '待确认退货订单', content: '7' },
        { title: '待处理退款申请', content: '8' },
        { title: '广告位即将到期', content: '9' },
      ])

      return {
        pendingData,
      }
    },
  })
</script>

<style lang="less" scoped>
  .details-list {
    padding: 20px;
    padding-top: 0;
  }
</style>
