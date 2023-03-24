<template>
  <view  class="item">
    <view>
      <view class="item_top">
        <view>
          <text
            >服务单号：<text>{{ dataItem.id }}</text></text
          >
          <!-- <text>{{ dataItem.createTime }}</text> -->
        </view>
        <view class="post_sale_type">
          <view>{{ dataItem.typeName }}</view>
          <view v-if="(dataItem.status == 4160 || dataItem.status == 4161 ) && dataItem.amount > 0"
            >已补偿：{{ dataItem.amount }}元</view
          >
        </view>
      </view>
      <view>
        <GoodsItemCard :orderDetail="dataItem" />
      </view>
    </view>
    <view class="item_status" @click="tapToDetail">
      <text>{{ getStatusName(dataItem.status) }}</text>
      <view>
        <text v-if="dataItem.status === 4110"
          >{{ dataItem.typeName }}申请提交成功，等待售后处理</text
        >
        <text v-else-if="dataItem.status === 4120">已通过，待上传旧件寄回物流单号</text>
        <text v-else-if="dataItem.status === 4130">旧机已寄出，待卖家签收</text>
        <text v-else-if="dataItem.status === 4140">旧机已签收，等待新机确认收货</text>
        <template v-else-if="dataItem.status === 4150">
          <text v-if="dataItem.type === 1">已通过 等待银行发放补偿中</text>
          <template v-if="dataItem.type === 2">
            <text v-if="dataItem.isSendBack">旧机已签收，等待银行发放补偿中</text>
            <text v-else>旧机已签收，等待银行发放补偿中</text>
          </template>
        </template>
        <text v-else-if="dataItem.status === 4160">{{ dataItem.typeName }}服务已完成，感谢您的支持</text>
        <text v-else-if="dataItem.status === 4161">{{ dataItem.typeName }}服务已完成，感谢您的支持</text>
        <text v-else-if="dataItem.status === 4170"
          >{{ dataItem.typeName }}服务单已取消，如有需要可重新申请</text
        >
        <text v-else-if="dataItem.status === 4180">{{ dataItem.typeName }}申请失败 售后处理未通过</text>
        <VoIcon name="right-arrow" size="20" />
      </view>
    </view>
    <view class="item_btns">
      <view v-if="dataItem.status === 4130" class="item_btn" @click="sure">确认收货</view>
      <view v-else class="item_btn" @click="tapToDetail">查看详情</view>
    </view>
  </view>
</template>

<script>
  import GoodsItemCard from './GoodsItemCard.vue'

  export default {
    name: 'ApplyPostSaleItem',
    components: {
      GoodsItemCard,
    },
    props: {
      dataItem: {
        type: Object,
      },
    },
    methods: {
      getStatusName(status) {
        switch (status) {
          case 4110: {
            return '待处理'
          }
          case 4120: {
            return '待退回旧件'
          }
          case 4130: {
            return '待签收'
          }
          case 4140: {
            return '待新机签收'
          }
          case 4150: {
            return '待补偿'
          }
          case 4160: {
            return '已完成'
          }
          case 4161: {
            return '已完成'
          }
          case 4170: {
            return '已取消'
          }
          case 4180: {
            return '已关闭'
          }
          default: {
            return ''
          }
        }
      },
      tapToDetail() {
        this.$linkToEasy('/pagesSupplier/PostSaleOrder/ApplyPostSaleDetail?id=' + this.dataItem.id)
      },
      sure() {
        this.$emit('sure', this.dataItem.id)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .item {
    background-color: #fff;
    padding: 0 32rpx 32rpx 32rpx;
    margin: 16rpx 0;
    .item_top {
      display: flex;
      justify-content: space-between;
      font-size: 28rpx;
      padding: 24rpx 0;
      border-bottom: 1rpx solid #f7f7f8;
      > :nth-child(1) {
        color: rgba(0, 0, 0, 0.85);
      }
      .post_sale_type {
        text-align: right;
        color: rgba(0, 0, 0, 0.45);
        > :nth-child(2) {
          color: #ff3f00;
        }
      }
    }

    .item_status {
      height: 96rpx;
      font-size: 28rpx;
      background-color: #f6f7f8;
      border-radius: 8rpx;
      margin: 24rpx auto;
      padding: 0 24rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      > :nth-child(1) {
        font-weight: bold;
        color: #ff5319;
      }
      > :nth-child(2) {
        text-align: right;

        > :nth-child(1) {
          vertical-align: middle;

          color: rgba(0, 0, 0, 0.65);
        }
        > :nth-child(2) {
          vertical-align: middle;
        }
      }
    }
    .item_btns {
      display: flex;
      justify-content: flex-end;
      .item_btn {
        width: 160rpx;
        height: 64rpx;
        text-align: center;
        line-height: 64rpx;
        font-size: 24rpx;
        border: 1rpx solid #ff5319;
        color: #ff5319;
        border-radius: 60rpx;
      }
    }
  }
</style>
