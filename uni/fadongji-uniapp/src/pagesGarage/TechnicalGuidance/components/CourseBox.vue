<template>
  <view :id="id" class="course-box">
    <view class="course-box__title">
      <view class="title-left">{{ title }}</view>
      <view
        v-if="
          (title === '最近在看' && moreLength >= 2) ||
          (title === '精选内容' && moreLength >= 4) ||
          (title === '热门内容' && moreLength >= 4)
        "
        class="title-right"
        @click="moreClick"
      >
        <text>更多</text>
        <VoIcon :opacity="0.45" :size="16" class="m-l-4" color="#000000" name="right-arrow" />
      </view>
    </view>
    <slot></slot>
  </view>
</template>
<script>
  export default {
    name: 'CourseBox',
    props: {
      id: {
        type: String,
        default: '',
      },
      title: {
        type: String,
      },
      dataObj: {
        type: Object,
      },
      moreLength: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {}
    },
    methods: {
      moreClick() {
        this.$emit('moreClick')
      },
    },
  }
</script>
<style lang="scss" scoped>
  .course-box {
    width: 750rpx;
    background: #ffffff;
    box-sizing: border-box;
    margin-top: 16rpx;
    margin-bottom: 16rpx;
    padding: 32rpx 32rpx 16rpx 32rpx;
    &__title {
      padding-bottom: 32rpx;
      box-sizing: border-box;
      display: flex;
      .title-left {
        color: $v-c0-85;
        font-size: 30rpx;
        line-height: 1.5;
        font-weight: bold;
      }
      .title-right {
        color: $v-c0-65;
        font-size: 26rpx;
        line-height: 32rpx;
        flex: 1;
        justify-content: flex-end;
        align-items: center;
        display: flex;
      }
    }
  }
</style>
