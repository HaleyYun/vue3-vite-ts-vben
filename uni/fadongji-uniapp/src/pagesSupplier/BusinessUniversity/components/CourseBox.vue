<template>
  <view class="course-box" :id="id">
    <view class="course-box__title">
      <view class="title-left">{{ title }}</view>
      <view v-show="!hideMore" class="title-right" @click="moreClick">
        <text class="fz-26">更多</text>
        <VoIcon name="arrow-right" size="16" color="#000000" :opacity="0.45" />
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
      hideMore: {
        type: Boolean,
        default: false,
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
        font-weight: 500;
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
