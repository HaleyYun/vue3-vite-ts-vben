<template>
  <view class="history">
    <view class="flex flex-justify-between flex-vertical-c">
      <text class="history-title">历史搜索</text>
      <view class="flex flex-vertical-c" @click="deleteClick">
        <view class="fz-28 color-block-45 m-r-4">清空</view>
        <VoIcon :opacity="0.45" :size="16" color="#000000" name="delete" />
      </view>
    </view>
    <view class="history-tags">
      <view
        v-for="(item, index) of searchHistory"
        :key="index"
        class="history-tags__item"
        @click="goGoodDetail(item)"
        >{{ item }}</view
      >
    </view>
  </view>
</template>

<script>
  export default {
    name: 'OrderSearchHistory',
    props: {
      searchHistory: {
        default: Array,
        searchHistory: [],
      },
    },
    data() {
      return {}
    },
    methods: {
      deleteClick() {
        this.$emit('deleteHistoryFn')
      },
      goGoodDetail(item) {
        this.$emit('goGoodDetailFn', item)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .history {
    margin-left: 32rpx;
    margin-right: 32rpx;

    &-title {
      margin-top: 16rpx;
      font-size: 32rpx;
      font-weight: bold;
      color: $v-c0-85;
    }

    &-tags {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      margin-top: 48rpx;

      &__item {
        padding: 0 30rpx;
        height: 52rpx;
        line-height: 52rpx;
        box-sizing: border-box;
        font-size: 28rpx;
        color: $v-c0-65;
        border-radius: 30rpx;
        text-align: center;
        background: $v-c0-08;
        margin-right: 24rpx;
        margin-bottom: 20rpx;
      }
    }
  }
</style>
