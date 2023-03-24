<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="scanCode flex flex-column"
  >
    <VoNav isHaveMore title="扫码发货" />
    <view class="scanCode-content">
      <view class="flex flex-justify-between flex-vertical-c scanCode-content__number">
        <view>订单编号：202212345678989939</view>
        <VoIcon color="#EE0A24" name="scan" @click="scanCodeClick" />
      </view>

      <view class="scanCode-content__good">
        <view class="title"
          >江铃动力 全EA888发动机总成适用于奥迪1.8T
          二代发动机(升级款)江二代发动机(升级款)江二代发动机(升级款)江二代发动机(升级款)江</view
        >
        <view class="flex">
          <view class="numberTitle">已添加数量：</view>
          <view class="number">1</view>
        </view>
        <view class="tag">
          <view v-for="(item, index) in codeList" :key="index" class="tag-title">
            <view>{{ item }}</view>
            <VoIcon
              :size="12"
              class="tag-title__close"
              color="#B3B3B3"
              name="close-c"
              @click="deleteCodeClick(index)"
            />
          </view>
        </view>
      </view>
    </view>
    <view class="scanCode-bottom p-b-safe-area">
      <view class="scanCode-bottom__confirm" @click="confirmClick">扫码完成</view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        codeList: ['UINV89888394841', 'UINV89888394842', 'UINV89888394843', 'UINV89888394844'],
      }
    },
    methods: {
      /**
       * vin扫码
       */
      scanCodeClick() {
        this.$u.toast('vin扫码')
      },
      deleteCodeClick(index) {
        this.codeList.splice(index, 1)
      },
      confirmClick() {
        // this.$u.toast("扫码数量与订单购买数量不一致")
        this.$u.toast('扫码商品与订单购买商品不一致')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .scanCode {
    width: 750rpx;
    height: 100vh;

    &-content {
      margin: 24rpx 0rpx;
      padding: 24rpx 32rpx;
      background-color: #ffffff;

      &__number {
        color: #000000;
        font-size: 32rpx;
      }

      &__good {
        margin-top: 24rpx;
        border: 2rpx solid $v-c0-85;

        .title {
          margin: 16rpx;
          color: $v-c0-85;
          font-size: 28rpx;
          word-break: break-all;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          /* 这里是超出几行省略 */
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        .numberTitle {
          color: $v-c0-45;
          font-size: 26rpx;
          margin-left: 16rpx;
        }
        .number {
          color: $v-c0-45;
          font-size: 26rpx;
        }
        .tag {
          display: grid;
          margin-left: 16rpx;
          margin-top: 44rpx;
          padding-bottom: 16rpx;
          grid-row-gap: 20rpx;
          grid-column-gap: 60rpx;
          grid-template-columns: 242rpx 242rpx;

          &-title {
            color: $v-c0-65;
            font-size: 26rpx;
            width: 242rpx;
            padding: 10rpx 12rpx;
            background-color: $color-disabled-yellow;
            border-radius: 4rpx;
            position: relative;

            &__close {
              position: absolute;
              top: -10rpx;
              right: -10rpx;
            }
          }
        }
      }
    }
    &-bottom {
      position: fixed;
      left: 0rpx;
      bottom: 0rpx;
      height: 132rpx;
      width: 100%;
      background-color: #ffffff;

      &__confirm {
        margin: 20rpx 47rpx;
        height: 92rpx;
        line-height: 92rpx;
        text-align: center;
        background-color: $color-primary-yellow;
        color: #ffffff;
        font-size: 32rpx;
        border-radius: 48rpx;
      }
    }
    .titleColor {
      color: $v-error;
    }
  }
</style>
