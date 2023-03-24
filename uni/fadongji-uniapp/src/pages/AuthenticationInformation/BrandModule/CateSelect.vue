<template>
  <view
    class="brand"
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
  >

    <VoNav title='选择品类' :is-fixed='false'></VoNav>


    <view class='brand-content'>
        <scroll-view :scroll-y='true'  class='brand-content__left'>
          <view class='left-item left-active'>
              电气系统
          </view>
          <view class='left-item '>
            电气系统
          </view>
          <view class='left-item '>
            电气系统
          </view>
        </scroll-view>
        <scroll-view :scroll-y='true' class='brand-content__right'>
          <view class='flex flex-wrap'>
            <view class='right-item right-active'>
              测试和哈
            </view>
            <view class='right-item '>
              测试和哈
            </view>
            <view class='right-item '>
              测试和哈
            </view>
          </view>
        </scroll-view>
    </view>



    <view class='brand-fixed flex flex-vertical-c flex-justify-between'>
      <u-button
        class="brand-fixed__button"
        plain
        shape="circle"
        color="#22284b"
        size="large"
        hoverStartTime='999999'
        hoverStayTime='0'
        text="重置"
      />
<!--          <u-button-->
<!--            class="brand-fixed__button"-->
<!--            shape="circle"-->
<!--            color="#22284b"-->
<!--            size="large"-->
<!--            text="提交"-->
<!--          />-->

      <u-button
        disabled
        class="brand-fixed__button brand-fixed__color"
        shape="circle"
        color="#F6F7F8"
        size="large"
        text="确定"
      />
    </view>
    <view class='safearea-box'></view>

  </view>
</template>

<script>
  export default {
    name: 'BrandSelect',
    data() {
      return {
        formData:{}
      }
    },
    created() {},
    methods: {

    },
  }
</script>

<style lang="scss" scoped>
  .brand{
    width: 750rpx;
    background: #FFFFFF;
    overflow: hidden;
    height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    &-content{
      flex: 1;
      width: 750rpx;
      display: flex;
      &__left{
        width: 200rpx;
        height: 100%;
        background-color: #f6f7f8;
        .left-item{
          box-sizing: border-box;
          width: 100%;
          height: 100rpx;
          line-height: 100rpx;
          text-align: center;
          font-size: 28rpx;
          color: rgba(0, 0, 0, 0.85);
          white-space: nowrap;
          overflow-x: hidden;
          text-overflow: ellipsis;
          padding: 0rpx 10rpx;
          position: relative;

        }
        .left-active{
          background-color: #ffffff !important;
        }
        .left-active:after{
          content: '';
          width: 6rpx;
          height: 100rpx;
          position: absolute;
          left: 0rpx;
          top: 0rpx;
          background-color: #22284B;
        }

      }
      &__right{
        flex: 1;
        height: 100%;
        padding: 24rpx 0rpx 0rpx 24rpx;
        .right-item{
          width: 240rpx;
          height: 64rpx;
          line-height:64rpx;
          text-align: center;
          background: #F7F7F8;
          border-radius: 64rpx;
          font-size: 24rpx;
          color: rgba(0, 0, 0, 0.85);
          white-space: nowrap;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding: 0rpx 10rpx;
          box-sizing: border-box;
          margin-right: 16rpx;
          margin-bottom: 24rpx;
          overflow-x: hidden;
        }
        .right-active{
          background: #FEECEE !important;
          border: 2rpx solid #F7909C !important;
          line-height: 60rpx !important;
          color: #E50012 !important;
        }

      }

    }

    &-fixed{
      width: 750rpx;
      padding: 20rpx 32rpx;
      border-top: 2rpx solid #f7f7f8;
      box-sizing: border-box;
      &__button {
        width: 326rpx;
        height: 92rpx;
      }
      &__color {
        opacity: 1 !important;
        background-color: #f6f7f8 !important;
        color:  rgba(0, 0, 0, 0.25) !important;
      }
    }


  }


</style>
