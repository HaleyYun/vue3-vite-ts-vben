<template>
  <view class="goods">

    <view class="goods-list flex" v-for="(info, index) of goodsList" :key="index" @click="chooseShop(info)">
      <image class="goods-list__img" width="64px" height="64px" :src="getImg(info.pic)" >

      </image>
      <view class="flex1">
        <view class="goods-list__name">
          <text v-show="info.categoryType" class="good-tips m-r-8">{{info.categoryType}}</text>
          <text> {{ info.name }}</text>
        </view>
        <view class="goods-list__money flex flex-vertical-c">
          <view class="money-tips">现金价</view>
          <view class="money-price">
            <!-- <text class="fz-b">{{ info.price }}</text>
            <text class="fz-24">.00元</text> -->
            <VoPointPrice class="tag-text first" :price="info.cashPrice" :show-unit="true" display="inline-block"/>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'SendGoods',
    props: {
      goodsList: {
        type: Array,
        default: [],
      },
    },
    data() {
      return {}
    },

    methods: {
      chooseShop(info){
        this.$emit('sendShop',info)
      },
      close() {
        this.$emit('close')
      },
      getImg(url){
        if(this.$vocenApi.Pattern.isVideoUrl(url.toLocaleLowerCase())){
          return url+'&type=3'
        }else {
          return url+'&type=1'
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  .goods {
    &-title {
      padding: 24rpx 32rpx;
      border-bottom: 2rpx solid $v-bg-light;
    }
    &-list {
      padding: 24rpx 32rpx;
      border-bottom: 2rpx solid $v-bg-light;
      &__img {
        width: 128rpx;
        height: 128rpx;
        border-radius: 8rpx;
        margin-right: 16rpx;
      }
      &__name {
        height: 42rpx;
        line-height: 42rpx;
        font-weight: bold;
        font-size: 28rpx;
      }
      &__money {
        margin-top: 46rpx;
        .money-tips {
          height: 28rpx;
          line-height: 28rpx;
          font-size: 24rpx;
          color: $color-clicked-red;
          padding: 2rpx 4rpx;
          border: 2rpx solid $color-clicked-red;
          background: $color-disabled-red;
          border-radius: 4rpx;
          margin-right: 8rpx;
        }
        .money-price {
          font-size: 28rpx;
          color: $color-primary-red;
        }
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
