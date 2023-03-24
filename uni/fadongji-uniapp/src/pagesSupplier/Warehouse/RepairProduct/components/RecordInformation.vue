<template>
  <view class="info">
    <view class="flex flex-justify-between">
      <view class="info-name">
        <text v-show="info.categoryType" class="good-tips m-r-8">{{info.categoryType}}</text>
        <text> {{ info.goodsName }}</text>
      </view>
      <view class="info-type">{{ info.typeName }}</view>
    </view>
    <view class="info-con flex flex-wrap" v-if="+info.type === 7">
      <view class="info-con__list m-b-16">仓库：{{ info.inWarehouseName }}</view>
      <view class="info-con__list m-b-16"></view>
      <view class="info-con__list m-b-16">修改前商品数量：{{ info.originNumber }}</view>
      <view class="info-con__list m-b-16">修改后商品数量：{{ info.changeNumber }}</view>
      <view class="info-con__list m-b-16">操作人：{{ info.creatorName || '--' }}</view>
      <view class="info-con__time">操作时间：{{ info.createTime }}</view>
    </view>
    <view class="info-con flex flex-wrap" v-else-if="+info.type === 8">
      <view class="info-con__list m-b-16">补货仓库：{{ info.inWarehouseName }}</view>
      <view class="info-con__list m-b-16"></view>
      <view class="info-con__list m-b-16">补货数量：{{ info.changeNumber }}</view>
      <view class="info-con__list m-b-16">出货仓库：{{ info.outWarehouseName }}</view>
      <view class="info-con__list m-b-16">操作人：{{ info.creatorName || '--' }}</view>
      <view class="info-con__time">操作时间：{{ info.createTime }}</view>
    </view>
    <view class="info-con flex flex-wrap" v-else>
      <view class="info-con__list m-b-16">仓库：{{ info.inWarehouseName }}</view>
      <view class="info-con__list m-b-16">数量：{{ info.changeNumber }}</view>
      <view class="info-con__list m-b-16">操作人：{{ info.creatorName || '--' }}</view>
      <view class="info-con__time">操作时间：{{ info.createTime }}</view>
    </view>

    <view v-if="info.statusDTO && info.statusDTO.length && info.useWms" class="info-receipt">
      <view class="info-receipt__title m-b-24">补货回执：</view>
      <view v-for="(item, index) of info.statusDTO" :key="index" class="flex">
        <view class="flex flex-column flex-vertical-c m-t-2">
          <VoIcon
            v-if="Number(item.type) === 1 && index === 0"
            :size="16"
            color="#FF5319"
            name="success-fill"
          />
          <VoIcon
            v-else-if="Number(item.type) === 2 && index === 0"
            :size="16"
            color="#FF5319"
            name="more-fill"
          />
          <VoIcon
            v-else-if="Number(item.type) === 3 && index === 0"
            :size="16"
            color="#FF5319"
            name="close-fill"
          />
          <!--   <VoIcon name="more-fill" :size="16" v-else-if="Number(item.type) === 2 && index === 0" />-->
          <!--   <VoIcon name="close-fill" :size="16" v-else-if="Number(item.type) === 3 && index === 0" />-->
          <VoIcon v-else :size="16" color="#00B359" name="dot-light" />
          <view v-if="index + 1 !== info.statusDTO.length" class="info-receipt__line flex1" />
        </view>
        <view class="info-receipt__info flex1 m-l-16">
          <view class="info-state flex flex-vertical-c flex-justify-between">
            <view :class="{ 'info-vice': Number(item.type) === 2 }" class="info-state__left">
              {{ item.operMsg }}
            </view>
            <view class="info-state__right">{{ item.operTime || '--' }}</view>
          </view>
          <view v-if="Number(item.type) === 3" class="info-vice m-t-8 m-b-28">{{
            item.annotation
          }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'RecordInformation',
    props: {
      info: {
        type: Object,
        default: () => {},
      },
    },
  }
</script>

<style lang="scss" scoped>
  .info {
    margin: 0 32rpx;
    box-sizing: border-box;
    padding: 40rpx 0;
    border-top: 2rpx solid $v-bg-light;
    &-name {
      width: 518rpx;
      font-weight: bold;
      font-size: 28rpx;
      line-height: 150%;
      color: $v-c0-85;
    }
    &-type {
      margin-top: 6rpx;
      height: 36rpx;
      background: $v-text-disabled;
      border-radius: 24rpx;
      padding: 0 16rpx;
      font-size: 24rpx;
      line-height: 150%;
      color: $v-btn-deep;
    }
    &-con {
      font-size: 24rpx;
      line-height: 150%;
      color: $v-c0-65;
      margin-top: 24rpx;
      &__list {
        width: 312rpx;
      }
      &__time {
        height: 36rpx;
      }
    }
    &-receipt {
      margin-top: 32rpx;
      background: $v-bg-light;
      border-radius: 16rpx;
      padding: 24rpx;
      &__title {
        height: 36rpx;
        font-weight: bold;
        font-size: 24rpx;
        line-height: 150%;
        color: $v-c0-65;
      }
      &__icon {
        width: 32rpx;
        height: 32rpx;
        background: url('/static/created/product/ongoing.png') no-repeat;
        background-size: 100% 100%;
      }
      &__error {
        width: 32rpx;
        height: 32rpx;
        background: url('/static/created/product/error.png') no-repeat;
        background-size: 100% 100%;
      }
      &__line {
        width: 2rpx;
        background: #d3d4db;
      }
      &__info {
        font-size: 24rpx;
        min-height: 64rpx;
        line-height: 150%;
        .info-state {
          &__left {
            width: 338rpx;
            color: $v-c0-85;
          }
          &__right {
            color: $v-c0-65;
          }
        }
        .info-vice {
          width: 338rpx;
          color: $v-c0-45;
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
