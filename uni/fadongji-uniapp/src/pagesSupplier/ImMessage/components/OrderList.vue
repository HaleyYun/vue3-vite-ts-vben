<template>
  <view class="box" >
    <view class="box-title flex flex-justify-between">
      <view>
        <view class="box-title__left">订单号：{{orderList.id}}</view>
        <view class="box-title__left">下单时间：{{orderList.createTime}}</view>
      </view>
      <view class="color-red">{{orderList.status|statusFilters}}</view>
    </view>
    <view class="box-content flex">
      <image class="box-content__img" :src="getImg(orderList.goodsDetail[0].pic[0])" />
      <view class="flex1">
        <view class="box-content__title"
          >
          <text v-show="orderList.goodsDetail[0].categoryType" class="good-tips m-r-8">{{orderList.goodsDetail[0].categoryType}}</text>
          <text> {{ orderList.goodsDetail[0].goodsName }}</text>
        </view
        >
        <view class="flex flex-justify-between flex-vertical-c m-t-8">
          <view class="flex flex-vertical-c">
            <view class="box-content__label">现金价</view>
            <VoPointPrice :price="orderList.goodsDetail[0].payPrice" class="lh42" />
          </view>
          <view class="lh42 fz-28 fz-b color-block-45">x{{orderList.goodsDetail[0].goodsCount}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'OrderList',
    props: {
      orderList: {
        type: Object,
        default: {
          goodsDetail:[]
        },
      },
    },
    filters:{
        statusFilters(val){
            //1100：创建，1110：待付款，1120：待发货，1130：待收货，1140：已完成，1150：已取消，1160:已关
            let status = '';
            switch (val) {
                case 1110:
                    status = '待付款';
                    break;
                case 1120:
                    status = '待发货';
                    break;
                case 1130:
                    status = '待收货';
                    break;
                case 1140:
                    status = '已完成';
                    break;
                case 1150:
                    status = '已取消';
                    break;
                case 1160:
                    status = '已关闭';
                    break;

            }
            return status;

        }

    },
    methods:{
      getImg(url){
        if(this.$vocenApi.Pattern.isVideoUrl(url.toLocaleLowerCase())){
          return url+'&type=3'
        }else {
          return url+'&type=1'
        }
      }
    }


  }
</script>

<style lang="scss" scoped>
  .box {
    width: 750rpx;
    background: #fff;
    padding: 24rpx 32rpx;
    box-sizing: border-box;
    margin-top: 16rpx;

    &-title {
      font-size: 28rpx;
      line-height: 42rpx;
      border-bottom: 2rpx solid $v-bg-light;
      padding-bottom: 8rpx;
      box-sizing: border-box;
      &__left {
        color: $v-c0-85;
        padding-bottom: 8rpx;
        box-sizing: border-box;
      }
    }
    &-content {
      margin-top: 16rpx;
      &__img {
        width: 128rpx;
        height: 128rpx;
        margin-right: 16rpx;
      }
      &__title {
        line-height: 48rpx;
        font-weight: bold;
        font-size: 32rpx;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      &__label {
        width: 84rpx;
        height: 32rpx;
        line-height: 32rpx;
        text-align: center;
        border: 2rpx solid $color-clicked-red;
        border-radius: 4rpx;
        font-size: 24rpx;
        color: $color-clicked-red;
        margin-right: 16rpx;
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
