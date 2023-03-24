<template>
  <view class="info">
    <u-swiper
      :autoplay="false"
      :height="375"
      :list="imgList"
      indicatorMode="line"
      indicatorStyle="right: 32rpx"
      radius="0"
      @change="(e) => (currentNum = e.current)"
    >
      <view slot="indicator" class="indicator-num">
        <text class="indicator-num__text">{{ currentNum + 1 }}/{{ imgList.length }}</text>
      </view>
    </u-swiper>
    <view class="info-desc">
      <view class="info-desc__row">
        <!-- <view
          class="row-box"
          :class="item.choosed ? 'choosed' : ''"
          v-for="item in typeList"
          :key="item.text"
          @click="typeClick(item)"
        >
          <view class="price">{{ item.price || 0 }} <text class="unit">.00元</text></view>
          <view class="row-box__text">{{ item.text }}</view>
          <VoIcon
            class="row-box__icon"
            name="right"
            color="#E50012"
            :size="12"
            v-if="item.choosed"
          />
        </view> -->
        <text class="price-name">现金支付：</text>
        <VoPointPrice
          :price="info.cashPrice"
          :show-unit="true"
          class="tag-text first"
          display="inline-block"
        />
        <!-- <text class="price">{{ info.cashPrice }} <text class="unit">.00元</text></text> -->
        <text class="price-name two">{{ info.accountPeriodDays }}天帐期：</text>
        <VoPointPrice
          :price="info.accountPrice"
          :show-unit="true"
          class="tag-text first"
          display="inline-block"
        />
        <!-- <text class="price">{{ info.accountPrice }}<text class="unit">.00元</text></text> -->
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
        <text v-if="info.brandName" class="texts-tag">{{ info.brandName }}</text>
        <text class="texts-name">
          {{ info.name.length > 18 && !isExpand ? info.name.slice(0, 18) : info.name }}
        </text>
        <view
          v-if="info.name.length > 18 && !isExpand"
          class="texts-operation"
          @click="isExpand = true"
        >
          展开<VoIcon :opacity="15" :size="16" color="#000000" name="arrow-bottom-line" />
        </view>
      </view>
      <!-- <view class="info-desc__row">
        <view class="btn-tag">安装 +100元</view>
        <view class="btn-tag">以旧换新 -350元</view>
        <view class="btn-tag">定制 +10.00元</view>
      </view> -->
      <!-- <view class="info-desc__row nopadding">
        <view class="info-desc__time"
          >{{ info.deliveryAreaName }}发货 预计{{ info.arrivalTime }}送达</view
        >
        <view class="right">
          <VoIcon name="share" color="#000000" :opacity="0.45" />
          分享
        </view>
      </view> -->
    </view>
  </view>
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
        isExpand: false,
      }
    },
    created() {
      this.typeList[0].price = this.info.cashPrice
      this.typeList[1].price = this.info.accountPrice
      this.typeList[1].text = this.info.accountPeriodDays + '天帐期'
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
            color: #e50012;
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
          border: 1px solid #d3d4db;
          border-radius: 4rpx;
          background: #f6f7f8;
          padding: 0 8rpx;
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
          background: #ee0a24;
          border-radius: 12px;
          padding: 0 12rpx;
          text-align: center;
          color: #ffffff;
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
