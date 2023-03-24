<template>
  <view class="history">
    <view class="flex flex-justify-between flex-vertical-c">
      <text class="history-title">历史搜索</text>
      <VoIcon name="delete" :size="16" @click="deleteClick" />
    </view>
    <view class="history-tags">
      <view
        class="history-tags__item"
        @click="goGoodDetail(item)"
        v-for="(item, index) of searchHistory"
        :key="index"
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
      color: $color-primary-yellow;
    }

    &-tags {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      margin-top: 48rpx;

      &__item {
        padding: 5rpx 30rpx;
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
