<template>
  <view class="goodItem">
    <view class="goodItem-topLine" />
    <view class="goodItem-goods">
      <view class="flex flex-vertical-c flex-justify-between">
        <view class="m-l-16 fz-28 fz-b"> 失效项目（共{{ goodData.length }}个） </view>
        <view class="flex flex-vertical-c" @click="show = true">
          <view class="m-r-8 color-block-65 fz-28">清空</view>
          <VoIcon :opacity="0.45" :size="18" name="delete" />
        </view>
      </view>
      <view v-for="(good, index) of goodData" :key="index">
        <view class="flex flex-justify-between m-t-24">
          <view class="flex flex-vertical-c">
            <VoIcon :size="24" name="address_select" />
            <view class="goodItem-goods__image" @click="goto(good)">
              <image :src="good.picture[0] + '&type=1'" class="image m-l-8" />
              <block v-if="good.isInvalid">
                <image
                  v-if="+good.warehouseGoodsNum === 0"
                  class="null"
                  src="/static/noData/invest_good_null.png"
                />
                <image v-else class="null" src="/static/noData/invest_good_failure.png" />
              </block>
            </view>
          </view>
          <view class="flex1 m-l-16">
            <view class="fz-b fz-32 color-block-45 overTwoEllipsis">{{
              good.resaleGoodsName
            }}</view>
          </view>
        </view>
        <view class="goodItem-goods__null">
          <view class="flex flex-justify-between flex-vertical-c">
            <view class="fz-26 color-red">{{ good.invalidCause || '该商品已经无法购买' }}</view>
            <!--<view class="btn flex" @click.stop="toSame(good)">找相似</view>-->
          </view>
        </view>
        <view v-show="index !== goodData.length - 1" class="goodItem-goods__line" />
      </view>
    </view>
    <u-modal
      ref="delFailure"
      :show="show"
      asyncClose
      cancelText="我再想想"
      closeOnClickOverlay
      showCancelButton
      @cancel="show = false"
      @confirm="clearFn"
    >
      <text class="fz-32 color-block">确认清空失效商品吗？</text>
    </u-modal>
  </view>
</template>

<script>
  export default {
    name: 'FailureGoodItem',
    props: {
      goodData: {
        type: Array,
        // eslint-disable-next-line vue/require-valid-default-prop
        default: [],
      },
    },
    data() {
      return {
        isLoading: false,
        show: false,
      }
    },
    created() {
      console.log('失效商品', this.goodData)
    },
    methods: {
      goto(good) {
        if (!good.isPreSale) {
          this.$linkToEasy(
            '/pagesOldBuyer/HomeJumpPage/GoodsDetails?id=' + good.resaleGoodsId + '&source=false',
          )
          return
        }
        this.$linkToEasy(
          '/pagesOldBuyer/HomeJumpPage/GoodsDetails?id=' + good.resaleGoodsId + '&source=true',
        )
      },
      clearFn() {
        if (this.isLoading) return

        this.isLoading = true
        let ids = this.goodData.map((item) => item.id)
        this.$VoHttp
          .apiCartResaleDeleteBatch({
            ids: ids,
          })
          .then((res) => {
            uni.$u.toast('操作成功')
            this.isLoading = false
            this.$emit('clear')
          })
          .catch((e) => {
            this.isLoading = false
            uni.$u.toast(e.message || '操作失败')
          })
      },
      toSame(good) {
        //相似项目
        this.$linkToEasy(
          '/pagesAgent/InvestmentList/InvestmentSimilarOrder?goodsNames=' +
            JSON.stringify(good.goodsNames),
        )
      },
    },
  }
</script>

<style lang="scss" scoped>
  .goodItem {
    &-topLine {
      margin-left: 32rpx;
      height: 2rpx;
      background-color: $v-bg-light;
    }
    &-goods {
      padding: 24rpx 32rpx 0rpx 16rpx;

      &__image {
        position: relative;
        .image {
          width: 128rpx;
          height: 128rpx;
          border-radius: 8rpx;
        }
        .null {
          position: absolute;
          top: 16rpx;
          left: 26rpx;
          width: 96rpx;
          height: 96rpx;
        }
      }
      &__postage {
        margin-top: 8rpx;
        background-color: $v-bg-light;
        padding: 4rpx 16rpx;
        color: $v-c0-85;
        font-size: 24rpx;
      }
      &__price {
        margin-left: 216rpx;
        margin-top: 20rpx;
        .price {
          padding: 0rpx 4rpx;
          background-color: $color-disabled-red;
          color: $color-clicked-red;
          font-size: 24rpx;
          border-radius: 4rpx;
          border: 2rpx solid $color-clicked-red;
        }
        .input {
          width: 76rpx;
          text-align: center;
          font-size: 28rpx;
        }
      }
      &__null {
        margin-left: 216rpx;
        margin-top: 20rpx;
        padding-bottom: 20rpx;
        .btn {
          border: 2rpx solid $color-primary-yellow;
          border-radius: 24rpx;
          padding: 4rpx 32rpx;
          color: $color-primary-yellow;
          font-size: 24rpx;
        }
      }
      &__line {
        margin-left: 72rpx;
        height: 2rpx;
        margin-top: 24rpx;
        background-color: $v-bg-light;
      }
    }
  }
</style>
