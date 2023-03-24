<template>
  <view class="cell">
    <view class="cell-box" v-if="info.vehicles && info.vehicles.length">
      <view class="cell-box__title">
        <view class="left">适配车型</view>
        <view class="right" v-if="info.vehicles !== null && info.vehicles.length > 10"
          >查看更多<VoIcon name="right-arrow" color="#000000" :opacity="0.25" :size="16"
        /></view>
      </view>
      <view class="cell-box__main">
        <view
          class="main-row"
          v-for="(item, index) in info.vehicles"
          :key="index"
          v-show="index < 10"
        >
          <view class="main-row__wrap noborder">
            <view class="label">{{ item.brandName + item.seriesName }}</view>
          </view>
        </view>
      </view>
    </view>
    <!-- <view class="cell-box">
      <view class="cell-box__title">
        <view class="left">服务保障</view>
      </view>
      <view class="cell-box__main">
        <view class="main-row">
          <view class="main-row__wrap">
            <view class="label flex1">服务: {{ info.serviceConfig.name }}</view>
            <VoIcon name="right-arrow" color="#000000" :opacity="0.25" />
          </view>
        </view>
        <view class="main-row">
          <view class="main-row__wrap noborder">
            <view class="label flex1">售后: 整机质保 质保周期长 赔付快</view>
            <VoIcon name="right-arrow" color="#000000" :opacity="0.25" />
          </view>
        </view>
      </view>
    </view> -->
    <view class="cell-box" v-if="info.skuProperty && info.skuProperty.length">
      <view class="cell-box__title">
        <view class="left">产品属性</view>
        <!-- <view class="right"
          >查看更多<VoIcon name="right-arrow" color="#000000" :opacity="0.25" :size="16"
        /></view> -->
      </view>
      <view class="cell-box__main">
        <view
          class="main-row"
          v-for="(item, index) in info.skuProperty"
          :key="item.key"
          v-show="index"
        >
          <view class="main-row__wrap noborder">
            <view class="label">{{ item.name }}：{{ item.value }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
  export default {
    name: 'CellInfo',
    props: {
      info: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        visible: true,
        labelArr: [
          {
            name: '',
            value: '',
            require: true,
          },
        ],
      }
    },
    methods: {
      show() {
        this.visible = true
      },
      close() {
        this.visible = false
      },
      confirm() {
        this.visible = false
      },
    },
  }
</script>
<style lang="scss" scoped>
  .cell {
    margin-top: 16rpx;
    .fz-16 {
      font-size: 32rpx !important;
    }
    &-box {
      background: #fff;
      margin-bottom: 22rpx;
      &__title {
        display: flex;
        padding: 20rpx 32rpx;
        .left {
          font-size: 28rpx;
          line-height: 1.5;
          color: $v-c0-85;
          font-weight: 500;
        }
        .right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          font-size: 28rpx;
          line-height: 1.5;
          color: $v-c0-65;
        }
      }
      &__main {
        .main-row {
          padding-left: 32rpx;
          &__wrap {
            padding: 24rpx 32rpx 24rpx 0;
            border-bottom: 1px solid #f7f7f8;
            display: flex;
            font-size: 28rpx;
            line-height: 1.5;
            &.noborder {
              border-bottom: 0;
            }
            .label {
              color: $v-c0-85;
            }
            .star {
              color: #ee0a24;
            }
            .value {
              flex: 1;
              text-align: right;
              color: $v-c0-65;
            }
          }
        }
        .tip {
          font-size: 28rpx;
          line-height: 1.5;
          color: $v-c0-25;
        }
      }
    }
  }
</style>
