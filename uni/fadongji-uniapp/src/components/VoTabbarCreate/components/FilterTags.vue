<template>
  <view class="fliter-tags">
    <scroll-view class="tags" scroll-left="0" scroll-x="true">
      <block v-if="tagList.length > 0">
        <view
          v-for="(item, index) in tagList"
          :key="index + item.name"
          :class="item.choosed ? 'choosed' : ''"
          class="tag-item"
          @click="tagClick(item)"
        >
          {{ item.name }}
        </view>
      </block>
    </scroll-view>
    <view class="tags-right" @click.stop="rightClick">
      <text class="tags-right__text">{{ btnText }}</text>
      <!--      <image class="tags-right__icon" src="/static/icons/filter.png" />-->
      <VoIcon :opacity="0.45" color="#000000" name="filter"></VoIcon>
      <view v-if="badge" class="tags-right__badge">{{ badge }}</view>
    </view>
    <slot></slot>
    <!-- <FilterPop :filterVisible="filterVisible" /> -->
  </view>
</template>

<script>
  export default {
    name: 'FilterTags',
    components: {},
    props: {
      //tags数组
      tagList: {
        type: Array,
        default: () => [],
        required: true,
      },
      //徽标值
      badge: {
        type: Number,
        default: 0,
      },
      //按钮文字
      btnText: {
        type: String,
        default: '筛选',
      },
    },
    data() {
      return {
        // 筛选值
        fliterValue: [],
      }
    },
    methods: {
      rightClick() {
        this.$emit('rightClick')
      },
      tagClick(item) {
        this.tagList.forEach((tag) => {
          tag.choosed = item.id === tag.id ? true : false
        })
        this.$emit('tagClick', item)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .fliter-tags {
    width: 100%;
    height: 100rpx;
    // padding: 22rpx 0 22rpx 0;
    display: flex;
    background: #fff;
    align-items: center;
    position: relative;
    border-left: 1px solid #f7f7f8;
    .tags {
      flex: 1;
      display: flex;
      white-space: nowrap;
      overflow: hidden;
      &-right {
        padding-left: 16rpx;
        padding-right: 20rpx;
        border-left: 1px solid #f7f7f8;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        &__icon {
          width: 48rpx;
          height: 48rpx;
        }
        &__badge {
          position: absolute;
          width: 30rpx;
          height: 30rpx;
          right: 6rpx;
          top: -14rpx;
          background: #e50012;
          border-radius: 30px;
          border: 2rpx solid #fff;
          font-size: 20rpx;
          line-height: 30rpx;
          color: #ffffff;
          text-align: center;
        }
        &__text {
          font-size: 26rpx;
          line-height: 1.5;
          color: $v-c0-85;
          padding-right: 8rpx;
        }
      }
    }

    .tag-item {
      display: inline-block;
      font-size: 10px;
      background-color: #f7f7f8;
      padding: 8rpx 16rpx;
      text-align: center;
      margin: 22rpx 0 22rpx 32rpx;
      border-radius: 100px;
      font-size: 24rpx;
      line-height: 1.5;
      color: $v-c0-85;
      &.choosed {
        background: $v-tags-btn-disabled;
        border: 2rpx solid $v-tags-one;
        color: $color-primary-yellow;
      }

      .item-title {
        font-weight: bold;
      }
    }
    .filter {
      top: 96rpx;
      z-index: 99;
    }
  }
</style>
