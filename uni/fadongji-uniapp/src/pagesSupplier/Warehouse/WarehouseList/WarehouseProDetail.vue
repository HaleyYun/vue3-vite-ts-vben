<template>
   <view
     class="pro "
     :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
   >

     <VoNav :left-width="240"  is-have-more  :right-width="240">
       <template #title>商品编码</template>

     </VoNav>


     <view class="pro-no">
       商品编号：<span class="pro-no__info">2022053003009</span>
     </view>
     <view class="pro-content">
       <view class="pro-content__left">
         <image class="w-full h-full" src="/static/noData/noWarehouse.png"></image>
       </view>
       <view class="pro-content__right info">
         <view class="info-title overTwoEllipsis">大家撒肯定就啊撒旦吉萨大经理</view>
           <view class="stock-line">在库数量：20</view>
       </view>
     </view>

     <view class="pro-info">
       <view class="m-r-40">货主：王小明</view>
       <view class="m-r-40">库龄：20天</view>
       <view>库位：A区-1-3-23</view>
     </view>
     <view class="flex flex-wrap pro-list">
        <view class="m-b-24 m-r-32" v-for="item of 10" :key="item">NUI19874327421483</view>
     </view>



 </view>
</template>

<script>
export default {
    name: 'WarehouseProDetail',
    data() {
      return {
      }
    },
    methods:{

    }
  }
</script>

<style lang="scss" scoped>

  .pro{
    width: 750rpx;
    min-height: 100vh;
    overflow: hidden;
    background-color: #FFFFFF;
    padding: 32rpx;
    box-sizing: border-box;
    &-no{
      font-size: 26rpx;
      color: rgba(0, 0, 0, 0.45);
      margin-bottom: 22rpx;
      &__info{
        color: $v-c0-45;
      }


    }
    &-content{
      display: flex;
      justify-content: flex-start;
      margin-bottom: 22rpx;
      &__left{
        width: 128rpx;
        height: 128rpx;
        position: relative;
        margin-right: 14rpx;
        border-radius: 8rpx;
        overflow: hidden;

      }
      &__right{
        width: 500rpx;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-bottom: 8rpx;
        box-sizing: border-box;
      }

    }
    &-info{
      display: flex;
      align-items: center;
      margin: 11rpx auto 32rpx;
      width: 100%;
      background-color: #f7f7f8;
      border-radius: 16rpx;
      line-height: 72rpx;
      height: 72rpx;
      padding: 0rpx 16rpx;
      box-sizing: border-box;
      color: rgba(0, 0, 0, 0.65);
      font-size: 26rpx;
    }
    &-list{
      font-size: 28rpx;
      line-height: 150%;
      color: rgba(0,0,0,0.85);
    }
  }

  .info {
    &-title {
      color: rgba(0, 0, 0, 0.85);
      font-size: 28rpx;
      font-weight: bold;
      line-height: 150%;
      margin-bottom: 18rpx;
    }
  }
  .stock-line{
    font-size: 26rpx;
    color: rgba(0, 0, 0, 0.65);
    line-height: 150%;
    margin-bottom: 16rpx;
    &:last-child{
      margin-bottom: 0rpx;
    }
  }


</style>
