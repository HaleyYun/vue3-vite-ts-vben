<template>
  <view v-if="dataItem && Object.keys(dataItem).length" class="item">
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
          <view
            v-if="(dataItem.status == 4160 || dataItem.status == 4161) && +dataItem.amount > 0"
            class="flex flex-vertical-c"
            >已补偿：
            <VoPointPrice
              :leftSize="14"
              :price="dataItem.amount"
              :rightSize="14"
              :show-unit="true"
            />
          </view>
        </view>
      </view>
      <view @click="tapToDetail">
        <GoodsItemCard :orderDetail="dataItem" />
      </view>
    </view>
    <view class="item_status" @click="tapToDetail">
      <text v-if="dataItem.statusName === '已完成(待评价)'">待评价</text>
      <text v-else>{{ dataItem.statusName }}</text>
      <!--   dataItem.type==> 1:运输损坏/更换零部件; 2:更换零部件; 3:换机;  -->
      <!--   4110: "待处理", 4120: "待退回旧件", 4130: "待签收", 4140: "待新机签收", 4150: "待补偿", 4160: "已完成(待评价)", 4161: "已完成"   -->
      <view class="flex1 m-l-10 m-r-10">
        <text v-if="dataItem.status == 4110"
          >{{ dataItem.typeName }}申请提交成功，等待售后处理</text
        >
        <text v-if="dataItem.status == 4120">已通过，待上传旧件寄回物流单号</text>
        <text v-if="dataItem.status == 4130">旧机已寄出，待卖家签收</text>
        <text v-if="dataItem.status == 4140">旧机已签收，等待新机确认收货</text>
        <block v-if="dataItem.status === 4150">
          <text v-if="dataItem.type === 1">已通过 等待银行发放补偿中</text>
          <block v-if="dataItem.type === 2">
            <text v-if="dataItem.isSendBack">旧件已签收，等待银行发放补偿中</text>
            <text v-else>审核通过，等待银行发放补偿中</text>
          </block>
        </block>
        <text v-if="dataItem.status == 4160">{{ dataItem.typeName }}服务已完成 邀您进行评价</text>
        <text v-if="dataItem.status == 4161">{{ dataItem.typeName }}服务已完成 感谢您的支持</text>
        <text v-if="dataItem.status == 4170"
          >{{ dataItem.typeName }}服务单已取消，如有需要可重新申请</text
        >
        <text v-if="dataItem.status == 4180">{{ dataItem.typeName }}申请失败 平台未通过</text>
      </view>
      <VoIcon name="right-arrow" size="20" />
    </view>
    <view class="item_btns">
      <view v-if="dataItem.status == 4110" class="item_btn" @click="cancel">取消申请</view>
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
      tapToDetail() {
        this.$linkToEasy('/pagesGarage/PostSaleService/ApplyPostSaleDetail?id=' + this.dataItem.id)
      },
      cancel() {
        this.$emit('cancel', this.dataItem.id)
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
          font-size: 28rpx;
          margin-top: 8rpx;
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
