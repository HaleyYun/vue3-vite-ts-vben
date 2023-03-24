<template>
  <div class="total-list">
    <Row :gutter="16">
      <Col :span="12">
        <Card
          bordered
          class="w-full list-goods"
          title="商品总览"
          :headStyle="{ backgroundColor: '#F3F3F3', fontSize: '14px' }"
        >
          <div class="goods-shop">
            <template v-for="item in growShopList" :key="item.title">
              <div class="shop-name">
                <CountTo :endVal="item.value" class="shop-count" />
                <p>{{ item.title }}</p>
              </div>
            </template>
          </div>
        </Card>
      </Col>
      <Col :span="12">
        <Card
          bordered
          class="w-full list-user"
          title="用户总览"
          :headStyle="{ backgroundColor: '#F3F3F3', fontSize: '14px' }"
        >
          <div class="user-box">
            <template v-for="item in growUserList" :key="item">
              <div class="userName">
                <CountTo :endVal="item.value" class="box-count" />
                <p>{{ item.title }}</p>
              </div>
            </template>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { growShopList, growUserList } from './shopData'
  import { Card, Col, Row } from 'ant-design-vue'
  import { CountTo } from '/@/components/CountTo/index'
  export default defineComponent({
    components: { CountTo, Card, Col, Row },
    setup() {
      return {
        growShopList,
        growUserList,
      }
    },
  })
</script>

<style lang="less" scoped>
  .total-list {
    padding: 20px;
    padding-top: 0;

    .list-goods {
      border: 1px solid #ccc;

      .goods-shop {
        display: flex;
        justify-content: space-between;

        .shop-count {
          font-size: 24px;
          color: #f04844;
        }
      }
    }

    .list-user {
      border: 1px solid #ccc;

      .user-box {
        display: flex;
        justify-content: space-between;

        .box-count {
          font-size: 24px;
          color: #f04844;
        }
      }
    }
  }
</style>
