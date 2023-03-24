<template>
  <view
    class="brand"
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
  >

    <VoNav title='选择品类品牌信息'></VoNav>

    <EraForm
      class="brand-form"
      labelWidth="128"
      labelPosition="left"
      :model="formData"
      ref="form1"
    >

      <EraFormItem
        required
        class="brand-form__item"
        label="选择经营品类"
        color="rgba(0, 0, 0, 0.85)"
      >
        <VoIcon :size='24' name='right-arrow' class='m-l-auto'></VoIcon>
      </EraFormItem>
      <view class='brand-cate flex flex-wrap'>
          <view class='brand-cate__item' >
            <view>到家啦扩大</view>
            <image src='/static/icons/del.png' class='brand-cate__icon'></image>
          </view>
      </view>


      <EraFormItem
        required
        class="brand-form__item"
        label="选择主营品牌"
        color="rgba(0, 0, 0, 0.85)"
      >
        <VoIcon :size='24' name='right-arrow' class='m-l-auto'></VoIcon>
      </EraFormItem>

      <view class='brand-list'>
            <view class='brand-list__info'>
              <image class='brand-list__icon' src='/static/logo-1.png'></image>
              <view class='brand-list__title'>江陵动力</view>
            </view>
            <VoIcon :size='20' name='delete'></VoIcon>
      </view>

    </EraForm>

    <view class='brand-title'>
      <view class='fz-28 fz-b m-b-8'>温馨提示</view>
      <view class='fz-24 brand-title__info'>
        1.若没有找到您的经营品类和主营品牌，请 <span class='brand-title__service'>联系客服</span>
      </view>
    </view>

    <view class='safearea-box'></view>

    <VoSafetyArea>
      <template v-slot:group>
        <view class='brand-fixed flex flex-vertical-c flex-justify-between'>
          <u-button
            class="brand-fixed__button"
            plain
            shape="circle"
            color="#22284b"
            size="large"
            hoverStartTime='999999'
            hoverStayTime='0'
            text="跳过"
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
            text="提交"
          />
        </view>
      </template>
    </VoSafetyArea>

  </view>
</template>

<script>
  export default {
    name: 'BrandSetting',
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
    overflow-y: hidden;
    min-height: 100vh;
    padding-bottom: 132rpx;
    box-sizing: border-box;
    &-form {
      padding: 0 32rpx;
      margin-bottom: 8rpx;
      &__item{
        border-bottom: 2rpx solid #f7f7f8;
      }
    }
    &-title{
      box-sizing: border-box;
      width: 750rpx;
      line-height: 1.5;
      padding: 16rpx;
      color: rgba(0, 0, 0, 0.85);
      &__info{
        color: rgba(0, 0, 0, 0.65);
      }
      &__service{
        color: #155bd4;
      }
    }
    &-cate{
      padding: 16rpx 0rpx 0rpx 0rpx;
      &__item{
        margin-right: 40rpx;
        margin-bottom: 40rpx;
        height: 36rpx;
        padding: 0rpx 6rpx 0rpx 16rpx;
        box-sizing: border-box;
        background-color: #FEECEE;
        border: 2rpx solid #F7909C;
        border-radius: 18rpx;
        color: #E50012;
        font-size: 24rpx;
        display: flex;
        align-items: center;
      }
      &__icon{
        width: 12px;
        height: 12px;
        margin-left: 8rpx;
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
    &-list{
      height: 98rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 8rpx;
      &__info{
        color: rgba(0, 0, 0, 0.85);
        font-size: 32rpx;
        font-weight: bold;
        display: flex;
        align-items: center;
      }
      &__icon{
        width: 48rpx;
        height: 48rpx;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 8rpx;
      }
      &__title{
        width: 500rpx;
        overflow-x: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

    }

  }


</style>
