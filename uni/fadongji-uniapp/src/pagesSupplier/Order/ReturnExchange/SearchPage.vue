<template>
  <view class="search flex flex-column">
    <VoBatteryBar></VoBatteryBar>
    <view class="search-search flex flex-vertical-c">
      <VoIcon name="left-arrow" class="m-r-24" :opacity="0.45" />
      <VoSearch placeholder="请输入搜索" height="34" v-model="keyword" class="flex1" />
    </view>
    <view class="search-content">
      <view class="search-content__tips flex flex-vertical-c flex-justify-between">
        <view>历史搜索</view>
        <VoIcon name="delete" :size="20" :opacity="0.65" @click="emptyFn" />
      </view>
      <view class="search-content__list flex flex-wrap">
        <view class="list-button" v-for="(info, index) of historyList" :key="index">{{ info }}</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'SearchPage',
    data() {
      return {
        keyword: '', // 搜索双向绑定
        historyList: ['发动机', '变速器', '雨刷器', '机油'],
      }
    },
    methods: {
      /**
       * 清空历史搜索
       */
      emptyFn() {
        this.historyList = []
      },
    },
  }
</script>

<style lang="scss" scoped>
  .search {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    &-search {
      padding: 12rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
    }
    &-content {
      flex: 1;
      background: #ffffff;
      margin-top: 16rpx;
      &__tips {
        padding: 16rpx 32rpx 48rpx;
        height: 48rpx;
        line-height: 48rpx;
        color: $color-primary-yellow;
        font-weight: bold;
        font-size: 32rpx;
      }
      &__list {
        padding-left: 32rpx;
        .list-button {
          width: 144rpx;
          height: 52rpx;
          line-height: 52rpx;
          background: $v-c0-8;
          border-radius: 30rpx;
          text-align: center;
          font-size: 28rpx;
          color: $v-c0-65;
          margin-right: 24rpx;
          margin-bottom: 16rpx;
        }
      }
    }
  }
</style>
