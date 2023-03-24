<template>
  <view class="have">
    <view
      class="have-title flex flex-vertical-c"
      @click.stop="
        $linkToEasy(`/pagesAgent/InvestmentList/ShopDetails?companyId=${haveEvaluationList.shopId}`)
      "
    >
      <view class="m-r-18">{{ haveEvaluationList.storeName }}</view>
      <VoIcon :size="20" name="right-arrow" />
    </view>
    <view
      class="have-content flex"
      @click="
        $linkToEasy(
          `/pagesGarage/ShopList/GoodsDetail?id=${haveEvaluationList.goodsId}&wid=${haveEvaluationList.warehouseId}`,
        )
      "
    >
      <image
        v-if="haveEvaluationList.pic"
        :src="JSON.parse(haveEvaluationList.pic[0])[0]"
        class="have-content__img"
      />
      <view class="have-content__info flex1">
        <text v-show="haveEvaluationList.categoryType" class="good-tips m-r-8">{{haveEvaluationList.categoryType}}</text>
        <text> {{ haveEvaluationList.goodsName || '' }} </text>
      </view>
    </view>
    <view class="flex flex-vertical-c">
      <view class="lh42 fz-28 color-block">评分：</view>
      <u-rate
        :value="select"
        activeIcon="/static/created/evaluate/score_activate.png"
        gutter="12"
        inactiveIcon="/static/created/evaluate/score_not_active.png"
        readonly
      />
      <view v-if="select === 5" class="fz-24 lh36 m-l-4">非常满意</view>
      <view v-else-if="select === 4" class="fz-24 lh36 m-l-4">满意</view>
      <view v-else-if="select === 3" class="fz-24 lh36 m-l-4">良好</view>
      <view v-else-if="select === 2" class="fz-24 lh36 m-l-4">差</view>
      <view v-else-if="select === 1" class="fz-24 lh36 m-l-4">极差</view>
    </view>
    <view  class="have-con flex">
      <view class="lh42 fz-28 color-block">内容：</view>
      <view class="have-con__content flex1">
        {{ JSON.parse(haveEvaluationList.content).content||'暂无内容' }}
      </view>
    </view>
    <view class="flex flex-vertical-c p-b-24 p-t-4 fz-28 lh42">
      <view class="color-block">时间：</view>
      <view class="flex1 color-block-45">{{ haveEvaluationList.createTime }}</view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'HaveEvaluation',
    props: {
      haveEvaluationList: {
        type: Object,
        default: {},
      },
    },
    data() {
      return {
        select: this.haveEvaluationList.starMark / 2,
      }
    },
    methods: {
      // clickFn() {
      //   console.log(this.select)
      // },
    },
  }
</script>

<style lang="scss" scoped>
  .have {
    width: 750rpx;
    background: #fff;
    padding: 0 32rpx;
    box-sizing: border-box;
    margin-bottom: 16rpx;

    &-title {
      padding: 26rpx 0 16rpx;
      box-sizing: border-box;
      border-bottom: 2rpx solid $v-bg-light;
      line-height: 42rpx;
      font-weight: bold;
      font-size: 28rpx;
      color: $v-c0-85;
    }

    &-content {
      margin: 32rpx 0;

      &__img {
        width: 80rpx;
        height: 80rpx;
        border-radius: 8rpx;
        overflow: hidden;
        margin-right: 24rpx;
      }

      &__info {
        line-height: 48rpx;
        font-weight: bold;
        font-size: 32rpx;
        color: $v-c0-85;
        overflow-x: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    &-con {
      padding: 16rpx 0;
      box-sizing: border-box;

      &__content {
        line-height: 42rpx;
        font-size: 28rpx;
        color: $v-c0-45;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        margin-left: 8rpx;
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
</style>
