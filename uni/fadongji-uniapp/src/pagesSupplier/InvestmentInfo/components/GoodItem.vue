<template>
  <view class="good">
    <view class="good-top flex flex-vertical-c">
      <view class="good-top__goodName">商品编号：</view>
      <view class="good-top__number"> {{ goodData.code }}</view>
      <view class="good-top__copy" @click="copyClick(goodData.code)">复制</view>
    </view>
    <view class="good-content flex">
      <image v-if="!goodData.pic" class="good-content__logo" src="/static/logo-2.png" />
      <image :src="goodData.pic" class="good-content__logo" else />
      <view class="flex1">
        <view class="good-content__title overTwoEllipsis">
          <text v-show="goodData.categoryType" class="good-tips m-r-8">{{goodData.categoryType}}</text>
          {{ goodData.name }}
        </view>
        <view class="good-content__price flex flex-vertical-c">
          <view class="price-title">现金价</view>
          <VoPointPrice :price="goodData.cashPrice" />
          <view v-if="goodData.accountPrice" class="price-title m-l-48">
            {{ goodData.accountPeriodDays }}天账期
          </view>
          <view v-if="goodData.accountPrice">
            <VoPointPrice :price="goodData.accountPrice" />
          </view>
        </view>
<!--        <view-->
<!--          class="flex good-content__earnings flex-vertical-c"-->
<!--          @click.stop="toShopServiceCost(goodData.id, goodData.name)"-->
<!--        >-->
        <view
          class="flex good-content__earnings flex-vertical-c"
        >
          <view class="earnings">
            <view class="earnings-title">预计收益</view>
          </view>
          <view class="earnings-price flex">
            <VoPointPrice v-if="false" :price="goodData.minPredictProfit" color="#595959" />
            <view>{{ goodData.minPredictProfit || 0 }}元</view>
            <view>-</view>
            <VoPointPrice v-if="false" :price="goodData.earnsLastPrice" color="#595959" />
            <view>{{ goodData.maxPredictProfit || 0 }}元</view>
          </view>
<!--          <VoIcon :opacity="0.45" :size="16" color="#000000" name="question-line" />-->
        </view>
      </view>
    </view>
    <view class="good-bottom flex flex-justify-r">
      <view class="good-bottom__btn">
        <view class="title" @click.stop="toDetail(goodData)">商品详情</view>
      </view>
      <view class="good-bottom__btn good-bottom__paddingLeft">
        <view class="title full" @click.stop="bottomBtnClick(2, goodData)">选择</view>
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
      // 是否预览（预览或查看详情时，传递参数，禁止更改数据）
      isView: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      //跳转商品服务费用
      toShopServiceCost(id, name) {
        this.$linkToEasy('/pagesAgent/GoodsManage/ShopServiceCost?id=' + id + '&name=' + name)
      },
      toDetail(item) {
        let path = '/pagesProduct/PutProduct/EditProduct?id=' + item.id
        this.$linkToEasy(this.isView ? path + '&isView=1' : path)
      },
      copyClick(row) {
        uni.setClipboardData({
          data: row,
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

        .price-title {
          height: 32rpx;
          line-height: 32rpx;
          padding: 0 4rpx;
          color: #f20014;
          font-size: 24rpx;
          border: 2rpx solid #f20014;
          border-radius: 4rpx;
          box-sizing: border-box;
          background: #ffe6e8;
          margin-right: 8rpx;
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
        background-color: #ffffff;

        .title {
          border: 2rpx solid $v-c0-25;
          padding: 10rpx 36rpx;
          font-size: 24rpx;
          border-radius: 30rpx;
        }

        .full {
          padding: 10rpx 36rpx;
          font-size: 24rpx;
          border-radius: 30rpx;
          border: 2rpx solid $color-primary-yellow;
          color: $color-primary-yellow;
        }
      }

      &__paddingLeft {
        margin-left: 40rpx;
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
  }
</style>
