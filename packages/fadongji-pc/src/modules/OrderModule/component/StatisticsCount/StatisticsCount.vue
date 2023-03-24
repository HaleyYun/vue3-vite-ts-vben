<template>
  <div class="pb-24px">
    <div class="flex bg-light-100">
      <a-card style="width: 25%; height: 170px" :bordered="false">
        <div class="amountStyle">{{ subscriptionAmount }}</div>
        <div class="textStyle"
          >订单总金额（元）
          <a-tooltip placement="bottom">
            <template #title>
              <span>付款成功的订单总金额，不包括退款金额</span>
            </template>
            <span><question-circle-outlined /></span>
          </a-tooltip>
        </div>
      </a-card>
      <a-divider type="vertical" style="height: 85px" />
      <a-card style="width: 25%; height: 170px" :bordered="false">
        <div class="amountStyle">{{ orderCount }}</div>
        <div class="textStyle"
          >订单总数
          <a-tooltip placement="bottom">
            <template #title>
              <span>付款成功的订单总数量，不包括商品全部退货退款完毕的订单</span>
            </template>
            <span><question-circle-outlined /></span>
          </a-tooltip>
        </div>
      </a-card>
      <a-divider type="vertical" style="height: 85px" />
      <a-card style="width: 25%; height: 170px" :bordered="false">
        <div class="amountStyle">{{ accountCash }}</div>
        <div class="textStyle">现金总金额（元）
            <a-tooltip placement="bottom">
            <template #title>
              <span>现金付款成功的订单总金额，不包括退款金额</span>
            </template>
            <span><question-circle-outlined /></span>
          </a-tooltip>
        </div>
      </a-card>
      <a-divider type="vertical" style="height: 85px" />
      <a-card style="width: 25%; height: 170px" :bordered="false">
        <div class="amountStyle">{{accountingPeriod}}</div>
        <div class="textStyle">账期总金额（元）
            <a-tooltip placement="bottom">
            <template #title>
              <span>账期付款成功的订单总金额，不包括退款金额</span>
            </template>
            <span><question-circle-outlined /></span>
          </a-tooltip>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { QuestionCircleOutlined } from '@ant-design/icons-vue'
  import {  defineProps } from 'vue'

  defineProps({
    subscriptionAmount: {
      default: '1',
      type: String,
    },
    orderCount: {
      default: '2',
      type: String,
    },
    accountCash: {
      default: '3',
      type: String,
    },
    accountingPeriod: {
      default: '4',
      type: String,
    },
  })
</script>

<style scoped lang="less">
  .ant-divider-vertical {
    margin: 35px 0;
  }
  .textStyle {
    font-family: 'Microsoft YaHei';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
    color: #595959;
  }
  .amountStyle {
    font-family: 'DIN Alternate';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 37px;
    text-align: center;
    color: #262626;
    flex: none;
    order: 0;
    flex-grow: 0;
    margin-top: 25px;
    margin-bottom: 5px;
  }
</style>
