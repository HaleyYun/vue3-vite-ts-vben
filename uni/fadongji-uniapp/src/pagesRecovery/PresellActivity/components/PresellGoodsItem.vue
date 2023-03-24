<template>
  <view class="goods" @click="tapToDetail">
    <view class="goods_nm fz-28"
      >商品编号：<text>{{ goodData.code }}</text></view
    >
    <view class="goods_name fz-b fz-32">{{ goodData.name }}</view>
    <view class="goods_price">
      <view v-for="(item, index) in goodData.levelVOS" :key="index" class="goods_price_item">
        <view class="fz-32">
          <VoPointPrice :left-size="12" :price="item.price" />
        </view>
        <view class="fz-24">{{ item.level }}类价格</view>
      </view>
    </view>
    <view class="goods_action m-t-24">
      <view class="m-l-32">
        <u-button
          customStyle="border-color:rgba(0, 0, 0, 0.25);color:rgba(0, 0, 0, 0.85)"
          plain
          shape="circle"
          size="small"
          text="选择"
          @click="tapBtn(goodData)"
        />
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'PresellGoodsItem',
    props: {
      goodData: {
        type: Object,
        goodData: {},
      },
    },
    data() {
      return {
        productArray: [],
      }
    },
    methods: {
      tapBtn(val) {
        this.$emit('selectGood', val)
      },
      tapToDetail() {
        this.$emit('tapToNextPage', this.goodData)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .goods {
    padding: 16rpx 32rpx 32rpx 32rpx;
    background-color: #fff;
    &_nm {
      color: rgba(0, 0, 0, 0.85);
      border-bottom: 1rpx solid #f7f7f8;
      padding: 16rpx 0;
    }
    &_name {
      padding: 24rpx 0;
    }
    &_price {
      display: flex;
      align-items: center;
      color: #e50012;

      &_item {
        text-align: center;

        > :nth-child(1) {
          line-height: 48rpx;
        }

        > :nth-child(2) {
          width: 100rpx;
          border: 1rpx solid #e50012;
          background-color: #fdf2f3;
          border-radius: 4rpx;
          margin: 10rpx auto;
        }
      }

      > :nth-child(2) {
        margin: 0 52rpx 0 92rpx;
      }
    }
    &_action {
      display: flex;
      justify-content: flex-end;
    }
  }
</style>
