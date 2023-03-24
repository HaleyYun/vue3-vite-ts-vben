<template>
  <view class="two-level">
    <view class="two-level__name">{{ nameTwo1 }}</view>
    <view class="two-level__content">
      <view
        >{{ contentStr
        }}<text class="content-position" v-if="contentTwo1.length > 39"
          >...<text class="content-text">全部</text></text
        ></view
      >
    </view>
    <view class="two-level__name">{{ nameTwo2 }}</view>
    <view class="two-level__content2">{{ contentTwo2 }}</view>
  </view>
</template>
<script>
  export default {
    props: {
      // 姓名1
      nameTwo1: {
        type: String,
        default: '李思思',
      },
      // 评论内容1
      contentTwo1: {
        type: String,
        default: '',
      },
      // 姓名2
      nameTwo2: {
        type: String,
        default: '李思思',
      },
      // 评论内容2
      contentTwo2: {
        type: String,
        default: '汽车好物老铁带你一镜到底。',
      },
    },
    data() {
      return {
        contentStr: '',
      }
    },
    created() {
      this.contentStr =
        this.contentTwo1.length > 39 ? this.contentTwo1.slice(0, 39) : this.contentTwo1
    },
    methods: {},
  }
</script>
<style lang="scss" scope>
  .two-level {
    width: 624rpx;
    padding: 0 32rpx;
    background: $v-bg-light;
    border-right: 16rpx;
    box-sizing: border-box;
    &__name {
      font-size: 24rpx;
      color: $v-c0-65;
      height: 36rpx;
      line-height: 36rpx;
      overflow: hidden;
      margin: 8rpx 0;
    }
    &__content {
      position: relative;
      width: 560rpx;
      line-height: 40rpx;
      font-size: 26rpx;
      color: $v-c0-85;
      .content-position {
        background: $v-bg-light;
      }
      .content-text {
        color: $v-tip !important;
      }
    }
    &__content2 {
      font-size: 26rpx;
      color: $v-c0-85;
      padding-bottom: 8rpx;
    }
  }
</style>
