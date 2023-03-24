<template>
  <view class="board">
    <view class="bg-white">
      <view class="board-top flex flex-vertical-c flex-justify-between">
        <view>
          <view class="lh48 fz-b fz-32 color-block">数据看板</view>
          <view class="m-t-12 flex flex-vertical-c">
            <view class="lh 42 fz-28 color-block-45 m-r-8">更新于{{ todayTime }}</view>
            <VoIcon
              :opacity="0.45"
              :size="16"
              color="#000000"
              name="refresh-home"
              @click="refreshFn"
            />
          </view>
        </view>
        <!--        <VoIcon :opacity="0.45" :size="20" color="#000000" name="right-arrow" />-->
      </view>
      <view class="board-line" />
      <view class="board-bottom">
        <view>
          <view class="lh60 fz-b fz-40 color-block">
            <text class="font-din-bold">{{ boardInfo.recycleNum || 0 }}</text>
            <!--            <text class="fz-24 m-l-2">万</text>-->
          </view>
          <view class="lh42 fz-28 color-block">回收单</view>
          <view class="flex flex-vertical-c fz-24 lh36 m-t-14">
            <text class="color-block-45">昨日</text>
            <text class="color-red m-l-4">+{{ boardInfo.yesterdayRecycleNum || 0 }}</text>
            <image class="board-bottom__img" src="/static/supplier/home/on_union.png" />
          </view>
        </view>
        <view>
          <view class="lh60 fz-b fz-40 color-block font-din-bold">{{
            boardInfo.recycleAmount || 0
          }}</view>
          <view class="lh42 fz-28 color-block">回收金额</view>
          <view class="flex flex-vertical-c fz-24 lh36 m-t-14">
            <text class="color-block-45">昨日</text>
            <text class="color-green m-l-4">{{ boardInfo.yesterdayRecycleAmount || 0 }}</text>
            <image class="board-bottom__img" src="/static/supplier/home/down_union.png" />
          </view>
        </view>
        <view>
          <view class="lh60 fz-b fz-40 color-block font-din-bold">{{
            boardInfo.storageNum || 0
          }}</view>
          <view class="lh42 fz-28 color-block">入库台数</view>
          <view class="m-t-14 lh36 fz-24 color-block-45"
            >昨日 {{ boardInfo.yesterdayStorageNum || 0 }}</view
          >
        </view>
        <view>
          <view class="lh60 fz-b fz-40 color-block font-din-bold">{{
            boardInfo.saleNum || 0
          }}</view>
          <view class="lh42 fz-28 color-block">销售单量</view>
          <view class="flex flex-vertical-c fz-24 lh36 m-t-14">
            <text class="color-block-45">昨日</text>
            <text class="color-red m-l-4">+{{ boardInfo.yesterdaySaleNum || 0 }}</text>
            <image class="board-bottom__img" src="/static/supplier/home/on_union.png" />
          </view>
        </view>
        <view>
          <view class="lh60 fz-b fz-40 color-block font-din-bold">{{
            boardInfo.preSellNum || 0
          }}</view>
          <view class="lh42 fz-28 color-block">预售单量</view>
          <view class="flex flex-vertical-c fz-24 lh36 m-t-14">
            <text class="color-block-45">昨日</text>
            <text class="color-green m-l-4">{{ boardInfo.yesterdayPreSellNum || 0 }}</text>
            <image class="board-bottom__img" src="/static/supplier/home/down_union.png" />
          </view>
        </view>
        <view>
          <view class="lh60 fz-b fz-40 color-block font-din-bold">{{
            boardInfo.saleTotal || 0
          }}</view>
          <view class="lh42 fz-28 color-block">销售额</view>
          <view class="m-t-14 lh36 fz-24 color-block-45"
            >昨日 {{ boardInfo.yesterdaySaleTotal || 0 }}</view
          >
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'DataBoard',
    props: {
      boardInfo: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        todayTime: '',
      }
    },
    methods: {
      refreshFn() {
        this.todayTime = this.$vocenApi.VoUtils.timeFormat(new Date(), 'yyyy-mm-dd hh:MM:ss')
        this.$emit('refreshFn')
      },
    },
    created() {
      this.todayTime = this.$vocenApi.VoUtils.timeFormat(new Date(), 'yyyy-mm-dd hh:MM:ss')
    },
  }
</script>

<style lang="scss" scoped>
  .board {
    box-sizing: border-box;
    .bg-white {
      border-radius: 16rpx;
      overflow: hidden;
    }
    &-top {
      padding: 32rpx;
      box-sizing: border-box;
    }
    &-line {
      width: 638rpx;
      height: 2rpx;
      background: $v-bg-light;
      margin: 0 24rpx;
    }
    &-bottom {
      padding: 32rpx 0 32rpx 32rpx;
      display: grid;
      grid-template-columns: 176rpx 176rpx 176rpx;
      grid-column-gap: 52rpx;
      grid-row-gap: 40rpx;
      &__color {
        color: #07c160;
      }
      &__img {
        width: 16rpx;
        height: 24rpx;
        margin-left: 6rpx;
      }
    }
  }
  .color-green {
    color: #07c160;
  }
</style>
