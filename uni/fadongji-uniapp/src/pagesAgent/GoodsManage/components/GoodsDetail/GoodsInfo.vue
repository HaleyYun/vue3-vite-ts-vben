<template>
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
        <view class="info-desc__row">
          <text class="price-name">现金支付：</text>
          <VoPointPrice
            :leftSize="20"
            :price="info.cashPrice"
            :show-unit="true"
            color="#FF5319"
            display="inline-block"
          />
          <text class="price-name m-l-32">45天账期：</text>
          <VoPointPrice
            :leftSize="20"
            :price="info.cashPrice"
            :show-unit="true"
            color="#FF5319"
            display="inline-block"
          />
        </view>
        <view v-if="info.isCoding" class="info-desc__row p-t-10">
          <view v-if="false" class="btn-tag fz-25 m-r-10">安装 +100元</view>
          <view v-if="false" class="btn-tag fz-25 m-r-10">以旧换新 -350元</view>
          <view v-if="info.isCoding" class="btn-tag fz-25">定制 +{{ info.codingPrice }}元</view>
        </view>
        <!-- <view class="info-desc__row">
      <view class="col">
        <text class="label">建议零售价：</text>
        <text class="price else">0 <text class="unit">.00元</text></text>
      </view>
      <view>
        <text class="label">预计利润：</text>
        <text class="price else">280000 <text class="unit">.00元</text></text>
      </view>
      </view> -->
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
        <view class="right flex fz-24 color-block-45 m-t-24">
          <view class="flex flex1 flex-vertical-c flex-justify-c">
            <VoIcon :opacity="0.45" color="#000000" name="share" />
            分享
          </view>
          <view class="flex flex1 flex-vertical-c flex-justify-c">
            <VoIcon
              v-if="isCollect"
              :size="24"
              color="#FDA202"
              name="star"
              @click="collectCancel()"
            />
            <VoIcon v-else :opacity="0.45" color="#000000" name="collect-none" @click="collect()" />
            收藏
          </view>
        </view>
      </view>
    </view>
  </template>
</template>
<script>
  export default {
    name: 'ApplySale',
    props: {
      info: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        currentNum: 0,
        imgList: [
          'https://cdn.uviewui.com/uview/swiper/swiper3.png',
          'https://cdn.uviewui.com/uview/swiper/swiper2.png',
          'https://cdn.uviewui.com/uview/swiper/swiper1.png',
        ],
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
        arrivalTime: '',
        isExpand: false,
      }
    },
    created() {
      this.typeList[0].price = this.info.cashPrice
      this.typeList[1].price = this.info.accountPrice
      this.typeList[1].text = this.info.accountPeriodDays + '天帐期'
      if (this.info.arrivalTime) {
        let nowDate = new Date()
        //后台返回的是天数，转换为日期
        let num = Number(this.info.arrivalTime)
        // 24小时毫秒数
        let dayStamp = 24 * 60 * 60 * 1000
        let nextDate = new Date(nowDate.getTime() + num * dayStamp)
        this.arrivalTime = this.$vocenApi.VoUtils.timeFormat(nextDate.getTime(), 'yyyy-mm-dd')
      }
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
