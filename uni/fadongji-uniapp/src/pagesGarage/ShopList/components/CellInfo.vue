<template>
  <view class="cell">
    <view v-if="info.vehicles && info.vehicles.length" class="cell-box">
      <view class="cell-box__title">
        <view class="left">适配车型</view>
        <view
          v-if="info.vehicles !== null && info.vehicles.length > 4"
          class="right"
          @click="lookMoreClickCar"
          >查看更多
          <VoIcon :opacity="0.25" :size="16" color="#000000" name="right-arrow" />
        </view>
      </view>
      <view class="cell-box__main p-b-24 p-l-32 p-r-32">
        <VoTable :table-val="info.vehicles" :limit="4"></VoTable>
      </view>
    </view>
    <view class="cell-box">
      <view class="cell-box__title">
        <view class="left">服务保障</view>
      </view>
      <view class="cell-box__main">
        <view class="main-row">
          <view class="main-row__wrap" @click="$emit('servicePopup')">
            <view class="label flex1">服务: 7*24h人工技术支持</view>
            <VoIcon :opacity="0.25" color="#000000" name="right-arrow" />
          </view>
        </view>
        <view class="main-row">
          <view class="main-row__wrap noborder" @click="nextPage">
            <view class="label flex1">售后: 质保长 赔付快</view>
            <VoIcon :opacity="0.25" color="#000000" name="right-arrow" />
          </view>
        </view>
      </view>
    </view>
    <view v-if="info.paramsProperty && info.paramsProperty.length > 0" class="cell-box">
      <view class="cell-box__title">
        <view class="left">产品参数</view>
        <view
          v-if="info.paramsProperty && info.paramsProperty.length > 10"
          class="right m-r-8"
          @click="lookMoreClick"
          >查看更多
          <VoIcon :opacity="0.25" :size="20" color="#000000" name="right-arrow" />
        </view>
      </view>
      <view class="cell-box__main">
        <view
          v-for="(item, index) in info.paramsProperty"
          v-show="index < 10"
          :key="index + item.name"
          class="main-row"
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
  import VoTable from "@/components/VoTable/VoTable";
  export default {
    name: 'CellInfo',
    components: {VoTable},
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
      lookMoreClick() {
        this.$storage.set('paramsProperty', this.info.paramsProperty)
        this.$emit('productParamsLookMore')
      },
      lookMoreClickCar() {
        this.$storage.set('vehicleVOS', this.info.vehicles)
        this.$emit('carModelLookMore')
      },
      show() {
        this.visible = true
      },
      close() {
        this.visible = false
      },
      confirm() {
        this.visible = false
      },
      nextPage() {
        this.$linkToEasy('/pagesGarage/Order/ReturnExchange/AfterInfo')
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
      margin-bottom: 16rpx;

      &__title {
        display: flex;
        padding: 20rpx 32rpx;

        .left {
          font-size: 32rpx;
          line-height: 1.5;
          color: $v-c0-85;
          font-weight: bold;
        }

        .right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          font-size: 26rpx;
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
  .popup {
    .popup__title {
      margin: 44rpx auto 0 auto;
      text-align: center;
      font-size: 32rpx;
      font-weight: bold;
      color: rgba(0, 0, 0, 0.85);
    }
    .popup__image {
      padding: 32rpx;
    }
    .popup__btn {
      padding: 24rpx 32rpx 80rpx 32rpx;
      border-top: 1rpx solid #f7f7f8;
    }
  }
</style>
