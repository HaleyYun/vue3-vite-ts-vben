<template>
  <view class="good" @click="toDetail(goodData)">
    <view class="good-top flex flex-vertical-c">
      <view class="good-top__goodName">商品编号：</view>
      <view class="good-top__number"> {{ goodData.code }}</view>
      <view class="good-top__copy" @click="copyClick(goodData.code)">复制</view>
    </view>
    <view class="good-content flex">
      <image v-if="!goodData.pic" class="good-content__logo" src="/static/logo-2.png" />
      <image else class="good-content__logo" :src="goodData.pic" />
      <view class="flex1">
        <view class="good-content__title overTwoEllipsis">
          <text v-show="goodData.categoryType" class="good-tips m-r-8">{{goodData.categoryType}}</text>
          <text> {{ goodData.name }}</text>
         </view>
        <view class="good-content__price flex">
          <view class="priceTitle">
            <view class="priceTitle-title">现金价</view>
          </view>
          <view class="left-8 flex">
            <VoPointPrice v-if="false" :price="goodData.cashPrice" />
            <VoPointPrice :price="goodData.cashPrice.toFixed(2)" class="tag-text first" />
          </view>
          <view v-if="goodData.accountPrice" class="priceTitle left-34">
            <view class="priceTitle-title">{{ goodData.accountPeriodDays }}天账期</view>
          </view>
          <view v-if="goodData.accountPrice" class="left-8 flex">
            <VoPointPrice v-if="false" :price="goodData.accountPrice" />
            <VoPointPrice :price="goodData.accountPrice.toFixed(2)" class="tag-text first" />
          </view>
        </view>
  
        <view class="main-right__tags">
          <view class="tag black">预计收益</view>
          <view class="tag-text black">
            <VoPointPrice
              v-if="goodData.minPredictProfit"
              :price="goodData.minPredictProfit || 0"
              class="tag-text"
              color="rgba(0, 0, 0, 0.65)"
              :show-unit="true"
            />
            <view v-else>-</view>
          </view>
          <text v-if="goodData.minPredictProfit" class="color-block-65">-</text>
          <view class="tag-text black">
            <VoPointPrice
              v-if="goodData.maxPredictProfit"
              :price="goodData.maxPredictProfit || 0"
              class="tag-text"
              color="rgba(0, 0, 0, 0.65)"
              :show-unit="true"
            />
            <view v-else>-</view>
          </view>
          <!--          <VoIcon-->
          <!--            :opacity="0.45"-->
          <!--            :size="16"-->
          <!--            class="tag-icon"-->
          <!--            color="#000"-->
          <!--            name="account-question"-->
          <!--            @click="toShopServiceCost(dataObj.id, dataObj.name)"-->
          <!--          />-->
        </view>
      </view>
    </view>
    <view class="good-bottom flex flex-justify-r">
      <!-- <view class="good-bottom__btn">
        <view class="title" @click.stop="toDetail(goodData)">商品详情</view>
      </view> -->
      <view class="good-bottom__btn good-bottom__paddingLeft">
        <view class="title" @click.stop="bottomBtnClick(2, goodData)">选择</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'GoodItem',
    props: {
      goodData: {
        type: Object,
        goodData: {},
      },
    },
    methods: {
      toDetail(item) {
        this.$linkToEasy('/pagesSupplier/GoodsManage/GoodsDetail?id=' + item.id)
      },
      copyClick(row) {
        uni.setClipboardData({
          data: row.code,
          success: function () {
            this.$u.toast('复制成功')
          },
        })
      },
      bottomBtnClick(type, data) {
        let param = {
          type: type,
          data: data,
        }
        this.$emit('bottomClick', param)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .good {
    background-color: #ffffff;
    padding: 0rpx 32rpx;

    &-top {
      padding-top: 24rpx;
      color: $v-c0-45;
      font-size: 26rpx;

      &__goodName {
        margin-left: 6rpx;
      }

      &__number {
        color: $v-c0-85;
        margin-left: 6rpx;
      }

      &__copy {
        color: $v-tip;
        margin-left: 8rpx;
        font-size: 28rpx;
      }
    }

    &-content {
      margin-top: 28rpx;
      padding-bottom: 32rpx;

      &__logo {
        width: 128rpx;
        height: 128rpx;
        border-radius: 8rpx;
        margin-right: 16rpx;
      }

      &__title {
        color: $v-c0-85;
        font-size: 28rpx;
        font-weight: bold;
      }

      &__price {
        margin-top: 16rpx;
        color: $color-primary-red;
        font-size: 28rpx;
        font-weight: bold;

        .priceTitle {
          background-color: #fdf2f3;
          border-radius: 4rpx;
          border: 1px solid #ec404d;
          margin-right: 8rpx;
          
          &-title {
            padding: 2rpx !important;
            font-size: 24rpx;
            color: #ec404d;
            padding: 2rpx 4rpx;
            
          }
        }

        .left-8 {
          margin-left: 8rpx;
        }

        .left-34 {
          margin-left: 34rpx;
        }
      }

      &__earnings {
        margin-top: 14rpx;

        .earnings {
          background-color: $v-bg-light;
          border-radius: 4rpx;
          border: 2rpx solid $v-text-disabled;

          &-title {
            padding: 2rpx;
            font-size: 24rpx;
            color: $v-c0-65;
          }

          &-price {
            margin-left: 8rpx;
            margin-right: 8rpx;
            font-weight: bold;
            font-size: 28rpx;
            color: $v-c0-65;
          }
        }
      }
    }

    &-bottom {
      padding-bottom: 18rpx;

      &__btn {
        color: $color-clicked-yellow;
        background-color: #ffffff;
        border: 2rpx solid $color-clicked-yellow;
        border-radius: 30rpx;

        .title {
          padding: 10rpx 36rpx;
          font-size: 24rpx;
        }
      }

      &__paddingLeft {
        margin-left: 40rpx;
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
  .tag-text {
    color: #e50012;
    font-size: 28rpx;
    line-height: 1.5;
    font-weight: 500;
  
    &.first {
      margin-right: 44rpx;
    }
  
    &.black {
      color: $v-c0-65;
    }
  
    &__right {
      font-weight: 400;
      font-size: 24rpx;
    }
  }

  .main-right {
    &__tags {
      display: flex;
      padding-top: 14rpx;
      align-items: center;
  
      .tag {
        background: #fdf2f3;
        border: 1px solid #ec404d;
        border-radius: 4rpx;
        color: #ec404d;
        text-align: center;
        font-size: 24rpx;
        padding: 2rpx 2rpx;
        margin-right: 8rpx;
    
        &.black {
          background: #f6f7f8;
          border: 1px solid #d3d4db;
          color: $v-c0-65;
        }
      }
    }
  }
</style>
