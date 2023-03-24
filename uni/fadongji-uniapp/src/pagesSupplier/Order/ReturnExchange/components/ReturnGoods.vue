<template>
  <view class="info">
    <view class="info-title flex flex-vertical-c flex-justify-between">
      <view>{{ returnGoodsList.buyerName }}</view>
      <view class="info-title__gray">
        {{ returnGoodsList.isRefundOnly ? '仅退款' : '退货退款' }}
      </view>
    </view>
    <view class="info-goods flex" @click="checkDetails(returnGoodsList)">
      <image
        v-if="returnGoodsList.pic.indexOf('mp4') != -1 || returnGoodsList.pic.indexOf('MP4') != -1"
        :src="returnGoodsList.pic + '&type=3'"
        class="info-goods__img"
      />
      <image v-else :src="returnGoodsList.pic + '&type=1'" class="info-goods__img" />
      <view class="fz-28 info-goods__right">
        <view class="right-name color-block fz-b">
          <text v-show="returnGoodsList.categoryType" class="good-tips m-r-8">{{
            returnGoodsList.categoryType
          }}</text>
          {{ returnGoodsList.goodsName }}
        </view>
        <view class="flex flex-justify-between">
          <view class="flex color-gray flex-vertical-c">
            <view class="m-r-32">申请台数</view>
            <view>{{ returnGoodsList.goodsCount }}</view>
          </view>
          <view class="flex flex-vertical-c">
            <view class="color-gray m-r-8">退款</view>
            <view class="color-red">
              <VoPointPrice
                :price="returnGoodsList.amount"
                :show-unit="true"
                class="tag-text first"
              />
              <!-- {{ returnGoodsList.refundAmount }}<text class="fz-24">.00元</text> -->
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- status 状态2110：待审核，2120：待发货，2130：待退款，2140:待签收,2150:已完成,2160:已关闭-->
    <!-- violationStatus 审核状态，1申请中，2-通过; 3-未通过,4-取消审核-->
    <!--returnGoodsList.isRefundOnly true 仅退款 false 退货退款 -->
    <!--待审核-->
    <view v-if="returnGoodsList.status === 2110">
      <view class="info-tips flex flex-vertical-c">
        <view class="fz-28 color-block">
          {{ returnGoodsList.isRefundOnly ? '退货退款' : '退款' }} 进行中：</view
        >
        <view class="fz-24 color-red m-l-8">等待平台审核</view>
      </view>
    </view>
    <!--待发货-->
    <view v-if="returnGoodsList.status === 2120">
      <view class="info-tips flex flex-vertical-c">
        <view class="fz-28 color-block">
          {{ !returnGoodsList.isRefundOnly ? '退货退款' : '退款' }} 进行中：</view
        >
        <view class="fz-24 color-red m-l-8">等待买家上传退货信息</view>
      </view>
    </view>
    <!--待退款-->
    <view v-if="returnGoodsList.status === 2130">
      <view class="info-tips flex flex-vertical-c">
        <view class="fz-28 color-block">
          {{ !returnGoodsList.isRefundOnly ? '退货退款' : '退款' }} 进行中：</view
        >
        <view class="fz-24 color-red m-l-8"
          >{{ returnGoodsList.isRefundOnly ? '' : '退货已签收，' }}等待银行退款</view
        >
      </view>
    </view>
    <!--待签收-->
    <view v-if="returnGoodsList.status === 2140">
      <view class="info-tips flex flex-vertical-c">
        <view class="fz-28 color-block">
          {{ !returnGoodsList.isRefundOnly ? '退货退款' : '退款' }} 进行中：</view
        >
        <view v-if="returnGoodsList.isSuccess" class="fz-24 color-red m-l-8">
          退款成功{{ returnGoodsList.amount }}元{{
            !returnGoodsList.isRefundOnly ? ',退货待签收' : ''
          }}</view
        >
        <view v-else class="fz-24 color-red m-l-8">
          {{ !returnGoodsList.isRefundOnly ? '退货待签收' : '' }}</view
        >
      </view>
    </view>
    <!--已完成-->
    <view v-if="returnGoodsList.status === 2150">
      <view class="info-tips flex flex-vertical-c">
        <view class="fz-28 color-block">
          {{ !returnGoodsList.isRefundOnly ? '退货退款' : '退款' }}成功：</view
        >
        <view class="fz-24 color-red m-l-8">
          {{ !returnGoodsList.isRefundOnly ? '退货退款' : '退款' }}成功{{
            returnGoodsList.amount
          }}元{{ !returnGoodsList.isRefundOnly ? '，退货已签收' : '' }}</view
        >
      </view>
    </view>
    <!--已关闭-->
    <view v-if="returnGoodsList.status === 2160">
      <!-- violationStatus 审核状态，1申请中，2-通过; 3-未通过,4-取消审核-->
      <view v-if="returnGoodsList.violationStatus === 1">
        <view class="info-tips flex flex-vertical-c">
          <view class="fz-28 color-block">
            {{ !returnGoodsList.isRefundOnly ? '退货退款' : '退款' }}已关闭：</view
          >
          <view class="fz-24 color-red m-l-8">
            {{ !returnGoodsList.isRefundOnly ? '退货退款' : '退款' }}审核申请中</view
          >
        </view>
      </view>
      <view v-if="returnGoodsList.violationStatus === 2">
        <view class="info-tips flex flex-vertical-c">
          <view class="fz-28 color-block">
            {{ !returnGoodsList.isRefundOnly ? '退货退款' : '退款' }}已关闭：</view
          >
          <view class="fz-24 color-red m-l-8">
            {{ !returnGoodsList.isRefundOnly ? '退货退款' : '退款' }}审核通过</view
          >
        </view>
      </view>
      <view v-if="returnGoodsList.violationStatus === 3">
        <view class="info-tips flex flex-vertical-c">
          <view class="fz-28 color-block">
            {{ !returnGoodsList.isRefundOnly ? '退货退款' : '退款' }}已关闭：</view
          >
          <view class="fz-24 color-red m-l-8">
            {{ !returnGoodsList.isRefundOnly ? '退货退款' : '退款' }}审核未通过</view
          >
        </view>
      </view>
      <view v-if="returnGoodsList.violationStatus === 4">
        <view class="info-tips flex flex-vertical-c">
          <view class="fz-28 color-block">
            {{ !returnGoodsList.isRefundOnly ? '退货退款' : '退款' }}已关闭：</view
          >
          <view class="fz-24 color-red m-l-8">
            {{ !returnGoodsList.isRefundOnly ? '退货退款' : '退款' }}取消审核</view
          >
        </view>
      </view>
    </view>
    <view class="info-look">
      <view class="info-look__button" @click="checkDetails(returnGoodsList)">查看详情</view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'ReturnGoods',
    props: {
      /**
       * garage 汽修厂名称
       * imageSrc 商品图片
       * afterSalesNum 申请台数
       * refundAmount 退款金额
       */
      returnGoodsList: {
        type: Object,
        default: {},
      },
    },
    methods: {
      /**
       * 去查看详情
       */
      checkDetails(data) {
        this.$emit('checkDetails', data)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .info {
    width: 750rpx;
    background: #ffffff;
    padding: 0 32rpx;
    margin-top: 16rpx;
    box-sizing: border-box;
    &-title {
      padding: 24rpx 0 22rpx 0;
      font-size: 28rpx;
      color: $v-c0-85;
      border-bottom: 2rpx solid $v-bg-light;
      &__red {
        color: $v-c0-85;
      }
      &__gray {
        color: $v-c0-45;
      }
    }
    &-goods {
      margin-top: 16rpx;
      overflow: hidden;
      &__img {
        width: 120rpx;
        height: 120rpx;
        margin-right: 16rpx;
        border-radius: 8rpx;
        overflow: hidden;
        display: block;
      }
      &__right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow-x: hidden;
        .right-name {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    &-tips {
      width: 100%;
      height: 56rpx;
      line-height: 56rpx;
      background: #f7f7f8;
      margin-top: 18rpx;
      border-radius: 8rpx;
      padding: 0 24rpx;
      box-sizing: border-box;
    }
    &-look {
      padding: 32rpx 0;
      &__button {
        font-size: 24rpx;
        color: $v-c0-85;
        width: 160rpx;
        height: 52rpx;
        line-height: 52rpx;
        border: 2rpx solid $v-c0-25;
        margin-left: auto;
        text-align: center;
        border-radius: 30rpx;
      }
    }
  }
  .good-tips {
    height: 36rpx;
    line-height: 36rpx;
    font-size: 24rpx;
    color: $color-primary-yellow;
    padding: 0 12rpx;
    background: $v-tags-btn-disabled;
    border-radius: 24rpx;
  }
</style>
