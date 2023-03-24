<template>
  <view class="info">
    <u-swiper
      :autoplay="false"
      :height="375"
      :list="info.pic"
      indicatorMode="line"
      indicatorStyle="right: 32rpx"
      radius="0"
      @change="(e) => (currentNum = e.current)"
      @click="lookPhoto"
    >
      <view slot="indicator" class="indicator-num">
        <text class="indicator-num__text">{{ currentNum + 1 }}/{{ info.pic.length }}</text>
      </view>
    </u-swiper>
    <view class="info-desc">
      <view class="info-desc__texts">
        <text v-if="info.categoryType" class="texts-tag">{{ info.categoryType }}</text>
        <text class="texts-name">
          {{ info.name.length > 18 && !isExpand ? info.name.slice(0, 18) : info.name }}
        </text>
        <view
          v-if="info.name.length > 18 && !isExpand"
          class="texts-operation"
          @click="isExpand = true"
        >
          展开
          <VoIcon :opacity="15" :size="16" color="#000000" name="arrow-bottom-line" />
        </view>
      </view>
      <view class="info-desc__row nopadding">
        <view v-if="info.deliveryAreaName" class="info-desc__time"
          >{{ info.deliveryAreaName }}发货 预计{{ info.arrivalTime }}送达
        </view>
      </view>
    </view>
  </view>
</template>
<script>
  export default {
    name: 'ApplySale',
    props: {
      preview: {
        type: [String, Number],
        default: 0,
      },
      info: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        currentNum: 0,
        imgList: [],
        typeList: [
          {
            price: 0,
            text: '现金支付',
            choosed: true,
          },
          {
            price: 0,
            text: '',
            choosed: false,
          },
        ],
        isExpand: false,
        isCollect: this.info.isCollect === 1 ? true : false,
      }
    },
    created() {
      this.typeList[0].price = this.info.cashPrice
      this.typeList[1].price = this.info.accountPrice
      this.typeList[1].text = this.info.accountPeriodDays + '天帐期'
      this.imgList = this.info.pic
    },
    methods: {
      //付款方式选择
      typeClick(val) {
        this.typeList.forEach((item) => {
          if (item.text === val.text) {
            item.choosed = true
          } else {
            item.choosed = false
          }
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .info {
    .indicator-num {
      padding: 0 18rpx;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      background: rgba(0, 0, 0, 0.45);
      border-radius: 100px;

      &__text {
        color: #ffffff;
        line-height: 48rpx;
        font-size: 28rpx;
      }
    }

    &-desc {
      padding: 32rpx;
      box-sizing: border-box;
      background: #fff;

      &__row {
        display: flex;
        padding-bottom: 16rpx;
        align-items: center;

        &.nopadding {
          padding: 0;
        }

        .row-box {
          padding: 8rpx 28rpx;
          margin-right: 32rpx;
          box-sizing: border-box;
          border: 1px solid #d3d4db;
          border-radius: 8px;
          background: #f7f7f8;
          position: relative;

          &__text {
            font-size: 24rpx;
            line-height: 1.5;
          }

          &__icon {
            position: absolute;
            right: 8rpx;
            bottom: 12rpx;
          }

          &.choosed {
            background: #fdf2f3;
            border: 1px solid #f95865;

            .row-box__text {
              color: #e50012;
            }
          }
        }

        .price {
          color: #e50012;
          font-weight: 600;
          font-size: 40rpx;
          line-height: 1.5;

          &-name {
            font-size: 24rpx;
            color: $color-primary-yellow;

            &.two {
              margin-left: 32rpx;
            }
          }

          .unit {
            font-size: 24rpx;
            font-weight: 400;
          }

          &.else {
            font-size: 28rpx;

            .unit {
              font-size: 20rpx;
            }
          }
        }

        .label {
          font-size: 20rpx;
          line-height: 1.5;
          color: $v-c0-45;
        }

        .col {
          margin-right: 24rpx;
        }

        .btn {
          background: #feecee;
          border: 1px solid #f95865;
          border-radius: 100px;
          font-size: 24rpx;
          line-height: 1.5;
          text-align: center;
          color: #e50012;
          padding: 8rpx 16rpx;
        }

        .btn-tag {
          height: 36rpx;
          border-radius: 4rpx;
          background: #e6efff;
          padding: 0 8rpx;
          color: #0d66ff;
        }

        .right {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          font-size: 24rpx;
          line-height: 1.5;
          color: $v-c0-45;
        }
      }

      &__texts {
        position: relative;

        .texts-tag {
          background: $v-tags-btn-disabled;
          border-radius: 12px;
          padding: 0 12rpx;
          text-align: center;
          color: $color-primary-yellow;
          font-size: 20rpx;
          line-height: 1.5;
          margin-right: 10rpx;
        }

        .texts-name {
          color: $v-c0-85;
          font-size: 32rpx;
          line-height: 1.5;
          word-break: break-all;
        }

        .texts-operation {
          color: $v-c0-45;
          font-size: 24rpx;
          line-height: 1.5;
          display: flex;
          align-items: center;
          position: absolute;
          right: 0;
          bottom: 6rpx;
          background-color: #fff;
          z-index: 10;
          padding-left: 20rpx;
        }
      }

      &__time {
        color: $v-c0-65;
        font-size: 24rpx;
        line-height: 1.5;
        padding-top: 16rpx;
        // padding-bottom: 24rpx;
      }
    }
  }
</style>
