<template>
  <view class="info">
    <view class="info-name overTwoEllipsis m-b-24">
      <text v-show="recordList.categoryType" class="good-tips m-r-8">{{recordList.categoryType}}</text>
      <text> {{ recordList.goodsName }}</text>
    </view>
    <view class="info-item fz-28 color-gray" v-if="recordList.goodsCode">
      <view class="info-item__no">{{ recordList.goodsCode }}</view>

      <!-- <view class="flex flex-vertical-c info-item__fixed">
        <view>展开</view>
        <VoIcon :size="24" color="#d9d9d9" name="arrow-bottom-line" />
                 <VoIcon :size="24" name="arrow-top-line" color="#d9d9d9"></VoIcon>
      </view> -->
    </view>

    <view class="info-con">
      <view class="flex">
        <view class="info-con__list">入库仓库：{{ recordList.warehouseName }}</view>
        <view class="info-con__time algin-top">商品数量：{{ recordList.goodsNum }}</view>
      </view>
      <view class="info-con__list m-r-60 m-t-16">出库仓库：{{ recordList.outWarehouseName }}</view>
      <view class="info-con__time">操作时间：{{ recordList.createTime }}</view>
    </view>

    <view class="flex flex-justify-r flex-vertical-c m-t-32">
      <!--      <EraButton :width-btn="284" class="w284" size="mini" theme-type="Default" @click="updateNum"-->
      <!--        >修改数量并入库</EraButton-->
      <!--      >-->
      <view class="info-default" @click="updateNum">修改数量并入库</view>
      <EraButton class="m-l-28" size="mini" theme-type="Wire" @click="sureWareFn"
        >确认入库</EraButton
      >
    </view>
  </view>
</template>

<script>
  export default {
    name: 'RepairRecordItem',
    props: {
      /**
       * type 1人工调整 2调拨 3申请补货
       * warehouse 仓库
       * afterNumber 修改后商品数量
       * operator 操作人
       * beforeNumber 修改前商品数量
       * time 操作时间
       */
      recordList: {
        type: Object,
        default: {},
      },
    },
    data() {
      return {}
    },
    methods: {
      /**
       * 更改数量
       */
      updateNum() {
        this.$emit('updateNum')
      },
      /**
       * 确认入库
       */
      sureWareFn() {
        this.$emit('sureWareFn')
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
      width: 100%;
      font-weight: bold;
      font-size: 28rpx;
      line-height: 150%;
      color: $v-c0-85;
    }
    &-title {
      color: rgba(0, 0, 0, 0.85);
      font-size: 28rpx;
      line-height: 150%;
      width: 520rpx;
      font-weight: bold;
    }
    &-status {
      width: 128rpx;
      height: 36rpx;
      line-height: 36rpx;
      text-align: center;
      background-color: #d3d4db;
      border-radius: 24rpx;
      font-size: 24rpx;
      color: #6f738a;
    }
    &-item {
      display: flex;
      flex-wrap: wrap;
      line-height: 150%;
      position: relative;
      &__no {
        margin-bottom: 24rpx;
        margin-right: 32rpx;
      }
      &__fixed {
        background-color: #ffffff;
        color: rgba(0, 0, 0, 0.45);
        font-size: 24rpx;
        position: absolute;
        bottom: 24rpx;
        right: 0rpx;
      }
    }

    &-type {
      margin-top: 6rpx;
      height: 18px;
      background: $v-text-disabled;
      border-radius: 12px;
      padding: 0 16rpx;
      font-size: 12px;
      line-height: 150%;
      color: $v-btn-deep;
    }
    &-con {
      font-size: 24rpx;
      line-height: 150%;
      color: $v-c0-65;
      margin-top: 16rpx;
      &__list {
        width: 314rpx;
      }
      // &__time {
      // }
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
    .w284 {
      width: 284rpx;
    }
    &-default {
      padding: 0 32rpx;
      height: 64rpx;
      line-height: 64rpx;
      border: 2rpx solid #d3d4db;
      border-radius: 100rpx;
      font-size: 28rpx;
      color: $v-c0-85;
    }
    .algin-top {
      vertical-align: top;
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
