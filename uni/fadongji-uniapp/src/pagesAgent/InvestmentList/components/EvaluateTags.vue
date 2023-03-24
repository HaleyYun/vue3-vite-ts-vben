<template>
  <view class="evaluateTags">
    <view v-for="(item, index) in tags" :key="index" class="evaluateTags-tag">
      <view class="flex flex-vertical-c flex-justify-c evaluateTags-tag__item">
        <view class="title"> {{ item.name }}</view>
        <view class="number">({{ item.value }})</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'EvaluateTags',
    props: {
      tags: {
        type: Array,
        tags: [],
      },
      info: {
        type: Object,
        default() {
          return {}
        },
      },
    },
    data() {
      return {
        tagList: [],
      }
    },
    mounted() {},
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .evaluateTags {
    margin: 28rpx 0rpx;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-row-gap: 22rpx;
    grid-column-gap: 36rpx;

    &-tag {
      background-color: $v-tags-btn-disabled;
      border-radius: 32rpx;
      border: 2rpx solid $color-primary-yellow;

      &__item {
        padding: 6rpx 0rpx;
        color: $color-primary-yellow;
        font-size: 24rpx;
      }
    }
  }
</style>
