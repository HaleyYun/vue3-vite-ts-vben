<template>
  <view class="goods-item color-block" @click="itemClick">
    <view class="goods-item__title flex border-bottom">
      <view class="label">商品编号：</view>
      <view class="value">{{ dataObj.code || '暂无编号' }}</view>
      <view class="flex1 flex-justify-r flex color-block-45" @click="toPage">
        出入库记录
        <VoIcon :opacity="0.45" :size="20" color="#000000" name="right-arrow" />
      </view>
    </view>
    <view class="goods-item__main p-t-24">
      <view class="flex p-b-24">
        <view :class="dataObj.status === 3 ? 'tag' : 'daishou'">{{
          dataObj.statusName || ''
        }}</view>
        <view class="flex1 font-weight-500 text-nowrap">{{ dataObj.name || '' }}</view>
      </view>
      <block v-for="(item, index) in dataObj.levelVOS" :key="index">
        <view class="flex p-b-24">
          <view class="color-text fz-32">{{ item.level }}类：</view>
          <view class="m-r-16">库存 {{ item.availableNumber || 0 }}</view>
          <view class="color-block-45 fz-24"
            >(总库存 {{ item.number || 0 }} 订单占用 {{ item.orderNumber || 0 }})</view
          >
        </view>
      </block>
    </view>
    <view class="goods-item__btn flex flex-justify-r">
      <view class="o-btn fz-24 m-r-32" @click.stop="outWare">出库</view>
      <view class="o-btn fz-24" @click.stop="enterWare">入库</view>
    </view>
  </view>
</template>
<script>
  export default {
    name: 'CourseBox',
    props: {
      dataObj: {
        type: Object,
      },
    },
    data() {
      return {}
    },
    methods: {
      //item点击事件
      itemClick() {
        this.$emit('click')
      },
      //出库
      outWare() {
        this.$emit('outWare', this.dataObj)
      },
      //ru库
      enterWare() {
        this.$emit('enterWare', this.dataObj)
      },
      toPage() {
        this.$linkToEasy(
          '/pagesRecovery/GoodsStore/StoreChange?id=' +
            this.dataObj.id +
            '&name=' +
            this.dataObj.name,
        )
      },
    },
  }
</script>
<style lang="scss" scoped>
  .goods-item {
    background: #ffffff;
    padding: 24rpx 32rpx;
    box-sizing: border-box;
    margin-bottom: 16rpx;
    margin-top: 16rpx;
    font-size: 28rpx;
    &__title {
      padding-bottom: 16rpx;
    }
    .color-text {
      color: #ff5319;
      font-weight: 500;
    }
    .tag {
      background: #00b259;
      border-radius: 8rpx 0rpx 16rpx;
      height: 36rpx;
      padding: 0 16rpx;
      color: #fff;
      font-size: 24rpx;
      margin-right: 8rpx;
    }
    .daishou {
      background: #d3d4db;
      border-radius: 8rpx 0rpx 16rpx;
      height: 36rpx;
      padding: 0 16rpx;
      color: #6f738a;
      font-size: 24rpx;
      margin-right: 8rpx;
    }
    .o-btn {
      padding: 5px 16px;
      box-sizing: border-box;
      text-align: center;
      border: 1px solid rgba(0, 0, 0, 0.25);
      border-radius: 64rpx;
    }
  }
</style>
